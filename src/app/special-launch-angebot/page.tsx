import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ReferenceCounter } from "@/components/ui/ReferenceCounter";
import { BonusStack } from "@/components/ui/BonusStack";
import { GuaranteeSeal } from "@/components/ui/GuaranteeSeal";

const REFERENCE_AVAILABLE = 5;
const REFERENCE_TOTAL = 5;
const REFERENCE_DEADLINE = "Q2/2026 · läuft bis 30. Juni 2026";

const BOOKING_LINK =
  "https://tidycal.com/sabala-mentoring/premium-onepager-paket-passen-wir-zusammen";

export default function PresentationPage() {
  return (
    <div className="flex flex-col w-full overflow-x-clip bg-warm-canvas min-h-screen font-satoshi text-deep-charcoal">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); text-shadow: 0 10px 20px rgba(201,168,76,0.1); }
          50% { transform: translateY(-10px); text-shadow: 0 25px 30px rgba(201,168,76,0.25); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
      `}</style>

      {/* SECTION 1: HERO — Editorial Magazine Style */}
      <section className="relative min-h-[100vh] flex items-center justify-center pt-28 pb-20 px-6 sm:px-12 md:px-20 lg:px-24 overflow-hidden bg-warm-canvas">
        {/* Sketchbook background lines */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute top-[20%] left-[-5%] w-[60%] opacity-[0.07]"
            viewBox="0 0 800 400"
            fill="none"
            stroke="currentColor"
          >
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1={i * 80}
                y1="0"
                x2={(i * 80) - 100}
                y2="400"
                strokeWidth="0.5"
                className="text-refined-gold"
              />
            ))}
          </svg>
        </div>

        {/* Soft warm glow */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-gold-glow rounded-full opacity-25 blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center relative z-10">
          {/* Left: Editorial Text */}
          <div className="order-2 lg:order-1 flex flex-col items-start">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-8 lg:mb-10">
                <div className="h-[1px] w-12 bg-refined-gold"></div>
                <span className="text-refined-gold font-mono text-[0.7rem] md:text-xs tracking-[0.25em] uppercase font-bold">
                  Reference-Edition · Q2/2026
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="font-instrument text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.05] tracking-[-0.02em] mb-8 lg:mb-10 text-deep-charcoal">
                Premium-Auftritt{" "}
                <br className="hidden lg:block" />
                für Menschen, die <br className="hidden lg:block" />
                wirklich etwas{" "}
                <span className="italic text-refined-gold inline-block animate-float relative">
                  bewegen
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-3 text-refined-gold/40"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M2 8 Q 50 2, 100 6 T 198 4"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="text-deep-charcoal">.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-warm-steel text-lg md:text-xl lg:text-2xl leading-[1.55] max-w-xl mb-10 lg:mb-12 font-instrument italic">
                Du brennst für dein Thema. <br />
                Ich kümmere mich um alles andere.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-warm-steel text-base md:text-lg leading-relaxed max-w-lg mb-10 font-satoshi">
                Positionierung · Außenauftritt · Pflege · Wachstum. Eine OnePager, die zeigt, wer du wirklich bist — gebaut für Menschen, deren Erfolg auch der Welt dient.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <Link
                  href={BOOKING_LINK}
                  target="_blank"
                  className="group inline-flex items-center justify-center px-7 py-4 text-sm md:text-base font-bold uppercase tracking-[0.15em] rounded-full text-white bg-deep-charcoal hover:bg-black transition-all shadow-[0_15px_30px_rgba(46,43,38,0.15)] hover:shadow-[0_20px_40px_rgba(46,43,38,0.25)] hover:-translate-y-0.5"
                >
                  Klärungsgespräch buchen
                  <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <div className="inline-flex items-center gap-3">
                  <ReferenceCounter
                    available={REFERENCE_AVAILABLE}
                    total={REFERENCE_TOTAL}
                    expiresAt={REFERENCE_DEADLINE}
                    size="small"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Cinematic MacBook-Working Portrait */}
          <div className="order-1 lg:order-2 relative w-full h-[55vh] lg:h-[80vh] min-h-[450px] flex items-center justify-center">
            <ScrollReveal
              delay={0.15}
              className="relative w-full h-full"
            >
              {/* Subtle topo accent in background corner */}
              <svg
                className="absolute -top-4 -right-4 lg:-top-8 lg:-right-8 w-32 h-32 lg:w-40 lg:h-40 opacity-40 z-20 pointer-events-none"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
              >
                {[40, 32, 24, 16, 8].map((r, i) => (
                  <circle
                    key={i}
                    cx="50"
                    cy="50"
                    r={r}
                    strokeWidth="0.4"
                    className="text-refined-gold"
                    opacity={0.3 + i * 0.12}
                  />
                ))}
              </svg>

              {/* Photo Frame with cinematic treatment */}
              <div className="relative w-full h-full overflow-hidden rounded-[32px] lg:rounded-[48px] shadow-[0_40px_100px_rgba(46,43,38,0.2)] group">
                <Image
                  src="/Bilder Sabala/8 - 37_CH_Sehnde_.jpg"
                  alt="Ilja Sabala Krasevskij beim Arbeiten"
                  fill
                  className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  priority
                />
                {/* Warm gold gradient overlay for cinematic feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/60 via-deep-charcoal/10 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-refined-gold/10 via-transparent to-transparent mix-blend-overlay pointer-events-none"></div>

                {/* Gold corner accent line */}
                <div className="absolute top-6 left-6 w-12 h-[1px] bg-refined-gold/60"></div>
                <div className="absolute top-6 left-6 w-[1px] h-12 bg-refined-gold/60"></div>
              </div>

              {/* Name plate */}
              <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 text-center bg-pure-surface/95 backdrop-blur-xl px-6 md:px-10 py-3 md:py-4 rounded-full border border-refined-gold/30 shadow-[0_20px_40px_rgba(46,43,38,0.12)] z-30 max-w-[92%]">
                <p className="font-instrument text-lg md:text-xl lg:text-2xl text-deep-charcoal mb-0.5 leading-none">
                  Ilja Sabala Krasevskij
                </p>
                <p className="text-warm-steel font-mono uppercase tracking-[0.2em] text-[0.6rem] md:text-[0.7rem]">
                  Der meditierende Business-Architekt
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Subtle scroll indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center animate-glow-pulse pointer-events-none z-20">
          <p className="text-warm-steel text-[10px] md:text-xs uppercase tracking-[0.25em] font-mono">
            Entdecken
          </p>
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-refined-gold mt-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </section>

      {/* SECTION 2: PROBLEM AWARENESS */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 md:px-24 relative bg-night-foundation text-night-text border-y border-white/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          <ScrollReveal
            delay={0.1}
            className="order-2 lg:order-1 flex flex-col items-center justify-center"
          >
            <div className="relative w-full max-w-[550px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl mb-8">
              <Image
                src="/Bilder Sabala/10 - _MXS8210.jpg"
                alt="Sabala Focus"
                fill
                className="object-cover object-top scale-105 hover:scale-100 transition-transform duration-[2000ms]"
              />
            </div>
            <div className="w-full max-w-[550px] bg-white backdrop-blur-md border border-whisper-border p-8 md:p-10 rounded-3xl shadow-xl relative mt-4">
              <div className="absolute -top-6 -left-2 md:-left-4 text-refined-gold/30 text-7xl md:text-8xl font-instrument leading-none">
                &ldquo;
              </div>
              <p className="font-instrument text-xl md:text-2xl leading-[1.4] text-deep-charcoal relative z-10 mt-2">
                Wenn dein Außenauftritt nicht widerspiegelt, was du innerlich zu geben hast, verlierst du genau die Kunden, denen du am besten helfen könntest.
              </p>
            </div>
          </ScrollReveal>

          <div className="order-1 lg:order-2">
            <ScrollReveal>
              <h2 className="font-instrument text-[clamp(3rem,5.5vw,5rem)] leading-[1.05] mb-8">
                Du brennst für dein Thema.
                <br />
                <span className="text-night-secondary">
                  Aber dein Auftritt sagt es niemandem.
                </span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-night-secondary text-xl md:text-2xl leading-relaxed mb-10">
                Du arbeitest mit Menschen. Du bringst Transformation hervor. Aber deine Website sieht aus wie tausend andere — und niemand erkennt deinen Wert beim ersten Blick.
              </p>
            </ScrollReveal>
            <ul className="space-y-4 md:space-y-6 mt-8">
              <ScrollReveal
                delay={0.2}
                className="flex items-start gap-4 md:gap-6 p-5 md:p-6 border border-night-secondary/20 rounded-2xl bg-deep-charcoal/50"
              >
                <span className="text-night-gold text-2xl md:text-3xl shrink-0">
                  ✕
                </span>
                <span className="text-white text-lg md:text-xl font-light leading-relaxed">
                  Du verschenkst dich beim Preis, weil dein Auftritt nicht Premium aussieht.
                </span>
              </ScrollReveal>
              <ScrollReveal
                delay={0.3}
                className="flex items-start gap-4 md:gap-6 p-5 md:p-6 border border-night-secondary/20 rounded-2xl bg-deep-charcoal/50"
              >
                <span className="text-night-gold text-2xl md:text-3xl shrink-0">
                  ✕
                </span>
                <span className="text-white text-lg md:text-xl font-light leading-relaxed">
                  Du hast schon investiert — Coach, Designer, Agentur. Und es fühlt sich trotzdem nicht stimmig an.
                </span>
              </ScrollReveal>
              <ScrollReveal
                delay={0.4}
                className="flex items-start gap-4 md:gap-6 p-5 md:p-6 border border-night-secondary/20 rounded-2xl bg-deep-charcoal/50"
              >
                <span className="text-night-gold text-2xl md:text-3xl shrink-0">
                  ✕
                </span>
                <span className="text-white text-lg md:text-xl font-light leading-relaxed">
                  Du willst dich nicht mit Tech, Hosting, KI-Tools beschäftigen — du willst arbeiten, was du liebst.
                </span>
              </ScrollReveal>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3: LÖSUNG — Klarheitsfokus */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 md:px-24 bg-warm-canvas border-b border-whisper-border">
        <div className="max-w-[1400px] mx-auto text-center">
          <ScrollReveal>
            <p className="text-refined-gold tracking-[0.2em] font-medium text-sm md:text-lg mb-4 md:mb-6 uppercase">
              Was Sabala anders macht
            </p>
            <h2 className="font-instrument text-[clamp(3rem,5.5vw,5rem)] leading-[1.05] mb-16 md:mb-24">
              Warum der{" "}
              <span className="italic text-refined-gold">Klarheitsfokus</span>{" "}
              alles verändert.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 text-left">
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <ScrollReveal
                delay={0.1}
                className="bg-pure-surface border border-whisper-border p-8 md:p-10 rounded-3xl flex flex-col justify-center"
              >
                <div className="text-refined-gold font-instrument text-5xl md:text-6xl mb-6">
                  1.
                </div>
                <h3 className="font-instrument text-3xl md:text-4xl mb-4">
                  Eine Zielgruppe
                </h3>
                <p className="text-warm-steel text-lg md:text-xl leading-relaxed">
                  Klar gefilterte Menschen mit Werten — die, die wirklich etwas bewegen, nicht &ldquo;jeder, der zahlen kann&rdquo;.
                </p>
              </ScrollReveal>
              <ScrollReveal
                delay={0.2}
                className="bg-pure-surface border-2 border-refined-gold p-8 md:p-10 rounded-3xl flex flex-col justify-center shadow-lg relative overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-refined-gold/5"></div>
                <div className="text-refined-gold font-instrument text-5xl md:text-6xl mb-6 relative z-10">
                  2.
                </div>
                <h3 className="font-instrument text-3xl md:text-4xl mb-4 relative z-10">
                  Ein Angebot
                </h3>
                <p className="text-deep-charcoal text-lg md:text-xl relative z-10 font-medium leading-relaxed">
                  Wir rücken dein stärkstes Kernangebot in den Fokus. Das eliminiert Stress und kreiert Sog.
                </p>
              </ScrollReveal>
              <ScrollReveal
                delay={0.3}
                className="bg-pure-surface border border-whisper-border p-8 md:p-10 rounded-3xl flex flex-col justify-center sm:col-span-2"
              >
                <div className="text-refined-gold font-instrument text-5xl md:text-6xl mb-6">
                  3.
                </div>
                <h3 className="font-instrument text-3xl md:text-4xl mb-4">
                  Ein Vertriebsweg
                </h3>
                <p className="text-warm-steel text-lg md:text-xl md:w-3/4 leading-relaxed">
                  Eine Premium-OnePager, die ohne Manipulation überzeugt. Die richtigen Menschen finden dich aus Resonanz.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal
              delay={0.4}
              className="lg:col-span-4 relative rounded-3xl overflow-hidden border border-whisper-border shadow-2xl h-[400px] md:h-auto min-h-[400px] group bg-warm-canvas flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.18)_0%,transparent_65%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.10)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <Image
                src="/images/sabala-kristall.png"
                alt="Diamantklare Fokussierung"
                fill
                className="object-contain p-8 md:p-16 scale-95 group-hover:scale-100 transition-transform duration-[2000ms] filter drop-shadow-[0_20px_40px_rgba(201,168,76,0.25)] animate-float"
              />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.5} className="mt-16 md:mt-24 flex justify-center w-full">
            <Link
              href={BOOKING_LINK}
              target="_blank"
              className="inline-flex items-center justify-center px-8 py-4 text-sm md:text-base font-bold uppercase tracking-widest rounded-full text-white bg-deep-charcoal border border-transparent hover:border-whisper-border transition-all shadow-lg hover:-translate-y-1"
            >
              Klärungsgespräch buchen →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 4 (NEU): DIFFERENTIAL — Warum Sabala anders ist */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 md:px-24 bg-pure-surface border-b border-whisper-border relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-refined-gold/30 to-transparent" />

        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <p className="text-refined-gold tracking-[0.2em] font-medium text-xs md:text-sm uppercase mb-6 text-center">
              Das Differential
            </p>
            <h2 className="font-instrument text-[clamp(3rem,5.5vw,5rem)] leading-[1.05] mb-6 text-center">
              Warum Sabala{" "}
              <span className="italic text-refined-gold">anders</span> ist.
            </h2>
            <p className="font-instrument italic text-warm-steel text-lg md:text-xl text-center mb-20 max-w-2xl mx-auto">
              Die Mischung, die&apos;s so kaum gibt.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Karte 1 — Begleiter */}
            <ScrollReveal
              delay={0.1}
              className="group bg-warm-canvas border border-whisper-border p-8 md:p-10 rounded-3xl flex flex-col hover:border-refined-gold/50 hover:shadow-[0_30px_60px_rgba(184,150,62,0.08)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden mb-6 bg-warm-light">
                <Image
                  src="/images/onepager/differential-begleiter.jpg"
                  alt="Begleiter, kein Dienstleister"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <p className="text-refined-gold font-mono text-xs uppercase tracking-widest mb-3">
                01 · Begleitung
              </p>
              <h3 className="font-instrument text-2xl md:text-3xl mb-4 text-deep-charcoal">
                Begleiter, kein Dienstleister
              </h3>
              <p className="font-satoshi text-warm-steel text-base md:text-lg leading-relaxed">
                Ich bin Meditationslehrer und Coach — bevor ich Designer wurde. Du wirst nicht abgeliefert, du wirst begleitet.
              </p>
            </ScrollReveal>

            {/* Karte 2 — KI mit Werten */}
            <ScrollReveal
              delay={0.25}
              className="group bg-warm-canvas border border-refined-gold/30 p-8 md:p-10 rounded-3xl flex flex-col hover:border-refined-gold/60 hover:shadow-[0_30px_60px_rgba(184,150,62,0.10)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-refined-gold/10 blur-3xl rounded-full" />
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-deep-charcoal to-[#1a1815] flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.15)_0%,transparent_60%)]"></div>
                <Image
                  src="/images/onepager/mooni-front.png"
                  alt="Mooni — KI mit Werten"
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-1000 relative z-10"
                />
              </div>
              <p className="text-refined-gold font-mono text-xs uppercase tracking-widest mb-3 relative z-10">
                02 · Werte-Tech
              </p>
              <h3 className="font-instrument text-2xl md:text-3xl mb-4 text-deep-charcoal relative z-10">
                KI mit Werten
              </h3>
              <p className="font-satoshi text-warm-steel text-base md:text-lg leading-relaxed relative z-10">
                Modernste Technologie, liebevoll eingesetzt. Keine Manipulations-Funnels. Keine Massen-Templates. Tech, die deinen Werten dient.
              </p>
            </ScrollReveal>

            {/* Karte 3 — Aus einem Guss */}
            <ScrollReveal
              delay={0.4}
              className="group bg-warm-canvas border border-whisper-border p-8 md:p-10 rounded-3xl flex flex-col hover:border-refined-gold/50 hover:shadow-[0_30px_60px_rgba(184,150,62,0.08)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden mb-6 bg-warm-light flex items-center justify-center">
                {/* Topo-Ringe SVG (geometrisch, ohne KIE-Bild) */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-3/4 h-3/4"
                  fill="none"
                  stroke="currentColor"
                >
                  {[60, 50, 40, 30, 20].map((r, i) => (
                    <circle
                      key={i}
                      cx="100"
                      cy="100"
                      r={r}
                      strokeWidth="0.5"
                      className="text-refined-gold"
                      strokeDasharray={i % 2 === 0 ? "0" : "4 2"}
                      opacity={0.3 + i * 0.12}
                    />
                  ))}
                  <circle
                    cx="100"
                    cy="100"
                    r="6"
                    fill="currentColor"
                    className="text-refined-gold"
                  />
                </svg>
              </div>
              <p className="text-refined-gold font-mono text-xs uppercase tracking-widest mb-3">
                03 · Einheit
              </p>
              <h3 className="font-instrument text-2xl md:text-3xl mb-4 text-deep-charcoal">
                Aus einem Guss
              </h3>
              <p className="font-satoshi text-warm-steel text-base md:text-lg leading-relaxed">
                Strategie · Brand · Website · Pflege — alles bei einem Menschen. Kein Stückwerk, kein Übergabe-Chaos.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 5: LIEFERUMFANG */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 md:px-24 bg-night-foundation text-night-text border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 md:mb-20 text-center lg:text-left">
            <ScrollReveal>
              <p className="text-night-gold tracking-widest uppercase text-sm md:text-lg mb-4 md:mb-6">
                Der Lieferumfang
              </p>
              <h2 className="font-instrument text-[clamp(3rem,5.5vw,5rem)] leading-tight text-white mb-6">
                Das Premium OnePager-Paket.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-night-secondary text-xl md:text-2xl border-none lg:border-l-[3px] border-night-gold lg:pl-6 lg:mt-6 max-w-3xl leading-relaxed mx-auto lg:mx-0 text-center lg:text-left">
                Kein Template. Kein Baukasten. Keine Manipulation. Deine 100% individuelle Premium-Identität — gebaut für Menschen, die wirklich etwas bewegen.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            <ScrollReveal
              delay={0.2}
              className="lg:col-span-4 relative rounded-3xl overflow-hidden border border-night-gold/20 h-[50vh] min-h-[400px] lg:h-auto group flex items-center justify-center"
            >
              <Image
                src="/Bilder Sabala/5 - _MXS8196.jpg"
                alt="Sabala Mentor"
                fill
                className="object-cover object-top group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 border-[3px] border-night-gold/20 rounded-3xl pointer-events-none"></div>
            </ScrollReveal>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 auto-rows-fr">
              <ScrollReveal
                delay={0.3}
                className="p-8 md:p-10 border border-night-secondary/20 rounded-[32px] bg-deep-charcoal flex flex-col justify-between h-full"
              >
                <div>
                  <div className="mb-4 md:mb-6">
                    <span className="font-instrument text-4xl md:text-5xl text-night-gold">
                      01 .{" "}
                    </span>
                    <span className="font-instrument text-3xl md:text-4xl text-white">
                      Brand Identity Sessions
                    </span>
                  </div>
                  <p className="text-night-secondary text-lg md:text-xl leading-relaxed">
                    2× 90 Min: Personal-Brand-Interview + Strategie-Call. Wir kristallisieren deine wahre Botschaft.
                  </p>
                </div>
                <p className="font-mono text-night-gold text-xs uppercase tracking-widest mt-6 pt-4 border-t border-night-gold/15">
                  Wert · 900 €
                </p>
              </ScrollReveal>

              <ScrollReveal
                delay={0.4}
                className="p-8 md:p-10 border border-night-secondary/20 rounded-[32px] bg-deep-charcoal flex flex-col justify-between h-full"
              >
                <div>
                  <div className="mb-4 md:mb-6">
                    <span className="font-instrument text-4xl md:text-5xl text-night-gold">
                      02 .{" "}
                    </span>
                    <span className="font-instrument text-3xl md:text-4xl text-white">
                      Brand Mini-Guide
                    </span>
                  </div>
                  <p className="text-night-secondary text-lg md:text-xl leading-relaxed">
                    Typografie, Farben, Tonalität, Bildsprache — auf Google Fonts. Kostenlos, ohne Lizenz, ohne Abmahnungs-Risiko.
                  </p>
                </div>
                <p className="font-mono text-night-gold text-xs uppercase tracking-widest mt-6 pt-4 border-t border-night-gold/15">
                  Wert · 600 €
                </p>
              </ScrollReveal>

              <ScrollReveal
                delay={0.5}
                className="p-8 md:p-10 border border-night-gold/30 rounded-[32px] bg-[#22221f] flex flex-col justify-between shadow-[0_0_30px_rgba(201,168,76,0.05)] h-full"
              >
                <div>
                  <div className="mb-4 md:mb-6">
                    <span className="font-instrument text-4xl md:text-5xl text-night-gold">
                      03 .{" "}
                    </span>
                    <span className="font-instrument text-3xl md:text-4xl text-white">
                      Premium-OnePager
                    </span>
                  </div>
                  <p className="text-night-secondary text-lg md:text-xl leading-relaxed">
                    Mit Wow-Effekt + persönlichen Elementen aus deiner Brand Identity. Hosting via Vercel · deutsche Edge-Region · DSGVO · cookie-frei.
                  </p>
                </div>
                <p className="font-mono text-night-gold text-xs uppercase tracking-widest mt-6 pt-4 border-t border-night-gold/15">
                  Wert · 3.000 €
                </p>
              </ScrollReveal>

              <ScrollReveal
                delay={0.6}
                className="p-8 md:p-10 border-2 border-night-gold rounded-[32px] bg-night-gold/5 flex flex-col justify-between relative shadow-[0_0_30px_rgba(201,168,76,0.1)] h-full"
              >
                <div className="absolute top-0 right-0 bg-night-gold text-black text-xs md:text-sm font-bold px-4 py-1.5 md:px-6 rounded-bl-3xl rounded-tr-[30px] uppercase tracking-wider">
                  Inklusive
                </div>
                <div>
                  <div className="mb-4 md:mb-6 mt-2">
                    <span className="font-instrument text-4xl md:text-5xl text-night-gold">
                      04 .{" "}
                    </span>
                    <span className="font-instrument text-3xl md:text-4xl text-white">
                      Pflege + Monatsbericht
                    </span>
                  </div>
                  <p className="text-white text-lg md:text-xl leading-relaxed">
                    12 Monate Pflege auf Plus-Niveau: Anpassungen, Updates, Sicherheit + monatlicher Analyse-Bericht.
                  </p>
                </div>
                <p className="font-mono text-night-gold text-xs uppercase tracking-widest mt-6 pt-4 border-t border-night-gold/30">
                  Wert · 828 €
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: PROZESS */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 md:px-24 bg-pure-surface border-b border-whisper-border">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(3rem,5.5vw,5rem)] leading-[1.05] mb-20 text-center">
              Der Weg zur neuen Website.
              <br />{" "}
              <span className="italic text-refined-gold">
                Einfach, strukturiert &amp; zügig.
              </span>
            </h2>
          </ScrollReveal>

          <div className="relative mt-12 md:mt-24">
            <div className="hidden lg:block absolute top-[2px] left-[10%] w-[80%] h-[2px] bg-black/[0.05]"></div>
            <div className="hidden lg:block absolute top-[2px] left-[10%] w-[40%] h-[2px] bg-refined-gold"></div>

            <div className="lg:hidden absolute top-0 bottom-0 left-6 sm:left-8 w-1 bg-whisper-border"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              <ScrollReveal delay={0.1} className="relative pl-16 lg:pl-0">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-refined-gold text-white flex items-center justify-center font-instrument text-2xl lg:text-4xl absolute left-0 lg:left-1/2 top-4 lg:-top-[30px] lg:-translate-x-1/2 outline outline-8 outline-pure-surface shadow-lg z-10">
                  1
                </div>
                <div className="bg-white border border-whisper-border p-8 lg:p-12 rounded-3xl lg:rounded-[40px] lg:mt-[80px] text-left lg:text-center shadow-lg hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="font-instrument text-2xl lg:text-4xl mb-3 md:mb-4">
                    Klärungsgespräch
                  </h3>
                  <p className="text-warm-steel text-sm lg:text-lg mb-4 md:mb-6">
                    30 Min · beidseitig
                  </p>
                  <p className="leading-relaxed text-sm md:text-base">
                    Du erzählst, ich höre. Wir prüfen, ob wir zueinander passen — von BEIDEN Seiten. Wenn ja, geht&apos;s los. Wenn nicht, kostet dich das nichts und uns auch.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2} className="relative pl-16 lg:pl-0">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-refined-gold text-white flex items-center justify-center font-instrument text-2xl lg:text-4xl absolute left-0 lg:left-1/2 top-4 lg:-top-[30px] lg:-translate-x-1/2 outline outline-8 outline-pure-surface shadow-lg z-10">
                  2
                </div>
                <div className="bg-white border border-refined-gold/50 p-8 lg:p-12 rounded-3xl lg:rounded-[40px] lg:mt-[80px] text-left lg:text-center shadow-[0_20px_40px_rgba(184,150,62,0.1)] hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="font-instrument text-2xl lg:text-4xl mb-3 md:mb-4">
                    Brand Identity Sessions
                  </h3>
                  <p className="text-warm-steel text-sm lg:text-lg mb-4 md:mb-6">
                    2× 90 Min + Checkliste
                  </p>
                  <p className="leading-relaxed text-sm md:text-base">
                    Personal-Brand-Interview + Strategie. Du bringst Bilder, Texte, Stimmung — und eine eigene Domain (z.B. via Server-Profis · ich helfe bei der Auswahl).
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3} className="relative pl-16 lg:pl-0">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-pure-surface border-2 border-refined-gold text-refined-gold flex items-center justify-center font-instrument text-2xl lg:text-4xl absolute left-0 lg:left-1/2 top-4 lg:-top-[30px] lg:-translate-x-1/2 outline outline-8 outline-pure-surface z-10">
                  3
                </div>
                <div className="bg-deep-charcoal border-none text-white p-8 lg:p-12 rounded-3xl lg:rounded-[40px] lg:mt-[80px] text-left lg:text-center shadow-xl hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="font-instrument text-2xl lg:text-4xl mb-3 md:mb-4 text-white">
                    Kick-Off & 14 Tage zur Live-Page
                  </h3>
                  <p className="text-night-secondary text-sm lg:text-lg mb-4 md:mb-6">
                    Mit Garantie
                  </p>
                  <p className="leading-relaxed text-sm md:text-base text-white/90">
                    Nach Kick-Off: <strong className="text-night-gold font-normal">14 Tage</strong> Umsetzung ab vollständigen Daten. Wenn nicht steht oder du dich nicht zu 100% wiedererkennst — wir bauen weiter, ohne Aufpreis.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal delay={0.4} className="mt-16 md:mt-24 flex justify-center w-full relative z-20">
            <Link
              href={BOOKING_LINK}
              target="_blank"
              className="inline-flex items-center justify-center px-8 md:px-10 py-4 text-sm md:text-base font-bold uppercase tracking-widest rounded-full text-white bg-deep-charcoal border border-transparent hover:bg-black transition-all shadow-lg hover:-translate-y-1"
            >
              Klärungsgespräch buchen →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 7: VORAUSSETZUNGEN — Werte-Filter */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 md:px-24 relative bg-night-foundation text-night-text border-y border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-night-gold/5 rounded-bl-full blur-3xl pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(3rem,5.5vw,5rem)] leading-[1.05] mb-16 text-center text-white">
              Für wen ist die{" "}
              <span className="italic text-night-gold">Reference-Edition?</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            <ScrollReveal
              delay={0.1}
              className="bg-[#2E2B26] border border-red-900/30 p-8 md:p-12 rounded-3xl md:rounded-[40px] flex flex-col h-full"
            >
              <h3 className="font-instrument text-3xl md:text-4xl mb-8 text-night-secondary/60">
                Nicht geeignet für dich...
              </h3>
              <ul className="space-y-6 md:space-y-8 flex-grow">
                <li className="flex gap-4 md:gap-6 items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-900/20 text-red-500 flex items-center justify-center shrink-0 font-bold">
                    ✕
                  </div>
                  <p className="text-lg md:text-xl text-night-secondary leading-relaxed pt-1">
                    Wenn du dein Thema noch suchst — diese Page ist für Menschen, die brennen. Wenn du noch suchst, hilft dir Mentoring zuerst, nicht eine Website.
                  </p>
                </li>
                <li className="flex gap-4 md:gap-6 items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-900/20 text-red-500 flex items-center justify-center shrink-0 font-bold">
                    ✕
                  </div>
                  <p className="text-lg md:text-xl text-night-secondary leading-relaxed pt-1">
                    Wenn &ldquo;Conversion um jeden Preis&rdquo; dein Ziel ist — wir bauen mit Werten, nicht mit Manipulation. Wer manipulieren will, ist hier falsch.
                  </p>
                </li>
                <li className="flex gap-4 md:gap-6 items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-900/20 text-red-500 flex items-center justify-center shrink-0 font-bold">
                    ✕
                  </div>
                  <p className="text-lg md:text-xl text-night-secondary leading-relaxed pt-1">
                    Wenn dein Erfolg nur deinem Ego dienen soll — wir arbeiten mit Menschen, deren Erfolg auch der Welt dient.
                  </p>
                </li>
              </ul>
            </ScrollReveal>

            <ScrollReveal
              delay={0.2}
              className="bg-deep-charcoal border-2 border-night-gold/50 p-8 md:p-12 rounded-3xl md:rounded-[40px] flex flex-col shadow-[0_0_60px_rgba(201,168,76,0.1)] relative h-full"
            >
              <div className="absolute -top-4 md:-top-5 right-6 md:right-10 bg-night-gold text-black uppercase tracking-widest text-xs md:text-sm font-bold px-4 py-1.5 md:px-6 md:py-2 rounded-full shadow-lg">
                Der perfekte Match
              </div>
              <h3 className="font-instrument text-3xl md:text-4xl mb-8 text-white mt-4 md:mt-0">
                Dieses Paket ist für dich, wenn...
              </h3>
              <ul className="space-y-6 md:space-y-8 flex-grow">
                <li className="flex gap-4 md:gap-6 items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-night-gold/20 text-night-gold flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </div>
                  <p className="text-lg md:text-xl text-white leading-relaxed pt-1">
                    Du <strong className="text-night-gold font-normal">brennst für dein Thema</strong> — und willst, dass deine Außenwirkung das endlich auch zeigt.
                  </p>
                </li>
                <li className="flex gap-4 md:gap-6 items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-night-gold/20 text-night-gold flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </div>
                  <p className="text-lg md:text-xl text-white leading-relaxed pt-1">
                    Du suchst <strong className="text-night-gold font-normal">einen Begleiter</strong>, keinen Dienstleister — jemanden, der dich versteht, nicht abliefert.
                  </p>
                </li>
                <li className="flex gap-4 md:gap-6 items-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-night-gold/20 text-night-gold flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </div>
                  <p className="text-lg md:text-xl text-white leading-relaxed pt-1">
                    Du bist <strong className="text-night-gold font-normal">tech-müde</strong> — willst Premium-Auftritt, aber hast keine Lust auf Hosting, Updates, Tools, KI.
                  </p>
                </li>
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 8: ZUKUNFTSVISION */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 md:px-24 bg-pure-surface overflow-hidden border-b border-whisper-border relative">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-warm-canvas to-transparent opacity-50 pointer-events-none"></div>
        <div className="absolute -bottom-[20vh] -right-[20vh] w-[80vh] h-[80vh] bg-gold-glow rounded-full blur-[120px] opacity-20 mix-blend-multiply pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <ScrollReveal>
              <p className="text-refined-gold tracking-[0.2em] font-bold text-xs md:text-sm mb-6 uppercase inline-block border border-refined-gold/20 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-refined-gold/5">
                Die Vision
              </p>
              <h2 className="font-instrument text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] mb-8">
                Endlich ein Auftritt, <br />
                der zeigt, wer du{" "}
                <span className="italic text-refined-gold">wirklich</span> bist.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-warm-steel text-xl md:text-2xl leading-[1.65] mb-10 md:mb-12">
                Stell dir vor: Du verschickst deinen Website-Link mit Stolz. Jedes Wort ist du. Jede Farbe ist du. Premium-Kunden buchen dich, weil dein Außenauftritt endlich das Niveau deiner Arbeit hat.
              </p>
            </ScrollReveal>

            <div className="flex flex-col gap-6">
              <ScrollReveal
                delay={0.2}
                className="p-2 border border-whisper-border bg-black/[0.02] rounded-3xl group"
              >
                <div className="bg-white p-6 md:p-8 rounded-[calc(1.5rem-0.5rem)] flex items-start gap-4 md:gap-6 border border-transparent group-hover:shadow-[0_20px_40px_rgba(184,150,62,0.05)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-refined-gold/30 bg-refined-gold/5 flex items-center justify-center text-refined-gold shrink-0 group-hover:bg-refined-gold group-hover:text-white transition-all duration-500">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m12 3 7 7-7 7M5 10h14" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-instrument text-2xl md:text-3xl mb-2 md:mb-3 text-deep-charcoal">
                      Premium-Kunden ohne Manipulation
                    </h4>
                    <p className="font-satoshi text-base md:text-lg text-warm-steel leading-relaxed">
                      Wer zu dir kommt, kommt aus Resonanz. Du musst niemanden überreden — die richtigen Menschen finden dich.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal
                delay={0.3}
                className="p-2 border border-whisper-border bg-black/[0.02] rounded-3xl group"
              >
                <div className="bg-white p-6 md:p-8 rounded-[calc(1.5rem-0.5rem)] flex items-start gap-4 md:gap-6 border border-transparent group-hover:shadow-[0_20px_40px_rgba(184,150,62,0.05)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-refined-gold/30 bg-refined-gold/5 flex items-center justify-center text-refined-gold shrink-0 group-hover:bg-refined-gold group-hover:text-white transition-all duration-500">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-instrument text-2xl md:text-3xl mb-2 md:mb-3 text-deep-charcoal">
                      Mehr Ressourcen für was zählt
                    </h4>
                    <p className="font-satoshi text-base md:text-lg text-warm-steel leading-relaxed">
                      Mehr Zeit für deine Arbeit. Mehr Geld für deine Vision. Mehr Energie, um das Gute in der Welt zu vergrößern.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal
            delay={0.2}
            className="order-1 lg:order-2 relative h-[50vh] md:h-[600px] lg:h-[750px] w-full p-3 md:p-4 rounded-[2rem] md:rounded-[3rem] bg-black/[0.02] border border-whisper-border shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-[800ms] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,1)] m-3 md:m-4 rounded-[calc(2rem-0.75rem)] md:rounded-[calc(3rem-1rem)] overflow-hidden group">
              <Image
                src="/Bilder Sabala/36 - 373_CH_Sehnde_.jpg"
                alt="Sabala Clarifying Vision"
                fill
                className="object-cover object-center opacity-90 scale-105 group-hover:scale-100 transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] filter grayscale-[20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/80 via-deep-charcoal/20 to-transparent"></div>

              <div className="absolute bottom-8 left-6 right-6 md:bottom-12 md:left-12 md:right-12 z-10 flex flex-col items-center">
                <div className="backdrop-blur-2xl bg-white/10 border border-white/20 p-6 md:p-8 rounded-3xl shadow-xl w-full text-center">
                  <p className="font-instrument text-3xl md:text-4xl text-white mb-2 leading-none">
                    Dein neues Niveau.
                  </p>
                  <p className="text-white/70 font-satoshi text-xs md:text-sm uppercase tracking-[0.2em] font-medium mt-3">
                    So fühlt sich Premium an
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 9 (NEU): REFERENCE-EDITION — Knappheit · Garantie · Tausch */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 md:px-24 bg-warm-canvas border-b border-whisper-border relative overflow-hidden">
        {/* Topo-Pattern Background */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <Image
            src="/images/onepager/reference-topo.jpg"
            alt=""
            fill
            className="object-cover mix-blend-multiply"
          />
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <ScrollReveal>
            <p className="text-refined-gold tracking-[0.2em] font-medium text-xs md:text-sm uppercase mb-6 text-center">
              Die Reference-Edition · Q2/2026
            </p>
            <h2 className="font-instrument text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] mb-20 text-center">
              Nur 5 Plätze. Reduzierter Preis.
              <br />
              <span className="italic text-refined-gold">
                Im Tausch: Deine echte Geschichte.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mb-20 md:mb-24">
            <ReferenceCounter
              available={REFERENCE_AVAILABLE}
              total={REFERENCE_TOTAL}
              expiresAt={REFERENCE_DEADLINE}
              size="large"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-refined-gold tracking-[0.2em] font-medium text-xs md:text-sm uppercase mb-10 md:mb-14 text-center">
              Drei Garantien
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-20 md:mb-24">
            <GuaranteeSeal
              delay={0.1}
              iconType="time"
              title="14-Tage-Liefergarantie"
              body="Sobald alle Materialien da sind, steht die Seite in 14 Tagen — garantiert."
            />
            <GuaranteeSeal
              delay={0.3}
              iconType="satisfaction"
              title="100%-Zufriedenheit"
              body="Wir bauen weiter, bis du dich zu 100% wiedererkennst — ohne Aufpreis."
            />
            <GuaranteeSeal
              delay={0.5}
              iconType="choice"
              title="Beidseitige Wahl"
              body="30-Min-Klärungsgespräch vor Buchung. Passen wir nicht zueinander, kostet&apos;s dich nichts."
            />
          </div>

          <ScrollReveal delay={0.2}>
            <div className="bg-pure-surface border border-refined-gold/30 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto shadow-[0_30px_80px_rgba(184,150,62,0.08)]">
              <p className="text-refined-gold tracking-[0.2em] font-medium text-xs md:text-sm uppercase mb-6 text-center">
                Im Tausch geben die ersten 5 zurück
              </p>
              <ul className="space-y-5 md:space-y-6 mb-6">
                <li className="flex items-start gap-4">
                  <span className="text-refined-gold text-xl md:text-2xl mt-0.5 shrink-0">
                    →
                  </span>
                  <p className="font-satoshi text-deep-charcoal text-base md:text-lg leading-relaxed">
                    Detailliertes <strong className="text-refined-gold font-medium">Testimonial</strong> mit Foto und Name.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-refined-gold text-xl md:text-2xl mt-0.5 shrink-0">
                    →
                  </span>
                  <p className="font-satoshi text-deep-charcoal text-base md:text-lg leading-relaxed">
                    Vorher/Nachher <strong className="text-refined-gold font-medium">Case Study</strong> auf der Sabala-Referenzseite.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-refined-gold text-xl md:text-2xl mt-0.5 shrink-0">
                    →
                  </span>
                  <p className="font-satoshi text-deep-charcoal text-base md:text-lg leading-relaxed">
                    Eine warme <strong className="text-refined-gold font-medium">Empfehlung</strong> in deinem Netzwerk.
                  </p>
                </li>
              </ul>
              <p className="font-instrument italic text-warm-steel text-base md:text-lg text-center pt-4 border-t border-whisper-border">
                Wer etwas bewegt, kennt andere, die etwas bewegen.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 10: INVESTITION — Bonus-Stack + Reference-Preis */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 relative bg-[#FAFAF8] overflow-hidden">
        <div className="max-w-[800px] mx-auto flex flex-col items-center text-center relative z-10">
          <ScrollReveal>
            <p className="text-refined-gold tracking-[0.2em] font-bold text-xs uppercase mb-12">
              Investition
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="w-full">
            <BonusStack
              items={[
                {
                  label: "Brand Identity Sessions",
                  sublabel: "2× 90 Min · Personal-Brand-Interview + Strategie-Call",
                  value: 900,
                },
                {
                  label: "Brand Mini-Guide",
                  sublabel: "Typografie · Farben · Tonalität · Google Fonts (ohne Lizenz)",
                  value: 600,
                },
                {
                  label: "Premium-OnePager-Landingpage",
                  sublabel: "Wow-Effekt · Hosting via Vercel · DSGVO · cookie-frei",
                  value: 3000,
                },
                {
                  label: "3 Starter-Blog-Artikel",
                  sublabel: "Zielgruppen-Recherche · SEO + GEO · Fundament für Pinterest, YouTube, Social",
                  value: 600,
                },
                {
                  label: "Pflege + Monatsbericht (Plus-Niveau)",
                  sublabel: "12 Monate · Updates + Analyse-Bericht inklusive",
                  value: 828,
                },
                {
                  label: "Vorher/Nachher Case Study",
                  sublabel: "Bonus · Teil der Reference-Edition",
                  value: 0,
                  isBonus: true,
                },
              ]}
              totalValue={5928}
              referencePrice={2490}
              savingsPercent={58}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="mt-16 md:mt-20 w-full">
            <p className="font-satoshi text-warm-steel text-sm md:text-base mb-8 text-center max-w-md mx-auto leading-relaxed">
              Regulär 4.900 € + 49 €/Monat Pflege.
              <br />
              <span className="text-refined-gold font-medium">
                Heute Reference-Slot — 58% sparen.
              </span>
            </p>

            <div className="flex flex-col items-center w-full max-w-[400px] mx-auto">
              <div className="mb-8">
                <ReferenceCounter
                  available={REFERENCE_AVAILABLE}
                  total={REFERENCE_TOTAL}
                  expiresAt={REFERENCE_DEADLINE}
                  size="small"
                />
              </div>

              <Link
                href={BOOKING_LINK}
                target="_blank"
                className="w-full block py-5 px-8 bg-black hover:bg-deep-charcoal text-white text-xs md:text-sm font-bold uppercase tracking-[0.15em] transition-all rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 mb-4 text-center"
              >
                Hier Klärungsgespräch buchen →
              </Link>
              <p className="text-[11px] md:text-[13px] font-satoshi text-warm-steel/80">
                Reference-Edition endet bei 5 vergebenen Plätzen oder am 30. Juni 2026.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 11: FAQ */}
      <section className="py-32 md:py-40 lg:py-48 px-6 sm:px-12 md:px-24 bg-warm-canvas border-t border-whisper-border">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-instrument text-[clamp(2.5rem,5.5vw,4.5rem)] leading-tight mb-4 text-deep-charcoal">
                Häufig gestellte Fragen
              </h2>
              <p className="text-warm-steel text-lg">
                Alles was du über den technischen und organisatorischen Ablauf wissen musst.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal delay={0.1} className="bg-white border border-whisper-border p-8 rounded-3xl transition-shadow hover:shadow-lg">
              <h3 className="font-instrument text-2xl mb-3 text-deep-charcoal">
                Auf welcher Plattform baut ihr die Seite?
              </h3>
              <p className="text-warm-steel leading-relaxed">
                Hosting via <strong className="text-deep-charcoal">Vercel</strong> mit deutscher Edge-Region (Frankfurt). Modernste Performance-Plattform — kein WordPress, keine Plugin-Pflege. <strong className="text-deep-charcoal">DSGVO-konform · ohne Cookie-Banner-Pflicht</strong> · Analyse-Tools sind cookie-frei integriert. Du hast mit der Technik nichts zu tun — ich übernehme Hosting, Pflege, Updates und Sicherheit komplett.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15} className="bg-white border border-whisper-border p-8 rounded-3xl transition-shadow hover:shadow-lg">
              <h3 className="font-instrument text-2xl mb-3 text-deep-charcoal">
                Was brauche ich als Kunde?
              </h3>
              <p className="text-warm-steel leading-relaxed">
                Fast nichts. Alles, was du final benötigst, ist deine Einmal-Investition und eine eigene Domain. Wenn du noch keine Domain hast, helfe ich dir bei der Auswahl (z.B. via Server-Profis). Den gesamten Prozess — Brand Identity, Positionierung, Text und Design bis zum Launch — übernehme ich schlüsselfertig.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="bg-white border border-whisper-border p-8 rounded-3xl transition-shadow hover:shadow-lg">
              <h3 className="font-instrument text-2xl mb-3 text-deep-charcoal">
                Wie läuft die Pflege ab?
              </h3>
              <p className="text-warm-steel leading-relaxed">
                Komplett in meinen Händen. Mit der Reference-Edition sind 12 Monate Pflege auf Plus-Niveau inklusive: Anpassungen, Updates, Sicherheit + monatlicher Analyse-Bericht zu deiner Performance. Du musst dich um nichts kümmern.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25} className="bg-white border border-whisper-border p-8 rounded-3xl transition-shadow hover:shadow-lg">
              <h3 className="font-instrument text-2xl mb-3 text-deep-charcoal">
                Was passiert, wenn die 5 Reference-Plätze vergeben sind?
              </h3>
              <p className="text-warm-steel leading-relaxed">
                Dann läuft die Reference-Edition aus. Spätere Buchungen erhalten den regulären Preis von 4.900 € + 49 €/Monat Pflege. Die ersten 5 erhalten auch danach noch ihre 12 Monate Plus-Pflege bis zum Ablauf — und können dann zu jedem Service-Paket upgraden.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="bg-white border border-whisper-border p-8 rounded-3xl transition-shadow hover:shadow-lg">
              <h3 className="font-instrument text-2xl mb-3 text-deep-charcoal">
                Was, wenn ich nach dem Klärungsgespräch merke, das passt nicht?
              </h3>
              <p className="text-warm-steel leading-relaxed">
                Dann passt es nicht — von beiden Seiten. Das Klärungsgespräch ist genau dafür da. Es kostet dich nichts (außer 30 Min) und uns auch nicht. Lieber kein Projekt als ein falsches.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.35} className="bg-white border border-whisper-border p-8 rounded-3xl transition-shadow hover:shadow-lg">
              <h3 className="font-instrument text-2xl mb-3 text-deep-charcoal">
                Ich brauche keine ganze Marken-Arbeit, sondern nur eine schnelle Landingpage. Geht das?
              </h3>
              <p className="text-warm-steel leading-relaxed">
                Ja, dafür gibt es zwei Quick-Services: <strong className="text-deep-charcoal">Upgrade einer bestehenden Seite</strong> ab 1.500 € — wenn dir deine bestehende Seite nicht gefällt und sie ein hochwertiges Re-Design braucht. Und die <strong className="text-deep-charcoal">Premium Quick-Landingpage</strong> für 2.700 € — eine eigenständige, hochwertige Landingpage für Webinar, Workshop, Retreat oder Event auf einer Subdomain. Wenn alle Inhalte (Texte, Bilder) bereitliegen, ist sie innerhalb von 7 Tagen online. Beide Pakete besprechen wir direkt im Klärungsgespräch.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 12: SERVICE-PAKETE (nach 12 Monaten) */}
      <section className="bg-[#050505] py-24 md:py-32 px-6 sm:px-12 md:px-24 relative overflow-hidden z-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-night-gold/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-night-secondary/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center max-w-[820px] mx-auto mb-16 md:mb-20">
              <div className="px-5 py-2 rounded-full border border-night-gold/30 bg-night-gold/5 backdrop-blur-md mb-8 inline-block">
                <span className="font-geist text-[0.65rem] md:text-sm tracking-[0.2em] uppercase text-night-gold font-medium">
                  Pflege & Wachstum nach den 12 Monaten
                </span>
              </div>
              <h2 className="font-instrument text-[clamp(2rem,4vw,3.5rem)] text-white leading-[1.1] mb-6">
                Damit deine Seite{" "}
                <span className="italic text-night-gold">wirklich performt.</span>
              </h2>
              <p className="font-satoshi text-night-secondary text-lg md:text-xl leading-relaxed">
                Du hast mit der Technik nichts zu tun — ich übernehme Hosting, Pflege und Aktualisierung deiner Seite komplett. Drei Stufen, je nachdem wie aktiv deine Seite mit dir wachsen soll.
              </p>
              <p className="font-satoshi text-night-gold text-sm md:text-base mt-4 italic">
                Reference-Kunden: 12 Monate Plus-Niveau (Updates + Monatsbericht) sind im Reference-Preis bereits enthalten.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal
              delay={0.1}
              className="group relative rounded-[2rem] p-[1px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
              <div className="relative h-full bg-[#0A0A0A] p-8 md:p-10 rounded-[calc(2rem-1px)] flex flex-col items-start border-t border-white/5">
                <h3 className="font-instrument text-2xl text-white mb-2">
                  Mini · Anpassungen
                </h3>
                <div className="font-geist text-night-gold tracking-widest text-sm uppercase mb-6">
                  49,- € / Monat
                </div>
                <p className="font-satoshi text-white/60 mb-8 leading-relaxed">
                  Der ruhige Begleiter für kleine, regelmäßige Anpassungen. Ohne Analyse, ohne Schnickschnack.
                </p>
                <ul className="space-y-4 font-satoshi text-white/80 w-full mb-8">
                  <li className="flex items-start gap-4">
                    <span className="text-night-gold mt-1">✦</span>
                    <span>Kleine Text- und Bildänderungen — schnell erledigt</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-night-gold mt-1">✦</span>
                    <span>Direkter Ansprechpartner per Mail</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-night-gold mt-1">✦</span>
                    <span>Sicheres Hosting & laufende Pflege deiner Sabala-Seite</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal
              delay={0.2}
              className="group relative rounded-[2rem] p-[1px] overflow-hidden lg:-translate-y-4"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-night-gold/60 to-night-gold/10" />
              <div className="relative h-full bg-[#0E0B05] p-8 md:p-10 rounded-[calc(2rem-1px)] flex flex-col items-start">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-night-gold to-transparent opacity-50" />
                <div className="absolute top-10 right-10 w-24 h-24 bg-night-gold/10 blur-[40px] rounded-full group-hover:bg-night-gold/20 transition-colors duration-700" />

                <div className="absolute top-4 right-4 bg-night-gold text-black uppercase tracking-widest text-[10px] font-bold px-3 py-1 rounded-full">
                  Reference inklusive
                </div>

                <h3 className="font-instrument text-3xl text-white mb-2 relative z-10">
                  Plus · mit Analyse
                </h3>
                <div className="font-geist text-night-gold tracking-widest text-sm uppercase mb-6 relative z-10">
                  69,- € / Monat
                </div>
                <p className="font-satoshi text-white/70 mb-8 leading-relaxed relative z-10">
                  Du willst sehen, was wirklich passiert. Inklusive Analyse-Tool und monatlichem Bericht. <strong className="text-night-gold font-normal">In der Reference-Edition für 12 Monate enthalten.</strong>
                </p>
                <ul className="space-y-4 font-satoshi text-white/90 w-full mb-8 relative z-10">
                  <li className="flex items-start gap-4">
                    <span className="text-night-gold mt-1">✦</span>
                    <span>Alles aus dem Mini-Paket</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-night-gold mt-1">✦</span>
                    <span>Analyse-Tool aktiv geschaltet (DSGVO-konform · cookie-frei)</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-night-gold mt-1">✦</span>
                    <span>
                      <strong className="text-white">Monatsbericht</strong>: Was funktioniert, was nicht, was tun
                    </span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal
              delay={0.3}
              className="group relative rounded-[2rem] p-[1px] overflow-hidden md:col-span-2 lg:col-span-1"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
              <div className="relative h-full bg-[#0A0A0A] p-8 md:p-10 rounded-[calc(2rem-1px)] flex flex-col items-start border-t border-white/5">
                <h3 className="font-instrument text-2xl text-white mb-2">
                  Premium · mit Strategie-Call
                </h3>
                <div className="font-geist text-night-gold tracking-widest text-sm uppercase mb-6">
                  149,- € / Monat
                </div>
                <p className="font-satoshi text-white/60 mb-8 leading-relaxed">
                  Für alle, die ihre Seite aktiv weiterentwickeln — mit persönlichem Sparring zur Auswertung der Analyse.
                </p>
                <ul className="space-y-4 font-satoshi text-white/80 w-full mb-8">
                  <li className="flex items-start gap-4">
                    <span className="text-night-gold mt-1">✦</span>
                    <span>Alles aus dem Plus-Paket</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-night-gold mt-1">✦</span>
                    <span>
                      <strong className="text-white">30-Min-Strategie-Call pro Monat</strong> — Analyse besprechen, nächste Schritte festlegen
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-night-gold mt-1">✦</span>
                    <span>Höchste Priorität bei Anpassungen</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 13 (NEU): WERTE-SCHLUSS */}
      <section className="py-40 md:py-56 px-6 sm:px-12 md:px-24 bg-warm-canvas relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[1000px] aspect-video opacity-25 pointer-events-none">
          <Image
            src="/images/onepager/werte-schluss-meer.jpg"
            alt=""
            fill
            className="object-cover rounded-[40px]"
          />
        </div>

        <div className="max-w-[820px] mx-auto text-center relative z-10">
          <ScrollReveal>
            <p className="text-refined-gold tracking-[0.2em] font-medium text-xs md:text-sm uppercase mb-8">
              Die Wahrheit, kurz.
            </p>
            <h2 className="font-instrument text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.1] mb-12 text-deep-charcoal">
              Erfolg, der mehr ist <br />
              als ein{" "}
              <span className="italic text-refined-gold">Umsatzziel.</span>
            </h2>
            <div className="w-16 h-[1px] bg-refined-gold/40 mx-auto mb-12" />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="font-instrument italic text-warm-steel text-xl md:text-2xl lg:text-3xl leading-[1.55] space-y-6">
              <p>
                Diese Seite ist für Menschen, die Erfolg suchen, um damit etwas Größeres zu schaffen.
              </p>
              <p>
                Nicht für Ego-Befriedigung.
                <br />
                Nicht für &ldquo;mehr, mehr, mehr&rdquo;.
              </p>
              <p>
                Sondern für: mehr Ressourcen, mehr Reichweite, mehr Wirkung —{" "}
                <span className="text-refined-gold not-italic font-normal">
                  um das Gute in der Welt zu vergrößern.
                </span>
              </p>
              <p className="text-deep-charcoal not-italic font-satoshi text-lg md:text-xl pt-4">
                Wenn das nach dir klingt, lass uns sprechen.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 14: CTA */}
      <section className="py-32 md:py-48 px-6 sm:px-12 md:px-24 relative bg-night-foundation flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute left-0 bottom-0 w-[400px] md:w-[600px] h-[600px] md:h-[800px] grayscale opacity-25 transform -scale-x-100 mix-blend-screen pointer-events-none">
          <Image
            src="/images/sabala-portrait-hero.png"
            fill
            className="object-cover object-top"
            alt="Sabala bg"
          />
        </div>

        <div className="max-w-[1400px] mx-auto w-full z-10 text-center relative">
          <ScrollReveal>
            <h2 className="font-instrument text-[clamp(3rem,6.5vw,6rem)] leading-tight mb-8 md:mb-12 text-white">
              Lass uns sprechen.
              <br />
              <span className="italic text-night-gold">
                Beidseitig unverbindlich.
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-xl md:text-3xl text-night-secondary mb-16 md:mb-20 max-w-4xl mx-auto leading-relaxed">
              30-Min-Klärungsgespräch — kein Verkaufsgespräch.
              <br />
              Wir prüfen gemeinsam, ob wir zueinander passen. Wenn ja, geht&apos;s los. Wenn nicht — keine Kosten, keine Folgen.
            </p>
          </ScrollReveal>

          <ScrollReveal
            delay={0.2}
            className="max-w-3xl mx-auto border border-night-gold/20 bg-[#22221f] p-6 md:p-10 rounded-3xl md:rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
          >
            <div className="w-full min-h-[300px] py-10 bg-deep-charcoal border-2 border-dashed border-night-gold/40 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center hover:border-night-gold transition-colors group">
              <svg
                className="w-16 h-16 md:w-20 md:h-20 text-night-gold mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-2xl md:text-4xl font-instrument text-white mb-6 text-center px-4">
                30-Min-Klärungsgespräch buchen
              </p>

              <Link
                href={BOOKING_LINK}
                target="_blank"
                className="mt-4 inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-6 text-sm md:text-xl font-bold uppercase tracking-widest rounded-full text-black bg-night-gold hover:bg-white transition-all shadow-[0_10px_30px_rgba(201,168,76,0.2)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.4)]"
              >
                Hier Termin wählen →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
