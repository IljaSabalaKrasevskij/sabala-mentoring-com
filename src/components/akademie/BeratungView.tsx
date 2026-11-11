"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import { flushSync } from "react-dom";
import { AppWindow, BrainCircuit, Check, ChevronDown, Euro, Gift, KeyRound, LayoutGrid, LockKeyhole, Plus, Presentation, Rocket, Search, ShieldCheck, SquareTerminal, Video, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Brackets, GOLD_AUF_HELL, HEBT, Knopf, Reveal, SektionsKopf, TEXT_AUF_DUNKEL, TEXT_AUF_HELL, TiltCard, Weiter } from "./shared";
import { BERATUNG_GUTSCHEIN, BERATUNG_PREIS, BERATUNG_PREIS_REGULAER, KURS_PREIS } from "./cohorts";
import { ABLAUF, BERATUNG_CHECKOUT, DANACH, EINWAENDE, FRAGEN_ZAHL, FUER_DICH, THEMEN, type ThemaSymbol } from "./beratung";

/* Beratungsseite /beratung: die Verkaufsseite für die Beratungsstunde (Mini-Produkt), im Aufbau und Aussehen
   der Kursseite /akademie. Sechs Abschnitte, jeder passt in ein Laptop-Fenster:
   Kopf · Für wen · Die Fragen · Ablauf · Angebot mit Gutschein · Wer dir gegenübersitzt und Einwände.
   Texte, Fragen und Einwände stehen in beratung.ts, Preise in cohorts.ts.
   Der Kopf blendet per CSS ein (`.cs-rise`): sichtbar auch ohne JavaScript. */

const SYMBOLE: Record<ThemaSymbol, LucideIcon> = {
  web: AppWindow,
  terminal: SquareTerminal,
  deploy: Rocket,
  recht: ShieldCheck,
  brain: BrainCircuit,
  daten: LockKeyhole,
  deck: Presentation,
  app: LayoutGrid,
  agent: Workflow,
  key: KeyRound,
  suche: Search,
};

const EIN = (delay: number) => ({ "--cs-d": `${delay}s` }) as React.CSSProperties;
const SCHATTEN = "shadow-[0_18px_44px_rgba(46,43,38,0.08)] hover:shadow-[0_34px_70px_rgba(46,43,38,0.22)]";
const RAND = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";

/* Der eine Buchungsknopf der Seite, überall mit demselben Text. Im Kopf springt er zum Angebot,
   im Angebot und am Schluss führt er mit `kasse` zur Buchung bei ThriveCart (neuer Tab). */
function BuchKnopf({ kasse = false, breit = false }: { kasse?: boolean; breit?: boolean }) {
  return (
    <Knopf href={kasse ? BERATUNG_CHECKOUT : "#angebot"} neuerTab={kasse} breit={breit}>
      Beratungsstunde buchen
    </Knopf>
  );
}

