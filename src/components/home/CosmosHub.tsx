"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import ParticleField from "./ParticleField";

type Modus = {
  key: string;
  t: string;
  s: string;
  d: string;
  href: string;
  cta: string;
  x: string;
  y: string;
  size: number;
  a: string;
  b: string;
};

const MODI: Modus[] = [
  {
    key: "build",
    t: "Für dich gebaut",
    s: "du sagst was, ich baue es",
    d: "Webseiten, Custom GPTs, Agent OS und KI-Integration in deine Firma. Du gibst die Richtung, ich liefere das fertige System.",
    href: "/webseiten",
    cta: "Zu den Webseiten",
    x: "18%",
    y: "40%",
    size: 124,
    a: "#E8C877",
    b: "#9A7A2E",
  },
  {
    key: "with",
    t: "Mit dir entwickelt",
    s: "deine Vision, unser gemeinsamer Code",
    d: "Stecken geblieben mit deinem Projekt? Ich steige ein: Co-Development, Project Rescue, Frontend und UX. NDA selbstverständlich.",
    href: "/mitentwickelt",
    cta: "Lass uns reden",
    x: "53%",
    y: "20%",
    size: 92,
    a: "#F2E6CC",
    b: "#B8963E",
  },
  {
    key: "learn",
    t: "Dir beigebracht",
    s: "du willst es selbst können",
    d: "Die KI-Akademie für Webdesigner und Solopreneure, plus Team-Workshops für dein Unternehmen.",
    href: "/akademie",
    cta: "Zur Akademie",
    x: "64%",
    y: "56%",
    size: 108,
    a: "#D8A85A",
    b: "#7A5A1E",
  },
];

export default function CosmosHub() {
  const [sel, setSel] = useState<Modus | null>(null);

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: "#0A0806" }}>
      <ParticleField density={240} />

      <div className="relative z-10 px-6 pt-20 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Dein Weg</p>
        <h2 className="mt-4 font-serif text-4xl text-cream sm:text-5xl">Wähle einen Planeten.</h2>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10">
        {MODI.map((m) => (
          <div
            key={m.key}
            className="absolute"
            style={{ left: m.x, top: m.y, animation: "float-planet 6s ease-in-out infinite" }}
          >
            <button
              type="button"
              onClick={() => setSel(m)}
              aria-label={m.t}
              className="pointer-events-auto block rounded-full transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
              style={{
                width: m.size,
                height: m.size,
                background: `radial-gradient(circle at 32% 28%, ${m.a}, ${m.b} 70%, #241B07)`,
                boxShadow: "0 0 32px rgba(184,150,62,0.35), inset -7px -9px 20px rgba(0,0,0,0.5)",
              }}
            />
            <span className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap font-mono text-xs tracking-wide text-gold-light">
              {m.t}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {sel && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="absolute inset-y-0 right-0 z-20 flex w-full flex-col justify-center p-8 sm:w-[400px]"
            style={{
              background: "rgba(21,17,11,0.94)",
              borderLeft: "1px solid rgba(184,150,62,0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            <button
              type="button"
              onClick={() => setSel(null)}
              aria-label="Schließen"
              className="absolute right-5 top-5 text-warm-mid transition-colors hover:text-cream"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold">{sel.s}</p>
            <h3 className="mt-3 font-serif text-3xl text-cream">{sel.t}</h3>
            <p className="mt-4 leading-relaxed text-warm-light/85">{sel.d}</p>
            <Link
              href={sel.href}
              className="mt-7 inline-flex w-fit items-center rounded-full bg-gold-light px-5 py-3 font-mono text-xs uppercase tracking-[0.08em] text-tech-bg transition-colors hover:bg-gold"
            >
              {sel.cta}
            </Link>
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
}
