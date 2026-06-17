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
const siteName = "Sabala Studios";
const siteTitle = "Sabala Studios · Ich bringe KI in dein Unternehmen";
const siteDescription =
  "KI-Lösungen, Premium-Webseiten und eine Akademie für Unternehmen, die KI wirklich nutzen wollen. Für dich gebaut, mit dir entwickelt, dir beigebracht. Von Ilja Krasevskij.";
// TODO: og-image.jpg (1200×630) in /public/ ablegen, sobald Brand-OG-Image vorbereitet ist
const ogImage = `${siteUrl}/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s · Sabala Studios",
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
        alt: "Sabala Studios. Ich bringe KI in dein Unternehmen.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  other: {
    "p:domain_verify": "ae6015677907add7c11655c028f413e1",
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
  jobTitle: "Founder, Sabala Studios",
  worksFor: { "@id": `${siteUrl}/#organization` },
  email: "mailto:ilja.krasevskij@gmail.com",
  knowsAbout: [
    "KI-Integration für Unternehmen",
    "Custom GPTs",
    "KI-Agenten und Agent OS",
    "Premium-Webseiten mit eigenem Code",
    "SEO und GEO für KI-Suchen",
    "KI-Akademie und Workshops",
    "Co-Development",
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
