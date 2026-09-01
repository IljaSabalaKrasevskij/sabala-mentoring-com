"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import { useState, type FormEvent } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   /webseiten — Sales-Page v4 (1.9.2026)

   Umbau ggü. v3: KEINE Preise mehr auf der Seite (Qualifizierung im
   Gespraech), der kostenlose Website-Check ist das zentrale Angebot
   (SEO · GEO · Content · Design · Wettbewerb), Positionierung als
   Business Developer, YUNA in der Galerie, Design-Upgrade (Scroll-Rail,
   Marquee, Flip-Kacheln, Sticky-Stack-Prozess, 3D-Tilt).

   Architektur: Hero · Marquee · Massstab · Check(Form) · Methode ·
   Galerie · Prozess · Fundament · Pflege · Dashboard · FAQ · Finale.
   Kleines du, keine Em-Dashes, keine Ausrufezeichen, nur echte Zahlen.
   Keine deutschen Anfuehrungszeichen im JSX (Turbopack-Falle).
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

const MARKT_FRAGEN = [
  {
    n: "01",
    term: "Was suchen deine Kunden",
    line: "Echte Suchanfragen und Fragen aus deiner Nische, mit Daten statt Bauchgefühl.",
  },
  {
    n: "02",
    term: "Wer wird gefunden",
    line: "Wer bei Google und in KI-Suchen vorne steht, und womit genau.",
  },
  {
    n: "03",
    term: "Wie schneiden sie ab",
    line: "Tempo, Klarheit, Vertrauen: wo die Besten stark sind und wo sie schwächeln.",
  },
  {
    n: "04",
    term: "Womit du sie schlägst",
    line: "Die Lücken, die deine Seite besetzt: schärfer positioniert, schneller, sichtbarer.",
  },
];

const CHECK_TILES = [
  { front: "SEO", back: "Rankings, Indexierung, Struktur: warum Google dich zeigt oder übergeht." },
  { front: "GEO", back: "Ob ChatGPT und Perplexity dich heute zitieren können, und was dafür fehlt." },
  { front: "Content", back: "Sagt deine Seite in fünf Sekunden, was du löst und für wen, oder erst nach drei Scrolls." },
  { front: "Design", back: "Wirkt dein Auftritt Premium oder Baukasten, zuerst geprüft auf dem Handy." },
  { front: "Wettbewerb", back: "Die besten Anbieter deiner Nische: wie sie gefunden werden und wie sie abschneiden." },
  { front: "Dein Plan", back: "Eine priorisierte Liste deiner größten Hebel. Kein Blabla, ein Plan." },
];

const METHODE = [
  {
    n: "01",
    term: "Zielgruppe geschärft",
    line: "Wen genau deine Seite ansprechen soll, und wen bewusst nicht. Eine Botschaft pro Besucher, keine vier.",
  },
  {
    n: "02",
    term: "Angebot sortiert",
    line: "Einstieg, Kern, nächster Schritt: dein Angebot wird so aufgebaut, dass Kaufen leicht fällt.",
  },
  {
    n: "03",
    term: "Verkaufspsychologie im Aufbau",
    line: "Jede Section hat einen Job: Aufmerksamkeit, Vertrauen, Beweis, Handlung. In dieser Reihenfolge.",
  },
  {
    n: "04",
    term: "Eigener Code, kein Ballast",
    line: "Kein Theme, kein Plugin-Stapel. Jede Zeile hat einen Grund, deshalb lädt die Seite unter zwei Sekunden.",
  },
  {
    n: "05",
    term: "Sichtbar ab Tag eins",
    line: "SEO und GEO stecken im Fundament: saubere Struktur, Schema-Markup, Inhalte, die Fragen beantworten.",
  },
  {
    n: "06",
    term: "KI als Werkzeug",
    line: "Ich baue mit Claude Code, jeden Tag. Die KI übernimmt Fleißarbeit, ich treffe die Entscheidungen. Du bekommst mehr Tiefe fürs Budget.",
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
    term: "Kostenloser Check",
    line: "Dein Einstieg ohne Risiko: du schickst mir deine Seite, ich schicke dir die Analyse. Sie gehört dir, egal wie es weitergeht.",
  },
  {
    n: "02",
    term: "Klärungsgespräch",
    line: "30 Minuten, beidseitig unverbindlich. Wir gehen den Check durch, prüfen, ob es passt, und stecken den Rahmen.",
  },
  {
    n: "03",
    term: "Analyse & Konzept",
    line: "Zielgruppe, Angebot, Story, Struktur. Ein klarer Plan, bevor ein Pixel entsteht.",
  },
  {
    n: "04",
    term: "Design & Build",
    line: "Eigener Code, kreative Layouts, Motion. Du siehst Zwischenstände statt Überraschungen am Ende.",
  },
  {
    n: "05",
    term: "Launch",
    line: "Technik, Umzug, Redirects, Indexierung. Sauber live gestellt und sauber übergeben.",
  },
  {
    n: "06",
    term: "Pflege & Wachstum",
    line: "Ich bleibe dein technischer Partner: Updates, SEO- und GEO-Pflege, Monatsbericht. Du hast mit der Technik nichts mehr zu tun.",
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
    term: "Ruhe",
    sub: "Der Betrieb",
    punkte: ["Updates und Sicherheit", "Backups und Monitoring", "Kleine Änderungen und neue Inhalte"],
    line: "Deine Seite läuft, du merkst nichts davon.",
  },
  {
    term: "Wachstum",
    sub: "Die Sichtbarkeit",
    punkte: ["Alles aus Ruhe", "SEO- und GEO-Pflege, laufend", "Monatsbericht mit deinen Kennzahlen"],
    line: "Deine Seite wird jeden Monat besser gefunden.",
    highlight: true,
  },
  {
    term: "Partner",
    sub: "Das Sparring",
    punkte: ["Alles aus Wachstum", "Dein eigenes Analytics-Dashboard", "Priorität und Strategie-Sparring"],
    line: "Du hast einen technischen Partner an deiner Seite.",
  },
];

