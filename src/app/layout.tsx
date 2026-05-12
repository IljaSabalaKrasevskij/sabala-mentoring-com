import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://sabala-mentoring.com";
const siteName = "Sabala Mentoring";
const siteTitle = "Sabala Mentoring | Klarheit in der Positionierung. Kraft im Auftritt.";
const siteDescription =
  "Premium-Mentoring für Coaches, Therapeuten, Trainer und Speaker, die wirklich etwas bewegen. Begleitung in Positionierung, Webauftritt und Pflege — geführt von Ilja Krasevskij.";
// TODO: og-image.jpg (1200×630) in /public/ ablegen, sobald Brand-OG-Image vorbereitet ist
const ogImage = `${siteUrl}/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Sabala Mentoring",
  },
  description: siteDescription,
  authors: [{ name: "Ilja Krasevskij", url: `${siteUrl}/ueber-mich` }],
  creator: "Ilja Krasevskij",
  publisher: siteName,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Sabala Mentoring — Premium-Auftritt für Menschen, die wirklich etwas bewegen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  verification: {
    // TODO: Wert aus Google Search Console einsetzen (Schritt B.1 der Komplettanleitung)
    google: "REPLACE_WITH_GSC_VERIFICATION_CODE",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/og-image.jpg`,
  description: siteDescription,
  founder: { "@id": `${siteUrl}/#ilja` },
  sameAs: [
    // TODO: tatsächliche Social-Profile-URLs einsetzen
    // "https://www.linkedin.com/in/ilja-krasevskij/",
    // "https://www.instagram.com/sabala.mentoring/",
    // "https://www.youtube.com/@sabalamentoring",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: siteName,
  description: siteDescription,
  inLanguage: "de-DE",
  publisher: { "@id": `${siteUrl}/#organization` },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#ilja`,
  name: "Ilja Krasevskij",
  url: `${siteUrl}/ueber-mich`,
  jobTitle: "Founder & Premium-Mentor",
  worksFor: { "@id": `${siteUrl}/#organization` },
  email: "mailto:ilja.krasevskij@gmail.com",
  knowsAbout: [
    "Premium-Positionierung",
    "Webdesign für Coaches",
    "Mentoring",
    "KI im Coaching-Business",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${instrumentSerif.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh] flex flex-col relative" suppressHydrationWarning>
        <Script id="schema-organization" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(organizationSchema)}
        </Script>
        <Script id="schema-website" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(websiteSchema)}
        </Script>
        <Script id="schema-person" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(personSchema)}
        </Script>
        <Script
          id="umami-analytics"
          src="https://analytics.sabala-mentoring.com/script.js"
          data-website-id="25dabd8e-bc65-485d-bb2b-6239e87ecc75"
          strategy="afterInteractive"
        />
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
