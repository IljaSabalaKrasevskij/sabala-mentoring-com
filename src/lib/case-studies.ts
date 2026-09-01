/**
 * Case Studies: projects built end to end with Claude. Bilingual (de / en).
 *
 * Add a screenshot: drop a 16:9 image into /public/case-studies/ and set
 * `image` on the entry. Text fields are Localized ({ de, en }); the active
 * language is chosen in CaseStudiesView. Order in this array = order on the page.
 */

export type Locale = "de" | "en";
export type Localized = { de: string; en: string };

export type CategoryKey = "webseiten" | "agent-os" | "lead-gen" | "weitere";

export type CaseStudy = {
  id: string;
  category: CategoryKey;
  title: Localized;
  industry: Localized;
  challenge: Localized;
  claudeUsage: Localized;
  result: Localized;
  tags: string[];
  url?: string;
  isPrivate?: boolean;
  image?: string;
};

/** Rubriken in Anzeige-Reihenfolge. */
export const CATEGORIES: { key: CategoryKey; label: Localized; line: Localized }[] = [
  {
    key: "webseiten",
    label: { de: "Webseiten & Plattformen", en: "Websites & Platforms" },
    line: {
      de: "Premium-Auftritte und Plattformen, live bei echten Kunden.",
      en: "Premium sites and platforms, live with real clients.",
    },
  },
  {
    key: "agent-os",
    label: { de: "Agent-OS-Systeme", en: "Agent OS Systems" },
    line: {
      de: "Dashboards und Agenten, die täglich echte Arbeit übernehmen.",
      en: "Dashboards and agents doing real daily work.",
    },
  },
  {
    key: "lead-gen",
    label: { de: "Lead-Gen-Systeme", en: "Lead Gen Systems" },
    line: {
      de: "Systeme, die täglich passende Kunden finden und bewerten.",
      en: "Systems that find and score the right prospects every day.",
    },
  },
  {
    key: "weitere",
    label: { de: "Weitere Use Cases", en: "More Use Cases" },
    line: {
      de: "Werkzeuge und Experimente, die den Alltag leichter machen.",
      en: "Tools and experiments that make everyday work lighter.",
    },
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "sabala-mentoring",
    category: "webseiten",
    title: {
      de: "Sabala Mentoring: KI-Studio & Akademie",
      en: "Sabala Mentoring: AI Studio & Academy",
    },
    industry: { de: "KI-Studio · eigene Marke", en: "AI Studio · own brand" },
    challenge: {
      de: "Ein Ein-Personen-KI-Studio, das drei Dinge macht (Webseiten, Co-Development, eine KI-Akademie), auf einer einzigen Startseite zeigen, ohne dass der Besucher den Faden verliert.",
      en: "Position a one person AI studio that does three different things (websites, co-development, an AI academy) on a single homepage, without the visitor losing the thread.",
    },
    claudeUsage: {
      de: "Die ganze Seite mit Claude Code gebaut: Solar-System-Hero mit React Three Fiber, Sales-Page für die KI-Akademie, Lead-Pipeline in Turso libSQL, Scroll-Choreografie mit Lenis. Architektur, Texte und Code in derselben Schleife geprüft.",
      en: "Built the entire site with Claude Code: React Three Fiber solar system hero, sales page for the AI academy, lead pipeline into Turso libSQL, scroll choreography with Lenis. Architecture, copy and code reviewed in the same loop.",
    },
    result: {
      de: "Live auf sabala-mentoring.com. Die KI-Akademie-Sales-Page mit zwei ausverkauften Durchgängen gestartet, plus aktive Lead-Pipeline über das Kontaktformular ins eigene Dashboard.",
      en: "Live on sabala-mentoring.com. Launched the academy sales page with two sold out cohorts and an active leads pipeline through the contact form into a self hosted dashboard.",
    },
    tags: ["Claude Code", "Next.js 16", "React Three Fiber", "Turso"],
    url: "https://sabala-mentoring.com",
    image: "/case-studies/sabala-mentoring.jpg",
  },
  {
    id: "yuna-sports-nutrition",
    category: "webseiten",
    title: {
      de: "YUNA Sports & Nutrition: Stärker. Definierter. Messbar.",
      en: "YUNA Sports & Nutrition: Stronger. More Defined. Measurable.",
    },
    industry: { de: "Personal Training · München", en: "Personal Training · Munich" },
    challenge: {
      de: "Ein Premium-Studio mit vollen Slots, aber ohne Bühne: die Kanäle erzählten vier verschiedene Zielgruppen-Geschichten, der Auftritt lief auf WordPress und niemand konnte messen, was Sichtbarkeit tatsächlich bringt.",
      en: "A premium studio with full slots but no stage: the channels told four different audience stories, the site ran on WordPress and nobody could measure what visibility actually delivered.",
    },
    claudeUsage: {
      de: "Brand Book und Instagram zu einem Web-Brandguide zusammengeführt, die Zielgruppe auf Berufstätige mit vollem Terminkalender geschärft, dann One-Pager und Blog mit Claude Code in eigenem Code gebaut: dunkler Premium-Look, Search Console, Bing, IndexNow und selbst gehostetes Umami ab Tag eins, dazu eine QR-Linkseite für die Visitenkarten mit zählbaren Scans.",
      en: "Merged the brand book and Instagram into one web brand guide, sharpened the audience to busy professionals, then built the one-pager and blog with Claude Code in custom code: dark premium look, Search Console, Bing, IndexNow and self-hosted Umami from day one, plus a QR link page for the business cards with countable scans.",
    },
    result: {
      de: "Live seit August 2026: ein Auftritt, der das Studio-Niveau endlich zeigt, eine Botschaft statt vier, und Messung von Anfang an, von der Suchanfrage bis zum gescannten Karten-QR.",
      en: "Live since August 2026: a presence that finally matches the studio, one message instead of four, and measurement from day one, from search query to scanned card QR.",
    },
    tags: ["Webdesign", "Brand-System", "SEO + GEO", "Umami"],
    url: "https://yuna-sports-nutrition.com",
    image: "/case-studies/yuna.jpg",
  },
  {
    id: "dielommel",
    category: "webseiten",
    title: {
      de: "Stefanie Lommel: Begleitung für Familienunternehmen",
      en: "Stefanie Lommel: Coaching for Family Businesses",
    },
    industry: { de: "Coaching · B2B", en: "Coaching · B2B" },
    challenge: {
      de: "Eine breite Beratungspraxis auf eine klare Positionierung zuspitzen: Wandelbegleitung für Familienunternehmen, bevor Wandel zur Krise wird. Die alte Seite klang nach allgemeinem Coach, nicht nach Spezialistin.",
      en: "Sharpen a broad consulting practice into one clear positioning: change guidance for family run companies before change turns into a crisis. The previous site read like a generic coach, not a specialist.",
    },
    claudeUsage: {
      de: "Mit Claude parallel an Positionierung, Stimme, Seitenstruktur und Schema.org-Auszeichnung gearbeitet. Dieselbe Claude-Session ging vom Interview-Transkript bis zur Live-Seite in einem Fluss, mit Text-Iterationen aus der eigenen Sprache der Kundin.",
      en: "Worked with Claude on positioning, voice, page structure and Schema.org markup in parallel. The same Claude session went from interview transcript to live page in one continuous flow, with copy iterations grounded in the client's own language.",
    },
    result: {
      de: "Live auf dielommel.de mit strukturiertem Person-, Organisations- und Service-Schema, klarer Zwei-Schritt-Einstieg (15-Min-Call, 90-Min-Session), ab Tag eins indexierbar. Sie bekommt jetzt Anfragen von genau ihren Wunschkunden.",
      en: "Live on dielommel.de with structured Person, Organization and Service schema, a clear two step offer (15 min call, 90 min session), indexable from day one. She now gets inbound from her actual ideal client profile.",
    },
    tags: ["Claude", "Next.js", "Schema.org", "Editorial design"],
    url: "https://dielommel.de",
    image: "/case-studies/dielommel.jpg",
  },
  {
    id: "vegaleads",
    category: "webseiten",
    title: {
      de: "Vega Leads: Lead-Radar für Vertriebsteams",
      en: "Vega Leads: Lead Radar for Sales Teams",
    },
    industry: { de: "Lead-Generierung · B2B international", en: "Lead Generation · International B2B" },
    challenge: {
      de: "Vega Leads verkauft etwas Unsichtbares: tägliche Recherche statt Software. Die Seite muss in Sekunden klar machen, dass hier kein Tool-Abo und kein Datenbank-Export verkauft wird, sondern geprüfte Firmen mit Ansprechpartner und wählbarer Nummer. Zielgruppe sind Chatbot- und KI-Automation-Agenturen weltweit, also musste alles zweisprachig funktionieren.",
      en: "Vega Leads sells something invisible: daily research instead of software. The site had to make clear in seconds that this is not a tool subscription or a database export, but verified companies with a named contact and a dialable number. The audience is chatbot and AI automation agencies worldwide, so everything had to work in two languages.",
    },
    claudeUsage: {
      de: "Positionierung, Texte und Seite mit Claude Code in einem Fluss gebaut: der Hero als Erde aus dem Orbit, eine Scan-Animation, die das tägliche Suchen sichtbar macht, und die zentrale Gegenüberstellung von 400 Leads zum Wegscrollen gegen 40 Leads zum Anrufen. Sprachumschaltung Englisch und Deutsch, Anfrage-Formular direkt in die eigene Datenbank.",
      en: "Positioning, copy and site built with Claude Code in one flow: a hero showing Earth from orbit, a scanning animation that makes the daily hunt visible, and the core contrast of 400 leads you scroll past versus 40 leads you call. Language switch between English and German, request form wired straight into the own database.",
    },
    result: {
      de: "Live auf vegaleads.ai, zweisprachig, mit klarer Ansage im ersten Screen: dein Closer soll anrufen, nicht googeln. Anfragen von der Seite landen direkt im eigenen System, statt in einem Posteingang zu versanden.",
      en: "Live on vegaleads.ai, bilingual, with a clear statement in the first screen: your closer should be calling, not googling. Requests from the site land directly in the own system instead of getting lost in an inbox.",
    },
    tags: ["Claude Code", "Zweisprachig", "Motion", "Vercel"],
    url: "https://vegaleads.ai",
    image: "/case-studies/vegaleads.jpg",
  },
  {
    id: "operations-dashboard",
    category: "agent-os",
    title: { de: "KI-Operations-Dashboard", en: "AI Operations Dashboard" },
    industry: { de: "Internes Tool · Agenten-System", en: "Internal tool · Agentic system" },
    challenge: {
      de: "Ein Ein-Personen-Studio in Agentur-Größe führen: Leads, Content-Pläne, Finanz-KPIs und laufende Agenten-Jobs an einem Ort, ohne zehn SaaS-Tools zu abonnieren.",
      en: "Run a one person studio at agency scale: track leads, content plans, financial KPIs and ongoing agent jobs in one place, without subscribing to ten SaaS tools.",
    },
    claudeUsage: {
      de: "Über mehrere Wochen mit Claude Code gebaut. Next.js-16-Dashboard, MOONI-Sprachassistent (Whisper + FastAPI), Pinterest-Content-Plan, MCP-Integrationen mit Notion, Pinecone und einem selbst gehosteten LLM-Stack. Claude hat den Code geschrieben und war gleichzeitig die Agenten-Laufzeit.",
      en: "Built with Claude Code over multiple weeks. Next.js 16 dashboard, MOONI voice assistant (Whisper + FastAPI), Pinterest content plan, MCP integrations with Notion, Pinecone and a self hosted LLM stack. Claude both wrote the code and acted as the agent runtime.",
    },
    result: {
      de: "Ersetzt einen Stapel einzelner Tools. Leads von der öffentlichen Seite laufen direkt rein, Sprachanfragen treffen einen eigenen Whisper-Dienst, Content-Pläne und Agenten-Jobs leben auf derselben Fläche. Aktuell täglich im Einsatz.",
      en: "Replaces a stack of separate tools. Leads from the public site flow straight in, voice queries hit a custom Whisper service, content plans and agent jobs live in the same canvas. Currently in daily production use.",
    },
    tags: ["Claude Code", "MCP", "Whisper", "Next.js 16", "FastAPI"],
    isPrivate: true,
    image: "/case-studies/operations-dashboard.jpg",
  },
  {
    id: "cyber-sales",
    category: "webseiten",
    title: {
      de: "Max Maute: Vertriebssystem für Cybersecurity",
      en: "Max Maute: Sales System for Cybersecurity",
    },
    industry: { de: "Cybersecurity · B2B-Vertrieb", en: "Cybersecurity · B2B Sales" },
    challenge: {
      de: "Cybersecurity verkauft sich nicht über Erklärungen: Der Wunschkunde glaubt, sicher zu sein, und sagt später. Die Seite muss die Gefahr erlebbar machen, statt sie zu beschreiben, und den Fünf-Schritte-Vertrieb (Brief, QR-Code, Video, E-Mail, Anruf) tragen.",
      en: "Cybersecurity does not sell through explanations: the ideal client believes he is safe and says later. The site had to make the danger tangible instead of describing it, and carry the five step sales motion (letter, QR code, video, email, call).",
    },
    claudeUsage: {
      de: "Positionierung, Texte und Seite mit Claude Code in einem Fluss gebaut: die Klick-Mechanik als Scroll-Erlebnis inszeniert, NIS2-Pflicht und Ernstfall als zwei Einstiege erzählt, dazu Rechner und Erstgespräch-Funnel.",
      en: "Positioning, copy and site built with Claude Code in one flow: the click mechanic staged as a scroll experience, NIS2 obligations and incident response told as two entry points, plus a calculator and discovery call funnel.",
    },
    result: {
      de: "Live auf cyber-sales.de. Die Pilot-Kampagne erreichte 20 Prozent Scan-Rate, und das Angebot ist zu 100 Prozent erfolgsbasiert positioniert.",
      en: "Live on cyber-sales.de. The pilot campaign reached a 20 percent scan rate, and the offer is positioned as 100 percent performance based.",
    },
    tags: ["Claude Code", "Next.js", "Sales-Page", "B2B"],
    url: "https://cyber-sales.de",
    image: "/case-studies/cyber-sales.jpg",
  },
  {
    id: "vega-lead-gen-os",
    category: "lead-gen",
    title: {
      de: "Vega Leads: Das Lead-Radar hinter der Seite",
      en: "Vega Leads: The Lead Radar Behind the Site",
    },
    industry: { de: "Eigenes Produkt · Agenten-System", en: "Own Product · Agentic System" },
    challenge: {
      de: "Ein Verkäufer verbringt den halben Tag mit Recherche, bevor er telefoniert. Gekaufte Listen sind veraltet und sagen nichts darüber, ob eine Firma das Problem überhaupt hat. Gebraucht wird kein weiteres Tool-Abo, sondern jeden Morgen ein kleiner Stapel Firmen, bei denen sich der Anruf nachweislich lohnt.",
      en: "A salesperson spends half the day researching before making a call. Bought lists are outdated and say nothing about whether a company even has the problem. What is needed is not another tool subscription, but a small stack of companies every morning where the call is demonstrably worth it.",
    },
    claudeUsage: {
      de: "Mit Claude Code als Signal-Engine gebaut: Jede Nische bekommt eine Signatur, nach der gesucht wird, etwa Firmen ohne Live-Chat-Widget. Der Agent findet, prüft und bewertet täglich, normalisiert Telefonnummern und legt alles in ein Cockpit mit Chancen-Radar, Funnel und Freigabe-Workflow. Läuft lokal mit eigener Datenbank, jeder Kunde streng getrennt.",
      en: "Built with Claude Code as a signal engine: every niche gets a signature to search for, such as companies without a live chat widget. The agent finds, verifies and scores daily, normalises phone numbers and puts everything into a cockpit with an opportunity radar, funnel and approval workflow. Runs locally with its own database, every client strictly separated.",
    },
    result: {
      de: "Das System hinter vegaleads.ai. Der Verkäufer sieht morgens einen geprüften Stapel statt einer Namensliste, jeder Lead trägt seinen Score und die Begründung, und aus jedem Web-Audit wächst der Chancen-Radar mit. Die Daten bleiben auf dem eigenen Rechner.",
      en: "The system behind vegaleads.ai. In the morning the salesperson sees a verified stack instead of a list of names, every lead carries its score and reasoning, and every web audit feeds the opportunity radar. The data stays on the own machine.",
    },
    tags: ["Claude Code", "Signal-Engine", "libSQL", "Firecrawl"],
    isPrivate: true,
    image: "/case-studies/vega-cockpit.jpg",
  },
  {
    id: "fleur-lead-agent",
    category: "lead-gen",
    title: {
      de: "Fleur: Lead-Agent für Automotive",
      en: "Fleur: Lead Agent for Automotive",
    },
    industry: { de: "Live-Chat-Service · Automotive B2B", en: "Live Chat Service · Automotive B2B" },
    challenge: {
      de: "Fleur bietet Autohäusern einen Live-Chat-Service und brauchte täglich frische, passende Händler-Leads im DACH-Raum, ohne teure Lead-Datenbanken zu abonnieren und ohne jeden Morgen selbst zu recherchieren.",
      en: "Fleur offers car dealerships a live chat service and needed fresh, well matched dealer leads across the DACH region every day, without renting expensive lead databases or researching manually every morning.",
    },
    claudeUsage: {
      de: "Mit Claude Code als lokalen Research-Agenten gebaut: findet täglich Autohäuser, bewertet sie gegen ihr Wunschkunden-Profil, erklärt jeden Score und lernt aus Verwerfungen. Dashboard mit Freigabe, Excel-Export und täglichem Selbst-Check, alles auf ihrem eigenen Mac.",
      en: "Built with Claude Code as a local research agent: finds dealerships daily, scores them against her ideal client profile, explains every score and learns from rejections. Dashboard with approval flow, Excel export and a daily self check, all running on her own Mac.",
    },
    result: {
      de: "Seit Juli 2026 bei Fleur im täglichen Einsatz. Der Agent läuft mit lokalem Modell praktisch kostenlos, sie passt das Wunschkunden-Profil selbst an, und freigegebene Leads gehen direkt in ihre Ansprache.",
      en: "In daily use at Fleur's since July 2026. The agent runs on a local model at practically zero cost, she tunes the ideal client profile herself, and approved leads flow straight into her outreach.",
    },
    tags: ["Claude Code", "Agent", "Ollama", "Firecrawl"],
    isPrivate: true,
    image: "/case-studies/fleur-lead-agent.jpg",
  },
  {
    id: "webseiten-analytics",
    category: "agent-os",
    title: {
      de: "Webseiten-Analytics: Alle Seiten in einer Sicht",
      en: "Website Analytics: Every Site in One View",
    },
    industry: { de: "Internes Tool · Self-hosted Analytics", en: "Internal Tool · Self-hosted Analytics" },
    challenge: {
      de: "Eigene Seiten und Kundenseiten beobachten, ohne Google Analytics und ohne zehn Tabs: Besucher, Top-Seiten, Suchbegriffe und Blog-Performance gehören in eine Ansicht, datenschutzfreundlich und ohne Abo.",
      en: "Watch your own sites and client sites without Google Analytics and without ten tabs: visitors, top pages, search queries and blog performance belong in one view, privacy friendly and without a subscription.",
    },
    claudeUsage: {
      de: "Mit Claude Code gebaut: selbst gehostetes Umami für Besucher-Daten, Google Search Console über OAuth angebunden (Keywords, Seiten-Performance), Bing Webmaster für die KI-Suche, alles im eigenen Dashboard mit Blog-Leaderboard.",
      en: "Built with Claude Code: self hosted Umami for visitor data, Google Search Console connected via OAuth (keywords, page performance), Bing Webmaster for AI search, all inside the own dashboard with a blog leaderboard.",
    },
    result: {
      de: "Eigene Projekte und Kundenseiten laufen in derselben Ansicht. Suchbegriffe fließen täglich rein, der Blog zeigt, welche Artikel wirklich arbeiten, und alle Daten bleiben auf dem eigenen Server.",
      en: "Own projects and client sites run in the same view. Search queries flow in daily, the blog shows which articles actually work, and all data stays on the own server.",
    },
    tags: ["Claude Code", "Umami", "Search Console", "Self-hosted"],
    isPrivate: true,
    image: "/case-studies/webseiten-analytics.jpg",
  },
  {
    id: "mooni-voice",
    category: "weitere",
    title: {
      de: "Mooni Voice: Deine Stimme wird Text",
      en: "Mooni Voice: Your Voice Becomes Text",
    },
    industry: { de: "Open Source · macOS-App", en: "Open Source · macOS App" },
    challenge: {
      de: "Diktieren sollte überall funktionieren, auch im Terminal und in Claude Code, ohne Abo, ohne Konto und ohne dass die Stimme in eine Cloud wandert.",
      en: "Dictation should work everywhere, including the terminal and Claude Code, without a subscription, without an account, and without your voice travelling to a cloud.",
    },
    claudeUsage: {
      de: "Fork einer Open-Source-Diktier-App, mit Claude Code zur eigenen Mac-App ausgebaut: lokale Modelle (Parakeet, Whisper), gehärtetes Download-Formular, Produktseite und Release-Pipeline über GitHub.",
      en: "Forked an open source dictation app and extended it into its own Mac app with Claude Code: local models (Parakeet, Whisper), a hardened download form, product page and release pipeline via GitHub.",
    },
    result: {
      de: "Kostenlos verfügbar, läuft 100 Prozent lokal auf Apple Silicon und ist Teil der eigenen täglichen Arbeit, vom LinkedIn-Posteingang bis zum Terminal.",
      en: "Available for free, runs 100 percent locally on Apple Silicon and is part of daily work here, from the LinkedIn inbox to the terminal.",
    },
    tags: ["Open Source", "Lokale KI", "Whisper", "Parakeet"],
    url: "/mooni-voice",
    image: "/case-studies/mooni-voice.jpg",
  },
  {
    id: "second-brain",
    category: "weitere",
    title: {
      de: "Second Brain 2.0: Wissen, das antwortet",
      en: "Second Brain 2.0: Knowledge That Answers",
    },
    industry: { de: "Wissenssystem · Lokale KI", en: "Knowledge System · Local AI" },
    challenge: {
      de: "Fast 1.400 Markdown-Notizen aus Business und Projekten sind nur so viel wert, wie sie beim Arbeiten helfen: Wissen soll in Millisekunden auffindbar sein und auf Zuruf antworten, ohne dass eine Cloud mitliest.",
      en: "Almost 1,400 markdown notes from business and projects are only worth as much as they help during work: knowledge should be findable in milliseconds and answer on demand, without a cloud reading along.",
    },
    claudeUsage: {
      de: "Mit Claude Code als mehrschichtiges System gebaut: deterministisches Retrieval ohne Modell im Suchpfad, ein JARVIS-Cockpit im Dashboard mit Schicht-Ringen für Apps, Routinen, Memory und Skills, dazu lokale Stimme: diktieren, Enter, und die Antwort wird vorgelesen.",
      en: "Built with Claude Code as a layered system: deterministic retrieval with no model in the search path, a JARVIS style cockpit in the dashboard with layer rings for apps, routines, memory and skills, plus a local voice: dictate, hit enter, and the answer is read out loud.",
    },
    result: {
      de: "Täglich im Einsatz: Wissensfragen beantwortet das System in Sekunden aus den eigenen Notizen, komplett lokal mit Ollama und neuronaler Stimme, und jede Claude-Session bekommt das passende Vorwissen automatisch zugespielt.",
      en: "In daily use: the system answers knowledge questions in seconds from the own notes, fully local with Ollama and a neural voice, and every Claude session automatically receives the matching prior knowledge.",
    },
    tags: ["Claude Code", "Ollama", "Piper TTS", "Markdown"],
    isPrivate: true,
    image: "/case-studies/second-brain.jpg",
  },
];

