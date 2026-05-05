import { getProvenExpertSummary, PROVEN_EXPERT_PROFILE_URL } from "@/lib/provenExpert";

type Props = {
  variant?: "card" | "strip" | "footer";
  className?: string;
};

function StarRow({ value }: { value: number }) {
  // value is on 5-point scale, render 5 stars with last one possibly half/partial
  const full = Math.floor(value);
  const fractional = value - full;
  return (
    <div className="inline-flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => {
        const isFull = i < full;
        const isPartial = i === full && fractional > 0;
        return (
          <svg
            key={i}
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0"
          >
            <defs>
              <linearGradient id={`pe-star-${i}-${value}`}>
                <stop offset={`${isPartial ? fractional * 100 : 100}%`} stopColor="#B8963E" />
                <stop offset={`${isPartial ? fractional * 100 : 100}%`} stopColor="#D9D2C4" />
              </linearGradient>
            </defs>
            <path
              d="M12 2.5l2.95 6.51 7.05.75-5.3 4.92 1.55 7.07L12 18.27l-6.25 3.48 1.55-7.07L2 9.76l7.05-.75L12 2.5z"
              fill={isFull ? "#B8963E" : isPartial ? `url(#pe-star-${i}-${value})` : "#D9D2C4"}
            />
          </svg>
        );
      })}
    </div>
  );
}

export async function ProvenExpertCard({ variant = "card", className = "" }: Props) {
  const data = await getProvenExpertSummary();
  const score = data.ratingValue.toFixed(2).replace(".", ",");
  const reviews = data.reviewCount.toLocaleString("de-DE");

  // Strip — for use in trust marquee or thin trust bar
  if (variant === "strip") {
    return (
      <a
        href={PROVEN_EXPERT_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-3 ${className}`}
        aria-label={`ProvenExpert Bewertung ${score} von 5,00 Sternen bei ${reviews} Bewertungen`}
      >
        <StarRow value={data.ratingValue} />
        <span className="font-instrument text-deep-charcoal text-base">
          {score} <span className="text-warm-steel">/ 5,00</span>
        </span>
        <span className="font-mono text-warm-steel/70 text-[0.7rem] tracking-widest uppercase">
          · {reviews} Bewertungen · ProvenExpert
        </span>
      </a>
    );
  }

  // Footer — minimal compliance
  if (variant === "footer") {
    return (
      <a
        href={PROVEN_EXPERT_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 ${className}`}
        aria-label={`Verifiziert von ProvenExpert: ${score} von 5,00`}
      >
        <span className="text-refined-gold text-base">★</span>
        <span className="font-mono text-warm-steel/60 text-[0.7rem] tracking-widest uppercase">
          {score} / 5,00 · {reviews} Bewertungen · Verifiziert via ProvenExpert
        </span>
      </a>
    );
  }

  // Card (default) — full Sabala-style trust card
  return (
    <a
      href={PROVEN_EXPERT_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block relative overflow-hidden rounded-[2rem] p-[1px] transition-transform duration-700 hover:-translate-y-1 ${className}`}
      aria-label={`ProvenExpert Bewertung ${score} von 5,00 Sternen bei ${reviews} Bewertungen — Profil ansehen`}
    >
      {/* Gold gradient border */}
      <div className="absolute inset-0 bg-gradient-to-br from-refined-gold/40 via-refined-gold/15 to-refined-gold/30" />

      <div className="relative bg-pure-surface rounded-[calc(2rem-1px)] p-8 md:p-10 overflow-hidden">
        {/* Soft gold glow corner */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-refined-gold/12 blur-[60px] rounded-full pointer-events-none group-hover:bg-refined-gold/20 transition-colors duration-700" />

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="h-[1px] w-8 bg-refined-gold" />
          <span className="font-mono text-refined-gold text-[0.65rem] md:text-xs tracking-[0.25em] uppercase font-bold">
            Exzellent bewertet
          </span>
        </div>

        {/* Stars */}
        <div className="mb-4 relative z-10">
          <StarRow value={data.ratingValue} />
        </div>

        {/* Score Number */}
        <div className="flex items-baseline gap-2 mb-3 relative z-10">
          <span className="font-instrument text-[clamp(3rem,5vw,4.5rem)] text-deep-charcoal leading-none">
            {score}
          </span>
          <span className="font-instrument text-warm-steel text-2xl md:text-3xl">/ 5,00</span>
        </div>

        {/* Reviews count */}
        <p className="font-satoshi text-warm-steel text-base md:text-lg leading-relaxed relative z-10 mb-6">
          Bewertet von <strong className="text-deep-charcoal font-medium">{reviews} Kunden</strong>
          {data.recommendationRate >= 95 && (
            <>
              {" · "}
              <span className="text-refined-gold font-medium">
                {data.recommendationRate}% Empfehlungsquote
              </span>
            </>
          )}
        </p>

        {/* Verification footer */}
        <div className="flex items-center justify-between pt-5 border-t border-whisper-border relative z-10">
          <span className="font-mono text-warm-steel/70 text-[0.65rem] md:text-xs tracking-widest uppercase">
            Verifiziert via ProvenExpert
          </span>
          <span className="inline-flex items-center gap-2 text-refined-gold font-satoshi text-sm font-medium group-hover:gap-3 transition-all">
            Profil ansehen
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}
