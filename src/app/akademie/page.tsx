import AcademyHero from "@/components/akademie/AcademyHero";
import CourseGrid from "@/components/akademie/CourseGrid";
import CourseCalendar from "@/components/akademie/CourseCalendar";
import TrustBar from "@/components/akademie/TrustBar";
import MemoryDemo from "@/components/akademie/MemoryDemo";
import SystemConstellation from "@/components/akademie/SystemConstellation";
import Sessions from "@/components/akademie/Sessions";
import ValueStack from "@/components/akademie/ValueStack";
import Qualify from "@/components/akademie/Qualify";
import AboutIlja from "@/components/akademie/AboutIlja";
import BeforeAfter from "@/components/akademie/BeforeAfter";
import PriceBlock from "@/components/akademie/PriceBlock";
import Faq from "@/components/akademie/Faq";

export const metadata = {
  title: "Sabala KI Academy · Live-Trainings für Selbstständige",
  description:
    "KI-Praxistrainings live — erprobte Setups für Selbstständige, Solopreneure und Unternehmer. Obsidian + Claude Second Brain, KI-Automation, Content-Systeme.",
};

export default function AkademiePage() {
  return (
    <main className="flex-1">
      {/* Hub: Hero + Kurs-Übersicht + Kalender */}
      <AcademyHero />
      <CourseGrid />
      <CourseCalendar />

      {/* Kurs-Detail: Dein KI-Mitarbeiter (Obsidian + Claude) */}
      <div id="details">
        <TrustBar />
        <MemoryDemo />
        <SystemConstellation />
        <Sessions />
        <ValueStack />
        <Qualify />
        <AboutIlja />
        <BeforeAfter />
        <PriceBlock />
        <Faq />
      </div>
    </main>
  );
}
