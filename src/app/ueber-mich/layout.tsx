import type { Metadata } from "next";

/* Eigene Metadaten. Bis 12.9.2026 hatte /ueber-mich keine und erbte damit Titel
   und Beschreibung der Startseite, was fuer Google wie eine Dublette aussieht. */
export const metadata: Metadata = {
  title: "Ilja Krasevskij · Web Developer und Dozent",
  description:
    "Vom Trainer zum Entwickler. Ilja Krasevskij baut Premium-Webauftritte aus eigenem Code und bringt Teams bei, wie sie mit KI wirklich arbeiten.",
  alternates: { canonical: "/ueber-mich" },
  openGraph: {
    title: "Ilja Krasevskij · Web Developer und Dozent",
    description:
      "Ein Ansprechpartner statt Agentur-Apparat. Wer hinter Sabala Studios steht und welche Stationen die heutige Arbeit geprägt haben.",
    url: "/ueber-mich",
    type: "website",
  },
};

export default function UeberMichLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
