import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Link from "next/link";
import { ArrowRight, Lock, Sparkles, UserCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Termin buchen | Sabala Coaching",
  description: "Wähle den passenden Raum für unsere Zusammenarbeit. Nur für Klienten und High-Ticket Mentoring Anfragen.",
};

export default function BookingGatekeeperPage() {
  return (
    <main className="flex flex-col w-full bg-[#2E2B26] min-h-screen selection:bg-refined-gold selection:text-white pb-32">
      <Navbar />
      {/* HEADER SPACER */}
      <div className="pt-32 md:pt-48 w-full"></div>

      {/* HERO SECTION */}
      <section className="px-6 md:px-12 max-w-[1200px] mx-auto w-full relative z-10 text-center mb-24">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-8 text-white/60 font-mono text-xs uppercase tracking-widest">
            <Lock className="w-3 h-3 text-refined-gold" />
            <span>Klares Commitment</span>
          </div>
          
          <h1 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] text-white leading-[1.1] mb-6">
            Investiere in dein Wachstum.
          </h1>
          <p className="text-white/60 font-satoshi text-lg md:text-xl max-w-[600px] mx-auto leading-relaxed">
            Wahre Transformation erfordert Konsequenz. Meine Zeit fließt exklusiv in laufende Projekte und ernsthafte Premium-Anfragen. Bitte wähle den passenden Raum für unser Gespräch.
          </p>
        </ScrollReveal>
      </section>

      {/* 2-WAY GATEKEEPER GRID (Main Offers) */}
      <section className="px-6 md:px-12 max-w-[1000px] mx-auto w-full relative z-10">
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* OPTION 1: PREMIUM ONE-PAGER */}
            <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-[2rem] hover:bg-white/10 transition-colors flex flex-col group">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-8 border border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><path d="m9 16 3-3 3 3"/></svg>
              </div>
              <h3 className="font-instrument text-2xl text-white mb-4">Premium One-Pager Paket</h3>
              <p className="text-white/60 font-satoshi text-[1.05rem] leading-relaxed mb-10">
                Beratung für den kompakten Aufbau einer edlen, hoch-konvertierenden Landingpage für dein Angebot. Inklusive intensiver Betreuung und Setup.
              </p>

              <Link href="https://tidycal.com/sabala-mentoring/premium-onepager-paket-passen-wir-zusammen" target="_blank" className="inline-flex items-center justify-between w-full p-4 bg-transparent border border-white/20 text-white rounded-xl font-medium hover:border-white transition-all mt-auto">
                Erstgespräch buchen
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* OPTION 2: PREMIUM HIGH TICKET */}
            <div className="relative bg-gradient-to-b from-refined-gold/20 to-white/5 border border-refined-gold/30 p-8 md:p-10 rounded-[2rem] flex flex-col group overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-refined-gold/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="w-12 h-12 bg-refined-gold/20 rounded-xl flex items-center justify-center mb-8 border border-refined-gold/30">
                <Sparkles className="w-6 h-6 text-refined-gold" />
              </div>
              <h3 className="font-instrument text-2xl text-white mb-2">Premium Mentoring</h3>
              <span className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-4 inline-block">Ab 12.000 € Investition</span>
              
              <p className="text-white/80 font-satoshi text-[1.05rem] leading-relaxed mb-10">
                Du willst dein gesamtes Branding, dein High-Ticket Angebot und deine KI-Systematik im transformierenden 1:1 mit mir aufbauen. 
              </p>

              <Link href="https://tidycal.com/sabala-mentoring/premium-onepager-paket-passen-wir-zusammen" target="_blank" className="inline-flex items-center justify-between w-full p-4 bg-refined-gold text-deep-charcoal rounded-xl font-medium hover:bg-white transition-all shadow-[0_0_30px_rgba(196,164,119,0.3)] group-hover:shadow-[0_0_40px_rgba(196,164,119,0.5)] relative z-10 mt-auto">
                Zur Bewerbung
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </ScrollReveal>

        {/* EXISTING CLIENTS SECTION */}
        <ScrollReveal delay={0.3}>
          <div className="mt-6 bg-transparent border border-white/10 p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/5 transition-colors group">
            <div className="flex items-center gap-6 text-center md:text-left">
               <div className="hidden md:flex w-12 h-12 bg-white/5 rounded-xl items-center justify-center border border-white/5 shrink-0">
                 <UserCheck className="w-6 h-6 text-white/50" />
               </div>
               <div>
                  <h3 className="font-instrument text-xl text-white mb-2">Wir arbeiten bereits zusammen?</h3>
                  <p className="text-white/50 font-satoshi text-sm max-w-[400px]">
                     Du befindest dich im aktiven Mentoring? Dann buche hier deine anstehenden 1:1 Sessions.
                  </p>
               </div>
            </div>
            
            <Link href="https://tidycal.com/sabala-mentoring/premium-onepager-paket-passen-wir-zusammen" target="_blank" className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white hover:text-deep-charcoal transition-all whitespace-nowrap w-full md:w-auto">
              Zum internen Kalender
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* PSYCHOLOGICAL BARRIER / FILTER EXPLANATION */}
      <section className="px-6 md:px-12 max-w-[800px] mx-auto w-full mt-32 text-center">
        <ScrollReveal delay={0.4}>
          <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent mx-auto mb-12"></div>
          <h2 className="font-instrument text-2xl md:text-3xl text-white mb-6">Zeit sparen durch Wertschätzung</h2>
          <p className="text-white/50 font-satoshi text-lg leading-[1.8] max-w-[700px] mx-auto">
            Wahre Begleitung fordert Präsenz. Ich verarbeite keine Anfragen am Fließband, sondern arbeite konkret und intensiv an Ergebnissen. Diese Klarheit an der "Tür" spart uns beiden Zeit und schützt die Qualität des Mentorings.
          </p>
        </ScrollReveal>
      </section>

      {/* 
         BRIGHT & FRIENDLY CONTACT AREA 
         A dedicated light section that breaks out of the dark #[030206] page background.
      */}
      <div className="w-full bg-pure-surface text-deep-charcoal mt-32 rounded-t-[3rem] md:rounded-t-[5rem] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-refined-gold/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

        <section className="px-6 md:px-12 max-w-[1200px] mx-auto w-full py-24 md:py-32 relative z-10">
          <ScrollReveal>
             <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center justify-between">
                
                {/* THE PORTRAIT: Frontal, Inviting, Human */}
                <div className="w-full md:w-[400px] lg:w-[480px] shrink-0">
                   <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(26,26,24,0.1)] border border-whisper-border">
                      <img 
                        src="/Sabalas Story/Sabala.png" 
                        alt="Ilja Sabala Krasevskij" 
                        className="absolute inset-0 w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/20 to-transparent"></div>
                   </div>
                </div>

                {/* THE INVITING CONTACT FORM */}
                <div className="flex-1 w-full">
                   <h2 className="font-instrument text-[2.5rem] md:text-5xl text-deep-charcoal mb-6 leading-tight">
                     Unsicher, welcher <br className="hidden lg:block"/> Raum passt?
                   </h2>
                   <p className="text-warm-steel font-satoshi mb-12 leading-relaxed text-[1.15rem] max-w-lg">
                      Ein Bildschirm kann viel vermitteln, aber manchmal braucht es erst ein kurzes Wort von Mensch zu Mensch. Wenn du eine individuelle Frage hast oder nicht sicher bist, wo du aktuell stehst: Schreib mir offen und ehrlich. Ich antworte dir ganz persönlich.
                   </p>
                   
                   <form className="space-y-6 flex flex-col w-full max-w-lg">
                      <div className="flex flex-col gap-2">
                         <label htmlFor="name" className="text-xs text-warm-steel/60 font-mono tracking-[0.15em] uppercase">Wie darf ich dich nennen?</label>
                         <input type="text" id="name" className="bg-transparent border-b-2 border-whisper-border px-2 py-3 text-deep-charcoal focus:outline-none focus:border-refined-gold transition-colors font-satoshi text-lg" placeholder="Dein Name" />
                      </div>
                      <div className="flex flex-col gap-2">
                         <label htmlFor="email" className="text-xs text-warm-steel/60 font-mono tracking-[0.15em] uppercase">Wohin darf ich antworten?</label>
                         <input type="email" id="email" className="bg-transparent border-b-2 border-whisper-border px-2 py-3 text-deep-charcoal focus:outline-none focus:border-refined-gold transition-colors font-satoshi text-lg" placeholder="deine@email.de" />
                      </div>
                      
                      <div className="flex flex-col gap-2 mt-4">
                         <label htmlFor="message" className="text-xs text-warm-steel/60 font-mono tracking-[0.15em] uppercase">Deine Gedanken</label>
                         <textarea id="message" rows={3} className="bg-transparent border-b-2 border-whisper-border px-2 py-3 text-deep-charcoal focus:outline-none focus:border-refined-gold transition-colors resize-none font-satoshi text-lg" placeholder="Wie kann ich dir helfen?"></textarea>
                      </div>

                      <button type="button" className="bg-deep-charcoal hover:bg-refined-gold text-pure-surface rounded-full px-10 py-5 font-bold uppercase tracking-widest transition-all mt-8 shadow-[0_10px_30px_rgba(26,26,24,0.15)] hover:shadow-[0_15px_40px_rgba(184,150,62,0.3)] hover:-translate-y-1 self-start text-sm">
                         Nachricht senden
                      </button>
                   </form>
                </div>

             </div>
          </ScrollReveal>
        </section>
      </div>

    </main>
  );
}
