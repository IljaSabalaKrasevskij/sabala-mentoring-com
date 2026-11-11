import type { Metadata } from "next";
import ShopView from "@/components/shop/ShopView";
import { WERKZEUGE } from "@/components/shop/werkzeuge";

const SEITE = "https://sabala-mentoring.com/shop";

/* Mit dem Zusatz „ · Sabala Studios“ aus dem Layout 54 Zeichen, die Beschreibung bleibt unter 160. */
const title = "Sabala AI Shop: Open-Source-Werkzeuge";
const description = `Kostenlose Open-Source-Werkzeuge aus meiner täglichen Arbeit mit KI. Den Anfang macht ${WERKZEUGE[0].name}: Sprache zu Text, komplett lokal auf deinem Mac.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/shop" },
  openGraph: {
    title,
    description,
    url: "/shop",
    type: "website",
    locale: "de_DE",
    siteName: "Sabala Studios",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sabala AI Shop" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
};

/* Maschinenlesbare Angaben: die Liste der Werkzeuge, jedes kostenlos. Die Person steht schon im Layout. */
const ANGABEN = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SEITE}#werkzeuge`,
  name: title,
  itemListElement: WERKZEUGE.map((w, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: w.name,
      description: w.satz,
      url: `https://sabala-mentoring.com${w.seite}`,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "macOS",
      license: `https://opensource.org/licenses/${w.lizenz}`,
      sameAs: w.code,
      offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" },
      author: { "@id": "https://sabala-mentoring.com/#ilja" },
    },
  })),
};

export default function ShopPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ANGABEN).replace(/</g, "\\u003c") }} />
      <ShopView />
    </>
  );
}
