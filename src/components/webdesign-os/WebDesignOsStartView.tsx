"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  Download,
  Package,
  FolderOpen,
  ClipboardPaste,
  Sparkles,
  Rocket,
  Lightbulb,
  ShieldCheck,
  HelpCircle,
  Wrench,
  Palette,
  Gauge,
} from "lucide-react";
import SabalaLogo from "@/components/brand/SabalaLogo";

/* ------------------------------------------------------------------ */
/* Config — Download liegt auf Vercel Blob (kauf-gated via unguessbare  */
/* Store-URL, nicht im oeffentlichen Repo).                             */
/* ------------------------------------------------------------------ */
const DOWNLOAD_URL = "https://zyupntdkmomsgr4s.public.blob.vercel-storage.com/sabala-webdesign-os-v1.0.zip";

// Exakt der Text aus CUSTOMER-START.md im Paket — muss identisch bleiben.
const START_PROMPT = `Du bist mein Web-Design-Partner. Ich habe gerade das "Sabala Web Design OS" geladen:
einen Ordner mit Skills, MCP-Servern und Anleitungen, mit denen du hochwertige
Webseiten baust.

ZUERST, bevor du sonst irgendwas tust:
Liste die Dateien in deinem aktuellen Arbeitsordner auf. Du müsstest die Datei
CUSTOMER-START.md und einen Ordner namens skills/ sehen.
- Siehst du sie: sag "Ich sehe das Paket, wir koennen loslegen" und mach weiter.
- Siehst du sie NICHT: sag mir in einfachen Worten, dass du gerade im falschen Ordner
  bist, und erklaer mir Schritt fuer Schritt, wie ich dich im Ordner
  "sabala-webdesign-os" oeffne. Dann warte auf mich, bis du das Paket siehst.

Sobald du das Paket siehst, fuehr mich durch die Einrichtung:

1. Lies die Datei ./skills/sabala-webdesign-setup/SKILL.md und folge ihr Schritt
   fuer Schritt mit mir durch.
2. Pruef zuerst meine Voraussetzungen (Node, git, Python).
3. Stell mir den Onboarding-Fragebogen aus ./skills/webdesign-os/CUSTOMIZATION.md:
   Betriebssystem, ob ich einen Design-Guide habe, welche API-Keys ich will.
4. Installier die Skills und richte die MCP-Server ein, immer mit Platzhaltern fuer
   Keys, niemals echte Keys in geteilte Dateien.
5. Leg meine Brand-Datenbasis an: BRAND.md + DESIGN.md. Hab ich keinen Design-Guide,
   interview mich und erstell einen.
6. Am Ende: fuehr die Verifikation aus und zeig mir ein Status-Dashboard.

Wichtig: Erklaer mir jeden Schritt verstaendlich. Ich bin kein Entwickler. Frag nach,
wenn etwas unklar ist. Lass uns anfangen.`;

/* Die 3 Dinge, die DU tust — bewusst kleinschrittig, kein Vorwissen nötig. */
const SETUP_STEPS = [
  {
    icon: Package,
    title: "Paket herunterladen und entpacken",
    body: "Klick oben auf „Paket herunterladen“. Es kommt eine ZIP-Datei. Doppelklick drauf, dann liegt daneben der Ordner „sabala-webdesign-os“.",
    hint: "Merk dir, wo der Ordner liegt (Download-Ordner oder Schreibtisch). Den brauchst du gleich, und behalte ihn auch danach, für spätere Updates ist er praktisch.",
  },
  {
    icon: FolderOpen,
    title: "Claude Code in genau diesem Ordner öffnen",
    body: "Öffne die Claude-App, geh oben in den Reiter „Code“ und wähle dort den Ordner „sabala-webdesign-os“ als deinen Arbeitsordner. Du musst nichts tippen, nur den richtigen Ordner auswählen.",
    hint: "Kurzer Check: Oben in Claude muss „sabala-webdesign-os“ stehen. Steht da was anderes, bist du im falschen Ordner. Kommst du nicht weiter, frag Claude einfach „wie öffne ich dich in meinem Ordner?“.",
  },
  {
    icon: ClipboardPaste,
    title: "Starttext einfügen und Enter drücken",
    body: "Kopier den Starttext weiter unten mit einem Klick, füg ihn in Claude ein und drück Enter. Mehr machst du nicht.",
    hint: "Claude prüft danach als Allererstes selbst, ob es den Ordner sieht, und sagt dir sofort Bescheid, falls du noch etwas anpassen musst.",
  },
];

