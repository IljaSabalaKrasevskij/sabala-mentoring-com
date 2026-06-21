import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import TreeBookshelfScrollytelling from "@/components/ui/TreeBookshelfScrollytelling";
import { BlogSearch } from "@/components/blog/BlogSearch";
import AcademyNewsletter from "@/components/akademie/AcademyNewsletter";

export const metadata: Metadata = {
  title: "Wissen & Mastermind",
  description:
    "Substanz statt Marketing-Sprech. Artikel für Visionäre, Pioniere und Macher: SEO und GEO für Personal Brands, Custom-GPTs richtig nutzen, warum Business-Mentoring-Programme scheitern, Technik-Setup für Online-Coaches.",
  alternates: {
    canonical: "https://sabala-mentoring.com/blog",
  },
  openGraph: {
    type: "website",
    url: "https://sabala-mentoring.com/blog",
    title: "Wissen & Mastermind — Sabala Blog",
    description:
      "Substanz statt Marketing-Sprech. Pillar-Hub zu SEO + GEO, Custom-GPTs, Mentoring-Architektur und Premium-Technik. Für Visionäre, Pioniere und Macher.",
    images: [
      {
        url: "https://sabala-mentoring.com/blog/seo-und-geo-fuer-personal-brands-2026/cover.jpg",
        width: 1200,
        height: 630,
        alt: "Sabala Blog — Wissen & Mastermind",
      },
    ],
  },
};

const featuredArticle = {
  id: 1,
  title: "SEO und Generative Engine Optimization (GEO). Wie deine Personal Brand 2026 in Google und ChatGPT gefunden wird.",
  excerpt: "Pillar-Hub für Personal Brands. Sechs SEO-Tools, vier GEO-Methoden, ein 30-Minuten-Sprint. ICP-validiert. Kein Agentur-Sprech.",
  category: "SEO & GEO",
  date: "Mai 2026",
  readTime: "14 Min",
  image: "/blog/seo-und-geo-fuer-personal-brands-2026/cover.jpg",
  slug: "/blog/seo-und-geo-fuer-personal-brands-2026",
  keywords: ["seo", "geo", "google", "chatgpt", "perplexity", "sichtbarkeit", "ranking", "schema markup", "e-e-a-t", "ai overviews", "personal brand", "gefunden werden"],
  isPillar: true
};

