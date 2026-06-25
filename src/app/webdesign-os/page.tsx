import WebDesignOsView from "@/components/webdesign-os/WebDesignOsView";

export const metadata = {
  title: "Sabala Web Design OS · Bau bessere Webseiten mit Claude Code",
  description:
    "Das komplette Setup, mit dem ich Premium-Webseiten baue. Alle Skills, Anleitungen und Inspiration fuer Claude Code. In einer Stunde eingerichtet, auf deine Marke gedreht.",
  alternates: { canonical: "/webdesign-os" },
  openGraph: {
    title: "Sabala Web Design OS · Bau bessere Webseiten mit Claude Code",
    description:
      "Alle Skills, mit denen ich Premium-Webseiten baue. In einer Stunde eingerichtet, auf deine Marke gedreht.",
    url: "/webdesign-os",
    locale: "de_DE",
    images: [
      {
        url: "/webdesign-os/og-webdesign-os.jpg",
        width: 1200,
        height: 630,
        alt: "Sabala Web Design OS · Dein Setup für bessere Webseiten",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabala Web Design OS · Bau bessere Webseiten mit Claude Code",
    description:
      "Alle Skills, mit denen ich Premium-Webseiten baue. In einer Stunde eingerichtet, auf deine Marke gedreht.",
    images: ["/webdesign-os/og-webdesign-os.jpg"],
  },
};

export default function WebDesignOsPage() {
  return <WebDesignOsView />;
}
