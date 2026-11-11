import Scheibe, { Pfeil } from "./Scheibe";
import { FRAGEN, KOPF_ZEILE_1, KOPF_ZEILE_2, KURS_NAME, KURS_PFAD, RAHMEN, SCHICHTEN, SEITEN_BESCHREIBUNG, SEITEN_TITEL, WEBKURS_PREIS_TEXT } from "./daten";

/* Die ruhigen Abschnitte der Ankündigungsseite. Sie kommen ohne JavaScript aus. */

/* Google und KI: umschalten zwischen dem, was Menschen sehen, und dem, was Maschinen lesen.
   Zwei Auswahlknöpfe und CSS (webkurs.css), kein JavaScript. Die rechte Ansicht zeigt die echten Angaben dieser Seite. */
export function MaschinenBlick() {
  return (
    <section className="wk-blick wk-dunkel">
      <div className="wk-innen">
        <div>
          <p className="wk-zeile2">Google und KI</p>
          <h2 className="wk-h2">
            Die Hälfte einer Webseite sieht kein Mensch. <span>Google und KI lesen genau diese Hälfte.</span>
          </h2>
          <p className="wk-lauf">Schalte um und sieh, was eine Suchmaschine von dieser Seite liest. Im Kurs baust du beide Hälften.</p>
        </div>

        <div className="wk-blick-wahl" role="radiogroup" aria-label="Ansicht dieser Seite">
          <input type="radio" name="wk-blick" id="wk-blick-mensch" defaultChecked />
          <input type="radio" name="wk-blick" id="wk-blick-maschine" />
          <div className="wk-blick-reiter">
            <label htmlFor="wk-blick-mensch">Was du siehst</label>
            <label htmlFor="wk-blick-maschine">Was Google und KI lesen</label>
          </div>

          <div className="wk-blick-flaeche wk-blick-mensch">
            <div className="wk-blick-leiste" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>sabala-mentoring.com{KURS_PFAD}</span>
            </div>
            <div className="wk-blick-bild">
              <strong>
                {KOPF_ZEILE_1} <span>{KOPF_ZEILE_2}</span>
              </strong>
              <ul aria-hidden="true">
                {SCHICHTEN.map((s, i) => (
                  <li key={s.name}>
                    <Scheibe nr={i + 1} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="wk-blick-flaeche wk-blick-maschine">
            <div className="wk-blick-leiste" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>Das liest eine Maschine</span>
            </div>
            <dl className="wk-blick-daten">
              <div>
                <dt>Titel</dt>
                <dd>{SEITEN_TITEL} · Sabala Studios</dd>
              </div>
              <div>
                <dt>Beschreibung</dt>
                <dd>{SEITEN_BESCHREIBUNG}</dd>
              </div>
              <div>
                <dt>Überschrift</dt>
                <dd>
                  {KOPF_ZEILE_1} {KOPF_ZEILE_2}
                </dd>
              </div>
              <div>
                <dt>Gliederung</dt>
                <dd>Eine Hauptüberschrift, fünf Abschnitte mit eigener Überschrift</dd>
              </div>
              <div>
                <dt>Kurs-Daten</dt>
                <dd>
                  {KURS_NAME} · sechs Wochen · vier Plätze · {WEBKURS_PREIS_TEXT} netto
                </dd>
              </div>
              <div>
                <dt>Fragen</dt>
                <dd>{FRAGEN.length} Fragen mit Antworten, als Daten für Suchmaschinen</dd>
              </div>
              <div>
                <dt>Für KI</dt>
                <dd>Eintrag in llms.txt, dem Wegweiser für KI-Assistenten</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Der Rahmen: Ablauf, Gruppe und Preis als Datenblatt. */
export function Rahmen() {
  return (
    <section className="wk-rahmen" id="rahmen">
      <div className="wk-innen">
        <div>
          <p className="wk-zeile2">Der Rahmen</p>
          <h2 className="wk-h2">
            Sechs Wochen, eine Seite. <span>Am Ende ist sie live.</span>
          </h2>
          <p className="wk-lauf">Du arbeitest von der ersten Woche an deiner eigenen Seite. Jede Woche kommt eine Schicht dazu.</p>
          <a className="wk-knopf wk-haupt" href="#warteliste">
            <span>Auf die Warteliste</span>
            <Pfeil />
          </a>
        </div>

        <dl className="wk-blattchen">
          {RAHMEN.map(([stichwort, angabe]) => (
            <div key={stichwort}>
              <dt>{stichwort}</dt>
              <dd>{angabe}</dd>
            </div>
          ))}
          {/* Nettopreis: Die Akademie richtet sich an Unternehmen, der Hinweis darunter trägt die Auszeichnung. */}
          <div className="wk-preis">
            <dt>Preis</dt>
            <dd>
              <strong>{WEBKURS_PREIS_TEXT}</strong>
              <small>je Platz, netto zzgl. MwSt. · für Unternehmen und Selbständige</small>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

/* Fragen: aufklappbar mit <details>, ohne JavaScript. Dieselben Fragen stehen in den maschinenlesbaren Angaben der Seite. */
export function Fragen() {
  return (
    <section className="wk-fragen" id="fragen">
      <div className="wk-innen">
        <p className="wk-zeile2">Fragen</p>
        <h2 className="wk-h2">
          Was du vorher <span>wissen willst.</span>
        </h2>
        <div className="wk-fragen-liste">
          {FRAGEN.map(([frage, antwort]) => (
            <details key={frage}>
              <summary>{frage}</summary>
              <p>{antwort}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
