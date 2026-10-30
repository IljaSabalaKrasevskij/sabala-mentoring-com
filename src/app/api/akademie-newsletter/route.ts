import { NextResponse } from "next/server";
import { z } from "zod";
import { insertLead } from "@/lib/leads";
import { subscribeToAcademy, subscribeWarteliste } from "@/lib/activecampaign";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Akademie-Newsletter-Anmeldung
   - Nimmt eine E-Mail entgegen, optional einen Vornamen.
   - Trägt den Kontakt in ActiveCampaign ein (Akademie-Liste → Welcome-Mail),
     sofern AC konfiguriert ist.
   - Spiegelt die Anmeldung zusätzlich in die Turso-DB (quelle "Akademie-Newsletter"),
     damit das Dashboard sie sieht und nichts verloren geht.
   - Erfolgreich, sobald MINDESTENS einer der beiden Speicher greift.
   - Mit "warteliste" gleiche Liste, aber eigener Tag und eigene Quelle: So laesst
     sich die Warteliste getrennt anschreiben, und die Welcome-Mail bleibt aus.
   - Honeypot "fax", einfaches In-Memory-Rate-Limit.
   ────────────────────────────────────────────────────────────────────────── */

const WARTELISTE = {
  kurs: {
    tag: "Warteliste Second Brain Kurs",
    quelle: "Warteliste Kurs",
    anliegen: "Warteliste: möchte den nächsten Termin des Second-Brain-Kurses erfahren.",
  },
  webinar: {
    tag: "Warteliste Webinar",
    quelle: "Warteliste Webinar",
    anliegen: "Warteliste: möchte den nächsten Webinar-Termin erfahren.",
  },
} as const;

const Schema = z.object({
  warteliste: z.enum(["kurs", "webinar"]).optional(),
  vorname: z.string().trim().min(1, "Vorname fehlt").max(80),
  email: z
    .string()
    .trim()
    .max(160)
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "E-Mail ungueltig"),
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
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
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

  // 1) ActiveCampaign (Newsletter + Welcome-Mail) — best effort
  let acState: "ok" | "skipped" | "error" = "skipped";
  try {
    acState = liste
      ? await subscribeWarteliste(data.email, data.vorname || "", liste.tag)
      : await subscribeToAcademy(data.email, data.vorname || "");
  } catch (err) {
    console.error("[akademie-newsletter] AC-Fehler:", err);
    acState = "error";
  }

  // 2) Turso-Spiegel fürs Dashboard — best effort
  let stored = false;
  try {
    stored = await insertLead({
      vorname: data.vorname || "Newsletter",
      nachname: liste ? "Warteliste" : "Abo",
      email: data.email,
      unternehmen: "",
      webseite: "",
      anliegen: liste?.anliegen ?? "Akademie-Newsletter: möchte über neue Kurse & Termine informiert werden.",
      quelle: liste?.quelle ?? "Akademie-Newsletter",
    });
  } catch (err) {
    console.error("[akademie-newsletter] Turso-Fehler:", err);
  }

  // Erfolg, sobald einer der beiden Wege gegriffen hat
  if (acState === "ok" || stored) {
    return NextResponse.json({ ok: true });
  }
  // Nichts konfiguriert/erreichbar → Frontend zeigt freundlichen Fallback
  return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
}
