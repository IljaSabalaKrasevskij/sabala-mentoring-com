"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* Menü nur auf Unterseiten — auf der Startseite bewusst keins. */
const LINKS = [
  { href: "/webseiten", label: "Webseiten" },
  { href: "/mitentwickelt", label: "Mitentwickelt" },
  { href: "/akademie", label: "Akademie" },
];

export default function SubpageNav() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <nav
      className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-6 py-4"
      style={{ background: "rgba(10,8,6,0.55)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(184,150,62,0.15)" }}
    >
      <Link href="/" className="font-mono text-[12px] uppercase tracking-[0.3em] text-cream transition-colors hover:text-gold">
        ← Sabala Studios
      </Link>
      <div className="hidden items-center gap-7 sm:flex">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-gold"
            style={{ color: pathname === l.href ? "#EAC86A" : "#9C9080" }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
