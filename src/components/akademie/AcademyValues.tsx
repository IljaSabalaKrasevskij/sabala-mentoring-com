"use client";

import { Reveal, TiltCard } from "./shared";
import ClaudeLogo from "@/components/brand/ClaudeLogo";

/* ─────────────────────────────────────────────────────────────────────────
   AcademyValues — „Was hier entsteht"
   Warme Cream-Sektion als Kontrast zum dunklen Hero. Persönliche Botschaft
   plus vier Werte-Karten: Qualität · Lerntransfer · Einfachheit · Customization.
   High-End-Anmutung: Gold-Icon-Badges mit Glow, 3D-Tilt + Hover-Lift.
   ───────────────────────────────────────────────────────────────────────── */

type Pillar = { title: string; body: string; icon: React.ReactNode };

const stroke = {
  fill: "none",
  stroke: "#B8963E",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PILLARS: Pillar[] = [
  {
    title: "Hohe Qualität",
    body: "Erprobte Claude-Setups statt Tool-Hopping. Drin ist nur, was sich in echten Kundenprojekten bewährt hat.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16l-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />
      </svg>
    ),
  },
  {
    title: "Lerntransfer",
    body: "Du setzt live um, nicht erst zuhause. Am Ende läuft ein echtes System, kein Notizzettel.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" {...stroke}>
        <path d="M4 8h13M13 4l4 4-4 4" />
        <path d="M20 16H7M11 12l-4 4 4 4" />
      </svg>
    ),
  },
  {
    title: "Einfachheit",
    body: "Claude Code ohne Entwickler-Kauderwelsch. Jeder Schritt wird übersetzt, nichts vorausgesetzt.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3c0 4-3 5-3 8a3 3 0 006 0c0-3-3-4-3-8z" />
        <path d="M9.5 18.5h5M10.5 21h3" />
      </svg>
    ),
  },
  {
    title: "Customization",
    body: "Zugeschnitten auf deine Dienstleistung. Deine Mandate, deine Abläufe, deine Stimme.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" {...stroke}>
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

      <div style={{ position: "relative", maxWidth: 1140, margin: "0 auto", padding: "130px 24px 120px" }}>
        {/* Botschaft */}
        <Reveal>
          <p className="font-mono" style={{ fontSize: 13, letterSpacing: "0.26em", textTransform: "uppercase", color: "#B8963E", marginBottom: 24 }}>
            Was hier entsteht
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif), Georgia, serif",
              fontSize: "clamp(34px, 5vw, 64px)",
              fontWeight: 400,
              color: "#2E2B26",
              lineHeight: 1.07,
              letterSpacing: "-0.01em",
              maxWidth: 820,
              marginBottom: 28,
            }}
          >
            Werkzeuge kommen und gehen.{" "}
            <em style={{ fontStyle: "italic", color: "#B8963E" }}>Dein Können bleibt.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p
            style={{
              fontSize: "clamp(17px, 1.8vw, 20px)",
              color: "#4F4A42",
              lineHeight: 1.68,
              maxWidth: 640,
              marginBottom: 30,
            }}
          >
            KI verändert sich im Wochentakt. Deshalb stehen hier die Grundtechniken und erprobten
            Setups im Mittelpunkt, das Fundament, das bleibt, während die Tools sich ändern. Vor allem
            schärfst du den wichtigsten Skill überhaupt: deine Vorstellungskraft. Denn wer sich klar
            vorstellt, was möglich ist, holt aus jedem KI-Werkzeug das Beste heraus.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="flex items-center gap-2.5" style={{ marginBottom: 80 }}>
            <ClaudeLogo size={17} />
            <span
              className="font-mono"
              style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8C8475" }}
            >
              Alle Setups laufen auf Claude · primär Claude Code
            </span>
          </div>
        </Reveal>

        {/* Vier Werte-Karten */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(248px, 1fr))",
            gap: 24,
          }}
        >
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={0.12 + i * 0.09}>
              <TiltCard
                style={{ height: "100%" }}
                glow="rgba(184,150,62,0.16)"
                radius={14}
              >
                <div
                  className="value-card"
                  style={{
                    height: "100%",
                    background: "#FFFFFF",
                    border: "1px solid rgba(46,43,38,0.08)",
                    borderRadius: 14,
                    padding: "38px 30px 36px",
                    boxShadow: "0 18px 40px -28px rgba(46,43,38,0.35)",
                    transition: "box-shadow 0.4s, border-color 0.4s",
                  }}
                >
                  {/* Icon-Badge mit Glow */}
                  <div style={{ position: "relative", width: 72, height: 72, marginBottom: 26 }}>
                    <div
                      aria-hidden
                      className="value-glow"
                      style={{
                        position: "absolute",
                        inset: -6,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(212,174,90,0.45) 0%, rgba(212,174,90,0) 70%)",
                        opacity: 0.55,
                        transition: "opacity 0.4s",
                      }}
                    />
                    <div
                      style={{
                        position: "relative",
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(150deg, #FBF6EC 0%, #F3E9D2 100%)",
                        border: "1px solid rgba(184,150,62,0.35)",
                        boxShadow: "inset 0 1px 2px rgba(255,255,255,0.9)",
                      }}
                    >
                      {p.icon}
                    </div>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-instrument-serif), Georgia, serif",
                      fontSize: 27,
                      fontWeight: 400,
                      color: "#2E2B26",
                      marginBottom: 14,
                      lineHeight: 1.1,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 15.5, color: "#5A554C", lineHeight: 1.62 }}>{p.body}</p>
                </div>
              </TiltCard>
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

      <style>{`
        .value-card:hover {
          box-shadow: 0 34px 70px -34px rgba(184,150,62,0.55) !important;
          border-color: rgba(184,150,62,0.4) !important;
        }
        .value-card:hover .value-glow { opacity: 1 !important; }
      `}</style>
    </section>
  );
}
