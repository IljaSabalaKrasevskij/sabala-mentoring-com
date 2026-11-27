"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/akademie/shared";
import { KURS_PREIS } from "@/components/akademie/cohorts";
import { WEBKURS_PREIS } from "@/components/webkurs/daten";
import { KASSE_SB, KASSE_WEB, PREIS_SB, PREIS_WEB, euro } from "./angebot";

/* Die bewegten Teile der Gutschein-Seite. Ohne JavaScript steht überall der Endwert, Bewegung kommt nur obendrauf.
   Bei „Bewegung reduzieren“ zählt nichts hoch und nichts schwebt (CSS in special-offer.css). */

const EASE = [0.16, 1, 0.3, 1] as const;

/* Zählt beim ersten Sichtbarwerden von 0 auf den Wert hoch. Im HTML steht von Anfang an der Endwert. */
export function Zaehler({ bis, art = "zahl", dauer = 1.6 }: { bis: number; art?: "zahl" | "prozent" | "euro"; dauer?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const imBlick = useInView(ref, { once: true, margin: "-40px" });
  const still = useReducedMotion();
  const wert = useMotionValue(bis);
  const text = useTransform(wert, (v) => {
    const n = Math.round(v);
    return art === "prozent" ? `${n} %` : art === "euro" ? euro(n) : String(n);
  });
  useEffect(() => {
    if (!imBlick || still) return;
    wert.set(0);
    const lauf = animate(wert, bis, { duration: dauer, ease: EASE });
    return () => lauf.stop();
  }, [imBlick, still, bis, dauer, wert]);
  return <motion.span ref={ref}>{text}</motion.span>;
}

type Gutschein = { id: "second-brain" | "webseiten-kurs"; name: string; zusatz: string; preis: number; statt: number; kasse: string };

const GUTSCHEINE: Gutschein[] = [
  { id: "second-brain", name: "Second Brain", zusatz: "mit Claude Code", preis: PREIS_SB, statt: KURS_PREIS, kasse: KASSE_SB },
  { id: "webseiten-kurs", name: "Webseiten-Kurs", zusatz: "mit Claude Code", preis: PREIS_WEB, statt: WEBKURS_PREIS, kasse: KASSE_WEB },
];

/* Eine Gutschein-Karte wie aus Papier mit Goldprägung: links Kurs und Preis, rechts der Abschnitt mit −50 %,
   dazwischen eine Perforation mit zwei Stanzlöchern. `grund` ist die Farbe dahinter (für die Stanzlöcher). */
export function GutscheinKarte({ g, grund = "var(--tech-bg)", spaet = false }: { g: Gutschein; grund?: string; spaet?: boolean }) {
  return (
    <div
      className="relative grid aspect-[1.72] w-full grid-cols-[minmax(0,1fr)_31%] overflow-hidden rounded-[18px] text-left"
      style={{
        background: "radial-gradient(120% 90% at 0% 0%, #5a4520 0%, #2c210f 38%, #140e07 72%, #0e0a05 100%)",
        border: "1.5px solid rgba(212,174,90,0.6)",
        boxShadow: "0 40px 90px rgba(0,0,0,0.55), 0 0 70px rgba(184,150,62,0.18), inset 0 1px 0 rgba(255,230,170,0.25)",
      }}
    >
      <span className={`so-glanz ${spaet ? "so-glanz-spaet" : ""}`} />
      <div className="relative flex flex-col justify-between p-[7%] pr-[5%]">
        <div className="flex items-center gap-2">
          <Image src="/images/logo-sabala-mentoring.png" alt="" width={22} height={22} />
          <span className="whitespace-nowrap font-mono text-[12.5px] uppercase tracking-[0.1em] text-gold-light sm:tracking-[0.18em]">Gutschein · 2027</span>
        </div>
        <div>
          <p className="font-serif leading-[0.95] text-cream" style={{ fontSize: "clamp(1.7rem, 3.1vw, 2.6rem)" }}>{g.name}</p>
          <p className="mt-1 text-[clamp(0.8rem,1.1vw,0.95rem)] text-[rgba(250,248,245,0.7)]">{g.zusatz}</p>
        </div>
        <p className="leading-none">
          <span className="font-serif text-gold-light" style={{ fontSize: "clamp(1.6rem, 2.7vw, 2.25rem)" }}>{euro(g.preis)}</span>
          <span className="ml-2 text-[clamp(0.8rem,1vw,0.92rem)] text-[rgba(250,248,245,0.65)]">
            statt <span className="line-through">{euro(g.statt)}</span>
          </span>
        </p>
      </div>
      <div className="relative flex flex-col items-center justify-center border-l-2 border-dashed border-[rgba(212,174,90,0.5)] text-center">
        <span className="so-stanz -top-[11px] left-0" style={{ background: grund }} />
        <span className="so-stanz -bottom-[11px] left-0" style={{ background: grund }} />
        <span className="font-serif leading-none text-gold-light" style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)" }}>
          −<Zaehler bis={50} art="prozent" />
        </span>
        <span className="mt-2 whitespace-nowrap font-mono text-[12.5px] uppercase tracking-[0.04em] text-[rgba(250,248,245,0.7)] sm:tracking-[0.1em]">ein Platz</span>
      </div>
    </div>
  );
}

