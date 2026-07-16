"use client";

import Image from "next/image";
import { motion } from "motion/react";

/* ─────────────────────────────────────────────────────────────────────────
   /webseiten — „Dein Projekt steht. Jetzt muss man es sehen."
   ICP: Start-ups, Agenturen, B2B-Dienstleister. Projekt klar, Visualisierung
   fehlt. Struktur: Hero · FürWen · Hub · AusEinemGuss · Premium · Signale ·
   SEO+GEO+Service · Eigentum · Typen+Preis. Keine Em-Dashes, kleines du.
   ───────────────────────────────────────────────────────────────────────── */

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

const SIGNALS: { term: string; line: string }[] = [
  { term: "Eine klare Botschaft", line: "Im Hero steht in einem Satz, was du tust und für wen, ohne Buzzword-Nebel." },
  { term: "Echte Bilder", line: "Dein Team, dein Produkt, deine Arbeit, statt Stock-Menschen am glücklichen Laptop." },
  { term: "Ein Brand-System", line: "Drei bis fünf Farben, eine Schrift, gleiche Werte auf jeder Section, konsequent durchgezogen." },
  { term: "Echte Geschwindigkeit", line: "Unter zwei Sekunden auf dem Handy, PageSpeed über 90, eigener Code statt Template-Ballast." },
  { term: "SEO + GEO", line: "Gefunden bei Google und zitiert von KI-Suchen wie ChatGPT, von Anfang an mitgedacht." },
  { term: "Eine klare Aktion", line: "Die Seite zieht zu einem Schritt, ohne Popup-Lärm und ohne Funnel-Druck." },
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

const SERVICE = [
  {
    n: "01",
    term: "SEO",
    title: "Google findet dich",
    line: "Saubere Technik, klare Struktur, Inhalte entlang echter Suchanfragen, das Fundament wird beim Bau direkt mitgelegt.",
  },
  {
    n: "02",
    term: "GEO",
    title: "KI empfiehlt dich",
    line: "ChatGPT, Perplexity und Co. zitieren Seiten mit sauberem Schema-Markup und klaren Antworten, deine Seite wird von Anfang an dafür gebaut.",
  },
  {
    n: "03",
    term: "Premium-Service",
    title: "Nach dem Launch geht es weiter",
    line: "Updates, Änderungen, neue Inhalte, ein Ansprechpartner, der dein Projekt wirklich kennt, ab 49 € im Monat.",
  },
];

const TYPEN = ["OnePager", "Landingpage", "Sales-Page", "Komplette Markenwelt"];

export default function WebseitenPage() {
  return (
    <main className="flex-1" style={{ background: "var(--cream)" }}>
      <Hero />
      <FuerWen />
      <Hub />
      <AusEinemGuss />
      <Premium />
      <Signale />
      <SeoService />
      <Eigentum />
      <Typen />
    </main>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative flex min-h-[94vh] items-center justify-center overflow-hidden px-6" style={{ background: "var(--tech-bg)" }}>
      {/* Flüssig-Gold-Video — „aus einem Guss" */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
        style={{ mixBlendMode: "screen" }}
      >
        <source src="/brand/liquid-gold.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 35%, rgba(184,150,62,0.10), transparent 65%)" }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,8,6,0.55), transparent 30%, rgba(10,8,6,0.85))" }} />

      <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative mx-auto max-w-5xl text-center">
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
        <a href="#kontakt" className="mt-12 inline-flex items-center gap-2 rounded-full bg-gold-light px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold">
          Lass uns reden <span>↓</span>
        </a>
      </motion.div>
    </section>
  );
}

