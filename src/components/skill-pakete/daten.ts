/* Skill-Pakete: EINE Quelle für die Seite /claude-code/skill-paket (Bühne, Karten, Beispiele, Formular),
   für die Angaben für Google und für Formular-Route, Dankeseite und Mails.

   Iljas Wunsch (15.11.2026): mehrere Skill-Pakete nach Thema, Setups je Beruf, im Formular Häkchen je Paket,
   Anwendungsbereiche und Vorher/Nachher je Paket, Hinweis auf Skills von GitHub, Updates.
   Jeder Skill hier muss im Paket wirklich liegen (skillpaket/pakete/<id>/skills/), nichts dazuerfinden.
   Die Beispiele (BEISPIELE) sind echte Ausgaben aus dem unabhängigen Test: einmal ohne Skill, einmal mit.
   Läuft auch im Browser, darum ohne Server-Importe. */

export type PaketId = "texte" | "design" | "seo" | "recherche" | "social" | "entwicklung";
export type BerufId = "webdesigner" | "creator" | "social" | "texter" | "berater" | "entwickler";

export type Skill = {
  /* Name des Ordners und des Skills. */
  ordner: string;
  /* Name in normalem Deutsch, steht groß auf der Karte. */
  titel: string;
  satz: string;
  /* Anwendungsbereiche, kurz, durch Komma getrennt. */
  wofuer: string;
};

/* Skill eines anderen Entwicklers, den Ilja zusätzlich nutzt. Wird verlinkt, nie mitgeliefert.
   Quelle, Lizenz und Pflege am 15.11.2026 bei GitHub geprüft. */
export type Empfehlung = { name: string; repo: string; lizenz: string; satz: string };

/* Vorher und Nachher aus dem Test: derselbe Auftrag, einmal ohne Skill, einmal mit.
   Mit `bilder` sind die Bildschirmfotos die Ausgabe aus dem Test. vorher und nachher beschreiben dann die Bilder (Alt-Texte). */
export type Beispiel = { skill: string; auftrag: string; vorher: string; nachher: string; beleg?: string; bilder?: { vorher: string; nachher: string } };

export type Paket = {
  id: PaketId;
  name: string;
  /* Kurzer Name für enge Stellen: Schilder auf der Bühne, Reiter, Knöpfe. */
  kurz: string;
  /* Versprechen in einem kurzen Satz, steht groß in der Karte. */
  claim: string;
  /* Akzentfarbe des Pakets auf der Bühne und in der Karte. */
  farbe: string;
  /* Der erste Auftrag zum Ausprobieren, wörtlich aus „00 Start hier“ des Pakets. Steht in der Download-Mail und auf der Dankeseite. */
  auftrag: string;
  skills: [Skill, Skill, Skill];
  empfehlungen: Empfehlung[];
};

