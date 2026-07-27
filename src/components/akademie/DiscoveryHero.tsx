"use client";

/* ─────────────────────────────────────────────────────────────────────────
   DiscoveryHero — dunkler Aurora-Hero (Unterwasser-/Auroralicht, reines SVG/CSS).
   Botschaft sofort sichtbar: Durchbruch & Durchblick. Kein Workshop-Titel hier,
   der kommt in der naechsten, voll sichtbaren Sektion (WorkshopHeader).
   ───────────────────────────────────────────────────────────────────────── */

export default function DiscoveryHero() {
  return (
    <section className="relative overflow-hidden" style={{ height: "86svh", minHeight: 520, background: "#06100f" }}>
      {/* Bewegter Hintergrund — weiches, fließendes Unterwasser-/Aurora-Licht */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Tiefen-Basis: dunkles Teal → warmes Deep */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(130% 100% at 50% 0%, #0d2a25 0%, #08171b 48%, #050d0c 100%)" }} />

        {/* Driftende, weich verlaufende Lichtfelder (Aurora-Tiefe) */}
        <div className="absolute -left-[15%] top-[2%] h-[65vmax] w-[65vmax] rounded-full" style={{ background: "radial-gradient(circle, rgba(184,150,62,0.28), transparent 60%)", filter: "blur(70px)", animation: "drift-a 28s ease-in-out infinite" }} />
        <div className="absolute right-[-12%] top-[20%] h-[60vmax] w-[60vmax] rounded-full" style={{ background: "radial-gradient(circle, rgba(95,138,134,0.34), transparent 62%)", filter: "blur(80px)", animation: "drift-b 34s ease-in-out infinite" }} />
        <div className="absolute left-[25%] bottom-[-15%] h-[55vmax] w-[55vmax] rounded-full" style={{ background: "radial-gradient(circle, rgba(135,111,156,0.22), transparent 60%)", filter: "blur(80px)", animation: "drift-a 40s ease-in-out infinite reverse" }} />

        {/* Sanft wellendes Licht (Turbulenz verzerrt einen weichen Glow → Wasser-Bewegung, keine harten Kanten) */}
        <svg className="absolute inset-0 h-full w-full" style={{ mixBlendMode: "screen", opacity: 0.6 }} preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="soft-glow" cx="50%" cy="32%" r="75%">
              <stop offset="0%" stopColor="rgba(214,180,98,0.55)" />
              <stop offset="40%" stopColor="rgba(110,150,140,0.3)" />
              <stop offset="100%" stopColor="rgba(8,20,22,0)" />
            </radialGradient>
            <filter id="ripple" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="2" seed="5" stitchTiles="stitch" result="n">
                <animate attributeName="baseFrequency" dur="26s" values="0.006 0.012;0.009 0.016;0.006 0.012" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="n" scale="55" xChannelSelector="R" yChannelSelector="G" />
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#soft-glow)" filter="url(#ripple)" />
        </svg>

        {/* Godrays von oben (Blick zur Wasseroberfläche) */}
        <div className="absolute inset-x-0 top-0 h-[65%]" style={{ background: "linear-gradient(180deg, rgba(214,180,98,0.14), transparent)", mixBlendMode: "screen" }} />

        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(125% 100% at 50% 38%, transparent 42%, rgba(4,9,8,0.66) 100%)" }} />
      </div>

      {/* Botschaft — direkt sichtbar ueber dem Aurora-Hintergrund */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.4em]" style={{ color: "rgba(212,174,90,0.85)" }}>
          dein KI-Durchbruch
        </p>
        <h1 className="mt-7 font-serif leading-[0.98] text-cream" style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)" }}>
          Durchbruch.
          <br />
          <span style={{ color: "#d4ae5a" }}>Durchblick.</span>
        </h1>
        <p className="mt-8 max-w-md font-sans text-base md:text-lg" style={{ color: "rgba(250,248,245,0.72)" }}>
          Du bist nur ein Setup davon entfernt, mit KI wirklich zu arbeiten. So wie die Profis.
        </p>
        <div className="mt-10 flex flex-col items-center gap-2" style={{ color: "rgba(250,248,245,0.45)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">weiter</span>
          <span className="block h-10 w-px" style={{ background: "linear-gradient(to bottom, rgba(212,174,90,0.7), transparent)", animation: "scroll-pulse 2.2s ease-in-out infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes drift-a { 0%,100% { transform: translate(0,0) } 50% { transform: translate(8vw, 6vh) } }
        @keyframes drift-b { 0%,100% { transform: translate(0,0) } 50% { transform: translate(-7vw, -5vh) } }
        @keyframes scroll-pulse { 0%,100% { opacity: 0.4; transform: scaleY(0.8) } 50% { opacity: 1; transform: scaleY(1) } }
      `}</style>
    </section>
  );
}
