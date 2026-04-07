import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digitale Produkte & KI | Sabala Mentoring",
  description: "Workflows, KI-Assistenten und Kurse für dein autonomes Business.",
};

export default function KiAssistentenPage() {
  return (
    <div className="flex flex-col w-full min-h-[100dvh] bg-[#050505] text-pure-surface selection:bg-refined-gold selection:text-white">
      
      {/* SECTION 1: HERO (Ethereal Glass / Tech Vibe) */}
      <section className="relative pt-40 pb-32 px-6 sm:px-12 md:px-24 overflow-hidden min-h-[60vh] flex flex-col justify-center border-b border-white/5">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-refined-gold/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[50vw] h-[30vw] bg-[#2A2B2D]/40 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto w-full relative z-10 text-center flex flex-col items-center">
          <ScrollReveal>
             <div className="inline-block px-5 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-8">
                <span className="font-geist text-[0.7rem] md:text-sm tracking-[0.2em] uppercase text-pure-surface/80 font-medium">Autonomie für dein Business</span>
             </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h1 className="font-instrument text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.95] tracking-tight mb-8">
              Digitale <span className="italic text-refined-gold">Werkzeuge.</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="font-satoshi text-warm-steel text-lg md:text-xl leading-[1.6] max-w-[600px]">
              Verschaffe dir mehr Zeit für die wesentlichen Dinge. Mit unseren bewährten Custom GPTs, Workflows und Kursen skalierst du deine Ergebnisse, nicht deinen Aufwand.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: PRODUKTE BENTO GRID */}
      <section className="py-24 md:py-40 px-4 sm:px-8 md:px-16 max-w-[1300px] mx-auto w-full z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* PRODUCT 1: KI Assistenten (Custom GPTs) */}
          <ScrollReveal className="group">
            <div className="p-2 md:p-3 rounded-[2.5rem] bg-white/[0.01] border border-white/5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] w-full relative h-[650px] overflow-hidden transform-gpu hover:shadow-[0_40px_80px_-20px_rgba(184,150,62,0.1)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2">
               {/* Inner Core */}
               <div className="relative w-full h-full rounded-[calc(2.5rem-0.75rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] bg-[#0A0A0A] flex flex-col">
                  {/* Abstract Visual Placeholder */}
                  <div className="h-1/2 w-full relative border-b border-white/5 bg-gradient-to-r from-[#0D0D0D] to-[#141414] overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="w-32 h-32 rounded-full border border-refined-gold/20 flexitems-center justify-center relative shadow-[0_0_60px_rgba(184,150,62,0.15)] bg-black/50 backdrop-blur-xl group-hover:scale-105 transition-transform duration-1000">
                      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/20"></div>
                      <div className="absolute inset-y-0 left-1/2 w-[1px] bg-white/20"></div>
                    </div>
                  </div>
                  
                  {/* Content Content Info */}
                  <div className="h-1/2 p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <p className="font-geist text-xs tracking-[0.2em] uppercase text-refined-gold mb-3">Produktivität</p>
                      <h3 className="font-instrument text-3xl mb-4">Custom GPT Assistenten</h3>
                      <p className="font-satoshi text-warm-steel text-sm md:text-base leading-relaxed">
                        Vorprogrammierte KI-Assistenten für dein Business. Von der automatisierten Content-Generierung in deiner Brand Voice bis hin zur strategischen Datenanalyse. Einmal einrichten, dauerhaft profitieren.
                      </p>
                    </div>
                    
                    <div className="mt-8 flex justify-between items-end border-t border-white/5 pt-6">
                      <p className="font-satoshi font-medium text-pure-surface text-xl">49,- € <span className="text-sm text-warm-steel font-normal">zzgl. MwSt.</span></p>
                      <button className="font-geist text-xs uppercase tracking-widest bg-pure-surface text-deep-charcoal px-6 py-2 rounded-full hover:bg-refined-gold hover:text-white transition-colors duration-300">
                        Details
                      </button>
                    </div>
                  </div>
               </div>
            </div>
          </ScrollReveal>

          {/* PRODUCT 2: CapCut Kurs */}
          <ScrollReveal delay={0.1} className="group">
            <div className="p-2 md:p-3 rounded-[2.5rem] bg-white/[0.01] border border-white/5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] w-full relative h-[650px] overflow-hidden transform-gpu hover:shadow-[0_40px_80px_-20px_rgba(255,255,255,0.05)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2">
               {/* Inner Core */}
               <div className="relative w-full h-full rounded-[calc(2.5rem-0.75rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] bg-[#0A0A0A] flex flex-col">
                  {/* Abstract Visual Placeholder */}
                  <div className="h-1/2 w-full relative border-b border-white/5 bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] overflow-hidden flex items-center justify-center">
                    <div className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 scale-50 group-hover:scale-[2] transition-transform duration-[2000ms] ease-out"></div>
                    <div className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 scale-[0.2] group-hover:scale-100 transition-transform duration-[1500ms] ease-out delay-100"></div>
                  </div>
                  
                  {/* Content Content Info */}
                  <div className="h-1/2 p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <p className="font-geist text-xs tracking-[0.2em] uppercase text-[#94A3B8] mb-3">Sichtbarkeit</p>
                      <h3 className="font-instrument text-3xl mb-4">CapCut Mastery Kurs</h3>
                      <p className="font-satoshi text-warm-steel text-sm md:text-base leading-relaxed">
                        Lerne, wie du hochprofessionelle Shortform-Videos scheinbar mühelos direkt am Handy schneidest. Dynamische Untertitel, saubere Schnitte und B-Roll Einbindungen — optimiert für maximale Reichweite.
                      </p>
                    </div>
                    
                    <div className="mt-8 flex justify-between items-end border-t border-white/5 pt-6">
                       <p className="font-satoshi font-medium text-pure-surface text-xl">149,- € <span className="text-sm text-warm-steel font-normal">zzgl. MwSt.</span></p>
                      <button className="font-geist text-xs uppercase tracking-widest bg-pure-surface text-deep-charcoal px-6 py-2 rounded-full hover:bg-refined-gold hover:text-white transition-colors duration-300">
                        Details
                      </button>
                    </div>
                  </div>
               </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

    </div>
  );
}
