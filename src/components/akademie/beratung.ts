/* Inhalte der Beratungsseite /beratung: EINE Quelle für die Seite (BeratungView) und für die
   maschinenlesbaren Angaben in page.tsx. Nur einfache Daten, kein JSX: page.tsx liest sie auf dem Server.
   Preise und Kurstermine kommen aus cohorts.ts (Quelle: Vault, Sabala_Mentoring/Preise).

   Die Fragen stammen aus den Session-Analysen der Akademie und aus einer Kunden-Feedbackliste, nicht erfunden:
   Vault, 03_Bereiche/Sabala_Mentoring/Beratungsstunde/Fragenkatalog.
   Bewusst NUR Fragen, keine Antworten. Die Fragen wecken den Bedarf, die Antworten sind das Produkt. */

import { BERATUNG_GUTSCHEIN, CURRENT_COHORT, KURS_PREIS, formatTagMonat } from "./cohorts";

// ThriveCart-Checkout, live seit 24.8.2026.
export const BERATUNG_CHECKOUT = "https://sabala-mentoring.thrivecart.com/sabala-academy-beratungsstunde/";

export const FUER_DICH = [
  "Du willst deine Webseite mit Claude Code bauen, kommst aber an einer Stelle nicht weiter.",
  "Du hast etwas Fertiges auf dem Rechner und weißt nicht, wie du es online bringst.",
  "Du fragst dich, wo deine Daten landen, sobald du mit KI arbeitest.",
  "Du willst dein Second Brain aufsetzen, aber der erste Schritt fehlt.",
  "Du hast zwanzig Tabs offen und trotzdem keine Antwort auf deine eigentliche Frage.",
];

export const DANACH = [
  "Ein klarer nächster Schritt, den du heute noch gehen kannst.",
  "Die Werkzeuge, die du brauchst, und die, die du dir sparst.",
  "Eine schriftliche Zusammenfassung, mit der du morgen weiterarbeitest.",
];

/* `symbol` wählt in BeratungView das Symbol des Themas. */
export type ThemaSymbol = "web" | "terminal" | "deploy" | "recht" | "brain" | "daten" | "deck" | "app" | "agent" | "key" | "suche";

export const THEMEN: { symbol: ThemaSymbol; titel: string; fragen: string[] }[] = [
  { symbol: "web", titel: "Webseiten mit Claude Code", fragen: [
    "Wie baue ich eine Webseite mit KI, die nicht nach KI aussieht?",
    "Woran erkennt man überhaupt, dass eine Seite von einer KI gebaut wurde?",
    "Wie komme ich von der leeren Seite zu einer Struktur, die verkauft?",
    "Wie schreibe ich Texte, die nach mir klingen und nicht nach Marketing?",
    "Woher nehme ich Bilder, wenn ich keine Fotos habe?",
    "Wordpress, Baukasten oder selbst gebaut, was passt zu mir?",
  ]},
  { symbol: "terminal", titel: "Claude Code und Terminal", fragen: [
    "Was ist Claude Code, und wozu brauche ich das Terminal?",
    "Ich habe noch nie ein Terminal benutzt, ist das ein Ausschlusskriterium?",
    "Wann nutze ich den Chat und wann Claude Code?",
    "Wo gehört die CLAUDE.md hin, und was schreibe ich da rein?",
    "Reicht der kostenlose Account, und was kostet mich das im Monat?",
    "Was sind Skills, und wer macht die eigentlich?",
    "Kann ich per Sprache statt Tippen arbeiten?",
  ]},
  { symbol: "deploy", titel: "Online bringen und Deployment", fragen: [
    "Wie bringe ich meine mit Claude gebaute Seite überhaupt online?",
    "Was kostet Hosting, und was brauche ich davon wirklich?",
    "Wie verbinde ich meine Domain damit?",
    "Ich ersetze meine alte Seite, verliere ich meine Google-Rankings?",
    "Was ist Git, und muss ich das verstehen?",
    "Wie ändere ich später etwas, ohne die Seite kaputtzumachen?",
  ]},
  { symbol: "recht", titel: "Rechtssicher betreiben", fragen: [
    "Brauche ich ein Cookie-Banner, und wenn ja, welches?",
    "Wie bringe ich eine Webseite rechtssicher online?",
    "Brauche ich einen Hinweis, dass die Seite mit KI gebaut wurde?",
    "Wo muss ich hosten, damit die Daten in Europa bleiben?",
    "Wie halte ich Passwörter und Schlüssel aus dem Code raus?",
  ]},
  { symbol: "brain", titel: "Second Brain Setup", fragen: [
    "Warum vergisst Claude alles, sobald ich ein neues Fenster öffne?",
    "Wie fange ich an, wenn ich Obsidian noch nie benutzt habe?",
    "Ich habe Obsidian schon, fange ich trotzdem von vorne an?",
    "Wie hole ich meine bestehenden Dokumente da rein?",
    "Kann das auf meiner NAS oder in einer Cloud liegen?",
    "Wie recherchiere ich ein Thema so, dass es danach nutzbar ist?",
  ]},
  { symbol: "daten", titel: "Daten und Datensicherheit", fragen: [
    "Wo landen meine Daten, wenn ich mit Claude arbeite?",
    "Darf ich Kundendaten oder Mandantendaten durch eine KI schicken?",
    "Was bleibt lokal auf meinem Rechner, und was geht ins Netz?",
    "Kann ich Modelle lokal laufen lassen, damit nichts rausgeht?",
    "Können meine Mitarbeiter nur auf bestimmte Bereiche zugreifen?",
  ]},
  { symbol: "deck", titel: "HTML-Präsentationen", fragen: [
    "Wie baue ich Präsentationen mit Claude Code statt mit PowerPoint?",
    "Wie erreiche ich, dass jedes Deck gleich gut aussieht?",
    "Wie wird aus einer Recherche automatisch eine fertige Präsentation?",
    "Kann ich das als PDF weitergeben?",
    "Warum wird bei mir immer etwas abgeschnitten?",
  ]},
  { symbol: "app", titel: "Apps und eigene Werkzeuge", fragen: [
    "Kann ich mir mit Claude Code eine eigene kleine App bauen?",
    "Wo hoste ich so eine App, ohne mir ein Sicherheitsproblem einzukaufen?",
    "Wie schütze ich ein internes Dashboard vor fremdem Zugriff?",
    "Wie verbinde ich meine App mit Daten, die ich schon habe?",
  ]},
  { symbol: "agent", titel: "Agenten und Automatisierung", fragen: [
    "Wie baue ich einen Agenten, der eine Aufgabe wirklich übernimmt?",
    "Was kann ich sinnvoll automatisieren, und wo lohnt es sich nicht?",
    "Kann etwas jeden Tag laufen, ohne dass ich es starte?",
    "Wie verbinde ich Claude mit Kalender oder E-Mail?",
    "Wie lasse ich mehrere Agenten parallel arbeiten?",
  ]},
  { symbol: "key", titel: "Kontrolle und Zugänge", fragen: [
    "Kann ich Texte, Bilder und Preise später selbst ändern?",
    "Bekomme ich am Ende wirklich alle Zugänge?",
    "Was passiert, wenn mein Dienstleister nicht mehr erreichbar ist?",
    "Kann ich später zu jemand anderem wechseln?",
  ]},
  { symbol: "suche", titel: "Gefunden werden", fragen: [
    "Warum findet mich bei Google niemand?",
    "Welche Themen gehören auf welche Seite?",
    "Wie werde ich in ChatGPT, Claude und Google AI Overviews zitiert?",
    "Wie wichtig ist Local SEO für mich?",
    "Wie messe ich, ob meine Seite etwas bringt?",
  ]},
];

