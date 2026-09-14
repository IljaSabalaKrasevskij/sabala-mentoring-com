"use client";

import { motion, useInView, useReducedMotion, useSpring } from "motion/react";
import { useId, useRef, type CSSProperties, type PointerEvent } from "react";
import styles from "./BenefitGallery.module.css";

type Benefit = { label: string; term: string; line: string };

// Five cast-metal motifs. The recessed stroke and the lifted face share one
// outline, so even the small mobile version retains its material and depth.
const MOTIFS = [
  "M77 77 L102 102 M83 55 A28 28 0 1 1 27 55 A28 28 0 1 1 83 55 M37 54 A18 18 0 0 1 54 37",
  "M64 23 C75 31 87 34 96 35 V61 C96 82 83 96 64 105 C45 96 32 82 32 61 V35 C41 34 53 31 64 23 Z M49 62 L60 73 L81 50",
  "M101 64 A37 37 0 1 1 64 27 M87 64 A23 23 0 1 1 64 41 M72 64 A8 8 0 1 1 64 56 M64 64 L102 26 M84 26 H102 V44",
  "M27 98 V85 C27 76 34 69 44 69 H68 C82 69 91 60 91 47 V29 M76 43 L91 28 L106 43 M20 98 H34 M53 69 H62",
  "M23 48 L42 26 H86 L105 48 L64 103 Z M23 48 H105 M42 26 L48 48 L64 103 L80 48 L86 26 M48 48 L64 26 L80 48",
];

function MetalEmblem({ index }: { index: number }) {
  const id = useId().replaceAll(":", "");
  return (
    <div className={styles.emblem} aria-hidden="true">
      <svg viewBox="0 0 128 128" fill="none" focusable="false">
        <defs>
          <linearGradient id={`${id}-metal`} x1="28" y1="24" x2="93" y2="106" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff1cb" />
            <stop offset=".3" stopColor="#dbbb7d" />
            <stop offset=".52" stopColor="#927040" />
            <stop offset=".68" stopColor="#f1ddb0" />
            <stop offset="1" stopColor="#b08c54" />
          </linearGradient>
          <radialGradient id={`${id}-glass`} cx=".32" cy=".25" r=".85">
            <stop stopColor="#deca9e" stopOpacity=".12" />
            <stop offset="1" stopColor="#deca9e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="64" cy="64" r="56" fill={`url(#${id}-glass)`} stroke="#d4b77e" strokeOpacity=".14" strokeWidth=".7" />
        <path d={MOTIFS[index]} transform="translate(0 4)" stroke="#070604" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d={MOTIFS[index]} stroke={`url(#${id}-metal)`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function BenefitCard({ benefit, index, active }: { benefit: Benefit; index: number; active: boolean }) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 24 });

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  function move(event: PointerEvent<HTMLLIElement>) {
    if (reduceMotion || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateX.set((0.5 - (event.clientY - rect.top) / rect.height) * 7);
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 9);
  }

  return (
    <li className={styles.slot} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset} style={{ "--float-delay": `${index * -1.4}s` } as CSSProperties}>
      <div className={styles.float} data-active={active}>
        <motion.div className={styles.tilt} style={{ rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY }}>
          <article className={styles.card}>
            <MetalEmblem index={index} />
            <div className={styles.copy}>
              <p className={styles.label}>{benefit.label}</p>
              <h3>{benefit.term}</h3>
              <p className={styles.description}>{benefit.line}</p>
            </div>
          </article>
        </motion.div>
      </div>
    </li>
  );
}

export default function BenefitGallery({ benefits }: { benefits: Benefit[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const active = useInView(ref, { margin: "100px" });
  return (
    <ul className={styles.gallery} ref={ref}>
      {benefits.map((benefit, index) => <BenefitCard key={benefit.label} benefit={benefit} index={index} active={active} />)}
    </ul>
  );
}
