import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";

const baseUrl = "https://sabala-mentoring.com";
const blogDir = path.join(process.cwd(), "src/app/blog");

// Blogartikel kommen direkt aus den Ordnern unter src/app/blog. Die frueher gepflegte
// Liste hatte 4 von 13 Artikeln: jeder neue Artikel fehlte, bis jemand daran dachte.
const blogSlugs = fs
  .readdirSync(blogDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && fs.existsSync(path.join(blogDir, d.name, "page.tsx")))
  .map((d) => d.name);

// lastmod sagt Suchmaschinen, wann sich eine Seite zuletzt wirklich geändert hat. Bing entscheidet danach,
// was es neu holt. Bis 24.11.2026 trug hier jede Seite das Datum des letzten Baus, damit war das Feld wertlos.
// Artikel pflegen sich selbst: das späteste Datum aus datePublished und dateModified in ihrer page.tsx.
function artikelDatum(slug: string): string | undefined {
  const quelltext = fs.readFileSync(path.join(blogDir, slug, "page.tsx"), "utf8");
  return [...quelltext.matchAll(/"?date(?:Published|Modified)"?\s*[:=]\s*"(\d{4}-\d{2}-\d{2})"/g)]
    .map((m) => m[1])
    .sort()
    .pop();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const artikel = blogSlugs.map((slug) => ({ slug, datum: artikelDatum(slug) }));
  const neuesterArtikel = artikel.map((a) => a.datum ?? "").sort().pop() ?? "";

  // Feste Seiten: `geaendert` ist der Tag der letzten inhaltlichen Änderung. Wer eine Seite inhaltlich ändert,
  // trägt hier den Tag ein, an dem die Änderung live geht. Eine neue Seite bekommt den Tag ihres Live-Gangs.
  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    geaendert: string;
  }> = [
    { path: "", priority: 1.0, changeFrequency: "weekly", geaendert: "2026-11-12" },
    { path: "/webseiten", priority: 0.9, changeFrequency: "monthly", geaendert: "2026-11-12" },
    { path: "/en/websites", priority: 0.8, changeFrequency: "monthly", geaendert: "2026-11-12" },
    { path: "/akademie", priority: 0.9, changeFrequency: "monthly", geaendert: "2026-11-12" },
    { path: "/beratung", priority: 0.9, changeFrequency: "weekly", geaendert: "2026-11-11" },
    { path: "/webinar", priority: 0.9, changeFrequency: "weekly", geaendert: "2026-11-11" },
    { path: "/claude-code", priority: 0.9, changeFrequency: "monthly", geaendert: "2026-11-24" },
    { path: "/claude-code/startpaket", priority: 0.8, changeFrequency: "monthly", geaendert: "2026-11-24" },
    { path: "/claude-code/skill-paket", priority: 0.8, changeFrequency: "monthly", geaendert: "2026-11-17" },
    { path: "/mitentwickelt", priority: 0.8, changeFrequency: "monthly", geaendert: "2026-09-12" },
    { path: "/ueber-mich", priority: 0.9, changeFrequency: "monthly", geaendert: "2026-11-12" },
    { path: "/case-studies", priority: 0.8, changeFrequency: "monthly", geaendert: "2026-11-12" },
    { path: "/akademie-hub", priority: 0.8, changeFrequency: "monthly", geaendert: "2026-11-27" },
    { path: "/special-offer-2026", priority: 0.7, changeFrequency: "weekly", geaendert: "2026-11-27" },
    { path: "/akademie/webseiten-mit-claude-code", priority: 0.8, changeFrequency: "monthly", geaendert: "2026-11-12" },
    { path: "/termin-buchen", priority: 0.8, changeFrequency: "monthly", geaendert: "2026-11-12" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly", geaendert: "2026-11-12" },
    { path: "/ressourcen", priority: 0.7, changeFrequency: "monthly", geaendert: "2026-11-15" },
    { path: "/mooni-voice", priority: 0.6, changeFrequency: "monthly", geaendert: "2026-11-11" },
    { path: "/impressum", priority: 0.3, changeFrequency: "yearly", geaendert: "2026-08-15" },
    { path: "/datenschutz", priority: 0.3, changeFrequency: "yearly", geaendert: "2026-11-17" },
    { path: "/daten-loeschen", priority: 0.3, changeFrequency: "yearly", geaendert: "2026-11-06" },
    { path: "/agb", priority: 0.3, changeFrequency: "yearly", geaendert: "2026-08-15" },
  ];
  // Startseite und Blog-Übersicht zeigen die neuesten Artikel, sie ändern sich also mit jedem Artikel.
  const zeigtArtikel = ["", "/blog"];

  return [
    ...staticRoutes.map((r) => ({
      url: `${baseUrl}${r.path}`,
      lastModified: zeigtArtikel.includes(r.path) && neuesterArtikel > r.geaendert ? neuesterArtikel : r.geaendert,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...artikel.map(({ slug, datum }) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: datum,
      changeFrequency: "monthly" as const,
      priority: slug === "seo-und-geo-fuer-personal-brands-2026" ? 0.9 : 0.7,
    })),
  ];
}
