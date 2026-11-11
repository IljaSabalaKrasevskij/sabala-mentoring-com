import type { Metadata } from "next";
import AcademyHero from "@/components/akademie/AcademyHero";
import AcademyLevels from "@/components/akademie/AcademyLevels";
import CourseGrid from "@/components/akademie/CourseGrid";
import AcademyValues from "@/components/akademie/AcademyValues";
import AcademyNewsletter from "@/components/akademie/AcademyNewsletter";
import WebkursKarte from "@/components/akademie/WebkursKarte";
import { BERATUNG_PREIS, CURRENT_COHORT, formatShortDate } from "@/components/akademie/cohorts";

/* Übersichtsseite der Akademie. Sechs kurze Abschnitte: Kopf, dein Einstieg (vier Stufen),
   die zwei buchbaren Angebote, so lernst du hier, der angekündigte Webseiten-Kurs, Newsletter.
   Jeder passt in ein Laptop-Fenster. */

/* Mit dem Zusatz „ · Sabala Studios“ aus dem Layout genau 60 Zeichen, die Beschreibung bleibt unter 160. */
const title = "KI-Akademie: Live-Trainings mit Claude Code";
const KURZ = "Sabala KI Academy: Live-Trainings für Dienstleister im B2B.";
const description = CURRENT_COHORT
  ? `${KURZ} Beratungsstunde für ${BERATUNG_PREIS} € oder Second-Brain-Kurs ab ${formatShortDate(CURRENT_COHORT.start)}, maximal ${CURRENT_COHORT.capacity} Plätze.`
  : `${KURZ} Beratungsstunde für ${BERATUNG_PREIS} € oder Second-Brain-Kurs mit Obsidian, Gemini Notebook und Claude Code.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/akademie-hub" },
  openGraph: {
    title,
    description,
    url: "/akademie-hub",
    type: "website",
    locale: "de_DE",
    siteName: "Sabala Studios",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sabala KI Academy" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
};

export default function AkademieHubPage() {
  return (
    <main className="flex-1">
      <AcademyHero />
      <AcademyLevels />
      <CourseGrid />
      <AcademyValues />
      <WebkursKarte />
      <AcademyNewsletter />
    </main>
  );
}
