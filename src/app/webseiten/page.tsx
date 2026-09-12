"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import { useState, type CSSProperties, type FormEvent } from "react";
import AdlerHero from "@/components/webseiten/AdlerHero";
import StudioJourney from "@/components/webseiten/StudioJourney";
import { caseSlot } from "@/components/webseiten/studio-journey";
import {
  Search, ShieldCheck, Crosshair, Scan, Gem,
  FileSearch, Radar, MessagesSquare, ListChecks, ArrowRight, ArrowDown,
  ChevronLeft, ChevronRight, MoveUpRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   /webseiten — Sales-Page v6 (12.9.2026)

   Loest v5 ab. Die Fassung entstand als Arbeitskopie unter /webseiten-labor
   und wurde nach Iljas Freigabe hierher uebernommen, der Laborordner ist weg.

   Aufbau: Adler-Hero fuehrt ins Schaufenster, nicht in die Analyse. Dann der
   begehbare Rundgang (Schaufenster, Empfang, Galerie), Werthebel, Fuer wen,
   die Arbeiten als gerahmtes Karussell, Prozess und Fundament, danach erst
   die kostenlose Potenzial-Analyse, dann Pflege, FAQ und Finale.

   Design: Londoner Material aus einer Quelle (MESSING, PANEEL_BG, PAPIER),
   eckige Rahmen statt abgerundeter Kacheln, Kulissen aus KIE hinter
   Werthebel, Fundament und Finale. Pflege MIT Preisen (70/99/149 netto,
   B2B-Hinweis), Dashboard als Iljas Cockpit erzaehlt, nicht als Upsell.

   Kleines du, keine Em-Dashes, keine Ausrufezeichen, nur echte Zahlen.
   Keine deutschen Anfuehrungszeichen im JSX (Turbopack-Falle), Zitate mit »«.
   Fotos: /public/webseiten/ilja-*.jpg (EXIF gestrippt, Repo ist public).
   ───────────────────────────────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Londoner Material ──────────────────────────────────────────────────
   Eine Quelle fuer die ganze Seite, damit Schaufenster und Sektionen
   dieselbe Sprache sprechen: gebuerstetes Messing, lackiertes dunkles Holz,
   Haarlinien statt Raender, kaum Rundungen. Ein Rahmen ist eckig. */

const MESSING = "linear-gradient(147deg, #c8ab73 0%, #7d6235 22%, #f0dcae 48%, #8a6f3c 64%, #d8bd84 86%, #6f5730 100%)";

/** Dunkles Paneel mit Messingkante. Ersetzt die weisslichen Kacheln. */
const PANEEL_BG = "linear-gradient(158deg, rgba(41,33,22,0.9), rgba(15,12,9,0.96))";
/** Helles Gegenstueck: warmes Papier mit Messingkante statt weisser Kasten. */
const PAPIER: CSSProperties = {
  background: "linear-gradient(158deg, #FBF7EF 0%, #F2EBDD 100%)",
  border: "1px solid rgba(184,150,62,0.34)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85), 0 16px 38px rgba(72,54,20,0.07)",
};

/** Dasselbe Papier, hervorgehoben fuer die eine gewaehlte Karte. */
const PAPIER_BETONT: CSSProperties = {
  background: "linear-gradient(158deg, #FFFCF6 0%, #F4EDDD 100%)",
  border: "1px solid rgba(184,150,62,0.34)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95), 0 26px 60px rgba(110,82,24,0.16)",
};

/** Foto-Kulisse hinter einer Sektion. Dunkel gehalten und mit Schleier, damit
    heller Text darauf lesbar bleibt (Bilder aus KIE, 12.9.2026). */
function Kulisse({ bild, position = "center", staerke = 0.44 }: { bild: string; position?: string; staerke?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <Image src={`/webseiten/sektionen/${bild}.webp`} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: position, opacity: staerke }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,8,6,0.88), rgba(10,8,6,0.6) 42%, rgba(10,8,6,0.94))" }} />
    </div>
  );
}

/** Warmes Licht von oben, wie die Bildleuchte ueber dem Rahmen im Saal. */
function Deckenlicht({ hoehe = "52vh" }: { hoehe?: string }) {
  return <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 w-[92vw] max-w-5xl -translate-x-1/2" style={{ height: hoehe, background: "radial-gradient(ellipse at top, rgba(184,150,62,0.15), transparent 68%)" }} />;
}

/** Messing-Haarlinie als Trenner. */
function Messinglinie({ breite = "6rem", className = "" }: { breite?: string; className?: string }) {
  return <div aria-hidden className={`h-px ${className}`} style={{ width: breite, background: "linear-gradient(90deg, transparent, rgba(184,150,62,0.7), transparent)" }} />;
}

/** Kleine Kapitaelchen-Zeile ueber jeder Ueberschrift. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">{children}</p>;
}

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ── Daten ─────────────────────────────────────────────────────────────── */

const MARQUEE = [
  "Future built here",
  "Luxury-Level ROI",
  "Verkaufsoptimiert",
  "Eigener Code",
  "Ladezeit unter 2 s",
  "SEO + GEO",
  "Wettbewerbs-Analyse",
  "DSGVO-konform",
  "Ein Ansprechpartner",
  "Pflege-Service",
];

const HEBEL = [
  { icon: Search, term: "Gefunden werden", line: "bei Google und in KI-Suchen" },
  { icon: ShieldCheck, term: "Vertrauen", line: "im ersten Augenblick" },
  { icon: Crosshair, term: "Klare Zielgruppe", line: "eine Botschaft, nicht vier" },
  { icon: Scan, term: "Keine Ablenkung", line: "ein Weg, ein nächster Schritt" },
  { icon: Gem, term: "Hochwertigkeit", line: "in jedem Detail spürbar" },
];

