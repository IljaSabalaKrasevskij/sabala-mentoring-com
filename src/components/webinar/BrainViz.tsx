"use client";

import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   BrainViz — das Wissens-Gehirn. Eine Gehirn-Silhouette, gefuellt mit einem
   Knotennetz aus echtem Arbeitswissen. Drei Cluster leuchten im Wechsel auf,
   dazu die Frage, die Claude gerade stellt.

   Warum SVG und kein WebGL: die Seite soll auf dem Handy sofort da sein.
   Warum ein seeded PRNG auf Modulebene: Math.random() im Render wuerfelt auf
   Server und Client verschiedene Positionen, das gibt einen Hydration-Mismatch.
   Warum der Ruhezustand komplett sichtbar ist: bei prefers-reduced-motion
   laufen die Pulse nicht, das Bild muss auch dann fertig aussehen.
   ───────────────────────────────────────────────────────────────────────── */

const gold = "#b8963e";
const goldLight = "#d4ae5a";

/* Gehirn-Silhouette, Seitenansicht nach links: Grosshirn, Kleinhirn, Stamm.
   Die drei Teile werden als Vereinigung gezeichnet (Outline-Layer, dann
   Knockout in Hintergrundfarbe), sonst stehen an den Ueberlappungen Nahtlinien.
   Erst die Windungen darin machen die Form als Gehirn lesbar. */
const TEILE = [
  "M118 196C100 150 140 108 186 104C196 66 246 48 288 66C316 40 372 40 396 68C440 46 496 70 504 116C548 128 566 176 546 214C572 240 566 286 532 302C534 330 512 352 480 352C470 372 440 380 414 368C396 384 360 386 340 372C300 384 250 378 224 356C178 360 136 336 130 300C96 288 88 236 118 196Z",
  "M418 336C464 328 496 348 498 376C500 404 470 422 436 416C404 410 390 388 398 366C402 352 408 338 418 336Z",
  "M394 356C408 380 410 404 402 424C396 440 378 446 368 438C358 430 364 416 368 402C374 386 372 372 364 354Z",
];

const WINDUNGEN = [
  // Sylvische Furche, die grosse Diagonale
  "M138 262C190 242 244 256 282 288C318 318 362 326 400 314",
  "M196 110C204 148 176 168 178 200C180 232 152 244 150 274",
  "M290 70C286 116 316 134 310 172C304 210 332 226 328 262",
  "M398 74C392 118 420 138 414 174C408 210 434 228 430 262",
  "M500 122C470 148 486 180 516 190C544 200 542 236 512 250",
  "M240 330C280 316 316 336 348 330",
  // Trennkante zum Kleinhirn, macht die Form erst anatomisch lesbar
  "M406 344C438 336 470 348 486 372",
];

/* Deterministischer Zufall (mulberry32). Gleiche Zahlen auf Server und Client. */
function prng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Knoten auf einem leicht verrutschten Raster, grob auf die Gehirnform
   beschnitten. Der echte Beschnitt macht spaeter das clipPath, das Raster
   sorgt nur dafuer, dass nichts klumpt. */
const NODES = (() => {
  const r = prng(20260812);
  const out: { x: number; y: number; s: number; cluster: number }[] = [];
  for (let gy = 66; gy < 390; gy += 25) {
    for (let gx = 100; gx < 570; gx += 27) {
      const x = gx + (r() - 0.5) * 18;
      const y = gy + (r() - 0.5) * 16;
      // grobe Ellipse als Vorfilter, damit ausserhalb kaum Knoten entstehen.
      // Den exakten Beschnitt macht danach das clipPath.
      const dx = (x - 332) / 240;
      const dy = (y - 216) / 168;
      if (dx * dx + dy * dy > 0.96) continue;
      out.push({ x, y, s: 1.4 + r() * 2.2, cluster: Math.floor(r() * 3) });
    }
  }
  return out;
})();

