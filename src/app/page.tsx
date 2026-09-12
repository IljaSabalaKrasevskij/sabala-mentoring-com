import IljaHeroJourney from "@/components/home/IljaHeroJourney";
import ValuesManifesto from "@/components/home/ValuesManifesto";
import MooniVoiceTeaser from "@/components/home/MooniVoiceTeaser";
import ForWhom from "@/components/home/ForWhom";
import SolarSystem from "@/components/home/SolarSystem";
import ShopTeaser from "@/components/home/ShopTeaser";
import DerMensch from "@/components/home/DerMensch";
import AcademyNewsletter from "@/components/akademie/AcademyNewsletter";
import Kontakt from "@/components/home/Kontakt";
import { getProvenExpertSummary, PROVEN_EXPERT_PROFILE_URL } from "@/lib/provenExpert";
import SmoothScroll from "@/components/SmoothScroll";

export default async function Home() {
  // Die Kontakt-Sektion lag bis 12.9.2026 im Layout und stand damit unter jeder
  // Seite. Auf /webseiten konkurrierte sie mit der Potenzial-Analyse, deshalb
  // steht sie jetzt nur noch hier.
  const peData = await getProvenExpertSummary();
  const pe = {
    score: peData.ratingValue.toFixed(2).replace(".", ","),
    reviews: peData.reviewCount.toLocaleString("de-DE"),
    rate: peData.recommendationRate,
    url: PROVEN_EXPERT_PROFILE_URL,
  };

  return (
    <SmoothScroll>
      {/* Reihenfolge folgt der Verkaufslogik: erst die drei Angebote (ForWhom +
          Planeten), dann die Marke (Mooni), dann Produkte (Voice, Shop), zuletzt
          der Mensch. Hero, ForWhom und Planeten sind alle dunkel, laufen also
          nahtlos ineinander; der cream-Übergang sitzt vor der Mooni-Sektion. */}
      <IljaHeroJourney />
      <ForWhom />
      <SolarSystem />
      <div
        aria-hidden
        className="h-[32vh] w-full"
        style={{
          background:
            "linear-gradient(to bottom, #0A0806 0%, #14100c 15%, #28201a 32%, #4a3d31 50%, #8a7762 66%, #c6b69a 80%, #ecdfc6 92%, var(--cream) 100%)",
        }}
      />
      <ValuesManifesto />
      <MooniVoiceTeaser />
      <ShopTeaser />
      <DerMensch />
      {/* Cream→Dunkel-Brücke, damit die dunkle Newsletter-Box (und die darauf
          folgende Kontakt+Footer-Zone) sauber aus DerMensch (cream) herauswächst. */}
      <div
        aria-hidden
        className="h-[24vh] w-full"
        style={{
          background:
            "linear-gradient(to bottom, var(--cream) 0%, #ecdfc6 10%, #c6b69a 26%, #8a7762 44%, #4a3d31 62%, #28201a 80%, #080604 100%)",
        }}
      />
      <AcademyNewsletter />
      <Kontakt pe={pe} />
    </SmoothScroll>
  );
}