const ANGEBOT_STACK = [
  {
    icon: FileSearch,
    term: "Website-Check über fünf Ebenen",
    line: "SEO, GEO, Content, Design und Tempo: wo deine Seite trägt und wo sie dich bremst.",
  },
  {
    icon: Radar,
    term: "Tiefe Wettbewerbsanalyse",
    line: "Was deine Kunden suchen, wer in deiner Nische vorne steht, womit, und wo die Lücken sind.",
  },
  {
    icon: MessagesSquare,
    term: "Beratungsgespräch",
    line: "Wir gehen die Ergebnisse zusammen durch, 30 Minuten, beidseitig unverbindlich.",
  },
  {
    icon: ListChecks,
    term: "Deine Potenzial-Liste",
    line: "Priorisiert nach Hebel. Sie gehört dir, ganz gleich, wie du dich danach entscheidest.",
  },
];

/* Eine Liste, Reihenfolge ist die Reihenfolge im Karussell. rfqtopo steht vorn. */
const ARBEIT = [
  { img: "/case-studies/rfqtopo.jpg", label: "rfqtopo.com", url: "https://rfqtopo.com", note: "Industrielles Sourcing für EPC-Projekte", rolle: "Konzept, Design, Creatives, Technik und Launch aus einer Hand", badge: "Neu · live seit September 2026" },
  { img: "/case-studies/yuna.jpg", label: "yuna-sports-nutrition.com", url: "https://yuna-sports-nutrition.com", note: "Personal Training München", rolle: "Brand-System, Blog, SEO und Messung ab Tag eins" },
  { img: "/case-studies/stefan-pons.jpg", label: "stefanpons.de", url: "https://stefanpons.de", note: "Klangmassage am Bodensee", rolle: "Konzept, Texte, Prototyp und Videos" },
  { img: "/case-studies/vegaleads.jpg", label: "vegaleads.ai", url: "https://vegaleads.ai", note: "Lead-Radar für Vertriebsteams", rolle: "Produkt, Plattform und zwei Sprachen" },
  { img: "/case-studies/dielommel.jpg", label: "dielommel.de", url: "https://dielommel.de", note: "Begleitung für Familienunternehmen", rolle: "Positionierung, Design und Bau" },
  { img: "/case-studies/cyber-sales.jpg", label: "cyber-sales.de", url: "https://cyber-sales.de", note: "Vertriebssystem für Cybersecurity", rolle: "Fünf-Schritte-Vertrieb, Seite und Creatives" },
  { img: "/case-studies/sabala-mentoring.jpg", label: "sabala-mentoring.com", url: "https://sabala-mentoring.com", note: "Sabala Studios, das eigene Haus", rolle: "Alles selbst gebaut, alles selbst im Einsatz" },
];

const PROZESS = [
  { n: "01", term: "Analyse & Gespräch", tag: "kostenlos", line: "Website-Check, Wettbewerbsanalyse, 30 Minuten Gespräch. Danach weißt du, wo du stehst." },
  { n: "02", term: "Angebot, Konzept, Build", tag: null, line: "Klarer Rahmen mit Preis, dann Zielgruppe, Story, Design und eigener Code. Du siehst Zwischenstände." },
  { n: "03", term: "Launch & Pflege", tag: null, line: "Sauber live, sauber übergeben, und danach als Partner betreut. Technik ist ab hier mein Thema." },
];

const FUNDAMENT = [
  {
    stat: "< 2 s",
    term: "Ladezeit auf dem Handy",
    line: "Eigener Code statt Template-Ballast. PageSpeed über 90, und das bleibt auch nach dem Launch so.",
  },
  {
    stat: "0",
    term: "Cookie-Banner nötig",
    line: "DSGVO-konform ohne Tracking-Zirkus. Analytics laufen selbst gehostet, deine Besucher bleiben unbehelligt.",
  },
  {
    stat: "100 %",
    term: "dein Eigentum",
    line: "Eigener Code im eigenen Repo, auf deinen Namen. Wenn du irgendwann gehst, nimmst du alles mit.",
  },
  {
    stat: "1",
    term: "Ansprechpartner",
    line: "Strategie, Design, Code, Betrieb: eine Hand, eine Verantwortung, keine Reibung zwischen Gewerken.",
  },
];

const PFLEGE = [
  {
    term: "Basis",
    price: "70",
    punkte: ["Updates und Sicherheit", "Backups und Monitoring", "Kleine Änderungen und neue Inhalte"],
    line: "Deine Seite läuft, du merkst nichts davon.",
  },
  {
    term: "Wachstum",
    price: "99",
    punkte: ["Alles aus Basis", "SEO- und GEO-Pflege, laufend", "Monatsbericht mit deinen Kennzahlen"],
    line: "Deine Seite wird jeden Monat besser gefunden.",
    highlight: true,
  },
  {
    term: "Partner",
    price: "149",
    punkte: ["Alles aus Wachstum", "Priorität bei Änderungen und Anfragen", "Strategie-Sparring für die nächsten Schritte"],
    line: "Du hast einen technischen Partner an deiner Seite.",
  },
];

const FAQ = [
  {
    q: "Wie läuft die kostenlose Potenzial-Analyse ab?",
    a: "Du schickst mir deine Webseite. Ich prüfe SEO, GEO, Content, Design und Tempo und schaue mir deine Wettbewerber an. Danach gehen wir die Ergebnisse in einem Gespräch durch, 30 Minuten, beidseitig unverbindlich. Die Analyse gehört dir, ganz gleich, wie du dich entscheidest.",
  },
  {
    q: "Was kostet eine Webseite bei dir?",
    a: "Das Projekt bekommt einen individuellen Rahmen, weil es kein Produkt von der Stange ist: ein OnePager liegt woanders als eine komplette Markenwelt. Nach der Analyse steht dein Angebot mit Umfang, Zeitplan und Preis. Die laufende Pflege ist transparent: 70, 99 oder 149 Euro im Monat, netto.",
  },
  {
    q: "Wie lange dauert ein Projekt?",
    a: "Ein OnePager meist zwei bis drei Wochen ab vollständigen Inhalten, größere Markenwelten mehrere Wochen. Du bekommst vor dem Start einen ehrlichen Zeitplan, keine Wunschtermine.",
  },
  {
    q: "Warum kein Baukasten?",
    a: "Einen Baukasten mietest du, eigenen Code besitzt du. Dazu kommen Tempo (unter zwei Sekunden Ladezeit), volle Gestaltungsfreiheit und sauberes SEO ohne Plugin-Schichten. Wenn du irgendwann gehen willst, nimmst du alles mit.",
  },
];

