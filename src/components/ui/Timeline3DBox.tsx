"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Timeline3DBoxProps {
  children: ReactNode;
  isLeft: boolean;
}

export function Timeline3DBox({ children, isLeft }: Timeline3DBoxProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0.4, 
        scale: 0.9,
        rotateY: isLeft ? 10 : -10,
        z: -100
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1.08,
        rotateY: 0,
        z: 0
      }}
      viewport={{ once: false, margin: "-35% 0px -35% 0px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={`relative z-10 bg-white/80 backdrop-blur-2xl border border-black/[0.03] rounded-[2rem] p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(184,150,62,0.15)] hover:shadow-[0_45px_100px_-20px_rgba(184,150,62,0.3)] transition-all duration-700`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {children}
    </motion.div>
  );
}
