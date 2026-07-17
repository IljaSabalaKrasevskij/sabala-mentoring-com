"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

/* ─────────────────────────────────────────────────────────────────────────
   /webseiten — Sales-Page v3 (Brief: Vault/03_Bereiche/Sabala_Mentoring/
   Webseiten-Sales-Page-Brief-v1.md · Skill: sabala-page-mastery)

   ICP: Start-ups, Agenturen, B2B-Dienstleister. Architektur:
   Hero · FürWen · Problem · Hub · KI-Vorteil · Analyse · AusEinemGuss ·
   Prozess · Signale · EchteArbeit · Dashboard-Upsell · Preismodell ·
   Eigentum · FAQ. Kleines du, keine Em-Dashes, nur echte Zahlen.
   ───────────────────────────────────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

/* Wiederkehrende Reveal-Props */
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const FUER_WEN = [
  {
    n: "01",
    kind: "Start-up",
    title: "Dein Produkt ist weiter als deine Webseite",
    pain: "Investoren, Bewerber und erste Kunden schauen zuerst auf deine Seite, und die erzählt noch die Geschichte von vor zwei Jahren.",
  },
  {
    n: "02",
    kind: "Agentur & Studio",
    title: "Deine Arbeit ist stark, dein Auftritt zieht nicht mit",
    pain: "Du lieferst deinen Kunden Qualität, aber die eigene Seite blieb liegen, und genau dort entscheiden Interessenten, ob sie anfragen.",
  },
  {
    n: "03",
    kind: "B2B-Dienstleistung",
    title: "Dein Angebot braucht Erklärung",
    pain: "Komplexe Leistung, lange Entscheidungswege, viele Beteiligte, deine Seite muss in fünf Sekunden klar machen, was du löst und für wen.",
  },
];

const KI_VORTEILE = [
  {
    stat: "100 %",
    term: "auf dich zugeschnitten",
    line: "Design, Layouts und Texte entstehen aus deiner Substanz und deiner Zielgruppe. KI macht echtes Custom bezahlbar, wo früher nur Templates drin waren.",
  },
  {
    stat: "Tage",
    term: "statt Wochen",
    line: "Analyse, Wettbewerbs-Blick und erste Entwürfe liegen in Tagen auf dem Tisch, weil KI die Fleißarbeit übernimmt und ich die Entscheidungen treffe.",
  },
  {
    stat: "3+",
    term: "Richtungen pro Runde",
    line: "Wir vergleichen mehrere Design-Richtungen, statt den ersten Wurf zu verteidigen. Mehr Iterationen, bis es wirklich nach dir aussieht.",
  },
  {
    stat: "< 2 s",
    term: "auf dem Handy",
    line: "Eigener Code statt Template-Ballast: Ladezeit unter zwei Sekunden, PageSpeed über 90, und das bleibt auch so.",
  },
];

const ANALYSE = [
  { n: "01", term: "Technik-Check", line: "Ladezeit, Struktur, Indexierung: was deine aktuelle Seite bremst, schwarz auf weiß." },
  { n: "02", term: "Wettbewerbs-Blick", line: "Wie deine Mitbewerber auftreten, was sie besser machen, und wo du sie schlagen kannst." },
  { n: "03", term: "Suchintention", line: "Welche Fragen deine Kunden wirklich googeln, mit Daten statt Bauchgefühl." },
  { n: "04", term: "GEO-Readiness", line: "Ob ChatGPT und Perplexity dich heute zitieren können, und was dafür fehlt." },
  { n: "05", term: "Klare Empfehlung", line: "Eine priorisierte Liste, was deine neue Seite können muss. Kein Blabla, ein Plan." },
];

const EINZELN = [
  { label: "KI-Strategie + Integration", price: "4 – 8 k" },
  { label: "Marke + Positionierung", price: "3 – 5 k" },
  { label: "Premium-Webentwicklung", price: "6 – 12 k" },
  { label: "SEO + GEO", price: "3 – 5 k" },
  { label: "Content + Texte", price: "2 – 4 k" },
  { label: "Hosting + Pflege (Jahr 1)", price: "1 – 2 k" },
];

