"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CaseStudiesHero } from "./CaseStudiesHero";
import { CaseStudyGrid } from "./CaseStudyGrid";
import { CASE_STUDIES, STRINGS, TESTIMONIAL, type Locale } from "@/lib/case-studies";

/**
 * Bilingual shell for /case-studies. Holds the active language (DE default,
 * EN reachable via ?lang=en for the Anthropic audience), remembers the choice
 * in localStorage, and keeps the URL in sync. Initial render matches the server
 * (initialLang) so there is no hydration mismatch; the saved preference is only
 * applied after mount.
 */
export function CaseStudiesView({ initialLang }: { initialLang: Locale }) {
  const [lang, setLang] = useState<Locale>(initialLang);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("lang")) return;
    const saved = localStorage.getItem("cs-lang");
    if (saved === "de" || saved === "en") {
      // Apply the saved preference after hydration (client-only value).
      queueMicrotask(() => setLang(saved));
    }
  }, []);

  function switchLang(next: Locale) {
    setLang(next);
    try {
      localStorage.setItem("cs-lang", next);
      const url = new URL(window.location.href);
      url.searchParams.set("lang", next);
      window.history.replaceState(null, "", url.toString());
    } catch {
      /* storage / history may be unavailable; the in-memory switch still works */
    }
  }

  const s = STRINGS[lang];

  const toggle = (
    <div className="flex items-center gap-1 rounded-full border border-gold-light/25 bg-tech-bg/40 p-1 backdrop-blur-sm">
      {(["de", "en"] as Locale[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchLang(l)}
          aria-pressed={lang === l}
          aria-label={STRINGS[l].langName}
          className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
            lang === l ? "bg-gold-light text-tech-bg" : "text-warm-light/60 hover:text-gold-light"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <div
      lang={lang}
      className="bg-warm-canvas text-deep-charcoal selection:bg-refined-gold selection:text-white"
    >
      <CaseStudiesHero lang={lang} toggle={toggle} />

      {/* Soft dark → cream transition (no hard cut) */}
      <div
        aria-hidden
        className="h-[14vh] w-full"
        style={{
          background:
            "linear-gradient(to bottom, #0A0806 0%, #14100c 16%, #2a2118 34%, #6b5a45 56%, #b6a079 76%, #e4d6ba 90%, var(--color-warm-canvas) 100%)",
        }}
      />

      {/* Case study grid */}
      <section className="px-6 pb-24 sm:px-10 md:px-16 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="cs-rise mb-14 max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#8A6E1F]">
              {s.sectionEyebrow}
            </p>
            <h2 className="mt-5 font-instrument text-[clamp(2.1rem,4.5vw,3.6rem)] leading-[1.05] tracking-tight">
              {s.sectionHeadline}
            </h2>
          </div>

          <CaseStudyGrid items={CASE_STUDIES} lang={lang} />
        </div>
      </section>

      {/* Client testimonial */}
      <section className="px-6 pb-24 sm:px-10 md:px-16 md:pb-28">
        <figure className="cs-rise mx-auto grid max-w-5xl gap-8 rounded-[1.8rem] border border-deep-charcoal/8 bg-pure-surface p-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] md:grid-cols-[auto_1fr] md:items-center md:gap-12 md:p-12">
          <div className="flex items-center gap-5 md:flex-col md:items-start md:gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full grayscale md:h-28 md:w-28">
              <Image src={TESTIMONIAL.image} alt={TESTIMONIAL.name} fill sizes="112px" className="object-cover" />
            </div>
            <figcaption>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[#8A6E1F]">
                {s.testimonialEyebrow}
              </p>
              <p className="mt-2 font-satoshi text-lg text-deep-charcoal">{TESTIMONIAL.name}</p>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-warm-steel">
                {TESTIMONIAL.role[lang]}
              </p>
            </figcaption>
          </div>
          <blockquote className="font-instrument text-[clamp(1.45rem,3vw,2.3rem)] leading-[1.32] text-deep-charcoal/90">
            {"“"}
            {TESTIMONIAL.quote[lang]}
            {"”"}
          </blockquote>
        </figure>
      </section>

      {/* CTA — dark rounded close */}
      <section
        className="relative overflow-hidden rounded-t-[2.5rem] px-6 py-24 md:py-32"
        style={{ background: "var(--tech-bg)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[44vh] w-[70vw] -translate-x-1/2 animate-float-slow rounded-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(184,150,62,0.16), transparent 65%)" }}
        />

        <div className="cs-rise relative mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-light">{s.ctaEyebrow}</p>
          <h2 className="mt-5 font-instrument text-cream text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.05]">
            {s.ctaHeadline}
          </h2>
          <div className="mt-10 flex justify-center">
            <Link
              href="/#kontakt"
              className="group inline-flex items-center gap-4 rounded-full bg-gold-light py-2 pl-8 pr-2 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors duration-300 hover:bg-gold"
            >
              {s.ctaButton}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tech-bg/15">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