/* Was Claude danach automatisch mit dir macht — je eigenes Icon. */
const CLAUDE_DOES = [
  { icon: ShieldCheck, text: "Prüft deine Voraussetzungen (Node, git, Python) und hilft dir, was fehlt, nachzuinstallieren" },
  { icon: HelpCircle, text: "Stellt dir ein paar einfache Fragen: Betriebssystem, hast du einen Design-Guide, welche Zugänge willst du" },
  { icon: Wrench, text: "Installiert alle Werkzeuge und richtet die Server ein, immer mit Platzhaltern statt echter Schlüssel" },
  { icon: Palette, text: "Legt deinen eigenen Marken- und Design-Guide an (BRAND.md + DESIGN.md)" },
  { icon: Gauge, text: "Macht am Ende einen Selbsttest und zeigt dir ein übersichtliches Status-Dashboard" },
];

const CAN_DO = [
  "Fremde Webseiten analysieren und verstehen, wie sie gebaut sind",
  "Design-Inspiration gezielt finden und einsetzen",
  "Premium-Frontends bauen, die nicht nach Baukasten aussehen",
  "3D, Scroll-Effekte und Animationen einbauen",
  "Sicher und sauber live gehen",
];

/* Sanfte, zurückhaltende Reveal-Animation (Transform + Opacity, ease-out). */
const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};
const viewport = { once: true, margin: "-60px" };

