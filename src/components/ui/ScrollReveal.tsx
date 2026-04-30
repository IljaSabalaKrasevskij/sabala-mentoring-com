"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  margin?: string;
  duration?: number;
}

export function ScrollReveal({ 
  children, 
  className, 
  delay = 0,
  yOffset = 40,
  margin = "0px 0px -150px 0px",
  duration = 0.9
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
