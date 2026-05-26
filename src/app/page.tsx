import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { DissolveParticleHero } from "@/components/ui/DissolveParticleHero";
import { HeroSpline } from "@/components/ui/HeroSpline";
import { ProvenExpertCard } from "@/components/ui/ProvenExpertCard";
import { AuditPopupAutoOpener } from "@/components/ui/AuditPopupAutoOpener";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-clip">

      {/* SECTION 1.1: HERO — Spline-Variante aktiv, Particle als Backup */}
      <HeroSpline />
      {/* <DissolveParticleHero /> */}

      {/* SECTION 1.2: TRUST-LEISTE (MARQUEE) */}
      <section className="bg-[#F0EDE8] border-y border-[rgba(181,176,168,0.3)] relative z-0 -mt-[40px] pt-[calc(1.5rem+40px)] pb-6 overflow-hidden">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}} />
        <div className="max-w-[1400px] mx-auto flex flex-col items-center">
          <p className="font-satoshi text-[#6B6963] text-[0.75rem] uppercase tracking-[0.18em] mb-5 text-center">
            Vertraut von kreativen Visionären, Pionieren und Machern
          </p>
          
          <div className="w-full relative flex overflow-hidden group">
            {/* Fade/Gradient Masks for scrolling area edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#F0EDE8] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#F0EDE8] to-transparent z-10 pointer-events-none"></div>
            
            {/* The scrolling track */}
            <div className="flex gap-12 items-center w-max animate-marquee group-hover:[animation-play-state:paused]">
              
              {/* Duplicate the array 2× for seamless 50%-translate loop (vorher 4×, war zu redundant) */}
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-12 items-center whitespace-nowrap opacity-70 group-hover:opacity-90 transition-opacity duration-300">
                  <span className="font-geist text-[0.9rem] text-[#B5B0A8]">Stefan Pons</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8963E]"></span>

                  <span className="font-geist text-[0.9rem] text-[#B5B0A8]">Nadja Kirchner</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8963E]"></span>

                  <span className="font-geist text-[0.9rem] text-[#B5B0A8]">Silke Ettrich</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8963E]"></span>

                  <span className="font-geist text-[0.9rem] text-[#B5B0A8]">Philipp Siebler</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8963E]"></span>

                  <span className="font-geist text-[0.9rem] text-[#B5B0A8]">Stefanie Lommel</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8963E]"></span>

                  <span className="font-geist text-[0.9rem] text-[#B5B0A8]">Conversion Films</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8963E]"></span>
                </div>
              ))}
              
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.3: PAIN + MISSION (verschmolzen) — 4 visuelle Pain-Punkte plus Sabala-Quote als Guide */}
      <section className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-night-foundation text-night-text relative overflow-hidden">
        {/* Subtle Gold Glow */}
        <div className="absolute top-1/3 -left-[15vw] w-[600px] h-[600px] bg-refined-gold/[0.06] blur-[180px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Eyebrow */}
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-[1px] w-10 bg-refined-gold"></div>
              <span className="font-mono text-refined-gold text-[0.7rem] tracking-[0.22em] uppercase font-bold">Warum dein Auftritt nicht wirkt</span>
            </div>
          </ScrollReveal>

          {/* Hauptüberschrift */}
          <ScrollReveal delay={0.1}>
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] tracking-[-0.02em] text-night-text mb-20 md:mb-24 max-w-[20ch]">
              Du hast investiert.<br />
              <span className="text-night-secondary">Aber dein Außenauftritt liegt unter deinem Niveau.</span>
            </h2>
          </ScrollReveal>

          {/* 4-Pain-Visualisierung als breites Grid (zentriert, max 1100px, Text dominant) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-x-20 md:gap-y-10 max-w-[1100px]">
            {[
              { num: "01", text: "Deine Webseite sieht aus wie tausend andere." },
              { num: "02", text: "Die Texte klingen nicht nach dir." },
              { num: "03", text: "Niemand versteht, was dich besonders macht." },
              { num: "04", text: "Neue Kunden kommen nicht." },
            ].map((pain, i) => (
              <ScrollReveal key={pain.num} delay={0.15 + i * 0.08}>
                <div className="group flex items-start gap-6 border-l border-refined-gold/30 pl-6 md:pl-8 py-3 hover:border-refined-gold/70 transition-colors duration-500">
                  <span className="font-mono text-refined-gold text-[1.5rem] md:text-[1.85rem] tracking-tight leading-none mt-2 group-hover:translate-x-1 transition-transform duration-500">{pain.num}</span>
                  <p className="font-instrument text-night-text text-[1.35rem] md:text-[1.65rem] leading-[1.35] tracking-[-0.01em]">
                    {pain.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1.3B: ZITAT-ZWISCHENKOMPONENT (cream-Pause zwischen dunkler Pain und dunkler Angebot-Sektion) */}
      <section className="bg-warm-canvas py-20 md:py-32 relative">
        <div className="w-full flex flex-col md:flex-row-reverse items-center justify-between">
          {/* Portrait */}
          <div className="w-full md:w-[45%] relative h-[60vh] md:h-[70vh]">
            <Image
              src="/images/zitat-sabala-home.jpg"
              alt="Ilja Sabala Krasevskij"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-center"
            />
            {/* Fade left in Warm Canvas on Desktop */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-warm-canvas via-[#FAF8F5]/40 to-[#FAF8F5]/0 w-[101%] -translate-x-[1px] pointer-events-none"></div>
            {/* Fade down in Warm Canvas on Mobile */}
            <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/0 via-[#FAF8F5]/40 to-warm-canvas h-[101%] pointer-events-none"></div>
          </div>

          {/* Quote-Text */}
          <div className="w-full md:w-[55%] px-6 sm:px-12 md:pr-16 md:pl-24 lg:pl-32 max-w-[800px] mt-12 md:mt-0">
            <ScrollReveal className="relative">
              <span className="absolute -top-10 -left-6 md:-left-10 font-instrument text-refined-gold text-[5rem] md:text-[6rem] opacity-30 leading-none select-none pointer-events-none">
                &ldquo;
              </span>
              <p className="font-instrument italic text-[1.5rem] md:text-[1.85rem] leading-[1.4] text-deep-charcoal relative z-10 mb-6">
                Ich öffne Türen. Und begleite Menschen hindurch. Umsetzung ist Pflicht. Der Weg darf sich richtig anfühlen.
              </p>
              <p className="font-mono text-warm-steel text-[0.75rem] uppercase tracking-[0.18em]">
                Ilja Sabala Krasevskij
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 1.4A: ANGEBOT INTRO (VIDEO BACKGROUND — preload="none" für PageSpeed) */}
      <section id="angebot" className="relative w-full min-h-[60vh] py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-night-foundation flex flex-col items-center justify-center overflow-hidden">
        {/* Background Video — preload="none" verhindert dass das Video direkt beim Pageload bezieht; lädt erst wenn wirklich nötig */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/videos/liquid-gold-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.4] z-0 pointer-events-none mix-blend-screen"
        >
          <source src="/videos/liquid-gold.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#2E2B26]/60 z-[1] pointer-events-none"></div>

        <div className="max-w-[1000px] mx-auto text-center relative z-10 flex flex-col items-center justify-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 mb-7">
              <div className="h-[1px] w-10 bg-refined-gold"></div>
              <span className="font-mono text-refined-gold text-[0.7rem] tracking-[0.22em] uppercase font-bold">Komplett gedacht. Aus einem Guss.</span>
              <div className="h-[1px] w-10 bg-refined-gold"></div>
            </div>
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] text-night-text tracking-[-0.02em] mb-6">
              Strategie, Brand, Technik und Pflege. Aus einem Guss.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-satoshi text-[#A09C95] text-[1.125rem] leading-[1.65] max-w-[65ch]">
              Kein Stückwerk. Kein Abliefern. Ein durchdachter Prozess, der bei dir beginnt und in einer Webseite mündet, die dich zeigt.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 1.4B: ANGEBOT PROZESS-SCHRITTE (Editorial 3-Phasen) */}
      <section className="py-24 md:py-40 px-6 sm:px-12 md:px-24 bg-warm-canvas relative overflow-hidden">
        {/* Soft Gold Glows — atmospheric, no busy patterns */}
        <div className="absolute top-1/4 -left-[20vw] w-[700px] h-[700px] bg-refined-gold/[0.05] blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -right-[15vw] w-[600px] h-[600px] bg-refined-gold/[0.04] blur-[150px] rounded-full pointer-events-none" />

        {/* Eyebrow + Headline */}
        <div className="max-w-[1200px] mx-auto text-center mb-20 md:mb-28 relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 mb-7">
              <div className="h-[1px] w-10 bg-refined-gold"></div>
              <span className="font-mono text-refined-gold text-[0.7rem] md:text-xs tracking-[0.25em] uppercase font-bold">Der Sabala-Prozess</span>
              <div className="h-[1px] w-10 bg-refined-gold"></div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-instrument text-[clamp(2.5rem,5.5vw,4.5rem)] text-deep-charcoal leading-[1.05] mb-6 tracking-[-0.01em]">
              So entsteht dein{" "}
              <span className="italic text-refined-gold relative inline-block">
                Premium-Auftritt
                <svg className="absolute -bottom-1 left-0 w-full h-3 text-refined-gold/40" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none" stroke="currentColor">
                  <path d="M2 8 Q 50 2, 100 6 T 198 4" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              .
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-satoshi text-warm-steel text-lg md:text-xl leading-relaxed max-w-[560px] mx-auto">
              Drei Phasen. Ein klares Ziel: Dein neues Fundament — Schritt für Schritt aufgebaut.
            </p>
          </ScrollReveal>
        </div>

        <div className="max-w-[1300px] mx-auto relative pb-12">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
            {/* Phase 1 */}
            <ScrollReveal delay={0.1}>
              <div className="group relative h-full">
                {/* Big Background Number */}
                <div className="absolute -top-4 -right-2 lg:-top-6 lg:-right-4 font-instrument text-[8rem] lg:text-[11rem] leading-none text-refined-gold/[0.07] pointer-events-none select-none">
                  01
                </div>
                <div className="relative h-full p-8 md:p-10 border border-refined-gold/20 rounded-[28px] bg-pure-surface shadow-[0_20px_50px_rgba(26,26,24,0.06)] hover:shadow-[0_30px_70px_rgba(184,150,62,0.18)] hover:border-refined-gold/50 hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col z-20 overflow-hidden">
                  {/* Gold corner accent */}
                  <div className="absolute top-0 left-0 w-16 h-[1px] bg-gradient-to-r from-refined-gold to-transparent"></div>
                  <div className="absolute top-0 left-0 w-[1px] h-16 bg-gradient-to-b from-refined-gold to-transparent"></div>

                  {/* Custom Icon: Compass (Positionierung) */}
                  <div className="mb-6 flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full border border-refined-gold/30 bg-refined-gold/5 flex items-center justify-center text-refined-gold group-hover:bg-refined-gold group-hover:text-white group-hover:rotate-45 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <polygon points="12 7 14 12 12 17 10 12 12 7" fill="currentColor" />
                        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="font-mono text-refined-gold text-[0.7rem] tracking-[0.25em] uppercase font-bold">Phase 01</span>
                  </div>

                  <h3 className="font-instrument text-2xl md:text-3xl text-deep-charcoal mb-4 leading-tight">Essenz & <span className="italic text-refined-gold">Positionierung</span></h3>
                  <p className="font-satoshi text-warm-steel leading-[1.7] font-light flex-1">Wir betreiben kein Oberflächen-Marketing. Im tiefen Interview finden wir heraus, wofür du wirklich stehst, und übersetzen das in eine glasklare Positionierung.</p>

                  {/* Bottom decorative line */}
                  <div className="mt-6 pt-5 border-t border-whisper-border flex items-center gap-2 text-warm-steel/60 font-mono text-[0.65rem] uppercase tracking-[0.2em]">
                    <div className="w-1.5 h-1.5 rounded-full bg-refined-gold"></div>
                    <span>Tiefen-Interview · Brand Voice</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Phase 2 (Highlighted Mid) */}
            <ScrollReveal delay={0.2}>
              <div className="group relative h-full lg:-translate-y-4">
                <div className="absolute -top-4 -right-2 lg:-top-6 lg:-right-4 font-instrument text-[8rem] lg:text-[11rem] leading-none text-refined-gold/[0.09] pointer-events-none select-none">
                  02
                </div>
                <div className="relative h-full p-8 md:p-10 border-2 border-refined-gold/40 rounded-[28px] bg-pure-surface shadow-[0_30px_70px_rgba(184,150,62,0.12)] hover:shadow-[0_40px_90px_rgba(184,150,62,0.22)] hover:border-refined-gold/70 hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col z-20 overflow-hidden">
                  <div className="absolute top-0 left-0 w-16 h-[1px] bg-gradient-to-r from-refined-gold to-transparent"></div>
                  <div className="absolute top-0 left-0 w-[1px] h-16 bg-gradient-to-b from-refined-gold to-transparent"></div>

                  {/* Subtle Glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-refined-gold/12 blur-[60px] rounded-full pointer-events-none group-hover:bg-refined-gold/20 transition-colors duration-700"></div>

                  {/* Custom Icon: Diamond/Brand (Identity) */}
                  <div className="mb-6 flex items-center gap-3 relative z-10">
                    <div className="w-14 h-14 rounded-full border border-refined-gold/30 bg-refined-gold/5 flex items-center justify-center text-refined-gold group-hover:bg-refined-gold group-hover:text-white group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 3h12l4 6-10 13L2 9z" />
                        <path d="M11 3 8 9l4 13 4-13-3-6" />
                        <path d="M2 9h20" />
                      </svg>
                    </div>
                    <span className="font-mono text-refined-gold text-[0.7rem] tracking-[0.25em] uppercase font-bold">Phase 02</span>
                  </div>

                  <h3 className="font-instrument text-2xl md:text-3xl text-deep-charcoal mb-4 leading-tight relative z-10">Brand Identity & <span className="italic text-refined-gold">Formgebung</span></h3>
                  <p className="font-satoshi text-warm-steel leading-[1.7] font-light flex-1 relative z-10">Brand-Mini-Guide entsteht mit Typografie, Farbwelt und Tonalität. Auf deine Persönlichkeit und Frequenz präzise abgestimmt. Logo optional als Add-on mit Fleur.</p>

                  <div className="mt-6 pt-5 border-t border-whisper-border flex items-center gap-2 text-warm-steel/60 font-mono text-[0.65rem] uppercase tracking-[0.2em] relative z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-refined-gold"></div>
                    <span>Farben · Typo · Bildsprache</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Phase 3 */}
            <ScrollReveal delay={0.3}>
              <div className="group relative h-full">
                <div className="absolute -top-4 -right-2 lg:-top-6 lg:-right-4 font-instrument text-[8rem] lg:text-[11rem] leading-none text-refined-gold/[0.07] pointer-events-none select-none">
                  03
                </div>
                <div className="relative h-full p-8 md:p-10 border border-refined-gold/20 rounded-[28px] bg-pure-surface shadow-[0_20px_50px_rgba(26,26,24,0.06)] hover:shadow-[0_30px_70px_rgba(184,150,62,0.18)] hover:border-refined-gold/50 hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col z-20 overflow-hidden">
                  <div className="absolute top-0 left-0 w-16 h-[1px] bg-gradient-to-r from-refined-gold to-transparent"></div>
                  <div className="absolute top-0 left-0 w-[1px] h-16 bg-gradient-to-b from-refined-gold to-transparent"></div>

                  {/* Custom Icon: Globe + Sparkle (Launch) */}
                  <div className="mb-6 flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full border border-refined-gold/30 bg-refined-gold/5 flex items-center justify-center text-refined-gold group-hover:bg-refined-gold group-hover:text-white group-hover:rotate-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14.6 14.6 0 0 1 0 18M12 3a14.6 14.6 0 0 0 0 18" />
                      </svg>
                    </div>
                    <span className="font-mono text-refined-gold text-[0.7rem] tracking-[0.25em] uppercase font-bold">Phase 03</span>
                  </div>

                  <h3 className="font-instrument text-2xl md:text-3xl text-deep-charcoal mb-4 leading-tight">Live-Schaltung & <span className="italic text-refined-gold">Pflege</span></h3>
                  <p className="font-satoshi text-warm-steel leading-[1.7] font-light flex-1">Deine voll animierte, performante Webseite geht live. Hosting via Vercel · DSGVO · cookie-frei. Keine Templates. Plus laufende Pflege im Recurring-Modell, damit dein Auftritt mit dir lebendig bleibt.</p>

                  <div className="mt-6 pt-5 border-t border-whisper-border flex items-center gap-2 text-warm-steel/60 font-mono text-[0.65rem] uppercase tracking-[0.2em]">
                    <div className="w-1.5 h-1.5 rounded-full bg-refined-gold"></div>
                    <span>Launch · Pflege · Recurring</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Edler Outline-Button */}
          <ScrollReveal delay={0.4} className="mt-20 md:mt-24 flex justify-center">
            <Link
              href="/premium-angebot"
              className="group relative inline-flex items-center gap-5 px-8 md:px-10 py-4 md:py-5 rounded-full overflow-hidden transition-all duration-500"
            >
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-refined-gold/40 group-hover:border-refined-gold transition-colors duration-500"></div>
              {/* Fill on Hover */}
              <div className="absolute inset-0 rounded-full bg-refined-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"></div>

              {/* Text */}
              <span className="relative z-10 font-satoshi font-medium text-base md:text-lg text-deep-charcoal group-hover:text-white transition-colors duration-500 tracking-wide">
                Den detaillierten 7-Schritte-Fahrplan ansehen
              </span>

              {/* Arrow Icon in Circle */}
              <span className="relative z-10 w-10 h-10 md:w-11 md:h-11 rounded-full bg-refined-gold group-hover:bg-white flex items-center justify-center transition-all duration-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-refined-gold group-hover:translate-x-1 transition-all duration-500">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 1.4B+: ALL-IN-ONE DIFFERENZIATOR — was im Bundle drin ist (Tech/Mentoring/SEO/Analytics) */}
      <section className="py-32 md:py-40 px-6 sm:px-12 md:px-24 bg-tech-bg text-night-text relative overflow-hidden">
        {/* Dezenter Gold-Glow oben */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-refined-gold/[0.05] blur-[180px] rounded-full pointer-events-none" />

        <div className="max-w-[1300px] mx-auto relative z-10">
          {/* Eyebrow */}
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-7">
              <div className="h-[1px] w-10 bg-refined-gold"></div>
              <span className="font-mono text-refined-gold text-[0.7rem] tracking-[0.22em] uppercase font-bold">Was Sabala anders macht</span>
              <div className="h-[1px] w-10 bg-refined-gold"></div>
            </div>
          </ScrollReveal>

          {/* H2 */}
          <ScrollReveal delay={0.1}>
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] text-night-text text-center mb-20 md:mb-24 max-w-[22ch] mx-auto">
              Andere verkaufen Stunden.<br/>
              <span className="italic text-refined-gold">Ich baue dein ganzes Setup.</span>
            </h2>
          </ScrollReveal>

          {/* 6-Karten-Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              {num: "01", title: "Coaching + Mentoring", desc: "Was andere als 6-Monats-Online-Programme verkaufen, ist hier Teil der Begleitung. Eins zu eins, ohne Skool-Gruppe."},
              {num: "02", title: "Premium-Webseite", desc: "Strategie, Brand, Technik aus einem Guss. Next.js, cookie-frei, performance-optimiert."},
              {num: "03", title: "Premium-Pflege", desc: "Recurring-Modell statt One-Shot. Dein Auftritt lebt weiter, ohne dass du nachdenkst."},
              {num: "04", title: "SEO + GEO", desc: "Sichtbarkeit in Google UND KI-Suchen. Schema-Markup, Pillar-Pages, GEO-Strategie."},
              {num: "05", title: "Analytics + Berichte", desc: "Monatlicher Report: was rankt, was konvertiert, was als nächstes kommt. Daten statt Bauchgefühl."},
              {num: "06", title: "Begleiter, nicht Agentur", desc: "Keine Hotline. Kein Ticket-System. Direkter Draht zu mir. Antworten in 24 Stunden."},
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={0.15 + i*0.06}>
                <div className="group relative p-7 md:p-8 border border-white/10 rounded-[24px] bg-white/[0.02] hover:bg-white/[0.04] hover:border-refined-gold/40 transition-all duration-500 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-refined-gold text-[0.75rem] tracking-[0.22em] uppercase font-bold">{item.num}</span>
                    <div className="h-[1px] flex-1 max-w-[40px] bg-refined-gold/40"></div>
                  </div>
                  <h3 className="font-instrument text-2xl md:text-[1.75rem] text-night-text mb-3 leading-tight">{item.title}</h3>
                  <p className="font-satoshi text-night-secondary text-base leading-[1.6] flex-1">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1.4D: PROVEN-EXPERT TRUST-CARD (vorgezogen: Trust vor Pricing — Hormozi-Logik) */}
      <section className="bg-warm-canvas py-20 md:py-28 px-6 sm:px-12 md:px-24 relative overflow-hidden border-t border-whisper-border">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-refined-gold/[0.04] blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="h-[1px] w-10 bg-refined-gold" />
                  <span className="font-mono text-refined-gold text-[0.65rem] md:text-xs tracking-[0.25em] uppercase font-bold">
                    Verifizierte Auszeichnung
                  </span>
                </div>
                <h2 className="font-instrument text-[clamp(2rem,4vw,3rem)] text-deep-charcoal leading-[1.1] mb-5">
                  154 Bewertungen.{" "}
                  <span className="italic text-refined-gold">Unabhängig verifiziert.</span>
                </h2>
                <p className="font-satoshi text-warm-steel text-base md:text-lg leading-[1.65]">
                  Über die Jahre haben Menschen aus den unterschiedlichsten Bereichen mit mir gearbeitet. Jede Bewertung wird unabhängig über ProvenExpert geprüft. Das volle Profil ist öffentlich einsehbar.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <ProvenExpertCard variant="card" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 1.4C: DREI WEGE ZUR ZUSAMMENARBEIT */}
      <section className="bg-pure-surface py-24 md:py-32 px-6 sm:px-12 md:px-24 relative overflow-hidden border-t border-whisper-border">
        {/* Hero illustration as subtle background */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <Image src="/images/homepage/drei-wege-hero.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-refined-gold/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-[800px] mx-auto mb-16 md:mb-20">
              <div className="inline-block px-5 py-2 rounded-full border border-refined-gold/30 bg-refined-gold/5 mb-6">
                <span className="font-geist text-[0.65rem] md:text-sm tracking-[0.2em] uppercase text-refined-gold font-medium">Drei Wege zur Zusammenarbeit</span>
              </div>
              <h2 className="font-instrument text-[clamp(2.5rem,5vw,4rem)] text-deep-charcoal leading-[1.05] mb-6">
                Wie wir{" "}
                <span className="italic text-refined-gold">gemeinsam starten.</span>
              </h2>
              <p className="font-satoshi text-warm-steel text-lg md:text-xl leading-[1.65]">
                Drei Wege, je nachdem, wo du stehst und wie tief du gehen willst.
              </p>
            </div>
          </ScrollReveal>

          {/* 3-Way Bento: Premium dominant, OnePager + KI sekundär */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Premium-Webseite (Hauptangebot) */}
            <ScrollReveal delay={0.1} className="lg:col-span-7 group">
              <Link href="/premium-angebot" className="block h-full">
                <div className="relative rounded-[2rem] overflow-hidden border-2 border-refined-gold/40 bg-pure-surface shadow-[0_30px_70px_rgba(184,150,62,0.08)] hover:shadow-[0_40px_90px_rgba(184,150,62,0.15)] hover:border-refined-gold/70 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 h-full flex flex-col">
                  {/* Empfohlen Badge */}
                  <div className="absolute top-6 right-6 z-20 bg-refined-gold text-deep-charcoal uppercase tracking-widest text-[10px] font-bold px-3 py-1 rounded-full">
                    Hauptangebot
                  </div>

                  {/* Image */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src="/images/homepage/premium-webseite-card.jpg"
                      alt="Premium-Webseite"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/40 via-transparent to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10 lg:p-12 flex flex-col flex-1">
                    <p className="font-mono text-refined-gold text-xs tracking-widest uppercase mb-3">01 · Premium-Webseite</p>
                    <h3 className="font-instrument text-3xl md:text-4xl lg:text-5xl text-deep-charcoal leading-tight mb-4">
                      Dein vollständiger{" "}
                      <span className="italic text-refined-gold">Webauftritt.</span>
                    </h3>
                    <p className="font-satoshi text-warm-steel text-base md:text-lg leading-relaxed mb-8 max-w-[560px]">
                      Bis zu 12 Seiten, individuell designt und animiert. Strategie, Brand, Technik und Pflege in einer Begleitung. Drei klare Stufen vom sauberen Einstieg bis zur Bespoke-Edition.
                    </p>

                    <div className="flex flex-wrap gap-4 mb-8">
                      <div className="bg-warm-canvas border border-whisper-border rounded-2xl px-5 py-3">
                        <span className="font-geist text-warm-steel text-[0.65rem] uppercase tracking-widest block mb-1">Lite</span>
                        <span className="font-instrument text-deep-charcoal text-xl">ab 8.000 €</span>
                      </div>
                      <div className="bg-deep-charcoal border border-refined-gold/30 rounded-2xl px-5 py-3 relative">
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-refined-gold text-[#050505] uppercase tracking-widest text-[8px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">Empfohlen</span>
                        <span className="font-geist text-refined-gold text-[0.65rem] uppercase tracking-widest block mb-1">Basis</span>
                        <span className="font-instrument text-white text-xl">ab 11.000 €</span>
                      </div>
                      <div className="bg-warm-canvas border border-whisper-border rounded-2xl px-5 py-3">
                        <span className="font-geist text-warm-steel text-[0.65rem] uppercase tracking-widest block mb-1">All-in</span>
                        <span className="font-instrument text-deep-charcoal text-xl">ab 15.000 €</span>
                      </div>
                    </div>

                    <div className="mt-auto inline-flex items-center gap-3 text-deep-charcoal font-satoshi font-medium">
                      <span>Drei Stufen ansehen</span>
                      <span className="w-10 h-10 rounded-full bg-refined-gold flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            {/* OnePager + KI-Team (rechte Spalte, gestapelt) */}
            <div className="lg:col-span-5 grid grid-rows-2 gap-6">
              {/* OnePager */}
              <ScrollReveal delay={0.2} className="group">
                <Link href="/special-launch-angebot" className="block h-full">
                  <div className="relative rounded-[2rem] overflow-hidden border border-whisper-border bg-pure-surface hover:border-refined-gold/50 hover:shadow-[0_30px_70px_rgba(184,150,62,0.1)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 h-full flex">
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <p className="font-mono text-refined-gold text-xs tracking-widest uppercase">02 · OnePager</p>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-warm-steel/60 bg-warm-canvas px-2 py-1 rounded-full border border-whisper-border">14 Tage Launch</span>
                      </div>
                      <h3 className="font-instrument text-2xl md:text-3xl text-deep-charcoal leading-tight mb-3">
                        Schneller{" "}
                        <span className="italic text-refined-gold">Premium-Einstieg.</span>
                      </h3>
                      <p className="font-satoshi text-warm-steel text-sm md:text-base leading-relaxed mb-4 flex-1">
                        Eine fokussierte Premium-OnePager mit Wow-Effekt — verkaufspsychologisch gebaut, in 14 Tagen live.
                      </p>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="font-mono text-warm-steel text-xs uppercase tracking-widest">Reference</span>
                        <span className="font-instrument text-deep-charcoal text-2xl">2.490 €</span>
                        <span className="font-mono text-warm-steel/60 text-xs">/ regulär 4.900 €</span>
                      </div>
                      <div className="inline-flex items-center gap-2 text-deep-charcoal font-satoshi font-medium text-sm">
                        <span>OnePager ansehen</span>
                        <span className="text-refined-gold group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>

              {/* KI-Team */}
              <ScrollReveal delay={0.3} className="group">
                <Link href="/gpt-team" className="block h-full">
                  <div className="relative rounded-[2rem] overflow-hidden border border-deep-charcoal/15 bg-deep-charcoal hover:border-refined-gold/50 hover:shadow-[0_30px_70px_rgba(184,150,62,0.15)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 h-full flex">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-refined-gold/15 blur-[60px] rounded-full group-hover:bg-refined-gold/25 transition-colors duration-700" />
                    <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <p className="font-mono text-refined-gold text-xs tracking-widest uppercase">03 · KI-Team</p>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 bg-white/5 px-2 py-1 rounded-full border border-white/10">Diamond Force</span>
                      </div>
                      <h3 className="font-instrument text-2xl md:text-3xl text-white leading-tight mb-3">
                        Dein autarkes{" "}
                        <span className="italic text-refined-gold">KI-Team.</span>
                      </h3>
                      <p className="font-satoshi text-white/70 text-sm md:text-base leading-relaxed mb-4 flex-1">
                        Custom GPTs als Bundle — dein KI-Team begleitet dich operativ. Mooni & die Diamond Force.
                      </p>
                      <div className="inline-flex items-center gap-2 text-white font-satoshi font-medium text-sm">
                        <span>KI-Team kennenlernen</span>
                        <span className="text-refined-gold group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1.5: TESTIMONIALS — Stimmen aus der Begleitung (Initial-Badges statt Stock-Avatare) */}
      <section className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-night-foundation text-night-text border-y border-white/5">
        <div className="max-w-[1200px] mx-auto overflow-hidden">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-7">
              <div className="h-[1px] w-10 bg-refined-gold"></div>
              <span className="font-mono text-refined-gold text-[0.7rem] tracking-[0.22em] uppercase font-bold">Stimmen aus der Begleitung</span>
              <div className="h-[1px] w-10 bg-refined-gold"></div>
            </div>
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,3.5rem)] text-night-text mb-16 text-center leading-[1.1]">
              Was Menschen über die{" "}
              <span className="italic text-refined-gold">Zusammenarbeit</span>{" "}
              sagen.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            {/* Nadja - Große Box oben drüber */}
            <ScrollReveal delay={0.1} className="md:col-span-2">
              <div className="border border-white/10 p-10 md:p-14 rounded-[24px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors backdrop-blur-sm h-full flex flex-col justify-between group">
                <div>
                  <div className="text-refined-gold text-5xl md:text-7xl font-instrument mb-4 opacity-30">&quot;</div>
                  <p className="text-2xl md:text-3xl font-instrument leading-[1.4] mb-12 max-w-[850px]">
                    Ilja hat mich in 6 Sessions begleitet. In der Zusammenarbeit ist ein tolles Format entstanden, mit welchem ich bereits Umsatz generiere. Die Zusammenarbeit war unheimlich angenehm, durch Iljas wertschätzende, kreative, erdende und authentische Art.
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-refined-gold/15 border border-refined-gold/40 font-mono text-refined-gold text-[0.85rem] tracking-tight font-bold">
                    NK
                  </div>
                  <div>
                    <p className="font-satoshi font-medium text-pure-surface">Nadja Kirchner</p>
                    <p className="text-night-secondary text-[0.8rem] font-mono mt-1 uppercase tracking-widest">Unternehmerin</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Philipp - Box links */}
            <ScrollReveal delay={0.2} className="h-full">
              <div className="border border-white/10 p-10 rounded-[24px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors backdrop-blur-sm h-full flex flex-col justify-between group">
                <div>
                  <div className="text-refined-gold text-4xl md:text-5xl font-instrument mb-4 opacity-30">&quot;</div>
                  <p className="text-xl md:text-2xl font-instrument leading-[1.45] mb-12">
                    Was man in kurzer Zeit über sich und seine Psyche lernt und verbessern kann, ist wirklich beeindruckend. Und das ganze mühelos! Was Sabala anbietet sollte JEDER in Erwägung ziehen, der zur heutigen Zeit selbstständig ist.
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-refined-gold/15 border border-refined-gold/40 font-mono text-refined-gold text-[0.85rem] tracking-tight font-bold">
                    PS
                  </div>
                  <div>
                    <p className="font-satoshi font-medium text-pure-surface">Philipp Siebler</p>
                    <p className="text-night-secondary text-[0.8rem] font-mono mt-1 uppercase tracking-widest">Conversion Films</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Silke - Box rechts */}
            <ScrollReveal delay={0.3} className="h-full">
              <div className="border border-white/10 p-10 rounded-[24px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors backdrop-blur-sm h-full flex flex-col justify-between group">
                <div>
                  <div className="text-refined-gold text-4xl md:text-5xl font-instrument mb-4 opacity-30">&quot;</div>
                  <p className="text-xl md:text-2xl font-instrument leading-[1.45] mb-12">
                    Sabalas wundervolle Fähigkeit, einen vertrauensvollen Raum zu eröffnen, ermöglicht es jedem Menschen, sich der eigenen Realität zu stellen und für die eigene Wahrheit zu öffnen.
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-refined-gold/15 border border-refined-gold/40 font-mono text-refined-gold text-[0.85rem] tracking-tight font-bold">
                    SE
                  </div>
                  <div>
                    <p className="font-satoshi font-medium text-pure-surface">Silke Ettrich</p>
                    <p className="text-night-secondary text-[0.8rem] font-mono mt-1 uppercase tracking-widest">Bewusstseinsmentorin</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* SECTION 1.7: REFERENZ-VORSCHAU */}
      <section id="referenzen" className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-warm-canvas">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-10 bg-refined-gold"></div>
                  <span className="font-mono text-refined-gold text-[0.7rem] tracking-[0.22em] uppercase font-bold">Live im Web · Im Build · Auf der Liste</span>
                </div>
                <h2 className="font-instrument text-[clamp(2.5rem,5vw,4rem)] text-deep-charcoal">Arbeiten, die für sich sprechen.</h2>
              </div>
            </div>
          </ScrollReveal>

          {/* Stefanie als Hero-Karte (volle Breite, Live) */}
          <ScrollReveal delay={0.1} className="mb-8 md:mb-10">
            <a href="https://www.dielommel.de" target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-[28px] bg-pure-surface border border-whisper-border shadow-warm-shadow aspect-[16/9] md:aspect-[21/9]">
              <div className="absolute inset-0 z-0 bg-[#2E2B26]">
                <Image src="/images/Referenz-Stefanie-Lommel.jpg" alt="Stefanie Lommel — Premium-Onepager" fill className="object-cover opacity-80 group-hover:scale-[1.02] transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/90 via-deep-charcoal/40 to-transparent"></div>
              </div>
              <div className="absolute top-6 right-6 z-20">
                <span className="bg-refined-gold backdrop-blur-md text-deep-charcoal font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full font-bold shadow-sm">
                  Live
                </span>
              </div>
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-12 text-pure-surface">
                <p className="font-mono text-sm tracking-wider uppercase mb-3 opacity-90 text-refined-gold font-bold">Premium-Onepager · Veröffentlicht</p>
                <h3 className="font-instrument text-4xl md:text-5xl mb-4">Stefanie Lommel</h3>
                <p className="text-pure-surface/80 max-w-[600px] hidden md:block text-base md:text-lg leading-relaxed">Premium-Onepager bereits umgesetzt und live. Ein Auftritt, der die Tiefe und Klarheit ihrer Arbeit auf den ersten Blick spürbar macht.</p>
                <p className="text-pure-surface/90 text-sm font-mono mt-4 inline-flex items-center gap-2">
                  dielommel.de
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </p>
              </div>
            </a>
          </ScrollReveal>

          {/* Sub-Eyebrow für die "im Build"-Reihe */}
          <ScrollReveal delay={0.2}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-refined-gold/50"></div>
              <span className="font-mono text-warm-steel text-[0.65rem] tracking-[0.2em] uppercase">Aktuell im Build</span>
            </div>
          </ScrollReveal>

          {/* Fleur + Max als kleinere Sub-Kacheln (2 Spalten, halbe Höhe) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* Fleur — Im Build */}
            <ScrollReveal delay={0.25} className="group relative overflow-hidden rounded-[20px] bg-pure-surface border border-whisper-border shadow-warm-shadow aspect-[16/10] flex flex-col justify-end">
              <div className="absolute inset-0 z-0">
                <Image src="/images/Das-Team-Fleur.png" alt="Golden Grid (Fleur)" fill className="object-cover opacity-60 mix-blend-multiply group-hover:scale-[1.03] transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              </div>
              <div className="absolute top-5 right-5 z-20">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                  Im Build
                </span>
              </div>
              <div className="relative z-10 p-6 text-pure-surface">
                <p className="font-mono text-[10px] tracking-wider uppercase mb-1.5 text-night-gold opacity-90">Premium Brand Design &amp; Website</p>
                <h3 className="font-instrument text-2xl">Golden Grid (Fleur)</h3>
              </div>
            </ScrollReveal>

            {/* Max Maute — Im Build */}
            <ScrollReveal delay={0.3} className="group relative overflow-hidden rounded-[20px] bg-pure-surface border border-whisper-border shadow-warm-shadow aspect-[16/10] flex flex-col justify-end">
              <div className="absolute inset-0 z-0 bg-[#2E2B26]">
                <Image src="/images/Referenz-Max-Maute.jpg" alt="Max Maute — Vertriebsarchitekt" fill className="object-cover opacity-65 group-hover:scale-[1.03] transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              </div>
              <div className="absolute top-5 right-5 z-20">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                  Im Build
                </span>
              </div>
              <div className="relative z-10 p-6 text-pure-surface">
                <p className="font-mono text-[10px] tracking-wider uppercase mb-1.5 text-night-gold opacity-90">Vertriebsarchitektur · Premium-Auftritt</p>
                <h3 className="font-instrument text-2xl">Max Maute</h3>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 1.8: ABSCHLUSS-CTA */}
      <section id="kontakt" className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-pure-surface rounded-t-[40px] shadow-[0_-40px_60px_rgba(26,26,24,0.02)] relative z-10">
        <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 mb-7">
              <div className="h-[1px] w-10 bg-refined-gold"></div>
              <span className="font-mono text-refined-gold text-[0.7rem] tracking-[0.22em] uppercase font-bold">Lass uns starten</span>
              <div className="h-[1px] w-10 bg-refined-gold"></div>
            </div>
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.2] tracking-[-0.02em] text-deep-charcoal mb-8 max-w-[920px] mx-auto pt-2 pb-1">
              Bereit für{" "}
              <span className="italic text-refined-gold">Liebe auf den ersten Klick?</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-warm-steel text-xl leading-[1.65] max-w-[55ch] mb-12">
              Drei Stufen, ein Versprechen: dein Webauftritt zeigt, wer du bist. Strategie, Brand, Technik und Pflege in einer Hand. Recurring statt One-Shot.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col items-center gap-6 group">
              <div className="p-1 rounded-full border border-whisper-border bg-black/[0.02] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.05)] transition-transform duration-[600ms] group-active:scale-[0.98] ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/[0.04]">
                <Link 
                  href="/premium-angebot" 
                  className="bg-refined-gold flex items-center px-8 py-4 rounded-full gap-4 text-white font-satoshi font-medium text-xl"
                >
                  Zum Premium-Angebot
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transform group-hover:translate-x-2 transition-transform duration-[400ms] ease-out">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <AuditPopupAutoOpener />
    </div>
  );
}
