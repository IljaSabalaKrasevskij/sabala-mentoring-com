/* Der Trainingsablauf des Kurses: EINE Quelle für die Kursseite (Sessions, Werkzeuge) und für das PDF.
   Nach jeder Änderung hier das PDF neu bauen:  node scripts/trainingsablauf.mjs
   Das schreibt public/akademie/second-brain-trainingsablauf.pdf.
   Bewusst ohne Datum und ohne Minuten: der Ablauf gilt für jeden Lauf, die Termine stehen in cohorts.ts.
   Nur einfache Daten, kein JSX: das Bauskript liest diese Datei direkt mit Node. */

export const ABLAUF_PDF = "/akademie/second-brain-trainingsablauf.pdf";

/* Die vier Werkzeuge, die jeder am Ende eingerichtet hat. `id` wählt Logo oder Symbol. */
export type Werkzeug = { id: "comet" | "notebooklm" | "obsidian" | "claude"; name: string; zusatz: string; rolle: string; text: string; workshop: 1 | 2 };

export const WERKZEUGE: Werkzeug[] = [
  { id: "comet", name: "Comet Browser", zusatz: "mit Perplexity", rolle: "Deine Recherche", text: "Dein KI-Browser. Perplexity ist direkt eingebaut, du findest und liest Quellen ohne 20 offene Tabs.", workshop: 1 },
  { id: "notebooklm", name: "Gemini Notebook", zusatz: "früher NotebookLM", rolle: "Deine Expertendatenbank", text: "Videos, PDFs und Webseiten werden zu einer Wissensdatenbank, die du befragen kannst.", workshop: 1 },
  { id: "obsidian", name: "Obsidian", zusatz: "mit PARA-Struktur", rolle: "Dein Second Brain", text: "Dein Wissen als einfache Dateien auf deinem Rechner, verlinkt und geordnet. Es gehört dir.", workshop: 1 },
  { id: "claude", name: "Claude Code", zusatz: "mit Memory-System", rolle: "Dein Gedächtnis", text: "Claude arbeitet direkt in deinem Second Brain und weiß, woran ihr gearbeitet habt.", workshop: 2 },
];

/* Ein Schritt im Workshop. `art`: "werkzeug" = eines der vier Werkzeuge oben (mit `id`),
   "baustein" = was sie verbindet, "rahmen" = Ankommen und Abschluss (nur im PDF). */
export type Schritt = { art: "rahmen" | "werkzeug" | "baustein"; id?: Werkzeug["id"]; name: string; text: string };

export type Workshop = { nr: 1 | 2; art: string; titel: string; mit: string; schritte: Schritt[]; danach: string[] };

export const WORKSHOPS: Workshop[] = [
  {
    nr: 1,
    art: "Workshop 1 · 2,5 Stunden live",
    titel: "Dein Wissen an einem Ort",
    mit: "Comet Browser, Gemini Notebook und Obsidian",
    schritte: [
      { art: "rahmen", name: "Ankommen", text: "Kurze Runde: Wo stehst du, was willst du mitnehmen? Dazu ein Blick in mein eigenes Second Brain." },
      { art: "werkzeug", id: "comet", name: "Comet Browser mit drei Erweiterungen", text: "Wir richten Comet ein. Damit hast du Perplexity direkt im Browser und schickst Webseiten und YouTube-Videos mit einem Klick in dein Notebook." },
      { art: "baustein", name: "Firecrawl", text: "Holt ganze Webseiten sauber als Text. Claude besorgt sich seine Quellen damit selbst, ohne Kopieren und Einfügen." },
      { art: "werkzeug", id: "notebooklm", name: "Gemini Notebook", text: "Dein erstes Notebook mit eigenen Quellen. Aus Videos, PDFs und Webseiten wird eine Wissensdatenbank, die antwortet." },
      { art: "werkzeug", id: "obsidian", name: "Obsidian mit PARA-Struktur", text: "Dein Second Brain entsteht: dein Wissen als einfache Dateien auf deinem Rechner. Das Einsortieren übernimmt danach Claude." },
      { art: "rahmen", name: "Abschluss", text: "Rückblick, deine Fragen und deine Aufgabe bis Workshop 2." },
    ],
    danach: [
      "Ein Recherche-Setup, das aus Stunden Minuten macht",
      "Dein Wissen aus Videos, PDFs und Webseiten, durchsuchbar",
      "Ein Second Brain auf deinem Rechner, das Claude lesen kann",
    ],
  },
  {
    nr: 2,
    art: "Workshop 2 · 2,5 Stunden live",
    titel: "Claude bekommt ein Gedächtnis",
    mit: "Claude Code, deiner CLAUDE.md und MCP",
    schritte: [
      { art: "rahmen", name: "Ankommen", text: "Steht dein Second Brain? Wir klären, was seit Workshop 1 offen ist." },
      { art: "werkzeug", id: "claude", name: "Terminal und Claude Code", text: "Wir installieren alles Schritt für Schritt, auch wenn du das Terminal noch nie geöffnet hast." },
      { art: "baustein", name: "Deine CLAUDE.md", text: "Die eine Datei, die Claude sagt, wer du bist, wie du arbeitest und worauf er zugreifen darf." },
      { art: "baustein", name: "MCP-Verbindungen", text: "So bekommt Claude Zugriff auf Obsidian und Gemini Notebook, also auf dein Wissen." },
      { art: "baustein", name: "Fünf Skills", text: "Closing-Routine, Repo-Vetting, Humanizer, Notebook-Skill und Memory. Die Regel dabei: erst prüfen, dann installieren." },
      { art: "rahmen", name: "Abschluss", text: "Der Test: Du fragst Claude, woran ihr gearbeitet habt. Dazu Rückblick und Ausblick auf die Fragestunde." },
    ],
    danach: [
      "Du fragst: „Woran haben wir gearbeitet?“ Claude weiß es.",
      "Nach jeder Session schreibt Claude von selbst eine Tagesnotiz",
      "Claude greift bei jeder Aufgabe auf dein Wissen zu",
    ],
  },
];

