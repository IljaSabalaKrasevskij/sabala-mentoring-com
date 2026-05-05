"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

type Props = {
  available: number;
  total: number;
  expiresAt: string; // human-readable
  size?: "small" | "large";
  className?: string;
};

export function ReferenceCounter({
  available,
  total,
  expiresAt,
  size = "large",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 18 });
  const rounded = useTransform(spring, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(available);
  }, [isInView, motionValue, available]);

  useEffect(() => {
    return rounded.on("change", (v) => setDisplay(v));
  }, [rounded]);

  const dotColor =
    available === 0
      ? "bg-red-500"
      : available <= 2
      ? "bg-amber-500"
      : "bg-[#6C9A74]";

  const dotPing =
    available === 0
      ? "bg-red-400"
      : available <= 2
      ? "bg-amber-300"
      : "bg-[#8fb996]";

  if (size === "small") {
    return (
      <div ref={ref} className={`inline-flex items-center gap-3 ${className}`}>
        <span className="relative flex h-2.5 w-2.5">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotPing}`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotColor}`}
          ></span>
        </span>
        <span className="text-[11px] md:text-xs font-satoshi uppercase tracking-[0.1em] font-bold text-deep-charcoal">
          Reference-Edition · {display} von {total} Plätze · {expiresAt}
        </span>
      </div>
    );
  }

  return (
    <div ref={ref} className={`flex flex-col items-center text-center ${className}`}>
      <p className="text-refined-gold tracking-[0.2em] font-medium text-xs md:text-sm uppercase mb-6 md:mb-8">
        Reference-Edition · Q2/2026
      </p>

      <motion.div
        className="font-instrument leading-none text-deep-charcoal"
        style={{
          fontSize: "clamp(8rem, 18vw, 14rem)",
          textShadow: "0 0 60px rgba(184,150,62,0.15)",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {display}
      </motion.div>

      <p className="font-instrument italic text-refined-gold text-2xl md:text-3xl mb-4 -mt-4 md:-mt-6">
        von {total}
      </p>

      <p className="text-warm-steel font-satoshi text-base md:text-lg max-w-[320px] mb-8">
        Reference-Plätzen verfügbar
      </p>

      <div className="flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotPing}`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotColor}`}
          ></span>
        </span>
        <span className="text-xs md:text-sm font-satoshi uppercase tracking-[0.15em] font-medium text-warm-steel">
          {expiresAt}
        </span>
      </div>
    </div>
  );
}