const FAQ = [
  {
    q: "Was kostet eine Webseite bei dir?",
    a: "Es gibt keinen Listenpreis, weil es kein Produkt von der Stange ist. Der Umfang bestimmt den Rahmen: ein OnePager liegt woanders als eine komplette Markenwelt. Nach dem kostenlosen Check bekommst du im Gespräch eine ehrliche Einschätzung, ohne Verkaufsdruck.",
  },
  {
    q: "Was passiert nach dem kostenlosen Check?",
    a: "Du bekommst die Analyse schriftlich, und sie gehört dir. Wenn du willst, sprechen wir danach über die Umsetzung. Wenn nicht, hast du trotzdem einen klaren Plan für deine Seite.",
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

/* ── Schema.org (GEO): Service + FAQ, bewusst ohne Preise ──────────────── */
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
        "Premium-Webauftritte, gebaut gegen die Spitze der eigenen Nische: kostenloser Website-Check über SEO, GEO, Content, Design und Wettbewerb, danach Konzept, eigener Code, Ladezeit unter zwei Sekunden, DSGVO-konform, laufende Pflege in drei Stufen und ein eigenes Analytics-Dashboard als Upgrade.",
      availableLanguage: "de",
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
      <Massstab />
      <Check />
      <Methode />
      <Galerie />
      <Prozess />
      <Fundament />
      <Pflege />
      <DashboardUpsell />
      <Faq />
      <Finale />
      <style>{`
        @keyframes ws-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }
        .ws-flip { transform-style: preserve-3d; transition: transform .7s cubic-bezier(0.16,1,0.3,1); }
        .ws-flip.is-flipped { transform: rotateY(180deg); }
        .ws-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .ws-back { transform: rotateY(180deg); }
        @media (prefers-reduced-motion: reduce) {
          .ws-flip { transition: none; }
        }
      `}</style>
    </main>
  );
}

