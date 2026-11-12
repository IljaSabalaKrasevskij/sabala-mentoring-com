import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { acStand, activeCampaignConfigured } from "@/lib/activecampaign";
import { BASIS } from "@/lib/anmeldung";
import { vorbereiten } from "@/lib/einwilligung";
import { getClient } from "@/lib/leads";
import { mailBereit, streckenMailSenden } from "@/lib/mail";
import { takt } from "@/lib/strecken";

export const runtime = "nodejs";
export const maxDuration = 60;

/* ──────────────────────────────────────────────────────────────────────────
   Der Takt der Strecken (src/lib/strecken.ts). Vercel ruft ihn alle fünf Minuten auf (vercel.json, crons)
   und schickt dabei den Schlüssel CRON_SECRET mit. Ohne diesen Schlüssel läuft nichts: So kann niemand von
   außen Mails anstoßen. Der Mac muss dafür nicht an sein.

   Env (Vercel, Production):
     CRON_SECRET        Pflicht. Zufallswert, Vercel schickt ihn als „Authorization: Bearer …“ mit.
     STRECKEN_TEST_AN   optional. Test-Postfach für Strecken im Testmodus, Standard: das Absender-Postfach (SMTP_USER).
   ────────────────────────────────────────────────────────────────────────── */

const gleich = (a: string, b: string) => {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export async function GET(req: Request) {
  const geheim = process.env.CRON_SECRET;
  if (!geheim) {
    console.error("[strecken] CRON_SECRET fehlt, der Takt läuft nicht.");
    return NextResponse.json({ ok: false, grund: "nicht eingerichtet" }, { status: 503 });
  }
  if (!gleich(req.headers.get("authorization") ?? "", `Bearer ${geheim}`)) return NextResponse.json({ ok: false }, { status: 401 });

  const db = getClient();
  if (!db || !mailBereit()) return NextResponse.json({ ok: false, grund: "Datenbank oder Postfach fehlt" }, { status: 503 });
  try {
    await vorbereiten(db); // die Tabellen der Einwilligung, falls die Datenbank frisch ist
    const ergebnis = await takt(db, {
      senden: (m) => streckenMailSenden(m, BASIS),
      testAn: process.env.STRECKEN_TEST_AN || process.env.SMTP_USER!,
      pruefen: activeCampaignConfigured() ? acStand : undefined,
    });
    if (ergebnis.eingetragen || ergebnis.gesendet || ergebnis.gestoppt || ergebnis.fehler) console.info("[strecken] Takt:", ergebnis);
    return NextResponse.json({ ok: true, ...ergebnis });
  } catch (err) {
    console.error("[strecken] Takt gescheitert:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
