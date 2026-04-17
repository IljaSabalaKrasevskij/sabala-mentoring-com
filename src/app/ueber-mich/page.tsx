"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// ════════════════════════════
// 1. DATA WITH 8 PHASES
// ════════════════════════════
const memoryData = [
  {
    id: "p1",
    year: "1989–2006",
    title: "Herkunft & Aufwachsen",
    kicker: "Phase 1: Kiew → Hilden",
    desc: "In Kiew geboren. Mit 3 Jahren nach Deutschland gezogen. Neben der Schule wurde Fußball zur großen Leidenschaft. Talent bis hin zur Mittelrheinauswahl und Alemannia Aachen. Der Druck war groß, das Herz am Ende nicht dabei — aber der Sport hat den Charakter geformt.",
    skills: [
      "Anpassungsfähigkeit (Kulturen, Umzüge, neue Umfelder)",
      "Disziplin und Leistungsbereitschaft durch Leistungssport",
      "Frühe Erfahrung mit Druck, Erwartungen und Loslassen"
    ],
    image: "/Sabalas Story/Kiew 1989.png", 
  },
  {
    id: "p2",
    year: "2007–2015",
    title: "Systemgastronomie & Führung",
    kicker: "Phase 2: McDonald's",
    desc: "Der Weg, den niemand erwartet hat. 8 Jahre im größten Franchise-System der Welt. Führungsverantwortung ab dem 18. Lebensjahr. Duales BWL-Studium in Köln. Schließlich die Leitung des Flagship Stores am Münchner Flughafen — 5,5 Millionen Euro Jahresumsatz.",
    skills: [
      "Führung und Teamaufbau (seit dem 18. Lebensjahr)",
      "Arbeit in Systemen, Standards und Prozessen auf Konzern-Niveau",
      "Betriebswirtschaftliches Fundament (BWL-Studium)",
      "Verantwortung für Umsatz, Personal und Qualität in großem Maßstab"
    ],
    image: "/Sabalas Story/Hückelhoven 2007.png",
  },
  {
    id: "p3",
    year: "2016–2018",
    title: "Individualgastronomie & Neuorientierung",
    kicker: "Phase 3: München",
    desc: "Bewusste Kündigung. Raus aus dem Konzern, rein in die Individualgastronomie. Kellnern, verschiedene Betriebe kennenlernen — eine komplett andere Welt. Weniger System, mehr Persönlichkeit und direkter Kundenkontakt.",
    skills: [
      "Kennenlernen beider Welten: Konzern vs. Individualunternehmen",
      "Direkter Kundenkontakt und Service auf persönlicher Ebene",
      "Mut zur Veränderung — auch wenn es bedeutet, von vorne anzufangen"
    ],
    image: "/images/sabala-portrait-hero.png", // Temp placeholder, da McDonalds Bilder hier nicht zum Text passen
  },
  {
    id: "p-dina",
    year: "Seit 2016",
    title: "Das stärkste Fundament",
    kicker: "Phase 4: Dina",
    desc: "2016 bin ich mit Dina, meiner besseren Hälfte, zusammengekommen. Ohne sie wäre ich heute nicht an dem Punkt, an dem ich bin. Diese Phase lehrte mich etwas Essenzielles: Den Weg ins Unternehmertum kann man nicht alleine gehen. Es braucht ein Umfeld, das an einen glaubt und den Raum bedingungslos hält.",
    skills: [
      "Erkenntnis: Ein starkes, unterstützendes Umfeld ist der wichtigste Hebel",
      "Gegenseitiges Wachstum und bedingungsloser Support",
      "Stabilität als Basis für kreative Ausbrüche und Neuanfänge"
    ],
    image: "/Sabalas Story/München 2019- Meine bessere Hälfte.JPG",
  },
  {
    id: "p4",
    year: "2018–2020",
    title: "Content Creator & Akademie-Aufbau",
    kicker: "Phase 5: dean&david",
    desc: "Zurück in der Systemgastronomie in neuer Rolle: Aufbau der dean&david Online-Akademie aus dem Nichts. Erste Videokonzepte und Produktionen. Komplette kreative Freiheit — Raum für eigene Ideen. Erfolgreiche Projekte, die bis heute laufen.",
    skills: [
      "Content Creation: Videokonzeption, Produktion, Storytelling",
      "Aufbau digitaler Lernplattformen (LMS)",
      "Autodidaktisches Arbeiten und kreative Freiheit",
      "Strategische Konzeptionierung von Schulungsinhalten"
    ],
    image: "/Sabalas Story/München 2019 dean&david.png",
  },
  {
    id: "p5",
    year: "2020–2021",
    title: "Die innere Reise & Wendepunkt",
    kicker: "Phase 6: Das Erwachen",
    desc: "2020 veränderte alles. Begegnung mit dem Lehrer Arawinda Himala. Meditation und tiefe innere Arbeit brachten ein fundiertes Verständnis für Psychologie und Marketing – nicht als Technik, sondern als echtes Verstehen von Menschen.",
    skills: [
      "Tiefes Verständnis für Psychologie und menschliche Motivation",
      "Meditation und innere Klarheit als Fundament",
      "Fähigkeit, das Abstrakte (Intuition) mit dem Strategischen zu verbinden",
      "Der Mut, dem Herzen zu folgen und der eigenen Vision zu dienen"
    ],
    image: "/Sabalas Story/Caux 2020.png",
  },
  {
    id: "p6",
    year: "2021–2024",
    title: "Mentoring & Erste Selbstständigkeit",
    kicker: "Phase 7: Sabala Coaching",
    desc: "Gründung von Sabala Coaching. Erst Meditationsbegleitung, dann tiefgreifendes Business-Mentoring. Über 4 Jahre Einzelbegleitung von Menschen. Die Positionierung wurde kristallklar: Jemand, der sowohl die spirituelle Ebene als auch das fest verwurzelte Strukturierte meistert.",
    skills: [
      "Coaching und Mentoring auf absolut professionellem Niveau",
      "Positionierung und Personal Branding",
      "Tiefes Verständnis für die Reise von Solo-Unternehmern",
      "Kombination aus Konzern-Systematik und Herzausrichtung"
    ],
    image: "/Sabalas Story/München 2021 - Gründung Sabala Coaching.png",
  },
  {
    id: "p7",
    year: "2024",
    title: "Herzkreative & Business-Netzwerk",
    kicker: "Phase 8: Barcelona",
    desc: "Als Digital Nomad unterwegs. Die Vision entstand in einem Lieblingscafé in Barcelona: Connecting Herzkreative. Ein grenzenloses globales Business-Netzwerk für herzgetriebene Unternehmer. LLC gegründet, aus Deutschland abgemeldet.",
    skills: [
      "Aufbau und Führung eines internationalen Netzwerks",
      "Unternehmensgründung (LLC) im internationalen Kontext",
      "Community Building für wertorientierte Unternehmer",
      "Digitales Nomadentum: Ortsunabhängig arbeiten und führen"
    ],
    image: "/Sabalas Story/2024 Barcelona.jpg",
  },
  {
    id: "p-heute",
    year: "2026",
    title: "Premium Erlebnis Webseiten",
    kicker: "Phase 9: Heute",
    desc: "Der Startschuss für Premium Erlebnis Webseiten für herzverbundene Dienstleister und Coaches. Die Verschmelzung aus tiefer psychologischer Sichtbarkeit, emotionalem Brand Design und hochmoderner technischer Exzellenz.",
    skills: [
      "Entwicklung immersiver, konvertierender Web-Erlebnisse",
      "Zusammenführung von Architektur (Code) und Emotion (Design)",
      "Vollkommener Fokus auf echte Premium-Positionierung"
    ],
    image: "/Sabalas Story/Stettin 2026 - Start Premium Erlebnis Webseiten.png",
  }
];


