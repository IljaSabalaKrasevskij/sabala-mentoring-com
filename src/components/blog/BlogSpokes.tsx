import Link from "next/link";

// Zentraler Blog-Index: Slug -> Kurz-Tag + Kurz-Titel für Weiterlesen-Karten.
// Eine Stelle pflegen, Artikel rufen BlogSpokes mit ihren 3 verwandten Slugs auf.
const BLOG_INDEX: Record<string, { tag: string; title: string }> = {
  "seo-und-geo-fuer-personal-brands-2026": { tag: "SEO & GEO", title: "In Google und ChatGPT gefunden werden" },
  "claude-code-weniger-code-ponytail": { tag: "KI Academy", title: "Claude Code am Limit: weniger Code, mehr Strecke" },
  "webseiten-bau-mit-claude-anfaenger": { tag: "KI Academy", title: "Webseiten-Bau mit Claude Code: der Anfänger-Guide" },
  "webseite-mit-ki-bauen-2026": { tag: "KI & Webseiten", title: "Webseite mit KI bauen: der Premium-Stack" },
  "was-kostet-ki-webseite": { tag: "Pricing", title: "Was eine KI-Webseite wirklich kostet" },
  "premium-webseite-oder-baukasten": { tag: "Premium & Brand", title: "Premium-Webseite oder Baukasten?" },
  "baukasten-vs-eigene-webseite-kosten-2026": { tag: "Pricing", title: "Baukasten vs. eigene Webseite: die Kosten" },
  "webdesigner-verschwunden-code-eigentum": { tag: "Code-Eigentum", title: "Wenn dein Webdesigner verschwindet" },
  "technik-setup-online-coach": { tag: "How-to", title: "Technik-Setup für Online-Coaches" },
  "warum-business-mentoring-programme-scheitern": { tag: "Mentoring", title: "Warum Mentoring-Programme scheitern" },
  "chatgpt-custom-gpts-richtig-nutzen": { tag: "ChatGPT", title: "Custom GPTs richtig nutzen" },
  "dsgvo-cookie-banner-reform-2026": { tag: "Recht", title: "DSGVO & Cookie-Banner-Reform 2026" },
  "eu-ai-act-coach-2026": { tag: "Recht", title: "EU AI Act: was Coaches klären müssen" },
};

export function BlogSpokes({ slugs }: { slugs: string[] }) {
  const items = slugs.map((s) => ({ slug: s, ...BLOG_INDEX[s] })).filter((i) => i.title);
  if (!items.length) return null;
  return (
    <section className="px-6 sm:px-12 md:px-24 pt-24 max-w-[1100px] mx-auto w-full">
      <p className="font-mono text-xs uppercase tracking-widest text-refined-gold mb-4 text-center">Was du als Nächstes liest</p>
      <h2 className="font-instrument text-3xl md:text-4xl text-deep-charcoal text-center mb-12 leading-[1.1]">Weiterlesen.</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((it) => (
          <Link key={it.slug} href={`/blog/${it.slug}`} className="block h-full bg-warm-light/30 border border-warm-steel/15 rounded-xl p-6 hover:border-refined-gold/50 hover:bg-warm-light/50 transition-all duration-300">
            <span className="font-mono text-xs uppercase tracking-widest text-refined-gold">{it.tag}</span>
            <h3 className="font-instrument text-lg text-deep-charcoal mt-2 leading-snug">{it.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
