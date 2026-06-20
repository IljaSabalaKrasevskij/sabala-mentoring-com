"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const ANGEBOT = [
  { href: "/webseiten", label: "Webseiten", note: "Premium-Auftritt, der verkauft" },
  { href: "/mitentwickelt", label: "Mit dir entwickelt", note: "Co-Development & Agentensysteme" },
  { href: "/akademie-hub", label: "KI-Akademie", note: "Dein Team wird KI-fit" },
  { href: "/gpt-team", label: "KI-Assistenzteam", note: "Dein Wissen als GPT-Team" },
];

const MEHR = [
  { href: "/blog", label: "Blog" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/case-studies", label: "Case Studies" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Menü beim Routenwechsel schließen
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Body-Scroll sperren wenn offen + ESC schließt
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const kontaktHref = pathname === "/" ? "#kontakt" : "/#kontakt";

  return (
    <>
      {/* Hamburger — immer sichtbar, oben rechts, funktioniert über hell und dunkel */}
      <button
        type="button"
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed right-4 top-4 z-[70] flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md transition-transform active:scale-95 sm:right-6 sm:top-6"
        style={{ background: "rgba(10,8,6,0.55)", border: "1px solid rgba(212,174,90,0.28)" }}
      >
        <span className="relative block h-3.5 w-5">
          <span className={`absolute left-0 h-[1.5px] w-5 bg-cream transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 top-1.5 h-[1.5px] w-5 bg-cream transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`absolute left-0 h-[1.5px] w-5 bg-cream transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
        </span>
      </button>

      {/* Vollbild-Overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-400 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        style={{ background: "var(--tech-bg)" }}
        aria-hidden={!open}
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.12), transparent 70%)" }} />

        <div className="relative flex h-full flex-col overflow-y-auto px-7 pb-12 pt-24 sm:px-12">
          <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.34em] text-gold">
            Sabala Studios
          </Link>

          <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.28em] text-warm-mid">Angebot</p>
          <nav className="mt-3 flex flex-col">
            {ANGEBOT.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className="group border-b py-4 transition-colors"
                style={{
                  borderColor: "rgba(255,255,255,0.07)",
                  transitionDelay: open ? `${0.08 + i * 0.05}s` : "0s",
                  transform: open ? "translateY(0)" : "translateY(12px)",
                  opacity: open ? 1 : 0,
                  transitionProperty: "opacity, transform, color",
                  transitionDuration: "0.5s",
                }}
              >
                <span className="font-serif text-[2rem] leading-tight text-cream transition-colors group-hover:text-gold-light sm:text-[2.4rem]">
                  {l.label}
                </span>
                <span className="ml-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-warm-mid">{l.note}</span>
              </Link>
            ))}
          </nav>

          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.28em] text-warm-mid">Mehr</p>
          <nav className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
            {MEHR.map((l) => (
              <Link key={l.href} href={l.href} className="font-serif text-[1.5rem] text-warm-light transition-colors hover:text-gold-light">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-5 pt-12 sm:flex-row sm:items-center sm:justify-between">
            <Link href={kontaktHref} className="inline-flex items-center justify-center rounded-full bg-gold-light px-8 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold">
              Lass uns reden
            </Link>
            <a href="mailto:sabala@sabala-mentoring.com" className="font-mono text-[12px] uppercase tracking-[0.14em] text-warm-mid transition-colors hover:text-gold-light">
              sabala@sabala-mentoring.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
