import type { Metadata } from "next";
import UmfrageForm from "@/components/umfrage/UmfrageForm";

export const metadata: Metadata = {
  title: "Wo willst du mit KI hin? · Sabala",
  description: "Zwei Minuten, die die nächsten Trainings prägen. Erzähl mir, wo du gerade stehst und wo du hin willst.",
  robots: { index: false, follow: false },
};

/* Umfrage-Landingpage. Ziel der E-Mail-Kampagne. Der ?k-Flag markiert
   Bestandskunden (eigene Quelle im Dashboard), Default = Newsletter. */
export default async function UmfragePage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string }>;
}) {
  const { k } = await searchParams;
  const quelle = k ? "Umfrage-Kunde" : "Umfrage-Newsletter";
  const gold = "#D4AE5A";

  return (
    <main style={{ background: "#080604", minHeight: "100vh" }}>
      {/* Intro */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(90px, 14vh, 150px) 24px clamp(40px, 6vh, 70px)" }}>
        <div aria-hidden style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: 700, height: 500, background: "radial-gradient(ellipse at center, rgba(212,174,90,0.10) 0%, rgba(212,174,90,0) 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <p className="font-mono" style={{ fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", color: gold, marginBottom: 22 }}>
            Kurze Umfrage · ca. 2 Minuten
          </p>
          <h1 style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: "clamp(34px, 5.5vw, 58px)", fontWeight: 400, color: "#FAF8F5", lineHeight: 1.06, marginBottom: 24 }}>
            Wo willst du mit KI eigentlich hin?
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(250,248,245,0.66)", lineHeight: 1.7, maxWidth: 600 }}>
            Ich baue meine Trainings und Inhalte für echte Menschen mit echten Fragen, nicht für eine anonyme Liste.
            Wenn ich weiß, wo du stehst und was dich gerade umtreibt, kann ich dir genau das geben, was du brauchst.
            Es gibt keine falschen Antworten. Nimm dir zwei Minuten.
          </p>
        </div>
      </section>

      <UmfrageForm quelle={quelle} />
    </main>
  );
}
