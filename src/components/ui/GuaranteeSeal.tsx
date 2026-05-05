"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type IconType = "time" | "satisfaction" | "choice";

type Props = {
  title: string;
  body: string;
  iconType: IconType;
  delay?: number;
};

const ICONS: Record<IconType, React.ReactNode> = {
  time: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  satisfaction: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  choice: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 7h13M8 12h13M8 17h13" />
      <circle cx="3" cy="7" r="1.5" />
      <circle cx="3" cy="12" r="1.5" />
      <circle cx="3" cy="17" r="1.5" />
    </svg>
  ),
};

export function GuaranteeSeal({ title, body, iconType, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotate: -12, scale: 0.9 }}
      animate={isInView ? { opacity: 1, rotate: 0, scale: 1 } : {}}
      transition={{
        duration: 1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col items-center text-center p-6 md:p-8"
    >
      {/* Outer Ring (subtle, no plate) */}
      <div className="relative w-20 h-20 md:w-24 md:h-24 mb-5 md:mb-6">
        <div
          className="absolute inset-0 rounded-full border border-refined-gold/30 group-hover:border-refined-gold/60 transition-colors duration-700"
          style={{
            boxShadow: "0 0 0 1px rgba(184,150,62,0.05) inset",
          }}
        />
        <div
          className="absolute inset-2 rounded-full border border-refined-gold/15"
        />
        <div className="absolute inset-0 flex items-center justify-center text-refined-gold group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          {ICONS[iconType]}
        </div>

        {/* Subtle Gold Glow on Hover */}
        <div className="absolute inset-0 rounded-full bg-refined-gold/0 group-hover:bg-refined-gold/8 transition-colors duration-1000 blur-xl" />
      </div>

      <h3 className="font-instrument text-xl md:text-2xl text-deep-charcoal leading-tight mb-3">
        {title}
      </h3>

      <p className="font-satoshi text-warm-steel text-sm md:text-base leading-relaxed max-w-[280px]">
        {body}
      </p>
    </motion.div>
  );
}
