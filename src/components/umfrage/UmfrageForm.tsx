"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   UmfrageForm — "Wo willst du mit KI hin?"
   Premium, sektioniert, Sabala-Design (gold/dark). Erhebt Rolle, technisches
   Level, genutzte Modelle, Themen, Ziele und zwei Freitexte. Postet an
   /api/umfrage → Turso + AC-Tag + ntfy. Graceful Fallback, wenn Backend fehlt.
   ───────────────────────────────────────────────────────────────────────── */

const gold = "#D4AE5A";
type Status = "idle" | "loading" | "success" | "error" | "unconfigured";

const ROLLEN = [
  "Selbstständig / Solo",
  "Agentur / Studio",
  "Unternehmer mit Team",
  "Angestellt",
  "Noch am Anfang",
];

const TECH = [
  "Nicht-technisch",
  "Etwas technisch",
  "Ich entwickle / code",
];

const MODELLE = [
  "ChatGPT / OpenAI",
  "Claude / Anthropic",
  "Google Gemini",
  "Lokale Modelle (Ollama & Co.)",
  "Noch keine",
];

const THEMEN = [
  "Automationen bauen",
  "Content schneller erstellen",
  "Kunden gewinnen",
  "Interne Prozesse verschlanken",
  "Coding & Entwicklung",
  "KI-Grundlagen verstehen",
  "Daten auswerten",
  "Eigene KI-Tools bauen",
];

const ZIELE = [
  "Zeit sparen durch Automation",
  "Besseren Content, schneller",
  "Mehr Kunden gewinnen",
  "KI ins Unternehmen bringen",
  "Selbst KI-Tools bauen",
  "Verstehen, was möglich ist",
];

/* ── kleine UI-Bausteine ── */

function SectionTitle({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
      <span className="font-mono" style={{ fontSize: 12, color: gold, letterSpacing: "0.15em" }}>
        {String(n).padStart(2, "0")}
      </span>
      <h3 style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: "clamp(20px, 2.6vw, 27px)", fontWeight: 400, color: "#FAF8F5", lineHeight: 1.15 }}>
        {children}
      </h3>
    </div>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "11px 18px",
        borderRadius: 999,
        fontSize: 14.5,
        cursor: "pointer",
        transition: "all 0.15s",
        fontFamily: "var(--font-satoshi), system-ui",
        background: active ? "rgba(212,174,90,0.16)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${active ? "rgba(212,174,90,0.6)" : "rgba(255,255,255,0.14)"}`,
        color: active ? gold : "rgba(250,248,245,0.78)",
        fontWeight: active ? 600 : 400,
      }}
    >
      {active ? "✓ " : ""}{label}
    </button>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 3,
  padding: "15px 18px",
  fontSize: 15,
  color: "#FAF8F5",
  outline: "none",
  fontFamily: "var(--font-satoshi), system-ui",
  transition: "border-color 0.2s",
};

