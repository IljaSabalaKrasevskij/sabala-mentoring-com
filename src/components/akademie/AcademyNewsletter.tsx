"use client";

import { useState } from "react";
import { Reveal } from "./shared";

/* ─────────────────────────────────────────────────────────────────────────
   AcademyNewsletter — „Bleib auf dem Laufenden"
   Vorbereitete Anmeldung unter dem Kalender. Speichert die E-Mail in den
   Lead-Speicher (quelle "Akademie-Newsletter"); der eigentliche Versand
   kommt später. Graceful Fallback, wenn das Backend noch nicht steht.
   ───────────────────────────────────────────────────────────────────────── */

const gold = "#D4AE5A";
type Status = "idle" | "loading" | "success" | "error" | "unconfigured";

export default function AcademyNewsletter() {
  const [email, setEmail] = useState("");
  const [fax, setFax] = useState(""); // Honeypot
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/akademie-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fax }),
      });
      if (res.ok) setStatus("success");
      else if (res.status === 503) setStatus("unconfigured");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section style={{ position: "relative", background: "#080604", padding: "0 0 110px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px" }}>
        <Reveal>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(135deg, rgba(212,174,90,0.10) 0%, rgba(16,12,7,0.96) 60%)",
              border: "1px solid rgba(212,174,90,0.28)",
              borderRadius: 5,
              padding: "clamp(34px, 5vw, 60px)",
            }}
          >
            {/* Lichtschein */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "-40%",
                right: "-10%",
                width: 500,
                height: 500,
                background: "radial-gradient(ellipse at center, rgba(212,174,90,0.12) 0%, rgba(212,174,90,0) 70%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", maxWidth: 560 }}>
              <p className="font-mono" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: gold, marginBottom: 18 }}>
                Akademie-Newsletter
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif), Georgia, serif",
                  fontSize: "clamp(26px, 3.4vw, 42px)",
                  fontWeight: 400,
                  color: "#FAF8F5",
                  lineHeight: 1.1,
                  marginBottom: 16,
                }}
              >
                Sei dabei, wenn der nächste Kurs öffnet.
              </h2>
              <p style={{ fontSize: 15.5, color: "rgba(250,248,245,0.6)", lineHeight: 1.65, marginBottom: 30 }}>
                Trag dich ein und erfahre als Erster, wann neue Termine und Themen starten.
                Kein Spam, nur die Akademie.
              </p>

              {status === "success" ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "20px 24px",
                    background: "rgba(212,174,90,0.10)",
                    border: "1px solid rgba(212,174,90,0.35)",
                    borderRadius: 3,
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <p style={{ fontSize: 15, color: "#FAF8F5", lineHeight: 1.5 }}>
                    Du bist dabei. Ich melde mich, sobald der nächste Termin steht.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {/* Honeypot */}
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
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (status !== "idle") setStatus("idle"); }}
                    placeholder="deine@email.de"
                    style={{
                      flex: "1 1 240px",
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
                    }}
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
                      padding: "16px 30px",
                      border: "none",
                      borderRadius: 2,
                      cursor: status === "loading" ? "default" : "pointer",
                      opacity: status === "loading" ? 0.7 : 1,
                      transition: "background 0.2s, opacity 0.2s",
                    }}
                    onMouseEnter={(e) => { if (status !== "loading") (e.currentTarget as HTMLElement).style.background = "#E0BD6E"; }}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = gold)}
                  >
                    {status === "loading" ? "Moment …" : "Auf dem Laufenden bleiben"}
                  </button>

                  {(status === "error" || status === "unconfigured") && (
                    <p style={{ flexBasis: "100%", fontSize: 13.5, color: "#E8A87C", marginTop: 4 }}>
                      {status === "unconfigured"
                        ? "Die Anmeldung ist gleich startklar. Schreib mir solange direkt an ilja@sabala-mentoring.com."
                        : "Das hat gerade nicht geklappt. Versuch es bitte noch einmal."}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
