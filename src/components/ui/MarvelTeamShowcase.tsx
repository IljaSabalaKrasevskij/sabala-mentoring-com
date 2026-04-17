'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react'; // Can use generic icon or Info, let's use a standard tech icon
import { ScanFace } from 'lucide-react'; 

// --- Typewriter Effect Component ---
function Typewriter({ text, delay = 0, speed = 0.05, className = "" }: { text: string; delay?: number; speed?: number; className?: string }) {
  const words = text.split("");
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={{
        visible: {
          transition: { staggerChildren: speed, delayChildren: delay }
        },
        hidden: {}
      }}
      className={`font-mono ${className}`}
    >
      {words.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, display: 'none' },
            visible: { opacity: 1, display: 'inline' }
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

// --- Specific Member Data Setup ---
const teamMembers = [
  {
    id: "runa",
    name: "Runa",
    stone: "Der Rubin",
    color: "from-red-600/30 to-rose-900/10",
    glowColor: "bg-red-500",
    textColor: "text-red-400",
    image: "/images/team/runa.png",
    description: "Unterstützt Coaches und Dienstleister dabei, schwierige Kundenfälle klar, fair und professionell zu lösen.",
    emotion: "Ich habe eine Nachricht bekommen und weiß nicht, was ich antworten soll. Ich bin wütend, verletzt oder verunsichert und brauche einen klaren Kopf.",
    situations: ["Rückerstattungs-Forderungen", "Zahlungs-Ausfälle diskutieren", "Auf aggressive E-Mails reagieren", "Kulanz vs. Unternehmensgrenze"],
    conversations: ["Wie können wir starten?", "Lass uns starten!"],
    stats: { empathy: 85, logic: 95, protection: 98 }
  },
  {
    id: "lia",
    name: "Lia",
    stone: "Der Rosenquarz",
    color: "from-pink-500/30 to-fuchsia-900/10",
    glowColor: "bg-pink-400",
    textColor: "text-pink-300",
    image: "/images/team/lia.png",
    description: "Achtsame KI-Begleiterin für die Angebotsentwicklung. Hilft dir, deine Sprache für neue Angebote zu finden.",
    emotion: "Ich entwickle gerade ein neues Angebot und brauche eine Reflektion für meine Gedanken. Es fühlt sich noch flach an.",
    situations: ["Neues Angebot konzipieren", "Die eigene Sprache finden", "Wertschätzende Reflektion", "Tiefe statt Verkaufsdruck"],
    conversations: ["Ich habe eine Angebotsseite...", "Was wirkt an meinem Angebot schon stimmig?"],
    stats: { empathy: 99, logic: 70, reflection: 95 }
  },
  {
    id: "siris",
    name: "Siris",
    stone: "Der Saphir",
    color: "from-blue-600/30 to-indigo-900/10",
    glowColor: "bg-blue-500",
    textColor: "text-blue-400",
    image: "/images/team/siris.png",
    description: "Analysiert Angebotsseiten mit Klarheit, Tiefe und positiver Sprache. Für die fundierte Salespage-Bewertung.",
    emotion: "Ich bekomme Besucher, aber keine Anfragen. Meine Seite sieht gut aus — aber irgendwas stimmt nicht. Ich will endlich wissen, was.",
    situations: ["Ausbleibende Kontaktanfragen analysieren", "Verkaufsseite vor dem Launch prüfen", "CTAs die nicht geklickt werden umbauen", "Kaufhürden identifizieren"],
    conversations: ["Analysiere diese Salespage", "Wo liegen hier Spannungsfelder?"],
    stats: { empathy: 80, logic: 98, perfection: 92 }
  },
  {
    id: "juris",
    name: "Juris",
    stone: "Der Onyx",
    color: "from-neutral-700/40 to-neutral-900/10",
    glowColor: "bg-neutral-400",
    textColor: "text-neutral-300",
    image: "/images/team/juris.png",
    description: "Erstellt professionelle AGBs, prüft Verträge und sorgt für rechtliche Sicherheit.",
    emotion: "Ich will mich nicht erst absichern, wenn es zu spät ist. Ich will wissen, ob meine Dokumente wirklich schützen — bevor der erste Konflikt kommt.",
    situations: ["AGB-Erstellung für Coaching/Beratung", "Vertragsprüfung von Kooperationspartnern", "Rechnungs-Prüfung", "Neue Zahlungsmodelle rechtlich absichern"],
    conversations: ["Ich brauche AGBs...", "Kannst du meinen Vertrag prüfen?"],
    stats: { empathy: 60, logic: 100, protection: 99 }
  },
  {
    id: "maris",
    name: "Maris",
    stone: "Der Aquamarin",
    color: "from-cyan-500/30 to-teal-900/10",
    glowColor: "bg-cyan-400",
    textColor: "text-cyan-300",
    image: "/images/team/maris.png",
    description: "Dein Übersetzer und Tech-Support-Profi. Meistert internationale E-Mails und komplexe englische Support-Tickets.",
    emotion: "Ich muss ein englisches Supportticket schreiben oder mit dem internationalen Support kommunizieren und mir fehlen die passenden Worte.",
    situations: ["Englische Tech-Supporttickets formulieren", "Internationale E-Mails übersetzen", "Kommunikation mit ausländischen Partnern", "Souveränes Englisch"],
    conversations: ["Ich brauche eine professionelle Absage.", "Hilf mir bei einem Supportticket."],
    stats: { empathy: 90, logic: 85, articulation: 98 }
  },
  {
    id: "mila",
    name: "Mila",
    stone: "Der Citrin",
    color: "from-amber-500/30 to-yellow-900/10",
    glowColor: "bg-yellow-400",
    textColor: "text-yellow-400",
    image: "/images/team/mila.png",
    description: "Dein kreativer Sparringspartner. Sortiert vage Ideen und verwandelt Gedanken in konkrete Pläne.",
    emotion: "Ich hab da so eine Idee — aber sie ist noch nicht greifbar. Ich brauche jemanden, der mitdenkt, Fragen stellt und mir hilft.",
    situations: ["Neue Angebote konzipieren", "Content-Ideen strukturieren", "Onlinekurs planen", "Webinarreihe entwickeln", "Kreatives Chaos ordnen"],
    conversations: ["Ich hab da so eine Idee...", "Worüber könnte ich schreiben?"],
    stats: { empathy: 85, logic: 80, creativity: 100 }
  },
  {
    id: "aurel",
    name: "Aurel",
    stone: "Der Diamant",
    color: "from-slate-200/20 to-white/5",
    glowColor: "bg-white",
    textColor: "text-white",
    image: "/images/team/aurel.png", // Temporarily expecting aurel.png to be added by user
    description: "Konzipiert und baut eigene Custom GPTs. Schritt für Schritt, von der Idee zur Instruction.",
    emotion: "Ich mache diese Aufgabe jede Woche aufs Neue. Das könnte doch ein Assistent für mich tun. Ich will endlich meinen eigenen Custom GPT bauen.",
    situations: ["Eigene Arbeitsabläufe automatisieren", "Ethisch saubere Trainings-Prompts bauen", "Assistenten programmieren ohne Code", "Instructions perfektionieren"],
    conversations: ["Ich möchte meinen eigenen Custom GPT bauen.", "Welche Aufgabe eignet sich dafür?"],
    stats: { empathy: 30, logic: 100, structural: 40 }
  }
];

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-4 mb-2">
      <div className="w-24 text-[10px] text-white/50 uppercase tracking-widest">{label}</div>
      <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className={`absolute top-0 left-0 bottom-0 ${color}`}
        />
      </div>
      <div className={`text-xs ${color} font-mono`}>{value}%</div>
    </div>
  );
}

