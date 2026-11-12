/* Webseiten-Kurs mit Claude Code: Inhalte der Ankündigungsseite an einer Stelle.
   Die Seite, ihre maschinenlesbaren Angaben und die Karte auf der Übersichtsseite lesen von hier.
   Der Kurs ist angekündigt und noch nicht buchbar: Es gibt eine Warteliste, keinen Termin. */

export const KURS_PFAD = "/akademie/webseiten-mit-claude-code";
export const KURS_NAME = "Webseiten bauen mit Claude Code";

/* Preis je Platz, netto in Euro. Quelle: Vault, Sabala_Mentoring/Preise. */
export const WEBKURS_PREIS = 1500;
export const WEBKURS_PREIS_TEXT = `${WEBKURS_PREIS.toLocaleString("de-DE")} €`;
/* Die Gruppengröße nennt die Seite bewusst nicht: Ilja hat sie noch nicht festgelegt (12.11.2026). */
/* Live-Zeit für die maschinenlesbaren Angaben: 6 Workshops zu je 2 Stunden, 5 Fragestunden, 1 Einzelstunde, Technik-Check (30 Minuten). */
export const WEBKURS_LIVE_ZEIT = "PT18H30M";

/* Sechs Schichten einer Webseite, eine je Woche. `skills` sind die Anleitungen, nach denen Claude in dieser Woche arbeitet. */
export const SCHICHTEN = [
  { name: "Plan", text: "Bevor eine Zeile Code entsteht: Für wen ist die Seite? Was soll sie auslösen? Welche Abschnitte braucht sie dafür?", skills: ["sabala-page-mastery", "client-brandguide"] },
  { name: "Sektionen", text: "Du baust Abschnitt für Abschnitt. Klare Gestaltungsregeln sorgen dafür, dass alles zusammenpasst.", skills: ["taste-design", "impeccable", "sabala-sektionen"] },
  { name: "Texte und Bilder", text: "Texte, die nach dir klingen. Bilder, die zu deiner Marke passen. Beides entsteht mit KI und bekommt deinen Schliff.", skills: ["humanizer", "kie-image-gen"] },
  { name: "Bewegung und Tempo", text: "Bewegung, die den Blick führt. Und eine Seite, die auch am Handy schnell lädt.", skills: ["scroll-film-studio", "animate"] },
  { name: "Technik dahinter", text: "GitHub, Vercel, eigene Domain, Formulare. Deine Seite geht live und bleibt in deiner Hand.", skills: ["vercel-deploy", "security-audit"] },
  { name: "Google und KI", text: "Damit Google und KI-Assistenten deine Seite finden, verstehen und empfehlen. Fachleute nennen das SEO und GEO.", skills: ["sabala-seo-geo-check", "sabala-seo"] },
] as const;

/* Was sich ändert: links heute, rechts nach dem Kurs. */
export const HEUTE_DANACH: [string, string][] = [
  ["Deine Seite hängt an einem Baukasten oder an jemandem, der sie für dich ändert.", "Du änderst sie selbst, in Minuten."],
  ["Jede kleine Änderung kostet Geld oder Nerven.", "Du sagst Claude, was du brauchst, prüfst die Vorschau und schaltest live."],
  ["Deine Seite sieht aus wie viele andere.", "Eigene Regeln, eigene Bilder, ein eigener Moment."],
  ["Du weißt nicht, ob Google und KI-Antworten dich finden.", "Du verstehst SEO und GEO und misst, was ankommt."],
  ["Du weißt nicht genau, wo deine Seite liegt und wem der Code gehört.", "Du verstehst dein Hosting. Code und Domain liegen in deinen Konten."],
];

/* Was jeder mitbekommt und behält. */
export const MITGABEN: [string, string][] = [
  ["Skill-Bibliothek", "Meine Skills für Claude Code: fertige Anleitungen für Gestaltung, Texte, Sicherheit, SEO und GEO."],
  ["Code-Bibliothek", "Fertige Abschnitte aus meiner eigenen Bibliothek. Du setzt sie in deine Seite ein und passt sie an."],
  ["Prompts und Vorlagen", "Die Prompts jeder Woche, dazu Seitenplan, Gestaltungsregeln und die Liste für den Livegang."],
  ["Aufzeichnungen", "Alle Workshops zum Nachsehen, dazu der Ablauf als PDF."],
];

/* Sechs Abschnitte aus der Code-Bibliothek, als Vorschaubild (public/akademie/webkurs/bibliothek/<datei>.webp). */
export const BIBLIOTHEK: [string, string][] = [
  ["kopf-zwei-takt", "Kopf mit zwei Takten"],
  ["angebots-karten", "Angebots-Karten"],
  ["heute-und-danach", "Heute und Danach"],
  ["themen-waehler", "Themen-Wähler"],
  ["fragen-zwei-spalten", "Fragen in zwei Spalten"],
  ["dreh-karten-treppe", "Stufen zum Umdrehen"],
];

