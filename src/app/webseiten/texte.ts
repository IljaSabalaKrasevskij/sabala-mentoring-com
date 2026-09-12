/* ─────────────────────────────────────────────────────────────────────────
   Alle Texte der Verkaufsseite, deutsch und englisch, in derselben Form.
   Angelegt am 12.9.2026, damit Englisch eine zweite Spalte ist und keine
   zweite Seite: eine kopierte Seite driftet ab dem dritten Wechsel auseinander.

   Regeln fuer beide Sprachen: kleines du beziehungsweise direktes you, keine
   Em-Dashes, keine Ausrufezeichen, nur echte Zahlen. Keine deutschen
   Anfuehrungszeichen (Turbopack-Falle), Zitate mit »«.
   ───────────────────────────────────────────────────────────────────────── */

export type Lang = "de" | "en";

export const ANDERE_SPRACHE: Record<Lang, { lang: Lang; pfad: string; label: string }> = {
  de: { lang: "en", pfad: "/en/websites", label: "English" },
  en: { lang: "de", pfad: "/webseiten", label: "Deutsch" },
};

const de = {
  meta: {
    title: "High-End Webdesign und Webentwicklung",
    description:
      "Premium-Webauftritte aus eigenem Code: eigenständig im Design, in unter zwei Sekunden geladen, sichtbar bei Google und in KI-Antworten. Kostenlose Potenzial-Analyse mit Website-Check, Wettbewerbsanalyse und Gespräch.",
    ogTitle: "High-End Webdesign und Webentwicklung · Sabala Studios",
    ogDescription:
      "Deine Webseite, gebaut um den Besten deiner Nische zu schlagen. Eigener Code, Ladezeit unter zwei Sekunden, SEO und GEO, ein Ansprechpartner.",
  },
  rail: ["Schaufenster", "Werthebel", "Für wen", "Arbeiten", "Prozess", "Fundament", "Analyse", "Pflege", "FAQ"],
  marquee: [
    "Future built here", "Luxury-Level ROI", "Verkaufsoptimiert", "Eigener Code", "Ladezeit unter 2 s",
    "SEO + GEO", "Wettbewerbs-Analyse", "DSGVO-konform", "Ein Ansprechpartner", "Pflege-Service",
  ],
  hero: {
    eyebrow: "// high-end web development",
    zeile1: "Design, das verkauft.",
    zeile2: "Und im Kopf bleibt.",
    sub: "High-End Webseiten für Premium-Dienstleister.",
    cta: "Tritt näher",
    siegelLabel: "Zur kostenlosen Potenzial-Analyse",
  },
  werthebel: {
    eyebrow: "// luxury-level roi · warum sich premium rechnet",
    headline: "Hochwertigkeit ist kein Schmuck. Sie ist ein Werthebel.",
    hebel: [
      { term: "Gefunden werden", line: "bei Google und in KI-Suchen" },
      { term: "Vertrauen", line: "im ersten Augenblick" },
      { term: "Klare Zielgruppe", line: "eine Botschaft, nicht vier" },
      { term: "Keine Ablenkung", line: "ein Weg, ein nächster Schritt" },
      { term: "Hochwertigkeit", line: "in jedem Detail spürbar" },
    ],
    ergebnisLabel: "Das Ergebnis",
    ergebnis: "Wer so auftritt, kann höhere Preise verlangen. Und holt die Investition in die eigene Seite schneller wieder rein.",
  },
  fuerWen: {
    geist: "Für wen",
    eyebrow: "// für wen das gebaut ist",
    headline: "Für Premium-Dienstleister, deren Auftritt dem Angebot hinterherhinkt.",
    lead: "Der erste Eindruck entscheidet, ob dein Preis als selbstverständlich gilt oder als Verhandlungsbasis. Deshalb baue ich Webseiten, die Premium sofort sichtbar machen.",
    tafel: "Wenn du hier richtig bist.",
    fuerDich: [
      "Berater, Kanzleien, Studios und Praxen mit hochpreisigen Leistungen",
      "Dein Angebot ist Premium, deine Webseite sieht nach Baukasten aus",
      "Kunden vergleichen dich vor dem ersten Gespräch mit den Besten deiner Nische",
      "Du willst einen Auftritt, der deinen Preis erklärt, bevor du ihn nennst",
    ],
    absage: "Nicht gebaut für Preiskämpfer, die über den günstigsten Anbieter gewinnen wollen, und nicht für Projekte, bei denen der Baukasten wirklich reicht.",
    zitat: "»Eine gute Webseite ist ein aufgeräumtes Schaufenster mit einem klaren Angebot, das die richtigen Menschen bewegt, einzutreten.«",
    zitatName: "Ilja Sabala",
    bildAlt: "Der Sabala-Adler am Schreibtisch, Blick nach vorn",
  },
  galerie: {
    eyebrow: "// echte arbeit",
    headline: "Keine Mockups. Alles live.",
    alleCases: "Alle Case Studies",
    liveAnsehen: "Live ansehen",
    caseStudy: "Case Study",
    vorherige: "Vorherige Arbeit",
    naechste: "Nächste Arbeit",
    arbeiten: [
      { note: "Industrielles Sourcing für EPC-Projekte", rolle: "Konzept, Design, Creatives, Technik und Launch aus einer Hand", badge: "Neu · live seit September 2026" },
      { note: "Personal Training München", rolle: "Brand-System, Blog, SEO und Messung ab Tag eins", badge: null },
      { note: "Klangmassage am Bodensee", rolle: "Konzept, Texte, Prototyp und Videos", badge: null },
      { note: "Lead-Radar für Vertriebsteams", rolle: "Produkt, Plattform und zwei Sprachen", badge: null },
      { note: "Begleitung für Familienunternehmen", rolle: "Positionierung, Design und Bau", badge: null },
      { note: "Vertriebssystem für Cybersecurity", rolle: "Fünf-Schritte-Vertrieb, Seite und Creatives", badge: null },
      { note: "Sabala Studios, das eigene Haus", rolle: "Alles selbst gebaut, alles selbst im Einsatz", badge: null },
    ],
  },
  prozess: {
    eyebrow: "// der weg",
    headline: "Drei Schritte, kein Agentur-Nebel.",
    schritte: [
      { term: "Analyse & Gespräch", tag: "kostenlos", line: "Website-Check, Wettbewerbsanalyse, 30 Minuten Gespräch. Danach weißt du, wo du stehst." },
      { term: "Angebot, Konzept, Build", tag: null, line: "Klarer Rahmen mit Preis, dann Zielgruppe, Story, Design und eigener Code. Du siehst Zwischenstände." },
      { term: "Launch & Pflege", tag: null, line: "Sauber live, sauber übergeben, und danach als Partner betreut. Technik ist ab hier mein Thema." },
    ],
  },
  fundament: {
    eyebrow: "// das fundament",
    headline: "Technik, über die du nie wieder nachdenken musst.",
    punkte: [
      { stat: "< 2 s", term: "Ladezeit auf dem Handy", line: "Eigener Code statt Template-Ballast. PageSpeed über 90, und das bleibt auch nach dem Launch so." },
      { stat: "0", term: "Cookie-Banner nötig", line: "DSGVO-konform ohne Tracking-Zirkus. Analytics laufen selbst gehostet, deine Besucher bleiben unbehelligt." },
      { stat: "100 %", term: "dein Eigentum", line: "Eigener Code im eigenen Repo, auf deinen Namen. Wenn du irgendwann gehst, nimmst du alles mit." },
      { stat: "1", term: "Ansprechpartner", line: "Strategie, Design, Code, Betrieb: eine Hand, eine Verantwortung, keine Reibung zwischen Gewerken." },
    ],
    fussnote: "Diese Seite hier läuft auf genau dem Setup, das du bekommst. Was ich verkaufe, benutze ich selbst, jeden Tag.",
  },
  analyse: {
    eyebrow: "// dein einstieg · kostenlos",
    headline: "Lass dein Potenzial analysieren.",
    lead: "Bevor über ein Projekt gesprochen wird, bekommst du Klarheit. Vier Bausteine, ein Gespräch, null Risiko:",
    stack: [
      { term: "Website-Check über fünf Ebenen", line: "SEO, GEO, Content, Design und Tempo: wo deine Seite trägt und wo sie dich bremst." },
      { term: "Tiefe Wettbewerbsanalyse", line: "Was deine Kunden suchen, wer in deiner Nische vorne steht, womit, und wo die Lücken sind." },
      { term: "Beratungsgespräch", line: "Wir gehen die Ergebnisse zusammen durch, 30 Minuten, beidseitig unverbindlich." },
      { term: "Deine Potenzial-Liste", line: "Priorisiert nach Hebel. Sie gehört dir, ganz gleich, wie du dich danach entscheidest." },
    ],
    siegel: "Kein Risiko · unverbindlich · das Ergebnis bleibt bei dir",
    formTitel: "Wo dürfen wir hinschauen?",
    feldWebseite: "Deine Webseite",
    feldMail: "Deine E-Mail",
    platzhalterWebseite: "deine-seite.de",
    platzhalterMail: "du@firma.de",
    einwilligung: "Ich bin einverstanden, dass meine Angaben zur Erstellung und Zusendung der Analyse verarbeitet werden. Details in der",
    datenschutz: "Datenschutzerklärung",
    knopf: "Potenzial-Analyse anfordern",
    dankeTitel: "Angekommen. Danke dir.",
    dankeText: "Ich schaue mir deine Seite und deine Nische persönlich an und melde mich per E-Mail für das Gespräch. Keine Automatenmail, kein Spam.",
    person: "Ilja Krasevskij",
    personText: "Du sprichst direkt mit mir, nicht mit einem Vertrieb. Analyse und Gespräch mache ich persönlich.",
    personAlt: "Ilja Krasevskij im Studio",
    fehlerWebseite: "Bitte gib eine gültige Webseiten-Adresse ein.",
    fehlerMail: "Bitte gib eine gültige E-Mail-Adresse ein.",
    fehlerEinwilligung: "Bitte bestätige die Datenschutzhinweise.",
    fehlerAllgemein: "Das hat gerade nicht geklappt. Schreib mir alternativ direkt an sabala@sabala-mentoring.com",
  },
  pflege: {
    eyebrow: "// nach dem launch",
    headline: "Nach dem Launch fängt es erst an.",
    lead: "Eine Webseite ist kein Projektende. Als dein technischer Partner übernehme ich Betrieb und Wachstum, in drei klaren Stufen.",
    meistGewaehlt: "Meist gewählt",
    imMonat: "im Monat",
    aufAnfrage: "Auf Anfrage",
    stufen: [
      {
        term: "Basis", kurz: "Betrieb", cta: "Analyse starten",
        alt: "Die Fassade des Studios bei Nacht",
        punkte: ["Updates und Sicherheit", "Backups und Monitoring", "Verfügbarkeit im Blick, rund um die Uhr"],
        line: "Deine Seite läuft, du merkst nichts davon.",
      },
      {
        term: "Wachstum", kurz: "Betrieb und Pflege", cta: "Analyse starten",
        alt: "Der Empfang im Studio",
        punkte: [
          "Alles aus Basis",
          "Zwei kleine Änderungen im Monat, je bis 30 Minuten",
          "Texte, Bilder, Preise, ein Blogbeitrag eingepflegt",
          "Monatsbericht in Klartext: Besucher, Rankings, KI-Sichtbarkeit",
          "Antwort innerhalb eines Werktags",
        ],
        line: "Deine Seite bleibt aktuell, ohne dass du dich kümmerst.",
      },
      {
        term: "Partner", kurz: "Zusammenarbeit", cta: "Partnerschaft besprechen",
        alt: "Der Ausstellungssaal im Studio",
        punkte: [
          "Alles aus Wachstum",
          "SEO und GEO laufend, mit meinen Agenten",
          "Neue Seiten und Landingpages, von mir gebaut",
          "Dein stärkster Wettbewerber im Blick",
          "Strategie jedes Quartal",
        ],
        line: "Wir entwickeln deinen Auftritt gemeinsam weiter.",
      },
    ],
    nichtEnthalten: "Nicht in Basis und Wachstum enthalten: neue Seiten und Landingpages, Umbauten an Struktur oder Design und laufende SEO- und GEO-Arbeit. Das ist Partner.",
    nettoHinweis: "Preise netto zzgl. MwSt. · Angebote für Unternehmen und Selbständige · monatlich, kein Jahresvertrag",
  },
  faq: {
    badge: "Fragen an den Tresen",
    zeile1: "Ehrliche Antworten,",
    zeile2: "bevor du fragst.",
    bildAlt: "Der Sabala-Adler am Empfangstresen",
    bildLabel: "Frag einfach",
    schluss: "Was hier nicht steht, beantworte ich dir im Gespräch.",
    fragen: [
      {
        q: "Was kostet eine Webseite bei dir?",
        a: "Das Projekt bekommt einen individuellen Rahmen, weil es kein Produkt von der Stange ist: ein OnePager liegt woanders als eine komplette Markenwelt. Nach der Analyse steht dein Angebot mit Umfang, Zeitplan und Preis. Die laufende Pflege ist transparent: Basis 70 und Wachstum 249 Euro im Monat netto, die Partnerschaft nach Umfang auf Anfrage.",
      },
      {
        q: "Wie lange dauert ein Projekt?",
        a: "Ein OnePager meist zwei bis drei Wochen ab vollständigen Inhalten, größere Markenwelten mehrere Wochen. Du bekommst vor dem Start einen ehrlichen Zeitplan, keine Wunschtermine.",
      },
      {
        q: "Wie läuft die kostenlose Potenzial-Analyse ab?",
        a: "Du schickst mir deine Webseite. Ich prüfe SEO, GEO, Content, Design und Tempo und schaue mir deine Wettbewerber an. Danach gehen wir die Ergebnisse in einem Gespräch durch, 30 Minuten, beidseitig unverbindlich. Die Analyse gehört dir, ganz gleich, wie du dich entscheidest.",
      },
      {
        q: "Warum kein Baukasten?",
        a: "Einen Baukasten mietest du, eigenen Code besitzt du. Dazu kommen Tempo (unter zwei Sekunden Ladezeit), volle Gestaltungsfreiheit und sauberes SEO ohne Plugin-Schichten. Wenn du irgendwann gehen willst, nimmst du alles mit.",
      },
      {
        q: "Du arbeitest allein. Was, wenn du ausfällst?",
        a: "Deshalb liegt alles auf deinen Namen: die Domain, das Hosting und der Code in deinem eigenen GitHub-Repo. Es ist gängiger Code, kein Geheimsystem. Jeder Entwickler kann dort weitermachen, wo ich aufhöre. Du bist an mich gebunden, solange die Arbeit stimmt, und keinen Tag länger.",
      },
    ],
  },
  finale: {
    headline: "Der erste Schritt kostet dich nichts.",
    lead: "Website-Check, Wettbewerbsanalyse und Gespräch: danach weißt du, wo deine Seite steht und was der größte Hebel ist. Alles Weitere entscheidest du.",
    cta: "Kostenlose Potenzial-Analyse",
    siegel: ["Kein Risiko", "Klare Expertise", "Klare Potenziale"],
  },
  schema: {
    serviceName: "Premium-Webdesign mit KI",
    serviceType: "Webdesign & Webentwicklung",
    serviceDescription:
      "Premium-Webauftritte, gebaut gegen die Spitze der eigenen Nische. Einstieg über die kostenlose Potenzial-Analyse: Website-Check über SEO, GEO, Content, Design und Tempo plus tiefe Wettbewerbsanalyse und Beratungsgespräch. Danach Konzept, eigener Code, Ladezeit unter zwei Sekunden, DSGVO-konform, laufende Pflege in drei Stufen.",
    analyseName: "Kostenlose Potenzial-Analyse",
    analyseBeschreibung: "Website-Check über fünf Ebenen, Wettbewerbsanalyse und Beratungsgespräch, unverbindlich.",
    basisName: "Pflege Basis",
    basisBeschreibung: "Updates, Sicherheit, Backups und Monitoring. 70 Euro im Monat netto.",
    wachstumName: "Pflege Wachstum",
    wachstumBeschreibung: "Dazu zwei kleine Änderungen im Monat, je bis 30 Minuten, und ein Monatsbericht in Klartext. 249 Euro im Monat netto.",
    partnerName: "Pflege Partner",
    partnerBeschreibung: "Dazu laufende SEO- und GEO-Arbeit, neue Seiten und Ausbau sowie Strategie jedes Quartal. Preis auf Anfrage, abhängig vom Umfang.",
  },
};

