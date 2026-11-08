import { CURRENT_COHORT, formatSessionDate } from "./cohorts";

export default function CourseAnnouncement() {
  if (!CURRENT_COHORT) return null;

  return (
    <section className="bg-[#080604] px-6 pb-20" aria-labelledby="second-brain-kurs">
      <div className="mx-auto max-w-[1080px] rounded-lg border border-gold/30 bg-gold/5 p-7 md:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Sabala Academy · jetzt buchbar</p>
        <h2 id="second-brain-kurs" className="mt-4 font-serif text-4xl text-cream md:text-5xl">Dein Second Brain. Die nächste Runde.</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-warm-light/75">
          Obsidian, NotebookLM und Claude Code gemeinsam einrichten: zwei Workshops à 2,5 Stunden plus eine zusätzliche Stunde Q&amp;A. Maximal {CURRENT_COHORT.capacity} Plätze.
        </p>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {CURRENT_COHORT.sessions.map((s) => (
            <div key={s.label} className="border-l border-gold/40 pl-4">
              <p className="font-mono text-xs text-gold">{s.label}</p>
              <p className="mt-2 text-base text-cream">{formatSessionDate(s.date)}</p>
              <p className="mt-1 text-sm text-warm-light/70">{s.time}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a href={CURRENT_COHORT.checkoutUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-sm bg-gold px-6 py-3 font-semibold text-deep transition-colors hover:bg-gold-light">
            Kurs buchen · 397 €
          </a>
          <a href="/akademie" className="inline-flex min-h-12 items-center text-sm text-gold underline underline-offset-4">Inhalte &amp; Ablauf ansehen</a>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-warm-light/60">Netto zzgl. MwSt. · für Unternehmen und Selbständige · alle Uhrzeiten in deutscher Zeit (MEZ)</p>
      </div>
    </section>
  );
}
