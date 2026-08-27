"use client";

import Image from "next/image";
import { Reveal } from "@/components/akademie/shared";

/* ─────────────────────────────────────────────────────────────────────────
   BauenMitSetup — die Antwort auf "und was mache ich damit?". Zwei Teile:
   eine Pipeline von der Quelle bis zum fertigen Ergebnis, darunter fuenf
   Dinge, die auf genau dieser Pipeline laufen.

   Die Pipeline ist bewusst kein SVG, sondern Flexbox mit Pfeilen: sie muss
   auf dem Handy von waagerecht auf senkrecht kippen, und Text in SVG skaliert
   dabei schlecht.
   ───────────────────────────────────────────────────────────────────────── */

const gold = "#b8963e";
const goldLight = "#d4ae5a";
const cream = "#faf8f5";
const serif = "var(--font-instrument-serif), Georgia, serif";

const STUFEN = [
  {
    k: "Quellen",
    t: "Draußen",
    b: "Webseiten, Wettbewerber, Fachartikel, Behördenseiten, dein eigenes Postfach.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
      </>
    ),
  },
  {
    k: "Abholen",
    t: "Schnittstelle",
    b: "Claude holt sich Seiten über eine API wie Firecrawl als sauberen Text. Kein Copy-Paste, kein Screenshot-Ordner.",
    icon: (
      <>
        <path d="M4 7h10a4 4 0 010 8H9" />
        <path d="M12 12l-3 3 3 3" />
        <path d="M18 4v4M16 6h4" />
      </>
    ),
    betont: true,
  },
  {
    k: "Ablegen",
    t: "Dein Ordner",
    b: "Alles landet als Textdatei an einer Stelle, benannt nach deiner Logik. Das ist dein zentrales Datenlager.",
    icon: (
      <>
        <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
      </>
    ),
    betont: true,
  },
  {
    k: "Fragen",
    t: "Verstehen",
    b: "NotebookLM beantwortet Fragen daraus mit Quellenangabe. Claude Code arbeitet direkt in denselben Dateien.",
    icon: (
      <>
        <path d="M12 3a9 9 0 019 9c0 4-3 6-4.5 7.5S15 22 12 22s-3-1-4.5-2.5S3 16 3 12a9 9 0 019-9z" />
        <path d="M9 10a3 3 0 016 0c0 2-3 2-3 4" />
      </>
    ),
  },
  {
    k: "Rausgeben",
    t: "Ergebnis",
    b: "Angebot, Briefing, Newsletter, Gesprächsvorbereitung. Aus deinem Wissen, nicht aus dem Internet-Durchschnitt.",
    icon: (
      <>
        <path d="M4 4h11l5 5v11a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" />
        <path d="M14 4v6h6M8 14h8M8 18h5" />
      </>
    ),
  },
];

const BAUTEILE = [
  {
    t: "Wettbewerbs-Radar",
    b: "Einmal eingerichtet, holt es dir regelmäßig die Seiten deiner Mitbewerber, vergleicht mit dem letzten Stand und schreibt dir auf, was sich geändert hat. Preise, Angebote, Formulierungen.",
    tag: "Research",
  },
  {
    t: "Kunden-Dossier",
    b: "Eine Datei pro Kunde, in der Gesprächsnotizen, Angebot, Verlauf und offene Punkte zusammenlaufen. Vor jedem Call fragst du einmal und bist im Bild.",
    tag: "Datenmanagement",
  },
  {
    t: "Themen-Recherche in einer Stunde",
    b: "Zwanzig Quellen abholen, ablegen, verdichten, mit Quellenangabe. Was früher ein halber Tag Browser-Tabs war, ist jetzt ein Auftrag und ein Ordner.",
    tag: "Research",
  },
  {
    t: "Content aus dem, was du schon gesagt hast",
    b: "Podcast-Transkripte und Notizen liegen im selben Ordner. Newsletter, Beitrag und Skript kommen aus derselben Quelle und klingen deshalb nach dir.",
    tag: "Datenmanagement",
  },
];