/* Kopf rechts: beide Gutscheine übereinander, leicht gedreht, schwebend. Ein Klick springt zum Angebot. */
export function HeroGutscheine() {
  return (
    <div className="relative mx-auto aspect-[0.98] w-full max-w-[520px]">
      <span aria-hidden className="so-licht pointer-events-none absolute inset-[-10%] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(212,174,90,0.28), transparent)" }} />
      {GUTSCHEINE.map((g, i) => (
        <a
          key={g.id}
          href={`#${g.id}`}
          aria-label={`${g.name}: Gutschein ${euro(g.preis)} statt ${euro(g.statt)} ansehen`}
          className={`absolute block w-[84%] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${i === 0 ? "left-0 top-0 z-10" : "bottom-0 right-0 z-20"}`}
          style={{ transform: `rotate(${i === 0 ? -7 : 5}deg)` }}
        >
          <div className={i === 0 ? "so-schweben" : "so-schweben-spaet"}>
            <TiltCard hervor={1.03} max={8} radius={18}>
              <GutscheinKarte g={g} spaet={i === 1} />
            </TiltCard>
          </div>
        </a>
      ))}
    </div>
  );
}

/* Abschluss eines Angebots: der Gutschein groß, daneben Ersparnis, Preis und der Knopf zur Kasse. */
export function GutscheinBox({ id }: { id: Gutschein["id"] }) {
  const g = GUTSCHEINE.find((x) => x.id === id)!;
  return (
    <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-12">
      <motion.div initial={{ opacity: 0, rotate: -4, y: 30 }} whileInView={{ opacity: 1, rotate: -2, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9, ease: EASE }}>
        <TiltCard hervor={1.03} max={7} radius={18}>
          <GutscheinKarte g={g} grund="var(--cream)" />
        </TiltCard>
      </motion.div>
      <div>
        <p className="font-mono text-[12.5px] uppercase tracking-[0.2em]" style={{ color: "#8a6a1f" }}>Dein Gutschein für 2027</p>
        <p className="mt-3 font-serif leading-[1.05] text-deep" style={{ fontSize: "clamp(2rem, 3.6vw, 2.9rem)" }}>
          Du sparst <span style={{ color: "#8a6a1f" }}><Zaehler bis={g.statt - g.preis} art="euro" /></span>.
        </p>
        <p className="mt-3 text-[1.05rem] leading-relaxed text-[rgba(46,43,38,0.82)]">
          {euro(g.preis)} statt {euro(g.statt)}, netto zzgl. MwSt. Für Unternehmen und Selbständige. Dein Code kommt direkt nach dem Kauf automatisch per Mail und gilt für jeden Termin 2027.
        </p>
        <a
          href={g.kasse}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex min-h-[56px] w-full items-center justify-center gap-3 bg-gold px-7 py-3 font-sans text-[1.02rem] font-semibold tracking-[0.04em] text-tech-bg transition-colors duration-300 hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:w-auto"
        >
          Gutschein {g.name} kaufen
          <ArrowRight aria-hidden size={18} strokeWidth={2.2} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

/* Mail-Vorschau im Ablauf: Der Code wird beim Hinsehen „getippt“. Gezeigt wird nur ein Muster, nie der echte Code. */
export function MailVorschau() {
  const code = "SB27-•••••";
  const ref = useRef<HTMLDivElement>(null);
  const imBlick = useInView(ref, { once: true, margin: "-60px" });
  const still = useReducedMotion();
  const n = useMotionValue(code.length);
  const getippt = useTransform(n, (v) => code.slice(0, Math.round(v)));
  useEffect(() => {
    if (!imBlick || still) return;
    n.set(0);
    const lauf = animate(n, code.length, { duration: 1.4, ease: "linear", delay: 0.5 });
    return () => lauf.stop();
  }, [imBlick, still, n]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="overflow-hidden rounded-2xl bg-[#fcfaf4] text-deep shadow-[0_40px_90px_rgba(0,0,0,0.5)]"
      style={{ border: "1px solid rgba(212,174,90,0.5)" }}
    >
      <div className="flex items-center gap-1.5 border-b border-[rgba(46,43,38,0.1)] bg-[#f1ece1] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e0a49a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e5cd8f]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#a9c99a]" />
        <span className="ml-3 font-mono text-[12.5px] text-[rgba(46,43,38,0.6)]">Posteingang</span>
      </div>
      <div className="space-y-1 px-5 pt-4 text-[0.95rem]">
        <p><span className="text-[rgba(46,43,38,0.6)]">Von:</span> Sabala Academy</p>
        <p><span className="text-[rgba(46,43,38,0.6)]">Betreff:</span> <span className="font-semibold">Dein Gutscheincode für 2027</span></p>
      </div>
      <div className="px-5 pb-5 pt-4">
        <p className="text-[1rem] leading-relaxed">Danke für deinen Kauf! Dein Gutscheincode für den Second-Brain-Kurs 2027:</p>
        <p className="mt-3 inline-flex items-center rounded-lg bg-tech-bg px-4 py-2.5 font-mono text-[1.15rem] tracking-[0.12em] text-gold-light">
          <motion.span>{getippt}</motion.span>
          <span aria-hidden className="so-cursor ml-0.5 inline-block h-[1.1em] w-[2px] bg-gold-light" />
        </p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-[rgba(46,43,38,0.75)]">2027 wählst du deinen Termin und gibst den Code an der Kasse ein. Dein Platz ist bezahlt.</p>
      </div>
    </motion.div>
  );
}

/* Mitlaufende Kaufleiste: erscheint nach dem Kopf, verschwindet am Seitenende, wo der Schluss beide Kassen zeigt. */
export function Kaufleiste() {
  const [zeigen, setZeigen] = useState(false);
  useEffect(() => {
    let rahmen = 0;
    const pruefen = () => {
      cancelAnimationFrame(rahmen);
      rahmen = requestAnimationFrame(() => {
        const y = scrollY;
        setZeigen(y > innerHeight * 0.85 && y + innerHeight < document.documentElement.scrollHeight - innerHeight * 1.4);
      });
    };
    pruefen();
    addEventListener("scroll", pruefen, { passive: true });
    addEventListener("resize", pruefen);
    return () => {
      cancelAnimationFrame(rahmen);
      removeEventListener("scroll", pruefen);
      removeEventListener("resize", pruefen);
    };
  }, []);
  return (
    <div
      aria-hidden={!zeigen}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(212,174,90,0.45)] bg-[rgba(10,8,6,0.88)] backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${zeigen ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <p className="mr-auto hidden font-mono text-[12.5px] uppercase tracking-[0.2em] text-gold-light md:block">Special Offer 2026 · je 50 % gespart</p>
        {GUTSCHEINE.map((g) => (
          <a
            key={g.id}
            href={g.kasse}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={zeigen ? 0 : -1}
            className="flex min-h-[48px] flex-1 items-center justify-center gap-2 bg-gold px-3 text-center text-[0.92rem] font-semibold text-tech-bg transition-colors hover:bg-gold-light md:flex-none md:px-5"
          >
            {g.name} · {euro(g.preis)}
          </a>
        ))}
      </div>
    </div>
  );
}