/* ── Scroll-Rail: laeuft rechts an der Seite mit (Desktop) ─────────────── */
const RAIL = [
  { id: "massstab", label: "Maßstab" },
  { id: "check", label: "Check" },
  { id: "methode", label: "Methode" },
  { id: "arbeiten", label: "Arbeiten" },
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
          <a
            key={r.id}
            href={`#${r.id}`}
            className="group pointer-events-auto relative flex items-center"
            aria-label={`Zu ${r.label}`}
          >
            <span
              className="block h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-150"
              style={{ background: "var(--gold)", boxShadow: "0 0 0 3px rgba(250,248,245,0.6)" }}
            />
            <span
              className="absolute right-5 whitespace-nowrap rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "rgba(10,8,6,0.9)", color: "var(--gold-light)", border: "1px solid rgba(184,150,62,0.3)" }}
            >
              {r.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── 1 · Hero ──────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative flex min-h-[94vh] items-center justify-center overflow-hidden px-6" style={{ background: "var(--tech-bg)" }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/brand/liquid-gold-poster.jpg"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
        style={{ mixBlendMode: "screen" }}
      >
        <source src="/brand/liquid-gold.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 35%, rgba(184,150,62,0.10), transparent 65%)" }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,8,6,0.55), transparent 30%, rgba(10,8,6,0.88))" }} />

      <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="relative mx-auto max-w-5xl text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.4em] text-gold">// webdesign · verkaufsoptimiert · seo + geo</p>
        <h1 className="mx-auto mt-8 font-serif text-cream" style={{ fontSize: "clamp(2.8rem, 7.4vw, 6.6rem)", lineHeight: 1.02, letterSpacing: "-0.015em" }}>
          Gebaut, um den Besten
          <br />
          deiner Nische zu schlagen.
        </h1>
        <p className="mx-auto mt-9 max-w-2xl text-[1.25rem] leading-relaxed text-warm-light/85">
          Ich baue Premium-Webauftritte aus eigenem Code, verkaufspsychologisch aufgebaut und
          auf Tempo getrimmt. Zuerst schaue ich auf dein Geschäft: Zielgruppe, Angebot, Markt.
          Dann entsteht die Seite, an der sich deine Konkurrenz messen muss.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
          {["Eigener Code", "Unter 2 Sekunden", "SEO + GEO ab Tag eins", "DSGVO-konform"].map((c) => (
            <span key={c} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-warm-light/55">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold-light)" }} />
              {c}
            </span>
          ))}
        </div>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
          <a href="#check" className="inline-flex items-center gap-2 rounded-full bg-gold-light px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold">
            Kostenlosen Website-Check holen <span aria-hidden>↓</span>
          </a>
          <a href="#arbeiten" className="inline-flex items-center gap-2 rounded-full px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-warm-light/80 transition-colors hover:text-cream" style={{ border: "1px solid rgba(250,248,245,0.25)" }}>
            Arbeiten ansehen
          </a>
        </div>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-warm-light/40">
          SEO · GEO · Content · Design · Wettbewerb
        </p>
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

