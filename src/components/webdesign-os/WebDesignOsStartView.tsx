"use client";

import { useState } from "react";
import { Copy, Check, Download, Package, TerminalSquare, ClipboardPaste } from "lucide-react";
import SabalaLogo from "@/components/brand/SabalaLogo";

/* ------------------------------------------------------------------ */
/* Config — nach ThriveCart-Setup echten Download-Link eintragen.       */
/* Solange Platzhalter: Button zeigt auf die Mail.                      */
/* ------------------------------------------------------------------ */
const DOWNLOAD_URL = ""; // z.B. "https://sabala-mentoring.com/downloads/sabala-webdesign-os-v1.0.zip"

// Exakt der Text aus CUSTOMER-START.md im Paket — muss identisch bleiben.
const START_PROMPT = `Du bist mein Web-Design-Partner. Ich habe gerade das "Sabala Web Design OS"
installiert — ein Paket aus Skills, MCP-Servern und Anleitungen für den Bau
hochwertiger Webseiten mit Claude Code.

Bitte starte jetzt die geführte Einrichtung:

1. Lies die Datei ./skills/sabala-webdesign-setup/SKILL.md und folge ihr Schritt
   für Schritt mit mir durch.
2. Prüfe zuerst meine Voraussetzungen (Node, git, Python).
3. Frag mich den Onboarding-Fragebogen ab (aus ./skills/webdesign-os/CUSTOMIZATION.md):
   Betriebssystem, ob ich einen Design-Guide habe, welche API-Keys ich will.
4. Installiere die Skills und richte die MCP-Server ein — IMMER mit Platzhaltern
   für Keys, niemals echte Keys in geteilte Dateien.
5. Lege meine Brand-Datenbasis an: BRAND.md + DESIGN.md. Wenn ich keinen
   Design-Guide habe, interviewe mich und erstelle einen.
6. Am Ende: führe die Verifikation aus und zeig mir ein Status-Dashboard.

Wichtig: Erkläre mir jeden Schritt verständlich. Ich bin kein Entwickler.
Frag nach, wenn etwas unklar ist. Lass uns anfangen.`;

const STEPS = [
  {
    icon: Package,
    title: "Entpacken",
    body: "Lade das Paket herunter und entpacke die ZIP in einen Ordner deiner Wahl.",
  },
  {
    icon: TerminalSquare,
    title: "Claude Code öffnen",
    body: "Starte Claude Code in genau diesem Ordner. Mehr Einrichtung brauchst du nicht.",
  },
  {
    icon: ClipboardPaste,
    title: "Starttext einfügen",
    body: "Kopiere den Text unten in Claude Code und drück Enter. Den Rest macht Claude mit dir zusammen.",
  },
];

const CAN_DO = [
  "Fremde Webseiten analysieren und verstehen, wie sie gebaut sind",
  "Design-Inspiration gezielt finden und einsetzen",
  "Premium-Frontends bauen, die nicht nach Baukasten aussehen",
  "3D, Scroll-Effekte und Animationen einbauen",
  "Sicher und sauber live gehen",
];

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
        <p className="mt-14 text-xs font-semibold uppercase tracking-[0.28em] text-gold-light">
          Dein Kauf ist da
        </p>
        <h1 className="mt-4 font-instrument-serif text-4xl leading-[1.1] sm:text-5xl">
          Da ist es. Dein Setup für{" "}
          <span className="italic text-gold-light">bessere Webseiten.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75">
          Schön, dass du dabei bist. Du hast gerade das Werkzeug in der Hand, mit dem ich
          selbst Premium-Webseiten baue. Kein Kurs zum Wegschauen, sondern ein Setup, das in
          deinem Claude Code arbeitet.
        </p>

        {/* Download */}
        <div className="mt-9">
          <a
            href={DOWNLOAD_URL || "#start"}
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

        {/* 3 Schritte */}
        <section id="start" className="mt-16">
          <h2 className="text-lg font-semibold">
            So startest du <span className="text-cream/55">(ca. 60 Minuten, kein Vorwissen nötig)</span>
          </h2>
          <ol className="mt-6 space-y-3">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className="flex gap-4 rounded-2xl border border-gold-light/12 bg-white/[0.02] p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-light/12 text-gold-light">
                  <s.icon size={20} strokeWidth={2} />
                </div>
                <div>
                  <p className="font-semibold">
                    <span className="text-gold-light">{i + 1}.</span> {s.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-cream/70">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Start-Prompt mit Copy */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-cream/80">Dein Starttext</p>
            <button
              type="button"
              onClick={copyPrompt}
              className="inline-flex items-center gap-2 rounded-full border border-gold-light/30 px-4 py-2 text-sm font-semibold text-gold-light transition-colors hover:bg-gold-light/10"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Kopiert" : "Kopieren"}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-2xl border border-gold-light/12 bg-black/40 p-5 text-[13px] leading-relaxed text-cream/80">
            <code className="font-mono whitespace-pre-wrap">{START_PROMPT}</code>
          </pre>
          <p className="mt-3 text-sm text-cream/60">
            Claude führt dich danach Schritt für Schritt durch alles: prüft deine
            Voraussetzungen, installiert die Skills, richtet die Server ein und legt deinen
            eigenen Design-Guide an. Du musst nichts verstehen, nur antworten.
          </p>
        </section>

        {/* Was du danach kannst */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold">Was du danach kannst</h2>
          <ul className="mt-5 space-y-2.5">
            {CAN_DO.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-cream/75">
                <Check size={18} className="mt-0.5 shrink-0 text-gold-light" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-cream/70">
            Mein Tipp: mach den ersten Test gleich. Schreib in Claude Code{" "}
            <span className="rounded bg-gold-light/12 px-1.5 py-0.5 font-mono text-gold-light">
              /webdesign-os
            </span>{" "}
            und dann „Ich will eine Portfolio-Webseite bauen". Du wirst sehen, was jetzt anders
            ist.
          </p>
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
