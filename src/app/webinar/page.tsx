import MemoryDemo from "@/components/akademie/MemoryDemo";
import WebinarHero from "@/components/webinar/WebinarHero";
import WebinarOptIn from "@/components/webinar/WebinarOptIn";
import BrainViz from "@/components/webinar/BrainViz";
import BauenMitSetup from "@/components/webinar/BauenMitSetup";
import Dringlichkeit from "@/components/webinar/Dringlichkeit";
import CtaBand from "@/components/webinar/CtaBand";
import { FormatStrip, StickyCta } from "@/components/webinar/WebinarFormat";
import {
  Ablauf,
  Gastgeber,
  Mythen,
  WebinarFaq,
  Werkzeuge,
} from "@/components/webinar/WebinarSections";
import { WEBINAR } from "@/components/webinar/config";
import { ProvenExpertCard } from "@/components/ui/ProvenExpertCard";

export const metadata = {
  title: "Second Brain für Claude · Kostenloses Live-Webinar",
  description: `${WEBINAR.weekday}, ${WEBINAR.date}, ${WEBINAR.time}: Warum dein Wissen auf deine Festplatte gehört und nicht in einen Chatverlauf. Obsidian, NotebookLM und Claude Code live aufgebaut. Kostenlos, ohne eine Zeile Code.`,
  alternates: { canonical: "/webinar" },
  openGraph: {
    title: "Second Brain für Claude · Kostenloses Live-Webinar",
    description: `${WEBINAR.weekday}, ${WEBINAR.date}, ${WEBINAR.time}. Live, kostenlos, ohne eine Zeile Code.`,
    url: "/webinar",
    type: "website",
    images: [{ url: "/webinar/linkedin-post.png", width: 1200, height: 627 }],
  },
};

/* Event-Strukturdaten: Google zeigt damit Termin und Status direkt in der
   Suche, und Sharing-Vorschauen ziehen sauberes Datum. Online-Event, daher
   VirtualLocation statt Adresse. */
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Second Brain für Claude: Dein Wissen gehört auf deine Festplatte",
  description: WEBINAR.subtitle,
  startDate: WEBINAR.iso,
  endDate: WEBINAR.isoEnde,
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "VirtualLocation",
    url: "https://sabala-mentoring.com/webinar",
  },
  organizer: {
    "@type": "Person",
    name: "Ilja Krasevskij",
    url: "https://sabala-mentoring.com",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: "https://sabala-mentoring.com/webinar",
  },
};

export default function WebinarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <WebinarHero />
      <FormatStrip />
      <MemoryDemo />
      <BrainViz />
      <CtaBand text="Genau dieses System bauen wir live auf. In 60 Minuten, kostenlos." />
      <Mythen />
      <Werkzeuge />
      <BauenMitSetup />
      <Ablauf />
      <CtaBand text="Du weißt jetzt, was drinsteckt. Der Platz kostet dich nichts außer einer Stunde." knopf="Jetzt eintragen" />
      <Gastgeber />
      {/* Social Proof: echte ProvenExpert-Zahlen (live API, 6h-Cache), direkt
          unter dem Gastgeber in der hellen Insel. Server-Komponente, deshalb
          hier in der Page statt in den Client-Sektionen. */}
      <section style={{ background: "#faf8f5", padding: "0 0 clamp(60px, 8vw, 100px)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
          <div className="wb-proof" style={{ display: "grid", gap: "clamp(24px, 3.5vw, 44px)", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", alignItems: "start" }}>
            <ProvenExpertCard />

            {/* Woertliche Zitate aus der Abschlussrunde der Juni-Kohorte
                (Fathom-Mitschnitt 26.6.2026, Session 1). Nicht umformuliert. */}
            <div style={{ display: "grid", gap: 18 }}>
              <p className="font-mono" style={{ fontSize: 11.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8a6f2c" }}>
                Stimmen aus der ersten Kohorte
              </p>
              {[
                {
                  zitat: "Ich finde es immer gut, wenn das Lerntempo so hoch ist, dass ich kaum hinterherkomme. Dann gucke ich es mir nochmal an, dann arbeite ich mit, dann ist viel drin.",
                  name: "François Zietlow",
                  rolle: "Teilnehmer, Live-Session Juni 2026",
                },
                {
                  /* Woertlich aus der oeffentlichen ProvenExpert-Bewertung vom
                     9.7.2026, nur der Einstieg mit Tippfehler ("Zabala") ist
                     weggelassen. Oeffentlich publiziert, daher zitierbar. */
                  zitat: "... große Expertise, Geduld und Feinfühligkeit. Eine Freude mit ihm zu arbeiten!",
                  name: "Chris L.",
                  rolle: "ProvenExpert-Bewertung, Juli 2026",
                },
              ].map((z) => (
                <figure
                  key={z.name}
                  style={{ margin: 0, background: "#fff", border: "1px solid rgba(46,43,38,0.11)", borderLeft: "3px solid #b8963e", borderRadius: 4, padding: "22px 24px" }}
                >
                  <blockquote style={{ margin: 0, fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: "clamp(17px, 1.6vw, 20px)", lineHeight: 1.5, color: "#2e2b26" }}>
                    {"\u201E"}{z.zitat}{"\u201C"}
                  </blockquote>
                  <figcaption style={{ marginTop: 12, fontSize: 13.5, color: "#6a635a" }}>
                    <strong style={{ color: "#2e2b26", fontWeight: 600 }}>{z.name}</strong> · {z.rolle}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
      <WebinarFaq />
      <Dringlichkeit />
      <WebinarOptIn />
      <StickyCta />
    </>
  );
}
