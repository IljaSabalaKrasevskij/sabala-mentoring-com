import Image from "next/image";

export default function BrandguidePage() {
  return (
    <div className="bg-warm-canvas min-h-screen font-satoshi text-deep-charcoal print:bg-white print:m-0 print:p-0 presentation-container">
      
      {/* Slide 1: Cover */}
      <section className="print-slide night-section relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[80vh] h-[80vh] bg-night-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vh] h-[60vh] bg-night-gold/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 w-full max-w-6xl px-12 grid grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-night-gold tracking-[0.3em] uppercase text-sm mb-6 font-medium">Digital Identity</p>
            <h1 className="font-instrument text-8xl leading-[1.0] tracking-tight mb-8">
              Brand <br />
              <span className="italic text-night-secondary">Guidelines.</span>
            </h1>
            <div className="h-px w-32 bg-night-gold/30 mb-8"></div>
            <p className="text-night-secondary text-xl font-light">
              Sabala Mentoring. <br />
              Klarheit in der Positionierung. Kraft im Auftritt.
            </p>
          </div>
          <div className="flex justify-end">
            <div className="relative w-[40vh] h-[60vh] rounded-t-full overflow-hidden border border-night-secondary/20 shadow-[-20px_20px_60px_rgba(0,0,0,0.5)]">
               <Image 
                src="/images/sabala-portrait-hero.png" 
                alt="Ilja Sabala"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Slide 2: Die Marken-Essenz */}
      <section className="print-slide relative h-screen w-full flex items-center justify-center bg-pure-surface">
         <div className="w-full max-w-5xl px-12 z-10 text-center">
            <h2 className="font-instrument text-6xl leading-tight mb-12">
              Der meditierende <br/>
              <span className="italic text-refined-gold">Business-Architekt</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 text-left">
              <div className="border border-whisper-border p-8 bg-warm-canvas">
                 <h3 className="font-instrument text-3xl mb-4 text-refined-gold">Klarheit</h3>
                 <p className="text-warm-steel">Wir trennen das Rauschen von der Substanz. Kein Blabla. Nur das, was wirklich zählt und wirkt.</p>
              </div>
              <div className="border border-whisper-border p-8 bg-warm-canvas translate-y-6">
                 <h3 className="font-instrument text-3xl mb-4 text-deep-charcoal">Tiefe</h3>
                 <p className="text-warm-steel">Wir gestalten nicht nur Oberflächen, wir bauen Fundamente. Wahre Kraft kommt von innen.</p>
              </div>
              <div className="border border-whisper-border p-8 bg-warm-canvas translate-y-12">
                 <h3 className="font-instrument text-3xl mb-4 text-refined-gold">Eleganz</h3>
                 <p className="text-warm-steel">Premium ist nicht laut. Premium ist präzise, ruhig und von kompromissloser Qualität.</p>
              </div>
            </div>
         </div>
      </section>

      {/* Slide 3: Farbpalette */}
      <section className="print-slide relative h-screen w-full flex items-center justify-center bg-warm-canvas">
        <div className="w-full max-w-7xl px-12 z-10">
          <div className="mb-12">
            <p className="text-warm-steel tracking-[0.2em] uppercase text-sm mb-4">01 / Visual Design</p>
            <h2 className="font-instrument text-6xl">Color Palette.</h2>
          </div>
          
          <div className="grid grid-cols-5 gap-6 h-[50vh]">
            {/* Swatch 1 */}
            <div className="h-full flex flex-col group">
              <div className="flex-grow bg-[#FAF8F5] border border-whisper-border rounded-t-2xl shadow-warm-shadow transition-transform group-hover:-translate-y-2"></div>
              <div className="bg-pure-surface p-4 border border-t-0 border-whisper-border rounded-b-2xl">
                <p className="font-medium text-deep-charcoal">Warm Canvas</p>
                <p className="font-mono text-sm text-warm-steel mt-1">#FAF8F5</p>
                <p className="text-xs text-warm-steel mt-2">Background Base</p>
              </div>
            </div>
            
            {/* Swatch 2 */}
            <div className="h-full flex flex-col group mt-4">
              <div className="flex-grow bg-[#1A1A18] rounded-t-2xl shadow-xl transition-transform group-hover:-translate-y-2"></div>
              <div className="bg-pure-surface p-4 border border-t-0 border-whisper-border rounded-b-2xl">
                <p className="font-medium text-deep-charcoal">Night Foundation</p>
                <p className="font-mono text-sm text-warm-steel mt-1">#1A1A18</p>
                 <p className="text-xs text-warm-steel mt-2">Dark Sections</p>
              </div>
            </div>

            {/* Swatch 3 */}
            <div className="h-full flex flex-col group mt-8 relative">
              <div className="absolute -top-4 -right-4 bg-refined-gold/10 text-refined-gold text-xs px-2 py-1 rounded">Primary</div>
              <div className="flex-grow bg-[#B8963E] rounded-t-2xl shadow-xl transition-transform group-hover:-translate-y-2"></div>
              <div className="bg-pure-surface p-4 border border-t-0 border-whisper-border rounded-b-2xl">
                <p className="font-medium text-deep-charcoal">Refined Gold</p>
                <p className="font-mono text-sm text-warm-steel mt-1">#B8963E</p>
                 <p className="text-xs text-warm-steel mt-2">Accents & CTAs</p>
              </div>
            </div>

            {/* Swatch 4 */}
            <div className="h-full flex flex-col group mt-12">
              <div className="flex-grow bg-[#6B6963] rounded-t-2xl shadow-xl transition-transform group-hover:-translate-y-2"></div>
              <div className="bg-pure-surface p-4 border border-t-0 border-whisper-border rounded-b-2xl">
                <p className="font-medium text-deep-charcoal">Warm Steel</p>
                <p className="font-mono text-sm text-warm-steel mt-1">#6B6963</p>
                 <p className="text-xs text-warm-steel mt-2">Secondary Text</p>
              </div>
            </div>

            {/* Swatch 5 */}
            <div className="h-full flex flex-col group mt-16">
              <div className="flex-grow bg-[#B5B0A8] rounded-t-2xl shadow-xl transition-transform group-hover:-translate-y-2"></div>
              <div className="bg-pure-surface p-4 border border-t-0 border-whisper-border rounded-b-2xl">
                <p className="font-medium text-deep-charcoal">Soft Stone</p>
                <p className="font-mono text-sm text-warm-steel mt-1">#B5B0A8</p>
                 <p className="text-xs text-warm-steel mt-2">Borders & Lines</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4: Typografie */}
      <section className="print-slide relative h-screen w-full flex items-center justify-center bg-pure-surface">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-warm-canvas border-l border-whisper-border"></div>
        <div className="w-full max-w-7xl px-12 z-10 grid grid-cols-3 gap-16">
          <div className="col-span-2 pr-8">
            <p className="text-warm-steel tracking-[0.2em] uppercase text-sm mb-4">02 / Typography</p>
            <h2 className="font-instrument text-6xl mb-16">Typography System.</h2>

            <div className="mb-12">
              <p className="text-warm-steel mb-2 text-sm uppercase">Headline Font (Primary)</p>
              <h3 className="font-instrument text-8xl leading-none">Instrument Serif</h3>
              <p className="font-instrument text-4xl italic text-refined-gold mt-4">Klarheit. Kraft. Eleganz.</p>
              <p className="text-warm-steel mt-4 w-2/3">Verleiht der Marke eine klassische, geerdete und dennoch hochmoderne Premium-Ästhetik. Wird primär für Überschriften genutzt.</p>
            </div>

            <div className="h-px w-full bg-whisper-border mb-12"></div>

            <div>
              <p className="text-warm-steel mb-2 text-sm uppercase">Body Font (Secondary)</p>
              <h3 className="font-satoshi font-medium text-5xl">Satoshi</h3>
              <p className="font-satoshi text-2xl text-deep-charcoal mt-4 font-light">Wir begleiten dich von der Kernbotschaft bis zur fertigen Premium-Website.</p>
              <p className="text-warm-steel mt-4 w-2/3">Satoshi bildet den sauberen, technischen und hochlesbaren Kontrast zur dominanten Serifenschrift.</p>
            </div>
          </div>
          
          <div className="col-span-1 flex flex-col justify-center">
             <div className="bg-white p-8 border border-whisper-border shadow-warm-shadow translate-y-12">
                <h4 className="font-instrument text-3xl mb-4">Hierarchie Beispiel</h4>
                <p className="text-xs text-refined-gold tracking-widest uppercase mb-2">Eyebrow Tag</p>
                <div className="font-instrument text-4xl mb-4 leading-tight">Dein Auftritt. <br/> <span className="italic">Deine Regeln.</span></div>
                <p className="text-warm-steel text-sm leading-relaxed mb-6">
                  Fließtext in Satoshi. Er ist minimalistisch, hat genug Zeilenabstand und drängt sich niemals auf.
                </p>
                <button className="text-sm bg-refined-gold text-white px-6 py-2 rounded-full">Primary Button</button>
             </div>
          </div>
        </div>
      </section>

      {/* Slide 5: UI Elements & Card Style */}
      <section className="print-slide night-section relative h-screen w-full flex flex-col items-center justify-center">
         <div className="w-full max-w-6xl px-12 z-10">
            <div className="flex justify-between items-end mb-16 border-b border-night-secondary/20 pb-8">
              <div>
                <p className="text-night-secondary tracking-[0.2em] uppercase text-sm mb-4">03 / UI Elements</p>
                <h2 className="font-instrument text-6xl">Interface Design.</h2>
              </div>
              <p className="text-night-gold text-xl w-1/2 text-right">Asymmetrisch. Großzügige Weißräume. Feine Borders statt harten Boxen.</p>
            </div>

            <div className="grid grid-cols-2 gap-16">
               <div>
                  <h4 className="font-satoshi uppercase text-night-secondary tracking-widest text-sm mb-6">Card Component</h4>
                  <div className="p-10 border border-night-secondary/30 bg-deep-charcoal rounded-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-night-gold/10 rounded-bl-full group-hover:bg-night-gold/20 transition-colors"></div>
                     <div className="font-instrument text-4xl mb-4 text-night-text z-10 relative">Premium Experience.</div>
                     <p className="text-night-secondary mb-8 z-10 relative">
                        Wir setzen auf subtile Transparenzen (Glassmorphism) und weiche 'Warm Shadows'.
                     </p>
                     <div className="flex items-center text-night-gold gap-2 z-10 relative">
                        <span className="text-sm uppercase tracking-wider font-medium">Mehr erfahren</span>
                        <span>→</span>
                     </div>
                  </div>
               </div>
               
               <div>
                  <h4 className="font-satoshi uppercase text-night-secondary tracking-widest text-sm mb-6">Interactive Elements</h4>
                  
                  <div className="space-y-6">
                     <div className="flex justify-between items-center bg-[#1A1A18] border border-night-gold/30 p-6 rounded-xl hover:border-night-gold transition-colors">
                        <span className="font-instrument text-2xl text-white">Primary Button</span>
                        <button className="bg-night-gold text-deep-charcoal px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide">Action</button>
                     </div>
                     
                     <div className="flex justify-between items-center bg-[#1A1A18] border border-white/10 p-6 rounded-xl">
                        <span className="font-instrument text-2xl text-white">Secondary Tag</span>
                        <div className="border border-night-secondary text-night-secondary px-6 py-2 rounded-full text-sm uppercase tracking-widest">Optional</div>
                     </div>

                     <div className="flex justify-between items-center bg-[#1A1A18] border border-white/10 p-6 rounded-xl">
                        <span className="font-instrument text-2xl text-white">Hover Glow</span>
                        <div className="w-16 h-16 rounded-full bg-deep-charcoal shadow-[0_0_30px_rgba(201,168,76,0.3)] flex items-center justify-center">
                           <div className="w-2 h-2 bg-night-gold rounded-full"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Slide 6: Photography Style */}
      <section className="print-slide relative h-screen w-full flex items-center justify-center bg-warm-canvas">
        <div className="w-full max-w-6xl px-12 z-10">
           <div className="text-center mb-16">
              <p className="text-warm-steel tracking-[0.2em] uppercase text-sm mb-4">04 / Photography</p>
              <h2 className="font-instrument text-6xl">Bildsprache & Mood.</h2>
           </div>

           <div className="grid grid-cols-12 gap-8 h-[50vh]">
              <div className="col-span-5 relative rounded-2xl overflow-hidden border border-whisper-border/50">
                 <Image src="/images/Das-Team-Sabala.jpg" alt="Sabala Team" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                 <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-lg">
                    <p className="font-instrument text-xl">Authentic. Raw.</p>
                 </div>
              </div>
              <div className="col-span-4 relative rounded-2xl overflow-hidden border border-whisper-border/50">
                  <Image src="/images/Das-Team-Sabala-2.png" alt="Sabala Workshop" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="font-instrument text-xl">Deep Focus.</p>
                 </div>
              </div>
              <div className="col-span-3 flex flex-col justify-between">
                 <div className="bg-pure-surface p-8 border border-whisper-border rounded-2xl h-[45%] flex flex-col justify-center">
                    <p className="text-warm-steel text-sm uppercase tracking-wide mb-2">Rule #1</p>
                    <p className="font-medium">Keine Stock-Ästhetik. Natürliches Korn und Kontrast.</p>
                 </div>
                 <div className="bg-pure-surface p-8 border border-whisper-border rounded-2xl h-[45%] flex flex-col justify-center">
                    <p className="text-warm-steel text-sm uppercase tracking-wide mb-2">Rule #2</p>
                    <p className="font-medium">Einsatz von Schwarz-Weiß als stilistisches Pausenzeichen.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
}