/* Liste mit goldenem Haken. In einer TiltCard heben sich die Haken beim Darüberfahren ab. */
function Haken({ punkte, hell = false }: { punkte: string[]; hell?: boolean }) {
  return (
    <ul className="mt-4 space-y-2.5 [transform-style:preserve-3d]">
      {punkte.map((p) => (
        <li key={p} className="flex items-start gap-3 text-[1rem] leading-snug [transform-style:preserve-3d]" style={{ color: hell ? "var(--deep)" : TEXT_AUF_DUNKEL }}>
          <span className={`mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-tech-bg ${HEBT}`}>
            <Check aria-hidden size={13} strokeWidth={3} />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

function Kopf() {
  const fakten = [
    { symbol: Video, text: "60 Minuten 1:1 per Video, Bildschirm geteilt" },
    { symbol: Euro, text: `${BERATUNG_PREIS} € statt ${BERATUNG_PREIS_REGULAER} €, netto` },
    { symbol: Gift, text: `Dazu ein Gutschein über ${BERATUNG_GUTSCHEIN} € für den Second-Brain-Kurs` },
  ];

  return (
    <section className="relative overflow-hidden" style={{ background: "var(--tech-bg)" }}>
      <div aria-hidden className="absolute inset-0">
        <Image src="/akademie/ki-library-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover" style={{ opacity: 0.4, objectPosition: "center 42%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.92) 0%, rgba(10,8,6,0.74) 45%, rgba(10,8,6,0.96) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 60% at 76% 50%, rgba(184,150,62,0.2), transparent 70%)" }} />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-6 pb-14 pt-24 sm:px-[6vw] min-[56.25rem]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] min-[56.25rem]:gap-14 min-[56.25rem]:pb-[7vh] min-[56.25rem]:pt-[9vh]">
        <div>
          <p className="cs-rise font-mono text-[12.5px] uppercase leading-relaxed tracking-[0.2em] text-gold sm:tracking-[0.24em]" style={EIN(0)}>
            Sabala Academy · 1:1 · Einführungspreis
          </p>
          <h1 className="cs-rise mt-4 font-serif text-cream" style={{ fontSize: "clamp(2.5rem, 4.6vw, 4.1rem)", lineHeight: 1.05, ...EIN(0.05) }}>
            {/* Die Leerzeichen sieht man nicht. Wer nur den Rohtext liest (Suchmaschinen, KI), bekommt so drei getrennte Sätze. */}
            <span className="block">Eine Stunde.</span>{" "}
            <span className="block">Deine Fragen.</span>{" "}
            <span className="block text-gold-light">Klare Antworten.</span>
          </h1>
          <p className="cs-rise mt-6 max-w-xl text-pretty text-[1.06rem] leading-relaxed min-[56.25rem]:text-[1.12rem]" style={{ color: "rgba(250,248,245,0.86)", ...EIN(0.12) }}>
            Webseiten mit Claude Code, online bringen, dein Second Brain, HTML-Präsentationen, eigene Agenten. Du fragst, ich zeige es dir live am Bildschirm.
          </p>

          <div className="cs-rise mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={EIN(0.18)}>
            <BuchKnopf />
            <Knopf zweit href="#fragen">
              Die {FRAGEN_ZAHL} Fragen ansehen
            </Knopf>
          </div>

          <ul className="cs-rise mt-7 space-y-2.5" style={EIN(0.24)}>
            {fakten.map(({ symbol: Symbol, text }) => (
              <li key={text} className="flex items-start gap-3 text-[0.97rem] leading-snug" style={{ color: TEXT_AUF_DUNKEL }}>
                <Symbol aria-hidden size={18} className="mt-0.5 shrink-0 text-gold" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Das Bild neigt sich mit der Maus. Die Breite hängt auch an der Fensterhöhe, damit der Kopf ins Laptop-Fenster passt. */}
        <div className="cs-rise relative mx-auto w-full" style={{ maxWidth: "min(400px, 56vh, 70vw)", ...EIN(0.2) }}>
          <span className="pointer-events-none absolute -inset-6 rounded-3xl" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.22), transparent 70%)" }} />
          <TiltCard hervor={1.03} max={6} radius={16}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl" style={{ border: "1.5px solid rgba(184,150,62,0.5)", boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(184,150,62,0.14)" }}>
              <Brackets color="rgba(184,150,62,0.7)" inset={14} size={16} />
              <Image src="/akademie/ilja-trainer-2026.jpg" alt="Ilja Krasevskij, dein Gesprächspartner in der Beratungsstunde" fill priority sizes="(max-width: 900px) 70vw, 400px" className="object-cover object-center" />
              <p className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-14" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0) 0%, rgba(10,8,6,0.88) 70%)" }}>
                <span className="block font-mono text-[12.5px] uppercase tracking-[0.2em] text-gold-light">Deine Stunde mit</span>
                <span className="mt-0.5 block font-serif text-[1.35rem] leading-tight text-cream">Ilja Krasevskij</span>
              </p>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

/* Für wen die Stunde ist und was du danach in der Hand hast: links fünf Lagen, in denen du dich wiederfindest,
   rechts hervorgehoben das Ergebnis. Beide Karten schließen unten ab, so bleibt keine halb leer. */
function FuerDich() {
  return (
    <section className="relative overflow-hidden px-6 py-[6.5vh]" style={{ background: "var(--cream)" }}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[45vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.14), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          hell
          zeile="Für wen"
          titel={
            <>
              Die Antwort steht irgendwo im Netz. <span style={{ color: GOLD_AUF_HELL }}>Nur eben nicht in deinem Kontext.</span>
            </>
          }
        />

        <div className="mt-8 grid items-stretch gap-5 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <TiltCard hervor={1.02} max={4} radius={16} className={`group/karte h-full p-6 md:p-7 ${SCHATTEN}`} style={{ background: "#ffffff", border: "1px solid rgba(184,150,62,0.3)" }}>
              <div className="flex h-full flex-col [transform-style:preserve-3d]">
                <p className="font-mono text-[12.5px] uppercase tracking-[0.18em]" style={{ color: GOLD_AUF_HELL }}>
                  Das hier ist für dich, wenn
                </p>
                <Haken hell punkte={FUER_DICH} />
                <p className="mt-auto pt-5">
                  <span className="block border-t pt-4 font-serif text-[1.3rem] leading-snug text-deep" style={{ borderColor: "rgba(184,150,62,0.4)" }}>
                    Stell die Frage einfach jemandem, der sie schon beantwortet hat.
                  </span>
                </p>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-5">
            <TiltCard hervor={1.02} max={4} radius={16} className={`group/karte h-full p-6 md:p-7 ${SCHATTEN}`} style={{ background: "linear-gradient(160deg, #fbf3dc, #f3e6c2)", border: "1px solid rgba(184,150,62,0.55)" }}>
              <div className="flex h-full flex-col [transform-style:preserve-3d]">
                <p className="font-mono text-[12.5px] uppercase tracking-[0.18em]" style={{ color: GOLD_AUF_HELL }}>
                  Nach der Stunde hast du
                </p>
                <Haken hell punkte={DANACH} />
                <p className="mt-auto pt-3">
                  <Weiter hell href="#angebot">
                    Zum Angebot
                  </Weiter>
                </p>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Die Fragen: elf Themen, zu jedem die Fragen. Knopf und Feld stehen als Paar hintereinander.
   Am Handy ist das ein Akkordeon: Die Fragen gehen direkt unter dem angetippten Thema auf.
   Am Laptop stehen die Knöpfe links und alle Felder in derselben Zelle rechts. Die zehn nicht gewählten
   sind dort unsichtbar, halten aber den Platz: Beim Wechseln springt nichts.
   Alle Fragen stehen im HTML, so lesen Suchmaschinen und KI-Systeme jede einzelne.
   Früher standen alle 58 Fragen offen untereinander (am Handy über 5.000 px). */
function Fragen() {
  const [aktiv, setAktiv] = useState(0);

  /* Am Handy klappt das vorher offene Thema oberhalb zu. Damit das angetippte dabei nicht unter dem Finger
     wegrutscht, baut React sofort um und die Seite gleicht den Versatz im selben Augenblick aus. */
  function waehle(i: number, knopf: HTMLElement) {
    const vorher = knopf.getBoundingClientRect().top;
    flushSync(() => setAktiv(i));
    const versatz = knopf.getBoundingClientRect().top - vorher;
    if (versatz) window.scrollBy({ top: versatz, behavior: "instant" });
  }

  return (
    <section id="fragen" className="relative scroll-mt-4 overflow-hidden px-6 py-[5.5vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute right-[-15vw] top-1/2 hidden h-[70vh] w-[60vw] -translate-y-1/2 md:block" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.13), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          zeile={`${FRAGEN_ZAHL} Fragen, die mir wirklich gestellt werden`}
          titel={
            <>
              Such dir deine raus. <span className="text-gold-light">Die Antwort bekommst du in der Stunde.</span>
            </>
          }
        />

        <div className="mt-7 grid gap-2 min-[56.25rem]:grid-cols-[minmax(0,0.425fr)_minmax(0,0.425fr)_minmax(0,1.15fr)] min-[56.25rem]:grid-rows-6">
          {THEMEN.map((t, i) => {
            const Symbol = SYMBOLE[t.symbol];
            const an = aktiv === i;
            return (
              <Fragment key={t.titel}>
                <button
                  type="button"
                  aria-expanded={an}
                  aria-controls={`fragen-${i}`}
                  onClick={(e) => waehle(i, e.currentTarget)}
                  className={`flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2 text-left text-[0.97rem] leading-tight transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light min-[56.25rem]:first:col-span-2 ${
                    an ? "border-gold bg-gold font-semibold text-tech-bg" : "border-[rgba(250,248,245,0.18)] bg-[rgba(250,248,245,0.04)] text-cream hover:border-[rgba(212,174,90,0.7)]"
                  }`}
                >
                  <Symbol aria-hidden size={19} strokeWidth={1.7} className="shrink-0" />
                  <span className="flex-1">{t.titel}</span>
                  <ChevronDown aria-hidden size={18} className={`shrink-0 transition-transform duration-300 min-[56.25rem]:hidden ${an ? "rotate-180" : ""}`} />
                </button>

                <div
                  id={`fragen-${i}`}
                  className={`mb-2 flex-col rounded-2xl p-6 min-[56.25rem]:col-start-3 min-[56.25rem]:row-span-6 min-[56.25rem]:row-start-1 min-[56.25rem]:mb-0 min-[56.25rem]:ml-3 min-[56.25rem]:p-7 ${an ? "flex" : "hidden min-[56.25rem]:invisible min-[56.25rem]:flex"}`}
                  style={{ background: "linear-gradient(160deg, #ffffff 0%, #faf5e8 70%, #f1e6c8 100%)", boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(184,150,62,0.16)" }}
                >
                  <p className="font-mono text-[12.5px] uppercase tracking-[0.18em]" style={{ color: GOLD_AUF_HELL }}>
                    {t.fragen.length} Fragen zum Thema
                  </p>
                  {/* Am Handy steht der Titel schon im Knopf direkt darüber. */}
                  <h3 className="mt-1.5 hidden font-serif text-[1.6rem] leading-tight text-deep min-[56.25rem]:block">{t.titel}</h3>
                  <ul className="mt-3.5 space-y-2">
                    {t.fragen.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[1rem] leading-snug text-deep">
                        <span aria-hidden className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-serif text-[0.95rem] leading-none" style={{ background: "rgba(184,150,62,0.18)", color: GOLD_AUF_HELL }}>
                          ?
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-4">
                    <span className="block border-t pt-3.5 text-[0.95rem] leading-snug" style={{ borderColor: "rgba(184,150,62,0.4)", color: TEXT_AUF_HELL }}>
                      Deine Frage ist nicht dabei? Schreib sie mir bei der Buchung dazu.
                    </span>
                  </p>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Ablauf() {
  return (
    <section className="relative overflow-hidden px-6 py-[6.5vh]" style={{ background: "var(--cream)" }}>
      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf hell zeile="So läuft es ab" titel="Von deiner Frage zur Antwort in drei Schritten." />

        <div className="mt-8 grid items-center gap-8 min-[56.25rem]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] min-[56.25rem]:gap-12">
          <Reveal>
            <TiltCard hervor={1.025} max={5} radius={16}>
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "1392 / 752", border: "1.5px solid rgba(184,150,62,0.45)", boxShadow: "0 30px 70px rgba(120,90,30,0.24), 0 8px 24px rgba(184,150,62,0.16)" }}>
                <Image src="/beratung/gespraech.jpg" alt="Gezeichnete Szene: ein Videogespräch am Laptop" fill sizes="(max-width: 900px) 92vw, 520px" className="object-cover" />
              </div>
            </TiltCard>
          </Reveal>

          <ol className="space-y-5">
            {ABLAUF.map((s, i) => (
              <li key={s.titel}>
                <Reveal delay={i * 0.07} className="flex items-start gap-4">
                  <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif text-[1.4rem] leading-none" style={{ background: "rgba(184,150,62,0.14)", border: "1px solid rgba(184,150,62,0.45)", color: GOLD_AUF_HELL }}>
                    {i + 1}
                  </span>
                  <p className="text-[0.97rem] leading-snug" style={{ color: TEXT_AUF_HELL }}>
                    <span className="block font-serif text-[1.35rem] leading-tight text-deep">{s.titel}</span>
                    <span className="mt-1 block">{s.text}</span>
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* Das Angebot: links der Gutschein (er ist mehr wert, als die Stunde kostet), rechts hell die Stunde mit Preis und Knopf. */
function Angebot() {
  const drin = ["60 Minuten 1:1 per Video, Bildschirm geteilt", "Deinen Termin suchst du dir direkt nach dem Kauf aus", "Schriftliche Zusammenfassung mit Links und Schritten", `Gutschein über ${BERATUNG_GUTSCHEIN} € für den Second-Brain-Kurs`];

  return (
    <section id="angebot" className="relative scroll-mt-4 overflow-hidden px-6 py-[6.5vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[70vh] w-[70vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse, rgba(212,174,90,0.12), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          zeile="Dein Angebot"
          titel={
            <>
              Du bekommst mehr zurück, <span className="text-gold-light">als die Stunde dich kostet.</span>
            </>
          }
        />

        <div className="mt-8 grid items-stretch gap-5 min-[56.25rem]:grid-cols-2">
          <Reveal>
            <TiltCard hervor={1.02} max={4} radius={16} glow="rgba(212,174,90,0.16)" className="group/karte h-full p-6 md:p-7" style={{ background: "linear-gradient(150deg, rgba(184,150,62,0.22) 0%, rgba(24,18,10,0.95) 62%)", border: "2px dashed rgba(212,174,90,0.65)" }}>
              <div className="flex h-full flex-col [transform-style:preserve-3d]">
                <p className="font-mono text-[12.5px] uppercase tracking-[0.18em] text-gold-light">Dein Gutschein zur Stunde</p>
                <p className={`mt-3 font-serif leading-none text-gold-light ${HEBT}`} style={{ fontSize: "clamp(3.6rem, 7vw, 5rem)" }}>
                  {BERATUNG_GUTSCHEIN} €
                </p>
                <p className="mt-3 text-[1.08rem] leading-relaxed text-cream">
                  für den nächsten Second-Brain-Kurs. Aus <span className="line-through decoration-[rgba(250,248,245,0.6)]">{KURS_PREIS} €</span> werden{" "}
                  <span className="font-semibold text-gold-light">{KURS_PREIS - BERATUNG_GUTSCHEIN} €</span>.
                </p>
                <p className="mt-2 text-[0.97rem] leading-relaxed" style={{ color: TEXT_AUF_DUNKEL }}>
                  Code und Terminlink kommen direkt nach dem Kauf. Kein Zwang: Ohne Kurs behältst du alles aus der Stunde.
                </p>
                <p className="mt-auto pt-3">
                  <Weiter href="/akademie">Zum Second-Brain-Kurs</Weiter>
                </p>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.08}>
            <TiltCard
              hervor={1.02}
              max={4}
              radius={16}
              className="group/karte h-full p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(184,150,62,0.16)] hover:shadow-[0_44px_100px_rgba(0,0,0,0.6),0_0_90px_rgba(184,150,62,0.32)] md:p-7"
              style={{ background: "linear-gradient(160deg, #ffffff 0%, #faf5e8 70%, #f1e6c8 100%)" }}
            >
              <div className="flex h-full flex-col [transform-style:preserve-3d]">
                <p className="font-mono text-[12.5px] uppercase tracking-[0.18em]" style={{ color: GOLD_AUF_HELL }}>
                  Deine Stunde · Einführungspreis
                </p>
                <p className="mt-2 leading-none">
                  <span className="font-serif text-[3rem] text-deep">{BERATUNG_PREIS} €</span>
                  <span className="ml-3 text-[1rem]" style={{ color: TEXT_AUF_HELL }}>
                    statt {BERATUNG_PREIS_REGULAER} €
                  </span>
                </p>
                <p className="mt-2 text-[0.9rem] leading-snug" style={{ color: TEXT_AUF_HELL }}>
                  netto zzgl. MwSt. · für Unternehmen und Selbständige
                </p>
                <Haken hell punkte={drin} />
                <div className="mt-auto pt-5">
                  <BuchKnopf kasse breit />
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Wer dir gegenübersitzt und die Einwände vor der Buchung, nebeneinander. Die Einwände sind
   Aufklapper des Browsers (`details`): Die Antworten stehen im HTML und brauchen kein JavaScript. */
function Einwaende() {
  return (
    <section className="relative overflow-hidden px-6 py-[6.5vh]" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #faf2dd 55%, var(--cream) 100%)" }}>
      <div className="pointer-events-none absolute -left-[10%] top-[15%] h-[55vh] w-[55vw]" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.18), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-x-14 gap-y-10 min-[56.25rem]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <SektionsKopf
              hell
              links
              zeile="Wer dir gegenübersitzt"
              titel={
                <>
                  Ich baue das, worüber wir sprechen, <span style={{ color: GOLD_AUF_HELL }}>jeden Tag selbst.</span>
                </>
              }
            />
            <Reveal className="mt-5 max-w-xl text-[1.04rem] leading-relaxed" style={{ color: TEXT_AUF_HELL }}>
              <p>
                Meine eigene Webseite, meine Kundenprojekte, mein Second Brain mit über zweitausend Dateien, meine Präsentationen und die Agenten, die mir Arbeit abnehmen: alles mit Claude Code gebaut. Was ich dir zeige, habe ich vorher an meinem eigenen Geschäft ausprobiert, inklusive der Umwege.
              </p>
            </Reveal>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["Business-Trainer und Speaker", "e-Trainer-Zertifizierung", "KI-Dozent bei KIfiziert", "5 Jahre Avendoo"].map((f) => (
                <li key={f} className="rounded-full px-3.5 py-1.5 text-[0.95rem] text-deep" style={{ border: "1px solid rgba(138,106,31,0.45)", background: "rgba(255,255,255,0.6)" }}>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[12.5px] uppercase tracking-[0.3em]" style={{ color: GOLD_AUF_HELL }}>
              Bevor du buchst
            </p>
            <h2 className="mt-4 font-serif text-[1.9rem] leading-tight text-deep">Was du vielleicht noch wissen willst</h2>
            <div className="mt-3 border-t" style={{ borderColor: "rgba(184,150,62,0.4)" }}>
              {EINWAENDE.map(([frage, antwort]) => (
                <details key={frage} className="group border-b" style={{ borderColor: "rgba(184,150,62,0.4)" }}>
                  <summary className={`flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 py-2 text-[1.06rem] font-semibold leading-snug text-deep [&::-webkit-details-marker]:hidden ${RAND}`}>
                    {frage}
                    <Plus aria-hidden size={20} className="shrink-0 transition-transform duration-300 group-open:rotate-45" style={{ color: GOLD_AUF_HELL }} />
                  </summary>
                  <p className="pb-4 pr-8 text-[1rem] leading-relaxed" style={{ color: TEXT_AUF_HELL }}>
                    {antwort}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col items-center gap-3 text-center">
          <BuchKnopf kasse />
          <p className="text-[0.95rem]" style={{ color: TEXT_AUF_HELL }}>
            Den Termin suchst du dir direkt nach dem Kauf aus.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function BeratungView() {
  return (
    <main className="flex-1">
      <Kopf />
      <FuerDich />
      <Fragen />
      <Ablauf />
      <Angebot />
      <Einwaende />
    </main>
  );
}
