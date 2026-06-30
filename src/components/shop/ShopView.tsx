"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import SabalaLogo from "@/components/brand/SabalaLogo";
import ClaudeLogo from "@/components/brand/ClaudeLogo";
import { ArrowRight, Check } from "lucide-react";

/* ─── Produkt-Daten ───────────────────────────────────────────────────────────
 * Nur echte, verkaufbare Produkte. Neues Produkt = ein Eintrag mehr, der Grid
 * rendert es. Reihenfolge = Preis aufsteigend (Einstieg zuerst).
 * cover: Pfad in /public. href: Detailseite oder ThriveCart-Checkout.
 */
type Product = {
  kicker: string;
  title: string;
  desc: string;
  points: string[];
  price: string;
  priceNote?: string;
  badge?: string;
  cover: string;
  href: string;
  cta: string;
  available?: boolean; // false = Karte zeigt "Bald verfügbar", kein Link (Checkout noch nicht live)
};

const PRODUCTS: Product[] = [
  {
    kicker: "Claude Code",
    title: "Skill-Bibliothek",
    desc: "Meine kuratierte Sammlung an Claude-Code-Skills mit geführtem Setup. Einmal eingerichtet, sofort nutzbar. Das Paket wächst weiter, Updates sind dabei.",
    points: [
      "Kuratierte Skills statt stundenlangem Suchen",
      "Geführtes Setup, in einer halben Stunde startklar",
      "Wächst weiter, du bekommst die Updates",
    ],
    price: "19",
    badge: "Start hier",
    cover: "/shop/skill-bibliothek-cover.jpg",
    href: "https://sabala-mentoring.thrivecart.com/sabalas-skill-bibliothek/",
    cta: "Jetzt sichern",
    available: false,
  },
  {
    kicker: "Custom GPTs",
    title: "KI-Assistenzteam",
    desc: "Dein Wissen als sieben spezialisierte GPTs, die in deiner Stimme schreiben und dir die tägliche Routinearbeit abnehmen.",
    points: [
      "Sieben kalibrierte Custom GPTs",
      "Deine Sprache statt generischem KI-Ton",
      "Sofort einsatzbereit, keine Technik nötig",
    ],
    price: "67",
    priceNote: "statt 147 €, für die ersten 50",
    badge: "Launch",
    cover: "/shop/ki-assistenzteam-cover.jpg",
    href: "/gpt-team",
    cta: "Ansehen",
  },
  {
    kicker: "Bauen mit Claude Code",
    title: "Web Design OS",
    desc: "Das komplette Setup, mit dem ich Premium-Webseiten mit Claude Code baue. Alle Skills, Anleitungen und Inspiration in einem Paket.",
    points: [
      "161 Farbpaletten, 57 Font-Paare",
      "In einer Stunde eingerichtet",
      "Auf deine Marke gedreht",
    ],
    price: "147",
    badge: "Beliebt",
    cover: "/webdesign-os/cover-3d.png",
    href: "/webdesign-os",
    cta: "Ansehen",
  },
  {
    kicker: "Open Source",
    title: "Mooni Voice",
    desc: "Lokale Sprache-zu-Text für den Mac. Sprich, und der Text steht da, in jeder App, auch in Claude Code und Terminal. Lokal, privat, mehrsprachig.",
    points: [
      "100 % lokal, deine Stimme bleibt auf dem Gerät",
      "In jeder App, auch Dev- und KI-Tools",
      "Gratis und quelloffen (MIT)",
    ],
    price: "0",
    badge: "Gratis",
    cover: "/shop/mooni-voice-cover.png",
    href: "/open-source-projekte/mooni-voice",
    cta: "Laden",
    available: true,
  },
];

const LADDER = [
  { step: "01", title: "Im Shop", desc: "holst du dir das praktische Werkzeug fuer deinen Einstieg." },
  { step: "02", title: "In der KI-Akademie", desc: "lernst du, wie alles zusammenspielt.", href: "/akademie-hub" },
  { step: "03", title: "Gemeinsam", desc: "bauen wir es direkt in dein Unternehmen.", href: "/mitentwickelt" },
];

function isExternal(href: string) {
  return href.startsWith("http");
}

