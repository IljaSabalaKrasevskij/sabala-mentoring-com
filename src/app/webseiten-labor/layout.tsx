import type { Metadata } from "next";

/* Arbeitskopie von /webseiten. Hier wird umgebaut, die Live-Seite bleibt unangetastet.
   Wenn die Version steht, wird sie nach /webseiten uebernommen und dieser Ordner geloescht.

   noindex ist Pflicht: eine zweite, fast identische Seite auf derselben Domain waere
   sonst Duplicate Content und wuerde die echte /webseiten im Ranking beschaedigen. */
export const metadata: Metadata = {
  title: "Labor · Webseiten (Arbeitskopie)",
  robots: { index: false, follow: false, nocache: true },
};

export default function LaborLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
