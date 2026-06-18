import { NextResponse } from "next/server";
import { z } from "zod";
import { insertLead } from "@/lib/leads";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Akademie-Newsletter-Anmeldung (vorbereitet)
   - Nimmt nur eine E-Mail entgegen, optional einen Vornamen.
   - Speichert als Lead (quelle "Akademie-Newsletter") in dieselbe Turso-DB,
     damit keine Anmeldung verloren geht. Der eigentliche Versand kommt später.
   - Honeypot "fax", einfaches In-Memory-Rate-Limit.
   - Turso nicht konfiguriert → 503, Frontend zeigt freundlichen Hinweis.
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

  try {
    const stored = await insertLead({
      vorname: data.vorname || "Newsletter",
      nachname: "Abo",
      email: data.email,
      unternehmen: "",
      webseite: "",
      anliegen: "Akademie-Newsletter: möchte über neue Kurse & Termine informiert werden.",
      quelle: "Akademie-Newsletter",
    });
    if (!stored) {
      return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[akademie-newsletter] Speicher-Fehler:", err);
    return NextResponse.json({ ok: false, reason: "store_failed" }, { status: 502 });
  }
}
