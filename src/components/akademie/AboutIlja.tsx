"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Brackets, Eyebrow } from "./shared";

/* Über Ilja — Portrait + kurze, menschliche Autorität. Kein Lebenslauf. */

const BADGES = ["AdA-Schein", "e-Trainer-Zertifizierung", "Business-Trainer & Speaker", "5 Jahre Avendoo", "KI-Dozent bei KIfiziert"];

export default function AboutIlja() {
  return (
    <section className="relative overflow-hidden px-6 py-[16vh]" style={{ background: "var(--cream)" }}>
      <div className="relative mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        {/* Portrait — rechts */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full max-w-sm md:order-2"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(184,150,62,0.3)", boxShadow: "0 24px 60px rgba(80,60,20,0.18)" }}>
            <Brackets color="rgba(184,150,62,0.6)" inset={12} size={14} />
            <Image src="/akademie/ilja-trainer.jpg" alt="Ilja Krasevskij" fill sizes="(max-width: 768px) 90vw, 400px" className="object-cover object-center" priority={false} />
          </div>
          {/* Gold-Akzent-Linie */}
          <span className="absolute -bottom-3 left-8 right-8 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
        </motion.div>

        {/* Text — links */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="md:order-1"
        >
          <Eyebrow center={false}>// wer dir das beibringt</Eyebrow>
          <h2 className="mt-5 font-serif text-deep" style={{ fontSize: "clamp(1.9rem, 4vw, 2.9rem)", lineHeight: 1.08 }}>
            Ich bin Trainer. <span style={{ color: "var(--gold)" }}>Seit ich 19 bin.</span>
          </h2>
          <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-warm-mid">
            <p>Mit 19 wurde ich Führungskraft bei McDonald&apos;s und habe angefangen, Menschen auszubilden. Seitdem habe ich damit nie aufgehört.</p>
            <p>AdA-Schein, Trainer-der-Trainer, e-Trainer-Zertifizierung, eine Ausbildung als Business-Trainer und Speaker. Seit fünf Jahren arbeite ich als digitaler Trainer für Avendoo, ein Learning-Management-System. Und als KI-Dozent bei KIfiziert.</p>
            <p>Jetzt nehme ich alles, was ich übers Lehren gelernt habe, und bringe dir damit KI bei. Nicht als Theorie-Vortrag, sondern so, wie Training wirklich funktioniert: vormachen, nachmachen, sicherstellen, dass du es kannst.</p>
            <p>Denn was Training erfolgreich macht, ist nicht das Wissen. Es ist der Transfer. Genau dafür sorge ich: dass das, was ich hier verspreche, bei dir ankommt und du es danach wirklich nutzt.</p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {BADGES.map((b) => (
              <span key={b} className="relative px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--deep)", background: "rgba(184,150,62,0.1)", border: "1px solid rgba(184,150,62,0.3)" }}>
                {b}
              </span>
            ))}
          </div>

          {/* Trust-Bar — Zertifizierungen / Verbände */}
          <div className="ilja-trust mt-10 border-t pt-7" style={{ borderColor: "rgba(184,150,62,0.22)" }}>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.26em]" style={{ color: "rgba(80,60,20,0.55)" }}>
              // verifiziert & zertifiziert
            </p>
            <div className="flex flex-wrap items-center gap-x-9 gap-y-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/trust/avendoo.svg"
                alt="Avendoo · Digitaler Trainer seit 5 Jahren"
                className="h-9 w-auto opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/trust/icf.png"
                alt="ICF Germany — International Coaching Federation"
                className="h-9 w-auto opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/trust/provenexpert.png"
                alt="ProvenExpert — geprüfte Bewertungen"
                className="h-7 w-auto opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
