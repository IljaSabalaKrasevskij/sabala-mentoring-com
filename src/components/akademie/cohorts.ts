/* Einzige Quelle der Wahrheit fuer die Akademie-Laeufe ("Kohorten").
   WorkshopHeader, Termine und CourseGrid lesen HIER, statt
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

/* Kurspreis netto in Euro: einmal oder in zwei Raten. Quelle: Vault, Sabala_Mentoring/Preise. */
export const KURS_PREIS = 397;
export const KURS_RATE = 203;

/* Freiwillig zum Bonus: gemeinsame Einrichtung des Social Media Cockpits, netto in Euro.
   Eine Stelle fuer SocialCockpitBonus, Termine und die Fragen. */
export const COCKPIT_EINRICHTUNG_PREIS = 290;

/* Beratungsstunde, netto in Euro: Einführungspreis, regulärer Preis und der Gutschein für den
   Second-Brain-Kurs, der zum Kauf gehört. Eine Stelle für /beratung und die Übersichtsseite.
   Quelle: Vault, Sabala_Mentoring/Preise. */
export const BERATUNG_PREIS = 97;
export const BERATUNG_PREIS_REGULAER = 200;
export const BERATUNG_GUTSCHEIN = 120;

/* So heissen die drei Termine auf der Kursseite /akademie und der Übersichtsseite /akademie-hub,
   in der Reihenfolge von `sessions`. Die Labels in COHORTS bleiben fuer Startseite und Beratung, wie sie sind. */
export const TERMIN_NAMEN = ["Workshop 1", "Workshop 2", "Fragestunde"];

export function formatSessionDate(date: string) {
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "short", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function formatShortDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
}

/* "14:00 bis 16:30 Uhr MEZ": auf der Kursseite ohne Strich, das liest sich leichter. */
export const zeitText = (time: string) => time.replace("–", " bis ");

/* "27. November", fuer Kopf und Handy-Leiste. */
export function formatTagMonat(date: string) {
  return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

/* Beginn und Ende einer Session als ISO-Zeit mit Berliner Versatz (+01:00 im Winter, +02:00 im Sommer).
   Fuer die maschinenlesbaren Angaben an Google und KI-Suchen (JSON-LD). Bricht den Bau ab, wenn die
   Uhrzeit nicht lesbar ist: lieber kein Bau als ein falscher Termin in der Suche. */
export function sessionZeiten(s: { date: string; time: string }) {
  const [von, bis] = s.time.match(/\d{2}:\d{2}/g) ?? [];
  if (!von || !bis) throw new Error(`Session-Zeit nicht lesbar: ${s.time}`);
  const versatz = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Berlin", timeZoneName: "longOffset" })
    .formatToParts(new Date(`${s.date}T12:00:00Z`))
    .find((p) => p.type === "timeZoneName")!
    .value.replace("GMT", "");
  return { start: `${s.date}T${von}:00${versatz}`, ende: `${s.date}T${bis}:00${versatz}` };
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
