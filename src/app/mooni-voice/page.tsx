import MooniVoiceView from "@/components/mooni-voice/MooniVoiceView";

export const metadata = {
  title: "Mooni Voice · Lokale Sprache-zu-Text für den Mac (gratis & open source)",
  description:
    "Mooni Voice macht aus deiner Stimme Text, in jeder App auf dem Mac, auch in Claude Code, Terminal & Co. Lokal, privat, mehrsprachig. Gratis & Open Source (ein Fork von Handy).",
  alternates: { canonical: "/open-source-projekte/mooni-voice" },
  openGraph: {
    title: "Mooni Voice · Sprich. Es steht da. Überall.",
    description:
      "Lokale Sprache-zu-Text für den Mac, in jeder App, auch Claude Code & Terminal. Gratis & Open Source.",
    url: "/open-source-projekte/mooni-voice",
    locale: "de_DE",
    images: [
      {
        url: "/images/og-mooni-voice.png",
        width: 1200,
        height: 630,
        alt: "Mooni Voice · lokale Sprache-zu-Text für den Mac",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mooni Voice · Sprich. Es steht da. Überall.",
    description:
      "Lokale Sprache-zu-Text für den Mac, in jeder App. Gratis & Open Source.",
    images: ["/images/og-mooni-voice.png"],
  },
};

export default function MooniVoicePage() {
  return <MooniVoiceView />;
}
