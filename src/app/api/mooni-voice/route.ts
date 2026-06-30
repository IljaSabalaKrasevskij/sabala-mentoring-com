import { NextResponse } from "next/server";
import { z } from "zod";
import { insertLead } from "@/lib/leads";
import { subscribeMooniVoice } from "@/lib/activecampaign";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Mooni-Voice-Anmeldung (Open-Source-Leadmagnet)
   - Nimmt E-Mail + Vorname entgegen (Download gegen E-Mail).
   - Traegt den Kontakt in ActiveCampaign ein (Mooni-Liste 28 → Welcome-Mail).
   - Spiegelt die Anmeldung in die Turso-DB (quelle "Mooni Voice"), damit das
     Dashboard sie sieht und nichts verloren geht.
   - Erfolgreich, sobald MINDESTENS einer der beiden Speicher greift.
   - Honeypot "fax", einfaches In-Memory-Rate-Limit.
   Spiegelt bewusst /api/akademie-newsletter (gleiches Muster).
   ────────────────────────────────────────────────────────────────────────── */

const Schema = z.object({
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

  // Honeypot: stilles OK
  if (data.fax) return NextResponse.json({ ok: true });

  // 1) ActiveCampaign (Mooni-Liste + Welcome-Mail) — best effort
  let acState: "ok" | "skipped" | "error" = "skipped";
  try {
    acState = await subscribeMooniVoice(data.email, data.vorname || "");
  } catch (err) {
    console.error("[mooni-voice] AC-Fehler:", err);
    acState = "error";
  }

  // 2) Turso-Spiegel fürs Dashboard — best effort
  let stored = false;
  try {
    stored = await insertLead({
      vorname: data.vorname || "Mooni",
      nachname: "Download",
      email: data.email,
      unternehmen: "",
      webseite: "",
      anliegen: "Mooni Voice: hat die Open-Source-App heruntergeladen.",
      quelle: "Mooni Voice",
    });
  } catch (err) {
    console.error("[mooni-voice] Turso-Fehler:", err);
  }

  // Erfolg, sobald einer der beiden Wege gegriffen hat
  if (acState === "ok" || stored) {
    return NextResponse.json({ ok: true });
  }
  // Nichts konfiguriert/erreichbar → Frontend laesst den Download trotzdem zu
  return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
}
