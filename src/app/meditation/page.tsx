import Image from "next/image";
import Link from "next/link";
import { SlowWordReveal } from "@/components/ui/SlowWordReveal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Führung von Innen | Sabala Mentoring",
  description: "Ein stiller Raum für persönliche und unternehmerische Tiefe.",
};

export default function MeditationPage() {
  return (
    <div className="flex flex-col w-full bg-[#050505] text-pure-surface selection:bg-[#B8963E] selection:text-[#050505]">
      
      {/* Global Grain Texture for physical intimacy */}
      <div 
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.025] mix-blend-screen"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      {/* Global Breathe Animation Keyframes */}
      <style>{`
        @keyframes meditate-breathe {
          0% { transform: scale(1.0); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1.0); }
        }
        .animate-breathe {
          animation: meditate-breathe 12s ease-in-out infinite;
        }
      `}</style>

      {/* 1. HERO - DUNKEL */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Image: Deep dark cinematic grading + breathe animation */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <div className="w-full h-full animate-breathe opacity-20 md:opacity-30 mix-blend-luminosity">
            <Image 
              src="/Bilder Sabala/IMG_7294.jpeg" 
              alt="Ilja Reflexion" 
              fill 
              className="object-cover grayscale"
              priority
            />
          </div>
          {/* Heavy vignettes cutting off edges perfectly into #050505 */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#050505_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 text-center">
          <SlowWordReveal 
            text="Führung von Innen." 
            className="font-instrument text-[clamp(4.5rem,10vw,8.5rem)] text-[#EAE5D9] leading-tight" 
          />
        </div>
      </section>

      {/* 2. DIE EINLADUNG - HELL */}
      <section className="bg-warm-canvas text-deep-charcoal relative z-10">
        <div className="min-h-[100dvh] flex items-center justify-center py-40 md:py-64 px-6 md:px-12">
          <div className="max-w-[700px] mx-auto text-left md:text-center">
            <ScrollReveal margin="0px 0px -30% 0px" duration={1.5}>
              <p className="font-satoshi text-2xl md:text-[2rem] leading-[1.8] text-warm-steel/90 font-light">
                Könntest eigentlich ganz zufrieden sein, aber spürst, dass da mehr ist? 
                Eine Sehnsucht nach <span className="font-medium text-deep-charcoal">Tiefe</span>.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4} margin="0px 0px -30% 0px" duration={1.5} className="mt-12 md:mt-16">
              <p className="font-satoshi text-2xl md:text-[2rem] leading-[1.8] text-warm-steel/90 font-light">
                Es geht nicht um den nächsten Meilenstein im Außen. Es geht um den Zugang zu deiner 
                verborgenen Intuition — einer stimmigen, <span className="font-medium text-deep-charcoal">stillen Führung in dir</span>.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. FÜR WEN - DUNKEL */}
      <section className="bg-[#050505] text-[#EAE5D9] relative z-10">
        <div className="min-h-[100dvh] flex items-center justify-center py-40 md:py-64 px-6 md:px-12">
          <div className="max-w-[800px] mx-auto">
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24">
              <ScrollReveal margin="0px 0px -40% 0px" duration={1.5}>
                <div className="w-[1px] h-24 bg-refined-gold/30 mb-8 hidden md:block" />
                <h2 className="font-instrument text-4xl md:text-5xl text-refined-gold/80 italic">Du leidest.</h2>
              </ScrollReveal>
              
              <div>
                <ScrollReveal delay={0.2} margin="0px 0px -40% 0px" duration={1.5}>
                  <p className="font-satoshi text-[1.4rem] md:text-[1.75rem] leading-[1.8] text-warm-steel font-light mb-8">
                    Du entscheidest. Du trägst Verantwortung. <br className="hidden md:block"/>
                    Und manchmal fühlst du dich im <span className="text-[#EAE5D9]">Gedankenkarussell</span> gefangen.
                  </p>
                </ScrollReveal>
                
                <ScrollReveal delay={0.4} margin="0px 0px -40% 0px" duration={1.5}>
                  <p className="font-satoshi text-[1.4rem] md:text-[1.75rem] leading-[1.8] text-warm-steel font-light">
                    Wir kennen den Druck. Dies hier ist kein Programm und kein Konstrukt. 
                    Hier ist der Raum, die <span className="text-[#EAE5D9]">feine Stimme in dir</span> wieder zu Wort kommen zu lassen.
                  </p>
                </ScrollReveal>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WIE ES FUNKTIONIERT - HELL */}
      <section className="bg-warm-canvas text-deep-charcoal relative z-10">
        <div className="min-h-[100dvh] flex items-center justify-center py-40 md:py-64 px-6 md:px-12">
          <div className="max-w-[700px] mx-auto text-center">
            
            <ScrollReveal margin="0px 0px -30% 0px" duration={1.5} yOffset={60}>
              <h3 className="font-instrument text-4xl md:text-5xl mb-16">Der Begleiter</h3>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} margin="0px 0px -30% 0px" duration={1.5}>
              <div className="space-y-6 font-satoshi text-xl md:text-[1.5rem] leading-[1.8] text-warm-steel/90 font-light">
                <p>Als Freigeist und Mentor begleite ich dich 1:1.</p>
                <p>Mindestens <span className="font-medium text-deep-charcoal">5 Sessions.</span></p>
                <p>Online oder vor Ort.</p>
                <p className="pt-8">Kein festes Curriculum. Es geht um radikale Ehrlichkeit und das Aufräumen im Inneren.</p>
                <p className="text-deep-charcoal italic font-instrument text-3xl md:text-4xl mt-12 !leading-relaxed">
                  Der Rest entsteht <br className="hidden md:block"/> zwischen uns.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 5. CTA FINALE - DUNKEL */}
      <section className="bg-[#050505] text-[#EAE5D9] relative z-10 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Subtle Bottom Glow / Horizon */}
        <div className="absolute bottom-0 w-[1000px] h-[400px] bg-refined-gold/5 blur-[150px] rounded-[100%] pointer-events-none translate-y-1/2" />
        
        <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center py-40 md:py-64 px-6">
          <div className="max-w-[800px] mx-auto text-center relative z-10">
            
            <ScrollReveal margin="0px 0px -30% 0px" duration={2}>
              <h2 className="font-instrument text-[clamp(2.5rem,6vw,4.5rem)] leading-tight mb-16">
                Bist du bereit, dieser <br className="hidden md:block"/>
                <span className="italic text-refined-gold/80">leisen Stimme</span> <br className="hidden md:block"/>
                in dir Raum zu geben?
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3} margin="0px 0px -30% 0px" duration={1.5}>
              <div className="flex justify-center group relative mt-12">
                <Link 
                  href="mailto:anfrage@sabala.de" 
                  className="relative overflow-hidden border border-white/10 bg-white/[0.02] text-white/80 hover:text-white px-12 py-5 rounded-full font-satoshi text-sm uppercase tracking-widest transition-all duration-700 ease-out hover:bg-white/[0.05]"
                >
                  <span className="relative z-10">Lass uns sprechen</span>
                  {/* Internal button glow strictly following hover state */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
             
          </div>
        </div>
      </section>

    </div>
  );
}
