import { NextResponse } from "next/server";
import { z } from "zod";
import { insertLead } from "@/lib/leads";
import { subscribeWebinar } from "@/lib/activecampaign";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Webinar-Anmeldung "Second Brain"
   - Gleicher Bauplan wie /api/akademie-newsletter: AC-Eintrag (Tag triggert
     die Webinar-Automation mit Zugangslink + Erinnerungen) plus Turso-Spiegel
     fuers Dashboard.
   - Erfolgreich, sobald MINDESTENS einer der beiden Speicher greift.
   - Honeypot "fax", einfaches In-Memory-Rate-Limit pro Lambda-Instanz.
   ────────────────────────────────────────────────────────────────────────── */

const Schema = z.object({
  vorname: z.string().trim().min(1, "Vorname fehlt").max(80),
  email: z
    .string()
    .trim()
    .max(160)
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "E-Mail ungueltig"),
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

  // Honeypot: stilles OK
  if (data.fax) return NextResponse.json({ ok: true });

  // 1) ActiveCampaign — der Tag startet die Webinar-Automation
  let acState: "ok" | "skipped" | "error" = "skipped";
  try {
    acState = await subscribeWebinar(data.email, data.vorname || "");
  } catch (err) {
    console.error("[webinar] AC-Fehler:", err);
    acState = "error";
  }

  // 2) Turso-Spiegel fuers Dashboard — best effort
  let stored = false;
  try {
    stored = await insertLead({
      vorname: data.vorname || "Webinar",
      nachname: "Anmeldung",
      email: data.email,
      unternehmen: "",
      webseite: "",
      anliegen: "Webinar-Anmeldung: Second Brain für Claude, 12.08.2026.",
      quelle: "Webinar Second Brain",
    });
  } catch (err) {
    console.error("[webinar] Turso-Fehler:", err);
  }

  if (acState === "ok" || stored) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
}