function Pfeil() {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" className="bs-pfeil" style={{ flexShrink: 0 }}>
      <path d="M0 6h19M14 1l5 5-5 5" stroke="rgba(212,174,90,0.65)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BauenMitSetup() {
  return (
    <section style={{ background: "#0a0806", padding: "0 0 clamp(60px, 8vw, 100px)" }}>
      {/* Stimmungsbild: die Zentrale als Ort. KIE-generiert (flux-kontext-max),
          liegt in public/webinar/. Weiche Verlaeufe oben und unten blenden es
          nahtlos in die dunklen Nachbarsektionen. */}
      <div style={{ position: "relative", height: "clamp(280px, 42vw, 460px)", marginBottom: "clamp(48px, 6vw, 80px)" }}>
        <Image
          src="/webinar/ordner-zentrale.jpg"
          alt="Schreibtisch bei Nacht: Lampe, Notizbuch und ein Stapel Ordner im warmen Licht"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 62%" }}
        />
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0a0806 0%, rgba(10,8,6,0.25) 30%, rgba(10,8,6,0.15) 62%, #0a0806 100%)" }} />
      </div>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <p
            className="font-mono"
            style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: gold, marginBottom: 18 }}
          >
            Im Live-Training zu sehen
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 400,
              fontSize: "clamp(28px, 3.8vw, 48px)",
              lineHeight: 1.12,
              color: "#faf8f5",
              maxWidth: 780,
              marginBottom: 20,
            }}
          >
            Ein Ordner als Zentrale. Und eine Leitung nach draußen.
          </h2>
          <p style={{ fontSize: 16.5, color: "rgba(250,248,245,0.74)", lineHeight: 1.75, maxWidth: 680, marginBottom: 54 }}>
            Das Second Brain ist nicht nur ein Archiv für das, was du schon weißt. Über
            Schnittstellen holt es sich auch, was draußen passiert, und legt es an derselben
            Stelle ab. Ab da arbeitest du mit einem einzigen Wissensstand statt mit fünfzehn
            offenen Tabs.
          </p>
        </Reveal>

        {/* ── Pipeline ── */}
        <Reveal delay={0.05}>
          <div className="bs-pipe">
            {STUFEN.map((s, i) => (
              <div key={s.k} className="bs-glied">
                <div
                  style={{
                    height: "100%",
                    background: s.betont ? "rgba(184,150,62,0.12)" : "rgba(255,255,255,0.035)",
                    border: `1px solid ${s.betont ? "rgba(184,150,62,0.45)" : "rgba(255,255,255,0.12)"}`,
                    borderRadius: 5,
                    padding: "24px 22px",
                  }}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={s.betont ? "#d4ae5a" : "rgba(250,248,245,0.66)"}
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginBottom: 16 }}
                  >
                    {s.icon}
                  </svg>
                  <p
                    className="font-mono"
                    style={{ fontSize: 11.5, letterSpacing: "0.2em", textTransform: "uppercase", color: s.betont ? "#d4ae5a" : "rgba(250,248,245,0.62)", marginBottom: 7 }}
                  >
                    {s.k}
                  </p>
                  <h3 style={{ fontFamily: serif, fontSize: 21, fontWeight: 400, color: "#faf8f5", marginBottom: 10 }}>{s.t}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.62, color: "rgba(250,248,245,0.68)" }}>{s.b}</p>
                </div>
                {i < STUFEN.length - 1 && (
                  <div className="bs-pfeil-box">
                    <Pfeil />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Was darauf laeuft ── */}
        <Reveal delay={0.08}>
          <h3
            style={{
              fontFamily: serif,
              fontSize: "clamp(22px, 2.8vw, 32px)",
              fontWeight: 400,
              color: "#faf8f5",
              margin: "clamp(56px, 7vw, 90px) 0 12px",
              maxWidth: 680,
            }}
          >
            Vier Dinge, die auf genau dieser Zentrale laufen.
          </h3>
          <p style={{ fontSize: 15.5, color: "rgba(250,248,245,0.72)", lineHeight: 1.7, maxWidth: 620, marginBottom: 40 }}>
            Nichts davon braucht eine neue Software. Alles davon braucht, dass dein Wissen an einem
            Ort liegt.
          </p>
        </Reveal>

        <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}>
          {BAUTEILE.map((b, i) => (
            <Reveal key={b.t} delay={i * 0.05}>
              <div
                style={{
                  height: "100%",
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.11)",
                  borderRadius: 5,
                  padding: "26px 26px 28px",
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    display: "inline-block",
                    fontSize: 11.5,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: b.tag === "Research" ? "#d4ae5a" : "rgba(250,248,245,0.66)",
                    background: b.tag === "Research" ? "rgba(184,150,62,0.14)" : "rgba(255,255,255,0.06)",
                    padding: "5px 10px",
                    borderRadius: 2,
                    marginBottom: 16,
                  }}
                >
                  {b.tag}
                </span>
                <h4 style={{ fontFamily: serif, fontSize: 23, fontWeight: 400, color: "#faf8f5", marginBottom: 11 }}>{b.t}</h4>
                <p style={{ fontSize: 15, lineHeight: 1.68, color: "rgba(250,248,245,0.7)" }}>{b.b}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p style={{ fontSize: 15, color: "rgba(250,248,245,0.7)", lineHeight: 1.72, maxWidth: 700, marginTop: 34 }}>
            Im Webinar zeige ich dir die Zentrale und mindestens eine dieser Anwendungen im
            laufenden Betrieb. Welche, entscheidet ihr im Chat.
          </p>
        </Reveal>
      </div>

      <style>{`
        .bs-pipe { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; }
        .bs-glied { position: relative; padding-right: 30px; }
        .bs-glied:last-child { padding-right: 0; }
        .bs-pfeil-box { position: absolute; top: 50%; right: 4px; transform: translateY(-50%); }
        @media (max-width: 1000px) {
          .bs-pipe { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .bs-glied { padding-right: 0; }
          .bs-pfeil-box { display: none; }
        }
        @media (max-width: 560px) {
          .bs-pipe { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
