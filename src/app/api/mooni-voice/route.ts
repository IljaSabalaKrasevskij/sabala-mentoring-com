import { NextResponse } from "next/server";
import { z } from "zod";
import { eingabeAbsage, eingabePruefen, einwilligungStarten, FELDER, type Bestaetigung } from "@/lib/anmeldung";
import { ipAus, jsonAus, siegelAbsage, siegelPruefen } from "@/lib/botschutz";
import { insertLead } from "@/lib/leads";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Mooni-Voice-Anmeldung (Open-Source-Leadmagnet)
   - Der Download hängt nicht am Häkchen: Wer nur laden will, landet im Briefkasten
     (fürs CRM) und bekommt keine Werbung.
   - Mit Häkchen: Nachweis der Einwilligung + Bestätigungsmail. Erst nach dem Klick darin
     kommt der Kontakt auf die Mooni-Liste im Newsletter-Werkzeug (src/lib/anmeldung.ts).
   - Name, E-Mail und Telefon sind Pflicht. Botschutz: unsichtbares Feld, Stempel und Obergrenze (src/lib/botschutz.ts).
   ────────────────────────────────────────────────────────────────────────── */

const Schema = z.object({
  vorname: FELDER.vorname,
  nachname: FELDER.nachname,
  email: FELDER.email,
  telefon: FELDER.telefon,
  einwilligung: FELDER.einwilligung,
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

  // Botschutz: unsichtbares Feld gefüllt → stilles OK. Dann der Stempel.
  if (data.fax) return NextResponse.json({ ok: true });
  const urteil = await siegelPruefen(ip, json);
  if (urteil !== "ok") return siegelAbsage(urteil);

  // 1) Briefkasten fürs CRM — best effort
  let stored = false;
  try {
    stored = await insertLead({
      vorname: data.vorname,
      nachname: data.nachname,
      email: data.email,
      unternehmen: "",
      webseite: "",
      anliegen: "Mooni Voice: hat die Open-Source-App heruntergeladen.",
      quelle: "Mooni Voice",
      telefon: data.telefon,
    });
  } catch (err) {
    console.error("[mooni-voice] Turso-Fehler:", err);
  }

  // 2) Nur mit Häkchen: Nachweis + Bestätigungsmail
  let bestaetigung: Bestaetigung | "keine" = "keine";
  if (data.einwilligung) {
    bestaetigung = await einwilligungStarten({
      formular: "Mooni Voice",
      email: data.email,
      vorname: data.vorname,
      nachname: data.nachname,
      version: data.einwilligungVersion,
      ip,
    });
  }

  if (stored || (bestaetigung !== "keine" && bestaetigung !== "fehlt")) {
    return NextResponse.json({ ok: true, bestaetigung });
  }
  // Nichts konfiguriert/erreichbar → Frontend laesst den Download trotzdem zu
  return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
}