export const PAKETE: Paket[] = [
  {
    id: "texte",
    name: "Texte",
    kurz: "Texte",
    claim: "Texte, die nach dir klingen.",
    farbe: "#E8D9B0",
    auftrag: "Schreib drei Sätze für meine Startseite. Ich bin [Beruf] in [Ort] und mache [Leistung]. Nutze menschlich-schreiben.",
    skills: [
      { ordner: "menschlich-schreiben", titel: "Texte ohne KI-Klang", satz: "Schreibt konkret und im Fluss, ohne Gedankenstriche und Werbefloskeln. Mit Prüfskript und deiner Stimme.", wofuer: "Webseiten-Texte, Mails, Angebote" },
      { ordner: "einfach-erklaeren", titel: "Einfach erklären", satz: "Erklärt Fachthemen so, dass jeder sie versteht und weiß, was er als Nächstes tut.", wofuer: "Anleitungen, Kundenfragen, Schulungen" },
      { ordner: "newsletter-schreiben", titel: "Newsletter schreiben", satz: "Macht aus einem Diktat eine persönliche Mail: drei Betreffs, ein Gedanke, ein Knopf, ein P.S.", wofuer: "Rundmails, Ankündigungen, letzte Aufrufe" },
    ],
    empfehlungen: [{ name: "humanizer", repo: "blader/humanizer", lizenz: "MIT", satz: "nimmt den KI-Klang aus englischen Texten" }],
  },
  {
    id: "design",
    name: "Design",
    kurz: "Design",
    claim: "Seiten, die hochwertig wirken.",
    farbe: "#D4AE5A",
    auftrag: "Mach diesen Abschnitt schöner. Nutze schoen-gestalten und zeig mir erst, was du ändern willst: [Datei oder Adresse]",
    skills: [
      { ordner: "schoen-gestalten", titel: "Schöner gestalten", satz: "Gestaltet Seiten, Folien und PDFs lesbar und hochwertig, ohne den Look aus dem KI-Baukasten.", wofuer: "Webseiten, Präsentationen, PDFs" },
      { ordner: "bilder-mit-stil", titel: "Bilder mit Stil", satz: "Legt den Stil einmal fest, schreibt die Bild-Aufträge dazu und prüft jedes Bild auf typische KI-Fehler.", wofuer: "Titelbilder, Illustrationen, Beitragsbilder" },
      { ordner: "vor-dem-livegang", titel: "Vor dem Livegang prüfen", satz: "Prüft Texte, Handy, Google und Impressum, bevor eine Seite online geht. Mit Prüfskript und Ampel.", wofuer: "neue Seiten, Übergaben an Kunden, Umbauten" },
    ],
    empfehlungen: [
      { name: "impeccable", repo: "pbakaus/impeccable", lizenz: "Apache 2.0", satz: "kritisiert und verfeinert das Design einer Webseite" },
      { name: "frontend-design", repo: "anthropics/claude-plugins-official", lizenz: "Apache 2.0", satz: "für Webseiten, die nicht nach Vorlage aussehen" },
    ],
  },
  {
    id: "seo",
    name: "SEO und KI-Suche",
    kurz: "SEO",
    claim: "Gefunden werden, bei Google und in KI-Antworten.",
    farbe: "#C9A24B",
    auftrag: "Mach diese Seite fit für Google, nach seo-seite: [Adresse oder Text]",
    skills: [
      { ordner: "themen-finden", titel: "Themen finden", satz: "Findet Themen in der Sprache deiner Kunden, prüft sie an der ersten Google-Seite und ordnet sie.", wofuer: "Blog-Planung, Ratgeber, alte Artikel aufräumen" },
      { ordner: "seo-seite", titel: "Seite für Google bauen", satz: "Liefert Titel, Beschreibung, Überschriften als Fragen, Fragen-Block und interne Links, mit Zeichenzahl.", wofuer: "Leistungsseiten, Artikel, zu lange Titel" },
      { ordner: "ki-suche", titel: "In KI-Antworten vorkommen", satz: "Schreibt Antworten, die ChatGPT und andere zitieren können, legt die llms.txt an und misst ehrlich.", wofuer: "Antwort-Absätze, llms.txt, Testfragen" },
    ],
    empfehlungen: [],
  },
  {
    id: "recherche",
    name: "Marktrecherche",
    kurz: "Recherche",
    claim: "Markt und Mitbewerber verstehen.",
    farbe: "#C98F5E",
    auftrag: "Schärfe meine Zielgruppe nach zielgruppe-schaerfen. Mein bester Kunde war [Beispiel].",
    skills: [
      { ordner: "mitbewerber-pruefen", titel: "Mitbewerber vergleichen", satz: "Stellt dich neben deine Mitbewerber: erster Satz, Angebot, Preis, Lücken, mit Sternen nach fester Regel.", wofuer: "neues Angebot, Preisfindung, neue Webseite" },
      { ordner: "zielgruppe-schaerfen", titel: "Zielgruppe schärfen", satz: "Beschreibt Wunschkunden über Prüfsteine und ein echtes Beispiel statt über eine erfundene Kunstfigur.", wofuer: "Angebot, Anzeigen, Kaltakquise" },
      { ordner: "quellen-pruefen", titel: "Zahlen und Quellen prüfen", satz: "Belegt jede Zahl mit Quelle und Datum und sagt offen, was sich nicht belegen ließ.", wofuer: "Artikel, Angebote, KI-Entwürfe" },
    ],
    empfehlungen: [{ name: "mattpocock-skills", repo: "mattpocock/skills", lizenz: "MIT", satz: "stellt mit /grill-me so lange Fragen, bis dein Plan keine Lücke mehr hat" }],
  },
  {
    id: "social",
    name: "Social Media",
    kurz: "Social Media",
    claim: "Beiträge planen, statt jeden Tag neu anzufangen.",
    farbe: "#E0A070",
    auftrag: "Schreib einen LinkedIn-Beitrag aus dieser Notiz: [was du erlebt oder gemessen hast]. Ich will, dass Leute [nächster Schritt].",
    skills: [
      { ordner: "beitrag-schreiben", titel: "Beiträge schreiben", satz: "Schreibt Beiträge mit starker erster Zeile, einem Gedanken und einem nächsten Schritt, samt Belegen.", wofuer: "LinkedIn, Instagram, Ankündigungen" },
      { ordner: "karussell-planen", titel: "Karussells planen", satz: "Plant ein Karussell Folie für Folie: eine Idee und ein Blickfang je Folie, lesbar am Handy.", wofuer: "Erklär-Reihen, Anleitungen, Serien" },
      { ordner: "reel-skript", titel: "Reel-Skripte schreiben", satz: "Schreibt das Skript für ein kurzes Video in deinen eigenen Worten und erfindet nichts dazu.", wofuer: "Reels, Shorts, Drehzettel" },
    ],
    empfehlungen: [{ name: "instagram-agent-skill", repo: "Jakeschincariol/instagram-agent-skill", lizenz: "MIT", satz: "englische Skills rund um Instagram, vom Reel bis zum Profil" }],
  },
  {
    id: "entwicklung",
    name: "Entwicklung",
    kurz: "Entwicklung",
    claim: "Sauber bauen und dabei Tokens sparen.",
    farbe: "#A9C4B0",
    auftrag: "Räum meine CLAUDE.md nach tokens-sparen auf. Nichts darf verloren gehen, nenn mir die Zeilen vorher und nachher.",
    skills: [
      { ordner: "tokens-sparen", titel: "Tokens sparen", satz: "Hält das Gedächtnis der Unterhaltung schlank: erst suchen, gezielt lesen, die kleinste Lösung zuerst.", wofuer: "lange Sitzungen, große Projekte, CLAUDE.md aufräumen" },
      { ordner: "sicher-bauen", titel: "Sicher bauen", satz: "Achtet auf Eingaben, Anmeldung, Rechte und Geheimnisse und belegt es am Ende mit echten Proben.", wofuer: "Formulare, Login, Datenbanken" },
      { ordner: "sauber-ausliefern", titel: "Sauber ausliefern", satz: "Arbeitet mit Plan und eigenem Zweig, prüft selbst und schaltet nichts live ohne dein Ja.", wofuer: "eigene Apps, Kundenprojekte, Team-Repos" },
    ],
    empfehlungen: [
      { name: "ponytail", repo: "DietrichGebert/ponytail", lizenz: "MIT", satz: "bringt Claude dazu, die einfachste Lösung zu bauen, die läuft" },
      { name: "planning-with-files", repo: "OthmanAdi/planning-with-files", lizenz: "MIT", satz: "legt Plan und Fortschritt als Dateien ab, die einen Neustart überstehen" },
      { name: "claude-hud", repo: "jarrodwatts/claude-hud", lizenz: "MIT", satz: "zeigt, wie voll das Gedächtnis der Unterhaltung ist" },
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
  /* Die Anleitung „Dein Setup als …“: ein Textbaustein für die CLAUDE.md (oder die Projekt-Anweisungen in der Claude-App)
     und drei erste Aufträge. Dankeseite und Mail zeigen sie. Eckige Klammern füllt der Leser selbst. */
  anleitung: { baustein: string; aufgaben: [string, string, string] };
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
    anleitung: {
      baustein: [
        "## Wie ich arbeite",
        "Ich bin Webdesigner und baue Webseiten für [deine Kunden].",
        "- Gestaltung: Nutze schoen-gestalten bei jeder sichtbaren Seite. Zeig mir erst den Bauplan, dann baust du.",
        "- Bilder: Plane sie mit bilder-mit-stil. Der Stil des Kunden steht in [Datei oder Ordner].",
        "- Suche: Jede neue Seite bekommt Titel, Beschreibung und Fragen nach seo-seite, den Antwort-Absatz nach ki-suche.",
        "- Texte: Schreib nach menschlich-schreiben, in der Anrede des Kunden.",
        "- Vor jeder Übergabe: Prüf die Seite mit vor-dem-livegang und zeig mir den Bericht.",
        "- Nichts geht live ohne mein Ja.",
      ].join("\n"),
      aufgaben: [
        "Gestalte den ersten Abschnitt der Startseite für [Kunde] neu. Nutze schoen-gestalten und zeig mir erst den Bauplan.",
        "Mach die Leistungsseite [Adresse] fit für Google, nach seo-seite. Zeig mir Titel und Beschreibung mit Zeichenzahl.",
        "Prüf [Adresse] mit vor-dem-livegang und schreib mir den Bericht mit Ampel.",
      ],
    },
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
    anleitung: {
      baustein: [
        "## Wie ich arbeite",
        "Ich mache Inhalte zu [dein Thema] für [dein Publikum], vor allem auf [deine Plattformen].",
        "- Stimme: Lies vor jedem Text meine-stimme.md im Skill menschlich-schreiben.",
        "- Beiträge: Nutze beitrag-schreiben. Jeder Beitrag hat einen Gedanken und einen nächsten Schritt.",
        "- Karussells: Erst der Plan nach karussell-planen, gebaut wird nach meinem Ja.",
        "- Videos: Skripte nach reel-skript, in meinen Worten. Erfinde nichts dazu.",
        "- Bilder: Mein Stil steht in [Datei]. Nutze bilder-mit-stil.",
        "- Gepostet wird nichts ohne mein Ja.",
      ].join("\n"),
      aufgaben: [
        "Füll mit mir meine-stimme.md aus. Stell mir dazu die Fragen einzeln.",
        "Mach aus dieser Notiz einen Beitrag für [Plattform], nach beitrag-schreiben: [Notiz].",
        "Plane aus demselben Gedanken ein Karussell mit sieben Folien, nach karussell-planen.",
      ],
    },
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
    anleitung: {
      baustein: [
        "## Wie ich arbeite",
        "Ich betreue die Konten von [Zahl] Kunden. Je Kunde gibt es einen Ordner mit seiner Stimme, seiner Zielgruppe und seinen Freigaben.",
        "- Vor jedem Text: Lies die Stimme des Kunden (meine-stimme.md in seinem Ordner).",
        "- Beiträge nach beitrag-schreiben, immer als ganzes Posting-Paket mit Belegen.",
        "- Karussells nach karussell-planen, Videos nach reel-skript.",
        "- Zahlen und Zitate prüfst du mit quellen-pruefen. Kundennamen und Kundenzahlen nur mit Freigabe.",
        "- Für neue Kunden zuerst zielgruppe-schaerfen und mitbewerber-pruefen.",
        "- Gepostet wird nichts ohne das Ja des Kunden.",
      ].join("\n"),
      aufgaben: [
        "Leg für [Kunde] einen Ordner an und füll mit mir seine meine-stimme.md aus.",
        "Schärfe die Zielgruppe von [Kunde] nach zielgruppe-schaerfen. Sein bester Kunde ist [Beispiel].",
        "Schreib den ersten Beitrag für [Kunde] als Posting-Paket, nach beitrag-schreiben: [Thema und Material].",
      ],
    },
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
    anleitung: {
      baustein: [
        "## Wie ich arbeite",
        "Ich schreibe Texte für [deine Kunden]: [Webseiten, Artikel, Newsletter].",
        "- Jeder Text folgt menschlich-schreiben. Die Stimme des Kunden steht in seiner meine-stimme.md.",
        "- Vor einem Artikel: Thema prüfen mit themen-finden, Aufbau nach seo-seite.",
        "- Jede Zahl und jedes Zitat läuft durch quellen-pruefen. Was nicht belegt ist, markierst du.",
        "- Newsletter nach newsletter-schreiben, immer mit drei Betreffs.",
        "- Du lieferst Entwürfe. Den letzten Schliff mache ich.",
      ].join("\n"),
      aufgaben: [
        "Prüf diesen Text mit menschlich-schreiben und zeig mir die Funde des Prüfskripts: [Text].",
        "Finde zehn Themen für [Kunde] nach themen-finden und sag mir, welche drei zuerst kommen.",
        "Prüf alle Zahlen in diesem Entwurf mit quellen-pruefen: [Text].",
      ],
    },
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
    anleitung: {
      baustein: [
        "## Wie ich arbeite",
        "Ich berate [deine Kunden] zu [dein Thema].",
        "- Erklär mein Fachgebiet nach einfach-erklaeren: kurze Antwort zuerst, Fachwörter übersetzt.",
        "- Meine Stimme steht in meine-stimme.md. Schreib nach menschlich-schreiben.",
        "- Meine Zielgruppe steht in [Datei]. Halte sie mit zielgruppe-schaerfen aktuell.",
        "- Zahlen nur mit Quelle, nach quellen-pruefen.",
        "- Beiträge nach beitrag-schreiben, aus dem, was ich wirklich erlebt oder gemessen habe.",
        "- Verschickt und gepostet wird nichts ohne mein Ja.",
      ].join("\n"),
      aufgaben: [
        "Schärfe meine Zielgruppe nach zielgruppe-schaerfen. Mein bester Kunde war [Beispiel].",
        "Vergleiche mein Angebot mit [drei Mitbewerbern] nach mitbewerber-pruefen.",
        "Erklär [ein Thema, das Kunden oft falsch verstehen] in einer kurzen Mail, nach einfach-erklaeren.",
      ],
    },
  },
  {
    id: "entwickler",
    name: "Software-Entwickler",
    als: "Software-Entwickler",
    setup: [
      { paket: "entwicklung", satz: "Claude baut in kleinen Schritten, prüft selbst und hält das Gedächtnis der Unterhaltung schlank." },
      { paket: "design", satz: "Oberflächen sehen hochwertig aus und werden vor dem Livegang geprüft." },
      { paket: "texte", satz: "Doku, Fehlermeldungen und Texte in der App versteht jeder." },
    ],
    anleitung: {
      baustein: [
        "# [Projekt]",
        "> Diese Datei ist ein Wegweiser, kein Lager. Sie sagt nur, wo du nachschaust.",
        "",
        "## Gilt immer",
        "- Erst suchen, dann gezielt lesen (tokens-sparen). Die kleinste Lösung zuerst.",
        "- Bei Formularen, Login und Datenbank: sicher-bauen, am Ende der Sicherheits-Check.",
        "- Jede Änderung nach sauber-ausliefern: eigener Zweig, nur eigene Dateien, alle Tests.",
        "- Nichts geht live ohne mein ausdrückliches Ja.",
        "",
        "## Wegweiser",
        "| Wenn es geht um … | dann lies |",
        "| Aufbau und Befehle | [Datei] |",
        "| Datenbank | [Datei] |",
        "",
        "## Stand",
        "[was fertig ist, was als Nächstes kommt]",
      ].join("\n"),
      aufgaben: [
        "Räum meine CLAUDE.md nach tokens-sparen auf. Nichts darf verloren gehen, nenn mir die Zeilen vorher und nachher.",
        "Mach für [meine letzte Änderung] den Sicherheits-Check nach sicher-bauen.",
        "Bring [kleine Korrektur] nach sauber-ausliefern bis zum fertigen Commit und frag mich vor dem Livegang.",
      ],
    },
  },
];

export const paketVon = (id: PaketId): Paket => PAKETE.find((p) => p.id === id)!;
export const berufVon = (id: BerufId): Beruf => BERUFE.find((b) => b.id === id)!;
/** Für welche Berufe ein Paket im Setup steht, in der Reihenfolge der Berufe. */
export const berufeMit = (id: PaketId): Beruf[] => BERUFE.filter((b) => b.setup.some((s) => s.paket === id));
export const ALLE_PAKETE: PaketId[] = PAKETE.map((p) => p.id);
export const SKILL_ZAHL = PAKETE.reduce((n, p) => n + p.skills.length, 0);

/* ── Die Wahl im Formular ─────────────────────────────────────────────────────
   Welche Pakete jemand will (leer heißt alle) und welches Setup. Die Wahl reist vom Formular über den Link in der
   Bestätigungsmail bis zur Dankeseite und zur Download-Mail. Unterwegs zählt nur, was hier als Kürzel steht:
   Alles andere fällt weg. So kann niemand über den Link fremden Text in eine Mail, ein Merkmal oder eine Seite bringen. */

export type Wahl = { pakete: PaketId[]; beruf: BerufId | null };

export const istPaket = (t: string): t is PaketId => PAKETE.some((p) => p.id === t);
export const istBeruf = (t: string): t is BerufId => BERUFE.some((b) => b.id === t);

/** Liest die Wahl aus dem Formular oder dem Link. Unbekanntes fällt weg. Ist kein bekanntes Paket dabei, gelten alle sechs.
 *  Die Reihenfolge ist immer die der Seite, egal wie sie im Link steht. */
export function wahlLesen(pakete?: string | null, beruf?: string | null): Wahl {
  const teile = new Set((pakete ?? "").split(","));
  const gewaehlt = ALLE_PAKETE.filter((id) => teile.has(id));
  return { pakete: gewaehlt.length ? gewaehlt : [...ALLE_PAKETE], beruf: beruf && istBeruf(beruf) ? beruf : null };
}

/** Die Wahl für einen Link, etwa „pakete=texte,seo&beruf=texter“. Alle sechs ohne Setup: leer. Nur Kürzel aus dieser Datei. */
export function wahlQuery(w: Wahl): string {
  const teile: string[] = [];
  if (w.pakete.length < ALLE_PAKETE.length) teile.push(`pakete=${w.pakete.join(",")}`);
  if (w.beruf) teile.push(`beruf=${w.beruf}`);
  return teile.join("&");
}

/** Merkmale am Kontakt nach dem Klick in der Bestätigungsmail: je Paket eins und eins für den Beruf.
 *  An ihnen können Strecken und Update-Mails hängen (Sabala Mail), etwa „Skill-Paket: Texte“ oder „Beruf: Texter“. */
export const wahlMerkmale = (w: Wahl): string[] => [
  ...w.pakete.map((id) => `Skill-Paket: ${paketVon(id).name}`),
  ...(w.beruf ? [`Beruf: ${berufVon(w.beruf).name}`] : []),
];

/** Die Wahl in einer Zeile fürs CRM (Briefkasten), etwa „Pakete: Texte, SEO und KI-Suche · Setup: Texter“. */
export const wahlText = (w: Wahl): string =>
  (w.pakete.length === ALLE_PAKETE.length ? "Pakete: alle sechs" : `Pakete: ${w.pakete.map((id) => paketVon(id).name).join(", ")}`) +
  (w.beruf ? ` · Setup: ${berufVon(w.beruf).name}` : "");

/** Was die Download-Mail über die Wahl wissen muss, als reine Daten (mail-html.ts kennt diese Datei nicht). */
export const wahlFuerMail = (w: Wahl) => ({
  pakete: w.pakete.map((id) => {
    const p = paketVon(id);
    return { name: p.name, kurz: p.kurz, claim: p.claim, skills: p.skills.map((k) => k.titel).join(", "), auftrag: p.auftrag };
  }),
  alle: w.pakete.length === ALLE_PAKETE.length,
  setup: w.beruf
    ? (() => {
        const b = berufVon(w.beruf);
        return { als: b.als, erstes: paketVon(b.setup[0].paket).name, aufgabe: b.anleitung.aufgaben[0] };
      })()
    : null,
  query: wahlQuery(w),
});

/** Fragen und Antworten: die Seite zeigt sie, page.tsx gibt sie als FAQPage an Google. Antworten kurz, 35 bis 60 Wörter. */
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
    q: "Warum nur drei Skills je Paket?",
    a: "Claude entscheidet bei jedem Auftrag selbst, welcher Skill passt. Drei klar getrennte Skills greifen zuverlässig, viele ähnliche kommen sich in die Quere. Die drei eines Pakets ergeben zusammen einen Ablauf, zum Beispiel Themen finden, Seite bauen, für KI-Suchen schärfen. Mit einem Setup hast du neun Skills, mit allen Paketen achtzehn. Neue kommen als Update dazu.",
  },
  {
    q: "Gibt es Skills nicht auch kostenlos auf GitHub?",
    a: "Ja, sehr viele, und die meisten sind auf Englisch. Hier bekommst du die Abkürzung: die Regeln, nach denen ich selbst arbeite, als fertige Skills auf Deutsch, mit Anleitung, fertigen Aufträgen und Beispielen. Zu den Paketen nenne ich dir außerdem die Skills anderer Entwickler, die ich zusätzlich nutze, mit Link zum Original und einem Satz, wofür.",
  },
  {
    q: "Bekomme ich Updates?",
    a: "Ja. Kommt ein Skill dazu oder wird einer besser, bekommst du eine Mail. Die neueste Fassung liegt immer hier auf der Seite. Was sich geändert hat, steht in jedem Paket in der Datei AENDERUNGEN.md. Deine eigenen Anpassungen sicherst du vorher, die Anleitung dazu liegt im Paket.",
  },
  {
    q: "Was ist ein Setup für meinen Beruf?",
    a: "Eine kurze Anleitung zu den drei Paketen, die zu deinem Beruf passen: in welcher Reihenfolge du sie nutzt, ein Textbaustein, der Claude deine Arbeitsweise erklärt, und drei erste Aufträge. Es gibt Setups für Webdesigner, Content Creator, Social Media Manager, Texter, Berater und Coaches sowie Software-Entwickler.",
  },
  {
    q: "Brauche ich dafür Claude Code?",
    a: "Nein. Die Skills laufen in Claude Code und in der Claude-App auf claude.ai, dort ab dem kostenlosen Plan. In der App lädst du jeden Skill als ZIP-Datei hoch, die Anleitung liegt im Paket. Am meisten holst du in Claude Code heraus, weil die Prüfskripte dort auch Dateien auf deinem Rechner prüfen. Das Paket Entwicklung ist für Claude Code gedacht.",
  },
  {
    q: "Kann ich die Skills an meine Sprache anpassen?",
    a: "Ja, dafür sind sie da. In der Datei meine-stimme.md im Paket Texte trägst du deine Anrede, deine Lieblingswörter, deine eigenen Tabu-Wörter und einen Text ein, der nach dir klingt. Ab dann schreibt Claude in deiner Stimme, und das Prüfskript kennt deine Liste. Auch die Skills der anderen Pakete lesen diese Datei.",
  },
  {
    q: "Darf ich die Pakete weitergeben?",
    a: "Nutzen darfst du sie für dich, dein Team und deine Kundenprojekte, verändern so viel du willst. Wer sie auch haben will, bekommt sie kostenlos hier auf dieser Seite, dann hat jeder die neueste Fassung.",
  },
  {
    q: "Wer steckt hinter den Skill-Paketen?",
    a: "Ich bin Ilja Krasevskij. Ich führe mein Geschäft mit Claude Code und zeige Selbständigen und kleinen Teams in der KI-Akademie, wie das geht. In den Skills stehen die Regeln, nach denen ich selbst schreibe, gestalte, recherchiere und baue.",
  },
];

