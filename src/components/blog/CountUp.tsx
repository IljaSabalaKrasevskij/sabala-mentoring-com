"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

type Props = {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

export function CountUp({ to, decimals = 0, suffix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 22 });
  const rounded = useTransform(spring, (v) => v.toFixed(decimals).replace(".", ","));
  // Endwert im Server-HTML fuer Crawler ohne JavaScript, im Browser nach dem Laden auf 0.
  const [display, setDisplay] = useState(to.toFixed(decimals).replace(".", ","));
  // Gewollt: Server und Browser rendern hier absichtlich verschieden. Die Spring startet immer bei 0,
  // ein Reset nur ohne Reduce Motion wuerde dort vom Endwert auf 0 flackern.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setDisplay(decimals === 0 ? "0" : "0,0"); }, [decimals]);

  useEffect(() => {
    if (isInView) motionValue.set(to);
  }, [isInView, motionValue, to]);

  useEffect(() => {
    return rounded.on("change", (v) => setDisplay(v));
  }, [rounded]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
