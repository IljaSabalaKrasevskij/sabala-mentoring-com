import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenzen & Ergebnisse | Sabala Mentoring",
  description: "Wahre Tiefe zeigt sich in echten Ergebnissen. Einblicke in unsere Premium-Partner Projekte.",
};

export default function ReferenzenPage() {
  return (
    <div className="flex flex-col w-full min-h-[100dvh] bg-warm-canvas text-deep-charcoal selection:bg-refined-gold selection:text-white">
      
      {/* SECTION 1: HERO (Asymmetrical / Editorial Split) */}
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-32 px-6 sm:px-12 md:px-24 rounded-b-[3rem] bg-pure-surface shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gold-glow blur-[100px] opacity-10 rounded-full mix-blend-multiply pointer-events-none -translate-y-1/2 translate-x-1/4"></div>

        <div className="max-w-[1400px] mx-auto flex flex-col items-start gap-12 relative z-10">
          <ScrollReveal>
             <div className="inline-block px-5 py-2 rounded-full border border-whisper-border bg-black/[0.02] mb-6">
                <span className="font-geist text-[0.65rem] md:text-sm tracking-[0.2em] uppercase text-warm-steel font-medium">Beweise, die für sich sprechen</span>
             </div>
          </ScrollReveal>
          
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end">
            <ScrollReveal delay={0.1} className="lg:col-span-8">
              <h1 className="font-instrument text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.95] tracking-tight">
                Die Essenz,<br />
                <span className="text-warm-steel italic">sichtbar</span> gemacht.
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="lg:col-span-4 lg:pb-4">
              <p className="font-satoshi text-warm-steel text-lg leading-[1.65] border-l border-refined-gold/30 pl-6 border-solid">
                Einblicke in Transformationen, die wir begleiten durften. Jedes Projekt ist das Ergebnis eines tiefen Eintauchens in die Werte unserer Klienten.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROJEKTE BENTO GRID (Double-Bezel Architecture) */}
      <section className="py-24 md:py-40 px-4 sm:px-8 md:px-16 max-w-[1500px] mx-auto w-full z-0 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-auto gap-6 md:gap-8">

          {/* PROJECT PRIMARY - Col-Span 8 */}
          <ScrollReveal delay={0.1} className="md:col-span-8 group">
            {/* Outer Shell Wrapper (Double Bezel) */}
            <div className="p-3 md:p-4 rounded-[2.5rem] bg-black/[0.02] border border-whisper-border shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] w-full relative h-[550px] md:h-[700px] overflow-hidden transform-gpu hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2">
               {/* Inner Core */}
               <div className="relative w-full h-full rounded-[calc(2.5rem-1rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] bg-pure-surface">
                  <Image 
                    src="https://picsum.photos/seed/ref1/1200/900" 
                    alt="Premium Portfolio The Conscious Leader"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  {/* Glassmorphism Inner Card Element */}
                  <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 bg-white/70 backdrop-blur-3xl border border-white/50 p-8 rounded-3xl flex flex-col md:flex-row gap-6 justify-between items-end">
                    <div>
                      <p className="font-geist text-xs uppercase tracking-[0.2em] text-warm-steel mb-3">Re-Branding & Webarchitektur</p>
                      <h3 className="font-instrument text-4xl text-deep-charcoal leading-none">The Conscious Leader</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-warm-steel/20 flex items-center justify-center text-deep-charcoal group-hover:bg-refined-gold group-hover:text-white transition-colors duration-500 group-hover:border-transparent">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                  </div>
               </div>
            </div>
          </ScrollReveal>

          {/* PROJECT SECONDARY 1 - Col-Span 4 */}
          <ScrollReveal delay={0.2} className="md:col-span-4 group">
            <div className="p-3 md:p-4 rounded-[2.5rem] bg-black/[0.02] border border-whisper-border shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] w-full relative h-[550px] md:h-[700px] overflow-hidden transform-gpu hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2">
               <div className="relative w-full h-full rounded-[calc(2.5rem-1rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] bg-pure-surface">
                  <Image 
                    src="https://picsum.photos/seed/ref2/800/1200" 
                    alt="Studio Minimal Identity"
                    fill
                    className="object-cover object-center opacity-90 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-charcoal/80"></div>
                  <div className="absolute bottom-6 left-6 right-6 p-4">
                    <p className="font-geist text-xs uppercase tracking-[0.2em] text-pure-surface/70 mb-2">Visual Identity</p>
                    <h3 className="font-instrument text-3xl text-pure-surface">Studio Minimal</h3>
                  </div>
               </div>
            </div>
          </ScrollReveal>

          {/* PROJECT SECONDARY 2 - Col-Span 4 */}
          <ScrollReveal delay={0.1} className="md:col-span-4 group">
             <div className="p-3 md:p-4 rounded-[2.5rem] bg-black/[0.02] border border-whisper-border shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] w-full relative h-[450px] overflow-hidden transform-gpu hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2">
                 <div className="relative w-full h-full rounded-[calc(2.5rem-1rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] bg-pure-surface flex items-center justify-center bg-[#E5E0D8]">
                   <span className="font-instrument text-[#84817C] text-2xl italic tracking-tight opacity-50">Kommendes Projekt</span>
                 </div>
             </div>
          </ScrollReveal>

           {/* PROJECT TERTIARY - Col-Span 8 */}
          <ScrollReveal delay={0.2} className="md:col-span-8 group">
            <div className="p-3 md:p-4 rounded-[2.5rem] bg-black/[0.02] border border-whisper-border shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] w-full relative h-[450px] overflow-hidden transform-gpu hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2">
               <div className="relative w-full h-full rounded-[calc(2.5rem-1rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] bg-pure-surface">
                  <Image 
                    src="https://picsum.photos/seed/ref4/1200/800" 
                    alt="Atem & Raum"
                    fill
                    className="object-cover object-top opacity-90 group-hover:scale-105 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  {/* Floating Action Badge */}
                  <div className="absolute top-6 right-6">
                     <span className="bg-night-foundation text-pure-surface text-xs font-mono tracking-widest uppercase px-4 py-2 rounded-full border border-white/10">Full Service</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 bg-white/70 backdrop-blur-2xl border border-white/50 p-6 flex flex-col md:flex-row gap-6 justify-between items-center rounded-3xl">
                    <h3 className="font-instrument text-3xl text-deep-charcoal">Atem & Raum</h3>
                  </div>
               </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: DEEP TESTIMONIALS (Z-Axis Cascade Effect approach but structurally sound) */}
      <section className="py-24 md:py-40 px-6 sm:px-12 md:px-24 bg-[#141414] text-pure-surface relative overflow-hidden rounded-t-[3rem]">
        {/* Subtle noise texturing using SVG inline filter */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        <div className="max-w-[1200px] mx-auto z-10 relative">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] text-center mb-24 max-w-[800px] mx-auto text-pure-surface/90">
              „Sabala öffnet Türen zu <span className="italic text-refined-gold">dir selbst</span>.“
            </h2>
          </ScrollReveal>

          <div className="flex flex-col gap-12 md:gap-24 relative">
             {/* Testimonial 1 */}
             <ScrollReveal delay={0.1}>
               <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                  <div className="w-full md:w-1/3 flex flex-col pt-4 border-t border-white/10 shrink-0">
                     <p className="font-satoshi text-lg text-pure-surface mb-1">Nadja Kirchner</p>
                     <p className="font-geist text-sm text-warm-steel/70 uppercase tracking-widest mb-6">Unternehmerin</p>
                     <div className="relative w-24 h-24 rounded-full overflow-hidden grayscale">
                        <Image src="https://picsum.photos/seed/nadja_port/200/200" fill alt="Nadja Kirchner" className="object-cover" />
                     </div>
                  </div>
                  <div className="w-full md:w-2/3 md:pt-4">
                     <p className="font-instrument text-2xl md:text-4xl leading-[1.3] text-pure-surface/90">
                        „Ilja hat mich in 6 Sessions begleitet. In der Zusammenarbeit ist ein tolles Format entstanden, mit welchem ich bereits Umsatz generiere. Die Zusammenarbeit war unheimlich angenehm, durch Iljas wertschätzende, kreative, erdende und authentische Art.“
                     </p>
                  </div>
               </div>
             </ScrollReveal>

             {/* Testimonial 2 */}
             <ScrollReveal delay={0.2}>
               <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                  <div className="w-full md:w-1/3 flex flex-col pt-4 border-t border-white/10 shrink-0">
                     <p className="font-satoshi text-lg text-pure-surface mb-1">Philipp Siebler</p>
                     <p className="font-geist text-sm text-warm-steel/70 uppercase tracking-widest mb-6">Conversion Films</p>
                     <div className="relative w-24 h-24 rounded-full overflow-hidden grayscale">
                        <Image src="https://picsum.photos/seed/philipp_port/200/200" fill alt="Philipp Siebler" className="object-cover" />
                     </div>
                  </div>
                  <div className="w-full md:w-2/3 md:pt-4">
                     <p className="font-instrument text-2xl md:text-4xl leading-[1.3] text-pure-surface/90">
                        „Was man in kurzer Zeit über sich und seine Psyche lernt und verbessern kann, ist wirklich beeindruckend. Und das ganze mühelos! Was Sabala anbietet sollte JEDER in Erwägung ziehen, der zur heutigen Zeit selbstständig ist.“
                     </p>
                  </div>
               </div>
             </ScrollReveal>
             
             {/* Testimonial 3 */}
             <ScrollReveal delay={0.3}>
               <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                  <div className="w-full md:w-1/3 flex flex-col pt-4 border-t border-white/10 shrink-0">
                     <p className="font-satoshi text-lg text-pure-surface mb-1">Silke Ettrich</p>
                     <p className="font-geist text-sm text-warm-steel/70 uppercase tracking-widest mb-6">Bewusstseinsmentorin</p>
                     <div className="relative w-24 h-24 rounded-full overflow-hidden grayscale">
                        <Image src="https://picsum.photos/seed/silke_port/200/200" fill alt="Silke Ettrich" className="object-cover" />
                     </div>
                  </div>
                  <div className="w-full md:w-2/3 md:pt-4">
                     <p className="font-instrument text-2xl md:text-4xl leading-[1.3] text-pure-surface/90">
                        „Sabalas wundervolle Fähigkeit, einen vertrauensvollen Raum zu eröffnen, ermöglicht es jedem Menschen, sich der eigenen Realität zu stellen und für die eigene Wahrheit zu öffnen.“
                     </p>
                  </div>
               </div>
             </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: CTA */}
      <section className="py-24 md:py-40 bg-pure-surface relative overflow-hidden flex justify-center items-center rounded-t-[3rem] -mt-10 z-20">
         <div className="max-w-[800px] mx-auto text-center px-6">
            <ScrollReveal>
               <h2 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] text-deep-charcoal leading-[1.05] mb-8">
                  Dein eigener Auftritt soll in diese Galerie?
               </h2>
               <div className="flex justify-center group/btn relative inline-flex">
                 {/* Double-Bezel Button / Island Button */}
                 <div className="p-1 rounded-full border border-whisper-border bg-black/[0.02] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.05)] transition-transform duration-[600ms] group-active/btn:scale-[0.98] ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/[0.04]">
                   <Link 
                     href="https://tidycal.com/sabala" 
                     className="bg-refined-gold flex items-center pr-2 pl-8 py-2 rounded-full gap-4 text-white font-satoshi font-medium"
                   >
                     Kennenlerngespräch buchen
                     <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] transition-transform duration-[400ms] ease-out">
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
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
