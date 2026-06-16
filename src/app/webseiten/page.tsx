"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

/* ─────────────────────────────────────────────────────────────────────────
   /webseiten — „Die Webseite, die du verdienst" (Modus: Für dich gebaut)
   Sales-Struktur aus der Premium-Page (Hub · Aus einem Guss · Signale · Eigentum),
   übersetzt auf ICP v6.0 (KMU/Start-ups/Scale-ups). Keine festen Preise außer „ab".
   ───────────────────────────────────────────────────────────────────────── */

const SIGNALS: { term: string; line: string }[] = [
  { term: "Eigene Stimme", line: "Schon im Hero liest man einen Satz, der nur von dir kommen könnte." },
  { term: "Echte Fotos", line: "Dein Gesicht, dein Licht, deine Arbeit, statt glücklicher Menschen am Stock-Laptop." },
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

const TYPEN = ["OnePager", "Landingpage", "Sales-Page", "Komplette Markenwelt"];

export default function WebseitenPage() {
  return (
    <main className="flex-1" style={{ background: "var(--cream)" }}>
      <Hero />
      <Hub />
      <AusEinemGuss />
      <Premium />
      <Signale />
      <Eigentum />
      <Typen />
      <KontaktForm />
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
        <p className="font-mono text-[12px] uppercase tracking-[0.4em] text-gold">// für dich gebaut</p>
        <h1 className="mx-auto mt-8 font-serif text-cream" style={{ fontSize: "clamp(3rem, 8.5vw, 7.5rem)", lineHeight: 0.98, letterSpacing: "-0.015em" }}>
          Die Webseite,
          <br />
          die du verdienst.
        </h1>
        <p className="mx-auto mt-9 max-w-2xl text-[1.3rem] leading-relaxed text-warm-light/85">
          Premium meint nicht teuer, Premium meint Substanz, die zu dem passt, was du verkaufst, und genau die baue ich dir, mit eigenem Code und deiner eigenen Stimme.
        </p>
        <a href="#projekt" className="mt-12 inline-flex items-center gap-2 rounded-full bg-gold-light px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold">
          Lass uns reden <span>↓</span>
        </a>
      </motion.div>
    </section>
  );
}

/* ── Hub / Fundament (Diamant-Centerpiece) ─────────────────────────────── */
const KANAELE = ["LinkedIn", "Newsletter", "Anzeigen", "Empfehlungen", "SEO", "Blog"];

function Hub() {
  return (
    <section className="relative overflow-hidden px-6 py-[18vh]">
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
          Deine Webseite ist das Fundament, auf das jeder Kanal einzahlt.
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-[1.2rem] leading-relaxed" style={{ color: "#46403A" }}>
          LinkedIn, Newsletter, Anzeigen, Empfehlungen, alles leitet irgendwann auf deine Seite, und wenn die nicht trägt, verbrennst du die Reichweite, für die du bezahlst.
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
            Die meisten stückeln ihren Auftritt aus Strategie, Marke, Entwicklung, SEO und KI zusammen, jeder macht sein Teil, und die Koordination bleibt an dir hängen. Bei mir kommt alles aus einer Hand, verbunden gedacht und gebaut.
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
          Wenn dein Angebot Substanz hat, muss deine Webseite das auf den ersten Blick stützen, statt es zu widerlegen.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: "#46403A" }}>
          Ich baue keine austauschbaren Standard-Seiten, ich baue einzigartige, künstlerische Auftritte mit Wow-Effekt, die nach dir klingen und in fünf Sekunden Vertrauen schaffen.
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
          Jedes Projekt bekommt sein eigenes GitHub-Repo, und der Code gehört am Ende dir, nicht einem Baukasten, der dich aussperren kann. Das ist echtes Eigentum an deinem Auftritt.
        </p>
      </motion.div>
    </section>
  );
}

/* ── Typen + ab-Preis ──────────────────────────────────────────────────── */
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
        <p className="mt-3 font-serif text-[1.4rem]" style={{ color: "#2A2520" }}>
          ab 4.900 €
        </p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "#9A8F7E" }}>
          Den genauen Rahmen finden wir im Gespräch
        </p>
      </motion.div>
    </section>
  );
}

/* ── Kontakt-Formular ──────────────────────────────────────────────────── */
function KontaktForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ firma: "", name: "", email: "", budget: "", deadline: "", website: "", wunsch: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Firma: ${form.firma}`,
      `Ansprechpartner: ${form.name}`,
      `E-Mail: ${form.email}`,
      `Budget: ${form.budget}`,
      `Deadline: ${form.deadline}`,
      `Bisherige Webseite: ${form.website}`,
      "",
      "Wunsch / Projekt:",
      form.wunsch,
    ].join("\n");
    window.location.href = `mailto:ilja.krasevskij@gmail.com?subject=${encodeURIComponent(`Webseiten-Anfrage: ${form.firma || form.name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field = "w-full rounded-lg border bg-white/70 px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-[var(--gold)]";
  const fieldStyle = { borderColor: "rgba(184,150,62,0.3)", color: "#2A2520" } as const;

  return (
    <section id="projekt" className="px-6 py-[14vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Erzähl mir von deinem Projekt</p>
          <h2 className="mt-5 font-serif leading-[1.1] text-cream" style={{ fontSize: "clamp(2rem, 4.4vw, 3rem)" }}>
            Ein paar Zeilen reichen.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[1.02rem] leading-relaxed text-warm-light/75">
            Schreib mir, wo du stehst und was du dir wünschst, dann antworte ich dir mit einem Terminvorschlag, 30 Minuten, in denen wir gemeinsam prüfen, ob wir zueinander passen, und du danach entscheidest.
          </p>
        </motion.div>

        {sent ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 rounded-2xl p-8 text-center" style={{ border: "1px solid rgba(184,150,62,0.3)", background: "rgba(255,255,255,0.03)" }}>
            <p className="font-serif text-[1.5rem] text-cream">Danke, das ist unterwegs.</p>
            <p className="mt-3 text-warm-light/70">Dein Mailprogramm sollte sich geöffnet haben. Ich melde mich mit einem Terminvorschlag.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="mt-12 space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={field} style={fieldStyle} placeholder="Firma" value={form.firma} onChange={set("firma")} />
              <input className={field} style={fieldStyle} placeholder="Ansprechpartner" value={form.name} onChange={set("name")} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input type="email" required className={field} style={fieldStyle} placeholder="E-Mail" value={form.email} onChange={set("email")} />
              <input className={field} style={fieldStyle} placeholder="Budget (ungefähr)" value={form.budget} onChange={set("budget")} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={field} style={fieldStyle} placeholder="Deadline" value={form.deadline} onChange={set("deadline")} />
              <input className={field} style={fieldStyle} placeholder="Bisherige Webseite (Link)" value={form.website} onChange={set("website")} />
            </div>
            <textarea className={field} style={fieldStyle} rows={4} placeholder="Was wünschst du dir? Ein, zwei Sätze reichen." value={form.wunsch} onChange={set("wunsch")} />

            <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-between">
              <button type="submit" className="w-full rounded-full bg-gold-light px-7 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold sm:w-auto">
                Anfrage senden
              </button>
              <a href="https://wa.me/" className="font-mono text-[12px] uppercase tracking-[0.18em] text-warm-light/60 transition-colors hover:text-gold">
                oder schreib mir auf WhatsApp →
              </a>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