// ════════════════════════════
// 2. COMPONENTS
// ════════════════════════════

function VerticalTimelineStation({ station, index }: { station: typeof memoryData[0], index: number }) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex w-full justify-center group my-10 md:my-16">
      
      {/* TIMELINE CENTER DOT */}
      <div className="absolute left-[38px] md:left-1/2 ml-[-10px] top-12 md:top-1/2 md:-mt-[10px] w-5 h-5 rounded-full bg-pure-surface border-[4px] border-refined-gold z-20 shadow-[0_0_15px_rgba(184,150,62,0.8)] transition-transform duration-500 group-hover:scale-125"></div>

      <div className={cn(
        "flex flex-col md:flex-row w-full max-w-[1400px] z-10 relative",
        isLeft ? "md:flex-row-reverse" : "md:flex-row"
      )}>
        
        {/* Spacer for Alternate Side */}
        <div className="hidden md:block w-1/2 px-12 lg:px-24"></div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 pl-24 pr-6 md:px-12 lg:px-24 flex flex-col justify-center">
            
            {/* The Image Viewer */}
            <div className={cn(
              "relative w-full max-w-[240px] aspect-square rounded-2xl overflow-hidden mb-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:max-w-[320px] group-hover:shadow-2xl shadow-lg border border-black/5",
              isLeft ? "md:mr-auto" : "md:ml-auto"
            )}>
              <div className="absolute inset-0 bg-black/5 group-hover:opacity-0 transition-opacity z-10"></div>
              <Image 
                src={station.image}
                alt={station.title}
                fill
                className="object-cover object-top transform scale-100 group-hover:scale-[1.15] transition-transform duration-[1.5s] ease-out origin-top"
              />
              <div className="absolute top-4 right-4 bg-pure-surface/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-whisper-border z-20 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
                <span className="font-instrument text-base md:text-lg font-bold text-deep-charcoal">{station.year}</span>
              </div>
            </div>

            {/* Text Flow */}
            <div className={cn(
               "flex flex-col text-left" 
            )}>
               <div className="flex items-center gap-3 mb-2">
                  <div className="h-[1px] w-6 bg-refined-gold"></div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-refined-gold font-bold">{station.kicker}</span>
               </div>
               
               <h3 className="font-instrument text-2xl md:text-3xl lg:text-4xl leading-tight text-deep-charcoal mb-3">{station.title}</h3>
               
               <p className="text-deep-charcoal/80 font-satoshi text-sm md:text-base leading-relaxed mb-6 font-light">
                 {station.desc}
               </p>
               
               {/* The Benefit Frame - Bullet Points */}
               <div className="bg-[#fcfbf9] border border-refined-gold/20 p-5 md:p-6 rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] transition-colors duration-500 group-hover:border-refined-gold/50 group-hover:bg-[#f2efe8]">
                 <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-refined-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <p className="font-mono uppercase text-[10px] tracking-[0.15em] text-deep-charcoal font-bold">Zentrale Skills dieser Phase</p>
                 </div>
                 
                 <ul className="flex flex-col gap-2">
                   {station.skills.map((skill, si) => (
                     <li key={si} className="flex items-start gap-2">
                       <span className="text-refined-gold mt-1 text-[10px]">◆</span>
                       <span className="text-deep-charcoal/90 text-sm leading-relaxed font-satoshi">{skill}</span>
                     </li>
                   ))}
                 </ul>
               </div>
            </div>

        </div>

      </div>
    </div>
  )
}

