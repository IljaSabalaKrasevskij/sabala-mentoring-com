import type { Metadata } from "next";

/* Eigene Metadaten. Bis 12.9.2026 hatte /mitentwickelt keine und erbte damit Titel
   und Beschreibung der Startseite, was fuer Google wie eine Dublette aussieht. */
export const metadata: Metadata = {
  title: "Co-Development: gemeinsam zu Ende bauen",
  description:
    "Du hast ein Projekt angefangen und kommst nicht weiter. Wir bauen es gemeinsam fertig und richten KI so ein, dass sie in deinem Alltag trägt.",
  alternates: { canonical: "/mitentwickelt" },
  openGraph: {
    title: "Co-Development: gemeinsam zu Ende bauen",
    description:
      "Dein Projekt weiterbauen statt neu anfangen. Drei Beispiele aus dem eigenen Dashboard zeigen, wie das in der Praxis aussieht.",
    url: "/mitentwickelt",
    type: "website",
  },
};

export default function MitentwickeltLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
