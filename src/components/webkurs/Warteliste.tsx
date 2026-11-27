"use client";

import { useId, useState } from "react";
import Einwilligung, { bestaetigungsHinweis } from "@/components/formular/Einwilligung";
import Telefon, { FeldMeldung } from "@/components/formular/Telefon";
import { EINWILLIGUNG_VERSION } from "@/lib/einwilligung-text";
import { formularBeruehrt, formularSenden } from "@/lib/formular-senden";
import { Pfeil } from "./Scheibe";
import { WEBKURS_PREIS_TEXT } from "./daten";

/* ─────────────────────────────────────────────────────────────────────────
   Warteliste für den Webseiten-Kurs: das Formular als Glasscheibe, wie die Scheiben im Kopf.
   Vorname, Nachname, E-Mail, Telefon und das Häkchen für Mails, alles Pflicht (die Mail ist der Zweck).
   Geht an /api/akademie-newsletter mit warteliste: "webkurs": eigene Quelle im CRM, eigener Tag im
   Newsletter-Werkzeug. Danach kommt eine Bestätigungsmail, erst der Klick darin zählt.
   Der Anker #warteliste ist das Ziel aller Knöpfe „Auf die Warteliste“.
   ───────────────────────────────────────────────────────────────────────── */

type Status = "idle" | "loading" | "success" | "error" | "unconfigured";

const FAKTEN = ["Du erfährst den Termin zuerst.", "Live per Zoom, in kleiner Gruppe.", `${WEBKURS_PREIS_TEXT} netto je Platz, zzgl. MwSt.`];

function Haken({ gross = false }: { gross?: boolean }) {
  return (
    <svg width={gross ? 24 : 20} height={gross ? 24 : 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function Warteliste() {
  const id = useId();
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [einwilligung, setEinwilligung] = useState(false);
  const [fax, setFax] = useState(""); // unsichtbares Feld gegen Roboter
  const [status, setStatus] = useState<Status>("idle");
  const [meldung, setMeldung] = useState<{ feld: string; text: string }>(); // der Server beanstandet ein Feld
  const tippt = () => { if (status !== "idle") setStatus("idle"); };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    const r = await formularSenden("/api/akademie-newsletter", { warteliste: "webkurs", vorname, nachname, email, telefon, einwilligung, einwilligungVersion: EINWILLIGUNG_VERSION, fax });
    if (r.art === "eingabe") setMeldung({ feld: r.feld, text: r.meldung });
    setStatus(r.art === "ok" ? "success" : r.art === "eingabe" ? "idle" : r.art === "fehlt" ? "unconfigured" : "error");
  }

  return (
    <section className="wk-warte wk-dunkel" id="warteliste">
      <div className="wk-innen">
        <div className="wk-warte-scheibe">
          <div>
            <p className="wk-zeile2">Warteliste</p>
            <h2 className="wk-h2">
              Sei dabei, wenn es losgeht. <span>Die Warteliste erfährt den Termin zuerst.</span>
            </h2>
            <ul className="wk-fakten">
              {FAKTEN.map((fakt) => (
                <li key={fakt}>
                  <Haken />
                  {fakt}
                </li>
              ))}
            </ul>
            <p className="wk-klein">Der Termin steht noch nicht fest. Eintragen verpflichtet dich zu nichts.</p>
          </div>

          <div>
            {status === "success" ? (
              <p className="wk-fertig" role="status">
                <Haken gross />
                <span>Fast geschafft. {bestaetigungsHinweis("gesendet")}</span>
              </p>
            ) : (
              <form className="wk-form" onSubmit={submit} onFocus={formularBeruehrt} onInput={() => setMeldung(undefined)}>
                <p className="wk-form-titel wk-ganz">Dein Platz auf der Warteliste</p>
                <input
                  type="text"
                  name="fax"
                  value={fax}
                  onChange={(e) => setFax(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                />
                <input className="wk-feld" type="text" required value={vorname} onChange={(e) => { setVorname(e.target.value); tippt(); }} placeholder="Vorname" aria-label="Vorname" autoComplete="given-name" />
                <input className="wk-feld" type="text" required value={nachname} onChange={(e) => { setNachname(e.target.value); tippt(); }} placeholder="Nachname" aria-label="Nachname" autoComplete="family-name" />
                <input className="wk-feld wk-ganz" type="email" required value={email} onChange={(e) => { setEmail(e.target.value); tippt(); }} placeholder="deine@email.de" aria-label="E-Mail-Adresse" autoComplete="email" />
                <Telefon onChange={(t) => { setTelefon(t); tippt(); }} fehler={meldung?.feld === "telefon" ? meldung.text : undefined} className="wk-feld" huelle="wk-ganz" />
                <div className="wk-ganz" style={{ padding: "4px 0" }}>
                  <Einwilligung id={`${id}-mails`} an={einwilligung} setAn={(an) => { setEinwilligung(an); tippt(); }} pflicht />
                </div>
                <FeldMeldung meldung={meldung} className="wk-ganz" />
                <button type="submit" className="wk-knopf wk-haupt wk-ganz" disabled={status === "loading"}>
                  <span>{status === "loading" ? "Moment …" : "Auf die Warteliste"}</span>
                  {status !== "loading" && <Pfeil />}
                </button>
                {(status === "error" || status === "unconfigured") && (
                  <p className="wk-form-fehler wk-ganz" role="alert">
                    {status === "unconfigured"
                      ? "Die Anmeldung ist gleich startklar. Schreib mir solange direkt an ilja@sabala-mentoring.com."
                      : "Das hat gerade nicht geklappt. Versuch es bitte noch einmal."}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
