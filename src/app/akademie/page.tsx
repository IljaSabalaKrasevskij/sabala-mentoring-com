import DiscoveryHero from "@/components/akademie/DiscoveryHero";
import WorkshopHeader from "@/components/akademie/WorkshopHeader";
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
  title: "Sabala Academy · Dein KI-Mitarbeiter ×10",
  description:
    "In 2×2 Stunden richtest du ein KI-System ein, das sich an alles erinnert. Obsidian + NotebookLM + Claude Code, live aufgebaut. Launch-Preis €197.",
};

export default function AkademiePage() {
  return (
    <main className="flex-1">
      <DiscoveryHero />
      <WorkshopHeader />
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
    </main>
  );
}