/* ── Schema.org (GEO): Service + Pflege-Preise + FAQ ───────────────────── */
const SITE = "https://sabala-mentoring.com";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE}/webseiten#service`,
      name: "Premium-Webdesign mit KI",
      serviceType: "Webdesign & Webentwicklung",
      url: `${SITE}/webseiten`,
      provider: { "@id": `${SITE}/#organization` },
      description:
        "Premium-Webauftritte, gebaut gegen die Spitze der eigenen Nische. Einstieg über die kostenlose Potenzial-Analyse: Website-Check über SEO, GEO, Content, Design und Tempo plus tiefe Wettbewerbsanalyse und Beratungsgespräch. Danach Konzept, eigener Code, Ladezeit unter zwei Sekunden, DSGVO-konform, laufende Pflege in drei Stufen.",
      availableLanguage: "de",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Angebote",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Kostenlose Potenzial-Analyse",
            price: 0,
            priceCurrency: "EUR",
            description: "Website-Check über fünf Ebenen, Wettbewerbsanalyse und Beratungsgespräch, unverbindlich.",
          },
          {
            "@type": "Offer",
            name: "Pflege Basis",
            description: "Updates, Sicherheit, Backups, kleine Änderungen. 70 Euro im Monat netto.",
            priceSpecification: { "@type": "UnitPriceSpecification", price: 70, priceCurrency: "EUR", valueAddedTaxIncluded: false, unitText: "Monat" },
          },
          {
            "@type": "Offer",
            name: "Pflege Wachstum",
            description: "Dazu laufende SEO- und GEO-Pflege und Monatsbericht. 99 Euro im Monat netto.",
            priceSpecification: { "@type": "UnitPriceSpecification", price: 99, priceCurrency: "EUR", valueAddedTaxIncluded: false, unitText: "Monat" },
          },
          {
            "@type": "Offer",
            name: "Pflege Partner",
            description: "Dazu Priorität und Strategie-Sparring. 149 Euro im Monat netto.",
            priceSpecification: { "@type": "UnitPriceSpecification", price: 149, priceCurrency: "EUR", valueAddedTaxIncluded: false, unitText: "Monat" },
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/webseiten#faq`,
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function WebseitenLaborPage() {
  return (
    <main className="flex-1" style={{ background: "var(--cream)" }}>
      {/* statisches Objekt, kein User-Input; < wird nach Next-Doku escaped */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA).replace(/</g, "\\u003c") }} />
      <ScrollRail />
      <Hero />
      <Marquee />
      <Schaufenster />
      <Werthebel />
      <FuerWen />
      <Galerie />
      {/* Prozess und Fundament stehen seit 12.9.2026 VOR der Analyse: erst zeigen,
          wie gearbeitet wird und worauf es steht, dann nach der Anfrage fragen. */}
      <Prozess />
      <Fundament />
      <Analyse />
      <Pflege />
      <Faq />
      <Finale />
      <style>{`
        @keyframes ws-spin { to { transform: rotate(360deg); } }
        .ws-spin { animation: ws-spin 22s linear infinite; }
        @keyframes ws-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
        @keyframes ws-plate { from { opacity: 0; transform: translateY(9px) } to { opacity: 1; transform: none } }
        .ws-ghost {
          -webkit-text-stroke: 1px rgba(184,150,62,0.28);
          color: transparent;
          user-select: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .ws-spin { animation: none; }
          [style*="ws-plate"] { animation: none !important; }
        }
      `}</style>
    </main>
  );
}

/* ── Scroll-Rail: laeuft rechts an der Seite mit (Desktop) ─────────────── */
const RAIL = [
  { id: "schaufenster", label: "Schaufenster" },
  { id: "hebel", label: "Werthebel" },
  { id: "methode", label: "Für wen" },
  { id: "arbeiten", label: "Arbeiten" },
  { id: "prozess", label: "Prozess" },
  { id: "fundament", label: "Fundament" },
  { id: "analyse", label: "Analyse" },
  { id: "pflege", label: "Pflege" },
  { id: "faq", label: "FAQ" },
];

