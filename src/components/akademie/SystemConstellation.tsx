"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brackets, Eyebrow } from "./shared";
import MooniFloat from "./MooniFloat";

/* ─────────────────────────────────────────────────────────────────────────
   SystemConstellation — „Drei Tools, ein System". Drei weit gespreizte Nodes,
   Mooni groß im Zentrum (schaut dich an). Hover öffnet eine Infobox NEBEN dem
   jeweiligen Knoten — kein Text-Sprung mehr. Inhalte = die zwei Live-Sessions.
   ───────────────────────────────────────────────────────────────────────── */

type Node = {
  key: string;
  name: string;
  role: string;
  session: string;
  boxTitle: string;
  boxBody: string;
  color: string;
  // Ankerpunkt (Prozent der Bühne) + Seite, zu der die Infobox aufgeht
  x: number;
  y: number;
  side: "left" | "right" | "bottom";
  // Schwebendes Original-Logo
  logo: string;
  // Wo das schwebende Logo relativ zur Pill sitzt (px-Offset)
  logoDx: number;
  logoDy: number;
  // Phasenversatz für die Bob-Animation (s), damit alle drei asynchron schweben
  floatPhase: number;
};

const NODES: Node[] = [
  {
    key: "obsidian",
    name: "Obsidian",
    role: "Dein lokales Gehirn",
    session: "Session 1 · 2h live",
    boxTitle: "Deine Wissensdatenbank",
    boxBody: "Obsidian als lokale Datenbank einrichten — die Basis, auf die Claude direkt zugreift. Plus Claude herunterladen, falls noch nicht da.",
    color: "#876F9C",
    x: 17,
    y: 24,
    side: "left",
    logo: "/akademie/logos/obsidian.svg",
    logoDx: -52,
    logoDy: -68,
    floatPhase: 0,
  },
  {
    key: "notebooklm",
    name: "NotebookLM",
    role: "Deine Expertendatenbank",
    session: "Session 1 · 2h live",
    boxTitle: "Wissen auf Knopfdruck",
    boxBody: "YouTube, PDFs, Webseiten — durchsuchbar gemacht und mit Obsidian verknüpft. Dein Expertenwissen, abrufbar für Claude.",
    color: "#5F8A86",
    x: 83,
    y: 24,
    side: "right",
    logo: "/akademie/logos/notebooklm.svg",
    logoDx: 52,
    logoDy: -68,
    floatPhase: 1.3,
  },
  {
    key: "claude",
    name: "Claude Code",
    role: "Dein Mitarbeiter",
    session: "Session 2 · 2h live",
    boxTitle: "Claude wird zum Mitarbeiter",
    boxBody: "Terminal, Claude Code, MCP-Verbindungen, Memory-System und kleine Skills. Claude greift auf alles zu und erinnert sich — über Tage.",
    color: "#B8963E",
    x: 50,
    y: 74,
    side: "bottom",
    logo: "/akademie/logos/claude.svg",
    logoDx: 118,
    logoDy: -6,
    floatPhase: 2.6,
  },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 0],
];

function InfoBox({ n }: { n: Node }) {
  // Position relativ zum Node-Container, nach außen gerichtet
  const pos: React.CSSProperties =
    n.side === "left"
      ? { top: "115%", left: 0, transform: "translateX(-6%)" }
      : n.side === "right"
        ? { top: "115%", right: 0, transform: "translateX(6%)" }
        : { top: "118%", left: "50%", transform: "translateX(-50%)" };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute z-30 w-[260px] rounded-xl p-5 text-left"
      style={{
        ...pos,
        background: "linear-gradient(160deg, #ffffff, #f4efe6)",
        border: `1.5px solid ${n.color}`,
        boxShadow: `0 20px 48px rgba(80,60,20,0.22), 0 0 0 4px ${n.color}14`,
      }}
    >
      <Brackets color={n.color} inset={9} size={9} />
      <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: n.color }}>
        {n.session}
      </p>
      <h4 className="mt-2 font-serif text-[1.25rem] leading-tight text-deep">{n.boxTitle}</h4>
      <p className="mt-2 text-[0.9rem] leading-relaxed text-warm-mid">{n.boxBody}</p>
    </motion.div>
  );
}