/* ── Für wen (B2B-Situationen) ─────────────────────────────────────────── */
function FuerWen() {
  return (
    <section className="px-6 py-[14vh]">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">// für wen das ist</p>
          <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#2A2520" }}>
            Drei Situationen, ein Muster: Substanz ohne Bühne.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FUER_WEN.map((f, i) => (
            <motion.div
              key={f.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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

/* ── Hub / Fundament (Diamant-Centerpiece) ─────────────────────────────── */
const KANAELE = ["LinkedIn", "Anzeigen", "Pitch-Decks", "Sales-Calls", "Empfehlungen", "SEO"];

function Hub() {
  return (
    <section className="relative overflow-hidden px-6 py-[16vh]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle, rgba(184,150,62,0.16), transparent 65%)" }} />

      {/* Diamant, schwebend */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="relative mx-auto w-[min(46vw,260px)]"
        style={{ animation: "diamond-float 6s ease-in-out infinite" }}
      >
        <Image src="/brand/sabala-kristall.png" alt="Sabala Kristall" width={520} height={520} className="w-full" style={{ filter: "drop-shadow(0 30px 60px rgba(184,150,62,0.35))" }} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.15 }} className="relative mx-auto mt-12 max-w-3xl text-center">
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

/* ── Aus einem Guss (Value-Anker · Vergleich) ──────────────────────────── */
function AusEinemGuss() {
  return (
    <section className="px-6 py-[14vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="mx-auto max-w-2xl text-center">
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
          {/* Einzeln */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }} className="rounded-2xl p-8" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
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

          {/* Aus einer Hand */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.12 }} className="rounded-2xl p-8" style={{ border: "1px solid rgba(184,150,62,0.4)", background: "linear-gradient(160deg, rgba(184,150,62,0.1), rgba(184,150,62,0.02))", boxShadow: "0 24px 60px rgba(184,150,62,0.12)" }}>
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

/* ── Premium-Definition ────────────────────────────────────────────────── */
function Premium() {
  return (
    <section className="px-6 py-[15vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Was Premium hier heißt</p>
        <p className="mt-6 font-serif leading-[1.25]" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.5rem)", color: "#2A2520" }}>
          Wenn dein Angebot Substanz hat, muss deine Webseite das auf den ersten Blick stützen,
          statt es zu widerlegen.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: "#46403A" }}>
          Ich baue keine austauschbaren Standard-Seiten, ich baue einzigartige, künstlerische
          Auftritte mit Wow-Effekt, die nach deinem Unternehmen klingen und in fünf Sekunden
          Vertrauen schaffen.
        </p>
      </motion.div>
    </section>
  );
}

/* ── Die Signale (Wert/Features) ───────────────────────────────────────── */
function Signale() {
  return (
    <section className="px-6 py-[14vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Woran du Premium erkennst</p>
          <h2 className="mt-5 font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.3rem)", letterSpacing: "-0.01em" }}>
            Sechs stille Signale, die in jeder Seite von mir stecken.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SIGNALS.map((s, i) => (
            <motion.div
              key={s.term}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
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

/* ── SEO + GEO + laufender Service ─────────────────────────────────────── */
function SeoService() {
  return (
    <section className="px-6 py-[14vh]">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">{"// gefunden + betreut"}</p>
          <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#2A2520" }}>
            Gefunden werden. Betreut bleiben.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: "#46403A" }}>
            Eine Premium-Seite, die keiner findet, ist Deko, und eine Seite ohne Pflege altert
            schneller, als du denkst. Beides ist bei mir von Anfang an mitgedacht.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SERVICE.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col rounded-2xl p-8"
              style={{ background: "#ffffff", border: "1px solid rgba(184,150,62,0.22)", boxShadow: "0 14px 34px rgba(80,60,20,0.10), inset 0 1px 0 rgba(255,255,255,0.9)" }}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-[0.3em] text-gold">{s.n}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "#9A8F7E" }}>{s.term}</span>
              </div>
              <h3 className="mt-5 font-serif text-[1.5rem] leading-snug" style={{ color: "#2A2520" }}>{s.title}</h3>
              <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed" style={{ color: "#46403A" }}>{s.line}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Eigentum (Differenzierer) ─────────────────────────────────────────── */
function Eigentum() {
  return (
    <section className="px-6 py-[15vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
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

/* ── Typen + ab-Preis + Pflege ─────────────────────────────────────────── */
function Typen() {
  return (
    <section className="px-6 pb-[10vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {TYPEN.map((t) => (
            <span key={t} className="rounded-full px-5 py-2 font-mono text-[12px] tracking-[0.08em]" style={{ border: "1px solid rgba(184,150,62,0.35)", color: "#7A6A3E" }}>
              {t}
            </span>
          ))}
        </div>
        <p className="mt-8 text-[1.05rem]" style={{ color: "#46403A" }}>
          Vom schlanken OnePager bis zur kompletten Markenwelt, jede Seite einzeln gedacht und gebaut.
        </p>
        <p className="mt-4 font-serif text-[1.5rem]" style={{ color: "#2A2520" }}>
          ab 4.900 €
        </p>
        <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.16em]" style={{ color: "#7A6A3E" }}>
          danach Pflege & Premium-Service ab 49 € im Monat
        </p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "#9A8F7E" }}>
          Den genauen Rahmen finden wir im Gespräch
        </p>
        <a href="#kontakt" className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold-light px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold">
          Projekt anfragen <span>→</span>
        </a>
      </motion.div>
    </section>
  );
}
