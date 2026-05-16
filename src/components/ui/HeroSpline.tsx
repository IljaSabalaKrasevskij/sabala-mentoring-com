import { Suspense } from "react";
import Spline from "@splinetool/react-spline/next";
import Image from "next/image";
import Link from "next/link";
import { MousePointer2 } from "lucide-react";

const SPLINE_SCENE = "https://prod.spline.design/GLfpmxP0zR9q-DfG/scene.splinecode";

export function HeroSpline() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--color-warm-canvas)]">
      {/* Layer 1: Dezente Paper-Texture-Atmosphäre (Limestone-Variation) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(237,232,224,0.5) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 80% 70%, rgba(250,248,245,0.4) 0%, transparent 55%)",
        }}
      />

      {/* Layer 2: Gold-Halo (mittig-rechts, deutlich präsenter, größer) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hidden md:block"
        style={{
          background:
            "radial-gradient(circle 600px at 65% 48%, rgba(184,150,62,0.55) 0%, rgba(212,174,90,0.32) 22%, rgba(184,150,62,0.12) 48%, transparent 75%)",
        }}
      />

      {/* Layer 3: Spline-Sphäre (Gold, maximaler Kontrast, sichtbar als Skulptur) */}
      <div
        className="absolute inset-0 z-[2] hidden md:block"
        style={{
          filter: "hue-rotate(-65deg) saturate(3.5) sepia(0.9) brightness(1.85) contrast(1.5)",
          mixBlendMode: "lighten",
          transform: "translateX(-8%) scale(1.15)",
        }}
      >
        <Suspense fallback={<div className="h-full w-full" />}>
          <Spline scene={SPLINE_SCENE} />
        </Suspense>
      </div>

      {/* Mobile-Fallback: weicher Limestone-Gradient mit Gold-Hauch */}
      <div className="absolute inset-0 z-0 md:hidden bg-gradient-to-br from-[var(--color-warm-canvas)] via-[var(--color-warm-light)] to-[rgba(184,150,62,0.08)]" />

      {/* Layer 4: Soft Backdrop-Wash links für Text-Lesbarkeit (sehr dezent, lässt Halo durchscheinen) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[var(--color-warm-canvas)]/90 via-[var(--color-warm-canvas)]/55 to-transparent pointer-events-none" />

      {/* Hero-Content: Grid 2-Spalten, skaliert bis 2xl */}
      <div className="relative z-20 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 py-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-12 xl:max-w-[1500px] 2xl:max-w-[1760px] 2xl:gap-20 2xl:px-20">
        {/* Text-Block */}
        <div className="max-w-2xl">
          {/* Eyebrow: schlicht, dezent */}
          <div className="mb-10 flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--color-refined-gold)]" aria-hidden="true" />
            <p className="font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-refined-gold)]">
              Der meditierende Business-Architekt
            </p>
          </div>

          {/* H1: Brand-Phrase mit Cursor-Akzent, Subline plakativ, skaliert bis 2xl */}
          <h1 className="mb-14 font-[family-name:var(--font-instrument)] font-normal text-[var(--color-deep-charcoal)]">
            <span className="block text-[3.5rem] leading-[0.98] tracking-[-0.03em] md:text-[4.75rem] lg:text-[6rem] xl:text-[7rem] 2xl:text-[8.5rem]">
              Liebe auf den
              <br />
              ersten Klick.
              <MousePointer2
                aria-hidden="true"
                strokeWidth={1.5}
                className="ml-3 inline-block h-10 w-10 -translate-y-2 rotate-[-12deg] fill-[var(--color-refined-gold)] text-[var(--color-refined-gold)] md:h-14 md:w-14 lg:h-20 lg:w-20 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28"
              />
            </span>
            <span className="mt-6 block italic text-[1.85rem] leading-[1.1] tracking-[-0.02em] text-[var(--color-refined-gold)] md:text-[2.6rem] lg:text-[3.5rem] xl:text-[4rem] 2xl:text-[4.75rem]">
              Dein Webauftritt auf Premium-Niveau gebaut.
            </span>
          </h1>

          {/* ICP-Zeile: kompakt, dezent, mit Markt-Differential */}
          <p className="mb-12 max-w-2xl text-base font-medium leading-relaxed tracking-[-0.005em] text-[var(--color-warm-steel)] md:text-lg lg:text-xl">
            Für kreative Visionäre, Pioniere und Macher. Die Welten verbinden, sich ausdrücken und etwas bewegen wollen.
          </p>

          {/* CTA minimalistisch — nur Primary, Termin buchen liegt bereits in der Navbar */}
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/premium-angebot"
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-refined-gold)] px-10 py-5 text-base font-medium tracking-wide text-[var(--color-warm-canvas)] shadow-[0_2px_30px_rgba(184,150,62,0.25)] transition-all hover:bg-[var(--color-deep-charcoal)] hover:shadow-[0_4px_40px_rgba(46,43,38,0.18)]"
            >
              Drei Stufen ansehen
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          {/* Trust dezent als Unterzeile */}
          <p className="mt-10 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[var(--color-warm-steel)]">
            <span className="text-[var(--color-refined-gold)]">★ 4,96</span> · 154 ProvenExpert-Bewertungen · 100% Empfehlung
          </p>
        </div>

        {/* Portrait-Block (Desktop only, Sphäre liegt dahinter als Heiligenschein) */}
        <div className="relative hidden lg:block">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/sabala-portrait-hero.png"
              alt="Ilja Sabala Krasevskij"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-contain object-center drop-shadow-[0_30px_60px_rgba(46,43,38,0.18)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
