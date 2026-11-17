import { NextResponse } from "next/server";
import { wahlLesen, wahlQuery } from "@/components/skill-pakete/daten";
import { einwilligungBestaetigen } from "@/lib/anmeldung";
import { ipAus } from "@/lib/botschutz";
import { dankeSeite } from "@/lib/quellen";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Bestätigen aus der Mail (Double-Opt-in, Schritt 2), gebaut wie das Abmelden daneben.
   GET kommt vom Link in der Bestätigungsmail, oder von einem Virenscanner, der Links vorab öffnet
   (in Firmen üblich: Microsoft 365, Proofpoint, Mimecast). Darum bestätigt GET nichts, er führt nur
   auf die Seite mit dem Knopf (/newsletter/bestaetigen).
   POST kommt vom Knopf „Adresse bestätigen“. Erst er macht die Einwilligung „aktiv“, hält Zeit und IP
   dieses Klicks fest und trägt den Kontakt ins Newsletter-Werkzeug ein. Danach geht es auf die Dankeseite
   des Formulars: Leadmagnete haben eine eigene (mit dem Download), alle anderen landen auf der allgemeinen.

   Skill-Pakete: Der Link trägt die Wahl aus dem Formular (pakete, beruf), die Seite reicht sie an den Knopf weiter.
   Gelesen werden nur feste Kürzel (wahlLesen), die Dankeseite bekommt dieselbe Wahl. Pfad und Ziel bleiben fest,
   darum kann auch ein veränderter Link nirgendwohin umleiten.
   ────────────────────────────────────────────────────────────────────────── */

export function GET(req: Request) {
  const url = new URL(req.url);
  return NextResponse.redirect(new URL(`/newsletter/bestaetigen${url.search}`, url), 303);
}

export async function POST(req: Request) {
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
