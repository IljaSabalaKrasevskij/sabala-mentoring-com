'use client'

import React, { useRef } from "react";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Info, CheckCircle2, ShieldAlert, Sparkles, Scale, Globe, Lightbulb, Box, X, Check, Clock, Zap, ScanFace } from "lucide-react";
import DeliveryScrollSteps from "@/components/ui/DeliveryScrollSteps";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const MooniMascot = dynamic(() => import("@/components/ui/MooniMascot"), {
  ssr: false,
});


import MarvelTeamShowcase from "@/components/ui/MarvelTeamShowcase";

// --- 3D TILT CARD COMPONENT ---
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Magic springs for smooth follow-through
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Map mouse positions to rotation degrees (tilt effect)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize to range [-0.5, 0.5]
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative z-10 w-full h-full"
    >
      <div 
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}


export default function GPTTeamPage() {
  return (
    <div className="flex flex-col w-full bg-[#0A0806] min-h-screen font-satoshi overflow-x-hidden text-pure-surface selection:bg-refined-gold selection:text-white pb-32 relative">
      
      {/* GLOBAL FLOATING SIDE-CTA */}
      <a 
        href="#checkout" 
        className="fixed z-[100] right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%-3rem)] hover:translate-x-0 transition-all duration-300 flex items-center bg-[#0a0a0a]/90 backdrop-blur-md border border-refined-gold/40 rounded-l-2xl shadow-[0_0_30px_rgba(184,150,62,0.3)] group overflow-hidden"
      >
        <div className="w-12 h-16 flex items-center justify-center border-r border-white/10 bg-refined-gold/10 group-hover:bg-refined-gold/20 flex-shrink-0">
          {/* Animated Arrow/Chevron */}
          <span className="text-refined-gold animate-pulse text-lg">◄</span>
        </div>
        <div className="px-6 py-4 whitespace-nowrap text-sm font-bold tracking-widest text-refined-gold uppercase">
          Diamond Force aktivieren
        </div>
      </a>
      
      {/* GLOBAL MARVEL/UNIVERSE COSMIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Core Cosmos Color */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(184,150,62,0.15)_0%,_#0A0806_60%)] opacity-80" />
        {/* Stars / Dust */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 mix-blend-screen" />
        {/* Tech Grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] mix-blend-overlay" />
      </div>

      {/* 3D HEADER - BRIGHT LABORATORY HUD STYLE */}
      <section className="w-full relative px-4 md:px-12 pt-32 pb-48 overflow-hidden z-20 bg-[#faf8f5]">
        
        {/* Bright Science / Laboratory Effects */}
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(184,150,62,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(184,150,62,0.1)_1px,transparent_1px)] bg-[size:40px_40px] mix-blend-multiply pointer-events-none" />
        
        {/* Marvel / Spiderman Laser Rings & Glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(184,150,62,0.15)_0%,_transparent_70%)] rounded-full blur-[80px] pointer-events-none mix-blend-multiply" />
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-refined-gold/40 to-transparent shadow-[0_0_20px_rgba(184,150,62,0.5)] pointer-events-none" />
        <div className="absolute top-2/3 left-0 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-refined-gold/40 to-transparent shadow-[0_0_20px_rgba(184,150,62,0.5)] rotate-[-15deg] origin-left pointer-events-none" />

        {/* The Plunge into the Universe */}
        <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-t from-[#0A0806] via-[#0A0806]/80 to-transparent z-10 pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <Card className="w-full h-auto min-h-[600px] bg-white/70 border border-white/80 relative overflow-hidden rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(184,150,62,0.15)] backdrop-blur-2xl ring-1 ring-deep-charcoal/5 group">
            
            {/* Tech Scanlines overlay on the white glass */}
             <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none"></div>
             {/* Tech Brackets Main Container */}
             <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-deep-charcoal/20 pointer-events-none"></div>
             <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-deep-charcoal/20 pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row h-full relative z-10">
              {/* Left content */}
              <div className="flex-[1.2] p-8 md:p-16 relative z-10 flex flex-col justify-center perspective-[1000px]">
                <ScrollReveal>
                  <p className="text-refined-gold tracking-[0.3em] font-bold text-xs uppercase mb-4 drop-shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-refined-gold animate-pulse"></span>
                    Laboratory Access // Online
                  </p>
                  <h1 className="text-[clamp(3rem,4.5vw,5.5rem)] font-instrument font-medium text-deep-charcoal leading-[1.05] mb-6 relative">
                    Sabala's <br/>
                    <span className="italic font-light text-refined-gold drop-shadow-[0_0_20px_rgba(184,150,62,0.3)]">KI Diamond Force.</span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <p className="text-lg md:text-xl text-deep-charcoal/70 font-light max-w-lg mb-10 leading-relaxed relative z-10">
                    Sieben spezialisierte KI-Seelen. Von Angebotsanalyse über Kundenkommunikation bis zu AGBs. Alle sprechen die reine Sabala-Sprache: Herzlich, positiv und dem Menschen dienend.
                  </p>
                </ScrollReveal>
                
                <ScrollReveal delay={0.2} className="flex flex-col sm:flex-row gap-4 relative z-50 mt-4">
                  <a href="#team" className="relative overflow-hidden bg-[#0a0a0a] border border-[#0a0a0a] text-white hover:bg-refined-gold hover:border-refined-gold hover:text-white px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-[0.2em] transition-all text-center group/btn flex items-center justify-center gap-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(184,150,62,0.4)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
                    <ScanFace className="w-4 h-4 text-refined-gold group-hover/btn:text-white transition-colors" /> Start Sequence
                  </a>
                  <a href="#checkout" className="relative overflow-hidden border border-deep-charcoal/20 hover:border-refined-gold hover:bg-refined-gold/5 text-deep-charcoal px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-[0.2em] transition-all text-center backdrop-blur-sm flex items-center justify-center gap-3 hover:shadow-[inset_0_0_20px_rgba(184,150,62,0.1)] group/sys">
                    System Access <div className="w-1.5 h-1.5 bg-deep-charcoal group-hover/sys:bg-refined-gold animate-pulse" />
                  </a>
                </ScrollReveal>
              </div>

              {/* Right content (Dynamic 3D Element) */}
              <div className="flex-1 relative min-h-[400px] md:min-h-[600px] flex items-center justify-center p-4 pointer-events-auto z-20">
                {/* Tech Bracket Accents */}
                <div className="absolute top-10 right-10 w-16 h-16 border-t-2 border-r-2 border-deep-charcoal/20 opacity-50" />
                <div className="absolute bottom-10 left-10 w-16 h-16 border-b-2 border-l-2 border-deep-charcoal/20 opacity-50" />
                
                {/* Mooni standalone, fully centered without clipping */}
                <div className="relative w-full h-full min-h-[550px] flex items-center justify-center cursor-crosshair -translate-y-4 md:-translate-y-10">
                   <div className="absolute inset-0 flex items-center justify-center z-10 drop-shadow-[0_30px_50px_rgba(184,150,62,0.2)] md:scale-110 origin-center">
                    <MooniMascot />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* NEW SIMPLICITY / NO-NERD HOOK */}
      <section className="relative z-30 pt-10 pb-20 md:pt-16 md:pb-32 px-4 md:px-12 w-full bg-transparent">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="bg-[#050505]/95 backdrop-blur-2xl border border-white/5 rounded-[3rem] p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.8)] ring-1 ring-refined-gold/10 flex flex-col md:flex-row items-center gap-12 md:gap-16 group relative overflow-hidden">
              
              {/* Absolute Subtle Glow Background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(184,150,62,0.05),_transparent_70%)] pointer-events-none"></div>
              
              {/* Logic Equation */}
              <div className="flex items-center gap-6 text-white shrink-0 relative z-10">
                 <div className="w-20 h-20 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center p-4 shadow-inner">
                    <img src="/images/chatgpt-logo.svg" alt="ChatGPT Plus" className="w-12 h-12 object-contain drop-shadow-md opacity-90" />
                 </div>
                 <span className="text-refined-gold text-3xl font-light opacity-50">+</span>
                 <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-refined-gold/10 to-transparent border border-refined-gold/30 flex items-center justify-center p-2 shadow-[0_0_20px_rgba(184,150,62,0.15)] group-hover:shadow-[0_0_40px_rgba(184,150,62,0.25)] transition-shadow duration-700">
                    <img src="/images/mooni.png" alt="Mooni" className="w-16 h-16 object-contain drop-shadow-xl" />
                 </div>
                 <span className="text-refined-gold text-3xl font-light ml-2 opacity-50">=</span>
              </div>
              
              {/* The Message */}
              <div className="relative z-10 text-center md:text-left">
                 <h3 className="text-3xl md:text-4xl font-instrument text-white mb-6 drop-shadow-md tracking-wide">Einfach. Simpel. <span className="text-refined-gold italic drop-shadow-[0_0_10px_rgba(184,150,62,0.3)]">Nervensparend.</span></h3>
                 <p className="text-white/60 font-light text-lg md:text-xl leading-[1.8] max-w-2xl">
                    Du musst absolut <strong className="text-white/90">kein Techniknerd</strong> sein. Alles, was du brauchst, ist ein normaler ChatGPT Plus Account. Wir docken unsere maßgeschneiderte <strong className="text-refined-gold border-b border-refined-gold/20 pb-0.5">Diamond Force</strong>  einfach daran an – und schwupps: Deine Aufgaben werden kinderleicht. Ohne Technik-Frust und ohne Zeitverlust.
                 </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* IDENTIFIKATION / HOOK */}
      <section className="py-24 md:py-40 px-4 md:px-12 relative z-20 bg-[#0A0806]">
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-refined-gold/10 blur-[120px] pointer-events-none" />
          
          <ScrollReveal>
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-refined-gold/20 bg-refined-gold/5 text-refined-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm">
                <ScanFace className="w-3 h-3" /> System Vorstellung 
             </div>
             <h2 className="font-instrument text-4xl md:text-5xl text-white mb-8 leading-tight drop-shadow-xl">
               Lerne dein neues <span className="italic font-light text-refined-gold">KI-Team</span> kennen.
             </h2>
             <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto font-light">
               Entdecke unsere 7 spezialisierten Assistenten. Nimm dir die Zeit, um in Ruhe zu verstehen, welche Aufgaben sie exakt für dich übernehmen und wie sie dir den Rücken freihalten.
             </p>
          </ScrollReveal>
        </div>
      </section>

      {/* TEAM SHOWCASE (MARVEL STYLE) */}
      <section id="team" className="relative w-full overflow-hidden">
         <MarvelTeamShowcase />
      </section>

      {/* STARRY SKY TRANSITION SPACE */}
      <section className="relative w-full py-24 min-h-[600px] flex items-center justify-center overflow-hidden bg-black border-t border-white/5">
        
        {/* Dynamic Starry Sky Background */}
        <div className="absolute inset-0 z-0 opacity-80" style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 140px 70px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.7), rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, #B8963E, rgba(0,0,0,0)),
            radial-gradient(2.5px 2.5px at 130px 180px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 160px 120px, rgba(255,255,255,0.5), rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 200px 10px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 240px 90px, rgba(255,255,255,0.6), rgba(0,0,0,0)),
            radial-gradient(2px 2px at 280px 120px, #B8963E, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 320px 40px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(2.5px 2.5px at 380px 120px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 420px 110px, rgba(255,255,255,0.8), rgba(0,0,0,0))
          `,
          backgroundSize: '450px 200px',
        }}></div>

        {/* Content Container (Muni + Quote) */}
        <div className="max-w-[1200px] mx-auto relative z-20 w-full px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
           
           {/* Quote / Zitat */}
           <div className="flex-1 text-center md:text-left z-20 pointer-events-none">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-refined-gold text-xs font-mono uppercase tracking-widest mb-8 backdrop-blur-md">
                   <Sparkles className="w-4 h-4" />
                   Mooni (AI Assistenz)
                </div>
                <blockquote className="font-instrument text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                   "Die wahre Magie entsteht nicht durch den perfekten Prompt, <br/><span className="text-white/50">sondern wenn du aufhörst, alles allein lösen zu wollen.</span>"
                </blockquote>
              </ScrollReveal>
           </div>

           {/* Static Mascot Image to preserve performance */}
           <div className="flex-1 w-full max-w-[500px] h-[400px] md:h-[500px] flex items-center justify-center relative z-20">
              <img 
                src="/images/mooni.png" 
                alt="Mooni" 
                className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              />
           </div>
        </div>

        {/* Transition Gradients */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0A0806] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0806] to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* THE VALUE PROPOSITION */}
      <section className="py-32 px-4 md:px-12 relative z-20 bg-[#0A0806] overflow-hidden border-t-0 -mt-[1px]">
        {/* Background - Full Brightness */}
        <div className="absolute inset-0 z-0">
           {/* Scaled up heavily to completely crop out the dome shape */}
           <img 
             src="/images/mooni-head-bg.jpg" 
             alt="Inside Mooni Matrix" 
             className="w-full h-full object-cover opacity-100 scale-[1.6] origin-top" 
           />
           {/* Soft edge gradients for blending */}
           <div className="absolute inset-0 bg-gradient-to-t from-[#0A0806] via-[#0A0806]/50 to-transparent h-1/2 bottom-0 top-auto"></div>
           {/* Stronger top gradient */}
           <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-[#0A0806] via-[#0A0806]/80 to-transparent pointer-events-none z-10"></div>
           
           {/* EXTREMELY important Side Gradients to kill the golden glowing rounded corners/arcs on left and right */}
           <div className="absolute inset-y-0 left-0 w-1/4 md:w-1/3 bg-gradient-to-r from-[#0A0806] via-[#0A0806]/90 to-transparent pointer-events-none z-10"></div>
           <div className="absolute inset-y-0 right-0 w-1/4 md:w-1/3 bg-gradient-to-l from-[#0A0806] via-[#0A0806]/90 to-transparent pointer-events-none z-10"></div>
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-24 relative z-10">
             <ScrollReveal>
               <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-[#0A0806]/80 text-white/50 text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,1)]">
                 <Box className="w-4 h-4" />
                 Transformation
               </div>
               <h2 className="font-instrument text-4xl md:text-6xl text-white mb-6 drop-shadow-[0_0_40px_rgba(0,0,0,1)]">Dein neues Business Momentum.</h2>
               <p className="text-white/90 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] bg-black/20 p-4 rounded-xl backdrop-blur-sm">Warum die Diamond Force ein absoluter Gamechanger für dich ist: Was früher extrem zäh war und dich kostbare Lebenszeit gekostet hat, erledigt dein System jetzt in Sekunden.</p>
             </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative">
             {/* VS Badge in center */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#0A0806]/80 rounded-full border border-white/10 z-30 hidden md:flex items-center justify-center font-bold text-white/30 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,1)]">
                VS
             </div>

             {/* Alte Methode */}
             <ScrollReveal className="relative z-10 h-full">
               <Card className="bg-[#020202]/95 border border-white/10 p-8 md:p-12 rounded-[2rem] h-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-3xl relative overflow-hidden group hover:border-red-900/40 transition-all duration-500">
                 {/* Subtle Red Tech Line */}
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 
                 <h3 className="text-red-400 font-instrument text-3xl mb-8 flex items-center gap-3 drop-shadow-[0_0_10px_rgba(200,0,0,0.3)]">
                    <Clock className="w-8 h-8" /> Alleingelassen im Business
                 </h3>
                 <ul className="space-y-6">
                   <li className="flex gap-4 items-start text-white/70 text-lg">
                      <X className="w-6 h-6 text-red-500/80 mt-1 flex-shrink-0" />
                      <div><strong className="font-medium text-white">Isolierte Hürden:</strong> Wenn es in Marketing oder Technik hakt, kommst du einfach nicht weiter. Ein einziges Problem stoppt dein Momentum für Tage.</div>
                   </li>
                   <li className="flex gap-4 items-start text-white/70 text-lg">
                      <X className="w-6 h-6 text-red-500/80 mt-1 flex-shrink-0" />
                      <div><strong className="font-medium text-white">Zweifel und Sorgen:</strong> Du trägst Konflikte, unzufriedene Kunden oder rechtliche Fragen ganz allein mit dir herum.</div>
                   </li>
                   <li className="flex gap-4 items-start text-white/70 text-lg">
                      <X className="w-6 h-6 text-red-500/80 mt-1 flex-shrink-0" />
                      <div><strong className="font-medium text-white">Energieraub:</strong> Stundenlanges Grübeln vor leeren Dokumenten raubt dir genau die Kraft, die du für deine eigentliche Arbeit brauchst.</div>
                   </li>
                 </ul>
               </Card>
             </ScrollReveal>

             {/* Neue Methode (Diamond Force) */}
             <ScrollReveal delay={0.2} className="relative z-20 h-full">
               <div className="absolute inset-0 bg-refined-gold/10 blur-[60px] rounded-full pointer-events-none"></div>
               <Card className="bg-[#020202]/95 border border-refined-gold/40 p-8 md:p-12 rounded-[2rem] h-full shadow-[0_0_80px_rgba(184,150,62,0.25)] ring-1 ring-refined-gold/30 backdrop-blur-3xl relative overflow-hidden group">
                 
                 {/* Diamond Tech Flow */}
                 <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-refined-gold to-transparent opacity-100 shadow-[0_0_30px_rgba(184,150,62,1)]"></div>
                 <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-refined-gold/40 to-transparent group-hover:from-refined-gold/80 transition-all duration-500"></div>

                 <h3 className="text-refined-gold font-instrument text-3xl mb-8 flex items-center gap-3 drop-shadow-[0_0_15px_rgba(184,150,62,0.9)]">
                    <Zap className="w-8 h-8 fill-refined-gold/20 animate-pulse" /> Die Diamond Force
                 </h3>
                 <ul className="space-y-6 relative z-10">
                   <li className="flex gap-4 items-start text-white/90 text-lg">
                      <Check className="w-6 h-6 text-refined-gold mt-1 flex-shrink-0 drop-shadow-[0_0_8px_rgba(184,150,62,0.8)]" />
                      <div><strong className="font-medium text-refined-gold">Blockaden sofort lösen:</strong> Du holst dir punktgenau Unterstützung an den Stellen, wo du früher steckengeblieben bist. Das Business fließt weiter.</div>
                   </li>
                   <li className="flex gap-4 items-start text-white/90 text-lg">
                      <Check className="w-6 h-6 text-refined-gold mt-1 flex-shrink-0 drop-shadow-[0_0_8px_rgba(184,150,62,0.8)]" />
                      <div><strong className="font-medium text-refined-gold">Sicherheit als Sparringspartner:</strong> Egal wie kompliziert die Situation – du stellst dich deinen Hürden niemals allein, sondern besprichst sie mit deinem System.</div>
                   </li>
                   <li className="flex gap-4 items-start text-white/90 text-lg">
                      <Check className="w-6 h-6 text-refined-gold mt-1 flex-shrink-0 drop-shadow-[0_0_8px_rgba(184,150,62,0.8)]" />
                      <div><strong className="font-medium text-refined-gold">Neue Denkstruktur im Wachstum:</strong> Sobald du lernst, dir so Hilfe zu holen, verlierst du die Angst vor technischen oder strukturellen Dingen.</div>
                   </li>
                 </ul>
               </Card>
             </ScrollReveal>
          </div>
        </div>
      </section>

      {/* DELIVERY WORKFLOW - Custom Scroll Interaction */}
      <DeliveryScrollSteps />

      {/* SALES & CHECKOUT SECTION (Premium Highlight) */}
      <section id="checkout" className="py-24 px-4 md:px-12 relative z-20 border-t border-white/5 bg-[#030303] text-white">
        <div className="max-w-[1000px] mx-auto">
          
          <ScrollReveal>
             <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-refined-gold/20 bg-refined-gold/10 text-refined-gold text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
                  <ShieldAlert className="w-4 h-4" />
                  Instant Access
                </div>
                <h2 className="font-instrument text-5xl md:text-6xl text-white mb-6">Sichere dir das System.</h2>
                <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
                  Eine einzige Investition. Keine laufenden Kosten an uns. Du holst dir die Struktur, die dir tagtäglich Stunden an mühsamer Arbeit erspart.
                </p>
             </div>
          </ScrollReveal>

          <Card className="bg-[#050505]/95 border-refined-gold/30 p-1 md:p-2 rounded-[4rem] relative shadow-[0_40px_100px_-20px_rgba(184,150,62,0.3)] backdrop-blur-2xl ring-1 ring-refined-gold/20 overflow-hidden">
             
             {/* Glowing Inner Box */}
             <div className="w-full h-full bg-[#0a0a0a]/90 rounded-[3.8rem] p-8 md:p-16 relative overflow-hidden border border-white/5 flex flex-col md:flex-row gap-12 items-center">
                
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-refined-gold/20 to-transparent blur-[100px] pointer-events-none"></div>

                {/* Left/Value List */}
                <div className="flex-1 z-10 w-full relative">
                   <h3 className="text-2xl font-instrument text-white mb-8 border-b border-white/10 pb-6 uppercase tracking-widest text-refined-gold">Die Diamond Force</h3>
                   <div className="space-y-6 text-left">
                     {[
                       'Sofort-Installation per One-Click (Alle 7 KI-Seelen)',
                       'Integrierte Sabala Markenstimme (Kein Roboter-Talk)',
                       'Konflikt-Lösungs & AGB Templates eingebaut',
                       'Exklusive Schritt-für-Schritt Launch Anleitung',
                       'Lebenslange Nutzungsrechte an den GPT-Prompts'
                     ].map((benefit, bIdx) => (
                       <div key={bIdx} className="flex items-start gap-4 group">
                         <div className="w-6 h-6 rounded-full bg-refined-gold/10 border border-refined-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-refined-gold/20 transition-all">
                            <CheckCircle2 className="w-3.5 h-3.5 text-refined-gold" />
                         </div>
                         <span className="text-lg text-white/80 font-light group-hover:text-white transition-colors">{benefit}</span>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Right/Pricing Card (Marvel System Style) */}
                 <div className="w-full md:w-[450px] z-10">
                    <TiltCard>
                      <div className="bg-[#020202]/95 border border-refined-gold/40 p-10 rounded-[3rem] shadow-[0_0_50px_rgba(184,150,62,0.2)] ring-1 ring-refined-gold/20 relative overflow-hidden group">
                         
                         {/* Digital Scanline Background */}
                         <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(184,150,62,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(184,150,62,0.1)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none"></div>
                         
                         {/* Marvel Scanner Laser & Glow*/}
                         <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-refined-gold/20 blur-[50px] pointer-events-none rounded-full"></div>
                         <div className="absolute top-0 left-[-100%] w-1/2 h-[2px] bg-gradient-to-r from-transparent via-refined-gold to-transparent group-hover:animate-[shimmer_2s_ease-in-out]"></div>
                         <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-refined-gold/10 to-transparent skew-x-[-30deg] group-hover:animate-[shimmer_2s_ease-in-out]"></div>

                         <div className="relative z-10 mb-8 border-b border-white/10 pb-8">
                            <div className="flex items-center gap-2 mb-3">
                               <span className="animate-pulse w-2 h-2 bg-refined-gold rounded-full shadow-[0_0_10px_rgba(184,150,62,0.8)]" />
                               <span className="text-[10px] text-refined-gold/80 tracking-[0.3em] uppercase font-mono">SYS.DIAMOND // ONLINE</span>
                            </div>
                            <h4 className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-mono mb-4">Classification: FULL TEAM</h4>
                            
                            {/* StatBars */}
                            <div className="space-y-4">
                               <div className="flex items-center gap-4">
                                  <div className="w-24 text-[10px] text-white/50 uppercase tracking-widest font-mono">Efficiency</div>
                                  <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 bottom-0 bg-refined-gold w-[99%] shadow-[0_0_10px_rgba(184,150,62,0.8)]"></div>
                                  </div>
                                  <div className="text-[10px] text-refined-gold font-mono">99%</div>
                               </div>
                               <div className="flex items-center gap-4">
                                  <div className="w-24 text-[10px] text-white/50 uppercase tracking-widest font-mono">Stress</div>
                                  <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 bottom-0 bg-red-500/80 w-[5%]"></div>
                                  </div>
                                  <div className="text-[10px] text-red-400 font-mono">05%</div>
                               </div>
                               <div className="flex items-center gap-4">
                                  <div className="w-24 text-[10px] text-white/50 uppercase tracking-widest font-mono">Setup</div>
                                  <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 bottom-0 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] w-[100%]"></div>
                                  </div>
                                  <div className="text-[10px] text-white font-mono">FAST</div>
                               </div>
                            </div>
                         </div>

                         <div className="text-center mb-8 relative z-10">
                           <p className="text-sm font-mono uppercase tracking-widest text-white/40 mb-2 drop-shadow-md">Gesamtwert <span className="line-through text-white/20">630,- €</span></p>
                           <div className="flex flex-col items-center justify-center gap-1">
                              <div className="flex items-baseline gap-2">
                                 <p className="font-instrument text-[4.5rem] md:text-[5.5rem] text-refined-gold drop-shadow-[0_0_20px_rgba(184,150,62,0.4)] leading-none">333</p>
                                 <p className="text-2xl text-refined-gold font-light opacity-80 mt-2">€</p>
                              </div>
                              <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono mt-2 flex items-center gap-2">
                                <ScanFace className="w-3 h-3 text-refined-gold" /> Einmalige Investition (Netto)
                              </p>
                           </div>
                         </div>

                         {/* Checkout Button */}
                         <a href="https://elopage.com/s/Sabala/DIAMONDFORCE" target="_blank" rel="noopener noreferrer" className="relative w-full z-10 overflow-hidden bg-white hover:bg-refined-gold text-deep-charcoal hover:text-white py-6 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] transition-all duration-500 transform hover:scale-[1.02] active:scale-95 group/btn flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(184,150,62,0.4)]">
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
                           <Zap className="w-5 h-5 animate-pulse" /> Force Booten
                         </a>
                      </div>
                    </TiltCard>
                 </div>
             </div>
          </Card>
        </div>
      </section>

      {/* THE ABSOLUTE HIGHLIGHT (BONUS) - FOCUS ON AUTARKIE */}
      <section className="py-32 px-4 md:px-12 relative z-20 bg-transparent border-t border-white/5">
         <div className="max-w-[1000px] mx-auto">
            <ScrollReveal>
              <div className="rounded-[3rem] p-px bg-gradient-to-br from-refined-gold/50 via-white/10 to-transparent shadow-[0_0_80px_rgba(184,150,62,0.15)] relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[300px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-refined-gold/20 to-transparent blur-[80px] pointer-events-none"></div>

                <div className="bg-[#050505]/95 backdrop-blur-3xl rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-16 relative">
                   <div className="flex-[1.5] z-10">
                     <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-refined-gold/50 bg-refined-gold/10 text-refined-gold text-xs font-bold uppercase tracking-widest mb-8 shadow-lg shadow-refined-gold/20">
                        <Sparkles className="w-4 h-4 animate-pulse" /> Das absolute Highlight
                     </div>
                     <h3 className="font-instrument text-4xl md:text-5xl text-white mb-6">Werde komplett autark.</h3>
                     <p className="text-white/70 text-lg leading-relaxed mb-6">
                       Wir machen dich nicht von unseren Vorlagen abhängig. Wenn du in unsere Diamond Force investierst, geben wir dir <strong className="text-white">The Master Protocol & Aurels Blueprint</strong> direkt als Bonus dazu.
                     </p>
                     <p className="text-white/90 text-lg leading-relaxed font-light bg-black/50 p-6 rounded-2xl border border-white/10 shadow-inner">
                       Du lernst darin Schritt für Schritt, wie die Matrix hinter unseren GPTs funktioniert. So kannst du ganz ohne Programmierkenntnisse <strong className="font-medium text-refined-gold">deine völlig eigenen, neuen KIs bauen</strong>. Du bist nicht an ein Sabala-Abo gefesselt – <strong className="text-white border-b border-refined-gold/50 pb-0.5">du lernst die absolute Unabhängigkeit.</strong>
                     </p>
                   </div>

                   <div className="flex-1 w-full flex justify-center z-10 perspective-[1000px]">
                      {/* Generiertes Premium 3D Buchcover */}
                      <div className="w-full max-w-[340px] relative transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-[15deg] hover:rotate-x-[0deg] transition-all duration-700 ease-out group">
                         {/* Golden Glow hinter dem Buch */}
                         <div className="absolute inset-0 bg-refined-gold/30 blur-[60px] rounded-full scale-90 opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
                         
                         <img 
                           src="/images/master_protocol_book.png" 
                           alt="The Master Protocol Book" 
                           className="relative z-10 w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] filter brightness-110 contrast-125"
                         />
                         
                         {/* Licht-Spiegelung (Glass-Sweep) */}
                         <div className="absolute inset-0 overflow-hidden mix-blend-overlay pointer-events-none rounded-[10px]">
                            <div className="absolute top-0 bottom-0 left-[-100%] w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg] group-hover:animate-[shimmer_2s_ease-in-out]"></div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </ScrollReveal>
         </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-4 md:px-12 relative z-20 border-t border-white/5 bg-[#0A0806]">
        <div className="max-w-[800px] mx-auto text-left relative z-20">
            <h4 className="text-4xl text-white font-instrument mb-12 text-center drop-shadow-lg">Häufige Fragen</h4>
            
            <div className="grid grid-cols-1 gap-6">
               <ScrollReveal>
                 <div className="bg-[#050505]/80 hover:bg-[#0a0a0a] transition-all duration-300 border border-white/5 hover:border-refined-gold/30 rounded-3xl p-8 shadow-lg backdrop-blur-sm group">
                    <h5 className="text-xl text-white font-medium mb-3 flex items-start gap-4">
                      <span className="text-refined-gold mt-1 group-hover:scale-125 transition-transform duration-300">▹</span> Brauche ich ChatGPT Plus dafür?
                    </h5>
                    <p className="text-lg text-white/50 font-light leading-relaxed pl-7">
                      Ja. Custom GPTs sind ein Premium-Feature von OpenAI. Du benötigst einen aktiven ChatGPT Plus Account (ca. 20€/Monat), um diese Assistenten betreiben zu können.
                    </p>
                 </div>
               </ScrollReveal>

               <ScrollReveal delay={0.1}>
                 <div className="bg-[#050505]/80 hover:bg-[#0a0a0a] transition-all duration-300 border border-white/5 hover:border-refined-gold/30 rounded-3xl p-8 shadow-lg backdrop-blur-sm group">
                    <h5 className="text-xl text-white font-medium mb-3 flex items-start gap-4">
                      <span className="text-refined-gold mt-1 group-hover:scale-125 transition-transform duration-300">▹</span> Hilft mir das auch bei meinem spezifischen Marketing?
                    </h5>
                    <p className="text-lg text-white/50 font-light leading-relaxed pl-7">
                      Absolut. Die Assistenten (insbesondere Aurel) sind extrem flexibel. Das beiliegende Master-Protocol zeigt dir zudem, wie du sie exakt auf deine spirituelle/mentoring Tonalität kalibrierst.
                    </p>
                 </div>
               </ScrollReveal>
            </div>
        </div>
      </section>
    </div>
  )
}
