import { after, NextResponse } from "next/server";
import { acAbmelden } from "@/lib/activecampaign";
import { ipAus } from "@/lib/botschutz";
import { ipNormal, vermerken } from "@/lib/einwilligung";
import { getClient } from "@/lib/leads";
import { abmelden } from "@/lib/strecken";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Abmelden aus einer Mail.
   GET kommt vom Link in der Mail, oder von einem Virenscanner, der Links vorab öffnet (in Firmen üblich).
   Darum meldet GET niemanden ab, er führt nur auf die Seite mit dem Knopf.
   POST meldet ab: vom Knopf auf der Seite oder als Ein-Klick-Abmeldung aus dem Mailprogramm
   (RFC 8058: Kopfzeilen List-Unsubscribe und List-Unsubscribe-Post, Körper „List-Unsubscribe=One-Click“).
   t=probe kommt aus Test-Mails: Es zeigt den Weg, meldet aber niemanden ab.
   ────────────────────────────────────────────────────────────────────────── */

const TOKEN = /^[A-Za-z0-9_-]{20,64}$/;

export function GET(req: Request) {
  const url = new URL(req.url);
  return NextResponse.redirect(new URL(`/newsletter/abmelden?t=${encodeURIComponent(url.searchParams.get("t") ?? "")}`, url), 303);
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const t = url.searchParams.get("t") ?? "";
  const einKlick = (await req.text().catch(() => "")).includes("List-Unsubscribe=One-Click");
  let ok = t === "probe";
  if (!ok && TOKEN.test(t)) {
    const db = getClient();
    try {
      const r = db ? await abmelden(db, t, ipNormal(ipAus(req)), einKlick ? "Ein-Klick-Abmeldung im Mailprogramm" : "Abmelde-Knopf auf der Webseite") : null;
      if (r && db) {
        ok = true;
        // Auch bei ActiveCampaign, solange es parallel läuft. Nach der Antwort: Der Klick wartet nicht auf fremde Server.
        // Drei Versuche gegen kurze Störungen. Scheitern alle, steht „error“ im Protokoll (Sabala Mail zeigt es am Kontakt).
        after(async () => {
          let stand = await acAbmelden(r.email);
          for (const warten of [2000, 6000]) {
            if (stand !== "error") break;
            await new Promise((ok) => setTimeout(ok, warten));
            stand = await acAbmelden(r.email);
          }
          await vermerken(db, r.einwilligung_id, "werkzeug", `Abmeldung im Newsletter-Werkzeug: ${stand}`).catch(() => {});
        });
      }
    } catch (err) {
      console.error("[newsletter/abmelden] Fehler:", err);
    }
  }
  if (einKlick) return new NextResponse(null, { status: ok ? 200 : 400 });
  const ziel = !ok ? "/newsletter/abmelden?fehler=1" : t === "probe" ? "/newsletter/abgemeldet?probe=1" : "/newsletter/abgemeldet";
  return NextResponse.redirect(new URL(ziel, url), 303);
}
