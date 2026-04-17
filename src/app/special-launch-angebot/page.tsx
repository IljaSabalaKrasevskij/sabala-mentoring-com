import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function PresentationPage() {
  return (
    <div className="flex flex-col w-full overflow-x-clip bg-warm-canvas min-h-screen font-satoshi text-deep-charcoal">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); text-shadow: 0 10px 20px rgba(201,168,76,0.1); }
          50% { transform: translateY(-10px); text-shadow: 0 25px 30px rgba(201,168,76,0.25); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
      `}</style>
      
      {/* SECTION 1: Cover / Hook (Hero) */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6 sm:px-12 md:px-24 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-gold-glow rounded-bl-full opacity-40 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-whisper-border rounded-tr-full opacity-30 blur-3xl pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
          
          <div className="order-2 lg:order-1 flex flex-col items-start text-center lg:text-left">
            <ScrollReveal>
              <div className="mb-6 inline-block bg-refined-gold/10 text-refined-gold px-5 py-2 rounded-full text-sm font-bold tracking-widest uppercase shadow-sm border border-refined-gold/30 mx-auto lg:mx-0">
                Special Launch Angebot
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h1 className="font-instrument text-[clamp(4.5rem,8vw,7rem)] leading-[1.05] tracking-tight mb-8">
                Premium <br className="hidden lg:block"/>
                <span className="italic text-refined-gold text-[clamp(5rem,9vw,8rem)] inline-block animate-float">One Pager</span> <br className="hidden lg:block"/>
                Paket.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-warm-steel text-xl md:text-2xl leading-relaxed max-w-xl mb-10 mx-auto lg:mx-0">
                Dein digitaler Premium-Auftritt. Ein auf dich zugeschnittenes Fundament aus Branding, strategischer Klarheit und verkaufsstarkem Design.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="p-6 bg-pure-surface border border-whisper-border shadow-warm-shadow rounded-2xl max-w-sm mx-auto lg:mx-0">
                <p className="text-sm text-warm-steel mb-2 uppercase tracking-widest font-bold">Limitierte Auflage</p>
                <p className="font-medium text-xl text-deep-charcoal">
                  Special Launch (First 7)
                </p>
              </div>
            </ScrollReveal>
          </div>
          
          <div className="order-1 lg:order-2 flex flex-col items-center justify-center relative w-full h-[50vh] lg:h-[70vh] min-h-[400px]">
            <ScrollReveal delay={0.2} className="relative w-full h-full max-w-[500px] max-h-[500px] lg:max-w-[700px] lg:max-h-[700px] flex items-center justify-center">
              {/* Image Container with Glow & Outline */}
              <div className="relative w-[80%] h-[80%] lg:w-full lg:h-full rounded-full border-8 border-white shadow-[0_40px_80px_rgba(184,150,62,0.2)] overflow-hidden group">
                 <div className="absolute inset-0 bg-gold-glow/20 mix-blend-overlay z-10 pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100"></div>
                 <Image 
                  src="/Bilder Sabala/16 - 74_CH_Sehnde_.jpg" 
                  alt="Ilja Sabala"
                  fill
                  className="object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-1000"
                  priority
                />
              </div>
              
              <div className="absolute -bottom-4 lg:-bottom-8 left-1/2 -translate-x-1/2 text-center bg-white/80 backdrop-blur-md px-8 py-3 rounded-full border border-whisper-border shadow-lg w-max z-20">
                  <p className="font-instrument text-xl md:text-2xl text-refined-gold mb-1">Ilja Sabala Krasevskij</p>
                  <p className="text-deep-charcoal font-satoshi uppercase tracking-widest text-xs font-bold">Der meditierende Business Architekt</p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center animate-glow-pulse pointer-events-none z-20">
           <p className="text-warm-steel text-[10px] md:text-xs uppercase tracking-[0.2em]">Entdecken</p>
           <svg className="w-5 h-5 md:w-6 md:h-6 text-refined-gold mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
           </svg>
        </div>
      </section>

      {/* SECTION 2: Problem Awareness */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 md:px-24 relative bg-night-foundation text-night-text border-y border-white/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
            
            <ScrollReveal delay={0.1} className="order-2 lg:order-1 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[550px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl mb-8">
                <Image 
                  src="/Bilder Sabala/10 - _MXS8210.jpg"
                  alt="Sabala Focus"
                  fill
                  className="object-cover object-top scale-105 hover:scale-100 transition-transform duration-[2000ms]" 
                />
              </div>
              <div className="w-full max-w-[550px] bg-white backdrop-blur-md border border-whisper-border p-8 md:p-10 rounded-3xl shadow-xl relative mt-4">
                 <div className="absolute -top-6 -left-2 md:-left-4 text-refined-gold/30 text-7xl md:text-8xl font-instrument leading-none">"</div>
                  <p className="font-instrument text-xl md:text-2xl leading-[1.4] text-deep-charcoal relative z-10 mt-2">
                     Wenn dein Außenauftritt nicht widerspiegelt, was du innerlich zu geben hast, verlierst du genau die Kunden, denen du am besten helfen könntest.
                  </p>
              </div>
            </ScrollReveal>

            <div className="order-1 lg:order-2">
               <ScrollReveal>
                 <h2 className="font-instrument text-[clamp(3.5rem,6vw,5.5rem)] leading-[1.05] mb-8">
                    Dein Potenzial ist riesig. <br/>
                    <span className="text-night-secondary">Aber dein Auftritt zeigt es nicht.</span>
                 </h2>
               </ScrollReveal>
               <ScrollReveal delay={0.1}>
                 <p className="text-night-secondary text-xl md:text-2xl leading-relaxed mb-10">
                    Wir sehen es immer wieder: Großartige Coaches und Dienstleister, die unfassbaren Wert stiften, aber deren digitale Präsenz wie ein Baukasten wirkt.
                 </p>
               </ScrollReveal>
               <ul className="space-y-4 md:space-y-6 mt-8">
                  <ScrollReveal delay={0.2} className="flex items-start gap-4 md:gap-6 p-5 md:p-6 border border-night-secondary/20 rounded-2xl bg-deep-charcoal/50">
                     <span className="text-night-gold text-2xl md:text-3xl shrink-0">✕</span>
                     <span className="text-white text-lg md:text-xl font-light leading-relaxed">Ein "Bauchladen" an Angeboten verwirrt deine Besucher.</span>
                  </ScrollReveal>
                  <ScrollReveal delay={0.3} className="flex items-start gap-4 md:gap-6 p-5 md:p-6 border border-night-secondary/20 rounded-2xl bg-deep-charcoal/50">
                     <span className="text-night-gold text-2xl md:text-3xl shrink-0">✕</span>
                     <span className="text-white text-lg md:text-xl font-light leading-relaxed">Deine Seite sieht aus wie jede zweite Template-Website.</span>
                  </ScrollReveal>
                  <ScrollReveal delay={0.4} className="flex items-start gap-4 md:gap-6 p-5 md:p-6 border border-night-secondary/20 rounded-2xl bg-deep-charcoal/50">
                     <span className="text-night-gold text-2xl md:text-3xl shrink-0">✕</span>
                     <span className="text-white text-lg md:text-xl font-light leading-relaxed">Kunden verstehen nicht sofort, warum sie genau zu dir sollen.</span>
                  </ScrollReveal>
               </ul>
            </div>
        </div>
      </section>

      {/* SECTION 3: Die Lösung (Klarheitsfokus) */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 md:px-24 bg-warm-canvas border-b border-whisper-border">
        <div className="max-w-[1400px] mx-auto text-center">
            <ScrollReveal>
              <p className="text-refined-gold tracking-[0.2em] font-medium text-sm md:text-lg mb-4 md:mb-6 uppercase">Der Paradigmenwechsel</p>
              <h2 className="font-instrument text-[clamp(3.5rem,6vw,5.5rem)] leading-[1.05] mb-16 md:mb-24">
                Warum der <span className="italic text-refined-gold">Klarheitsfokus</span> alles verändert.
              </h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 text-left">
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <ScrollReveal delay={0.1} className="bg-pure-surface border border-whisper-border p-8 md:p-10 rounded-3xl flex flex-col justify-center">
                  <div className="text-refined-gold font-instrument text-5xl md:text-6xl mb-6">1.</div>
                  <h3 className="font-instrument text-3xl md:text-4xl mb-4">Eine Zielgruppe</h3>
                  <p className="text-warm-steel text-lg md:text-xl leading-relaxed">
                    Wer zu jedem spricht, erreicht niemanden. Wenn du spezifisch bist, fühlen sich Kunden tief verstanden.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.2} className="bg-pure-surface border-2 border-refined-gold p-8 md:p-10 rounded-3xl flex flex-col justify-center shadow-lg relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-refined-gold/5"></div>
                  <div className="text-refined-gold font-instrument text-5xl md:text-6xl mb-6 relative z-10">2.</div>
                  <h3 className="font-instrument text-3xl md:text-4xl mb-4 relative z-10">Ein Angebot</h3>
                  <p className="text-deep-charcoal text-lg md:text-xl relative z-10 font-medium leading-relaxed">
                    Wir rücken dein stärkstes Kernangebot in den Fokus. Das eliminiert Stress und kreiert Sog.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.3} className="bg-pure-surface border border-whisper-border p-8 md:p-10 rounded-3xl flex flex-col justify-center sm:col-span-2">
                  <div className="text-refined-gold font-instrument text-5xl md:text-6xl mb-6">3.</div>
                  <h3 className="font-instrument text-3xl md:text-4xl mb-4">Ein Vertriebsweg</h3>
                  <p className="text-warm-steel text-lg md:text-xl md:w-3/4 leading-relaxed">
                    Komplexe Funnels lenken nur ab. Eine clevere Customer Journey auf deiner Premium-Seite reicht aus, um aus Interessenten Kunden zu machen.
                  </p>
                </ScrollReveal>
              </div>
              
              <ScrollReveal delay={0.4} className="lg:col-span-4 relative rounded-3xl overflow-hidden border border-whisper-border shadow-2xl h-[400px] md:h-auto min-h-[400px] group bg-white flex items-center justify-center">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                 {/* TODO: Bild ersetzen durch /images/diamant-fokus.jpg — wird separat generiert */}
                 <Image 
                  src="/images/diamant-fokus.jpg"
                  alt="Diamantklare Fokussierung"
                  fill
                  className="object-contain p-8 md:p-12 scale-95 group-hover:scale-100 transition-transform duration-[2000ms] filter drop-shadow-[0_20px_40px_rgba(201,168,76,0.15)] animate-float"
                />
              </ScrollReveal>
            </div>
            
            <ScrollReveal delay={0.5} className="mt-16 md:mt-24 flex justify-center w-full">
                <Link href="https://tidycal.com/sabala-mentoring/premium-onepager-paket-passen-wir-zusammen" target="_blank" className="inline-flex items-center justify-center px-8 py-4 text-sm md:text-base font-bold uppercase tracking-widest rounded-full text-white bg-deep-charcoal border border-transparent hover:border-whisper-border transition-all shadow-lg hover:-translate-y-1">
                   Kostenfreies Kennenlernen →
                </Link>
            </ScrollReveal>
        </div>
      </section>

      {/* SECTION 4: Was im Paket enthalten ist */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 md:px-24 bg-night-foundation text-night-text border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 md:mb-20 text-center lg:text-left">
            <ScrollReveal>
              <p className="text-night-gold tracking-widest uppercase text-sm md:text-lg mb-4 md:mb-6">Der Lieferumfang</p>
              <h2 className="font-instrument text-[clamp(3.5rem,6vw,5.5rem)] leading-tight text-white mb-6">Das Premium One-Pager Paket.</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-night-secondary text-xl md:text-2xl border-none lg:border-l-[3px] border-night-gold lg:pl-6 lg:mt-6 max-w-3xl leading-relaxed mx-auto lg:mx-0 text-center lg:text-left">
                Kein Template. Kein Baukasten. Deine 100% individuelle Premium Identität.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
             <ScrollReveal delay={0.2} className="lg:col-span-4 relative rounded-3xl overflow-hidden border border-night-gold/20 h-[50vh] min-h-[400px] lg:h-auto group flex items-center justify-center">
               <Image 
                 src="/Bilder Sabala/5 - _MXS8196.jpg"
                 alt="Sabala Mentor"
                 fill
                 className="object-cover object-top group-hover:scale-105 transition-all duration-1000"
               />
               <div className="absolute inset-0 border-[3px] border-night-gold/20 rounded-3xl pointer-events-none"></div>
             </ScrollReveal>
             
             <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 auto-rows-fr">
                <ScrollReveal delay={0.3} className="p-8 md:p-10 border border-night-secondary/20 rounded-[32px] bg-deep-charcoal flex flex-col justify-center h-full">
                   <div className="mb-4 md:mb-6">
                      <span className="font-instrument text-4xl md:text-5xl text-night-gold">01 . </span>
                      <span className="font-instrument text-3xl md:text-4xl text-white">Brandstrategie</span>
                   </div>
                   <p className="text-night-secondary text-lg md:text-xl leading-relaxed">
                      Wir definieren deine exakte strategische Ausrichtung am Markt, damit du Premium wirkst.
                   </p>
                </ScrollReveal>

                <ScrollReveal delay={0.4} className="p-8 md:p-10 border border-night-secondary/20 rounded-[32px] bg-deep-charcoal flex flex-col justify-center h-full">
                   <div className="mb-4 md:mb-6">
                      <span className="font-instrument text-4xl md:text-5xl text-night-gold">02 . </span>
                      <span className="font-instrument text-3xl md:text-4xl text-white">Visueller Brandguide</span>
                   </div>
                   <p className="text-night-secondary text-lg md:text-xl leading-relaxed">
                      Farben, Typografie, Bildsprache & Mood. Alles feinsäuberlich dokumentiert.
                   </p>
                </ScrollReveal>

                <ScrollReveal delay={0.5} className="p-8 md:p-10 border border-night-gold/30 rounded-[32px] bg-[#22221f] flex flex-col justify-center shadow-[0_0_30px_rgba(201,168,76,0.05)] h-full">
                   <div className="mb-4 md:mb-6">
                      <span className="font-instrument text-4xl md:text-5xl text-night-gold">03 . </span>
                      <span className="font-instrument text-3xl md:text-4xl text-white">Premium One-Pager</span>
                   </div>
                   <p className="text-night-secondary text-lg md:text-xl leading-relaxed">
                      Eine designstarke, mobil-optimierte Landingpage. Nach Verkaufspsychologie aufgebaut.
                   </p>
                </ScrollReveal>

                <ScrollReveal delay={0.6} className="p-8 md:p-10 border-2 border-night-gold rounded-[32px] bg-night-gold/5 flex flex-col justify-center relative shadow-[0_0_30px_rgba(201,168,76,0.1)] h-full">
                   <div className="absolute top-0 right-0 bg-night-gold text-black text-xs md:text-sm font-bold px-4 py-1.5 md:px-6 rounded-bl-3xl rounded-tr-[30px] uppercase tracking-wider">Bonus</div>
                   <div className="mb-4 md:mb-6 mt-2">
                      <span className="font-instrument text-4xl md:text-5xl text-night-gold text-opacity-50">04 . </span>
                      <span className="font-instrument text-3xl md:text-4xl text-white">Contentplan</span>
                   </div>
                   <p className="text-white text-lg md:text-xl leading-relaxed">
                      Präsentation deiner Content-Säulen. Die klare Strategie für deine Sichtbarkeit.
                   </p>
                </ScrollReveal>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Der Prozess Visualisiert */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 md:px-24 bg-pure-surface border-b border-whisper-border">
         <div className="max-w-[1400px] mx-auto">
            <ScrollReveal>
              <h2 className="font-instrument text-[clamp(3.5rem,6vw,5.5rem)] leading-[1.05] mb-20 text-center">
                Der Weg zur neuen Website.<br/> <span className="italic text-refined-gold">Einfach, strukturiert & zügig.</span>
              </h2>
            </ScrollReveal>
            
            <div className="relative mt-12 md:mt-24">
              {/* Timeline Line (Desktop Only) */}
              <div className="hidden lg:block absolute top-[2px] left-[10%] w-[80%] h-[2px] bg-black/[0.05]"></div>
              <div className="hidden lg:block absolute top-[2px] left-[10%] w-[40%] h-[2px] bg-refined-gold"></div>

              {/* Timeline Line (Mobile Vertical) */}
              <div className="lg:hidden absolute top-0 bottom-0 left-6 sm:left-8 w-1 bg-whisper-border"></div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                 {/* Step 1 */}
                 <ScrollReveal delay={0.1} className="relative pl-16 lg:pl-0">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-refined-gold text-white flex items-center justify-center font-instrument text-2xl lg:text-4xl absolute left-0 lg:left-1/2 top-4 lg:-top-[30px] lg:-translate-x-1/2 outline outline-8 outline-pure-surface shadow-lg z-10">1</div>
                    <div className="bg-white border border-whisper-border p-8 lg:p-12 rounded-3xl lg:rounded-[40px] lg:mt-[80px] text-left lg:text-center shadow-lg hover:-translate-y-2 transition-transform duration-500">
                       <h3 className="font-instrument text-2xl lg:text-4xl mb-3 md:mb-4">Das Kennenlernen</h3>
                       <p className="text-warm-steel text-sm lg:text-lg mb-4 md:mb-6">Kostenfreies 30-Minuten Gespräch</p>
                       <p className="leading-relaxed text-sm md:text-base">
                          Wir prüfen ganz unverbindlich in einem Call, ob das Paket für deine Situation Sinn ergibt. Nur wenn wir sicher sind, starten wir.
                       </p>
                    </div>
                 </ScrollReveal>

                 {/* Step 2 */}
                 <ScrollReveal delay={0.2} className="relative pl-16 lg:pl-0">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-refined-gold text-white flex items-center justify-center font-instrument text-2xl lg:text-4xl absolute left-0 lg:left-1/2 top-4 lg:-top-[30px] lg:-translate-x-1/2 outline outline-8 outline-pure-surface shadow-lg z-10">2</div>
                    <div className="bg-white border border-refined-gold/50 p-8 lg:p-12 rounded-3xl lg:rounded-[40px] lg:mt-[80px] text-left lg:text-center shadow-[0_20px_40px_rgba(184,150,62,0.1)] hover:-translate-y-2 transition-transform duration-500">
                       <h3 className="font-instrument text-2xl lg:text-4xl mb-3 md:mb-4">Vorbereitung</h3>
                       <p className="text-warm-steel text-sm lg:text-lg mb-4 md:mb-6">Die Checkliste</p>
                       <p className="leading-relaxed text-sm md:text-base">
                          Du legst deine Bilder, Texte und finale Ausrichtung strukturiert in einer klaren Checkliste ab. Sobald alles geliefert ist, machen wir einen Kick-Off Termin aus.
                       </p>
                    </div>
                 </ScrollReveal>

                 {/* Step 3 */}
                 <ScrollReveal delay={0.3} className="relative pl-16 lg:pl-0">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-pure-surface border-2 border-refined-gold text-refined-gold flex items-center justify-center font-instrument text-2xl lg:text-4xl absolute left-0 lg:left-1/2 top-4 lg:-top-[30px] lg:-translate-x-1/2 outline outline-8 outline-pure-surface z-10">3</div>
                    <div className="bg-deep-charcoal border-none text-white p-8 lg:p-12 rounded-3xl lg:rounded-[40px] lg:mt-[80px] text-left lg:text-center shadow-xl hover:-translate-y-2 transition-transform duration-500">
                       <h3 className="font-instrument text-2xl lg:text-4xl mb-3 md:mb-4 text-white">Kick-Off & Lieferung</h3>
                       <p className="text-night-secondary text-sm lg:text-lg mb-4 md:mb-6">Wir erwecken es zum Leben</p>
                       <p className="leading-relaxed text-sm md:text-base text-white/90">
                          Wir besprechen alles final im gemeinsamen Kick-Off Call. Danach beginnt die Umsetzung, und nach <strong className="text-night-gold font-normal">genau 7 Tagen</strong> ist die fertige Seite online.
                       </p>
                    </div>
                 </ScrollReveal>
              </div>
            </div>
            
            <ScrollReveal delay={0.4} className="mt-16 md:mt-24 flex justify-center w-full relative z-20">
                <Link href="https://tidycal.com/sabala-mentoring/premium-onepager-paket-passen-wir-zusammen" target="_blank" className="inline-flex items-center justify-center px-8 md:px-10 py-4 text-sm md:text-base font-bold uppercase tracking-widest rounded-full text-white bg-deep-charcoal border border-transparent hover:bg-black transition-all shadow-lg hover:-translate-y-1">
                   Diesen Ablauf fürs Projekt einloggen →
                </Link>
            </ScrollReveal>
         </div>
      </section>

      {/* SECTION 6: Checkliste / Voraussetzungen (Split View) */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 md:px-24 relative bg-night-foundation text-night-text border-y border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-night-gold/5 rounded-bl-full blur-3xl pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto relative z-10">
           <ScrollReveal>
              <h2 className="font-instrument text-[clamp(3.5rem,6vw,5.5rem)] leading-[1.05] mb-16 text-center text-white">
                 Für wen ist das <span className="italic text-night-gold">Premium One-Pager Paket?</span>
              </h2>
           </ScrollReveal>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
              
              {/* Not For You */}
              <ScrollReveal delay={0.1} className="bg-[#2E2B26] border border-red-900/30 p-8 md:p-12 rounded-3xl md:rounded-[40px] flex flex-col h-full">
                 <h3 className="font-instrument text-3xl md:text-4xl mb-8 text-night-secondary/60">Nicht geeignet für dich...</h3>
                 <ul className="space-y-6 md:space-y-8 flex-grow">
                   <li className="flex gap-4 md:gap-6 items-start">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-900/20 text-red-500 flex items-center justify-center shrink-0 font-bold">✕</div>
                      <p className="text-lg md:text-xl text-night-secondary leading-relaxed pt-1">
                         Wenn du ganz am Anfang stehst und tief im Inneren noch nach deiner Nische suchst.
                      </p>
                   </li>
                   <li className="flex gap-4 md:gap-6 items-start">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-900/20 text-red-500 flex items-center justify-center shrink-0 font-bold">✕</div>
                      <p className="text-lg md:text-xl text-night-secondary leading-relaxed pt-1">
                         Wenn du noch gar nicht weißt, was dein Angebot genau ist und wie du arbeiten möchtest.
                      </p>
                   </li>
                   <li className="flex gap-4 md:gap-6 items-start">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-900/20 text-red-500 flex items-center justify-center shrink-0 font-bold">✕</div>
                      <p className="text-lg md:text-xl text-night-secondary leading-relaxed pt-1">
                         Wenn du noch keine vernünftigen Fotos von dir hast und unsicher mit ersten Textentwürfen bist.
                      </p>
                   </li>
                 </ul>
              </ScrollReveal>

              {/* Perfect For You */}
              <ScrollReveal delay={0.2} className="bg-deep-charcoal border-2 border-night-gold/50 p-8 md:p-12 rounded-3xl md:rounded-[40px] flex flex-col shadow-[0_0_60px_rgba(201,168,76,0.1)] relative h-full">
                 <div className="absolute -top-4 md:-top-5 right-6 md:right-10 bg-night-gold text-black uppercase tracking-widest text-xs md:text-sm font-bold px-4 py-1.5 md:px-6 md:py-2 rounded-full shadow-lg">Der perfekte Match</div>
                 <h3 className="font-instrument text-3xl md:text-4xl mb-8 text-white mt-4 md:mt-0">Dieses Paket ist für dich, wenn...</h3>
                 <ul className="space-y-6 md:space-y-8 flex-grow">
                   <li className="flex gap-4 md:gap-6 items-start">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-night-gold/20 text-night-gold flex items-center justify-center shrink-0 font-bold">✓</div>
                      <p className="text-lg md:text-xl text-white leading-relaxed pt-1">
                         Du eine <strong className="text-night-gold font-normal">klare Entscheidung</strong> getroffen hast (Zielgruppe & Kernangebot).
                      </p>
                   </li>
                   <li className="flex gap-4 md:gap-6 items-start">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-night-gold/20 text-night-gold flex items-center justify-center shrink-0 font-bold">✓</div>
                      <p className="text-lg md:text-xl text-white leading-relaxed pt-1">
                         Du bereits ein <strong className="text-night-gold font-normal">grobes Farbkonzept</strong> oder eine Identitäts-Vorstellung hast.
                      </p>
                   </li>
                   <li className="flex gap-4 md:gap-6 items-start">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-night-gold/20 text-night-gold flex items-center justify-center shrink-0 font-bold">✓</div>
                      <p className="text-lg md:text-xl text-white leading-relaxed pt-1">
                         Deine <strong className="text-night-gold font-normal">Bilder & Basis-Texte</strong> existieren bereits. Dir fehlt nur das Premium-Fundament.
                      </p>
                   </li>
                 </ul>
              </ScrollReveal>

           </div>
        </div>
      </section>

      {/* SECTION 7: Zukunftsvision (Future Pacing) */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 md:px-24 bg-pure-surface overflow-hidden border-b border-whisper-border relative">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-warm-canvas to-transparent opacity-50 pointer-events-none"></div>
        <div className="absolute -bottom-[20vh] -right-[20vh] w-[80vh] h-[80vh] bg-gold-glow rounded-full blur-[120px] opacity-20 mix-blend-multiply pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="order-2 lg:order-1">
               <ScrollReveal>
                 <p className="text-refined-gold tracking-[0.2em] font-bold text-xs md:text-sm mb-6 uppercase inline-block border border-refined-gold/20 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-refined-gold/5">Die Vision</p>
                 <h2 className="font-instrument text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] mb-8">
                    Endlich das Fundament, <br/>
                    um <span className="italic text-refined-gold">richtig</span> loszulegen.
                 </h2>
               </ScrollReveal>
               
               <ScrollReveal delay={0.1}>
                 <p className="text-warm-steel text-xl md:text-2xl leading-[1.65] mb-10 md:mb-12">
                    Stell dir vor, du verschickst den Link zu deiner Website nicht mehr mit unsicherem Gefühl, sondern aus tiefstem Stolz. Ein Auftritt, der dein wahres Kompetenz-Level widerspiegelt.
                 </p>
               </ScrollReveal>

               <div className="flex flex-col gap-6">
                  <ScrollReveal delay={0.2} className="p-2 border border-whisper-border bg-black/[0.02] rounded-3xl group">
                     {/* Inner Core */}
                     <div className="bg-white p-6 md:p-8 rounded-[calc(1.5rem-0.5rem)] flex items-start gap-4 md:gap-6 border border-transparent group-hover:shadow-[0_20px_40px_rgba(184,150,62,0.05)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                       <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-refined-gold/30 bg-refined-gold/5 flex items-center justify-center text-refined-gold shrink-0 scale-100 group-hover:bg-refined-gold group-hover:text-white transition-all duration-500">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3 7 7-7 7M5 10h14"/></svg>
                       </div>
                       <div>
                          <h4 className="font-instrument text-2xl md:text-3xl mb-2 md:mb-3 text-deep-charcoal">Strategisches Wachstum</h4>
                          <p className="font-satoshi text-base md:text-lg text-warm-steel leading-relaxed">Mit einer klaren Positionierung erreichst du Traumkunden, die deine Preise ohne zu zögern bezahlen.</p>
                       </div>
                     </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.3} className="p-2 border border-whisper-border bg-black/[0.02] rounded-3xl group">
                     <div className="bg-white p-6 md:p-8 rounded-[calc(1.5rem-0.5rem)] flex items-start gap-4 md:gap-6 border border-transparent group-hover:shadow-[0_20px_40px_rgba(184,150,62,0.05)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                       <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-refined-gold/30 bg-refined-gold/5 flex items-center justify-center text-refined-gold shrink-0 group-hover:bg-refined-gold group-hover:text-white transition-all duration-500">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                       </div>
                       <div>
                          <h4 className="font-instrument text-2xl md:text-3xl mb-2 md:mb-3 text-deep-charcoal">Automatisierter Trust</h4>
                          <p className="font-satoshi text-base md:text-lg text-warm-steel leading-relaxed">Bevor du das erste Wort sprichst, hat die neue Präsenz deiner Marke bereits Autorität manifestiert.</p>
                       </div>
                     </div>
                  </ScrollReveal>
               </div>
            </div>

            {/* Double-Bezel Image Display */}
            <ScrollReveal delay={0.2} className="order-1 lg:order-2 relative h-[50vh] md:h-[600px] lg:h-[750px] w-full p-3 md:p-4 rounded-[2rem] md:rounded-[3rem] bg-black/[0.02] border border-whisper-border shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-[800ms] flex items-center justify-center">
               <div className="absolute inset-0 bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,1)] m-3 md:m-4 rounded-[calc(2rem-0.75rem)] md:rounded-[calc(3rem-1rem)] overflow-hidden group">
                 <Image 
                   src="/Bilder Sabala/36 - 373_CH_Sehnde_.jpg"
                   alt="Sabala Clarifying Vision"
                   fill
                   className="object-cover object-center opacity-90 scale-105 group-hover:scale-100 transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] filter grayscale-[20%]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/80 via-deep-charcoal/20 to-transparent"></div>
                 
                 <div className="absolute bottom-8 left-6 right-6 md:bottom-12 md:left-12 md:right-12 z-10 flex flex-col items-center">
                    <div className="backdrop-blur-2xl bg-white/10 border border-white/20 p-6 md:p-8 rounded-3xl shadow-xl w-full text-center">
                       <p className="font-instrument text-3xl md:text-4xl text-white mb-2 leading-none">Dein neues Level.</p>
                       <p className="text-white/70 font-satoshi text-xs md:text-sm uppercase tracking-[0.2em] font-medium mt-3">Ein Fundament das für dich arbeitet</p>
                    </div>
                 </div>
               </div>
            </ScrollReveal>
        </div>
      </section>

      {/* SECTION 8: Investition & Verknappung */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 relative bg-[#FAFAF8] overflow-hidden">
        <div className="max-w-[720px] mx-auto flex flex-col items-center text-center relative z-10">
            <ScrollReveal>
               <div className="text-refined-gold tracking-[0.2em] font-bold text-xs uppercase mb-12">
                 Special Launch Deal
               </div>
               
               <div className="flex flex-col items-center mb-0">
                  <div className="line-through text-deep-charcoal/40 text-[18px] mb-2 font-satoshi">
                     € 4.500
                  </div>
                  <div className="font-instrument text-[5rem] md:text-[64px] font-normal leading-none text-deep-charcoal mb-4">
                     € 3.600
                  </div>
                  <div className="text-sm md:text-base text-warm-steel font-satoshi tracking-wide">
                     netto <span className="mx-2 opacity-40">·</span> 100% Planungssicherheit <span className="mx-2 opacity-40">·</span> Kein Risiko
                  </div>
               </div>
               
               <div className="w-full h-[1px] bg-deep-charcoal/10 my-10 md:my-14"></div>
               
               <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 text-left">
                  {/* Item 1 */}
                  <div className="flex flex-col items-start bg-white p-6 md:p-8 rounded-[2rem] border border-black/[0.04] shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:-translate-y-1 transition-transform">
                     <div className="text-refined-gold mb-3 text-xl">✦</div>
                     <h4 className="font-instrument text-[18px] md:text-[20px] text-deep-charcoal mb-2">Positionierungs-Fokus</h4>
                     <p className="font-satoshi text-sm text-warm-steel leading-relaxed">Wir schleifen deine Botschaft, bis kein Bauchladen mehr übrig ist.</p>
                  </div>
                  {/* Item 2 */}
                  <div className="flex flex-col items-start bg-white p-6 md:p-8 rounded-[2rem] border border-black/[0.04] shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:-translate-y-1 transition-transform">
                     <div className="text-refined-gold mb-3 text-xl">✦</div>
                     <h4 className="font-instrument text-[18px] md:text-[20px] text-deep-charcoal mb-2">Premium Copy & Design</h4>
                     <p className="font-satoshi text-sm text-warm-steel leading-relaxed">Dein One-Pager, konvertierungsstark und mit maximalem WOW-Effekt.</p>
                  </div>
                  {/* Item 3 */}
                  <div className="flex flex-col items-start bg-white p-6 md:p-8 rounded-[2rem] border border-black/[0.04] shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:-translate-y-1 transition-transform">
                     <div className="text-refined-gold mb-3 text-xl">✦</div>
                     <h4 className="font-instrument text-[18px] md:text-[20px] text-deep-charcoal mb-2">High-Speed Launch</h4>
                     <p className="font-satoshi text-sm text-warm-steel leading-relaxed">Statt Monatelangem Warten: Fixfertig online in exakt 7 Tagen.</p>
                  </div>
               </div>

               <div className="w-full h-[1px] bg-deep-charcoal/10 my-10 md:my-14"></div>
               
               <div className="flex flex-col items-center w-full max-w-[400px] mx-auto">
                  <div className="flex items-center gap-3 mb-8">
                     <span className="relative flex h-2.5 w-2.5">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8fb996] opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6C9A74]"></span>
                     </span>
                     <span className="text-[11px] md:text-xs font-satoshi uppercase tracking-[0.1em] font-bold text-deep-charcoal">
                        Offen für Bewerbungen <span className="mx-2 opacity-30">·</span> 7 Plätze
                     </span>
                  </div>
                  
                  <Link href="https://tidycal.com/sabala-mentoring/premium-onepager-paket-passen-wir-zusammen" target="_blank" className="w-full block py-5 px-8 bg-black hover:bg-deep-charcoal text-white text-xs md:text-sm font-bold uppercase tracking-[0.15em] transition-all rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 mb-4">
                     Hier Beratungsgespräch buchen →
                  </Link>
                  <p className="text-[11px] md:text-[13px] font-satoshi text-warm-steel/80">
                     Schließt automatisch nach 7 bestätigten Kick-Off Slots.
                  </p>
               </div>
            </ScrollReveal>
        </div>
      </section>

      {/* SECTION 8.5: FAQ */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 md:px-24 bg-warm-canvas border-t border-whisper-border">
         <div className="max-w-[1000px] mx-auto">
            <ScrollReveal>
               <div className="text-center mb-16">
                 <h2 className="font-instrument text-[clamp(2.5rem,6vw,4.5rem)] leading-tight mb-4 text-deep-charcoal">Häufig gestellte Fragen</h2>
                 <p className="text-warm-steel text-lg">Alles was du über den technischen und organisatorischen Ablauf wissen musst.</p>
               </div>
            </ScrollReveal>

            <div className="space-y-6">
               <ScrollReveal delay={0.1} className="bg-white border border-whisper-border p-8 rounded-3xl transition-shadow hover:shadow-lg">
                  <h3 className="font-instrument text-2xl mb-3 text-deep-charcoal">Auf welcher technologischen Basis baut ihr die Seite?</h3>
                  <p className="text-warm-steel leading-relaxed">Unsere Websites werden in enger Partnerschaft mit <strong className="text-deep-charcoal font-medium">Christopher Buschor</strong> technisch realisiert. Wir setzen auf WordPress und Elementor, gehostet auf extrem schnellen und sicheren Servern – selbstverständlich mit Standort in Deutschland und absolut DSGVO-konform.</p>
               </ScrollReveal>
               
               <ScrollReveal delay={0.2} className="bg-white border border-whisper-border p-8 rounded-3xl transition-shadow hover:shadow-lg">
                  <h3 className="font-instrument text-2xl mb-3 text-deep-charcoal">Was brauche ich als Kunde?</h3>
                  <p className="text-warm-steel leading-relaxed">Fast nichts. Alles, was du final benötigst, ist deine Einmal-Investition und eine eigene Domain. Den gesamten Prozess – von Text und Design bis zur funktionalen WordPress-Struktur – übernehmen und übergeben wir schlüsselfertig.</p>
               </ScrollReveal>

               <ScrollReveal delay={0.3} className="bg-white border border-whisper-border p-8 rounded-3xl transition-shadow hover:shadow-lg">
                  <h3 className="font-instrument text-2xl mb-3 text-deep-charcoal">Wie läuft das Hosting ab?</h3>
                  <p className="text-warm-steel leading-relaxed">Du kannst die technische Verantwortung nach dem Launch komplett in unsere Hände übergeben. Mit den zubuchbaren Wartungs- und Hostingpaketen unseres Partners kümmern wir uns im Hintergrund um Backups, Sicherheit, Updates und stets aktuelle Rechtstexte.</p>
               </ScrollReveal>
            </div>
         </div>
      </section>

      {/* SECTION 8.6: Hosting & Wachstumspakete */}
      <section className="bg-[#050505] py-24 md:py-32 px-6 sm:px-12 md:px-24 relative overflow-hidden z-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-night-gold/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-night-secondary/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <ScrollReveal>
             <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-16 md:mb-20">
               <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 inline-block">
                 <span className="font-geist text-[0.65rem] md:text-sm tracking-[0.2em] uppercase text-white/70 font-medium">Sicheres Fundament</span>
               </div>
               <h2 className="font-instrument text-[clamp(2rem,4vw,3.5rem)] text-white leading-[1.1] mb-6">
                 Dein <span className="italic text-night-gold">Wachstumspartner.</span>
               </h2>
               <p className="font-satoshi text-night-secondary text-lg md:text-xl leading-relaxed">
                 <strong className="text-white font-medium">Ein massiver Vorteil:</strong> Wir bauen auf WordPress & Elementor. Falls du bereits eine Seite hast, ziehen wir deine Domain völlig nahtlos um – du behältst dein gewohntes Backend und musst dich in kein neues System einarbeiten.
                 <br/><br/>
                 Zudem bist du mit unserem Technik-Partner <strong className="text-white font-medium">Christopher Buschor</strong> langfristig abgesichert. Du kaufst nicht nur eine Seite, sondern einen Premium-Wachstumsservice: Hochleistungsserver in Deutschland, rechts- und DSGVO-konform, inklusive permanenter Wartung und Updates.
               </p>
             </div>
          </ScrollReveal>

          {/* Core Packages Bento */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* Package 1: Lite */}
             <ScrollReveal delay={0.1} className="group relative rounded-[2rem] p-[1px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                <div className="relative h-full bg-[#0A0A0A] p-8 md:p-10 rounded-[calc(2rem-1px)] flex flex-col items-start border-t border-white/5">
                   <h3 className="font-instrument text-2xl text-white mb-2">Lite-Paket</h3>
                   <div className="font-geist text-night-gold tracking-widest text-sm uppercase mb-6">49,- € / Monat</div>
                   <p className="font-satoshi text-white/60 mb-8 leading-relaxed">Die Minimallösung für den sicheren Einstieg mit Hosting auf deutschen Servern.</p>
                   <ul className="space-y-4 font-satoshi text-white/80 w-full mb-8">
                     <li className="flex items-start gap-4">
                       <span className="text-night-gold mt-1">✦</span>
                       <span>Monatliche Rechtstext-Aktualisierung (DSGVO)</span>
                     </li>
                     <li className="flex items-start gap-4">
                       <span className="text-night-gold mt-1">✦</span>
                       <span>Wöchentliche Updates & Monats-Backups</span>
                     </li>
                     <li className="flex items-start gap-4">
                       <span className="text-night-gold mt-1">✦</span>
                       <span>Monatliche Scans auf Malware</span>
                     </li>
                     <li className="flex items-start gap-4">
                       <span className="text-night-gold mt-1">✦</span>
                       <span>1 E-Mail-Postfach (2 GB Speicher)</span>
                     </li>
                   </ul>
                </div>
             </ScrollReveal>

             {/* Package 2: Basis (Highlighted) */}
             <ScrollReveal delay={0.2} className="group relative rounded-[2rem] p-[1px] overflow-hidden lg:-translate-y-4">
                <div className="absolute inset-0 bg-gradient-to-b from-night-gold/60 to-night-gold/10" />
                <div className="relative h-full bg-[#0E0B05] p-8 md:p-10 rounded-[calc(2rem-1px)] flex flex-col items-start">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-night-gold to-transparent opacity-50" />
                   <div className="absolute top-10 right-10 w-24 h-24 bg-night-gold/10 blur-[40px] rounded-full group-hover:bg-night-gold/20 transition-colors duration-700" />
                   
                   <h3 className="font-instrument text-3xl text-white mb-2 relative z-10">Basis-Paket</h3>
                   <div className="font-geist text-night-gold tracking-widest text-sm uppercase mb-6 relative z-10">74,- € / Monat</div>
                   <p className="font-satoshi text-white/70 mb-8 leading-relaxed relative z-10">Das solide Fundament für Selbstständige, um ohne Sorgen aufzubauen.</p>
                   <ul className="space-y-4 font-satoshi text-white/90 w-full mb-8 relative z-10">
                     <li className="flex items-start gap-4">
                       <span className="text-night-gold mt-1">✦</span>
                       <span>2-wöchige Rechtstext-Updates</span>
                     </li>
                     <li className="flex items-start gap-4">
                       <span className="text-night-gold mt-1">✦</span>
                       <span>Wöchentliche Updates inkl. Funktionscheck</span>
                     </li>
                     <li className="flex items-start gap-4">
                       <span className="text-night-gold mt-1">✦</span>
                       <span><strong className="text-white">Tägliche</strong> Backups & regelmäßige Scans</span>
                     </li>
                     <li className="flex items-start gap-4">
                       <span className="text-night-gold mt-1">✦</span>
                       <span>Bis zu 3 E-Mail-Postfächer (insg. 6 GB)</span>
                     </li>
                     <li className="flex items-start gap-4">
                       <span className="text-night-gold mt-1">✦</span>
                       <span>Erweiterte Performance-Optimierung</span>
                     </li>
                   </ul>
                </div>
             </ScrollReveal>

             {/* Package 3: Premium */}
             <ScrollReveal delay={0.3} className="group relative rounded-[2rem] p-[1px] overflow-hidden md:col-span-2 lg:col-span-1">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                <div className="relative h-full bg-[#0A0A0A] p-8 md:p-10 rounded-[calc(2rem-1px)] flex flex-col items-start border-t border-white/5">
                   <h3 className="font-instrument text-2xl text-white mb-2">Premium-Paket</h3>
                   <div className="font-geist text-night-gold tracking-widest text-sm uppercase mb-6">149,- € / Monat</div>
                   <p className="font-satoshi text-white/60 mb-8 leading-relaxed">Für Unternehmer, die durch Performance und Analytics wachsen möchten.</p>
                   <ul className="space-y-4 font-satoshi text-white/80 w-full mb-8">
                     <li className="flex items-start gap-4">
                       <span className="text-night-gold mt-1">✦</span>
                       <span>Updates jeden Montag & Freitag</span>
                     </li>
                     <li className="flex items-start gap-4">
                       <span className="text-night-gold mt-1">✦</span>
                       <span>360° Matomo Web Analytics</span>
                     </li>
                     <li className="flex items-start gap-4">
                       <span className="text-night-gold mt-1">✦</span>
                       <span>Inkl. zeitlicher Assistenz (Beratung/Pflege bis 45 Min.)</span>
                     </li>
                     <li className="flex items-start gap-4">
                       <span className="text-night-gold mt-1">✦</span>
                       <span>Bis zu 5 E-Mail-Postfächer (12 GB)</span>
                     </li>
                   </ul>
                </div>
             </ScrollReveal>
          </div>
          
          <ScrollReveal delay={0.4}>
             <p className="font-satoshi text-white/30 text-center mt-12 text-[10px] md:text-sm max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
                * Business & Elite Wachstums-Pakete für große Shop/Architektur-Projekte (279€ / 799€) auf Anfrage.
             </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 9: Call to Action */}
      <section className="py-32 md:py-48 px-6 sm:px-12 md:px-24 relative bg-night-foundation flex flex-col items-center justify-center overflow-hidden">
         <div className="absolute left-0 bottom-0 w-[400px] md:w-[600px] h-[600px] md:h-[800px] grayscale opacity-25 transform -scale-x-100 mix-blend-screen pointer-events-none">
             <Image src="/images/sabala-portrait-hero.png" fill className="object-cover object-top" alt="Sabala bg" />
         </div>

         <div className="max-w-[1400px] mx-auto w-full z-10 text-center relative">
            <ScrollReveal>
              <h2 className="font-instrument text-[clamp(3.5rem,7vw,6.5rem)] leading-tight mb-8 md:mb-12 text-white">
                Lass uns sprechen. <br/>
                <span className="italic text-night-gold">Völlig unverbindlich.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-xl md:text-3xl text-night-secondary mb-16 md:mb-20 max-w-4xl mx-auto leading-relaxed">
                Wähle unten deinen passenden Termin für das 30-minütige Kennenlernen aus. Wenn es von beiden Seiten "klickt", vereinbaren wir im Anschluss den offiziellen Kick-Off.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="max-w-3xl mx-auto border border-night-gold/20 bg-[#22221f] p-6 md:p-10 rounded-3xl md:rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
               <div className="w-full min-h-[300px] py-10 bg-deep-charcoal border-2 border-dashed border-night-gold/40 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center hover:border-night-gold transition-colors group">
                  <svg className="w-16 h-16 md:w-20 md:h-20 text-night-gold mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-2xl md:text-4xl font-instrument text-white mb-6 text-center px-4">30-Min-Kennenlernen buchen</p>
                  
                  <Link href="https://tidycal.com/sabala-mentoring/premium-onepager-paket-passen-wir-zusammen" target="_blank" className="mt-4 inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-6 text-sm md:text-xl font-bold uppercase tracking-widest rounded-full text-black bg-night-gold hover:bg-white transition-all shadow-[0_10px_30px_rgba(201,168,76,0.2)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.4)]">
                    Hier Termin wählen →
                  </Link>
               </div>
            </ScrollReveal>
         </div>
      </section>

    </div>
  );
}
