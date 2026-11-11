import { NextResponse } from "next/server";
import { z } from "zod";
import { insertSurveyResponse } from "@/lib/survey";
import { tagContact } from "@/lib/activecampaign";
import { FELDER } from "@/lib/anmeldung";
import { ipAus, jsonAus, siegelAbsage, siegelPruefen } from "@/lib/botschutz";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Umfrage-Endpoint — "Wo willst du mit KI hin?"
   - Nimmt eine strukturierte Antwort entgegen (Rolle, Modelle, Themen, Ziele,
     Freitext-Problem) + E-Mail.
   - Schreibt in Turso (survey_responses) → Dashboard-Analyse.
   - Taggt den Kontakt in ActiveCampaign ("Umfrage ausgefuellt") — best effort,
     ohne Listen-Zwang (auch fuer Bestandskunden sauber).
   - Pusht eine ntfy-Notification, damit Ilja neue Antworten sofort mitbekommt.
   - Erfolgreich, sobald der Turso-Write greift.
   - Botschutz: unsichtbares Feld, Stempel und Obergrenze (src/lib/botschutz.ts).
   ────────────────────────────────────────────────────────────────────────── */

const Str = (max: number) => z.string().trim().max(max);
const MultiChoice = z.array(z.string().trim().max(80)).max(20).default([]);

const Schema = z.object({
  // freiwillig, aber nur Buchstaben: Der Vorname steht in der Auswertung und in der Nachricht aufs Handy
  vorname: z.union([z.literal(""), FELDER.vorname]).default(""),
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
  fax: z.string().max(200).optional().default(""), // unsichtbares Feld: gefüllt wird still quittiert, nicht abgelehnt
});

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
  const ip = ipAus(req);

  const json = await jsonAus(req);
  if (json === undefined) return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 400 });
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, reason: "validation" }, { status: 422 });
  }
  const d = parsed.data;

  // Botschutz: unsichtbares Feld gefüllt → stilles OK. Dann der Stempel.
  if (d.fax) return NextResponse.json({ ok: true });
  const urteil = await siegelPruefen(ip, json);
  if (urteil !== "ok") return siegelAbsage(urteil);

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
    tagContact(d.email, tag).catch((e) => console.error("[umfrage] AC-Fehler:", e)),
    pushNtfy(d.email, d.vorname, d.rolle, d.quelle),
  ]);

  if (stored) return NextResponse.json({ ok: true });
  return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
}
