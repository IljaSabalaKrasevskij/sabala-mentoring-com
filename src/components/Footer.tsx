import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";
import { FloatingPaths } from "@/components/ui/FloatingPaths";

/* Globaler Footer — dunkel, gross, Apple-Stil. Auf jeder Seite gleich. */
const COLS: { title: string; links: { label: string; href: string; ext?: boolean }[] }[] = [
  {
    title: "Angebot",
    links: [
      { label: "Webseiten", href: "/webseiten" },
      { label: "Mit dir entwickelt", href: "/mitentwickelt" },
      { label: "KI-Akademie", href: "/akademie-hub" },
      { label: "Shop", href: "/shop" },
    ],
  },
  {
    title: "Mehr",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Über mich", href: "/ueber-mich" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "AGB", href: "/agb" },
    ],
  },
  {
    title: "Kontakt",
    links: [
      { label: "sabala@sabala-mentoring.com", href: "mailto:sabala@sabala-mentoring.com", ext: true },
      { label: "+995 591 44 36 65", href: "tel:+995591443665", ext: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <FloatingPaths className={styles.paths} anzahl={10} />
      <div className={styles.veil} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.brandRow}>
          <div>
            <p className={styles.brandName}>Sabala Studios</p>
            <p className={styles.statement}>High-End <span>Creative</span> Web Development.</p>
          </div>
          <div className={styles.eagle} aria-hidden="true">
            <Image src="/webseiten/adler-stills/profil-links-kopf.webp" alt="" fill sizes="(min-width: 800px) 360px, (min-width: 541px) 35vw, 220px" className="object-contain" />
          </div>
        </div>
        <div className={styles.columns}>
          {COLS.map((col) => <div key={col.title}>
            <h2>{col.title}</h2>
            <ul>{col.links.map((link) => <li key={link.label}>
              {link.ext ? <a href={link.href}>{link.label}</a> : <Link href={link.href}>{link.label}</Link>}
            </li>)}</ul>
          </div>)}
        </div>
        <div className={styles.bottom}>
          <p>© 2026 Sabala Studios · Sabala Mentoring LLC</p>
          <a href="#top">↑ nach oben</a>
        </div>
      </div>
    </footer>
  );
}
