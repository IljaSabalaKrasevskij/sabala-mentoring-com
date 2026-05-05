"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

type StackItem = {
  label: string;
  sublabel?: string;
  value: number;
  isBonus?: boolean;
};

type Props = {
  items: StackItem[];
  totalValue: number;
  referencePrice: number;
  savingsPercent?: number;
  className?: string;
};

function CountUpNumber({
  value,
  prefix = "",
  suffix = " €",
  delay = 0,
  isInView,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  isInView: boolean;
}) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 18 });
  const rounded = useTransform(spring, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => motionValue.set(value), delay * 1000);
      return () => clearTimeout(t);
    }
  }, [isInView, value, motionValue, delay]);

  useEffect(() => rounded.on("change", (v) => setDisplay(v)), [rounded]);

  return (
    <span>
      {prefix}
      {display.toLocaleString("de-DE")}
      {suffix}
    </span>
  );
}

export function BonusStack({
  items,
  totalValue,
  referencePrice,
  savingsPercent,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const savings = totalValue - referencePrice;
  const savingsPct =
    savingsPercent ?? Math.round((savings / totalValue) * 100);

  return (
    <div ref={ref} className={`w-full max-w-[680px] mx-auto ${className}`}>
      <p className="text-refined-gold tracking-[0.2em] font-medium text-xs md:text-sm uppercase mb-8 md:mb-10 text-center">
        Was du bekommst
      </p>

      <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex items-baseline gap-3 md:gap-4 pb-3 md:pb-4 border-b border-deep-charcoal/8"
          >
            {/* Bar Fill */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-refined-gold/30"
              initial={{ width: "0%" }}
              animate={isInView ? { width: "100%" } : {}}
              transition={{
                duration: 1.2,
                delay: i * 0.1 + 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
            <span className="text-refined-gold text-lg md:text-xl shrink-0">
              ✦
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-satoshi text-deep-charcoal text-base md:text-lg leading-snug">
                {item.label}
              </div>
              {item.sublabel && (
                <div className="font-satoshi text-warm-steel text-xs md:text-sm mt-1 leading-relaxed">
                  {item.sublabel}
                </div>
              )}
            </div>
            <span
              className={`font-mono text-sm md:text-base shrink-0 tabular-nums ${
                item.isBonus
                  ? "text-refined-gold uppercase tracking-widest text-xs"
                  : "text-deep-charcoal"
              }`}
            >
              {item.isBonus ? "Bonus" : (
                <CountUpNumber
                  value={item.value}
                  isInView={isInView}
                  delay={i * 0.1 + 0.3}
                />
              )}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Sum / Reference / Savings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: items.length * 0.1 + 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="space-y-3 pt-2"
      >
        <div className="flex justify-between items-baseline">
          <span className="font-satoshi text-warm-steel text-sm md:text-base uppercase tracking-wider">
            Gesamtwert
          </span>
          <span className="font-instrument text-2xl md:text-3xl text-warm-steel line-through decoration-1 tabular-nums">
            <CountUpNumber
              value={totalValue}
              isInView={isInView}
              delay={items.length * 0.1 + 0.5}
            />
          </span>
        </div>

        <div className="flex justify-between items-baseline pb-3 border-b border-deep-charcoal/15">
          <span className="font-satoshi text-deep-charcoal font-bold text-base md:text-lg uppercase tracking-wider">
            Reference-Preis
          </span>
          <span className="font-instrument text-3xl md:text-5xl text-deep-charcoal tabular-nums">
            <CountUpNumber
              value={referencePrice}
              isInView={isInView}
              delay={items.length * 0.1 + 0.7}
            />
          </span>
        </div>

        <div className="flex justify-between items-baseline">
          <span className="font-satoshi text-refined-gold font-bold text-sm md:text-base uppercase tracking-wider">
            Deine Ersparnis
          </span>
          <span className="font-instrument text-xl md:text-2xl text-refined-gold tabular-nums">
            <CountUpNumber
              value={savings}
              isInView={isInView}
              delay={items.length * 0.1 + 0.9}
            />{" "}
            <span className="text-base">({savingsPct}%)</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
