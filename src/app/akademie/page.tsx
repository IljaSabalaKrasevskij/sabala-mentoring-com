import type { Metadata } from "next";
import WorkshopHeader from "@/components/akademie/WorkshopHeader";
import MemoryDemo from "@/components/akademie/MemoryDemo";
import BeforeAfter from "@/components/akademie/BeforeAfter";
import Sessions from "@/components/akademie/Sessions";
import Qualify from "@/components/akademie/Qualify";
import AboutIlja from "@/components/akademie/AboutIlja";
import SocialCockpitBonus from "@/components/akademie/SocialCockpitBonus";
import Termine from "@/components/akademie/Termine";
import Faq from "@/components/akademie/Faq";
import PlatzLeiste from "@/components/akademie/PlatzLeiste";
import { CURRENT_COHORT, KURS_PREIS, formatShortDate, sessionZeiten } from "@/components/akademie/cohorts";
import { FRAGEN } from "@/components/akademie/fragen";

const SEITE = "https://sabala-mentoring.com/akademie";
const KURS = "Dein Second Brain: Live-Kurs mit Claude Code, Obsidian und Gemini Notebook";
const KURZ = "In zwei Live-Workshops und einer Fragestunde richten wir dein Second Brain ein. Danach kennt Claude dein Wissen, deine Kunden und deine Projekte.";

const title = CURRENT_COHORT
  ? `Second Brain für Claude: Live-Kurs ab ${formatShortDate(CURRENT_COHORT.start)}`
  : "Dein Second Brain · Sabala KI Academy";
const description = CURRENT_COHORT
  ? `Claude vergisst nach jeder Session alles? ${KURZ} Start ${formatShortDate(CURRENT_COHORT.start)}, maximal ${CURRENT_COHORT.capacity} Plätze, ${KURS_PREIS} € netto.`
  : `Claude vergisst nach jeder Session alles? ${KURZ} ${KURS_PREIS} € netto.`;

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

/* Maschinenlesbare Angaben: der Kurs, sein nächster Lauf als Termin und die Fragen.
   Damit finden Google und KI-Suchen Datum, Preis und Antworten, ohne die Seite zu deuten.
   Organisation und Person stehen schon im Layout, hier wird nur auf ihre Kennung verwiesen. */
function angaben() {
  const zeiten = CURRENT_COHORT?.sessions.map(sessionZeiten);
  const lauf = CURRENT_COHORT &&
    zeiten && {
      start: zeiten[0].start,
      ende: zeiten[zeiten.length - 1].ende,
      angebot: {
        "@type": "Offer",
        price: KURS_PREIS,
        priceCurrency: "EUR",
        priceSpecification: { "@type": "PriceSpecification", price: KURS_PREIS, priceCurrency: "EUR", valueAddedTaxIncluded: false },
        availability: `https://schema.org/${CURRENT_COHORT.status === "ausgebucht" ? "SoldOut" : CURRENT_COHORT.status === "fast voll" ? "LimitedAvailability" : "InStock"}`,
        category: "Paid",
        url: SEITE,
      },
    };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${SEITE}#kurs`,
        name: KURS,
        description: KURZ,
        url: SEITE,
        inLanguage: "de-DE",
        provider: { "@id": "https://sabala-mentoring.com/#organization" },
        ...(lauf && {
          offers: lauf.angebot,
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Online",
            courseWorkload: "PT6H",
            startDate: lauf.start,
            endDate: lauf.ende,
            instructor: { "@id": "https://sabala-mentoring.com/#ilja" },
          },
        }),
      },
      ...(lauf && CURRENT_COHORT
        ? [
            {
              "@type": "Event",
              "@id": `${SEITE}#termin`,
              name: `Dein Second Brain: Live-Kurs ab ${formatShortDate(CURRENT_COHORT.start)}`,
              description: KURZ,
              startDate: lauf.start,
              endDate: lauf.ende,
              eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              location: { "@type": "VirtualLocation", url: SEITE },
              image: "https://sabala-mentoring.com/og-image.jpg",
              maximumAttendeeCapacity: CURRENT_COHORT.capacity,
              organizer: { "@id": "https://sabala-mentoring.com/#organization" },
              performer: { "@id": "https://sabala-mentoring.com/#ilja" },
              offers: lauf.angebot,
            },
          ]
        : []),
      {
        "@type": "FAQPage",
        "@id": `${SEITE}#fragen`,
        mainEntity: FRAGEN.map(([frage, antwort]) => ({ "@type": "Question", name: frage, acceptedAnswer: { "@type": "Answer", text: antwort } })),
      },
    ],
  };
}

export default function AkademiePage() {
  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(angaben()).replace(/</g, "\\u003c") }} />
      <WorkshopHeader />
      <MemoryDemo hell />
      <BeforeAfter />
      <Sessions />
      <Qualify />
      <AboutIlja />
      <SocialCockpitBonus />
      <Termine />
      <Faq />
      <PlatzLeiste />
    </main>
  );
}
