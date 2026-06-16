"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ParticleField from "./ParticleField";
import SabalaLogo from "@/components/brand/SabalaLogo";

export default function RocketHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const rocketY = useTransform(scrollYProgress, [0, 1], [0, -900]);
  const rocketScale = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const spaceOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const starsOpacity = useTransform(scrollYProgress, [0.15, 0.7], [0, 1]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} className="relative" style={{ height: "220vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #EDE8E0 0%, #FAF8F5 55%, #E4DACA 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "16vh",
            background: "linear-gradient(180deg, rgba(46,43,38,0), #2E2B26)",
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: spaceOpacity,
            background:
              "radial-gradient(130% 90% at 50% 8%, #1b1409 0%, #0A0806 62%)",
          }}
        />
        <motion.div className="absolute inset-0" style={{ opacity: starsOpacity }}>
          <ParticleField density={150} />
        </motion.div>
        <motion.div
          className="absolute left-1/2"
          style={{ bottom: "15vh", x: "-50%", y: rocketY, scale: rocketScale }}
        >
          <Rocket />
        </motion.div>
        <motion.div
          className="absolute inset-x-0 top-[12vh] flex flex-col items-center px-6 text-center"
          style={{ opacity: introOpacity }}
        >
          <SabalaLogo size={60} />
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-warm-mid">
            Sabala Studios
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] text-deep sm:text-7xl">
            Ich bringe KI in dein Business.
          </h1>
          <p className="mt-5 text-warm-mid">
            Für dich gebaut. Mit dir entwickelt. Dir beigebracht.
          </p>
        </motion.div>
        <motion.div
          className="absolute inset-x-0 bottom-8 flex justify-center"
          style={{ opacity: cueOpacity }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-warm-mid">
            scroll zum Start
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function Rocket() {
  return (
    <svg width="92" height="210" viewBox="0 0 92 210" fill="none" aria-hidden="true">
      <g
        style={{
          transformOrigin: "46px 168px",
          animation: "rocket-flame 0.5s ease-in-out infinite",
        }}
      >
        <path d="M34 166 Q46 212 58 166 Q46 184 34 166 Z" fill="#D4AE5A" />
        <path d="M39 166 Q46 196 53 166 Q46 180 39 166 Z" fill="#FAF8F5" />
      </g>
      <path
        d="M46 8 C66 32 70 72 70 112 L70 152 C70 159 64 164 57 164 L35 164 C28 164 22 159 22 152 L22 112 C22 72 26 32 46 8 Z"
        fill="#FAF8F5"
        stroke="#B8963E"
        strokeWidth="2.5"
      />
      <path d="M22 134 L6 164 L22 156 Z" fill="#B8963E" />
      <path d="M70 134 L86 164 L70 156 Z" fill="#B8963E" />
      <circle cx="46" cy="78" r="14" fill="#0A0806" stroke="#B8963E" strokeWidth="2.5" />
      <circle cx="46" cy="78" r="6" fill="#D4AE5A" opacity="0.7" />
      <path d="M46 8 C54 18 58 30 60 42 L32 42 C34 30 38 18 46 8 Z" fill="#B8963E" opacity="0.2" />
    </svg>
  );
}
