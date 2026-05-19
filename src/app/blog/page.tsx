import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import TreeBookshelfScrollytelling from "@/components/ui/TreeBookshelfScrollytelling";
import { AuditRequestForm } from "@/components/blog/AuditRequestForm";
import { Compass, Sparkles } from "lucide-react";

const featuredArticle = {
  title: "SEO und Generative Engine Optimization (GEO). Wie deine Personal Brand 2026 in Google und ChatGPT gefunden wird.",
  excerpt: "Pillar-Hub für Personal Brands. Sechs SEO-Tools, vier GEO-Methoden, ein 30-Minuten-Sprint. ICP-validiert. Kein Agentur-Sprech.",
  category: "SEO & GEO",
  date: "Mai 2026",
  readTime: "14 Min",
  image: "/blog/seo-und-geo-fuer-personal-brands-2026/cover.jpg",
  slug: "/blog/seo-und-geo-fuer-personal-brands-2026",
  isPillar: true
};

const articles = [
  {
    id: 2,
    title: "Technik Setup für Online Coaches: Warum deine Präsenz am Equipment hängt.",
    excerpt: "Ein schlechtes Mikrofon zerstört selbst die tiefste energetische Übertragung. Wie du ortsunabhängig arbeitest, ohne an Qualität und Ausstrahlung zu verlieren.",
    category: "Business",
    date: "Januar 2026",
    readTime: "6 Min",
    image: "/blog/technik-setup-online-coach/cover.jpg",
    slug: "/blog/technik-setup-online-coach",
    layout: "col-span-1 md:col-span-1 row-span-1",
    aspect: "aspect-square"
  },
  {
    id: 3,
    title: "Warum viele Business Mentoring Programme scheitern",
    excerpt: "Und warum klassische Schablonen für tief und relational arbeitende Menschen keine Lösung sind.",
    category: "Business",
    date: "Januar 2026",
    readTime: "8 Min",
    image: "/blog/warum-business-mentoring-programme-scheitern/cover.jpg",
    slug: "/blog/warum-business-mentoring-programme-scheitern",
    layout: "col-span-1 md:col-span-1 row-span-1",
    aspect: "aspect-square"
  },
  {
    id: 4,
    title: "99% aller Selbstständigen nutzen ChatGPT falsch",
    excerpt: "Fehlender Kontext, unstimmige Sprache, ein Textwall der nicht zu dir passt. Warum Custom GPTs mit klaren Rollen der echte Hebel für Solopreneure sind.",
    category: "KI & Workflow",
    date: "April 2026",
    readTime: "9 Min",
    image: "/blog/chatgpt-custom-gpts-richtig-nutzen/cover.jpg",
    slug: "/blog/chatgpt-custom-gpts-richtig-nutzen",
    layout: "col-span-1 md:col-span-1 row-span-2",
    aspect: "aspect-[2/3]"
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

      {/* ASYMMETRIC BENTO GRID (MAGAZINE STYLE) */}
      <section className="px-6 sm:px-12 md:px-24 mb-32 max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 auto-rows-auto">
          {articles.map((article, index) => (
            <ScrollReveal 
              key={article.id} 
              delay={index * 0.1}
              className={`group flex flex-col ${article.layout}`}
            >
              <Link href={article.slug || `/blog/article-${article.id}`} className="block h-full group">
                <div className={`relative ${article.aspect} w-full mb-6 overflow-hidden bg-warm-canvas`}>
                  {/* Image */}
                  <Image 
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:grayscale"
                  />
                  {/* Subtle Gold Layer on Hover */}
                  <div className="absolute inset-0 bg-refined-gold/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Category Badge Bubble */}
                  <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-pure-surface bg-deep-charcoal/90 backdrop-blur-md px-3 py-1 rounded-full opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {article.category}
                  </div>
                </div>

                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-soft-stone mb-3">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-refined-gold/50"></span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-instrument text-2xl md:text-3xl text-deep-charcoal mb-4 leading-snug group-hover:text-refined-gold transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-warm-steel text-sm leading-relaxed mt-auto">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* AUDIT-LEAD-MAGNET */}
      <section className="py-24 md:py-32 px-6 sm:px-12 md:px-24 bg-[#2E2B26] text-white border-t border-white/5 rounded-t-[40px] shadow-[0_-40px_60px_rgba(26,26,24,0.02)]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <Compass className="w-5 h-5 text-refined-gold" />
              <span className="font-mono text-xs uppercase tracking-widest text-refined-gold">Kostenloses Premium-Audit</span>
            </div>
            <h2 className="font-instrument text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] mb-6">
              Gib mir deine Webseite. Ich gebe dir den Blick eines Premium-Brand-Mentors zurück.
            </h2>
            <p className="text-white/70 font-satoshi text-lg leading-relaxed mb-8">
              Ein persönlicher Audit-Brief mit den drei größten Hebeln deines Auftritts. Was trägt, was schwächt, was fehlt. Substanz statt Funnel-Floskeln. In den kommenden Tagen direkt in deinem Postfach.
            </p>
            <ul className="space-y-3 font-satoshi text-white/60">
              <li className="flex items-start gap-3"><Sparkles className="w-4 h-4 text-refined-gold flex-shrink-0 mt-1" /><span>Drei konkrete Hebel, sortiert nach Wirkungsgrad</span></li>
              <li className="flex items-start gap-3"><Sparkles className="w-4 h-4 text-refined-gold flex-shrink-0 mt-1" /><span>Erste Einschätzung von SEO, GEO und E-E-A-T-Signalen</span></li>
              <li className="flex items-start gap-3"><Sparkles className="w-4 h-4 text-refined-gold flex-shrink-0 mt-1" /><span>Klarer Fokus: du weißt sofort, womit du den größten Hebel ziehst</span></li>
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-pure-surface/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm">
              <AuditRequestForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
