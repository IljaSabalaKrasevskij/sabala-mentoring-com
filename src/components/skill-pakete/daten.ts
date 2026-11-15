/* Skill-Pakete: EINE Quelle für die Seite /claude-code/skill-paket (Bühne, Karten, Formular),
   für die Angaben für Google und später für Formular-Route und Mails.

   Iljas Wunsch (15.11.2026): mehrere Skill-Pakete nach Thema, Setups je Beruf, im Formular Häkchen je Paket,
   je Paket eine eigene Mail. Jeder Skill hier muss im Paket wirklich liegen (skillpaket/), nichts dazuerfinden.
   Läuft auch im Browser, darum ohne Server-Importe. */

export type PaketId = "texte" | "design" | "seo" | "recherche" | "social";
export type BerufId = "webdesigner" | "creator" | "social" | "texter" | "berater";

export type Skill = { ordner: string; satz: string };

export type Paket = {
  id: PaketId;
  name: string;
  /* Versprechen in einem kurzen Satz, steht groß in der Karte. */
  claim: string;
  /* Akzentfarbe des Pakets auf der Bühne und in der Karte. Alles warme Metalle, damit es eine Familie bleibt. */
  farbe: string;
  skills: [Skill, Skill, Skill];
};

export const PAKETE: Paket[] = [
  {
    id: "texte",
    name: "Texte",
    claim: "Texte, die nach dir klingen.",
    farbe: "#E8D9B0",
    skills: [
      { ordner: "menschlich-schreiben", satz: "Schreibt ohne KI-Klang: konkret, im Fluss, ohne Gedankenstriche. Mit Prüfskript und deiner Stimme." },
      { ordner: "einfach-erklaeren", satz: "Erklärt Fachthemen so, dass jeder sie versteht und weiß, was er als Nächstes tut." },
      { ordner: "newsletter-schreiben", satz: "Baut eine persönliche Mail: klarer Betreff, ein Gedanke, ein nächster Schritt." },
    ],
  },
  {
    id: "design",
    name: "Design",
    claim: "Seiten, die hochwertig wirken.",
    farbe: "#D4AE5A",
    skills: [
      { ordner: "schoen-gestalten", satz: "Gestaltet Seiten, Folien und PDFs lesbar und hochwertig, ohne den Look aus dem KI-Baukasten." },
      { ordner: "bilder-mit-stil", satz: "Schreibt Bild-Prompts in einem einheitlichen Stil und prüft jedes Bild auf typische KI-Fehler." },
      { ordner: "vor-dem-livegang", satz: "Prüft Texte, Handy, Google und Impressum, bevor eine Seite online geht. Mit Prüfskript." },
    ],
  },
  {
    id: "seo",
    name: "SEO und KI-Suche",
    claim: "Gefunden werden, bei Google und in KI-Antworten.",
    farbe: "#C9A24B",
    skills: [
      { ordner: "themen-finden", satz: "Findet Themen in der Sprache deiner Kunden und bewertet, welche sich lohnen." },
      { ordner: "seo-seite", satz: "Macht eine Seite fit für Google: Titel, Beschreibung, Überschriften als Fragen, interne Links." },
      { ordner: "ki-suche", satz: "Schreibt kurze Antworten und Fragen-Blöcke, die ChatGPT und andere KI-Suchen zitieren können." },
    ],
  },
  {
    id: "recherche",
    name: "Marktrecherche",
    claim: "Markt und Mitbewerber verstehen.",
    farbe: "#C98F5E",
    skills: [
      { ordner: "mitbewerber-pruefen", satz: "Vergleicht drei bis fünf Mitbewerber auf einer Seite: Angebot, Preis, Versprechen, Lücken." },
      { ordner: "zielgruppe-schaerfen", satz: "Beschreibt deine Wunschkunden über klare Kriterien und ein echtes Beispiel." },
      { ordner: "quellen-pruefen", satz: "Belegt jede Zahl mit Quelle und Datum und markiert, was unsicher ist." },
    ],
  },
  {
    id: "social",
    name: "Social Media",
    claim: "Beiträge planen, statt jeden Tag neu anzufangen.",
    farbe: "#E0A070",
    skills: [
      { ordner: "beitrag-schreiben", satz: "Schreibt Beiträge mit einer starken ersten Zeile, einem Gedanken und einem klaren Aufruf." },
      { ordner: "karussell-planen", satz: "Plant ein Karussell Folie für Folie: Titel, eine Aussage je Folie, lesbar am Handy." },
      { ordner: "reel-skript", satz: "Schreibt ein Skript für ein kurzes Video in deinen Worten: Einstieg, drei Punkte, Schluss." },
    ],
  },
];

export type Beruf = {
  id: BerufId;
  /* Auf dem Knopf. */
  name: string;
  /* In der Überschrift nach „als“. */
  als: string;
  /* Drei Pakete in der Reihenfolge, in der man sie nutzt, je mit einem Satz, was Claude damit für diesen Beruf tut. */
  setup: [{ paket: PaketId; satz: string }, { paket: PaketId; satz: string }, { paket: PaketId; satz: string }];
};

