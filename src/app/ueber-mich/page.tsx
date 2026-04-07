"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const memoryData = [
  {
    id: "m1",
    year: "1991",
    kicker: "Die Wurzeln",
    title: "Kaum Erinnerungen an Papa",
    description: "Als ich 3 Jahre alt war, sind wir von Kiew nach Hilden in Deutschland gezogen. Mein Papa verließ unsere Familie wenige Zeit später. Mit 11 Jahren erfuhr ich, dass er nicht mehr unter uns weilte.",
    image: "https://picsum.photos/seed/sab1/600/800", // Portrait
    aspect: "aspect-[3/4]",
    floatDelay: 0
  },
  {
    id: "m2",
    year: "2003",
    kicker: "Der Traum",
    title: "Auf dem Weg zum Fußballprofi?",
    description: "Ich war ein großes Talent und spielte sogar für die Mittelrheinauswahl. Alemannia Aachen war jedoch keine glückliche Zeit für mich. Ich fand keinen Anschluss und verlor über die Zeit die Freude und Leidenschaft.",
    image: "https://picsum.photos/seed/sab2/800/600", // Landscape
    aspect: "aspect-[4/3]",
    floatDelay: 2
  },
  {
    id: "m3",
    year: "2007",
    kicker: "Neue Wege",
    title: "Vom Burgerbrater zum …",
    description: "„Bist du bescheuert? Ich geh doch nicht zu McDonald's!“ Das waren meine Worte an meine Mutter. Ironischerweise war es damals die einzige Möglichkeit eine Ausbildung anzufangen.",
    image: "https://picsum.photos/seed/sab3/600/600", // Square
    aspect: "aspect-square",
    floatDelay: 1
  },
  {
    id: "m4",
    year: "2014",
    kicker: "Erfolg & Führung",
    title: "Ronald lebt!",
    description: "Es gab wirklich Wetten, dass ich mein BWL-Studium nicht schaffe... Geschafft habe ich es und wurde Flagship Store Manager. In meinem ersten Jahr machte ich 5,5 Millionen € Umsatz.",
    image: "https://picsum.photos/seed/sab4/600/800", 
    aspect: "aspect-[3/4]",
    floatDelay: 3
  },
  {
    id: "m5",
    year: "2019",
    kicker: "Unterstützung",
    title: "Mein Wind unter meinen Flügeln",
    description: "Ein wahrer Segen, Dina an meiner Seite zu haben. Unser dickes Band der Liebe hat uns geholfen, gemeinsam durch tiefe und heilende Prozesse zu gehen. Ohne sie wäre mein Business nicht da, wo es ist.",
    image: "https://picsum.photos/seed/sab5/800/600",
    aspect: "aspect-[4/3]",
    floatDelay: 0.5
  },
  {
    id: "m6",
    year: "Juli 2020",
    kicker: "Der Wendepunkt",
    title: "Mein Erwachen",
    description: "Das Jahr, das meinem Leben eine ganz neue Richtung gegeben hat. Ich musste um jeden Preis auf ein Seminar meines Lehrers! 3.000 €, ohne zu wissen was mich erwartet. Es hat sich bereits mehrfach zurückgezahlt.",
    image: "https://picsum.photos/seed/sab6/600/800",
    aspect: "aspect-[3/4]",
    floatDelay: 2.5
  },
  {
    id: "m7",
    year: "November 2020",
    kicker: "Transformation",
    title: "Die Magie Kretas",
    description: "Auf meinem Seminar auf Kreta erhielt ich meinen Namen in einer unvergesslichen Zeremonie. Hier entflammte der Wunsch, heiliges Wissen in die Welt zu tragen.",
    image: "https://picsum.photos/seed/sab7/600/600",
    aspect: "aspect-square",
    floatDelay: 1.5
  },
  {
    id: "m8",
    year: "2021",
    kicker: "Die Gründung",
    title: "Sabala Coaching",
    description: "Gedacht, getan! Ich wusste überhaupt nicht, wie ich das mache, aber ich konnte nicht anders, als einfach loszulaufen. Dort durfte ich wertvolle Fehler machen.",
    image: "https://picsum.photos/seed/sab8/800/600",
    aspect: "aspect-[4/3]",
    floatDelay: 0.8
  },
  {
    id: "m9",
    year: "2022",
    kicker: "Der Sprung",
    title: "Wohnungsauflösung & Schweden",
    description: "Wohnung auflösen, Transporter mieten und ab nach Schweden – mit nur 4 Monaten Sicherheit! Das Urvertrauen wuchs, wir wussten manchmal 4 Wochen vorher nicht wohin es geht.",
    image: "https://picsum.photos/seed/sab9/600/800",
    aspect: "aspect-[3/4]",
    floatDelay: 3.5
  },
  {
    id: "m10",
    year: "Januar 2024",
    kicker: "Härte und Spirit",
    title: "Mein erster Leberkick",
    description: "Darf ich vorstellen? Sami, an ihm sackte ich nach einem Kick zusammen wie ein vom Blitz getroffenes Schaf. Der Kickbox-Club in Skurup war einer der spirituellsten Orte, die ich je besucht habe.",
    image: "https://picsum.photos/seed/sab10/600/600",
    aspect: "aspect-square",
    floatDelay: 2.2
  },
  {
    id: "m11",
    year: "Dezember 2024",
    kicker: "Netzwerk",
    title: "Connecting Herzkreative",
    description: "Der größte Schritt in meiner bisherigen Selbstständigkeit: Die Gründung eines globalen Business-Netzwerks. Wenige Monate später meldete ich mich aus Deutschland ab.",
    image: "https://picsum.photos/seed/sab11/800/600",
    aspect: "aspect-[4/3]",
    floatDelay: 1.2
  },
  {
    id: "m12",
    year: "2026",
    kicker: "Die Zukunft",
    title: "Die Vision lebt weiter",
    description: "Die Reise geht weiter! Ich bin heute dankbarer denn je für jeden Schritt und Fehler. Mein Fundament steht und die nächsten Kapitel werden noch größer, klarer und leuchtender.",
    image: "https://picsum.photos/seed/sab12/600/800",
    aspect: "aspect-[3/4]",
    floatDelay: 0.3
  }
];

