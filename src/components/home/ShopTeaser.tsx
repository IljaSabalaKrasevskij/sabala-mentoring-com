"use client";

import Link from "next/link";
import { motion } from "motion/react";

/* ─────────────────────────────────────────────────────────────────────────
   Shop-Teaser — „Werkzeuge zum Mitnehmen": nach dem dunklen Mooni-Voice-Abschnitt,
   heller Atemzug vor „Der Mensch". Startet mit Dunkel→Cream-Verlauf,
   gleiches Muster wie die anderen Übergänge der Seite.
   ───────────────────────────────────────────────────────────────────────── */

export default function ShopTeaser() {
  return (
    <section id="shop" className="relative overflow-hidden" style={{ background: "var(--cream)" }}>
      {/* Übergang aus der dunklen Planeten-Sektion */}
      <div
        aria-hidden
        className="h-[16vh] w-full"
        style={{
          background:
            "linear-gradient(to bottom, #0A0806 0%, #14100c 18%, #2a2118 36%, #6b5a45 58%, #b6a079 78%, #e4d6ba 91%, var(--cream) 100%)",
        }}
      />

      <div className="px-6 pb-[13vh] pt-[6vh]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">{"// der shop"}</p>
          <h2 className="mt-5 font-serif leading-[1.08]" style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.3rem)", color: "#2A2520", letterSpacing: "-0.01em" }}>
            Werkzeuge zum Mitnehmen.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.1rem] leading-relaxed" style={{ color: "#46403A" }}>
            Was ich für meine eigene Arbeit baue und freigebe, liegt im Shop. Quelloffen und
            gratis. Den Anfang macht Mooni Voice.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-gold-light px-9 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold"
          >
            Zum Shop <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
