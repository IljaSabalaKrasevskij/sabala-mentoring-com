"use client";

import type { ReactNode } from "react";
import { Reveal } from "./shared";
import LevelBadge from "./LevelBadge";
import type { Level } from "./levels";

/* ─────────────────────────────────────────────────────────────────────────
   CourseGrid — „Was du hier lernst"
   Persönliche Einladung + zwei Gruppen:
     1. Jetzt buchbar  → der aktive Kurs als großes, hervorgehobenes Angebot
     2. In Kürze        → kommende Themen, bewusst ohne Preis
   Icons als SVG-Linien (keine Emojis), wärmeres Dunkel mit Gold-Licht.
   ───────────────────────────────────────────────────────────────────────── */

const gold = "#D4AE5A";
const stroke = {
  fill: "none",
  stroke: gold,
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const IconBrain = (
  <svg width="34" height="34" viewBox="0 0 24 24" {...stroke}>
    <rect x="7" y="7" width="10" height="10" rx="2.2" />
    <path d="M9.5 4v3M14.5 4v3M9.5 17v3M14.5 17v3M4 9.5h3M4 14.5h3M17 9.5h3M17 14.5h3" />
    <circle cx="12" cy="12" r="1.6" />
  </svg>
);

const IconWeb = (
  <svg width="30" height="30" viewBox="0 0 24 24" {...stroke}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 9h18M6.5 7.1h.01M9 7.1h.01" />
  </svg>
);

const IconFlow = (
  <svg width="30" height="30" viewBox="0 0 24 24" {...stroke}>
    <circle cx="6" cy="6" r="2.3" />
    <circle cx="18" cy="12" r="2.3" />
    <circle cx="6" cy="18" r="2.3" />
    <path d="M8 7l8 4M8 17l8-4" />
  </svg>
);

const IconPen = (
  <svg width="30" height="30" viewBox="0 0 24 24" {...stroke}>
    <path d="M5 19l1.2-4L16 5.2a2 2 0 012.8 0l0 0a2 2 0 010 2.8L9 17.8z" />
    <path d="M14 7.2l2.8 2.8" />
  </svg>
);

const IconSpark = (
  <svg width="32" height="32" viewBox="0 0 24 24" {...stroke}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.6 2.6M15.1 15.1l2.6 2.6M17.7 6.3l-2.6 2.6M8.9 15.1l-2.6 2.6" />
  </svg>
);

/* Jetzt buchbare Kurse — neuer Kurs = ein Eintrag. Reihenfolge = Level aufsteigend. */
const BOOKABLE: {
  href: string; icon: ReactNode; level: Level; title: string; sub: string;
  desc: string; metas: string[]; priceLabel: string; price: string;
  badge?: string; cta?: string;
}[] = [
  {
    href: "/beratung", icon: IconSpark, level: 1, title: "Deine Beratungsstunde",
    sub: "Eine Stunde, deine Fragen, klare Antworten",
    desc: "Du fragst, ich zeige es dir live am Bildschirm. Zu Claude Code, Webseiten mit KI, Hosting, SEO oder Datenschutz. Der Betrag zählt für die Akademie.",
    metas: ["Termin nach Buchung", "60 Minuten 1:1", "Kein Vorwissen nötig"],
    priceLabel: "Statt €200", price: "€97",
    badge: "Einzelgespräch", cta: "Zur Beratung",
  },
  {
    href: "/akademie", icon: IconBrain, level: 2, title: "Dein Second Brain",
    sub: "Deine lokale Datenbasis, mit der Claude niemals vergisst",
    desc: "In 2 Sessions à 2,5h richtest du dein lokales KI-Gehirn ein, das sich an alles erinnert. Live mit dir aufgebaut, am Ende einsatzbereit.",
    metas: ["21.+28.8. oder 24.9.+2.10.", "15-17:30 Uhr · 2× 2,5h", "Einsteiger willkommen"],
    priceLabel: "Beide Sessions", price: "€397",
  },
];

const SOON: { icon: ReactNode; title: string; sub: string; desc: string; level: Level }[] = [
  { icon: IconWeb, level: 2, title: "Webseite mit KI bauen", sub: "Für Coaches & Berater", desc: "Von der leeren Seite zur fertigen Webseite, die verkauft. Mit den Tools, die ich selbst nutze." },
  { icon: IconFlow, level: 3, title: "KI-Automation", sub: "Abläufe, die für dich arbeiten", desc: "Wiederkehrende Aufgaben in deinem Business automatisieren, ganz ohne Code-Vorkenntnisse." },
  { icon: IconPen, level: 2, title: "Content-System mit KI", sub: "Newsletter · LinkedIn · Podcast", desc: "Dein Content-Workflow mit KI: konsistent, schnell und trotzdem in deiner eigenen Stimme." },
];

export default function CourseGrid() {
  return (
    <section
      id="kurse"
      style={{
        position: "relative",
        background:
          "radial-gradient(120% 70% at 50% 0%, #19120a 0%, #0d0a07 48%, #0a0806 100%)",
        padding: "110px 0 96px",
        overflow: "hidden",
      }}
    >
      {/* Warmer Gold-Lichtkegel als Aufheller */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 500,
          background: "radial-gradient(ellipse at center, rgba(212,174,90,0.10) 0%, rgba(212,174,90,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        {/* Persönliche Einladung */}
        <Reveal>
          <p className="font-mono" style={{ fontSize: 13, letterSpacing: "0.24em", textTransform: "uppercase", color: gold, marginBottom: 20 }}>
            Persönliche Einladung
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif), Georgia, serif",
              fontSize: "clamp(32px, 4.8vw, 60px)",
              fontWeight: 400,
              color: "#FAF8F5",
              lineHeight: 1.07,
              letterSpacing: "-0.01em",
              maxWidth: 740,
              marginBottom: 22,
            }}
          >
            Lerne, was wirklich funktioniert.{" "}
            <em style={{ fontStyle: "italic", color: gold }}>Mit mir, live.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p style={{ fontSize: "clamp(15px, 1.7vw, 18px)", color: "rgba(250,248,245,0.62)", lineHeight: 1.7, maxWidth: 580, marginBottom: 56 }}>
            Ich nehme dich mit in die Tools, die ich selbst jeden Tag nutze. Klein, machbar,
            direkt anwendbar. Den Anfang macht dein eigenes Second Brain.
          </p>
        </Reveal>

        {/* ── Jetzt buchbar ── */}
        <Reveal delay={0.05}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: gold, boxShadow: `0 0 12px ${gold}` }} />
            <span className="font-mono" style={{ fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", color: gold }}>
              Jetzt buchbar
            </span>
          </div>
        </Reveal>

        {BOOKABLE.map((c, i) => (
          <Reveal key={c.title} delay={0.1 + i * 0.06}>
            <BookableCard {...c} />
          </Reveal>
        ))}

        {/* ── In Kürze verfügbar ── */}
        <Reveal delay={0.05}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
            <span className="font-mono" style={{ fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(250,248,245,0.6)" }}>
              In Kürze verfügbar
            </span>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 18 }}>
          {SOON.map((c, i) => (
            <Reveal key={c.title} delay={0.08 + i * 0.08}>
              <div
                style={{
                  height: "100%",
                  background: "rgba(255,250,242,0.035)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 3,
                  padding: "30px 26px",
                  transition: "background 0.25s, border-color 0.25s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,250,242,0.06)";
                  el.style.borderColor = "rgba(212,174,90,0.3)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,250,242,0.035)";
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <span style={{ opacity: 0.85 }}>{c.icon}</span>
                  <LevelBadge level={c.level} withName={false} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-instrument-serif), Georgia, serif",
                    fontSize: 22,
                    fontWeight: 400,
                    color: "#F3EEE6",
                    lineHeight: 1.15,
                    marginBottom: 5,
                  }}
                >
                  {c.title}
                </h3>
                <p className="font-mono" style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(212,174,90,0.75)", marginBottom: 16 }}>
                  {c.sub}
                </p>
                <p style={{ fontSize: 15, color: "rgba(250,248,245,0.58)", lineHeight: 1.62, marginBottom: 22 }}>{c.desc}</p>
                <span className="font-mono" style={{ fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                  Termin folgt
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookableCard({ href, icon, level, title, sub, desc, metas, priceLabel, price, badge = "Live-Training", cta = "Zum Kurs" }: {
  href: string; icon: ReactNode; level: Level; title: string; sub: string;
  desc: string; metas: string[]; priceLabel: string; price: string;
  badge?: string; cta?: string;
}) {
  return (
    <a
      href={href}
      className="group"
      style={{
        display: "block",
        position: "relative",
        textDecoration: "none",
        background: "linear-gradient(135deg, rgba(212,174,90,0.16) 0%, rgba(20,15,9,0.92) 55%)",
        border: "1px solid rgba(212,174,90,0.45)",
        borderRadius: 4,
        padding: "clamp(28px, 4vw, 48px)",
        marginBottom: 24,
        boxShadow: "0 30px 80px -40px rgba(212,174,90,0.5)",
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = gold;
        el.style.boxShadow = "0 40px 100px -40px rgba(212,174,90,0.7)";
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(212,174,90,0.45)";
        el.style.boxShadow = "0 30px 80px -40px rgba(212,174,90,0.5)";
        el.style.transform = "none";
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ flex: "1 1 340px", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <span style={{ color: gold }}>{icon}</span>
            <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: gold, border: `1px solid rgba(212,174,90,0.4)`, padding: "5px 11px", borderRadius: 2 }}>
              {badge}
            </span>
            <LevelBadge level={level} />
          </div>
          <h3 style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: "clamp(28px, 3.4vw, 40px)", fontWeight: 400, color: "#FAF8F5", lineHeight: 1.1, marginBottom: 8 }}>
            {title}
          </h3>
          <p className="font-mono" style={{ fontSize: 12.5, letterSpacing: "0.1em", textTransform: "uppercase", color: gold, marginBottom: 18 }}>
            {sub}
          </p>
          <p style={{ fontSize: 16.5, color: "rgba(250,248,245,0.72)", lineHeight: 1.68, maxWidth: 440, marginBottom: 24 }}>
            {desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 24px" }}>
            {metas.map((m) => (
              <Meta key={m} label={m} />
            ))}
          </div>
        </div>

        <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16, paddingLeft: 8 }}>
          <div>
            <span className="font-mono" style={{ display: "block", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(250,248,245,0.5)", marginBottom: 5 }}>
              {priceLabel}
            </span>
            <span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: 46, color: gold, fontStyle: "italic", lineHeight: 1 }}>
              {price}
            </span>
          </div>
          <span className="group-hover:gap-3" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: gold, color: "#0a0806", fontSize: 14, fontWeight: 600, letterSpacing: "0.04em", padding: "16px 30px", borderRadius: 2, transition: "gap 0.25s" }}>
            {cta}
            <svg width="18" height="12" viewBox="0 0 20 12" fill="none">
              <path d="M0 6h18M13 1l5 5-5 5" stroke="#0a0806" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

function Meta({ label }: { label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#D4AE5A" }} />
      <span className="font-mono" style={{ fontSize: 13.5, color: "rgba(250,248,245,0.62)", letterSpacing: "0.02em" }}>
        {label}
      </span>
    </span>
  );
}
