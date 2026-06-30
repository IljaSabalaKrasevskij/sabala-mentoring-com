import OpenSourceView from "@/components/open-source/OpenSourceView";

export const metadata = {
  title: "Open Source Projekte · Freie Werkzeuge aus der Sabala-Werkstatt",
  description:
    "Die freien, quelloffenen Projekte aus der Sabala-Werkstatt, lokal, privat, ohne Abo. Aktuell: Mooni Voice, lokale Sprache-zu-Text für den Mac.",
  alternates: { canonical: "/open-source-projekte" },
  openGraph: {
    title: "Open Source Projekte · Sabala",
    description: "Freie, quelloffene Werkzeuge aus der Sabala-Werkstatt. Lokal, privat, ohne Abo.",
    url: "/open-source-projekte",
    locale: "de_DE",
    images: [
      {
        url: "/images/og-mooni-voice.png",
        width: 1200,
        height: 630,
        alt: "Open Source Projekte · Mooni Voice",
      },
    ],
  },
};

export default function OpenSourceProjektePage() {
  return <OpenSourceView />;
}