export default function MarvelTeamShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full bg-[#030303] text-white">
      {/* Background HUD Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 mix-blend-overlay opacity-30 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {teamMembers.map((member, index) => {
        const isEven = index % 2 === 0;

        return (
          <section key={member.id} className="relative py-24 md:py-32 flex items-center justify-center px-4 md:px-8 overflow-hidden z-10 border-b border-white/5">
            
            {/* Dynamic Glow Background for each member */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[150px] opacity-20 bg-gradient-to-br ${member.color} pointer-events-none`}
            />

            <div className={`w-full max-w-[1400px] mx-auto flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24 relative`}>
              
              {/* HUD TEXT UI */}
              <div className="flex-[1.2] relative p-8">
                {/* Tech Bracket Borders */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20" />
                
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-4">
                     <span className={`animate-pulse w-3 h-3 ${member.glowColor} rounded-full`} />
                     <Typewriter text={`SYS.AI.0${index + 1} // ONLINE`} className="text-[10px] text-white/40 tracking-[0.3em]" />
                  </div>

                  <div>
                    <h2 className="text-6xl md:text-8xl font-instrument mb-2 uppercase tracking-tight">
                       <Typewriter text={member.name} speed={0.1} />
                    </h2>
                    <Typewriter 
                       text={`CLASSIFICATION: ${member.stone.toUpperCase()}`} 
                       delay={0.6}
                       speed={0.03}
                       className={`text-sm tracking-[0.2em] ${member.textColor}`} 
                    />
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="pt-6 border-t border-white/10"
                  >
                    <p className="text-xl font-light text-white/70 leading-relaxed mb-6">
                      {member.description}
                    </p>

                    {/* ACTION BUTTONS: SCENARIO & CHECKOUT */}
                    <div className="flex flex-wrap items-center gap-4 mb-10 relative z-50">
                      {/* INTERACTIVE SCENARIO HOVER BUTTON */}
                      <div className="relative group inline-block">
                        <button className={`flex items-center gap-2 border px-6 py-3 rounded-full text-sm font-bold tracking-widest transition-all cursor-crosshair shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 ${member.textColor} border-${member.textColor.replace('text-', '')}/50 bg-${member.textColor.replace('text-', '')}/10 hover:bg-${member.textColor.replace('text-', '')}/20`}>
                          <ScanFace className="w-5 h-5 animate-pulse" /> SCENARIO DATA
                        </button>
                        
                        {/* The Hover Popover */}
                        <div className="absolute left-0 bottom-full mb-6 w-[80vw] max-w-[450px] opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                           {/* Connector Line */}
                           <div className="absolute -bottom-6 left-8 w-[1px] h-6 bg-white/20"></div>

                           <div className="bg-[#050505]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
                              {/* Accent Glow in the corner */}
                              <div className={`absolute -top-10 -right-10 w-32 h-32 blur-[50px] ${member.glowColor} opacity-20 pointer-events-none`}></div>

                              <h4 className={`text-xs ${member.textColor} font-mono uppercase tracking-widest mb-3`}>Target Emotion:</h4>
                              <p className="font-instrument text-2xl text-white italic mb-6 leading-snug">"{member.emotion}"</p>
                              
                              <h4 className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-3">Concrete Triggers:</h4>
                              <ul className="space-y-2">
                                 {member.situations.map((sit, sitIdx) => (
                                   <li key={sitIdx} className="text-sm text-white/80 font-light flex items-start gap-2">
                                     <span className={`${member.textColor} mt-0.5`}>▹</span> {sit}
                                   </li>
                                 ))}
                              </ul>
                           </div>
                        </div>
                      </div>

                      {/* DIRECT SALES CTA */}
                      <a href="#checkout" className="flex items-center gap-2 border px-6 py-3 rounded-full text-sm font-bold tracking-widest transition-all shadow-[0_0_20px_rgba(184,150,62,0.3)] text-refined-gold border-refined-gold/50 bg-refined-gold/10 hover:bg-refined-gold hover:text-deep-charcoal hover:scale-105 active:scale-95 group/buy">
                         SYSTEM LADEN <div className="w-2 h-2 rounded-full bg-refined-gold group-hover/buy:bg-deep-charcoal animate-pulse" />
                      </a>
                    </div>

                    
                    {/* Stat Bars */}
                    <div className="space-y-4 mb-4">
                       {Object.entries(member.stats).map(([key, val]) => (
                         <StatBar key={key} label={key} value={val} color={member.textColor} />
                       ))}
                    </div>

                  </motion.div>
                </div>
              </div>

              {/* HOLOGRAPHIC AVATAR */}
              <div className="flex-1 relative flex items-center justify-center min-h-[500px]">
                {/* Rotating Tech Rings */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                  className={`absolute w-full pt-[100%] rounded-full border border-dashed ${member.textColor} opacity-20`}
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                  className={`absolute w-[80%] pt-[80%] rounded-full border-t border-b ${member.textColor} opacity-30`}
                />
                
                {/* Scanning Laser Line */}
                <motion.div 
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatType: "reverse" }}
                  className={`absolute left-0 right-0 h-[2px] ${member.glowColor} z-20 shadow-[0_0_20px_currentColor] pointer-events-none`}
                />

                <motion.div 
                  initial={{ scale: 0.8, opacity: 0, filter: 'blur(20px)' }}
                  whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`relative z-10 w-[80%] max-w-[400px] aspect-square rounded-[3rem] border ${member.id === 'aurel' ? 'border-refined-gold/40 shadow-[0_0_120px_rgba(184,150,62,0.5)] ring-2 ring-refined-gold/20' : 'border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.05)]'} bg-white/5 backdrop-blur-sm overflow-hidden flex items-center justify-center p-8 group`}
                >
                  {/* Special Universe Background for Aurel */}
                  {member.id === 'aurel' && (
                    <div className="absolute inset-0 z-0">
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#3b0764_0%,_#000_100%)] opacity-80" />
                       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 mix-blend-screen animate-[pulse_8s_infinite]" />
                       <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-refined-gold/20 to-transparent mix-blend-overlay" />
                    </div>
                  )}

                  <div className={`absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent z-10 pointer-events-none ${member.id === 'aurel' ? 'opacity-50' : ''}`}></div>
                  <div className={`absolute inset-0 ${member.color} opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none mix-blend-overlay`}></div>

                  <img 
                    src={member.image} 
                    alt={member.name}
                    className={`relative z-0 w-full h-full object-contain mix-blend-screen animate-[float_4s_ease-in-out_infinite] scale-110`}
                    style={{ 
                      animationDelay: `${index * 0.5}s`,
                      transform: isEven ? 'scaleX(-1)' : 'scaleX(1)'
                    }}
                  />
                  
                  {/* High-tech corners inside the box */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
                  <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />
                </motion.div>

                {/* Tracking Target Bracket Overlay */}
                <div className="absolute inset-8 border border-white/5 rounded-full pointer-events-none flex items-center justify-center">
                   <div className="w-8 h-8 absolute top-0 left-1/2 -translate-x-1/2 -mt-4 border-l border-r border-white/20" />
                   <div className="w-8 h-8 absolute bottom-0 left-1/2 -translate-x-1/2 -mb-4 border-l border-r border-white/20" />
                </div>
              </div>

            </div>
          </section>
        );
      })}
      
      {/* Custom Keyframes embedded for the layout */}
      <style dangerouslySetInnerHTML={{__html:`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}} />
    </div>
  );
}