export default function WebDesignOsStartView() {
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(START_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard kann in manchen Browsern blockiert sein — dann markiert der Nutzer selbst.
    }
  };

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#0d0a07] text-cream">
      {/* warmer Gold-Schein oben */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(212,174,90,0.22), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-2xl px-6 py-20 sm:py-28">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <SabalaLogo size={40} light />
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-light/80">
            Sabala Studios
          </span>
        </div>

        {/* Headline */}
        <motion.div initial="hidden" animate="show" variants={reveal}>
          <p className="mt-14 text-xs font-semibold uppercase tracking-[0.28em] text-gold-light">
            Dein Kauf ist da
          </p>
          <h1 className="mt-4 font-instrument-serif text-4xl leading-[1.1] sm:text-5xl">
            Da ist es. Dein Setup für{" "}
            <span className="italic text-gold-light">bessere Webseiten.</span>
          </h1>
        </motion.div>

        {/* Persönliches Dankeschön mit Portrait */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={reveal}
          className="mt-10 flex flex-col gap-5 rounded-3xl border border-gold-light/15 bg-white/[0.025] p-6 sm:flex-row sm:items-center sm:gap-7 sm:p-7"
        >
          <div className="relative mx-auto h-28 w-28 shrink-0 sm:mx-0">
            <div
              aria-hidden
              className="absolute -inset-2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,174,90,0.35), transparent 70%)",
              }}
            />
            <Image
              src="/ilja-portrait.png"
              alt="Ilja Krasevskij, Sabala Studios"
              fill
              sizes="112px"
              className="relative rounded-full object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-light/80">
              Persönlich von mir
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-cream/85">
              Danke, dass du mir vertraust. Ich hab dieses Setup gebaut, damit du
              dasselbe Werkzeug in der Hand hast wie ich, ohne jahrelang Code lernen zu
              müssen. Wenn du irgendwo hängst, antworte einfach auf deine Kauf-Mail. Ich
              lese mit. Jetzt lass es uns einrichten.
            </p>
            <p className="mt-4 font-instrument-serif text-2xl text-gold-light">Ilja</p>
          </div>
        </motion.div>

        {/* Download */}
        <div className="mt-9">
          <a
            href={DOWNLOAD_URL || "#ablauf"}
            className="inline-flex items-center gap-2.5 rounded-full bg-gold-light px-8 py-4 text-base font-semibold text-tech-bg transition-transform hover:scale-[1.02]"
          >
            <Download size={20} strokeWidth={2.2} />
            Paket herunterladen
          </a>
          <p className="mt-3 text-sm text-cream/55">
            Der Download-Link liegt auch in deinem Postfach. Nichts da? Schau im Spam oder
            antworte einfach auf die Mail.
          </p>
        </div>
      </div>

      {/* ====================  HELLES ANLEITUNGS-PANEL  ==================== */}
      <div id="ablauf" className="relative px-4 pb-4 sm:px-6">
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={reveal}
          className="mx-auto w-full max-w-2xl overflow-hidden rounded-[2rem] border border-[#E6D6AF] p-7 text-[#241a0c] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:p-10"
          style={{ background: "linear-gradient(180deg,#FCF8F0 0%,#F3E8D2 100%)" }}
        >
          {/* Kopf */}
          <div className="flex items-center gap-2 text-[#9a7521]">
            <Sparkles size={18} />
            <span className="text-xs font-semibold uppercase tracking-[0.28em]">
              So läuft es ab
            </span>
          </div>
          <h2 className="mt-3 font-instrument-serif text-[2rem] leading-tight text-[#1d150a] sm:text-[2.5rem]">
            Drei Schritte, dann übernimmt Claude
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#6a5b40] sm:text-lg">
            Einmal einrichten dauert ungefähr 60 Minuten. Du brauchst kein Vorwissen,
            folg einfach diesem Plan.
          </p>

          {/* Phase-Label: Du */}
          <div className="mt-9 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#B8963E]/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#8a6a1e]">
              <ClipboardPaste size={13} /> Du · ca. 5 Min
            </span>
            <span className="h-px flex-1 bg-[#1d150a]/10" />
          </div>

          {/* Timeline */}
          <ol className="mt-7">
            {SETUP_STEPS.map((s, i) => {
              const last = i === SETUP_STEPS.length - 1;
              return (
                <motion.li
                  key={s.title}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  variants={reveal}
                  className="flex gap-4 sm:gap-6"
                >
                  {/* Node + animierte Linie */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={viewport}
                      transition={{ duration: 0.45, delay: i * 0.08 + 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white shadow-[0_8px_20px_-6px_rgba(184,150,62,0.7)]"
                      style={{ background: "linear-gradient(145deg,#D4AE5A,#B8963E)" }}
                    >
                      {i + 1}
                    </motion.div>
                    {!last && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={viewport}
                        transition={{ duration: 0.6, delay: i * 0.08 + 0.2, ease: "easeOut" }}
                        className="my-1.5 w-[2px] flex-1 origin-top rounded-full"
                        style={{ background: "linear-gradient(180deg,#C9A24B,rgba(201,162,75,0.12))" }}
                      />
                    )}
                  </div>
                  {/* Inhalt */}
                  <div className={last ? "pb-1" : "pb-9"}>
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#B8963E]/12 text-[#9a7521]">
                        <s.icon size={17} strokeWidth={2.1} />
                      </span>
                      <p className="text-lg font-bold text-[#1d150a] sm:text-xl">{s.title}</p>
                    </div>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-[#544733] sm:text-base">
                      {s.body}
                    </p>
                    <div className="mt-3 flex gap-2.5 rounded-xl border border-[#B8963E]/25 bg-[#B8963E]/[0.08] px-4 py-3">
                      <Lightbulb size={17} className="mt-0.5 shrink-0 text-[#b8893a]" />
                      <p className="text-sm leading-relaxed text-[#7c6334] sm:text-[15px]">
                        {s.hint}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          {/* Starttext für Schritt 3 — dunkle Code-Insel im hellen Panel */}
          <div className="mt-2 rounded-2xl bg-[#14100a] p-5 shadow-inner">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-cream/85">
                Dein Starttext{" "}
                <span className="font-normal text-cream/50">(für Schritt 3)</span>
              </p>
              <button
                type="button"
                onClick={copyPrompt}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold-light/40 px-4 py-2 text-sm font-semibold text-gold-light transition-colors hover:bg-gold-light/10"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Kopiert" : "Kopieren"}
              </button>
            </div>
            <pre className="overflow-x-auto rounded-xl bg-black/40 p-4 text-[13px] leading-relaxed text-cream/80">
              <code className="font-mono whitespace-pre-wrap">{START_PROMPT}</code>
            </pre>
          </div>

          {/* Phase-Label: Claude */}
          <div className="mt-10 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#B8963E]/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#8a6a1e]">
              <Sparkles size={13} /> Claude · ca. 60 Min
            </span>
            <span className="h-px flex-1 bg-[#1d150a]/10" />
          </div>

          <h3 className="mt-6 text-xl font-bold text-[#1d150a] sm:text-2xl">
            Den Rest macht Claude mit dir zusammen
          </h3>
          <p className="mt-2.5 text-[15px] leading-relaxed text-[#6a5b40] sm:text-base">
            Sobald du Enter gedrückt hast, führt dich Claude Schritt für Schritt durch
            alles und erklärt jeden Schritt verständlich. Du musst nichts verstehen, nur
            antworten:
          </p>
          <ul className="mt-6 space-y-3.5">
            {CLAUDE_DOES.map((item, i) => (
              <motion.li
                key={item.text}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={reveal}
                className="flex items-start gap-3.5 rounded-xl bg-white/50 px-4 py-3 ring-1 ring-[#E6D6AF]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#B8963E]/14 text-[#9a7521]">
                  <item.icon size={18} strokeWidth={2.1} />
                </span>
                <span className="pt-1 text-[15px] leading-relaxed text-[#403525] sm:text-base">
                  {item.text}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.section>
      </div>
      {/* ==================  ENDE HELLES PANEL  ================== */}

      <div className="relative mx-auto w-full max-w-2xl px-6 pb-24">
        {/* Was du danach kannst */}
        <section className="mt-16">
          <h2 className="font-instrument-serif text-3xl">Was du danach kannst</h2>
          <ul className="mt-6 space-y-3">
            {CAN_DO.map((item, i) => (
              <motion.li
                key={item}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={reveal}
                className="flex items-center gap-3 text-[15px] text-cream/80 sm:text-base"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-light/12 text-gold-light">
                  <Check size={16} strokeWidth={2.4} />
                </span>
                {item}
              </motion.li>
            ))}
          </ul>

          {/* Erster Test als Callout */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            className="mt-8 flex gap-4 rounded-2xl border border-gold-light/20 bg-gold-light/[0.05] p-6"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-light/15 text-gold-light">
              <Rocket size={22} strokeWidth={2} />
            </div>
            <p className="text-[15px] leading-relaxed text-cream/85 sm:text-base">
              <span className="font-semibold text-cream">Dein erster Test:</span> Schreib in
              Claude Code{" "}
              <span className="rounded bg-gold-light/12 px-1.5 py-0.5 font-mono text-gold-light">
                /webdesign-os
              </span>{" "}
              und dann „Ich will eine Portfolio-Webseite bauen“. Du wirst sofort sehen, was
              jetzt anders ist.
            </p>
          </motion.div>
        </section>

        {/* Support */}
        <footer className="mt-16 border-t border-gold-light/12 pt-8">
          <p className="text-sm leading-relaxed text-cream/70">
            Wenn etwas hakt, antworte einfach auf deine Kauf-Mail. Ich lese mit.
          </p>
          <p className="mt-5 text-sm text-cream/80">
            Viel Freude beim Bauen,
            <br />
            Ilja · Sabala Studios
          </p>
        </footer>
      </div>
    </main>
  );
}
