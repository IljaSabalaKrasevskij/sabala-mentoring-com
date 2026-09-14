"use client";

import { useInView } from "motion/react";
import { useRef, type CSSProperties } from "react";
import styles from "./StudioMetric.module.css";

/** The real value is present from the server render. Only the decorative,
 * aria-hidden reels animate; reduced motion leaves their final position intact. */
export default function StudioMetric({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: .65 });

  return (
    <span ref={ref} className={styles.metric} data-visible={visible}>
      <span className={styles.srOnly}>{value}</span>
      <span aria-hidden="true" className={styles.display}>
        {[...value].map((character, index) => /\d/.test(character) ? (
          <span key={index} className={styles.window}>
            <span className={styles.strip} style={{ "--reel-delay": `${index * 65}ms` } as CSSProperties}>
              {Array.from({ length: 10 }, (_, offset) => <span key={offset}>{(Number(character) + offset + 1) % 10}</span>)}
            </span>
          </span>
        ) : <span className={styles.symbol} key={index}>{character === " " ? "\u00a0" : character}</span>)}
      </span>
    </span>
  );
}
