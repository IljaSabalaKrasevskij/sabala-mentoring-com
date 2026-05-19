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
  const [display, setDisplay] = useState(decimals === 0 ? "0" : "0,0");

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
