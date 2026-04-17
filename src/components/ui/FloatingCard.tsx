"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FloatingCard({ children, delay = 0, className = "" }: FloatingCardProps) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
