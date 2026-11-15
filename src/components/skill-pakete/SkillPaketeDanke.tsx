"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Copy, Download } from "lucide-react";
import { ALLE_PAKETE, BERUFE, berufVon, paketVon, wahlLesen, wahlQuery, type BerufId } from "./daten";
import { SYMBOL } from "./symbole";
import s from "./danke.module.css";

/* Dankeseite der Skill-Pakete, unter dem Kopf (Ankunft): die Pakete aus dem Link, je mit Download, und die Anleitung
   „Dein Setup als …“ mit Reihenfolge, Textbaustein für Claude und drei ersten Aufträgen.
   Die Wahl steht im Link der Bestätigungsmail (pakete, beruf). Gelesen werden nur feste Kürzel (wahlLesen), ohne Link gelten alle sechs.
   Die Seite bleibt statisch: Die Wahl liest erst der Browser. Bis dahin steht nur der Kopf, darum springt nichts von „alle“ auf „zwei“. */

const ohneAbo = () => () => {};
const ZAHL = ["", "ein", "zwei", "drei", "vier", "fünf", "sechs"];
const zip = (id: string) => `/downloads/skill-pakete/${id}.zip`;

export default function SkillPaketeDanke() {
  const suche = useSyncExternalStore(ohneAbo, () => window.location.search, () => null);
  // undefined: das Setup aus dem Link. Ein Klick auf einen Beruf wählt ein anderes.
  const [gewaehlt, setGewaehlt] = useState<BerufId | null | undefined>(undefined);
  const [kopiert, setKopiert] = useState(false);
  if (suche === null) return <div className={s.platzhalter} aria-hidden />;

  const q = new URLSearchParams(suche);
  const wahl = wahlLesen(q.get("pakete"), q.get("beruf"));
  const beruf = gewaehlt === undefined ? wahl.beruf : gewaehlt;
  const b = beruf ? berufVon(beruf) : null;
  const n = wahl.pakete.length;
  const alle = n === ALLE_PAKETE.length;

  const waehle = (id: BerufId) => {
    setGewaehlt(id);
    setKopiert(false);
    // Die Adresse merkt sich die Wahl: Neu laden oder als Lesezeichen zeigt dasselbe Setup.
    history.replaceState(null, "", `?${wahlQuery({ pakete: wahl.pakete, beruf: id })}`);
  };
  const kopieren = async () => {
    if (!b) return;
    try {
      await navigator.clipboard.writeText(b.anleitung.baustein);
      setKopiert(true);
    } catch {
      setKopiert(false);
    }
  };

  return (
    <>
      <section aria-labelledby="deine-pakete" className={s.breit}>
        <h2 id="deine-pakete" className={s.zeile}>
          {n === 1 ? "Dein Paket" : alle ? "Deine sechs Pakete" : `Deine ${ZAHL[n]} Pakete`}
        </h2>
        <ul className={s.pakete} style={{ maxWidth: n === 1 ? "30rem" : n === 2 || n === 4 ? "46rem" : undefined }}>
          {wahl.pakete.map((id) => {
            const p = paketVon(id);
            const Symbol = SYMBOL[id];
            return (
              <li key={id} className={s.paket} style={{ "--farbe": p.farbe } as React.CSSProperties}>
                <div className={s.paketKopf}>
                  <Symbol aria-hidden size={24} strokeWidth={1.8} className={s.symbol} />
                  <h3 className={s.paketName}>{p.name}</h3>
                </div>
                <p className={s.claim}>{p.claim}</p>
                <ul className={s.skills} aria-label="Die drei Skills">
                  {p.skills.map((k) => (
                    <li key={k.ordner}>{k.titel}</li>
                  ))}
                </ul>
                <a href={zip(id)} download className={s.laden} data-umami-event="download" data-umami-event-datei={`skill-pakete/${id}.zip`}>
                  <Download aria-hidden size={18} strokeWidth={2.2} /> {n === 1 ? "Paket herunterladen" : `${p.kurz} herunterladen`}
                </a>
              </li>
            );
          })}
        </ul>
        {alle && (
          <p className={s.alleZeile}>
            <a href={zip("alle")} download className={s.knopf} data-umami-event="download" data-umami-event-datei="skill-pakete/alle.zip">
              <Download aria-hidden size={19} strokeWidth={2.2} /> Alle sechs als ein Ordner
            </a>
          </p>
        )}
        <p className={s.hinweis}>Öffne in jedem Paket zuerst „00 Start hier“. Wie du die Skills einrichtest, steht in „01 Installation“.</p>
      </section>

      <section aria-labelledby="dein-setup" className={s.breit}>
        <h2 id="dein-setup" className={s.zeile}>Dein Setup</h2>
        <div role="group" aria-label="Beruf wählen" className={s.berufe}>
          {BERUFE.map((x) => (
            <button key={x.id} type="button" aria-pressed={x.id === beruf} onClick={() => waehle(x.id)} className={s.beruf}>
              {x.name}
            </button>
          ))}
        </div>

        {b ? (
          <div className={s.setup}>
            <h3 className={s.setupTitel}>
              Dein Setup als <em>{b.als}</em>
            </h3>
            <ol className={s.reihe}>
              {b.setup.map((x, i) => {
                const p = paketVon(x.paket);
                const Symbol = SYMBOL[x.paket];
                const fehlt = !wahl.pakete.includes(x.paket);
                return (
                  <li key={x.paket} className={s.schritt}>
                    <span className={s.nr} aria-hidden>{i + 1}</span>
                    <div>
                      <div className={s.schrittName}>
                        <Symbol aria-hidden size={18} strokeWidth={1.9} className={s.symbol} /> {p.name}
                        {fehlt && (
                          <a href={zip(x.paket)} download className={s.nachladen} data-umami-event="download" data-umami-event-datei={`skill-pakete/${x.paket}.zip`}>
                            Paket holen
                          </a>
                        )}
                      </div>
                      <p className={s.schrittSatz}>{x.satz}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className={s.bausteinKopf}>
              <h4 className={s.unterTitel}>Textbaustein für Claude</h4>
              <button type="button" onClick={kopieren} className={s.kopieren}>
                {kopiert ? <Check aria-hidden size={17} strokeWidth={2.4} /> : <Copy aria-hidden size={17} strokeWidth={2.2} />}
                {kopiert ? "Kopiert" : "Kopieren"}
              </button>
            </div>
            <pre className={s.baustein}>{b.anleitung.baustein}</pre>
            <p className={s.erklaerung}>
              In Claude Code gehört er in die Datei CLAUDE.md in deinem Projektordner, in der Claude-App in die Anweisungen deines Projekts. Was in eckigen
              Klammern steht, füllst du selbst aus.
            </p>

            <h4 className={s.unterTitel}>Deine ersten drei Aufträge</h4>
            <ol className={s.auftraege}>
              {b.anleitung.aufgaben.map((a) => (
                <li key={a}>„{a}“</li>
              ))}
            </ol>
          </div>
        ) : (
          <p className={s.hinweis}>Wähl deinen Beruf. Dann siehst du, welche Pakete du in welcher Reihenfolge einrichtest, einen Textbaustein für Claude und drei erste Aufträge.</p>
        )}
      </section>
    </>
  );
}