/** Client testimonial migrated from the old /referenzen page. */
export const TESTIMONIAL = {
  name: "Stefanie Lommel",
  image: "/images/Testimonial Stefanie Lommel.jpeg",
  role: {
    de: "Organisationsentwicklerin & Coach für Geschäftsführer",
    en: "Organizational developer & coach for managing directors",
  },
  quote: {
    de: "Ich durfte die umfangreiche und breit aufgesetzte AI Diamond Force gleich für Praxisanwendungen nutzen. Gerade die juristischen Grundlagen haben sehr geholfen, auf Punkte zu achten, die direkt auf mein Angebot zugeschnitten sind.",
    en: "I got to put the extensive, broadly built AI Diamond Force straight to practical use. The legal groundwork in particular helped me watch for the points tailored directly to my own offer.",
  },
};

/** UI strings for the page chrome, per language. */
export const STRINGS: Record<Locale, {
  langName: string;
  heroEyebrow: string;
  heroHeadline: [string, string, string];
  heroLead: string;
  heroMeta: string;
  sectionEyebrow: string;
  sectionHeadline: string;
  labelChallenge: string;
  labelClaude: string;
  labelResult: string;
  viewWebsite: string;
  privateInternal: string;
  privateBadge: string;
  testimonialEyebrow: string;
  ctaEyebrow: string;
  ctaHeadline: string;
  ctaButton: string;
}> = {
  de: {
    langName: "Deutsch",
    heroEyebrow: "Mit Claude gebaut",
    heroHeadline: ["Echte Webseiten.", "Echte Kunden.", "Echte Ergebnisse."],
    heroLead:
      "Ich führe ein kleines Studio, das Premium-Webseiten und KI-Systeme für Gründer und kleine Teams baut. Jedes Projekt auf dieser Seite wurde mit Claude und Claude Code entworfen und gebaut, der KI von Anthropic, von der ersten Architektur-Entscheidung bis zum finalen Deploy. Echte Kunden, echte Arbeit, alles live im Einsatz.",
    heroMeta: "Zehn Projekte · alle im Einsatz",
    sectionEyebrow: "// ausgewählte arbeiten",
    sectionHeadline: "Von der Webseite bis zum Agenten, von Anfang bis Ende.",
    labelChallenge: "Herausforderung",
    labelClaude: "Wie Claude geholfen hat",
    labelResult: "Ergebnis",
    viewWebsite: "Webseite ansehen",
    privateInternal: "Intern · keine öffentliche URL",
    privateBadge: "Internes Projekt",
    testimonialEyebrow: "Kundenstimme",
    ctaEyebrow: "Du willst eine Webseite mit KI?",
    ctaHeadline: "Lass uns über dein Projekt sprechen.",
    ctaButton: "Kontakt aufnehmen",
  },
  en: {
    langName: "English",
    heroEyebrow: "Built with Claude",
    heroHeadline: ["Real websites.", "Real clients.", "Real results."],
    heroLead:
      "I run a small studio that builds premium websites and AI systems for founders and small teams. Every project on this page was designed and built with Claude and Claude Code, Anthropic's AI, from the first architecture decision through to the final deploy. Real clients, real work, all live in production.",
    heroMeta: "Ten projects · all in production",
    sectionEyebrow: "// selected work",
    sectionHeadline: "From websites to agents, start to finish.",
    labelChallenge: "Challenge",
    labelClaude: "How Claude was used",
    labelResult: "Result",
    viewWebsite: "View website",
    privateInternal: "Internal · no public URL",
    privateBadge: "Private Project",
    testimonialEyebrow: "Client voice",
    ctaEyebrow: "Want a website built with AI?",
    ctaHeadline: "Let’s talk about your project.",
    ctaButton: "Contact me",
  },
};
