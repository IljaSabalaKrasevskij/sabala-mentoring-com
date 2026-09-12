import type { Metadata } from "next";

/* Eigene Metadaten fuer die Verkaufsseite. Bis 12.9.2026 hatte /webseiten
   keine, sie erbte Titel und Beschreibung der Startseite, obwohl sie mit
   Prioritaet 0.9 in der Sitemap steht. */
export const metadata: Metadata = {
  title: "High-End Webdesign und Webentwicklung",
  description:
    "Premium-Webauftritte aus eigenem Code: eigenständig im Design, in unter zwei Sekunden geladen, sichtbar bei Google und in KI-Antworten. Kostenlose Potenzial-Analyse mit Website-Check, Wettbewerbsanalyse und Gespräch.",
  alternates: {
    canonical: "/webseiten",
    languages: { "de-DE": "/webseiten", "en": "/en/websites", "x-default": "/webseiten" },
  },
  openGraph: {
    title: "High-End Webdesign und Webentwicklung · Sabala Studios",
    description:
      "Deine Webseite, gebaut um den Besten deiner Nische zu schlagen. Eigener Code, Ladezeit unter zwei Sekunden, SEO und GEO, ein Ansprechpartner.",
    url: "/webseiten",
    type: "website",
  },
};

export default function WebseitenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
