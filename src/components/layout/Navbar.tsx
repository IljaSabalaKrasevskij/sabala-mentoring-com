"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SabalaLogo from "@/components/brand/SabalaLogo";

const ANGEBOT = [
  { href: "/webseiten", label: "Webseiten", note: "Premium-Auftritt, der verkauft" },
  { href: "/mitentwickelt", label: "Mit dir entwickelt", note: "Co-Development & Agentensysteme" },
  { href: "/akademie-hub", label: "KI-Akademie", note: "Dein Team wird KI-fit" },
  { href: "/ressourcen", label: "Ressourcen", note: "Startpaket und Werkzeuge, gratis" },
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

  // Zeigt ein Menüpunkt auf die Seite, auf der man schon ist, wechselt die Adresse nicht, und dann schließt
  // nichts das Menü. Darum hier von Hand schließen und an den Seitenanfang gehen (bei einem Sprungziel dorthin).
  // Bei jedem anderen Ziel bleibt das Menü offen, bis die neue Seite da ist.
  const klick = (href: string) => () => {
    const [pfad, anker] = href.split("#");
    if (pfad && pfad !== pathname) return;
    setOpen(false);
    if (anker) return;
    // Sofort nach oben, ohne Flug durch die ganze Seite. Wie Next.js beim Seitenwechsel: weiches Scrollen kurz aus,
    // Layout lesen (sonst übernimmt Chrome die Änderung nicht), springen, wieder an.
    const html = document.documentElement;
    const vorher = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    html.getClientRects();
    window.scrollTo(0, 0);
    html.style.scrollBehavior = vorher;
  };

  return (
    <>
      {/* Logo oben links: führt von jeder Seite zur Startseite. Es sitzt am Seitenanfang und scrollt mit weg,
          damit es beim Lesen nicht über dem Inhalt liegt. Weiter unten führt das Menü zurück.
          Der Kasten spiegelt den Menü-Knopf rechts (48 px, gleicher Abstand zum Rand), die Scheibe selbst hat 44 px.
          Köpfe mit Text am linken Rand lassen am Laptop mindestens 86 px bis zur ersten Zeile frei. */}
      <Link
        href="/"
        aria-label="Sabala Studios, zur Startseite"
        className="absolute left-4 top-4 z-[55] flex h-12 w-12 items-center justify-center rounded-full drop-shadow-[0_2px_10px_rgba(10,8,6,0.35)] transition-transform duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light active:scale-95 maus:hover:scale-105 sm:left-6 sm:top-6"
      >
        <SabalaLogo light knapp size={44} />
      </Link>

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
        inert={!open}
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[80vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse at top, rgba(184,150,62,0.12), transparent 70%)" }} />

        <div className="relative flex h-full flex-col overflow-y-auto px-7 pb-8 pt-4 sm:px-12 sm:pt-6">
          {/* Gleiche Stelle wie das Logo auf der Seite: Oben links geht es immer nach Hause. */}
          <Link
            href="/"
            onClick={klick("/")}
            className="-ml-3 flex h-12 shrink-0 items-center gap-3 self-start rounded-full font-mono text-[12.5px] uppercase tracking-[0.3em] text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light sm:-ml-6"
          >
            <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center">
              <SabalaLogo light knapp size={44} />
            </span>
            Sabala Studios
          </Link>

          <p className="mt-6 font-mono text-[12.5px] uppercase tracking-[0.28em] text-cream/78">Angebot</p>
          <nav className="mt-3 flex flex-col">
            {ANGEBOT.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={klick(l.href)}
                className="group border-b py-3 transition-colors"
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
                <span className="mt-1 block font-mono text-[12.5px] uppercase tracking-[0.18em] text-cream/78 sm:ml-3 sm:mt-0 sm:inline">{l.note}</span>
              </Link>
            ))}
          </nav>

          <p className="mt-8 font-mono text-[12.5px] uppercase tracking-[0.28em] text-cream/78">Mehr</p>
          <nav className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
            {MEHR.map((l) => (
              <Link key={l.href} href={l.href} onClick={klick(l.href)} className="font-serif text-[1.5rem] text-warm-light transition-colors hover:text-gold-light">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-5 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link href={kontaktHref} onClick={klick(kontaktHref)} className="inline-flex items-center justify-center rounded-full bg-gold-light px-8 py-4 font-mono text-sm uppercase tracking-[0.12em] text-tech-bg transition-colors hover:bg-gold">
              Lass uns reden
            </Link>
            <a href="mailto:sabala@sabala-mentoring.com" className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-cream/78 transition-colors hover:text-gold-light">
              sabala@sabala-mentoring.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
