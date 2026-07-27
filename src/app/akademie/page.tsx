import TrustBar from "@/components/akademie/TrustBar";
import MemoryDemo from "@/components/akademie/MemoryDemo";
import SystemConstellation from "@/components/akademie/SystemConstellation";
import Sessions from "@/components/akademie/Sessions";
import ValueStack from "@/components/akademie/ValueStack";
import Qualify from "@/components/akademie/Qualify";
import AboutIlja from "@/components/akademie/AboutIlja";
import BeforeAfter from "@/components/akademie/BeforeAfter";
import PriceBlock from "@/components/akademie/PriceBlock";
import Termine from "@/components/akademie/Termine";
import Faq from "@/components/akademie/Faq";
import WorkshopHeader from "@/components/akademie/WorkshopHeader";
import DiscoveryHero from "@/components/akademie/DiscoveryHero";

export const metadata = {
  title: "Dein Second Brain · Sabala KI Academy",
  description:
    "In 2×2,5 Stunden richtest du ein KI-System ein, das sich an alles erinnert. Obsidian + NotebookLM + Claude Code, live aufgebaut. Preis €397.",
};

export default function AkademiePage() {
  return (
    <main className="flex-1">
      <div className="hidden md:block">
        <DiscoveryHero />
      </div>
      <WorkshopHeader />
      <TrustBar />
      <MemoryDemo />
      <SystemConstellation />
      <Sessions />
      <ValueStack />
      <Qualify />
      <AboutIlja />
      <BeforeAfter />
      <Termine />
      <PriceBlock />
      <Faq />
    </main>
  );
}