const AUS_EINER_HAND = [
  "Strategie, Marke und Premium-Webseite verbunden gedacht",
  "SEO und GEO von Anfang an im Fundament",
  "KI-Layer dort, wo er dir wirklich Arbeit abnimmt",
  "Content-Fundament für deine Sichtbarkeit",
  "Hosting und Pflege inklusive",
  "Ein Ansprechpartner, der den Überblick behält",
];

const PROZESS = [
  {
    n: "01",
    term: "Klärungsgespräch",
    line: "Wir prüfen gemeinsam, ob wir zueinander passen. 30 Minuten, beidseitig unverbindlich.",
  },
  {
    n: "02",
    term: "Analyse & Konzept",
    line: "Die umfangreiche Webseiten-Analyse, dazu Struktur, Story und ein klarer Plan, bevor ein Pixel entsteht.",
  },
  {
    n: "03",
    term: "Design & Build",
    line: "Eigener Code, kreative Layouts, Motion. Du siehst Zwischenstände statt Überraschungen am Ende.",
  },
  {
    n: "04",
    term: "Launch",
    line: "Technik, Umzug, Redirects, Indexierung. Sauber live gestellt und sauber übergeben.",
  },
  {
    n: "05",
    term: "Pflege & Wachstum",
    line: "SEO und GEO laufend gepflegt, Monatsbericht inklusive, und auf Wunsch dein eigenes Dashboard.",
  },
];

const SIGNALS = [
  { term: "Eine klare Botschaft", line: "Im Hero steht in einem Satz, was du tust und für wen, ohne Buzzword-Nebel." },
  { term: "Echte Bilder", line: "Dein Team, dein Produkt, deine Arbeit, statt Stock-Menschen am glücklichen Laptop." },
  { term: "Ein Brand-System", line: "Drei bis fünf Farben, eine Schrift, gleiche Werte auf jeder Section, konsequent durchgezogen." },
  { term: "Echte Geschwindigkeit", line: "Unter zwei Sekunden auf dem Handy, PageSpeed über 90, eigener Code statt Template-Ballast." },
  { term: "SEO + GEO", line: "Gefunden bei Google und zitiert von KI-Suchen wie ChatGPT, von Anfang an mitgedacht." },
  { term: "Eine klare Aktion", line: "Die Seite zieht zu einem Schritt, ohne Popup-Lärm und ohne Funnel-Druck." },
];

const ARBEIT = [
  { img: "/case-studies/sabala-mentoring.jpg", label: "Sabala Studios", note: "KI-Studio & Akademie" },
  { img: "/case-studies/cyber-sales.jpg", label: "cyber-sales.de", note: "Vertriebssystem Cybersecurity" },
  { img: "/case-studies/dielommel.jpg", label: "dielommel.de", note: "Begleitung für Familienunternehmen" },
];

const PREISE = [
  {
    n: "01",
    term: "Projekt",
    price: "ab 4.900 €",
    unit: "einmalig",
    highlight: false,
    badge: null as string | null,
    punkte: [
      "Umfangreiche Webseiten-Analyse",
      "Design + Texte, 100 % auf dich zugeschnitten",
      "Eigener Code im eigenen Repo",
      "SEO + GEO im Fundament",
      "Launch inklusive",
    ],
    foot: "OnePager · Landingpage · Sales-Page · Markenwelt",
  },
  {
    n: "02",
    term: "Pflege & Service",
    price: "ab 49 €",
    unit: "im Monat",
    highlight: true,
    badge: "Empfohlen dazu",
    punkte: [
      "Updates, Änderungen, neue Inhalte",
      "SEO + GEO laufend gepflegt",
      "Monatsbericht mit deinen Kennzahlen",
      "Ein Ansprechpartner, der dein Projekt kennt",
      "Stufen: 49 / 99 / 149 € je nach Umfang",
    ],
    foot: "Kein Vertrag über Jahre, monatlich fair",
  },
  {
    n: "03",
    term: "Dein Dashboard",
    price: "auf Anfrage",
    unit: "Upgrade",
    highlight: false,
    badge: null as string | null,
    punkte: [
      "Eigenes Cockpit für SEO, GEO und Analytics",
      "Alle Seiten und Kennzahlen in einer Sicht",
      "Self-hosted: deine Daten bleiben bei dir",
      "Keyword- und Blog-Leaderboard",
      "Wächst mit deinem Projekt mit",
    ],
    foot: "Das System aus der Sektion oben, gebaut für dich",
  },
];

