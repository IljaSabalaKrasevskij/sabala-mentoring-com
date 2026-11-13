import Link from "next/link";
import Scheibe, { Motive, Pfeil } from "@/components/webkurs/Scheibe";
import { KOPF_ZEILE_1, KOPF_ZEILE_2, KURS_PFAD, SCHICHTEN } from "@/components/webkurs/daten";

/* Karte für den Kurs „Webseiten bauen mit Claude Code“. Auf der Übersichtsseite steht sie direkt über dem Newsletter und führt
   auf die Kursseite. Auf der Startseite (`startseite`, seit 12.11.2026) trägt sie die Überschrift der Kursseite und die Eckdaten
   und führt direkt zum Formular der Warteliste. Der Anker #webseiten-kurs gehört hierher. */
export default function WebkursKarte({ startseite = false }: { startseite?: boolean }) {
  return (
    <section id="webseiten-kurs" className={startseite ? "wk wk-karte-abschnitt wk-karte-start" : "wk wk-karte-abschnitt"}>
      <Motive />
      <div className="wk-karte wk-dunkel">
        <div>
          <p className="wk-zeile">
            <span className="wk-punkt" aria-hidden="true" />
            <span>{startseite ? "Neuer Live-Kurs · Warteliste offen" : "Neuer Live-Kurs · Webseiten bauen mit Claude Code"}</span>
          </p>
          <h2 className="wk-h2">
            {startseite ? KOPF_ZEILE_1 : "KI-Webdesign wie die Profis."} <span>{startseite ? KOPF_ZEILE_2 : "Die Warteliste ist offen."}</span>
          </h2>
          <p className="wk-lauf">
            {startseite
              ? "Du baust mit Claude Code deine eigene Webseite, von der Idee bis zum Launch, mit SEO, GEO und Hosting. Skills und Code-Bibliothek bekommst du dazu."
              : "In sechs Wochen baust du mit Claude Code deine eigene Webseite und stellst sie live. Skills und Code-Bibliothek bekommst du dazu."}
          </p>
          {startseite && <p className="wk-karte-fakten">Sechs Live-Workshops · kleine Gruppe · Termin folgt</p>}
          <Link className="wk-knopf wk-haupt" href={startseite ? `${KURS_PFAD}#warteliste` : KURS_PFAD}>
            <span>{startseite ? "Auf die Warteliste" : "Zur Kursseite"}</span>
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
