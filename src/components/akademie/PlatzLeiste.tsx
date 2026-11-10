"use client";

import { useEffect, useState } from "react";
import { BUCHBAR, CURRENT_COHORT, STATUS_COLOR, STATUS_LABEL, formatTagMonat } from "./cohorts";

/* Leiste am unteren Rand, nur am Handy. Sie zeigt sich, sobald der Knopf im Kopf aus dem Bild ist,
   und verschwindet, solange der Block „Dein Platz“ zu sehen ist oder der Schluss erreicht wurde.
   So liegt sie nie über dem Knopf, zu dem sie führt, und nie über dem Fuß der Seite. */

export default function PlatzLeiste() {
  const [zeigen, setZeigen] = useState(false);

  useEffect(() => {
    const kopf = document.getElementById("kopf-knopf");
    const platz = document.getElementById("termine");
    const schluss = document.getElementById("schluss");
    const pruefen = () => {
      const h = window.innerHeight;
      const kopfVorbei = !kopf || kopf.getBoundingClientRect().bottom < 0;
      const p = platz?.getBoundingClientRect();
      const platzImBild = !!p && p.top < h && p.bottom > 0;
      const amSchluss = !!schluss && schluss.getBoundingClientRect().top < h;
      setZeigen(kopfVorbei && !platzImBild && !amSchluss);
    };
    pruefen();
    window.addEventListener("scroll", pruefen, { passive: true });
    window.addEventListener("resize", pruefen);
    return () => {
      window.removeEventListener("scroll", pruefen);
      window.removeEventListener("resize", pruefen);
    };
  }, []);

  return (
    <div
      inert={!zeigen}
      className={`fixed inset-x-0 bottom-0 z-50 transition-[transform,visibility] duration-300 md:hidden ${zeigen ? "visible translate-y-0" : "invisible translate-y-full"}`}
      style={{ background: "rgba(10,8,6,0.96)", borderTop: "1px solid rgba(184,150,62,0.4)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <p className="text-[0.95rem] leading-tight text-cream">
          <span className="block font-semibold">{CURRENT_COHORT ? `Ab ${formatTagMonat(CURRENT_COHORT.start)}` : "Nächster Kurs"}</span>
          <span className="mt-1 flex items-center gap-2 text-[0.85rem]" style={{ color: "rgba(250,248,245,0.7)" }}>
            {CURRENT_COHORT && <span className="h-2 w-2 rounded-full" style={{ background: STATUS_COLOR[CURRENT_COHORT.status] }} />}
            {CURRENT_COHORT ? STATUS_LABEL[CURRENT_COHORT.status] : "Termin folgt"}
          </span>
        </p>
        <a href="#termine" className="inline-flex min-h-[48px] shrink-0 items-center bg-gold px-5 font-sans text-[1rem] font-semibold tracking-[0.04em] text-tech-bg">
          {BUCHBAR ? "Platz sichern" : "Zur Warteliste"}
        </a>
      </div>
    </div>
  );
}
