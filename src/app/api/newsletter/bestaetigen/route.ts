import { NextResponse } from "next/server";
import { wahlLesen, wahlQuery } from "@/components/skill-pakete/daten";
import { einwilligungBestaetigen } from "@/lib/anmeldung";
import { ipAus } from "@/lib/botschutz";
import { dankeSeite } from "@/lib/quellen";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Klick auf den Link in der Bestätigungsmail (Double-Opt-in, Schritt 2).
   Macht die Einwilligung „aktiv“, hält Zeit und IP des Klicks fest und trägt den
   Kontakt erst jetzt ins Newsletter-Werkzeug ein. Danach geht es auf die Dankeseite des Formulars:
   Leadmagnete haben eine eigene (mit dem Download), alle anderen landen auf der allgemeinen.

   Skill-Pakete: Der Link trägt die Wahl aus dem Formular (pakete, beruf). Gelesen werden nur feste Kürzel (wahlLesen),
   die Dankeseite bekommt dieselbe Wahl. Pfad und Ziel bleiben fest, darum kann auch ein veränderter Link nirgendwohin umleiten.

   ponytail: Der Link bestätigt direkt, ohne Zwischenseite mit Knopf. Sollten Mail-Scanner,
   die Links vorab öffnen, zum Thema werden: hier eine Seite mit Knopf davorsetzen.
   ────────────────────────────────────────────────────────────────────────── */

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("t") ?? "";
  const wahl = wahlLesen(url.searchParams.get("pakete"), url.searchParams.get("beruf"));
  let quelle: string | null = null;
  try {
    // Echte Token sind 32 Zeichen base64url. Alles andere muss die Datenbank gar nicht erst sehen.
    if (/^[A-Za-z0-9_-]{20,64}$/.test(token)) quelle = await einwilligungBestaetigen(token, ipAus(req), wahl);
  } catch (err) {
    console.error("[newsletter/bestaetigen] Fehler:", err);
  }
  if (quelle === null) return NextResponse.redirect(new URL("/newsletter/link-ungueltig", url), 303);
  const ziel = new URL(dankeSeite(quelle), url);
  if (quelle === "skill-paket") ziel.search = wahlQuery(wahl);
  return NextResponse.redirect(ziel, 303);
}
