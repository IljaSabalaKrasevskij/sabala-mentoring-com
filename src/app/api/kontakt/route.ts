import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Kontakt-Endpoint
   - Validiert die Eingabe (zod), Honeypot gegen Bots, einfaches Rate-Limit.
   - Schreibt die Anfrage als Seite in eine Notion-Datenbank.
   - Benachrichtigt per WhatsApp (CallMeBot), best-effort.
   - Wenn Notion nicht konfiguriert ist, antwortet die Route mit 503; das
     Frontend faellt dann sichtbar auf mailto zurueck (kein stiller Verlust).

   Benoetigte Env-Variablen (Vercel, Production):
     NOTION_TOKEN        Internal-Integration-Secret (notion.so/my-integrations)
     NOTION_KONTAKT_DB   ID der Datenbank "Website-Anfragen"
     CALLMEBOT_PHONE     z.B. +995591443665   (optional, fuer WhatsApp-Push)
     CALLMEBOT_APIKEY    CallMeBot-API-Key     (optional)

   Erwartetes Notion-DB-Schema (Property-Namen exakt):
     Name (Title) · Email (Email) · Firma (Text) · Anliegen (Text) ·
     Quelle (Text) · Status (Select)
   ────────────────────────────────────────────────────────────────────────── */

const Schema = z.object({
  name: z.string().trim().min(2, "Name zu kurz").max(120),
  email: z
    .string()
    .trim()
    .max(160)
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "E-Mail ungueltig"),
  firma: z.string().trim().max(160).optional().default(""),
  anliegen: z.string().trim().min(5, "Bitte ein paar Worte mehr").max(4000),
  quelle: z.string().trim().max(200).optional().default(""),
  // Honeypot: echtes Feld heisst "website", muss leer bleiben
  website: z.string().max(0).optional().default(""),
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

async function writeToNotion(data: z.infer<typeof Schema>): Promise<boolean> {
  const token = process.env.NOTION_TOKEN;
  const db = process.env.NOTION_KONTAKT_DB;
  if (!token || !db) return false;

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: db },
      properties: {
        Name: { title: [{ text: { content: data.name } }] },
        Email: { email: data.email },
        Firma: { rich_text: [{ text: { content: data.firma || "—" } }] },
        Anliegen: { rich_text: [{ text: { content: data.anliegen } }] },
        Quelle: { rich_text: [{ text: { content: data.quelle || "Website" } }] },
        Status: { select: { name: "Neu" } },
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Notion ${res.status}: ${body.slice(0, 300)}`);
  }
  return true;
}

async function notifyWhatsApp(data: z.infer<typeof Schema>): Promise<void> {
  const phone = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apikey) return;

  const text = `Neue Website-Anfrage\nVon: ${data.name}${data.firma ? ` (${data.firma})` : ""}\nMail: ${data.email}\nSeite: ${data.quelle || "Website"}\n\n${data.anliegen}`;
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
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  // 4) Speichern
  try {
    const stored = await writeToNotion(data);
    if (!stored) {
      // Backend noch nicht konfiguriert → Frontend nutzt mailto-Fallback
      return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
    }
    await notifyWhatsApp(data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[kontakt] Notion-Fehler:", err);
    return NextResponse.json({ ok: false, reason: "store_failed" }, { status: 502 });
  }
}
