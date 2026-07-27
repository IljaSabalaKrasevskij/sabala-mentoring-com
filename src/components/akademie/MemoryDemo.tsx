"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Brackets, Eyebrow } from "./shared";

/* ─────────────────────────────────────────────────────────────────────────
   MemoryDemo — das Herzstück. Ein Fake-Terminal, das den Kern des Angebots
   FÜHLBAR macht: dieselbe Frage an Claude, einmal ohne System (vergisst),
   einmal mit System (erinnert sich). Toggle + Live-Typing.
   ───────────────────────────────────────────────────────────────────────── */

type Line = { who: "you" | "claude" | "sys"; text: string };

const PROMPT = "Hey Claude, woran haben wir letzte Woche gearbeitet?";

const WITHOUT: Line[] = [
  { who: "you", text: PROMPT },
  { who: "claude", text: "Ich habe leider keinen Kontext zu vorherigen Gesprächen. Magst du mir kurz erklären, woran du arbeitest, was dein Ziel ist und wo ihr zuletzt standet?" },
  { who: "sys", text: "Kontext verloren. Wieder von vorne." },
];

const WITH: Line[] = [
  { who: "you", text: PROMPT },
  { who: "claude", text: "Klar. Ihr habt am Donnerstag die Salespage-Struktur fertig gemacht: Hero, Value-Stack, Preis. Offen war noch die FAQ und das Embed des Demo-Videos." },
  { who: "claude", text: "In der Daily Note vom 12.06. steht außerdem: Launch-Preis 197 EUR, max. 8 Plaetze. Soll ich mit der FAQ weitermachen?" },
  { who: "sys", text: "Kontext geladen aus Obsidian + Memory. Nahtlos weiter." },
];

function useTypewriter(active: boolean, lines: Line[]) {
  const [shown, setShown] = useState<{ full: Line; chars: number }[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    setShown([]);
    if (!active) return;

    let li = 0;
    let ci = 0;
    const buffer: { full: Line; chars: number }[] = [];

    const step = () => {
      if (li >= lines.length) return;
      const line = lines[li];
      if (ci === 0) buffer.push({ full: line, chars: 0 });
      ci++;
      buffer[buffer.length - 1] = { full: line, chars: ci };
      setShown([...buffer]);
      if (ci >= line.text.length) {
        li++;
        ci = 0;
        timer.current = setTimeout(step, 420);
      } else {
        // schneller für "you", langsamer für claude
        const speed = line.who === "you" ? 18 : line.who === "sys" ? 14 : 11;
        timer.current = setTimeout(step, speed);
      }
    };
    timer.current = setTimeout(step, 350);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, lines]);

  return shown;
}

export default function MemoryDemo() {
  const [mode, setMode] = useState<"without" | "with">("without");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0, rootMargin: "0px 0px -25% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const lines = mode === "without" ? WITHOUT : WITH;
  const shown = useTypewriter(inView, lines);
  const accent = mode === "without" ? "#B14A33" : "var(--gold)";

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-[18vh]" style={{ background: "var(--tech-bg)" }}>
      {/* atmosphärischer Schimmer, wechselt Farbe mit dem Modus */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[60vh] w-[70vw] -translate-x-1/2 transition-all duration-700"
        style={{ background: `radial-gradient(ellipse, ${mode === "without" ? "rgba(177,74,51,0.12)" : "rgba(184,150,62,0.13)"}, transparent 70%)` }}
      />

      <div className="relative mx-auto max-w-3xl">
        <Eyebrow>// das eigentliche Problem</Eyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-5 max-w-2xl text-center font-serif text-cream"
          style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", lineHeight: 1.05 }}
        >
          Dieselbe Frage. Zwei völlig verschiedene Antworten.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-5 max-w-xl text-center text-[1.02rem] leading-relaxed text-warm-light/70"
        >
          Der Unterschied ist nicht Claude. Der Unterschied ist dein Setup.
        </motion.p>

        {/* Toggle */}
        <div className="mt-10 flex justify-center">
          <div className="relative inline-flex rounded-full p-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(184,150,62,0.2)" }}>
            {(["without", "with"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className="relative z-10 px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors"
                style={{ color: mode === m ? "#0a0806" : "rgba(250,248,245,0.6)" }}
              >
                {m === "without" ? "Ohne System" : "Mit System"}
              </button>
            ))}
            <span
              className="absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-out"
              style={{
                left: mode === "without" ? "4px" : "50%",
                right: mode === "without" ? "50%" : "4px",
                background: accent,
              }}
            />
          </div>
        </div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative mt-10 overflow-hidden rounded-xl"
          style={{
            background: "linear-gradient(180deg, #100d09, #0a0806)",
            border: `1px solid ${mode === "without" ? "rgba(177,74,51,0.4)" : "rgba(184,150,62,0.35)"}`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 40px ${mode === "without" ? "rgba(177,74,51,0.08)" : "rgba(184,150,62,0.1)"}`,
            transition: "border-color .4s, box-shadow .4s",
          }}
        >
          <Brackets color={mode === "without" ? "rgba(177,74,51,0.6)" : "rgba(184,150,62,0.5)"} inset={10} size={12} />

          {/* Terminal-Kopf */}
          <div className="flex items-center gap-2 border-b px-5 py-3.5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#B14A33" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#CE9248" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#5F8A86" }} />
            <span className="ml-3 font-mono text-[11px] tracking-wide" style={{ color: "rgba(250,248,245,0.4)" }}>
              claude — {mode === "without" ? "ohne_gedaechtnis" : "mit_obsidian + memory"}
            </span>
          </div>

          {/* Konversation */}
          <div className="min-h-[300px] px-6 py-6 font-mono text-[0.92rem] leading-relaxed sm:text-[0.98rem]">
            {shown.map((s, i) => {
              const partial = s.full.text.slice(0, s.chars);
              const done = s.chars >= s.full.text.length;
              if (s.full.who === "sys") {
                return (
                  <p key={i} className="mt-5 flex items-center gap-2 text-[0.8rem] tracking-wide" style={{ color: accent }}>
                    <span>{mode === "without" ? "✕" : "✓"}</span>
                    <span style={{ opacity: 0.85 }}>{partial}</span>
                  </p>
                );
              }
              const isYou = s.full.who === "you";
              return (
                <p key={i} className={i === 0 ? "" : "mt-4"}>
                  <span className="select-none" style={{ color: isYou ? "rgba(250,248,245,0.45)" : accent }}>
                    {isYou ? "du › " : "claude › "}
                  </span>
                  <span style={{ color: isYou ? "rgba(250,248,245,0.92)" : "rgba(250,248,245,0.78)" }}>
                    {partial}
                    {!done && <span className="ml-0.5 inline-block h-[1em] w-[7px] -translate-y-[1px] align-middle" style={{ background: accent, animation: "blink 1s steps(1) infinite" }} />}
                  </span>
                </p>
              );
            })}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-7 text-center font-mono text-[12px] uppercase tracking-[0.22em] text-warm-mid"
        >
          {mode === "without" ? "↑ So fühlt sich jede Session ohne Setup an." : "↑ Genau das richtest du in 2×2,5 Stunden ein."}
        </motion.p>
      </div>

      <style>{`@keyframes blink { 0%,50% { opacity: 1 } 50.01%,100% { opacity: 0 } }`}</style>
    </section>
  );
}
