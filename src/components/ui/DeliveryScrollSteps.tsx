'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Card } from './card';

const steps = [
  {
    id: 1,
    title: "1. Kaufen",
    note: "Sichere Zahlung über unseren Checkout. Du erhältst sofortigen Zugang zum System."
  },
  {
    id: 2,
    title: "2. Aktivieren",
    note: "Du bekommst direkt eine Mail mit dem Master-Guide und den exklusiven Installations-Links."
  },
  {
    id: 3,
    title: "3. Loslegen",
    note: "Klick die Links, pinne die GPTs in deiner Seitenleiste fest und dein KI-Team ist sofort bereit."
  }
];

export default function DeliveryScrollSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress across this vertical container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"] // Starts animating when top enters 80%, finishes when bottom reaches middle.
  });

  // Smooth out the scroll progress for the laser line and elements
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="py-32 w-full flex flex-col items-center relative z-20 overflow-hidden">
      
      <div className="text-center mb-24 px-4 w-full">
         <h2 className="font-instrument text-4xl md:text-5xl text-white mb-4">So einfach startest du.</h2>
         <p className="text-white/50 text-lg">Keine Technik-Kenntnisse nötig. In 2 Minuten einsatzbereit.</p>
      </div>

      <div className="w-full max-w-[800px] mx-auto relative z-10 px-4 perspective-[2000px]">
        
        {/* Background Vertical Laser Connection */}
        <div className="absolute top-0 bottom-0 left-[30px] md:left-[50%] w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent z-0 -translate-x-1/2">
           <motion.div 
             className="absolute top-0 w-full left-0 bg-refined-gold shadow-[0_0_15px_rgba(184,150,62,1)]"
             style={{ height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
           />
        </div>

        <div className="flex flex-col gap-32">
          {steps.map((step, idx) => {
            // Re-calc timing: each gets a third of the progress
            const start = idx * 0.3;
            // Complete earlier than the full third so it snaps fast
            const end = start + 0.2;
            
            // Note drops down shortly after
            const noteStart = end;
            const noteEnd = end + 0.1;

            const rotateX = useTransform(smoothProgress, [start, end], [90, 0]);
            const opacity = useTransform(smoothProgress, [start, end], [0, 1]);
            const y = useTransform(smoothProgress, [start, end], [100, 0]);
            const scale = useTransform(smoothProgress, [start, end], [0.8, 1]);
            
            const noteOpacity = useTransform(smoothProgress, [noteStart, noteEnd], [0, 1]);
            const noteY = useTransform(smoothProgress, [noteStart, noteEnd], [-40, 0]);

            // Alternate sides on Desktop (Left, Right, Left)
            const isEven = idx % 2 === 0;

            return (
              <div key={step.id} className={`w-full flex relative z-10 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                
                {/* Node point on the timeline */}
                <motion.div 
                  style={{ opacity: useTransform(smoothProgress, [start, start + 0.1], [0, 1]) }}
                  className="absolute left-[30px] md:left-[50%] top-8 w-4 h-4 bg-refined-gold rounded-full -translate-x-1/2 shadow-[0_0_15px_rgba(184,150,62,1)] z-30"
                />

                <div className={`w-full md:w-[45%] pl-[60px] md:pl-0 flex flex-col items-center`}>
                  {/* THE DIGITAL MONITOR (Screen) */}
                  <motion.div 
                    style={{ 
                      rotateX, 
                      opacity, 
                      y,
                      scale,
                      transformOrigin: "center center",
                      transformStyle: "preserve-3d"
                    }}
                    className="w-full mb-6 relative z-20"
                  >
                    <div className="bg-[#050505]/95 border border-refined-gold/20 pb-12 pt-8 px-6 rounded-3xl text-center shadow-[0_30px_60px_-15px_rgba(184,150,62,0.3)] backdrop-blur-2xl ring-1 ring-white/10 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-b from-refined-gold/10 to-transparent pointer-events-none"></div>
                      
                      {/* Digital Scanline Background */}
                      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none"></div>

                      <div className="flex items-center justify-center gap-2 mb-4 relative z-10">
                         <span className="text-[10px] font-mono text-refined-gold/70 tracking-widest uppercase">Schritt {step.id}</span>
                      </div>

                      <h3 className="text-white font-instrument text-2xl lg:text-3xl relative z-10 tracking-wide">
                        {step.title}
                      </h3>
                    </div>
                  </motion.div>

                  {/* THE NOTE (Description Box) */}
                  <motion.div
                    style={{ opacity: noteOpacity, y: noteY }}
                    className="w-[90%] relative z-10"
                  >
                    {/* Connecting wire from screen to note */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-refined-gold to-transparent opacity-50"></div>
                    
                    <div className="bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl text-center shadow-2xl relative">
                       <p className="text-[13px] lg:text-sm text-white/70 leading-relaxed font-light">
                         {step.note}
                       </p>
                    </div>
                  </motion.div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
