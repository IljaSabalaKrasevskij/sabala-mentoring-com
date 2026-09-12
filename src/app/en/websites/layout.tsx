import type { Metadata } from "next";
import { TEXTE } from "@/app/webseiten/texte";

const T = TEXTE.en;

/* Eigene Metadaten und ein hreflang-Paar. Ohne das Paar haelt Google die beiden
   Fassungen fuer doppelten Inhalt und rankt keine von beiden. */
export const metadata: Metadata = {
  title: T.meta.title,
  description: T.meta.description,
  alternates: {
    canonical: "/en/websites",
    languages: { "de-DE": "/webseiten", "en": "/en/websites", "x-default": "/webseiten" },
  },
  openGraph: { title: T.meta.ogTitle, description: T.meta.ogDescription, url: "/en/websites", type: "website", locale: "en_US" },
};

export default function WebsitesLayout({ children }: { children: React.ReactNode }) {
  return <div lang="en">{children}</div>;
}