export const FRAGEN_ZAHL = THEMEN.reduce((n, t) => n + t.fragen.length, 0);

export const ABLAUF = [
  { titel: "Du buchst und schickst mir deine Fragen", text: "Nach der Buchung suchst du dir einen Termin und schreibst mir, was dich beschäftigt. Ich bereite mich darauf vor." },
  { titel: "Wir sprechen eine Stunde", text: "Per Video, Bildschirm geteilt. Ich zeige dir die Dinge live an deinem Fall, statt sie zu beschreiben." },
  { titel: "Du bekommst alles schriftlich", text: "Danach schicke ich dir die Zusammenfassung mit Links, Tools und den nächsten Schritten." },
];

const KURS_START = CURRENT_COHORT ? ` Der nächste Kurs startet am ${formatTagMonat(CURRENT_COHORT.start)}.` : "";

/* Einwände vor der Buchung: Frage und Antwort. Stehen als sichtbarer Text auf der Seite und als FAQPage in den Angaben für Google. */
export const EINWAENDE: [string, string][] = [
  ["Brauche ich Vorwissen?",
   "Nein. Sag mir vorher, wo du stehst, dann setze ich dort an. In meinen Kursen saß bisher niemand, der programmieren kann."],
  ["Was, wenn meine Frage gar nicht dabei ist?",
   "Dann ist sie trotzdem willkommen. Die Liste zeigt, was oft gefragt wird, und ist keine Einschränkung."],
  ["Ist das ein verkapptes Verkaufsgespräch?",
   "Nein. Du bekommst eine Stunde Antworten und entscheidest danach frei. Willst du danach, dass ich etwas für dich baue, sprechen wir darüber. Wenn nicht, hast du trotzdem, wofür du bezahlt hast."],
  ["Was, wenn wir die Stunde nicht voll brauchen?",
   "Dann hören wir früher auf. Ich verlängere nichts künstlich. Umgekehrt werfe ich dich auch nicht auf die Minute raus, wenn wir mitten in etwas stecken."],
  ["Wie komme ich an meinen Termin?",
   "Direkt nach dem Kauf bekommst du den Link zur Terminwahl und suchst dir aus, was dir passt. Dazu deinen Gutscheincode."],
  ["Und wenn ich danach doch den Kurs will?",
   `Dann löst du deinen Code über ${BERATUNG_GUTSCHEIN} € ein und zahlst ${KURS_PREIS - BERATUNG_GUTSCHEIN} € statt ${KURS_PREIS} €.${KURS_START} Zwei Workshops und eine Fragestunde sind inklusive. Termine und Buchung findest du auf der Kursseite.`],
];
