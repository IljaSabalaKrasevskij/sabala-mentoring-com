"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Brackets, Eyebrow } from "./shared";

/* Über Ilja — Portrait + kurze, menschliche Autorität. Kein Lebenslauf. */

const BADGES = ["AdA-Schein", "e-Trainer-Zertifizierung", "Business-Trainer & Speaker", "5 Jahre Avendoo", "KI-Dozent bei KIfiziert"];

export default function AboutIlja() {
  return (
    <section className="relative overflow-hidden px-6 py-[16vh]" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #faf2dd 55%, var(--cream) 100%)" }}>
      {/* atmosphärische Akzente */}
      <div className="pointer-events-none absolute -left-[10%] top-[15%] h-[55vh] w-[55vw]" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.22), transparent 70%)" }} />
      <div className="pointer-events-none absolute right-[5%] bottom-[10%] h-[40vh] w-[40vw]" style={{ background: "radial-gradient(ellipse, rgba(212,174,90,0.18), transparent 70%)" }} />
      <div className="ilja-topo pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="relative mx-auto max-w-5xl">
        {/* ─── Headline + Portrait in einer Linie ─── */}
        <div className="grid items-start gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
          {/* Text — links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Eyebrow center={false}>// wer dir das beibringt</Eyebrow>
            <h2 className="mt-5 font-serif text-deep" style={{ fontSize: "clamp(2rem, 4.4vw, 3.1rem)", lineHeight: 1.06 }}>
              Ich bin Trainer. <span className="ilja-accent" style={{ color: "var(--gold)" }}>Seit ich 19 bin.</span>
            </h2>
            <div className="mt-6 space-y-4 text-[1.04rem] leading-relaxed text-warm-mid">
              <p>Mit 19 wurde ich Führungskraft bei McDonald&apos;s und habe angefangen, Menschen auszubilden. Seitdem habe ich damit nie aufgehört.</p>
              <p>AdA-Schein, Trainer-der-Trainer, e-Trainer-Zertifizierung, eine Ausbildung als Business-Trainer und Speaker. Seit fünf Jahren arbeite ich als digitaler Trainer für Avendoo, ein Learning-Management-System. Und als KI-Dozent bei KIfiziert.</p>
              <p>Jetzt nehme ich alles, was ich übers Lehren gelernt habe, und bringe dir damit KI bei. Nicht als Theorie-Vortrag, sondern so, wie Training wirklich funktioniert: vormachen, nachmachen, sicherstellen, dass du es kannst.</p>
              <p>Denn was Training erfolgreich macht, ist nicht das Wissen. Es ist der Transfer. Genau dafür sorge ich: dass das, was ich hier verspreche, bei dir ankommt und du es danach wirklich nutzt.</p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {BADGES.map((b, i) => (
                <span
                  key={b}
                  className="ilja-badge relative px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    color: "var(--deep)",
                    background: "linear-gradient(135deg, rgba(184,150,62,0.14), rgba(212,174,90,0.08))",
                    border: "1px solid rgba(184,150,62,0.38)",
                    boxShadow: "0 4px 10px rgba(184,150,62,0.08)",
                    animationDelay: `${0.15 + i * 0.08}s`,
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Portrait — rechts, größer, top-bündig */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-md md:mx-0"
          >
            {/* Sanfter Gold-Halo hinter dem Portrait */}
            <span className="pointer-events-none absolute -inset-6 rounded-3xl" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.18), transparent 70%)" }} />
            {/* Mini-Akzent: kleine Gold-Welle oben rechts */}
            <span className="ilja-spark pointer-events-none absolute -top-3 -right-3 inline-flex h-6 w-6 items-center justify-center">
              <span className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(184,150,62,0.55), transparent 70%)" }} />
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: "var(--gold)" }}>
                <path d="M12 2v6M12 16v6M2 12h6M16 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl" style={{ border: "1.5px solid rgba(184,150,62,0.42)", boxShadow: "0 30px 70px rgba(120,90,30,0.22), 0 8px 24px rgba(184,150,62,0.16)" }}>
              <Brackets color="rgba(184,150,62,0.7)" inset={14} size={16} />
              <Image
                src="/akademie/ilja-trainer.jpg"
                alt="Ilja Krasevskij"
                fill
                sizes="(max-width: 768px) 90vw, 500px"
                className="object-cover object-center"
                priority={false}
              />
            </div>
            {/* Gold-Akzent-Linie unten */}
            <span className="absolute -bottom-3 left-10 right-10 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
          </motion.div>
        </div>

        {/* ─── Trust-Bar — eigene Reihe unter Bild + Text ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="ilja-trust relative mt-16 border-t pt-9"
          style={{ borderColor: "rgba(184,150,62,0.35)" }}
        >
          {/* feiner Trenner-Akzent */}
          <span className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full" style={{ background: "var(--gold)", boxShadow: "0 0 16px var(--gold)" }} />

          <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.32em] text-gold">
            // verifiziert &amp; zertifiziert
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-7">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/trust/ica.png"
              alt="ICA — International Coaching Association · Certified Trainer"
              className="h-16 w-auto transition-transform duration-300 hover:scale-105 hover:-rotate-1"
              style={{ filter: "drop-shadow(0 6px 14px rgba(120,90,30,0.18))" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/trust/fhm-virtuelle.png"
              alt="FHM-Gütesiegel — Zertifizierter eTrainer · Virtuelle Unterrichtsqualität"
              className="h-16 w-auto transition-transform duration-300 hover:scale-105 hover:rotate-1"
              style={{ filter: "drop-shadow(0 6px 14px rgba(120,90,30,0.18))" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/trust/provenexpert.png"
              alt="ProvenExpert — geprüfte Bewertungen"
              className="h-9 w-auto transition-transform duration-300 hover:scale-105"
              style={{ filter: "drop-shadow(0 6px 14px rgba(120,90,30,0.16))" }}
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        /* sanfte Topographic-Linien als Hintergrund-Textur */
        .ilja-topo {
          background-image:
            repeating-linear-gradient(0deg, transparent 0, transparent 30px, rgba(120,90,30,0.45) 30px, rgba(120,90,30,0.45) 31px),
            repeating-linear-gradient(90deg, transparent 0, transparent 30px, rgba(120,90,30,0.45) 30px, rgba(120,90,30,0.45) 31px);
        }

        /* Gold-Accent in Headline pulst minimal */
        .ilja-accent {
          background: linear-gradient(100deg, #B8963E 0%, #d4ae5a 50%, #B8963E 100%);
          background-size: 220% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: ilja-shimmer 6s ease-in-out infinite;
        }
        @keyframes ilja-shimmer {
          0%,100% { background-position: 0% 0; }
          50% { background-position: 100% 0; }
        }

        /* Spark um Portrait dreht & pulst */
        .ilja-spark { animation: ilja-spark 3.5s ease-in-out infinite; }
        @keyframes ilja-spark {
          0%,100% { transform: rotate(0deg) scale(1); opacity: 0.85; }
          50%     { transform: rotate(45deg) scale(1.15); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
