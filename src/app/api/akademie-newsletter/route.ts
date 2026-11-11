import { NextResponse } from "next/server";
import { z } from "zod";
import { eingabeAbsage, eingabePruefen, einwilligungStarten, FELDER, type Formular } from "@/lib/anmeldung";
import { ipAus, jsonAus, siegelAbsage, siegelPruefen } from "@/lib/botschutz";
import { insertLead } from "@/lib/leads";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Akademie-Newsletter und Wartelisten
   - Vorname, Nachname, E-Mail, Telefon und das Häkchen für Mails. Alles Pflicht.
     Ohne Häkchen gibt es keine Anmeldung: Der Newsletter ist der Zweck dieses Formulars.
   - Legt die Anfrage in den Briefkasten (Turso). Von dort holt Sabala Mail sie ins CRM.
   - Speichert den Nachweis der Einwilligung und schickt die Bestätigungsmail.
     Erst nach dem Klick darin kommt der Kontakt ins Newsletter-Werkzeug (Liste + Tag,
     der Tag startet die Willkommens-Strecke). Siehe src/lib/anmeldung.ts.
   - Mit "warteliste" eigene Quelle und eigener Tag: So lässt sich die Warteliste
     getrennt anschreiben, und die Willkommens-Mail bleibt aus.
   - Botschutz: unsichtbares Feld, Stempel und Obergrenze (src/lib/botschutz.ts).
   ────────────────────────────────────────────────────────────────────────── */

const WARTELISTE = {
  kurs: { formular: "Warteliste Kurs", anliegen: "Warteliste: möchte den nächsten Termin des Second-Brain-Kurses erfahren." },
  webinar: { formular: "Warteliste Webinar", anliegen: "Warteliste: möchte den nächsten Webinar-Termin erfahren." },
  webkurs: { formular: "Warteliste Webseiten-Kurs", anliegen: "Warteliste: möchte den Start des Kurses „Webseiten bauen mit Claude Code“ erfahren." },
} as const satisfies Record<string, { formular: Formular; anliegen: string }>;

const Schema = z.object({
  warteliste: z.enum(["kurs", "webinar", "webkurs"]).optional(),
  vorname: FELDER.vorname,
  nachname: FELDER.nachname,
  email: FELDER.email,
  telefon: FELDER.telefon,
  einwilligung: FELDER.einwilligungPflicht,
  einwilligungVersion: FELDER.einwilligungVersion,
  fax: FELDER.fax,
});

export async function POST(req: Request) {
  const ip = ipAus(req);

  const json = await jsonAus(req);
  if (json === undefined) return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 400 });
  const parsed = eingabePruefen(Schema, json);
  if (!parsed.success) return eingabeAbsage(parsed.error);
  const data = parsed.data;
  const liste = data.warteliste ? WARTELISTE[data.warteliste] : null;

  // Botschutz: unsichtbares Feld gefüllt → stilles OK. Dann der Stempel.
  if (data.fax) return NextResponse.json({ ok: true });
  const urteil = await siegelPruefen(ip, json);
  if (urteil !== "ok") return siegelAbsage(urteil);

  // 1) Briefkasten fürs CRM — best effort
  try {
    await insertLead({
      vorname: data.vorname,
      nachname: data.nachname,
      email: data.email,
      unternehmen: "",
      webseite: "",
      anliegen: liste?.anliegen ?? "Akademie-Newsletter: möchte über neue Kurse & Termine informiert werden.",
      quelle: liste?.formular ?? "Akademie-Newsletter",
      telefon: data.telefon,
    });
  } catch (err) {
    console.error("[akademie-newsletter] Turso-Fehler:", err);
  }

  // 2) Nachweis der Einwilligung + Bestätigungsmail. Ins Newsletter-Werkzeug geht es erst nach dem Klick.
  const bestaetigung = await einwilligungStarten({
    formular: liste?.formular ?? "Akademie-Newsletter",
    email: data.email,
    vorname: data.vorname,
    nachname: data.nachname,
    version: data.einwilligungVersion,
    ip,
  });
  if (bestaetigung === "fehlt") {
    // Datenbank oder Postfach nicht eingerichtet, oder der Versand ist gescheitert → Frontend zeigt den Ausweichtext
    return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
  }
  return NextResponse.json({ ok: true, bestaetigung });
}