function FloatingMemoryCloud() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Prevent scroll when modal is open
  if (typeof window !== "undefined") {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }

  return (
    <>
      <div className="w-full flex justify-center items-center py-20 px-4 md:px-12 relative z-10">
        <div className="max-w-[1200px] w-full flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
          {memoryData.map((item) => (
            <motion.div
              layoutId={`card-container-${item.id}`}
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={cn(
                "relative cursor-pointer group flex-shrink-0 w-[42%] sm:w-[30%] md:w-[22%] rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-whisper-border bg-pure-surface", 
                item.aspect,
                // Adjusting random slight rotations natively via tailwind can conflict with Framer transform if not careful,
                // but static tailwind rotation wrapper works: we just don't animate rotation inside the layoutId exactly the same way.
                "hover:z-20 transition-shadow duration-500"
              )}
              // Floating animation
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: item.floatDelay }}
              whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
            >
              {/* Background Image */}
              <motion.div layoutId={`card-image-${item.id}`} className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </motion.div>
              
              {/* Overlay Overlay */}
              <motion.div layoutId={`card-overlay-${item.id}`} className="absolute inset-0 bg-deep-charcoal/20 group-hover:bg-black/0 transition-colors duration-500" />
              
              {/* Year Label */}
              <motion.div 
                layoutId={`card-year-${item.id}`} 
                className="absolute inset-x-0 bottom-6 sm:bottom-8 text-center"
              >
                 <span className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-deep-charcoal font-instrument text-xl sm:text-2xl lg:text-3xl font-bold shadow-sm inline-block">
                   {item.year}
                 </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-deep-charcoal/90 backdrop-blur-sm cursor-zoom-out"
              onClick={() => setSelectedId(null)}
            />
            
            {/* Modal Container */}
            <motion.div
              layoutId={`card-container-${selectedId}`}
              className="relative w-full max-w-5xl bg-pure-surface rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 m-auto"
            >
              {(() => {
                const item = memoryData.find(i => i.id === selectedId)!;
                return (
                  <>
                    <motion.div layoutId={`card-image-${item.id}`} className="w-full md:w-1/2 min-h-[300px] sm:aspect-square md:aspect-auto md:h-auto relative">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                      <motion.div layoutId={`card-overlay-${item.id}`} className="absolute inset-0 bg-transparent" />
                    </motion.div>
                    
                    <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-pure-surface">
                       <motion.div layoutId={`card-year-${item.id}`} className="text-refined-gold font-mono text-sm tracking-widest uppercase mb-4 opacity-80">
                         {item.year} — {item.kicker}
                       </motion.div>
                       <motion.h3 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.2 }}
                         className="font-instrument text-3xl md:text-4xl lg:text-5xl text-deep-charcoal mb-6 leading-tight"
                       >
                         {item.title}
                       </motion.h3>
                       <motion.p 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.3 }}
                         className="text-warm-steel text-lg leading-relaxed mb-10"
                       >
                         {item.description}
                       </motion.p>
                       
                       <motion.button 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.4 }}
                         onClick={() => setSelectedId(null)}
                         className="self-start uppercase tracking-widest text-xs font-bold text-deep-charcoal border border-whisper-border px-8 py-4 rounded-full hover:bg-black/5 active:scale-95 transition-all"
                       >
                         Zurück zur Übersicht
                       </motion.button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function UeberMichPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 px-6 sm:px-12 md:px-24 flex items-center justify-center bg-warm-canvas z-0">
        <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-8">
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <ScrollReveal>
              <h1 className="font-instrument text-deep-charcoal leading-[1.1] tracking-[-0.02em] text-[clamp(2.5rem,5vw,4.5rem)]">
                Ich baue keine Websites.<br/>
                Ich baue Fundamente.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-warm-steel text-lg md:text-xl leading-[1.65] max-w-[55ch]">
                Ich komme nicht aus dem klassischen Webdesign. Mein Weg führte vom Führen von Restaurant-Teams über gescheiterte digitale Projekte und das Leben als digitaler Nomade, bis ich verstanden habe: Nur was Tiefe hat, hat auch Bestand.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto order-1 lg:order-2">
            <ScrollReveal delay={0.2} className="w-full h-full relative">
              <div className="absolute inset-0 bg-soft-stone/10 rounded-[30px] rotate-3 transition-transform hover:rotate-0 duration-700 ease-out"></div>
              <div className="w-full h-full relative rounded-[30px] shadow-warm-shadow border border-whisper-border overflow-hidden bg-warm-canvas/50">
                <Image 
                  src="/images/sabala-portrait-hero.png" 
                  alt="Ilja Sabala Krasevskij" 
                  fill 
                  className="object-cover object-bottom"
                  priority
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* DER WEG (SCHWEBENDE GALERIE) */}
      <section className="bg-pure-surface relative z-10 pt-20 pb-32 overflow-hidden border-t border-whisper-border/50">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-warm-canvas to-transparent opacity-80 pointer-events-none"></div>
        <div className="max-w-[1200px] mx-auto text-center px-6 relative z-10 mb-10">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(3rem,5vw,4.5rem)] text-deep-charcoal mb-4">
              Mein Weg
            </h2>
            <p className="font-satoshi text-warm-steel text-xl">
              Entdecke die Stationen meiner Reise.
            </p>
          </ScrollReveal>
        </div>

        <FloatingMemoryCloud />

        {/* FUN FACTS */}
        <div className="max-w-[1200px] mx-auto mt-20 px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-instrument text-[clamp(2.5rem,4vw,3.5rem)] text-deep-charcoal mb-4">Fun Facts</h2>
              <p className="font-satoshi text-warm-steel">Ein paar Dinge, die nicht im Business-Handbuch stehen.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollReveal className="bg-warm-canvas rounded-[24px] p-8 border border-whisper-border shadow-sm hover:shadow-lg transition-all duration-500">
               <p className="font-mono text-sm tracking-widest font-bold uppercase text-refined-gold mb-3">01</p>
               <h4 className="font-instrument text-2xl text-deep-charcoal mb-2">Kaffee Schwarz</h4>
               <p className="text-warm-steel text-base leading-relaxed">Der Treibstoff für tiefe Gespräche und lange Nächte am Design.</p>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="bg-warm-canvas rounded-[24px] p-8 border border-whisper-border shadow-sm hover:shadow-lg transition-all duration-500">
               <p className="font-mono text-sm tracking-widest font-bold uppercase text-refined-gold mb-3">02</p>
               <h4 className="font-instrument text-2xl text-deep-charcoal mb-2">Morgen-Ritual</h4>
               <p className="text-warm-steel text-base leading-relaxed">Ohne Meditation startet bei mir kein einziger produktiver Tag.</p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="bg-warm-canvas rounded-[24px] p-8 border border-whisper-border shadow-sm hover:shadow-lg transition-all duration-500">
               <p className="font-mono text-sm tracking-widest font-bold uppercase text-refined-gold mb-3">03</p>
               <h4 className="font-instrument text-2xl text-deep-charcoal mb-2">Reise-Liebe</h4>
               <p className="text-warm-steel text-base leading-relaxed">Mein Koffer ist nie ganz ausgepackt, irgendwo wartet immer ein Flugzeug.</p>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="bg-warm-canvas rounded-[24px] p-8 border border-whisper-border shadow-sm hover:shadow-lg transition-all duration-500">
               <p className="font-mono text-sm tracking-widest font-bold uppercase text-refined-gold mb-3">04</p>
               <h4 className="font-instrument text-2xl text-deep-charcoal mb-2">Hunde-Papa</h4>
               <p className="text-warm-steel text-base leading-relaxed">Mein Hund Loki ist quasi der inoffizielle Chief Happiness Officer bei Sabala.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* WERTE & ARBEITSWEISE */}
      <section className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-night-foundation text-night-text border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(2.5rem,4vw,3.5rem)] text-center mb-24">Meine Arbeitsweise</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <ScrollReveal delay={0.1}>
              <div className="border border-white/10 p-10 lg:p-14 rounded-[32px] bg-white/[0.03] h-full hover:bg-white/[0.06] transition-colors duration-500">
                <p className="font-mono text-sm tracking-widest uppercase font-bold text-night-gold mb-5">01</p>
                <h3 className="font-instrument text-3xl lg:text-4xl mb-5">Ich pushe nicht. Ich tauche ein.</h3>
                <p className="text-night-secondary text-lg leading-relaxed">
                  Wir graben nach deiner echten Botschaft, anstatt oberflächliche Marketing-Sprüche auf eine Website zu kleben. Wir finden deine Essenz.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="border border-white/10 p-10 lg:p-14 rounded-[32px] bg-white/[0.03] h-full hover:bg-white/[0.06] transition-colors duration-500">
                <p className="font-mono text-sm tracking-widest uppercase font-bold text-night-gold mb-5">02</p>
                <h3 className="font-instrument text-3xl lg:text-4xl mb-5">Umsetzung ist Pflicht.</h3>
                <p className="text-night-secondary text-lg leading-relaxed">
                  Theorie ohne Ergebnisse bringt dir nichts. Wir gehen strukturiert vom Abstrakten ins Konkrete, bis dein Auftritt messbar steht.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <div className="border border-white/10 p-10 lg:p-14 rounded-[32px] bg-white/[0.03] h-full hover:bg-white/[0.06] transition-colors duration-500">
                <p className="font-mono text-sm tracking-widest uppercase font-bold text-night-gold mb-5">03</p>
                <h3 className="font-instrument text-3xl lg:text-4xl mb-5">Ich begleite — ich rette nicht.</h3>
                <p className="text-night-secondary text-lg leading-relaxed">
                  Du machst die inhaltliche Arbeit und stehst hinter deiner Vision. Ich liefere die Struktur, das Design und den digitalen Raum dafür.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <div className="border border-white/10 p-10 lg:p-14 rounded-[32px] bg-white/[0.03] h-full hover:bg-white/[0.06] transition-colors duration-500">
                <p className="font-mono text-sm tracking-widest uppercase font-bold text-night-gold mb-5">04</p>
                <h3 className="font-instrument text-3xl lg:text-4xl mb-5">Herz und Handlung gehören zusammen.</h3>
                <p className="text-night-secondary text-lg leading-relaxed">
                  Meditation und Business schließen sich nicht aus. Sie ergänzen sich. Wer innen klar ist, tritt außen stark auf. Das ist mein Anspruch.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-pure-surface relative z-10">
        <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-deep-charcoal mb-12">
              Lass uns herausfinden, ob wir zueinander passen.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-col items-center gap-6">
              <Link 
                href="https://tidycal.com/sabala" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-refined-gold hover:bg-refined-gold/90 text-pure-surface px-10 py-5 rounded-full font-bold uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg text-lg hover:shadow-xl"
              >
                Kennenlerngespräch vereinbaren
              </Link>
              <p className="text-sm font-mono text-soft-stone uppercase tracking-widest font-bold">
                Via TidyCal — Kostenlos & Unverbindlich
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
