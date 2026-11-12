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
   in der Reihenfolge von `sessions`. Die Labels in COHORTS bleiben fuer die Startseite, wie sie sind. */
export const TERMIN_NAMEN = ["Workshop 1", "Workshop 2", "Fragestunde"];

/* Die Eckdaten des laufenden Kurses als kurze Punkte für Karten (Akademie-Übersicht und Startseite).
   Zwei Workshops in einer Zeile, die Fragestunde in der zweiten: die Uhrzeiten stehen auf der Kursseite.
   Hat ein Lauf einmal nicht genau drei Termine, steht jeder in einer eigenen Zeile. Ohne buchbaren Lauf: Warteliste. */
export function kursPunkte(): string[] {
  if (!CURRENT_COHORT) return ["Zwei Live-Workshops und eine Fragestunde", "Kleine Runde, live per Zoom", "Auf der Warteliste erfährst du den Termin zuerst"];
  const { sessions, capacity } = CURRENT_COHORT;
  const tage = sessions.map((s) => formatTagMonat(s.date));
  const termine = tage.length === 3 ? [`Workshops am ${tage[0]} und ${tage[1]}`, `${TERMIN_NAMEN[2]} am ${tage[2]}`] : tage.map((t, i) => `${TERMIN_NAMEN[i] ?? sessions[i].label}: ${t}`);
  return [...termine, `Kleine Runde, maximal ${capacity} Plätze`];
}

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
