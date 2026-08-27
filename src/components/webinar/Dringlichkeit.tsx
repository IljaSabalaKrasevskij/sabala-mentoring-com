"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/akademie/shared";
import { LiveDot } from "./WebinarFormat";
import { WEBINAR } from "./config";

/* ─────────────────────────────────────────────────────────────────────────
   Dringlichkeit — der Einsatz plus die drei Gruende, sich JETZT einzutragen
   statt spaeter. Bewusst nur mit Gruenden, die wirklich stimmen: der Countdown
   laeuft ohnehin, die Aufzeichnung geht tatsaechlich nur an Angemeldete, und
   eine Frage im Chat kann man in einer Aufzeichnung nicht mehr stellen.

   Keine erfundene Platzknappheit. Die Platzzahl erscheint nur, wenn sie in der
   config steht, und die traegt Ilja nur ein, wenn sie stimmt.
   ───────────────────────────────────────────────────────────────────────── */

const gold = "#b8963e";
const goldLight = "#d4ae5a";
const cream = "#faf8f5";
const serif = "var(--font-instrument-serif), Georgia, serif";

type Rest = { tage: number; stunden: number; minuten: number } | "laeuft" | "vorbei";

function restZeit(bis: number): Rest {
  const diff = bis - Date.now();
  if (diff <= -75 * 60 * 1000) return "vorbei";
  if (diff <= 0) return "laeuft";
  return {
    tage: Math.floor(diff / 86400000),
    stunden: Math.floor((diff % 86400000) / 3600000),
    minuten: Math.floor((diff % 3600000) / 60000),
  };
}

function Zahl({ wert, label }: { wert: number; label: string }) {
  return (
    <div style={{ textAlign: "center", minWidth: 74 }}>
      <div style={{ fontFamily: serif, fontSize: "clamp(34px, 4.4vw, 52px)", lineHeight: 1, color: goldLight }}>
        {String(wert).padStart(2, "0")}
      </div>
      <div
        className="font-mono"
        style={{ fontSize: 11.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,248,245,0.74)", marginTop: 8 }}
      >
        {label}
      </div>
    </div>
  );
}

function Countdown() {
  /* Erst nach dem Mount rechnen. Waehrend des Server-Renderings gibt es keine
     sinnvolle "jetzt"-Zeit, und ein Wert vom Server wuerde beim Hydrieren
     ohnehin abweichen. */
  const [rest, setRest] = useState<Rest | null>(null);

  useEffect(() => {
    const bis = new Date(WEBINAR.iso).getTime();
    const tick = () => setRest(restZeit(bis));
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);

  if (rest === null) {
    return <div style={{ height: 96 }} aria-hidden />;
  }
  if (rest === "vorbei") {
    return (
      <p style={{ fontFamily: serif, fontSize: 28, color: cream }}>
        Dieser Termin ist gelaufen. Trag dich trotzdem ein, dann bist du beim nächsten dabei.
      </p>
    );
  }
  if (rest === "laeuft") {
    return (
      <p style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: serif, fontSize: 30, color: cream }}>
        <LiveDot size={10} />
        Wir sind gerade live.
      </p>
    );
  }
  return (
    <div style={{ display: "flex", gap: "clamp(14px, 3vw, 34px)" }}>
      <Zahl wert={rest.tage} label={rest.tage === 1 ? "Tag" : "Tage"} />
      <Zahl wert={rest.stunden} label="Stunden" />
      <Zahl wert={rest.minuten} label="Minuten" />
    </div>
  );
}

export default function Dringlichkeit() {
  const gruende = [
    {
      t: "Die Aufzeichnung geht nur an Angemeldete",
      b: "Sie wird nirgends veröffentlicht. Wer nicht eingetragen ist, sieht sie auch nicht.",
    },
    {
      t: "Deine Frage kannst du nur live stellen",
      b: "Ich arbeite an meinem echten System und gehe auf das ein, was im Chat kommt. Das ist der Teil, den eine Aufzeichnung nicht nachliefert.",
    },
    WEBINAR.plaetze
      ? {
          t: `Der Raum fasst ${WEBINAR.plaetze} Leute`,
          b: "Danach ist zu. Wer sich früh einträgt, hat den Platz sicher.",
        }
      : {
          t: "Ich mache das einmal",
          b: "Danach geht das Thema in die Akademie. Einen zweiten kostenlosen Termin plane ich gerade nicht.",
        },
  ];

  return (
    <section style={{ background: "#0a0806", padding: "clamp(60px, 8vw, 100px) 0", position: "relative", overflow: "hidden" }}>
      <div
        aria-hidden
        className="wd-aurora-b"
        style={{
          position: "absolute",
          top: "-30%",
          right: "-14%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle at center, rgba(184,150,62,0.13) 0%, rgba(184,150,62,0) 62%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <p
            className="font-mono"
            style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: gold, marginBottom: 18 }}
          >
            Worum es wirklich geht
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 400,
              fontSize: "clamp(28px, 3.8vw, 46px)",
              lineHeight: 1.14,
              color: cream,
              maxWidth: 800,
              marginBottom: 20,
            }}
          >
            In einem Jahr arbeitest du entweder mit einem System, das mitdenkt.
            <br />
            <span style={{ color: goldLight }}>Oder du erklärst immer noch jeden Morgen von vorne.</span>
          </h2>
          <p style={{ fontSize: 16.5, color: "rgba(250,248,245,0.76)", lineHeight: 1.75, maxWidth: 660, marginBottom: 48 }}>
            Der Abstand zwischen beiden wächst jeden Monat, weil das eine sich sammelt und das andere
            jedes Mal bei null anfängt. Es ist kein Tool-Thema. Es ist die Frage, ob dein Wissen
            arbeitet oder nur herumliegt. Eine Stunde reicht, um zu verstehen, wie die erste Seite
            aussieht.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div
            style={{
              display: "grid",
              gap: "clamp(24px, 4vw, 48px)",
              gridTemplateColumns: "auto minmax(0, 1fr)",
              alignItems: "start",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(184,150,62,0.3)",
              borderRadius: 5,
              padding: "clamp(26px, 3.6vw, 44px)",
            }}
            className="dr-box"
          >
            <div>
              <p
                className="font-mono"
                style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: gold, marginBottom: 18 }}
              >
                Noch
              </p>
              <Countdown />
            </div>

            <ul style={{ display: "grid", gap: 20, listStyle: "none", padding: 0, margin: 0 }}>
              {gruende.map((g) => (
                <li key={g.t} style={{ display: "flex", gap: 14 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={goldLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 4 }}>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <div>
                    <p style={{ fontSize: 16, color: cream, fontWeight: 500, marginBottom: 5 }}>{g.t}</p>
                    <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "rgba(250,248,245,0.72)" }}>{g.b}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 780px) {
          .dr-box { grid-template-columns: minmax(0, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
