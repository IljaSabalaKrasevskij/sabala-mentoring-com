import type { Metadata } from "next";
import { TEXTE } from "./texte";

const T = TEXTE.de;

/* Eigene Metadaten fuer die Verkaufsseite. Bis 12.9.2026 hatte /webseiten
   keine, sie erbte Titel und Beschreibung der Startseite, obwohl sie mit
   Prioritaet 0.9 in der Sitemap steht. Die Texte kommen seit 14.9.2026 aus
   texte.ts wie bei /en/websites, vorher standen sie hier ein zweites Mal. */
export const metadata: Metadata = {
  title: T.meta.title,
  description: T.meta.description,
  alternates: {
    canonical: "/webseiten",
    languages: { "de-DE": "/webseiten", "en": "/en/websites", "x-default": "/webseiten" },
  },
  openGraph: {
    title: T.meta.ogTitle,
    description: T.meta.ogDescription,
    url: "/webseiten",
    type: "website",
  },
};

export default function WebseitenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
