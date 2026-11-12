/* ──────────────────────────────────────────────────────────────────────────
   Quellen und Nischen: woher eine Anmeldung kommt.

   Jede Anmeldung bringt zwei Angaben ins CRM (Sabala Mail): die Quelle (das Formular oder der Leadmagnet) und die
   Nische (das Thema, für das sich jemand interessiert). Im CRM werden daraus Gruppen für passende Mails, und der
   Trend-Radar zählt neue Anmeldungen je Leadmagnet und je Nische. Hintergrund: Konzept 2027, Abschnitt 7.

   Ein neuer Leadmagnet braucht genau zwei Dinge:
     1. hier eine Zeile unter LEADMAGNETE: Kürzel, Name, Nische und die Dankeseite, auf der man nach dem Klick
        in der Bestätigungsmail landet (dort liegt zum Beispiel der Download)
     2. auf seiner Seite: <AnmeldeForm quelle="kürzel" knopf="…" />
   Den Rest erledigt die Route /api/akademie-newsletter. Sie kennt nur Kürzel aus dieser Liste, schreibt Quelle und Nische
   in den Briefkasten und setzt nach dem Klick in der Bestätigungsmail zwei Tags im Newsletter-Werkzeug:
   „Leadmagnet: <Name>“ und „Nische: <Name>“. An diesen Tags können dort die Willkommens-Strecken hängen.

   Die Nische kommt immer aus dieser Datei, nie aus der Anfrage. Sonst könnte jeder beliebige Werte ins CRM schreiben.
   Läuft auch im Browser (die Formulare lesen die Kürzel), darum ohne Server-Importe.
   ────────────────────────────────────────────────────────────────────────── */

/** Die sechs Nischen aus dem Konzept 2027, dazu der Einstieg für alle. Das Kürzel steht im Briefkasten, der Name im CRM und im Tag. */
export const NISCHEN = {
  "claude-code": "Claude Code",
  "claude-team": "Claude im Team",
  "ki-schulung": "KI-Schulung für Firmen",
  "second-brain": "Second Brain",
  "webseiten-selbst-bauen": "Webseiten selbst bauen",
  "ki-agenten": "KI-Agenten",
  einstieg: "Einstieg und Orientierung",
} as const;
export type Nische = keyof typeof NISCHEN;

/** Leadmagnete mit eigener Seite und eigenem Formular. Das Kürzel ist die Quelle im Briefkasten. */
export const LEADMAGNETE = {
  "startpaket-claude-code": { name: "Claude-Code-Startpaket", nische: "claude-code", danke: "/claude-code/startpaket/danke" },
  "skill-paket": { name: "Skill-Paket", nische: "claude-code", danke: "/claude-code/skill-paket/danke" },
  "ki-newsletter": { name: "KI-Newsletter", nische: "einstieg", danke: "/newsletter/bestaetigt" },
} as const satisfies Record<string, { name: string; nische: Nische; danke: string }>;
export type Leadmagnet = keyof typeof LEADMAGNETE;

/** Wohin der Klick in der Bestätigungsmail führt: Leadmagnete auf ihre eigene Dankeseite, alle anderen Formulare auf die allgemeine.
 *  Das Ziel steht nur in dieser Datei. Die Quelle kommt aus der Datenbank, nie aus der Anfrage, darum kann niemand umleiten. */
export const dankeSeite = (quelle: string): string => (istLeadmagnet(quelle) ? LEADMAGNETE[quelle].danke : "/newsletter/bestaetigt");

/** Die Formulare, die es schon gab. Ihre Namen stehen so in den Nachweisen der Einwilligung und bleiben darum, wie sie sind. */
export const FORMULARE = {
  "Akademie-Newsletter": { nische: "einstieg" },
  "Warteliste Kurs": { nische: "second-brain" },
  "Warteliste Webinar": { nische: "second-brain" },
  "Warteliste Webseiten-Kurs": { nische: "webseiten-selbst-bauen" },
  "Webinar Second Brain": { nische: "second-brain" },
  "Mooni Voice": { nische: null },
  Kontaktformular: { nische: null },
} as const satisfies Record<string, { nische: Nische | null }>;

/** Themen im Kontaktformular der Startseite („Worum geht es?“). Das Formular schickt nur das Kürzel. Name und Nische kommen
 *  von hier, wie bei den Leadmagneten. `frage` steht als Hilfe im Nachrichtenfeld, sobald ein Thema gewählt ist. */
export const KONTAKT_THEMEN = {
  webseite: { name: "Webseite", frage: "Was soll deine Webseite können? Gibt es schon eine?", nische: null },
  "ki-schulung": { name: "KI-Schulung fürs Team", frage: "Wie groß ist euer Team, und was soll es danach mit KI können?", nische: "ki-schulung" },
  kurs: { name: "Kurs oder Beratung", frage: "Woran arbeitest du gerade, und wo steckst du fest?", nische: null },
  anderes: { name: "Etwas anderes", frage: "Was ist dein Wunsch? Schreib einfach drauflos.", nische: null },
} as const satisfies Record<string, { name: string; frage: string; nische: Nische | null }>;
export type KontaktThema = keyof typeof KONTAKT_THEMEN;

export type Quelle = keyof typeof FORMULARE | Leadmagnet;

export const istLeadmagnet = (quelle: string): quelle is Leadmagnet => Object.prototype.hasOwnProperty.call(LEADMAGNETE, quelle);
export const istQuelle = (quelle: string): quelle is Quelle => istLeadmagnet(quelle) || Object.prototype.hasOwnProperty.call(FORMULARE, quelle);

/** Das Thema zu einer Quelle. null: kein bestimmtes Thema (Kontaktformular, Mooni Voice). */
export const nischeVon = (quelle: Quelle): Nische | null => (istLeadmagnet(quelle) ? LEADMAGNETE[quelle].nische : FORMULARE[quelle].nische);
