"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Brackets, Eyebrow, GOLD_AUF_HELL, TEXT_AUF_HELL, TiltCard } from "./shared";

/* ─────────────────────────────────────────────────────────────────────────
   MemoryDemo — das Herzstück. Ein Fake-Terminal, das den Kern des Angebots
   FÜHLBAR macht: dieselbe Frage an Claude, einmal ohne System (vergisst),
   einmal mit System (erinnert sich). Toggle + Live-Typing.
   Zwei Fassungen: dunkel und mittig (Webinar-Seite) oder mit `hell` auf
   Creme, Text links und Terminal rechts (Kursseite).
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
  { who: "claude", text: "Klar. Am Donnerstag haben wir das Angebot für deinen Kunden fertig gemacht: Leistungen, Zeitplan, Preis. Offen sind noch die Antworten auf seine Fragen und das Video." },
  { who: "claude", text: "In deiner Notiz vom Freitag steht außerdem: Start am 1. des Monats, höchstens 8 Plätze. Soll ich mit den Antworten weitermachen?" },
  { who: "sys", text: "Kontext geladen aus Obsidian und Memory. Es geht direkt weiter." },
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

/* Auf der Kursseite neigt sich das Terminal mit der Maus und kommt nach vorn. Die Webinar-Seite bleibt, wie sie ist. */
function Rahmen({ neigen, children }: { neigen: boolean; children: React.ReactNode }) {
  if (!neigen) return <>{children}</>;
  return (
    <TiltCard hervor={1.02} max={3.5} lift={6} radius={12}>
      {children}
    </TiltCard>
  );
}

