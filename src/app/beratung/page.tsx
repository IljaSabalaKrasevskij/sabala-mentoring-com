import type { Metadata } from "next";
import BeratungView from "@/components/akademie/BeratungView";
import { EINWAENDE } from "@/components/akademie/beratung";
import { BERATUNG_GUTSCHEIN, BERATUNG_PREIS, BERATUNG_PREIS_REGULAER } from "@/components/akademie/cohorts";

const SEITE = "https://sabala-mentoring.com/beratung";

/* Mit dem Zusatz „ · Sabala Studios“ aus dem Layout 58 Zeichen, die Beschreibung bleibt unter 160. */
const title = "Beratungsstunde 1:1 zu Claude Code und KI";
const description = `Eine Stunde 1:1: deine Fragen zu Claude Code, Webseiten, Second Brain und Agenten. ${BERATUNG_PREIS} € statt ${BERATUNG_PREIS_REGULAER} € netto, dazu ${BERATUNG_GUTSCHEIN} € Gutschein für den Second-Brain-Kurs.`;
const TEILEN = "Eine Stunde. Deine Fragen. Klare Antworten.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/beratung" },
  openGraph: {
    title: TEILEN,
    description,
    url: "/beratung",
    type: "website",
    locale: "de_DE",
    siteName: "Sabala Studios",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sabala Academy · Beratungsstunde" }],
  },
  twitter: { card: "summary_large_image", title: TEILEN, description, images: ["/og-image.jpg"] },
};

/* Maschinenlesbare Angaben: die Stunde mit Preis und die Einwände als Fragen und Antworten.
   Organisation und Person stehen schon im Layout, hier wird nur auf ihre Kennung verwiesen. */
const ANGABEN = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SEITE}#stunde`,
      name: title,
      serviceType: "Beratung",
      description,
      url: SEITE,
      provider: { "@id": "https://sabala-mentoring.com/#organization" },
      offers: {
        "@type": "Offer",
        price: BERATUNG_PREIS,
        priceCurrency: "EUR",
        priceSpecification: { "@type": "PriceSpecification", price: BERATUNG_PREIS, priceCurrency: "EUR", valueAddedTaxIncluded: false },
        availability: "https://schema.org/InStock",
        url: SEITE,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SEITE}#einwaende`,
      mainEntity: EINWAENDE.map(([frage, antwort]) => ({ "@type": "Question", name: frage, acceptedAnswer: { "@type": "Answer", text: antwort } })),
    },
  ],
};

export default function BeratungPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ANGABEN).replace(/</g, "\\u003c") }} />
      <BeratungView />
    </>
  );
}
