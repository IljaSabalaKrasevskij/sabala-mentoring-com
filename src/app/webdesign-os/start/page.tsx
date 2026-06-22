import WebDesignOsStartView from "@/components/webdesign-os/WebDesignOsStartView";

export const metadata = {
  title: "Dein Sabala Web Design OS · Los geht's",
  // Post-Kauf-Seite: nie indexieren (sonst findet jeder den Download ohne Kauf).
  robots: { index: false, follow: false },
};

export default function WebDesignOsStartPage() {
  return <WebDesignOsStartView />;
}
