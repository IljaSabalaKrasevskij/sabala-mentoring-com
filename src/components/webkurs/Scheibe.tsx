import type { CSSProperties } from "react";
import "./webkurs.css";

/* Die sechs Schichten als Zeichnungen. Einmal je Seite einbinden (<Motive />), danach zeigt jede Scheibe
   mit <use> auf ihr Motiv: Turm, Kacheln, Tafel und Karte benutzen dieselben sechs Zeichnungen. */

const GOLD = "#D4AE5A";

export function Motive() {
  return (
    <svg className="wk-motive" aria-hidden="true" focusable="false">
      <defs>
        {/* 1 Plan: Drahtmodell einer Seite */}
        <symbol id="wk-m1" viewBox="0 0 320 200">
          <g fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M204 22h22M238 22h22M272 22h28" opacity=".7" />
            <rect x="20" y="46" width="152" height="76" rx="6" />
            <path d="M36 68h92M36 84h112M36 100h64" opacity=".75" />
            <rect x="186" y="46" width="114" height="76" rx="6" />
            <path d="M186 46l114 76M300 46l-114 76" opacity=".5" />
            <rect x="20" y="136" width="86" height="44" rx="6" />
            <rect x="117" y="136" width="86" height="44" rx="6" />
            <rect x="214" y="136" width="86" height="44" rx="6" />
          </g>
          <g fill={GOLD}>
            <circle cx="38" cy="158" r="6" />
            <circle cx="135" cy="158" r="6" opacity=".6" />
            <circle cx="232" cy="158" r="6" opacity=".6" />
          </g>
        </symbol>
        {/* 2 Sektionen: gefüllte Blöcke */}
        <symbol id="wk-m2" viewBox="0 0 320 200">
          <g fill="#FAF8F5">
            <rect x="204" y="17" width="40" height="9" rx="4.5" opacity=".28" />
            <rect x="252" y="17" width="48" height="9" rx="4.5" opacity=".16" />
            <rect x="20" y="44" width="280" height="68" rx="8" opacity=".12" />
            <rect x="36" y="62" width="126" height="11" rx="5.5" opacity=".6" />
            <rect x="36" y="82" width="88" height="8" rx="4" opacity=".3" />
            <rect x="20" y="124" width="86" height="56" rx="8" opacity=".12" />
            <rect x="117" y="124" width="86" height="56" rx="8" opacity=".12" />
            <rect x="214" y="124" width="86" height="56" rx="8" opacity=".12" />
            <rect x="32" y="162" width="46" height="6" rx="3" opacity=".34" />
            <rect x="129" y="162" width="46" height="6" rx="3" opacity=".34" />
            <rect x="226" y="162" width="46" height="6" rx="3" opacity=".34" />
          </g>
          <rect x="216" y="66" width="68" height="24" rx="4" fill={GOLD} />
          <g fill={GOLD}>
            <rect x="32" y="136" width="18" height="18" rx="4" />
            <rect x="129" y="136" width="18" height="18" rx="4" opacity=".6" />
            <rect x="226" y="136" width="18" height="18" rx="4" opacity=".6" />
          </g>
        </symbol>
        {/* 3 Texte und Bilder: helle Seite mit Überschrift und Foto */}
        <symbol id="wk-m3" viewBox="0 0 320 200">
          <rect width="320" height="200" fill="#FAF8F5" />
          <image href="/akademie/webkurs/ilja.jpg" x="172" y="0" width="148" height="200" preserveAspectRatio="xMidYMin slice" />
          <text x="22" y="106" fontSize="31" fill="#2E2B26" style={{ fontFamily: "var(--font-instrument), Georgia, serif" }}>
            Deine Seite.
          </text>
          <g fill="#B5B0A8">
            <rect x="22" y="122" width="124" height="6" rx="3" />
            <rect x="22" y="134" width="110" height="6" rx="3" />
            <rect x="22" y="146" width="72" height="6" rx="3" />
          </g>
          <rect x="22" y="164" width="58" height="18" fill="#B8963E" />
        </symbol>
        {/* 4 Bewegung und Tempo: Bahnen und Abspielknopf */}
        <symbol id="wk-m4" viewBox="0 0 320 200">
          <g fill="none" stroke={GOLD} strokeLinecap="round">
            <path d="M40 152C92 62 172 44 282 72" strokeWidth="2.6" />
            <path d="M40 168C112 98 192 84 282 108" strokeWidth="1.6" opacity=".6" />
            <path d="M40 184C132 134 202 124 282 142" strokeWidth="1.2" opacity=".36" />
          </g>
          <circle cx="282" cy="72" r="8" fill={GOLD} />
          <circle cx="214" cy="62" r="4.4" fill={GOLD} opacity=".55" />
          <circle cx="152" cy="80" r="3.2" fill={GOLD} opacity=".3" />
          <circle cx="104" cy="88" r="24" fill="none" stroke="#FAF8F5" strokeOpacity=".2" strokeWidth="5" />
          <path d="M104 64a24 24 0 1 1-22.6 32.2" fill="none" stroke={GOLD} strokeWidth="5" strokeLinecap="round" />
          <path d="M98 79l15 9-15 9z" fill="#FAF8F5" />
        </symbol>
        {/* 5 Technik dahinter: Code-Zeilen und der Weg zur Domain */}
        <symbol id="wk-m5" viewBox="0 0 320 200">
          <g fill={GOLD}>
            <rect x="204" y="18" width="40" height="7" rx="3.5" opacity=".9" />
            <rect x="252" y="18" width="48" height="7" rx="3.5" opacity=".36" />
            <rect x="36" y="48" width="70" height="7" rx="3.5" opacity=".38" />
            <rect x="114" y="48" width="46" height="7" rx="3.5" opacity=".95" />
            <rect x="168" y="48" width="96" height="7" rx="3.5" opacity=".38" />
            <rect x="36" y="66" width="120" height="7" rx="3.5" opacity=".38" />
            <rect x="164" y="66" width="40" height="7" rx="3.5" opacity=".65" />
            <rect x="52" y="84" width="84" height="7" rx="3.5" opacity=".38" />
            <rect x="52" y="102" width="130" height="7" rx="3.5" opacity=".38" />
          </g>
          <path d="M52 154h216" stroke={GOLD} strokeWidth="1.8" fill="none" />
          <g fill="#15100b" stroke={GOLD} strokeWidth="1.8">
            <circle cx="52" cy="154" r="11" />
            <circle cx="124" cy="154" r="11" />
            <circle cx="196" cy="154" r="11" />
          </g>
          <circle cx="268" cy="154" r="12.5" fill={GOLD} />
        </symbol>
        {/* 6 Google und KI: Suchfeld, Treffer und strukturierte Daten */}
        <symbol id="wk-m6" viewBox="0 0 320 200">
          <rect x="92" y="14" width="156" height="28" rx="14" fill="none" stroke={GOLD} strokeWidth="1.8" />
          <circle cx="109" cy="27.5" r="5.5" fill="none" stroke={GOLD} strokeWidth="1.8" />
          <path d="M113 31.5l5 5" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" />
          <g fill={GOLD}>
            <rect x="36" y="68" width="112" height="10" rx="5" />
            <rect x="36" y="87" width="170" height="6" rx="3" opacity=".42" />
            <rect x="36" y="99" width="140" height="6" rx="3" opacity=".42" />
            <rect x="36" y="128" width="92" height="10" rx="5" opacity=".7" />
            <rect x="36" y="147" width="160" height="6" rx="3" opacity=".32" />
            <rect x="36" y="159" width="120" height="6" rx="3" opacity=".32" />
          </g>
          <text x="258" y="136" textAnchor="middle" fontSize="60" fill={GOLD} style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
            {"{ }"}
          </text>
        </symbol>
      </defs>
    </svg>
  );
}

export function Pfeil() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* Eine Scheibe: dunkles Glas mit goldenem Rand, Nummer oben links und dem Motiv der Schicht (1 bis 6).
   Schicht 3 ist die helle. Alle Maße hängen an der Breite, darum passt sie als Turm-Scheibe wie als Kachel. */
export default function Scheibe({ nr, className = "", style }: { nr: number; className?: string; style?: CSSProperties }) {
  return (
    <span className={`wk-scheibe${nr === 3 ? " wk-hell" : ""}${className ? ` ${className}` : ""}`} style={style}>
      <span className="wk-glas">
        <svg viewBox="0 0 320 200" aria-hidden="true">
          <use href={`#wk-m${nr}`} />
        </svg>
        <span className="wk-nr" aria-hidden="true">
          0{nr}
        </span>
      </span>
    </span>
  );
}
