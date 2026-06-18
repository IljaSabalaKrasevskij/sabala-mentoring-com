"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const ACADEMY_CHECKOUT_URL = "https://sabala-mentoring.thrivecart.com/sabala-academy-claude-memorysystem/";

/* Reveal — robuste Scroll-Einblendung.
   Default-State ist SICHTBAR (SSR/no-JS zeigt Inhalt). Erst nach Mount wird
   verborgen + per IntersectionObserver eingeblendet. Schlägt der Observer fehl,
   bleibt der Inhalt sichtbar (kein opacity:0-Stuck wie bei framer whileInView). */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    setArmed(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "-40px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = armed && !seen;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translateY(${y}px)` : "none",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* HUD-Eck-Brackets — gibt Karten/Buttons einen „digitalen Rahmen" (aus ValuesManifesto übernommen) */
export function Brackets({
  color,
  inset = 4,
  size = 8,
}: {
  color: string;
  inset?: number;
  size?: number;
}) {
  const b = inset;
  const w = size;
  return (
    <>
      <span style={{ position: "absolute", top: b, left: b, width: w, height: w, borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
      <span style={{ position: "absolute", top: b, right: b, width: w, height: w, borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
      <span style={{ position: "absolute", bottom: b, left: b, width: w, height: w, borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
      <span style={{ position: "absolute", bottom: b, right: b, width: w, height: w, borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
    </>
  );
}

/* Mono-Eyebrow im Hausstil */
export function Eyebrow({
  children,
  color = "var(--gold)",
  center = true,
}: {
  children: React.ReactNode;
  color?: string;
  center?: boolean;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`font-mono text-[11px] uppercase tracking-[0.35em] ${center ? "text-center" : ""}`}
      style={{ color }}
    >
      {children}
    </motion.p>
  );
}

/* Gold-CTA-Button im Hausstil, eckig, mit Bracket-Hover */
export function GoldCTA({
  href,
  children,
  large = false,
}: {
  href: string;
  children: React.ReactNode;
  large?: boolean;
}) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-3 font-sans font-semibold transition-all"
      style={{
        background: "var(--gold)",
        color: "#0a0806",
        letterSpacing: "0.08em",
        padding: large ? "20px 44px" : "15px 32px",
        fontSize: large ? "1.05rem" : "0.9rem",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--gold-light)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)")}
    >
      {children}
      <svg width="18" height="12" viewBox="0 0 20 12" fill="none" className="transition-transform group-hover:translate-x-1">
        <path d="M0 6h18M13 1l5 5-5 5" stroke="#0a0806" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
