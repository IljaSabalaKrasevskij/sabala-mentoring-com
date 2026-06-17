"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eyebrow } from "./shared";

const QA: [string, string][] = [
  ["Ich habe noch nie das Terminal benutzt. Ist das ein Problem?", "Nein. Wir richten das Terminal in Session 2 gemeinsam ein, von Anfang an. Du verlässt die Session mit einer funktionierenden Umgebung — unabhängig von deiner technischen Vorbildung."],
  ["Brauche ich Claude Code Pro?", "Ja. Für Session 2 ist Claude Code Pro Pflicht, sonst kannst du nicht sinnvoll mitarbeiten. Session 1 funktioniert ohne Claude Code Pro, aber für das fertige Memory-System brauchst du es."],
  ["Ich habe Obsidian schon. Fange ich trotzdem von vorne an?", "Nein. Wir schauen gemeinsam auf dein bestehendes Setup und integrieren das System dort, wo es Sinn macht."],
  ["Was, wenn ich an einem Termin nicht kann?", "Dann ist dieser Durchlauf wahrscheinlich nicht der richtige. Der Kurs ist kein Aufzeichnungsprodukt. Wir bauen dein System live. Du solltest an beiden Terminen dabei sein, damit du wirklich weiterarbeiten kannst."],
  ["Für wen ist der Kurs nicht gedacht?", "Nicht für Menschen, die nur nebenbei schauen wollen. Die Plätze sind für Teilnehmer:innen, die sich committen, beide Termine blocken und das Setup wirklich einrichten wollen."],
  ["Ist das für Mac und Windows?", "Beides funktioniert. Obsidian, NotebookLM und Claude Code laufen auf beiden Systemen. Etwaige Unterschiede klären wir in der Session."],
];

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b" style={{ borderColor: "rgba(46,43,38,0.12)" }}>
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between gap-6 py-6 text-left">
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
            <p className="pb-6 pr-10 text-[1rem] leading-relaxed text-warm-mid">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative px-6 py-[16vh]" style={{ background: "var(--cream)" }}>
      <div className="mx-auto max-w-2xl">
        <Eyebrow>{"// noch fragen?"}</Eyebrow>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-5 mb-10 text-center font-serif text-deep"
          style={{ fontSize: "clamp(2rem, 4.6vw, 3rem)", lineHeight: 1.06 }}
        >
          Was du vielleicht noch wissen willst
        </motion.h2>

        <div>
          {QA.map(([q, a], i) => (
            <Item key={q} q={q} a={a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
