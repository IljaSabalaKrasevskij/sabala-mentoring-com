"use client";

import Image from "next/image";
import { Brackets, GOLD_AUF_HELL, Reveal, SektionsKopf, TEXT_AUF_HELL, TiltCard } from "./shared";

/* Dein Trainer: Porträt und kurze, menschliche Autorität. Kein Lebenslauf.
   Die drei Siegel stehen unter dem Text, weil sie belegen, was der Text sagt. Ihre weißen Bildränder
   verschwinden durch mix-blend-multiply im hellen Grund. */

export default function AboutIlja() {
  return (
    <section className="relative overflow-hidden px-6 py-[6vh]" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #faf2dd 55%, var(--cream) 100%)" }}>
      <div className="pointer-events-none absolute -left-[10%] top-[15%] h-[55vh] w-[55vw]" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.2), transparent 70%)" }} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-14">
        <div>
          <SektionsKopf
            hell
            links
            zeile="Dein Trainer"
            titel={
              <>
                Ich bin Trainer. <span style={{ color: GOLD_AUF_HELL }}>Seit ich 19 bin.</span>
              </>
            }
          />
          <Reveal className="mt-5 max-w-xl space-y-3 text-[1.04rem] leading-relaxed" style={{ color: TEXT_AUF_HELL }}>
            <p>Mit 19 wurde ich Führungskraft bei McDonald&apos;s und habe angefangen, Menschen auszubilden. Seitdem habe ich damit nie aufgehört.</p>
            <p>AdA-Schein, Trainer-der-Trainer, e-Trainer-Zertifizierung, eine Ausbildung als Business-Trainer und Speaker. Seit fünf Jahren arbeite ich als digitaler Trainer für Avendoo, ein Learning-Management-System. Und als KI-Dozent bei KIfiziert.</p>
            <p>Jetzt nehme ich alles, was ich übers Lehren gelernt habe, und bringe dir damit KI bei. So, wie Training wirklich funktioniert: vormachen, nachmachen, sicherstellen, dass du es kannst.</p>
            <p>Ein Training ist erst gut, wenn du das Gelernte danach wirklich nutzt. Genau dafür sorge ich.</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-5 border-t pt-4" style={{ borderColor: "rgba(184,150,62,0.4)" }}>
            <p className="font-mono text-[12.5px] uppercase tracking-[0.2em]" style={{ color: GOLD_AUF_HELL }}>
              Geprüft und zertifiziert
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-10 gap-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/trust/ica.png" alt="ICA, International Coaching Association: Certified Trainer" className="h-14 w-auto mix-blend-multiply" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/trust/fhm-virtuelle.png" alt="FHM-Gütesiegel: zertifizierter eTrainer, virtuelle Unterrichtsqualität" className="h-14 w-auto mix-blend-multiply" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/trust/provenexpert.png" alt="ProvenExpert: geprüfte Bewertungen" className="h-8 w-auto mix-blend-multiply" />
            </div>
          </Reveal>
        </div>

        {/* Am Handy steht das Bild zuerst, am Laptop rechts neben dem Text. Die Breite hängt auch an der
            Fensterhöhe, damit der Abschnitt auf einem flachen Laptop-Fenster nicht über den Rand wächst. */}
        <Reveal delay={0.1} className="relative order-first mx-auto w-full md:order-none" style={{ maxWidth: "min(440px, 58vh)" }}>
          <span className="pointer-events-none absolute -inset-6 rounded-3xl" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.2), transparent 70%)" }} />
          {/* Das Bild neigt sich mit der Maus und kommt nach vorn */}
          <TiltCard hervor={1.03} max={6} radius={16}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl" style={{ border: "1.5px solid rgba(184,150,62,0.45)", boxShadow: "0 30px 70px rgba(120,90,30,0.24), 0 8px 24px rgba(184,150,62,0.16)" }}>
              <Brackets color="rgba(184,150,62,0.7)" inset={14} size={16} />
              <Image src="/akademie/ilja-trainer-2026.jpg" alt="Ilja Krasevskij, Trainer der Sabala Academy" fill sizes="(max-width: 768px) 90vw, 440px" className="object-cover object-center" />
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
