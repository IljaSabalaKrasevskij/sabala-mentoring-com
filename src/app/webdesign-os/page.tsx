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
  },
};

export default function WebDesignOsPage() {
  return <WebDesignOsView />;
}
