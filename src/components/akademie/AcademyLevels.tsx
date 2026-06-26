"use client";

import { useState } from "react";
import { Reveal } from "./shared";
import { LEVELS, levelGold, GOLD, type Level } from "./levels";

/* ─────────────────────────────────────────────────────────────────────────
   AcademyLevels — die Level-Leiter als Rueckgrat des Hubs + Self-Check.
   Du klickst dein Level an, bekommst die passende naechste Station.
   On-Brand: Gold-Intensitaet matt -> hell als Fortschritts-Signal.
   ───────────────────────────────────────────────────────────────────────── */

type Step = {
  level: Level;
  here: string;     // was du an diesem Level kannst
  next: string;     // deine naechste Station
  cta: { label: string; href: string };
};

const STEPS: Step[] = [
  {
    level: 1,
    here: "Du hast von KI gehoert, ChatGPT mal probiert, nutzt es aber nicht im Alltag.",
    next: "Hol dir den guenstigen Einstieg im Shop und mach den ersten echten Schritt.",
    cta: { label: "Zum Shop", href: "/shop" },
  },
  {
    level: 2,
    here: "Du nutzt KI schon, aber planlos. Du spuerst das Potenzial, kommst aber nicht ins System.",
    next: "Bau dein Fundament live mit mir: Claude Code, Obsidian, NotebookLM.",
    cta: { label: "Zum naechsten Termin", href: "#kalender" },
  },
  {
    level: 3,
    here: "Claude Code laeuft, du baust erste Workflows und Skills, automatisierst Routine.",
    next: "Geh in die Tiefe: Automationen und erste eigene Agenten in den naechsten Sessions.",
    cta: { label: "Kurse ansehen", href: "#kurse" },
  },
  {
    level: 4,
    here: "Du baust eigene Agenten und Systeme und orchestrierst KI im Hintergrund.",
    next: "Dann bist du eher Fall fuer eine direkte Zusammenarbeit als fuer einen Kurs.",
    cta: { label: "Gemeinsam bauen", href: "/mitentwickelt" },
  },
];

export default function AcademyLevels() {
  const [active, setActive] = useState<Level | null>(null);

  return (
    <section
      id="level"
      style={{
        position: "relative",
        background: "radial-gradient(120% 80% at 50% 0%, #14100a 0%, #0c0a07 55%, #0a0806 100%)",
        padding: "100px 0 96px",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <p className="font-mono" style={{ fontSize: 13, letterSpacing: "0.24em", textTransform: "uppercase", color: GOLD, marginBottom: 18 }}>
            Dein Weg
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: "clamp(30px, 4.4vw, 52px)", fontWeight: 400, color: "#FAF8F5", lineHeight: 1.08, marginBottom: 14, maxWidth: 680 }}>
            Wo stehst du gerade? <em style={{ fontStyle: "italic", color: GOLD }}>Klick dich ein.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontSize: 15.5, color: "rgba(250,248,245,0.55)", marginBottom: 52, maxWidth: 520, lineHeight: 1.65 }}>
            Vier Level, von neugierig bis Builder. Du steigst dort ein, wo du stehst. Waehl dein Level und sieh deine naechste Station.
          </p>
        </Reveal>

        {/* Die Leiter */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {STEPS.map((s, i) => {
            const m = LEVELS[s.level];
            const isActive = active === s.level;
            return (
              <Reveal key={s.level} delay={0.06 + i * 0.06}>
                <button
                  onClick={() => setActive(isActive ? null : s.level)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    gap: 22,
                    alignItems: "flex-start",
                    background: isActive ? `rgba(212,174,90,${(m.intensity * 0.12).toFixed(2)})` : "rgba(255,250,242,0.025)",
                    border: `1px solid ${isActive ? levelGold(s.level, 0.9) : "rgba(255,255,255,0.08)"}`,
                    borderLeft: `3px solid ${levelGold(s.level, isActive ? 1 : 0.85)}`,
                    borderRadius: 4,
                    padding: "22px 26px",
                    transition: "all 0.25s",
                  }}
                >
                  {/* Level-Nummer */}
                  <div style={{ flexShrink: 0, textAlign: "center", minWidth: 54 }}>
                    <div style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: 40, lineHeight: 1, color: levelGold(s.level, 1.1) }}>{s.level}</div>
                    <div className="font-mono" style={{ fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,248,245,0.5)", marginTop: 5 }}>{m.name}</div>
                  </div>

                  {/* Inhalt */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 15.5, color: "rgba(250,248,245,0.8)", lineHeight: 1.6 }}>{s.here}</p>

                    {/* Aufgeklappt: naechste Station */}
                    <div style={{ display: "grid", gridTemplateRows: isActive ? "1fr" : "0fr", transition: "grid-template-rows 0.35s ease", marginTop: isActive ? 16 : 0 }}>
                      <div style={{ overflow: "hidden" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px 24px", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(212,174,90,0.2)", paddingTop: 16 }}>
                          <p style={{ fontSize: 14.5, color: "rgba(250,248,245,0.65)", lineHeight: 1.55, maxWidth: 420 }}>
                            <span className="font-mono" style={{ fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, display: "block", marginBottom: 6 }}>Deine naechste Station</span>
                            {s.next}
                          </p>
                          <a
                            href={s.cta.href}
                            style={{ display: "inline-flex", alignItems: "center", gap: 9, background: GOLD, color: "#0a0806", fontSize: 13, fontWeight: 600, letterSpacing: "0.03em", padding: "13px 24px", borderRadius: 2, textDecoration: "none", flexShrink: 0 }}
                          >
                            {s.cta.label}
                            <svg width="16" height="11" viewBox="0 0 20 12" fill="none"><path d="M0 6h18M13 1l5 5-5 5" stroke="#0a0806" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Plus/Minus */}
                  <span style={{ flexShrink: 0, color: levelGold(s.level, 1), fontSize: 20, lineHeight: 1, marginTop: 6 }}>{isActive ? "−" : "+"}</span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
