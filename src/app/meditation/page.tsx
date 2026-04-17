import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Führung von Innen | Sabala Mentoring",
  description: "Ein erdender Raum für Mystik, Tiefe und die Amartya Tradition.",
};

export default function MeditationPage() {
  return (
    <div className="flex flex-col w-full bg-warm-canvas text-deep-charcoal min-h-screen font-satoshi overflow-x-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Image: Nature / Meditation */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            <Image 
              src="/Bilder Meditation/DSCF4412.jpg" 
              alt="Ilja in der Natur" 
              fill 
              className="object-cover object-center scale-105"
              priority
            />
            {/* Dark overlay for text readability, fading into warm-canvas at the bottom */}
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-warm-canvas/20 to-warm-canvas" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center mt-32 md:mt-0">
          <ScrollReveal>
             <p className="text-night-gold font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-6 drop-shadow-md">Sabala Mentoring</p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
             <h1 className="font-instrument text-[clamp(4.5rem,10vw,8.5rem)] text-white leading-[1.05] drop-shadow-2xl shadow-black/50">
               Führung von <br className="hidden md:block"/><span className="italic text-night-gold">Innen.</span>
             </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
             <p className="mt-8 text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg shadow-black/50">
               Ein zentrierender Raum der Erdung. Begleitet von Mystik, Natur und der tiefen Verbindung zum eigenen Herzen.
             </p>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center animate-pulse z-20 pointer-events-none">
           <svg className="w-6 h-6 md:w-8 md:h-8 text-deep-charcoal opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path>
           </svg>
        </div>
      </section>

      {/* SECTION 1.5: SCHMERZPUNKTE (IDENTIFIKATION) */}
      <section className="py-24 md:py-32 px-6 sm:px-12 md:px-24 bg-warm-canvas border-b border-whisper-border">
         <div className="max-w-[1000px] mx-auto text-center">
            <ScrollReveal>
               <h2 className="font-instrument text-[clamp(3.5rem,5.5vw,4.5rem)] leading-tight mb-10 text-deep-charcoal">
                  Was suchst du <span className="italic text-refined-gold">eigentlich?</span>
               </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
               <p className="text-xl md:text-2xl text-warm-steel leading-[1.8] font-light max-w-3xl mx-auto">
                  Vielleicht kennst du das: Plötzliche Wutausbrüche. Die konstante Ungeduld. Eine innere Härte und ständige Selbstverurteilung, weil du gefühlt nie genug bist – egal was du im Außen erreichst.
               </p>
               <div className="w-16 h-[1px] bg-refined-gold/30 mx-auto my-10"></div>
               <p className="text-xl md:text-2xl text-warm-steel leading-[1.8] font-light max-w-3xl mx-auto">
                  Hier geht es darum, diesen Mustern schonungslos ins Gesicht zu schauen. Sich den eigenen, unterdrückten Emotionen zu stellen und aufzuhören, vor sich selbst wegzulaufen.
               </p>
            </ScrollReveal>
         </div>
      </section>

      {/* SECTION 2: DIE PHILOSOPHIE (EGO, HERZ & FREIHEIT) */}
      <section className="py-32 md:py-48 px-6 sm:px-12 md:px-24 relative bg-pure-surface z-10 border-b border-whisper-border">
         <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <ScrollReveal className="relative w-full aspect-[4/5] md:aspect-square rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl">
               <Image 
                 src="/Bilder Meditation/DSCF3707.jpg"
                 alt="Sabala Herz über Ego"
                 fill
                 className="object-cover object-center hover:scale-105 transition-transform duration-[2000ms]"
               />
               <div className="absolute inset-0 bg-refined-gold/10 mix-blend-overlay"></div>
            </ScrollReveal>

            <div className="flex flex-col">
               <ScrollReveal>
                 <h2 className="font-instrument text-[clamp(3.5rem,6vw,5.5rem)] leading-tight mb-8">
                    Frei von Dogmen. <br/> <span className="italic text-refined-gold">Frei für das Herz.</span>
                 </h2>
               </ScrollReveal>

               <ScrollReveal delay={0.1}>
                 <p className="text-xl md:text-2xl text-warm-steel leading-[1.8] mb-8 font-light">
                    Dies ist keine rigide Religion. Es gibt hier kein "Du musst diesen Weg gehen". Komplett frei von Dogmen tauchen wir stattdessen ein, um dein tieferliegendes, intuitives Herz überhaupt erst wieder zu entdecken. 
                 </p>
               </ScrollReveal>
               
               <ScrollReveal delay={0.2}>
                 <p className="text-xl md:text-2xl text-warm-steel leading-[1.8] font-light">
                    Dabei verteufeln wir das Ego nicht und löschen es nicht aus. Stattdessen lehren wir das Ego, <strong className="text-deep-charcoal font-normal">dem Herzen zu dienen</strong>. Denn wahre Führung erfordert, die tiefe Liebe und das Mitgefühl für sich selbst und für andere als das höchste Fundament zu begreifen. Was bringt einem viel Geld, wenn man es nicht richtig für die Menschen einsetzt?
                 </p>
               </ScrollReveal>
            </div>
         </div>
      </section>

      {/* SECTION 3: DER PROZESS (TRANSZENDENZ IN 2 SCHRITTEN) */}
      <section className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-warm-canvas relative overflow-hidden z-10 border-b border-whisper-border">
         <div className="max-w-[1400px] mx-auto text-center">
            <ScrollReveal>
               <p className="text-refined-gold tracking-[0.2em] font-medium text-sm md:text-lg mb-4 md:mb-6 uppercase">Der Einstieg</p>
               <h2 className="font-instrument text-[clamp(3.5rem,6vw,5.5rem)] leading-tight mb-20 text-deep-charcoal">Zwei Schritte <br/> der Transzendenz.</h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 text-left relative">
               
               {/* Arrow connecting the two steps (Desktop only) */}
               <div className="hidden md:block absolute top-[40%] left-1/2 -translate-x-1/2 w-16 h-1 bg-refined-gold/20 z-0"></div>

               {/* Process 1 */}
               <ScrollReveal delay={0.1} className="bg-pure-surface border border-whisper-border p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-lg relative overflow-hidden group z-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-refined-gold/10 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                  <h3 className="font-instrument text-3xl md:text-4xl mb-6 relative z-10">Schritt 1: <br/>Anapanasati</h3>
                  <p className="text-warm-steel text-lg text-refined-gold uppercase tracking-widest font-bold text-xs mb-8">Atemgewahrsein</p>
                  <p className="text-warm-steel text-lg md:text-xl leading-relaxed relative z-10 font-light">
                     Unser Einstieg. Die tiefe Verwurzelung im Ist-Zustand über den eigenen Atem. Dieses Fundament kultiviert eine ehrliche Präsenz, die dich inmitten der unruhigen Reizüberflutung erdet und den Verstand klärt.
                  </p>
               </ScrollReveal>

               {/* Process 2 */}
               <ScrollReveal delay={0.2} className="bg-deep-charcoal border border-transparent p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-xl relative overflow-hidden group z-10">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-br-full transform -translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                  <h3 className="font-instrument text-3xl md:text-4xl mb-6 text-white relative z-10">Schritt 2: <br/>Mantra Dhyana</h3>
                  <p className="text-white/60 text-lg uppercase tracking-widest font-bold text-xs mb-8">Transzendentale Mantra Meditation</p>
                  <p className="text-white/90 text-lg md:text-xl leading-relaxed relative z-10 font-light">
                     Wenn der Atem ruhig ist, gehen wir über zur Mantra-Meditation. Eine jahrtausendealte Praxis des Eintauchens in dein innerstes, unendliches Potenzial, um vollkommene, formlose Stille zu erfahren.
                  </p>
               </ScrollReveal>

            </div>
         </div>
      </section>

      {/* SECTION 4: DIE TRADITION & DER BEGLEITER */}
      <section className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-night-foundation text-night-text relative z-10 overflow-hidden">
         <div className="absolute top-0 left-0 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-night-gold/5 rounded-br-full blur-3xl pointer-events-none"></div>
         
         <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="flex flex-col order-2 lg:order-1 relative z-10">
               <ScrollReveal>
                 <p className="text-night-gold tracking-[0.2em] font-medium text-sm md:text-lg mb-4 md:mb-6 uppercase">Amartya Tradition</p>
                 <h2 className="font-instrument text-[clamp(3.5rem,6vw,5.5rem)] text-white leading-tight mb-8">Der Begleiter.</h2>
               </ScrollReveal>

               <ScrollReveal delay={0.1}>
                 <p className="text-xl md:text-2xl text-night-secondary leading-[1.8] mb-8 font-light">
                    Als Freigeist, digitaler Nomade und (Business-)Architekt begleite ich dich auf diesem Weg – tief verankert in einer zeitlosen Weisheitstradition, fernab moderner Coaching-Hypes.
                 </p>
               </ScrollReveal>

               <ScrollReveal delay={0.2}>
                 <p className="text-xl md:text-2xl text-night-secondary leading-[1.8] font-light">
                    Seit 2020 bin ich selbst Schüler in der <strong className="text-night-gold font-normal">nie endenden Amartya Tradition</strong> unter der Führung meines Lehrers <span className="text-white italic">Aaravindha Himadra</span>. Diese Tradition schenkt mir tagtäglich tiefste Dankbarkeit, mich erden und absolute Führung aus meinem Inneren beziehen zu können. Diese mystische Klarheit teile ich nun in unserem Raum.
                 </p>
               </ScrollReveal>
            </div>

            <ScrollReveal delay={0.3} className="order-1 lg:order-2 relative w-full aspect-[4/5] md:aspect-square rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
               <Image 
                 src="/Bilder Meditation/DSCF4217.jpg"
                 alt="Ilja Amartya Meditation"
                 fill
                 className="object-cover object-center hover:scale-105 transition-transform duration-[2000ms] grayscale-[10%]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent"></div>
            </ScrollReveal>

         </div>
      </section>

      {/* SECTION 4.5: RAHMEN & FAQ */}
      <section className="py-24 md:py-32 px-6 sm:px-12 md:px-24 bg-warm-canvas border-b border-whisper-border">
         <div className="max-w-[1000px] mx-auto">
            <ScrollReveal>
               <div className="text-center mb-16">
                 <h2 className="font-instrument text-[clamp(2.5rem,6vw,4.5rem)] leading-tight mb-4 text-deep-charcoal">Der Rahmen.</h2>
                 <p className="text-warm-steel text-lg">Häufige Fragen zum Ablauf unseres 1:1 Mentorings.</p>
               </div>
            </ScrollReveal>

            <div className="space-y-6">
               <ScrollReveal delay={0.1} className="bg-white border border-whisper-border p-8 rounded-3xl transition-shadow hover:shadow-lg">
                  <h3 className="font-instrument text-2xl mb-3 text-deep-charcoal">Wie genau läuft der Prozess ab?</h3>
                  <p className="text-warm-steel leading-relaxed">Wir gehen gemeinsam durch <strong className="text-deep-charcoal font-medium">7 exklusive 1:1-Sessions</strong> über einen Zeitraum von rund 2 bis 3 Monaten. Jede Session dauert <strong className="text-deep-charcoal font-medium">90 Minuten</strong>. Zwischen den Sessions stehe ich dir zur Klärung von Fragen und Erlebnissen über eine ganz persönliche <strong className="text-deep-charcoal font-medium">WhatsApp-Begleitung</strong> zur Seite.</p>
               </ScrollReveal>
               
               <ScrollReveal delay={0.2} className="bg-white border border-whisper-border p-8 rounded-3xl transition-shadow hover:shadow-lg">
                  <h3 className="font-instrument text-2xl mb-3 text-deep-charcoal">Meditieren wir auch zusammen?</h3>
                  <p className="text-warm-steel leading-relaxed">Ja, absolut. Wir verankern die Theorie direkt in der Praxis und meditieren in jeder einzelnen Session gemeinsam. Zu Beginn starten wir sanft mit 15 Minuten und steigern diese Praxis im Verlauf des Mentorings sukzessive auf bis zu 45 Minuten.</p>
               </ScrollReveal>

               <ScrollReveal delay={0.3} className="bg-white border border-whisper-border p-8 rounded-3xl transition-shadow hover:shadow-lg">
                  <h3 className="font-instrument text-2xl mb-3 text-deep-charcoal">Muss ich dafür im Lotussitz sitzen können?</h3>
                  <p className="text-warm-steel leading-relaxed">Nein. Weder Vorerfahrung noch extreme Beweglichkeit sind nötig. Ein Schneidersitz ist absolut kein Muss. Wichtig ist lediglich eine <strong className="text-deep-charcoal font-medium">bequeme, aufrechte Sitzhaltung</strong> (das kann auch ein normaler Stuhl oder das Bettende sein). Wir meditieren bewusst nicht im Liegen, um die innere Präsenz hochzuhalten.</p>
               </ScrollReveal>

               <ScrollReveal delay={0.4} className="bg-white border border-whisper-border p-8 rounded-3xl transition-shadow hover:shadow-lg">
                  <h3 className="font-instrument text-2xl mb-3 text-deep-charcoal">Wo finden die Sessions statt?</h3>
                  <p className="text-warm-steel leading-relaxed">Das gesamte Mentoring findet <strong className="text-deep-charcoal font-medium">komplett online und ortsflexibel</strong> statt. Du kannst von überall aus teilnehmen – such dir dafür einfach ungestört deinen Lieblingsplatz.</p>
               </ScrollReveal>
            </div>
         </div>
      </section>

      {/* SECTION 5: SABALA RETREATS (NEWSLETTER) */}
      <section className="py-24 md:py-32 px-6 sm:px-12 md:px-24 bg-pure-surface border-b border-whisper-border overflow-hidden">
         <div className="max-w-[1200px] mx-auto bg-warm-canvas border border-whisper-border rounded-[3rem] p-8 sm:p-12 md:p-20 relative shadow-2xl flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-refined-gold/5 rounded-bl-full blur-2xl pointer-events-none"></div>

            <div className="flex-1 w-full relative z-10 text-center md:text-left">
               <ScrollReveal>
                 <p className="text-refined-gold tracking-[0.2em] font-bold text-xs uppercase mb-4">Geschenk & Coming Soon</p>
                 <h2 className="font-instrument text-4xl md:text-5xl leading-tight mb-6">Geführte Meditation <br/> & Sabala Retreats</h2>
               </ScrollReveal>
               
               <ScrollReveal delay={0.1}>
                 <p className="text-warm-steel text-lg md:text-xl font-light mb-8 max-w-lg leading-relaxed">
                   Trage dich ein und lade dir direkt eine beruhigende geführte Meditation herunter (<i>„Nimm dich mal zurück, ab aufs Ohr“</i>). Gleichzeitig stehst du unverbindlich auf der Warteliste für kommende 7-Tages-Retreats an magischen Orten.
                 </p>
               </ScrollReveal>

               <ScrollReveal delay={0.2} className="w-full max-w-md mx-auto md:mx-0">
                 {/* HIER KANN SPÄTER EIN ACTIVECAMPAIGN FORMULAR-EMBED REIN */}
                 <form className="relative flex items-center" action="#">
                    <input 
                      type="email" 
                      placeholder="Deine E-Mail Adresse" 
                      className="w-full bg-white border border-whisper-border text-deep-charcoal px-6 py-4 rounded-full outline-none focus:border-refined-gold/50 transition-colors placeholder:text-warm-steel/50"
                      required
                    />
                    <button 
                      type="submit" 
                      className="absolute right-2 bg-deep-charcoal text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-refined-gold transition-colors"
                    >
                       Herunterladen
                    </button>
                 </form>
               </ScrollReveal>
            </div>

            <ScrollReveal delay={0.3} className="flex-1 w-full h-[300px] md:h-[400px] relative rounded-[2rem] overflow-hidden shadow-lg border border-white">
               <Image 
                 src="/Bilder Meditation/DSCF4363.jpg" 
                 alt="Sabala Retreats"
                 fill
                 className="object-cover object-center grayscale-[20%]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
               <div className="absolute bottom-6 left-6 text-white font-instrument text-2xl">
                 Magische Orte.
               </div>
            </ScrollReveal>
         </div>
      </section>

      {/* SECTION 6: CTA */}
      <section className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-warm-canvas text-center relative z-10">
         <div className="max-w-[1000px] mx-auto flex flex-col items-center">
            <ScrollReveal>
               <h2 className="font-instrument text-[clamp(3.5rem,6vw,5.5rem)] text-deep-charcoal leading-tight mb-12">
                 Bist du bereit, diese <br/>
                 <span className="italic text-refined-gold">feine Stimme</span> in dir zu hören?
               </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
               <p className="text-xl md:text-2xl text-warm-steel font-light leading-relaxed mb-16 max-w-2xl mx-auto">
                 Lass uns in einem Kennenlerngespräch unverbindlich herausfinden, ob dieser stille Raum das ist, was du gerade suchst.
               </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
               <Link 
                 href="mailto:anfrage@sabala.de" 
                 className="inline-flex items-center justify-center px-10 md:px-12 py-5 md:py-6 text-sm md:text-lg font-bold uppercase tracking-widest rounded-full text-white bg-deep-charcoal hover:bg-refined-gold transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl"
               >
                 Unverbindliche Anfrage →
               </Link>
            </ScrollReveal>
         </div>
      </section>

    </div>
  );
}
