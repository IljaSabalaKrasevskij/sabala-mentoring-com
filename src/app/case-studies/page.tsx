import Link from "next/link";
import type { Metadata } from "next";
import { CaseStudiesHero } from "@/components/case-studies/CaseStudiesHero";
import { CaseStudyGrid } from "@/components/case-studies/CaseStudyGrid";
import { CASE_STUDIES } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Studies · Built with Claude",
  description:
    "Real websites and AI systems, designed and built end to end with Claude and Claude Code. Selected work from Sabala Studios.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies · Built with Claude",
    description: "Real websites. Real clients. Real results.",
    locale: "en_US",
    url: "/case-studies",
  },
};

export default function CaseStudiesPage() {
  return (
    <div
      lang="en"
      className="bg-warm-canvas text-deep-charcoal selection:bg-refined-gold selection:text-white"
    >
      <CaseStudiesHero />

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
      <section className="px-6 pb-24 sm:px-10 md:px-16 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="cs-rise mb-14 max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#8A6E1F]">
              {"// selected work"}
            </p>
            <h2 className="mt-5 font-instrument text-[clamp(2.1rem,4.5vw,3.6rem)] leading-[1.05] tracking-tight">
              Four projects, start to finish.
            </h2>
          </div>

          <CaseStudyGrid items={CASE_STUDIES} />
        </div>
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
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-light">
            Want a website built with AI?
          </p>
          <h2 className="mt-5 font-instrument text-cream text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.05]">
            Let&rsquo;s talk about your project.
          </h2>
          <div className="mt-10 flex justify-center">
            <Link
              href="/#kontakt"
              className="group inline-flex items-center gap-4 rounded-full bg-gold-light py-2 pl-8 pr-2 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors duration-300 hover:bg-gold"
            >
              Contact me
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
