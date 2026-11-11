import Image from "next/image";
import stil from "./ankunft.module.css";

/* Die Seiten, auf denen man nach dem Klick in der Bestätigungsmail landet. Dasselbe Kleid wie die Mail:
   dunkler Grund, der Adler in der runden Marke, Schrift in Creme und Gold. Der Adler bewegt sich wie in der Mail
   (dort als GIF, hier als WebP in doppelter Auflösung), so erkennt man den Weg wieder: Formular, Mail, Ankunft. */
export default function Ankunft({ adler, erledigt = false, zeile, titel, pointe, children }: {
  /** Bild in der runden Marke, 264 px mit Goldring: bewegt oder als Standbild. Gebaut mit adler_web.py aus der Adler-Folge. */
  adler: string;
  /** Goldener Haken an der Marke: Die Anmeldung ist durch. */
  erledigt?: boolean;
  zeile: string;
  titel: string;
  pointe: string;
  children: React.ReactNode;
}) {
  return (
    <main className={stil.buehne}>
      <div className={stil.mitte}>
        <div className={`${stil.marke} ${stil.auf}`}>
          <span className={stil.ring} aria-hidden />
          {/* unoptimized: Die Bildoptimierung von Next würde aus dem bewegten Bild ein Standbild machen. */}
          <Image src={adler} alt="" width={132} height={132} unoptimized priority className={stil.bild} />
          {erledigt && (
            <svg className={stil.haken} viewBox="0 0 40 40" aria-hidden>
              <circle cx="20" cy="20" r="19" fill="#D4AE5A" />
              <path d="M11.5 20.5l6 6L29 14.5" fill="none" stroke="#0A0806" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <p className={`${stil.zeile} ${stil.auf}`} style={{ animationDelay: "0.15s" }}>{zeile}</p>
        <h1 className={`${stil.titel} ${stil.auf}`} style={{ animationDelay: "0.25s" }}>
          {titel}
          <br />
          <em>{pointe}</em>
        </h1>
        <div className={`${stil.inhalt} ${stil.auf}`} style={{ animationDelay: "0.4s" }}>{children}</div>
      </div>
    </main>
  );
}
