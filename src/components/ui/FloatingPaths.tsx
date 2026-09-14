"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/** Brass curves with travelling highlights. Based on the original 21st.dev
 * background-paths treatment, with curves framed for this footer's proportions.
 * The base strokes remain visible throughout the loop. */
function Schar({ position, anzahl, active }: { position: number; anzahl: number; active: boolean }) {
  const ruhig = useReducedMotion();
  const pfade = Array.from({ length: anzahl }, (_, i) => ({
    id: i,
    d: position === 1
      ? `M -120 ${90 + i * 13} C 140 ${-80 + i * 16}, 340 ${420 + i * 10}, 1120 ${80 + i * 16}`
      : `M -100 ${500 - i * 11} C 140 ${640 - i * 15}, 540 ${-100 + i * 12}, 1120 ${100 + i * 11}`,
  }));

  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 600" fill="none" preserveAspectRatio="none" aria-hidden="true">
      {pfade.map((p) => (
        <g key={p.id}>
          <path d={p.d} stroke="currentColor" strokeWidth={0.7} strokeOpacity={0.18 + p.id * 0.012} />
          <motion.path
            d={p.d}
            stroke="currentColor"
            strokeWidth={1.15}
            strokeLinecap="round"
            initial={false}
            animate={ruhig || !active
              ? { pathLength: 1, opacity: 0.12, pathOffset: 0, pathSpacing: 1 }
              : { pathLength: 0.24, pathSpacing: 0.85, opacity: [0.3, 0.85, 0.3], pathOffset: position === 1 ? [0, 1] : [1, 0] }}
            transition={ruhig || !active ? { duration: 0 } : { duration: 18 + p.id * 1.2, repeat: Infinity, ease: "linear" }}
          />
        </g>
      ))}
    </svg>
  );
}

/** Two opposing families. Offscreen animation pauses; reduced motion is static. */
export function FloatingPaths({ anzahl = 10, className }: { anzahl?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { margin: "100px" });
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className ?? ""}`}>
      <Schar position={1} anzahl={anzahl} active={active} />
      <Schar position={-1} anzahl={anzahl} active={active} />
    </div>
  );
}

export default FloatingPaths;
