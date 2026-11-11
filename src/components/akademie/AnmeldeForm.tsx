"use client";

import { useId, useState } from "react";
import Einwilligung, { bestaetigungsHinweis } from "@/components/formular/Einwilligung";
import { EINWILLIGUNG_VERSION } from "@/lib/einwilligung-text";

/* ─────────────────────────────────────────────────────────────────────────
   AnmeldeForm — Vorname, Nachname, E-Mail, Telefon (freiwillig) und das Häkchen
   für Mails. Für Webinar-Anmeldung und Warteliste, beide unterscheiden sich nur in
   Ziel-Route und Texten. Das Häkchen ist hier Pflicht, weil die Mail der Zweck ist.
   Nach dem Abschicken kommt eine Bestätigungsmail, erst der Klick darin zählt.
   Fallback-Text, wenn das Backend noch nicht konfiguriert ist, damit die Seite
   auch vor dem Env-Setup nicht ins Leere laeuft.
   ───────────────────────────────────────────────────────────────────────── */

const gold = "#d4ae5a";
type Status = "idle" | "loading" | "success" | "error" | "unconfigured";

const inputStyle: React.CSSProperties = {
  minWidth: 0,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 2,
  padding: "16px 18px",
  fontSize: 15,
  color: "#FAF8F5",
  outline: "none",
  fontFamily: "var(--font-satoshi), system-ui",
  transition: "border-color 0.2s",
};

export default function AnmeldeForm({
  api,
  extra,
  knopf,
  danke,
}: {
  api: string;
  extra?: Record<string, string>;
  knopf: string;
  /** Was gilt, sobald die Anmeldung bestätigt ist. */
  danke: string;
}) {
  const id = useId();
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [einwilligung, setEinwilligung] = useState(false);
  const [fax, setFax] = useState(""); // Honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [bestaetigung, setBestaetigung] = useState<string>();
  const tippt = () => { if (status !== "idle") setStatus("idle"); };
  const rand = {
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = "rgba(212,174,90,0.6)"),
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"),
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vorname, nachname, email, telefon, einwilligung, einwilligungVersion: EINWILLIGUNG_VERSION, fax, ...extra }),
      });
      if (res.ok) {
        setBestaetigung(((await res.json().catch(() => ({}))) as { bestaetigung?: string }).bestaetigung);
        setStatus("success");
      }
      else if (res.status === 503) setStatus("unconfigured");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
          padding: "22px 24px",
          background: "rgba(212,174,90,0.1)",
          border: "1px solid rgba(212,174,90,0.35)",
          borderRadius: 3,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <p style={{ fontSize: 15, color: "#FAF8F5", lineHeight: 1.6 }}>
          {bestaetigung === "aktiv" ? danke : `Fast geschafft. ${bestaetigungsHinweis("gesendet")}`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <input
        type="text"
        name="fax"
        value={fax}
        onChange={(e) => setFax(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      <input
        type="text"
        required
        value={vorname}
        onChange={(e) => { setVorname(e.target.value); tippt(); }}
        placeholder="Vorname"
        aria-label="Vorname"
        autoComplete="given-name"
        style={{ ...inputStyle, flex: "1 1 200px" }}
        {...rand}
      />
      <input
        type="text"
        required
        value={nachname}
        onChange={(e) => { setNachname(e.target.value); tippt(); }}
        placeholder="Nachname"
        aria-label="Nachname"
        autoComplete="family-name"
        style={{ ...inputStyle, flex: "1 1 200px" }}
        {...rand}
      />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => { setEmail(e.target.value); tippt(); }}
        placeholder="deine@email.de"
        aria-label="E-Mail-Adresse"
        autoComplete="email"
        style={{ ...inputStyle, flex: "1 1 200px" }}
        {...rand}
      />
      <input
        type="tel"
        value={telefon}
        onChange={(e) => { setTelefon(e.target.value); tippt(); }}
        placeholder="Telefon (freiwillig)"
        aria-label="Telefon, freiwillig"
        autoComplete="tel"
        style={{ ...inputStyle, flex: "1 1 200px" }}
        {...rand}
      />
      <div style={{ flexBasis: "100%", margin: "6px 0 4px" }}>
        <Einwilligung id={`${id}-mails`} an={einwilligung} setAn={(an) => { setEinwilligung(an); tippt(); }} pflicht />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          flex: "0 0 auto",
          background: gold,
          color: "#0a0806",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.04em",
          padding: "16px 32px",
          border: "none",
          borderRadius: 2,
          cursor: status === "loading" ? "default" : "pointer",
          opacity: status === "loading" ? 0.7 : 1,
          transition: "background 0.2s, opacity 0.2s",
        }}
        onMouseEnter={(e) => { if (status !== "loading") (e.currentTarget as HTMLElement).style.background = "#E0BD6E"; }}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = gold)}
      >
        {status === "loading" ? "Moment …" : knopf}
      </button>

      {(status === "error" || status === "unconfigured") && (
        <p style={{ flexBasis: "100%", fontSize: 13.5, color: "#E8A87C", marginTop: 4 }}>
          {status === "unconfigured"
            ? "Die Anmeldung ist gleich startklar. Schreib mir solange direkt an ilja@sabala-mentoring.com."
            : "Das hat gerade nicht geklappt. Versuch es bitte noch einmal."}
        </p>
      )}
    </form>
  );
}
