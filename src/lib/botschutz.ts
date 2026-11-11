import { NextResponse } from "next/server";
import { createHmac, randomBytes } from "node:crypto";
import { absenderNetz } from "@/lib/einwilligung";
import { getClient } from "@/lib/leads";
import { siegelAusstellen, siegelEinloesen, type SiegelUrteil } from "@/lib/siegel";

/* ──────────────────────────────────────────────────────────────────────────
   Botschutz für alle Formulare, in drei Schichten. Jede Route ruft dieselben zwei Zeilen auf.

   1. Unsichtbares Feld „fax“: Menschen sehen es nicht, einfache Roboter füllen es aus.
      Antwort: stilles OK, gespeichert wird nichts. So merkt der Roboter nicht, dass er aufgefallen ist.
   2. Stempel (siegel.ts): Ohne geladene Seite, drei Sekunden Zeit und einen unbenutzten Stempel nimmt keine Route etwas an.
   3. Obergrenze je Absender und Stunde, gezählt in der Datenbank beim Einlösen des Stempels.

   Der Schlüssel für die Unterschrift: FORMULAR_SCHLUESSEL, wenn gesetzt. Sonst wird er aus dem Datenbank-Token
   abgeleitet, damit bei Vercel nichts Neues einzutragen ist. Abgeleitet heißt: Aus einem Stempel lässt sich das Token
   nicht zurückrechnen. Ohne beides (lokale Probe ohne Turso) gilt ein Zufallsschlüssel je Prozess.
   Vorschau-Bauten bei Vercel haben keine Datenbank und nichts zu schützen. Dort gilt ein fester, öffentlicher Wert,
   damit alle Server-Instanzen denselben Stempel erkennen und die Vorschau sich wie die echte Seite anfühlt.
   ────────────────────────────────────────────────────────────────────────── */

const GEHEIM = process.env.FORMULAR_SCHLUESSEL || process.env.TURSO_AUTH_TOKEN || (process.env.VERCEL_ENV === "preview" ? "vorschau-ohne-geheimnis" : "");
if (!GEHEIM && process.env.VERCEL) {
  console.error("[formular] Kein Schlüssel für den Stempel (FORMULAR_SCHLUESSEL oder TURSO_AUTH_TOKEN). Formulare können ausfallen.");
}
const SCHLUESSEL = createHmac("sha256", GEHEIM || randomBytes(32)).update("formular-siegel-v1").digest("base64url");

export const ipAus = (req: Request) => req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

/**
 * Liest den Körper einer Formular-Anfrage. undefined, wenn er kein JSON ist oder nicht als JSON angekündigt wurde.
 * Der Kopf zählt: Eine fremde Webseite kann die Browser ihrer Besucher nur „einfache“ Inhaltsarten abschicken lassen
 * (Text, Formular). Für application/json fragt der Browser vorher nach, und diese Nachfrage beantworten wir nicht.
 * Ohne die Prüfung könnte eine fremde Seite über ihre Besucher Formulare abschicken: Gezählt würde deren Anschluss,
 * die Obergrenze je Absender liefe ins Leere, und die Besucher wären danach eine Stunde ausgesperrt.
 */
export async function jsonAus(req: Request): Promise<unknown> {
  if (!/^application\/json\b/i.test(req.headers.get("content-type") ?? "")) return undefined;
  try {
    return await req.json();
  } catch {
    return undefined;
  }
}

export const siegelNeu = () => siegelAusstellen(SCHLUESSEL);

/** Prüft den Stempel aus der Anfrage und löst ihn ein. Erst nach der Feldprüfung aufrufen: Ein Tippfehler soll keinen Stempel kosten. */
export async function siegelPruefen(ip: string, json: unknown): Promise<SiegelUrteil> {
  const wert = (json as { siegel?: unknown } | null)?.siegel;
  try {
    return await siegelEinloesen(getClient(), SCHLUESSEL, wert, absenderNetz(ip));
  } catch (err) {
    // Datenbank weg: Unterschrift und Alter gelten weiter. Lieber setzt die Obergrenze kurz aus, als dass alle Formulare zu sind.
    console.error("[formular] Stempel-Speicher nicht erreichbar, Einmal-Schutz und Obergrenze setzen aus:", err);
    return siegelEinloesen(null, SCHLUESSEL, wert, "");
  }
}

/** Antwort bei ungültigem Stempel. Die Seite holt sich dann einen neuen und versucht es einmal erneut. */
export const siegelAbsage = (urteil: SiegelUrteil) =>
  NextResponse.json({ ok: false, reason: "siegel", urteil }, { status: urteil === "zu-viele" ? 429 : 400 });
