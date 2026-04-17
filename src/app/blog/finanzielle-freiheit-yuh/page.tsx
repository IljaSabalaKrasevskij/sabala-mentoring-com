import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Globe, Smartphone, Landmark } from "lucide-react";

export const metadata = {
  title: "Wo ist mein Geld sicher? Traditionelles Banking vs. Yuh Anlage | Sabala",
  description: "Die finanzielle Freiheit von digitalen Nomaden. Warum das klassische Bankensystem oft einengt und warum eine intelligente App wie Yuh die moderne Lösung sein kann.",
};

export default function BlogFinanceYuhPage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white pb-32">
      
      {/* HEADER SPACER */}
      <div className="pt-24 md:pt-32 w-full bg-[#2E2B26]"></div>

      {/* HERO SECTION */}
      <section className="relative w-full aspect-square md:aspect-[21/9] max-h-[800px] overflow-hidden bg-[#2E2B26]">
        <Image 
          src="https://picsum.photos/seed/nomad_finance/1920/1080" 
          alt="Finanzielle Freiheit und moderne Banking Alternativen"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pure-surface via-pure-surface/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pure-surface/90 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full px-6 sm:px-12 md:px-24 pb-16 md:pb-24 max-w-[1400px] mx-auto z-10">
          <ScrollReveal>
             <Link href="/blog" className="inline-flex items-center gap-2 text-warm-steel hover:text-refined-gold transition-colors font-mono text-xs uppercase tracking-widest mb-10">
                <ArrowLeft className="w-4 h-4" /> Zurück zum Journal
             </Link>
             
             <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-refined-gold mb-6">
                <span className="bg-refined-gold/10 px-3 py-1 rounded-full border border-refined-gold/30">Finance</span>
                <span className="text-deep-charcoal/80">Januar 2026</span>
                <span className="text-deep-charcoal/80 hidden sm:inline-block">•</span>
                <span className="text-deep-charcoal/80 hidden sm:inline-block">6 Min Lesezeit</span>
             </div>

             <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-deep-charcoal leading-[1.1] max-w-[1000px] mb-6 shadow-sm">
                Finanzielle Freiheit: Warum wir unser Geld-Set-up neu denken müssen.
             </h1>
             
             <p className="text-warm-steel text-lg md:text-xl font-satoshi max-w-[700px] leading-relaxed">
                Reisen und ortsunabhängiges Arbeiten ist das eine. Wirklich frei über sein Geld verfügen zu können, das andere. Ein Blick auf Limits im traditionellen Banking und warum ich zunehmend auf moderne Set-ups vertraue.
             </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="px-6 sm:px-12 md:px-24 pt-16 md:pt-24 max-w-[900px] mx-auto w-full relative">
        <ScrollReveal>
          <div className="prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.8] text-warm-steel">
             
            <p className="text-xl md:text-2xl font-light text-deep-charcoal mb-10 leading-relaxed border-l-2 border-refined-gold pl-6">
              Das Bankensystem gehört seit Jahrhunderten zu den zentralen Infrastrukturen der Gesellschaft. Es organisiert Zahlungsverkehr und verwahrt Vermögen. Doch als Unternehmer und Grenzgänger stellt man sich oft eine leise Frage: <strong>Wie frei bin ich eigentlich im Umgang mit meinem eigenen Geld?</strong>
            </p>

            <h2>Wer kontrolliert eigentlich "deine" Finanzen?</h2>
            <p>
              Im klassischen Bankensystem liegt dein Geld nicht direkt bei dir. Du lagerst es in die Infrastruktur der Bank aus. Das System beruht auf tiefem Vertrauen. Doch gleichzeitig bedeutet es, dass die Kontrolle schlichtweg delegiert ist.
            </p>
            <p>
              Wer viel im Ausland unterwegs ist, als digitaler Nomade lebt oder höhere internationale Buchungen für Immobilien oder Coachings tätigen möchte, wird schnell an Grenzen stoßen:
            </p>
            <ul>
                <li>Zahlungen werden wegen "Sicherheits-Algorithmen" abgelehnt.</li>
                <li>Konten oder Kreditkarten werden im Ausland temporär gesperrt.</li>
                <li>Undurchsichtige und teure Wechselkurse in Nicht-Euro-Ländern fressen die Margen.</li>
            </ul>
            <p>
              Diese Maßnahmen haben oft nachvollziehbare Gründe nach strengen Geldwäschegesetzen. Letztendlich führen sie jedoch zur Frage: <strong>Wer entscheidet, was ich mit meinem rechtmäßigen Geld tun darf?</strong>
            </p>

            <blockquote className="bg-warm-canvas border-l-4 border-refined-gold p-8 rounded-r-2xl my-12 italic text-xl text-deep-charcoal shadow-sm">
              "Finanzielle Freiheit bedeutet nicht nur, genug Geld zu verdienen. Es bedeutet, jederzeit souverän darüber verfügen zu können – weltweit, sicher und reibungslos."
            </blockquote>

            <h2>Deobanking und der Drang nach Dezentralität</h2>
            <p>
              Aus diesem Grund schauen sich Freigeister zunehmend Richtung dezentraler Finanzen (DeFi) oder Krypto-Lösungen um. Das Prinzip ist simpel: Weg von der zentralen Entscheidungs-Instanz, hin zur technologischen Infrastruktur (Blockchain). 
            </p>
            <p>
              Doch Seien wir ehrlich: Nicht jeder möchte sein Cashflow-System komplett in fremde Token, MetaMask Wallets und "Deobanking" überführen. Was die meisten Unternehmer und Weltenbummler suchen, ist der pragmatische <strong>Sweet Spot</strong>: Ein absolut sicheres Zuhause für Geld, gepaart mit den Freiheiten und der Geschwindigkeit eines digitalen Vorreiters. 
            </p>

            <h2>Meine Lösung: Der Brückenbauer "Yuh"</h2>
            <p>
               Nach langer Recherche in der FinTech-Welt bin ich bei einem Setup gelandet, das für mich diese Brücke perfekt schlägt. Keine klassische angestaubte Traditionsbank, aber auch keine wilde Krypto-Börse im Niemandsland. Stattdessen eine smarte Lösung kombiniert mit Schweizer Sicherheit: <strong>Yuh.</strong>
            </p>
             
          </div>
        </ScrollReveal>

        {/* HIGH END PRODUCT CARD - YUH */}
        <ScrollReveal delay={0.2}>
           <div className="bg-white border-2 border-whisper-border hover:border-refined-gold/30 p-8 md:p-12 rounded-[2rem] shadow-sm hover:shadow-xl transition-all my-16 relative overflow-hidden group">
              
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-refined-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <div className="flex flex-col md:flex-row gap-10 relative z-10">
                 
                 <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                       <div className="w-16 h-16 bg-warm-canvas rounded-2xl flex items-center justify-center text-deep-charcoal shrink-0">
                          <Landmark className="w-8 h-8 text-refined-gold" />
                       </div>
                       <div>
                          <h3 className="font-instrument text-3xl text-deep-charcoal">Die Yuh App</h3>
                          <span className="text-sm font-mono tracking-widest text-warm-steel uppercase">powered by Swissquote & PostFinance</span>
                       </div>
                    </div>
                    
                    <p className="text-warm-steel text-[1.1rem] leading-relaxed mb-8">
                       Yuh ist das Ergebnis zweier Schweizer Finanz-Schwergewichte. Es verbindet eine hochmoderne, intuitive App für den weltweiten Zahlungsverkehr mit der unglaublichen Stabilität des Schweizer Bankenplatzes. Perfekt für Freelancer, Nomaden und Freigeister.
                    </p>

                    <ul className="space-y-4 mb-10">
                       <li className="flex items-start gap-3">
                          <Globe className="w-5 h-5 text-refined-gold mt-1 shrink-0" />
                          <span className="text-deep-charcoal"><strong>Multi-Währungskonto:</strong> Halte Franken, Euro, Dollar und Zahle weltweit extrem günstig. Kein nerviges Ummünzen.</span>
                       </li>
                       <li className="flex items-start gap-3">
                          <Smartphone className="w-5 h-5 text-refined-gold mt-1 shrink-0" />
                          <span className="text-deep-charcoal"><strong>100% Digital & Agil:</strong> Krypto, ETFs und Aktien können direkt mit der gleichen App gekauft werden. Alles im souveränen Fluss.</span>
                       </li>
                       <li className="flex items-start gap-3">
                          <ShieldCheck className="w-5 h-5 text-refined-gold mt-1 shrink-0" />
                          <span className="text-deep-charcoal"><strong>Schweizer Sicherheit:</strong> Dein Geld liegt behütet im Schweizer Rechtssystem. Ein starkes Stück Unabhängigkeit.</span>
                       </li>
                    </ul>

                    <a href="https://www.yuh.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-deep-charcoal text-white rounded-full px-8 py-4 px- font-medium hover:bg-refined-gold transition-colors shadow-lg">
                       Yuh entdecken & Konto eröffnen
                    </a>
                 </div>

              </div>
           </div>
        </ScrollReveal>

        <ScrollReveal>
           <div className="prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.8] text-warm-steel">
              <h2>Ein neues Bewusstsein aufbauen</h2>
              <p>
                 Ich schreibe diesen Artikel nicht, um dir zu sagen, dass dein traditionelles Girokonto schlecht ist. Aber oft halten wir an alten Strukturen fest, weil wir uns scheuen, uns mit den "anstrengenden" Themen wie Finanzen zu beschäftigen.
              </p>
              <p>
                 Doch genau wie ein exzellentes Laptop-Equipment (siehe mein <Link href="/blog/technik-setup-online-coach" className="text-deep-charcoal border-b border-refined-gold hover:text-refined-gold transition-colors">Digital Setup</Link>) den Grundstein für deine energetische Freiheit in Calls legt, legt ein sauberes, dezentrales oder zumindest hochmodernes Bank-Setup das Fundament für ein wirklich ortsunabhängiges Gefühl.
              </p>
              <p>
                 Wer tiefen Frieden in seine Arbeit mit Menschen bringen will, sollte auch in seinem monetären Backup-System Ruhe und Sicherheit etabliert haben. Nimm diesen Artikel als einfachen Impuls, mal hinzuschauen: <strong>Welche Gefäße bewahren eigentlich meine Energievielfalt auf?</strong>
              </p>
           </div>
        </ScrollReveal>

      </section>

      {/* CTA SECTION */}
      <section className="px-6 md:px-12 mt-24 max-w-[1000px] mx-auto w-full">
         <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2E2B26] border border-white/10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 group shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
               <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-refined-gold/5 lg:from-refined-gold/10 pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100"></div>

               <div className="flex-1 relative z-10 text-center md:text-left">
                  <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6">Zeit, das alte Korsett zu sprengen?</h3>
                  <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8">
                     Egal ob es um dein Finanz-Setup, dein Business-Mentoring oder deine eigene Premium-Website geht. Wenn du spürst, dass die alten Schablonen dich limitieren, lass uns gemeinsam den Raum für echte Freiheit öffnen.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                     <Link href="/termin-buchen" className="text-white/80 hover:text-white px-6 py-4 transition-colors font-medium border border-white/10 rounded-full hover:bg-white/5 w-full sm:w-auto text-center">
                        Sabala persönlich sprechen
                     </Link>
                  </div>
               </div>
            </div>
         </ScrollReveal>
      </section>

    </main>
  );
}
