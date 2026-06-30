/* ─────────────────────────────────────────────────────────────────────────
   Die 4 KI-Adoptions-Level. Geteilt zwischen Level-Leiter, Self-Check und
   den Badges auf den Termin-Karten. Quelle der Wahrheit fuer alles Level-bezogene.

   On-Brand: Gold ist der einzige Akzent. Statt vier Farben nutzen wir eine
   Gold-Intensitaet (matt -> hell = Anfaenger -> fortgeschritten).
   ───────────────────────────────────────────────────────────────────────── */

export type Level = 1 | 2 | 3 | 4;

export type LevelMeta = {
  tag: string;        // "Level 2"
  name: string;       // "Anwender"
  signal: string;     // 1 Satz Selbst-Einordnung, fuer den Self-Check
  /** Gold-Deckkraft 0..1 fuer Badge/Leiter (matt -> hell). */
  intensity: number;
};

export const GOLD = "#D4AE5A";

export const LEVELS: Record<Level, LevelMeta> = {
  1: { tag: "Level 1", name: "Neugierig", signal: "Du hast von KI gehoert, willst aber endlich starten.", intensity: 0.34 },
  2: { tag: "Level 2", name: "Anwender", signal: "Du nutzt KI schon, aber planlos. Zeit fuer Struktur.", intensity: 0.58 },
  3: { tag: "Level 3", name: "Integrierer", signal: "Claude Code laeuft, du baust Workflows und Skills.", intensity: 0.82 },
  4: { tag: "Level 4", name: "Builder", signal: "Du baust eigene Agenten und Systeme.", intensity: 1 },
};

/** Gold mit Deckkraft, fuer Badge-Rand/Text je Level. */
export function levelGold(level: Level, alpha = 1): string {
  const a = Math.min(1, LEVELS[level].intensity * alpha);
  return `rgba(212,174,90,${a.toFixed(2)})`;
}
