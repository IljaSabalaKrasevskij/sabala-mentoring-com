"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, TiltCard, Brackets, Eyebrow, GoldCTA } from "./shared";
import LevelBadge from "./LevelBadge";

/* ─────────────────────────────────────────────────────────────────────────
   ClaudeStarterView — Sales-Page fuer den Level-1-Einsteigerkurs "Claude Starter".
   Gleiches Premium-Niveau wie /akademie (Second Brain), aber klar auf den
   kompletten Anfaenger zugeschnitten: Terminal-Angst, kein Vorwissen, an die
   Hand genommen werden. ICP: [[ICP-Claude-Starter]].
   ───────────────────────────────────────────────────────────────────────── */

// Vor dem Verkauf eintragen: ThriveCart-Produkt mit Slug "sabalas-claude-starter" anlegen.
const CHECKOUT = "https://sabala-mentoring.thrivecart.com/sabalas-claude-starter/";
const TERMIN = "Nächster Termin folgt"; // sobald Datum steht hier eintragen
const PRICE = "99";

const gold = "#D4AE5A";

const FUER_DICH = [
  "Du hast von Claude gehört, aber noch nie ernsthaft damit gearbeitet.",
  "Das Terminal macht dir eher Angst als Lust.",
  "Tutorials sind dir zu schnell, du steigst nach fünf Minuten aus.",
  "Du willst jemanden, der dabei ist, wenn etwas klemmt.",
  "Du willst die Anfängerfehler vermeiden, statt sie alle selbst zu machen.",
];

const MODULE = [
  { n: "01", t: "Claude einrichten", d: "Wir installieren Claude und Claude Code gemeinsam auf deinem Rechner. Du klickst mit, ich bin dabei." },
  { n: "02", t: "Die Oberfläche", d: "Du findest dich zurecht und machst die ersten Schritte. Kein Ratespiel, kein Fachchinesisch." },
  { n: "03", t: "Deine CLAUDE.md", d: "Die kleine Steuerdatei, die Claude sagt, wer du bist und wie du arbeitest. Der Hebel mit dem größten Effekt." },
  { n: "04", t: "Fehler vermeiden", d: "Die typischen Stolpersteine der ersten Stunden, bevor du hineintrittst. Du sparst dir Frust und Umwege." },
];

const ABLAUF = [
  "2 Stunden live mit mir",
  "Maximal 10 Teilnehmer, du kommst garantiert dran",
  "Unterlagen zum Nachmachen",
  "Erreichbar für Fragen, auch nach dem Abend",
  "Aufzeichnung als Bonus",
];

const VORHER = [
  "Claude ist offen, aber du weißt nicht, wo du anfangen sollst.",
  "Angst, etwas kaputtzumachen.",
  "Zehn Tabs voller Tutorials, am Ende nichts gemacht.",
];
const NACHHER = [
  "Claude läuft bei dir und du weißt, was du tust.",
  "Deine eigene CLAUDE.md steht.",
  "Du bist startklar für den nächsten Schritt.",
];

const FAQ: [string, string][] = [
  ["Brauche ich Vorkenntnisse?", "Nein. Genau dafür ist dieser Abend da. Wir fangen bei null an, Schritt für Schritt."],
  ["Mac oder Windows?", "Beides geht. Sag mir vorher, womit du arbeitest, dann bist du vorbereitet."],
  ["Was, wenn ich nicht mitkomme?", "Wir sind maximal zu zehnt, du kommst dran und kannst jederzeit fragen. Dazu bekommst du Aufzeichnung und Unterlagen."],
  ["Brauche ich ein bezahltes Konto?", "Für den Einstieg reicht der kostenlose Claude-Account. Was du genau brauchst, sage ich dir vorab, damit du startklar bist."],
  ["Was kommt nach dem Starter?", "Wenn du tiefer willst, geht es weiter mit Dein Second Brain (Level 2): Claude Code, Obsidian und NotebookLM zu deinem lokalen Gedächtnis."],
];

