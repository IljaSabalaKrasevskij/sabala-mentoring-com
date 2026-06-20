import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * Case-study grid. Reveal-on-scroll and all hover states are pure CSS, so the
 * content is always present in the SSR HTML and never depends on JS animation to
 * be visible (see `.cs-reveal` in globals.css — it only hides inside a
 * prefers-reduced-motion:no-preference + @supports guard).
 */
export function CaseStudyGrid({ items }: { items: CaseStudy[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-10">
      {items.map((cs, i) => (
        <article
          key={cs.id}
          className="cs-reveal group relative flex h-full flex-col overflow-hidden rounded-2xl border border-deep-charcoal/8 bg-pure-surface transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-refined-gold/40 hover:shadow-[0_24px_70px_-24px_rgba(184,150,62,0.3)]"
        >
          {/* Gold hairline that draws across the top on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-gradient-to-r from-refined-gold/0 via-refined-gold to-refined-gold/0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
          />

          {/* Image slot */}
          <div className="relative aspect-[16/9] overflow-hidden bg-warm-canvas">
            {cs.image ? (
              <Image
                src={cs.image}
                alt={cs.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-warm-canvas to-pure-surface">
                <span
                  aria-hidden
                  className="absolute h-32 w-32 rounded-full bg-gold-glow opacity-40 blur-2xl transition-transform duration-700 group-hover:scale-150"
                />
                <span className="relative font-geist text-[0.65rem] uppercase tracking-[0.3em] text-warm-steel/50">
                  Screenshot pending
                </span>
              </div>
            )}

            {/* Editorial index */}
            <span className="absolute left-5 top-4 font-instrument text-2xl italic text-deep-charcoal/25 transition-colors duration-500 group-hover:text-refined-gold/70">
              {String(i + 1).padStart(2, "0")}
            </span>

            {cs.isPrivate && (
              <span className="absolute right-4 top-4 rounded-full bg-deep-charcoal/85 px-3 py-1 font-geist text-[0.6rem] uppercase tracking-[0.18em] text-pure-surface backdrop-blur-sm">
                Private Project
              </span>
            )}
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col p-8 md:p-10">
            <p className="font-geist text-[0.65rem] uppercase tracking-[0.22em] text-refined-gold">
              {cs.industry}
            </p>
            <h2 className="mt-3 font-instrument text-3xl leading-[1.1] md:text-[2.4rem]">
              {cs.title}
            </h2>

            <dl className="mt-6 space-y-5 font-satoshi text-[0.95rem] leading-relaxed text-deep-charcoal/85">
              <div>
                <dt className="font-geist text-[0.6rem] uppercase tracking-[0.22em] text-warm-steel">
                  Challenge
                </dt>
                <dd className="mt-1.5">{cs.challenge}</dd>
              </div>
              <div>
                <dt className="font-geist text-[0.6rem] uppercase tracking-[0.22em] text-warm-steel">
                  How Claude was used
                </dt>
                <dd className="mt-1.5">{cs.claudeUsage}</dd>
              </div>
              <div>
                <dt className="font-geist text-[0.6rem] uppercase tracking-[0.22em] text-warm-steel">
                  Result
                </dt>
                <dd className="mt-1.5">{cs.result}</dd>
              </div>
            </dl>

            {/* Tags */}
            <ul className="mt-7 flex flex-wrap gap-2">
              {cs.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-deep-charcoal/12 px-3 py-1 font-geist text-[0.65rem] uppercase tracking-[0.14em] text-warm-steel transition-colors duration-300 hover:border-refined-gold/40 hover:text-deep-charcoal"
                >
                  {t}
                </li>
              ))}
            </ul>

            {/* Footer action — pinned to the bottom so cards align */}
            <div className="mt-8 flex items-center justify-between border-t border-deep-charcoal/8 pt-6">
              {cs.isPrivate ? (
                <span className="font-geist text-[0.7rem] uppercase tracking-[0.18em] text-warm-steel/70">
                  Internal · no public URL
                </span>
              ) : cs.url ? (
                <Link
                  href={cs.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 font-geist text-[0.75rem] font-medium uppercase tracking-[0.18em] text-refined-gold transition-colors hover:text-deep-charcoal"
                >
                  View website
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-out group-hover/link:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
