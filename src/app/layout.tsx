import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif, Press_Start_2P } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";
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

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const siteUrl = "https://sabala-mentoring.com";
const siteName = "Sabala Studios";
const siteTitle = "Sabala Studios · High-End Creative Web Development";
const siteDescription =
  "Premium-Webauftritte aus eigenem Code: eigenständig im Design, schnell in der Technik, sichtbar bei Google und in KI-Antworten. Dazu KI-Trainings für Teams. Von Ilja Krasevskij.";
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
  // "./" loest Next.js pro Seite auf den eigenen Pfad auf. Vorher stand hier siteUrl:
  // jede Unterseite ohne eigene Angabe erklaerte damit die Startseite zum Original.
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "./",
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Sabala Studios. High-End Creative Web Development.",
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
      className={`${instrumentSerif.variable} ${geistMono.variable} ${pressStart.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh] flex flex-col relative" suppressHydrationWarning>
        {/* JSON-LD als echtes <script> im HTML. Ueber next/script stand es nur in einem
            JavaScript-Aufruf (self.__next_s), Crawler ohne JavaScript sahen es nicht. */}
        {[organizationSchema, websiteSchema, personSchema].map((schema) => (
          <script
            key={schema["@id"]}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
          />
        ))}
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
