import Image from "next/image";
import Link from "next/link";
import { InlineFrameSequence } from "@/components/ui/InlineFrameSequence";
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
                <span className="italic text-refined-gold">Von der Essenz bis zur Erlebnis-Website.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-satoshi text-warm-steel text-lg leading-relaxed max-w-[520px]">
                Wir schleifen dich nicht. Wir gehen aus dem Inneren heraus und stellen deinen ungeschliffenen Diamanten ins Licht. Genau dort entsteht echte Strahlkraft — wertvoller als jeder perfekt geschliffene Auftritt.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <div className="mt-12 flex">
                <Link href="#tiefenwirkung" className="w-14 h-14 rounded-full border border-warm-steel/20 flex items-center justify-center text-warm-steel hover:text-refined-gold hover:border-refined-gold/50 hover:bg-refined-gold/5 transition-all duration-300 group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-1 transition-transform duration-300"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                </Link>
              </div>
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

      {/* SECTION 2: PAIN */}
      <section id="tiefenwirkung" className="bg-night-foundation py-24 md:py-40 px-6">
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

      {/* SECTION 3: FÜLLE IM HERZEN */}
      <section className="bg-warm-canvas py-32 md:py-48 px-6 relative overflow-hidden flex flex-col items-center text-center">
        {/* Subtile Gold Glow Hintergrund Dekor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-refined-gold/10 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-[800px] mx-auto relative z-10 flex flex-col items-center">
            
            <ScrollReveal delay={0.1} className="flex flex-col items-center">
              <div className="relative w-16 h-20 mb-8 opacity-90 drop-shadow-[0_0_15px_rgba(184,150,62,0.4)]">
                <Image 
                  src="/images/sabala-kristall.png" 
                  alt="Sabala Kristall" 
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-deep-charcoal mb-10">
                Fülle im Herzen.<br />Fülle auf <span className="italic text-refined-gold">dem Konto.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="space-y-6">
              <p className="font-satoshi text-deep-charcoal text-xl md:text-2xl leading-[1.6]">
                Eigentlich sehnst du dich danach, wundervolle Arbeit zu leisten und in echter Verbundenheit zu wirken – und damit finanziell völlig frei zu sein.
              </p>
              <p className="font-satoshi text-warm-steel text-lg md:text-[1.3rem] leading-[1.6] max-w-[750px] mx-auto mb-2">
                Doch die Realität? Ohne einen professionellen, fühlbaren Auftritt verpufft die beste Expertise oft in der Masse. Alles im Alleingang aufzubauen, kostet dich am Ende nur unverhältnismäßig viel Zeit, wertvolle Energie und Nerven.
              </p>
              
              <div className="w-16 h-[1px] bg-refined-gold/30 mx-auto my-10"></div>
              
              <p className="font-satoshi text-deep-charcoal font-medium text-xl md:text-2xl leading-[1.6] max-w-[750px] mx-auto">
                Genau an diesem Punkt übernehmen wir.
              </p>
              <p className="font-satoshi text-warm-steel text-lg md:text-[1.3rem] leading-[1.6] max-w-[750px] mx-auto mb-12">
                Wir nehmen dir die gesamte strategische und technische Last ab, die dich jetzt noch zurückhält. Du findest zurück in deine totale kreative Flow-Zone – während wir dir eine exklusive Premium-Plattform erschaffen, die im Hintergrund unermüdlich für dich arbeitet und deine Vision endlich wirtschaftlich kraftvoll übersetzt.
              </p>
              
              <div className="flex flex-col items-center pt-8 border-t border-refined-gold/10 max-w-[500px] mx-auto">
                <Link 
                  href="/termin-buchen"
                  className="bg-deep-charcoal text-pure-surface px-10 md:px-12 py-4 rounded-full font-satoshi font-medium text-lg transition-transform duration-500 hover:scale-105 shadow-[0_15px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] inline-flex items-center gap-3 group"
                >
                  Kostenfreien Termin buchen
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </div>
            </ScrollReveal>
            
        </div>
      </section>

      
      {/* SECTION 4: Identity & Herzstück */}
      <section className="bg-warm-canvas py-32 md:py-48 px-6 relative overflow-hidden border-t border-whisper-border">
        {/* Crystal Background Art */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center opacity-30 mix-blend-multiply">
            <SlowVideo 
              src="/videos/Kristall.mp4" 
              playbackRate={0.6}
              className="w-full h-full object-contain mix-blend-multiply opacity-50 animate-[float_8s_ease-in-out_infinite]"
              style={{ 
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)'
              }}
            />
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

      
      {/* SECTION 5: Scope of Work (Investition) */}
      <section className="bg-[#050505] py-24 md:py-40 px-6 relative overflow-hidden z-20">
         {/* Soft Dusk Transitions */}
         <div className="absolute top-0 left-0 w-full h-[200px] md:h-[300px] bg-gradient-to-b from-warm-canvas to-transparent z-10 pointer-events-none opacity-50 mix-blend-overlay" />
         
         {/* Subtle premium background glow */}
         <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-refined-gold/5 blur-[150px] rounded-full pointer-events-none" />
         
         <div className="max-w-[1200px] mx-auto relative z-10">
            <ScrollReveal>
              <h2 className="font-instrument text-[clamp(2.5rem,4vw,3.5rem)] text-white text-center mb-16 md:mb-24">
                Was in deiner Investition <br className="hidden md:block"/> <span className="text-refined-gold/80 italic">alles enthalten ist.</span>
              </h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
                {[
                  { title: "Positionierung & Botschaft", desc: "Brand Identity Sessions (2× 90 Min): Personal-Brand-Interview + Strategie. Wir finden Brand Voice und Texte, die exakt nach dir klingen.", class: "md:col-span-2 lg:col-span-2 relative overflow-hidden group" },
                  { title: "Brand Mini-Guide", desc: "Typografie, Farben, Tonalität und Bildsprache. Auf Google Fonts — ohne Lizenz-Risiko. Logo & Branddesign optional als Add-on (Fleur, +1.500 €).", class: "group relative overflow-hidden" },
                  { title: "Erlebnis-Website", desc: "5 bis 12 Seiten je nach Stufe. Individuell designt, animiert, optimiert. Hosting via Vercel · DSGVO · cookie-frei.", class: "md:col-span-1 lg:col-span-1 group relative overflow-hidden" },
                  { title: "SEO & Datenanalyse", desc: "Saubere SEO-Basis und Analyse-Setup. Plus Starter-Blog-Artikel ab Stufe Basis (3 in Basis · monatlich 1 in All-in).", class: "md:col-span-2 lg:col-span-2 group relative overflow-hidden" },
                  { title: "Content & Social-Media", desc: "Newsletter-Welcome-Sequence ab Basis. In All-in zusätzlich: wöchentlich 1 LinkedIn-Karussell, Content-Säulen + Themen-Plan + Vorlagen.", class: "md:col-span-2 lg:col-span-2 group relative overflow-hidden" },
                  { title: "Recht & Technik", desc: "Rechtssicher und DSGVO-konform: Impressum, Datenschutz, kein Cookie-Banner. Hosting-Setup und High-End PageSpeed.", class: "group relative overflow-hidden" },
                  { title: "Begleitung & Pflege", desc: "Pflege ist in jeder Stufe enthalten. Lite: 6 Monate Mini. Basis: 12 Monate Plus + Monatsbericht + Mid-Year-Strategie-Call. All-in: 12 Monate Premium + monatlich Strategie-Call + 4 Event-Landingpages + Quartals-Brand-Guidance.", class: "md:col-span-2 lg:col-span-3 min-h-[300px] group relative overflow-hidden border border-refined-gold/20 shadow-[inset_0_0_80px_rgba(184,150,62,0.03)]" }
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.1} className={item.class}>
                    <div className="absolute inset-0 bg-[#0A0A0A] transition-colors duration-500 group-hover:bg-[#111] rounded-[2rem] border border-white/[0.04]" />
                    <div className="absolute inset-0 bg-gradient-to-br from-refined-gold/[0.02] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 rounded-[2rem]" />
                    <div className="h-full p-8 md:p-10 flex flex-col justify-end relative z-10 hover:-translate-y-2 transition-transform duration-700 ease-out">
                      
                      <div className="mb-6 flex flex-col items-start translate-y-2 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                        <div className="relative w-12 h-16 mb-2 opacity-70 group-hover:opacity-100 transition-opacity duration-700">
                          <Image 
                            src="/images/sabala-kristall.png" 
                            alt="Sabala Kristall" 
                            fill
                            className="object-contain drop-shadow-[0_0_8px_rgba(184,150,62,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(184,150,62,0.6)] transition-all duration-700"
                          />
                        </div>
                        <div className="w-10 h-[1px] bg-refined-gold/30 group-hover:w-24 group-hover:bg-refined-gold/80 transition-all duration-700 ease-out" />
                      </div>
                      <h3 className="font-instrument text-2xl md:text-3xl text-pure-surface mb-3 tracking-wide">{item.title}</h3>
                      <p className="font-satoshi text-warm-steel leading-relaxed">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
            </div>
         </div>
      </section>

      {/* SECTION 6: DER WAHRE NUTZEN (Was am Ende erwartet) */}
      <section className="bg-[#211B13] text-pure-surface py-32 px-6 relative overflow-hidden z-20">
          <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-refined-gold/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-[url('/Bilder%20Sabala/P9282978.jpg')] opacity-[0.03] bg-cover bg-center mix-blend-overlay pointer-events-none"></div>
          
          <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center">
            <ScrollReveal className="text-center">
              <h2 className="font-instrument text-[clamp(2.5rem,4vw,4rem)] text-pure-surface leading-[1.1] mb-8">
                Was dich am Ende <br className="hidden md:block"/> <span className="italic text-refined-gold">wirklich erwartet.</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1} className="w-full text-center">
              <p className="font-satoshi text-pure-surface/80 text-lg md:text-[1.3rem] leading-relaxed max-w-[900px] mx-auto">
                Es geht darum, technologisch mit der Zeit zu gehen – auch wenn du die Technik dahinter nicht selbst durchdringen musst. Du hebst dich mit einer maßgeschneiderten Premium-Plattform deutlich vom Markt ab und etablierst eine Infrastruktur, die im Hintergrund unermüdlich für dich arbeitet, um das nachhaltige Wachstum deines Business zu stützen.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">
                <div className="p-8 rounded-[2rem] bg-[#17130D] border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/[0.02] mix-blend-overlay group-hover:bg-white/[0.04] transition-colors" />
                  <span className="text-refined-gold font-instrument text-5xl mb-6 block relative z-10">01</span>
                  <strong className="block text-pure-surface mb-3 font-instrument text-2xl relative z-10">Exklusivität, die man spürt.</strong>
                  <span className="text-pure-surface/70 leading-relaxed block relative z-10">Keine Baukasten-Ästhetik. Dein Auftritt wird maßgeschneidert designt, elegant animiert und wirkt wie ein High-End Editorial, das dich visuell sofort von 99% des Marktes abhebt.</span>
                </div>
                <div className="p-8 rounded-[2rem] bg-[#17130D] border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/[0.02] mix-blend-overlay group-hover:bg-white/[0.04] transition-colors" />
                  <span className="text-refined-gold font-instrument text-5xl mb-6 block relative z-10">02</span>
                  <strong className="block text-pure-surface mb-3 font-instrument text-2xl relative z-10">Automatisierter Vertrauensaufbau.</strong>
                  <span className="text-pure-surface/70 leading-relaxed block relative z-10">Deine Kunden betreten das Kennenlerngespräch bereits qualifiziert und überzeugt von deinem tiefen Wert. Das mühsame "Überreden" im Verkaufsgespräch entfällt.</span>
                </div>
                <div className="p-8 rounded-[2rem] bg-[#17130D] border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/[0.02] mix-blend-overlay group-hover:bg-white/[0.04] transition-colors" />
                  <span className="text-refined-gold font-instrument text-5xl mb-6 block relative z-10">03</span>
                  <strong className="block text-pure-surface mb-3 font-instrument text-2xl relative z-10">Totale Entlastung im Alltag.</strong>
                  <span className="text-pure-surface/70 leading-relaxed block relative z-10">Durch unser Wartungs- und Technik-Setup im Hintergrund kannst du dich zu 100% auf deine Kernarbeit fokussieren. Hosting, Technik, DSGVO und Backups sichern wir.</span>
                </div>
              </div>
              
              <div className="mt-20 pt-16 border-t border-white/[0.05] flex flex-col items-center">
                <p className="font-satoshi text-pure-surface/70 text-lg mb-8 max-w-[600px] text-center">
                  Fühlst du die Resonanz? Wenn das exakt das Fundament ist, das du dir wünschst, verlier keine Zeit.
                </p>
                <Link 
                  href="/termin-buchen"
                  className="bg-refined-gold hover:bg-refined-gold/90 text-[#050505] px-10 md:px-12 py-4 rounded-full font-satoshi font-medium text-lg transition-all duration-500 hover:scale-105 shadow-[0_15px_40px_rgba(184,150,62,0.2)] hover:shadow-[0_20px_50px_rgba(184,150,62,0.4)] inline-flex items-center gap-3 group"
                >
                  Termin buchen
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </div>
            </ScrollReveal>
          </div>
      </section>

      {/* SECTION 7: TIMELINE / FAHRPLAN */}
      <section className="bg-pure-surface py-24 md:py-40 px-6 relative overflow-hidden">
        {/* Seamless Premium Transition from Dark to Light */}
        <div className="absolute top-0 left-0 w-full h-[150px] md:h-[250px] bg-gradient-to-b from-[#211B13] via-[#211B13]/80 to-transparent z-0 pointer-events-none" />
        
        <GoldDust />
        <div className="max-w-[1200px] mx-auto text-center mb-24 md:mb-40 relative z-10 pt-32 md:pt-40">
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
                    <h4 className="font-instrument text-2xl md:text-3xl text-deep-charcoal mb-4">Brand Mini-Guide <span className="text-warm-steel/60 font-normal text-base align-middle">— Logo optional als Add-on</span></h4>
                    <p className="font-satoshi text-warm-steel leading-[1.65]">
                      Im Hauptpaket inklusive: Typografie, Farben, Tonalität, Bildsprache — alles auf deine Persönlichkeit abgestimmt. Wenn du bereits ein Logo mitbringst, gleiche ich es leicht an deine Markenwelt an. Wenn du noch kein Logo hast, entwickelt Fleur Logo + erstes Branddesign als Add-on (+1.500 €).
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
                    <h4 className="font-instrument text-2xl md:text-3xl text-deep-charcoal mb-4">Launch der Premium-Webseite</h4>
                    <p className="font-satoshi text-warm-steel leading-[1.65]">
                      Deine Seite geht live — Hosting via Vercel, deutsche Edge-Region, DSGVO-konform und cookie-frei. Keine WordPress-Sorgen, keine Plugin-Updates, kein Cookie-Banner. Ich übernehme die technische Pflege komplett.
                    </p>
                    <p className="font-satoshi text-warm-steel/80 leading-[1.65] mt-3 italic text-[0.95rem]">
                      Du wünschst dir WordPress oder einen anderen Stack? Dann gibt&apos;s ein individuelles Angebot via Beratungsgespräch.
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
                    <h4 className="font-instrument text-2xl md:text-3xl text-deep-charcoal mb-4">Begleitung & Pflege</h4>
                    <p className="font-satoshi text-warm-steel leading-[1.65] mb-3">
                      Wir lassen dich nicht allein. Pflege, Updates und Begleitung sind in jeder Stufe enthalten — die Tiefe variiert je nach Paket:
                    </p>
                    <ul className="font-satoshi text-warm-steel leading-[1.65] space-y-2 text-[0.95rem]">
                      <li>· <strong className="text-deep-charcoal">Lite:</strong> 6 Monate Mini-Pflege (Anpassungen + Hosting)</li>
                      <li>· <strong className="text-deep-charcoal">Basis:</strong> 12 Monate Plus + Monatsbericht + 1× Mid-Year-Strategie-Call</li>
                      <li>· <strong className="text-deep-charcoal">All-in:</strong> 12 Monate Premium + monatlich Strategie-Call + 4 Event-Landingpages + Quartals-Brand-Guidance</li>
                    </ul>
                  </Timeline3DBox>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 8: DAS TEAM (Trio) */}
      <section className="py-24 md:py-40 px-6 sm:px-12 md:px-24 bg-pure-surface border-t border-whisper-border relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-8">
              <div>
                <h2 className="font-instrument text-[clamp(2.5rem,4vw,3.5rem)] text-deep-charcoal mb-4">
                  Ein Team. Drei Disziplinen.
                </h2>
                <p className="font-satoshi text-warm-steel text-lg max-w-[500px]">
                  Wir sind keine klassische Agentur. Wir sind eine kuratierte Allianz aus Spezialisten, die ihre handwerkliche Meisterschaft bündeln.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 gap-y-16">
            
            {/* PERSON 1 */}
            <ScrollReveal delay={0.1}>
              <div className="relative aspect-[3/4] w-full rounded-[24px] overflow-hidden mb-6 group cursor-pointer border border-[#EBEAE5] shadow-[0_20px_40px_rgba(26,26,24,0.04)]">
                <div className="absolute inset-0 bg-[#F5F3ED] animate-[pulse_3s_ease-in-out_infinite]" />
                {/* Crisp Golden Hover Filter */}
                <div className="absolute inset-0 bg-refined-gold mix-blend-overlay z-10 opacity-40 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-night-foundation mix-blend-multiply z-10 opacity-20 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 z-0">
                  <Image src="/images/Das-Team-Sabala.jpg" alt="Sabala" fill className="object-cover object-[75%_30%] w-full h-full grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                </div>
                
                {/* Hover Text in Image */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 pointer-events-none flex items-end">
                  <p className="text-pure-surface font-satoshi text-sm md:text-base leading-snug">Gründer von Sabala Mentoring & Connecting Herzkreative</p>
                </div>
              </div>
              <h3 className="font-instrument text-2xl lg:text-3xl text-deep-charcoal">Ilja 'Sabala'</h3>
              <p className="font-mono text-xs lg:text-sm text-refined-gold tracking-wider uppercase my-3 border-b border-refined-gold/20 pb-2 inline-block">Essenz & Strategie</p>
              <p className="font-satoshi text-warm-steel leading-[1.65]">Von der Essenz über die Positionierung bis zur strategischen Customer Journey. Ich tauche tief in deine Vision ein und übersetze sie in ein Fundament, das trägt.</p>
            </ScrollReveal>

            {/* PERSON 2 */}
            <ScrollReveal delay={0.2} className="md:translate-y-12">
              <div className="relative aspect-[3/4] w-full rounded-[24px] overflow-hidden mb-6 group cursor-pointer border border-[#EBEAE5] shadow-[0_20px_40px_rgba(26,26,24,0.04)]">
                <div className="absolute inset-0 bg-[#E8E6DF] animate-[pulse_3s_ease-in-out_infinite_animation-delay-500ms]" />
                <div className="absolute inset-0 bg-refined-gold mix-blend-overlay z-10 opacity-40 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-night-foundation mix-blend-multiply z-10 opacity-20 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 z-0">
                  <Image src="/images/Das-Team-Fleur.png" alt="Fleur" fill className="object-cover w-full h-full grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                </div>
                
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 pointer-events-none flex items-end">
                  <p className="text-pure-surface font-satoshi text-sm md:text-base leading-snug">Spezialistin für Premium Brand Identities & Ästhetik</p>
                </div>
              </div>
              <h3 className="font-instrument text-2xl lg:text-3xl text-deep-charcoal">Fleur</h3>
              <p className="font-mono text-xs lg:text-sm text-refined-gold tracking-wider uppercase my-3 border-b border-refined-gold/20 pb-2 inline-block">Brand Design · Add-on</p>
              <p className="font-satoshi text-warm-steel leading-[1.65]">Wenn du noch kein Logo hast: Fleur entwickelt Logo, Farbwelten und visuelle DNA — als Add-on für 1.500 €. Ohne Logo bleibst du im Hauptpaket: ich übernehme das Webdesign komplett.</p>
            </ScrollReveal>

            {/* PERSON 3 */}
            <ScrollReveal delay={0.3} className="md:translate-y-24">
               <div className="relative aspect-[3/4] w-full rounded-[24px] overflow-hidden mb-6 group cursor-pointer border border-[#EBEAE5] shadow-[0_20px_40px_rgba(26,26,24,0.04)]">
                <div className="absolute inset-0 bg-[#DDDCD5] animate-[pulse_3s_ease-in-out_infinite_animation-delay-1000ms]" />
                <div className="absolute inset-0 bg-refined-gold mix-blend-overlay z-10 opacity-40 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-night-foundation mix-blend-multiply z-10 opacity-20 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 z-0">
                  <Image src="/images/Das-Team-Christopher.jpg" alt="Christopher" fill className="object-cover w-full h-full grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                </div>
                
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 pointer-events-none flex items-end">
                  <p className="text-pure-surface font-satoshi text-sm md:text-base leading-snug">Experte für High-Speed Server & Technische Infrastruktur</p>
                </div>
              </div>
              <h3 className="font-instrument text-2xl lg:text-3xl text-deep-charcoal">Christopher</h3>
              <p className="font-mono text-xs lg:text-sm text-refined-gold tracking-wider uppercase my-3 border-b border-refined-gold/20 pb-2 inline-block">Optional · WordPress-Pfad</p>
              <p className="font-satoshi text-warm-steel leading-[1.65]">Falls du dir explizit eine WordPress-Lösung wünschst, übernimmt Christopher die technische Umsetzung — als individuelles Angebot via Beratungsgespräch. Im Standard-Premium-Pfad mache ich alles selbst.</p>
            </ScrollReveal>

          </div>
        </div>
      </section>
{/* SECTION 9: DAS NETZWERK & DER FIT */}
      <section className="bg-[#050505] text-pure-surface py-32 md:py-48 px-6 relative overflow-hidden z-20">
        
        {/* Soft Dusk Transitions */}
        <div className="absolute top-0 left-0 w-full h-[200px] md:h-[300px] bg-gradient-to-b from-warm-canvas to-[#050505] z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[200px] md:h-[300px] bg-gradient-to-t from-pure-surface to-[#050505] z-10 pointer-events-none" />
        
        {/* Subtle Ethereal Noise & Glow */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <div className="absolute -left-[20vw] top-[20%] w-[60vw] h-[60vw] bg-refined-gold/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Single Powerful Image Area */}
            <div className="lg:col-span-7 relative h-[500px] md:h-[650px] w-full group">
              <ScrollReveal className="absolute inset-0 rounded-[2.5rem] bg-white/[0.02] p-3 border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.4)] z-10 hover:-translate-y-2 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                 <div className="relative w-full h-full rounded-[calc(2.5rem-0.75rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                   <Image 
                     src="/Bilder Sabala/14 - 56_CH_Sehnde_.jpg" 
                     alt="Weltweite Freiheit" 
                     fill 
                     className="object-cover opacity-100 transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/10 to-transparent mix-blend-multiply"></div>
                   <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/90 via-transparent to-transparent"></div>
                   <div className="absolute bottom-10 left-10 right-10">
                      <p className="font-geist text-sm tracking-[0.2em] uppercase text-refined-gold mb-3 drop-shadow-md">Die Vision</p>
                      <h3 className="font-instrument text-4xl md:text-5xl text-white drop-shadow-lg mb-2">Weltweite Freiheit.</h3>
                      <p className="font-satoshi text-warm-steel text-lg drop-shadow-md max-w-[450px]">Ein Business-Setup, das sich deinem Leben anpasst — nicht umgekehrt.</p>
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
                    <h4 className="font-instrument text-3xl text-white mb-4 relative z-10">Bist du bereit?</h4>
                    <p className="font-satoshi text-warm-steel text-lg leading-relaxed relative z-10 mb-8">
                      Wir suchen keine schnellen Projekte. Wir suchen Partner, die bereit sind, für tiefes Wachstum und sichtbare Größe. Dies erfordert ein klares Commitment.
                    </p>
                    
                    <ul className="space-y-4 font-satoshi text-white/90 relative z-10">
                      <li className="flex items-start gap-4">
                        <span className="text-refined-gold mt-1">✦</span>
                        <div>
                           <strong className="block text-white">Zeitliche Verfügbarkeit</strong>
                           <span className="text-warm-steel text-base">Du bist bereit, über 16 Wochen in intensiven Austausch zu gehen und Fokus zu investieren.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="text-refined-gold mt-1">✦</span>
                        <div>
                           <strong className="block text-white">Mindset</strong>
                           <span className="text-warm-steel text-base">Du verstehst, dass echter Impact von innen kommt und willst nicht einfach nur "eine hübsche Website".</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            
          </div>
        </div>
      </section>

      
      {/* SECTION 10: DREI STUFEN — Lite · Basis · All-in */}
      <section id="stufen" className="relative py-32 md:py-48 px-6 overflow-hidden bg-[#050505]">
        {/* Soft Dusk Transitions */}
        <div className="absolute top-0 left-0 w-full h-[200px] md:h-[300px] bg-gradient-to-b from-warm-canvas to-transparent z-10 pointer-events-none opacity-30 mix-blend-overlay" />
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-refined-gold/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-[820px] mx-auto mb-20 md:mb-24">
              <div className="inline-block px-5 py-2 rounded-full border border-refined-gold/30 bg-refined-gold/5 backdrop-blur-md mb-8">
                <span className="font-geist text-[0.65rem] md:text-sm tracking-[0.2em] uppercase text-refined-gold font-medium">Vier Stufen · ein Versprechen</span>
              </div>
              <h2 className="font-instrument text-[clamp(2.5rem,4vw,4rem)] text-white leading-[1.05] mb-6">
                Wähle deine{" "}
                <span className="italic text-refined-gold">Tiefe.</span>
              </h2>
              <p className="font-satoshi text-warm-steel text-lg md:text-xl leading-[1.65]">
                Drei klare Stufen mit Festpreis. Alle drei mit derselben Begleiter-Haltung — du wählst, wie tief wir gemeinsam gehen.
              </p>
            </div>
          </ScrollReveal>

          {/* 3 Stufen Grid */}
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-12">
            {/* LITE */}
            <ScrollReveal delay={0.05} className="group relative rounded-[2rem] p-[1px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
              <div className="relative h-full bg-[#0A0A0A] p-7 md:p-8 rounded-[calc(2rem-1px)] flex flex-col border-t border-white/5">
                <div className="font-mono text-white/40 text-[0.7rem] tracking-[0.2em] uppercase mb-3">01 · Lite</div>
                <h3 className="font-instrument text-2xl md:text-3xl text-white mb-2">Der Einstieg ins Premium.</h3>
                <p className="font-satoshi text-white/50 text-sm mb-6 italic">Premium-Auftritt mit klarem Fundament — wertig vom ersten Klick an.</p>
                <div className="border-t border-white/5 pt-5 mb-5">
                  <span className="font-geist text-white/40 uppercase tracking-[0.18em] text-[0.65rem] block mb-1">ab</span>
                  <span className="font-instrument text-[2.5rem] text-refined-gold leading-none">8.000 €</span>
                </div>
                <ul className="space-y-3 font-satoshi text-white/70 text-sm leading-relaxed flex-1">
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>Brand Identity Sessions (2× 90 Min)</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>Brand Mini-Guide (Typo · Farben · Tonalität)</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span><strong className="text-white font-medium">Bis zu 5 Seiten</strong></span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>1 Tool-Embed (Buchung/Zahlung/Newsletter)</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>Hosting · DSGVO · cookie-frei</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>6 Monate Pflege Mini</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>Liefergarantie · 8 Wochen (ohne Logo) · 3 Monate (mit Logo)</span></li>
                </ul>
              </div>
            </ScrollReveal>

            {/* BASIS (Highlighted - Mid-Anchor) */}
            <ScrollReveal delay={0.1} className="group relative rounded-[2rem] p-[1px] overflow-hidden lg:-translate-y-4">
              <div className="absolute inset-0 bg-gradient-to-b from-refined-gold/70 to-refined-gold/15" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-refined-gold to-transparent opacity-50" />
              <div className="absolute top-8 right-8 w-24 h-24 bg-refined-gold/15 blur-[40px] rounded-full group-hover:bg-refined-gold/25 transition-colors duration-700" />
              <div className="relative h-full bg-[#0E0B05] p-7 md:p-8 rounded-[calc(2rem-1px)] flex flex-col">
                <div className="absolute top-4 right-4 bg-refined-gold text-[#050505] uppercase tracking-widest text-[10px] font-bold px-3 py-1 rounded-full">Empfohlen</div>
                <div className="font-mono text-refined-gold/80 text-[0.7rem] tracking-[0.2em] uppercase mb-3 relative z-10">02 · Basis</div>
                <h3 className="font-instrument text-2xl md:text-3xl text-white mb-2 relative z-10">Mit Marketing-System.</h3>
                <p className="font-satoshi text-white/60 text-sm mb-6 italic relative z-10">Premium-Auftritt mit Content-Start — der stimmige Weg für die meisten.</p>
                <div className="border-t border-white/10 pt-5 mb-5 relative z-10">
                  <span className="font-geist text-white/50 uppercase tracking-[0.18em] text-[0.65rem] block mb-1">ab</span>
                  <span className="font-instrument text-[2.5rem] text-refined-gold leading-none">11.000 €</span>
                </div>
                <ul className="space-y-3 font-satoshi text-white/80 text-sm leading-relaxed flex-1 relative z-10">
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>Alles aus Lite</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span><strong className="text-white font-medium">Bis zu 8 Seiten</strong> + Blog/Podcast-Setup</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span><strong className="text-white font-medium">3 Starter-Blog-Artikel</strong> zu deinen Kernthemen</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>Tool-Beratung + Setup (3 Tools deiner Wahl)</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>Newsletter-Welcome-Sequence Vorlage</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>2× Event-/Webinar-Landingpages</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>12 Monate Pflege Plus + Monatsbericht</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>1× Mid-Year-Strategie-Call (60 Min)</span></li>
                </ul>
              </div>
            </ScrollReveal>

            {/* ALL-IN (Standard) */}
            <ScrollReveal delay={0.15} className="group relative rounded-[2rem] p-[1px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
              <div className="relative h-full bg-[#0A0A0A] p-7 md:p-8 rounded-[calc(2rem-1px)] flex flex-col border-t border-white/5">
                <div className="absolute top-4 right-4 bg-white/5 text-white/70 border border-white/15 uppercase tracking-widest text-[10px] font-bold px-3 py-1 rounded-full">Auf Beratung</div>
                <div className="font-mono text-white/40 text-[0.7rem] tracking-[0.2em] uppercase mb-3">03 · All-in</div>
                <h3 className="font-instrument text-2xl md:text-3xl text-white mb-2">Komplette Begleitung.</h3>
                <p className="font-satoshi text-white/50 text-sm mb-6 italic">Wenn du wirklich tief gehen willst — nach gemeinsamem Klärungsgespräch.</p>
                <div className="border-t border-white/5 pt-5 mb-5">
                  <span className="font-geist text-white/40 uppercase tracking-[0.18em] text-[0.65rem] block mb-1">ab</span>
                  <span className="font-instrument text-[2.5rem] text-refined-gold leading-none">15.000 €</span>
                </div>
                <ul className="space-y-3 font-satoshi text-white/70 text-sm leading-relaxed flex-1">
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>Alles aus Basis</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span><strong className="text-white font-medium">Bis zu 12 Seiten</strong> + Tool-Orchestrierung</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>Automation-Setup (Buchung → Zahlung → CRM)</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span><strong className="text-white font-medium">4× Event-/Webinar-Landingpages</strong></span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span><strong className="text-white font-medium">Wöchentlich LinkedIn-Karussell</strong> (52/Jahr)</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span><strong className="text-white font-medium">Monatlich 1 Blog-Artikel</strong> (12/Jahr)</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>Content-Säulen + Themen-Plan + Vorlagen</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>12 Monate Pflege Premium + Monatsanalyse</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span><strong className="text-white font-medium">Monatlich 30-Min-Strategie-Call</strong></span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>Sabala Diamond Force Bundle (Wert 1.490 €)</span></li>
                  <li className="flex items-start gap-3"><span className="text-refined-gold mt-1 shrink-0">✦</span><span>Quartals-Brand-Guidance</span></li>
                </ul>
              </div>
            </ScrollReveal>

          </div>

          {/* ADD-ONS */}
          <ScrollReveal delay={0.3}>
            <div className="max-w-[900px] mx-auto mt-20 md:mt-24">
              <div className="flex flex-col items-center text-center mb-10">
                <div className="inline-block px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                  <span className="font-geist text-[0.65rem] md:text-sm tracking-[0.2em] uppercase text-white/70 font-medium">Optionale Add-ons</span>
                </div>
                <h3 className="font-instrument text-[clamp(1.75rem,3vw,2.5rem)] text-white leading-tight mb-4">
                  Was du{" "}
                  <span className="italic text-refined-gold">dazu nehmen kannst.</span>
                </h3>
                <p className="font-satoshi text-warm-steel text-base md:text-lg leading-relaxed max-w-[600px]">
                  In jeder Stufe individuell zubuchbar — wenn du noch tiefer gehen willst.
                </p>
              </div>

              <div className="grid md:grid-cols-1 gap-4">
                {/* Fleur Logo & Brand Design */}
                <div className="group relative rounded-[1.5rem] p-[1px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-refined-gold/30 via-white/5 to-transparent" />
                  <div className="relative bg-[#0A0A0A] p-6 md:p-8 rounded-[calc(1.5rem-1px)] flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                        <h4 className="font-instrument text-xl md:text-2xl text-white">Fleur · Logo & Brand Design</h4>
                        <span className="font-mono text-refined-gold text-sm tracking-widest">+1.500 €</span>
                      </div>
                      <p className="font-satoshi text-white/60 text-sm md:text-base leading-relaxed">
                        Falls du noch kein Logo hast: Fleur entwickelt Logo + erstes Branddesign (Farbwelt, Logo-Erstentwurf, visuelle DNA). Wenn du bereits ein Logo mitbringst, gleichen wir es im Hauptpaket leicht an deine Markenwelt an — das ist <strong className="text-white font-medium">in jedem Paket inklusive</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* CTA Block */}
          <ScrollReveal delay={0.4}>
            <div className="max-w-[700px] mx-auto mt-20 md:mt-24 text-center">
              <h3 className="font-instrument text-[clamp(2rem,3.5vw,3rem)] text-white leading-tight mb-6">
                Lass uns sprechen.{" "}
                <span className="italic text-refined-gold">Beidseitig unverbindlich.</span>
              </h3>
              <p className="font-satoshi text-warm-steel text-lg leading-relaxed mb-10">
                30-Min-Klärungsgespräch — kein Verkaufsgespräch. Wir prüfen gemeinsam, ob wir zueinander passen. Wenn ja, geht&apos;s los. Wenn nicht — keine Kosten, keine Folgen.
              </p>
              <Link
                href="/termin-buchen"
                className="inline-flex items-center justify-center bg-refined-gold hover:bg-refined-gold/90 text-[#050505] px-10 md:px-14 py-5 rounded-full font-satoshi font-medium text-lg transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_15px_40px_rgba(184,150,62,0.3)] hover:shadow-[0_20px_60px_rgba(184,150,62,0.5)] gap-3 group"
              >
                Klärungsgespräch buchen
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
              <p className="text-white/40 font-geist text-xs uppercase tracking-widest mt-4">
                Kostenfreies 30-Minuten-Klärungsgespräch
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
{/* SECTION 10b: SABALA SERVICE-PAKETE (Begleitung nach Launch — Sabala-Pfad) */}
      <section className="bg-warm-canvas py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-refined-gold/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center max-w-[820px] mx-auto mb-16 md:mb-20">
              <div className="px-5 py-2 rounded-full border border-refined-gold/30 bg-refined-gold/5 mb-8 inline-block">
                <span className="font-geist text-[0.65rem] md:text-sm tracking-[0.2em] uppercase text-refined-gold font-medium">Pflege & Wachstum · nach Begleitung</span>
              </div>
              <h2 className="font-instrument text-[clamp(2rem,4vw,3.5rem)] text-deep-charcoal leading-[1.1] mb-6">
                Damit deine Seite <span className="italic text-refined-gold">wirklich performt.</span>
              </h2>
              <p className="font-satoshi text-warm-steel text-lg md:text-xl leading-relaxed">
                Wenn dein 1-Jahr-Begleitungspaket ausläuft — diese drei Stufen führen die Pflege fort. Du wählst, wie aktiv deine Seite mit dir wachsen soll.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mini */}
            <ScrollReveal delay={0.1} className="group relative rounded-[2rem] p-[1px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-deep-charcoal/15 to-transparent" />
              <div className="relative h-full bg-pure-surface p-8 md:p-10 rounded-[calc(2rem-1px)] flex flex-col items-start border border-whisper-border">
                <h3 className="font-instrument text-2xl text-deep-charcoal mb-2">Mini · Anpassungen</h3>
                <div className="font-geist text-refined-gold tracking-widest text-sm uppercase mb-6">49,- € / Monat</div>
                <p className="font-satoshi text-warm-steel mb-8 leading-relaxed">Der ruhige Begleiter für kleine, regelmäßige Anpassungen. Ohne Analyse, ohne Schnickschnack.</p>
                <ul className="space-y-4 font-satoshi text-deep-charcoal w-full mb-8">
                  <li className="flex items-start gap-4"><span className="text-refined-gold mt-1">✦</span><span>Kleine Text- und Bildänderungen — schnell erledigt</span></li>
                  <li className="flex items-start gap-4"><span className="text-refined-gold mt-1">✦</span><span>Direkter Ansprechpartner per Mail</span></li>
                  <li className="flex items-start gap-4"><span className="text-refined-gold mt-1">✦</span><span>Sicheres Hosting & laufende Pflege deiner Sabala-Seite</span></li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Plus (Highlighted) */}
            <ScrollReveal delay={0.2} className="group relative rounded-[2rem] p-[1px] overflow-hidden lg:-translate-y-4">
              <div className="absolute inset-0 bg-gradient-to-b from-refined-gold/70 to-refined-gold/20" />
              <div className="relative h-full bg-pure-surface p-8 md:p-10 rounded-[calc(2rem-1px)] flex flex-col items-start">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-refined-gold to-transparent opacity-50" />
                <h3 className="font-instrument text-3xl text-deep-charcoal mb-2 relative z-10">Plus · mit Analyse</h3>
                <div className="font-geist text-refined-gold tracking-widest text-sm uppercase mb-6 relative z-10">69,- € / Monat</div>
                <p className="font-satoshi text-warm-steel mb-8 leading-relaxed relative z-10">Du willst sehen, was wirklich passiert. Inklusive Analyse-Tool und monatlichem Bericht.</p>
                <ul className="space-y-4 font-satoshi text-deep-charcoal w-full mb-8 relative z-10">
                  <li className="flex items-start gap-4"><span className="text-refined-gold mt-1">✦</span><span>Alles aus dem Mini-Paket</span></li>
                  <li className="flex items-start gap-4"><span className="text-refined-gold mt-1">✦</span><span>Analyse-Tool aktiv geschaltet (DSGVO-konform)</span></li>
                  <li className="flex items-start gap-4"><span className="text-refined-gold mt-1">✦</span><span><strong>Monatsbericht</strong>: Was funktioniert, was nicht, was tun</span></li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Premium */}
            <ScrollReveal delay={0.3} className="group relative rounded-[2rem] p-[1px] overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-b from-deep-charcoal/15 to-transparent" />
              <div className="relative h-full bg-pure-surface p-8 md:p-10 rounded-[calc(2rem-1px)] flex flex-col items-start border border-whisper-border">
                <h3 className="font-instrument text-2xl text-deep-charcoal mb-2">Premium · mit Strategie-Call</h3>
                <div className="font-geist text-refined-gold tracking-widest text-sm uppercase mb-6">149,- € / Monat</div>
                <p className="font-satoshi text-warm-steel mb-8 leading-relaxed">Für alle, die ihre Seite aktiv weiterentwickeln — mit persönlichem Sparring zur Auswertung der Analyse.</p>
                <ul className="space-y-4 font-satoshi text-deep-charcoal w-full mb-8">
                  <li className="flex items-start gap-4"><span className="text-refined-gold mt-1">✦</span><span>Alles aus dem Plus-Paket</span></li>
                  <li className="flex items-start gap-4"><span className="text-refined-gold mt-1">✦</span><span><strong>30-Min-Strategie-Call pro Monat</strong> — Analyse besprechen, nächste Schritte festlegen</span></li>
                  <li className="flex items-start gap-4"><span className="text-refined-gold mt-1">✦</span><span>Höchste Priorität bei Anpassungen</span></li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