export default function ClaudeStarterView() {
  return (
    <main className="flex-1" style={{ background: "#0a0806" }}>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "#0a0806" }}>
        <div className="absolute inset-0 z-0">
          <Image src="/hero/ilja-default.png" alt="Ilja Krasevskij" fill priority className="object-cover object-right" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,8,6,0.95) 0%, rgba(10,8,6,0.74) 32%, rgba(10,8,6,0.34) 52%, transparent 80%)" }} />
        </div>

        <div className="relative z-10 flex min-h-[86vh] flex-col justify-center px-[6vw] py-[12vh]">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "#b8963e" }}>
            Sabala Academy · Level 1 · Live
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="mt-5 max-w-[720px] font-serif leading-[1.06] text-cream" style={{ fontSize: "clamp(2.5rem, 5vw, 3.9rem)", textShadow: "0 2px 30px rgba(10,8,6,0.7)" }}>
            Dein erster Abend
            <br />
            mit Claude.
            <br />
            <span style={{ color: "#b8963e" }}>Von null auf läuft, an deiner Seite.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }} className="mt-6 max-w-xl text-base leading-relaxed md:text-lg" style={{ color: "rgba(250,248,245,0.78)" }}>
            Für alle, die endlich mit Claude anfangen wollen, aber nicht wissen, wo. Wir richten alles gemeinsam ein, Schritt für Schritt. Am Ende läuft Claude bei dir und du weißt, was du tust.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }} className="mt-8 flex flex-wrap items-center gap-3">
            <span className="relative flex flex-col px-5 py-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(184,150,62,0.3)" }}>
              <Brackets color="rgba(184,150,62,0.45)" inset={6} size={8} />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "#b8963e" }}>Live-Abend</span>
              <span className="mt-1 font-serif text-[1.1rem] text-cream">{TERMIN}</span>
              <span className="font-mono text-[11px]" style={{ color: "rgba(250,248,245,0.5)" }}>2 Stunden · max 10</span>
            </span>
            <LevelBadge level={1} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }} className="mt-9 flex flex-wrap items-center gap-5">
            <GoldCTA href={CHECKOUT}>Platz sichern — €{PRICE}</GoldCTA>
            <span className="font-mono text-[12px] uppercase tracking-[0.18em]" style={{ color: "rgba(250,248,245,0.55)" }}>
              Kein Vorwissen nötig
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── FÜR DICH (ICP-Ansprache) ─────────────────────────────────────── */}
      <section className="px-[6vw] py-[14vh]" style={{ background: "radial-gradient(120% 80% at 50% 0%, #14100a 0%, #0c0a07 55%, #0a0806 100%)" }}>
        <div className="mx-auto max-w-3xl">
          <Reveal><Eyebrow center={false}>Das hier ist für dich, wenn</Eyebrow></Reveal>
          <div className="mt-8 flex flex-col gap-4">
            {FUER_DICH.map((line, i) => (
              <Reveal key={line} delay={0.05 + i * 0.05}>
                <div className="flex items-start gap-4">
                  <span className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full" style={{ background: gold, boxShadow: `0 0 10px ${gold}` }} />
                  <p className="text-[1.15rem] leading-relaxed" style={{ color: "rgba(250,248,245,0.82)" }}>{line}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.35}>
            <p className="mt-10 font-serif text-[1.6rem] leading-snug" style={{ color: gold }}>
              Dann bist du genau richtig. Wir fangen bei null an, gemeinsam.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── WAS DU LERNST ────────────────────────────────────────────────── */}
      <section className="px-[6vw] py-[12vh]" style={{ background: "#0a0806" }}>
        <div className="mx-auto max-w-5xl">
          <Reveal><Eyebrow>An dem Abend</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-center font-serif text-cream" style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)", lineHeight: 1.1 }}>
              Vier Schritte, ein fertiges Setup
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {MODULE.map((m, i) => (
              <Reveal key={m.n} delay={0.06 + i * 0.06}>
                <TiltCard style={{ height: "100%", background: "rgba(255,250,242,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="relative p-8" style={{ height: "100%" }}>
                    <Brackets color="rgba(212,174,90,0.3)" inset={8} size={9} />
                    <span className="font-mono text-sm" style={{ color: "rgba(212,174,90,0.7)" }}>{m.n}</span>
                    <h3 className="mt-3 font-serif text-[1.55rem] text-cream">{m.t}</h3>
                    <p className="mt-3 leading-relaxed" style={{ color: "rgba(250,248,245,0.65)" }}>{m.d}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SO LÄUFT'S AB ────────────────────────────────────────────────── */}
      <section className="px-[6vw] py-[12vh]" style={{ background: "radial-gradient(120% 80% at 50% 100%, #14100a 0%, #0c0a07 55%, #0a0806 100%)" }}>
        <div className="mx-auto max-w-3xl">
          <Reveal><Eyebrow center={false}>So läuft der Abend</Eyebrow></Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {ABLAUF.map((line, i) => (
              <Reveal key={line} delay={0.05 + i * 0.05}>
                <div className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0"><path d="M5 12.5l4.5 4.5L19 7" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <p className="text-[1.05rem] leading-relaxed" style={{ color: "rgba(250,248,245,0.8)" }}>{line}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VORHER / NACHHER ─────────────────────────────────────────────── */}
      <section className="px-[6vw] py-[12vh]" style={{ background: "#0a0806" }}>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <Reveal>
            <div className="relative h-full p-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "rgba(250,248,245,0.45)" }}>Vorher</span>
              <ul className="mt-5 flex flex-col gap-4">
                {VORHER.map((v) => (
                  <li key={v} className="text-[1.02rem] leading-relaxed" style={{ color: "rgba(250,248,245,0.55)" }}>{v}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative h-full p-8" style={{ background: "linear-gradient(135deg, rgba(212,174,90,0.12) 0%, rgba(20,15,9,0.9) 60%)", border: "1px solid rgba(212,174,90,0.4)" }}>
              <Brackets color="rgba(212,174,90,0.4)" inset={8} size={9} />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: gold }}>Nachher</span>
              <ul className="mt-5 flex flex-col gap-4">
                {NACHHER.map((v) => (
                  <li key={v} className="text-[1.05rem] leading-relaxed text-cream">{v}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PREIS ────────────────────────────────────────────────────────── */}
      <section className="px-[6vw] py-[14vh]" style={{ background: "radial-gradient(120% 80% at 50% 0%, #17110a 0%, #0b0805 55%, #080604 100%)" }}>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><Eyebrow>Ein Abend, ein Preis</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <div className="mt-6 flex items-end justify-center gap-2">
              <span className="font-serif italic leading-none" style={{ fontSize: "clamp(3.4rem, 9vw, 5.5rem)", color: gold }}>€{PRICE}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-[1.05rem]" style={{ color: "rgba(250,248,245,0.6)" }}>
              2 Stunden live, max 10 Teilnehmer, Unterlagen, Support und Aufzeichnung inklusive.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-col items-center gap-4">
              <GoldCTA href={CHECKOUT} large>Platz sichern — €{PRICE}</GoldCTA>
              <span className="font-mono text-[12px] uppercase tracking-[0.18em]" style={{ color: "rgba(250,248,245,0.5)" }}>{TERMIN}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="px-[6vw] py-[12vh]" style={{ background: "#0a0806" }}>
        <div className="mx-auto max-w-3xl">
          <Reveal><Eyebrow>Häufige Fragen</Eyebrow></Reveal>
          <div className="mt-10 flex flex-col gap-3">
            {FAQ.map(([q, a], i) => (
              <Reveal key={q} delay={0.04 + i * 0.04}>
                <div className="p-7" style={{ background: "rgba(255,250,242,0.025)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="flex items-start gap-3 font-serif text-[1.3rem] text-cream">
                    <span style={{ color: gold }}>▹</span>
                    {q}
                  </p>
                  <p className="mt-3 pl-7 leading-relaxed" style={{ color: "rgba(250,248,245,0.6)" }}>{a}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Schluss-CTA */}
          <Reveal delay={0.2}>
            <div className="mt-16 text-center">
              <p className="font-serif text-cream" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.12 }}>
                Mach den ersten Schritt.<br />
                <span style={{ color: gold }}>Den Rest bauen wir zusammen.</span>
              </p>
              <div className="mt-9 flex justify-center">
                <GoldCTA href={CHECKOUT} large>Platz sichern — €{PRICE}</GoldCTA>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
