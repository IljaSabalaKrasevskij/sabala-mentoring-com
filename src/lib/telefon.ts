import { parsePhoneNumberFromString } from "libphonenumber-js/max";

/* ──────────────────────────────────────────────────────────────────────────
   Telefonnummer prüfen: nur echte Nummern mit Ländervorwahl.

   Geprüft wird gegen die Nummernpläne der Länder (libphonenumber, dieselben Regeln wie im Telefonbuch von Android):
   Länge, Vorwahlbereich und Art der Nummer. Durch kommen Mobil, Festnetz und Internet-Telefonie.
   Abgelehnt werden
   - Nummern ohne Ländervorwahl. Das Formular setzt sie davor, ohne sie ist „0664 …“ nicht eindeutig.
   - teure und unpersönliche Sondernummern (0900, 0180, 0137, 0800, 0700): Niemand soll über das Formular
     einen teuren Rückruf auslösen können.
   - Beispielnummern wie 0151 23456789 oder 0170 1111111: nach Nummernplan gültig, aber erkennbar erfunden.

   Was die Prüfung nicht kann: wissen, ob die Nummer dem Menschen gehört, der sie eintippt. Das ginge nur mit
   einem Code per SMS. Und eine Nummer hinter der falschen Ländervorwahl kann zufällig gültig sein
   (österreichisches Handy 0664 … hinter +49 ist ein deutscher Festnetzanschluss). Darum zeigt das Formular
   die Vorwahl sichtbar neben dem Feld.

   Ohne App-Importe, damit telefon.test.mjs die Datei direkt mit Node laden kann.
   ────────────────────────────────────────────────────────────────────────── */

export const TELEFON_MELDUNG = {
  fehlt: "Bitte gib deine Telefonnummer an.",
  vorwahl: "Bitte gib die Nummer mit Ländervorwahl an, zum Beispiel +49 151 …",
  ungueltig: "Diese Telefonnummer gibt es so nicht. Bitte prüf die Ziffern und die Ländervorwahl.",
  sondernummer: "Bitte gib eine Mobil- oder Festnetznummer an. Sondernummern wie 0800 oder 0900 gehen hier nicht.",
  platzhalter: "Das sieht nach einer Beispielnummer aus. Bitte gib deine echte Nummer an.",
} as const;
export type TelefonFehler = keyof typeof TELEFON_MELDUNG;

const ERLAUBT = new Set(["MOBILE", "FIXED_LINE", "FIXED_LINE_OR_MOBILE", "VOIP"]);

/* ponytail: zwei einfache Muster statt einer Liste bekannter Beispielnummern. Sieben gleiche Ziffern am Stück oder
   sechs auf- oder absteigende. Trifft etwa eine von hunderttausend echten Nummern (Wunschnummern); wer so eine hat,
   liest die Meldung und nimmt seine zweite Nummer. Wird das zum Problem: Schwelle anheben. */
function erfunden(ziffern: string): boolean {
  if (/(\d)\1{6}/.test(ziffern)) return true;
  for (let i = 0; i + 6 <= ziffern.length; i++) {
    const stueck = ziffern.slice(i, i + 6);
    if ("0123456789".includes(stueck) || "9876543210".includes(stueck)) return true;
  }
  return false;
}

/** Liefert die Nummer in einer Schreibweise (+49 1512 3456789) oder sagt, was nicht stimmt. */
export function telefonPruefen(roh: string): { nummer: string } | { fehler: TelefonFehler } {
  const text = roh.trim().replace(/^00/, "+");
  if (text.replace(/\D/g, "").length < 5) return { fehler: "fehlt" }; // leer oder nur die Vorwahl aus dem Formular
  // Nur Ziffern und übliche Trennzeichen. Buchstaben würde die Bibliothek sonst wie auf einer Telefontastatur in Ziffern umrechnen.
  if (!/^[+0-9 ()/.-]{1,60}$/.test(text)) return { fehler: "ungueltig" };
  if (!text.startsWith("+")) return { fehler: "vorwahl" };
  const n = parsePhoneNumberFromString(text);
  if (!n || !n.isValid()) return { fehler: "ungueltig" };
  if (!ERLAUBT.has(n.getType() ?? "")) return { fehler: "sondernummer" };
  if (erfunden(n.nationalNumber)) return { fehler: "platzhalter" };
  return { nummer: n.formatInternational() };
}