export const BERUFE: Beruf[] = [
  {
    id: "webdesigner",
    name: "Webdesigner",
    als: "Webdesigner",
    setup: [
      { paket: "design", satz: "Claude gestaltet Seiten, die hochwertig wirken und für jeden lesbar sind, und prüft sie vor dem Livegang." },
      { paket: "seo", satz: "Jede Seite bekommt Titel, Fragen und kurze Antworten, die Google und ChatGPT finden." },
      { paket: "texte", satz: "Die Texte auf der Seite klingen nach deinem Kunden statt nach KI." },
    ],
  },
  {
    id: "creator",
    name: "Content Creator",
    als: "Content Creator",
    setup: [
      { paket: "texte", satz: "Claude schreibt in deiner Stimme: deine Wörter, deine Anrede, dein Ton." },
      { paket: "social", satz: "Aus einer Idee werden Beitrag, Karussell und Skript für ein kurzes Video." },
      { paket: "design", satz: "Karussells und Titelbilder bleiben lesbar und sehen nach dir aus." },
    ],
  },
  {
    id: "social",
    name: "Social Media Manager",
    als: "Social Media Manager",
    setup: [
      { paket: "social", satz: "Claude plant Beiträge, Karussells und Reels für die Konten deiner Kunden." },
      { paket: "texte", satz: "Jeder Kunde bekommt seine eigene Stimme, die Claude sich merkt." },
      { paket: "recherche", satz: "Vor dem Plan steht ein Blick auf Zielgruppe und Mitbewerber, mit geprüften Quellen." },
    ],
  },
  {
    id: "texter",
    name: "Texter",
    als: "Texter",
    setup: [
      { paket: "texte", satz: "Claude liefert Entwürfe ohne KI-Klang, die du nur noch schärfst." },
      { paket: "seo", satz: "Themen kommen aus der Sprache der Kunden, und jeder Text ist für Google und KI-Suchen gebaut." },
      { paket: "recherche", satz: "Jede Zahl im Text hat eine Quelle und ein Datum." },
    ],
  },
  {
    id: "berater",
    name: "Berater oder Coach",
    als: "Berater oder Coach",
    setup: [
      { paket: "texte", satz: "Claude erklärt dein Fachgebiet so einfach, dass Kunden es sofort verstehen." },
      { paket: "recherche", satz: "Du weißt, was deine Wunschkunden suchen und was Mitbewerber versprechen." },
      { paket: "social", satz: "Aus deinem Wissen werden Beiträge, ohne dass du jeden Tag neu anfängst." },
    ],
  },
];

export const paketVon = (id: PaketId): Paket => PAKETE.find((p) => p.id === id)!;
export const berufVon = (id: BerufId): Beruf => BERUFE.find((b) => b.id === id)!;
/** Für welche Berufe ein Paket im Setup steht, in der Reihenfolge der Berufe. */
export const berufeMit = (id: PaketId): Beruf[] => BERUFE.filter((b) => b.setup.some((s) => s.paket === id));
export const ALLE_PAKETE: PaketId[] = PAKETE.map((p) => p.id);
export const SKILL_ZAHL = PAKETE.reduce((n, p) => n + p.skills.length, 0);

/** Fragen und Antworten: die Seite zeigt sie, page.tsx gibt sie als FAQPage an Google. Antworten 50 bis 100 Wörter. */
export const FRAGEN: { q: string; a: string }[] = [
  {
    q: "Was kosten die Skill-Pakete?",
    a: "Nichts. Du trägst dich mit Name, Mail-Adresse und Telefonnummer ein, bestätigst die Mail und lädst deine Pakete herunter. Dazu bekommst du meinen Newsletter mit KI-Updates für dein Unternehmen. Abmelden geht jederzeit mit einem Klick.",
  },
  {
    q: "Was ist ein Skill?",
    a: "Eine Anleitung, die Claude liest, wenn sie gebraucht wird. Bittest du Claude um einen Newsletter, nimmt es den Skill fürs Schreiben von selbst. Jeder Skill ist eine einfache Textdatei, die du lesen und ändern kannst.",
  },
  {
    q: "Kann ich mehrere Pakete nehmen?",
    a: "Ja. Im Formular hakst du an, welche Pakete du willst, auch alle fünf. Nach der Bestätigung bekommst du eine Mail mit allen gewählten Paketen, jedes als eigener Ordner zum Herunterladen.",
  },
  {
    q: "Was ist ein Setup für meinen Beruf?",
    a: "Eine kurze Anleitung zu den drei Paketen, die zu deinem Beruf passen: in welcher Reihenfolge du sie nutzt, ein Baustein für deine CLAUDE.md und drei erste Aufgaben. Es gibt Setups für Webdesigner, Content Creator, Social Media Manager, Texter sowie Berater und Coaches.",
  },
  {
    q: "Brauche ich dafür Claude Code?",
    a: "Nein. Die Skills laufen in Claude Code und in der Claude-App auf claude.ai, dort ab dem kostenlosen Plan. In der App lädst du jeden Skill als ZIP-Datei hoch, die Anleitung liegt im Paket. Am meisten holst du in Claude Code heraus, weil die Prüfskripte dort auch Dateien auf deinem Rechner prüfen.",
  },
  {
    q: "Kann ich die Skills an meine Sprache anpassen?",
    a: "Ja, dafür sind sie da. In der Datei meine-stimme.md trägst du deine Anrede, deine Lieblingswörter, deine eigenen Tabu-Wörter und einen Text ein, der nach dir klingt. Ab dann schreibt Claude in deiner Stimme, und das Prüfskript kennt deine Liste.",
  },
  {
    q: "Darf ich die Pakete weitergeben?",
    a: "Nutzen darfst du sie für dich, dein Team und deine Kundenprojekte, verändern so viel du willst. Wer sie auch haben will, bekommt sie kostenlos hier auf dieser Seite, dann hat jeder die neueste Fassung.",
  },
  {
    q: "Wer steckt hinter den Skill-Paketen?",
    a: "Ich bin Ilja Krasevskij. Ich führe mein Geschäft mit Claude Code und zeige Selbständigen und kleinen Teams in der KI-Akademie, wie das geht. In den Skills stehen die Regeln, nach denen ich selbst schreibe, gestalte und recherchiere.",
  },
];
