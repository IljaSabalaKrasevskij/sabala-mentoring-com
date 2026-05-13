import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-clip bg-bone-paper text-ink selection:bg-verdigris selection:text-white">
      
      {/* S1 · HERO */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center px-6 sm:px-12 md:px-24 bg-ink text-bone-paper overflow-hidden pt-32 pb-20">
        {/* Soft Universe Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] bg-verdigris/10 blur-[150px] rounded-[100%] pointer-events-none mix-blend-screen" />
        <div className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vh] bg-copper/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        
        <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Text Content */}
          <div className="max-w-[800px] flex-1">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-verdigris shadow-[0_0_10px_rgba(77,123,110,0.5)]"></div>
                <span className="font-mono text-verdigris text-xs tracking-[0.2em] uppercase">Human-AI Thinking Partnership</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <h1 className="font-instrument text-[clamp(4rem,8vw,7.5rem)] leading-[1.05] tracking-[-0.02em] mb-8">
                Less noise.<br />
                <span className="italic text-verdigris">More you.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-satoshi text-xl md:text-2xl text-bone-paper/80 leading-[1.5] max-w-[550px] mb-12">
                Where your own thinking finally finds its shape. Most AI was built to please you. SAM was built to help you think.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
                <Link href="#diagnostic" className="group relative px-8 py-4 rounded-full overflow-hidden border border-verdigris/50 bg-transparent hover:bg-ink transition-colors duration-500">
                  <div className="absolute inset-0 bg-verdigris/10 group-hover:bg-verdigris/20 transition-colors"></div>
                  <span className="relative z-10 font-satoshi font-medium text-bone-paper tracking-wide">Take the 6-question diagnostic &rarr;</span>
                </Link>
                <button className="group text-bone-paper/80 hover:text-bone-paper font-satoshi font-medium transition-colors pb-1 border-b border-verdigris/40 hover:border-verdigris">
                  Watch how it works
                </button>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-bone-paper/40">
                No account · No email · First $5 refunded if it reveals nothing useful
              </p>
            </ScrollReveal>
          </div>

          {/* Abstract Pulley / Anchor Visual (Tech Universe Feel) */}
          <div className="w-full lg:w-[500px] h-[500px] relative flex-shrink-0 opacity-80 group cursor-pointer hidden md:block">
            <ScrollReveal delay={0.4} className="w-full h-full">
               <div className="absolute inset-0 rounded-full border border-verdigris/20 group-hover:border-verdigris/50 transition-colors duration-1000 animate-[spin-y_20s_linear_infinite]"></div>
               <div className="absolute inset-8 rounded-full border border-copper/10 group-hover:border-copper/30 transition-colors duration-1000 animate-[spin-y_15s_linear_infinite_reverse]"></div>
               <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-tr from-verdigris/30 to-copper/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
               <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-verdigris rounded-full shadow-[0_0_30px_rgba(77,123,110,1)]"></div>
            </ScrollReveal>
          </div>
        </div>

        {/* Ticker Bottom */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/5 py-4 overflow-hidden backdrop-blur-sm bg-ink/50">
          <div className="flex gap-16 animate-[marquee_40s_linear_infinite] whitespace-nowrap opacity-60">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                <span className="font-mono text-xs uppercase tracking-widest text-bone-paper">Encrypted & private</span>
                <span className="w-1.5 h-1.5 rounded-full bg-copper"></span>
                <span className="font-mono text-xs uppercase tracking-widest text-bone-paper">No subscription, ever</span>
                <span className="w-1.5 h-1.5 rounded-full bg-copper"></span>
                <span className="font-mono text-xs uppercase tracking-widest text-verdigris font-bold">12 of 50 beta seats taken</span>
                <span className="w-1.5 h-1.5 rounded-full bg-copper"></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S2 · THE PROMISE */}
      <section className="py-40 px-6 sm:px-12 md:px-24 bg-limestone-cream relative">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-12 items-start">
           <div className="w-[3px] h-32 bg-verdigris rounded-full shrink-0 hidden md:block"></div>
           <div>
             <ScrollReveal>
               <p className="font-mono text-xs tracking-widest uppercase text-verdigris mb-8">The Promise</p>
               <h2 className="font-instrument italic text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.2] text-ink mb-12">
                 "Tell me what you want —<br />and I'll lead you to the right path."
               </h2>
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 border-t border-ink/10 pt-8">
                 <p className="font-satoshi text-ink/70">
                   — Tony Kirkland · Architect of SAM · Tbilisi, 2026
                 </p>
                 <Link href="/the-journey" className="font-satoshi font-medium text-ink hover:text-verdigris transition-colors">
                   Read the journey &rarr;
                 </Link>
               </div>
             </ScrollReveal>
           </div>
        </div>
      </section>

      {/* S3 · WHAT YOU LEAVE WITH (5 Outputs) */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-bone-paper">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="font-mono text-xs tracking-widest uppercase text-verdigris mb-6">What You Leave With</p>
            <div className="max-w-[800px] mb-20">
              <h2 className="font-instrument text-[clamp(3rem,6vw,5rem)] leading-[1.05] text-ink mb-6 tracking-[-0.02em]">
                After one session,<br />five things sit on your desk.
              </h2>
              <p className="font-satoshi text-xl text-ink/70 leading-[1.6]">
                Not vibes. Not summaries. Five concrete outputs you can read, defend, and act on.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {/* Card 1 */}
            <ScrollReveal delay={0.1} className="group relative p-10 rounded-[32px] border border-ink/5 bg-white hover:shadow-[0_20px_60px_rgba(77,123,110,0.08)] hover:border-verdigris/30 transition-all duration-500 h-full flex flex-col">
              <span className="font-instrument text-4xl text-verdigris mb-8 block">01</span>
              <h3 className="font-instrument text-3xl mb-4 text-ink">Alignment Map</h3>
              <p className="font-satoshi text-ink/70 leading-[1.6] flex-1">
                A weighted map of your options. Every choice you considered, scored against everything you said you wanted. The top option rises naturally — not because SAM picked it, but because your own variables did.
              </p>
              <div className="mt-8 flex flex-col gap-2">
                <div className="h-1.5 w-full bg-ink/5 rounded-full overflow-hidden"><div className="h-full bg-verdigris w-[85%] rounded-full"></div></div>
                <div className="h-1.5 w-full bg-ink/5 rounded-full overflow-hidden"><div className="h-full bg-verdigris/60 w-[60%] rounded-full"></div></div>
                <div className="h-1.5 w-full bg-ink/5 rounded-full overflow-hidden"><div className="h-full bg-verdigris/30 w-[35%] rounded-full"></div></div>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal delay={0.2} className="group relative p-10 rounded-[32px] border border-ink/5 bg-white hover:shadow-[0_20px_60px_rgba(77,123,110,0.08)] hover:border-verdigris/30 transition-all duration-500 h-full flex flex-col">
              <span className="font-instrument text-4xl text-verdigris mb-8 block">02</span>
              <h3 className="font-instrument text-3xl mb-4 text-ink">The 1-Pager</h3>
              <p className="font-satoshi text-ink/70 leading-[1.6] flex-1">
                Your three top variables, named. What you actually care about — surfaced, weighted, written down. The thing you'll send to your co-founder.
              </p>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal delay={0.3} className="group relative p-10 rounded-[32px] border border-ink/5 bg-white hover:shadow-[0_20px_60px_rgba(77,123,110,0.08)] hover:border-verdigris/30 transition-all duration-500 h-full flex flex-col">
              <span className="font-instrument text-4xl text-verdigris mb-8 block">03</span>
              <h3 className="font-instrument text-3xl mb-4 text-ink">Coherence Check</h3>
              <p className="font-satoshi text-ink/70 leading-[1.6] flex-1">
                Where your levels disagree. Vision says one thing, Purpose says another. SAM names the gap so you can decide on which level to land.
              </p>
            </ScrollReveal>

            {/* Card 4 */}
            <ScrollReveal delay={0.1} className="group relative p-10 rounded-[32px] border border-ink/5 bg-white hover:shadow-[0_20px_60px_rgba(77,123,110,0.08)] hover:border-verdigris/30 transition-all duration-500 h-full flex flex-col lg:col-start-2">
              <span className="font-instrument text-4xl text-verdigris mb-8 block">04</span>
              <h3 className="font-instrument text-3xl mb-4 text-ink">Next Move</h3>
              <p className="font-satoshi text-ink/70 leading-[1.6] flex-1">
                One sentence. One action. Not five next steps. The single move that, if you take it, changes the rest. Because clarity isn't a list.
              </p>
            </ScrollReveal>

            {/* Card 5 */}
            <ScrollReveal delay={0.2} className="group relative p-10 rounded-[32px] border border-ink/5 bg-ink hover:shadow-[0_20px_60px_rgba(198,99,62,0.15)] hover:border-copper/50 transition-all duration-500 h-full flex flex-col text-bone-paper lg:col-start-3">
              <div className="absolute top-8 right-8 px-3 py-1 bg-copper/20 text-copper border border-copper/30 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold">Unique to SAM</div>
              <span className="font-instrument text-4xl text-copper mb-8 block">05</span>
              <h3 className="font-instrument text-3xl mb-4 text-bone-paper">Memory</h3>
              <p className="font-satoshi text-bone-paper/70 leading-[1.6] flex-1">
                Saved for next session. Your context carries. The next time you open SAM, you don't start from zero — you continue.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* S4 · TRY ONE QUESTION (Inline Quiz) */}
      <section id="diagnostic" className="py-32 px-6 sm:px-12 md:px-24 bg-limestone-cream relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-verdigris/10 z-0 pointer-events-none"></div>
        <div className="max-w-[800px] mx-auto text-center relative z-10 mb-16">
          <ScrollReveal>
            <p className="font-mono text-xs tracking-widest uppercase text-verdigris mb-6">How SAM Works · Live</p>
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] text-ink mb-6">
              Try one question.<br/>See what it feels like.
            </h2>
            <p className="font-satoshi text-xl text-ink/70">
              No account. No email. Just the first of six questions — Tony's own opening move.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2} className="max-w-[700px] mx-auto relative z-10">
           <div className="bg-bone-paper border border-verdigris/20 rounded-[32px] p-10 md:p-16 shadow-[0_30px_80px_rgba(77,123,110,0.1)]">
             <div className="text-center mb-10 border-b border-ink/10 pb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-ink/40">Question 1 of 6</span>
             </div>
             
             <div className="min-h-[160px] flex flex-col items-center justify-center mb-12">
               <h3 className="font-instrument text-3xl md:text-4xl text-ink leading-[1.3] text-center mb-6">
                 "What level of human potential have you actualized?"
               </h3>
               <p className="font-satoshi italic text-ink/50 text-sm">— Tony's first quiz question</p>
             </div>

             {/* Mock Slider */}
             <div className="mb-12 relative px-4">
               <div className="h-2 w-full bg-ink/10 rounded-full relative">
                 <div className="absolute left-0 top-0 h-full w-[67%] bg-verdigris rounded-full"></div>
                 <div className="absolute left-[67%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-bone-paper border-2 border-verdigris rounded-full shadow-lg cursor-pointer"></div>
                 <div className="absolute left-[67%] -top-10 -translate-x-1/2 font-mono text-verdigris font-bold">67</div>
               </div>
               <div className="flex justify-between mt-4 font-mono text-xs text-ink/40">
                 <span>0</span>
                 <span>100</span>
               </div>
             </div>

             <div className="flex flex-col items-center gap-4">
               <button className="bg-ink text-bone-paper px-8 py-4 rounded-full font-satoshi font-medium hover:bg-verdigris transition-colors w-full sm:w-auto">
                 Continue &rarr;
               </button>
               <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">About 3 minutes · 6 questions total</span>
             </div>
           </div>
        </ScrollReveal>
      </section>

      {/* S5 · WHY IT'S NOT JUST CHATGPT */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-bone-paper">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-[800px] mb-20">
            <ScrollReveal>
              <p className="font-mono text-xs tracking-widest uppercase text-verdigris mb-6">Why It's Not Just ChatGPT</p>
              <h2 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-ink mb-6">
                Most AI was built to please you.<br/>SAM was built to help you think.
              </h2>
              <p className="font-satoshi text-xl text-ink/70 leading-[1.6]">
                Six pain points Tony saw across years of coaching — and what changes when an AI is shaped around your variables, not the average user's satisfaction.
              </p>
            </ScrollReveal>
          </div>

          <div className="flex flex-col gap-4">
            {/* Header Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-ink/10 px-8">
              <div className="font-mono text-sm uppercase tracking-widest text-ink/40">Generic AI</div>
              <div className="font-mono text-sm uppercase tracking-widest text-verdigris font-bold">SAM</div>
            </div>

            {/* Rows */}
            {[
              {
                title: "Honesty",
                generic: "Trained to please you. \"Great question!\" before answering what you want to hear.",
                sam: "We don't tell you what to think. We help you hear what you already do."
              },
              {
                title: "Output",
                generic: "\"Here are five options.\" It doesn't tell you which to pick — you're on your own.",
                sam: "Each option scored against what you said you want. The most aligned one rises."
              },
              {
                title: "Memory",
                generic: "Each session starts from zero. You re-explain yourself every time.",
                sam: "Your context carries — across sessions, across libraries, encrypted."
              },
              {
                title: "Effort",
                generic: "You engineer the prompt. You hold the context. You integrate the answers.",
                sam: "SAM does the integration. You stay the one who decides."
              }
            ].map((row, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 rounded-[24px] hover:bg-white transition-colors border border-transparent hover:border-ink/5">
                  <div className="flex gap-4 opacity-50 pr-8">
                    <span className="text-copper font-bold mt-1">&times;</span>
                    <div>
                      <h4 className="font-satoshi font-bold text-ink mb-2">{row.title}</h4>
                      <p className="font-satoshi text-ink leading-[1.5]">{row.generic}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 pl-0 md:pl-8 border-t md:border-t-0 md:border-l border-ink/10 pt-6 md:pt-0">
                    <span className="text-verdigris font-bold mt-1">&check;</span>
                    <div>
                      <h4 className="font-satoshi font-bold text-ink mb-2">{row.title}</h4>
                      <p className="font-satoshi text-ink leading-[1.5]">{row.sam}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* S6 · THE METHOD */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-ink text-bone-paper relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vh] bg-verdigris/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="max-w-[1400px] mx-auto relative z-10">
           <div className="mb-20 text-center max-w-[800px] mx-auto">
             <ScrollReveal>
               <p className="font-mono text-xs tracking-widest uppercase text-verdigris mb-6">The Method</p>
               <h2 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] mb-6">
                 Two pillars<br/>beneath every session.
               </h2>
               <p className="font-satoshi text-xl text-bone-paper/70 leading-[1.6]">
                 How you think &times; What you align with. SAM works at both levels at the same time — that's why the output stays integrated, not fragmented.
               </p>
             </ScrollReveal>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
             {/* Left Pillar */}
             <ScrollReveal delay={0.1}>
               <div className="border border-white/10 rounded-[32px] p-10 md:p-14 bg-white/[0.02]">
                 <div className="font-mono text-xs uppercase tracking-widest text-bone-paper/40 mb-12">Levels of Thinking</div>
                 <h3 className="font-instrument text-3xl mb-8">How your mind processes</h3>
                 
                 {/* Visual Line */}
                 <div className="flex items-center gap-2 mb-12">
                   <div className="w-4 h-4 rounded-full border-2 border-bone-paper/30"></div>
                   <div className="h-[2px] flex-1 bg-[repeating-linear-gradient(90deg,rgba(245,240,230,0.2)_0,rgba(245,240,230,0.2)_4px,transparent_4px,transparent_8px)]"></div>
                   <div className="w-4 h-4 rounded-full border-2 border-bone-paper/50 bg-bone-paper/20"></div>
                   <div className="h-[2px] flex-1 bg-[repeating-linear-gradient(90deg,rgba(245,240,230,0.5)_0,rgba(245,240,230,0.5)_4px,transparent_4px,transparent_8px)]"></div>
                   <div className="w-4 h-4 rounded-full border-2 border-verdigris bg-verdigris/20"></div>
                   <div className="h-[2px] flex-1 bg-verdigris"></div>
                   <div className="w-4 h-4 rounded-full bg-verdigris shadow-[0_0_15px_rgba(77,123,110,0.8)]"></div>
                 </div>

                 <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-bone-paper/50 mb-12">
                   <span>Fragmented</span>
                   <span className="text-verdigris">Flow</span>
                 </div>

                 <Link href="/method" className="inline-block border-b border-verdigris/40 pb-1 text-bone-paper hover:border-verdigris hover:text-verdigris transition-colors font-satoshi font-medium">
                   See the full model &rarr;
                 </Link>
               </div>
             </ScrollReveal>

             {/* Right Pillar */}
             <ScrollReveal delay={0.2}>
               <div className="border border-white/10 rounded-[32px] p-10 md:p-14 bg-white/[0.02] flex flex-col justify-end">
                 <div className="font-mono text-xs uppercase tracking-widest text-bone-paper/40 mb-12">Levels of Alignment</div>
                 <h3 className="font-instrument text-3xl mb-12">What your decision serves</h3>
                 
                 {/* Stacked Bars */}
                 <div className="flex flex-col gap-4 mb-12">
                   <div className="flex items-center gap-6">
                     <div className="w-1/3 text-right font-mono text-xs tracking-widest uppercase text-verdigris">Higher Self</div>
                     <div className="flex-1 h-12 bg-verdigris rounded-r-full flex items-center px-6 text-sm text-ink font-satoshi font-medium">what calls you</div>
                   </div>
                   <div className="flex items-center gap-6">
                     <div className="w-1/3 text-right font-mono text-xs tracking-widest uppercase text-verdigris/80">Purpose</div>
                     <div className="flex-1 h-12 bg-verdigris/80 rounded-r-full flex items-center px-6 text-sm text-ink font-satoshi font-medium">why you want it</div>
                   </div>
                   <div className="flex items-center gap-6">
                     <div className="w-1/3 text-right font-mono text-xs tracking-widest uppercase text-bone-paper/60">Vision</div>
                     <div className="flex-1 h-12 bg-bone-paper/20 rounded-r-full flex items-center px-6 text-sm text-bone-paper font-satoshi font-medium">what you want</div>
                   </div>
                   <div className="flex items-center gap-6">
                     <div className="w-1/3 text-right font-mono text-xs tracking-widest uppercase text-bone-paper/40">Truth</div>
                     <div className="flex-1 h-12 bg-bone-paper/10 rounded-r-full flex items-center px-6 text-sm text-bone-paper/80 font-satoshi font-medium">what is now</div>
                   </div>
                 </div>

                 <Link href="/method" className="inline-block border-b border-verdigris/40 pb-1 text-bone-paper hover:border-verdigris hover:text-verdigris transition-colors font-satoshi font-medium">
                   See all 4 levels &rarr;
                 </Link>
               </div>
             </ScrollReveal>
           </div>
        </div>
      </section>

      {/* S7 · THREE DOORS (Pricing) */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-limestone-cream">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-[800px] mx-auto mb-20">
            <ScrollReveal>
              <p className="font-mono text-xs tracking-widest uppercase text-verdigris mb-6">How You Enter</p>
              <h2 className="font-instrument text-[clamp(3rem,6vw,5rem)] leading-[1.05] text-ink mb-6">
                Three doors.<br/>One engine.
              </h2>
              <p className="font-satoshi text-xl text-ink/70">
                Not a subscription. Spend your wallet over a year.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end mb-16">
            {/* Card 1 */}
            <ScrollReveal delay={0.1} className="h-full">
              <div className="p-10 rounded-[32px] border border-ink/10 bg-white h-full flex flex-col">
                <div className="font-mono text-xs tracking-widest uppercase text-ink/50 mb-12">Wallet</div>
                <div className="font-instrument text-6xl text-ink mb-4">$5</div>
                <p className="font-satoshi text-ink/70 mb-8 pb-8 border-b border-ink/10">1 year to use</p>
                <ul className="flex flex-col gap-4 font-satoshi text-ink/80 flex-1 mb-12">
                  <li className="font-bold">Selected libraries — start with what fits.</li>
                  <li className="flex items-start gap-3"><span className="text-verdigris mt-1">●</span> Decision Making</li>
                  <li className="flex items-start gap-3"><span className="text-verdigris mt-1">●</span> Levels of Thinking</li>
                  <li className="flex items-start gap-3 opacity-60"><span className="text-ink mt-1">●</span> Personal session memory</li>
                  <li className="flex items-start gap-3 opacity-60"><span className="text-ink mt-1">●</span> End-to-end encrypted</li>
                </ul>
                <button className="w-full py-4 rounded-full border border-ink/20 hover:border-ink hover:bg-ink hover:text-bone-paper transition-colors font-satoshi font-medium text-ink">
                  Begin &rarr;
                </button>
              </div>
            </ScrollReveal>

            {/* Card 2 - Most Chosen */}
            <ScrollReveal delay={0.2} className="h-full md:-translate-y-8">
              <div className="p-10 rounded-[32px] border-2 border-verdigris bg-white shadow-[0_30px_80px_rgba(77,123,110,0.15)] h-full flex flex-col relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-copper text-white px-4 py-1.5 rounded-full font-mono text-[10px] tracking-widest uppercase font-bold whitespace-nowrap">Most chosen</div>
                <div className="font-mono text-xs tracking-widest uppercase text-verdigris mb-12">Wallet</div>
                <div className="font-instrument text-6xl text-verdigris mb-4">$50</div>
                <p className="font-satoshi text-ink/70 mb-8 pb-8 border-b border-ink/10">1 year to use</p>
                <ul className="flex flex-col gap-4 font-satoshi text-ink/80 flex-1 mb-12">
                  <li className="font-bold">All libraries. Full access.</li>
                  <li className="flex items-start gap-3"><span className="text-verdigris mt-1">●</span> Decision Making</li>
                  <li className="flex items-start gap-3"><span className="text-verdigris mt-1">●</span> Levels of Thinking</li>
                  <li className="flex items-start gap-3"><span className="text-verdigris mt-1">●</span> Industry context</li>
                  <li className="flex items-start gap-3"><span className="text-verdigris mt-1">●</span> Memory across all sessions</li>
                  <li className="flex items-start gap-3"><span className="text-verdigris mt-1">●</span> Volume discount on tokens</li>
                </ul>
                <button className="w-full py-4 rounded-full bg-verdigris text-white hover:bg-ink transition-colors font-satoshi font-medium">
                  Begin &rarr;
                </button>
              </div>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal delay={0.3} className="h-full">
              <div className="p-10 rounded-[32px] border border-ink/10 bg-white h-full flex flex-col">
                <div className="font-mono text-xs tracking-widest uppercase text-ink/50 mb-12">Enterprise</div>
                <div className="font-instrument text-4xl text-ink mb-4 mt-2">Custom Matrix</div>
                <p className="font-satoshi text-ink/70 mb-8 pb-8 border-b border-ink/10">By conversation</p>
                <ul className="flex flex-col gap-4 font-satoshi text-ink/80 flex-1 mb-12">
                  <li className="font-bold">For organisations.</li>
                  <li className="flex items-start gap-3"><span className="text-copper mt-1">●</span> Bespoke SAM matrix</li>
                  <li className="flex items-start gap-3"><span className="text-copper mt-1">●</span> Embedded into workflow</li>
                  <li className="flex items-start gap-3"><span className="text-copper mt-1">●</span> Quarterly recalibration</li>
                  <li className="flex items-start gap-3"><span className="text-copper mt-1">●</span> Direct line to Tony</li>
                </ul>
                <button className="w-full py-4 rounded-full border border-ink/20 hover:border-ink hover:bg-ink hover:text-bone-paper transition-colors font-satoshi font-medium text-ink">
                  Talk to Tony
                </button>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.4}>
             <p className="text-center font-instrument italic text-2xl text-ink/50 mb-24">
               "You pay more. You don't pay any more for it."
             </p>
          </ScrollReveal>

          {/* Trust Bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pt-16 border-t border-ink/10">
             <ScrollReveal delay={0.1}>
                <h4 className="font-satoshi font-bold text-ink mb-3 flex items-center gap-2">
                  <span className="text-verdigris">🔒</span> End-to-end encrypted
                </h4>
                <p className="font-satoshi text-ink/70 text-sm leading-[1.6]">Your sessions are private. We never train external models on your conversations.</p>
             </ScrollReveal>
             <ScrollReveal delay={0.2}>
                <h4 className="font-satoshi font-bold text-ink mb-3 flex items-center gap-2">
                  <span className="text-verdigris">📅</span> 1-year wallet validity
                </h4>
                <p className="font-satoshi text-ink/70 text-sm leading-[1.6]">Not a subscription. Use your wallet when you need it. Top up only when it's empty.</p>
             </ScrollReveal>
             <ScrollReveal delay={0.3}>
                <h4 className="font-satoshi font-bold text-ink mb-3 flex items-center gap-2">
                  <span className="text-verdigris">🗝</span> Memory you control
                </h4>
                <p className="font-satoshi text-ink/70 text-sm leading-[1.6]">SAM remembers what you choose to keep. Delete any session anytime.</p>
             </ScrollReveal>
             <ScrollReveal delay={0.4}>
                <h4 className="font-satoshi font-bold text-ink mb-3 flex items-center gap-2">
                  <span className="text-copper">↩</span> No-fit, no-charge
                </h4>
                <p className="font-satoshi text-ink/70 text-sm leading-[1.6]">If your first $5 session doesn't reveal something useful, we refund. No questions.</p>
             </ScrollReveal>
          </div>
        </div>
      </section>

      {/* S8 · THE ARCHITECT */}
      <section className="py-32 px-6 sm:px-12 md:px-24 bg-bone-paper">
        <div className="max-w-[1200px] mx-auto border border-ink/10 rounded-[40px] overflow-hidden bg-white flex flex-col md:flex-row">
          <div className="w-full md:w-[45%] relative aspect-[4/5] bg-ink/5">
             <Image src="https://picsum.photos/seed/tony/800/1000" alt="Tony Kirkland" fill className="object-cover grayscale mix-blend-multiply opacity-80" />
             <div className="absolute inset-0 bg-verdigris/10 mix-blend-color"></div>
          </div>
          <div className="w-full md:w-[55%] p-10 md:p-16 lg:p-24 flex flex-col justify-center">
            <ScrollReveal>
              <p className="font-mono text-xs tracking-widest uppercase text-verdigris mb-6">The Architect</p>
              <h2 className="font-instrument text-4xl md:text-5xl leading-[1.1] text-ink mb-8">
                Built by someone who thinks for a living.
              </h2>
              <p className="font-satoshi text-lg text-ink/70 leading-[1.6] mb-12">
                Long-time coach. Author of <em>Journey to the Stream</em>. SAM didn't come out of an AI lab — it came out of years of watching brilliant people stay stuck.
              </p>
              <div className="border-l-2 border-verdigris pl-6 mb-12">
                <p className="font-instrument italic text-3xl text-ink">"The AI is not the hero. You are."</p>
              </div>
              <Link href="/the-journey" className="inline-block border-b border-verdigris/40 pb-1 text-ink hover:border-verdigris hover:text-verdigris transition-colors font-satoshi font-medium">
                Read Tony's full story &rarr;
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* S9 · FAQ + FINAL CTA */}
      <section className="bg-bone-paper">
        <div className="py-32 px-6 sm:px-12 md:px-24 max-w-[1000px] mx-auto">
          <ScrollReveal>
            <p className="font-mono text-xs tracking-widest uppercase text-verdigris mb-6 text-center">Questions</p>
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-ink mb-16 text-center">
              What people ask<br/>before they begin.
            </h2>
          </ScrollReveal>

          <div className="flex flex-col gap-6">
            {[
              {
                q: "How is this different from ChatGPT?",
                a: "ChatGPT and Claude are inside SAM — but they aren't SAM. SAM is the diagnostic structure that maps how you think across multiple levels, holds memory across sessions, and integrates fragments into coherent next moves. The LLMs are an instrument. SAM is the partnership. We don't tell you what to think. We help you hear what you already do."
              },
              {
                q: "Is SAM just another chatbot?",
                a: "No. A chatbot answers what you ask. SAM works with how you are thinking — surfaces structure, names what's missing, reflects coherence gaps back to you. The output is your own thinking made visible, not an external answer."
              },
              {
                q: "What about my data?",
                a: "End-to-end encrypted. Your sessions are private. SAM remembers what you choose to keep. We never train external models on your conversations."
              },
              {
                q: "How does the wallet pricing work?",
                a: "Not a subscription. You put $5 or $50 into your wallet. You have a year to use it. Different wallets unlock different libraries. You only pay again when your wallet runs out — and you don't have to renew."
              },
              {
                q: "Do I need to be technical?",
                a: "No. The diagnostic is six questions. The deep dive is a conversation. If you can describe what you're stuck on in plain language, SAM works."
              },
              {
                q: "Why don't you show testimonials yet?",
                a: "Because real ones are still being built. The page you're reading is a soft launch. We'd rather show you nothing than fake voices. By Q3 2026, this section will hold three real Sessions with named outcomes."
              },
              {
                q: "What if I'm not sure SAM is for me?",
                a: "Take the free diagnostic. Three minutes. No account. If the report doesn't reveal something useful, you've lost nothing. If it does, you'll know."
              }
            ].map((faq, idx) => (
              <ScrollReveal key={idx} delay={0.1}>
                <details className="group border-b border-ink/10 pb-6 cursor-pointer">
                  <summary className="font-satoshi text-xl font-medium text-ink list-none flex justify-between items-center pr-2">
                    {faq.q}
                    <span className="text-verdigris font-light text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                  </summary>
                  <p className="font-satoshi text-ink/70 leading-[1.6] mt-4 max-w-[800px] pl-4 border-l border-verdigris/30">
                    {faq.a}
                  </p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* FINAL CTA BLOCK */}
        <div className="bg-slate-ink py-32 px-6 sm:px-12 md:px-24 text-bone-paper flex flex-col items-center text-center rounded-t-[60px] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vh] bg-verdigris/10 blur-[150px] rounded-[100%] pointer-events-none mix-blend-screen" />
          
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(3.5rem,7vw,6rem)] leading-[1.05] mb-8 relative z-10">
              The thinking is<br/>
              <span className="italic text-verdigris-pale">already there.</span>
            </h2>
            <p className="font-satoshi text-xl text-bone-paper/70 max-w-[500px] mx-auto mb-12 relative z-10">
              Six questions. Three minutes. One report that shows you what you've been missing.
            </p>
            <Link href="#diagnostic" className="inline-block px-10 py-5 rounded-full bg-verdigris text-white font-satoshi font-medium hover:bg-white hover:text-slate-ink transition-colors duration-500 mb-6 relative z-10">
              Take the diagnostic &rarr;
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-widest text-bone-paper/40 mb-20 relative z-10">
              No account · No email · First $5 refunded if it reveals nothing useful
            </p>
            <p className="font-instrument italic text-xl text-copper/80 relative z-10">
              "We don't tell you what to think. We help you hear what you already do."
            </p>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