const en: typeof de = {
  meta: {
    title: "High-End Web Design and Development",
    description:
      "Premium websites in custom code: distinctive design, under two seconds to load, visible on Google and in AI answers. Free potential analysis: website check, competitor research and a call.",
    ogTitle: "High-End Web Design and Development · Sabala Studios",
    ogDescription:
      "A website built to beat the best in your niche. Custom code, under two seconds, SEO and GEO, one person to talk to.",
  },
  rail: ["Shop window", "Leverage", "Who for", "Work", "Process", "Foundation", "Analysis", "Care", "FAQ"],
  marquee: [
    "Future built here", "Luxury-Level ROI", "Built to sell", "Custom code", "Under 2 s to load",
    "SEO + GEO", "Competitor research", "GDPR compliant", "One person to talk to", "Care plan",
  ],
  hero: {
    eyebrow: "// high-end web development",
    zeile1: "Design that sells.",
    zeile2: "And sticks.",
    sub: "High-end websites for people who charge premium prices.",
    cta: "Step closer",
    siegelLabel: "To the free potential analysis",
  },
  werthebel: {
    eyebrow: "// luxury-level roi · why premium pays off",
    headline: "Quality is not decoration. It is leverage.",
    hebel: [
      { term: "Being found", line: "on Google and in AI search" },
      { term: "Trust", line: "in the first moment" },
      { term: "One clear audience", line: "one message, not four" },
      { term: "No distraction", line: "one path, one next step" },
      { term: "Quality", line: "felt in every detail" },
    ],
    ergebnisLabel: "The result",
    ergebnis: "Show up like this and you can charge more. And the site pays for itself sooner.",
  },
  fuerWen: {
    geist: "Who for",
    eyebrow: "// who this is built for",
    headline: "For experts whose website undersells them.",
    lead: "The first impression decides whether your price reads as a given or as an opening bid. I build websites that settle that question in the first two seconds.",
    tafel: "This is for you if.",
    fuerDich: [
      "Consultants, law firms, studios and practices with high-priced services",
      "Your work is premium, your website looks rented",
      "Clients compare you to the best in your niche before the first call",
      "You want a site that justifies your price before you name it",
    ],
    absage: "Not for people who win on being cheapest, and not for projects where a website builder honestly does the job.",
    zitat: "»A good website is a well arranged shop window with one clear offer that moves the right people to step inside.«",
    zitatName: "Ilja Sabala",
    bildAlt: "The Sabala eagle at the desk, facing forward",
  },
  galerie: {
    eyebrow: "// real work",
    headline: "No mockups. Every one is live.",
    alleCases: "All case studies",
    liveAnsehen: "View live",
    caseStudy: "Case study",
    vorherige: "Previous project",
    naechste: "Next project",
    arbeiten: [
      { note: "Industrial sourcing for EPC projects", rolle: "Concept, design, creatives, build and launch from one hand", badge: "New · live since September 2026" },
      { note: "Personal training in Munich", rolle: "Brand system, blog, SEO and measurement from day one", badge: null },
      { note: "Sound massage at Lake Constance", rolle: "Concept, copy, prototype and films", badge: null },
      { note: "Lead radar for sales teams", rolle: "Product, platform and two languages", badge: null },
      { note: "Guidance for family businesses", rolle: "Positioning, design and build", badge: null },
      { note: "Sales system for cybersecurity", rolle: "Five step sales motion, site and creatives", badge: null },
      { note: "Sabala Studios, the house itself", rolle: "Built by me, used by me every day", badge: null },
    ],
  },
  prozess: {
    eyebrow: "// the path",
    headline: "Three steps. No agency fog.",
    schritte: [
      { term: "Analysis & call", tag: "free", line: "Website check, competitor research, a 30 minute call. After that you know where you stand." },
      { term: "Offer, concept, build", tag: null, line: "A clear scope with a price, then audience, story, design and custom code. You see the work in progress." },
      { term: "Launch & care", tag: null, line: "Live cleanly, handed over cleanly, and looked after as a partner. Technology is my problem from here." },
    ],
  },
  fundament: {
    eyebrow: "// the foundation",
    headline: "Technology you never have to think about again.",
    punkte: [
      { stat: "< 2 s", term: "to load on a phone", line: "Custom code instead of template weight. PageSpeed above 90, and it stays that way after launch." },
      { stat: "0", term: "cookie banners needed", line: "GDPR compliant without the tracking circus. Analytics are self hosted, your visitors are left alone." },
      { stat: "100 %", term: "yours to own", line: "Custom code in your own repository, in your name. If you ever leave, you take everything with you." },
      { stat: "1", term: "person to talk to", line: "Strategy, design, code, operations: one hand, one responsibility, no friction between trades." },
    ],
    fussnote: "This page runs on the exact setup you get. I sell what I use, every day.",
  },
  analyse: {
    eyebrow: "// your first step · free",
    headline: "See what your site is leaving on the table.",
    lead: "Before we talk about a project, you get clarity. Four parts, one call, nothing at stake:",
    stack: [
      { term: "Website check across five layers", line: "SEO, GEO, content, design and speed: where your site carries you and where it holds you back." },
      { term: "Deep competitor research", line: "What your clients search for, who leads your niche, with what, and where the gaps are." },
      { term: "Consulting call", line: "We go through the findings together, 30 minutes, no obligation on either side." },
      { term: "Your potential list", line: "Ranked by leverage. It is yours, whatever you decide afterwards." },
    ],
    siegel: "No risk · no obligation · the result stays with you",
    formTitel: "Where should we look?",
    feldWebseite: "Your website",
    feldMail: "Your email",
    platzhalterWebseite: "your-site.com",
    platzhalterMail: "you@company.com",
    einwilligung: "I agree that my details may be processed to prepare and send the analysis. Details in the",
    datenschutz: "privacy policy",
    knopf: "Request the potential analysis",
    dankeTitel: "Arrived. Thank you.",
    dankeText: "I will look at your site and your niche personally and get back to you by email to arrange the call. No automated mail, no spam.",
    person: "Ilja Krasevskij",
    personText: "You speak directly with me, not with a sales team. I do the analysis and the call myself.",
    personAlt: "Ilja Krasevskij in the studio",
    fehlerWebseite: "Please enter a valid website address.",
    fehlerMail: "Please enter a valid email address.",
    fehlerEinwilligung: "Please confirm the privacy notice.",
    fehlerAllgemein: "That did not work just now. Write to me directly at sabala@sabala-mentoring.com instead.",
  },
  pflege: {
    eyebrow: "// after the launch",
    headline: "The launch is where it starts.",
    lead: "A launch is not an ending. As your technical partner I run it and grow it, in three clear tiers.",
    meistGewaehlt: "Most chosen",
    imMonat: "per month",
    aufAnfrage: "On request",
    stufen: [
      {
        term: "Basic", kurz: "Operations", cta: "Start with the analysis",
        alt: "The studio front at night",
        punkte: ["Updates and security", "Backups and monitoring", "Uptime watched, around the clock"],
        line: "Your site runs, and you never notice it.",
      },
      {
        term: "Growth", kurz: "Operations and care", cta: "Start with the analysis",
        alt: "The reception in the studio",
        punkte: [
          "Everything in Basic",
          "Two small changes a month, up to 30 minutes each",
          "Copy, images, prices, one blog post published",
          "Monthly report in plain words: visitors, rankings, AI visibility",
          "An answer within one working day",
        ],
        line: "Your site stays current without you having to think about it.",
      },
      {
        term: "Partner", kurz: "Collaboration", cta: "Discuss a partnership",
        alt: "The exhibition room in the studio",
        punkte: [
          "Everything in Growth",
          "Ongoing SEO and GEO, run by my agents",
          "New pages and landing pages, built by me",
          "Your strongest competitor watched",
          "Strategy every quarter",
        ],
        line: "We develop your presence together.",
      },
    ],
    nichtEnthalten: "Not included in Basic and Growth: new pages and landing pages, rebuilds of structure or design, and ongoing SEO and GEO work. That is Partner.",
    nettoHinweis: "Prices net, plus VAT · offered to companies and self-employed people · monthly, no annual contract",
  },
  faq: {
    badge: "Questions at the counter",
    zeile1: "Straight answers,",
    zeile2: "before you ask.",
    bildAlt: "The Sabala eagle at the reception counter",
    bildLabel: "Just ask",
    schluss: "Anything not covered here I will answer in the call.",
    fragen: [
      {
        q: "What does a website cost with you?",
        a: "Every project gets its own scope, because it is not an off the shelf product: a one-pager sits somewhere very different from a full brand world. After the analysis you get your offer with scope, timeline and price. The ongoing care is transparent: Basic 70 and Growth 249 euro per month net, the partnership on request depending on scope.",
      },
      {
        q: "How long does a project take?",
        a: "A one-pager usually two to three weeks once the content is complete, larger brand worlds several weeks. You get an honest timeline before we start, not a wishful date.",
      },
      {
        q: "How does the free potential analysis work?",
        a: "You send me your website. I check SEO, GEO, content, design and speed and look at your competitors. Then we go through the findings in a call, 30 minutes, no obligation on either side. The analysis is yours, whatever you decide.",
      },
      {
        q: "Why not a website builder?",
        a: "A builder you rent, custom code you own. On top of that come speed (under two seconds to load), full design freedom and clean SEO without layers of plugins. If you ever want to leave, you take everything with you.",
      },
      {
        q: "You work alone. What happens if you drop out?",
        a: "That is exactly why everything is in your name: the domain, the hosting and the code in your own GitHub repository. It is ordinary code, not a secret system. Any developer can pick up where I left off. You are tied to me for as long as the work is good, and not a day longer.",
      },
    ],
  },
  finale: {
    headline: "The first step costs you nothing.",
    lead: "Website check, competitor research and a call: afterwards you know where your site stands and what the biggest lever is. Everything beyond that is your decision.",
    cta: "Free potential analysis",
    siegel: ["No risk", "Clear expertise", "Clear potential"],
  },
  schema: {
    serviceName: "Premium web design with AI",
    serviceType: "Web design & web development",
    serviceDescription:
      "Premium websites built against the leaders of your own niche. The way in is the free potential analysis: a website check across SEO, GEO, content, design and speed plus deep competitor research and a consulting call. After that concept, custom code, under two seconds to load, GDPR compliant, ongoing care in three tiers.",
    analyseName: "Free potential analysis",
    analyseBeschreibung: "Website check across five layers, competitor research and a consulting call, no obligation.",
    basisName: "Care Basic",
    basisBeschreibung: "Updates, security, backups and monitoring. 70 euro per month net.",
    wachstumName: "Care Growth",
    wachstumBeschreibung: "Plus two small changes a month, up to 30 minutes each, and a monthly report in plain words. 249 euro per month net.",
    partnerName: "Care Partner",
    partnerBeschreibung: "Plus ongoing SEO and GEO work, new pages and expansion as well as strategy every quarter. Price on request, depending on scope.",
  },
};

export const TEXTE: Record<Lang, typeof de> = { de, en };
