"use client";

import { useState } from "react";
import { Reveal } from "@/components/akademie/shared";
import { WEBINAR } from "./config";

/* ─────────────────────────────────────────────────────────────────────────
   WebinarOptIn — der Anmelde-Block (#anmelden). Postet nach /api/webinar,
   dort startet der ActiveCampaign-Tag die Webinar-Automation (Zugangslink,
   Erinnerung, Aufzeichnung). Fallback-Text, wenn AC noch nicht konfiguriert
   ist, damit die Seite auch vor dem Env-Setup nicht ins Leere laeuft.
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

export default function WebinarOptIn() {
  const [vorname, setVorname] = useState("");
  const [email, setEmail] = useState("");
  const [fax, setFax] = useState(""); // Honeypot
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/webinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vorname, email, fax }),
      });
      if (res.ok) setStatus("success");
      else if (res.status === 503) setStatus("unconfigured");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="anmelden" style={{ position: "relative", background: "#080604", padding: "clamp(60px, 8vw, 100px) 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(135deg, rgba(212,174,90,0.12) 0%, rgba(16,12,7,0.96) 62%)",
              border: "1px solid rgba(212,174,90,0.3)",
              borderRadius: 5,
              padding: "clamp(34px, 5vw, 64px)",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "-40%",
                right: "-10%",
                width: 520,
                height: 520,
                background: "radial-gradient(ellipse at center, rgba(212,174,90,0.14) 0%, rgba(212,174,90,0) 70%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", maxWidth: 600 }}>
              <p
                className="font-mono"
                style={{ fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", color: gold, marginBottom: 18 }}
              >
                {WEBINAR.weekday} · {WEBINAR.date} · {WEBINAR.time}
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif), Georgia, serif",
                  fontSize: "clamp(28px, 3.6vw, 44px)",
                  fontWeight: 400,
                  color: "#FAF8F5",
                  lineHeight: 1.1,
                  marginBottom: 16,
                }}
              >
                Sei dabei. Kostenlos.
              </h2>
              <p style={{ fontSize: 15.5, color: "rgba(250,248,245,0.74)", lineHeight: 1.7, marginBottom: 30 }}>
                Trag dich ein, dann bekommst du den Zugangslink und eine Erinnerung kurz vorher.
                Kannst du live nicht, geht die Aufzeichnung am Tag danach an dich raus.
              </p>

              {status === "success" ? (
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
                    Du bist dabei. Schau in dein Postfach, der Zugangslink ist unterwegs.
                    Falls nichts ankommt, wirf einen Blick in den Spam-Ordner.
                  </p>
                </div>
              ) : (
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
                    onChange={(e) => { setVorname(e.target.value); if (status !== "idle") setStatus("idle"); }}
                    placeholder="Vorname"
                    aria-label="Vorname"
                    autoComplete="given-name"
                    style={{ ...inputStyle, flex: "1 1 180px" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,174,90,0.6)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (status !== "idle") setStatus("idle"); }}
                    placeholder="deine@email.de"
                    aria-label="E-Mail-Adresse"
                    autoComplete="email"
                    style={{ ...inputStyle, flex: "1 1 240px" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,174,90,0.6)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
                  />
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
                    {status === "loading" ? "Moment …" : "Platz sichern"}
                  </button>

                  {(status === "error" || status === "unconfigured") && (
                    <p style={{ flexBasis: "100%", fontSize: 13.5, color: "#E8A87C", marginTop: 4 }}>
                      {status === "unconfigured"
                        ? "Die Anmeldung ist gleich startklar. Schreib mir solange direkt an ilja@sabala-mentoring.com."
                        : "Das hat gerade nicht geklappt. Versuch es bitte noch einmal."}
                    </p>
                  )}

                  <p style={{ flexBasis: "100%", fontSize: 12.5, color: "rgba(250,248,245,0.62)", lineHeight: 1.6, marginTop: 6 }}>
                    Du bekommst den Webinar-Zugang und meinen Akademie-Newsletter. Abmelden geht in
                    jeder Mail mit einem Klick. Mehr dazu in der{" "}
                    <a href="/datenschutz" style={{ color: "rgba(250,248,245,0.72)", textDecoration: "underline" }}>
                      Datenschutzerklärung
                    </a>
                    .
                  </p>
                </form>
              )}

              {WEBINAR.linkedInEventUrl && (
                <a
                  href={WEBINAR.linkedInEventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    marginTop: 26,
                    fontSize: 12,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(250,248,245,0.68)",
                    textDecoration: "none",
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(250,248,245,0.68)">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                  </svg>
                  Auch als LinkedIn-Event
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
