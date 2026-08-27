"use client";

import { useEffect, useState } from "react";
import { WEBINAR } from "./config";

/* ─────────────────────────────────────────────────────────────────────────
   FormatStrip + StickyCta — beide beantworten dieselbe Frage: "Was ist das
   hier eigentlich?" Die Leiste direkt unter dem Hero sagt das Format in fuenf
   Fakten, die mitlaufende Leiste wiederholt Termin und Anmeldung, sobald der
   Hero-CTA aus dem Bild ist.
   ───────────────────────────────────────────────────────────────────────── */

const gold = "#b8963e";
const goldLight = "#d4ae5a";

const FAKTEN = [
  { k: "Format", v: "Live-Webinar" },
  { k: "Wann", v: `${WEBINAR.weekday}, ${WEBINAR.date}` },
  { k: "Uhrzeit", v: `${WEBINAR.time}, 60 Min.` },
  { k: "Wo", v: "Zoom, Link per Mail" },
  { k: "Preis", v: "Kostenlos" },
];

export function FormatStrip() {
  return (
    <section style={{ background: "#100c07", borderTop: "1px solid rgba(184,150,62,0.2)", borderBottom: "1px solid rgba(184,150,62,0.2)" }}>
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "22px 24px",
          display: "grid",
          gap: 18,
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        }}
      >
        {FAKTEN.map((f) => (
          <div key={f.k}>
            <p
              className="font-mono"
              style={{ fontSize: 11.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(250,248,245,0.62)", marginBottom: 6 }}
            >
              {f.k}
            </p>
            <p style={{ fontSize: 15, color: "#faf8f5", fontWeight: 500 }}>{f.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Mitlaufende Leiste. Erscheint, sobald man am Hero vorbei ist, und
   verschwindet wieder, sobald das Anmeldeformular selbst im Bild ist.
   ponytail: ein Scroll-Listener statt zweier Observer, weil die Leiste nur
   eine Ja-Nein-Entscheidung trifft. */
export function StickyCta() {
  const [zeigen, setZeigen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const form = document.getElementById("anmelden");
      const formOben = form ? form.getBoundingClientRect().top : Infinity;
      setZeigen(window.scrollY > window.innerHeight * 0.9 && formOben > window.innerHeight * 0.75);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!zeigen}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        background: "rgba(10,8,6,0.94)",
        backdropFilter: "blur(10px)",
        borderTop: `1px solid ${gold}59`,
        transform: zeigen ? "none" : "translateY(110%)",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: zeigen ? "auto" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "13px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 18,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <LiveDot />
          <span style={{ fontSize: 14.5, color: "#faf8f5", lineHeight: 1.35 }}>
            <strong style={{ fontWeight: 600 }}>Live-Webinar</strong>
            <span style={{ color: "rgba(250,248,245,0.72)" }}>
              {" · "}
              {WEBINAR.weekday}, {WEBINAR.date}, {WEBINAR.time}
            </span>
          </span>
        </div>
        <a
          href="#anmelden"
          tabIndex={zeigen ? 0 : -1}
          className="font-sans"
          style={{
            flexShrink: 0,
            background: gold,
            color: "#0a0806",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.05em",
            padding: "12px 26px",
            textDecoration: "none",
          }}
        >
          Kostenlos anmelden
        </a>
      </div>
    </div>
  );
}

/* Pulsierender Punkt. Rein dekorativ, bei reduced-motion steht er still. */
export function LiveDot({ size = 8 }: { size?: number }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", flexShrink: 0, width: size, height: size }}>
      <span
        className="wb-ping"
        style={{ position: "absolute", inset: 0, borderRadius: "50%", background: goldLight, opacity: 0.65 }}
      />
      <span style={{ position: "relative", width: size, height: size, borderRadius: "50%", background: goldLight }} />
      <style>{`
        @keyframes wb-ping { 0% { transform: scale(1); opacity: 0.65; } 75%, 100% { transform: scale(2.6); opacity: 0; } }
        .wb-ping { animation: wb-ping 1.8s cubic-bezier(0,0,0.2,1) infinite; }
        @media (prefers-reduced-motion: reduce) { .wb-ping { animation: none; opacity: 0.3; } }
      `}</style>
    </span>
  );
}
