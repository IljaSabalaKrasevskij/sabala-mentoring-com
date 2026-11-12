import type { Metadata } from "next";
import StartView from "@/components/home/StartView";
import { metadata as layoutMetadata } from "./layout";

/* Startseite. Der Titel kommt aus dem Layout („Sabala Studios · Ich baue mit KI. Du baust mit.“).
   Die Beschreibung nennt die drei Dinge, für die die Seite steht: zeigen, bauen, Show Cases. Höchstens 160 Zeichen. */
const description = "Sabala Studios von Ilja Krasevskij: Ich zeige dir, wie du mit KI arbeitest, oder baue es für dich. Webseiten, KI-Systeme, Live-Kurse und Show Cases im Einsatz.";

// "./" aus dem Layout loest Next.js an der Wurzel zu /index auf. Der openGraph-Block
// einer Seite ersetzt den des Layouts komplett, deshalb wird er hier uebernommen.
export const metadata: Metadata = {
  description,
  alternates: { canonical: "/" },
  openGraph: { ...layoutMetadata.openGraph, url: "/", description },
  twitter: { ...layoutMetadata.twitter, description },
};

export default function Home() {
  return <StartView />;
}