/* ── 3 · Der Massstab (Wettbewerbs-Anspruch) ───────────────────────────── */
function Massstab() {
  return (
    <section id="massstab" className="scroll-mt-20 px-6 py-[13vh]">
      <div className="mx-auto max-w-6xl">
        <motion.div {...rise()} className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// der anspruch</p>
          <h2 className="mt-5 font-serif leading-[1.06]" style={{ fontSize: "clamp(2.3rem, 5.4vw, 4.2rem)", color: "#2A2520" }}>
            Der Maßstab ist der beste Anbieter deiner Nische.
          </h2>
          <p className="mt-6 max-w-2xl text-[1.12rem] leading-relaxed" style={{ color: "#46403A" }}>
            Die meisten neuen Webseiten werden am alten Design gemessen. Hübscher als vorher
            reicht aber nicht, wenn deine Kunden dich vorher bei drei Wettbewerbern anschauen.
            Deshalb vermesse ich zuerst deinen Markt und baue deine Seite gegen dessen Spitze.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MARKT_FRAGEN.map((f, i) => (
            <motion.div
              key={f.n}
              {...rise(i * 0.08)}
              whileHover={{ y: -6 }}
              className="rounded-2xl p-7"
              style={{ background: "#ffffff", border: "1px solid rgba(184,150,62,0.22)", boxShadow: "0 14px 34px rgba(80,60,20,0.10)" }}
            >
              <span className="font-mono text-[11px] tracking-[0.3em] text-gold">{f.n}</span>
              <h3 className="mt-4 font-serif text-[1.35rem] leading-snug" style={{ color: "#2A2520" }}>{f.term}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed" style={{ color: "#46403A" }}>{f.line}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4 · Der kostenlose Check (Kern-Angebot + Formular) ────────────────── */
function FlipTile({ front, back, index }: { front: string; back: string; index: number }) {
  /* Hover und Tipp getrennt halten: sonst klappt der Klick auf dem Desktop die
     Kachel sofort wieder zu (enter setzt true, click togglet zurueck). */
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const flipped = hovered || tapped;
  return (
    <motion.button
      type="button"
      {...rise(index * 0.06)}
      onClick={() => setTapped((f) => !f)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative h-44 w-full text-left focus:outline-none"
      style={{ perspective: 900 }}
      aria-pressed={flipped}
    >
      <span className={`ws-flip relative block h-full w-full ${flipped ? "is-flipped" : ""}`}>
        {/* Vorderseite */}
        <span
          className="ws-face absolute inset-0 flex flex-col justify-between rounded-2xl p-6"
          style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.014))", border: "1px solid rgba(184,150,62,0.25)" }}
        >
          <span className="font-mono text-[11px] tracking-[0.3em] text-gold">{String(index + 1).padStart(2, "0")}</span>
          <span className="font-serif text-[1.7rem] leading-none text-cream">{front}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-warm-light/35">drehen →</span>
        </span>
        {/* Rueckseite */}
        <span
          className="ws-face ws-back absolute inset-0 flex flex-col justify-between rounded-2xl p-6"
          style={{ background: "linear-gradient(160deg, rgba(184,150,62,0.16), rgba(184,150,62,0.05))", border: "1px solid rgba(184,150,62,0.45)" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-light">{front}</span>
          <span className="text-[0.92rem] leading-snug text-cream/90">{back}</span>
        </span>
      </span>
    </motion.button>
  );
}

function Check() {
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
    <section id="check" className="scroll-mt-20 px-6 py-[14vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto max-w-6xl">
        <motion.div {...rise()} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// kostenloser website-check</p>
          <h2 className="mt-5 font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.3rem)", letterSpacing: "-0.01em" }}>
            Finde heraus, wo deine Seite wirklich steht.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.08rem] leading-relaxed text-warm-light/75">
            Schick mir deine Webseite. Du bekommst eine persönliche Analyse über sechs Ebenen,
            inklusive Blick auf deine Wettbewerber, schriftlich und verständlich. Kostenlos,
            und sie gehört dir, egal ob wir danach zusammenarbeiten.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHECK_TILES.map((t, i) => (
            <FlipTile key={t.front} front={t.front} back={t.back} index={i} />
          ))}
        </div>

        {/* Formular */}
        <motion.div
          {...rise(0.1)}
          className="mx-auto mt-14 max-w-2xl rounded-[1.8rem] p-8 md:p-10"
          style={{ background: "linear-gradient(160deg, rgba(184,150,62,0.12), rgba(184,150,62,0.03))", border: "1px solid rgba(184,150,62,0.4)", boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}
        >
          {state === "success" ? (
            <div className="py-6 text-center">
              <p className="font-serif text-[1.8rem] text-cream">Angekommen. Danke dir.</p>
              <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-warm-light/75">
                Ich schaue mir deine Seite persönlich an und melde mich mit der Analyse bei dir
                per E-Mail. Keine Automatenmail, kein Spam.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-warm-light/60">Deine Webseite</span>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="deine-seite.de"
                    className="mt-2 w-full rounded-xl px-4 py-3.5 text-[1rem] text-cream placeholder:text-warm-light/30 focus:outline-none"
                    style={{ background: "rgba(10,8,6,0.6)", border: "1px solid rgba(184,150,62,0.3)" }}
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-warm-light/60">Deine E-Mail</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="du@firma.de"
                    className="mt-2 w-full rounded-xl px-4 py-3.5 text-[1rem] text-cream placeholder:text-warm-light/30 focus:outline-none"
                    style={{ background: "rgba(10,8,6,0.6)", border: "1px solid rgba(184,150,62,0.3)" }}
                  />
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

              <button
                type="submit"
                disabled={state === "loading"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-light px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold disabled:opacity-60 md:w-auto"
              >
                {state === "loading" ? "Wird gesendet ..." : "Kostenlosen Check anfordern"}
              </button>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-warm-light/40">
                Persönlich erstellt · kein Newsletter · keine Verpflichtung
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ── 5 · Methode (Business Developer) ──────────────────────────────────── */
function Methode() {
  return (
    <section id="methode" className="scroll-mt-20 px-6 py-[13vh]">
      <div className="mx-auto max-w-6xl">
        <motion.div {...rise()} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// mehr als webdesign</p>
          <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#2A2520" }}>
            Du bekommst einen Business Developer, der Webseiten baut.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: "#46403A" }}>
            Schöne Seiten gibt es viele, verkaufen tun die wenigsten. Vor dem Design steht bei
            mir die Arbeit, die sonst gern übersprungen wird:
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {METHODE.map((m, i) => (
            <motion.div
              key={m.n}
              {...rise((i % 3) * 0.08)}
              whileHover={{ y: -6 }}
              className="rounded-2xl p-7"
              style={{ background: "#ffffff", border: "1px solid rgba(184,150,62,0.22)", boxShadow: "0 14px 34px rgba(80,60,20,0.10)" }}
            >
              <span className="font-mono text-[11px] tracking-[0.3em] text-gold">{m.n}</span>
              <h3 className="mt-4 font-serif text-[1.4rem] leading-snug" style={{ color: "#2A2520" }}>{m.term}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed" style={{ color: "#46403A" }}>{m.line}</p>
            </motion.div>
          ))}
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
      <motion.div
        whileHover={{ rotateX: 2.5, rotateY: -3, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Link
          href="/case-studies"
          className="group relative block overflow-hidden rounded-2xl"
          style={{ border: "1px solid rgba(184,150,62,0.28)", boxShadow: "0 24px 60px rgba(0,0,0,0.45)" }}
        >
          <div className={`relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`} style={{ background: "#0A0806" }}>
            <Image
              src={img}
              alt={label}
              fill
              sizes={featured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
              className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(to top, rgba(10,8,6,0.92), rgba(10,8,6,0.25) 55%, transparent)" }}>
              <p className="text-[0.95rem] leading-snug text-warm-light/85">{note}</p>
              <span className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gold-light">
                Case ansehen <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
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
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
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

/* ── 7 · Prozess (Sticky-Stack) ────────────────────────────────────────── */
function Prozess() {
  return (
    <section id="prozess" className="scroll-mt-20 px-6 py-[13vh]">
      <div className="mx-auto max-w-4xl">
        <motion.div {...rise()} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// der prozess</p>
          <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#2A2520" }}>
            Sechs Schritte, kein Agentur-Nebel.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: "#46403A" }}>
            Du weißt an jedem Punkt, wo dein Projekt steht. Die Karten stapeln sich beim
            Scrollen, genau wie die Schritte aufeinander aufbauen.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-16 max-w-2xl">
          {PROZESS.map((p, i) => (
            <div key={p.n} className="sticky mb-7" style={{ top: `calc(84px + ${i * 18}px)` }}>
              <div
                className="rounded-2xl p-7 md:p-9"
                style={{
                  background: i === 0 ? "linear-gradient(160deg, #2E2B26, #1C1915)" : "#ffffff",
                  border: i === 0 ? "1px solid rgba(184,150,62,0.5)" : "1px solid rgba(184,150,62,0.24)",
                  boxShadow: "0 -12px 40px rgba(80,60,20,0.12), 0 18px 44px rgba(80,60,20,0.14)",
                }}
              >
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <span className="font-mono text-[11px] tracking-[0.3em] text-gold">{p.n}</span>
                  <h3 className="font-serif text-[1.6rem]" style={{ color: i === 0 ? "var(--cream)" : "#2A2520" }}>{p.term}</h3>
                  {i === 0 && (
                    <span className="rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em]" style={{ background: "rgba(184,150,62,0.18)", color: "var(--gold-light)", border: "1px solid rgba(184,150,62,0.4)" }}>
                      kostenlos
                    </span>
                  )}
                </div>
                <p className="mt-3 max-w-xl text-[1rem] leading-relaxed" style={{ color: i === 0 ? "rgba(250,248,245,0.75)" : "#46403A" }}>{p.line}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 8 · Fundament (Trust-Band) ────────────────────────────────────────── */
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
            <motion.div
              key={f.term}
              {...rise(i * 0.08)}
              className="rounded-2xl p-7"
              style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))", border: "1px solid rgba(184,150,62,0.18)" }}
            >
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

/* ── 9 · Pflege (drei Stufen, ohne Preise) ─────────────────────────────── */
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
            Betrieb und Wachstum, in drei Stufen, damit du mit der Technik nichts zu tun hast.
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
              <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "#9A8F7E" }}>{p.sub}</p>
              <h3 className="mt-2 font-serif text-[1.7rem]" style={{ color: "#2A2520" }}>{p.term}</h3>
              <ul className="mt-5 flex-1 space-y-2.5">
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

        <motion.p {...rise(0.2)} className="mx-auto mt-12 max-w-xl text-center text-[1rem] leading-relaxed" style={{ color: "#46403A" }}>
          Welche Stufe passt, klären wir im Gespräch. Monatlich, fair und ohne Jahresvertrag.
        </motion.p>
      </div>
    </section>
  );
}

/* ── 10 · Dashboard-Upsell (3D-Tilt) ───────────────────────────────────── */
function DashboardUpsell() {
  return (
    <section id="dashboard" className="overflow-hidden px-6 py-[14vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <motion.div {...rise()}>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "#5BD6D0" }}>// upgrade · dein cockpit</p>
          <h2 className="mt-5 font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.3rem)", letterSpacing: "-0.01em" }}>
            Dein eigenes Dashboard für SEO, GEO und Analytics.
          </h2>
          <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-warm-light/75">
            Nach dem Launch beginnt das Messen. In der Partner-Stufe bekommst du dein eigenes
            Cockpit: Besucher, Keywords, KI-Sichtbarkeit und Blog-Performance, alle Seiten in
            einer Sicht, self-hosted, deine Daten bleiben bei dir.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Besucher und Top-Seiten, ohne Google Analytics",
              "Google-Keywords und Seiten-Performance täglich frisch",
              "GEO-Blick: wie sichtbar du für KI-Suchen bist",
              "Blog- und Keyword-Leaderboard für deine Inhalte",
            ].map((l) => (
              <li key={l} className="flex items-start gap-3 text-[1rem] leading-relaxed text-warm-light/80">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#5BD6D0" }} />
                {l}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-serif text-[1.12rem] italic text-warm-light/70">
            Das ist kein Mockup, das ist mein eigenes System im täglichen Einsatz, und genau
            so eins baue ich dir.
          </p>
        </motion.div>

        <motion.div {...rise(0.12)} style={{ perspective: 1200 }}>
          <motion.div
            whileHover={{ rotateX: 4, rotateY: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative overflow-hidden rounded-2xl"
            style={{
              transformStyle: "preserve-3d",
              border: "1px solid rgba(91,214,208,0.3)",
              boxShadow: "0 40px 90px rgba(0,0,0,0.55), 0 0 60px rgba(91,214,208,0.12)",
            }}
          >
            <Image
              src="/case-studies/webseiten-analytics.jpg"
              alt="Sabala Analytics-Dashboard: SEO, GEO und Besucher in einer Sicht"
              width={1600}
              height={900}
              className="w-full"
            />
            <span className="absolute right-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ background: "rgba(10,8,6,0.85)", color: "#5BD6D0", border: "1px solid rgba(91,214,208,0.35)" }}>
              Live im Einsatz
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── 11 · FAQ ──────────────────────────────────────────────────────────── */
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-20 px-6 py-[13vh]">
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
              <motion.div
                key={f.q}
                {...rise(i * 0.04)}
                className="overflow-hidden rounded-2xl"
                style={{ background: "#ffffff", border: `1px solid rgba(184,150,62,${isOpen ? "0.45" : "0.2"})`, boxShadow: "0 10px 26px rgba(80,60,20,0.07)" }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-7 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-[1.15rem]" style={{ color: "#2A2520" }}>{f.q}</span>
                  <span
                    className="shrink-0 font-serif text-[1.4rem] leading-none transition-transform duration-300"
                    style={{ color: "var(--gold)", transform: isOpen ? "rotate(45deg)" : "none" }}
                    aria-hidden
                  >
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

/* ── 12 · Finale ───────────────────────────────────────────────────────── */
function Finale() {
  return (
    <section id="finale" className="relative overflow-hidden px-6 py-[15vh]" style={{ background: "var(--tech-bg)" }}>
      <div aria-hidden className="wd-aurora-a pointer-events-none absolute -left-1/4 top-0 h-[60vh] w-[60vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(184,150,62,0.14), transparent 65%)" }} />
      <div aria-hidden className="wd-aurora-b pointer-events-none absolute -right-1/4 bottom-0 h-[60vh] w-[60vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(184,150,62,0.10), transparent 65%)" }} />

      <motion.div {...rise()} className="relative mx-auto max-w-3xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// der erste schritt</p>
        <h2 className="mt-6 font-serif leading-[1.05] text-cream" style={{ fontSize: "clamp(2.6rem, 6.4vw, 5.2rem)", letterSpacing: "-0.01em" }}>
          Der erste Schritt kostet dich nichts.
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-[1.15rem] leading-relaxed text-warm-light/80">
          Hol dir den Website-Check und finde heraus, wo deine Seite gegen die Besten deiner
          Nische steht. Oder spring direkt ins Gespräch, wenn du schon weißt, dass es Zeit ist.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#check" className="inline-flex items-center gap-2 rounded-full bg-gold-light px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold">
            Zum kostenlosen Check <span aria-hidden>↑</span>
          </a>
          <a
            href="https://tidycal.com/sabala-mentoring"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-warm-light/80 transition-colors hover:text-cream"
            style={{ border: "1px solid rgba(250,248,245,0.25)" }}
          >
            Erstgespräch buchen
          </a>
        </div>
      </motion.div>
    </section>
  );
}