export const FRAGESTUNDE = {
  art: "Fragestunde · 1 Stunde live",
  titel: "Dein Sicherheitsnetz",
  text: "Nach dem zweiten Workshop arbeitest du ein paar Tage mit deinem Setup. Was dabei offen bleibt, klären wir hier gemeinsam.",
};

/* Was du mitbekommst. Quelle: Kurs-Handout („Alle Befehle, Prompts & Skills“), Kurspaket Teil 2 und die
   Aufzeichnung vom Oktober 2026, in der Ilja das Design-Paket ausgegeben hat.
   `symbol` ist der Name eines lucide-Symbols (Seite: Werkzeuge der Bibliothek, PDF: dieselbe Datei). */
export type Posten = { symbol: string; name: string; text: string };

/* Die Skills richten wir in Workshop 2 gemeinsam ein. Die Sätze sind bewusst kurz:
   auf der Seite steht jeder Posten in einer Zeile, damit der Abschnitt in ein Laptop-Fenster passt. */
export const SKILLS: Posten[] = [
  { symbol: "notebook-pen", name: "Closing-Routine", text: "Ein Wort am Ende, und Claude schreibt deine Tagesnotiz." },
  { symbol: "shield-check", name: "Repo-Vetting", text: "Cybersecurity für GitHub: erst prüfen, dann installieren." },
  { symbol: "pen-line", name: "Humanizer", text: "Nimmt deinen Texten den KI-Klang, in deinem Stil." },
  { symbol: "book-open-check", name: "Notebook-Skill", text: "Claude bedient dein Gemini Notebook selbst." },
  { symbol: "brain", name: "Memory", text: "Claude merkt sich, woran ihr arbeitet." },
];

export const VORLAGEN: Posten[] = [
  { symbol: "folder-tree", name: "Starter-Vault mit PARA-Struktur", text: "Acht Ordner, fertig angelegt." },
  { symbol: "file-text", name: "Vorlage für deine CLAUDE.md", text: "Claude befragt dich und schreibt die Datei." },
  { symbol: "clipboard-copy", name: "Alle Prompts und Befehle", text: "Zum Kopieren auf deiner Kurs-Seite." },
];

export const DESIGN_PAKET: Posten[] = [
  { symbol: "palette", name: "Design-Skills für Claude", text: "UI UX Pro Max, Frontend Design, Taste Design." },
  { symbol: "swatch-book", name: "Über 50 Design-Vorlagen", text: "Design-Systeme im Stil bekannter Marken." },
];

/* Was die vier Werkzeuge verbindet: alle Bausteine aus beiden Workshops, für die Zeile unter den Werkzeugen. */
export const BAUSTEINE = WORKSHOPS.flatMap((w) => w.schritte.filter((s) => s.art === "baustein").map((s) => ({ ...s, workshop: w.nr })));
