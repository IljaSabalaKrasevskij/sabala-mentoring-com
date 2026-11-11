"use client";

import { useEffect, useState } from "react";
import Scheibe from "./Scheibe";
import { ANTWORT, SCHICHTEN } from "./daten";

/* Sechs Schichten: eine Reihe mit sechs Kacheln, darunter die Tafel zur gewählten Schicht.
   Hier landen die sechs Scheiben aus dem Kopf. Darum bewegt sich in diesem Abschnitt beim Laden nichts:
   Der Kopf zeigt am Ende seines Films eine verkleinerte Kopie davon, und beide müssen gleich aussehen.
   Alle sechs Tafeln stehen im HTML, fünf sind nur ausgeblendet: Suchmaschinen und KI-Systeme lesen kein JavaScript. */
export default function Schichten() {
  const [aktiv, setAktiv] = useState(0);
  /* Nach jedem Wechsel bekommt der Kopf Bescheid und zieht seine Kopie neu. */
  useEffect(() => {
    window.dispatchEvent(new Event("wk:schichten"));
  }, [aktiv]);

  return (
    <section className="wk-schichten" id="schichten">
      <div className="wk-innen">
        <div className="wk-schichten-kopf">
          <div>
            <p className="wk-zeile2">Sechs Schichten</p>
            <h2 className="wk-h2">
              Atemberaubend ist kein Zufall. <span>Es sind sechs Schichten.</span>
            </h2>
          </div>
          {/* Antwort in Kurzform: wer, was, für wen. Diesen Absatz zitieren Suchmaschinen und KI-Assistenten. */}
          <p className="wk-lauf">{ANTWORT}</p>
        </div>

        <div className="wk-kacheln">
          {SCHICHTEN.map((s, i) => (
            <button key={s.name} type="button" className="wk-kachel" aria-pressed={i === aktiv} onClick={() => setAktiv(i)}>
              <Scheibe nr={i + 1} />
              <span className="wk-kachel-name">
                <small>0{i + 1}</small>
                {s.name}
              </span>
            </button>
          ))}
        </div>

        <div aria-live="polite">
          {SCHICHTEN.map((s, i) => (
            <div key={s.name} className="wk-tafel" hidden={i !== aktiv}>
              <Scheibe nr={i + 1} />
              <div>
                <small>Woche {i + 1}</small>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
                <p className="wk-skills-titel">Skills dieser Woche</p>
                <ul className="wk-skills">
                  {s.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
                <p className="wk-skills-was">Skills sind fertige Anleitungen, nach denen Claude arbeitet.</p>
              </div>
            </div>
          ))}
        </div>
        {/* Ohne JavaScript lassen sich die Kacheln nicht antippen: Dann stehen alle sechs Tafeln untereinander. */}
        <noscript>
          <style>{".wk-tafel[hidden]{display:grid!important}"}</style>
        </noscript>
      </div>
    </section>
  );
}
