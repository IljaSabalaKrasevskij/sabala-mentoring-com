"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Component, Fragment, useEffect, useMemo, useRef, useState } from "react";
import { ChartColumn, Check, Megaphone, Palette, PenLine, Plus, Search, type LucideIcon } from "lucide-react";
import AnmeldeForm from "@/components/akademie/AnmeldeForm";
import { GOLD_AUF_HELL, Knopf, Reveal, SektionsKopf, Weiter } from "@/components/akademie/shared";
import type { Steuer } from "./Buehne";
import { ALLE_PAKETE, BERUFE, FRAGEN, PAKETE, SKILL_ZAHL, berufVon, berufeMit, paketVon, type BerufId, type PaketId } from "./daten";
import s from "./skill-pakete.module.css";

/* Skill-Pakete /claude-code/skill-paket (Iljas Wunsch, 15.11.2026): fünf Pakete nach Thema, Setups je Beruf,
   im Formular ein Häkchen je Paket. Fünf Abschnitte im Aussehen der Akademie-Seiten, jeder passt in ein Laptop-Fenster:
   Kopf und Setup (eine Bühne für beide) · die Pakete · der Beweis · anfordern · Fragen.
   Die 3D-Bühne lädt nach, die Überschrift steht sofort. Fällt 3D aus, steht Mooni als Bild da.
   Alle Setups und alle Paket-Felder stehen im HTML, sichtbar ist das gewählte: Google liest alles, nichts springt.
   Lesefarben deckend (Leser ab 50, keine blasse Schrift). Inhalte kommen aus daten.ts. */

const Buehne = dynamic(() => import("./Buehne"), { ssr: false });

