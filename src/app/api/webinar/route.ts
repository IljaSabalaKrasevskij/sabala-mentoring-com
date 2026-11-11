import { NextResponse } from "next/server";
import { z } from "zod";
import { einwilligungStarten, FELDER, ipAus } from "@/lib/anmeldung";
import { insertLead } from "@/lib/leads";
import { WEBINAR } from "@/components/webinar/config";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Webinar-Anmeldung "Second Brain"
   - Gleicher Bauplan wie /api/akademie-newsletter: Briefkasten fürs CRM, Nachweis der
     Einwilligung, Bestätigungsmail. Erst nach dem Klick darin setzt src/lib/anmeldung.ts
     den Webinar-Tag im Newsletter-Werkzeug, und der startet die Strecke mit Zugangslink
     und Erinnerungen. Ohne Bestätigung also kein Zugangslink: Das sagt das Formular dazu.
   - Honeypot "fax", einfaches In-Memory-Rate-Limit pro Lambda-Instanz.
   ────────────────────────────────────────────────────────────────────────── */

const Schema = z.object({
  vorname: FELDER.vorname,
  nachname: FELDER.nachname,
  email: FELDER.email,
  telefon: FELDER.telefon,
  einwilligung: z.literal(true),
  einwilligungVersion: FELDER.einwilligungVersion,
  // Honeypot: bewusst NICHT per max(0) erzwungen. Sonst faengt die Validierung
  // den Bot mit 422 ab und verraet ihm, dass er entdeckt wurde. Gefuellt wird
  // weiter unten still mit 200 quittiert.
  fax: z.string().max(200).optional().default(""),
});

const HITS = new Map<string, number[]>();
const LIMIT = 6;
const WINDOW = 10 * 60 * 1000;

function rateLimited(ip: string, now: number): boolean {
  const arr = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW);
  arr.push(now);
  HITS.set(ip, arr);
  return arr.length > LIMIT;
}

export async function POST(req: Request) {
  // Ohne Termin wuerde der Tag die Mail-Strecke zum alten Datum starten.
  if (WEBINAR.warteliste) {
    return NextResponse.json({ ok: false, reason: "warteliste" }, { status: 410 });
  }

  const ip = ipAus(req);
  if (rateLimited(ip, Date.now())) {
    return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 400 });
  }
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, reason: "validation" }, { status: 422 });
  }
  const data = parsed.data;

  // Honeypot: stilles OK
  if (data.fax) return NextResponse.json({ ok: true });

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
