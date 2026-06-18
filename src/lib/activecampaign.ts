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
     AC_AKADEMIE_TAG       Tag-Name, der die Welcome-Automation triggert
                           (Default: "Sabala Academy Newsletter")

   Siehe Vault: 04_Ressourcen/Systeme/ActiveCampaign-Architektur.md
   ────────────────────────────────────────────────────────────────────────── */

type AcResult = "ok" | "skipped" | "error";

const DEFAULT_TAG = "Sabala Academy Newsletter";

function cfg() {
  const url = process.env.AC_API_URL?.replace(/\/+$/, "");
  const key = process.env.AC_API_KEY;
  const listId = process.env.AC_AKADEMIE_LIST_ID;
  const tagName = process.env.AC_AKADEMIE_TAG || DEFAULT_TAG;
  if (!url || !key || !listId) return null;
  return { url, key, listId, tagName };
}

export function activeCampaignConfigured(): boolean {
  return cfg() !== null;
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

export async function subscribeToAcademy(email: string, firstName = ""): Promise<AcResult> {
  const c = cfg();
  if (!c) return "skipped";

  const headers = { "Api-Token": c.key, "Content-Type": "application/json" };

  try {
    // 1) Kontakt anlegen/aktualisieren (idempotent via /contact/sync)
    const syncRes = await fetch(`${c.url}/api/3/contact/sync`, {
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

    // 2) Auf die Akademie-Liste setzen (Versand-Container)
    const listRes = await fetch(`${c.url}/api/3/contactLists`, {
      method: "POST",
      headers,
      body: JSON.stringify({ contactList: { list: Number(c.listId), contact: Number(contactId), status: 1 } }),
    });
    if (!listRes.ok) {
      console.error("[activecampaign] contactLists fehlgeschlagen:", listRes.status);
      return "error";
    }

    // 3) Tag setzen — DAS triggert die Welcome-Automation (Sabala-Pattern: Tag triggert, Liste versendet)
    const tagId = await resolveTagId(c.url, c.key, c.tagName);
    if (!tagId) {
      console.error("[activecampaign] Tag-Resolve fehlgeschlagen:", c.tagName);
      return "error";
    }
    const tagRes = await fetch(`${c.url}/api/3/contactTags`, {
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