const SYMBOL: Record<PaketId, LucideIcon> = { texte: PenLine, design: Palette, seo: Search, recherche: ChartColumn, social: Megaphone };
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
                Fünf Skill-Pakete, kostenlos.
              </span>
            </h1>
            <p className="cs-rise mt-5 max-w-[34rem] text-pretty text-[1.06rem] leading-relaxed min-[56.25rem]:text-[1.12rem]" style={{ color: TEXT_DUNKEL, ...EIN(0.12) }}>
              {SKILL_ZAHL} Skills auf Deutsch für Texte, Design, SEO, Marktrecherche und Social Media. Sag, was du machst, und Mooni stellt dir dein Setup zusammen.
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
              <div ref={leinwand} className={s.leinwand} role="img" aria-label="Mooni mit den fünf Skill-Paketen als Schachteln">
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
                      <Weiter href="#pakete">Alle fünf ansehen</Weiter>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2 · DIE PAKETE: fünf Schachteln, eine ist offen */}
      <section id="pakete" className="relative scroll-mt-4 overflow-hidden px-6 py-[4vh]" style={{ background: "var(--cream)" }}>
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[45vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.14), transparent 70%)" }} />

        <div className="relative mx-auto max-w-6xl">
          <SektionsKopf
            hell
            zeile="Die Pakete"
            titel={
              <>
                Was steckt in den <span style={{ color: GOLD_AUF_HELL }}>fünf Paketen?</span>
              </>
            }
          />
          {/* Eigener Absatz statt des Textes im Kopf-Baustein: Dessen Farbe ist halb durchsichtig, hier steht sie deckend. */}
          <p className="mx-auto mt-3 max-w-4xl text-pretty text-center text-[1.04rem] leading-relaxed" style={{ color: TEXT_HELL }}>
            Je drei Skills für Claude, auf Deutsch und zum Anpassen. Nimm ein Paket, dein Setup oder alle fünf.
          </p>

          <div className={`${s.raster} mt-5`}>
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
                      <span className={s.name}>{p.name}</span>
                      <span className={s.zahl}>{dabei ? "3 Skills · dabei" : "3 Skills"}</span>
                    </span>
                  </button>

                  <div id={`feld-${p.id}`} role="region" aria-labelledby={`reiter-${p.id}`} className={`${s.feld} ${an ? s.feldAn : ""}`}>
                    <div
                      className="grid gap-5 rounded-[18px] bg-white p-5 min-[56.25rem]:grid-cols-[minmax(0,0.78fr)_minmax(0,1.5fr)] min-[56.25rem]:gap-8 min-[56.25rem]:p-6"
                      style={{ border: "1px solid rgba(184,150,62,0.35)", boxShadow: "0 18px 44px rgba(46,43,38,0.08)" }}
                    >
                      <div className="flex flex-col">
                        <h3 className="text-balance font-serif text-[1.7rem] leading-tight text-deep min-[56.25rem]:text-[2rem]">{p.claim}</h3>
                        <p className="mt-3 text-[1rem] leading-snug" style={{ color: TEXT_HELL }}>
                          {berufe.length === BERUFE.length ? "In jedem Setup dabei." : `Im Setup für ${UND.format(berufe.map((b) => b.name))}.`}
                        </p>
                        <div className="mt-auto pt-4">
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
                            <p className="font-mono text-[15px] leading-snug" style={{ color: GOLD_AUF_HELL }}>
                              {k.ordner}
                            </p>
                            <p className="mt-2 text-[0.97rem] leading-snug text-deep">{k.satz}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 · DER BEWEIS: Die schlechten Beispielsätze stehen nur im <pre>, damit Prüfungen der Seite sie nicht als Text werten. */}
      <section className="relative overflow-hidden px-6 py-[7vh]" style={{ background: "var(--tech-bg)" }}>
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-10%] h-[70vh] w-[70vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse, rgba(212,174,90,0.11), transparent 70%)" }} />

        <div className="relative mx-auto max-w-6xl">
          <SektionsKopf
            zeile="So arbeitet ein Skill"
            titel={
              <>
                Wie klingt ein Text <span className="text-gold-light">danach?</span>
              </>
            }
          />

          <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <Reveal className="h-full">
              <div className="h-full overflow-hidden rounded-[16px]" style={{ background: "#15120d", border: "1px solid rgba(212,174,90,0.4)" }}>
                <p className="border-b border-[#3a332a] px-5 py-3 font-mono text-[15px]" style={{ color: TEXT_DUNKEL }}>
                  Vorher: ein typischer KI-Satz, geprüft
                </p>
                <pre className="whitespace-pre-wrap break-words px-5 py-4 font-mono text-[15px] leading-relaxed" style={{ color: TEXT_DUNKEL }}>
                  <code>
                    <span className="text-[#BDB5A6]">$ cat text.md</span>
                    {"\nIn der heutigen schnelllebigen Zeit ist deine Webseite mehr als nur eine Visitenkarte – sie bringt dein Business auf das nächste Level!\n\n"}
                    <span className="text-[#BDB5A6]">$ python3 pruefen.py text.md</span>
                    {"\n"}
                    <span className="text-gold-light">
                      {"Zeile 1  FEHLER  Gedankenstrich „–“\nZeile 1  FEHLER  Wort aus der Liste „nächste Level“\nZeile 1  FEHLER  Wort aus der Liste „In der heutigen schnelllebigen Zeit“\nZeile 1  FEHLER  Wort aus der Liste „mehr als nur“\n4 Fehler, 0 Hinweise."}
                    </span>
                  </code>
                </pre>
              </div>
            </Reveal>
            <Reveal delay={0.07} className="h-full">
              <div className="flex h-full flex-col justify-center rounded-[16px] p-7 md:p-8" style={{ background: "linear-gradient(180deg, #fdf9ee, #f6eedb)", border: "1px solid rgba(212,174,90,0.5)" }}>
                <p className={ZEILE} style={{ color: GOLD_AUF_HELL }}>
                  Nachher, mit dem Skill
                </p>
                <p className="mt-3 font-serif text-[1.8rem] leading-snug text-deep">Deine Webseite hat drei Sekunden. In der Zeit muss klar sein, was du machst und für wen.</p>
                <p className="mt-4 flex items-center gap-3 text-[1rem]" style={{ color: TEXT_HELL }}>
                  <Check aria-hidden size={20} strokeWidth={2.4} className="shrink-0" style={{ color: GOLD_AUF_HELL }} /> Prüfskript: keine Funde.
                </p>
              </div>
            </Reveal>
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-pretty text-center text-[1.02rem] leading-relaxed" style={{ color: TEXT_DUNKEL }}>
            Das ist der Skill <span className="font-mono text-[0.95rem] text-gold-light">menschlich-schreiben</span> aus dem Paket Texte. Sein Prüfskript findet, was nach KI klingt, und Claude schreibt es neu.
          </p>
        </div>
      </section>

      {/* 4 · ANFORDERN: Häkchen je Paket, dann das Formular */}
      <section id="anfordern" className="scroll-mt-4 px-6 py-[7vh]" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #faf2dd 55%, var(--cream) 100%)" }}>
        <div
          className="mx-auto grid max-w-6xl gap-9 rounded-[20px] p-6 sm:p-9 lg:grid-cols-2 lg:gap-14 lg:p-12"
          style={{ background: "linear-gradient(150deg, #2a2217 0%, #14100b 55%, #100c07 100%)", border: "1px solid rgba(212,174,90,0.4)", boxShadow: "0 30px 70px rgba(46,43,38,0.28)" }}
        >
          <div>
            <p className={`${ZEILE} text-gold-light`}>Kostenlos per Mail</p>
            <h2 className="mt-3 text-balance font-serif text-cream" style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", lineHeight: 1.1 }}>
              Welche Pakete <span className="italic text-gold-light">schicke ich dir?</span>
            </h2>

            <fieldset className="mt-6">
              <legend className="sr-only">Pakete auswählen</legend>
              <div className="grid gap-2">
                {PAKETE.map((p) => {
                  const Symbol = SYMBOL[p.id];
                  const dabei = auswahl.includes(p.id);
                  return (
                    <label
                      key={p.id}
                      className="flex min-h-[52px] cursor-pointer items-center gap-3.5 rounded-[12px] px-4 py-2.5 transition-colors duration-200"
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
                      <span className="ml-auto hidden whitespace-nowrap font-mono text-[12.5px] uppercase tracking-[0.12em] sm:inline" style={{ color: TEXT_DUNKEL }}>
                        3 Skills
                      </span>
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
                Alle fünf anhaken
              </button>
              <p aria-live="polite" className="text-[1rem]" style={{ color: TEXT_DUNKEL }}>
                {auswahl.length === 0 ? "Nichts angehakt? Dann bekommst du alle fünf." : auswahl.length === 1 ? "Ein Paket gewählt." : `${auswahl.length} von ${PAKETE.length} Paketen gewählt.`}
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
              Trag dich ein und bestätige kurz die Mail, die danach kommt. Der Klick darin führt dich zu deinen Paketen. Danach bekommst du meinen Newsletter mit KI-Updates für dein Unternehmen. Abmelden geht jederzeit mit einem Klick.
            </p>
            <AnmeldeForm quelle="skill-paket" extra={{ pakete: auswahl.join(","), beruf: mitSetup ? beruf : "" }} knopf="Meine Pakete anfordern" />
          </div>
        </div>
      </section>

      {/* 5 · FRAGEN: Die Frage ist die Tippfläche (Innenabstand plus gleich großer negativer Außenabstand, am Handy 44 px hoch). */}
      <section className="relative overflow-hidden px-6 py-[7vh]" style={{ background: "var(--tech-bg)" }}>
        <div className="relative mx-auto max-w-6xl">
          <SektionsKopf
            zeile="Häufige Fragen"
            titel={
              <>
                Was willst du vorher <span className="text-gold-light">wissen?</span>
              </>
            }
          />

          <div className="mt-7 grid items-start gap-3 min-[56.25rem]:grid-cols-2">
            {FRAGEN.map((f) => (
              <details key={f.q} className="group rounded-[14px] px-5 py-4 [&_summary::-webkit-details-marker]:hidden" style={{ background: "rgba(24,18,10,0.92)", border: "1px solid rgba(212,174,90,0.38)" }}>
                <summary className="-my-1.5 flex cursor-pointer list-none items-center justify-between gap-5 py-1.5">
                  <h3 className="font-serif text-[1.3rem] leading-snug text-cream">{f.q}</h3>
                  <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-light text-xl text-gold-light transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[1rem] leading-relaxed" style={{ color: TEXT_DUNKEL }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          {/* py-3 an den Links im Satz: Tippfläche am Handy 44 px, die Zeile bleibt gleich hoch. */}
          <p className="mt-8 text-center text-[1rem] leading-relaxed" style={{ color: TEXT_DUNKEL }}>
            Noch mehr kostenlose Hilfen, darunter das{" "}
            <Link href="/claude-code/startpaket" className="py-3 font-semibold text-gold-light underline decoration-[rgba(212,174,90,0.6)] underline-offset-4 hover:text-cream">
              Claude-Code-Startpaket
            </Link>
            , findest du unter{" "}
            <Link href="/ressourcen" className="py-3 font-semibold text-gold-light underline decoration-[rgba(212,174,90,0.6)] underline-offset-4 hover:text-cream">
              Ressourcen
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
