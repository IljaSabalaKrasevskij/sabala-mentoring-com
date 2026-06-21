"use client";

import { useState, useMemo } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";

type Article = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  slug?: string;
  layout?: string;
  aspect?: string;
  gradient?: string;
  accent?: string;
  keywords?: string[];
};

// Such- + Themen-Filter über die Blog-Artikel. Filtert client-seitig nach
// Kategorie (Themen-Chips) und Volltext (Titel + Excerpt + Kategorie).
export function BlogSearch({ featured, articles }: { featured: Article; articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Alle");

  // Featured-Artikel ist mit durchsuchbar, sonst findet z.B. "SEO" nichts.
  const pool = useMemo(() => [featured, ...articles], [featured, articles]);

  const categories = useMemo(
    () => ["Alle", ...Array.from(new Set(pool.map((a) => a.category)))],
    [pool],
  );

  // Bindestriche wie Leerzeichen behandeln: "ki-tools" findet "ki tools", "lock-in" = "lock in".
  const norm = (s: string) => s.toLowerCase().replace(/-/g, " ");
  const q = norm(query.trim());
  const isFiltered = q !== "" || category !== "Alle";

  const match = (a: Article) => {
    if (category !== "Alle" && a.category !== category) return false;
    if (!q) return true;
    const haystack = norm(`${a.title} ${a.excerpt} ${a.category} ${(a.keywords ?? []).join(" ")}`);
    return haystack.includes(q);
  };

  // Ohne Filter: Grid = Artikel (Featured ist der Hero oben). Mit Filter: ganzer Pool inkl. Featured.
  const filtered = (isFiltered ? pool : articles).filter(match);

  return (
    <>
      {/* SUCHE + THEMEN-FILTER */}
      <section className="px-6 sm:px-12 md:px-24 mb-12 max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col gap-6">
          <div className="relative max-w-[540px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-deep-charcoal/40 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nach Thema oder Stichwort suchen ..."
              aria-label="Blog durchsuchen"
              className="w-full bg-white/70 border border-deep-charcoal/15 rounded-full pl-14 pr-12 py-4 font-satoshi text-deep-charcoal placeholder-deep-charcoal/40 focus:outline-none focus:border-refined-gold focus:bg-white transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Suche zurücksetzen"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-deep-charcoal/40 hover:text-deep-charcoal hover:bg-deep-charcoal/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
                  category === c
                    ? "bg-deep-charcoal text-pure-surface border-deep-charcoal"
                    : "bg-transparent text-deep-charcoal/70 border-deep-charcoal/15 hover:border-refined-gold hover:text-deep-charcoal"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-deep-charcoal/50">
            {isFiltered
              ? `${filtered.length} ${filtered.length === 1 ? "Treffer" : "Treffer"}`
              : `${articles.length} Artikel`}
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="px-6 sm:px-12 md:px-24 mb-32 max-w-[1400px] mx-auto w-full">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-instrument text-2xl md:text-3xl text-deep-charcoal mb-3">Nichts gefunden.</p>
            <p className="font-satoshi text-warm-steel">
              Versuch ein anderes Stichwort, oder{" "}
              <button onClick={() => { setQuery(""); setCategory("Alle"); }} className="text-refined-gold underline-offset-4 hover:underline">
                zeig mir alle Artikel
              </button>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 auto-rows-auto">
            {filtered.map((article, index) => (
              <ScrollReveal
                key={article.id}
                delay={index * 0.1}
                className={`group flex flex-col ${article.layout ?? ""}`}
              >
                <Link href={article.slug || `/blog/article-${article.id}`} className="block h-full group">
                  <div className={`relative ${article.aspect ?? "aspect-square"} w-full mb-6 overflow-hidden bg-warm-canvas rounded-[12px]`}>
                    {article.image ? (
                      <>
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:grayscale"
                        />
                        <div className="absolute inset-0 bg-refined-gold/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </>
                    ) : (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient ?? "from-[#2E2B26] via-[#15110b] to-[#08070a]"}`} />
                        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-refined-gold/[0.18] blur-[120px] rounded-full pointer-events-none" />
                        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                          <span className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-refined-gold mb-3 font-bold">{article.category}</span>
                          <h4 className="font-instrument text-pure-surface text-xl md:text-2xl leading-[1.15] group-hover:text-refined-gold transition-colors duration-500">
                            {article.title.length > 65 ? article.title.slice(0, 62) + "…" : article.title}
                          </h4>
                        </div>
                        <div className="absolute inset-0 bg-refined-gold/[0.12] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      </>
                    )}

                    {article.image && (
                      <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-pure-surface bg-deep-charcoal/90 backdrop-blur-md px-3 py-1 rounded-full opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        {article.category}
                      </div>
                    )}
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
        )}
      </section>
    </>
  );
}