export default function UmfrageForm({ quelle = "Umfrage-Newsletter" }: { quelle?: string }) {
  const [vorname, setVorname] = useState("");
  const [email, setEmail] = useState("");
  const [rolle, setRolle] = useState("");
  const [techLevel, setTechLevel] = useState("");
  const [modelle, setModelle] = useState<string[]>([]);
  const [themen, setThemen] = useState<string[]>([]);
  const [ziele, setZiele] = useState<string[]>([]);
  const [problem, setProblem] = useState("");
  const [kontext, setKontext] = useState("");
  const [fax, setFax] = useState(""); // Honeypot
  const [status, setStatus] = useState<Status>("idle");

  const toggle = (list: string[], set: (v: string[]) => void, val: string) =>
    set(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (!email.trim()) { setStatus("error"); return; }
    setStatus("loading");
    try {
      const res = await fetch("/api/umfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vorname, email, rolle, techLevel, modelle, themen, ziele, problem, kontext, quelle, fax }),
      });
      if (res.ok) setStatus("success");
      else if (res.status === 503) setStatus("unconfigured");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "60px 24px 120px", textAlign: "center" }}>
        <div style={{ width: 56, height: 56, margin: "0 auto 24px", borderRadius: "50%", background: "rgba(212,174,90,0.14)", border: "1px solid rgba(212,174,90,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h2 style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, color: "#FAF8F5", marginBottom: 16, lineHeight: 1.1 }}>
          Danke, das hilft mir wirklich.
        </h2>
        <p style={{ fontSize: 16, color: "rgba(250,248,245,0.65)", lineHeight: 1.65 }}>
          Ich lese jede Antwort selbst. Was du mir gerade erzählt hast, fließt direkt in die nächsten Trainings und Inhalte ein. Bis bald.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 120px" }}>
      {/* Honeypot */}
      <input type="text" name="fax" value={fax} onChange={(e) => setFax(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 46 }}>
        {/* 01 — Kontakt */}
        <section>
          <SectionTitle n={1}>Wer bist du?</SectionTitle>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <input value={vorname} onChange={(e) => setVorname(e.target.value)} placeholder="Vorname" autoComplete="given-name" style={{ ...inputStyle, flex: "1 1 200px" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,174,90,0.6)")} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")} />
            <input type="email" required value={email} onChange={(e) => { setEmail(e.target.value); if (status !== "idle") setStatus("idle"); }} placeholder="deine@email.de" autoComplete="email" style={{ ...inputStyle, flex: "1 1 240px" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,174,90,0.6)")} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")} />
          </div>
        </section>

        {/* 02 — Rolle */}
        <section>
          <SectionTitle n={2}>Was beschreibt dich am besten?</SectionTitle>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {ROLLEN.map((r) => <Chip key={r} label={r} active={rolle === r} onClick={() => setRolle(rolle === r ? "" : r)} />)}
          </div>
        </section>

        {/* 03 — Tech-Level */}
        <section>
          <SectionTitle n={3}>Wie technisch gehst du an KI ran?</SectionTitle>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {TECH.map((t) => <Chip key={t} label={t} active={techLevel === t} onClick={() => setTechLevel(techLevel === t ? "" : t)} />)}
          </div>
        </section>

        {/* 04 — Modelle */}
        <section>
          <SectionTitle n={4}>Womit arbeitest du schon?</SectionTitle>
          <p style={{ fontSize: 13.5, color: "rgba(250,248,245,0.45)", marginBottom: 14, marginTop: -8 }}>Mehrfachauswahl</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {MODELLE.map((m) => <Chip key={m} label={m} active={modelle.includes(m)} onClick={() => toggle(modelle, setModelle, m)} />)}
          </div>
        </section>

        {/* 05 — Themen */}
        <section>
          <SectionTitle n={5}>Was beschäftigt dich gerade am meisten?</SectionTitle>
          <p style={{ fontSize: 13.5, color: "rgba(250,248,245,0.45)", marginBottom: 14, marginTop: -8 }}>Mehrfachauswahl</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {THEMEN.map((t) => <Chip key={t} label={t} active={themen.includes(t)} onClick={() => toggle(themen, setThemen, t)} />)}
          </div>
        </section>

        {/* 06 — Ziele */}
        <section>
          <SectionTitle n={6}>Wo willst du hin?</SectionTitle>
          <p style={{ fontSize: 13.5, color: "rgba(250,248,245,0.45)", marginBottom: 14, marginTop: -8 }}>Mehrfachauswahl</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {ZIELE.map((z) => <Chip key={z} label={z} active={ziele.includes(z)} onClick={() => toggle(ziele, setZiele, z)} />)}
          </div>
        </section>

        {/* 07 — Problem */}
        <section>
          <SectionTitle n={7}>Was ist gerade deine größte Hürde?</SectionTitle>
          <textarea value={problem} onChange={(e) => setProblem(e.target.value)} rows={4} placeholder="Sag es in deinen Worten — woran hakt es gerade, wenn du an KI in deinem Business denkst?" style={{ ...inputStyle, resize: "vertical", lineHeight: 1.55 }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,174,90,0.6)")} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")} />
        </section>

        {/* 08 — Kontext */}
        <section>
          <SectionTitle n={8}>Sonst noch etwas, das ich wissen sollte?</SectionTitle>
          <textarea value={kontext} onChange={(e) => setKontext(e.target.value)} rows={3} placeholder="Optional. Was würdest du dir von mir am meisten wünschen?" style={{ ...inputStyle, resize: "vertical", lineHeight: 1.55 }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,174,90,0.6)")} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")} />
        </section>

        {/* Submit */}
        <div>
          <button type="submit" disabled={status === "loading"}
            style={{ background: gold, color: "#0a0806", fontSize: 15, fontWeight: 600, letterSpacing: "0.02em", padding: "17px 40px", border: "none", borderRadius: 3, cursor: status === "loading" ? "default" : "pointer", opacity: status === "loading" ? 0.7 : 1, transition: "background 0.2s, opacity 0.2s", fontFamily: "var(--font-satoshi), system-ui" }}
            onMouseEnter={(e) => { if (status !== "loading") (e.currentTarget as HTMLElement).style.background = "#E0BD6E"; }}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = gold)}>
            {status === "loading" ? "Wird gesendet …" : "Absenden"}
          </button>
          {(status === "error" || status === "unconfigured") && (
            <p style={{ fontSize: 13.5, color: "#E8A87C", marginTop: 14 }}>
              {status === "unconfigured"
                ? "Der Speicher ist gleich startklar. Schreib mir solange direkt an ilja@sabala-mentoring.com."
                : "Das hat gerade nicht geklappt, bitte prüfe deine E-Mail und versuch es noch einmal."}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
