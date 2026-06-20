import Image from "next/image";
import Link from "next/link";
import { STRINGS, type CaseStudy, type Locale } from "@/lib/case-studies";

/**
 * Case-study grid. Reveal-on-scroll and all hover states are pure CSS, so the
 * content is always present in the SSR HTML and never depends on JS animation to
 * be visible (see `.cs-reveal` in globals.css). Text reads the active language.
 */
export function CaseStudyGrid({ items, lang }: { items: CaseStudy[]; lang: Locale }) {
  const s = STRINGS[lang];
  return (
    <div className="grid gap-7 md:grid-cols-2 md:gap-9">
      {items.map((cs, i) => (
        <article
          key={cs.id}
          className="cs-reveal group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-deep-charcoal/8 bg-pure-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-refined-gold/40 hover:shadow-[0_34px_90px_-30px_rgba(184,150,62,0.38)]"
        >
          {/* Gold hairline that draws across the top on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px origin-left scale-x-0 bg-gradient-to-r from-refined-gold/0 via-refined-gold to-refined-gold/0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
          />

          {/* Image */}
          <div className="relative aspect-[16/9] overflow-hidden bg-warm-canvas">
            {cs.image ? (
              <Image
                src={cs.image}
                alt={`${cs.title[lang]}, built with Claude`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-warm-canvas to-pure-surface">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-warm-steel/50">
                  Screenshot
                </span>
              </div>
            )}

            {/* Legibility veil for the index + badge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep-charcoal/55 via-transparent to-deep-charcoal/10"
            />

            {/* Editorial index */}
            <span className="absolute bottom-3.5 left-5 font-instrument text-[2rem] italic leading-none text-cream/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              {String(i + 1).padStart(2, "0")}
            </span>

            {cs.isPrivate && (
              <span className="absolute right-4 top-4 rounded-full bg-deep-charcoal/85 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cream backdrop-blur-sm">
                {s.privateBadge}
              </span>
            )}
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col p-8 md:p-9">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#8A6E1F]">
              {cs.industry[lang]}
            </p>
            <h3 className="mt-3 font-instrument text-3xl leading-[1.08] text-deep-charcoal md:text-[2.3rem]">
              {cs.title[lang]}
            </h3>

            <dl className="mt-6 space-y-5 font-satoshi text-[0.95rem] leading-relaxed text-deep-charcoal/80">
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-warm-steel">
                  {s.labelChallenge}
                </dt>
                <dd className="mt-1.5">{cs.challenge[lang]}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-warm-steel">
                  {s.labelClaude}
                </dt>
                <dd className="mt-1.5">{cs.claudeUsage[lang]}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-warm-steel">
                  {s.labelResult}
                </dt>
                <dd className="mt-1.5">{cs.result[lang]}</dd>
              </div>
            </dl>

            {/* Tags */}
            <ul className="mt-7 flex flex-wrap gap-2">
              {cs.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-deep-charcoal/12 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-warm-steel transition-colors duration-300 hover:border-refined-gold/40 hover:text-deep-charcoal"
                >
                  {t}
                </li>
              ))}
            </ul>

            {/* Footer action — pinned to the bottom so cards align */}
            <div className="mt-8 flex items-center justify-between border-t border-deep-charcoal/8 pt-6">
              {cs.isPrivate ? (
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-warm-steel">
                  {s.privateInternal}
                </span>
              ) : cs.url ? (
                <Link
                  href={cs.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 font-mono text-[0.75rem] font-medium uppercase tracking-[0.18em] text-[#8A6E1F] transition-colors hover:text-deep-charcoal"
                >
                  {s.viewWebsite}
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-refined-gold/10 transition-colors duration-300 group-hover/link:bg-refined-gold/20">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                      className="transition-transform duration-300 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
