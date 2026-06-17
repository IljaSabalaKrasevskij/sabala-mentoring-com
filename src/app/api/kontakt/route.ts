import { NextResponse } from "next/server";
import { z } from "zod";
import { insertLead } from "@/lib/leads";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Kontakt-Endpoint
   - Validiert die Eingabe (zod), Honeypot gegen Bots, einfaches Rate-Limit.
   - Schreibt die Anfrage in den Lead-Speicher (Turso/libSQL) -> Dashboard-Pipeline.
   - Benachrichtigt per WhatsApp (CallMeBot), best-effort.
   - Wenn Turso nicht konfiguriert ist, antwortet die Route mit 503; das
     Frontend faellt dann sichtbar auf mailto zurueck (kein stiller Verlust).

   Benoetigte Env-Variablen (Vercel, Production):
     TURSO_DATABASE_URL   libsql://<db>-<org>.turso.io
     TURSO_AUTH_TOKEN     Turso-Datenbank-Token
     CALLMEBOT_PHONE      z.B. +995591443665   (optional, fuer WhatsApp-Push)
     CALLMEBOT_APIKEY     CallMeBot-API-Key     (optional)
   ────────────────────────────────────────────────────────────────────────── */

const Schema = z.object({
  vorname: z.string().trim().min(1, "Vorname fehlt").max(80),
  nachname: z.string().trim().min(1, "Nachname fehlt").max(80),
  email: z
    .string()
    .trim()
    .max(160)
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "E-Mail ungueltig"),
  unternehmen: z.string().trim().max(160).optional().default(""),
  webseite: z.string().trim().max(200).optional().default(""),
  anliegen: z.string().trim().min(5, "Bitte ein paar Worte mehr").max(4000),
  quelle: z.string().trim().max(200).optional().default(""),
  // Honeypot: Feld "fax" muss leer bleiben
  fax: z.string().max(0).optional().default(""),
});

// Best-effort In-Memory-Rate-Limit (pro Lambda-Instanz): 5 Anfragen / 10 Min / IP
const HITS = new Map<string, number[]>();
const LIMIT = 5;
const WINDOW = 10 * 60 * 1000;

function rateLimited(ip: string, now: number): boolean {
  const arr = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW);
  arr.push(now);
  HITS.set(ip, arr);
  return arr.length > LIMIT;
}

async function notifyWhatsApp(data: z.infer<typeof Schema>): Promise<void> {
  const phone = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apikey) return;

  const text = `Neue Website-Anfrage\nVon: ${data.vorname} ${data.nachname}${data.unternehmen ? ` (${data.unternehmen})` : ""}\nMail: ${data.email}${data.webseite ? `\nWeb: ${data.webseite}` : ""}\nSeite: ${data.quelle || "Website"}\n\n${data.anliegen}`;
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&apikey=${encodeURIComponent(apikey)}&text=${encodeURIComponent(text)}`;
  try {
    await fetch(url, { method: "GET" });
  } catch {
    // Benachrichtigung ist best-effort; die Anfrage liegt sicher in Notion.
  }
}

export async function POST(req: Request) {
  // 1) Rate-Limit
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip, Date.now())) {
    return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
  }

  // 2) Parsen + validieren
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 400 });
  }
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, reason: "validation", issues: parsed.error.issues.map((i) => i.message) }, { status: 422 });
  }
  const data = parsed.data;

  // 3) Honeypot: stilles OK, nichts speichern
  if (data.fax) {
    return NextResponse.json({ ok: true });
  }

  // 4) Speichern
  try {
    const stored = await insertLead({
      vorname: data.vorname,
      nachname: data.nachname,
      email: data.email,
      unternehmen: data.unternehmen,
      webseite: data.webseite,
      anliegen: data.anliegen,
      quelle: data.quelle || "Website",
    });
    if (!stored) {
      // Backend noch nicht konfiguriert → Frontend nutzt mailto-Fallback
      return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
    }
    await notifyWhatsApp(data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[kontakt] Lead-Speicher-Fehler:", err);
    return NextResponse.json({ ok: false, reason: "store_failed" }, { status: 502 });
  }
}
