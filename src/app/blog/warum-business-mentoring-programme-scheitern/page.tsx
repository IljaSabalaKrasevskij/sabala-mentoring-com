import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Target, Users, Flame, Code2 } from "lucide-react";

export const metadata = {
  title: "Warum Business Mentoring Programme scheitern | Sabala Coaching",
  description: "Viele Business-Programme enttäuschen. Erfahre, woran du gute Mentoren erkennst – und warum echte 1:1 Begleitung wichtiger ist als perfekte Schablonen.",
};

export default function BlogMentoringPage() {
  return (
    <main className="flex flex-col w-full bg-pure-surface min-h-screen selection:bg-refined-gold selection:text-white pb-32">
      
      {/* HEADER SPACER */}
      <div className="pt-24 md:pt-32 w-full bg-[#2E2B26]"></div>

      {/* HERO SECTION */}
      <section className="relative w-full aspect-square md:aspect-[21/9] max-h-[800px] overflow-hidden bg-[#2E2B26]">
        <Image 
          src="https://picsum.photos/seed/mentoring_fail/1920/1080" 
          alt="Warum Business Mentoring Programme scheitern"
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
                <span className="text-deep-charcoal/80">Januar 2025</span>
                <span className="text-deep-charcoal/80 hidden sm:inline-block">•</span>
                <span className="text-deep-charcoal/80 hidden sm:inline-block">8 Min Lesezeit</span>
             </div>

             <h1 className="font-instrument text-[clamp(2.5rem,5vw,5rem)] text-deep-charcoal leading-[1.1] max-w-[1000px] mb-6 shadow-sm">
                Warum viele Business-Mentoring-Programme kläglich scheitern (und wie du Mentoren richtig wählst).
             </h1>
             
             <p className="text-warm-steel text-lg md:text-xl font-satoshi max-w-[700px] leading-relaxed">
                Der Markt ist geflutet von lauten Versprechen und Schablonen. Wenn du jedoch relational und feinsinnig arbeitest, greifen diese Massen-Systeme zu kurz. Ein ehrlicher Blick auf die tiefen Ursachen.
             </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="px-6 sm:px-12 md:px-24 pt-16 md:pt-24 max-w-[900px] mx-auto w-full relative">
        <ScrollReveal>
          <div className="prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.8] text-warm-steel">
             
            <p className="text-xl md:text-2xl font-light text-deep-charcoal mb-10 leading-relaxed border-l-2 border-refined-gold pl-6">
              Der Markt ist aktuell von Business-Mentoring-Angeboten geflutet. Leider geraten viele Suchende an völlig unpassende Schablonen, wodurch sie viel wertvolle Zeit und Geld verlieren. <strong>Hier erfährst du, warum das so ist und wie du dich schützen kannst.</strong>
            </p>

            <p>
              Dieser Artikel richtet sich besonders an Menschen, die mit Menschen arbeiten. Coaches, Therapeut:innen, Meditationslehrer, Trainer oder Begleiter, die <strong>tief wahrnehmen</strong>, empathisch sind und ihre Arbeit nicht in starre Konzepte pressen lassen wollen. 
            </p>
            <p>
              Wenn du spürst, dass du sehr fein arbeitest, viel zwischen den Zeilen wahrnimmst und dennoch Schwierigkeiten hast, deine Arbeit klar nach außen zu kommunizieren, dann liegt das absolut nicht an fehlender Kompetenz – sondern oft an der Art von Business-Denken, in die dich klassische Programme pressen wollen.
            </p>

            <h2>Warum große Mentoring-Programme in Versuchung führen</h2>
            <p>
              Die Versprechungen großer Business-Programme sind verlockend: <em>Success, Freedom, Leichtigkeit.</em> Viele Anbieter arbeiten mit extrem emotionaler Ansprache, die zielgerichtet die Schmerzpunkte ihrer Zielgruppe drückt:
            </p>
            <ul>
              <li><strong>Überforderung:</strong> „Du weißt nicht, wie du starten sollst? Hier ist Blueprint X!“</li>
              <li><strong>Angst vor Sichtbarkeit:</strong> „Mit unserer Methode gewinnst du Kunden, ohne dich zu verkaufen.“</li>
              <li><strong>Mangel an Struktur:</strong> „Unser Programm gibt dir den roten Faden.“</li>
            </ul>
            <p>
              Diese Versprechen wecken Hoffnung. Den Glauben, endlich den Durchbruch zu schaffen. Doch oft endet die Reise am gleichen Punkt, gepaart mit dem toxischen Gefühl: "Ich habe die Strategie wohl einfach nicht hart genug umgesetzt."
            </p>

           </div>
        </ScrollReveal>

        {/* 3 Schwächen Section */}
        <ScrollReveal delay={0.2}>
           <div className="my-16">
              <h2 className="font-instrument text-3xl md:text-4xl text-deep-charcoal mb-10">Die 3 größten strukturellen Schwächen</h2>
              
              <div className="flex flex-col gap-8">
                 <div className="bg-white border border-whisper-border p-8 md:p-10 rounded-2xl shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 text-[8rem] font-instrument leading-none text-warm-canvas group-hover:text-refined-gold/10 transition-colors pointer-events-none select-none">1</div>
                    <div className="relative z-10">
                       <h3 className="font-instrument text-2xl text-deep-charcoal mb-4 flex items-center gap-3">
                         <Users className="text-refined-gold w-6 h-6" /> Kein individueller Ansatz
                       </h3>
                       <p className="text-warm-steel text-[1.1rem] leading-relaxed">
                          Jeder Mensch bringt andere energetische Herausforderungen und Bedürfnisse mit. Ein vorgefertigter Videokurs oder eine Massen-Call-Struktur kann diese psychologische Komplexität nicht abdecken. Ein Coach muss Blockaden und unbewusste Ängste im Kontakt wittern und auflösen.
                       </p>
                    </div>
                 </div>

                 <div className="bg-white border border-whisper-border p-8 md:p-10 rounded-2xl shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 text-[8rem] font-instrument leading-none text-warm-canvas group-hover:text-refined-gold/10 transition-colors pointer-events-none select-none">2</div>
                    <div className="relative z-10">
                       <h3 className="font-instrument text-2xl text-deep-charcoal mb-4 flex items-center gap-3">
                         <Target className="text-refined-gold w-6 h-6" /> Mangelnde 1:1 Begleitung
                       </h3>
                       <p className="text-warm-steel text-[1.1rem] leading-relaxed">
                          Ohne persönliche Tiefe fehlt der Raum, um wirklich hinzuschauen. Ich hatte Kunden, die wochenlang prokrastiniert haben ("Technik funktioniert nicht") – erst in der tiefen 1:1 Arbeit kam heraus, dass dahinter die massive Angst vor Kontrollverlust steckte. So etwas löst kein Gruppencall mit 50 anderen.
                       </p>
                    </div>
                 </div>

                 <div className="bg-white border border-whisper-border p-8 md:p-10 rounded-2xl shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 text-[8rem] font-instrument leading-none text-warm-canvas group-hover:text-refined-gold/10 transition-colors pointer-events-none select-none">3</div>
                    <div className="relative z-10">
                       <h3 className="font-instrument text-2xl text-deep-charcoal mb-4 flex items-center gap-3">
                         <Flame className="text-refined-gold w-6 h-6" /> Fokus auf Taktik statt Transformation
                       </h3>
                       <p className="text-warm-steel text-[1.1rem] leading-relaxed">
                          Du kannst noch so viel über Skalierung, Funnels und "Hack" lernen. Bleibt die Verbindung zwischen deiner tiefen Intuition und den strategischen Business-Schritten aus, wird sich alles, was du tust, wie ein ständiger Verrat an deinen eigenen Werten anfühlen.
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </ScrollReveal>

        <ScrollReveal>
           <div className="prose prose-lg md:prose-xl prose-stone max-w-none font-satoshi leading-[1.8] text-warm-steel">
              <blockquote className="bg-warm-canvas border-l-4 border-refined-gold p-8 rounded-r-2xl my-12 italic text-xl text-deep-charcoal shadow-sm">
                "Erfolgreiches Mentoring schafft Klarheit, ohne die Tiefe zu verlieren. Es verbindet innere Ausrichtung mit der notwendigen äußeren Form (dem Business)."
              </blockquote>

              <h2>Wenn das Mentoring an der Oberfläche erstickt</h2>
              <p>
                Ein entscheidender Punkt, der in der glänzenden Online-Welt oft unter den Tisch fällt: Die Tiefe der Methode, aus der jemand arbeitet, <strong>muss zwingend zur Tiefe der Begleitung passen.</strong>
              </p>
              <p>
                Gerade Coaches, die wahrnehmungsbasiert oder spirituell arbeiten, erleben hier oft eine massive und schmerzhafte Lücke. Stell dir vor: Du heilst in deinen Sitzungen alte emotionale Wunden, arbeitest im tiefen Frequenz-Raum und nimmst feinste Nuancen in der Mimik deines Klienten wahr. Und dann triffst du auf einen Business-Mentor, der rein auf der kognitiven Macher-Ebene agiert (<em>"Schalte einfach diese Ads, schick 50 DMs am Tag und du musst nur launchen!"</em>).
              </p>
              <p>
                Das führt unweigerlich zu dem leisen, toxischen Gefühl: <em>"Mit mir stimmt etwas nicht. Ich schaffe das nicht."</em> Die Wahrheit ist aber: Du bist nicht unfähig. Die Sprache passt nur einfach nicht. Die Konzepte bleiben trockene Theorie, weil dein Nervensystem sich intuitiv dagegen wehrt, Menschen wie Nummern in einem Funnel zu behandeln. Was dir fehlt, ist kein noch aggressiverer Sales-Leitfaden, sondern ein Begleiter, der genau diesen tiefen Raum mit halten und verstehen kann.
              </p>

              <h2>Der innere Konflikt von feinsinnigen Experten</h2>
              <p>
                Viele hochbegabte Coaches ziehen sich irgendwann aus dem Marketing zurück. Sie posten weniger, sie verbergen sich, weil sich das laute "Trommeln" auf Social Media wie ein Verrat an ihrer eigenen spirituellen oder therapeutischen Ethik anfühlt. Sie glauben, sie müssten sich zwischen <strong>Integrität</strong> und <strong>Umsatz</strong> entscheiden. 
              </p>
              <p>
                Doch das ist der eigentliche Irrtum vieler Mentoring-Programme: Sie lehren dich, wie du eine Maske aufsetzt, um zu verkaufen. Echtes Business Mentoring lehrt dich, wie du deine innerste Haltung so klar und stark in den Markt stellst, dass die <em>richtigen</em> Klienten von ganz allein in Resonanz gehen.
              </p>

              <h2>So wählst du deinen Mentor in Zukunft richtig</h2>
              <p>
                Achte bei der Wahl deiner zukünftigen Begleitung nicht auf die Instagram-Follower oder das finanzielle Versprechen in der Bio. Achte auf <strong>Erfahrung, Empathie und den Frequenzraum</strong>, den diese Person erschaffen kann.
              </p>
              <ul>
                <li><strong>Gibt es eine echte Eins-zu-eins-Komponente?</strong> Ohne den 1:1 Resonanzraum ist individuelle innere Arbeit fast unmöglich. Schablonen verändern kein Bewusstsein.</li>
                <li><strong>Ist der Mentor selbst "coachbar"?</strong> Lasse niemals jemanden in deinen Kopf, der sich nicht selbst regelmäßig überprüfen und von anderen begleiten lässt. Wer nur sendet, aber nicht empfängt, ist blind für blinde Flecken.</li>
                <li><strong>Ist es Empathie oder Manipulation?</strong> Ein wahrer Begleiter fragt nicht nur nach deinen Zielen. Er hält auch stillen Raum für den Schmerz oder die Angst vor der nächsten Schwelle, ohne dass du sofort "High-Vibe" sein oder eine Checkliste ausfüllen musst.</li>
              </ul>
              
              <h2>Dein Weg zum wahren Fundament (Strategie trifft Tiefe)</h2>
              <p>
                 Am Ende ist oft gar nicht die Frage, welches theoretische Programm du brauchst. Die eigentliche Frage ist: Hast du ein <strong>digitales Zuhause</strong> (eine Website, ein Branding, eine Struktur), das die Komplexität deiner Seele überhaupt fassen kann? 
              </p>
              <p>
                 Wahres Mentoring bedeutet für uns heute nicht mehr nur "Reden". Es bedeutet, deine innere Wahrheit in eine funktionierende, hochprofessionelle Realität zu übersetzen – ohne deine Essenz zu kompromittieren. Wenn du die anstrengende Kundenakquise loslassen willst, brauchst du ein technisches Fundament, das deine Ausstrahlung für dich übernimmt.
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
                  <h3 className="font-instrument text-3xl md:text-4xl text-white mb-6">Wenn du keine Schablone, <br/> sondern Klarheit suchst.</h3>
                  <p className="text-white/60 font-satoshi text-lg leading-relaxed mb-8">
                     Spürst du, dass klassische Massenprogramme nicht zu deiner energetischen Arbeit passen? Lass uns gemeinsam hingucken, was dein Angebot wirklich trägt und wie wir es nach außen sichtbar machen.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                     <Link href="/premium-angebot" className="bg-refined-gold hover:bg-white text-deep-charcoal px-8 py-4 rounded-full font-medium transition-colors w-full sm:w-auto text-center">
                        Zum Premium Mentoring
                     </Link>
                     <Link href="/termin-buchen" className="text-white/80 hover:text-white px-6 py-4 transition-colors font-medium border border-white/10 rounded-full hover:bg-white/5 w-full sm:w-auto text-center">
                        Sabala persönlich sprechen
                     </Link>
                  </div>
               </div>

               <div className="w-full md:w-1/3 flex justify-center shrink-0 relative z-10">
                  <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md">
                     <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-refined-gold"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
               </div>
            </div>
         </ScrollReveal>
      </section>

    </main>
  );
}
