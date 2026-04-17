import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Sabala Mentoring | Klarheit in der Positionierung. Kraft im Auftritt.",
  description: "Sabala Mentoring ist ein Premium-Partner für den gesamten professionellen Auftritt reflektierter (Solo-)Unternehmer.",
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
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