const articles = [
  {
    id: 15,
    title: "Claude Code am Limit: warum weniger Code dich weiterbringt",
    excerpt: "Claude Code baut oft zu viel und steht damit schnell am Limit. Ein kostenloses Plugin dreht das um, rund 54 Prozent weniger Code bei voller Sicherheit. Ehrlich nachgerechnet statt viral nachgeplappert.",
    category: "KI & Tools",
    date: "Juni 2026",
    readTime: "8 Min",
    image: "/blog/claude-code-weniger-code-ponytail/cover.jpg",
    slug: "/blog/claude-code-weniger-code-ponytail",
    keywords: ["claude code", "tokens", "token-limit", "ponytail", "ki tools", "weniger code", "kosten sparen", "fable", "opus", "plugin"],
    layout: "col-span-1 md:col-span-1 row-span-1",
    aspect: "aspect-square",
    gradient: "from-[#2E2B26] via-[#1a1612] to-[#08070a]",
    accent: "text-refined-gold"
  },
  {
    id: 14,
    title: "Webseiten-Bau mit Claude Code: der ehrliche Anfänger-Guide",
    excerpt: "Vier Setup-Schritte, drei Pflicht-Dateien, fünf typische Anfänger-Fehler. Mit Boris Chernys eigenen Tipps und Sebastian Kaufmanns Setup-Logik, durchgehend mit Quellen.",
    category: "KI & Tools",
    date: "Juni 2026",
    readTime: "8 Min",
    image: "/blog/webseiten-bau-mit-claude-anfaenger/cover.jpg",
    slug: "/blog/webseiten-bau-mit-claude-anfaenger",
    keywords: ["claude code", "anfänger", "einstieg", "setup", "ki tools", "vs code", "tutorial", "claude.md", "skills"],
    layout: "col-span-1 md:col-span-1 row-span-1",
    aspect: "aspect-square",
    gradient: "from-[#2E2B26] via-[#1a1612] to-[#08070a]",
    accent: "text-refined-gold"
  },
  {
    id: 13,
    title: "Was eine KI-Webseite wirklich kostet: die ehrliche 5-Jahres-Rechnung",
    excerpt: "Baukasten 1.500-3.500 Euro über 3 Jahre, eigene Webseite 8.000-15.000 einmalig. Wo der Break-Even liegt, welche Kosten beide verschleiern, und welche Frage am Ende mehr zählt als der Preis.",
    category: "Kosten & Preise",
    date: "Juni 2026",
    readTime: "6 Min",
    image: "/blog/was-kostet-ki-webseite/cover.jpg",
    slug: "/blog/was-kostet-ki-webseite",
    keywords: ["kosten", "preis", "preise", "budget", "roi", "webflow", "baukasten", "investition", "5-jahres-rechnung"],
    layout: "col-span-1 md:col-span-1 row-span-1",
    aspect: "aspect-square",
    gradient: "from-[#2E2B26] via-[#1a1612] to-[#08070a]",
    accent: "text-refined-gold"
  },
  {
    id: 12,
    title: "Premium-Webseite oder Baukasten: 5 Anti-Patterns und 7 Signale",
    excerpt: "5 Anti-Patterns, die deine Webseite billig wirken lassen, und 7 stille Signale, die Premium von austauschbar trennen. Ehrlich, mit echten Beispielen, ohne Agentur-Sprech.",
    category: "Webseite & Premium",
    date: "Juni 2026",
    readTime: "9 Min",
    image: "/blog/premium-webseite-oder-baukasten/cover.jpg",
    slug: "/blog/premium-webseite-oder-baukasten",
    keywords: ["premium", "baukasten", "branding", "anti-patterns", "signale", "webflow", "wix", "squarespace", "webdesign"],
    layout: "col-span-1 md:col-span-1 row-span-1",
    aspect: "aspect-square",
    gradient: "from-[#2E2B26] via-[#1a1612] to-[#08070a]",
    accent: "text-refined-gold"
  },
  {
    id: 8,
    title: "Webseite mit KI bauen 2026: Der Premium-Stack, den niemand zeigt",
    excerpt: "Diese Seite ist mit Antigravity, Spline und Claude Code gebaut. Der Unterschied zwischen Baukasten-KI und Pro-Tool-Stack ist nicht graduell. Es ist eine andere Liga.",
    category: "Webseite & Premium",
    date: "Mai 2026",
    readTime: "9 Min",
    image: "/blog/webseite-mit-ki-bauen-2026/cover.jpg",
    slug: "/blog/webseite-mit-ki-bauen-2026",
    keywords: ["ki tools", "claude code", "antigravity", "spline", "premium stack", "no-code", "vibe coding", "webseite bauen"],
    layout: "col-span-1 md:col-span-2 row-span-1",
    aspect: "aspect-[2/1] md:aspect-[2.4/1]",
    gradient: "from-[#2E2B26] via-[#15110b] to-[#08070a]",
    accent: "text-refined-gold"
  },
  {
    id: 7,
    title: "EU AI Act ab August 2026: Was Coaches jetzt klären müssen",
    excerpt: "Am 2. August 2026 ist der EU AI Act vollständig anwendbar. Acht Wochen ab heute. Was du in deiner Praxis konkret tun musst.",
    category: "Recht & Datenschutz",
    date: "Mai 2026",
    readTime: "7 Min",
    image: "/blog/eu-ai-act-coach-2026/cover.jpg",
    slug: "/blog/eu-ai-act-coach-2026",
    keywords: ["ai act", "recht", "datenschutz", "compliance", "regulierung", "transparenzpflicht", "ki gesetz", "bußgeld", "ki recht"],
    layout: "col-span-1 md:col-span-1 row-span-1",
    aspect: "aspect-square",
    gradient: "from-[#1f1813] via-[#15110b] to-[#08070a]",
    accent: "text-refined-gold"
  },
  {
    id: 9,
    title: "Wenn dein Webdesigner verschwindet: Code-Eigentum als Versicherung",
    excerpt: "Webseiten-Lock-in auf drei Ebenen: Plattform, Hosting, Person. Warum Code-Eigentum die einzige echte Versicherung gegen Webdesigner-Abhängigkeit ist.",
    category: "Webseite & Premium",
    date: "Mai 2026",
    readTime: "8 Min",
    image: "/blog/webdesigner-verschwunden-code-eigentum/cover.jpg",
    slug: "/blog/webdesigner-verschwunden-code-eigentum",
    keywords: ["lock-in", "code eigentum", "webflow", "wordpress", "migration", "abhängigkeit", "hosting", "github", "vercel", "webdesigner"],
    layout: "col-span-1 md:col-span-1 row-span-1",
    aspect: "aspect-square",
    gradient: "from-[#2E2B26] via-[#1a1612] to-[#08070a]",
    accent: "text-refined-gold"
  },
  {
    id: 10,
    title: "Cookie-Banner ade? DSGVO-Reform 2026 + warum cookie-frei jetzt Premium ist",
    excerpt: "Die EU plant 2026 eine Lockerung der Cookie-Banner-Pflicht. Warum cookie-frei trotzdem der Premium-Standard ist, mit konkretem Stack.",
    category: "Recht & Datenschutz",
    date: "Mai 2026",
    readTime: "7 Min",
    image: "/blog/dsgvo-cookie-banner-reform-2026/cover.jpg",
    slug: "/blog/dsgvo-cookie-banner-reform-2026",
    keywords: ["dsgvo", "datenschutz", "cookie", "cookie-banner", "tracking", "consent", "analytics", "plausible", "umami", "recht", "digital omnibus"],
    layout: "col-span-1 md:col-span-1 row-span-1",
    aspect: "aspect-square",
    gradient: "from-[#1a1814] via-[#15110b] to-[#08070a]",
    accent: "text-refined-gold"
  },
  {
    id: 11,
    title: "Baukasten vs. eigene Webseite: Die ehrliche 3-Jahres-Rechnung",
    excerpt: "Webflow vs. Premium-Webseite. Echte Markt-Preise, Break-Even-Punkt, Hidden Costs. Wann sich Premium für Coaches wirklich lohnt.",
    category: "Kosten & Preise",
    date: "Mai 2026",
    readTime: "8 Min",
    image: "/blog/baukasten-vs-eigene-webseite-kosten-2026/cover.jpg",
    slug: "/blog/baukasten-vs-eigene-webseite-kosten-2026",
    keywords: ["kosten", "preis", "preise", "webflow", "baukasten", "vergleich", "break-even", "hidden costs", "3-jahres-rechnung"],
    layout: "col-span-1 md:col-span-1 row-span-1",
    aspect: "aspect-square",
    gradient: "from-[#2E2B26] via-[#1a1612] to-[#08070a]",
    accent: "text-refined-gold"
  },
  {
    id: 4,
    title: "99% aller Selbstständigen nutzen ChatGPT falsch",
    excerpt: "Fehlender Kontext, unstimmige Sprache, ein Textwall der nicht zu dir passt. Warum Custom GPTs mit klaren Rollen der echte Hebel für Solopreneure sind.",
    category: "KI & Tools",
    date: "April 2026",
    readTime: "9 Min",
    image: "/blog/chatgpt-custom-gpts-richtig-nutzen/cover.jpg",
    slug: "/blog/chatgpt-custom-gpts-richtig-nutzen",
    keywords: ["chatgpt", "custom gpt", "custom gpts", "gpts", "ki tools", "automatisierung", "prompt", "openai", "workflow", "solopreneur"],
    layout: "col-span-1 md:col-span-1 row-span-1",
    aspect: "aspect-square"
  },
  {
    id: 2,
    title: "Technik Setup für Online Coaches: Warum deine Präsenz am Equipment hängt.",
    excerpt: "Ein schlechtes Mikrofon zerstört selbst die tiefste energetische Übertragung. Wie du ortsunabhängig arbeitest, ohne an Qualität und Ausstrahlung zu verlieren.",
    category: "Business & Mentoring",
    date: "Januar 2026",
    readTime: "6 Min",
    image: "/blog/technik-setup-online-coach/cover.jpg",
    slug: "/blog/technik-setup-online-coach",
    keywords: ["equipment", "technik", "mikrofon", "kamera", "setup", "podcast", "video", "online coach", "studio", "licht", "homeoffice"],
    layout: "col-span-1 md:col-span-1 row-span-1",
    aspect: "aspect-square"
  },
  {
    id: 3,
    title: "Warum viele Business Mentoring Programme scheitern",
    excerpt: "Und warum klassische Schablonen für tief und relational arbeitende Menschen keine Lösung sind.",
    category: "Business & Mentoring",
    date: "Januar 2026",
    readTime: "8 Min",
    image: "/blog/warum-business-mentoring-programme-scheitern/cover.jpg",
    slug: "/blog/warum-business-mentoring-programme-scheitern",
    keywords: ["mentoring", "mentor", "coaching", "programme", "business", "positionierung", "begleitung", "gruppenprogramm"],
    layout: "col-span-1 md:col-span-1 row-span-1",
    aspect: "aspect-square"
  }
];

