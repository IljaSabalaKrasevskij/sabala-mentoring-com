import Link from "next/link";

/* Globaler Footer — dunkel, gross, Apple-Stil. Auf jeder Seite gleich. */
const COLS: { title: string; links: { label: string; href: string; ext?: boolean }[] }[] = [
  {
    title: "Angebot",
    links: [
      { label: "Webseiten", href: "/webseiten" },
      { label: "Mit dir entwickelt", href: "/mitentwickelt" },
      { label: "KI-Akademie", href: "/akademie-hub" },
      { label: "KI-Assistenzteam", href: "/gpt-team" },
    ],
  },
  {
    title: "Mehr",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Über mich", href: "/ueber-mich" },
      { label: "Referenzen", href: "/referenzen" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "AGB", href: "/agb" },
    ],
  },
  {
    title: "Kontakt",
    links: [
      { label: "sabala@sabala-mentoring.com", href: "mailto:sabala@sabala-mentoring.com", ext: true },
      { label: "+995 591 44 36 65", href: "tel:+995591443665", ext: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pt-[16vh] pb-12" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[70vw] -translate-x-1/2" style={{ background: "linear-gradient(90deg, transparent, rgba(184,150,62,0.4), transparent)" }} />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[40vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.07), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl">
        {/* Marken-Statement, gross */}
        <div className="max-w-3xl">
          <p className="font-mono text-[12px] uppercase tracking-[0.35em] text-gold">Sabala Studios</p>
          <p className="mt-6 font-serif leading-[1.05] text-cream" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.01em" }}>
            Ich bringe <span className="text-gold-light">KI</span> in dein Unternehmen.
          </p>
        </div>

        {/* Spalten */}
        <div className="mt-20 grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-warm-mid">{col.title}</p>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((l) =>
                  l.ext ? (
                    <li key={l.label}>
                      <a href={l.href} className="text-[1.05rem] text-warm-light/75 transition-colors hover:text-gold">{l.label}</a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link href={l.href} className="text-[1.05rem] text-warm-light/75 transition-colors hover:text-gold">{l.label}</Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="font-mono text-[12px] tracking-[0.05em] text-warm-mid">© 2026 Sabala Studios · Sabala Mentoring LLC</p>
          <a href="#top" className="font-mono text-[12px] uppercase tracking-[0.2em] text-warm-mid transition-colors hover:text-gold">↑ nach oben</a>
        </div>
      </div>
    </footer>
  );
}
