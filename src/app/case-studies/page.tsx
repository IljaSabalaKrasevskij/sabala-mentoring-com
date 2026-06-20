import type { CSSProperties } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { CaseStudyGrid } from "@/components/case-studies/CaseStudyGrid";
import { CASE_STUDIES } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Studies · Built with Claude",
  description:
    "Real websites built end to end with Claude and Claude Code. Case studies from Sabala Studios for the Anthropic Claude Partner Network.",
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
      className="min-h-[100dvh] bg-warm-canvas text-deep-charcoal selection:bg-refined-gold selection:text-white"
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-pure-surface px-6 pb-20 pt-36 sm:px-10 md:px-16 md:pb-28 md:pt-48">
        <div className="pointer-events-none absolute right-[-18vw] top-[-18vw] h-[48vw] w-[48vw] animate-float-slow rounded-full bg-gold-glow opacity-25 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl">
          <div className="cs-rise">
            <p className="flex items-center gap-2.5 font-geist text-[0.7rem] font-medium uppercase tracking-[0.22em] text-warm-steel">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-refined-gold" />
              Built with Claude
            </p>
            <h1 className="mt-6 font-instrument text-[clamp(3.4rem,8vw,7.2rem)] leading-[0.94] tracking-tight">
              Real websites.
              <br />
              <span className="italic text-warm-steel">Real clients.</span>
              <br />
              Real results.
            </h1>
          </div>

          {/*
            TODO (Ilja): rewrite this in your own voice for the Anthropic submission.
            This is the single highest leverage paragraph on the page — it is the pitch
            a reviewer reads before looking at any project. Keep it to 3-5 sentences:
            1) what you do, 2) how Claude fits into the workflow (not just "we use AI"),
            3) why the projects below are evidence.
          */}
          <div className="cs-rise" style={{ "--cs-d": "0.1s" } as CSSProperties}>
            <p className="mt-10 max-w-2xl font-satoshi text-lg leading-relaxed text-warm-steel md:text-xl">
              Every project on this page was designed and developed with Claude and Claude
              Code, from initial architecture decisions through deployment. Claude is not a
              code generator bolted on top of an existing workflow here, it is the workflow:
              positioning, copy, component design, infrastructure, reviews. The projects
              below are live in production.
            </p>
          </div>

          <div className="cs-rise" style={{ "--cs-d": "0.2s" } as CSSProperties}>
            <div className="mt-12 flex items-center gap-5">
              <span className="h-px w-12 bg-refined-gold/50" />
              <p className="font-geist text-[0.65rem] uppercase tracking-[0.22em] text-warm-steel/70">
                Four projects · all in production
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Grid */}
      <section className="bg-warm-canvas px-6 py-24 sm:px-10 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <CaseStudyGrid items={CASE_STUDIES} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-pure-surface px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[44vh] w-[70vw] -translate-x-1/2 animate-float-slow rounded-full bg-refined-gold/10 blur-[120px]" />
        <div className="cs-rise">
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="font-geist text-[0.7rem] font-medium uppercase tracking-[0.22em] text-warm-steel">
              Want a website built with AI?
            </p>
            <h2 className="mt-5 font-instrument text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-deep-charcoal">
              Let&rsquo;s talk about your project.
            </h2>
            <div className="mt-10 flex justify-center">
              <Link
                href="/#kontakt"
                className="group inline-flex items-center gap-4 rounded-full bg-refined-gold py-2 pl-8 pr-2 font-satoshi font-medium text-white transition-colors duration-300 hover:bg-deep-charcoal"
              >
                Contact me
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
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
        </div>
      </section>
    </div>
  );
}
