/**
 * Case Studies: projects built end to end with Claude. Bilingual (de / en).
 *
 * Add a screenshot: drop a 16:9 image into /public/case-studies/ and set
 * `image` on the entry. Text fields are Localized ({ de, en }); the active
 * language is chosen in CaseStudiesView. Order in this array = order on the page.
 */

export type Locale = "de" | "en";
export type Localized = { de: string; en: string };

export type CaseStudy = {
  id: string;
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

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "sabala-mentoring",
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
    id: "dielommel",
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
    id: "connecting-herzkreative",
    title: {
      de: "Connecting Herzkreative: Kuratiertes Macher-Netzwerk",
      en: "Connecting Herzkreative: Curated Maker Network",
    },
    industry: {
      de: "Community-Plattform · Kuratiertes Netzwerk",
      en: "Community Platform · Curated Network",
    },
    challenge: {
      de: "Ein kuratiertes Netzwerk starten, in dem sich selbstständige Macher finden, nicht nur eine Landingpage. Es brauchte einen Bewerbungs-Flow, Mitglieder-Profile und einen Weg, einander wirklich zu entdecken, gebaut und betrieben von einer einzelnen Gründerin ohne fertiges Community-SaaS.",
      en: "Launch a curated network where independent makers find each other, not just a landing page. It needed an application flow, member profiles and a way to actually discover one another, built and run by a single founder without renting an off the shelf community SaaS.",
    },
    claudeUsage: {
      de: "Mit Claude Code auf Next.js 16 gebaut: Aufnahme- und Bewerbungs-Flow, Mitglieder-Profile, interaktive Mitglieder-Karte mit Leaflet, dazu Events, Blog und Podcast. Claude hat Architektur, Komponenten-System und datenschutzfreundliche Formulare mit Altcha statt Dritt-Captcha übernommen.",
      en: "Built with Claude Code on Next.js 16: a vetting and application flow, member profiles, an interactive member map with Leaflet, plus events, blog and podcast sections. Claude handled the architecture, the component system and privacy first form handling with Altcha instead of a third party captcha.",
    },
    result: {
      de: "Live auf connecting-herzkreative.com. Bewerber durchlaufen einen echten Aufnahme-Flow, aufgenommene Mitglieder bekommen ein Profil und finden sich auf der Karte, und Podcast und Newsletter speisen direkt den Bewerbungs-Funnel.",
      en: "Live on connecting-herzkreative.com. Applicants go through a real vetting flow, approved members get a profile and can find each other on the map, and the podcast and newsletter feed straight into the application funnel.",
    },
    tags: ["Claude Code", "Next.js 16", "Leaflet", "Framer Motion"],
    url: "https://connecting-herzkreative.com",
    image: "/case-studies/connecting-herzkreative.jpg",
  },
  {
    id: "operations-dashboard",
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
    heroMeta: "Vier Projekte · alle live",
    sectionEyebrow: "// ausgewählte arbeiten",
    sectionHeadline: "Vier Projekte, von Anfang bis Ende.",
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
    heroMeta: "Four projects · all in production",
    sectionEyebrow: "// selected work",
    sectionHeadline: "Four projects, start to finish.",
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
