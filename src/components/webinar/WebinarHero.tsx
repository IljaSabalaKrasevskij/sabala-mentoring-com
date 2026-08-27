"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Brackets } from "@/components/akademie/shared";
import { LiveDot } from "./WebinarFormat";
import { WEBINAR } from "./config";

/* ─────────────────────────────────────────────────────────────────────────
   WebinarHero — dunkler Kopf im Akademie-Look: Portrait rechts, Scrim links,
   Termin-Karte, ein CTA. Bewusst ohne WebGL: die Seite soll auf dem Handy
   sofort da sein, nicht erst nach dem Shader.

   Bewegung kommt aus zwei Quellen, beide reduced-motion-sicher:
   - wd-aurora-* (globals.css) fuer den langsamen Gold-Nebel
   - framer-motion fuer den gestaffelten Text-Einstieg
   ───────────────────────────────────────────────────────────────────────── */

const gold = "#b8963e";

export default function WebinarHero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0a0806" }}>
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero/ilja-default.png"
          alt="Ilja Krasevskij"
          fill
          priority
          className="object-cover object-right"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(10,8,6,0.95) 0%, rgba(10,8,6,0.74) 32%, rgba(10,8,6,0.34) 52%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,8,6,0.66) 0%, rgba(10,8,6,0.54) 50%, rgba(10,8,6,0.8) 100%)",
          }}
        />
        {/* Gold-Nebel, rein dekorativ */}
        <div
          aria-hidden
          className="wd-aurora-a absolute"
          style={{
            top: "-20%",
            left: "-10%",
            width: "70vw",
            height: "70vw",
            background: "radial-gradient(circle at center, rgba(184,150,62,0.16) 0%, rgba(184,150,62,0) 62%)",
            pointerEvents: "none",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[86vh] flex-col justify-center px-[6vw] py-[12vh]">
        {/* Webinar-Badge: das Format muss in der ersten Sekunde klar sein,
            nicht erst in der Subline. */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-4"
        >
          <span
            className="font-mono inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.24em] md:text-xs"
            style={{
              color: "#0a0806",
              background: gold,
              padding: "8px 15px",
              fontWeight: 700,
            }}
          >
            <LiveDot size={7} />
            Live-Webinar
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "rgba(250,248,245,0.68)" }}>
            Kostenlos · Sabala Academy
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-5 max-w-[760px] font-serif leading-[1.05] text-cream"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", textShadow: "0 2px 30px rgba(10,8,6,0.7)" }}
        >
          Dein Wissen gehört
          <br />
          auf deine Festplatte.
          <br />
          <span style={{ color: gold }}>Nicht in einen Chatverlauf.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-xl text-base leading-relaxed md:text-lg"
          style={{ color: "rgba(250,248,245,0.8)" }}
        >
          {WEBINAR.subtitle}
        </motion.p>

        {/* Termin-Karte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <span
            className="relative flex flex-col px-5 py-3"
            style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${gold}4d` }}
          >
            <Brackets color="rgba(184,150,62,0.45)" inset={6} size={8} />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.18em]" style={{ color: gold }}>
              Termin
            </span>
            <time dateTime={WEBINAR.iso} className="mt-1 font-serif text-[1.15rem] text-cream">
              {WEBINAR.weekday} · {WEBINAR.date}
            </time>
            <span className="font-mono text-[11px]" style={{ color: "rgba(250,248,245,0.76)" }}>
              {WEBINAR.time} · {WEBINAR.duration}
            </span>
          </span>
          <span
            className="relative flex flex-col px-5 py-3"
            style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${gold}4d` }}
          >
            <Brackets color="rgba(184,150,62,0.45)" inset={6} size={8} />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.18em]" style={{ color: gold }}>
              Teilnahme
            </span>
            <span className="mt-1 font-serif text-[1.15rem] text-cream">Kostenlos</span>
            <span className="font-mono text-[11px]" style={{ color: "rgba(250,248,245,0.76)" }}>
              {WEBINAR.ort}
            </span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-9 flex flex-wrap items-center gap-5"
        >
          <a
            href="#anmelden"
            className="group inline-flex items-center gap-3 font-sans font-semibold transition-all"
            style={{
              background: gold,
              color: "#0a0806",
              letterSpacing: "0.08em",
              padding: "17px 38px",
              fontSize: "1rem",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#d4ae5a")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = gold)}
          >
            Platz sichern
            <svg width="18" height="12" viewBox="0 0 20 12" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M0 6h18M13 1l5 5-5 5" stroke="#0a0806" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <span
            className="flex flex-col font-mono text-[12px] uppercase tracking-[0.18em]"
            style={{ color: "rgba(250,248,245,0.68)" }}
          >
            <span>Keine Vorkenntnisse</span>
            <span>Keine Zeile Code</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