export default function MemoryDemo({ hell = false }: { hell?: boolean }) {
  const [mode, setMode] = useState<"without" | "with">("without");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const vonHand = useRef(false);

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

  /* Die zweite Antwort ist der Beweis. Wer nicht selbst umschaltet, bekommt sie nach der ersten von allein. */
  const letzte = shown[shown.length - 1];
  const fertig = !!letzte && letzte.full === lines[lines.length - 1] && letzte.chars >= letzte.full.text.length;
  useEffect(() => {
    if (mode !== "without" || !fertig || vonHand.current) return;
    const t = setTimeout(() => setMode("with"), 1600);
    return () => clearTimeout(t);
  }, [mode, fertig]);

  /* Auf Creme steht „Ohne System“ in Dunkelgrau statt in Rot: Creme mit Terrakotta ist nicht unsere Farbwelt. */
  const schalter = mode === "without" ? (hell ? "var(--deep)" : "#B14A33") : "var(--gold)";
  const mitte = hell ? "" : "mx-auto text-center";

  const hinweis = (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`font-mono text-[12.5px] uppercase leading-relaxed tracking-[0.18em] ${hell ? "mt-6" : "mt-7 text-center text-warm-mid"}`}
      style={hell ? { color: TEXT_AUF_HELL } : undefined}
    >
      {hell ? "" : "↑ "}
      {mode === "without" ? "So fühlt sich jede Session ohne Setup an." : "Genau das richten wir in zwei Workshops ein."}
    </motion.p>
  );

  return (
    <section ref={ref} className={`relative overflow-hidden px-6 ${hell ? "py-[10vh]" : "py-[18vh]"}`} style={{ background: hell ? "var(--cream)" : "var(--tech-bg)" }}>
      {/* atmosphärischer Schimmer, wechselt Farbe mit dem Modus */}
      <div
        className={`pointer-events-none absolute top-1/3 h-[60vh] w-[70vw] transition-all duration-700 ${hell ? "right-[-10vw]" : "left-1/2 -translate-x-1/2"}`}
        style={{ background: `radial-gradient(ellipse, ${mode === "without" ? (hell ? "rgba(46,43,38,0.08)" : "rgba(177,74,51,0.12)") : hell ? "rgba(184,150,62,0.22)" : "rgba(184,150,62,0.13)"}, transparent 70%)` }}
      />

      <div className={`relative mx-auto ${hell ? "max-w-6xl min-[56.25rem]:grid min-[56.25rem]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] min-[56.25rem]:items-center min-[56.25rem]:gap-14" : "max-w-3xl"}`}>
        <div>
          <Eyebrow center={!hell} color={hell ? GOLD_AUF_HELL : "var(--gold)"}>
            {hell ? "Der Beweis" : "// das eigentliche Problem"}
          </Eyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className={`mt-5 max-w-2xl text-balance font-serif ${hell ? "text-deep" : "text-cream"} ${mitte}`}
            style={{ fontSize: hell ? "clamp(2rem, 4.2vw, 3.1rem)" : "clamp(2rem, 4.6vw, 3.4rem)", lineHeight: 1.06 }}
          >
            Dieselbe Frage. Zwei völlig verschiedene Antworten.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`mt-5 max-w-xl text-[1.06rem] leading-relaxed ${hell ? "" : "text-warm-light/70"} ${mitte}`}
            style={hell ? { color: TEXT_AUF_HELL } : undefined}
          >
            Claude ist beide Male derselbe. Den Unterschied macht dein Setup.
          </motion.p>

          {/* Toggle */}
          <div className={`flex ${hell ? "mt-8" : "mt-10 justify-center"}`}>
            <div className="relative inline-flex rounded-full p-1" style={{ background: hell ? "rgba(46,43,38,0.06)" : "rgba(255,255,255,0.04)", border: `1px solid ${hell ? "rgba(46,43,38,0.16)" : "rgba(184,150,62,0.2)"}` }}>
              {(["without", "with"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={mode === m}
                  onClick={() => {
                    vonHand.current = true;
                    setMode(m);
                  }}
                  className="relative z-10 min-h-[44px] px-6 py-2.5 font-mono text-[12.5px] uppercase tracking-[0.16em] transition-colors"
                  style={{ color: mode === m ? (hell && m === "without" ? "var(--cream)" : "#0a0806") : hell ? TEXT_AUF_HELL : "rgba(250,248,245,0.6)" }}
                >
                  {m === "without" ? "Ohne System" : "Mit System"}
                </button>
              ))}
              <span
                className="absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-out"
                style={{
                  left: mode === "without" ? "4px" : "50%",
                  right: mode === "without" ? "50%" : "4px",
                  background: schalter,
                }}
              />
            </div>
          </div>

          {hell && hinweis}
        </div>

        <div>
          {/* Terminal */}
          <Rahmen neigen={hell}>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className={`relative mt-10 overflow-hidden rounded-xl ${hell ? "min-[56.25rem]:mt-0" : ""}`}
              style={{
                background: "linear-gradient(180deg, #100d09, #0a0806)",
                border: `1px solid ${mode === "without" ? "rgba(177,74,51,0.4)" : "rgba(184,150,62,0.35)"}`,
                boxShadow: hell
                  ? `0 34px 80px rgba(46,43,38,0.34), 0 0 0 6px ${mode === "without" ? "rgba(46,43,38,0.05)" : "rgba(184,150,62,0.14)"}`
                  : `0 30px 80px rgba(0,0,0,0.5), 0 0 40px ${mode === "without" ? "rgba(177,74,51,0.08)" : "rgba(184,150,62,0.1)"}`,
                transition: "border-color .4s, box-shadow .4s",
              }}
            >
              <Brackets color={mode === "without" ? "rgba(177,74,51,0.6)" : "rgba(184,150,62,0.5)"} inset={10} size={12} />

              {/* Terminal-Kopf */}
              <div className="flex items-center gap-2 border-b px-5 py-3.5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#B14A33" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#CE9248" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#5F8A86" }} />
                <span className="ml-3 font-mono text-[12.5px] tracking-wide" style={{ color: "rgba(250,248,245,0.5)" }}>
                  claude · {mode === "without" ? "ohne Gedächtnis" : "mit Obsidian und Memory"}
                </span>
              </div>

              {/* Konversation */}
              <div className="min-h-[300px] px-6 py-6 font-mono text-[0.94rem] leading-relaxed sm:text-[0.98rem]">
                {shown.map((s, i) => {
                  const partial = s.full.text.slice(0, s.chars);
                  const done = s.chars >= s.full.text.length;
                  if (s.full.who === "sys") {
                    return (
                      <p key={i} className="mt-5 flex items-center gap-2 text-[0.94rem] tracking-wide" style={{ color: accent }}>
                        <span>{mode === "without" ? "✕" : "✓"}</span>
                        <span style={{ opacity: 0.9 }}>{partial}</span>
                      </p>
                    );
                  }
                  const isYou = s.full.who === "you";
                  return (
                    <p key={i} className={i === 0 ? "" : "mt-4"}>
                      <span className="select-none" style={{ color: isYou ? "rgba(250,248,245,0.5)" : accent }}>
                        {isYou ? "du › " : "claude › "}
                      </span>
                      <span style={{ color: isYou ? "rgba(250,248,245,0.92)" : "rgba(250,248,245,0.8)" }}>
                        {partial}
                        {!done && <span className="ml-0.5 inline-block h-[1em] w-[7px] -translate-y-[1px] align-middle" style={{ background: accent, animation: "blink 1s steps(1) infinite" }} />}
                      </span>
                    </p>
                  );
                })}
              </div>
            </motion.div>
          </Rahmen>

          {!hell && hinweis}
        </div>
      </div>

      <style>{`@keyframes blink { 0%,50% { opacity: 1 } 50.01%,100% { opacity: 0 } }`}</style>
    </section>
  );
}
