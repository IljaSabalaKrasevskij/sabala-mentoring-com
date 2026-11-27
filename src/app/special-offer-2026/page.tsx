import type { Metadata } from "next";
import Image from "next/image";
import { CalendarClock, Check, Gift, Percent } from "lucide-react";
import { Brackets, GOLD_AUF_HELL, HEBT, Knopf, Reveal, SektionsKopf, TEXT_AUF_DUNKEL, TEXT_AUF_HELL, TiltCard, Weiter } from "@/components/akademie/shared";
import { KURS_PREIS } from "@/components/akademie/cohorts";
import { KURS_PFAD, WEBKURS_PREIS } from "@/components/webkurs/daten";

/* Special Offer 2026 (Ilja, 27.11.2026): zwei Gutscheine für Kurse in 2027, je zum halben Preis.
   Gekauft wird bei ThriveCart, den persönlichen Code schickt Ilja nach dem Kauf, eingelöst wird er 2027 als Coupon.
   ponytail: nicht im Index, nicht in Sitemap und llms.txt, kein JSON-LD. Die Seite lebt nur von der Rundmail und nur 2026;
   danach löschen oder per Umleitung auf /akademie-hub schicken. Vier Abschnitte: Kopf, Gutscheine, Ablauf, Fragen. */

const SEITE = "/special-offer-2026";
const KASSE = "https://sabala-mentoring.thrivecart.com";
const euro = (n: number) => `${n.toLocaleString("de-DE")} €`; // festes Leerzeichen: Zahl und € brechen nie getrennt um
const EIN = (delay: number) => ({ "--cs-d": `${delay}s` }) as React.CSSProperties;

const GUTSCHEINE = [
  {
    marke: "Gutschein · Second-Brain-Kurs",
    name: "Second Brain mit Claude Code",
    satz: "Dein eigenes KI-System, das sich alles merkt. Wir richten es zusammen live ein.",
    punkte: ["Zwei Live-Workshops und eine Fragestunde per Zoom", "Claude Code und Obsidian, fertig eingerichtet und verbunden", "Meine Skills und Vorlagen bleiben bei dir"],
    // ponytail: Ilja ließ 197 oder 198 offen. 197 passt zur Preisleiter 97 / 397 und hält die Ersparnis über 50 %.
    preis: 197,
    statt: KURS_PREIS,
    kasse: `${KASSE}/gutschein-2027-second-brain/`,
    bild: "/case-studies/second-brain.jpg",
    alt: "Ein Second Brain als Sternkarte: Notizen, Skills und Erinnerungen rund um Claude",
    mehr: "/akademie",
  },
  {
    marke: "Gutschein · Webseiten-Kurs",
    name: "Webseiten bauen mit Claude Code",
    satz: "In sechs Wochen baust du deine eigene Webseite und stellst sie selbst online.",
    punkte: ["Sechs Workshops zu je zwei Stunden und fünf Fragestunden", "Eine Einzelstunde mit mir und ein Technik-Check vorab", "Deine Webseite, live auf deiner eigenen Domain"],
    preis: WEBKURS_PREIS / 2,
    statt: WEBKURS_PREIS,
    kasse: `${KASSE}/gutschein-2027-webseiten-kurs/`,
    bild: "/akademie/webkurs/bibliothek/kopf-zwei-takt.webp",
    alt: "Der Kopf einer Webseite, gebaut mit Claude Code",
    mehr: KURS_PFAD,
  },
];

const SCHRITTE = [
  ["Heute", "Du kaufst deinen Gutschein über die Kasse. Die Bestätigung kommt sofort per Mail."],
  ["Nach dem Kauf", "Ich schicke dir deinen persönlichen Gutscheincode."],
  ["2027", "Sobald die Termine stehen, suchst du dir deinen aus und löst den Code ein. Dein Platz ist bezahlt."],
];

const FRAGEN = [
  ["Wann sind die Kurse 2027?", "Die Termine stehen noch nicht fest. Sobald sie da sind, bekommst du sie per Mail und wählst deinen Termin."],
  ["Was ist, wenn 2027 kein Kurs stattfindet?", "Dann bekommst du dein Geld vollständig zurück."],
  ["Kann ich den Gutschein verschenken?", "Ja. Er gilt für eine Person deiner Wahl. Sag mir beim Einlösen einfach, wer kommt."],
  ["Warum stehen die Preise netto da?", "Das Angebot richtet sich an Unternehmen und Selbständige. Die Mehrwertsteuer rechnet die Kasse dazu."],
];

