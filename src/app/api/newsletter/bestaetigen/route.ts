import { NextResponse } from "next/server";
import { einwilligungBestaetigen, ipAus } from "@/lib/anmeldung";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Klick auf den Link in der Bestätigungsmail (Double-Opt-in, Schritt 2).
   Macht die Einwilligung „aktiv“, hält Zeit und IP des Klicks fest und trägt den
   Kontakt erst jetzt ins Newsletter-Werkzeug ein. Danach geht es auf eine Dankeseite.

   ponytail: Der Link bestätigt direkt, ohne Zwischenseite mit Knopf. Sollten Mail-Scanner,
   die Links vorab öffnen, zum Thema werden: hier eine Seite mit Knopf davorsetzen.
   ────────────────────────────────────────────────────────────────────────── */

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("t") ?? "";
  let ok = false;
  try {
    // Echte Token sind 32 Zeichen base64url. Alles andere muss die Datenbank gar nicht erst sehen.
    ok = /^[A-Za-z0-9_-]{20,64}$/.test(token) && (await einwilligungBestaetigen(token, ipAus(req)));
  } catch (err) {
    console.error("[newsletter/bestaetigen] Fehler:", err);
  }
  return NextResponse.redirect(new URL(ok ? "/newsletter/bestaetigt" : "/newsletter/link-ungueltig", url), 303);
}
