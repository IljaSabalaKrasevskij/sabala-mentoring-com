"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SlowWordRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SlowWordReveal({ text, className, delay = 0 }: SlowWordRevealProps) {
  // If the text has explicit newlines (\n), respect them. Otherwise, split words via space.
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 2.0,
        ease: [0.16, 1, 0.3, 1], // Extreme slow, long tail easing
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(4px)",
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      className={cn("inline-block", className)}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block mr-[0.2em] mb-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
