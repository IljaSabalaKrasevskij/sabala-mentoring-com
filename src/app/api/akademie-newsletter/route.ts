import { NextResponse } from "next/server";
import { z } from "zod";
import { insertLead } from "@/lib/leads";
import { subscribeToAcademy } from "@/lib/activecampaign";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Akademie-Newsletter-Anmeldung
   - Nimmt eine E-Mail entgegen, optional einen Vornamen.
   - Trägt den Kontakt in ActiveCampaign ein (Akademie-Liste → Welcome-Mail),
     sofern AC konfiguriert ist.
   - Spiegelt die Anmeldung zusätzlich in die Turso-DB (quelle "Akademie-Newsletter"),
     damit das Dashboard sie sieht und nichts verloren geht.
   - Erfolgreich, sobald MINDESTENS einer der beiden Speicher greift.
   - Honeypot "fax", einfaches In-Memory-Rate-Limit.
   ────────────────────────────────────────────────────────────────────────── */

const Schema = z.object({
  email: z
    .string()
    .trim()
    .max(160)
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "E-Mail ungueltig"),
  vorname: z.string().trim().max(80).optional().default(""),
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

  // 1) ActiveCampaign (Newsletter + Welcome-Mail) — best effort
  let acState: "ok" | "skipped" | "error" = "skipped";
  try {
    acState = await subscribeToAcademy(data.email, data.vorname || "");
  } catch (err) {
    console.error("[akademie-newsletter] AC-Fehler:", err);
    acState = "error";
  }

  // 2) Turso-Spiegel fürs Dashboard — best effort
  let stored = false;
  try {
    stored = await insertLead({
      vorname: data.vorname || "Newsletter",
      nachname: "Abo",
      email: data.email,
      unternehmen: "",
      webseite: "",
      anliegen: "Akademie-Newsletter: möchte über neue Kurse & Termine informiert werden.",
      quelle: "Akademie-Newsletter",
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
