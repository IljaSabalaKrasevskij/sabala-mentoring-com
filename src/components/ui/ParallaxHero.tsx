"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Layer 1 (Background): scrollt langsam nach oben/unten
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Layer 2 (Mitte): scrollt medium (halbe Geschwindigkeit)
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  // Layer 3 (Vordergrund): scrollt am schnellsten entgegengesetzt / parallax drift
  const yFg = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] pt-32 pb-20 px-6 sm:px-12 md:px-24 flex items-center justify-center bg-warm-canvas rounded-b-[40px] z-10 shadow-[0_40px_60px_rgba(26,26,24,0.02)] overflow-hidden"
    >
      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* TEXT CONTENT (LEFT) */}
        <div className="lg:col-span-7 flex flex-col gap-8 z-20">
          <ScrollReveal>
            <div className="inline-block px-4 py-1.5 rounded-full border border-whisper-border bg-pure-surface text-sm font-medium text-warm-steel mb-4 tracking-wide w-max">
              Der meditierende Business-Architekt
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h1 className="font-instrument text-deep-charcoal leading-[1.1] tracking-[-0.02em] text-[clamp(2.5rem,6vw,5rem)]">
              Klarheit in der Positionierung.<br/>
              Kraft im Auftritt.<br/>
              Kunden, die wirklich passen.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-warm-steel text-lg md:text-xl leading-[1.65] max-w-[55ch]">
              Wir begleiten dich von der Kernbotschaft bis zur fertigen Premium-Website — und bleiben ein Jahr an deiner Seite. Strategie, Branding und Technik aus einer Hand.
            </p>
          </ScrollReveal>
        </div>
        
        {/* PARALLAX VISUAL (RIGHT) */}
        <div className="lg:col-span-5 h-[60vh] lg:h-[80vh] relative min-h-[400px] w-full lg:ml-8 mt-12 lg:mt-0 flex items-center justify-center -right-4 md:-right-8">
          
          {/* Ebene 1: Background & Gold Ring (langsam) */}
          <motion.div 
            style={{ y: yBg }}
            className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-warm-canvas to-[#B8963E]/5 rounded-full blur-[80px] opacity-80"></div>
            {/* Geometrischer Gold-Ring */}
            <div className="w-[110%] aspect-square border-[2px] md:border-[30px] border-[#B8963E]/15 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </motion.div>

          {/* Ebene 2: Porträt (Mitte) */}
          <motion.div 
            style={{ y: yImage }}
            className="relative z-10 w-full h-[120%] top-[0%] lg:top-[-5%]"
          >
            <Image 
              src="/images/sabala-portrait-hero.png" 
              alt="Ilja Sabala" 
              fill 
              className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(26,26,24,0.2)]"
              priority
            />
          </motion.div>

          {/* Ebene 3: Gold-Linien (Vordergrund, schnell) */}
          <motion.div 
            style={{ y: yFg }}
            className="absolute inset-[-20%] z-20 pointer-events-none"
          >
            {/* Horizontale Linie */}
            <div className="absolute top-[45%] left-0 right-[-20%] h-[1px] bg-[#B8963E]/20"></div>
            {/* Vertikale Linie */}
            <div className="absolute top-[-20%] bottom-[-20%] right-[30%] w-[1px] bg-[#B8963E]/20"></div>
          </motion.div>

        </div>
      </div>

      {/* BLINKENDER SCROLL PFEIL */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-default">
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={32} strokeWidth={1.5} className="text-refined-gold" />
        </motion.div>
      </div>

    </section>
  );
}
