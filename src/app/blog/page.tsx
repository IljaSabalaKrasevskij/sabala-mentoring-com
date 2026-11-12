import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import TreeBookshelfScrollytelling from "@/components/ui/TreeBookshelfScrollytelling";
import { BlogSearch } from "@/components/blog/BlogSearch";
import AcademyNewsletter from "@/components/akademie/AcademyNewsletter";
import { articles, featuredArticle } from "@/lib/blog-artikel";

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
          <Link href={featuredArticle.slug} className="group relative grid w-full grid-cols-1 overflow-hidden rounded-[20px] md:rounded-[40px]">
            {/* Gibt die Mindesthöhe vor (Quadrat am Handy, 21:9 ab Tablet). Der Text liegt in derselben Zelle:
                Braucht er mehr Platz, wächst die Karte mit, statt ihn oben abzuschneiden.
                w-full und self-start: Die Höhe folgt der Breite, nie umgekehrt. Die Spalte ist fest eine Kartenbreite (grid-cols-1). */}
            <span aria-hidden className="col-start-1 row-start-1 w-full self-start aspect-square md:aspect-[21/9]" />
            {/* Background Image Image */}
            <Image 
              src={featuredArticle.image} 
              alt={featuredArticle.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            
            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/45 transition-opacity duration-700 group-hover:from-black/90"></div>
            
            {/* Gold Filter Hover Effect (Sabala Style) */}
            <div className="absolute inset-0 bg-refined-gold/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Content Container */}
            <div className="relative col-start-1 row-start-1 flex w-full min-w-0 flex-col justify-end self-end p-8 md:p-16 md:pt-8 lg:p-24 lg:pt-8">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-refined-gold mb-6">
                {featuredArticle.isPillar && (
                  <span className="bg-refined-gold/90 text-deep-charcoal px-3 py-1 rounded-full backdrop-blur-sm">Pillar-Hub</span>
                )}
                <span className="bg-refined-gold/10 px-3 py-1 rounded-full backdrop-blur-sm border border-refined-gold/20">{featuredArticle.category}</span>
                <span className="text-white/90">{featuredArticle.date}</span>
                <span className="text-white/90 hidden sm:inline-block">•</span>
                <span className="text-white/90 hidden sm:inline-block">{featuredArticle.readTime} Lesezeit</span>
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
