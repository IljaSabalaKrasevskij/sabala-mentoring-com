import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { DissolveParticleHero } from "@/components/ui/DissolveParticleHero";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-clip">
      
      {/* SECTION 1.1: DISSOLVE HERO (SCROLL DRIVEN) */}
      <DissolveParticleHero />

      {/* SECTION 1.2: TRUST-LEISTE (MARQUEE) */}
      <section className="bg-[#F0EDE8] border-y border-[rgba(181,176,168,0.3)] relative z-0 -mt-[40px] pt-[calc(1.5rem+40px)] pb-6 overflow-hidden">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}} />
        <div className="max-w-[1400px] mx-auto flex flex-col items-center">
          <p className="font-satoshi text-[#6B6963] text-[0.75rem] uppercase tracking-[0.15em] mb-5 text-center">
            Vertraut von Coaches, Beratern und Trainern
          </p>
          
          <div className="w-full relative flex overflow-hidden group">
            {/* Fade/Gradient Masks for scrolling area edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#F0EDE8] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#F0EDE8] to-transparent z-10 pointer-events-none"></div>
            
            {/* The scrolling track */}
            <div className="flex gap-12 items-center w-max animate-marquee group-hover:[animation-play-state:paused]">
              
              {/* Duplicate the array 4 times to ensure seamless infinite loop when moving by 50% */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-12 items-center whitespace-nowrap opacity-70 group-hover:opacity-90 transition-opacity duration-300">
                  <span className="font-geist text-[0.9rem] text-[#B5B0A8]">Stefan Pons</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8963E]"></span>
                  
                  <span className="font-geist text-[0.9rem] text-[#B5B0A8]">Nadja Kirchner</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8963E]"></span>
                  
                  <span className="font-geist text-[0.9rem] text-[#B5B0A8]">Silke Ettrich</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8963E]"></span>
                  
                  <span className="font-geist text-[0.9rem] text-[#B5B0A8]">Philipp Siebler</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8963E]"></span>
                  
                  <span className="font-geist text-[0.9rem] text-[#B5B0A8]">Conversion Films</span>
                  {/* Final separator of this loop block */}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8963E]"></span>
                </div>
              ))}
              
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.3: PROBLEM-ERKENNUNG */}
      <section className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-night-foundation text-night-text">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] tracking-[-0.02em] text-night-text">
              Du hast investiert.<br/>
              <span className="text-night-secondary">Aber es fühlt sich nicht stimmig an.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="relative">
            {/* Dekoratives Anführungszeichen */}
            <span className="absolute -top-10 -left-6 md:-left-8 font-instrument text-[#B8963E] text-[5rem] opacity-35 leading-none select-none pointer-events-none">
              &ldquo;
            </span>
            <p className="text-night-secondary text-[1.125rem] leading-[1.65] max-w-[65ch] relative z-10">
              Du hast Geld für eine Website ausgegeben. Vielleicht für eine Agentur, einen Kurs, ein Coaching. Und trotzdem passt dein Außenauftritt nicht zu dem, was du wirklich anbietest. Die Website sieht aus wie tausend andere. Die Texte klingen nicht nach dir. Und neue Kunden kommen nicht, weil niemand versteht, was dich besonders macht.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 1.3B: ZITAT ZWISCHENKOMPONENT */}
      <section className="bg-warm-canvas py-20 md:py-32">
        <div className="w-full flex flex-col md:flex-row-reverse items-center justify-between">
          {/* Image */}
          <div className="w-full md:w-[45%] relative h-[60vh] md:h-[70vh]">
            <Image 
              src="/images/zitat-sabala-home.jpg"
              alt="Ilja Sabala Krasevskij"
              fill
              className="object-cover object-center"
            />
            {/* Fade left into Warm Canvas on Desktop */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-warm-canvas via-[#FAF8F5]/40 to-[#FAF8F5]/0 w-[101%] -translate-x-[1px] pointer-events-none"></div>
            {/* Fade down into Warm Canvas on Mobile */}
            <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/0 via-[#FAF8F5]/40 to-warm-canvas h-[101%] pointer-events-none"></div>
          </div>
          
          {/* Text */}
          <div className="w-full md:w-[55%] px-6 sm:px-12 md:pr-16 md:pl-24 lg:pl-32 max-w-[800px] mt-12 md:mt-0">
            <ScrollReveal className="relative">
              <span className="absolute -top-10 -left-6 md:-left-10 font-instrument text-[#B8963E] text-[4rem] opacity-30 leading-none select-none pointer-events-none">
                &ldquo;
              </span>
              <p className="font-instrument text-[1.5rem] leading-[1.4] text-deep-charcoal relative z-10 mb-6">
                Ich öffne Türen — und begleite Menschen hindurch. Umsetzung ist Pflicht. Aber der Weg darf sich richtig anfühlen.
              </p>
              <p className="font-satoshi text-warm-steel text-[0.9rem]">
                — Ilja Sabala Krasevskij
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 1.4A: ANGEBOT INTRO (VIDEO BACKGROUND) */}
      <section id="angebot" className="relative w-full min-h-[60vh] py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-night-foundation flex flex-col items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-20 z-0 pointer-events-none"
        >
          <source src="/videos/liquid-gold.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay (#1A1A18 at 0.7 opacity) */}
        <div className="absolute inset-0 bg-[#1A1A18]/70 z-[1] pointer-events-none"></div>

        <div className="max-w-[1000px] mx-auto text-center relative z-10 flex flex-col items-center justify-center">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] text-night-text tracking-[-0.02em] mb-6">
              Alles aus einem Guss. Von der Essenz bis zur Erlebnis-Website.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-satoshi text-[#A09C95] text-[1.125rem] leading-[1.65] max-w-[65ch]">
              Kein Stückwerk. Kein Abliefern. Ein durchdachter Prozess, der bei dir beginnt — und in einer Website mündet, die dich wirklich zeigt.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 1.4B: ANGEBOT PROZESS-SCHRITTE (ZIG-ZAG MIT FUSSABDRÜCKEN) */}
      <section className="py-24 md:py-32 px-6 sm:px-12 md:px-24 bg-warm-canvas relative overflow-hidden">
        
        {/* Intro */}
        <div className="max-w-[1200px] mx-auto text-center mb-24 relative z-10">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,4rem)] text-deep-charcoal mb-4">So entsteht dein Premium-Auftritt.</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-satoshi text-warm-steel text-[1.125rem]">Drei Phasen. Ein klares Ziel: Dein neues Fundament.</p>
          </ScrollReveal>
        </div>

        <div className="max-w-[1200px] mx-auto relative pb-24">
          <div className="grid md:grid-cols-3 gap-8">
             {/* Phase 1 */}
             <ScrollReveal delay={0.1} className="p-8 border border-whisper-border rounded-2xl shadow-warm-shadow bg-pure-surface/50 h-full">
               <span className="font-geist text-soft-stone text-sm tracking-widest uppercase mb-4 block">Phase 01</span>
               <h3 className="font-instrument text-2xl text-deep-charcoal mb-3">Essenz & Positionierung</h3>
               <p className="font-satoshi text-warm-steel leading-relaxed">Wir betreiben kein Oberflächen-Marketing. Im tiefen Interview finden wir heraus, wofür du wirklich stehst, und übersetzen das in eine glasklare Positionierung.</p>
             </ScrollReveal>
             
             {/* Phase 2 */}
             <ScrollReveal delay={0.2} className="p-8 border border-whisper-border rounded-2xl shadow-warm-shadow bg-pure-surface/50 h-full">
               <span className="font-geist text-soft-stone text-sm tracking-widest uppercase mb-4 block">Phase 02</span>
               <h3 className="font-instrument text-2xl text-deep-charcoal mb-3">Brand Identity & Formgebung</h3>
               <p className="font-satoshi text-warm-steel leading-relaxed">Fleur entwickelt dein visuelles Zuhause. Von der Signatur-Farbe bis zur Typografie – alles wird präzise auf deine Persönlichkeit und Frequenz abgestimmt.</p>
             </ScrollReveal>
             
             {/* Phase 3 */}
             <ScrollReveal delay={0.3} className="p-8 border border-whisper-border rounded-2xl shadow-warm-shadow bg-pure-surface/50 h-full">
               <span className="font-geist text-soft-stone text-sm tracking-widest uppercase mb-4 block">Phase 03</span>
               <h3 className="font-instrument text-2xl text-deep-charcoal mb-3">Premium-Website & Launch</h3>
               <p className="font-satoshi text-warm-steel leading-relaxed">Deine voll animierte, performante Website geht live. Keine Templates, sondern ein digitales Erlebnis, das deine Zielgruppe intuitiv abholt und Vertrauen schafft.</p>
             </ScrollReveal>
          </div>
          
          <ScrollReveal delay={0.4} className="mt-20 text-center">
            <Link href="/premium-angebot" className="inline-flex items-center gap-2 group text-deep-charcoal font-medium font-satoshi text-lg hover:text-refined-gold transition-colors">
              Den detaillierten 7-Schritte-Fahrplan ansehen
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 1.5: TESTIMONIALS (BENT0-GRID) */}
      <section className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-night-foundation text-night-text border-y border-white/5">
        <div className="max-w-[1200px] mx-auto overflow-hidden">
          <ScrollReveal>
             <h2 className="font-instrument text-[clamp(2.5rem,5vw,3.5rem)] text-night-text mb-16 text-center leading-[1.1]">Wahre Tiefe zeigt sich in echten Ergebnissen.</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* Nadja - Große Box oben drüber */}
            <ScrollReveal delay={0.1} className="md:col-span-2">
              <div className="border border-white/10 p-10 md:p-14 rounded-[24px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors backdrop-blur-sm h-full flex flex-col justify-between group">
                <div>
                  <div className="text-refined-gold text-5xl md:text-7xl font-instrument mb-4 opacity-30">&quot;</div>
                  <p className="text-2xl md:text-3xl font-instrument leading-[1.4] mb-12 max-w-[850px]">
                    Ilja hat mich in 6 Sessions begleitet. In der Zusammenarbeit ist ein tolles Format entstanden, mit welchem ich bereits Umsatz generiere. Die Zusammenarbeit war unheimlich angenehm, durch Iljas wertschätzende, kreative, erdende und authentische Art.
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full hidden md:block bg-night-secondary/20 relative overflow-hidden">
                    <Image src="https://picsum.photos/seed/nadjia/100/100" fill alt="Nadja" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div>
                    <p className="font-satoshi font-medium text-pure-surface">Nadja Kirchner</p>
                    <p className="text-night-secondary text-[0.8rem] font-mono mt-1 uppercase tracking-widest">Unternehmerin</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Philipp - Box links */}
            <ScrollReveal delay={0.2} className="h-full">
              <div className="border border-white/10 p-10 rounded-[24px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors backdrop-blur-sm h-full flex flex-col justify-between group">
                <div>
                  <div className="text-refined-gold text-4xl md:text-5xl font-instrument mb-4 opacity-30">&quot;</div>
                  <p className="text-xl md:text-2xl font-instrument leading-[1.45] mb-12">
                    Was man in kurzer Zeit über sich und seine Psyche lernt und verbessern kann, ist wirklich beeindruckend. Und das ganze mühelos! Was Sabala anbietet sollte JEDER in Erwägung ziehen, der zur heutigen Zeit selbstständig ist.
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full hidden md:block bg-night-secondary/20 relative overflow-hidden">
                    <Image src="https://picsum.photos/seed/philipp/100/100" fill alt="Philipp" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div>
                    <p className="font-satoshi font-medium text-pure-surface">Philipp Siebler</p>
                    <p className="text-night-secondary text-[0.8rem] font-mono mt-1 uppercase tracking-widest">Conversion Films</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Silke - Box rechts */}
            <ScrollReveal delay={0.3} className="h-full">
              <div className="border border-white/10 p-10 rounded-[24px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors backdrop-blur-sm h-full flex flex-col justify-between group">
                <div>
                  <div className="text-refined-gold text-4xl md:text-5xl font-instrument mb-4 opacity-30">&quot;</div>
                  <p className="text-xl md:text-2xl font-instrument leading-[1.45] mb-12">
                    Sabalas wundervolle Fähigkeit, einen vertrauensvollen Raum zu eröffnen, ermöglicht es jedem Menschen, sich der eigenen Realität zu stellen und für die eigene Wahrheit zu öffnen.
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full hidden md:block bg-night-secondary/20 relative overflow-hidden">
                    <Image src="https://picsum.photos/seed/silke/100/100" fill alt="Silke" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div>
                    <p className="font-satoshi font-medium text-pure-surface">Silke Ettrich</p>
                    <p className="text-night-secondary text-[0.8rem] font-mono mt-1 uppercase tracking-widest">Bewusstseinsmentorin</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* SECTION 1.6: DAS TRIO */}
      <section className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-pure-surface">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,3.5rem)] text-deep-charcoal text-center mb-6 max-w-[800px] mx-auto leading-[1.1]">Ein Team. Drei Disziplinen. Keine Kompromisse.</h2>
            <p className="text-warm-steel text-center mb-24 max-w-[600px] mx-auto">Strategie, Design und Technik greifen bei uns nahtlos ineinander, um dein Business mit absoluter Klarheit und Kraft sichtbar zu machen.</p>
          </ScrollReveal>

          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start mt-12">
            
            {/* Christopher */}
            <ScrollReveal delay={0.1} className="group flex flex-col">
              <div className="relative aspect-[4/5] w-full mb-6 overflow-hidden rounded-[20px] shadow-warm-shadow border border-whisper-border group-hover:shadow-[0_20px_40px_rgba(184,150,62,0.15)] group-hover:border-refined-gold/30 transition-all duration-700 bg-night-foundation">
                {/* Crisp Golden Hover Filter */}
                <div className="absolute inset-0 bg-refined-gold mix-blend-overlay z-10 opacity-40 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-night-foundation mix-blend-multiply z-10 opacity-20 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                <Image src="/images/Das-Team-Christopher.jpg" alt="Christopher" fill className="object-cover object-[center_20%] grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                
                {/* Hover Text in Image */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 pointer-events-none flex items-end">
                  <p className="text-pure-surface font-satoshi text-sm md:text-base leading-snug">Gründer von Webseiten für Coaches & Meditationslehrer</p>
                </div>
              </div>
              <h3 className="font-instrument text-2xl lg:text-3xl text-deep-charcoal">Christopher</h3>
              <p className="font-mono text-xs lg:text-sm text-refined-gold tracking-wider uppercase my-3">Technik & Hosting</p>
              <p className="text-warm-steel leading-[1.65]">Christopher integriert deinen Auftritt technisch auf eigenen Hochleistungs-Servern. Mit Premium-Hosting, laufender Pflege, Updates und System-Wartung sorgt er dafür, dass du dich langfristig um nichts mehr kümmern musst.</p>
            </ScrollReveal>

            {/* Fleur */}
            <ScrollReveal delay={0.2} className="group flex flex-col">
              <div className="relative aspect-[4/5] w-full mb-6 overflow-hidden rounded-[20px] shadow-warm-shadow border border-whisper-border group-hover:shadow-[0_20px_40px_rgba(184,150,62,0.15)] group-hover:border-refined-gold/30 transition-all duration-700 bg-night-foundation">
                {/* Crisp Golden Hover Filter */}
                <div className="absolute inset-0 bg-refined-gold mix-blend-overlay z-10 opacity-40 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-night-foundation mix-blend-multiply z-10 opacity-20 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                <Image src="/images/Das-Team-Fleur.png" alt="Fleur" fill className="object-cover object-[center_20%] grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                
                {/* Hover Text in Image */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 pointer-events-none flex items-end">
                  <p className="text-pure-surface font-satoshi text-sm md:text-base leading-snug">Gründerin von Golden Grid</p>
                </div>
              </div>
              <h3 className="font-instrument text-2xl lg:text-3xl text-deep-charcoal">Fleur</h3>
              <p className="font-mono text-xs lg:text-sm text-refined-gold tracking-wider uppercase my-3">Brand Design</p>
              <p className="text-warm-steel leading-[1.65]">Fleur sieht Menschen in Farben. Sie übersetzt dein Wesen in ein 100% individuelles Farbkonzept, einen starken Brandguide und eine eigene Designsprache, die deine Zielgruppe anspricht. Von Typografie über Logo bis hin zu fertigen Social-Media-Templates und klar strukturierten Webdesign-Vorlagen.</p>
            </ScrollReveal>

            {/* Sabala */}
            <ScrollReveal delay={0.3} className="group flex flex-col">
              <div className="relative aspect-[4/5] w-full mb-6 overflow-hidden rounded-[20px] shadow-warm-shadow border border-whisper-border group-hover:shadow-[0_20px_40px_rgba(184,150,62,0.15)] group-hover:border-refined-gold/30 transition-all duration-700 bg-night-foundation">
                {/* Crisp Golden Hover Filter */}
                <div className="absolute inset-0 bg-refined-gold mix-blend-overlay z-10 opacity-40 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-night-foundation mix-blend-multiply z-10 opacity-20 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                <Image src="/images/Das-Team-Sabala-2.png" alt="Sabala" fill className="object-cover object-[center_20%] grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                
                {/* Hover Text in Image */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 pointer-events-none flex items-end">
                  <p className="text-pure-surface font-satoshi text-sm md:text-base leading-snug">Gründer von Sabala Mentoring & Connecting Herzkreative</p>
                </div>
              </div>
              <h3 className="font-instrument text-2xl lg:text-3xl text-deep-charcoal">Sabala</h3>
              <p className="font-mono text-xs lg:text-sm text-refined-gold tracking-wider uppercase my-3">Essenz, Strategie & Code</p>
              <p className="text-warm-steel leading-[1.65]">Von der Essenz über die Positionierung und Angebotsstruktur bis zur strategischen Customer Journey. Mit Profi-Tools und individuellem Code setze ich unsere Vision grenzenlos und maßgeschneidert als funktionales Erlebnis um.</p>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* SECTION 1.7: REFERENZ-VORSCHAU */}
      <section id="referenzen" className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-warm-canvas">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <h2 className="font-instrument text-[clamp(2.5rem,5vw,4rem)] text-deep-charcoal">Arbeiten, die für sich sprechen.</h2>
              <Link href="/referenzen" className="font-mono text-sm text-warm-steel hover:text-refined-gold uppercase tracking-widest transition-colors mb-2">Alle Referenzen ansehen →</Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
            {/* Primary Project */}
            <ScrollReveal delay={0.1} className="md:col-span-2 lg:col-span-2 row-span-2 group relative overflow-hidden rounded-[24px] bg-pure-surface border border-whisper-border shadow-warm-shadow p-8 flex flex-col justify-end">
              <div className="absolute inset-0 z-0">
                <Image src="https://picsum.photos/seed/ref1/1200/800" alt="Projekt Eins" fill className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/80 to-transparent"></div>
              </div>
              <div className="relative z-10 text-pure-surface translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-mono text-sm tracking-wider uppercase mb-3 opacity-90">Premium Website & Branding</p>
                <h3 className="font-instrument text-4xl mb-4">The Conscious Leader</h3>
                <p className="text-pure-surface/80 max-w-md hidden md:block">Vollständiger Rebrand und Website-Neugestaltung für eine Executive Leadership Coachin in Zürich.</p>
              </div>
            </ScrollReveal>

            {/* Secondary Project 1 */}
            <ScrollReveal delay={0.2} className="group relative overflow-hidden rounded-[24px] bg-pure-surface border border-whisper-border shadow-warm-shadow p-8 flex flex-col justify-end">
              <div className="absolute inset-0 z-0">
                <Image src="https://picsum.photos/seed/ref2/600/600" alt="Projekt Zwei" fill className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/80 to-transparent"></div>
              </div>
              <div className="relative z-10 text-pure-surface translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-mono text-sm tracking-wider uppercase mb-2 opacity-90">Brand Identity</p>
                <h3 className="font-instrument text-2xl">Studio Minimal</h3>
              </div>
            </ScrollReveal>

            {/* Secondary Project 2 */}
            <ScrollReveal delay={0.3} className="group relative overflow-hidden rounded-[24px] bg-pure-surface border border-whisper-border shadow-warm-shadow p-8 flex flex-col justify-end">
              <div className="absolute inset-0 z-0">
                <Image src="https://picsum.photos/seed/ref3/600/600" alt="Projekt Drei" fill className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/80 to-transparent"></div>
              </div>
              <div className="relative z-10 text-pure-surface translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-mono text-sm tracking-wider uppercase mb-2 opacity-90">Webdesign</p>
                <h3 className="font-instrument text-2xl">Atem & Raum</h3>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 1.8: ABSCHLUSS-CTA */}
      <section id="kontakt" className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-pure-surface rounded-t-[40px] shadow-[0_-40px_60px_rgba(26,26,24,0.02)] relative z-10">
        <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] tracking-[-0.02em] text-deep-charcoal mb-8 max-w-[800px] mx-auto">
              Entdecke das exklusive Premium-Angebot.
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="text-warm-steel text-xl leading-[1.65] max-w-[55ch] mb-12">
              Ein vollumfängliches Paket für deinen transformativen Auftritt. Keine Standard-Templates, sondern tiefgreifende Markenstrategie und High-End Design.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col items-center gap-6 group">
              <div className="p-1 rounded-full border border-whisper-border bg-black/[0.02] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.05)] transition-transform duration-[600ms] group-active:scale-[0.98] ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/[0.04]">
                <Link 
                  href="/premium-angebot" 
                  className="bg-refined-gold flex items-center px-8 py-4 rounded-full gap-4 text-white font-satoshi font-medium text-xl"
                >
                  Zum Premium-Angebot
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transform group-hover:translate-x-2 transition-transform duration-[400ms] ease-out">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
