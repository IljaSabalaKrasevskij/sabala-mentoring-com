import { NextResponse } from "next/server";
import { z } from "zod";
import { einwilligungStarten, FELDER, ipAus, type Bestaetigung } from "@/lib/anmeldung";
import { insertLead } from "@/lib/leads";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Mooni-Voice-Anmeldung (Open-Source-Leadmagnet)
   - Der Download hängt nicht am Häkchen: Wer nur laden will, landet im Briefkasten
     (fürs CRM) und bekommt keine Werbung.
   - Mit Häkchen: Nachweis der Einwilligung + Bestätigungsmail. Erst nach dem Klick darin
     kommt der Kontakt auf die Mooni-Liste im Newsletter-Werkzeug (src/lib/anmeldung.ts).
   - Honeypot "fax", einfaches In-Memory-Rate-Limit.
   ────────────────────────────────────────────────────────────────────────── */

const Schema = z.object({
  vorname: FELDER.vorname,
  nachname: FELDER.nachname,
  email: FELDER.email,
  telefon: FELDER.telefon,
  einwilligung: FELDER.einwilligung,
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

  // Honeypot: stilles OK
  if (data.fax) return NextResponse.json({ ok: true });

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
