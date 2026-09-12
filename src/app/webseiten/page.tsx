import WebseitenView from "./WebseitenView";

/* Die deutsche Fassung. Die englische liegt unter /en/websites und rendert
   dieselbe Ansicht mit lang="en". Alle Texte kommen aus texte.ts. */
export default function WebseitenPage() {
  return <WebseitenView lang="de" />;
}
