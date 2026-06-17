import IljaHeroJourney from "@/components/home/IljaHeroJourney";
import ValuesManifesto from "@/components/home/ValuesManifesto";
import ForWhom from "@/components/home/ForWhom";
import SolarSystem from "@/components/home/SolarSystem";
import DerMensch from "@/components/home/DerMensch";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <IljaHeroJourney />
      <ValuesManifesto />
      <ForWhom />
      <SolarSystem />
      <DerMensch />
    </SmoothScroll>
  );
}
