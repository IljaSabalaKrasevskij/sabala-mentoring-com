"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import { useState, type FormEvent } from "react";
import {
  Search, ShieldCheck, Crosshair, Scan, Gem, Layers, Code2, Sparkles,
  FileSearch, Radar, MessagesSquare, ListChecks, ArrowRight, ArrowDown,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   /webseiten — Sales-Page v5 (1.9.2026, Design-first-Umbau nach Iljas Review)

   Ein Funnel, ein CTA: die kostenlose Potenzial-Analyse (Website-Check +
   Wettbewerbsanalyse + Beratungsgespraech) als einziges Einstiegs-Angebot.
   Du-Ansprache statt Ich-Saetze im Hero. Schaufenster-Metapher als eigene
   Sektion. Business-Developer-Block mit echtem Foto und Zitat. Prozess auf
   5 Schritte (Analyse ist Teil des Gespraechs). Pflege MIT Preisen
   (49/99/149 netto, B2B-Hinweis). Dashboard als Iljas Cockpit erzaehlt,
   nicht als Kunden-Upsell.

   Kleines du, keine Em-Dashes, keine Ausrufezeichen, nur echte Zahlen.
   Keine deutschen Anfuehrungszeichen im JSX (Turbopack-Falle), Zitate mit »«.
   Fotos: /public/webseiten/ilja-*.jpg (EXIF gestrippt, Repo ist public).
   ───────────────────────────────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ── Daten ─────────────────────────────────────────────────────────────── */

const MARQUEE = [
  "Verkaufsoptimiert",
  "Eigener Code",
  "Ladezeit unter 2 s",
  "SEO + GEO",
  "Wettbewerbs-Analyse",
  "DSGVO-konform",
  "Ein Ansprechpartner",
  "Pflege-Service",
];

const BAUCHLADEN = ["12 Angebote", "Popup beim Start", "Stock-Fotos", "Slider", "Für alle etwas", "Zuletzt 2019 gepflegt", "8 Sekunden Ladezeit"];

const HEBEL = [
  { icon: Search, term: "Gefunden werden", line: "bei Google und in KI-Suchen" },
  { icon: ShieldCheck, term: "Vertrauen", line: "im ersten Augenblick" },
  { icon: Crosshair, term: "Klare Zielgruppe", line: "eine Botschaft, nicht vier" },
  { icon: Scan, term: "Keine Ablenkung", line: "ein Weg, ein nächster Schritt" },
  { icon: Gem, term: "Hochwertigkeit", line: "in jedem Detail spürbar" },
];

const METHODE = [
  { icon: Crosshair, term: "Zielgruppe geschärft", line: "Wen deine Seite anspricht, und wen bewusst nicht." },
  { icon: Layers, term: "Angebot sortiert", line: "Einstieg, Kern, nächster Schritt: Kaufen wird leicht." },
  { icon: Sparkles, term: "Verkaufspsychologie", line: "Jede Section hat einen Job: Vertrauen, Beweis, Handlung." },
  { icon: Code2, term: "Eigener Code", line: "Kein Theme, kein Plugin-Stapel, unter zwei Sekunden." },
  { icon: Search, term: "Sichtbar ab Tag eins", line: "SEO und GEO stecken im Fundament, nicht im Nachtrag." },
  { icon: ShieldCheck, term: "KI als Werkzeug", line: "Claude Code übernimmt Fleißarbeit, ich entscheide." },
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

const ARBEIT_FEATURED = {
  img: "/case-studies/yuna.jpg",
  label: "yuna-sports-nutrition.com",
  note: "Personal Training München · Brand-System, One-Pager, Blog, SEO + Messung",
  badge: "Neu · live seit August 2026",
};

const ARBEIT = [
  { img: "/case-studies/vegaleads.jpg", label: "vegaleads.ai", note: "Lead-Radar, zweisprachig" },
  { img: "/case-studies/dielommel.jpg", label: "dielommel.de", note: "Begleitung für Familienunternehmen" },
  { img: "/case-studies/cyber-sales.jpg", label: "cyber-sales.de", note: "Vertriebssystem Cybersecurity" },
  { img: "/case-studies/sabala-mentoring.jpg", label: "Sabala Studios", note: "KI-Studio & Akademie" },
];

const PROZESS = [
  {
    n: "01",
    term: "Potenzial-Analyse & Gespräch",
    tag: "kostenlos",
    line: "Du schickst mir deine Seite, ich analysiere sie und deine Wettbewerber. Danach gehen wir die Ergebnisse zusammen durch. Ab hier weißt du, wo du stehst.",
  },
  {
    n: "02",
    term: "Dein Angebot",
    tag: null,
    line: "Du bekommst ein klares Angebot: Umfang, Zeitplan, Preis. Keine versteckten Posten, und die Entscheidung liegt bei dir.",
  },
  {
    n: "03",
    term: "Konzept & Build",
    tag: null,
    line: "Zielgruppe geschärft, Story und Struktur festgelegt, dann Design, eigener Code und Motion. Du siehst Zwischenstände statt Überraschungen.",
  },
  {
    n: "04",
    term: "Launch",
    tag: null,
    line: "Technik, Umzug, Redirects, Indexierung. Sauber live gestellt und sauber übergeben.",
  },
  {
    n: "05",
    term: "Pflege & Wachstum",
    tag: null,
    line: "Aus einem Guss weiter betreut: Updates, SEO- und GEO-Pflege, Monatsbericht. Du hast mit Technik nichts mehr zu tun.",
  },
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
    price: "49",
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
    a: "Das Projekt bekommt einen individuellen Rahmen, weil es kein Produkt von der Stange ist: ein OnePager liegt woanders als eine komplette Markenwelt. Nach der Analyse steht dein Angebot mit Umfang, Zeitplan und Preis. Die laufende Pflege ist transparent: 49, 99 oder 149 Euro im Monat, netto.",
  },
  {
    q: "Wie lange dauert ein Projekt?",
    a: "Ein OnePager meist zwei bis drei Wochen ab vollständigen Inhalten, größere Markenwelten mehrere Wochen. Du bekommst vor dem Start einen ehrlichen Zeitplan, keine Wunschtermine.",
  },
  {
    q: "Wie genau hilft dir KI dabei?",
    a: "Ich baue mit Claude Code. Die KI übernimmt Fleißarbeit und liefert Iterationen in hohem Tempo, ich treffe die Entscheidungen: Strategie, Geschmack, Qualität und Verantwortung bleiben menschlich. Du bekommst dadurch mehr Tiefe und mehr Entwürfe für dein Budget.",
  },
  {
    q: "Was ist GEO?",
    a: "GEO heißt: Sichtbarkeit in KI-Suchen. ChatGPT und Perplexity zitieren Seiten mit sauberer Struktur, Schema-Markup und klaren Antworten. Deine Seite wird von Anfang an so gebaut, dass KI sie versteht und empfehlen kann.",
  },
  {
    q: "Kann ich die Seite später selbst pflegen?",
    a: "Der Code gehört dir, im eigenen GitHub-Repo. Änderungen übernehme ich im Pflege-Service, oder dein Team lernt in der KI-Akademie, selbst damit zu arbeiten. Beides ist ein sauberer Weg, du bist nie eingesperrt.",
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
            description: "Updates, Sicherheit, Backups, kleine Änderungen. 49 Euro im Monat netto.",
            priceSpecification: { "@type": "UnitPriceSpecification", price: 49, priceCurrency: "EUR", valueAddedTaxIncluded: false, unitText: "Monat" },
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

export default function WebseitenPage() {
  return (
    <main className="flex-1" style={{ background: "var(--cream)" }}>
      {/* statisches Objekt, kein User-Input; < wird nach Next-Doku escaped */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA).replace(/</g, "\\u003c") }} />
      <ScrollRail />
      <Hero />
      <Marquee />
      <Schaufenster />
      <Werthebel />
      <Methode />
      <Galerie />
      <Analyse />
      <Prozess />
      <Fundament />
      <Pflege />
      <Faq />
      <Finale />
      <style>{`
        @keyframes ws-spin { to { transform: rotate(360deg); } }
        .ws-spin { animation: ws-spin 22s linear infinite; }
        @keyframes ws-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
        .ws-ghost {
          -webkit-text-stroke: 1px rgba(184,150,62,0.28);
          color: transparent;
          user-select: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .ws-spin { animation: none; }
        }
      `}</style>
    </main>
  );
}

/* ── Scroll-Rail: laeuft rechts an der Seite mit (Desktop) ─────────────── */
const RAIL = [
  { id: "schaufenster", label: "Schaufenster" },
  { id: "hebel", label: "Werthebel" },
  { id: "methode", label: "Methode" },
  { id: "arbeiten", label: "Arbeiten" },
  { id: "analyse", label: "Analyse" },
  { id: "prozess", label: "Prozess" },
  { id: "fundament", label: "Fundament" },
  { id: "pflege", label: "Pflege" },
  { id: "faq", label: "FAQ" },
];

function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  return (
    <div className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block" aria-hidden>
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

/* ── 1 · Hero ──────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative flex min-h-[94vh] items-center justify-center overflow-hidden px-6" style={{ background: "var(--tech-bg)" }}>
      <video autoPlay muted loop playsInline preload="auto" poster="/brand/liquid-gold-poster.jpg" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45" style={{ mixBlendMode: "screen" }}>
        <source src="/brand/liquid-gold.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 35%, rgba(184,150,62,0.10), transparent 65%)" }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,8,6,0.55), transparent 30%, rgba(10,8,6,0.88))" }} />

      <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="relative mx-auto max-w-5xl pb-10 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {["Webdesign", "Verkaufsoptimiert", "SEO + GEO"].map((c) => (
            <span key={c} className="rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-gold-light" style={{ border: "1px solid rgba(184,150,62,0.4)", background: "rgba(184,150,62,0.08)" }}>
              {c}
            </span>
          ))}
        </div>
        <h1 className="mx-auto mt-9 font-serif text-cream" style={{ fontSize: "clamp(2.7rem, 7vw, 6.4rem)", lineHeight: 1.03, letterSpacing: "-0.015em" }}>
          Deine Webseite. Gebaut, um{" "}
          <br className="hidden md:block" />
          den Besten deiner Nische{" "}
          <br className="hidden md:block" />
          <em className="not-italic" style={{ color: "var(--gold-light)" }}>zu schlagen.</em>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-[1.22rem] leading-relaxed text-warm-light/85">
          Du bekommst ein aufgeräumtes Schaufenster für dein Angebot: Premium-Design aus
          eigenem Code, verkaufspsychologisch aufgebaut, in unter zwei Sekunden geladen und
          sichtbar bei Google wie in KI-Suchen. Damit die richtigen Kunden stehen bleiben und
          eintreten.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#analyse" className="inline-flex items-center gap-2.5 rounded-full bg-gold-light px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold">
            Kostenlose Potenzial-Analyse <ArrowRight size={16} aria-hidden />
          </a>
          <a href="#arbeiten" className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-mono text-sm uppercase tracking-[0.12em] text-warm-light/75 transition-colors hover:text-cream" style={{ border: "1px solid rgba(250,248,245,0.22)" }}>
            Arbeiten ansehen
          </a>
        </div>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-warm-light/40">
          Website-Check + Wettbewerbsanalyse + Beratungsgespräch
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }} className="absolute bottom-10 right-10 hidden lg:block">
        <SpinBadge />
      </motion.div>
    </section>
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
  return (
    <section id="schaufenster" className="relative scroll-mt-20 overflow-hidden px-6 py-[14vh]">
      <span aria-hidden className="ws-ghost pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif uppercase" style={{ fontSize: "clamp(5rem, 16vw, 15rem)", lineHeight: 1, opacity: 0.5 }}>
        Schaufenster
      </span>

      <div className="relative mx-auto max-w-6xl">
        <motion.div {...rise()} className="mx-auto max-w-3xl pt-[8vh] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// der erste eindruck</p>
          <h2 className="mt-5 font-serif leading-[1.06]" style={{ fontSize: "clamp(2.3rem, 5.4vw, 4.2rem)", color: "#2A2520" }}>
            Der erste Eindruck entscheidet, ob jemand eintritt.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[1.12rem] leading-relaxed" style={{ color: "#46403A" }}>
            Eine gute Webseite ist ein aufgeräumtes Schaufenster mit einem klaren Angebot, das
            die richtigen Menschen bewegt, hineinzugehen. Die meisten Seiten sind das
            Gegenteil: ein Bauchladen, an dem man vorbeiläuft.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Bauchladen */}
          <motion.div {...rise(0.05)} className="relative overflow-hidden rounded-[1.8rem] p-8 md:p-10" style={{ background: "#E7E1D6", border: "1px solid rgba(46,43,38,0.12)" }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "#8A8178" }}>So sehen die meisten aus</p>
            <h3 className="mt-3 font-serif text-[1.9rem]" style={{ color: "#4A443C" }}>Der Bauchladen</h3>
            <div className="relative mt-8 flex min-h-[220px] flex-wrap content-start items-start gap-3 opacity-90">
              {BAUCHLADEN.map((b, i) => (
                <span
                  key={b}
                  className="rounded-lg px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em]"
                  style={{
                    background: "#F2EDE4",
                    color: "#7A7268",
                    border: "1px dashed rgba(122,114,104,0.4)",
                    transform: `rotate(${[-3, 2, -1.5, 3, -2, 1.5, -2.5][i % 7]}deg)`,
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
            <p className="mt-6 border-t pt-5 text-[1rem] italic" style={{ borderColor: "rgba(46,43,38,0.12)", color: "#7A7268" }}>
              Viel drin, nichts klar. Man geht vorbei.
            </p>
          </motion.div>

          {/* Schaufenster */}
          <motion.div {...rise(0.14)} className="relative overflow-hidden rounded-[1.8rem] p-8 md:p-10" style={{ background: "var(--tech-bg)", border: "1px solid rgba(184,150,62,0.45)", boxShadow: "0 34px 90px rgba(80,60,20,0.28)" }}>
            {/* Spotlight-Kegel */}
            <div aria-hidden className="pointer-events-none absolute -top-10 left-1/2 h-[130%] w-[85%] -translate-x-1/2" style={{ background: "conic-gradient(from 180deg at 50% 0%, transparent 40%, rgba(212,174,90,0.16) 50%, transparent 60%)" }} />
            <p className="relative font-mono text-[11px] uppercase tracking-[0.24em] text-gold-light">So baue ich für dich</p>
            <h3 className="relative mt-3 font-serif text-[1.9rem] text-cream">Dein Schaufenster</h3>
            <div className="relative mt-8 flex min-h-[220px] items-center justify-center">
              <div className="w-full max-w-xs rounded-2xl p-6 text-center" style={{ background: "linear-gradient(160deg, rgba(184,150,62,0.18), rgba(184,150,62,0.05))", border: "1px solid rgba(212,174,90,0.55)", boxShadow: "0 24px 60px rgba(184,150,62,0.25)", animation: "ws-float 6s ease-in-out infinite" }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-light">Ein Angebot</p>
                <p className="mt-3 font-serif text-[1.5rem] leading-tight text-cream">Für die Richtigen. Glasklar.</p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-gold-light">
                  Eintreten <ArrowRight size={13} aria-hidden />
                </span>
              </div>
            </div>
            <p className="relative mt-6 border-t pt-5 text-[1rem] italic text-warm-light/70" style={{ borderColor: "rgba(184,150,62,0.25)" }}>
              Ein Blick, ein Angebot, ein Weg hinein. Man bleibt stehen.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── 4 · Werthebel (ROI-Kette) ─────────────────────────────────────────── */
function Werthebel() {
  return (
    <section id="hebel" className="scroll-mt-20 px-6 py-[14vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto max-w-6xl">
        <motion.div {...rise()} className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// warum sich premium rechnet</p>
          <h2 className="mt-5 font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.3rem)", letterSpacing: "-0.01em" }}>
            Hochwertigkeit ist kein Schmuck. Sie ist ein Werthebel.
          </h2>
        </motion.div>

        <div className="mt-14 flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-0">
          {HEBEL.map((h, i) => (
            <div key={h.term} className="flex flex-1 items-center gap-3 lg:gap-0">
              <motion.div
                {...rise(i * 0.1)}
                whileHover={{ y: -6 }}
                className="w-full rounded-2xl p-6"
                style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.014))", border: "1px solid rgba(184,150,62,0.22)" }}
              >
                <h.icon size={22} className="text-gold-light" strokeWidth={1.8} aria-hidden />
                <h3 className="mt-4 font-serif text-[1.25rem] leading-tight text-cream">{h.term}</h3>
                <p className="mt-1.5 text-[0.88rem] leading-snug text-warm-light/60">{h.line}</p>
              </motion.div>
              {i < HEBEL.length - 1 && (
                <motion.span {...rise(i * 0.1 + 0.05)} aria-hidden className="hidden shrink-0 px-2 font-serif text-[1.4rem] text-gold lg:block">
                  <ArrowRight size={18} strokeWidth={2} />
                </motion.span>
              )}
            </div>
          ))}
        </div>

        <motion.div
          {...rise(0.25)}
          className="relative mt-10 overflow-hidden rounded-[1.8rem] p-9 text-center md:p-12"
          style={{ background: "linear-gradient(160deg, rgba(184,150,62,0.16), rgba(184,150,62,0.04))", border: "1px solid rgba(212,174,90,0.5)", boxShadow: "0 30px 80px rgba(184,150,62,0.15)" }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-light">Das Ergebnis</p>
          <p className="mx-auto mt-4 max-w-3xl font-serif leading-[1.15] text-cream" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            Wer so auftritt, kann höhere Preise verlangen. Und holt die Investition in die
            eigene Seite schneller wieder rein.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── 5 · Methode (Business Developer, Foto + Zitat) ────────────────────── */
function Methode() {
  return (
    <section id="methode" className="relative scroll-mt-20 overflow-hidden px-6 py-[14vh]">
      <span aria-hidden className="ws-ghost pointer-events-none absolute right-0 top-10 hidden whitespace-nowrap font-serif uppercase lg:block" style={{ fontSize: "clamp(5rem, 11vw, 10rem)", lineHeight: 1, opacity: 0.4 }}>
        Methode
      </span>

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        {/* Foto-Spalte */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.2 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative overflow-hidden rounded-[1.6rem]"
            style={{ border: "1px solid rgba(184,150,62,0.4)", boxShadow: "0 34px 90px rgba(80,60,20,0.3)" }}
          >
            <Image src="/webseiten/ilja-mikrofon.jpg" alt="Ilja Sabala im Gespräch am Mikrofon" width={1600} height={1066} className="w-full object-cover" />
            <div aria-hidden className="wd-grain pointer-events-none absolute inset-0 opacity-25" />
            <span className="absolute bottom-4 left-4 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ background: "rgba(10,8,6,0.85)", color: "var(--gold-light)", border: "1px solid rgba(184,150,62,0.4)" }}>
              Ilja Sabala · Business Developer & Web-Architekt
            </span>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 30, rotate: 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="absolute -bottom-10 -right-2 hidden w-52 overflow-hidden rounded-xl bg-white p-2 pb-3 shadow-[0_20px_50px_rgba(80,60,20,0.3)] md:block"
            style={{ border: "1px solid rgba(46,43,38,0.1)" }}
          >
            <Image src="/webseiten/ilja-stehpult.jpg" alt="Ilja Sabala beim Bauen einer Seite, live am Stehpult" width={600} height={400} className="w-full rounded-lg object-cover" />
            <figcaption className="mt-2 px-1 font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color: "#7A7268" }}>
              Live-Session · Juni 2025
            </figcaption>
          </motion.figure>
        </div>

        {/* Text-Spalte */}
        <div>
          <motion.div {...rise()}>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// mehr als webdesign</p>
            <h2 className="mt-5 font-serif leading-[1.07]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.7rem)", color: "#2A2520" }}>
              Du bekommst einen Business Developer, der Webseiten baut.
            </h2>
            <p className="mt-6 max-w-xl text-[1.06rem] leading-relaxed" style={{ color: "#46403A" }}>
              Ich habe Teams geführt und einen Betrieb mit 5,5 Millionen Euro Jahresumsatz
              verantwortet, bevor ich die erste Seite gebaut habe. Deshalb beginnt deine
              Webseite bei mir bei deinem Geschäft: Zielgruppe, Angebot, Markt. Das Design
              kommt danach, und es trifft härter, weil es weiß, worauf es zielt.
            </p>
          </motion.div>

          <motion.blockquote
            {...rise(0.1)}
            className="mt-8 rounded-2xl p-7"
            style={{ background: "var(--tech-bg)", border: "1px solid rgba(184,150,62,0.4)" }}
          >
            <p className="font-serif text-[1.35rem] italic leading-snug text-cream">
              »Eine gute Webseite ist ein aufgeräumtes Schaufenster mit einem klaren Angebot,
              das die richtigen Menschen bewegt, einzutreten.«
            </p>
            <footer className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-light">Ilja Sabala</footer>
          </motion.blockquote>

          <div className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {METHODE.map((m, i) => (
              <motion.div key={m.term} {...rise(0.05 + (i % 2) * 0.06)} className="group flex items-start gap-3.5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-[rgba(184,150,62,0.16)]" style={{ background: "rgba(184,150,62,0.09)", border: "1px solid rgba(184,150,62,0.3)" }}>
                  <m.icon size={17} strokeWidth={1.9} className="text-gold" aria-hidden />
                </span>
                <div>
                  <h3 className="font-serif text-[1.12rem] leading-tight" style={{ color: "#2A2520" }}>{m.term}</h3>
                  <p className="mt-1 text-[0.9rem] leading-snug" style={{ color: "#5C554C" }}>{m.line}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 6 · Galerie (Proof, 3D-Tilt + Overlay) ────────────────────────────── */
function GalerieCard({ img, label, note, badge, featured = false, delay = 0 }: {
  img: string; label: string; note: string; badge?: string; featured?: boolean; delay?: number;
}) {
  return (
    <motion.div {...rise(delay)} style={{ perspective: 1100 }} className={featured ? "sm:col-span-2" : ""}>
      <motion.div whileHover={{ rotateX: 2.5, rotateY: -3, scale: 1.015 }} transition={{ type: "spring", stiffness: 120, damping: 18 }} style={{ transformStyle: "preserve-3d" }}>
        <Link href="/case-studies" className="group relative block overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(184,150,62,0.28)", boxShadow: "0 24px 60px rgba(0,0,0,0.45)" }}>
          <div className={`relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`} style={{ background: "#0A0806" }}>
            <Image src={img} alt={label} fill sizes={featured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"} className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(to top, rgba(10,8,6,0.92), rgba(10,8,6,0.25) 55%, transparent)" }}>
              <p className="text-[0.95rem] leading-snug text-warm-light/85">{note}</p>
              <span className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gold-light">
                Case ansehen <ArrowRight size={13} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
            {badge && (
              <span className="absolute left-4 top-4 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ background: "rgba(10,8,6,0.85)", color: "var(--gold-light)", border: "1px solid rgba(184,150,62,0.45)" }}>
                {badge}
              </span>
            )}
          </div>
          <div className="flex items-baseline justify-between gap-4 px-5 py-4" style={{ background: "rgba(255,255,255,0.035)", borderTop: "1px solid rgba(184,150,62,0.18)" }}>
            <span className="font-serif text-[1.1rem] text-cream">{label}</span>
            <span className="hidden truncate font-mono text-[10px] uppercase tracking-[0.14em] text-warm-light/45 sm:block">{note.split(" · ")[0]}</span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

function Galerie() {
  return (
    <section id="arbeiten" className="scroll-mt-20 px-6 py-[13vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto max-w-6xl">
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <GalerieCard {...ARBEIT_FEATURED} featured />
          {ARBEIT.map((a, i) => (
            <GalerieCard key={a.label} {...a} delay={(i % 2) * 0.08} />
          ))}
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
          className="relative overflow-hidden rounded-[2.2rem] px-7 py-12 md:px-14 md:py-16"
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
                  <motion.div key={a.term} {...rise(0.05 + i * 0.07)} className="flex items-start gap-4 rounded-2xl p-5" style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))", border: "1px solid rgba(184,150,62,0.25)" }}>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(184,150,62,0.14)", border: "1px solid rgba(184,150,62,0.4)" }}>
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
              <motion.div {...rise(0.12)} className="rounded-[1.8rem] p-7 md:p-9" style={{ background: "rgba(250,248,245,0.035)", border: "1px solid rgba(184,150,62,0.35)" }}>
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
                        <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="deine-seite.de" className="mt-2 w-full rounded-xl px-4 py-3.5 text-[1rem] text-cream placeholder:text-warm-light/30 focus:outline-none" style={{ background: "rgba(10,8,6,0.6)", border: "1px solid rgba(184,150,62,0.3)" }} />
                      </label>
                      <label className="block">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-warm-light/60">Deine E-Mail</span>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="du@firma.de" className="mt-2 w-full rounded-xl px-4 py-3.5 text-[1rem] text-cream placeholder:text-warm-light/30 focus:outline-none" style={{ background: "rgba(10,8,6,0.6)", border: "1px solid rgba(184,150,62,0.3)" }} />
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
              <motion.div {...rise(0.2)} className="mt-6 flex items-center gap-4 rounded-2xl p-4" style={{ border: "1px solid rgba(184,150,62,0.2)", background: "rgba(255,255,255,0.02)" }}>
                <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-full" style={{ border: "1.5px solid rgba(212,174,90,0.6)" }}>
                  <Image src="/webseiten/ilja-tbilisi.jpg" alt="Ilja Sabala" fill sizes="56px" className="object-cover object-top" />
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

/* ── 8 · Prozess (Editorial-Timeline, 5 Schritte) ──────────────────────── */
function Prozess() {
  return (
    <section id="prozess" className="relative scroll-mt-20 overflow-hidden px-6 py-[13vh]">
      <div className="mx-auto max-w-5xl">
        <motion.div {...rise()} className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// der weg</p>
          <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#2A2520" }}>
            Fünf Schritte, kein Agentur-Nebel.
          </h2>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: "#46403A" }}>
            Die Analyse ist der Anfang des Gesprächs, kein Verkaufstrick danach. Du weißt an
            jedem Punkt, wo dein Projekt steht.
          </p>
        </motion.div>

        <div className="relative mt-16">
          {/* Verbindungslinie */}
          <motion.span
            aria-hidden
            className="absolute bottom-6 left-[34px] top-2 hidden w-px origin-top md:block"
            style={{ background: "linear-gradient(to bottom, var(--gold-light), rgba(184,150,62,0.12))" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          <div className="space-y-8 md:space-y-0">
            {PROZESS.map((p, i) => (
              <motion.div key={p.n} {...rise(i * 0.08)} className="group relative grid gap-4 md:grid-cols-[70px_1fr] md:gap-10 md:py-9" style={i > 0 ? { borderTop: "1px solid rgba(184,150,62,0.0)" } : undefined}>
                <div className="relative hidden md:block">
                  <span className="ws-ghost absolute -top-5 left-0 font-serif" style={{ fontSize: "5.2rem", lineHeight: 1, opacity: 0.7 }}>{p.n}</span>
                  <span className="absolute left-[30px] top-2 z-10 block h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-150" style={{ background: "var(--gold)", boxShadow: "0 0 0 5px var(--cream)" }} />
                </div>
                <div className="rounded-2xl p-6 transition-all duration-300 group-hover:-translate-y-1 md:p-7" style={{ background: "#ffffff", border: "1px solid rgba(184,150,62,0.22)", boxShadow: "0 14px 34px rgba(80,60,20,0.08)" }}>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
                    <span className="font-mono text-[11px] tracking-[0.3em] text-gold md:hidden">{p.n}</span>
                    <h3 className="font-serif text-[1.55rem]" style={{ color: "#2A2520" }}>{p.term}</h3>
                    {p.tag && (
                      <span className="rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em]" style={{ background: "rgba(184,150,62,0.14)", color: "#8A6D2A", border: "1px solid rgba(184,150,62,0.4)" }}>
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-2.5 max-w-2xl text-[1rem] leading-relaxed" style={{ color: "#46403A" }}>{p.line}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 9 · Fundament (Trust-Band) ────────────────────────────────────────── */
function Fundament() {
  return (
    <section id="fundament" className="scroll-mt-20 px-6 py-[14vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto max-w-6xl">
        <motion.div {...rise()} className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// das fundament</p>
          <h2 className="mt-5 font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.3rem)", letterSpacing: "-0.01em" }}>
            Technik, über die du nie wieder nachdenken musst.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FUNDAMENT.map((f, i) => (
            <motion.div key={f.term} {...rise(i * 0.08)} className="rounded-2xl p-7" style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))", border: "1px solid rgba(184,150,62,0.18)" }}>
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
              className={`relative flex flex-col rounded-2xl p-8 ${p.highlight ? "md:-translate-y-3" : ""}`}
              style={
                p.highlight
                  ? { background: "#ffffff", border: "2px solid rgba(184,150,62,0.5)", boxShadow: "0 30px 70px rgba(184,150,62,0.22)" }
                  : { background: "#ffffff", border: "1px solid rgba(184,150,62,0.22)", boxShadow: "0 14px 34px rgba(80,60,20,0.10)" }
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
        <motion.div {...rise(0.15)} className="mt-14 overflow-hidden rounded-[2rem]" style={{ background: "var(--tech-bg)", border: "1px solid rgba(91,214,208,0.3)", boxShadow: "0 40px 100px rgba(0,0,0,0.35)" }}>
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
            <motion.div whileHover={{ rotateX: 3, rotateY: -4, scale: 1.015 }} transition={{ type: "spring", stiffness: 110, damping: 18 }} style={{ perspective: 1100, transformStyle: "preserve-3d" }} className="relative overflow-hidden rounded-xl" >
              <Image src="/case-studies/webseiten-analytics.jpg" alt="Sabala Cockpit: SEO, GEO und Besucher aller betreuten Seiten in einer Sicht" width={1600} height={900} className="w-full rounded-xl" style={{ border: "1px solid rgba(91,214,208,0.3)" }} />
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
              <motion.div key={f.q} {...rise(i * 0.04)} className="overflow-hidden rounded-2xl" style={{ background: "#ffffff", border: `1px solid rgba(184,150,62,${isOpen ? "0.45" : "0.2"})`, boxShadow: "0 10px 26px rgba(80,60,20,0.07)" }}>
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
