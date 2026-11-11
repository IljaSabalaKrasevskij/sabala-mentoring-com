import Link from "next/link";
import Scheibe, { Motive, Pfeil } from "@/components/webkurs/Scheibe";
import { KURS_PFAD, SCHICHTEN } from "@/components/webkurs/daten";

/* Karte auf der Übersichtsseite: kündigt den Kurs „Webseiten bauen mit Claude Code“ an und führt auf seine Seite
   mit der Warteliste. Steht direkt über dem Newsletter. Der Anker #webseiten-kurs gehört hierher. */
export default function WebkursKarte() {
  return (
    <section id="webseiten-kurs" className="wk wk-karte-abschnitt">
      <Motive />
      <div className="wk-karte wk-dunkel">
        <div>
          <p className="wk-zeile">
            <span className="wk-punkt" aria-hidden="true" />
            Neuer Kurs in Vorbereitung
          </p>
          <h2 className="wk-h2">
            Webseiten bauen mit Claude Code. <span>Die Warteliste ist offen.</span>
          </h2>
          <p className="wk-lauf">In sechs Wochen baust du deine eigene Webseite und stellst sie live. Sichtbar bei Google und in KI-Antworten.</p>
          <Link className="wk-knopf wk-haupt" href={KURS_PFAD}>
            <span>Zur Kursseite</span>
            <Pfeil />
          </Link>
        </div>
        <ul className="wk-karte-bild" aria-hidden="true">
          {SCHICHTEN.map((s, i) => (
            <li key={s.name}>
              <Scheibe nr={i + 1} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
