"use client";

import Image from "next/image";
import { Reveal, TiltCard, Brackets } from "@/components/akademie/shared";
import { AGENDA, FAQ, MYTHEN, WEBINAR } from "./config";
import { useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   WebinarSections — alle statischen Abschnitte der Sales-Page in einer Datei.
   Bewusst nicht auf sieben Dateien verteilt: sie teilen sich Tokens, Rhythmus
   und werden nur hier verwendet. Der interaktive Teil (Anmeldung) sitzt in
   WebinarOptIn, die Terminal-Demo kommt wiederverwendet aus der Akademie.
   ───────────────────────────────────────────────────────────────────────── */

const gold = "#b8963e";
const goldLight = "#d4ae5a";
/* Gold auf Creme erreicht nur 2.7:1. Fuer helle Sektionen ein dunklerer
   Ton derselben Familie, damit die Kicker lesbar bleiben. */
const goldAufHell = "#8a6f2c";
const cream = "#faf8f5";

const serif = "var(--font-instrument-serif), Georgia, serif";

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className="font-mono"
      style={{
        fontSize: 12,
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color: light ? goldAufHell : gold,
        marginBottom: 18,
      }}
    >
      {children}
    </p>
  );
}

function H2({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      style={{
        fontFamily: serif,
        fontWeight: 400,
        fontSize: "clamp(28px, 3.8vw, 48px)",
        lineHeight: 1.12,
        color: light ? "#2e2b26" : cream,
        marginBottom: 20,
        maxWidth: 760,
      }}
    >
      {children}
    </h2>
  );
}

/* ── 1. Die drei Glaubenssaetze ─────────────────────────────────────────── */

