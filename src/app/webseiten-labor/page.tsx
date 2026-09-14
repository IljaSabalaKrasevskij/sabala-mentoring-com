import type { Metadata } from "next";
import WebseitenView from "../webseiten/WebseitenView";

export const metadata: Metadata = { title: { absolute: "Galerie-Labor · Sabala Studios" }, robots: { index: false, follow: false } };

export default async function GalerieLabor({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  return <WebseitenView lang={lang === "en" ? "en" : "de"} galleryVariant="salon" isLab />;
}