export default function BlogPage() {
  return (
    <div className="flex flex-col w-full bg-[#f5f3ee] min-h-screen selection:bg-deep-charcoal selection:text-white">
      
      {/* THE IMMERSIVE SCROLLYTELLING ANIMATION HEADER */}
      <TreeBookshelfScrollytelling />

      {/* BLOG TITLE DE-COUPLED FROM HEADER */}
      <section className="px-6 sm:px-12 md:px-24 mb-16 mt-24 max-w-[1400px] mx-auto w-full relative z-10">
        <ScrollReveal>
          <div className="flex flex-col gap-4">
            <h1 className="font-instrument text-deep-charcoal leading-[1.1] text-[clamp(2.5rem,5vw,5rem)]">
              Wissen & Mastermind
            </h1>
            <p className="text-deep-charcoal/70 text-lg max-w-[600px] font-satoshi">
              Artikel für kreative Visionäre, Pioniere und Macher. Substanz für den Aufbau deiner Marke und dein eigenes Wachstum.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* FEATURED STORY */}
      <section className="px-6 sm:px-12 md:px-24 mb-24 max-w-[1600px] mx-auto w-full">
        <ScrollReveal delay={0.1}>
          <Link href={featuredArticle.slug} className="group relative block w-full overflow-hidden rounded-[20px] md:rounded-[40px] aspect-square md:aspect-[21/9]">
            {/* Background Image Image */}
            <Image 
              src={featuredArticle.image} 
              alt={featuredArticle.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            
            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-700 group-hover:from-black/90"></div>
            
            {/* Gold Filter Hover Effect (Sabala Style) */}
            <div className="absolute inset-0 bg-refined-gold/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Content Container */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 flex flex-col justify-end">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-refined-gold mb-6">
                {featuredArticle.isPillar && (
                  <span className="bg-refined-gold/90 text-deep-charcoal px-3 py-1 rounded-full backdrop-blur-sm">Pillar-Hub</span>
                )}
                <span className="bg-refined-gold/10 px-3 py-1 rounded-full backdrop-blur-sm border border-refined-gold/20">{featuredArticle.category}</span>
                <span className="text-white/70">{featuredArticle.date}</span>
                <span className="text-white/70 hidden sm:inline-block">•</span>
                <span className="text-white/70 hidden sm:inline-block">{featuredArticle.readTime} Lesezeit</span>
              </div>
              
              <h2 className="font-instrument text-white text-[clamp(2rem,4vw,4rem)] leading-[1.1] mb-6 max-w-[1000px] group-hover:text-shadow-lg transition-all duration-500">
                {featuredArticle.title}
              </h2>
              
              <p className="text-white/80 font-satoshi text-base md:text-xl max-w-[700px] leading-relaxed hidden md:block">
                {featuredArticle.excerpt}
              </p>
            </div>
          </Link>
        </ScrollReveal>
      </section>

      {/* SUCHE + THEMEN-FILTER + ARTIKEL-GRID */}
      <BlogSearch featured={featuredArticle} articles={articles} />

      {/* ABSCHLUSS-CTA: Akademie-Newsletter (Lead-Capture fuer kuenftige Kurse) */}
      <AcademyNewsletter />

    </div>
  );
}