const FAQ = [
  {
    q: "Was kostet meine Webseite?",
    a: "Projekte starten bei 4.900 €. Der Umfang bestimmt den Preis: ein OnePager liegt am Anfang der Spanne, eine komplette Markenwelt darüber. Den genauen Rahmen bekommst du im Klärungsgespräch, ehrlich und ohne Verkaufsdruck.",
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

export default function WebseitenPage() {
  return (
    <main className="flex-1" style={{ background: "var(--cream)" }}>
      <Hero />
      <FuerWen />
      <Problem />
      <Hub />
      <KiVorteil />
      <Analyse />
      <AusEinemGuss />
      <Prozess />
      <Signale />
      <EchteArbeit />
      <DashboardUpsell />
      <Preismodell />
      <Eigentum />
      <Faq />
    </main>
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
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,8,6,0.55), transparent 30%, rgba(10,8,6,0.85))" }} />

      <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="relative mx-auto max-w-5xl text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.4em] text-gold">// für dich gebaut · webdesign</p>
        <h1 className="mx-auto mt-8 font-serif text-cream" style={{ fontSize: "clamp(2.9rem, 8vw, 7rem)", lineHeight: 1.0, letterSpacing: "-0.015em" }}>
          Dein Projekt steht.
          <br />
          Jetzt muss man es sehen.
        </h1>
        <p className="mx-auto mt-9 max-w-2xl text-[1.3rem] leading-relaxed text-warm-light/85">
          Premium-Webauftritte für Start-ups, Agenturen und B2B-Dienstleister, gebaut aus
          eigenem Code, geschärft auf dein Angebot, und so gestaltet, dass man deine Substanz
          im ersten Screen spürt.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
          {["Eigener Code", "Unter 2 Sekunden", "SEO + GEO ab Tag eins"].map((c) => (
            <span key={c} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-warm-light/55">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold-light)" }} />
              {c}
            </span>
          ))}
        </div>

        <a href="#kontakt" className="mt-11 inline-flex items-center gap-2 rounded-full bg-gold-light px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold">
          Lass uns reden <span>↓</span>
        </a>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-warm-light/40">
          beidseitig unverbindlich
        </p>
      </motion.div>
    </section>
  );
}

