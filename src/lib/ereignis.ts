/* Ereignisse für Umami (selbst gehostet, cookiefrei). Gezählt wird, dass etwas passiert ist, nie von wem:
   In den Angaben steht nur das Formular, die Quelle oder der Dateiname. Keine Namen, keine Adressen, keine Nummern.

   Namen der Ereignisse, damit die Auswertung einheitlich bleibt:
     formular-abgeschickt   { formular, quelle? }   ein Formular kam beim Server an
     download               { datei }               Klick auf eine Datei zum Laden
     leadmagnet-klick       { quelle }              Klick auf den Knopf, der zum Formular eines Leadmagneten führt

   In reinem HTML geht dasselbe ohne Code, Umami liest die Angaben am Element:
     <a href="/datei.pdf" data-umami-event="download" data-umami-event-datei="datei.pdf">

   Ohne Umami (Werbeblocker, lokale Probe) passiert einfach nichts. */
export function ereignis(name: "formular-abgeschickt" | "download" | "leadmagnet-klick", angaben: Record<string, string>): void {
  if (typeof window === "undefined") return;
  (window as unknown as { umami?: { track?: (name: string, angaben?: Record<string, string>) => void } }).umami?.track?.(name, angaben);
}
