import AcademyHero from "@/components/akademie/AcademyHero";
import AcademyValues from "@/components/akademie/AcademyValues";
import AcademyLevels from "@/components/akademie/AcademyLevels";
import CourseGrid from "@/components/akademie/CourseGrid";
import CourseCalendar from "@/components/akademie/CourseCalendar";
import AcademyNewsletter from "@/components/akademie/AcademyNewsletter";
import { CURRENT_COHORT, formatShortDate } from "@/components/akademie/cohorts";

export const metadata = {
  title: "Sabala KI Academy · Live-Trainings für Selbstständige",
  description:
    CURRENT_COHORT
      ? `KI-Praxistrainings live. Second Brain ab ${formatShortDate(CURRENT_COHORT.start)}: zwei Workshops plus Q&A, maximal ${CURRENT_COHORT.capacity} Plätze. Obsidian, Gemini Notebook und Claude Code.`
      : "KI-Praxistrainings live für Selbstständige und Unternehmer. Obsidian, Gemini Notebook und Claude Code gemeinsam einrichten.",
};

export default function AkademieHubPage() {
  return (
    <main className="flex-1">
      <AcademyHero />
      <AcademyValues />
      <AcademyLevels />
      <CourseGrid />
      <CourseCalendar />
      <AcademyNewsletter />
    </main>
  );
}