export default function ShopView() {
  return (
    <main className="shop relative w-full overflow-x-hidden font-satoshi text-cream" style={{ background: "var(--tech-bg)" }}>
      {/* Scoped Keyframes — Aurora-Drift + sanftes Schweben */}
      <style>{`
        @keyframes shopAuroraA { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(6%, 4%) scale(1.12); } }
        @keyframes shopAuroraB { 0%,100% { transform: translate(0,0) scale(1.05); } 50% { transform: translate(-5%, -3%) scale(1); } }
        .shop-aurora-a { animation: shopAuroraA 16s ease-in-out infinite; }
        .shop-aurora-b { animation: shopAuroraB 20s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .shop-aurora-a, .shop-aurora-b { animation: none; } }
      `}</style>

      {/* Globaler Aurora-Hintergrund */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="shop-aurora-a absolute -left-[12%] -top-[10%] h-[70vh] w-[70vh] rounded-full blur-[110px]" style={{ background: "radial-gradient(circle, rgba(184,150,62,0.18), transparent 65%)" }} />
        <div className="shop-aurora-b absolute -right-[10%] top-[25%] h-[60vh] w-[60vh] rounded-full blur-[120px]" style={{ background: "radial-gradient(circle, rgba(212,174,90,0.12), transparent 65%)" }} />
        <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
      </div>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 pt-36 pb-24 md:pt-44 md:pb-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[70vw] -translate-x-1/2" style={{ background: "linear-gradient(90deg, transparent, rgba(184,150,62,0.4), transparent)" }} />
        <div className="relative mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3">
              <SabalaLogo size={44} light />
              <span className="font-mono text-[11px] uppercase tracking-[0.34em] text-gold">Sabala AI Shop</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="mt-8 font-serif leading-[1.04] text-cream" style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", letterSpacing: "-0.01em" }}>
              Dein <span className="text-gold-light italic">KI-Werkzeugkasten</span>,<br />sofort einsetzbar.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-warm-light/80">
              Skills, Vorlagen und Systeme rund um Claude Code und KI. Aus echter Praxis, damit du heute anfängst statt irgendwann.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-9 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 backdrop-blur-sm">
              <ClaudeLogo size={16} />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-warm-mid">Mit Claude Code gebaut</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PRODUKTE ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">Produkte</p>
          </ScrollReveal>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PRODUCTS.map((p) => {
              const ext = isExternal(p.href);
              const cardInner = (
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0d0a07]/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_30px_80px_-30px_rgba(184,150,62,0.45)]">
                  {/* Cover */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={p.cover}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0d0a07 6%, transparent 60%)" }} />
                    {p.badge && (
                      <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-tech-bg/70 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-gold-light backdrop-blur-sm">{p.badge}</span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-7">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-warm-mid">{p.kicker}</span>
                    <h2 className="mt-2 font-serif text-[1.9rem] leading-tight text-cream">{p.title}</h2>
                    <p className="mt-3 text-[0.97rem] leading-relaxed text-warm-light/70">{p.desc}</p>

                    <ul className="mt-5 space-y-2.5">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-[0.9rem] text-warm-light/75">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                          {pt}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-end justify-between pt-7">
                      <div>
                        <p className="font-serif text-cream">
                          {p.price === "0" ? (
                            <span className="text-[2.2rem] leading-none">Gratis</span>
                          ) : (
                            <>
                              <span className="text-[2.2rem] leading-none">{p.price}</span>
                              <span className="ml-1 text-lg text-gold-light">€</span>
                            </>
                          )}
                        </p>
                        {p.priceNote && <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-warm-mid">{p.priceNote}</p>}
                      </div>
                      {p.available === false ? (
                        <span className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-warm-mid">
                          Bald verfügbar
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-gold-light px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-tech-bg transition-colors group-hover:bg-gold">
                          {p.cta}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );

              return (
                <ScrollReveal key={p.title}>
                  {p.available === false ? (
                    <div className="block h-full">{cardInner}</div>
                  ) : ext ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="block h-full">{cardInner}</a>
                  ) : (
                    <Link href={p.href} className="block h-full">{cardInner}</Link>
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── VALUE LADDER ─────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 pb-28">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0a07]/60 px-8 py-14 backdrop-blur-sm md:px-14">
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2" style={{ background: "linear-gradient(90deg, transparent, rgba(184,150,62,0.4), transparent)" }} />
          <ScrollReveal>
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-gold">So geht es weiter</p>
          </ScrollReveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {LADDER.map((l) => {
              const inner = (
                <>
                  <span className="font-mono text-sm text-gold/70">{l.step}</span>
                  <p className="mt-3 font-serif text-[1.5rem] text-cream">{l.title}</p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-warm-light/65">{l.desc}</p>
                  {l.href && (
                    <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-light">
                      Mehr <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </>
              );
              return (
                <ScrollReveal key={l.step}>
                  {l.href ? (
                    <Link href={l.href} className="group block transition-opacity hover:opacity-80">{inner}</Link>
                  ) : (
                    <div>{inner}</div>
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
