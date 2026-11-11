"use client";

import { EINWILLIGUNG_TEXT } from "@/lib/einwilligung-text";

/* Das Häkchen für Mails, für alle Formulare auf dunklem Grund. Nie vorab gesetzt.
   Der Satz daneben kommt aus einer Quelle (einwilligung-text.ts): Er wird mit Version, Zeit und IP gespeichert.
   pflicht: Formulare, deren Zweck die Mails sind (Newsletter, Warteliste, Webinar). Sonst ist das Häkchen freiwillig.

   Tippfläche: Das echte Kästchen ist 44 px groß und unsichtbar, gezeichnet wird ein kleines Kästchen in seiner Mitte.
   So trifft man es am Handy mit dem Daumen, und die Pflicht-Meldung des Browsers zeigt weiter auf die richtige Stelle. */
export default function Einwilligung({ id, an, setAn, pflicht = false, akzent = "#d4ae5a" }: {
  id: string; an: boolean; setAn: (an: boolean) => void; pflicht?: boolean; akzent?: string;
}) {
  return (
    <label htmlFor={id} style={{ display: "flex", alignItems: "flex-start", gap: 1, textAlign: "left", cursor: "pointer", fontSize: 15, lineHeight: 1.5, color: "#E8E3DA" }}>
      <span style={{ position: "relative", flex: "none", display: "grid", placeItems: "center", width: 44, height: 44, margin: "-11px 0 -11px -11px" }}>
        <input
          id={id}
          type="checkbox"
          checked={an}
          required={pflicht}
          onChange={(e) => setAn(e.target.checked)}
          className="peer absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0"
        />
        <span
          aria-hidden
          className="grid place-items-center rounded-[4px] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-light"
          style={{ width: 22, height: 22, border: `1.5px solid ${an ? akzent : "#B9B2A6"}`, background: an ? akzent : "transparent" }}
        >
          {an && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0806" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          )}
        </span>
      </span>
      <span>
        {EINWILLIGUNG_TEXT}{" "}
        {!pflicht && "Das Häkchen ist freiwillig. "}
        Mehr in der{" "}
        {/* Abstand nach oben und unten nur für den Daumen: Die negativen Ränder halten die Zeile, wo sie ist. */}
        <a href="/datenschutz" style={{ display: "inline-block", padding: "13px 0", margin: "-13px 0", color: "#F5F2EC", textDecoration: "underline", textUnderlineOffset: 3 }}>
          Datenschutzerklärung
        </a>
        .
      </span>
    </label>
  );
}

/** Was nach dem Abschicken über die Bestätigungsmail zu sagen ist. Leer, wenn kein Häkchen gesetzt war. */
export function bestaetigungsHinweis(bestaetigung: string | undefined): string {
  if (bestaetigung === "gesendet") return "Ich habe dir gerade eine Mail geschickt. Klick dort auf „Anmeldung bestätigen“, erst dann bist du dabei. Nichts da? Schau kurz in den Spam-Ordner.";
  if (bestaetigung === "fehlt") return "Die Bestätigungsmail für den Newsletter konnte ich gerade nicht schicken. Trag dich dafür bitte später noch einmal ein.";
  return "";
}
