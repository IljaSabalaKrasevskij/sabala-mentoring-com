"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function GoldDust() {
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, size: number, duration: number, delay: number }[]>([]);

  useEffect(() => {
    // Generate static random values once the client mounts to avoid hydration mismatch
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-refined-gold blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0.3 + (Math.random() * 0.4)
          }}
          animate={{
            y: ["0%", "-500%"],
            x: ["0%", `${(Math.random() - 0.5) * 500}%`],
            rotate: [0, 360],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}
