import AcademyHero from "@/components/akademie/AcademyHero";
import AcademyValues from "@/components/akademie/AcademyValues";
import CourseGrid from "@/components/akademie/CourseGrid";
import CourseCalendar from "@/components/akademie/CourseCalendar";
import AcademyNewsletter from "@/components/akademie/AcademyNewsletter";

export const metadata = {
  title: "Sabala KI Academy · Live-Trainings für Selbstständige",
  description:
    "KI-Praxistrainings live — erprobte Setups für Selbstständige, Solopreneure und Unternehmer. Hohe Qualität, Lerntransfer, Einfachheit. Obsidian + Claude Second Brain.",
};

export default function AkademieHubPage() {
  return (
    <main className="flex-1">
      <AcademyHero />
      <AcademyValues />
      <CourseGrid />
      <CourseCalendar />
      <AcademyNewsletter />
    </main>
  );
}
