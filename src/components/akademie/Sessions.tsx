"use client";

import { motion } from "framer-motion";
import { Brackets, Eyebrow } from "./shared";

/* ─────────────────────────────────────────────────────────────────────────
   Sessions — zwei große, alternierende Detail-Blöcke + Video in der Mitte.
   Jeder Block: nummeriertes „Kapitel", Inhalt, „Was du danach hast".
   ───────────────────────────────────────────────────────────────────────── */

type Module = { name: string; body: string };

const S1: Module[] = [
  { name: "Comet Browser + 3 Recherche-Extensions", body: "Dein KI-Browser für Recherche. Wir installieren Comet und die drei Erweiterungen, mit denen aus stundenlangem Suchen ein paar Minuten werden. Quellen finden, lesen und direkt weiterverarbeiten, ohne 20 offene Tabs." },
  { name: "Firecrawl API, ganze Webseiten als Wissen", body: "Statt mühsam Copy-Paste zieht Firecrawl komplette Webseiten sauber als Text. Einmal die API eingerichtet, und Claude holt sich Quellen selbst, direkt in dein NotebookLM und Obsidian." },
  { name: "NotebookLM, Schluss mit 20 Tabs", body: "YouTube-Videos, PDFs und Webseiten werden zu einer durchsuchbaren Wissensdatenbank. Aus einem Video machst du eine Präsentation oder einen Podcast. Dein Wissen, nicht Google." },
  { name: "Dein Obsidian-Brain mit PARA", body: "Eine lokale Datenbank für dein gesamtes Wissen, alles als einfache Dateien auf deinem Rechner, verlinkt und durchsuchbar. Wir richten die PARA-Struktur ein, danach übernimmt Claude die Einordnung für dich." },
];

const S1_AFTER = ["Ein KI-Recherche-Setup, das aus Stunden Minuten macht", "Eine Expertendatenbank aus allem, was du je gelernt hast", "Ein lokales Obsidian-Brain, das Claude versteht"];

const S2: Module[] = [
  { name: "Terminal + Claude Code", body: "Keine Angst vor dem Terminal. Wir installieren alles Schritt für Schritt. Du verlässt die Session mit einer funktionierenden Umgebung, auch wenn du das Terminal nie geöffnet hast." },
  { name: "Deine CLAUDE.md, Claude kennt dich", body: "Die eine Datei, die Claude sagt, wer du bist, wie du arbeitest und worauf er zugreifen darf. Einmal geschrieben, startet jede Session mit deinem Kontext statt bei null." },
  { name: "MCP-Verbindungen, Claude trifft dein System", body: "Claude Code verbindet sich mit Obsidian und NotebookLM. Damit hat er Zugriff auf dein gesamtes Wissen und kann es nutzen, ergänzen und strukturieren. Das ist Claude als fortgeschrittene Nutzung, nicht nur Chat." },
  { name: "Memory-System + meine Skills", body: "Closing Session (automatische Daily Note), Memory (projektübergreifend) und Cybersecurity (Schutz vor gefährlichen Skripten). Meine eigenen Skills, die ich täglich nutze." },
];

const S2_AFTER = ['Du sagst: "Woran haben wir gearbeitet?" und Claude weiß es. Exakt.', "Claude schreibt nach jeder Session automatisch eine Daily Note", "Das Basic-Setup, mit dem die großen Profis arbeiten"];

