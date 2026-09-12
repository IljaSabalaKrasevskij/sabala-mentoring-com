import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";

const baseUrl = "https://sabala-mentoring.com";

// Blogartikel kommen direkt aus den Ordnern unter src/app/blog. Die frueher gepflegte
// Liste hatte 4 von 13 Artikeln: jeder neue Artikel fehlte, bis jemand daran dachte.
const blogSlugs = fs
  .readdirSync(path.join(process.cwd(), "src/app/blog"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/webseiten", priority: 0.9, changeFrequency: "monthly" },
    { path: "/en/websites", priority: 0.8, changeFrequency: "monthly" },
    { path: "/akademie", priority: 0.9, changeFrequency: "monthly" },
    { path: "/beratung", priority: 0.9, changeFrequency: "weekly" },
    { path: "/mitentwickelt", priority: 0.8, changeFrequency: "monthly" },
    { path: "/ueber-mich", priority: 0.9, changeFrequency: "monthly" },
    { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" },
    { path: "/akademie-hub", priority: 0.8, changeFrequency: "monthly" },
    { path: "/termin-buchen", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/shop", priority: 0.7, changeFrequency: "monthly" },
    { path: "/webdesign-os", priority: 0.7, changeFrequency: "monthly" },
    { path: "/gpt-team", priority: 0.7, changeFrequency: "monthly" },
    { path: "/mooni-voice", priority: 0.6, changeFrequency: "monthly" },
    { path: "/brandguide", priority: 0.6, changeFrequency: "monthly" },
    { path: "/meditation", priority: 0.6, changeFrequency: "monthly" },
    { path: "/podcast", priority: 0.5, changeFrequency: "monthly" },
    { path: "/impressum", priority: 0.3, changeFrequency: "yearly" },
    { path: "/datenschutz", priority: 0.3, changeFrequency: "yearly" },
    { path: "/agb", priority: 0.3, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${baseUrl}${r.path}`,
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: slug === "seo-und-geo-fuer-personal-brands-2026" ? 0.9 : 0.7,
    })),
  ];
}
