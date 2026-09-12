import type { Metadata } from "next";

/* Eigene Metadaten. Bis 12.9.2026 hatte /gpt-team keine und erbte damit Titel
   und Beschreibung der Startseite, was fuer Google wie eine Dublette aussieht. */
export const metadata: Metadata = {
  title: "Dein KI-Team aus fünf Custom GPTs",
  description:
    "Runa, Lia, Siris, Juris und Maris. Fünf Custom GPTs für Recherche, Texte, Struktur und Recht, gebaut für den täglichen Einsatz im Unternehmen.",
  alternates: { canonical: "/gpt-team" },
  openGraph: {
    title: "Dein KI-Team aus fünf Custom GPTs",
    description:
      "Fünf spezialisierte Custom GPTs, die Recherche, Texte, Struktur und Recht übernehmen, gebaut für den täglichen Einsatz im Unternehmen.",
    url: "/gpt-team",
    type: "website",
  },
};

export default function GptTeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
