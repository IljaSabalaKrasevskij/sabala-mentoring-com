import { NextResponse } from "next/server";
import { z } from "zod";
import { einwilligungStarten, FELDER, ipAus, type Formular } from "@/lib/anmeldung";
import { insertLead } from "@/lib/leads";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Akademie-Newsletter und Wartelisten
   - Vorname, Nachname, E-Mail, Telefon (freiwillig) und das Häkchen für Mails.
     Ohne Häkchen gibt es keine Anmeldung: Der Newsletter ist der Zweck dieses Formulars.
   - Legt die Anfrage in den Briefkasten (Turso). Von dort holt Sabala Mail sie ins CRM.
   - Speichert den Nachweis der Einwilligung und schickt die Bestätigungsmail.
     Erst nach dem Klick darin kommt der Kontakt ins Newsletter-Werkzeug (Liste + Tag,
     der Tag startet die Willkommens-Strecke). Siehe src/lib/anmeldung.ts.
   - Mit "warteliste" eigene Quelle und eigener Tag: So lässt sich die Warteliste
     getrennt anschreiben, und die Willkommens-Mail bleibt aus.
   - Honeypot "fax", einfaches In-Memory-Rate-Limit.
   ────────────────────────────────────────────────────────────────────────── */

const WARTELISTE = {
  kurs: { formular: "Warteliste Kurs", anliegen: "Warteliste: möchte den nächsten Termin des Second-Brain-Kurses erfahren." },
  webinar: { formular: "Warteliste Webinar", anliegen: "Warteliste: möchte den nächsten Webinar-Termin erfahren." },
} as const satisfies Record<string, { formular: Formular; anliegen: string }>;

const Schema = z.object({
  warteliste: z.enum(["kurs", "webinar"]).optional(),
  vorname: FELDER.vorname,
  nachname: FELDER.nachname,
  email: FELDER.email,
  telefon: FELDER.telefon,
  einwilligung: z.literal(true),
  einwilligungVersion: FELDER.einwilligungVersion,
  fax: z.string().max(0).optional().default(""),
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
  const liste = data.warteliste ? WARTELISTE[data.warteliste] : null;

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