/* ── 2 · Für wen ───────────────────────────────────────────────────────── */
function FuerWen() {
  return (
    <section id="fuer-wen" className="px-6 py-[13vh]">
      <div className="mx-auto max-w-6xl">
        <motion.div {...rise()} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// für wen das ist</p>
          <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#2A2520" }}>
            Drei Situationen, ein Muster: Substanz ohne Bühne.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FUER_WEN.map((f, i) => (
            <motion.div
              key={f.n}
              {...rise(i * 0.1)}
              className="flex flex-col rounded-2xl p-8"
              style={{ background: "#ffffff", border: "1px solid rgba(184,150,62,0.22)", boxShadow: "0 14px 34px rgba(80,60,20,0.10), inset 0 1px 0 rgba(255,255,255,0.9)" }}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-[0.3em] text-gold">{f.n}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "#9A8F7E" }}>{f.kind}</span>
              </div>
              <h3 className="mt-5 font-serif text-[1.55rem] leading-snug" style={{ color: "#2A2520" }}>{f.title}</h3>
              <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed" style={{ color: "#46403A" }}>{f.pain}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 3 · Problem (Agitation, kurz und hart) ────────────────────────────── */
function Problem() {
  const LINES = [
    "Der Interessent entscheidet in Sekunden, ob du Premium bist oder einer von vielen.",
    "Jeder Kanal, für den du bezahlst, endet auf deiner Seite. Trägt sie nicht, verbrennt das Budget.",
    "Und das Schlimmste: die Anfragen, die eine schwache Seite kostet, siehst du nie.",
  ];
  return (
    <section id="problem" className="px-6 py-[13vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto max-w-3xl">
        <motion.div {...rise()}>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// das problem</p>
          <h2 className="mt-5 font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.3rem)", letterSpacing: "-0.01em" }}>
            Substanz, die man nicht sieht, verkauft nicht.
          </h2>
        </motion.div>
        <div className="mt-10 space-y-6">
          {LINES.map((l, i) => (
            <motion.p key={i} {...rise(0.1 + i * 0.12)} className="flex items-start gap-4 text-[1.15rem] leading-relaxed text-warm-light/80">
              <span className="mt-2.5 h-1.5 w-8 shrink-0 rounded-full" style={{ background: "linear-gradient(90deg, var(--gold-light), transparent)" }} />
              {l}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4 · Hub / Fundament ───────────────────────────────────────────────── */
const KANAELE = ["LinkedIn", "Anzeigen", "Pitch-Decks", "Sales-Calls", "Empfehlungen", "SEO"];

function Hub() {
  return (
    <section id="fundament" className="relative overflow-hidden px-6 py-[15vh]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle, rgba(184,150,62,0.16), transparent 65%)" }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mx-auto w-[min(46vw,260px)]"
        style={{ animation: "diamond-float 6s ease-in-out infinite" }}
      >
        <Image src="/brand/sabala-kristall.png" alt="Sabala Kristall" width={520} height={520} className="w-full" style={{ filter: "drop-shadow(0 30px 60px rgba(184,150,62,0.35))" }} />
      </motion.div>

      <motion.div {...rise(0.15)} className="relative mx-auto mt-12 max-w-3xl text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-gold">Das Fundament</p>
        <h2 className="mt-6 font-serif leading-[1.12]" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#2A2520" }}>
          Jeder Kanal endet auf deiner Webseite.
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-[1.2rem] leading-relaxed" style={{ color: "#46403A" }}>
          LinkedIn, Anzeigen, der Pitch, der Sales-Call, die Empfehlung im Nebensatz, alles
          leitet irgendwann auf deine Seite, und wenn die nicht trägt, verbrennst du die
          Reichweite, für die du bezahlst.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {KANAELE.map((k) => (
            <span key={k} className="font-mono text-[12px] uppercase tracking-[0.18em]" style={{ color: "#9A8A60" }}>
              {k}
            </span>
          ))}
        </div>
      </motion.div>

      <style>{`@keyframes diamond-float { 0%,100% { transform: translateY(0) rotate(-1deg) } 50% { transform: translateY(-18px) rotate(1.5deg) } }`}</style>
    </section>
  );
}

/* ── 5 · Der KI-Vorteil ────────────────────────────────────────────────── */
function KiVorteil() {
  return (
    <section id="ki-vorteil" className="px-6 py-[14vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto max-w-6xl">
        <motion.div {...rise()} className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// dein vorteil</p>
          <h2 className="mt-5 font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.3rem)", letterSpacing: "-0.01em" }}>
            Warum meine KI-Arbeit dein Vorteil ist.
          </h2>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-warm-light/75">
            Ich baue mit Claude Code, jeden Tag, auch die eigenen Systeme. Die KI übernimmt die
            Fleißarbeit, ich treffe die Entscheidungen. Für dich heißt das:
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {KI_VORTEILE.map((v, i) => (
            <motion.div
              key={v.term}
              {...rise((i % 2) * 0.1)}
              className="rounded-2xl p-8"
              style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))", border: "1px solid rgba(184,150,62,0.18)" }}
            >
              <p className="font-serif leading-none text-gold-light" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.4rem)" }}>{v.stat}</p>
              <h3 className="mt-3 font-mono text-[12px] uppercase tracking-[0.2em] text-cream/90">{v.term}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-warm-light/70">{v.line}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 6 · Die Analyse ───────────────────────────────────────────────────── */
function Analyse() {
  return (
    <section id="analyse" className="px-6 py-[14vh]">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">
        <motion.div {...rise()} className="md:sticky md:top-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// die analyse</p>
          <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#2A2520" }}>
            Jedes Projekt beginnt mit Tiefe.
          </h2>
          <p className="mt-6 max-w-md text-[1.08rem] leading-relaxed" style={{ color: "#46403A" }}>
            Bevor Design überhaupt ein Thema ist, bekommst du eine umfangreiche Analyse deiner
            Situation. Fünf Bausteine, schriftlich, verständlich, und die Grundlage für alles
            danach.
          </p>
        </motion.div>

        <div className="space-y-4">
          {ANALYSE.map((a, i) => (
            <motion.div
              key={a.n}
              {...rise(i * 0.07)}
              className="flex items-start gap-5 rounded-2xl p-6"
              style={{ background: "#ffffff", border: "1px solid rgba(184,150,62,0.2)", boxShadow: "0 10px 26px rgba(80,60,20,0.08)" }}
            >
              <span className="font-mono text-[12px] tracking-[0.25em] text-gold">{a.n}</span>
              <div>
                <h3 className="font-serif text-[1.3rem]" style={{ color: "#2A2520" }}>{a.term}</h3>
                <p className="mt-1.5 text-[0.96rem] leading-relaxed" style={{ color: "#46403A" }}>{a.line}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 7 · Aus einem Guss ────────────────────────────────────────────────── */
function AusEinemGuss() {
  return (
    <section id="aus-einem-guss" className="px-6 py-[14vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto max-w-5xl">
        <motion.div {...rise()} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Aus einem Guss</p>
          <h2 className="mt-5 font-serif leading-[1.08] text-cream" style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.3rem)", letterSpacing: "-0.01em" }}>
            Alles aus einer Hand, statt sechs Anbieter, die nicht miteinander reden.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.02rem] leading-relaxed text-warm-light/75">
            Die meisten stückeln ihren Auftritt aus Strategie, Marke, Entwicklung, SEO und KI
            zusammen, jeder macht sein Teil, und die Koordination bleibt an dir hängen. Bei
            mir kommt alles aus einer Hand, verbunden gedacht und gebaut.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <motion.div {...rise()} className="rounded-2xl p-8" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-warm-light/50">Einzeln zusammengestellt</p>
            <ul className="mt-6 space-y-3">
              {EINZELN.map((e) => (
                <li key={e.label} className="flex items-baseline justify-between gap-4 text-[0.95rem]">
                  <span className="text-warm-light/70">{e.label}</span>
                  <span className="font-mono text-warm-light/45">{e.price}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-baseline justify-between border-t border-white/10 pt-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-warm-light/60">Summe</span>
              <span className="font-serif text-[1.5rem] text-warm-light/80">20 – 35 k</span>
            </div>
            <p className="mt-4 text-[0.88rem] leading-relaxed text-warm-light/40">Verteilt auf fünf bis sechs Anbieter, die untereinander nicht reden. Koordination ist dein Job.</p>
          </motion.div>

          <motion.div {...rise(0.12)} className="rounded-2xl p-8" style={{ border: "1px solid rgba(184,150,62,0.4)", background: "linear-gradient(160deg, rgba(184,150,62,0.1), rgba(184,150,62,0.02))", boxShadow: "0 24px 60px rgba(184,150,62,0.12)" }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Aus einer Hand</p>
            <ul className="mt-6 space-y-3">
              {AUS_EINER_HAND.map((a) => (
                <li key={a} className="flex items-start gap-3 text-[0.95rem] text-cream">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--gold-light)" }} />
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t pt-4" style={{ borderColor: "rgba(184,150,62,0.25)" }}>
              <span className="font-serif text-[1.3rem] text-cream">Ein Partner. Ein Weg.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── 8 · Prozess (Timeline) ────────────────────────────────────────────── */
function Prozess() {
  return (
    <section id="prozess" className="px-6 py-[14vh]">
      <div className="mx-auto max-w-4xl">
        <motion.div {...rise()} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// der prozess</p>
          <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#2A2520" }}>
            So arbeiten wir zusammen.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: "#46403A" }}>
            Fünf Schritte, kein Agentur-Nebel. Du weißt an jedem Punkt, wo dein Projekt steht.
          </p>
        </motion.div>

        <div className="relative mx-auto mt-16 max-w-2xl">
          {/* Linie, die sich beim Scrollen zeichnet */}
          <motion.span
            aria-hidden
            className="absolute left-[13px] top-2 h-[calc(100%-16px)] w-px origin-top md:left-[15px]"
            style={{ background: "linear-gradient(to bottom, var(--gold-light), rgba(184,150,62,0.15))" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          <div className="space-y-10">
            {PROZESS.map((p, i) => (
              <motion.div key={p.n} {...rise(i * 0.1)} className="relative flex gap-7 pl-1">
                <span
                  className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full md:h-7 md:w-7"
                  style={{ background: "var(--cream)", border: "1.5px solid var(--gold)", boxShadow: "0 0 0 5px var(--cream)" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4">
                    <span className="font-mono text-[11px] tracking-[0.3em] text-gold">{p.n}</span>
                    <h3 className="font-serif text-[1.5rem]" style={{ color: "#2A2520" }}>{p.term}</h3>
                  </div>
                  <p className="mt-2 max-w-lg text-[1rem] leading-relaxed" style={{ color: "#46403A" }}>{p.line}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 9 · Signale ───────────────────────────────────────────────────────── */
function Signale() {
  return (
    <section id="signale" className="px-6 py-[14vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto max-w-6xl">
        <motion.div {...rise()} className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Woran du Premium erkennst</p>
          <h2 className="mt-5 font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.3rem)", letterSpacing: "-0.01em" }}>
            Sechs stille Signale, die in jeder Seite von mir stecken.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SIGNALS.map((s, i) => (
            <motion.div
              key={s.term}
              {...rise((i % 3) * 0.1)}
              className="relative rounded-2xl p-7"
              style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))", border: "1px solid rgba(184,150,62,0.18)" }}
            >
              <span className="font-mono text-[11px] tracking-[0.3em] text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-serif text-[1.5rem] text-cream">{s.term}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-warm-light/70">{s.line}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 10 · Echte Arbeit (Proof) ─────────────────────────────────────────── */
function EchteArbeit() {
  return (
    <section id="arbeit" className="px-6 py-[13vh]">
      <div className="mx-auto max-w-6xl">
        <motion.div {...rise()} className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// echte arbeit</p>
            <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#2A2520" }}>
              Keine Mockups. Alles live.
            </h2>
          </div>
          <Link href="/case-studies" className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-gold transition-colors hover:text-[#7A6A3E]">
            Alle Case Studies
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ARBEIT.map((a, i) => (
            <motion.div key={a.label} {...rise(i * 0.1)}>
              <Link href="/case-studies" className="group block overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(184,150,62,0.22)", boxShadow: "0 14px 34px rgba(80,60,20,0.10)" }}>
                <div className="relative aspect-[16/10] overflow-hidden" style={{ background: "#0A0806" }}>
                  <Image
                    src={a.img}
                    alt={a.label}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-baseline justify-between px-5 py-4" style={{ background: "#ffffff" }}>
                  <span className="font-serif text-[1.1rem]" style={{ color: "#2A2520" }}>{a.label}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "#9A8F7E" }}>{a.note}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 11 · Dashboard-Upsell (3D-Tilt) ───────────────────────────────────── */
function DashboardUpsell() {
  return (
    <section id="dashboard" className="overflow-hidden px-6 py-[15vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <motion.div {...rise()}>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "#5BD6D0" }}>// upgrade · dein cockpit</p>
          <h2 className="mt-5 font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.3rem)", letterSpacing: "-0.01em" }}>
            Dein eigenes Dashboard für SEO, GEO und Analytics.
          </h2>
          <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-warm-light/75">
            Nach dem Launch beginnt das Messen. Als Upgrade bekommst du dein eigenes Cockpit:
            Besucher, Keywords, KI-Sichtbarkeit und Blog-Performance, alle Seiten in einer
            Sicht, self-hosted, deine Daten bleiben bei dir.
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

/* ── 12 · Preismodell ──────────────────────────────────────────────────── */
function Preismodell() {
  return (
    <section id="preise" className="px-6 py-[14vh]">
      <div className="mx-auto max-w-6xl">
        <motion.div {...rise()} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// preismodell</p>
          <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#2A2520" }}>
            Ein Projekt. Ein Service. Ein Cockpit.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: "#46403A" }}>
            Gefunden werden, betreut bleiben, messbar wachsen: du startest mit dem Projekt,
            die Pflege hält es lebendig, und das Dashboard zeigt dir, was es bringt.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PREISE.map((p, i) => (
            <motion.div
              key={p.n}
              {...rise(i * 0.1)}
              className={`relative flex flex-col rounded-2xl p-8 ${p.highlight ? "md:-translate-y-3" : ""}`}
              style={
                p.highlight
                  ? { background: "#ffffff", border: "2px solid rgba(184,150,62,0.5)", boxShadow: "0 30px 70px rgba(184,150,62,0.22)" }
                  : { background: "#ffffff", border: "1px solid rgba(184,150,62,0.22)", boxShadow: "0 14px 34px rgba(80,60,20,0.10)" }
              }
            >
              {p.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gold-light px-4 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-tech-bg">
                  {p.badge}
                </span>
              )}
              <span className="font-mono text-[11px] tracking-[0.3em] text-gold">{p.n}</span>
              <h3 className="mt-4 font-serif text-[1.6rem]" style={{ color: "#2A2520" }}>{p.term}</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-serif text-[1.9rem]" style={{ color: "#2A2520" }}>{p.price}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "#9A8F7E" }}>{p.unit}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-2.5">
                {p.punkte.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-[0.94rem] leading-relaxed" style={{ color: "#46403A" }}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--gold)" }} />
                    {pt}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t pt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em]" style={{ borderColor: "rgba(184,150,62,0.18)", color: "#9A8F7E" }}>
                {p.foot}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...rise(0.2)} className="mt-14 text-center">
          <p className="mx-auto max-w-xl text-[1rem] leading-relaxed" style={{ color: "#46403A" }}>
            Ich nehme bewusst wenige Projekte parallel an, damit jedes die Tiefe bekommt, für
            die du bezahlst. Den genauen Rahmen finden wir im Gespräch.
          </p>
          <a href="#kontakt" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-light px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold">
            Projekt anfragen <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ── 13 · Eigentum ─────────────────────────────────────────────────────── */
function Eigentum() {
  return (
    <section id="eigentum" className="px-6 py-[13vh]">
      <motion.div {...rise()} className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Der Unterschied</p>
        <h2 className="mt-5 font-serif leading-[1.05]" style={{ fontSize: "clamp(2.6rem, 6vw, 4.6rem)", color: "#2A2520", letterSpacing: "-0.015em" }}>
          Dein Code gehört dir.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[1.08rem] leading-relaxed" style={{ color: "#46403A" }}>
          Jedes Projekt bekommt sein eigenes GitHub-Repo, und der Code gehört am Ende dir,
          nicht einem Baukasten, der dich aussperren kann. Das ist echtes Eigentum an deinem
          Auftritt, auch wenn wir uns irgendwann trennen.
        </p>
      </motion.div>
    </section>
  );
}

/* ── 14 · FAQ + Finale ─────────────────────────────────────────────────── */
function Faq() {
  return (
    <section id="faq" className="px-6 py-[14vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto max-w-3xl">
        <motion.div {...rise()} className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// fragen</p>
          <h2 className="mt-5 font-serif leading-[1.08] text-cream" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
            Was du wissen willst, bevor du schreibst.
          </h2>
        </motion.div>

        <motion.div {...rise(0.1)} className="mt-12 space-y-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl px-6 py-1"
              style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))", border: "1px solid rgba(184,150,62,0.18)" }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-[1.2rem] text-cream [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="font-mono text-[1.2rem] text-gold transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 text-[0.98rem] leading-relaxed text-warm-light/75">{f.a}</p>
            </details>
          ))}
        </motion.div>

        <motion.div {...rise(0.15)} className="mt-14 text-center">
          <p className="font-serif text-[1.35rem] leading-relaxed text-cream">
            Wir prüfen gemeinsam, ob wir zueinander passen.
          </p>
          <a href="#kontakt" className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold-light px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold">
            Klärungsgespräch anfragen <span>↓</span>
          </a>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-warm-light/40">
            beidseitig unverbindlich · antwort in 48 stunden
          </p>
        </motion.div>
      </div>
    </section>
  );
}
