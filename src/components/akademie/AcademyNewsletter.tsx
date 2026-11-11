"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";
import Einwilligung, { bestaetigungsHinweis } from "@/components/formular/Einwilligung";
import Telefon, { FeldMeldung } from "@/components/formular/Telefon";
import { EINWILLIGUNG_VERSION } from "@/lib/einwilligung-text";
import { formularBeruehrt, formularSenden } from "@/lib/formular-senden";
import { Eyebrow, Reveal, TEXT_AUF_DUNKEL } from "./shared";

/* ─────────────────────────────────────────────────────────────────────────
   AcademyNewsletter — „Bleib auf dem Laufenden"
   Anmeldung am Ende der Übersichtsseite: Vorname, Nachname, E-Mail, Telefon
   und das Häkchen für Mails, alles Pflicht. Danach kommt eine Bestätigungsmail,
   erst der Klick darin zählt. Graceful Fallback, wenn das Backend noch nicht steht.
   Links daneben stehen die Kurse in Vorbereitung: Wer darauf wartet, trägt sich hier ein.
   Der Anker #newsletter ist das Ziel der Stufe 3 in AcademyLevels.
   ───────────────────────────────────────────────────────────────────────── */

type Status = "idle" | "loading" | "success" | "error" | "unconfigured";

/* Kurse in Vorbereitung, noch ohne Termin und Preis. */
const BALD = ["Webseite mit KI bauen", "KI-Automation", "Content-System mit KI"];

const FELD =
  "min-h-[52px] w-full min-w-0 rounded-sm border border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.06)] px-4 text-[1rem] text-cream outline-none transition-colors placeholder:text-[rgba(250,248,245,0.55)] focus:border-gold-light";

export default function AcademyNewsletter() {
  const id = useId();
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [einwilligung, setEinwilligung] = useState(false);
  const [fax, setFax] = useState(""); // Honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [meldung, setMeldung] = useState<{ feld: string; text: string }>(); // der Server beanstandet ein Feld
  const tippt = () => { if (status !== "idle") setStatus("idle"); };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    const r = await formularSenden("/api/akademie-newsletter", { vorname, nachname, email, telefon, einwilligung, einwilligungVersion: EINWILLIGUNG_VERSION, fax });
    if (r.art === "eingabe") setMeldung({ feld: r.feld, text: r.meldung });
    setStatus(r.art === "ok" ? "success" : r.art === "eingabe" ? "idle" : r.art === "fehlt" ? "unconfigured" : "error");
  }

  return (
    <section id="newsletter" className="relative px-6 py-[8vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div
            className="relative grid items-center gap-x-14 gap-y-8 overflow-hidden rounded-2xl p-7 sm:p-10 min-[56.25rem]:grid-cols-2 min-[56.25rem]:p-12"
            style={{ background: "linear-gradient(135deg, rgba(212,174,90,0.12) 0%, rgba(16,12,7,0.96) 60%)", border: "1px solid rgba(212,174,90,0.35)" }}
          >
            {/* Lichtschein */}
            <div aria-hidden className="pointer-events-none absolute right-[-10%] top-[-40%] h-[500px] w-[500px]" style={{ background: "radial-gradient(ellipse at center, rgba(212,174,90,0.12) 0%, rgba(212,174,90,0) 70%)" }} />

            <div className="relative">
              <Eyebrow center={false}>Akademie-Newsletter</Eyebrow>
              <h2 className="mt-4 text-balance font-serif text-cream" style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.7rem)", lineHeight: 1.1 }}>
                Neue Kurse und KI-Tipps direkt per Mail.
              </h2>
              <p className="mt-6 font-mono text-[12.5px] uppercase tracking-[0.16em] text-gold-light">In Vorbereitung</p>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {BALD.map((kurs) => (
                  <li key={kurs} className="rounded-full px-3.5 py-1.5 text-[0.95rem] text-cream" style={{ border: "1px solid rgba(250,248,245,0.22)", background: "rgba(250,248,245,0.05)" }}>
                    {kurs}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <p className="text-[1.04rem] leading-relaxed" style={{ color: TEXT_AUF_DUNKEL }}>
                Trag dich ein und erfahre als Erster, wann neue Termine und Themen starten. Kein Spam, nur die Akademie.
              </p>

              {status === "success" ? (
                <p className="mt-5 flex items-center gap-3.5 rounded-sm px-5 py-4 text-[1rem] leading-snug text-cream" style={{ background: "rgba(212,174,90,0.10)", border: "1px solid rgba(212,174,90,0.35)" }}>
                  <Check aria-hidden size={22} strokeWidth={2} className="shrink-0 text-gold-light" />
                  Fast geschafft. {bestaetigungsHinweis("gesendet")}
                </p>
              ) : (
                <form onSubmit={submit} onFocus={formularBeruehrt} onInput={() => setMeldung(undefined)} className="mt-5 grid gap-3 sm:grid-cols-2">
                  {/* Honeypot */}
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
                  <input
                    type="text"
                    required
                    value={vorname}
                    onChange={(e) => { setVorname(e.target.value); tippt(); }}
                    placeholder="Vorname"
                    aria-label="Vorname"
                    autoComplete="given-name"
                    className={FELD}
                  />
                  <input
                    type="text"
                    required
                    value={nachname}
                    onChange={(e) => { setNachname(e.target.value); tippt(); }}
                    placeholder="Nachname"
                    aria-label="Nachname"
                    autoComplete="family-name"
                    className={FELD}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); tippt(); }}
                    placeholder="deine@email.de"
                    aria-label="E-Mail-Adresse"
                    autoComplete="email"
                    className={`${FELD} sm:col-span-2`}
                  />
                  <Telefon onChange={(t) => { setTelefon(t); tippt(); }} fehler={meldung?.feld === "telefon" ? meldung.text : undefined} className={FELD} huelle="sm:col-span-2" />
                  <div className="py-1 sm:col-span-2">
                    <Einwilligung id={`${id}-mails`} an={einwilligung} setAn={(an) => { setEinwilligung(an); tippt(); }} pflicht />
                  </div>
                  <FeldMeldung meldung={meldung} className="sm:col-span-2" />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="min-h-[52px] cursor-pointer bg-gold px-7 text-[1rem] font-semibold tracking-[0.05em] text-tech-bg transition-colors duration-300 hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light disabled:cursor-default disabled:opacity-70 sm:col-span-2"
                  >
                    {status === "loading" ? "Moment …" : "Auf dem Laufenden bleiben"}
                  </button>

                  {(status === "error" || status === "unconfigured") && (
                    <p className="text-[0.9rem] sm:col-span-2" style={{ color: "#E8A87C" }}>
                      {status === "unconfigured"
                        ? "Die Anmeldung ist gleich startklar. Schreib mir solange direkt an ilja@sabala-mentoring.com."
                        : "Das hat gerade nicht geklappt. Versuch es bitte noch einmal."}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
