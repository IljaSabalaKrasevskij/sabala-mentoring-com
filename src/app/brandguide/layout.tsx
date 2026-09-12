import type { Metadata } from "next";

/* Eigene Metadaten. Bis 12.9.2026 hatte /brandguide keine und erbte damit Titel
   und Beschreibung der Startseite, was fuer Google wie eine Dublette aussieht. */
export const metadata: Metadata = {
  title: "Brand Guidelines",
  description:
    "Farben, Typografie, Bildsprache und Interface-Regeln von Sabala Studios. Die Design-Grundlage hinter jedem Projekt.",
  alternates: { canonical: "/brandguide" },
  openGraph: {
    title: "Brand Guidelines · Sabala Studios",
    description:
      "Farben, Typografie, Bildsprache und Interface-Regeln. Die Design-Grundlage hinter jedem Sabala-Projekt.",
    url: "/brandguide",
    type: "website",
  },
};

export default function BrandguideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
