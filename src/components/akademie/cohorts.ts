/* Einzige Quelle der Wahrheit fuer die Akademie-Laeufe ("Kohorten").
   WorkshopHeader, PriceBlock, Termine und CourseCalendar lesen HIER, statt
   Termine selbst zu hartkodieren. Neuer Lauf = ein Eintrag mehr.
   Etappe 1: status manuell. Etappe 2 leitet status aus verkauften Plaetzen ab. */

export type CohortStatus = "offen" | "fast voll" | "ausgebucht";

export type Cohort = {
  id: string; // stabile ID, z.B. "second-brain-2026-07-09"
  start: string; // ISO-Datum Session 1
  sessions: { label: string; date: string; time: string }[];
  capacity: number;
  checkoutUrl: string; // eigenes ThriveCart-Produkt pro Lauf
  status: CohortStatus;
};

export const COHORTS: Cohort[] = [
  // Lauf Okt 2026 (8.10. + 15.10.) am 30.10.2026 entfernt: ist gelaufen, der naechste steht noch nicht fest.
  // Historie steht im Vault, nicht hier. Diese Liste zeigt ausschliesslich buchbare Laeufe.
  // Leere Liste = Warteliste: /akademie zeigt dann statt Kauf-Knoepfen das Anmeldeformular.
];

export const BUCHBAR = COHORTS.length > 0;

/* Termin-Chips im Kopf und im Preisblock. */
export const TERMIN_CHIPS = COHORTS[0]?.sessions ?? [
  { label: "Nächster Lauf", date: "Termin folgt", time: "Warteliste offen" },
];

export const STATUS_LABEL: Record<CohortStatus, string> = {
  offen: "Plätze frei",
  "fast voll": "Nur noch wenige Plätze",
  ausgebucht: "Ausgebucht",
};

export const STATUS_COLOR: Record<CohortStatus, string> = {
  offen: "#7bbf6a",
  "fast voll": "#d4ae5a",
  ausgebucht: "rgba(250,248,245,0.4)",
};
