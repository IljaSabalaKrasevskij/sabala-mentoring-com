import ClaudeStarterView from "@/components/akademie/ClaudeStarterView";

export const metadata = {
  title: "Claude Starter · Dein erster Abend mit Claude · Sabala Academy",
  description:
    "Der Einsteiger-Abend für alle, die mit Claude anfangen wollen, aber nicht wissen wo. Live, max 10, kein Vorwissen nötig. Installieren, Oberfläche, CLAUDE.md, Fehler vermeiden. 99 €.",
  alternates: { canonical: "/claude-starter" },
  openGraph: {
    title: "Claude Starter · Dein erster Abend mit Claude",
    description: "Live-Einsteiger-Abend, von null auf läuft. Kein Vorwissen nötig. 99 €.",
    url: "/claude-starter",
    locale: "de_DE",
  },
};

export default function ClaudeStarterPage() {
  return <ClaudeStarterView />;
}