function VerticalTimeline() {
  return (
    <div className="relative w-full py-16 md:py-32 bg-pure-surface overflow-hidden">
      {/* Background Central Line */}
      <div className="absolute top-0 bottom-0 left-[38px] md:left-1/2 w-[2px] -ml-[1px] bg-gradient-to-b from-transparent via-refined-gold/40 to-transparent z-0"></div>

      {memoryData.map((station, i) => (
        <ScrollReveal key={station.id} delay={0.05} threshold={0.1}>
           <VerticalTimelineStation station={station} index={i} />
        </ScrollReveal>
      ))}

      {/* Connection line down to trio */}
      <div className="w-full flex justify-center mt-32 relative z-10">
         <div className="w-[2px] h-32 bg-gradient-to-b from-refined-gold/40 to-transparent"></div>
      </div>
    </div>
  )
}

function TrioShowcase() {
  const containerRef = useRef(null);
  
  return (
    <section ref={containerRef} className="py-24 md:py-40 px-6 sm:px-12 md:px-24 bg-[#111] text-white overflow-hidden relative">
      {/* Subtle Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[url('/Bilder%20Sabala/P9282978.jpg')] bg-cover bg-fixed bg-center mix-blend-overlay"></div>
      
      <div className="max-w-[1400px] mx-auto flex flex-col items-center relative z-10">
        
        <ScrollReveal>
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <span className="inline-block border border-night-gold/20 bg-night-gold/5 backdrop-blur-md px-6 py-2 rounded-full font-mono text-xs uppercase tracking-[0.2em] font-bold text-night-gold mb-6 shadow-[0_0_20px_rgba(201,168,76,0.1)]">
              Das aktuelle Kapitel: Das Kollektiv
            </span>
            <h2 className="font-instrument text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.05] text-white mt-6 mb-6">
              Vom Einzelweg zum Premium-Erlebnis.
            </h2>
            <p className="text-night-secondary text-lg md:text-xl font-light leading-relaxed">
              Der große Shift: Weg von reinen Einzelcoachings, hin zur vollendeten Premium-Dienstleistung. Wir übersetzen innere Klarheit in greifbare Marken. Drei Experten, eine klare Vision.
            </p>
          </div>
        </ScrollReveal>

        {/* The TRIO Cards */}
        <div className="w-full flex flex-col gap-8 md:gap-12">
          
          {/* SABALA */}
          <ScrollReveal delay={0.1}>
             <div className="group relative w-full bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row-reverse items-center gap-10 hover:border-night-gold/30 transition-colors duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-night-gold/5 rounded-full blur-[100px] group-hover:bg-night-gold/10 transition-colors duration-700 pointer-events-none"></div>
                <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-4 border-[#222] shadow-2xl relative">
                  <Image src="/images/sabala-portrait-hero.png" alt="Sabala" fill className="object-cover object-[center_15%]" />
                </div>
                <div className="flex flex-col text-center md:text-left z-10 w-full">
                   <h3 className="font-instrument text-3xl md:text-4xl text-white mb-2">Ilja Sabala</h3>
                   <span className="font-mono text-xs tracking-widest uppercase text-night-gold mb-6 inline-block">Gründer, Strategie & Code</span>
                   <p className="text-night-secondary leading-relaxed font-light text-base md:text-lg max-w-2xl">
                     Gründer von Sabala Mentoring und Architekt hinter dem Erlebnis. Ich habe ein exklusives Team aus professionellen Partnern formiert, das sich über Jahre eng bewährt hat. Während ich die tiefenpsychologische Positionierung, die Strategie und die technische Infrastruktur (Code & Architektur) verantworte, verschmelzen wir unsere Disziplinen zu einem durchschlagenden Premium-Auftritt.
                   </p>
                </div>
             </div>
          </ScrollReveal>

          {/* FLEUR */}
          <ScrollReveal delay={0.2}>
             <div className="group relative w-full bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-10 hover:border-night-gold/30 transition-colors duration-500 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-night-gold/5 rounded-full blur-[100px] group-hover:bg-night-gold/10 transition-colors duration-700 pointer-events-none"></div>
                <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-4 border-[#222] shadow-2xl relative">
                  <Image src="/images/Das-Team-Fleur.png" alt="Fleur" fill className="object-cover" />
                </div>
                <div className="flex flex-col text-center md:text-left z-10 w-full">
                   <h3 className="font-instrument text-3xl md:text-4xl text-white mb-2">Fleur</h3>
                   <span className="font-mono text-xs tracking-widest uppercase text-night-gold mb-6 inline-block">Brand Design</span>
                   <p className="text-night-secondary leading-relaxed font-light text-base md:text-lg max-w-2xl">
                     Sie hat das Auge fürs Unsichtbare. Fleur übersetzt das Wesen eines Menschen in ein maßgeschneidertes, psychologisch wirksames Farbkonzept, einen starken Brandguide und eine durchschlagende Designsprache.
                   </p>
                </div>
             </div>
          </ScrollReveal>

          {/* CHRISTOPHER */}
          <ScrollReveal delay={0.3}>
             <div className="group relative w-full bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row-reverse items-center gap-10 hover:border-night-gold/30 transition-colors duration-500 overflow-hidden">
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-night-gold/5 rounded-full blur-[100px] group-hover:bg-night-gold/10 transition-colors duration-700 pointer-events-none"></div>
                <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-4 border-[#222] shadow-2xl relative">
                   <Image src="/images/Das-Team-Christopher.jpg" alt="Christopher" fill className="object-cover" />
                </div>
                <div className="flex flex-col text-center md:text-right z-10 w-full">
                   <h3 className="font-instrument text-3xl md:text-4xl text-white mb-2">Christopher</h3>
                   <span className="font-mono text-xs tracking-widest uppercase text-night-gold mb-6 inline-block">Technik & Hosting</span>
                   <p className="text-night-secondary leading-relaxed font-light text-base md:text-lg max-w-2xl ml-auto">
                     Das Rückgrat des Systems. Er sorgt für absolut kompromissloses Premium-Hosting auf Hochleistungsservern, kümmert sich im Hintergrund um sämtliche Pflege, Sicherheitsupdates und Systemwartungen.
                   </p>
                </div>
             </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}

function VisionMessage() {
  return (
    <section className="py-24 md:py-32 px-6 sm:px-12 md:px-24 bg-[#fcfbf9] border-t border-whisper-border relative overflow-hidden">
      <div className="max-w-[800px] mx-auto text-center flex flex-col items-center relative z-10">
        <ScrollReveal>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-refined-gold/40 flex items-center justify-center mb-6 mx-auto shadow-sm bg-white">
             <span className="font-instrument text-2xl text-refined-gold">V</span>
          </div>
          <h2 className="font-instrument text-[2rem] md:text-[3rem] leading-tight text-deep-charcoal mb-8">
            Meine persönliche Vision
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="text-deep-charcoal/80 font-satoshi text-base md:text-lg leading-[1.8] space-y-6 font-light">
            <p>
              Meine Vision ist es, tiefe Arbeit mit Menschen zu machen, die einen wahrhaft positiven Impact hinterlassen. Ich möchte ein globales Netzwerk aus wohlwollenden, respektvollen und wertschätzenden Menschen aufbauen, um unsere gebündelte Kraft zu vervielfachen.
            </p>
            <p>
              Es geht darum, sich weltweit zu vernetzen, aber vor allem: Im Herzen mit sich selbst immer ehrlich und im Reinen zu sein. Das ist das unerschütterliche Fundament wahrer Größe.
            </p>
            <p>
              Wir dürfen Spaß haben. Wir dürfen Freude am Leben haben – und können dabei trotzdem unglaublich viel Gutes in der Welt bewirken. Wenn du mit genau dieser Vision resoniert, dann werden wir sehr wahrscheinlich exzellent zusammenpassen.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ════════════════════════════
// 3. MAIN PAGE
// ════════════════════════════

export default function UeberMichPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-pure-surface">
      
      {/* 
        HERO SECTION
      */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] py-32 px-6 sm:px-12 md:px-24 flex items-center justify-center overflow-hidden">
        
        {/* Fullscreen Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/Sabalas Story/Sabala Über-Mich Header Foto.jpg" 
            alt="Ilja Sabala in der Natur" 
            fill 
            className="object-cover object-[center_30%]"
            priority
          />
          {/* Gradients using the earthy/nature vibes discussed */}
          <div className="absolute inset-0 bg-gradient-to-t from-pure-surface via-[#2a241b]/40 to-[#2a241b]/20"></div>
          <div className="absolute inset-0 bg-[#2b2518]/10 mix-blend-multiply"></div>
        </div>

        <div className="max-w-[1000px] w-full flex flex-col items-center text-center relative z-10 pt-10">
            <ScrollReveal>
               <span className="inline-block border border-white/20 bg-black/20 backdrop-blur-md px-6 py-2 rounded-full font-mono text-xs uppercase tracking-[0.2em] font-bold text-white mb-8 shadow-sm">
                 Die Philosophie
               </span>
              <h1 className="font-instrument text-white leading-[1.05] tracking-[-0.02em] text-[clamp(2.5rem,6vw,5.5rem)] mb-8 drop-shadow-2xl">
                Jede Phase hat konkrete<br/>
                <span className="italic text-refined-gold">Fähigkeiten aufgebaut.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-white/95 text-lg md:text-2xl lg:text-3xl font-light leading-[1.5] max-w-4xl mx-auto drop-shadow-md">
                Die Vielfalt der Stationen ist kein Zufall — sie ist das Fundament.<br/>
                <strong className="font-medium">Man kann dem Herzen folgen UND materiell erfolgreich sein.</strong> Beides geht zusammen. Ich verstehe beide Welten — das Strukturierte und das Intuitive — und bringe sie für dich zusammen.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="flex flex-col items-center gap-4 mt-20 md:mt-24 opacity-90">
               <div className="w-[2px] h-16 md:h-24 bg-gradient-to-b from-refined-gold to-transparent"></div>
               <span className="font-mono text-[10px] md:text-xs text-refined-gold tracking-[0.3em] uppercase font-bold drop-shadow-sm">Der Weg</span>
            </ScrollReveal>
        </div>
      </section>

      {/* 
        NO THE EDITORIAL CONTINUOUS TIMELINE
      */}
      <VerticalTimeline />

      {/* 
        PHASE 8: TRIO SHOWCASE
      */}
      <TrioShowcase />


      {/* 
        PERSONAL VISION MESSAGE
      */}
      <VisionMessage />


      {/* 
        CLOSING CTA SECTION
      */}
      <section className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-pure-surface border-t border-whisper-border relative z-30 overflow-hidden">
        
        <div className="max-w-[900px] mx-auto text-center flex flex-col items-center relative z-10 mt-10">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(2.5rem,7vw,6.5rem)] leading-[1.0] tracking-[-0.02em] text-deep-charcoal mb-8">
              Dein Fundament<br/>
              <span className="italic text-refined-gold">für die Zusammenarbeit.</span>
            </h2>
            <p className="text-deep-charcoal/70 text-xl md:text-3xl font-light mb-16 leading-[1.6] max-w-3xl mx-auto">
              Wenn du bereit bist, die professionelle Konzernweltstrategie und tiefen Spirit zu vereinen, dann lass uns dein Fundament gießen.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-col items-center gap-6">
              <Link 
                href="https://tidycal.com/sabala" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-refined-gold hover:bg-deep-charcoal hover:text-white text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.98] shadow-[0_15px_40px_rgba(184,150,62,0.3)] text-sm md:text-base hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              >
                Erstgespräch vereinbaren
              </Link>
              
              <div className="mt-24 w-full flex justify-center opacity-80 mix-blend-multiply">
                 <Image src="/images/logo-sabala-mentoring.png" alt="Sabala Mentoring Logo" width={240} height={100} className="w-auto h-16 md:h-20 object-contain drop-shadow-sm" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
