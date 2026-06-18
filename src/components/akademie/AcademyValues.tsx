"use client";

import { Reveal } from "./shared";

/* ─────────────────────────────────────────────────────────────────────────
   AcademyValues — „Was hier entsteht"
   Warme Cream-Sektion als Kontrast zum dunklen Hero. Persönliche Botschaft
   plus vier Werte-Säulen: Qualität · Lerntransfer · Einfachheit · Customization.
   Sanfte Gradient-Übergänge oben/unten blenden zwischen Dunkel und Cream.
   ───────────────────────────────────────────────────────────────────────── */

type Pillar = { title: string; body: string; icon: React.ReactNode };

const stroke = {
  fill: "none",
  stroke: "#B8963E",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PILLARS: Pillar[] = [
  {
    title: "Hohe Qualität",
    body: "Erprobte Setups statt Tool-Hopping. Nur was sich in der Praxis wirklich bewährt hat.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16l-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />
      </svg>
    ),
  },
  {
    title: "Lerntransfer",
    body: "Du setzt live um, nicht erst zuhause. Am Ende steht ein fertiges System, kein Notizzettel.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" {...stroke}>
        <path d="M4 8h13M13 4l4 4-4 4" />
        <path d="M20 16H7M11 12l-4 4 4 4" />
      </svg>
    ),
  },
  {
    title: "Einfachheit",
    body: "Kinderleicht erklärt. Keine Insider-Begriffe ohne Übersetzung, keine Vollballerei.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3c0 4-3 5-3 8a3 3 0 006 0c0-3-3-4-3-8z" />
        <path d="M9.5 18.5h5M10.5 21h3" />
      </svg>
    ),
  },
  {
    title: "Customization",
    body: "Angepasst an dein Business. Dein Wissen, deine Themen, dein Workflow, deine Stimme.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" {...stroke}>
        <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
        <circle cx="16" cy="7" r="2.4" />
        <circle cx="8" cy="17" r="2.4" />
      </svg>
    ),
  },
];

export default function AcademyValues() {
  return (
    <section style={{ position: "relative", background: "#FAF8F5" }}>
      {/* Übergang oben: aus dem dunklen Hero in Cream */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: "14vh",
          background: "linear-gradient(180deg, #0a0806 0%, rgba(10,8,6,0.0) 100%)",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", padding: "120px 24px 110px" }}>
        {/* Botschaft */}
        <Reveal>
          <p className="font-mono" style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "#B8963E", marginBottom: 22 }}>
            Was hier entsteht
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif), Georgia, serif",
              fontSize: "clamp(32px, 4.6vw, 58px)",
              fontWeight: 400,
              color: "#2E2B26",
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              maxWidth: 760,
              marginBottom: 26,
            }}
          >
            Kein Kurs zum Wegklicken.{" "}
            <em style={{ fontStyle: "italic", color: "#B8963E" }}>Ein Können, das bleibt.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p
            style={{
              fontSize: "clamp(16px, 1.7vw, 19px)",
              color: "#5C564E",
              lineHeight: 1.7,
              maxWidth: 600,
              marginBottom: 72,
            }}
          >
            Du lernst hier nicht Theorie über KI. Du baust mit mir live dein eigenes System auf,
            Schritt für Schritt, bis es läuft. Was du mitnimmst, kannst du am nächsten Tag anwenden.
          </p>
        </Reveal>

        {/* Vier Säulen */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 0,
            borderTop: "1px solid rgba(46,43,38,0.10)",
          }}
        >
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={0.1 + i * 0.08}>
              <div
                style={{
                  padding: "40px 28px 40px 0",
                  borderRight: i < PILLARS.length - 1 ? "1px solid rgba(46,43,38,0.10)" : "none",
                  height: "100%",
                  paddingLeft: i === 0 ? 0 : 28,
                }}
              >
                <div style={{ marginBottom: 22 }}>{p.icon}</div>
                <h3
                  style={{
                    fontFamily: "var(--font-instrument-serif), Georgia, serif",
                    fontSize: 23,
                    fontWeight: 400,
                    color: "#2E2B26",
                    marginBottom: 12,
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: 14.5, color: "#6B655C", lineHeight: 1.62 }}>{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Übergang unten: aus Cream zurück ins Dunkle */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "auto 0 0 0",
          height: "16vh",
          background: "linear-gradient(180deg, rgba(10,8,6,0.0) 0%, #0a0806 100%)",
        }}
      />
    </section>
  );
}
