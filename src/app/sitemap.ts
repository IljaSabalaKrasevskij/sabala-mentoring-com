import type { MetadataRoute } from "next";

const baseUrl = "https://sabala-mentoring.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/webseiten", priority: 0.9, changeFrequency: "monthly" },
    { path: "/akademie", priority: 0.9, changeFrequency: "monthly" },
    { path: "/mitentwickelt", priority: 0.8, changeFrequency: "monthly" },
    { path: "/ueber-mich", priority: 0.9, changeFrequency: "monthly" },
    { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" },
    { path: "/termin-buchen", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/gpt-team", priority: 0.7, changeFrequency: "monthly" },
    { path: "/brandguide", priority: 0.6, changeFrequency: "monthly" },
    { path: "/meditation", priority: 0.6, changeFrequency: "monthly" },
    { path: "/impressum", priority: 0.3, changeFrequency: "yearly" },
    { path: "/datenschutz", priority: 0.3, changeFrequency: "yearly" },
    { path: "/agb", priority: 0.3, changeFrequency: "yearly" },
  ];

  const blogPosts: Array<{ slug: string; priority: number; isPillar?: boolean }> = [
    { slug: "seo-und-geo-fuer-personal-brands-2026", priority: 0.9, isPillar: true },
    { slug: "chatgpt-custom-gpts-richtig-nutzen", priority: 0.7 },
    { slug: "technik-setup-online-coach", priority: 0.7 },
    { slug: "warum-business-mentoring-programme-scheitern", priority: 0.7 },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${baseUrl}${r.path}`,
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...blogPosts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
  ];
}
