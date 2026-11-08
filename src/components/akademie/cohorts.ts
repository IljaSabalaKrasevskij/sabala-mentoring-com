/* Einzige Quelle der Wahrheit fuer die Akademie-Laeufe ("Kohorten").
   WorkshopHeader, PriceBlock, Termine und CourseCalendar lesen HIER, statt
   Termine selbst zu hartkodieren. Neuer Lauf = ein Eintrag mehr.
   Etappe 1: status manuell. Etappe 2 leitet status aus verkauften Plaetzen ab. */

export type CohortStatus = "offen" | "fast voll" | "ausgebucht";

export type Cohort = {
  id: string; // stabile ID, z.B. "second-brain-2026-07-09"
  start: string; // ISO-Datum Session 1
  sessions: { label: string; date: string; time: string }[]; // date: ISO-Datum
  capacity: number;
  checkoutUrl: string; // eigenes ThriveCart-Produkt pro Lauf
  status: CohortStatus;
};

export const COHORTS: Cohort[] = [
  // Historie steht im Vault, nicht hier. Diese Liste zeigt ausschliesslich buchbare Laeufe.
  // Leere Liste = Warteliste: /akademie zeigt dann statt Kauf-Knoepfen das Anmeldeformular.
  {
    id: "second-brain-2026-11-27",
    start: "2026-11-27",
    sessions: [
      { label: "Session 1", date: "2026-11-27", time: "14:00–16:30 Uhr MEZ" },
      { label: "Session 2", date: "2026-12-04", time: "14:00–16:30 Uhr MEZ" },
      { label: "Q&A-Session", date: "2026-12-10", time: "17:00–18:00 Uhr MEZ" },
    ],
    capacity: 6,
    checkoutUrl: "https://sabala-mentoring.thrivecart.com/ki-kurs-claude-memorysystem-nov-26/",
    status: "offen",
  },
];

export const BUCHBAR = COHORTS.length > 0;
export const CURRENT_COHORT = COHORTS[0];
export const COURSE_CHECKOUT_URL = CURRENT_COHORT?.checkoutUrl ?? "/akademie#termine";

export function formatSessionDate(date: string) {
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "short", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function formatShortDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
}

export const COURSE_SCHEDULE = CURRENT_COHORT?.sessions
  .map((s) => `${s.label}: ${formatSessionDate(s.date)}, ${s.time}`)
  .join("; ") ?? "Nächster Termin folgt";

/* Termin-Chips im Kopf und im Preisblock. */
export const TERMIN_CHIPS = CURRENT_COHORT?.sessions.map((s) => ({
  ...s,
  date: formatSessionDate(s.date),
})) ?? [
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