const title = "Special Offer 2026: Kurs-Gutschein für 2027";
const description = `Zwei Gutscheine für 2027: Second Brain mit Claude Code für ${euro(197)} statt ${euro(KURS_PREIS)}, der Webseiten-Kurs für ${euro(WEBKURS_PREIS / 2)} statt ${euro(WEBKURS_PREIS)}, netto. Nur 2026.`;

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: SEITE },
  openGraph: { title, description, url: SEITE, type: "website", locale: "de_DE", siteName: "Sabala Studios", images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sabala Academy · Special Offer 2026" }] },
};

function Kopf() {
  const fakten = [
    { symbol: Gift, text: "Zwei Gutscheine: Second-Brain-Kurs und Webseiten-Kurs" },
    { symbol: Percent, text: "Je 50 % günstiger, netto" },
    { symbol: CalendarClock, text: "Nur 2026 erhältlich, einlösbar 2027" },
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
            Kauf dir jetzt deinen Gutschein. Nach dem Kauf bekommst du deinen persönlichen Code, und 2027 ist dein Platz schon bezahlt.
          </p>

          <div className="cs-rise mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={EIN(0.18)}>
            <Knopf href="#gutscheine">Zu den Gutscheinen</Knopf>
            <Knopf zweit href="#ablauf">
              So funktioniert es
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

/* Die zwei Gutscheine als dunkle Karten mit gestricheltem Goldrand (wie der Gutschein auf /beratung) auf hellem Grund. */
function Gutscheine() {
  return (
    <section id="gutscheine" className="relative scroll-mt-4 overflow-hidden px-6 py-[6.5vh]" style={{ background: "var(--cream)" }}>
      <div className="relative mx-auto max-w-6xl">
        <SektionsKopf
          hell
          zeile="Zwei Gutscheine"
          titel={
            <>
              Such dir deinen Kurs aus. <span style={{ color: GOLD_AUF_HELL }}>Du zahlst die Hälfte.</span>
            </>
          }
        />

        <div className="mt-8 grid items-stretch gap-6 min-[56.25rem]:grid-cols-2">
          {GUTSCHEINE.map((g, i) => (
            <Reveal key={g.name} delay={i * 0.08} className="h-full">
              <TiltCard
                hervor={1.02}
                max={4}
                radius={16}
                glow="rgba(212,174,90,0.16)"
                className="group/karte h-full overflow-hidden shadow-[0_30px_70px_rgba(46,43,38,0.28)]"
                style={{ background: "linear-gradient(150deg, rgba(184,150,62,0.22) 0%, rgba(24,18,10,0.97) 55%)", border: "2px dashed rgba(212,174,90,0.65)" }}
              >
                <div className="flex h-full flex-col [transform-style:preserve-3d]">
                  <div className="relative aspect-[16/8] overflow-hidden border-b border-dashed" style={{ borderColor: "rgba(212,174,90,0.5)" }}>
                    <Image src={g.bild} alt={g.alt} fill sizes="(max-width: 900px) 92vw, 560px" className="object-cover object-top" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <p className="font-mono text-[12.5px] uppercase tracking-[0.18em] text-gold-light">{g.marke}</p>
                    <h3 className="mt-2 font-serif text-[1.7rem] leading-tight text-cream">{g.name}</h3>
                    <p className="mt-2 text-[1.02rem] leading-relaxed" style={{ color: TEXT_AUF_DUNKEL }}>
                      {g.satz}
                    </p>
                    <ul className="mt-4 space-y-2.5 [transform-style:preserve-3d]">
                      {g.punkte.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-[1rem] leading-snug" style={{ color: TEXT_AUF_DUNKEL }}>
                          <span className={`mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-tech-bg ${HEBT}`}>
                            <Check aria-hidden size={13} strokeWidth={3} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <p className={`mt-6 leading-none ${HEBT}`}>
                      <span className="font-serif text-gold-light" style={{ fontSize: "clamp(2.8rem, 5vw, 3.6rem)" }}>
                        {euro(g.preis)}
                      </span>
                      <span className="ml-3 text-[1.05rem] text-cream">
                        statt <span className="line-through decoration-[rgba(250,248,245,0.6)]">{euro(g.statt)}</span>
                      </span>
                    </p>
                    <p className="mt-2 text-[0.9rem] leading-snug" style={{ color: TEXT_AUF_DUNKEL }}>
                      netto zzgl. MwSt. · für Unternehmen und Selbständige
                    </p>
                    <div className="mt-auto flex flex-col gap-3 pt-6">
                      <Knopf href={g.kasse} neuerTab breit>
                        Gutschein kaufen
                      </Knopf>
                      <p className="text-center">
                        <Weiter href={g.mehr}>Mehr zum Kurs</Weiter>
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

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
              <summary className="cursor-pointer list-none text-[1.06rem] font-semibold text-deep marker:hidden">
                {frage}
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

export default function SpecialOfferPage() {
  return (
    <main className="flex-1">
      <Kopf />
      <Gutscheine />
      <Ablauf />
      <Fragen />
    </main>
  );
}
