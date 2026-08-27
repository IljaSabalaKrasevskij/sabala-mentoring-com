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
  // Lauf Aug 2026 (21.8. + 28.8.) am 27.8.2026 entfernt: laeuft bereits, nicht mehr buchbar.
  // Historie steht im Vault, nicht hier. Diese Liste zeigt ausschliesslich buchbare Laeufe.
  {
    id: "second-brain-2026-09-24",
    start: "2026-09-24",
    sessions: [
      { label: "Session 1", date: "Do · 24. September 2026", time: "15-17:30 Uhr" },
      { label: "Session 2", date: "Fr · 2. Oktober 2026", time: "15-17:30 Uhr" },
    ],
    capacity: 10,
    checkoutUrl: "https://sabala-mentoring.thrivecart.com/ki-kurs-claude-memorysystem-sep-26/",
    status: "offen",
  },
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
