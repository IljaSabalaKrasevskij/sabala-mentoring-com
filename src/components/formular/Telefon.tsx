"use client";

import { useId, useState, useSyncExternalStore } from "react";

/* Telefonfeld für alle Formulare auf dunklem Grund: links die Ländervorwahl zum Auswählen, rechts die Nummer. Pflicht.
   Nach außen geht eine Zeichenkette mit Vorwahl („+49 01520 4817263“). Ob es die Nummer gibt, prüft der Server
   (src/lib/telefon.ts) und schickt die Meldung zurück. Sie steht dann unter dem Feld.

   Die Vorwahl steht sichtbar neben der Nummer: Eine österreichische Nummer hinter +49 kann zufällig gültig sein.
   Vorgabe nach Browser-Sprache (de-AT → +43, de-CH → +41), sonst Deutschland.

   Die Auswahl ist ein echtes <select>, unsichtbar über dem Kästchen mit der Vorwahl. So öffnet sich am Handy die
   gewohnte Liste des Geräts, und das Kästchen bleibt schmal.
   ponytail: kurze Liste der Länder, aus denen Anfragen kommen. „Anderes Land“ lässt jede Vorwahl von Hand zu. */

const LAENDER = [
  ["+49", "Deutschland"],
  ["+43", "Österreich"],
  ["+41", "Schweiz"],
  ["+423", "Liechtenstein"],
  ["+352", "Luxemburg"],
  ["+39", "Italien"],
  ["+31", "Niederlande"],
  ["+32", "Belgien"],
  ["+33", "Frankreich"],
  ["+34", "Spanien"],
  ["+45", "Dänemark"],
  ["+48", "Polen"],
  ["+44", "Vereinigtes Königreich"],
  ["+1", "USA und Kanada"],
  ["+995", "Georgien"],
  ["", "Anderes Land"],
] as const;

const NACH_REGION: Record<string, string> = { AT: "+43", CH: "+41", LI: "+423", LU: "+352" };
const nieNeu = () => () => {};

/** Was an den Server geht. Wer die Vorwahl selbst tippt (+43 … oder 0043 …), hat recht. */
const zusammen = (vorwahl: string, nummer: string) => {
  const n = nummer.trim();
  return !vorwahl || /^(\+|00)/.test(n) ? n : `${vorwahl} ${n}`;
};

export default function Telefon({ onChange, fehler, className = "", style, huelle, huelleStil, eingabe }: {
  onChange: (nummerMitVorwahl: string) => void;
  fehler?: string;
  /** Aussehen der beiden Kästchen: dieselben Klassen und Stile wie die anderen Felder des Formulars. */
  className?: string;
  style?: React.CSSProperties;
  /** Platz im Raster des Formulars. */
  huelle?: string;
  huelleStil?: React.CSSProperties;
  /** Zusätze fürs Nummernfeld, etwa onFocus und onBlur für den Rand. */
  eingabe?: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  const id = useId();
  // Auf dem Server und beim ersten Zeichnen im Browser gilt Deutschland, danach die Sprache des Browsers. So passt beides zusammen.
  const sprache = useSyncExternalStore(nieNeu, () => navigator.language, () => "de-DE");
  const vorgabe = NACH_REGION[sprache.split("-")[1]?.toUpperCase() ?? ""] ?? "+49";
  const [gewaehlt, setGewaehlt] = useState<string>();
  const [nummer, setNummer] = useState("");
  const vorwahl = gewaehlt ?? vorgabe;

  return (
    <div className={huelle} style={{ minWidth: 0, ...huelleStil }}>
      <div style={{ display: "flex", gap: 8 }}>
        <span style={{ position: "relative", flex: "none", display: "flex" }}>
          <select
            aria-label="Ländervorwahl"
            autoComplete="tel-country-code"
            value={vorwahl}
            onChange={(e) => { setGewaehlt(e.target.value); onChange(zusammen(e.target.value, nummer)); }}
            className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
          >
            {LAENDER.map(([code, land]) => (
              // Farben fest: Sonst erbt die Liste unter Windows die helle Schrift des dunklen Formulars auf weißem Grund.
              <option key={land} value={code} style={{ color: "#1a1814", background: "#ffffff" }}>
                {land}{code && ` (${code})`}
              </option>
            ))}
          </select>
          <span
            aria-hidden
            className={`${className} peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-light`}
            style={{ ...style, display: "flex", alignItems: "center", gap: 6, width: "auto", minWidth: 44, whiteSpace: "nowrap" }}
          >
            {vorwahl || "+ …"}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", opacity: 0.75 }}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </span>
        <input
          type="tel"
          inputMode="tel"
          required
          value={nummer}
          onChange={(e) => { setNummer(e.target.value); onChange(zusammen(vorwahl, e.target.value)); }}
          placeholder={vorwahl ? "Telefonnummer" : "+ Vorwahl und Nummer"}
          aria-label="Telefonnummer"
          aria-invalid={fehler ? true : undefined}
          aria-describedby={fehler ? `${id}-fehler` : undefined}
          autoComplete="tel-national"
          className={className}
          {...eingabe}
          style={{ ...style, flex: "1 1 0", minWidth: 0 }}
        />
      </div>
      {fehler && (
        <p id={`${id}-fehler`} role="alert" style={{ marginTop: 8, fontSize: 15, lineHeight: 1.45, color: "#F0B48A", textAlign: "left" }}>
          {fehler}
        </p>
      )}
    </div>
  );
}

/** Meldung für alle anderen Felder: steht über dem Knopf. Die fürs Telefon zeigt das Telefonfeld selbst. */
export function FeldMeldung({ meldung, className, style }: { meldung?: { feld: string; text: string }; className?: string; style?: React.CSSProperties }) {
  if (!meldung || meldung.feld === "telefon") return null;
  return (
    <p role="alert" className={className} style={{ fontSize: 15, lineHeight: 1.45, color: "#F0B48A", textAlign: "left", ...style }}>
      {meldung.text}
    </p>
  );
}
