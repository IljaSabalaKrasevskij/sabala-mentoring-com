import Image from "next/image";
import Link from "next/link";

export default function PresentationPage() {
  return (
    <div className="bg-warm-canvas min-h-screen font-satoshi text-deep-charcoal print:bg-white print:m-0 print:p-0 presentation-container">
      
      {/* Slide 1: Cover / Hook */}
      <section className="print-slide relative h-[1080px] w-[1920px] flex flex-col pt-16 bg-warm-canvas overflow-hidden">
        {/* LOGO */}
        <div className="w-full flex justify-center mb-10 z-20">
          <Image 
            src="/images/logo-sabala-mentoring.png" 
            alt="Sabala Logo" 
            width={260} 
            height={60} 
            className="object-contain"
          />
        </div>

        <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-gold-glow rounded-bl-full opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[80vh] h-[80vh] bg-whisper-border rounded-tr-full opacity-30 pointer-events-none"></div>

        <div className="relative z-10 w-[1920px] px-32 grid grid-cols-2 gap-20 items-center flex-grow mb-16">
          <div>
            <div className="mb-6 inline-block bg-refined-gold/10 text-refined-gold px-5 py-2 rounded-full text-sm font-bold tracking-widest uppercase shadow-sm border border-refined-gold/30">
              Exklusives Community-Angebot
            </div>
            <h1 className="font-instrument text-[100px] leading-[1.05] tracking-tight mb-8">
              Premium <br />
              <span className="italic text-refined-gold">One-Pager</span> <br />
              Paket.
            </h1>
            <p className="text-warm-steel text-2xl leading-relaxed max-w-lg mb-10">
              Dein digitaler Premium-Auftritt in nur 7 Tagen. Ein auf dich zugeschnittenes Fundament aus Branding, strategischer Klarheit und verkaufsstarkem Design.
            </p>
            <div className="p-6 bg-pure-surface border border-whisper-border shadow-warm-shadow rounded-2xl max-w-sm">
              <p className="text-sm text-warm-steel mb-2 uppercase tracking-widest font-bold">Exklusiv für</p>
              <p className="font-medium text-xl text-deep-charcoal">
                Connecting Herzkreative
              </p>
            </div>
          </div>
          
          <div className="h-full flex flex-col items-center justify-center relative">
            <div className="relative w-[600px] h-[600px] rounded-full overflow-hidden border-8 border-white shadow-[0_40px_80px_rgba(184,150,62,0.15)] group transform hover:-translate-y-2 transition-transform duration-700">
               <Image 
                src="/Bilder Sabala/16 - 74_CH_Sehnde_.jpg" 
                alt="Ilja Sabala"
                fill
                className="object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-1000"
                priority
              />
            </div>
            <div className="mt-8 text-center bg-white/60 backdrop-blur-md px-10 py-4 rounded-full border border-whisper-border shadow-sm">
                <p className="font-instrument text-4xl text-refined-gold mb-1">Ilja Sabala Krasevskij</p>
                <p className="text-warm-steel font-satoshi uppercase tracking-widest text-sm font-bold">Business Architekt</p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 2: Problem Awareness */}
      <section className="print-slide night-section relative h-[1080px] w-[1920px] flex items-center justify-center overflow-hidden">
        <div className="w-[1920px] px-24 z-10 grid grid-cols-2 gap-24 items-center">
            
            <div className="relative h-[800px] w-full rounded-[40px] overflow-hidden border border-night-gold/20 shadow-2xl">
              <Image 
                src="/Bilder Sabala/10 - _MXS8210.jpg"
                alt="Sabala Focus"
                fill
                className="object-cover object-top opacity-80" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12 bg-deep-charcoal/95 backdrop-blur border border-night-gold/20 p-10 rounded-2xl">
                 <div className="absolute -top-4 -left-2 text-night-gold/20 text-8xl font-instrument leading-none">"</div>
                  <p className="font-instrument text-4xl leading-[1.3] text-white relative z-10 mt-4">
                     Wenn dein Außenauftritt nicht widerspiegelt, was du innerlich zu geben hast, verlierst du genau die Kunden, denen du am besten helfen könntest.
                  </p>
              </div>
            </div>

            <div>
               <h2 className="font-instrument text-7xl leading-[1.1] mb-10">
                  Dein Potenzial ist riesig. <br/>
                  <span className="text-night-secondary">Aber dein Auftritt zeigt es nicht.</span>
               </h2>
               <p className="text-night-secondary text-2xl leading-relaxed mb-10">
                  Wir sehen es immer wieder: Großartige Coaches und Dienstleister, die unfassbaren Wert stiften, aber deren digitale Präsenz wie ein Baukasten wirkt.
               </p>
               <ul className="space-y-6 mt-8">
                  <li className="flex items-start gap-6 p-6 border border-night-secondary/20 rounded-2xl bg-deep-charcoal/50">
                     <span className="text-night-gold text-3xl">✕</span>
                     <span className="text-white text-xl font-light leading-relaxed">Ein "Bauchladen" an Angeboten verwirrt deine Besucher.</span>
                  </li>
                  <li className="flex items-start gap-6 p-6 border border-night-secondary/20 rounded-2xl bg-deep-charcoal/50">
                     <span className="text-night-gold text-3xl">✕</span>
                     <span className="text-white text-xl font-light leading-relaxed">Deine Seite sieht aus wie jede zweite Template-Website.</span>
                  </li>
                  <li className="flex items-start gap-6 p-6 border border-night-secondary/20 rounded-2xl bg-deep-charcoal/50">
                     <span className="text-night-gold text-3xl">✕</span>
                     <span className="text-white text-xl font-light leading-relaxed">Kunden verstehen nicht sofort, warum sie genau zu dir sollen.</span>
                  </li>
               </ul>
            </div>
        </div>
      </section>

      {/* Slide 3: Die Lösung (Klarheitsfokus) */}
      <section className="print-slide relative h-[1080px] w-[1920px] flex items-center justify-center bg-warm-canvas overflow-hidden">
        <div className="w-[1920px] px-24 z-10">
            <p className="text-refined-gold tracking-[0.2em] font-medium text-lg mb-6 uppercase text-center">Der Paradigmenwechsel</p>
            <h2 className="font-instrument text-8xl leading-tight mb-20 text-center">
              Warum der <span className="italic">Klarheitsfokus</span> alles verändert.
            </h2>
            
            <div className="grid grid-cols-12 gap-12 h-[550px]">
              <div className="col-span-8 grid grid-cols-2 gap-8">
                <div className="bg-pure-surface border border-whisper-border p-10 rounded-3xl flex flex-col justify-center">
                  <div className="text-refined-gold font-instrument text-6xl mb-6">1.</div>
                  <h3 className="font-instrument text-4xl mb-4">Eine Zielgruppe</h3>
                  <p className="text-warm-steel text-xl leading-relaxed">
                    Wer zu jedem spricht, erreicht niemanden. Wenn du spezifisch bist, fühlen sich Kunden tief verstanden.
                  </p>
                </div>
                <div className="bg-pure-surface border-2 border-refined-gold p-10 rounded-3xl flex flex-col justify-center shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-refined-gold/5"></div>
                  <div className="text-refined-gold font-instrument text-6xl mb-6 relative z-10">2.</div>
                  <h3 className="font-instrument text-4xl mb-4 relative z-10">Ein Angebot</h3>
                  <p className="text-deep-charcoal text-xl relative z-10 font-medium leading-relaxed">
                    Wir rücken dein stärkstes Kernangebot in den Fokus. Das eliminiert Stress und kreiert Sog.
                  </p>
                </div>
                <div className="bg-pure-surface border border-whisper-border p-10 rounded-3xl flex flex-col justify-center col-span-2">
                  <div className="text-refined-gold font-instrument text-6xl mb-6">3.</div>
                  <h3 className="font-instrument text-4xl mb-4">Ein Vertriebsweg</h3>
                  <p className="text-warm-steel text-xl w-3/4 leading-relaxed">
                    Komplexe Funnels lenken nur ab. Eine clevere Customer Journey auf deiner Premium-Seite reicht aus, um aus Interessenten Kunden zu machen.
                  </p>
                </div>
              </div>
              <div className="col-span-4 relative rounded-3xl overflow-hidden border border-whisper-border shadow-xl">
                 <Image 
                  src="/Bilder Sabala/36 - 373_CH_Sehnde_.jpg"
                  alt="Sabala Clarifying"
                  fill
                  className="object-cover object-center filter contrast-125"
                />
              </div>
            </div>
        </div>
      </section>

      {/* Slide 4: Was im Paket enthalten ist */}
      <section className="print-slide night-section relative h-[1080px] w-[1920px] flex items-center justify-center overflow-hidden">
        <div className="w-[1920px] px-24 z-10 flex flex-col justify-center py-20">
          <div className="mb-16">
            <p className="text-night-gold tracking-widest uppercase text-lg mb-6">Der Lieferumfang</p>
            <h2 className="font-instrument text-7xl leading-tight text-white mb-6">Das Premium One-Pager Paket.</h2>
            <p className="text-night-secondary text-2xl border-l-2 border-night-gold pl-6 mt-6 max-w-3xl leading-relaxed">Kein Template. Kein Baukasten. Deine 100% individuelle Premium Identität.</p>
          </div>
          
          <div className="grid grid-cols-12 gap-10 h-[550px]">
             <div className="col-span-4 relative rounded-3xl overflow-hidden border border-night-gold/20 h-full">
               <Image 
                 src="/Bilder Sabala/16 - 74_CH_Sehnde_.jpg"
                 alt="Sabala Mentor"
                 fill
                 className="object-cover object-top opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
               />
               <div className="absolute inset-0 border-4 border-night-gold/20 rounded-3xl"></div>
             </div>
             
             <div className="col-span-8 grid grid-cols-2 gap-8 h-full">
                <div className="p-10 border border-night-secondary/20 rounded-[32px] bg-deep-charcoal flex flex-col justify-center">
                   <div className="mb-6">
                      <span className="font-instrument text-5xl text-night-gold">01 . </span>
                      <span className="font-instrument text-4xl text-white">Brandstrategie</span>
                   </div>
                   <p className="text-night-secondary text-xl leading-relaxed">
                      Wir definieren deine exakte strategische Ausrichtung am Markt, damit du Premium wirkst.
                   </p>
                </div>

                <div className="p-10 border border-night-secondary/20 rounded-[32px] bg-deep-charcoal flex flex-col justify-center">
                   <div className="mb-6">
                      <span className="font-instrument text-5xl text-night-gold">02 . </span>
                      <span className="font-instrument text-4xl text-white">Visueller Brandguide</span>
                   </div>
                   <p className="text-night-secondary text-xl leading-relaxed">
                      Farben, Typografie, Bildsprache & Mood. Alles feinsäuberlich dokumentiert.
                   </p>
                </div>

                <div className="p-10 border border-night-gold/30 rounded-[32px] bg-[#22221f] flex flex-col justify-center shadow-[0_0_30px_rgba(201,168,76,0.05)]">
                   <div className="mb-6">
                      <span className="font-instrument text-5xl text-night-gold">03 . </span>
                      <span className="font-instrument text-4xl text-white">Premium One-Pager</span>
                   </div>
                   <p className="text-night-secondary text-xl leading-relaxed">
                      Eine designstarke, mobil-optimierte Landingpage. Nach Verkaufspsychologie aufgebaut.
                   </p>
                </div>

                <div className="p-10 border-2 border-night-gold rounded-[32px] bg-night-gold/5 flex flex-col justify-center relative shadow-[0_0_30px_rgba(201,168,76,0.1)]">
                   <div className="absolute top-0 right-0 bg-night-gold text-black text-sm font-bold px-6 py-2 rounded-bl-xl uppercase tracking-wider">Bonus</div>
                   <div className="mb-6">
                      <span className="font-instrument text-5xl text-night-gold text-opacity-50">04 . </span>
                      <span className="font-instrument text-4xl text-white">Contentplan</span>
                   </div>
                   <p className="text-white text-xl leading-relaxed">
                      Präsentation deiner Content-Säulen. Die klare Strategie für deine Sichtbarkeit.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Slide 5: Der Prozess Visualisiert */}
      <section className="print-slide relative h-[1080px] w-[1920px] flex items-center justify-center bg-warm-canvas overflow-hidden">
         <div className="w-[1920px] px-24 z-10">
            <h2 className="font-instrument text-7xl leading-tight mb-20 text-center">
              Der Weg zur neuen Website.<br/> <span className="italic text-refined-gold">Einfach, strukturiert & zügig.</span>
            </h2>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-[80px] left-0 w-full h-1 bg-whisper-border"></div>
              <div className="absolute top-[80px] left-0 w-2/3 h-1 bg-refined-gold"></div>

              <div className="grid grid-cols-3 gap-16">
                 {/* Step 1 */}
                 <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-refined-gold text-white flex items-center justify-center font-instrument text-4xl absolute -top-[30px] left-1/2 -translate-x-1/2 outline outline-[12px] outline-warm-canvas shadow-lg">1</div>
                    <div className="bg-pure-surface border border-whisper-border p-12 rounded-[40px] mt-[80px] text-center shadow-lg hover:-translate-y-2 transition-transform duration-500">
                       <h3 className="font-instrument text-4xl mb-4">Das Kennenlernen</h3>
                       <p className="text-warm-steel text-lg mb-6">Kostenfreies 30-Minuten Gespräch</p>
                       <p className="leading-relaxed">
                          Wir prüfen ganz unverbindlich in einem Call, ob das Paket für deine Situation Sinn ergibt. Nur wenn wir von beiden Seiten sicher sind, starten wir die Zusammenarbeit.
                       </p>
                    </div>
                 </div>

                 {/* Step 2 */}
                 <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-refined-gold text-white flex items-center justify-center font-instrument text-4xl absolute -top-[30px] left-1/2 -translate-x-1/2 outline outline-[12px] outline-warm-canvas shadow-lg">2</div>
                    <div className="bg-pure-surface border border-refined-gold/50 p-12 rounded-[40px] mt-[80px] text-center shadow-[0_20px_40px_rgba(184,150,62,0.1)] hover:-translate-y-2 transition-transform duration-500">
                       <h3 className="font-instrument text-4xl mb-4">Vorbereitung & Checkliste</h3>
                       <p className="text-warm-steel text-lg mb-6">Du lieferst das Fundament</p>
                       <p className="leading-relaxed">
                          Sobald du das Go gibst, erhältst du Zugang zu einer Checkliste. Du legst deine Farbwünsche, Bilder, Texte sowie die finale Entscheidung (Wer, Was, Wie) ab.
                       </p>
                    </div>
                 </div>

                 {/* Step 3 */}
                 <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-pure-surface border border-refined-gold text-refined-gold flex items-center justify-center font-instrument text-4xl absolute -top-[30px] left-1/2 -translate-x-1/2 outline outline-[12px] outline-warm-canvas">3</div>
                    <div className="bg-deep-charcoal border-none text-white p-12 rounded-[40px] mt-[80px] text-center shadow-xl hover:-translate-y-2 transition-transform duration-500">
                       <h3 className="font-instrument text-4xl mb-4 text-white">Kick-Off & Lieferung</h3>
                       <p className="text-night-secondary text-lg mb-6">Wir erwecken es zum Leben</p>
                       <p className="leading-relaxed text-white/90">
                          Wir führen den offiziellen Kick-Off durch. Und genau <strong className="text-night-gold">7 Tage nach diesem Call</strong> steht deine komplette neue Premium-Identität und Website.
                       </p>
                    </div>
                 </div>
              </div>
            </div>
         </div>
      </section>


      {/* Slide 6: Checkliste / Voraussetzungen (Split View) */}
      <section className="print-slide night-section relative h-[1080px] w-[1920px] flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-night-gold/5 rounded-bl-full blur-3xl"></div>
        <div className="w-[1920px] px-24 z-10 flex flex-col justify-center py-20">
           <h2 className="font-instrument text-7xl leading-tight mb-16 text-center text-white">
              Für wen ist das <span className="italic text-night-gold">Premium One-Pager Paket?</span>
           </h2>

           <div className="grid grid-cols-2 gap-16 h-full items-stretch">
              
              {/* Not For You */}
              <div className="bg-[#1A1A18] border border-red-900/30 p-12 rounded-[40px] flex flex-col">
                 <h3 className="font-instrument text-4xl mb-8 text-night-secondary/60">Nicht geeignet für dich...</h3>
                 <ul className="space-y-8 flex-grow">
                   <li className="flex gap-6 items-start">
                      <div className="w-10 h-10 rounded-full bg-red-900/20 text-red-400 flex items-center justify-center shrink-0">✕</div>
                      <p className="text-xl text-night-secondary leading-relaxed pt-1">
                         Wenn du ganz am Anfang stehst und tief im Inneren noch nach deiner Nische suchst (Finde-dich-selbst Phase).
                      </p>
                   </li>
                   <li className="flex gap-6 items-start">
                      <div className="w-10 h-10 rounded-full bg-red-900/20 text-red-400 flex items-center justify-center shrink-0">✕</div>
                      <p className="text-xl text-night-secondary leading-relaxed pt-1">
                         Wenn du noch gar nicht weißt, was dein Angebot genau ist und wie du überhaupt mit Kunden arbeiten möchtest.
                      </p>
                   </li>
                   <li className="flex gap-6 items-start">
                      <div className="w-10 h-10 rounded-full bg-red-900/20 text-red-400 flex items-center justify-center shrink-0">✕</div>
                      <p className="text-xl text-night-secondary leading-relaxed pt-1">
                         Wenn du noch keine vernünftigen Fotos von dir hast und dir sehr unsicher mit dem ersten Entwurf deiner Texte bist.
                      </p>
                   </li>
                 </ul>
              </div>

              {/* Perfect For You */}
              <div className="bg-deep-charcoal border-2 border-night-gold/50 p-12 rounded-[40px] flex flex-col shadow-[0_0_60px_rgba(201,168,76,0.1)] relative">
                 <div className="absolute -top-6 right-10 bg-night-gold text-black uppercase tracking-widest font-bold px-6 py-2 rounded-full shadow-lg">Der perfekte Match</div>
                 <h3 className="font-instrument text-4xl mb-8 text-white">Dieses Paket ist für dich, wenn...</h3>
                 <ul className="space-y-8 flex-grow">
                   <li className="flex gap-6 items-start">
                      <div className="w-10 h-10 rounded-full bg-night-gold/20 text-night-gold flex items-center justify-center shrink-0">✓</div>
                      <p className="text-xl text-white leading-relaxed pt-1">
                         Du eine <strong className="text-night-gold font-normal">klare Entscheidung</strong> getroffen hast (für eine Zielgruppe, ein Kernangebot und einen klaren Prozess).
                      </p>
                   </li>
                   <li className="flex gap-6 items-start">
                      <div className="w-10 h-10 rounded-full bg-night-gold/20 text-night-gold flex items-center justify-center shrink-0">✓</div>
                      <p className="text-xl text-white leading-relaxed pt-1">
                         Du bereits ein <strong className="text-night-gold font-normal">grobes Farbkonzept</strong> oder eine Vorstellung deiner Identität hast.
                      </p>
                   </li>
                   <li className="flex gap-6 items-start">
                      <div className="w-10 h-10 rounded-full bg-night-gold/20 text-night-gold flex items-center justify-center shrink-0">✓</div>
                      <p className="text-xl text-white leading-relaxed pt-1">
                         Deine <strong className="text-night-gold font-normal">Bilder & Basis-Texte existieren bereits</strong>. Dir fehlt nur  noch das strukturierte, atemberaubende Premium-Fundament.
                      </p>
                   </li>
                 </ul>
              </div>

           </div>
        </div>
      </section>

      {/* Slide 7: Zukunftsvision (Future Pacing) */}
      <section className="print-slide relative h-[1080px] w-[1920px] flex items-center justify-center bg-pure-surface overflow-hidden border-b border-whisper-border/50">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-warm-canvas to-transparent opacity-50"></div>
        <div className="absolute -bottom-[20vh] -right-[20vh] w-[80vh] h-[80vh] bg-gold-glow rounded-full blur-[120px] opacity-20 mix-blend-multiply pointer-events-none"></div>

        <div className="w-[1920px] px-24 z-10 grid grid-cols-2 gap-24 items-center">
            <div>
               <p className="text-refined-gold tracking-[0.2em] font-bold text-sm mb-6 uppercase inline-block border border-refined-gold/20 px-5 py-2 rounded-full bg-refined-gold/5">Die Vision</p>
               <h2 className="font-instrument text-[90px] leading-[1.05] mb-8">
                  Endlich das Fundament, <br/>
                  um <span className="italic text-refined-gold">richtig</span> loszulegen.
               </h2>
               <p className="text-warm-steel text-2xl leading-[1.65] mb-12">
                  Stell dir vor, du verschickst den Link zu deiner Website nicht mehr mit einem unsicherem Gefühl, sondern aus tiefstem Stolz. Ein Auftritt, der endlich das widerspiegelt, was du innerlich schon lange weißt.
               </p>

               <div className="flex flex-col gap-6">
                  <div className="p-2 border border-whisper-border bg-black/[0.02] rounded-3xl group">
                     {/* Inner Core */}
                     <div className="bg-white p-8 rounded-[calc(1.5rem-0.5rem)] flex items-start gap-6 border border-transparent group-hover:shadow-[0_20px_40px_rgba(184,150,62,0.05)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                       <div className="w-14 h-14 rounded-full border border-refined-gold/30 bg-refined-gold/5 flex items-center justify-center text-refined-gold shrink-0 scale-100 group-hover:bg-refined-gold group-hover:text-white transition-all duration-500">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3 7 7-7 7M5 10h14"/></svg>
                       </div>
                       <div>
                          <h4 className="font-instrument text-4xl mb-3 text-deep-charcoal">Strategisches Wachstum</h4>
                          <p className="font-satoshi text-xl text-warm-steel leading-relaxed">Mit einer klaren Positionierung arbeitest du skalierbar. Du erreichst Traumkunden, die deine Preise ohne zu zögern bezahlen.</p>
                       </div>
                     </div>
                  </div>

                  <div className="p-2 border border-whisper-border bg-black/[0.02] rounded-3xl group">
                     <div className="bg-white p-8 rounded-[calc(1.5rem-0.5rem)] flex items-start gap-6 border border-transparent group-hover:shadow-[0_20px_40px_rgba(184,150,62,0.05)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                       <div className="w-14 h-14 rounded-full border border-refined-gold/30 bg-refined-gold/5 flex items-center justify-center text-refined-gold shrink-0 group-hover:bg-refined-gold group-hover:text-white transition-all duration-500">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                       </div>
                       <div>
                          <h4 className="font-instrument text-4xl mb-3 text-deep-charcoal">Automatisierter Trust</h4>
                          <p className="font-satoshi text-xl text-warm-steel leading-relaxed">Bevor du das erste Wort im Call sprichst, hat die neue Präsenz deiner Marke bereits deine Kompetenz und Autorität manifestiert.</p>
                       </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Double-Bezel Image Display */}
            <div className="relative h-[850px] w-full p-4 rounded-[3rem] bg-black/[0.02] border border-whisper-border shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-center">
               <div className="absolute inset-0 bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,1)] m-4 rounded-[calc(3rem-1rem)] overflow-hidden">
                 <Image 
                   src="/Bilder Sabala/36 - 373_CH_Sehnde_.jpg"
                   alt="Sabala Clarifying Vision"
                   fill
                   className="object-cover object-center opacity-90 scale-105 hover:scale-100 transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] filter grayscale-[20%]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/80 via-deep-charcoal/20 to-transparent"></div>
                 
                 <div className="absolute bottom-12 left-12 right-12 z-10 flex flex-col items-center">
                    <div className="backdrop-blur-2xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-xl w-full text-center">
                       <p className="font-instrument text-5xl text-white mb-2 leading-none">Dein neues Level.</p>
                       <p className="text-white/70 font-satoshi text-sm uppercase tracking-[0.2em] font-medium mt-3">Ein Fundament das für dich arbeitet</p>
                    </div>
                 </div>
               </div>
            </div>
        </div>
      </section>

      {/* Slide 8: Investition & Verknappung */}
      <section className="print-slide relative h-[1080px] w-[1920px] flex items-center justify-center bg-pure-surface overflow-hidden">
        <div className="w-[1920px] px-24 z-10 grid grid-cols-2 gap-24 items-center">
          <div className="flex flex-col justify-center">
            <p className="text-refined-gold tracking-[0.2em] font-medium text-lg mb-6 uppercase">Einmalige Gelegenheit</p>
            <h2 className="font-instrument text-8xl leading-tight mb-8">Investition & Exklusivität</h2>
            <p className="text-warm-steel text-2xl font-satoshi mb-16 leading-relaxed max-w-xl">
              Dieses Preismodell ist ein exklusives Dankeschön an die loyale Herzkreative Community. 
            </p>
            
            <div className="flex items-end gap-6 mb-8">
               <div className="line-through text-warm-steel/50 font-instrument text-7xl">€ 2.500<span className="text-4xl">,-</span></div>
               <div className="text-warm-steel/80 text-xl pb-2 uppercase tracking-widest">Späterer Marktpreis</div>
            </div>

            <div className="bg-warm-canvas border-2 border-refined-gold/50 rounded-3xl p-12 relative shadow-2xl scale-105 transform origin-left">
              <div className="absolute -top-5 left-10 bg-refined-gold text-white uppercase text-sm tracking-widest px-6 py-2 font-bold rounded-full shadow-lg">
                Exklusiver Community Deal
              </div>
              <div className="flex justify-between items-center">
                 <div className="flex items-baseline gap-3">
                   <span className="text-9xl font-instrument text-deep-charcoal leading-none">810 €</span>
                   <span className="text-warm-steel text-2xl uppercase tracking-wider font-bold">Netto</span>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
             <div className="w-[700px] h-[700px] rounded-full border border-whisper-border flex flex-col items-center justify-center p-16 bg-white shadow-[0_0_120px_rgba(184,150,62,0.15)] relative">
                <div className="absolute inset-0 rounded-full border-[6px] border-dashed border-refined-gold/30 animate-[spin_60s_linear_infinite]"></div>
                
                <span className="text-[220px] font-instrument leading-none text-deep-charcoal mb-4">7</span>
                <span className="text-4xl text-refined-gold tracking-[0.2em] uppercase font-bold mb-8 text-center">Plätze verfügbar</span>
                <p className="text-warm-steel text-center px-12 text-xl leading-relaxed">
                  Dieses Beta-Angebot schließt sich **automatisch**, sobald genau 7 Personen den Kick-Off Slot verbindlich bestätigt haben.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Slide 8: Call to Action (The 30 Min Call) */}
      <section className="print-slide night-section relative h-[1080px] w-[1920px] flex flex-col items-center justify-center overflow-hidden">
         <div className="absolute left-0 bottom-0 w-[600px] h-[800px] grayscale opacity-10 transform -scale-x-100 mix-blend-screen pointer-events-none">
             <Image src="/images/sabala-portrait-hero.png" fill className="object-cover object-top" alt="Sabala bg" />
         </div>

         <div className="w-[1920px] px-24 z-10 text-center relative">
            <h2 className="font-instrument text-[110px] leading-tight mb-12">
              Lass uns sprechen. <br/>
              <span className="italic text-night-gold">Völlig unverbindlich.</span>
            </h2>
            <p className="text-3xl text-night-secondary mb-20 max-w-4xl mx-auto leading-relaxed">
              Wähle unten deinen passenden Termin für das 30-minütige Kennenlernen aus. Wenn es von beiden Seiten "klickt", vereinbaren wir im Anschluss den offiziellen Kick-Off.
            </p>
            
            <div className="max-w-3xl mx-auto border border-night-gold/30 bg-[#22221f] p-12 rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
               <div className="w-full h-[350px] bg-deep-charcoal border-2 border-dashed border-night-gold/40 rounded-3xl flex flex-col items-center justify-center hover:border-night-gold transition-colors group">
                  <svg className="w-20 h-20 text-night-gold mb-8 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-4xl font-instrument text-white mb-6">30-Min-Kennenlernen buchen</p>
                  
                  <Link href="https://calendly.com/" target="_blank" className="mt-4 inline-flex items-center justify-center px-12 py-6 text-xl font-bold uppercase tracking-widest rounded-full text-black bg-night-gold hover:bg-white hover:text-black transition-all shadow-[0_10px_30px_rgba(201,168,76,0.3)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.4)]">
                    Hier Termin wählen →
                  </Link>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
