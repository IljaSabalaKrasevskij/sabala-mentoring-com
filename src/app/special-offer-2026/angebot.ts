import { WEBKURS_PREIS } from "@/components/webkurs/daten";

/* Special Offer 2026: Kassen und Gutscheinpreise an einer Stelle, für Seite und Umschalter.
   Die Statt-Preise kommen aus den Kursseiten (KURS_PREIS in cohorts.ts, WEBKURS_PREIS in webkurs/daten.ts). */
export const KASSE_SB = "https://sabala-mentoring.thrivecart.com/gutschein-2027-second-brain/";
export const KASSE_WEB = "https://sabala-mentoring.thrivecart.com/gutschein-2027-webseiten-kurs/";
// ponytail: Ilja ließ 197 oder 198 offen. 197 passt zur Preisleiter 97 / 397 und hält die Ersparnis über 50 %.
export const PREIS_SB = 197;
export const PREIS_WEB = WEBKURS_PREIS / 2;
/* Festes Leerzeichen: Zahl und € brechen nie getrennt um. */
export const euro = (n: number) => `${n.toLocaleString("de-DE")} €`;
