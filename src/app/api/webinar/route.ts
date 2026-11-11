import { NextResponse } from "next/server";
import { z } from "zod";
import { eingabeAbsage, eingabePruefen, einwilligungStarten, FELDER } from "@/lib/anmeldung";
import { ipAus, jsonAus, siegelAbsage, siegelPruefen } from "@/lib/botschutz";
import { insertLead } from "@/lib/leads";
import { nischeVon } from "@/lib/quellen";
import { WEBINAR } from "@/components/webinar/config";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Webinar-Anmeldung "Second Brain"
   - Gleicher Bauplan wie /api/akademie-newsletter: Briefkasten fürs CRM, Nachweis der
     Einwilligung, Bestätigungsmail. Erst nach dem Klick darin setzt src/lib/anmeldung.ts
     den Webinar-Tag im Newsletter-Werkzeug, und der startet die Strecke mit Zugangslink
     und Erinnerungen. Ohne Bestätigung also kein Zugangslink: Das sagt das Formular dazu.
   - Botschutz: unsichtbares Feld, Stempel und Obergrenze (src/lib/botschutz.ts).
   ────────────────────────────────────────────────────────────────────────── */

const Schema = z.object({
  vorname: FELDER.vorname,
  nachname: FELDER.nachname,
  email: FELDER.email,
  telefon: FELDER.telefon,
  einwilligung: FELDER.einwilligungPflicht,
  einwilligungVersion: FELDER.einwilligungVersion,
  fax: FELDER.fax,
});

export async function POST(req: Request) {
  // Ohne Termin wuerde der Tag die Mail-Strecke zum alten Datum starten.
  if (WEBINAR.warteliste) {
    return NextResponse.json({ ok: false, reason: "warteliste" }, { status: 410 });
  }

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
  try {
    await insertLead({
      vorname: data.vorname,
      nachname: data.nachname,
      email: data.email,
      unternehmen: "",
      webseite: "",
      anliegen: `Webinar-Anmeldung: Second Brain für Claude, ${WEBINAR.date}.`,
      quelle: "Webinar Second Brain",
      nische: nischeVon("Webinar Second Brain"),
      telefon: data.telefon,
    });
  } catch (err) {
    console.error("[webinar] Turso-Fehler:", err);
  }

  // 2) Nachweis der Einwilligung + Bestätigungsmail. Der Webinar-Tag kommt nach dem Klick.
  const bestaetigung = await einwilligungStarten({
    formular: "Webinar Second Brain",
    email: data.email,
    vorname: data.vorname,
    nachname: data.nachname,
    version: data.einwilligungVersion,
    ip,
  });
  if (bestaetigung === "fehlt") {
    return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
  }
  return NextResponse.json({ ok: true, bestaetigung });
}
