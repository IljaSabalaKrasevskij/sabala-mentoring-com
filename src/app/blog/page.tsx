import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import TreeBookshelfScrollytelling from "@/components/ui/TreeBookshelfScrollytelling";

const featuredArticle = {
  title: "Technik Setup für Online Coaches: Warum deine Präsenz am Equipment hängt.",
  excerpt: "Ein schlechtes Mikrofon zerstört selbst die tiefste energetische Übertragung. Wie du ortsunabhängig arbeitest, ohne an Qualität und Ausstrahlung zu verlieren.",
  category: "Business",
  date: "Januar 2026",
  readTime: "6 Min",
  image: "https://picsum.photos/seed/sabala_office/1600/900",
  slug: "/blog/technik-setup-online-coach"
};

const articles = [
  {
    id: 2,
    title: "Warum viele Business Mentoring Programme scheitern",
    excerpt: "Und warum klassische Schablonen für tief und relational arbeitende Menschen keine Lösung sind.",
    category: "Business",
    date: "Januar 2025",
    readTime: "8 Min",
    image: "https://picsum.photos/seed/mentoring_fail/600/600",
    slug: "/blog/warum-business-mentoring-programme-scheitern",
    layout: "col-span-1 md:col-span-1 row-span-1",
    aspect: "aspect-square"
  },
  {
    id: 3,
    title: "Finanzielle Freiheit: Warum wir unser Geld-Set-up neu denken müssen",
    excerpt: "Reisen und arbeiten ist das eine. Wirklich frei über sein Geld verfügen das andere. Meine Yuh Empfehlung.",
    category: "Finance",
    date: "Januar 2026",
    readTime: "6 Min",
    image: "https://picsum.photos/seed/nomad_finance/800/800",
    slug: "/blog/finanzielle-freiheit-yuh",
    layout: "col-span-1 md:col-span-1 row-span-2",
    aspect: "aspect-[2/3]"
  }
];

const categories = ["Alle", "Gedanken", "Business", "Design", "Meditation", "Leben"];

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
              Unterstützung für Mentoren, Coaches, Berater und Trainer. Interessante Artikel für den Aufbau deiner Marke und dein eigenes Wachstum.
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
              <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-refined-gold mb-6">
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

      {/* FILTER STICKY BAR */}
      <section className="px-6 sm:px-12 md:px-24 mb-16 max-w-[1400px] mx-auto w-full sticky top-0 z-20 bg-pure-surface/90 backdrop-blur-md py-4 border-y border-whisper-border/50">
        <ScrollReveal>
          <div className="flex items-center gap-6 md:gap-10 overflow-x-auto hide-scrollbar whitespace-nowrap">
            {categories.map((cat, index) => (
              <button 
                key={index} 
                className={`font-mono text-sm tracking-widest uppercase transition-colors duration-300 ${
                  index === 0 ? "text-deep-charcoal border-b border-deep-charcoal pb-1" : "text-soft-stone hover:text-refined-gold border-b border-transparent hover:border-refined-gold pb-1"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
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

      {/* NEWSLETTER / CTA */}
      <section className="py-32 md:py-48 px-6 sm:px-12 md:px-24 bg-night-foundation text-night-text text-center border-t border-white/5 rounded-t-[40px] shadow-[0_-40px_60px_rgba(26,26,24,0.02)]">
        <div className="max-w-[700px] mx-auto">
          <ScrollReveal>
            <div className="w-12 h-12 mx-auto mb-8 text-night-gold border border-white/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <h2 className="font-instrument text-[clamp(2rem,4vw,3.5rem)] mb-6">Die Essenz frisch<br/> in dein Postfach.</h2>
            <p className="text-night-secondary font-satoshi leading-relaxed mb-10">
              Einmal im Monat destilliere ich die wichtigsten Erkenntnisse aus Deep Work, Positionierung und Design in einen Brief an meinen engsten Kreis. Kein Spalier. Nur Wert.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-[500px] mx-auto">
              <input 
                type="email" 
                placeholder="Deine E-Mail Adresse" 
                className="flex-grow bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-night-gold transition-colors font-satoshi"
                required
              />
              <button 
                type="submit"
                className="bg-night-gold hover:bg-white text-night-foundation px-8 py-4 rounded-full font-medium transition-colors whitespace-nowrap"
              >
                Eintragen
              </button>
            </form>
            <p className="text-xs font-mono text-white/30 uppercase tracking-widest mt-6">
              Kein Spam. Abmeldung jederzeit möglich.
            </p>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