export default function SystemConstellation() {
  const [hot, setHot] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden px-6 py-[16vh]" style={{ background: "var(--cream)" }}>
      <div className="relative mx-auto max-w-5xl">
        <Eyebrow>// die lösung</Eyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-5 max-w-3xl text-center font-serif text-deep"
          style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", lineHeight: 1.06 }}
        >
          Drei Tools. Einmal richtig verbunden. <span style={{ color: "var(--gold)" }}>Ein System.</span>
        </motion.h2>

        {/* Konstellations-Bühne */}
        <div className="relative mx-auto mt-16 w-full max-w-4xl" style={{ height: "min(64vw, 600px)" }}>
          {/* Synapsen */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {EDGES.map(([a, b], i) => {
              const active = hot === null || hot === a || hot === b;
              return (
                <line
                  key={i}
                  x1={NODES[a].x}
                  y1={NODES[a].y}
                  x2={NODES[b].x}
                  y2={NODES[b].y}
                  stroke="var(--gold)"
                  strokeWidth={0.4}
                  strokeDasharray="1.2 2.4"
                  style={{ opacity: active ? 0.6 : 0.12, transition: "opacity .3s", animation: "syn-flow 1.2s linear infinite" }}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          {/* warmer Halo hinter Mooni */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-60 w-60 rounded-full" style={{ background: "radial-gradient(circle, rgba(184,150,62,0.32), transparent 70%)", animation: "pulse-core 3.4s ease-in-out infinite" }} />
          </div>

          {/* Mooni — groß und zentral, schaut dich an */}
          <div className="absolute left-1/2 top-1/2 h-[64%] w-[64%] -translate-x-1/2 -translate-y-1/2">
            <MooniFloat targetSize={3.8} />
          </div>

          {/* Nodes + Infoboxen */}
          {NODES.map((n, i) => {
            const isHot = hot === i;
            return (
              <div
                key={n.key}
                className="absolute"
                style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%, -50%)" }}
                onMouseEnter={() => setHot(i)}
                onMouseLeave={() => setHot(null)}
              >
                {/* Schwebendes Original-Logo — sanftes Bobbing, drum herum
                    versetzt zur Pill (logoDx/logoDy in px). Nicht-klickbar,
                    damit die Pill darunter weiter den Hover triggert. */}
                <motion.img
                  src={n.logo}
                  alt={`${n.name} Logo`}
                  draggable={false}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 + 0.18 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-none absolute z-20 select-none"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: isHot ? 64 : 52,
                    height: isHot ? 64 : 52,
                    marginLeft: n.logoDx - (isHot ? 32 : 26),
                    marginTop: n.logoDy - (isHot ? 32 : 26),
                    filter: isHot
                      ? `drop-shadow(0 8px 22px ${n.color}99) drop-shadow(0 0 18px ${n.color}66)`
                      : `drop-shadow(0 6px 14px rgba(80,60,20,0.22))`,
                    animation: `logo-float 5.2s ease-in-out ${n.floatPhase}s infinite`,
                    transition: "width .3s, height .3s, margin .3s, filter .3s",
                  }}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 * i }}
                  className="flex cursor-default flex-col items-center text-center"
                >
                  <span
                    className="relative flex items-center gap-2 px-5 py-3 transition-all duration-300"
                    style={{
                      background: isHot ? n.color : "linear-gradient(180deg, #ffffff, #f1ece2)",
                      border: `1.5px solid ${n.color}`,
                      borderRadius: 12,
                      boxShadow: isHot ? `0 16px 38px ${n.color}66` : `0 12px 26px rgba(80,60,20,0.18), inset 0 1px 0 rgba(255,255,255,0.9)`,
                      transform: isHot ? "translateY(-3px) scale(1.05)" : "none",
                    }}
                  >
                    <Brackets color={isHot ? "#fff" : n.color} />
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: isHot ? "#fff" : n.color, boxShadow: `0 0 9px ${n.color}` }} />
                    <span className="font-serif" style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.7rem)", color: isHot ? "#fff" : n.color, lineHeight: 1 }}>
                      {n.name}
                    </span>
                  </span>
                  <span className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: n.color }}>
                    {n.role}
                  </span>
                </motion.div>

                <AnimatePresence>{isHot && <InfoBox n={n} />}</AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Statische Botschaft — springt nicht mehr */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-12 max-w-2xl text-center text-[1.05rem] leading-relaxed text-warm-mid"
        >
          Zwei Live-Sessions. Am Ende steht ein System, das die Basis für alles Weitere ist — bessere Kundenprojekte, bessere Webseiten, weniger verbrannte Token.
          <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-gold">Fahr über die Knoten</span>
        </motion.p>
      </div>

      <style>{`
        @keyframes syn-flow { to { stroke-dashoffset: -3.6 } }
        @keyframes pulse-core { 0%,100% { transform: scale(1); opacity: .7 } 50% { transform: scale(1.35); opacity: 1 } }
        @keyframes logo-float {
          0%,100% { transform: translateY(0) rotate(-2deg) }
          50%     { transform: translateY(-10px) rotate(2deg) }
        }
      `}</style>
    </section>
  );
}