/** Vorher und Nachher je Paket: echte Ausgaben aus dem unabhängigen Test vom 15.11.2026. Ein Tester hat denselben Auftrag
    erst ohne Skill gelöst, dann mit. Die Texte sind wörtlich übernommen und gekürzt, nichts ist geschönt.
    Hinweis zur Einordnung: Auch der Lauf ohne Skill stand schon unter der Regel „nichts erfinden“. Der Unterschied
    fällt bei einem gewöhnlichen Auftrag eher größer aus. */
export const BEISPIELE: Record<PaketId, Beispiel> = {
  texte: {
    skill: "menschlich-schreiben",
    auftrag: "Schreib drei Sätze für die Startseite der Schreinerei Holzwerk Brenner in Freiburg: Massivholzküchen nach Maß, seit 2009, 14 Küchen im letzten Jahr.",
    vorher:
      "Bei Holzwerk Brenner in Freiburg bauen wir seit 2009 Massivholzküchen nach Maß, die genau zu dir und deinem Zuhause passen. Im letzten Jahr sind in unserer Werkstatt 14 Küchen entstanden, jede einzelne mit viel Sorgfalt und Liebe zum Detail geplant und gefertigt. Erzähl uns von deiner Traumküche, und wir machen daraus ein Stück, das dich viele Jahre begleitet.",
    nachher: "Bei Holzwerk Brenner in Freiburg bauen wir seit 2009 Küchen aus Massivholz, jede nach Maß. Im letzten Jahr waren es 14, also gut eine im Monat. Wenn du gerade eine Küche planst, erzähl uns von deinem Raum.",
    beleg: "Prüfskript: vorher ein Fund, eine Werbefloskel im zweiten Satz. Nachher keiner.",
  },
  design: {
    skill: "schoen-gestalten",
    auftrag: "Mach diesen Abschnitt schöner. Es ist die Startseite vom Yogastudio Lindenhof in Kassel, Kurse für Anfänger ab 40, die Probestunde ist kostenlos.",
    vorher: "Bildschirmfoto ohne Skill: Überschrift, Text und Knopf stehen mittig, drei Karten sind am unteren Fensterrand angeschnitten.",
    nachher: "Bildschirmfoto mit Skill: Überschrift in zwei Zeilen links, rechts eine dunkle Tafel mit „0 €“ und drei Themen. Der Abschnitt passt ins Fenster.",
    beleg: "Nachgemessen im Laptop-Fenster 1366 × 650: Ohne Skill ist der Abschnitt 749 px hoch und ragt aus dem Fenster. Mit dem Skill sind es 451 px.",
    bilder: { vorher: "/images/skill-pakete/beispiel-design-ohne-skill.jpg", nachher: "/images/skill-pakete/beispiel-design-mit-skill.jpg" },
  },
  seo: {
    skill: "seo-seite",
    auftrag: "Mach die Seite „Manuelle Therapie“ meiner Physiotherapie-Praxis in Bamberg fit für Google.",
    vorher: "Bei der Manuellen Therapie untersuchen und behandeln wir Gelenke und Muskeln mit gezielten Handgriffen. In unserer Praxis am Stadtpark behandeln wir damit Beschwerden an Rücken, Nacken, Schulter und Kiefergelenk.",
    nachher:
      "Manuelle Therapie in Bamberg bekommen Sie in der Physiotherapie-Praxis am Stadtpark. Drei Therapeutinnen behandeln hier, alle mit dem Zertifikat Manuelle Therapie. Wir behandeln Beschwerden an Rücken, Nacken, Schulter und Kiefergelenk. Eine Behandlung dauert 20 bis 25 Minuten, meist stehen 6 Einheiten auf der Verordnung.",
    beleg: "Erster Absatz der Seite: Suchbegriff und Ort stehen jetzt im ersten Satz.",
  },
  recherche: {
    skill: "mitbewerber-pruefen",
    auftrag: "Vergleiche mich mit diesen vier Mitbewerbern. Passt mein Preis, und was bietet niemand an?",
    vorher: "Das hast laut den Texten nur du:\n1. Lieferung in 14 Tagen. Der Nächstschnellste ist B mit 4 Wochen. A braucht 6 bis 8 Wochen, D 10 Wochen, C sagt nichts dazu.\n2. Ein Album im Preis unter 3.900 €. D hat das Album auch inklusive, aber erst ab 3.900 €.",
    nachher:
      "Lieferung in 14 Tagen: allein unter allen, die eine Lieferzeit nennen. C nicht geprüft.\nAlbum im Preis: nicht allein. D: „Album inklusive“\nVersprechen „natürlich, nicht verstellt“: nicht allein. B: „ehrlich und ungestellt“",
    beleg: "Jedes Merkmal trägt „allein“, „nicht allein“ oder „nicht geprüft“, mit Beleg.",
  },
  social: {
    skill: "reel-skript",
    auftrag: "Mach aus dem Diktat ein Skript für 30 Sekunden: „Also ähm, ich wollte mal zeigen, wie wir, na ja, wie wir eine alte Kommode aufarbeiten, das dauert so drei Tage, und äh die meisten denken, das lohnt sich nicht.“",
    vorher: "Drei Tage Arbeit für eine alte Kommode. Lohnt sich das? Die meisten denken: nein. Ich zeig dir, was in den drei Tagen passiert. Tag eins: Beschläge ab, alte Oberfläche runter. Tag zwei: ausbessern und leimen, was wackelt. Tag drei: neue Oberfläche drauf, Beschläge wieder dran.",
    nachher: "Die meisten denken, das lohnt sich nicht. Ich wollte mal zeigen, wie wir eine alte Kommode aufarbeiten. Das dauert so drei Tage.",
    beleg: "Gesprochen wird nur, was sie gesagt hat. Die Schritte je Tag waren ohne Skill ausgedacht.",
  },
  entwicklung: {
    skill: "sicher-bauen",
    auftrag: "Schreib die Server-Route für ein Newsletter-Formular mit Bestätigungsmail in Node.js, die Einträge landen in SQLite.",
    vorher: "Vor dem Livegang fehlt noch:\n- echter Mailversand\n- eine Bremse gegen Massenanmeldungen (Rate-Limit) und ein Schutz gegen Bots\n- ein Abmeldelink in jeder Mail",
    nachher: "Je Absender 5 in 15 Minuten: von 20 gleichzeitigen kommen genau 5 durch. Je Adresse 3 Mails in 24 Stunden: von 20 gleichzeitigen gehen 3 Mails raus.",
    beleg: "Nachgemessen: Ohne Skill gingen bei 20 gleichzeitigen Anmeldungen 20 Mails raus.",
  },
};