/* Kanten: jeder Knoten an seinen naechsten Nachbarn rechts/unten. */
const EDGES = (() => {
  const out: { a: number; b: number }[] = [];
  NODES.forEach((n, i) => {
    let best = -1;
    let bestD = 999;
    for (let j = i + 1; j < NODES.length; j++) {
      const d = Math.hypot(NODES[j].x - n.x, NODES[j].y - n.y);
      if (d < bestD && d < 46) {
        bestD = d;
        best = j;
      }
    }
    if (best >= 0) out.push({ a: i, b: best });
  });
  return out;
})();

/* Die drei Cluster: was Claude findet, wenn er ins Gehirn schaut. */
const CLUSTER = [
  {
    key: "kunden",
    frage: "Was weiß ich über den Kunden aus dem Erstgespräch?",
    label: "Kundenwissen",
    treffer: ["Gesprächsnotiz 12.06.", "Angebot Stufe 2", "Onboarding-Ablauf", "Budget und Rahmen"],
    /* Ankerpunkte im Gehirn, an denen die Beschriftungen haengen */
    punkte: [
      { x: 176, y: 168 },
      { x: 248, y: 122 },
      { x: 158, y: 262 },
      { x: 232, y: 326 },
    ],
  },
  {
    key: "angebot",
    frage: "Wie habe ich das letzte Mal kalkuliert?",
    label: "Angebote und Preise",
    treffer: ["Preisliste 2026", "Kalkulation Relaunch", "Pflegevertrag-Stufen", "Rechnungen Q2"],
    punkte: [
      { x: 320, y: 122 },
      { x: 392, y: 168 },
      { x: 336, y: 276 },
      { x: 402, y: 318 },
    ],
  },
  {
    key: "content",
    frage: "Worüber habe ich schon geschrieben?",
    label: "Content und Haltung",
    treffer: ["Newsletter-Archiv", "Podcast-Skripte", "Meine Schreibregeln", "Positionierung"],
    punkte: [
      { x: 470, y: 140 },
      { x: 520, y: 226 },
      { x: 446, y: 226 },
      { x: 470, y: 300 },
    ],
  },
];

