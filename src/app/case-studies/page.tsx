import type { Metadata } from "next";
import { CaseStudiesView } from "@/components/case-studies/CaseStudiesView";
import type { Locale } from "@/lib/case-studies";

function pickLang(raw: string | string[] | undefined): Locale {
  return raw === "en" ? "en" : "de";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const { lang: raw } = await searchParams;
  const lang = pickLang(raw);
  const meta = {
    de: {
      title: "Case Studies · Mit Claude gebaut",
      description:
        "Echte Webseiten und KI-Systeme, von Anfang bis Ende mit Claude und Claude Code gebaut. Ausgewählte Arbeiten von Sabala Studios.",
    },
    en: {
      title: "Case Studies · Built with Claude",
      description:
        "Real websites and AI systems, designed and built end to end with Claude and Claude Code. Selected work from Sabala Studios.",
    },
  }[lang];

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: "/case-studies" },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: lang === "de" ? "de_DE" : "en_US",
      url: "/case-studies",
    },
  };
}

export default async function CaseStudiesPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const { lang: raw } = await searchParams;
  return <CaseStudiesView initialLang={pickLang(raw)} />;
}
