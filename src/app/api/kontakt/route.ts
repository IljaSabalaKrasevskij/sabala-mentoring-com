import { NextResponse } from "next/server";
import { z } from "zod";
import { eingabeAbsage, eingabePruefen, einwilligungStarten, FELDER, type Bestaetigung } from "@/lib/anmeldung";
import { ipAus, jsonAus, siegelAbsage, siegelPruefen } from "@/lib/botschutz";
import { insertLead } from "@/lib/leads";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Kontakt-Endpoint
   - Validiert die Eingabe (zod). Botschutz: unsichtbares Feld, Stempel und Obergrenze (src/lib/botschutz.ts).
   - Schreibt die Anfrage in den Briefkasten (Turso/libSQL). Von dort holt Sabala Mail sie ins CRM.
   - Mit Häkchen für Mails: Nachweis der Einwilligung + Bestätigungsmail (src/lib/anmeldung.ts).
     Die Anfrage selbst hängt nicht am Häkchen.
   - Pusht eine ntfy-Notification, damit Ilja neue Anfragen sofort mitbekommt.
     Gleicher Kanal wie /api/audit-request und /api/umfrage.
   - Wenn Turso nicht konfiguriert ist, antwortet die Route mit 503; das
     Frontend faellt dann sichtbar auf mailto zurueck (kein stiller Verlust).

   Benoetigte Env-Variablen (Vercel, Production):
     TURSO_DATABASE_URL   libsql://<db>-<org>.turso.io
     TURSO_AUTH_TOKEN     Turso-Datenbank-Token
     NTFY_TOPIC           ntfy-Topic fuer den Push aufs Handy
     NTFY_SERVER          optional, Default https://ntfy.sh
   ────────────────────────────────────────────────────────────────────────── */

const Schema = z.object({
  vorname: FELDER.vorname,
  nachname: FELDER.nachname,
  email: FELDER.email,
  telefon: FELDER.telefon,
  einwilligung: FELDER.einwilligung,
  einwilligungVersion: FELDER.einwilligungVersion,
  unternehmen: z.string().trim().max(160).optional().default(""),
  webseite: z.string().trim().max(200).optional().default(""),
  anliegen: z.string().trim().min(5, "Bitte schreib ein paar Worte zu deinem Wunsch.").max(4000, "Bitte fass dich etwas kürzer."),
  quelle: z.string().trim().max(200).optional().default(""),
  fax: FELDER.fax,
});

async function notify(data: z.infer<typeof Schema>): Promise<void> {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) {
    // Laut, nicht still: ein fehlender Kanal hat hier schon einmal monatelang
    // dafuer gesorgt, dass Anfragen unbemerkt liegen blieben.
    console.error("[kontakt] NTFY_TOPIC fehlt - Anfrage gespeichert, aber keine Benachrichtigung verschickt");
    return;
  }
  const server = process.env.NTFY_SERVER || "https://ntfy.sh";

  const message = `${data.vorname} ${data.nachname}${data.unternehmen ? ` (${data.unternehmen})` : ""}\n${data.email}${data.telefon ? `\n${data.telefon}` : ""}${data.webseite ? `\n${data.webseite}` : ""}\nSeite: ${data.quelle || "Website"}\n\n${data.anliegen.slice(0, 500)}`;

  try {
    // JSON-Mode wie in /api/audit-request: umgeht Header-Encoding-Probleme mit Umlauten.
    const res = await fetch(server, {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic,
        title: "Neue Website-Anfrage",
        message,
        tags: ["envelope"],
        priority: 4,
      }),
    });
    if (!res.ok) {
      console.error("[kontakt] ntfy-Fehler:", res.status, (await res.text()).slice(0, 200));
    }
  } catch (err) {
    // Benachrichtigung ist best-effort; die Anfrage liegt sicher in der Datenbank.
    console.error("[kontakt] ntfy nicht erreichbar:", err);
  }
}

export async function POST(req: Request) {
  const ip = ipAus(req);

  // 1) Parsen + validieren
  const json = await jsonAus(req);
  if (json === undefined) return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 400 });
  const parsed = eingabePruefen(Schema, json);
  if (!parsed.success) return eingabeAbsage(parsed.error);
  const data = parsed.data;

  // 2) Botschutz: unsichtbares Feld gefüllt → stilles OK, nichts speichern. Dann der Stempel.
  if (data.fax) {
    return NextResponse.json({ ok: true });
  }
  const urteil = await siegelPruefen(ip, json);
  if (urteil !== "ok") return siegelAbsage(urteil);

  // 3) Speichern
  try {
    const stored = await insertLead({
      vorname: data.vorname,
      nachname: data.nachname,
      email: data.email,
      unternehmen: data.unternehmen,
      webseite: data.webseite,
      anliegen: data.anliegen,
      quelle: data.quelle || "Website",
      telefon: data.telefon,
    });
    if (!stored) {
      // Backend noch nicht konfiguriert → Frontend nutzt mailto-Fallback
      return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
    }
    await notify(data);
    // Häkchen für Mails gesetzt: Nachweis + Bestätigungsmail. Scheitert das, ist die Anfrage trotzdem angekommen.
    let bestaetigung: Bestaetigung | "keine" = "keine";
    if (data.einwilligung) {
      bestaetigung = await einwilligungStarten({ formular: "Kontaktformular", email: data.email, vorname: data.vorname, nachname: data.nachname, version: data.einwilligungVersion, ip });
    }
    return NextResponse.json({ ok: true, bestaetigung });
  } catch (err) {
    console.error("[kontakt] Lead-Speicher-Fehler:", err);
    return NextResponse.json({ ok: false, reason: "store_failed" }, { status: 502 });
  }
}
