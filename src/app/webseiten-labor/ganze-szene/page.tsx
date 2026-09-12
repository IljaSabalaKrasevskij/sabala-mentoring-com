"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import AdlerHero from "@/components/webseiten/AdlerHero";

/* Variante 2 (Labor): nur der Header, die komplette Szene ohne Beschnitt.
   Erbt noindex vom Labor-Layout. */
const EASE = [0.16, 1, 0.3, 1] as const;

export default function GanzeSzenePage() {
  return (
    <main style={{ background: "#0B0906" }}>
      <AdlerHero mode="contain">
        <div className="flex h-full w-full items-end pb-8 md:pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="mx-auto w-full max-w-6xl">
            <div className="max-w-md" style={{ textShadow: "0 2px 24px rgba(11,9,6,0.85), 0 1px 4px rgba(11,9,6,0.7)" }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">// high-end web development</p>
              <h1 className="mt-3.5 font-serif text-cream" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.4rem)", lineHeight: 1.08, letterSpacing: "-0.01em" }}>
                Design, das verkauft.
                <br />
                <em className="not-italic" style={{ color: "var(--gold-light)" }}>Und im Kopf bleibt.</em>
              </h1>
              <a href="#analyse" className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-gold-light px-6 py-3 font-mono text-[12px] uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold max-md:hidden" style={{ textShadow: "none" }}>
                Kostenlose Potenzial-Analyse <ArrowRight size={14} aria-hidden />
              </a>
            </div>
          </motion.div>
        </div>
      </AdlerHero>
      <p className="px-6 py-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-warm-light/35">
        Variante 2 · ganze Szene · nur Header
      </p>
    </main>
  );
}
