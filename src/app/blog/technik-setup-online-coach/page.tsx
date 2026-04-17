import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mic, MonitorPlay, Code2 } from "lucide-react";

export const metadata = {
  title: "Technik Setup für Online Coaches | Sabala Mentoring",
  description: "Warum deine energetische Präsenz als Online-Coach vom Equipment abhängt. Das perfekte Hardware- und Tool-Setup für ortsunabhängiges Arbeiten.",
};

export default function BlogPostPage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white pb-32">
      
      {/* HEADER SPACER */}
      <div className="pt-24 md:pt-32 w-full bg-[#2E2B26]"></div>

      {/* HERO SECTION */}
      <section className="relative w-full aspect-square md:aspect-[21/9] max-h-[800px] overflow-hidden bg-[#2E2B26]">
        <Image 
          src="https://picsum.photos/seed/sabala_office/1920/1080" 
          alt="Technik Setup Online Coach"
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
                <span className="bg-refined-gold/10 px-3 py-1 rounded-full border border-refined-gold/30">Business</span>
                <span className="text-deep-charcoal/80">Januar 2026</span>
                <span className="text-deep-charcoal/80 hidden sm:inline-block">•</span>
                <span className="text-deep-charcoal/80 hidden sm:inline-block">6 Min Lesezeit</span>
             </div>

             <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-deep-charcoal leading-[1.1] max-w-[1000px] mb-6 shadow-sm">
                Technik Setup für Online Coaches: Warum deine Präsenz am Equipment hängt.
             </h1>
             
             <p className="text-warm-steel text-lg md:text-xl font-satoshi max-w-[700px] leading-relaxed">
                Ein schlechtes Mikrofon zerstört selbst die tiefste energetische Übertragung. Wie du ortsunabhängig arbeitest, ohne dabei an Qualität und Ausstrahlung zu verlieren.
             </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="px-6 sm:px-12 md:px-24 pt-16 md:pt-24 max-w-[900px] mx-auto w-full relative">
        <ScrollReveal>
          <div className="prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.8] text-warm-steel">
             
            <p className="text-xl md:text-2xl font-light text-deep-charcoal mb-10 leading-relaxed border-l-2 border-refined-gold pl-6">
              Wenn du spürst, dass du sehr fein arbeitest, viel zwischen den Zeilen wahrnimmst und auf einer tiefen, relationalen Ebene mit Menschen in Verbindung trittst, dann weißt du: <strong>Freiheit darf nicht auf Kosten der Professionalität gehen.</strong>
            </p>

            <h2>Der energetische Wert von professioneller Präsenz</h2>
            <p>
              Viele denken: <em>„Ich bin ja noch am Anfang – da reicht doch auch das eingebaute Laptopmikrofon.“</em> Doch exakt hier beginnt ein massiver Denkfehler. Denn Präsenz ist nichts, was erst mit einem vollen Terminkalender oder fünfstelligen Monatsumsätzen wie durch Zauberhand entsteht. Präsenz beginnt jetzt – in genau dem Moment, in dem du das erste Mal mit jemandem in einem Zoom-Raum sprichst, der dich noch nie gesehen hat.
            </p>
            <p>
              In einer Stimme schwingt Energie mit. Ruhe. Ein sicherer Raum. Subtiles Vertrauen. Ein verrauschter Ton, lauter Hall oder Gegenlicht können in Sekunden alles zunichtemachen, was du auf emotionaler Ebene aufbauen willst. Wer fein und wahrnehmungsbasiert arbeitet, muss sicherstellen, dass das Gefäß (die Technik) dieses Feingefühl auch transportieren kann.
            </p>

            <blockquote className="bg-warm-canvas border-l-4 border-refined-gold p-8 rounded-r-2xl my-12 italic text-xl text-deep-charcoal shadow-sm">
              "Ein gutes Setup ist weit mehr als Technik: Es ist ein unterbewusstes Ja zur Zusammenarbeit. Es signalisiert Wertschätzung, Präsenz und Klarheit."
            </blockquote>

            <h2>Warum echte Ortsunabhängigkeit Umsatz kostet – und gutes Premium-Setup ihn bringt</h2>
            <p>
              Lassen wir die romantische Illusion der "Strandliege mit Laptop"-Nomaden kurz beiseite: Wahre Ortsunabhängigkeit erfordert Cashflow. Du musst dir Flüge leisten, hochwertige Unterkünfte für ruhige Calls buchen und ein Backup an Finanzen haben, das dir die innere Ruhe gibt, um souverän zu begleiten. Diese Freiheit bedingt also zwingend eine erfolgreiche Business-Struktur und einen gewissen monatlichen Umsatz.
            </p>
            <p>
              Genau hier schließt sich der Kreis zur Technik: Wer hochpreisige Premium-Kunden anziehen und abschließen möchte, <em>muss</em> einen Premium-Raum halten können. Ein unscharfes MacBook-Webcam-Bild und ein scheppernder AirPods-Sound signalisieren dem Gegenüber auf tiefster, unbewusster Ebene: <em>"Hier ist es noch wackelig."</em> 
            </p>
            <p>
              Die Investition in exzellente Technik ist also kein netter Bonus, den man sich "irgendwann mal gönnt". Es ist das absolute Fundament, das dir genau den professionellen Rahmen verleiht, in dem Premium-Preise selbstverständlich wirken. Die Technik refinanziert sich durch das Vertrauen, das du im ersten Zoom-Call ausstrahlst, nahezu von selbst.
            </p>

            <h2>Mein mobiles Coaching-Studio (Hardware & Setup)</h2>
            <p>
               Nach vier Jahren ortsunabhängiger Selbstständigkeit habe ich mein Equipment so kuratiert, dass es in einen Rucksack (Handgepäck) und einen Koffer passt – und dir gleichzeitig die Qualität eines vollwertigen Studios liefert. Hier ist mein exaktes Fundament (alle Links sind meine echten Empfehlungen, ohne Affiliate-Zwang):
            </p>
             
          </div>
        </ScrollReveal>

        {/* HIGH END PRODUCT GRID - HARDWARE */}
        <ScrollReveal delay={0.2}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
              
              <a href="https://www.apple.com/macbook-pro/" target="_blank" rel="noopener noreferrer" className="bg-white border border-whisper-border p-8 rounded-2xl shadow-sm hover:shadow-lg hover:border-refined-gold/50 transition-all group block">
                 <div className="w-12 h-12 bg-warm-canvas rounded-xl flex items-center justify-center mb-6 text-deep-charcoal group-hover:text-refined-gold transition-colors">
                    <MonitorPlay className="w-6 h-6" />
                 </div>
                 <h3 className="font-instrument text-2xl text-deep-charcoal mb-3 flex items-center justify-between">
                    MacBook Pro M2 
                    <span className="text-sm font-satoshi text-warm-steel">→</span >
                 </h3>
                 <p className="text-warm-steel text-sm leading-relaxed">
                    Leistungsstark, stabil und zuverlässig. Dazu nutze ich einen faltbaren Alu-Laptop-Ständer mit RGB-Kühlung, der in warmen Ländern die Platine vor Überhitzung schützt.
                 </p>
              </a>

              <a href="https://www.thomann.de/de/rode_nt_usb_554868.htm" target="_blank" rel="noopener noreferrer" className="bg-white border border-whisper-border p-8 rounded-2xl shadow-sm hover:shadow-lg hover:border-refined-gold/50 transition-all group block">
                 <div className="w-12 h-12 bg-warm-canvas rounded-xl flex items-center justify-center mb-6 text-deep-charcoal group-hover:text-refined-gold transition-colors">
                    <Mic className="w-6 h-6" />
                 </div>
                 <h3 className="font-instrument text-2xl text-deep-charcoal mb-3 flex items-center justify-between">
                    Rode NT-USB & Zubehör
                    <span className="text-sm font-satoshi text-warm-steel">→</span >
                 </h3>
                 <p className="text-warm-steel text-sm leading-relaxed">
                    Ein klares, warmes Stimmbild. Ergänzt durch die SM-R Spinne und einen Tisch-Mikrofonarm von Rode. (Für unterwegs nutze ich den kleinen mitgelieferten Tischständer).
                 </p>
              </a>

              <a href="https://www.sony.de/compact-cameras/products/zv-1" target="_blank" rel="noopener noreferrer" className="bg-white border border-whisper-border p-8 rounded-2xl shadow-sm hover:shadow-lg hover:border-refined-gold/50 transition-all group block">
                 <div className="w-12 h-12 bg-warm-canvas rounded-xl flex items-center justify-center mb-6 text-deep-charcoal group-hover:text-refined-gold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                 </div>
                 <h3 className="font-instrument text-2xl text-deep-charcoal mb-3 flex items-center justify-between">
                    Sony ZV-1 & Elgato Cam Link
                    <span className="text-sm font-satoshi text-warm-steel">→</span >
                 </h3>
                 <p className="text-warm-steel text-sm leading-relaxed">
                    Für meine Zoom-Calls mit unglaublicher Tiefenschärfe. Sie steht auf einem Walimex Pro 2-in-1 Stativ XL und ist via Elgato an meinen Mac gekoppelt.
                 </p>
              </a>

              <a href="https://www.amazon.de/dp/B0B87T6VXT" target="_blank" rel="noopener noreferrer" className="bg-white border border-whisper-border p-8 rounded-2xl shadow-sm hover:shadow-lg hover:border-refined-gold/50 transition-all group block">
                 <div className="w-12 h-12 bg-warm-canvas rounded-xl flex items-center justify-center mb-6 text-deep-charcoal group-hover:text-refined-gold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="14" x="3" y="5" rx="2" ry="2"/><path d="M8 21h8"/><path d="M12 19v2"/></svg>
                 </div>
                 <h3 className="font-instrument text-2xl text-deep-charcoal mb-3 flex items-center justify-between">
                    Zweiter Monitor (UPerfect 2K)
                    <span className="text-sm font-satoshi text-warm-steel">→</span >
                 </h3>
                 <p className="text-warm-steel text-sm leading-relaxed">
                    Ein 16 Zoll 2K-Monitor (USB-C), der mich überallhin begleitet. Er steht stabil auf Augenhöhe dank des Cooper TabStand iPad-Ständers. Ergonomisch, tragbar und hell.
                 </p>
              </a>
              
              <div className="bg-white border border-whisper-border p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all group block md:col-span-2">
                 <h3 className="font-instrument text-2xl text-deep-charcoal mb-4">Weiteres Must-Have Equipment</h3>
                 <ul className="text-warm-steel text-sm leading-relaxed space-y-3 grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <li>• <a href="https://www.amazon.de/dp/B07PNNTTV1" target="_blank" className="underline hover:text-refined-gold">Licht: Raleno 192 VideoLight</a> auf Manfrotto Mini-Stativ</li>
                    <li>• <a href="https://magic-mic.de/" target="_blank" className="underline hover:text-refined-gold">Magic Mic Funkmikrofon</a> mit Noise-Canceling (perfekt für laute Rollfelder oder Bahnhöfe)</li>
                    <li>• <a href="https://www.smallrig.com/" target="_blank" className="underline hover:text-refined-gold">SmallRig Handy-Käfig</a> für hochqualitative Smartphone Vlogs</li>
                    <li>• <a href="https://www.amazon.de/Elgato-Studio-Controller-ausl%C3%B6sen-Software-20GBA9901-wt/dp/B09RMXK59C" target="_blank" className="underline hover:text-refined-gold">Elgato Stream Deck</a> zur Steuerung von OBS</li>
                    <li>• Kabelgebundene <a href="#" className="underline hover:text-refined-gold">Maus von TECKNET</a> & <a href="#" className="underline hover:text-refined-gold">USB-C Tastatur von Senda</a> (Strahlungsreduziert)</li>
                    <li>• <a href="https://www.rollei.de/collections/rucksacke/products/fotorucksack-fotoliner-ocean-l" target="_blank" className="underline hover:text-refined-gold">Rucksack: Rollei Foto-Liner Ocean L</a> (Mein treuer Raumschaffer)</li>
                 </ul>
              </div>

           </div>
        </ScrollReveal>

        <ScrollReveal>
           <div className="prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.8] text-warm-steel">
              <h2>Bonus-Tools & Software: Smart & effizient arbeiten</h2>
              <p>
                 Ein Premium-Setup hört nicht bei der Hardware auf. Als Solopreneur bist du darauf angewiesen, dass deine Prozesse im Hintergrund lautlos und perfekt ineinandergreifen, ohne dass sie dir Energie rauben.
              </p>
              
              <ul className="list-none pl-0 space-y-4 my-8">
                 <li className="flex items-start gap-3">
                    <span className="text-refined-gold mt-1">✅</span>
                    <span><a href="https://www.zoom.us/" target="_blank" className="font-medium hover:text-refined-gold border-b border-warm-steel/30">Zoom Pro</a> – Für einwandfreie Video-Begleitungen und Breakout-Sessions.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <span className="text-refined-gold mt-1">✅</span>
                    <span><a href="https://www.canva.com/" target="_blank" className="font-medium hover:text-refined-gold border-b border-warm-steel/30">Canva Pro</a> – Alles von Instagram-Posts bis zu professionellen Pitchdecks.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <span className="text-refined-gold mt-1">✅</span>
                    <span><a href="https://www.notion.so/" target="_blank" className="font-medium hover:text-refined-gold border-b border-warm-steel/30">Notion Pro</a> – Mein minimalistisches CRM und Second-Brain.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <span className="text-refined-gold mt-1">✅</span>
                    <span><a href="https://trello.com/" target="_blank" className="font-medium hover:text-refined-gold border-b border-warm-steel/30">Trello</a> – Für Content-Planung und saubere Aufgabenstrukturen.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <span className="text-refined-gold mt-1">✅</span>
                     <span><a href="https://chatgpt.com/" target="_blank" className="font-medium hover:text-refined-gold border-b border-warm-steel/30">ChatGPT Pro</a> – Der absolute Allrounder für Konzeptarbeit, Gliederungen und strategische Klarheit.</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <span className="text-refined-gold mt-1">✅</span>
                    <span><strong>Weitere Schätze:</strong> Riverside.fm (für den Podcast), OBS Studio (für Setups) & TidyCal (für Termine).</span>
                 </li>
              </ul>

              <h2>Wann "KI-Power" wirklich den Unterschied macht</h2>
              <p>
                 Du musst kein Techniknerd sein, um all diese Systeme zu beherrschen. Wenn du dein ChatGPT richtig konfigurierst – oder noch besser, unsere maßgeschneiderte <strong className="text-deep-charcoal border-b border-refined-gold">Sabala Diamond Force</strong> einsetzt – nimmt sie dir stundenlange Technik- und Konzeptarbeit ab, sodass dir mehr Raum und Kraft für das bleibt, worin du wirklich brillant bist: Die Arbeit mit Menschen.
              </p>

              <h2>Eine Frage der Haltung</h2>
              <p>
                 Investiere früh in dein Setup und deine Systeme. Der erste Eindruck entscheidet oft in Millisekunden über Vertrauen, Sicherheit und eine mögliche, hochpreisige Zusammenarbeit.
              </p>
           </div>
        </ScrollReveal>

      </section>

      {/* CTA SECTION - DIAMOND FORCE / PREMIUM */}
      <section className="px-6 md:px-12 mt-24 max-w-[1000px] mx-auto w-full">
         <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2E2B26] border border-white/10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 group shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
               
               <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-refined-gold/5 lg:from-refined-gold/10 pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100"></div>

               <div className="flex-1 relative z-10 text-center md:text-left">
                  <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6">Lass uns den Raum halten.</h3>
                  <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8">
                     Wenn du spürst, dass du dir ein Premium-Business mit Freiheit und Tiefe aufbauen willst, dir aber das technische und strategische Fundament fehlt: Wir bauen es für dich. Deine Premium-Website, deine Diamond Force KI und dein klares Angebot.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                     <Link href="/premium-angebot" className="bg-refined-gold hover:bg-white text-deep-charcoal px-8 py-4 rounded-full font-medium transition-colors w-full sm:w-auto text-center">
                        Zum Premium Mentoring
                     </Link>
                     <Link href="/termin-buchen" className="text-white/80 hover:text-white px-6 py-4 transition-colors font-medium border border-white/10 rounded-full hover:bg-white/5 w-full sm:w-auto text-center">
                        Erstgespräch buchen
                     </Link>
                  </div>
               </div>

               <div className="w-full md:w-1/3 flex justify-center shrink-0 relative z-10">
                  <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md">
                     <Code2 className="w-12 h-12 text-refined-gold" />
                  </div>
               </div>
            </div>
         </ScrollReveal>
      </section>

    </main>
  );
}
