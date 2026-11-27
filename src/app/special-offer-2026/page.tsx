import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CalendarClock, Mail, Percent } from "lucide-react";
import AboutIlja from "@/components/akademie/AboutIlja";
import { Brackets, GOLD_AUF_HELL, Knopf, Reveal, SektionsKopf, TEXT_AUF_DUNKEL, TEXT_AUF_HELL, TiltCard } from "@/components/akademie/shared";
import { KURS_PREIS } from "@/components/akademie/cohorts";
import { WEBKURS_PREIS } from "@/components/webkurs/daten";
import { KASSE_SB, KASSE_WEB, PREIS_SB, PREIS_WEB, euro } from "./angebot";
import Umschalter from "./Umschalter";

/* Special Offer 2026 (Ilja, 27.11.2026): Verkaufsseite für zwei Gutscheine, je ein Platz in einem Kurs 2027 zum halben Preis.
   Bauplan: Vault Akademie/Special-Offer-2026_Verkaufsseite_Bauplan.md. Sieben Abschnitte: Kopf, Heute und 2027,
   Umschalter mit beiden Kursen, Ablauf, Trainer, Fragen, Schluss. Gekauft wird bei ThriveCart, der Code kommt mit der
   automatischen Kaufbestätigung. ponytail: nicht im Index, nicht in Sitemap und llms.txt, kein JSON-LD. Die Seite lebt
   von der Rundmail und nur 2026; danach löschen oder per Umleitung auf /akademie-hub schicken. */

const SEITE = "/special-offer-2026";
const EIN = (delay: number) => ({ "--cs-d": `${delay}s` }) as React.CSSProperties;

const HEUTE_2027: [string, string][] = [
  ["Claude vergisst nach jedem Chat, wer du bist.", "Claude kennt dein Wissen, deine Kunden und deine Projekte."],
  ["Dein Wissen liegt verstreut in Tabs, Mails und Notizen.", "Alles liegt an einem Ort, auf deinem eigenen Rechner."],
  ["Deine Webseite hängt an einem Baukasten oder an jemandem, der sie für dich ändert.", "Du baust und änderst deine Seite selbst, mit Claude Code."],
  ["2027 zahlst du den vollen Preis.", "Du hast heute die Hälfte gespart. Dein Platz ist bezahlt."],
];

const SCHRITTE: [string, string][] = [
  ["Heute", "Du kaufst deinen Gutschein über die sichere Kasse. Die Rechnung kommt sofort."],
  ["Direkt danach", "Dein Gutscheincode kommt automatisch per Mail."],
  ["2027", "Sobald die Termine stehen, wählst du deinen Termin und gibst den Code an der Kasse ein. Dein Platz ist bezahlt."],
];

const FRAGEN: [string, string][] = [
  ["Wann sind die Kurse 2027?", "Die Termine stehen noch nicht fest. Sobald sie da sind, bekommst du sie per Mail und wählst deinen Termin."],
  ["Wie bekomme ich meinen Gutscheincode?", "Automatisch: Direkt nach dem Kauf kommt eine Mail mit deinem Code und der Rechnung."],
  ["Kann ich mir den Termin aussuchen?", "Ja. Der Gutschein gilt für jeden Termin dieses Kurses in 2027."],
  ["Was ist, wenn 2027 kein Kurs stattfindet?", "Dann bekommst du dein Geld vollständig zurück."],
  ["Kann ich den Gutschein verschenken?", "Ja. Er gilt für eine Person deiner Wahl. Sag mir beim Einlösen einfach, wer kommt."],
  ["Kann ich beide Gutscheine kaufen?", `Ja. Dann sparst du zusammen ${euro(KURS_PREIS - PREIS_SB + WEBKURS_PREIS - PREIS_WEB)}.`],
  ["Warum stehen die Preise netto da?", "Das Angebot richtet sich an Unternehmen und Selbständige. Die Mehrwertsteuer rechnet die Kasse dazu."],
];

const title = "Special Offer 2026: Kurs-Gutschein für 2027";
const description = `Zwei Gutscheine für 2027: Second Brain mit Claude Code für ${euro(PREIS_SB)} statt ${euro(KURS_PREIS)}, der Webseiten-Kurs für ${euro(PREIS_WEB)} statt ${euro(WEBKURS_PREIS)}, netto. Nur 2026.`;

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: SEITE },
  openGraph: { title, description, url: SEITE, type: "website", locale: "de_DE", siteName: "Sabala Studios", images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sabala Academy · Special Offer 2026" }] },
};

