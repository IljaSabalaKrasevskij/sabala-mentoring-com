import IljaHeroJourney from "@/components/home/IljaHeroJourney";
import ValuesManifesto from "@/components/home/ValuesManifesto";
import MooniVoiceTeaser from "@/components/home/MooniVoiceTeaser";
import ForWhom from "@/components/home/ForWhom";
import SolarSystem from "@/components/home/SolarSystem";
import ShopTeaser from "@/components/home/ShopTeaser";
import DerMensch from "@/components/home/DerMensch";
import AcademyNewsletter from "@/components/akademie/AcademyNewsletter";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
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
    </SmoothScroll>
  );
}
