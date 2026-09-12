"use client";

import { motion, useReducedMotion } from "motion/react";

/* ─────────────────────────────────────────────────────────────────────────
   FloatingPaths — wandernde Linienschar als Hintergrund.
   Herkunft: 21st.dev (background-paths), uebernommen am 12.9.2026.
   Drei Aenderungen fuer dieses Projekt:

   1. `motion/react` statt `framer-motion`. Dasselbe Paket unter neuem Namen,
      Version 12 liegt schon im Projekt. Keine neue Abhaengigkeit.
   2. NUR die Linien. Der Hero mit Ueberschrift und Knopf aus der Vorlage
      haette den shadcn-Button und zwei weitere Pakete gebraucht.
   3. **Weniger Linien.** Das Original zeichnet 36 je Richtung, also 72 Pfade
      mit endlosen Animationen. Die laufen auf dem Hauptstrang und der Footer
      steht unter JEDER Seite. 14 je Richtung reichen fuer denselben Eindruck
      und kosten ein Fuenftel. Bei Reduce Motion stehen sie still.
   ───────────────────────────────────────────────────────────────────────── */

function Schar({ position, anzahl }: { position: number; anzahl: number }) {
  const ruhig = useReducedMotion();
  const pfade = Array.from({ length: anzahl }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.05,
  }));

  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {pfade.map((p) => (
        <motion.path
          key={p.id}
          d={p.d}
          stroke="currentColor"
          strokeWidth={p.width}
          strokeOpacity={0.06 + p.id * 0.02}
          initial={{ pathLength: 0.3, opacity: 0.6 }}
          animate={ruhig ? { pathLength: 1, opacity: 0.4 } : { pathLength: 1, opacity: [0.25, 0.55, 0.25], pathOffset: [0, 1, 0] }}
          transition={ruhig ? { duration: 0 } : { duration: 30 + p.id * 1.4, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </svg>
  );
}

/** Zwei gegenlaeufige Scharen. `anzahl` gilt je Richtung. */
export function FloatingPaths({ anzahl = 14, className }: { anzahl?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className ?? ""}`}>
      <Schar position={1} anzahl={anzahl} />
      <Schar position={-1} anzahl={anzahl} />
    </div>
  );
}

export default FloatingPaths;
