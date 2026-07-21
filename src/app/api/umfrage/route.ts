import { NextResponse } from "next/server";
import { z } from "zod";
import { insertSurveyResponse } from "@/lib/survey";
import { tagContact } from "@/lib/activecampaign";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Umfrage-Endpoint — "Wo willst du mit KI hin?"
   - Nimmt eine strukturierte Antwort entgegen (Rolle, Modelle, Themen, Ziele,
     Freitext-Problem) + E-Mail.
   - Schreibt in Turso (survey_responses) → Dashboard-Analyse.
   - Taggt den Kontakt in ActiveCampaign ("Umfrage ausgefuellt") — best effort,
     ohne Listen-Zwang (auch fuer Bestandskunden sauber).
   - Pusht eine ntfy-Notification, damit Ilja neue Antworten sofort mitbekommt.
   - Erfolgreich, sobald der Turso-Write greift. Honeypot "fax", Rate-Limit.
   ────────────────────────────────────────────────────────────────────────── */

const Str = (max: number) => z.string().trim().max(max);
const MultiChoice = z.array(z.string().trim().max(80)).max(20).default([]);

const Schema = z.object({
  vorname: Str(80).default(""),
  email: z
    .string()
    .trim()
    .max(160)
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "E-Mail ungueltig"),
  rolle: Str(120).default(""),
  techLevel: Str(120).default(""),
  modelle: MultiChoice,
  themen: MultiChoice,
  ziele: MultiChoice,
  problem: Str(2000).default(""),
  kontext: Str(2000).default(""),
  quelle: Str(60).default("Umfrage-Newsletter"),
  fax: z.string().max(0).optional().default(""), // Honeypot
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

async function pushNtfy(email: string, vorname: string, rolle: string, quelle: string): Promise<void> {
  const NTFY_TOPIC = process.env.NTFY_TOPIC;
  const NTFY_SERVER = process.env.NTFY_SERVER || "https://ntfy.sh";
  if (!NTFY_TOPIC) return;
  try {
    await fetch(NTFY_SERVER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: NTFY_TOPIC,
        title: "Neue Umfrage-Antwort",
        message: `${vorname || "Jemand"}${rolle ? ` (${rolle})` : ""}\n${email}\n\n— via ${quelle}`,
        tags: ["clipboard", "sparkles"],
        priority: 4,
      }),
    });
  } catch (err) {
    console.error("[umfrage] ntfy-Fehler:", err);
  }
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
  const d = parsed.data;

  // Honeypot: stilles OK
  if (d.fax) return NextResponse.json({ ok: true });

  // 1) Turso-Write — das ist die Wahrheit fuers Dashboard
  let stored = false;
  try {
    stored = await insertSurveyResponse({
      email: d.email,
      vorname: d.vorname,
      rolle: d.rolle,
      techLevel: d.techLevel,
      modelle: d.modelle,
      themen: d.themen,
      ziele: d.ziele,
      problem: d.problem,
      kontext: d.kontext,
      quelle: d.quelle,
    });
  } catch (err) {
    console.error("[umfrage] Turso-Fehler:", err);
  }

  // 2) AC-Tag + 3) ntfy — best effort, parallel, blockieren den Erfolg nicht
  const tag = process.env.AC_UMFRAGE_TAG || "Umfrage ausgefuellt";
  await Promise.allSettled([
    tagContact(d.email, d.vorname, tag).catch((e) => console.error("[umfrage] AC-Fehler:", e)),
    pushNtfy(d.email, d.vorname, d.rolle, d.quelle),
  ]);

  if (stored) return NextResponse.json({ ok: true });
  return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
}
