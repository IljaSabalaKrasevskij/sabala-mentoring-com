"use client";

import { Reveal } from "@/components/akademie/shared";
import { LiveDot } from "./WebinarFormat";
import { WEBINAR } from "./config";

/* ─────────────────────────────────────────────────────────────────────────
   CtaBand — schmales Anmelde-Band zwischen den Sektionen.

   Grund: die Seite ist elf Bildschirme lang und hatte dazwischen keinen
   einzigen Weg zum Formular. Wer auf halber Strecke ueberzeugt ist, soll
   nicht erst ans Ende scrollen muessen. Ein Band pro Wertspitze, jedes mit
   eigenem Text, damit es sich nicht wie eine Wiederholung liest.

   Bewusst schmal (kein eigener Abschnitt mit Ueberschrift): es soll den
   Lesefluss unterbrechen, nicht ihn ersetzen.
   ───────────────────────────────────────────────────────────────────────── */

const gold = "#b8963e";
const goldLight = "#d4ae5a";

export default function CtaBand({
  text,
  knopf = "Platz sichern",
  hell = false,
}: {
  text: string;
  knopf?: string;
  hell?: boolean;
}) {
  return (
    <section
      style={{
        background: hell ? "#f2ede4" : "#100c07",
        borderTop: `1px solid ${hell ? "rgba(184,150,62,0.28)" : "rgba(184,150,62,0.24)"}`,
        borderBottom: `1px solid ${hell ? "rgba(184,150,62,0.28)" : "rgba(184,150,62,0.24)"}`,
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "clamp(26px, 3.4vw, 38px) 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "clamp(18px, 3vw, 40px)",
          flexWrap: "wrap",
        }}
      >
        <Reveal y={12} style={{ flex: "1 1 320px", minWidth: 0 }}>
          <p
            className="font-mono"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: hell ? "#8a6f2c" : goldLight,
              marginBottom: 10,
            }}
          >
            <LiveDot size={7} />
            {WEBINAR.weekday}, {WEBINAR.date} · {WEBINAR.time}
          </p>
          <p
            style={{
              fontFamily: "var(--font-instrument-serif), Georgia, serif",
              fontSize: "clamp(20px, 2.4vw, 27px)",
              lineHeight: 1.24,
              color: hell ? "#2e2b26" : "#faf8f5",
              maxWidth: 620,
            }}
          >
            {text}
          </p>
        </Reveal>

        <a
          href="#anmelden"
          className="group inline-flex items-center gap-3 font-sans font-semibold transition-all"
          style={{
            flexShrink: 0,
            background: gold,
            color: "#0a0806",
            letterSpacing: "0.06em",
            padding: "15px 32px",
            fontSize: "0.95rem",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = goldLight)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = gold)}
        >
          {knopf}
          <svg width="17" height="11" viewBox="0 0 20 12" fill="none" className="transition-transform group-hover:translate-x-1">
            <path d="M0 6h18M13 1l5 5-5 5" stroke="#0a0806" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
