import { NextResponse } from "next/server";
import { z } from "zod";
import { insertLead } from "@/lib/leads";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Kontakt-Endpoint
   - Validiert die Eingabe (zod), Honeypot gegen Bots, einfaches Rate-Limit.
   - Schreibt die Anfrage in den Lead-Speicher (Turso/libSQL) -> Dashboard-Pipeline.
   - Pusht eine ntfy-Notification, damit Ilja neue Anfragen sofort mitbekommt.
     Gleicher Kanal wie /api/audit-request und /api/umfrage.
   - Wenn Turso nicht konfiguriert ist, antwortet die Route mit 503; das
     Frontend faellt dann sichtbar auf mailto zurueck (kein stiller Verlust).

   Benoetigte Env-Variablen (Vercel, Production):
     TURSO_DATABASE_URL   libsql://<db>-<org>.turso.io
     TURSO_AUTH_TOKEN     Turso-Datenbank-Token
     NTFY_TOPIC           ntfy-Topic fuer den Push aufs Handy
     NTFY_SERVER          optional, Default https://ntfy.sh
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

async function notify(data: z.infer<typeof Schema>): Promise<void> {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) {
    // Laut, nicht still: ein fehlender Kanal hat hier schon einmal monatelang
    // dafuer gesorgt, dass Anfragen unbemerkt liegen blieben.
    console.error("[kontakt] NTFY_TOPIC fehlt - Anfrage gespeichert, aber keine Benachrichtigung verschickt");
    return;
  }
  const server = process.env.NTFY_SERVER || "https://ntfy.sh";

  const message = `${data.vorname} ${data.nachname}${data.unternehmen ? ` (${data.unternehmen})` : ""}\n${data.email}${data.webseite ? `\n${data.webseite}` : ""}\nSeite: ${data.quelle || "Website"}\n\n${data.anliegen.slice(0, 500)}`;

  try {
    // JSON-Mode wie in /api/audit-request: umgeht Header-Encoding-Probleme mit Umlauten.
    const res = await fetch(server, {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic,
        title: "Neue Website-Anfrage",
        message,
        tags: ["envelope"],
        priority: 4,
      }),
    });
    if (!res.ok) {
      console.error("[kontakt] ntfy-Fehler:", res.status, (await res.text()).slice(0, 200));
    }
  } catch (err) {
    // Benachrichtigung ist best-effort; die Anfrage liegt sicher in der Datenbank.
    console.error("[kontakt] ntfy nicht erreichbar:", err);
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
    await notify(data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[kontakt] Lead-Speicher-Fehler:", err);
    return NextResponse.json({ ok: false, reason: "store_failed" }, { status: 502 });
  }
}
