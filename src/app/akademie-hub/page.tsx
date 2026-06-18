import AcademyHero from "@/components/akademie/AcademyHero";
import CourseGrid from "@/components/akademie/CourseGrid";
import CourseCalendar from "@/components/akademie/CourseCalendar";

export const metadata = {
  title: "Sabala KI Academy · Live-Trainings für Selbstständige",
  description:
    "KI-Praxistrainings live — erprobte Setups für Selbstständige, Solopreneure und Unternehmer. Obsidian + Claude Second Brain, KI-Automation, Content-Systeme.",
};

export default function AkademieHubPage() {
  return (
    <main className="flex-1">
      <AcademyHero />
      <CourseGrid />
      <CourseCalendar />
    </main>
  );
}