{/* SECTION 11: Individuelles Angebot · WordPress / anderer Stack */}
      <section className="bg-warm-canvas py-24 md:py-32 px-6 relative overflow-hidden border-t border-whisper-border">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-refined-gold/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-[1000px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="bg-pure-surface border border-whisper-border rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-[0_30px_80px_rgba(184,150,62,0.06)] flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
              <div className="flex-1">
                <div className="inline-block px-4 py-1.5 rounded-full border border-warm-steel/20 bg-warm-canvas mb-5">
                  <span className="font-geist text-[0.65rem] md:text-xs tracking-[0.2em] uppercase text-warm-steel font-medium">Individuelles Angebot</span>
                </div>
                <h3 className="font-instrument text-[clamp(1.75rem,3vw,2.5rem)] text-deep-charcoal leading-tight mb-4">
                  Du brauchst WordPress oder einen{" "}
                  <span className="italic text-refined-gold">anderen Stack?</span>
                </h3>
                <p className="font-satoshi text-warm-steel text-base md:text-lg leading-relaxed mb-2">
                  Falls du WordPress, ein Membership-System oder eine sehr spezifische technische Lösung wünschst, arbeiten wir mit unserem Technik-Partner{" "}
                  <strong className="text-deep-charcoal font-medium">Christopher Buschor</strong>{" "}
                  zusammen. Du bekommst ein <strong className="text-deep-charcoal font-medium">individuelles Angebot</strong> nach Beratungsgespräch — Hosting in Deutschland, du bleibst alleiniger Eigentümer.
                </p>
                <p className="font-satoshi text-warm-steel/80 text-sm md:text-base leading-relaxed italic">
                  Hinweis: Das ist außerhalb der vier Stufen — wir besprechen Scope und Preis individuell im Klärungsgespräch.
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  href="/termin-buchen"
                  className="inline-flex items-center justify-center bg-deep-charcoal hover:bg-black text-white px-7 py-4 rounded-full font-satoshi font-medium text-sm md:text-base transition-all shadow-lg hover:-translate-y-0.5 gap-3 group whitespace-nowrap"
                >
                  Beratungsgespräch buchen
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    {/* SECTION 12: FAQ */}
      <section className="bg-warm-canvas py-24 md:py-40 px-6 relative border-t border-whisper-border">
        <div className="max-w-[800px] mx-auto relative z-10">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(2.5rem,4vw,3.5rem)] text-deep-charcoal mb-16 text-center">
              Häufige <span className="italic text-refined-gold">Fragen</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {[
              { q: "Wie lange dauert der gesamte Prozess?", a: "Plane für den gesamten Prozess ca. 12 bis 16 Wochen ein. Das hängt auch davon ab, wie intensiv unsere Zusammenarbeit verläuft und wie schnell wir das Feedback in den einzelnen Etappen integrieren." },
              { q: "Brauche ich vorher schon eine klare Positionierung?", a: "Nein, genau das erarbeiten wir gemeinsam im Fundament. Das ist der essenzielle Baustein für alles, was danach folgt – wir kümmern uns tiefenpsychologisch um deine echte Marken-Identität." },
              { q: "Wer kümmert sich um die technische Umsetzung und das Hosting?", a: "Ich übernehme alles selbst. Die Seite wird via Vercel mit deutscher Edge-Region (Frankfurt) gehostet — DSGVO-konform, ohne Cookie-Banner-Pflicht, mit High-End PageSpeed. Kein WordPress, keine Plugin-Pflege. Du hast mit der Technik nichts zu tun. Falls du dir explizit eine WordPress-Lösung wünschst, biete ich das gemeinsam mit meinem Technik-Partner Christopher Buschor als individuelles Angebot via Beratungsgespräch an." },
              { q: "Muss ich mich nach dem Launch um Updates oder Datensicherung kümmern?", a: "Nein. Im jeweiligen Pflege-Paket sind Anpassungen, Updates, Sicherheit und stets aktuelle DSGVO-Rechtstexte enthalten. Lite hat 6 Monate Mini-Pflege, Basis 12 Monate Plus-Pflege mit Monatsbericht, All-in 12 Monate Premium mit monatlichem Strategie-Call. Danach kannst du in eines der Folge-Pflege-Pakete wechseln (49/69/149 €/Monat)." },
              { q: "Was passiert, wenn sich mein Angebot nach dem Launch ändert?", a: "Dafür ist unsere Jahres-Guidance da! Wir passen die Seite an, wenn sich dein Business organisch weiterentwickelt." },
              { q: "Muss ich zu 100% kaufbereit sein, um einen Termin zu buchen?", a: "Überhaupt nicht. Das erste Kennenlernen ist zu 100% kostenfrei und unverbindlich. Es geht nur darum, herauszufinden, ob wir menschlich und fachlich matchen. Wenn du die Energie und den Wunsch nach Veränderung fühlst, ist das bereits die perfekte Basis, um einfach mal miteinander zu sprechen." }
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
