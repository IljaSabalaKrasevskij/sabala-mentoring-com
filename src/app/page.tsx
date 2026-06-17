import IljaHeroJourney from "@/components/home/IljaHeroJourney";
import ValuesManifesto from "@/components/home/ValuesManifesto";
import ForWhom from "@/components/home/ForWhom";
import SolarSystem from "@/components/home/SolarSystem";
import DerMensch from "@/components/home/DerMensch";
import Kontakt from "@/components/home/Kontakt";
import SmoothScroll from "@/components/SmoothScroll";
import { getProvenExpertSummary, PROVEN_EXPERT_PROFILE_URL } from "@/lib/provenExpert";

export default async function Home() {
  const data = await getProvenExpertSummary();
  const pe = {
    score: data.ratingValue.toFixed(2).replace(".", ","),
    reviews: data.reviewCount.toLocaleString("de-DE"),
    rate: data.recommendationRate,
    url: PROVEN_EXPERT_PROFILE_URL,
  };

  return (
    <SmoothScroll>
      <IljaHeroJourney />
      <ValuesManifesto />
      <ForWhom />
      <SolarSystem />
      <DerMensch />
      <Kontakt pe={pe} />
    </SmoothScroll>
  );
}
