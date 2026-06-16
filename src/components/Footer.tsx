import Link from "next/link";

/* Globaler Footer — auf jeder Seite. Rechtliche Basis + Navigation + Kontakt. */
export default function Footer() {
  return (
    <footer className="relative px-6 pt-[12vh] pb-10" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[60vw] -translate-x-1/2" style={{ background: "linear-gradient(90deg, transparent, rgba(184,150,62,0.4), transparent)" }} />

      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-gold">Sabala Studios</p>
          <p className="mt-4 max-w-xs font-serif text-[1.4rem] leading-snug text-cream">Ich bringe KI in dein Unternehmen.</p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-warm-mid">Angebot</p>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            <li><Link href="/webseiten" className="text-warm-light/70 transition-colors hover:text-gold">Webseiten</Link></li>
            <li><Link href="/mitentwickelt" className="text-warm-light/70 transition-colors hover:text-gold">Mit dir entwickelt</Link></li>
            <li><Link href="/akademie" className="text-warm-light/70 transition-colors hover:text-gold">Akademie</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-warm-mid">Rechtliches</p>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            <li><Link href="/impressum" className="text-warm-light/70 transition-colors hover:text-gold">Impressum</Link></li>
            <li><Link href="/datenschutz" className="text-warm-light/70 transition-colors hover:text-gold">Datenschutz</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-warm-mid">Kontakt</p>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            <li><a href="mailto:sabala@sabala-mentoring.com" className="text-warm-light/70 transition-colors hover:text-gold">sabala@sabala-mentoring.com</a></li>
            <li><a href="tel:+995591443665" className="text-warm-light/70 transition-colors hover:text-gold">+995 591 44 36 65</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 sm:flex-row">
        <p className="font-mono text-[11px] tracking-[0.05em] text-warm-mid">© 2026 Sabala Studios · Sabala Mentoring LLC</p>
        <a href="#" className="font-mono text-[11px] uppercase tracking-[0.2em] text-warm-mid transition-colors hover:text-gold">nach oben 🚀</a>
      </div>
    </footer>
  );
}
