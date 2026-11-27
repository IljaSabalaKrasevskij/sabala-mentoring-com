import "./special-offer.css";
import { Knopf, GOLD_AUF_HELL, TEXT_AUF_HELL } from "@/components/akademie/shared";
import { KURS_PREIS } from "@/components/akademie/cohorts";
import { WEBKURS_PREIS } from "@/components/webkurs/daten";
import { HeroGutscheine } from "./Bewegung";
import { ANGEBOT_ENDE, PREIS_SB, PREIS_WEB, euro } from "./angebot";

/* Hinweis auf das Special Offer 2026 für die Akademie-Übersicht, direkt unter dem Kopf. Liegt bei der Angebotsseite,
   damit nach 2026 ein Ordner und eine Zeile in akademie-hub/page.tsx zu löschen sind. */
// ponytail: einmal beim Bau ausgewertet (die Übersicht ist statisch); ab dem 1.1.2027 fällt der Abschnitt mit dem nächsten Deploy weg.
const LAEUFT = Date.now() < ANGEBOT_ENDE;

export default function SpecialOfferHinweis() {
  if (!LAEUFT) return null;
  const angebote = [
    { name: "Second Brain", preis: PREIS_SB, statt: KURS_PREIS },
    { name: "Webseiten-Kurs", preis: PREIS_WEB, statt: WEBKURS_PREIS },
  ];
  return (
    <section id="special-offer" className="relative overflow-hidden px-6 py-[6vh]" style={{ background: "linear-gradient(180deg, #faf2dd 0%, var(--cream) 100%)" }}>
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 min-[56.25rem]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <p className="font-mono text-[12.5px] uppercase tracking-[0.2em]" style={{ color: GOLD_AUF_HELL }}>Special Offer · nur 2026</p>
          <h2 className="mt-3 font-serif text-deep" style={{ fontSize: "clamp(2rem, 3.4vw, 3rem)", lineHeight: 1.06 }}>
            Zwei Kurse für 2027. <span className="block" style={{ color: GOLD_AUF_HELL }}>Heute zum halben Preis.</span>
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-[1.04rem] leading-relaxed" style={{ color: TEXT_AUF_HELL }}>
            Sichere dir jetzt deinen Platz im Second-Brain-Kurs, im Webseiten-Kurs oder in beiden. Du zahlst heute die Hälfte, 2027 ist dein Platz bezahlt.
          </p>
          <ul className="mt-5 space-y-2">
            {angebote.map((a) => (
              <li key={a.name} className="flex flex-wrap items-baseline gap-x-2 text-[1.02rem] text-deep">
                <span>{a.name}:</span>
                <b className="font-semibold">{euro(a.preis)}</b>
                <span style={{ color: TEXT_AUF_HELL }}>
                  statt <s>{euro(a.statt)}</s>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Knopf href="/special-offer-2026">Zum Special Offer</Knopf>
          </div>
          <p className="mt-3 text-[0.95rem]" style={{ color: TEXT_AUF_HELL }}>Preise netto, für Unternehmen und Selbständige.</p>
        </div>
        <HeroGutscheine ziel="/special-offer-2026" grund="var(--cream)" />
      </div>
    </section>
  );
}
