import type { Metadata } from "next";
import RessourcenView from "@/components/ressourcen/RessourcenView";
import { RESSOURCEN } from "@/components/ressourcen/ressourcen";

const SITE = "https://sabala-mentoring.com";
const SEITE = `${SITE}/ressourcen`;

/* Mit dem Zusatz „ · Sabala Studios“ aus dem Layout 60 Zeichen, die Beschreibung bleibt unter 160. */
const title = "Kostenlose Ressourcen zu Claude Code und KI";
const description =
  "Das Claude-Code-Startpaket und Mooni Voice: Vorlagen und Werkzeuge aus meiner täglichen Arbeit mit KI. Kostenlos, du trägst dich ein und lädst sie herunter.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ressourcen" },
  openGraph: {
    title,
    description,
    url: "/ressourcen",
    type: "website",
    locale: "de_DE",
    siteName: "Sabala Studios",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sabala Studios: kostenlose Ressourcen" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
};

/* Maschinenlesbare Angaben: die Liste der Ressourcen, jede kostenlos. Was noch kommt, steht nicht drin.
   Werkzeuge mit Quellcode als Anwendung, alles andere als Werk. Die Person steht schon im Layout. */
const ANGABEN = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SEITE}#ressourcen`,
  name: title,
  itemListElement: RESSOURCEN.filter((r) => !r.kommt).map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": r.code ? "SoftwareApplication" : "CreativeWork",
      name: r.name,
      description: r.satz,
      url: `${SITE}${r.seite}`,
      inLanguage: "de",
      isAccessibleForFree: true,
      ...(r.code
        ? { applicationCategory: "UtilitiesApplication", operatingSystem: "macOS", license: `https://opensource.org/licenses/${r.lizenz}`, sameAs: r.code }
        : {}),
      offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" },
      author: { "@id": `${SITE}/#ilja` },
    },
  })),
};

export default function RessourcenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ANGABEN).replace(/</g, "\\u003c") }} />
      <RessourcenView />
    </>
  );
}
