"use client";

import { Reveal } from "@/components/akademie/shared";
import AnmeldeForm from "@/components/akademie/AnmeldeForm";
import { WEBINAR, WEBINAR_KNOPF, WEBINAR_TERMIN } from "./config";

/* ─────────────────────────────────────────────────────────────────────────
   WebinarOptIn — der Anmelde-Block (#anmelden). Mit Termin postet er nach
   /api/webinar, dort startet der ActiveCampaign-Tag die Webinar-Automation
   (Zugangslink, Erinnerung, Aufzeichnung). Ohne Termin sammelt er die Warteliste,
   damit niemand die Mail-Strecke zum alten Datum bekommt.
   ───────────────────────────────────────────────────────────────────────── */

const gold = "#d4ae5a";

export default function WebinarOptIn() {
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
                {WEBINAR_TERMIN}
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
                {WEBINAR.warteliste ? "Sei beim nächsten Mal dabei. Kostenlos." : "Sei dabei. Kostenlos."}
              </h2>
              <p style={{ fontSize: 15.5, color: "rgba(250,248,245,0.74)", lineHeight: 1.7, marginBottom: 30 }}>
                {WEBINAR.warteliste
                  ? "Trag dich auf die Warteliste ein. Sobald der neue Termin steht, bekommst du ihn per Mail. Kannst du dann live nicht, geht die Aufzeichnung am Tag danach an dich raus."
                  : "Trag dich ein, dann bekommst du den Zugangslink und eine Erinnerung kurz vorher. Kannst du live nicht, geht die Aufzeichnung am Tag danach an dich raus."}
              </p>

              <AnmeldeForm
                api={WEBINAR.warteliste ? "/api/akademie-newsletter" : "/api/webinar"}
                extra={WEBINAR.warteliste ? { warteliste: "webinar" } : undefined}
                knopf={WEBINAR_KNOPF}
                danke={
                  WEBINAR.warteliste
                    ? "Du stehst auf der Liste. Sobald der neue Termin steht, melde ich mich per Mail."
                    : "Du bist dabei. Schau in dein Postfach, der Zugangslink ist unterwegs. Falls nichts ankommt, wirf einen Blick in den Spam-Ordner."
                }
                hinweis={
                  WEBINAR.warteliste
                    ? "Du bekommst den neuen Termin und meinen Akademie-Newsletter."
                    : "Du bekommst den Webinar-Zugang und meinen Akademie-Newsletter."
                }
              />

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
