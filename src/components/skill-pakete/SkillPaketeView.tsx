"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Component, Fragment, useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, ChartColumn, Check, CodeXml, Compass, ExternalLink, Megaphone, Palette, PenLine, Plus, RefreshCw, Search, type LucideIcon } from "lucide-react";
import AnmeldeForm from "@/components/akademie/AnmeldeForm";
import { GOLD_AUF_HELL, Knopf, Reveal, SektionsKopf, Weiter } from "@/components/akademie/shared";
import type { Steuer } from "./Buehne";
import { ALLE_PAKETE, BEISPIELE, BERUFE, FRAGEN, PAKETE, SKILL_ZAHL, berufVon, berufeMit, paketVon, type BerufId, type PaketId } from "./daten";
import s from "./skill-pakete.module.css";

/* Skill-Pakete /claude-code/skill-paket (Iljas Wunsch, 15.11.2026): Pakete nach Thema, Setups je Beruf,
   im Formular ein Häkchen je Paket. Sechs Abschnitte im Aussehen der Akademie-Seiten, jeder passt in ein Laptop-Fenster:
   Kopf und Setup (eine Bühne für beide) · die Pakete · Vorher und Nachher · die Abkürzung · anfordern · Fragen.
   Wie viele Pakete es sind, steht nur in daten.ts: Zahlwörter, Spalten und Bühne richten sich danach.
   Die 3D-Bühne lädt nach, die Überschrift steht sofort. Fällt 3D aus, steht Mooni als Bild da.
   Alle Setups und alle Paket-Felder stehen im HTML, sichtbar ist das gewählte: Google liest alles, nichts springt.
   Lesefarben deckend (Leser ab 50, keine blasse Schrift). Inhalte kommen aus daten.ts. */

const Buehne = dynamic(() => import("./Buehne"), { ssr: false });