function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  return (
    <div data-page-rail className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block" aria-hidden>
      <div className="relative flex flex-col items-center gap-4 py-3">
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2" style={{ background: "rgba(184,150,62,0.18)" }} />
        <motion.span
          className="absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2"
          style={{ background: "linear-gradient(to bottom, var(--gold-light), var(--gold))", scaleY }}
        />
        {RAIL.map((r) => (
          <a key={r.id} href={`#${r.id}`} className="group pointer-events-auto relative flex items-center" aria-label={`Zu ${r.label}`}>
            <span className="block h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-150" style={{ background: "var(--gold)", boxShadow: "0 0 0 3px rgba(250,248,245,0.6)" }} />
            <span className="absolute right-5 whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "rgba(10,8,6,0.9)", color: "var(--gold-light)", border: "1px solid rgba(184,150,62,0.3)" }}>
              {r.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── Drehendes CTA-Siegel ──────────────────────────────────────────────── */
function SpinBadge({ className = "" }: { className?: string }) {
  return (
    <a href="#analyse" className={`group relative block h-32 w-32 ${className}`} aria-label="Zur kostenlosen Potenzial-Analyse">
      <svg viewBox="0 0 120 120" className="ws-spin h-full w-full" aria-hidden>
        <defs>
          <path id="ws-circ" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
        </defs>
        <text fill="var(--gold-light)" style={{ fontSize: 10.2, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.22em" }}>
          <textPath href="#ws-circ">POTENZIAL-ANALYSE · KOSTENLOS · CHECK ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110" style={{ background: "var(--gold-light)", color: "var(--tech-bg)" }}>
        <ArrowDown size={20} strokeWidth={2.2} aria-hidden />
      </span>
    </a>
  );
}

/* ── 1 · Hero: Adler-Buehne, Blick folgt der Maus ─────────────────────── */
function Hero() {
  return (
    <AdlerHero>
      <HeroText />
    </AdlerHero>
  );
}

/* Weniger ist mehr: Kicker, Headline, ein Satz, ein Button. Sonst nichts.
   Der Text traegt einen eigenen Schatten, damit das Bild ohne Overlay auskommt. */
const SCHATTEN = "0 2px 24px rgba(11,9,6,0.85), 0 1px 4px rgba(11,9,6,0.7)";

function HeroText() {
  return (
    <div className="flex min-h-[94vh] w-full flex-col justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="mx-auto w-full max-w-6xl">
        <div className="max-w-xl" style={{ textShadow: SCHATTEN }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// high-end web development</p>
          <h1 className="mt-5 font-serif text-cream" style={{ fontSize: "clamp(2.4rem, 5vw, 4.4rem)", lineHeight: 1.04, letterSpacing: "-0.015em" }}>
            Design, das verkauft.
            <br />
            <em className="not-italic" style={{ color: "var(--gold-light)" }}>Und im Kopf bleibt.</em>
          </h1>
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-warm-light/85">
            High-End Webseiten für Premium-Dienstleister.
          </p>
          {/* Fuehrt ins Schaufenster, nicht in die Analyse: erst schauen, dann anfragen. */}
          <a href="#schaufenster" className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-gold-light px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.14em] text-tech-bg transition-colors hover:bg-gold" style={{ textShadow: "none" }}>
            Tritt näher <ArrowRight size={14} aria-hidden />
          </a>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-warm-light/45">
            Ein Blick ins Schaufenster, ganz ohne Anfrage
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ── 2 · Marquee (mitlaufendes Band) ───────────────────────────────────── */
function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <section aria-hidden className="overflow-hidden py-5" style={{ background: "var(--tech-bg)", borderTop: "1px solid rgba(184,150,62,0.2)", borderBottom: "1px solid rgba(184,150,62,0.2)" }}>
      <div className="wd-marquee-track-l flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((m, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-6 pr-6 font-mono text-[12px] uppercase tracking-[0.3em] text-gold-light/80">
                {m}
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--gold)" }} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 3 · Schaufenster (Metapher + Pain) ────────────────────────────────── */
function Schaufenster() {
  // Zusammenhängender 3D-Rundgang: Schaufenster, Empfang, ausgewählte Arbeiten.
  return <StudioJourney />;
}

/* ── 4 · Werthebel (ROI-Kette) ─────────────────────────────────────────── */
function Werthebel() {
  return (
    <section id="hebel" className="relative scroll-mt-20 overflow-hidden px-6 py-[14vh]" style={{ background: "var(--tech-bg)" }}>
      <Kulisse bild="werthebel" position="center 42%" />
      <Deckenlicht />
      <div className="relative mx-auto max-w-6xl">
        <motion.div {...rise()} className="max-w-3xl">
          <Eyebrow>// luxury-level roi · warum sich premium rechnet</Eyebrow>
          <h2 className="mt-5 font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.3rem)", letterSpacing: "-0.01em" }}>
            Hochwertigkeit ist kein Schmuck. Sie ist ein Werthebel.
          </h2>
          <Messinglinie className="mt-8" />
        </motion.div>

        {/* Eine Reihe Paneele mit Messingfuge dazwischen, keine schwebenden Kacheln */}
        <div className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-5" style={{ background: "rgba(184,150,62,0.22)", border: "1px solid rgba(184,150,62,0.22)" }}>
          {HEBEL.map((h, i) => (
            <motion.div key={h.term} {...rise(i * 0.07)} className="group relative p-7" style={{ background: PANEEL_BG }}>
              <span aria-hidden className="absolute left-0 top-0 h-px w-0 transition-all duration-700 group-hover:w-full" style={{ background: MESSING }} />
              <span className="font-mono text-[10px] tracking-[0.2em] text-gold/55">0{i + 1}</span>
              <h.icon size={21} className="mt-5 text-gold-light" strokeWidth={1.6} aria-hidden />
              <h3 className="mt-5 font-serif text-[1.3rem] leading-tight text-cream">{h.term}</h3>
              <p className="mt-2 text-[0.88rem] leading-snug text-warm-light/60">{h.line}</p>
            </motion.div>
          ))}
        </div>

        {/* Die eine Aussage der Sektion, als gerahmte Messingtafel */}
        <motion.div {...rise(0.25)} className="relative mt-12" style={{ padding: "clamp(6px, 0.7vw, 10px)", background: MESSING, boxShadow: "0 34px 90px rgba(0,0,0,0.6)" }}>
          <div className="px-8 py-12 text-center md:px-14 md:py-16" style={{ background: "linear-gradient(158deg, rgba(30,24,16,0.97), rgba(12,10,7,0.99))", boxShadow: "inset 0 0 40px rgba(0,0,0,0.6)" }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-light">Das Ergebnis</p>
            <Messinglinie breite="3.5rem" className="mx-auto mt-6" />
            <p className="mx-auto mt-7 max-w-3xl font-serif leading-[1.15] text-cream" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
              Wer so auftritt, kann höhere Preise verlangen. Und holt die Investition in die
              eigene Seite schneller wieder rein.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── 5 · Für wen (ICP + Angebot, auf dem Adler) ───────────────────────── */
const FUER_WEN = [
  "Berater, Kanzleien, Studios und Praxen mit hochpreisigen Leistungen",
  "Dein Angebot ist Premium, deine Webseite sieht nach Baukasten aus",
  "Kunden vergleichen dich vor dem ersten Gespräch mit den Besten deiner Nische",
  "Du willst einen Auftritt, der deinen Preis erklärt, bevor du ihn nennst",
];
const NICHT_FUER = [
  "Preiskämpfer, die über den günstigsten Anbieter gewinnen wollen",
  "Projekte, bei denen der Baukasten wirklich reicht",
];

function FuerWen() {
  return (
    <section id="methode" className="relative scroll-mt-20 overflow-hidden px-6 py-[14vh]">
      <span aria-hidden className="ws-ghost pointer-events-none absolute right-0 top-10 hidden whitespace-nowrap font-serif uppercase lg:block" style={{ fontSize: "clamp(5rem, 11vw, 10rem)", lineHeight: 1, opacity: 0.4 }}>
        Für wen
      </span>

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.figure
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.2 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden "
          style={{ border: "1px solid rgba(184,150,62,0.4)", boxShadow: "0 34px 90px rgba(80,60,20,0.3)", background: "#0B0906" }}
        >
          <Image src="/webseiten/adler-stills/frontal-portraet-4zu5.webp" alt="Der Sabala-Adler am Schreibtisch, Blick nach vorn" width={800} height={1000} className="w-full object-cover" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6" style={{ background: "linear-gradient(to top, rgba(11,9,6,0.92), transparent)" }}>
            <p className="font-serif text-[1.15rem] italic leading-snug text-cream">
              »Eine gute Webseite ist ein aufgeräumtes Schaufenster mit einem klaren Angebot, das die richtigen Menschen bewegt, einzutreten.«
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-light">Ilja Sabala</p>
          </figcaption>
        </motion.figure>

        <div>
          <motion.div {...rise()}>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// für wen das gebaut ist</p>
            <h2 className="mt-5 font-serif leading-[1.07]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.7rem)", color: "#2A2520" }}>
              Für Premium-Dienstleister, deren Auftritt dem Angebot hinterherhinkt.
            </h2>
            <p className="mt-6 max-w-xl text-[1.06rem] leading-relaxed" style={{ color: "#46403A" }}>
              Der erste Eindruck entscheidet, ob dein Preis als selbstverständlich gilt oder als
              Verhandlungsbasis. Deshalb baue ich Webseiten, die Premium sofort sichtbar machen.
            </p>
          </motion.div>

          <div className="mt-9 grid gap-6 sm:grid-cols-[1.2fr_1fr]">
            <motion.div {...rise(0.05)} className="p-6" style={PAPIER}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Für dich, wenn</p>
              <ul className="mt-4 space-y-3">
                {FUER_WEN.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[0.95rem] leading-snug" style={{ color: "#2A2520" }}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--gold)" }} />{t}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...rise(0.12)} className="p-6" style={{ background: "#F3EFE7", border: "1px solid rgba(46,43,38,0.1)" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "#8A8178" }}>Nicht für</p>
              <ul className="mt-4 space-y-3">
                {NICHT_FUER.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[0.95rem] leading-snug" style={{ color: "#5C554C" }}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#A89F93" }} />{t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 6 · Galerie (Proof, 3D-Tilt + Overlay) ────────────────────────────── */
/* Goldrahmen wie im Saal: gebuersteter Messingverlauf, innen eine dunkle Kante,
   darin das Bild. Kein Kachel-Look, sondern ein gerahmtes Bild an der Wand. */
const RAHMEN = {
  padding: "clamp(7px, 0.9vw, 13px)",
  background: "linear-gradient(147deg, #c8ab73 0%, #7d6235 22%, #f0dcae 48%, #8a6f3c 64%, #d8bd84 86%, #6f5730 100%)",
  boxShadow: "0 34px 80px rgba(0,0,0,0.62), 0 2px 0 rgba(255,240,205,0.28) inset, 0 -2px 0 rgba(60,44,18,0.55) inset",
};

function ArbeitRahmen({ img, label, aktiv }: { img: string; label: string; aktiv: boolean }) {
  return (
    <div style={RAHMEN}>
      <div className="relative aspect-[16/9] overflow-hidden" style={{ background: "#0A0806", boxShadow: "0 0 0 1px rgba(30,22,10,0.85), inset 0 0 26px rgba(0,0,0,0.75)" }}>
        <Image src={img} alt={label} fill sizes="(min-width: 1024px) 60vw, 92vw" className="object-cover object-top" priority={aktiv} />
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(142deg, rgba(255,229,179,0.07), transparent 42%, rgba(0,0,0,0.1))" }} />
      </div>
    </div>
  );
}

function Galerie() {
  const [aktiv, setAktiv] = useState(0);
  const anzahl = ARBEIT.length;
  const weiter = (d: number) => setAktiv((v) => (v + d + anzahl) % anzahl);
  const a = ARBEIT[aktiv];

  return (
    <section id="arbeiten" className="relative scroll-mt-20 overflow-hidden px-6 py-[13vh]" style={{ background: "var(--tech-bg)" }}>
      {/* warmes Licht von oben, wie die Bildleuchte ueber dem Rahmen */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[55vh] w-[92vw] max-w-5xl -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.16), transparent 68%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <motion.div {...rise()} className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// echte arbeit</p>
            <h2 className="mt-5 font-serif leading-[1.08] text-cream" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
              Keine Mockups. Alles live.
            </h2>
          </div>
          <Link href="/case-studies" className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-gold-light transition-colors hover:text-cream">
            Alle Case Studies
            <ArrowRight size={14} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Buehne: die gewaehlte Arbeit gross, je eine angeschnitten daneben */}
        <motion.div {...rise(0.06)} className="relative mt-14 flex items-center gap-4 sm:gap-7">
          <button type="button" onClick={() => weiter(-1)} aria-label="Vorherige Arbeit" className="z-20 grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors" style={{ border: "1px solid rgba(184,150,62,0.4)", background: "rgba(10,8,6,0.72)", color: "var(--gold-light)" }}>
            <ChevronLeft size={19} aria-hidden />
          </button>

          <div className="relative flex-1" style={{ height: "clamp(200px, 36vw, 460px)" }}>
            {ARBEIT.map((w, i) => {
              const slot = caseSlot(i, aktiv, anzahl);
              const weg = Math.abs(slot) > 1;
              return (
                <div key={w.label} aria-hidden={slot !== 0} className="absolute left-1/2 top-1/2 w-[76%] sm:w-[68%]"
                  style={{
                    transform: `translate(-50%,-50%) translateX(${slot * 62}%) scale(${slot === 0 ? 1 : 0.72})`,
                    opacity: weg ? 0 : slot === 0 ? 1 : 0.4,
                    zIndex: slot === 0 ? 10 : 5,
                    filter: slot === 0 ? "none" : "saturate(0.65)",
                    pointerEvents: weg ? "none" : "auto",
                    transition: "transform .62s cubic-bezier(0.16,1,0.3,1), opacity .5s ease, filter .5s ease",
                  }}>
                  {slot === 0 ? (
                    <a href={w.url} target="_blank" rel="noopener noreferrer" className="block" aria-label={`${w.label} live ansehen`}>
                      <ArbeitRahmen img={w.img} label={w.label} aktiv />
                    </a>
                  ) : (
                    <button type="button" tabIndex={-1} onClick={() => setAktiv(i)} className="block w-full cursor-pointer" aria-label={`${w.label} auswählen`}>
                      <ArbeitRahmen img={w.img} label={w.label} aktiv={false} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <button type="button" onClick={() => weiter(1)} aria-label="Nächste Arbeit" className="z-20 grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors" style={{ border: "1px solid rgba(184,150,62,0.4)", background: "rgba(10,8,6,0.72)", color: "var(--gold-light)" }}>
            <ChevronRight size={19} aria-hidden />
          </button>
        </motion.div>

        {/* Messingschild unter dem Bild, wie im Museum */}
        <div className="relative mx-auto mt-10 max-w-2xl text-center" key={a.label} style={{ animation: "ws-plate .45s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div aria-hidden className="mx-auto h-px w-24" style={{ background: "linear-gradient(90deg, transparent, rgba(184,150,62,0.65), transparent)" }} />
          {a.badge && (
            <span className="mt-6 inline-block px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--gold-light)", border: "1px solid rgba(184,150,62,0.4)" }}>{a.badge}</span>
          )}
          <p className="mt-5 font-serif text-cream" style={{ fontSize: "clamp(1.5rem, 3vw, 2.3rem)" }}>{a.label}</p>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-warm-light/80">{a.note}</p>
          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-warm-light/45">{a.rolle}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <a href={a.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-gold-light transition-colors hover:text-cream">
              Live ansehen <MoveUpRight size={14} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
            <Link href="/case-studies" className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-warm-light/55 transition-colors hover:text-cream">
              Case Study <ArrowRight size={13} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Position im Rundgang */}
          <div className="mt-9 flex items-center justify-center gap-2.5" role="tablist" aria-label="Arbeiten">
            {ARBEIT.map((w, i) => (
              <button key={w.label} type="button" role="tab" aria-selected={i === aktiv} aria-label={w.label} onClick={() => setAktiv(i)}
                className="h-1.5 transition-all duration-500"
                style={{ width: i === aktiv ? 26 : 6, background: i === aktiv ? "var(--gold-light)" : "rgba(184,150,62,0.3)" }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 7 · Analyse (das eine Angebot + Formular) ─────────────────────────── */
function Analyse() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    let normalized: string;
    try {
      normalized = new URL(url.startsWith("http") ? url : `https://${url.trim()}`).toString();
    } catch {
      setError("Bitte gib eine gültige Webseiten-Adresse ein.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }
    if (!consent) {
      setError("Bitte bestätige die Datenschutzhinweise.");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/audit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized, email: email.trim(), consent: true }),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
      setError("Das hat gerade nicht geklappt. Schreib mir alternativ direkt an sabala@sabala-mentoring.com");
    }
  };

  return (
    <section id="analyse" className="scroll-mt-20 px-6 py-[13vh]">
      <div className="mx-auto max-w-6xl">
        {/* Dunkle Buehne mit Gold-Rahmen: der eine Conversion-Moment der Seite */}
        <motion.div
          {...rise()}
          className="relative overflow-hidden px-7 py-12 md:px-14 md:py-16"
          style={{ background: "var(--tech-bg)", border: "1px solid rgba(212,174,90,0.5)", boxShadow: "0 50px 130px rgba(80,60,20,0.35)" }}
        >
          <div aria-hidden className="pointer-events-none absolute -top-16 left-1/2 h-[120%] w-[70%] -translate-x-1/2" style={{ background: "conic-gradient(from 180deg at 50% 0%, transparent 42%, rgba(212,174,90,0.13) 50%, transparent 58%)" }} />
          <div aria-hidden className="wd-grain pointer-events-none absolute inset-0 opacity-15" />

          <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            {/* Angebots-Stack */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-light">// dein einstieg · kostenlos</p>
              <h2 className="mt-5 font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.3rem, 5vw, 3.9rem)" }}>
                Lass dein Potenzial analysieren.
              </h2>
              <p className="mt-5 max-w-lg text-[1.06rem] leading-relaxed text-warm-light/75">
                Bevor über ein Projekt gesprochen wird, bekommst du Klarheit. Vier Bausteine,
                ein Gespräch, null Risiko:
              </p>

              <div className="mt-9 space-y-4">
                {ANGEBOT_STACK.map((a, i) => (
                  <motion.div key={a.term} {...rise(0.05 + i * 0.07)} className="flex items-start gap-4 p-5" style={{ background: "linear-gradient(158deg, rgba(41,33,22,0.9), rgba(15,12,9,0.96))", border: "1px solid rgba(184,150,62,0.25)" }}>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center" style={{ background: "rgba(184,150,62,0.14)", border: "1px solid rgba(184,150,62,0.4)" }}>
                      <a.icon size={19} strokeWidth={1.9} className="text-gold-light" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-serif text-[1.22rem] text-cream">{a.term}</h3>
                      <p className="mt-1 text-[0.93rem] leading-relaxed text-warm-light/65">{a.line}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.p {...rise(0.35)} className="mt-7 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-gold-light/90">
                <ShieldCheck size={15} aria-hidden />
                Kein Risiko · unverbindlich · das Ergebnis bleibt bei dir
              </motion.p>
            </div>

            {/* Formular */}
            <div className="lg:pt-2">
              <motion.div {...rise(0.12)} className="p-7 md:p-9" style={{ background: "rgba(250,248,245,0.035)", border: "1px solid rgba(184,150,62,0.35)" }}>
                {state === "success" ? (
                  <div className="py-8 text-center">
                    <p className="font-serif text-[1.8rem] text-cream">Angekommen. Danke dir.</p>
                    <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-warm-light/75">
                      Ich schaue mir deine Seite und deine Nische persönlich an und melde mich
                      per E-Mail für das Gespräch. Keine Automatenmail, kein Spam.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <p className="font-serif text-[1.5rem] text-cream">Wo dürfen wir hinschauen?</p>
                    <div className="mt-6 space-y-4">
                      <label className="block">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-warm-light/60">Deine Webseite</span>
                        <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="deine-seite.de" className="mt-2 w-full px-4 py-3.5 text-[1rem] text-cream placeholder:text-warm-light/30 focus:outline-none" style={{ background: "rgba(10,8,6,0.6)", border: "1px solid rgba(184,150,62,0.3)" }} />
                      </label>
                      <label className="block">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-warm-light/60">Deine E-Mail</span>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="du@firma.de" className="mt-2 w-full px-4 py-3.5 text-[1rem] text-cream placeholder:text-warm-light/30 focus:outline-none" style={{ background: "rgba(10,8,6,0.6)", border: "1px solid rgba(184,150,62,0.3)" }} />
                      </label>
                    </div>

                    <label className="mt-5 flex cursor-pointer items-start gap-3">
                      <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 accent-[var(--gold)]" />
                      <span className="text-[0.85rem] leading-relaxed text-warm-light/60">
                        Ich bin einverstanden, dass meine Angaben zur Erstellung und Zusendung der
                        Analyse verarbeitet werden. Details in der{" "}
                        <Link href="/datenschutz" className="underline decoration-warm-light/30 underline-offset-2 hover:text-warm-light/90">Datenschutzerklärung</Link>.
                      </span>
                    </label>

                    {error && <p className="mt-4 text-[0.9rem] text-[#E8A9A0]">{error}</p>}

                    <button type="submit" disabled={state === "loading"} className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold-light px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold disabled:opacity-60">
                      {state === "loading" ? "Wird gesendet ..." : "Potenzial-Analyse anfordern"}
                      {state !== "loading" && <ArrowRight size={16} aria-hidden />}
                    </button>
                  </form>
                )}
              </motion.div>

              {/* Vertrauens-Anker: echte Person */}
              <motion.div {...rise(0.2)} className="mt-6 flex items-center gap-4 p-4" style={{ border: "1px solid rgba(184,150,62,0.2)", background: "linear-gradient(158deg, rgba(41,33,22,0.9), rgba(15,12,9,0.96))" }}>
                <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-full" style={{ border: "1.5px solid rgba(212,174,90,0.6)" }}>
                  <Image src="/webseiten/adler-stills/frontal-kopf.webp" alt="Der Sabala-Adler" fill sizes="56px" className="object-cover" />
                </span>
                <p className="text-[0.92rem] leading-snug text-warm-light/70">
                  Du sprichst direkt mit mir, nicht mit einem Vertrieb. Analyse und Gespräch
                  mache ich persönlich.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── 8 · Prozess (drei Schritte, eine Reihe) ───────────────────────────── */
function Prozess() {
  return (
    <section id="prozess" className="scroll-mt-20 px-6 py-[12vh]">
      <div className="mx-auto max-w-6xl">
        <motion.div {...rise()} className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// der weg</p>
          <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)", color: "#2A2520" }}>
            Drei Schritte, kein Agentur-Nebel.
          </h2>
        </motion.div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROZESS.map((p, i) => (
            <motion.div key={p.n} {...rise(i * 0.08)} className="p-7" style={PAPIER}>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-[2.2rem] leading-none text-gold">{p.n}</span>
                {p.tag && <span className="rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em]" style={{ background: "rgba(184,150,62,0.14)", color: "#8A6D2A", border: "1px solid rgba(184,150,62,0.4)" }}>{p.tag}</span>}
              </div>
              <h3 className="mt-3 font-serif text-[1.35rem]" style={{ color: "#2A2520" }}>{p.term}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed" style={{ color: "#46403A" }}>{p.line}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 9 · Fundament (Trust-Band) ────────────────────────────────────────── */
function Fundament() {
  return (
    <section id="fundament" className="relative scroll-mt-20 overflow-hidden px-6 py-[14vh]" style={{ background: "var(--tech-bg)" }}>
      <Kulisse bild="fundament" position="center 55%" staerke={0.38} />
      <div className="relative mx-auto max-w-6xl">
        <motion.div {...rise()} className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// das fundament</p>
          <h2 className="mt-5 font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.3rem)", letterSpacing: "-0.01em" }}>
            Technik, über die du nie wieder nachdenken musst.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FUNDAMENT.map((f, i) => (
            <motion.div key={f.term} {...rise(i * 0.08)} className="p-7" style={{ background: "linear-gradient(158deg, rgba(41,33,22,0.9), rgba(15,12,9,0.96))", border: "1px solid rgba(184,150,62,0.18)" }}>
              <p className="font-serif leading-none text-gold-light" style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)" }}>{f.stat}</p>
              <h3 className="mt-3 font-mono text-[12px] uppercase tracking-[0.2em] text-cream/90">{f.term}</h3>
              <p className="mt-3 text-[0.94rem] leading-relaxed text-warm-light/70">{f.line}</p>
            </motion.div>
          ))}
        </div>

        <motion.p {...rise(0.15)} className="mx-auto mt-12 max-w-2xl text-center font-serif text-[1.25rem] italic leading-relaxed text-warm-light/70">
          Diese Seite hier läuft auf genau dem Setup, das du bekommst. Was ich verkaufe,
          benutze ich selbst, jeden Tag.
        </motion.p>
      </div>
    </section>
  );
}

/* ── 10 · Pflege (drei Stufen, MIT Preisen) + Cockpit ──────────────────── */
function Pflege() {
  return (
    <section id="pflege" className="scroll-mt-20 px-6 py-[13vh]">
      <div className="mx-auto max-w-6xl">
        <motion.div {...rise()} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// nach dem launch</p>
          <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#2A2520" }}>
            Nach dem Launch fängt es erst an.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: "#46403A" }}>
            Eine Webseite ist kein Projektende. Als dein technischer Partner übernehme ich
            Betrieb und Wachstum, in drei klaren Stufen.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PFLEGE.map((p, i) => (
            <motion.div
              key={p.term}
              {...rise(i * 0.1)}
              className={`relative flex flex-col p-8 ${p.highlight ? "md:-translate-y-3" : ""}`}
              style={
                p.highlight
                  ? PAPIER_BETONT
                  : PAPIER
              }
            >
              {p.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold-light px-4 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-tech-bg">
                  Meist gewählt
                </span>
              )}
              <h3 className="font-serif text-[1.7rem]" style={{ color: "#2A2520" }}>{p.term}</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-serif text-[2.3rem] leading-none" style={{ color: "#2A2520" }}>{p.price} €</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "#9A8F7E" }}>im Monat</span>
              </div>
              <ul className="mt-6 flex-1 space-y-2.5">
                {p.punkte.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-[0.94rem] leading-relaxed" style={{ color: "#46403A" }}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--gold)" }} />
                    {pt}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t pt-4 text-[0.92rem] italic leading-relaxed" style={{ borderColor: "rgba(184,150,62,0.18)", color: "#7A7268" }}>
                {p.line}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p {...rise(0.2)} className="mx-auto mt-8 max-w-xl text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em]" style={{ color: "#9A8F7E" }}>
          Preise netto zzgl. MwSt. · Angebote für Unternehmen und Selbständige · monatlich, kein Jahresvertrag
        </motion.p>

        {/* Cockpit: Iljas Werkzeug, dein Ueberblick */}
        <motion.div {...rise(0.15)} className="mt-14 overflow-hidden " style={{ background: "var(--tech-bg)", border: "1px solid rgba(91,214,208,0.3)", boxShadow: "0 40px 100px rgba(0,0,0,0.35)" }}>
          <div className="grid items-center gap-8 p-8 md:grid-cols-[0.95fr_1.05fr] md:p-12">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "#5BD6D0" }}>// mein cockpit · dein überblick</p>
              <h3 className="mt-4 font-serif leading-[1.1] text-cream" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>
                Ich habe deine Seite im Blick.
              </h3>
              <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-warm-light/75">
                In Wachstum und Partner läuft deine Seite in meinem selbst gebauten Cockpit:
                Besucher, Google-Rankings, KI-Sichtbarkeit, Blog-Performance. Du bekommst
                jeden Monat einen Bericht in Klartext, ohne selbst in Tools zu wühlen. Genau
                das meint Partner an deiner Seite.
              </p>
            </div>
            <motion.div whileHover={{ rotateX: 3, rotateY: -4, scale: 1.015 }} transition={{ type: "spring", stiffness: 110, damping: 18 }} style={{ perspective: 1100, transformStyle: "preserve-3d" }} className="relative overflow-hidden" >
              <Image src="/case-studies/webseiten-analytics.jpg" alt="Sabala Cockpit: SEO, GEO und Besucher aller betreuten Seiten in einer Sicht" width={1600} height={900} className="w-full" style={{ border: "1px solid rgba(91,214,208,0.3)" }} />
              <span className="absolute right-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ background: "rgba(10,8,6,0.85)", color: "#5BD6D0", border: "1px solid rgba(91,214,208,0.35)" }}>
                Täglich im Einsatz
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── 11 · FAQ ──────────────────────────────────────────────────────────── */
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-20 px-6 py-[13vh]" style={{ background: "#F3EFE7" }}>
      <div className="mx-auto max-w-3xl">
        <motion.div {...rise()} className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// fragen</p>
          <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "#2A2520" }}>
            Ehrliche Antworten, bevor du fragst.
          </h2>
        </motion.div>

        <div className="mt-12 space-y-3">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={f.q} {...rise(i * 0.04)} className="overflow-hidden" style={{ background: "linear-gradient(158deg, #FBF7EF 0%, #F2EBDD 100%)", border: `1px solid rgba(184,150,62,${isOpen ? "0.45" : "0.2"})`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85), 0 14px 32px rgba(72,54,20,0.06)" }}>
                <button type="button" onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-6 px-7 py-5 text-left" aria-expanded={isOpen}>
                  <span className="font-serif text-[1.15rem]" style={{ color: "#2A2520" }}>{f.q}</span>
                  <span className="shrink-0 font-serif text-[1.4rem] leading-none transition-transform duration-300" style={{ color: "var(--gold)", transform: isOpen ? "rotate(45deg)" : "none" }} aria-hidden>
                    +
                  </span>
                </button>
                <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="px-7 pb-6 text-[0.97rem] leading-relaxed" style={{ color: "#46403A" }}>{f.a}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 12 · Finale (ein CTA, ein Funnel) ─────────────────────────────────── */
function Finale() {
  return (
    <section id="finale" className="relative overflow-hidden px-6 py-[15vh]" style={{ background: "var(--tech-bg)" }}>
      <Kulisse bild="finale" position="center 60%" staerke={0.5} />
      <Image src="/webseiten/adler-stills/frontal-banner-21zu9.webp" alt="" aria-hidden fill sizes="100vw" className="object-cover object-top opacity-35" />
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.55), rgba(10,8,6,0.85) 60%, rgba(10,8,6,0.97))" }} />
      <div aria-hidden className="wd-aurora-a pointer-events-none absolute -left-1/4 top-0 h-[60vh] w-[60vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(184,150,62,0.14), transparent 65%)" }} />
      <div aria-hidden className="wd-aurora-b pointer-events-none absolute -right-1/4 bottom-0 h-[60vh] w-[60vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(184,150,62,0.10), transparent 65%)" }} />

      <motion.div {...rise()} className="relative mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-8 flex justify-center">
          <SpinBadge />
        </div>
        <h2 className="font-serif leading-[1.05] text-cream" style={{ fontSize: "clamp(2.6rem, 6.4vw, 5.2rem)", letterSpacing: "-0.01em" }}>
          Der erste Schritt kostet dich nichts.
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-[1.15rem] leading-relaxed text-warm-light/80">
          Website-Check, Wettbewerbsanalyse und Gespräch: danach weißt du, wo deine Seite
          steht und was der größte Hebel ist. Alles Weitere entscheidest du.
        </p>
        <div className="mt-10">
          <a href="#analyse" className="inline-flex items-center gap-2.5 rounded-full bg-gold-light px-10 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold">
            Kostenlose Potenzial-Analyse <ArrowRight size={16} aria-hidden />
          </a>
        </div>
        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-warm-light/45">
          <span>Kein Risiko</span>
          <span aria-hidden className="h-1 w-1 rounded-full" style={{ background: "var(--gold)" }} />
          <span>Klare Expertise</span>
          <span aria-hidden className="h-1 w-1 rounded-full" style={{ background: "var(--gold)" }} />
          <span>Klare Potenziale</span>
        </p>
      </motion.div>
    </section>
  );
}
