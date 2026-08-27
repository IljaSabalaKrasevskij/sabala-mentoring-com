/* ──────────────────────────────────────────────────────────────────────────
   ActiveCampaign — Newsletter-Anbindung für die Sabala KI Academy.

   Trägt einen Kontakt ein, abonniert ihn auf die Akademie-Liste UND setzt
   den Akademie-Newsletter-Tag. Sabala arbeitet konsequent Tag-basiert für
   Automation-Trigger — das Tag-Adden startet die Welcome-Automation. Die
   Listen-Anmeldung sorgt dafür, dass der Kontakt regelmäßige Sends bekommt.

   Env (Vercel, Production):
     AC_API_URL            https://<account>.api-us1.com   (ohne /api/3)
     AC_API_KEY            ActiveCampaign API-Key (Einstellungen > Entwickler)
     AC_AKADEMIE_LIST_ID   numerische Listen-ID der Akademie-Liste
     AC_AKADEMIE_TAG       Tag-Name, der die Akademie-Welcome-Automation triggert
                           (Default: "Sabala Academy Newsletter")
     AC_MOONI_LIST_ID      numerische Listen-ID der Mooni-Voice-Liste (Default: 28)
     AC_MOONI_TAG          Tag-Name fuer den Mooni-Voice-Funnel
                           (Default: "Mooni Voice Beta")

   Siehe Vault: 04_Ressourcen/Systeme/ActiveCampaign-Architektur.md
   ────────────────────────────────────────────────────────────────────────── */

type AcResult = "ok" | "skipped" | "error";

const AKADEMIE_DEFAULT_TAG = "Sabala Academy Newsletter";
const MOONI_DEFAULT_TAG = "Mooni Voice Beta";

