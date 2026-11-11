/* Webseiten-Kurs mit Claude Code: Inhalte der Ankündigungsseite an einer Stelle.
   Die Seite, ihre maschinenlesbaren Angaben und die Karte auf der Übersichtsseite lesen von hier.
   Der Kurs ist angekündigt und noch nicht buchbar: Es gibt eine Warteliste, keinen Termin. */

export const KURS_PFAD = "/akademie/webseiten-mit-claude-code";
export const KURS_NAME = "Webseiten bauen mit Claude Code";

/* Preis je Platz, netto in Euro. Quelle: Vault, Sabala_Mentoring/Preise. */
export const WEBKURS_PREIS = 1500;
export const WEBKURS_PREIS_TEXT = `${WEBKURS_PREIS.toLocaleString("de-DE")} €`;
/* Plätze im ersten Durchgang. */
export const WEBKURS_PLAETZE = 4;

/* Sechs Schichten einer Webseite, eine je Woche. `skills` sind die Anleitungen, nach denen Claude in dieser Woche arbeitet. */
export const SCHICHTEN = [
  { name: "Plan", text: "Bevor eine Zeile Code entsteht: Für wen ist die Seite? Was soll sie auslösen? Welche Abschnitte braucht sie dafür?", skills: ["sabala-page-mastery", "client-brandguide"] },
  { name: "Sektionen", text: "Du baust Abschnitt für Abschnitt. Klare Gestaltungsregeln sorgen dafür, dass alles zusammenpasst.", skills: ["taste-design", "impeccable", "sabala-sektionen"] },
  { name: "Texte und Bilder", text: "Texte, die nach dir klingen. Bilder, die zu deiner Marke passen. Beides entsteht mit KI und bekommt deinen Schliff.", skills: ["humanizer", "kie-image-gen"] },
  { name: "Bewegung und Tempo", text: "Bewegung, die den Blick führt. Und eine Seite, die auch am Handy schnell lädt.", skills: ["scroll-film-studio", "animate"] },
  { name: "Technik dahinter", text: "GitHub, Vercel, eigene Domain, Formulare. Deine Seite geht live und bleibt in deiner Hand.", skills: ["vercel-deploy", "security-audit"] },
  { name: "Google und KI", text: "Damit Google und KI-Assistenten deine Seite finden, verstehen und empfehlen. Fachleute nennen das SEO und GEO.", skills: ["sabala-seo-geo-check", "sabala-seo"] },
] as const;

/* Der Rahmen des Kurses als Datenblatt: links das Stichwort, rechts die Angabe. */
export const RAHMEN: [string, string][] = [
  ["Dauer", "Sechs Wochen"],
  ["Live per Zoom", "Sechs Workshops zu je 2,5 Stunden und fünf Fragestunden"],
  ["Persönlich", "Eine Einzelstunde mit Ilja und ein Technik-Check vor dem Start"],
  ["Gruppe", `${WEBKURS_PLAETZE === 4 ? "Vier" : WEBKURS_PLAETZE} Plätze im ersten Durchgang`],
  ["Ergebnis", "Deine Webseite, live auf deiner eigenen Domain"],
];

export const FRAGEN: [string, string][] = [
  ["Wann startet der Kurs?", "Der Termin steht noch nicht fest. Wer auf der Warteliste steht, erfährt ihn zuerst."],
  ["Was kostet ein Platz?", `${WEBKURS_PREIS_TEXT} netto zzgl. MwSt. Das Angebot richtet sich an Unternehmen und Selbständige.`],
  ["Wie groß ist die Gruppe?", "Im ersten Durchgang gibt es vier Plätze. So bleibt in jedem Workshop Zeit für deine Seite."],
  ["Was brauche ich vorher?", "Einen Rechner, auf dem Claude Code läuft, und ein bezahltes Claude-Abo. Programmieren musst du nicht können. Vor dem Start prüfen wir gemeinsam, ob bei dir alles eingerichtet ist. Wenn du Claude Code noch nie benutzt hast, ist der Second-Brain-Kurs der passende Einstieg."],
  ["Was habe ich am Ende?", "Deine eigene Webseite, live auf deiner Domain. Du kannst sie danach selbst ändern und erweitern."],
  ["Welche laufenden Kosten kommen dazu?", "Ein Claude-Abo, deine Domain und das Hosting. Vercel verlangt für geschäftliche Seiten den Pro-Tarif für 20 Dollar im Monat (Stand November 2026)."],
  ["Verpflichtet mich die Warteliste zu etwas?", "Nein. Du bekommst eine Mail, sobald der Termin feststeht, und entscheidest dann."],
];

/* Für Suchergebnisse. Mit dem Zusatz „ · Sabala Studios“ aus dem Layout bleibt der Titel unter 60 Zeichen, die Beschreibung unter 160. */
export const SEITEN_TITEL = "Webseite mit Claude Code bauen: Live-Kurs";
export const SEITEN_BESCHREIBUNG = `Live-Kurs in Vorbereitung: In sechs Wochen baust du deine Webseite mit Claude Code, sichtbar bei Google und KI. Vier Plätze, ${WEBKURS_PREIS_TEXT} netto. Warteliste offen.`;
/* Die Antwort in Kurzform (40 bis 60 Wörter): wer, was, für wen. Steht sichtbar am Anfang des ersten Abschnitts. */
export const ANTWORT = "Ein Live-Kurs von Ilja Krasevskij für Selbständige und Unternehmen. In sechs Wochen baust du mit Claude Code deine eigene Webseite, Schicht für Schicht, und stellst sie auf deiner Domain live. Sichtbar bei Google und in KI-Antworten. Der Termin steht noch nicht fest, die Warteliste ist offen.";
export const KOPF_ZEILE_1 = "Hier entsteht ein Kurs.";
export const KOPF_ZEILE_2 = "Diese Seite ist die erste Lektion.";
