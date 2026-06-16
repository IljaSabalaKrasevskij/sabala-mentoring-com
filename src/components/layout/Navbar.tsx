"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Menü beim Routenwechsel automatisch schließen
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Body-Scroll sperren wenn Menü offen
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC schließt Menü
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Auf der neuen Startseite bewusst kein Menü, nur auf Unterseiten
  if (pathname === "/") return null;

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 w-full">
        <nav className="flex items-center justify-between bg-pure-surface/80 backdrop-blur-md px-4 sm:px-6 py-3 rounded-full shadow-[0_4px_30px_rgba(26,26,24,0.06)] border border-soft-stone/20 w-full max-w-5xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 text-deep-charcoal group shrink-0">
            <div className="relative w-8 h-8 md:w-9 md:h-9">
              <Image src="/images/logo-sabala-mentoring.png" alt="Sabala Logo" fill className="object-contain group-hover:scale-105 transition-transform" />
            </div>
            <span className="font-instrument text-2xl md:text-3xl tracking-tight">Sabala</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-warm-steel">
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-deep-charcoal transition-colors py-2">
                Angebot
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:rotate-180 transition-transform duration-300"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="bg-pure-surface border border-whisper-border rounded-xl shadow-[0_10px_30px_rgba(26,26,24,0.08)] py-2 min-w-[220px] flex flex-col overflow-hidden">
                  <Link href="/webseiten" className="px-5 py-2.5 text-refined-gold font-medium bg-refined-gold/5 hover:bg-refined-gold/10 transition-colors text-sm border-b border-refined-gold/10">Webseiten</Link>
                  <Link href="/mitentwickelt" className="px-5 py-2.5 hover:bg-warm-canvas text-deep-charcoal transition-colors text-sm font-medium">Mit dir entwickelt</Link>
                  <Link href="/akademie" className="px-5 py-2.5 hover:bg-warm-canvas text-deep-charcoal transition-colors text-sm font-medium">KI-Akademie</Link>
                  <Link href="/gpt-team" className="px-5 py-2.5 hover:bg-warm-canvas text-deep-charcoal transition-colors text-sm border-t border-whisper-border font-medium">KI-Assistenzteam</Link>
                </div>
              </div>
            </div>
            <Link href="/ueber-mich" className="hover:text-deep-charcoal transition-colors">About</Link>
            <Link href="/blog" className="hover:text-deep-charcoal transition-colors">Blog</Link>
          </div>

          {/* Right side: Termin (Desktop) + Burger (Mobile) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link
              href="/termin-buchen"
              className="hidden sm:inline-flex bg-refined-gold hover:bg-refined-gold/90 text-pure-surface px-5 md:px-6 py-2.5 rounded-full font-medium transition-all active:scale-95 shadow-sm text-sm md:text-base"
            >
              Termin buchen
            </Link>

            {/* Burger-Button — nur auf Mobile */}
            <button
              type="button"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-warm-canvas transition-colors"
            >
              <span className="sr-only">{open ? "Menü schließen" : "Menü öffnen"}</span>
              <span
                className={`absolute h-[1.5px] w-5 bg-deep-charcoal transition-all duration-300 ease-out ${
                  open ? "rotate-45 translate-y-0" : "-translate-y-[5px]"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-5 bg-deep-charcoal transition-all duration-300 ease-out ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-5 bg-deep-charcoal transition-all duration-300 ease-out ${
                  open ? "-rotate-45 translate-y-0" : "translate-y-[5px]"
                }`}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Off-Canvas Menü */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-deep-charcoal/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* Panel — full-screen, scroll-bar */}
        <div
          className={`absolute inset-x-3 top-20 bottom-3 bg-pure-surface rounded-[28px] shadow-[0_30px_80px_rgba(26,26,24,0.18)] border border-whisper-border overflow-y-auto transition-transform duration-300 ease-out ${
            open ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="px-6 pt-8 pb-10 flex flex-col">
            {/* Section: Angebote */}
            <div className="mb-2">
              <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-warm-steel/70">Angebote</span>
            </div>
            <Link
              href="/webseiten"
              className="block py-4 border-b border-whisper-border text-refined-gold font-instrument text-2xl"
            >
              Webseiten
              <span className="block text-[0.7rem] font-mono tracking-widest uppercase text-refined-gold/70 mt-1">Premium-Auftritt mit Wow-Effekt</span>
            </Link>
            <Link
              href="/mitentwickelt"
              className="block py-4 border-b border-whisper-border text-deep-charcoal font-instrument text-2xl"
            >
              Mit dir entwickelt
              <span className="block text-[0.7rem] font-mono tracking-widest uppercase text-warm-steel/70 mt-1">Co-Development &amp; Rescue</span>
            </Link>
            <Link
              href="/akademie"
              className="block py-4 border-b border-whisper-border text-deep-charcoal font-instrument text-2xl"
            >
              KI-Akademie
              <span className="block text-[0.7rem] font-mono tracking-widest uppercase text-warm-steel/70 mt-1">Dein erster KI-Kurs</span>
            </Link>
            <Link
              href="/gpt-team"
              className="block py-4 border-b border-whisper-border text-deep-charcoal font-instrument text-2xl"
            >
              KI-Assistenzteam
              <span className="block text-[0.7rem] font-mono tracking-widest uppercase text-warm-steel/70 mt-1">Dein 7-Kasten-GPT-System</span>
            </Link>

            {/* Section: Mehr */}
            <div className="mt-8 mb-2">
              <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-warm-steel/70">Mehr</span>
            </div>
            <Link href="/ueber-mich" className="block py-4 border-b border-whisper-border text-deep-charcoal font-instrument text-2xl">
              About
            </Link>
            <Link href="/blog" className="block py-4 border-b border-whisper-border text-deep-charcoal font-instrument text-2xl">
              Blog
            </Link>
            <Link href="/referenzen" className="block py-4 border-b border-whisper-border text-deep-charcoal font-instrument text-2xl">
              Referenzen
            </Link>

            {/* CTA */}
            <Link
              href="/termin-buchen"
              className="mt-10 inline-flex items-center justify-center bg-refined-gold hover:bg-refined-gold/90 active:scale-[0.98] text-pure-surface px-8 py-5 rounded-full font-medium text-lg transition-all shadow-[0_10px_30px_rgba(184,150,62,0.20)]"
            >
              Termin buchen
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>

            <a
              href="mailto:sabala@sabala-mentoring.com"
              className="mt-6 text-center text-warm-steel font-satoshi text-sm hover:text-deep-charcoal transition-colors"
            >
              sabala@sabala-mentoring.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
