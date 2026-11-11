/* Der Satz am Häkchen. Er ist der Beweis: Genau dieser Wortlaut wird mit Version, Zeit und IP gespeichert,
   wenn jemand zustimmt, und er steht noch einmal in der Bestätigungsmail.

   Text ändern = neue Nummer dazuschreiben und EINWILLIGUNG_VERSION hochzählen. Alte Einträge bleiben stehen:
   Wer die Seite noch offen hatte, schickt die Nummer mit, die er gesehen hat. */
export const EINWILLIGUNGEN: Record<number, string> = {
  2: "Ja, ich will den Sabala Newsletter: KI-Updates für mein Unternehmen, neue Kurse, Termine und Angebote. Abmelden geht jederzeit mit einem Klick.",
};
export const EINWILLIGUNG_VERSION = 2;
export const EINWILLIGUNG_TEXT = EINWILLIGUNGEN[EINWILLIGUNG_VERSION];
