import type { Metadata } from "next";
import { Motive } from "@/components/webkurs/Scheibe";
import SchichtenKopf from "@/components/webkurs/SchichtenKopf";
import Schichten from "@/components/webkurs/Schichten";
import { Fragen, MaschinenBlick, Rahmen } from "@/components/webkurs/Abschnitte";
import Warteliste from "@/components/webkurs/Warteliste";
import { FRAGEN, KURS_NAME, KURS_PFAD, SCHICHTEN, SEITEN_BESCHREIBUNG, SEITEN_TITEL, WEBKURS_PLAETZE, WEBKURS_PREIS } from "@/components/webkurs/daten";

/* Ankündigungsseite für den Kurs „Webseiten bauen mit Claude Code“. Der Kurs ist noch nicht buchbar:
   Es gibt eine Warteliste, keinen Termin. Sechs kurze Abschnitte: Kopf als Scroll-Film, sechs Schichten,
   Google und KI, der Rahmen mit Preis, Warteliste, Fragen. */

const SEITE = `https://sabala-mentoring.com${KURS_PFAD}`;
const KURZ = "Live-Kurs in sechs Wochen: Du baust deine eigene Webseite mit Claude Code, stellst sie auf deiner Domain live und machst sie sichtbar bei Google und in KI-Antworten.";

export const metadata: Metadata = {
  title: SEITEN_TITEL,
  description: SEITEN_BESCHREIBUNG,
  alternates: { canonical: KURS_PFAD },
  openGraph: {
    title: SEITEN_TITEL,
    description: SEITEN_BESCHREIBUNG,
    url: KURS_PFAD,
    type: "website",
    locale: "de_DE",
    siteName: "Sabala Studios",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `Sabala Academy · ${KURS_NAME}` }],
  },
  twitter: { card: "summary_large_image", title: SEITEN_TITEL, description: SEITEN_BESCHREIBUNG, images: ["/og-image.jpg"] },
};

/* Maschinenlesbare Angaben: der Kurs mit Preis und Gruppengröße und die Fragen.
   Einen Termin gibt es noch nicht, darum steht keiner drin. Organisation und Person stehen schon im Layout. */
function angaben() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${SEITE}#kurs`,
        name: KURS_NAME,
        description: KURZ,
        url: SEITE,
        inLanguage: "de-DE",
        teaches: SCHICHTEN.map((s) => s.name),
        provider: { "@id": "https://sabala-mentoring.com/#organization" },
        offers: {
          "@type": "Offer",
          price: WEBKURS_PREIS,
          priceCurrency: "EUR",
          priceSpecification: { "@type": "PriceSpecification", price: WEBKURS_PREIS, priceCurrency: "EUR", valueAddedTaxIncluded: false },
          category: "Paid",
          url: SEITE,
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Online",
          courseWorkload: "PT21H30M",
          maximumAttendeeCapacity: WEBKURS_PLAETZE,
          instructor: { "@id": "https://sabala-mentoring.com/#ilja" },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SEITE}#fragen`,
        mainEntity: FRAGEN.map(([frage, antwort]) => ({ "@type": "Question", name: frage, acceptedAnswer: { "@type": "Answer", text: antwort } })),
      },
    ],
  };
}

export default function WebkursPage() {
  return (
    <main className="wk wk-seite flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(angaben()).replace(/</g, "\\u003c") }} />
      <Motive />
      <SchichtenKopf />
      <div className="wk-danach">
        <Schichten />
        <MaschinenBlick />
        <Rahmen />
        <Warteliste />
        <Fragen />
      </div>
    </main>
  );
}