function Kopf() {
  const fakten = [
    { symbol: Percent, text: "Je 50 % günstiger, netto" },
    { symbol: Mail, text: "Dein Code kommt automatisch per Mail" },
    { symbol: CalendarClock, text: "Gilt für jeden Termin 2027" },
  ];
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--tech-bg)" }}>
      <div aria-hidden className="absolute inset-0">
        <Image src="/akademie/ki-library-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover" style={{ opacity: 0.4, objectPosition: "center 42%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0.92) 0%, rgba(10,8,6,0.74) 45%, rgba(10,8,6,0.96) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 60% at 76% 50%, rgba(184,150,62,0.2), transparent 70%)" }} />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-6 pb-14 pt-24 sm:px-[6vw] min-[56.25rem]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] min-[56.25rem]:gap-14 min-[56.25rem]:pb-[7vh] min-[56.25rem]:pt-[max(9vh,5.4rem)]">
        <div>
          <p className="cs-rise font-mono text-[12.5px] uppercase leading-relaxed tracking-[0.2em] text-gold sm:tracking-[0.24em]" style={EIN(0)}>
            Special Offer 2026 · Sabala Academy
          </p>
          <h1 className="cs-rise mt-4 font-serif text-cream" style={{ fontSize: "clamp(2.5rem, 4.6vw, 4.1rem)", lineHeight: 1.05, ...EIN(0.05) }}>
            <span className="block">Dein Kurs für 2027.</span>{" "}
            <span className="block text-gold-light">Heute zum halben Preis.</span>
          </h1>
          <p className="cs-rise mt-6 max-w-xl text-pretty text-[1.06rem] leading-relaxed min-[56.25rem]:text-[1.12rem]" style={{ color: "rgba(250,248,245,0.86)", ...EIN(0.12) }}>
            Zwei Kurse, zwei Gutscheine: Du sicherst dir heute deinen Platz und zahlst nur die Hälfte.
          </p>

          <div className="cs-rise mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={EIN(0.18)}>
            <Knopf href="#second-brain">Second Brain ansehen</Knopf>
            <Knopf zweit href="#webseiten-kurs">
              Webseiten-Kurs ansehen
            </Knopf>
          </div>

          <ul className="cs-rise mt-7 space-y-2.5" style={EIN(0.24)}>
            {fakten.map(({ symbol: Symbol, text }) => (
              <li key={text} className="flex items-start gap-3 text-[0.97rem] leading-snug" style={{ color: TEXT_AUF_DUNKEL }}>
                <Symbol aria-hidden size={18} className="mt-0.5 shrink-0 text-gold" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="cs-rise relative mx-auto w-full" style={{ maxWidth: "min(400px, 56vh, 70vw)", ...EIN(0.2) }}>
          <span className="pointer-events-none absolute -inset-6 rounded-3xl" style={{ background: "radial-gradient(ellipse, rgba(184,150,62,0.22), transparent 70%)" }} />
          <TiltCard hervor={1.03} max={6} radius={16}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl" style={{ border: "1.5px solid rgba(184,150,62,0.5)", boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(184,150,62,0.14)" }}>
              <Brackets color="rgba(184,150,62,0.7)" inset={14} size={16} />
              <Image src="/akademie/ilja-trainer-2026.jpg" alt="Ilja Krasevskij, dein Trainer in beiden Kursen" fill priority sizes="(max-width: 900px) 70vw, 400px" className="object-cover object-center" />
              <p className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-14" style={{ background: "linear-gradient(180deg, rgba(10,8,6,0) 0%, rgba(10,8,6,0.88) 70%)" }}>
                <span className="block font-mono text-[12.5px] uppercase tracking-[0.2em] text-gold-light">Deine Kurse 2027 mit</span>
                <span className="mt-0.5 block font-serif text-[1.35rem] leading-tight text-cream">Ilja Krasevskij</span>
              </p>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

/* Heute und 2027: links, wie es heute ist, rechts im goldenen Feld, wie es mit dem Gutschein wird. */
function Heute2027() {
  return (
    <section className="relative overflow-hidden px-6 py-[6.5vh]" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #faf2dd 60%, var(--cream) 100%)" }}>
      <div className="relative mx-auto max-w-5xl">
        <SektionsKopf
          hell
          zeile="Was sich für dich ändert"
          titel={
            <>
              Heute probierst du KI aus. <span style={{ color: GOLD_AUF_HELL }}>2027 arbeitet sie für dich.</span>
            </>
          }
        />
        <div className="mt-8 hidden grid-cols-[1fr_auto_1fr] gap-4 px-1 md:grid">
          <p className="font-mono text-[12.5px] uppercase tracking-[0.18em]" style={{ color: TEXT_AUF_HELL }}>Heute</p>
          <span className="w-5" />
          <p className="font-mono text-[12.5px] uppercase tracking-[0.18em]" style={{ color: GOLD_AUF_HELL }}>2027, mit deinem Gutschein</p>
        </div>
        <ul className="mt-3 space-y-3">
          {HEUTE_2027.map(([heute, danach], i) => (
            <li key={heute}>
              <Reveal delay={i * 0.06} className="grid items-stretch gap-2 md:grid-cols-[1fr_auto_1fr] md:gap-4">
                <p className="rounded-xl bg-white/70 px-5 py-4 text-[1.02rem] leading-snug" style={{ color: TEXT_AUF_HELL, border: "1px solid rgba(46,43,38,0.1)" }}>
                  {heute}
                </p>
                <ArrowRight aria-hidden size={20} className="mx-auto rotate-90 self-center text-gold md:rotate-0" />
                <p className="rounded-xl px-5 py-4 text-[1.02rem] font-medium leading-snug text-deep" style={{ background: "linear-gradient(135deg, #f6e7bf 0%, #efd89a 100%)", border: "1px solid rgba(184,150,62,0.55)" }}>
                  {danach}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Ablauf: drei Schritte, darunter die zwei Gutscheine so, wie sie an der Kasse aussehen (gleiche Banner wie bei ThriveCart). */
function Ablauf() {
  return (
    <section id="ablauf" className="relative scroll-mt-4 overflow-hidden px-6 py-[6.5vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[70vh] w-[70vw] -translate-x-1/2" style={{ background: "radial-gradient(ellipse, rgba(212,174,90,0.12), transparent 70%)" }} />
      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          zeile="So funktioniert dein Gutschein"
          titel={
            <>
              Heute kaufen. <span className="text-gold-light">2027 lernen.</span>
            </>
          }
        />
        <ol className="mt-8 grid gap-5 min-[56.25rem]:grid-cols-3">
          {SCHRITTE.map(([wann, was], i) => (
            <li key={wann}>
              <Reveal delay={i * 0.08} className="h-full rounded-2xl p-6" style={{ background: "rgba(250,248,245,0.04)", border: "1px solid rgba(184,150,62,0.35)" }}>
                <p className="font-serif text-[2.6rem] leading-none text-gold-light">{i + 1}</p>
                <p className="mt-3 font-mono text-[12.5px] uppercase tracking-[0.18em] text-gold">{wann}</p>
                <p className="mt-2 text-[1.04rem] leading-relaxed text-cream">{was}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            ["/newsletter/second-brain-banner.jpg", "Gutschein Second Brain", "Banner: Dein Second Brain, die lokale Datenbasis, mit der Claude nie vergisst"],
            ["/special-offer/deine-webseite-banner.jpg", "Gutschein Webseiten-Kurs", "Banner: Deine Webseite, gebaut mit Claude Code, live auf deiner eigenen Domain"],
          ].map(([bild, name, alt]) => (
            <Reveal key={name}>
              <figure className="overflow-hidden rounded-xl" style={{ border: "2px dashed rgba(212,174,90,0.55)" }}>
                <div className="relative aspect-[1200/375]">
                  <Image src={bild} alt={alt} fill sizes="(max-width: 768px) 92vw, 560px" className="object-cover" />
                </div>
                <figcaption className="px-4 py-2.5 font-mono text-[12.5px] uppercase tracking-[0.16em] text-gold-light">{name}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Fragen() {
  return (
    <section className="relative overflow-hidden px-6 py-[6.5vh]" style={{ background: "var(--cream)" }}>
      <div className="relative mx-auto max-w-3xl">
        <SektionsKopf hell zeile="Fragen" titel="Was du zum Gutschein wissen willst" />
        <div className="mt-8 space-y-3">
          {FRAGEN.map(([frage, antwort]) => (
            <details key={frage} className="group rounded-xl bg-white/70 px-5 py-4" style={{ border: "1px solid rgba(184,150,62,0.35)" }}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1.06rem] font-semibold text-deep marker:hidden">
                {frage}
                <span aria-hidden className="text-[1.3rem] leading-none text-gold transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-[1.02rem] leading-relaxed" style={{ color: TEXT_AUF_HELL }}>
                {antwort}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Schluss() {
  return (
    <section className="relative overflow-hidden px-6 py-[7vh]" style={{ background: "var(--tech-bg)" }}>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(ellipse, rgba(212,174,90,0.14), transparent 70%)" }} />
      <div className="relative mx-auto max-w-4xl text-center">
        <SektionsKopf
          zeile="Special Offer 2026"
          titel={
            <>
              Nur 2026: <span className="text-gold-light">dein Platz zum halben Preis.</span>
            </>
          }
          text="Such dir einen Kurs aus oder nimm beide. Der Code kommt direkt nach dem Kauf per Mail."
        />
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Knopf href={KASSE_SB} neuerTab>
            Second Brain · {euro(PREIS_SB)}
          </Knopf>
          <Knopf href={KASSE_WEB} neuerTab>
            Webseiten-Kurs · {euro(PREIS_WEB)}
          </Knopf>
        </div>
        <p className="mt-4 text-[0.9rem]" style={{ color: TEXT_AUF_DUNKEL }}>
          Preise netto zzgl. MwSt. · für Unternehmen und Selbständige
        </p>
      </div>
    </section>
  );
}

export default function SpecialOfferPage() {
  return (
    <main className="flex-1">
      <Kopf />
      <Heute2027 />
      <Umschalter />
      <Ablauf />
      <AboutIlja />
      <Fragen />
      <Schluss />
    </main>
  );
}