const SYMBOL: Record<PaketId, LucideIcon> = { texte: PenLine, design: Palette, seo: Search, recherche: ChartColumn, social: Megaphone, entwicklung: CodeXml };
/* „sechs Pakete“, „Sechs Skill-Pakete“: Das Zahlwort folgt der Zahl der Pakete in daten.ts. */
const ANZAHL = ["null", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn"][PAKETE.length];
const ANZAHL_GROSS = ANZAHL[0].toUpperCase() + ANZAHL.slice(1);

/* Warum hier und nicht bei GitHub suchen: Auswahl, Anleitung, Updates (Iljas Punkte vom 15.11.2026). */
const VORTEILE: { symbol: LucideIcon; titel: string; text: string }[] = [
  { symbol: Compass, titel: "Die Abkürzung.", text: "Auf GitHub liegen unzählige Skills, die meisten auf Englisch. Hier bekommst du die Regeln, nach denen ich selbst arbeite, als fertige Skills auf Deutsch." },
  { symbol: BookOpen, titel: "Mit Anleitung.", text: "Zu jedem Skill steht da, wofür du ihn nutzt, mit fertigen Aufträgen und einem Vorher und Nachher. Dazu die Skills anderer Entwickler, die ich zusätzlich nutze, mit Link." },
  { symbol: RefreshCw, titel: "Mit Updates.", text: "Kommt ein Skill dazu oder wird einer besser, bekommst du ihn per Mail. Suchen musst du nichts." },
];
const TEXT_DUNKEL = "#E9E4DA";
const TEXT_HELL = "#57514A";
const LAPTOP = "(min-width: 56.25rem)";
const EIN = (delay: number) => ({ "--cs-d": `${delay}s` }) as React.CSSProperties;
const UND = new Intl.ListFormat("de", { style: "long", type: "conjunction" });
const klemme = (x: number) => Math.min(1, Math.max(0, x));
const ZEILE = "font-mono text-[12.5px] uppercase leading-relaxed tracking-[0.22em]";

/* Fällt die Bühne aus (kein WebGL, Modell lädt nicht), zeigt die Seite das Ersatzbild und läuft weiter. */
class Fang extends Component<{ ersatz: React.ReactNode; children: React.ReactNode }, { aus: boolean }> {
  state = { aus: false };
  static getDerivedStateFromError() {
    return { aus: true };
  }
  render() {
    return this.state.aus ? this.props.ersatz : this.props.children;
  }
}

function MooniBild() {
  return (
    <div className="absolute inset-[12%]">
      <Image src="/mooni/front.png" alt="" fill sizes="(min-width: 900px) 420px, 70vw" className="object-contain" />
    </div>
  );
}

export default function SkillPaketeView() {
  const [beruf, setBeruf] = useState<BerufId>("webdesigner");
  /* Die Seite zeigt zum Start das Setup für Webdesigner. Gewählt ist damit noch nichts: Erst wer einen Beruf antippt
     oder ein Setup holt, bekommt die Anleitung dazu. Wer keinen der fünf Berufe hat, bekommt nur die Pakete. */
  const [mitSetup, setMitSetup] = useState(false);
  /* Nichts vorab angehakt: Nur so zeigt die Auswahl, was jemanden wirklich interessiert. Leer heißt „alle fünf“. */
  const [auswahl, setAuswahl] = useState<PaketId[]>([]);
  const [offen, setOffen] = useState<PaketId>("texte");
  const [zeig, setZeig] = useState<PaketId>("texte");
  const [mitSkill, setMitSkill] = useState(false);
  const [aktiv, setAktiv] = useState(false);
  const [ruhig, setRuhig] = useState(false);

  const steuer = useRef<Steuer>({ fokus: 0 });
  const leinwand = useRef<HTMLDivElement>(null);
  const setupBlock = useRef<HTMLDivElement>(null);
  const setup = useMemo(() => berufVon(beruf).setup.map((x) => x.paket), [beruf]);

  useEffect(() => {
    const bewegung = window.matchMedia("(prefers-reduced-motion: reduce)");
    const laptop = window.matchMedia(LAPTOP);
    const ruhe = () => setRuhig(bewegung.matches);
    ruhe();
    bewegung.addEventListener("change", ruhe);

    // Die Bühne rechnet nur, solange sie zu sehen ist.
    const io = new IntersectionObserver(([e]) => setAktiv(e.isIntersecting), { rootMargin: "120px 0px" });
    if (leinwand.current) io.observe(leinwand.current);

    // fokus: 0 = die Pakete kreisen, 1 = das Setup steht in der Reihe.
    // Laptop: sobald der Setup-Text ins Fenster kommt. Handy: sobald unter der Bühne die Berufswahl zu sehen ist.
    let bild = 0;
    const messen = () => {
      bild = 0;
      const h = window.innerHeight;
      const oben = setupBlock.current?.getBoundingClientRect().top ?? h;
      const unten = leinwand.current?.getBoundingClientRect().bottom ?? h;
      steuer.current.fokus = laptop.matches ? klemme((h * 0.85 - oben) / (h * 0.55)) : klemme((h * 0.95 - unten) / (h * 0.25));
    };
    const an = () => {
      if (!bild) bild = requestAnimationFrame(messen);
    };
    messen();
    window.addEventListener("scroll", an, { passive: true });
    window.addEventListener("resize", an);
    return () => {
      bewegung.removeEventListener("change", ruhe);
      io.disconnect();
      window.removeEventListener("scroll", an);
      window.removeEventListener("resize", an);
      cancelAnimationFrame(bild);
    };
  }, []);

  const waehleBeruf = (id: BerufId) => {
    setBeruf(id);
    setMitSetup(true);
    // Am Laptop steht der Setup-Text einen Bildschirm tiefer: hinfahren, damit die Antwort zu sehen ist.
    if (window.matchMedia(LAPTOP).matches && steuer.current.fokus < 0.6) setupBlock.current?.scrollIntoView({ block: "start" });
  };
  const zeigePaket = (id: PaketId) => {
    setOffen(id);
    document.getElementById("pakete")?.scrollIntoView({ block: "start" });
  };
  const schalte = (id: PaketId) => setAuswahl((a) => (a.includes(id) ? a.filter((x) => x !== id) : ALLE_PAKETE.filter((x) => x === id || a.includes(x))));

  return (
    <main className="flex-1">
      {/* 1 · KOPF UND SETUP: eine Bühne für beide */}
      <section className="relative" style={{ background: "var(--tech-bg)" }}>
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 52% 46% at 74% 26%, rgba(184,150,62,0.22), transparent 72%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 20% 100%, rgba(184,150,62,0.10), transparent 70%)" }} />
        </div>

        <div className={s.kopfRaster}>
          <div className={s.kopfText}>
            <p className={`cs-rise ${ZEILE} text-gold-light`} style={{ letterSpacing: "0.16em", ...EIN(0) }}>
              Für Claude Code und die Claude-App
            </p>
            <h1 className="cs-rise mt-4 font-serif text-cream" style={{ fontSize: "clamp(2.45rem, min(5vw, 9.2vh), 4.6rem)", lineHeight: 1.03, ...EIN(0.05) }}>
              <span className="block text-balance">Bring Claude dein Handwerk bei.</span>
              <span className="mt-2 block italic text-gold-light" style={{ fontSize: "0.6em", lineHeight: 1.15 }}>
                {ANZAHL_GROSS} Skill-Pakete, kostenlos.
              </span>
            </h1>
            <p className="cs-rise mt-5 max-w-[34rem] text-pretty text-[1.06rem] leading-relaxed min-[56.25rem]:text-[1.12rem]" style={{ color: TEXT_DUNKEL, ...EIN(0.12) }}>
              {SKILL_ZAHL} Skills auf Deutsch für {UND.format(PAKETE.map((p) => p.kurz))}. Sag, was du machst, und Mooni stellt dir dein Setup zusammen.
            </p>
            <div className="cs-rise mt-7 flex flex-col gap-3 sm:flex-row sm:items-center" style={EIN(0.18)}>
              <Knopf href="#anfordern">Pakete anfordern</Knopf>
              {/* Am Handy nur ein Knopf: So steht Mooni schon auf dem ersten Bildschirm. */}
              <span className="hidden sm:contents">
                <Knopf zweit href="#pakete">
                  Was drin ist
                </Knopf>
              </span>
            </div>
          </div>

          <div className={s.buehne}>
            <div className={s.buehneInnen}>
              <div ref={leinwand} className={s.leinwand} role="img" aria-label="Mooni mit den Skill-Paketen als Schachteln">
                <Fang ersatz={<MooniBild />}>
                  <Buehne steuer={steuer} setup={setup} aktiv={aktiv} ruhig={ruhig} onPaket={zeigePaket} />
                </Fang>
              </div>

              <div className={s.wahl}>
                <p id="frage-beruf" className={`${ZEILE} text-center text-gold-light`}>
                  Was machst du?
                </p>
                <div role="group" aria-labelledby="frage-beruf" className="mt-2.5 flex flex-wrap justify-center gap-2">
                  {BERUFE.map((b) => {
                    const an = b.id === beruf;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        aria-pressed={an}
                        onClick={() => waehleBeruf(b.id)}
                        className={`min-h-[44px] cursor-pointer rounded-full border px-4 py-2 text-[15.5px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light ${
                          an ? "border-gold-light bg-gold-light text-tech-bg" : "border-[rgba(212,174,90,0.5)] bg-[#17120b] text-cream maus:hover:border-gold-light maus:hover:bg-[#241b0f]"
                        }`}
                      >
                        {b.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div ref={setupBlock} id="setup" className={s.setup}>
            <p className={`${ZEILE} text-gold-light`}>Dein Setup</p>
            <div className={`${s.stapel} mt-3`}>
              {BERUFE.map((b) => {
                const an = b.id === beruf;
                return (
                  <div key={b.id} data-an={an}>
                    <h2 className="text-balance font-serif text-cream" style={{ fontSize: "clamp(1.9rem, min(3.3vw, 6.2vh), 2.9rem)", lineHeight: 1.08 }}>
                      Was ist dein Setup als <span className="italic text-gold-light">{b.als}?</span>
                    </h2>
                    <ol className="mt-5 space-y-3">
                      {b.setup.map((x, i) => {
                        const p = paketVon(x.paket);
                        const Symbol = SYMBOL[p.id];
                        return (
                          <li key={p.id} className={`flex items-start gap-4 ${an ? s.karte : ""}`} style={{ animationDelay: `${i * 0.07}s` }}>
                            <span aria-hidden className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-light text-[15px] font-bold text-tech-bg">
                              {i + 1}
                            </span>
                            <p className="text-[1rem] leading-snug" style={{ color: TEXT_DUNKEL }}>
                              <span className="flex items-center gap-2 font-serif text-[1.35rem] leading-tight text-cream">
                                <Symbol aria-hidden size={18} strokeWidth={1.9} style={{ color: p.farbe }} />
                                {p.name}
                              </span>
                              <span className="mt-1 block">{x.satz}</span>
                            </p>
                          </li>
                        );
                      })}
                    </ol>
                    <p className="mt-5 max-w-[34rem] text-pretty text-[1rem] leading-relaxed" style={{ color: TEXT_DUNKEL }}>
                      Dazu kommt die Anleitung „Dein Setup als {b.als}“ mit der Reihenfolge, einem Textbaustein für Claude und drei ersten Aufgaben.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1">
                      <Knopf
                        href="#anfordern"
                        onClick={() => {
                          setAuswahl(b.setup.map((x) => x.paket));
                          setMitSetup(true);
                        }}
                      >
                        Dieses Setup holen
                      </Knopf>
                      <Weiter href="#pakete">Alle {ANZAHL} ansehen</Weiter>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2 · DIE PAKETE: je Paket eine Schachtel, eine ist offen */}
      <section id="pakete" className={`${s.flachRand} relative scroll-mt-4 overflow-hidden px-6 py-[4vh]`} style={{ background: "var(--cream)" }}>
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[45vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.14), transparent 70%)" }} />

        <div className="relative mx-auto max-w-6xl">
          <SektionsKopf
            hell
            zeile="Die Pakete"
            titel={
              <>
                Was steckt in den <span style={{ color: GOLD_AUF_HELL }}>{ANZAHL} Paketen?</span>
              </>
            }
          />
          {/* Eigener Absatz statt des Textes im Kopf-Baustein: Dessen Farbe ist halb durchsichtig, hier steht sie deckend. */}
          <p className="mx-auto mt-3 max-w-4xl text-pretty text-center text-[1.04rem] leading-relaxed" style={{ color: TEXT_HELL }}>
            Je drei Skills, damit Claude sicher den richtigen nimmt. Neue kommen als Update dazu.
          </p>

          <div className={`${s.raster} mt-5`} style={{ "--zahl": PAKETE.length } as React.CSSProperties}>
            {PAKETE.map((p) => {
              const an = p.id === offen;
              const dabei = auswahl.includes(p.id);
              const Symbol = SYMBOL[p.id];
              const berufe = berufeMit(p.id);
              return (
                <Fragment key={p.id}>
                  <button
                    type="button"
                    id={`reiter-${p.id}`}
                    aria-expanded={an}
                    aria-controls={`feld-${p.id}`}
                    onClick={() => setOffen(p.id)}
                    className={`${s.reiter} ${an ? s.an : ""}`}
                    style={{ "--farbe": p.farbe } as React.CSSProperties}
                  >
                    <span aria-hidden className={s.zettel}>
                      <i />
                      <i />
                      <i />
                    </span>
                    <span aria-hidden className={s.deckel} />
                    <span className={s.koerper}>
                      <Symbol aria-hidden size={22} strokeWidth={1.8} className={s.symbol} />
                      <span className={s.name}>
                        <span className="min-[56.25rem]:hidden">{p.name}</span>
                        <span className="hidden min-[56.25rem]:inline">{p.kurz}</span>
                      </span>
                      <span className={s.zahl}>{dabei ? "3 Skills · dabei" : "3 Skills"}</span>
                    </span>
                  </button>

                  <div id={`feld-${p.id}`} role="region" aria-labelledby={`reiter-${p.id}`} className={`${s.feld} ${an ? s.feldAn : ""}`}>
                    <div
                      className="grid gap-5 rounded-[18px] bg-white p-5 min-[56.25rem]:grid-cols-[minmax(0,0.68fr)_minmax(0,1.7fr)] min-[56.25rem]:gap-x-6 min-[56.25rem]:gap-y-4"
                      style={{ border: "1px solid rgba(184,150,62,0.35)", boxShadow: "0 18px 44px rgba(46,43,38,0.08)" }}
                    >
                      <div className="flex flex-col min-[56.25rem]:justify-center">
                        <h3 className="text-balance font-serif text-[1.7rem] leading-tight text-deep min-[56.25rem]:text-[1.9rem]">{p.claim}</h3>
                        <p className="mt-2.5 text-[1rem] leading-snug" style={{ color: TEXT_HELL }}>
                          {berufe.length === BERUFE.length ? "In jedem Setup dabei." : `Im Setup für ${UND.format(berufe.map((b) => b.name))}.`}
                        </p>
                        <div className="mt-4">
                          <button
                            type="button"
                            aria-pressed={dabei}
                            onClick={() => schalte(p.id)}
                            className={`inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 rounded-full border-[1.5px] px-5 py-2 text-[1rem] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                              dabei ? "border-deep bg-deep text-cream" : "border-gold bg-transparent text-deep maus:hover:bg-[#f3e9cf]"
                            }`}
                          >
                            {dabei ? <Check aria-hidden size={18} strokeWidth={2.6} /> : <Plus aria-hidden size={18} strokeWidth={2.6} />}
                            {dabei ? "Ist in deiner Auswahl" : "Dieses Paket will ich"}
                          </button>
                        </div>
                      </div>

                      <ul className="grid gap-3 sm:grid-cols-3">
                        {p.skills.map((k, j) => (
                          <li
                            key={k.ordner}
                            className={`rounded-[14px] p-4 ${an ? s.karte : ""}`}
                            style={{ animationDelay: `${j * 0.08}s`, background: "linear-gradient(180deg, #fdf9ee, #f6eedb)", border: "1px solid rgba(184,150,62,0.4)", borderTop: `4px solid ${p.farbe}` }}
                          >
                            <h4 className="font-serif text-[1.3rem] leading-tight text-deep">{k.titel}</h4>
                            <p className="mt-0.5 font-mono text-[15px] leading-snug" style={{ color: GOLD_AUF_HELL }}>
                              {k.ordner}
                            </p>
                            <p className="mt-2 text-[0.97rem] leading-snug text-deep">{k.satz}</p>
                            <p className="mt-2 text-[0.97rem] leading-snug" style={{ color: TEXT_HELL }}>
                              <span className="font-semibold text-deep">Wofür:</span> {k.wofuer}
                            </p>
                          </li>
                        ))}
                      </ul>
                      {/* Skills anderer Entwickler: verlinkt, nicht mitgeliefert. Eigene Zeile unter den Karten, damit die linke Spalte
                          niedrig bleibt. py-3 macht die Links am Handy 44 px hoch, am Laptop reicht die normale Zeile. */}
                      {p.empfehlungen.length > 0 && (
                        <p className="border-t pt-2 text-[1rem] leading-relaxed min-[56.25rem]:col-span-2 min-[56.25rem]:pt-3" style={{ color: TEXT_HELL, borderColor: "rgba(184,150,62,0.3)" }}>
                          Passt dazu von GitHub:{" "}
                          {p.empfehlungen.map((e, n) => (
                            <Fragment key={e.repo}>
                              {n > 0 && ", "}
                              <a
                                href={`https://github.com/${e.repo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`${e.name}: ${e.satz} (Lizenz ${e.lizenz})`}
                                className="inline-flex items-center gap-1 py-3 font-semibold underline decoration-[rgba(184,150,62,0.7)] underline-offset-4 hover:text-deep min-[56.25rem]:py-0"
                                style={{ color: GOLD_AUF_HELL }}
                              >
                                {e.name}
                                <ExternalLink aria-hidden size={14} strokeWidth={2.2} />
                              </a>
                            </Fragment>
                          ))}
                        </p>
                      )}
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 · VORHER UND NACHHER: je Paket ein echtes Beispiel aus dem Test (einmal ohne Skill, einmal mit).
          „Ohne Skill“ steht in <samp>: Es ist eine Probe, kein Text der Seite. Prüfungen der Seite werten sie darum nicht. */}
      <section id="beispiele" className="relative scroll-mt-4 overflow-hidden px-6 py-[6vh]" style={{ background: "var(--tech-bg)" }}>
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-10%] h-[70vh] w-[70vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse, rgba(212,174,90,0.11), transparent 70%)" }} />

        <div className="relative mx-auto max-w-6xl">
          <SektionsKopf
            zeile="Vorher und Nachher"
            titel={
              <>
                Was ändert ein Skill <span className="text-gold-light">am Ergebnis?</span>
              </>
            }
          />

          <div role="group" aria-label="Paket wählen" className="mt-5 flex flex-wrap justify-center gap-2">
            {PAKETE.map((p) => {
              const an = p.id === zeig;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={an}
                  onClick={() => setZeig(p.id)}
                  className={`min-h-[44px] cursor-pointer rounded-full border px-4 py-2 text-[15.5px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light ${
                    an ? "border-gold-light bg-gold-light text-tech-bg" : "border-[rgba(212,174,90,0.5)] bg-[#17120b] text-cream maus:hover:border-gold-light maus:hover:bg-[#241b0f]"
                  }`}
                >
                  {p.kurz}
                </button>
              );
            })}
          </div>

          <div className={`${s.stapel} ${s.mittig} mt-5`}>
            {PAKETE.map((p) => {
              const b = BEISPIELE[p.id];
              return (
                <div key={p.id} data-an={p.id === zeig}>
                  {b.bilder ? (
                    /* Ausgabe ist ein Bild: links der Auftrag, rechts EIN großes Bildschirmfoto mit Umschalter.
                       Zwei Fotos nebeneinander wären im flachen Fenster nur daumennagelgroß. */
                    <div className={s.bildBeispiel}>
                      <div className={s.bildText}>
                        <p className="font-mono text-[15px] text-gold-light">{b.skill}</p>
                        <p className="mt-2 text-[1.02rem] leading-relaxed" style={{ color: TEXT_DUNKEL }}>
                          Auftrag: „{b.auftrag}“
                        </p>
                      </div>
                      <figure className={`${s.bildFigur} rounded-[16px] p-3 md:p-4`} style={{ background: "#15120d", border: "1px solid rgba(255,255,255,0.18)" }}>
                        <figcaption role="group" aria-label="Fassung zeigen" className="flex gap-2">
                          {[false, true].map((mit) => (
                            <button
                              key={String(mit)}
                              type="button"
                              aria-pressed={mitSkill === mit}
                              onClick={() => setMitSkill(mit)}
                              className={`min-h-[44px] flex-1 cursor-pointer rounded-full border px-4 py-2 text-[15.5px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light ${
                                mitSkill === mit ? "border-gold-light bg-gold-light text-tech-bg" : "border-[rgba(212,174,90,0.5)] bg-[#17120b] text-cream maus:hover:border-gold-light maus:hover:bg-[#241b0f]"
                              }`}
                            >
                              {mit ? "Mit dem Skill" : "Ohne Skill"}
                            </button>
                          ))}
                        </figcaption>
                        <div className={s.fotos}>
                          <Image src={b.bilder.vorher} alt={b.vorher} width={1366} height={650} sizes="(min-width: 1024px) 700px, 92vw" data-an={!mitSkill} aria-hidden={mitSkill} className={s.foto} />
                          <Image src={b.bilder.nachher} alt={b.nachher} width={1366} height={650} sizes="(min-width: 1024px) 700px, 92vw" data-an={mitSkill} aria-hidden={!mitSkill} className={s.foto} />
                        </div>
                      </figure>
                      {/* Der Beleg steht im Quelltext nach dem Bild: Am Handy folgt das Bild direkt auf den Auftrag. */}
                      {b.beleg && (
                        <p className={`${s.bildBeleg} flex items-start gap-2.5 text-[1rem] leading-relaxed`} style={{ color: TEXT_DUNKEL }}>
                          <Check aria-hidden size={19} strokeWidth={2.4} className="mt-[3px] shrink-0 text-gold-light" /> {b.beleg}
                        </p>
                      )}
                    </div>
                  ) : (
                    <>
                      <p className="mx-auto max-w-4xl text-pretty text-center text-[1.02rem] leading-relaxed" style={{ color: TEXT_DUNKEL }}>
                        <span className="font-mono text-[15px] text-gold-light">{b.skill}</span> · Auftrag: „{b.auftrag}“
                      </p>
                      <div className="mt-4 grid gap-4 lg:grid-cols-2">
                        <figure className="rounded-[16px] p-5 md:p-6" style={{ background: "#15120d", border: "1px solid rgba(255,255,255,0.18)" }}>
                          <figcaption className={ZEILE} style={{ color: "#BDB5A6" }}>
                            Ohne Skill
                          </figcaption>
                          <samp className="mt-2.5 block whitespace-pre-line font-sans text-[1rem] leading-relaxed" style={{ color: "#D6CFC2" }}>
                            {b.vorher}
                          </samp>
                        </figure>
                        <figure className="rounded-[16px] p-5 md:p-6" style={{ background: "linear-gradient(180deg, #fdf9ee, #f6eedb)", border: "1px solid rgba(212,174,90,0.5)" }}>
                          <figcaption className={ZEILE} style={{ color: GOLD_AUF_HELL }}>
                            Mit dem Skill
                          </figcaption>
                          <p className="mt-2.5 whitespace-pre-line text-[1rem] leading-relaxed text-deep">{b.nachher}</p>
                          {b.beleg && (
                            <p className="mt-3 flex items-center gap-2.5 text-[1rem]" style={{ color: TEXT_HELL }}>
                              <Check aria-hidden size={19} strokeWidth={2.4} className="shrink-0" style={{ color: GOLD_AUF_HELL }} /> {b.beleg}
                            </p>
                          )}
                        </figure>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-4 max-w-5xl text-pretty text-center text-[15px] leading-relaxed" style={{ color: "#BDB5A6" }}>
            Jedes Beispiel stammt aus einem Test: derselbe Auftrag, einmal ohne Skill und einmal mit. Die Betriebe darin sind erfunden.
          </p>
        </div>
      </section>

      {/* 4 · DIE ABKÜRZUNG: warum hier und nicht selbst bei GitHub suchen */}
      <section className="relative overflow-hidden px-6 py-[7vh]" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #faf2dd 55%, var(--cream) 100%)" }}>
        <div className="relative mx-auto max-w-6xl">
          <SektionsKopf
            hell
            zeile="Die Abkürzung"
            titel={
              <>
                Gibt es Skills nicht auch <span style={{ color: GOLD_AUF_HELL }}>kostenlos auf GitHub?</span>
              </>
            }
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {VORTEILE.map(({ symbol: Symbol, titel, text }, i) => (
              <Reveal key={titel} delay={i * 0.07} className="h-full">
                <div className="h-full rounded-[18px] bg-white p-6 md:p-7" style={{ border: "1px solid rgba(184,150,62,0.35)", boxShadow: "0 18px 44px rgba(46,43,38,0.08)" }}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(184,150,62,0.14)", border: "1px solid rgba(184,150,62,0.45)", color: GOLD_AUF_HELL }}>
                    <Symbol aria-hidden size={22} strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 font-serif text-[1.55rem] leading-tight text-deep">{titel}</h3>
                  <p className="mt-2.5 text-[1rem] leading-relaxed" style={{ color: TEXT_HELL }}>
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · ANFORDERN: Häkchen je Paket, dann das Formular */}
      <section id="anfordern" className="relative scroll-mt-4 overflow-hidden px-6 py-[7vh]" style={{ background: "var(--tech-bg)" }}>
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-10%] h-[70vh] w-[70vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse, rgba(212,174,90,0.12), transparent 70%)" }} />
        <div
          className="relative mx-auto grid max-w-6xl gap-9 rounded-[20px] p-6 sm:p-9 lg:grid-cols-2 lg:gap-14 lg:p-12"
          style={{ background: "linear-gradient(150deg, #2a2217 0%, #14100b 55%, #100c07 100%)", border: "1px solid rgba(212,174,90,0.45)", boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}
        >
          <div>
            <p className={`${ZEILE} text-gold-light`}>Kostenlos per Mail</p>
            <h2 className="mt-3 text-balance font-serif text-cream" style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", lineHeight: 1.1 }}>
              Welche Pakete <span className="italic text-gold-light">schicke ich dir?</span>
            </h2>

            <fieldset className="mt-6">
              <legend className="sr-only">Pakete auswählen</legend>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {PAKETE.map((p) => {
                  const Symbol = SYMBOL[p.id];
                  const dabei = auswahl.includes(p.id);
                  return (
                    <label
                      key={p.id}
                      className="flex min-h-[52px] cursor-pointer items-center gap-3 rounded-[12px] px-4 py-2.5 transition-colors duration-200"
                      style={{ background: dabei ? "rgba(212,174,90,0.16)" : "rgba(255,255,255,0.04)", border: `1px solid ${dabei ? "rgba(212,174,90,0.75)" : "rgba(255,255,255,0.16)"}` }}
                    >
                      <span className="relative block h-[22px] w-[22px] shrink-0">
                        <input type="checkbox" checked={dabei} onChange={() => schalte(p.id)} className="peer absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0" />
                        <span
                          aria-hidden
                          className="grid h-full w-full place-items-center rounded-[4px] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-light"
                          style={{ border: `1.5px solid ${dabei ? "#D4AE5A" : "#B9B2A6"}`, background: dabei ? "#D4AE5A" : "transparent" }}
                        >
                          {dabei && <Check size={15} strokeWidth={3.2} color="#0a0806" />}
                        </span>
                      </span>
                      <Symbol aria-hidden size={19} strokeWidth={1.8} className="shrink-0" style={{ color: p.farbe }} />
                      <span className="font-serif text-[1.25rem] leading-tight text-cream">{p.name}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
              <button
                type="button"
                onClick={() => setAuswahl(ALLE_PAKETE)}
                className="min-h-[44px] cursor-pointer text-[1rem] font-semibold text-gold-light underline decoration-[rgba(212,174,90,0.6)] underline-offset-4 maus:hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
              >
                Alle {ANZAHL} anhaken
              </button>
              <p aria-live="polite" className="text-[1rem]" style={{ color: TEXT_DUNKEL }}>
                {auswahl.length === 0 ? `Nichts angehakt? Dann bekommst du alle ${ANZAHL}.` : auswahl.length === 1 ? "Ein Paket gewählt." : `${auswahl.length} von ${PAKETE.length} Paketen gewählt.`}
              </p>
            </div>

            <label className="mt-4 block">
              <span className="block text-[1rem] font-semibold text-cream">Welche Anleitung willst du dazu?</span>
              <select
                value={mitSetup ? beruf : "ohne"}
                onChange={(e) => {
                  if (e.target.value === "ohne") return setMitSetup(false);
                  setMitSetup(true);
                  setBeruf(e.target.value as BerufId);
                }}
                className="mt-2 min-h-[52px] w-full cursor-pointer rounded-[3px] px-4 text-[1rem] text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
                style={{ background: "#1c160d", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                {BERUFE.map((b) => (
                  <option key={b.id} value={b.id}>
                    Setup als {b.als}
                  </option>
                ))}
                <option value="ohne">Keine Anleitung, nur die Pakete</option>
              </select>
            </label>
          </div>

          <div>
            <p className="mb-6 text-pretty text-[1.02rem] leading-relaxed" style={{ color: TEXT_DUNKEL }}>
              Trag dich ein und bestätige kurz die Mail, die danach kommt. Der Klick darin führt dich zu deinen Paketen. Danach bekommst du meinen Newsletter mit KI-Updates für dein Unternehmen, und eine Mail, wenn ein Skill dazukommt. Abmelden geht jederzeit mit einem Klick.
            </p>
            <AnmeldeForm quelle="skill-paket" extra={{ pakete: auswahl.join(","), beruf: mitSetup ? beruf : "" }} knopf="Meine Pakete anfordern" />
          </div>
        </div>
      </section>

      {/* 6 · FRAGEN: Die Frage ist die Tippfläche (Innenabstand plus gleich großer negativer Außenabstand, am Handy 44 px hoch). */}
      <section className="relative overflow-hidden px-6 py-[6vh]" style={{ background: "var(--cream)" }}>
        <div className="relative mx-auto max-w-6xl">
          <SektionsKopf
            hell
            zeile="Häufige Fragen"
            titel={
              <>
                Was willst du vorher <span style={{ color: GOLD_AUF_HELL }}>wissen?</span>
              </>
            }
          />

          <div className="mt-6 grid items-start gap-2.5 min-[56.25rem]:grid-cols-2">
            {FRAGEN.map((f) => (
              <details key={f.q} className="group rounded-[14px] bg-white px-5 py-3.5 [&_summary::-webkit-details-marker]:hidden" style={{ border: "1px solid rgba(184,150,62,0.38)" }}>
                <summary className="-my-1.5 flex cursor-pointer list-none items-center justify-between gap-5 py-1.5">
                  <h3 className="font-serif text-[1.3rem] leading-snug text-deep">{f.q}</h3>
                  <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xl transition-transform duration-300 group-open:rotate-45" style={{ borderColor: "#b8963e", color: GOLD_AUF_HELL }}>
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[1rem] leading-relaxed" style={{ color: TEXT_HELL }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          {/* py-3 an den Links im Satz: Tippfläche am Handy 44 px, die Zeile bleibt gleich hoch. */}
          <p className="mt-7 text-center text-[1rem] leading-relaxed" style={{ color: TEXT_HELL }}>
            Noch mehr kostenlose Hilfen, darunter das{" "}
            <Link href="/claude-code/startpaket" className="py-3 font-semibold underline decoration-[rgba(184,150,62,0.7)] underline-offset-4 hover:text-deep" style={{ color: GOLD_AUF_HELL }}>
              Claude-Code-Startpaket
            </Link>
            , findest du unter{" "}
            <Link href="/ressourcen" className="py-3 font-semibold underline decoration-[rgba(184,150,62,0.7)] underline-offset-4 hover:text-deep" style={{ color: GOLD_AUF_HELL }}>
              Ressourcen
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
