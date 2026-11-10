import type { Metadata } from "next";
import TrustBar from "@/components/akademie/TrustBar";
import MemoryDemo from "@/components/akademie/MemoryDemo";
import SystemConstellation from "@/components/akademie/SystemConstellation";
import Sessions from "@/components/akademie/Sessions";
import SocialCockpitBonus from "@/components/akademie/SocialCockpitBonus";
import ValueStack from "@/components/akademie/ValueStack";
import Qualify from "@/components/akademie/Qualify";
import AboutIlja from "@/components/akademie/AboutIlja";
import BeforeAfter from "@/components/akademie/BeforeAfter";
import PriceBlock from "@/components/akademie/PriceBlock";
import Termine from "@/components/akademie/Termine";
import Faq from "@/components/akademie/Faq";
import WorkshopHeader from "@/components/akademie/WorkshopHeader";
import DiscoveryHero from "@/components/akademie/DiscoveryHero";
import { CURRENT_COHORT, formatShortDate } from "@/components/akademie/cohorts";

const title = CURRENT_COHORT
  ? `Second Brain: Kurs ab ${formatShortDate(CURRENT_COHORT.start)}`
  : "Dein Second Brain · Sabala KI Academy";
const description = CURRENT_COHORT
  ? `Dein Second Brain: ${CURRENT_COHORT.sessions.map((s) => formatShortDate(s.date)).join(", ")}. Zwei Workshops + 1 Stunde Q&A. Bonus: Social Media Cockpit. Maximal ${CURRENT_COHORT.capacity} Plätze. 397 € netto.`
  : "Dein Second Brain mit Obsidian, Gemini Notebook und Claude Code. Zwei Workshops à 2,5 Stunden plus eine zusätzliche Stunde Q&A. 397 € netto.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/akademie" },
  openGraph: {
    title,
    description,
    url: "/akademie",
    type: "website",
    locale: "de_DE",
    siteName: "Sabala Studios",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sabala Academy · Dein Second Brain" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
};

export default function AkademiePage() {
  return (
    <main className="flex-1">
      <WorkshopHeader />
      <TrustBar />
      <MemoryDemo />
      <SystemConstellation />
      <Sessions />
      <SocialCockpitBonus />
      <ValueStack />
      <Qualify />
      <AboutIlja />
      <BeforeAfter />
      <Termine />
      <PriceBlock />
      <Faq />
      {/* Reveal-Abschluss vor dem Footer — Desktop-Wischeffekt "Durchbruch. Durchblick." */}
      <div className="hidden md:block">
        <DiscoveryHero />
      </div>
    </main>
  );
}