/* Die Werkzeuge, die im Kurs eingerichtet werden. Alle laufen in den Konten der Teilnehmer. */
export const WERKZEUGE: [string, string][] = [
  ["Claude Code", "baut mit dir"],
  ["GitHub", "bewahrt deinen Code"],
  ["Vercel", "bringt die Seite ins Netz"],
  ["Deine Domain", "deine eigene Adresse"],
  ["Search Console", "zeigt, wie Google dich findet"],
];

/* Der Rahmen des Kurses als Datenblatt: links das Stichwort, rechts die Angabe. */
export const RAHMEN: [string, string][] = [
  ["Dauer", "Sechs Wochen"],
  ["Live per Zoom", "Sechs Workshops zu je zwei Stunden und fünf Fragestunden"],
  ["Persönlich", "Eine Einzelstunde mit Ilja und ein Technik-Check vor dem Start"],
  ["Gruppe", "Klein, damit in jedem Workshop Zeit für deine Seite bleibt"],
  ["Ergebnis", "Deine Webseite, live auf deiner eigenen Domain"],
];

export const FRAGEN: [string, string][] = [
  ["Wann startet der Kurs?", "Der Termin steht noch nicht fest. Wer auf der Warteliste steht, erfährt ihn zuerst."],
  ["Was kostet ein Platz?", `${WEBKURS_PREIS_TEXT} netto zzgl. MwSt. Das Angebot richtet sich an Unternehmen und Selbständige.`],
  ["Was bekomme ich mit?", "Meine Skills für Claude Code, fertige Abschnitte aus meiner Code-Bibliothek, die Prompts jeder Woche, Vorlagen und die Aufzeichnungen der Workshops. Alles bleibt bei dir."],
  ["Wie groß ist die Gruppe?", "Ich trainiere in kleinen Gruppen. So bleibt in jedem Workshop Zeit für deine Seite."],
  ["Was brauche ich vorher?", "Einen Rechner, auf dem Claude Code läuft, und ein bezahltes Claude-Abo. Programmieren musst du nicht können. Vor dem Start prüfen wir gemeinsam, ob bei dir alles eingerichtet ist. Wenn du Claude Code noch nie benutzt hast, ist der Second-Brain-Kurs der passende Einstieg."],
  ["Was habe ich am Ende?", "Deine eigene Webseite, live auf deiner Domain. Du kannst sie danach selbst ändern und erweitern."],
  ["Welche laufenden Kosten kommen dazu?", "Ein Claude-Abo, deine Domain und das Hosting. Vercel verlangt für geschäftliche Seiten den Pro-Tarif für 20 Dollar im Monat (Stand November 2026)."],
  ["Verpflichtet mich die Warteliste zu etwas?", "Nein. Du bekommst eine Mail, sobald der Termin feststeht, und entscheidest dann."],
];

/* Für Suchergebnisse. Mit dem Zusatz „ · Sabala Studios“ aus dem Layout bleibt der Titel unter 60 Zeichen, die Beschreibung unter 160. */
export const SEITEN_TITEL = "KI-Webdesign lernen: Kurs mit Claude Code";
export const SEITEN_BESCHREIBUNG = `KI-Webdesign lernen wie die Profis: In sechs Wochen baust du deine Webseite mit Claude Code. Skills und Code-Bibliothek dazu. ${WEBKURS_PREIS_TEXT} netto je Platz.`;
/* Die Antwort in Kurzform (40 bis 60 Wörter): wer, was, für wen. Steht sichtbar am Anfang des ersten Abschnitts. */
export const ANTWORT = "Ein Live-Kurs von Ilja Krasevskij für Selbständige und Unternehmen. In sechs Wochen lernst du KI-Webdesign wie die Profis: Du baust mit Claude Code deine eigene Webseite, Schicht für Schicht, und stellst sie auf deiner Domain live. Skills, Prompts und Code-Bibliothek bekommst du dazu. Der Termin steht noch nicht fest, die Warteliste ist offen.";
/* Kopf: Überschrift in zwei Takten und der Satz darunter (höchstens 20 Wörter, mit den Werkzeugen). */
export const KOPF_ZEILE_1 = "KI-Webdesign wie die Profis.";
export const KOPF_ZEILE_2 = "In sechs Wochen live.";
export const KOPF_SATZ = "In sechs Live-Workshops baust du mit Claude Code, GitHub und Vercel deine eigene Seite. Skills und Codes bekommst du dazu.";
