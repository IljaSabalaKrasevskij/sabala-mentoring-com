"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function FootprintItem({ index, isLeft, totalCount }: { index: number, isLeft: boolean, totalCount: number }) {
  // Use absolute positioning with percentages to perfectly distribute them mathematically
  // instead of flex layout which might collapse on initial render
  const topPercentage = (index / (totalCount - 1)) * 100;

  return (
    <div
      className={`absolute w-[28px] h-[40px] md:w-[35px] md:h-[50px] ${isLeft ? '-translate-x-[20px] md:-translate-x-[25px]' : 'translate-x-[20px] md:translate-x-[25px]'}`}
      style={{ 
        top: `${topPercentage}%`,
        rotate: isLeft ? '172deg' : '188deg',
        transformOrigin: "center"
      }}
    >
      <motion.div
        initial={{ filter: "blur(3px)", opacity: 0 }}
        whileInView={{
          filter: ["blur(3px)", "blur(3px)", "blur(1px)", "blur(0px)"],
          opacity: [0, 0.1, 0.25, 0.45]
        }}
        viewport={{ once: true, margin: "-25% 0px" }}
        transition={{ duration: 1.2, times: [0, 0.33, 0.66, 1], ease: "linear" }}
        className="w-full h-full"
      >
        <svg viewBox="0 0 40 60" fill="none" width="100%" height="100%">
           <defs>
             <filter id={`inner-shadow-${index}`}>
               <feOffset dx="1" dy="2"/>
               <feGaussianBlur stdDeviation="1.5" result="offset-blur"/>
               <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
               <feFlood floodColor="black" floodOpacity="0.4" result="color"/>
               <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
               <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
             </filter>
           </defs>
           
           <g filter={`url(#inner-shadow-${index})`} fill="#C4A265">
             {/* Sole */}
             <motion.path 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: [0, 1, 1, 1] }}
               viewport={{ once: true, margin: "-25% 0px" }}
               transition={{ duration: 1.2, times: [0, 0.33, 0.66, 1], ease: "linear" }}
               d={!isLeft 
                 ? "M 32 23 C 33 17, 25 14, 19 14 C 11 14, 5 19, 4 25 C 3 34, 10 39, 13 43 C 15 47, 14 53, 17 57 C 21 62, 29 60, 31 55 C 32 51, 30 44, 32 40 C 34 35, 37 30, 32 23 Z"
                 : "M 8 23 C 7 17, 15 14, 21 14 C 29 14, 35 19, 36 25 C 37 34, 30 39, 27 43 C 25 47, 26 53, 23 57 C 19 62, 11 60, 9 55 C 8 51, 10 44, 8 40 C 6 35, 3 30, 8 23 Z"
               } 
             />
             
             {/* Toes */}
             <motion.g
               initial={{ opacity: 0 }}
               whileInView={{ opacity: [0, 0, 0, 1] }}
               viewport={{ once: true, margin: "-25% 0px" }}
               transition={{ duration: 1.2, times: [0, 0.33, 0.66, 1], ease: "linear" }}
             >
               {!isLeft ? (
                 <>
                   <circle cx="28" cy="8" r="4.5" />
                   <circle cx="19" cy="6" r="3.5" />
                   <circle cx="13" cy="8" r="2.5" />
                   <circle cx="8" cy="13" r="2" />
                   <circle cx="4" cy="19" r="1.5" />
                 </>
               ) : (
                 <>
                   <circle cx="12" cy="8" r="4.5" />
                   <circle cx="21" cy="6" r="3.5" />
                   <circle cx="27" cy="8" r="2.5" />
                   <circle cx="32" cy="13" r="2" />
                   <circle cx="36" cy="19" r="1.5" />
                 </>
               )}
             </motion.g>
           </g>
        </svg>
      </motion.div>
    </div>
  );
}

export function FootprintPath() {
  const [count, setCount] = useState(16); // Default desktop

  useEffect(() => {
    if (window.innerWidth < 768) {
      setCount(10); // Mobile: less footprints
    }
  }, []);

  return (
    <div className="absolute left-[24px] md:left-1/2 top-[5%] bottom-[5%] w-0 md:-translate-x-1/2 z-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <FootprintItem 
          key={i} 
          index={i} 
          isLeft={i % 2 === 0} 
          totalCount={count}
        />
      ))}
    </div>
  );
}
