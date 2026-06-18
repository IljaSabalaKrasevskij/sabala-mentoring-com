"use client";

import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────────────
   CourseGrid — 4 Kurs-Kacheln: 1 aktiv, 3 Coming-Soon.
   Kacheln zeigen: Thema · Format · Nächster Start · Level · CTA
   ───────────────────────────────────────────────────────────────────────── */

const COURSES = [
  {
    id: "second-brain",
    live: true,
    tag: "Jetzt buchbar",
    icon: "🧠",
    title: "Dein KI-Mitarbeiter",
    sub: "Obsidian + Claude Second Brain",
    desc: "Richte in 2×2 Stunden ein KI-System ein, das sich an alles erinnert — live aufgebaut, sofort nutzbar.",
    format: "2 Live-Sessions · je 2h",
    start: "26. Juni & 3. Juli 2026",
    time: "15:00 MEZ",
    level: "Einsteiger",
    price: "€197",
    href: "/akademie/ki-mitarbeiter",
  },
  {
    id: "webseite",
    live: false,
    tag: "Coming Soon",
    icon: "🌐",
    title: "Webseite mit KI bauen",
    sub: "Für Coaches & Berater",
    desc: "Von der leeren Seite zur fertigen Webseite — mit Claude, v0 und echten Conversion-Prinzipien.",
    format: "3 Live-Sessions · je 2h",
    start: "Q3 2026",
    time: "",
    level: "Einsteiger–Fortgeschritten",
    price: "ab €297",
    href: undefined,
  },
  {
    id: "automation",
    live: false,
    tag: "Coming Soon",
    icon: "⚙️",
    title: "KI-Automation",
    sub: "n8n · Make · Claude",
    desc: "Automatisiere wiederkehrende Aufgaben in deinem Business — ohne Code-Vorkenntnisse.",
    format: "3 Live-Sessions · je 2h",
    start: "Q3 2026",
    time: "",
    level: "Fortgeschritten",
    price: "ab €297",
    href: undefined,
  },
  {
    id: "content",
    live: false,
    tag: "Coming Soon",
    icon: "✍️",
    title: "Content-System mit KI",
    sub: "Newsletter · LinkedIn · Podcast",
    desc: "Dein persönlicher Content-Workflow mit KI: konsistent, schnell und in deiner Stimme.",
    format: "2 Live-Sessions · je 2h",
    start: "Q4 2026",
    time: "",
    level: "Einsteiger",
    price: "ab €197",
    href: undefined,
  },
];

export default function CourseGrid() {
  return (
    <section
      id="kurse"
      style={{ background: "#0a0806", padding: "96px 0 80px" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {/* Section header */}
        <p
          className="font-mono text-[10px] uppercase tracking-[0.35em] mb-4"
          style={{ color: "#C9A656" }}
        >
          Kurse · Module
        </p>
        <h2
          style={{
            fontFamily: "var(--font-instrument-serif), Georgia, serif",
            fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 400,
            color: "#FAF8F5",
            lineHeight: 1.1,
            marginBottom: 48,
          }}
        >
          Was du hier lernst
        </h2>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {COURSES.map((c) => (
            <div
              key={c.id}
              style={{
                position: "relative",
                background: c.live
                  ? "linear-gradient(135deg, rgba(201,166,86,0.08) 0%, rgba(10,8,6,0.95) 60%)"
                  : "rgba(255,255,255,0.03)",
                border: c.live
                  ? "1px solid rgba(201,166,86,0.40)"
                  : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 2,
                padding: "28px 24px 24px",
                display: "flex",
                flexDirection: "column",
                opacity: c.live ? 1 : 0.65,
                transition: "opacity 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.opacity = "1";
                el.style.borderColor = c.live ? "rgba(201,166,86,0.65)" : "rgba(255,255,255,0.18)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.opacity = c.live ? "1" : "0.65";
                el.style.borderColor = c.live ? "rgba(201,166,86,0.40)" : "rgba(255,255,255,0.08)";
              }}
            >
              {/* Tag badge */}
              <span
                style={{
                  display: "inline-block",
                  fontSize: 9,
                  fontFamily: "monospace",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  padding: "3px 8px",
                  borderRadius: 2,
                  background: c.live ? "rgba(201,166,86,0.18)" : "rgba(255,255,255,0.06)",
                  color: c.live ? "#C9A656" : "rgba(255,255,255,0.4)",
                  marginBottom: 18,
                  width: "fit-content",
                }}
              >
                {c.tag}
              </span>

              {/* Icon + Title */}
              <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
              <h3
                style={{
                  fontFamily: "var(--font-instrument-serif), Georgia, serif",
                  fontSize: 22,
                  fontWeight: 400,
                  color: "#FAF8F5",
                  lineHeight: 1.15,
                  marginBottom: 4,
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontSize: 11,
                  fontFamily: "monospace",
                  letterSpacing: "0.12em",
                  color: c.live ? "#C9A656" : "rgba(255,255,255,0.35)",
                  marginBottom: 14,
                  textTransform: "uppercase",
                }}
              >
                {c.sub}
              </p>

              <p
                style={{
                  fontSize: 14,
                  color: "rgba(250,248,245,0.58)",
                  lineHeight: 1.6,
                  flex: 1,
                  marginBottom: 24,
                }}
              >
                {c.desc}
              </p>

              {/* Meta */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  marginBottom: 20,
                  paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <MetaRow icon="📅" label={c.start + (c.time ? " · " + c.time : "")} />
                <MetaRow icon="⏱" label={c.format} />
                <MetaRow icon="📶" label={c.level} />
              </div>

              {/* CTA */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "var(--font-instrument-serif), Georgia, serif",
                    fontSize: 20,
                    color: c.live ? "#C9A656" : "rgba(255,255,255,0.3)",
                    fontStyle: "italic",
                  }}
                >
                  {c.price}
                </span>
                {c.href ? (
                  <a
                    href={c.href}
                    style={{
                      fontSize: 12,
                      fontFamily: "monospace",
                      letterSpacing: "0.12em",
                      color: "#C9A656",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(201,166,86,0.4)",
                      paddingBottom: 1,
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.borderColor = "#C9A656")}
                    onMouseLeave={e => ((e.target as HTMLElement).style.borderColor = "rgba(201,166,86,0.4)")}
                  >
                    JETZT BUCHEN →
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: "monospace",
                      letterSpacing: "0.12em",
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    BALD VERFÜGBAR
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetaRow({ icon, label }: { icon: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 12, opacity: 0.7 }}>{icon}</span>
      <span style={{ fontSize: 12, color: "rgba(250,248,245,0.5)", fontFamily: "monospace", letterSpacing: "0.04em" }}>
        {label}
      </span>
    </div>
  );
}
