import SkillPaketeView from "@/components/skill-pakete/SkillPaketeView";
import { FRAGEN } from "@/components/skill-pakete/daten";

/* ──────────────────────────────────────────────────────────────────────────
   Leadmagnet „Skill-Pakete“ (15.11.2026, Iljas Wunsch: mehrere Skill-Pakete nach Thema, Setups je Beruf,
   Häkchen je Paket, Seite mit 3D, dazu ein Paket für Entwickler, Vorher und Nachher, Updates).
   Vorher stand hier ein einzelnes Paket mit vier Skills (12.11.2026).
   Die Seite selbst ist SkillPaketeView, alle Inhalte stehen in src/components/skill-pakete/daten.ts.
   Das Formular trägt die Quelle skill-paket. Nach dem Klick in der Bestätigungsmail führt dankeSeite()
   aus src/lib/quellen.ts auf /claude-code/skill-paket/danke.
   ────────────────────────────────────────────────────────────────────────── */

const site = "https://sabala-mentoring.com";
const url = `${site}/claude-code/skill-paket`;

/* Vorschaubild für WhatsApp, LinkedIn und Co.: der Kopf der Seite mit der 3D-Bühne, aus dem Bau fotografiert (1200 × 630). */
const bild = {
  src: "/images/skill-pakete/og.jpg",
  alt: "Bring Claude dein Handwerk bei: Mooni, der kleine Roboter, zwischen sechs dunklen Schachteln mit goldenen Zeichen, daneben die Wahl des Berufs",
};

const title = "Claude Skills auf Deutsch: sechs kostenlose Skill-Pakete";
const description =
  "Sechs kostenlose Skill-Pakete für Claude auf Deutsch: Texte, Design, SEO, Marktrecherche, Social Media, Entwicklung. Mit Setup für deinen Beruf und Updates.";

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    type: "website",
    url,
    images: [{ url: `${site}${bild.src}`, width: 1200, height: 630, alt: bild.alt }],
  },
};

const breadcrumbSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Start", item: site },
    { "@type": "ListItem", position: 2, name: "Claude Code", item: `${site}/claude-code` },
    { "@type": "ListItem", position: 3, name: "Skill-Pakete", item: url },
  ],
});

const faqSchemaJson = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FRAGEN.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export default function SkillPaketSeite() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchemaJson.replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchemaJson.replace(/</g, "\\u003c") }} />
      <SkillPaketeView />
    </>
  );
}
