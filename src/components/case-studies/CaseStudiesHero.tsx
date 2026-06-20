import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import SabalaLogo from "@/components/brand/SabalaLogo";
import { STRINGS, type Locale } from "@/lib/case-studies";

/**
 * Cinematic dark hero for /case-studies.
 *
 * tech-bg base + the brand liquid-gold video (screen blend) + gold radial glow,
 * with a strong overlay so the cream type stays legible. Copy rises in via the
 * robust .cs-rise CSS (visible by default). `toggle` is the language switch,
 * injected by the parent so the hero stays presentation-only.
 */
export function CaseStudiesHero({ lang, toggle }: { lang: Locale; toggle: ReactNode }) {
  const s = STRINGS[lang];
  return (
    <section
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pt-28 pb-16 sm:px-10 md:px-16"
      style={{ background: "var(--tech-bg)" }}
    >
      {/* Mobile / cellular: lightweight gold still instead of the 5MB video */}
      <Image
        src="/brand/liquid-gold-poster.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none object-cover opacity-40 md:hidden"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Desktop: the full brand liquid-gold film — atmospheric, no WebGL */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/brand/liquid-gold-poster.jpg"
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover opacity-40 md:block"
        style={{ mixBlendMode: "screen" }}
      >
        <source src="/brand/liquid-gold.mp4" type="video/mp4" />
      </video>

      {/* Gold glow + legibility overlays */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 28%, rgba(184,150,62,0.13), transparent 62%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(10,8,6,0.62), rgba(10,8,6,0.32) 32%, rgba(10,8,6,0.95))" }}
      />

      <div className="relative mx-auto w-full max-w-5xl">
        {/* Logo + language toggle */}
        <div className="cs-rise flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SabalaLogo size={42} />
            <span className="font-mono text-[12px] uppercase tracking-[0.34em] text-gold-light">
              Sabala Studios
            </span>
          </div>
          {toggle}
        </div>

        {/* Eyebrow */}
        <p
          className="cs-rise mt-14 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.34em] text-gold-light"
          style={{ "--cs-d": "0.08s" } as CSSProperties}
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold-light" />
          {s.heroEyebrow}
        </p>

        {/* Headline */}
        <h1
          className="cs-rise mt-6 font-instrument text-cream"
          style={{
            fontSize: "clamp(3.2rem, 8.5vw, 7.4rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.015em",
            "--cs-d": "0.14s",
          } as CSSProperties}
        >
          {s.heroHeadline[0]}
          <br />
          <span className="italic text-gold-light/90">{s.heroHeadline[1]}</span>
          <br />
          {s.heroHeadline[2]}
        </h1>

        {/* Lead */}
        <p
          className="cs-rise mt-9 max-w-2xl font-satoshi text-warm-light/85"
          style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)", lineHeight: 1.55, "--cs-d": "0.2s" } as CSSProperties}
        >
          {s.heroLead}
        </p>

        {/* Meta rule */}
        <div className="cs-rise mt-12 flex items-center gap-5" style={{ "--cs-d": "0.26s" } as CSSProperties}>
          <span className="h-px w-12 bg-gold-light/50" />
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-warm-light/55">{s.heroMeta}</p>
        </div>
      </div>
    </section>
  );
}
