"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/* Mooni in 3D mit den sechs Werten (ValuesManifesto). Lädt erst, wenn der Abschnitt näher als zwei Bildschirmhöhen kommt:
   So bleibt three.js aus dem ersten Laden der Startseite heraus, die dadurch seit dem 11.11.2026 schnell ist.
   Der Platzhalter hat dieselbe Höhe wie der Abschnitt, darum springt beim Nachladen nichts. */
function Platzhalter() {
  return <section aria-hidden style={{ height: "300vh", background: "var(--cream)" }} />;
}

const ValuesManifesto = dynamic(() => import("./ValuesManifesto"), { ssr: false, loading: () => <Platzhalter /> });

export default function MooniWelt() {
  const ref = useRef<HTMLDivElement>(null);
  const [nah, setNah] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNah(true), { rootMargin: "200% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return nah ? (
    <ValuesManifesto />
  ) : (
    <div ref={ref}>
      <Platzhalter />
    </div>
  );
}
