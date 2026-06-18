/* ──────────────────────────────────────────────────────────────────────────
   ActiveCampaign — Newsletter-Anbindung für die Sabala KI Academy.

   Trägt einen Kontakt ein und abonniert ihn auf die Akademie-Liste. Die
   Listen-Anmeldung (status 1) löst in ActiveCampaign die Willkommens-
   Automation aus (Welcome-Mail). Das Mail-Design liegt als HTML unter
   emails/akademie-willkommen.html und wird einmalig in die AC-Automation gepflegt.

   Env (Vercel, Production):
     AC_API_URL            https://<account>.api-us1.com   (ohne /api/3)
     AC_API_KEY            ActiveCampaign API-Key (Einstellungen > Entwickler)
     AC_AKADEMIE_LIST_ID   numerische Listen-ID der Akademie-Liste

   Ist nichts gesetzt, gibt subscribeToAcademy() "skipped" zurück; die Route
   fällt dann auf den Turso-Speicher zurück (keine verlorene Anmeldung).
   ────────────────────────────────────────────────────────────────────────── */

type AcResult = "ok" | "skipped" | "error";

function cfg() {
  const url = process.env.AC_API_URL?.replace(/\/+$/, "");
  const key = process.env.AC_API_KEY;
  const listId = process.env.AC_AKADEMIE_LIST_ID;
  if (!url || !key || !listId) return null;
  return { url, key, listId };
}

export function activeCampaignConfigured(): boolean {
  return cfg() !== null;
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

    // 2) Auf die Akademie-Liste setzen (status 1 = subscribed → Welcome-Automation)
    const listRes = await fetch(`${c.url}/api/3/contactLists`, {
      method: "POST",
      headers,
      body: JSON.stringify({ contactList: { list: Number(c.listId), contact: Number(contactId), status: 1 } }),
    });
    if (!listRes.ok) {
      console.error("[activecampaign] contactLists fehlgeschlagen:", listRes.status);
      return "error";
    }
    return "ok";
  } catch (err) {
    console.error("[activecampaign] Netzwerkfehler:", err);
    return "error";
  }
}