export default function BrainViz() {
  const [aktiv, setAktiv] = useState(0);
  const [manuell, setManuell] = useState(false);

  /* Auto-Rotation, bis der Besucher selbst waehlt. Danach bleibt seine Wahl. */
  useEffect(() => {
    if (manuell) return;
    const t = setInterval(() => setAktiv((i) => (i + 1) % CLUSTER.length), 4200);
    return () => clearInterval(t);
  }, [manuell]);

  const c = CLUSTER[aktiv];

  return (
    <section style={{ background: "#0a0806", padding: "clamp(60px, 8vw, 100px) 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <p
          className="font-mono"
          style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: gold, marginBottom: 18 }}
        >
          Das ist ein Second Brain
        </p>
        <h2
          style={{
            fontFamily: "var(--font-instrument-serif), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 3.8vw, 48px)",
            lineHeight: 1.12,
            color: "#faf8f5",
            maxWidth: 780,
            marginBottom: 18,
          }}
        >
          Dein Wissen, endlich an einem Ort. Und durchsuchbar.
        </h2>
        <p style={{ fontSize: 16.5, color: "rgba(250,248,245,0.74)", lineHeight: 1.75, maxWidth: 620, marginBottom: 50 }}>
          Jeder Punkt hier ist eine Datei auf deinem Rechner. Eine Notiz, ein Angebot, ein
          Gesprächsprotokoll. Sobald sie zusammenliegen und verbunden sind, kann Claude sie lesen,
          statt dich zu fragen.
        </p>

        <div
          style={{
            display: "grid",
            gap: "clamp(28px, 4vw, 56px)",
            gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 1fr)",
            alignItems: "center",
          }}
          className="bv-grid"
        >
          {/* ── Das Gehirn ── */}
          <div style={{ position: "relative", minWidth: 0 }}>
            <svg viewBox="0 0 600 460" style={{ width: "100%", height: "auto", display: "block" }} role="img"
              aria-label="Ein Gehirn aus vernetzten Wissensknoten: Kundenwissen, Angebote und Content liegen als Dateien zusammen.">
              <defs>
                {/* Die Teile stehen direkt im clipPath, nicht als <use> auf eine
                    Gruppe: Chrome loest Gruppen-Referenzen in clipPath nicht auf
                    und wegklippt dann alles. */}
                <clipPath id="bv-clip">
                  {TEILE.map((d, i) => (
                    <path key={i} d={d} />
                  ))}
                </clipPath>
                <radialGradient id="bv-glow">
                  <stop offset="0%" stopColor={goldLight} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={goldLight} stopOpacity="0" />
                </radialGradient>
              </defs>

              <ellipse cx="332" cy="222" rx="290" ry="222" fill="url(#bv-glow)" />

              {/* Vereinigung: erst die Silhouette in Goldton mit dickem Stroke,
                  dann in Hintergrundfarbe ausstanzen. Uebrig bleibt eine Kontur
                  um die Aussenform, ohne Nahtlinien an den Ueberlappungen. */}
              <g>
                {TEILE.map((d, i) => (
                  <path key={`o${i}`} d={d} fill={gold} stroke={gold} strokeWidth="5" strokeLinejoin="round" />
                ))}
                {TEILE.map((d, i) => (
                  <path key={`k${i}`} d={d} fill="#0a0806" />
                ))}
              </g>
              <g opacity="0.06">
                {TEILE.map((d, i) => (
                  <path key={`t${i}`} d={d} fill={gold} />
                ))}
              </g>

              <g clipPath="url(#bv-clip)">
                {WINDUNGEN.map((d, i) => (
                  <path key={i} d={d} fill="none" stroke="rgba(184,150,62,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                ))}

                {/* Grundnetz: alle Verbindungen, ruhig */}
                {EDGES.map((e, i) => {
                  const an = NODES[e.a];
                  const bn = NODES[e.b];
                  const wach = an.cluster === aktiv && bn.cluster === aktiv;
                  return (
                    <line
                      key={i}
                      x1={an.x}
                      y1={an.y}
                      x2={bn.x}
                      y2={bn.y}
                      stroke={wach ? "rgba(212,174,90,0.55)" : "rgba(250,248,245,0.16)"}
                      strokeWidth={wach ? 1.1 : 0.6}
                      style={{ transition: "stroke 0.6s, stroke-width 0.6s" }}
                    />
                  );
                })}

                {/* Signalschicht: dieselben Kanten des aktiven Clusters noch
                    einmal, aber als kurzer Strich, der an ihnen entlangwandert.
                    Das laesst das Netz arbeiten statt nur zu leuchten.
                    Gestrichelte Linie + wandernder dashoffset ist billiger als
                    animierte Punkte und laeuft komplett auf der GPU. */}
                {EDGES.map((e, i) => {
                  const an = NODES[e.a];
                  const bn = NODES[e.b];
                  if (an.cluster !== aktiv || bn.cluster !== aktiv) return null;
                  return (
                    <line
                      key={`s${i}`}
                      x1={an.x}
                      y1={an.y}
                      x2={bn.x}
                      y2={bn.y}
                      stroke={goldLight}
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      pathLength={100}
                      className="bv-signal"
                      style={{ animationDelay: `${(i % 11) * 0.28}s` }}
                    />
                  );
                })}

                {NODES.map((n, i) => {
                  const on = n.cluster === aktiv;
                  return (
                    <circle
                      key={i}
                      cx={n.x}
                      cy={n.y}
                      r={on ? n.s * 1.5 : n.s}
                      fill={on ? goldLight : "rgba(250,248,245,0.74)"}
                      className={on ? "bv-pulse" : undefined}
                      style={{ transition: "fill 0.6s, r 0.6s", animationDelay: `${(i % 7) * 0.18}s` }}
                    />
                  );
                })}
              </g>

              {/* Marker am aktiven Cluster */}
              {c.punkte.map((p, i) => (
                <g key={`${c.key}-${i}`} className="bv-label" style={{ animationDelay: `${i * 0.09}s` }}>
                  <circle cx={p.x} cy={p.y} r="4.5" fill={goldLight} />
                  <circle cx={p.x} cy={p.y} r="11" fill="none" stroke={goldLight} strokeOpacity="0.4" strokeWidth="1" />
                </g>
              ))}
            </svg>
          </div>

          {/* ── Die Abfrage ── */}
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(184,150,62,0.28)",
                borderRadius: 5,
                padding: "clamp(22px, 2.6vw, 32px)",
              }}
            >
              <p
                className="font-mono"
                style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,248,245,0.64)", marginBottom: 14 }}
              >
                Du fragst
              </p>
              <p
                key={c.key}
                className="bv-fade"
                style={{
                  fontFamily: "var(--font-instrument-serif), Georgia, serif",
                  fontSize: "clamp(20px, 2.3vw, 26px)",
                  lineHeight: 1.35,
                  color: "#faf8f5",
                  marginBottom: 26,
                }}
              >
                „{c.frage}“
              </p>

              <p
                className="font-mono"
                style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: gold, marginBottom: 14 }}
              >
                Claude liest
              </p>
              <ul key={`${c.key}-l`} style={{ display: "grid", gap: 9, listStyle: "none", padding: 0, margin: 0 }}>
                {c.treffer.map((t, i) => (
                  <li
                    key={t}
                    className="bv-fade"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 11,
                      fontSize: 14.5,
                      color: "rgba(250,248,245,0.82)",
                      animationDelay: `${0.08 + i * 0.07}s`,
                    }}
                  >
                    <svg width="13" height="15" viewBox="0 0 14 16" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M2 1h6l4 4v10H2V1z" stroke={goldLight} strokeWidth="1.2" strokeLinejoin="round" />
                      <path d="M8 1v4h4" stroke={goldLight} strokeWidth="1.2" strokeLinejoin="round" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cluster-Wahl */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
              {CLUSTER.map((x, i) => (
                <button
                  key={x.key}
                  onClick={() => { setAktiv(i); setManuell(true); }}
                  className="font-mono"
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "9px 14px",
                    borderRadius: 2,
                    cursor: "pointer",
                    background: i === aktiv ? "rgba(212,174,90,0.16)" : "transparent",
                    border: `1px solid ${i === aktiv ? "rgba(212,174,90,0.5)" : "rgba(255,255,255,0.14)"}`,
                    color: i === aktiv ? goldLight : "rgba(250,248,245,0.76)",
                    transition: "all 0.25s",
                  }}
                >
                  {x.label}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 13.5, color: "rgba(250,248,245,0.62)", lineHeight: 1.6, marginTop: 16 }}>
              Kein Copy-Paste, kein „ich erkläre dir nochmal kurz den Kontext". Claude schaut selbst nach.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .bv-grid { grid-template-columns: minmax(0, 1fr) !important; }
        }
        @keyframes bv-fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes bv-pop { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: none; } }
        .bv-fade { animation: bv-fade-in 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .bv-label { animation: bv-pop 0.45s cubic-bezier(0.16,1,0.3,1) both; transform-origin: center; transform-box: fill-box; }
        @keyframes bv-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
        .bv-pulse { animation: bv-pulse 2.4s ease-in-out infinite; }

        /* Wanderndes Signal: ein kurzer Strich laeuft die Kante entlang.
           pathLength normiert jede Kante auf 100, damit lange und kurze
           Verbindungen gleich schnell "feuern". */
        @keyframes bv-flow {
          0%   { stroke-dashoffset: 100; opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .bv-signal {
          stroke-dasharray: 14 100;
          animation: bv-flow 2.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .bv-fade, .bv-label, .bv-pulse { animation: none !important; opacity: 1 !important; transform: none !important; }
          /* Signale komplett ausblenden: ein stehender Strich mitten auf der
             Kante saehe aus wie ein Zeichenfehler. Das Grundnetz traegt das
             Bild auch ohne sie. */
          .bv-signal { display: none; }
        }
      `}</style>
    </section>
  );
}
