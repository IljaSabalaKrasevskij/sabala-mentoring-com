"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function AudioVisualizerBackground({ className }: { className?: string }) {
  // Generate a random array of heights and animation delays
  const [bars, setBars] = useState<{ id: number; delay: number; heightClass: string }[]>([]);

  useEffect(() => {
    const barCount = typeof window !== "undefined" && window.innerWidth < 768 ? 40 : 100;
    const newBars = Array.from({ length: barCount }).map((_, i) => {
      // Create a smooth wave effect based on index (sine wave) + some randomness
      const sine = Math.sin((i / barCount) * Math.PI) * 100; // 0 to 100 to 0
      const randomNoise = Math.random() * 30; // Random spike up to +30
      const baseHeight = Math.max(10, sine + randomNoise);
      
      let heightH = "h-[10%]";
      if (baseHeight > 100) heightH = "h-[90%]";
      else if (baseHeight > 80) heightH = "h-[75%]";
      else if (baseHeight > 60) heightH = "h-[60%]";
      else if (baseHeight > 40) heightH = "h-[45%]";
      else if (baseHeight > 20) heightH = "h-[30%]";
      else heightH = "h-[15%]";

      return {
        id: i,
        delay: Math.random() * 1.5, // 0 to 1.5s delay
        heightClass: heightH,
      };
    });
    setBars(newBars);
  }, []);

  return (
    <div className={cn("absolute inset-0 flex items-center justify-between gap-[2px] sm:gap-1 opacity-20 pointer-events-none overflow-hidden", className)}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes audio-pulse {
          0%, 100% {
            transform: scaleY(0.2);
            opacity: 0.3;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
        .animate-audio-bar {
          animation: audio-pulse 1.5s ease-in-out infinite;
          transform-origin: center;
        }
      `}} />
      
      {bars.map((bar) => (
        <div 
          key={bar.id} 
          className={cn("w-1 sm:w-2 bg-night-gold rounded-full transition-all animate-audio-bar", bar.heightClass)}
          style={{ 
            animationDelay: `${bar.delay}s`,
            animationDuration: `${1 + Math.random() * 1.5}s`
          }}
        />
      ))}
    </div>
  );
}
