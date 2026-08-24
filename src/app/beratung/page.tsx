import type { Metadata } from "next";
import BeratungView from "@/components/akademie/BeratungView";

export const metadata: Metadata = {
  title: "Beratungsstunde: deine Fragen zu KI, Claude Code und Webseiten | Sabala",
  description:
    "Eine Stunde 1:1 zu Webseiten mit Claude Code, Deployment, Second Brain, HTML-Präsentationen, Agenten und Datensicherheit. 97 € statt 200 € netto, dazu 120 € Gutschein für den nächsten Second-Brain-Kurs.",
  alternates: { canonical: "https://sabala-mentoring.com/beratung" },
  openGraph: {
    title: "Eine Stunde. Deine Fragen. Klare Antworten.",
    description:
      "1:1 zu Webseiten mit Claude Code, Deployment, Second Brain und Agenten. 97 € statt 200 €, plus 120 € Gutschein für den Second-Brain-Kurs.",
    url: "https://sabala-mentoring.com/beratung",
  },
};

export default function BeratungPage() {
  return <BeratungView />;
}
