import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FootprintPath } from "@/components/ui/FootprintPath";
import { ChromaKeyVideo } from "@/components/ui/ChromaKeyVideo";
import { SlowVideo } from "@/components/ui/SlowVideo";
import { Timeline3DBox } from "@/components/ui/Timeline3DBox";
import { GoldDust } from "@/components/ui/GoldDust";

export const metadata = {
  title: "Premium-Angebot | Sabala Mentoring",
  description: "Dein kompletter Auftritt. Von der Essenz bis zur Erlebnis-Website. Alles aus einem Guss.",
};

export default function PremiumAngebotPage() {
  return (
    <main className="min-h-[100dvh] bg-warm-canvas">
      {/* SECTION 1: HERO */}
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <ScrollReveal>
              <div className="inline-block border border-warm-steel/20 rounded-full px-4 py-1.5 text-xs font-geist text-warm-steel tracking-wide uppercase mb-8">
                Das Premium-Paket
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-deep-charcoal tracking-tight mb-8">
                Dein kompletter Auftritt. <br />
                <span className="text-warm-steel">Von der Essenz bis zur Erlebnis-Website.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-satoshi text-warm-steel text-lg leading-relaxed max-w-[500px]">
                Für Unternehmer, die keinen Webdesigner suchen — sondern einen strategischen Partner für ihren gesamten professionellen Auftritt.
              </p>
            </ScrollReveal>
          </div>
          <div className="relative aspect-square md:aspect-[4/5] w-full flex items-center justify-center group overflow-visible">
            <ScrollReveal delay={0.3} className="w-full h-full relative flex items-center justify-center p-12 lg:p-24 drop-shadow-2xl">

              <SlowVideo 
                src="/videos/Kristall.mp4" 
                playbackRate={0.6} // Höherer Wert, damit die Framerate nicht zu stark ruckelt (30 -> 18fps)
                className="w-full h-full object-contain mix-blend-multiply opacity-70 transition-all duration-1000 ease-out group-hover:opacity-100 animate-[float_6s_ease-in-out_infinite]"
                style={{ 
                  // Soft edge mask to blend the golden background perfectly into the beige
                  maskImage: 'radial-gradient(circle at center, black 40%, transparent 60%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 60%)'
                }}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 2: PAIN (Dunkel) - Innerliches Kopfnicken */}
      <section className="bg-night-foundation py-24 md:py-40 px-6">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="w-12 h-[2px] bg-refined-gold mb-10 opacity-70" />
            <h2 className="font-instrument text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] text-night-text mb-16 relative z-10">
              <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-refined-gold/5 blur-[120px] rounded-full pointer-events-none" />
              Du verkaufst Transformation. <br />
              <span className="text-night-secondary">Aber dein Auftritt wirkt wie austauschbarer Standard.</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-10 text-night-secondary font-satoshi text-lg leading-relaxed">
            <ScrollReveal delay={0.1}>
              <h3 className="font-geist text-refined-gold text-sm tracking-widest uppercase mb-4">Die Frustration</h3>
              <p>
                Du hast vielleicht schon viel Geld in die Hand genommen. Eine Agentur beauftragt, den neuesten Web-Kurs gekauft oder dich in Baukästen verkrampft. Das Ergebnis? Deine Website sieht hübsch aus – aber sie sieht aus wie tausend andere. Sie atmet nicht. Sie spricht nicht deine Sprache.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h3 className="font-geist text-refined-gold text-sm tracking-widest uppercase mb-4">Der falsche Filter</h3>
              <p>
                Weil dein Auftritt nicht deine wahre Tiefe spiegelt, ziehst du oft Menschen an, denen du erst mühsam erklären musst, warum du anders (und teurer) bist als der Rest. Du bist müde davon, in Erstgesprächen Überzeugungsarbeit leisten zu müssen, weil deine Website ihren Job nicht macht.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <h3 className="font-geist text-refined-gold text-sm tracking-widest uppercase mb-4">Die Isolation</h3>
              <p>
                Du weißt, was du kannst. Deine bestehenden Kunden wissen es auch. Aber der Außenwelt dein wahres Potenzial zu zeigen, fühlt sich schwer an. Du bist ein Meister in deinem Handwerk. Aber im Marketing-Lärm fühlst du dich fremd.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 3: TRANSFORMATION & VISION */}
      <section className="bg-warm-canvas py-24 md:py-40 px-6 relative overflow-hidden flex flex-col items-center">
        {/* Subtile Gold Glow Hintergrund Dekor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-refined-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <ScrollReveal>
            <div className="text-refined-gold mb-8">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-instrument text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] text-deep-charcoal mb-8">
              Fülle im Herzen. <br className="md:hidden"/> Fülle auf dem Konto.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-satoshi text-warm-steel text-xl md:text-2xl leading-relaxed mb-8">
              Wir glauben tief daran: Beide Welten gehören zusammen. Nur wenn du wirtschaftlich tragfähig und frei bist, kannst du in tiefer Anbindung, Liebe und Kreativität wirken. Als Freigeister wissen wir, was es heißt, weltweite Freiheit zu spüren und selbstbestimmt zu agieren – und wir glauben fest daran, dass alles möglich ist.
            </p>
            <p className="font-satoshi text-warm-steel text-xl md:text-2xl leading-relaxed">
              Stell dir vor, du wachst auf, egal wo auf der Welt — und dein Auftritt arbeitet <i>für</i> dich. Jeder, der deine Seite betritt, spürt den wahren Wert deiner Arbeit. Wir nehmen den Druck von deinen Schultern. Du bleibst in deiner kreativen Genie-Zone, und wir bauen das Fundament, das dich finanziell und räumlich frei macht.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3.5: DAS NETZWERK & DER FIT (Redesign) */}
      <section className="bg-[#050505] text-pure-surface py-32 md:py-48 px-6 relative overflow-hidden z-20">
        
        {/* Soft Dusk Transitions */}
        <div className="absolute top-0 left-0 w-full h-[200px] md:h-[300px] bg-gradient-to-b from-warm-canvas to-[#050505] z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[200px] md:h-[300px] bg-gradient-to-t from-pure-surface to-[#050505] z-10 pointer-events-none" />
        
        {/* Subtle Ethereal Noise & Glow */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <div className="absolute -left-[20vw] top-[20%] w-[60vw] h-[60vw] bg-refined-gold/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Visual Bento/Collage Area */}
            <div className="lg:col-span-7 relative h-[600px] md:h-[800px] w-full group">
              {/* Primary Image: Weltweite Freiheit */}
              <ScrollReveal className="absolute top-0 right-0 w-[80%] h-[75%] rounded-[2.5rem] bg-black/[0.05] p-3 border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.4)] z-10 hover:-translate-y-2 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                 <div className="relative w-full h-full rounded-[calc(2.5rem-0.75rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                   <Image 
                     src="/Bilder Sabala/14 - 56_CH_Sehnde_.jpg" 
                     alt="Weltweite Freiheit" 
                     fill 
                     className="object-cover opacity-80 filter grayscale hover:grayscale-0 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/90 via-transparent to-transparent"></div>
                   <div className="absolute bottom-8 left-8 right-8">
                      <p className="font-geist text-xs tracking-[0.2em] uppercase text-refined-gold mb-2 drop-shadow-md">Die Vision</p>
                      <h3 className="font-instrument text-3xl md:text-4xl text-white drop-shadow-lg">Weltweite Freiheit.</h3>
                      <p className="font-satoshi text-warm-steel mt-2 drop-shadow-md">Ein Business-Setup, das sich deinem Leben anpasst — nicht umgekehrt.</p>
                   </div>
                 </div>
              </ScrollReveal>

              {/* Secondary Image: Tiefe */}
              <ScrollReveal delay={0.2} className="absolute bottom-0 left-0 w-[55%] h-[55%] rounded-[2.5rem] bg-black/[0.05] p-3 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-20 hover:-translate-y-2 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                 <div className="relative w-full h-full rounded-[calc(2.5rem-0.75rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                   <Image 
                     src="/images/nature_freedom_sabala.png" 
                     alt="Tiefes Wirken" 
                     fill 
                     className="object-cover opacity-90 transition-all duration-[1500ms] group-hover:scale-105 ease-[cubic-bezier(0.16,1,0.3,1)]"
                   />
                   <div className="absolute inset-0 bg-[#050505]/40 mix-blend-overlay"></div>
                   <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-gradient-to-t from-deep-charcoal/80 to-transparent">
                     <span className="font-instrument text-2xl md:text-3xl italic text-white/90 drop-shadow-md translate-y-6">Ortsunabhängig wirken.</span>
                   </div>
                 </div>
              </ScrollReveal>
            </div>

            {/* Text Content */}
            <div className="lg:col-span-5 relative z-30">
              <ScrollReveal>
                <div className="inline-block px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                   <span className="font-geist text-[0.65rem] md:text-sm tracking-[0.2em] uppercase text-white/70 font-medium">Der Mentoring Ansatz</span>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.1}>
                <h2 className="font-instrument text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] mb-8 text-white">
                  Mehr als ein Dienstleister. <br />
                  <span className="italic text-refined-gold">Ein Netzwerk mit Impact.</span>
                </h2>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <div className="space-y-6 font-satoshi text-warm-steel text-lg md:text-xl leading-[1.6] mb-12">
                  <p>
                    Wir kreieren nicht nur Websites. Wir bündeln Menschen mit Kraft, guten Werten und der Bereitschaft, einen positiven Impact in der Welt zu hinterlassen. Uns geht es um eine gemeinsame Bewegung, in der sich bewusste Unternehmer gegenseitig stärken.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="group relative p-[1px] rounded-[2rem] bg-transparent overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-refined-gold/30 rounded-[2rem]"></div>
                  <div className="relative bg-[#0A0A0A] p-8 md:p-10 rounded-[calc(2rem-1px)] h-full overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-refined-gold/10 blur-[50px] rounded-full group-hover:bg-refined-gold/20 transition-all duration-700"></div>
                    <h4 className="font-instrument text-3xl text-white mb-4 relative z-10">Bist du der Richtige für uns?</h4>
                    <p className="font-satoshi text-warm-steel text-lg leading-relaxed relative z-10">
                      Wir suchen keine schnellen Projekte. Wir suchen Partner, die bereit sind, diesen Weg mit unseren tiefen Werten von Freiheit, Liebe und echtem Wachstum gemeinsam zu gehen.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 4: TIMELINE / FAHRPLAN */}
      <section className="bg-pure-surface py-24 md:py-40 px-6 border-y border-whisper-border relative overflow-hidden">
        <GoldDust />
        <div className="max-w-[1200px] mx-auto text-center mb-24 md:mb-40 relative z-10">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(2.5rem,4vw,4rem)] text-deep-charcoal mb-4">Der Fahrplan</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-satoshi text-warm-steel text-[1.125rem]">Sieben intensive Schritte zu deinem neuen Fundament.</p>
          </ScrollReveal>
        </div>

        <div className="max-w-[1200px] mx-auto relative pb-24">
          
          <FootprintPath />
          
          <div className="space-y-16 md:space-y-24 relative z-10">
            {/* Schritt 01 (Links) */}
            <div className="flex flex-col md:flex-row relative w-full">
              <div className="md:w-1/2 flex justify-start md:justify-end md:pr-20 lg:pr-24 relative pl-12 md:pl-0 z-10 w-full">
                <div className="w-full max-w-[480px]">
                  <Timeline3DBox isLeft={true}>
                    <span className="block font-instrument text-[3.5rem] md:text-[4rem] text-refined-gold opacity-50 leading-none mb-3">01</span>
                    <h4 className="font-instrument text-2xl md:text-3xl text-deep-charcoal mb-4">Personal Brand Interview</h4>
                    <p className="font-satoshi text-warm-steel leading-[1.65]">
                      Wir tauchen in deine Geschichte, deine Werte und deine Vision ein. Wir finden deine Kernbotschaft und nutzen ab jetzt exakt deine Sprache — denn im Kern geht es um den authentischen Ausdruck deiner echten Identität.
                    </p>
                  </Timeline3DBox>
                </div>
              </div>
            </div>
            
            {/* Schritt 02 (Rechts) */}
            <div className="flex flex-col md:flex-row relative w-full">
              <div className="md:w-1/2 mt-8 md:mt-0 md:ml-auto flex justify-start md:pl-20 lg:pl-24 relative pl-12 z-10 w-full">
                <div className="w-full max-w-[480px]">
                  <Timeline3DBox isLeft={false}>
                    <span className="block font-instrument text-[3.5rem] md:text-[4rem] text-refined-gold opacity-50 leading-none mb-3">02</span>
                    <h4 className="font-instrument text-2xl md:text-3xl text-deep-charcoal mb-4">Positionierung & Angebot</h4>
                    <p className="font-satoshi text-warm-steel leading-[1.65]">
                      Wir definieren, wofür du stehst, wen du ansprichst und was du anbietest. Klare Positionierung, klares Angebot, klare Kommunikation — in einer Sprache, die deine Zielgruppe wirklich versteht.
                    </p>
                  </Timeline3DBox>
                </div>
              </div>
            </div>

            {/* Schritt 03 (Links) */}
            <div className="flex flex-col md:flex-row relative w-full">
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-start md:justify-end md:pr-20 lg:pr-24 relative pl-12 md:pl-0 z-10 w-full">
                <div className="w-full max-w-[480px]">
                  <Timeline3DBox isLeft={true}>
                    <span className="block font-instrument text-[3.5rem] md:text-[4rem] text-refined-gold opacity-50 leading-none mb-3">03</span>
                    <h4 className="font-instrument text-2xl md:text-3xl text-deep-charcoal mb-4">Brand-Strategie & Customer Journey</h4>
                    <p className="font-satoshi text-warm-steel leading-[1.65]">
                      Wir entwickeln eine klare Strategie für dein gesamtes Business: Vom ersten Touchpoint auf Social Media über den Weg auf deine Website bis zum Kennenlerngespräch. Jeder Schritt ist durchdacht.
                    </p>
                  </Timeline3DBox>
                </div>
              </div>
            </div>

            {/* Schritt 04 (Rechts) */}
            <div className="flex flex-col md:flex-row relative w-full">
              <div className="md:w-1/2 mt-8 md:mt-0 md:ml-auto flex justify-start md:pl-20 lg:pl-24 relative pl-12 z-10 w-full">
                <div className="w-full max-w-[480px]">
                  <Timeline3DBox isLeft={false}>
                    <span className="block font-instrument text-[3.5rem] md:text-[4rem] text-refined-gold opacity-50 leading-none mb-3">04</span>
                    <h4 className="font-instrument text-2xl md:text-3xl text-deep-charcoal mb-4">Brand Design (Fleur)</h4>
                    <p className="font-satoshi text-warm-steel leading-[1.65]">
                      Fleur entwickelt deine visuelle Identität — Farben, Typografie, Bildsprache. Alles abgestimmt auf deine Persönlichkeit. Es geht nicht nur darum, was gut aussieht, sondern was sich für dich <i className="opacity-70">richtig</i> anfühlt.
                    </p>
                  </Timeline3DBox>
                </div>
              </div>
            </div>

            {/* Schritt 05 (Links) */}
            <div className="flex flex-col md:flex-row relative w-full">
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-start md:justify-end md:pr-20 lg:pr-24 relative pl-12 md:pl-0 z-10 w-full">
                <div className="w-full max-w-[480px]">
                  <Timeline3DBox isLeft={true}>
                    <span className="block font-instrument text-[3.5rem] md:text-[4rem] text-refined-gold opacity-50 leading-none mb-3">05</span>
                    <h4 className="font-instrument text-2xl md:text-3xl text-deep-charcoal mb-4">Premium-Erlebnis-Website</h4>
                    <p className="font-satoshi text-warm-steel leading-[1.65]">
                      Wir bauen eine Website, die vom ersten Moment begeistert. Mit eleganten Animationen, modernem Aufbau und Texten, die nach dir klingen. Ein digitales Wohnzimmer, in dem man bleiben möchte.
                    </p>
                  </Timeline3DBox>
                </div>
              </div>
            </div>

            {/* Schritt 06 (Rechts) */}
            <div className="flex flex-col md:flex-row relative w-full">
              <div className="md:w-1/2 mt-8 md:mt-0 md:ml-auto flex justify-start md:pl-20 lg:pl-24 relative pl-12 z-10 w-full">
                <div className="w-full max-w-[480px]">
                  <Timeline3DBox isLeft={false}>
                    <span className="block font-instrument text-[3.5rem] md:text-[4rem] text-refined-gold opacity-50 leading-none mb-3">06</span>
                    <h4 className="font-instrument text-2xl md:text-3xl text-deep-charcoal mb-4">Content, SEO & Technik (Christopher)</h4>
                    <p className="font-satoshi text-warm-steel leading-[1.65]">
                      Du lehnst dich zurück. Christopher richtet High-End Hosting ein, sichert Datenschutz ab und optimiert die Ladezeiten. Parallel setzen wir SEO-Grundsteine für langfristige Sichtbarkeit.
                    </p>
                  </Timeline3DBox>
                </div>
              </div>
            </div>

            {/* Schritt 07 (Links) */}
            <div className="flex flex-col md:flex-row relative w-full">
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-start md:justify-end md:pr-20 lg:pr-24 relative pl-12 md:pl-0 z-10 w-full">
                <div className="w-full max-w-[480px]">
                  <Timeline3DBox isLeft={true}>
                    <span className="block font-instrument text-[3.5rem] md:text-[4rem] text-refined-gold opacity-50 leading-none mb-3">07</span>
                    <h4 className="font-instrument text-2xl md:text-3xl text-deep-charcoal mb-4">1 Jahr Begleitung (Guidance)</h4>
                    <p className="font-satoshi text-warm-steel leading-[1.65]">
                      Wir lassen dich nicht allein. Auch nach Go-Live bleiben wir für dich erreichbar bei Fragen und nehmen entspannt Anpassungen vor, wenn sich im Nachgang im Prozess Dinge klären oder wandeln. Wir sind dein präsenter Ansprechpartner.
                    </p>
                  </Timeline3DBox>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 5: Scope of Work / High-End Bento Grid */}
      <section className="bg-[#050505] py-24 md:py-40 px-6 relative overflow-hidden">
         {/* Soft Dusk Transitions */}
         <div className="absolute top-0 left-0 w-full h-[200px] md:h-[300px] bg-gradient-to-b from-pure-surface to-[#050505] z-10 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-full h-[200px] md:h-[300px] bg-gradient-to-t from-warm-canvas to-[#050505] z-10 pointer-events-none" />
         {/* Subtle premium background glow */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-refined-gold/5 blur-[150px] rounded-full pointer-events-none" />
         
         <div className="max-w-[1200px] mx-auto relative z-10">
            <ScrollReveal>
              <h2 className="font-instrument text-[clamp(2.5rem,4vw,3.5rem)] text-white text-center mb-16 md:mb-24">
                Was in deiner Investition <br className="hidden md:block"/> <span className="text-refined-gold/80 italic">alles enthalten ist.</span>
              </h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
                {[
                  { title: "Positionierung & Botschaft", desc: "Tiefeninterview, Brand Voice und Texte, die exakt nach dir klingen.", class: "md:col-span-2 lg:col-span-2 relative overflow-hidden group" },
                  { title: "Brand Design Book", desc: "Farbpalette, Typografie, Logo, Bildsprache. Vollständig ausgearbeitet.", class: "group relative overflow-hidden" },
                  { title: "Erlebnis-Website", desc: "5-8 Seiten. Individuell designt, animiert, optimiert. Keine Templates.", class: "md:col-span-1 lg:col-span-1 group relative overflow-hidden" },
                  { title: "SEO-Fundament", desc: "Keyword-Strategie und 3 tiefgründige Blogartikel zum Start deines Traffics.", class: "md:col-span-2 lg:col-span-2 group relative overflow-hidden" },
                  { title: "Social Media Setup", desc: "15 Vorlagen im neuen Design für LinkedIn & Instagram. Ready to post.", class: "md:col-span-2 lg:col-span-2 group relative overflow-hidden" },
                  { title: "Recht & Technik", desc: "Impressum, DSGVO, Hosting-Setup, High-End PageSpeed.", class: "group relative overflow-hidden" },
                  { title: "1 Jahr Begleitung", desc: "Wir warten deine Website, pflegen Änderungen ein und sorgen für mentale Entlastung.", class: "md:col-span-2 lg:col-span-3 min-h-[300px] group relative overflow-hidden bg-gradient-to-br from-white/5 to-transparent border-refined-gold/20" }
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.1} className={item.class}>
                    <div className="absolute inset-0 bg-white/[0.03] transition-colors duration-500 group-hover:bg-white/[0.06] rounded-[2rem]" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 rounded-[2rem]" />
                    <div className="h-full p-8 md:p-10 rounded-[2rem] border border-white/[0.08] flex flex-col justify-end relative z-10 hover:-translate-y-2 transition-transform duration-700 ease-out">
                      {item.class?.includes("min-h-") && (
                         <div className="absolute top-10 right-10 w-32 h-32 bg-refined-gold/20 blur-[60px] rounded-full group-hover:bg-refined-gold/40 transition-colors duration-1000" />
                      )}
                      
                      <div className="mb-6 flex flex-col items-start translate-y-2 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                        <div className="relative w-12 h-16 mb-2 opacity-70 group-hover:opacity-100 transition-opacity duration-700">
                          <Image 
                            src="/images/Schwebender Kristall mit goldenen Einschlüssen.png" 
                            alt="Sabala Kristall" 
                            fill
                            className="object-contain group-hover:drop-shadow-[0_0_12px_rgba(184,150,62,0.8)] transition-all duration-700"
                          />
                        </div>
                        <div className="w-10 h-[1px] bg-refined-gold/50 group-hover:w-24 group-hover:bg-refined-gold transition-all duration-700 ease-out" />
                      </div>
                      <h3 className="font-instrument text-2xl md:text-3xl text-white mb-3 tracking-wide">{item.title}</h3>
                      <p className="font-satoshi text-warm-steel leading-relaxed">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
            </div>
         </div>
      </section>

      {/* SECTION 5.5: Das Herzstück - Brand Identity & About Me */}
      <section className="bg-warm-canvas py-32 md:py-48 px-6 relative overflow-hidden border-t border-whisper-border">
        
        {/* Custom Animation for the slow breathing heart */}
        <style>{`
          @keyframes breathe-heart {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
        `}</style>

        {/* Editorial Torn Paper Artwork */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
          
          <div 
            className="relative w-[600px] h-[600px] md:w-[900px] md:h-[900px]"
            style={{ animation: 'breathe-heart 10s ease-in-out infinite' }}
          >
            {/* The UNDERLYING Layer: Warm texture & Human Silhouette */}
            <div className="absolute inset-0 z-0 bg-warm-canvas">
               {/* Gentle Gold Gradient glowing from the center */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(184,150,62,0.12)_0%,_transparent_60%)]" />
               
               {/* Minimalist Geometric Human Silhouette (Vitruvian Style) */}
               {/* Soft Stone #B5B0A8 at 20-30% opacity */}
               <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-25" viewBox="0 0 600 600">
                  {/* Universal Circles */}
                  <circle cx="300" cy="300" r="220" stroke="#B5B0A8" fill="none" strokeWidth="0.5" strokeDasharray="4 8" />
                  <circle cx="300" cy="300" r="180" stroke="#B8963E" fill="none" strokeWidth="0.5" strokeOpacity="0.4" />
                  
                  {/* Center Line (Consciousness Axis) */}
                  <line x1="300" y1="40" x2="300" y2="560" stroke="#B5B0A8" strokeWidth="0.5" strokeOpacity="0.5" strokeDasharray="2 4"/>
                  
                  {/* Human Figure (Abstract Geometry) */}
                  <circle cx="300" cy="180" r="30" stroke="#B5B0A8" fill="none" strokeWidth="1.5" /> {/* Head */}
                  <line x1="300" y1="210" x2="300" y2="420" stroke="#B5B0A8" strokeWidth="1" /> {/* Spine */}
                  <path d="M 120 280 C 200 250 250 210 300 230 C 350 210 400 250 480 280" stroke="#B5B0A8" fill="none" strokeWidth="1" /> {/* Arms sweeping up/out */}
                  <path d="M 160 520 L 300 420 L 440 520" stroke="#B5B0A8" fill="none" strokeWidth="1" /> {/* Legs */}
               </svg>
            </div>

            {/* The TOP Layer: The Torn Paper Canvas */}
            <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 800 800">
              <defs>
                {/* Filter for the rough, torn paper edge */}
                <filter id="editorial-tear" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" result="displaced" />
                </filter>
                
                {/* Subtly asymmetrical, irregular heart opening */}
                <path id="organic-heart" d="M 410 280 C 340 180 210 200 200 360 C 190 500 360 620 440 680 C 580 540 690 440 640 290 C 600 160 480 200 410 280 Z" />
                
                {/* Mask to reveal the hole */}
                <mask id="paper-mask">
                  {/* Everything white is visible (the paper) */}
                  <rect width="800" height="800" fill="white" />
                  {/* The heart hole is black (turns it transparent to show the human layer below) */}
                  <use href="#organic-heart" fill="black" filter="url(#editorial-tear)" />
                </mask>
              </defs>

              {/* The solid paper surface (Base Color) matching the background seamlessly */}
              <rect width="800" height="800" fill="#FAF8F5" mask="url(#paper-mask)" />
              
              {/* Paper Drop Shadows falling INTO the hole onto the layer below */}
              {/* By drawing a stroke along the path, outer half is hidden by paper mask, inner half casts shadow into the hole! */}
              <use href="#organic-heart" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="20" filter="url(#editorial-tear) blur(10px)" opacity="0.8" />
              <use href="#organic-heart" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="40" filter="url(#editorial-tear) blur(25px)" opacity="0.7" />
              
              {/* Physical tearing details: subtle white fiber edge simulation at the tear */}
              <use href="#organic-heart" fill="none" stroke="#FFFFFF" strokeWidth="5" filter="url(#editorial-tear)" opacity="0.9" />
              <use href="#organic-heart" fill="none" stroke="#DCD6CD" strokeWidth="2" filter="url(#editorial-tear)" opacity="0.5" transform="translate(1,1)" />
            </svg>
            
          </div>
        </div>
        
        <div className="max-w-[1000px] mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <ScrollReveal yOffset={60} margin="0px 0px -40% 0px">
              <div className="flex flex-col items-center mb-8">
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-refined-gold/80 mb-6" />
                <span className="text-refined-gold font-geist tracking-[0.3em] uppercase text-xs md:text-sm font-medium">Das wahre Herzstück</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal yOffset={70} margin="0px 0px -40% 0px" delay={0.15}>
              <h2 className="font-instrument text-[clamp(2.5rem,5vw,5.5rem)] text-deep-charcoal leading-[1.05] mb-12">
                Deine <span className="italic text-refined-gold">Identität</span> als<br className="hidden md:block" /> unkopierbare Kraft.
              </h2>
            </ScrollReveal>

            <ScrollReveal yOffset={80} margin="0px 0px -40% 0px" delay={0.3} className="max-w-[700px]">
              <p className="font-satoshi text-warm-steel text-[1.25rem] md:text-[1.4rem] leading-[1.7] mb-8">
                In Zeiten von KI und austauschbaren Inhalten ist deine Persönlichkeit das Einzige, was nicht reproduzierbar ist. Deshalb ist deine eigene Sprache und vor allem die <strong className="text-deep-charcoal font-semibold">„Über Mich“-Sektion</strong> die wichtigste Schnittstelle der Zukunft.
              </p>
              <p className="font-satoshi text-warm-steel text-[1.25rem] md:text-[1.4rem] leading-[1.7]">
                Wir erschaffen für dich eine absolut einzigartige Bühne, die dich als nahbaren Menschen verkörpert. Deine Seele und dein Bewusstsein werden auf der gesamten Seite spürbar sein – perfekt verwoben mit den immersiven Erlebnis-Elementen, damit sich jeder Besucher intuitiv mit dir verbunden fühlt.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 6: Investition & CTA */}
      <section id="contact" className="relative py-32 md:py-48 px-6 text-center overflow-hidden">
        {/* Soft Dusk Transitions overlapping the image */}
        <div className="absolute top-0 left-0 w-full h-[200px] md:h-[300px] bg-gradient-to-b from-warm-canvas to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[200px] md:h-[300px] bg-gradient-to-t from-warm-canvas to-transparent z-20 pointer-events-none" />
        {/* Full background image */}
        <div className="absolute inset-0 z-0 scale-105">
          <Image 
            src="/images/Wohnzimmer Berge.jpeg"
            alt="Wohnzimmer Berge - Raum zum Wohlfühlen"
            fill
            className="object-cover object-center translate-y-[-10%]"
          />
        </div>
        
        {/* Sophisticated overlays for readability and premium feel */}
        <div className="absolute inset-0 bg-[#050505]/60 sm:bg-[#050505]/40 backdrop-blur-[2px] z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80 z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#050505]/90 via-transparent to-transparent z-0" />

        <div className="max-w-[800px] mx-auto relative z-10 flex flex-col items-center">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(3rem,5vw,5rem)] text-white leading-[1.1] mb-8 drop-shadow-2xl">
              Die Investition in <br className="hidden md:block"/> <span className="italic text-refined-gold">dein Fundament</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="font-satoshi text-white/90 text-xl md:text-2xl leading-relaxed mb-6 drop-shadow-md">
              Es ist nicht nur ein reines Business-Fundament — wir erschaffen für dich einen Raum, in dem du dich absolut wohlfühlst, entspannen und als Marke strahlen kannst.
            </p>
            <p className="font-satoshi text-white/80 text-lg md:text-xl leading-relaxed mb-12 drop-shadow-md">
              Qualität braucht Tiefe, Zeit und absolute Präzision. Wir nehmen nur wenige Projekte gleichzeitig an, um dir unsere volle Energie zu widmen. <br/><br/>
              <span className="font-medium text-white tracking-widest uppercase text-sm border-b border-refined-gold/50 pb-1">Investition auf Anfrage.</span>
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col items-center gap-6 pt-4">
              <Link 
                href="#calendly" 
                className="bg-refined-gold hover:bg-refined-gold/90 text-[#050505] px-10 md:px-14 py-5 rounded-full font-satoshi font-medium text-lg transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_15px_40px_rgba(184,150,62,0.3)] hover:shadow-[0_20px_60px_rgba(184,150,62,0.5)] flex items-center justify-center gap-3 w-full md:w-auto"
              >
                Kennenlerngespräch vereinbaren
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
              <span className="text-white/60 font-geist text-sm uppercase tracking-widest drop-shadow-md">Unverbindlicher 30-Minuten-Call mit Sabala</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 7: FAQ - Premium Light Accordion */}
      <section className="bg-warm-canvas py-24 md:py-40 px-6 relative border-t border-whisper-border">
        <div className="max-w-[800px] mx-auto relative z-10">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(2.5rem,4vw,3.5rem)] text-deep-charcoal mb-16 text-center">
              Häufige <span className="italic text-refined-gold">Fragen</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {[
              { q: "Wie lange dauert der gesamte Prozess?", a: "Die intensivste Phase dauert rund 16 Wochen. Hier arbeiten wir an Positionierung, Design und Website in enger Absprache mit dir." },
              { q: "Brauche ich vorher schon eine klare Positionierung?", a: "Nein, genau das erarbeiten wir gemeinsam in Phase 1 und 2. Das ist der wichtigste Baustein für alles, was folgt – wir kümmern uns um deine Identität." },
              { q: "Was passiert, wenn sich mein Angebot nach dem Launch ändert?", a: "Dafür ist unsere Jahres-Guidance da! Wir passen die Seite an, wenn sich dein Business organisch entwickelt. Wir bleiben stets erreichbar im Hintergrund." },
              { q: "Kann ich auch nur die Website ohne Branding buchen?", a: "Generell arbeiten wir am liebsten ganzheitlich. Falls du jedoch bereits ein hochprofessionelles Branding besitzt, lass uns im Call klären, ob wir der richtige Premium-Partner für die reine Umsetzung sind." },
            ].map((faq, i) => (
              <ScrollReveal key={i} delay={0.1}>
                 <details className="group border-b border-black-[0.05] border-warm-steel/20 pb-8 overflow-hidden marker:hidden cursor-pointer transition-colors duration-500 hover:border-refined-gold/50">
                    <summary className="font-instrument text-2xl md:text-3xl text-deep-charcoal flex justify-between items-center list-none pr-4 outline-none">
                      <span className="group-hover:translate-x-2 transition-transform duration-500 ease-out">{faq.q}</span>
                      <span className="text-refined-gold transition-transform duration-500 group-open:rotate-45 ml-4 text-3xl font-light scale-150 group-open:scale-100">+</span>
                    </summary>
                    <div className="font-satoshi text-warm-steel mt-8 pr-12 leading-relaxed text-lg md:text-xl pb-2 border-l border-refined-gold/30 pl-6 ml-2 bg-white/30 rounded-r-2xl p-4 shadow-sm">
                       {faq.a}
                    </div>
                 </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
