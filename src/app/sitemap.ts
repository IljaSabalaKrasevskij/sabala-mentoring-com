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
    { path: "/ueber-mich", priority: 0.9, changeFrequency: "monthly" },
    { path: "/premium-angebot", priority: 0.9, changeFrequency: "monthly" },
    { path: "/special-launch-angebot", priority: 0.8, changeFrequency: "monthly" },
    { path: "/referenzen", priority: 0.8, changeFrequency: "monthly" },
    { path: "/termin-buchen", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/podcast", priority: 0.7, changeFrequency: "weekly" },
    { path: "/gpt-team", priority: 0.7, changeFrequency: "monthly" },
    { path: "/brandguide", priority: 0.6, changeFrequency: "monthly" },
    { path: "/meditation", priority: 0.6, changeFrequency: "monthly" },
    { path: "/impressum", priority: 0.3, changeFrequency: "yearly" },
    { path: "/datenschutz", priority: 0.3, changeFrequency: "yearly" },
    { path: "/agb", priority: 0.3, changeFrequency: "yearly" },
  ];

  const blogPosts = [
    "chatgpt-custom-gpts-richtig-nutzen",
    "technik-setup-online-coach",
    "warum-business-mentoring-programme-scheitern",
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${baseUrl}${r.path}`,
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...blogPosts.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