function SessionBlock({
  index,
  badge,
  title,
  sub,
  modules,
  after,
  flip,
  featured,
}: {
  index: string;
  badge: string;
  title: string;
  sub: string;
  modules: Module[];
  after: string[];
  flip?: boolean;
  featured?: boolean;
}) {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className={`grid items-start gap-10 md:grid-cols-[0.85fr_1.15fr] ${flip ? "md:[&>*:first-child]:order-2" : ""}`}>
        {/* linke Spalte: großes Kapitel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="md:sticky md:top-24"
        >
          <span
            className={`font-serif leading-none ${featured ? "feat-num" : ""}`}
            style={featured ? { fontSize: "clamp(4.5rem, 12vw, 9rem)" } : { fontSize: "clamp(4rem, 11vw, 8rem)", color: "rgba(184,150,62,0.22)" }}
          >
            {index}
          </span>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.28em] text-gold">{badge}</p>
          <h3 className="mt-3 font-serif text-cream" style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.5rem)", lineHeight: 1.1 }}>
            {title}
          </h3>
          <p className="mt-4 text-[1rem] leading-relaxed text-warm-light/65">{sub}</p>
        </motion.div>

        {/* rechte Spalte: Module + Ergebnis */}
        <div className="space-y-4">
          {modules.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative overflow-hidden rounded-2xl p-6 ${featured ? "feat-card" : ""}`}
              style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.012))", border: "1px solid rgba(184,150,62,0.16)", backdropFilter: "blur(6px)" }}
            >
              {/* obere Akzentlinie */}
              <span className="absolute left-6 right-6 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(184,150,62,0.7), transparent)" }} />
              {featured && <span className="feat-scan pointer-events-none absolute inset-0" />}
              <Brackets color={featured ? "rgba(212,174,90,0.7)" : "rgba(184,150,62,0.3)"} inset={10} size={9} />
              <h4 className="relative font-serif text-[1.3rem] text-cream">{m.name}</h4>
              <p className="relative mt-2.5 text-[0.95rem] leading-relaxed text-warm-light/70">{m.body}</p>
            </motion.div>
          ))}

          {/* Was du danach hast */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl p-6"
            style={{ background: "rgba(184,150,62,0.07)", border: "1px solid rgba(184,150,62,0.28)" }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Was du danach hast</p>
            <ul className="mt-3 space-y-2">
              {after.map((a) => (
                <li key={a} className="flex gap-2.5 text-[0.95rem] leading-snug text-warm-light/85">
                  <span style={{ color: "var(--gold)" }}>→</span>
                  {a}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Sessions() {
  return (
    <section className="relative overflow-hidden px-6 py-[14vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[40vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.07), transparent 70%)" }} />

      <div className="relative">
        <Eyebrow>// der ablauf</Eyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-5 mb-20 max-w-2xl text-center font-serif text-cream"
          style={{ fontSize: "clamp(2rem, 4.6vw, 3.2rem)", lineHeight: 1.06 }}
        >
          Zwei Sessions. Ein fertiges Setup.
        </motion.h2>

        <SessionBlock
          index="01"
          badge="Session 1 · 2,5 Stunden live"
          title="Recherche und Wissen, an einem Ort"
          sub="Comet Browser, NotebookLM und dein Obsidian-Brain. Die Basis, aus der Claude schöpft."
          modules={S1}
          after={S1_AFTER}
          featured
        />

        {/* Video in der Mitte */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto my-24 max-w-3xl"
        >
          <p className="mb-4 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-warm-mid">// 3 Minuten · warum das wichtig ist</p>
          <div className="group relative aspect-video overflow-hidden rounded-xl" style={{ background: "linear-gradient(135deg, #15110b, #0a0806)", border: "1px solid rgba(184,150,62,0.3)", boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}>
            <Brackets color="rgba(184,150,62,0.5)" inset={14} size={14} />
            <video
              controls
              preload="metadata"
              poster="/akademie/akademie-intro-poster.jpg"
              className="absolute inset-0 h-full w-full rounded-xl object-cover"
            >
              <source src="/akademie/akademie-intro.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>

        <SessionBlock
          index="02"
          badge="Session 2 · 2,5 Stunden live"
          title="Dein Second Brain ×10"
          sub="Terminal, Claude Code und deine CLAUDE.md. Verbunden, mit Gedächtnis."
          modules={S2}
          after={S2_AFTER}
          flip
          featured
        />
      </div>

      <style>{`
        .feat-num {
          background-image: linear-gradient(110deg, #8a6f2e 0%, #f4d98a 45%, #d4ae5a 60%, #8a6f2e 100%);
          background-size: 220% 100%;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: feat-num-shimmer 5s ease-in-out infinite;
        }
        @keyframes feat-num-shimmer { 0%,100% { background-position: 0% 0 } 50% { background-position: 100% 0 } }
        .feat-card { border-color: rgba(212,174,90,0.4) !important; animation: feat-glow 3.6s ease-in-out infinite; }
        @keyframes feat-glow {
          0%,100% { box-shadow: 0 0 0 1px rgba(212,174,90,0.18), 0 14px 36px rgba(0,0,0,0.35), 0 0 22px rgba(184,150,62,0.08); }
          50% { box-shadow: 0 0 0 1px rgba(212,174,90,0.5), 0 18px 44px rgba(0,0,0,0.4), 0 0 40px rgba(184,150,62,0.22); }
        }
        .feat-scan { background: linear-gradient(180deg, transparent, rgba(212,174,90,0.1), transparent); height: 40%; animation: feat-scan-move 4.5s linear infinite; }
        @keyframes feat-scan-move { 0% { transform: translateY(-120%) } 100% { transform: translateY(320%) } }
      `}</style>
    </section>
  );
}
