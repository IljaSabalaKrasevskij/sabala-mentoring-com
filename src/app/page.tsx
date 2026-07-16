import IljaHeroJourney from "@/components/home/IljaHeroJourney";
import ValuesManifesto from "@/components/home/ValuesManifesto";
import MooniVoiceTeaser from "@/components/home/MooniVoiceTeaser";
import ForWhom from "@/components/home/ForWhom";
import SolarSystem from "@/components/home/SolarSystem";
import ShopTeaser from "@/components/home/ShopTeaser";
import DerMensch from "@/components/home/DerMensch";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <IljaHeroJourney />
      {/* Sanfter Übergang vom dunklen Universum zur cream-Welt darunter —
          lang gezogener Multistop-Verlauf, kein harter Schnitt */}
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
      <ForWhom />
      <SolarSystem />
      <ShopTeaser />
      <DerMensch />
    </SmoothScroll>
  );
}