/* Account-Basis (URL + Key) — Listen-/Tag-Auswahl liegt pro Funnel daneben. */
function cfgBase() {
  const url = process.env.AC_API_URL?.replace(/\/+$/, "");
  const key = process.env.AC_API_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export function activeCampaignConfigured(): boolean {
  return cfgBase() !== null;
}

/* Liefert die Tag-ID zum Tag-Namen. Sucht zuerst per /tags?search,
   legt den Tag bei Bedarf an. Cached pro Lambda-Instanz. */
const tagIdCache = new Map<string, number>();

async function resolveTagId(
  url: string,
  key: string,
  tagName: string
): Promise<number | null> {
  const cached = tagIdCache.get(tagName);
  if (cached) return cached;

  const headers = { "Api-Token": key, "Content-Type": "application/json" };
  try {
    // Suche
    const searchRes = await fetch(
      `${url}/api/3/tags?search=${encodeURIComponent(tagName)}&limit=100`,
      { headers }
    );
    if (searchRes.ok) {
      const data = (await searchRes.json()) as { tags?: { id: string; tag: string }[] };
      const match = (data.tags || []).find((t) => t.tag === tagName);
      if (match) {
        const id = Number(match.id);
        tagIdCache.set(tagName, id);
        return id;
      }
    }
    // Anlegen, wenn nicht vorhanden
    const createRes = await fetch(`${url}/api/3/tags`, {
      method: "POST",
      headers,
      body: JSON.stringify({ tag: { tag: tagName, tagType: "contact", description: "Auto-created by website /api/akademie-newsletter" } }),
    });
    if (!createRes.ok) {
      console.error("[activecampaign] Tag-Anlage fehlgeschlagen:", createRes.status);
      return null;
    }
    const created = (await createRes.json()) as { tag?: { id?: string } };
    if (!created.tag?.id) return null;
    const id = Number(created.tag.id);
    tagIdCache.set(tagName, id);
    return id;
  } catch (err) {
    console.error("[activecampaign] resolveTagId-Fehler:", err);
    return null;
  }
}

/* Generischer Funnel-Subscribe: Kontakt syncen → auf Liste setzen → Tag setzen.
   Sabala-Pattern: Tag triggert die Automation, Liste ist der Versand-Container.
   "skipped", wenn AC-Basis oder Listen-ID fehlt. */
async function subscribeToList(
  email: string,
  firstName: string,
  listId: string | undefined,
  tagName: string
): Promise<AcResult> {
  const base = cfgBase();
  if (!base || !listId) return "skipped";

  const headers = { "Api-Token": base.key, "Content-Type": "application/json" };

  try {
    // 1) Kontakt anlegen/aktualisieren (idempotent via /contact/sync)
    const syncRes = await fetch(`${base.url}/api/3/contact/sync`, {
      method: "POST",
      headers,
      body: JSON.stringify({ contact: { email, firstName } }),
    });
    if (!syncRes.ok) {
      console.error("[activecampaign] contact/sync fehlgeschlagen:", syncRes.status);
      return "error";
    }
    const synced = (await syncRes.json()) as { contact?: { id?: string } };
    const contactId = synced.contact?.id;
    if (!contactId) return "error";

    // 2) Auf die Liste setzen (Versand-Container)
    const listRes = await fetch(`${base.url}/api/3/contactLists`, {
      method: "POST",
      headers,
      body: JSON.stringify({ contactList: { list: Number(listId), contact: Number(contactId), status: 1 } }),
    });
    if (!listRes.ok) {
      console.error("[activecampaign] contactLists fehlgeschlagen:", listRes.status);
      return "error";
    }

    // 3) Tag setzen — DAS triggert die Welcome-Automation
    const tagId = await resolveTagId(base.url, base.key, tagName);
    if (!tagId) {
      console.error("[activecampaign] Tag-Resolve fehlgeschlagen:", tagName);
      return "error";
    }
    const tagRes = await fetch(`${base.url}/api/3/contactTags`, {
      method: "POST",
      headers,
      body: JSON.stringify({ contactTag: { contact: Number(contactId), tag: tagId } }),
    });
    if (!tagRes.ok && tagRes.status !== 422) {
      // 422 = Tag schon dran (idempotent, kein Fehler)
      console.error("[activecampaign] contactTags fehlgeschlagen:", tagRes.status);
      return "error";
    }

    return "ok";
  } catch (err) {
    console.error("[activecampaign] Netzwerkfehler:", err);
    return "error";
  }
}

/* Nur taggen: Kontakt syncen (idempotent) und einen Tag setzen — OHNE Listen-
   Anmeldung. Fuer Signale wie "Umfrage ausgefuellt", die eine Automation
   triggern koennen, ohne die Listen-Mitgliedschaft zu veraendern (wichtig fuer
   Bestandskunden, die nicht in den Academy-Newsletter gehoeren). */
export async function tagContact(
  email: string,
  firstName: string,
  tagName: string
): Promise<AcResult> {
  const base = cfgBase();
  if (!base) return "skipped";
  const headers = { "Api-Token": base.key, "Content-Type": "application/json" };
  try {
    const syncRes = await fetch(`${base.url}/api/3/contact/sync`, {
      method: "POST",
      headers,
      body: JSON.stringify({ contact: { email, firstName } }),
    });
    if (!syncRes.ok) return "error";
    const synced = (await syncRes.json()) as { contact?: { id?: string } };
    const contactId = synced.contact?.id;
    if (!contactId) return "error";

    const tagId = await resolveTagId(base.url, base.key, tagName);
    if (!tagId) return "error";

    const tagRes = await fetch(`${base.url}/api/3/contactTags`, {
      method: "POST",
      headers,
      body: JSON.stringify({ contactTag: { contact: Number(contactId), tag: tagId } }),
    });
    if (!tagRes.ok && tagRes.status !== 422) return "error"; // 422 = Tag schon dran
    return "ok";
  } catch (err) {
    console.error("[activecampaign] tagContact-Fehler:", err);
    return "error";
  }
}

/* Akademie-Newsletter → Akademie-Liste + Akademie-Tag (Welcome-Automation). */
export async function subscribeToAcademy(email: string, firstName = ""): Promise<AcResult> {
  return subscribeToList(
    email,
    firstName,
    process.env.AC_AKADEMIE_LIST_ID,
    process.env.AC_AKADEMIE_TAG || AKADEMIE_DEFAULT_TAG
  );
}

/* Webinar "Second Brain" → Akademie-Liste + eigener Webinar-Tag.
   ponytail: laeuft bewusst auf der bestehenden Akademie-Liste (gleiche Zielgruppe,
   ein Versand-Container). Der eigene Tag trennt die Automation: Erinnerungsmails
   vor dem Termin, Aufzeichnung danach. Per Env auf eine eigene Liste umstellbar. */
export async function subscribeWebinar(email: string, firstName = ""): Promise<AcResult> {
  return subscribeToList(
    email,
    firstName,
    process.env.AC_WEBINAR_LIST_ID || process.env.AC_AKADEMIE_LIST_ID,
    process.env.AC_WEBINAR_TAG || "Webinar Second Brain"
  );
}

/* Mooni-Voice-Funnel → Mooni-Liste + Mooni-Tag.
   ponytail: feste Default-Liste 28 / Tag "Mooni Voice Beta" — bekannte stabile
   IDs aus dem Standalone-Funnel (gleicher AC-Account). Per Env ueberschreibbar. */
export async function subscribeMooniVoice(email: string, firstName = ""): Promise<AcResult> {
  return subscribeToList(
    email,
    firstName,
    process.env.AC_MOONI_LIST_ID || "28",
    process.env.AC_MOONI_TAG || MOONI_DEFAULT_TAG
  );
}
