import ShopView from "@/components/shop/ShopView";

export const metadata = {
  title: "Sabala AI Shop · Werkzeuge & Wissen für Claude",
  description:
    "Werkzeuge, Vorlagen und Wissen rund um Claude und Claude Code. Vom KI-Assistenzteam bis zum Web Design OS. Damit du KI nicht nur verstehst, sondern praktisch nutzt.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Sabala AI Shop · Werkzeuge & Wissen für Claude",
    description:
      "Werkzeuge, Vorlagen und Wissen rund um Claude und Claude Code. Vom KI-Assistenzteam bis zum Web Design OS.",
    url: "/shop",
    locale: "de_DE",
  },
};

export default function ShopPage() {
  return <ShopView />;
}
