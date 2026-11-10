"use client";

import { Brackets, Eyebrow, Reveal } from "./shared";

/* Erklärvideo direkt unter dem Kopf: Iljas Programme, die Wende, das Fundament. Zwei Minuten,
   animiert, gesprochen von seinem KI-Stimmklon (im Video und hier gekennzeichnet).
   Neue Fassung = neuer Dateiname, sonst liefert der Browser die alte aus dem Zwischenspeicher. */

export default function ErklaerVideo() {
  return (
    <section id="video" className="relative overflow-hidden px-6 py-[12vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.1), transparent 70%)" }} />

      <div className="relative mx-auto max-w-4xl">
        <Eyebrow>{"// 2 minuten · erst das fundament"}</Eyebrow>
        <Reveal>
          <h2 className="mx-auto mt-5 max-w-3xl text-center font-serif text-cream" style={{ fontSize: "clamp(2rem, 4.6vw, 3.2rem)", lineHeight: 1.06 }}>
            Was ich mit KI gebaut habe. <span className="block" style={{ color: "var(--gold)" }}>Und was davor kommt.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-10 aspect-video overflow-hidden rounded-xl" style={{ background: "linear-gradient(135deg, #15110b, #0a0806)", border: "1px solid rgba(184,150,62,0.4)", boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }}>
            <Brackets color="rgba(184,150,62,0.5)" inset={14} size={14} />
            <video controls preload="metadata" poster="/akademie/erklaervideo-2026-11-poster.jpg" className="absolute inset-0 h-full w-full rounded-xl object-cover">
              <source src="/akademie/erklaervideo-2026-11.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="mt-4 text-center text-[0.94rem] text-warm-mid">Gesprochen von meinem KI-Stimmklon. Ganz bewusst.</p>
        </Reveal>
      </div>
    </section>
  );
}
