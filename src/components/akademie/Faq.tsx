"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Knopf, PlatzKnopf, Reveal, SektionsKopf, TEXT_AUF_DUNKEL, TEXT_AUF_HELL } from "./shared";
import { CURRENT_COHORT, formatTagMonat } from "./cohorts";
import { FRAGEN } from "./fragen";

/* Fragen und Schluss. Die Fragen stehen am Laptop in zwei Spalten, damit sie in ein Fenster passen.
   Danach kommen die zwei Wege, wie es weitergeht: der Platz im Kurs oder, für Unentschlossene,
   erst die Beratungsstunde. */

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b" style={{ borderColor: "rgba(46,43,38,0.14)" }}>
      <button type="button" aria-expanded={open} onClick={onToggle} className="flex min-h-[60px] w-full items-center justify-between gap-6 py-3.5 text-left">
        <span className="font-serif text-[1.2rem] leading-snug text-deep">{q}</span>
        <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
          <span className="absolute h-[1.5px] w-3.5" style={{ background: "var(--gold)" }} />
          <span className="absolute h-3.5 w-[1.5px] transition-transform duration-300" style={{ background: "var(--gold)", transform: open ? "scaleY(0)" : "scaleY(1)" }} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="whitespace-pre-line pb-6 pr-8 text-[1.02rem] leading-relaxed" style={{ color: TEXT_AUF_HELL }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const haelfte = Math.ceil(FRAGEN.length / 2);
  return (
    <>
      <section className="relative px-6 pb-[4vh] pt-[7vh]" style={{ background: "var(--cream)" }}>
        <div className="mx-auto max-w-6xl">
          <SektionsKopf hell zeile="Noch Fragen?" titel="Was du vielleicht noch wissen willst" />

          <div className="mt-8 grid items-start gap-x-14 min-[56.25rem]:grid-cols-2">
            {[FRAGEN.slice(0, haelfte), FRAGEN.slice(haelfte)].map((spalte, s) => (
              <div key={s}>
                {spalte.map(([q, a], i) => {
                  const nr = s * haelfte + i;
                  return <Item key={q} q={q} a={a} open={open === nr} onToggle={() => setOpen(open === nr ? null : nr)} />;
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schluss: die Handy-Leiste (PlatzLeiste) verschwindet, sobald dieser Block erreicht ist */}
      <section id="schluss" className="relative px-6 pb-[9vh] pt-[5vh]" style={{ background: "var(--cream)" }}>
        <Reveal className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl px-7 py-10 text-center md:px-12 md:py-12" style={{ background: "linear-gradient(180deg, #17120b, #0a0806)", border: "1.5px solid rgba(184,150,62,0.55)", boxShadow: "0 30px 70px rgba(46,43,38,0.28)" }}>
          <div className="pointer-events-none absolute left-1/2 top-0 h-[70%] w-[80%] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.22), transparent 70%)" }} />
          <h2 className="relative mx-auto max-w-2xl text-balance font-serif text-cream" style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.7rem)", lineHeight: 1.1 }}>
            Lass Claude nicht länger <span className="text-gold-light">bei null anfangen.</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-pretty text-[1.06rem] leading-relaxed" style={{ color: TEXT_AUF_DUNKEL }}>
            {CURRENT_COHORT
              ? `Der nächste Kurs startet am ${formatTagMonat(CURRENT_COHORT.start)}, mit maximal ${CURRENT_COHORT.capacity} Plätzen. Du bist noch unsicher? Dann lernen wir uns erst kennen.`
              : "Der nächste Kurs wird gerade geplant. Trag dich auf die Warteliste ein, oder wir lernen uns erst kennen."}
          </p>
          {/* Am Handy stehen die zwei Knöpfe untereinander und gleich breit */}
          <div className="relative mx-auto mt-7 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <PlatzKnopf kasse />
            <Knopf zweit href="/beratung">
              Erst kennenlernen
            </Knopf>
          </div>
          <p className="relative mx-auto mt-5 max-w-lg text-[0.9rem] leading-relaxed" style={{ color: "rgba(250,248,245,0.65)" }}>
            „Erst kennenlernen“ führt zur Beratungsstunde: 60 Minuten nur für deine Fragen, 1:1. Dazu bekommst du einen Gutschein für den Kurs.
          </p>
        </Reveal>
      </section>
    </>
  );
}
