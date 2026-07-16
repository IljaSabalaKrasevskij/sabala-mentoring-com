"use client";

import Link from "next/link";
import { motion } from "motion/react";

/* ─────────────────────────────────────────────────────────────────────────
   Shop-Teaser — „Mein Setup zum Mitnehmen": nach der dunklen Planetenwelt,
   heller Atemzug vor „Der Mensch". Startet mit Dunkel→Cream-Verlauf,
   gleiches Muster wie die anderen Übergänge der Seite.
   ───────────────────────────────────────────────────────────────────────── */

type Product = { title: string; line: string; price: string };

const PRODUCTS: Product[] = [
  { title: "Skill-Bibliothek", line: "Kuratierte Claude-Code-Skills mit geführtem Setup.", price: "19 €" },
  { title: "KI-Assistenzteam", line: "Sieben GPTs, die in deiner Stimme schreiben.", price: "67 €" },
  { title: "Web Design OS", line: "Mein komplettes Webseiten-Setup mit Claude Code.", price: "147 €" },
  { title: "Mooni Voice", line: "Deine Stimme wird Text, lokal auf deinem Mac.", price: "gratis" },
];

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
            Mein Setup zum Mitnehmen.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.1rem] leading-relaxed" style={{ color: "#46403A" }}>
            Fertige Setups zum Herunterladen, die Werkzeuge, mit denen ich selbst jeden Tag
            arbeite, einmal holen und sofort loslegen.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href="/shop"
                className="group flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(184,150,62,0.22)",
                  boxShadow: "0 14px 34px rgba(80,60,20,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                <span className="font-mono text-[11px] tracking-[0.3em] text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-serif text-[1.4rem] leading-snug" style={{ color: "#2A2520" }}>
                  {p.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[0.94rem] leading-relaxed" style={{ color: "#46403A" }}>
                  {p.line}
                </p>
                <div className="mt-5 flex items-baseline justify-between border-t pt-4" style={{ borderColor: "rgba(184,150,62,0.18)" }}>
                  <span className="font-mono text-[13px] tracking-[0.08em]" style={{ color: "#7A6A3E" }}>
                    {p.price}
                  </span>
                  <span aria-hidden className="font-mono text-[13px] text-gold transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
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