export function Mythen() {
  return (
    <section style={{ background: "#0a0806", padding: "clamp(60px, 8vw, 100px) 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <SectionLabel>Bevor wir anfangen</SectionLabel>
          <H2>
            Drei Sätze, die ich fast jede Woche höre.
            <br />
            Alle drei stimmen nicht.
          </H2>
          <p style={{ fontSize: 16.5, color: "rgba(250,248,245,0.74)", lineHeight: 1.7, maxWidth: 620, marginBottom: 54 }}>
            Wenn du dich in einem davon wiedererkennst, bist du im richtigen Webinar.
          </p>
        </Reveal>

        <div style={{ display: "grid", gap: 20 }}>
          {MYTHEN.map((m, i) => (
            <Reveal key={m.glaube} delay={i * 0.06}>
              <div
                style={{
                  position: "relative",
                  display: "grid",
                  gap: "clamp(16px, 3vw, 40px)",
                  gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(184,150,62,0.22)",
                  borderRadius: 4,
                  padding: "clamp(24px, 3vw, 34px)",
                }}
                className="wb-mythos"
              >
                <Brackets color="rgba(184,150,62,0.4)" inset={8} size={10} />
                <p
                  style={{
                    fontFamily: serif,
                    fontSize: "clamp(20px, 2.4vw, 27px)",
                    lineHeight: 1.35,
                    color: "rgba(250,248,245,0.58)",
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(184,150,62,0.55)",
                    textDecorationThickness: 1.5,
                  }}
                >
                  „{m.glaube}“
                </p>
                <p style={{ fontSize: 16.5, lineHeight: 1.75, color: "rgba(250,248,245,0.86)", maxWidth: 720 }}>
                  {m.wahrheit}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .wb-mythos { grid-template-columns: minmax(0, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

/* ── 3. Was ein Second Brain ist, in einfach ────────────────────────────── */

const WERKZEUGE = [
  {
    nr: "01",
    logo: "/akademie/logos/obsidian.svg",
    name: "Obsidian",
    rolle: "Das Gedächtnis",
    body: "Deine Notizen als schlichte Textdateien auf deinem Rechner. Verknüpft, durchsuchbar, dir gehörend. Kein Abo, kein Server, keine fremde Datenbank.",
    farbe: "#876F9C",
  },
  {
    nr: "02",
    logo: "/akademie/logos/notebooklm.svg",
    name: "NotebookLM",
    rolle: "Das Verstehen",
    body: "Wirf 40 Dokumente rein und frag in normalem Deutsch. Es antwortet nur aus deinen Quellen und sagt dir, in welchem Dokument es das gefunden hat.",
    farbe: "#4A82C4",
  },
  {
    nr: "03",
    logo: "/akademie/logos/claude.svg",
    name: "Claude Code",
    rolle: "Die Hände",
    body: "Liest deinen Ordner und arbeitet darin. Schreibt Angebote, pflegt Notizen, bereitet Gespräche vor. Mit deinem Wissen statt mit Allgemeinplätzen.",
    farbe: "#C86A4A",
  },
];

export function Werkzeuge() {
  return (
    <section style={{ background: "#0a0806", padding: "clamp(60px, 8vw, 100px) 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <SectionLabel>Die Werkzeuge im Webinar</SectionLabel>
          <H2>Drei Werkzeuge. Jedes macht genau eine Sache.</H2>
          <p style={{ fontSize: 16.5, color: "rgba(250,248,245,0.74)", lineHeight: 1.75, maxWidth: 640, marginBottom: 54 }}>
            Keins davon ist neu und keins ist kompliziert. Interessant wird es erst, wenn sie
            dasselbe Wissen teilen.
          </p>
        </Reveal>

        <div style={{ display: "grid", gap: 22, gridTemplateColumns: "repeat(auto-fit, minmax(258px, 1fr))" }}>
          {WERKZEUGE.map((w, i) => (
            <Reveal key={w.nr} delay={i * 0.08}>
              <TiltCard glow="rgba(212,174,90,0.22)" radius={5}>
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    background: "linear-gradient(150deg, rgba(212,174,90,0.09) 0%, rgba(16,12,7,0.96) 58%)",
                    border: "1px solid rgba(184,150,62,0.26)",
                    borderRadius: 5,
                    padding: "clamp(26px, 3vw, 34px)",
                  }}
                >
                  {/* Logo im Farbschein des jeweiligen Werkzeugs */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 58,
                      height: 58,
                      borderRadius: 12,
                      background: `${w.farbe}22`,
                      border: `1px solid ${w.farbe}55`,
                      marginBottom: 22,
                    }}
                  >
                    <Image src={w.logo} alt="" width={30} height={30} style={{ opacity: 0.95 }} />
                  </div>

                  <span className="font-mono" style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: gold }}>
                    {w.rolle}
                  </span>
                  <h3 style={{ fontFamily: serif, fontSize: 27, fontWeight: 400, color: cream, margin: "10px 0 12px" }}>
                    {w.name}
                  </h3>
                  <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "rgba(250,248,245,0.7)" }}>{w.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Warum die Kombination mehr ist als die Summe */}
        <Reveal delay={0.1}>
          <div
            style={{
              marginTop: 26,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(184,150,62,0.24)",
              borderRadius: 5,
              padding: "clamp(28px, 3.6vw, 46px)",
            }}
          >
            <h3
              style={{
                fontFamily: serif,
                fontSize: "clamp(22px, 2.8vw, 32px)",
                fontWeight: 400,
                color: cream,
                marginBottom: 26,
                maxWidth: 640,
              }}
            >
              Warum Obsidian und NotebookLM zusammen etwas auslösen, das jedes für sich nicht kann.
            </h3>

            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
              {[
                {
                  t: "Obsidian allein",
                  b: "Ein sauberes Archiv, das niemand liest. Du weißt, dass die Antwort irgendwo drinsteht, aber nicht wo.",
                  dim: true,
                },
                {
                  t: "NotebookLM allein",
                  b: "Kluge Antworten aus Dokumenten, die du jedes Mal neu zusammensuchst und hochlädst. Nach zwei Wochen lässt du es.",
                  dim: true,
                },
                {
                  t: "Beide zusammen",
                  b: "Dein Obsidian-Ordner ist die Quelle, NotebookLM ist die Frage-Ebene darauf. Du schreibst einmal und fragst hundertmal. Claude Code arbeitet direkt in denselben Dateien weiter.",
                  dim: false,
                },
              ].map((x) => (
                <div
                  key={x.t}
                  style={{
                    padding: "22px 24px",
                    borderRadius: 4,
                    background: x.dim ? "rgba(255,255,255,0.02)" : "rgba(212,174,90,0.1)",
                    border: `1px solid ${x.dim ? "rgba(255,255,255,0.09)" : "rgba(212,174,90,0.42)"}`,
                  }}
                >
                  <p
                    className="font-mono"
                    style={{
                      fontSize: 12,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: x.dim ? "rgba(250,248,245,0.74)" : goldLight,
                      marginBottom: 12,
                    }}
                  >
                    {x.t}
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.68, color: x.dim ? "rgba(250,248,245,0.76)" : "rgba(250,248,245,0.9)" }}>
                    {x.b}
                  </p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 15, color: "rgba(250,248,245,0.68)", lineHeight: 1.7, marginTop: 26, maxWidth: 680 }}>
              Genau dieses Zusammenspiel zeige ich dir im Webinar an meinem eigenen System. Du siehst, wie es verdrahtet ist.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 4. Ablauf ──────────────────────────────────────────────────────────── */

export function Ablauf() {
  return (
    <section style={{ background: "#0a0806", padding: "clamp(60px, 8vw, 100px) 0" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <SectionLabel>Ablauf · {WEBINAR.duration}</SectionLabel>
          <H2>Was in diesen 60 Minuten passiert.</H2>
          <p style={{ fontSize: 16.5, color: "rgba(250,248,245,0.74)", lineHeight: 1.75, maxWidth: 620, marginBottom: 54 }}>
            Kein Folienvortrag. Ich teile meinen Bildschirm und arbeite an meinem echten System,
            mit echten Notizen aus meinem Geschäft.
          </p>
        </Reveal>

        {AGENDA.map((a, i) => (
          <Reveal key={a.minute} delay={i * 0.06}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "88px 1fr",
                gap: 24,
                padding: "28px 0",
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span className="font-mono" style={{ fontSize: 13, color: goldLight, letterSpacing: "0.1em", paddingTop: 5 }}>
                {a.minute}
              </span>
              <div>
                <h3 style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, color: cream, marginBottom: 9 }}>
                  {a.title}
                </h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "rgba(250,248,245,0.7)", maxWidth: 620 }}>{a.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── 5. Wer das Webinar haelt ───────────────────────────────────────────── */

export function Gastgeber() {
  return (
    <section style={{ background: "#faf8f5", padding: "0 0 clamp(60px, 8vw, 100px)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div
            style={{
              display: "grid",
              gap: "clamp(28px, 4vw, 56px)",
              gridTemplateColumns: "minmax(0, 320px) minmax(0, 1fr)",
              alignItems: "center",
            }}
            className="wb-host"
          >
            <div style={{ position: "relative", borderRadius: 5, overflow: "hidden", aspectRatio: "4 / 5" }}>
              <Image
                src="/akademie/ilja-trainer.jpg"
                alt="Ilja Krasevskij, Gastgeber des Webinars"
                fill
                sizes="(max-width: 780px) 100vw, 320px"
                className="object-cover"
              />
            </div>

            <div style={{ minWidth: 0 }}>
              <SectionLabel light>Wer da vorne steht</SectionLabel>
              <h2
                style={{
                  fontFamily: serif,
                  fontWeight: 400,
                  fontSize: "clamp(26px, 3.2vw, 40px)",
                  lineHeight: 1.14,
                  color: "#2e2b26",
                  marginBottom: 18,
                }}
              >
                Ilja Krasevskij
              </h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.78, color: "#6a635a", maxWidth: 620, marginBottom: 16 }}>
                Ich baue Webseiten und KI-Systeme für Selbstständige und kleine Unternehmen. Mein
                eigenes Second Brain sind über tausend Notizen, und ich arbeite jeden Tag darin.
                Nicht als Demo, sondern weil ich sonst den Überblick verlieren würde.
              </p>
              <p style={{ fontSize: 16.5, lineHeight: 1.78, color: "#6a635a", maxWidth: 620, marginBottom: 26 }}>
                Ich zeige dir im Webinar mein echtes Setup. Mit echten Kundennotizen, echten
                Angeboten und den Stellen, an denen es hakt. Ich unterrichte nichts, was ich nicht
                selbst benutze.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {["Sabala Academy", "Claude Code täglich", "Obsidian seit Jahren", "Keine Agentur-Folien"].map((t) => (
                  <span
                    key={t}
                    className="font-mono"
                    style={{
                      fontSize: 12,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#6a635a",
                      border: "1px solid rgba(46,43,38,0.16)",
                      borderRadius: 2,
                      padding: "8px 12px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 780px) {
          .wb-host { grid-template-columns: minmax(0, 1fr) !important; }
          .wb-host > div:first-child { max-width: 280px; }
        }
      `}</style>
    </section>
  );
}

/* ── 6. Fuer wen, und fuer wen nicht ────────────────────────────────────── */

const PASST = [
  "Du arbeitest schon mit Claude und merkst, dass du dich ständig wiederholst.",
  "Du hast viel Wissen im Kopf und wenig davon an einem Ort.",
  "Du berätst, coachst, verkaufst oder führst. Du baust keine Software.",
  "Du willst verstehen, was da passiert, statt einer Anleitung hinterherzuklicken.",
];

const PASST_NICHT = [
  "Du suchst einen Prompt-Trick für heute Nachmittag.",
  "Du willst, dass jemand anderes das einrichtet und du nie hinschaust.",
  "Du bist Entwickler und kennst Claude Code bereits gut.",
];

export function FuerWen() {
  return (
    <section style={{ background: "#0a0806", padding: "clamp(60px, 8vw, 100px) 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <SectionLabel>Ehrlichkeit vorab</SectionLabel>
          <H2>Für wen das hier ist.</H2>
        </Reveal>

        <div style={{ display: "grid", gap: 22, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginTop: 46 }}>
          <Reveal>
            <div
              style={{
                height: "100%",
                background: "rgba(184,150,62,0.07)",
                border: "1px solid rgba(184,150,62,0.3)",
                borderRadius: 5,
                padding: "clamp(26px, 3vw, 38px)",
              }}
            >
              <p className="font-mono" style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: goldLight, marginBottom: 22 }}>
                Passt zu dir
              </p>
              <ul style={{ display: "grid", gap: 16, listStyle: "none", padding: 0, margin: 0 }}>
                {PASST.map((p) => (
                  <li key={p} style={{ display: "flex", gap: 13, fontSize: 15.5, lineHeight: 1.65, color: "rgba(250,248,245,0.86)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={goldLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              style={{
                height: "100%",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 5,
                padding: "clamp(26px, 3vw, 38px)",
              }}
            >
              <p className="font-mono" style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,248,245,0.64)", marginBottom: 22 }}>
                Passt gerade nicht
              </p>
              <ul style={{ display: "grid", gap: 16, listStyle: "none", padding: 0, margin: 0 }}>
                {PASST_NICHT.map((p) => (
                  <li key={p} style={{ display: "flex", gap: 13, fontSize: 15.5, lineHeight: 1.65, color: "rgba(250,248,245,0.76)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(250,248,245,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── 6. FAQ ─────────────────────────────────────────────────────────────── */

export function WebinarFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ background: "#faf8f5", padding: "clamp(60px, 8vw, 100px) 0" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <SectionLabel light>Häufige Fragen</SectionLabel>
          <H2 light>Was du vermutlich wissen willst.</H2>
        </Reveal>

        <div style={{ marginTop: 44 }}>
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <div style={{ borderTop: "1px solid rgba(46,43,38,0.12)" }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 20,
                    padding: "24px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: serif,
                    fontSize: "clamp(18px, 2.2vw, 22px)",
                    color: "#2e2b26",
                  }}
                >
                  {f.q}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={gold}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    style={{ flexShrink: 0, transition: "transform 0.25s", transform: open === i ? "rotate(45deg)" : "none" }}
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: open === i ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.3s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <p style={{ fontSize: 16, lineHeight: 1.75, color: "#6a635a", paddingBottom: 26, maxWidth: 660 }}>
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
