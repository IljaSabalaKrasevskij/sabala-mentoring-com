"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function IljaHeroReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={
        {
          "--mx": "70%",
          "--my": "55%",
          "--reveal-radius": hovering ? "110px" : "0px",
          background: "#0A0806",
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0">
        <Image
          src="/hero/ilja-metal.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div
        className="absolute inset-0 transition-[mask-size] duration-300 ease-out"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle var(--reveal-radius) at var(--mx) var(--my), transparent 0%, transparent 60%, black 100%)",
          maskImage:
            "radial-gradient(circle var(--reveal-radius) at var(--mx) var(--my), transparent 0%, transparent 60%, black 100%)",
        }}
      >
        <Image
          src="/hero/ilja-default.png"
          alt="Ilja Krasevskij — Sabala Studios"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="ml-[6vw] max-w-[42vw]">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold">
            Sabala Studios
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.02] text-cream sm:text-6xl lg:text-7xl">
            Ich bringe KI<br />in dein Business.
          </h1>
          <p className="mt-6 max-w-md text-warm-light/80">
            Für dich gebaut. Mit dir entwickelt. Dir beigebracht.
          </p>
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.28em] text-warm-mid">
            Bewege die Maus über mich
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-warm-mid">
          ↓ scroll
        </span>
      </div>
    </section>
  );
}
