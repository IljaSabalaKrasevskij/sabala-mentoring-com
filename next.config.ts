import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  typescript: {
    ignoreBuildErrors: true,
  },

  // Performance: aggressive Komprimierung & moderne Bildformate
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  images: {
    // Moderne Formate — AVIF/WebP statt JPG/PNG bei Browsersupport
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 Jahr — die Hashes ändern sich beim Build
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      }
    ],
  },

  // SEO: 301 Permanent Redirects fuer alte WordPress-Slugs auf neue /blog/ Pfade.
  // Hintergrund: GSC zeigt fuer drei dieser URLs >300 Impressions/90T —
  // ohne Redirect verlieren wir den ganzen Search-Equity.
  async redirects() {
    return [
      // www lieferte jede Seite ein zweites Mal aus (GSC fuehrte /shop doppelt).
      // Eine Adresse fuer Google: alles auf die Domain ohne www.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.sabala-mentoring.com" }],
        destination: "https://sabala-mentoring.com/:path*",
        permanent: true,
      },
      // Vercel lieferte die Live-Seite zusätzlich unter sabala-mentoring.vercel.app aus, mit Status 200 und ohne noindex.
      // So fand Google Vercel-Adressen (Ilja, 12.11.2026). Auch hier: alles auf die eigene Domain.
      // Vorschauen haben andere Namen (…-sabala-studios-projects.vercel.app) und bleiben erreichbar. Kein eigenes Werkzeug
      // ruft die Seite über diesen Namen auf (am 12.11.2026 in Sabala Mail, sabala-data und den Skills gesucht).
      // Ausgenommen ist der Takt der Mail-Strecken (vercel.json, crons): Vercel ruft ihn über eine eigene Adresse auf und
      // folgt keiner Umleitung, ein 308 würde ihn still beenden. Er antwortet nur mit dem Schlüssel CRON_SECRET.
      {
        source: "/:path((?!api/strecken/takt$).*)",
        has: [{ type: "host", value: "sabala-mentoring.vercel.app" }],
        destination: "https://sabala-mentoring.com/:path",
        permanent: true,
      },
      // Next.js liefert die Startseite auch unter /index aus, GSC fuehrte sie als Duplikat.
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      // "Fuehrung von Innen" am 22.9.2026 abgeschaltet: altes Angebot aus der
      // Zeit vor der Positionierung auf High-End Web Development. 52 Impressionen
      // in 90 Tagen, kein einziger Klick. 301 auf die Startseite.
      {
        source: "/meditation",
        destination: "/",
        permanent: true,
      },
      // Podcast am 22.9.2026 eingestellt, die Seite ist entfernt. Sie erbte ihre
      // Metadaten vom Root-Layout, lief deshalb mit dem Titel der Startseite und
      // tauchte trotzdem als Sitelink auf. 301 auf die Startseite haelt den Search-Equity.
      {
        source: "/podcast",
        destination: "/",
        permanent: true,
      },
      // Claude Starter am 24.8.2026 eingestellt, war nie buchbar.
      // Die Beratungsstunde hat seinen Platz uebernommen.
      {
        source: "/claude-starter",
        destination: "/beratung",
        permanent: true,
      },
      {
        source: "/warum-business-mentoring-programme-scheitern",
        destination: "/blog/warum-business-mentoring-programme-scheitern",
        permanent: true,
      },
      {
        source: "/chatgpt-custom-gpts-richtig-nutzen",
        destination: "/blog/chatgpt-custom-gpts-richtig-nutzen",
        permanent: true,
      },
      {
        source: "/technik-setup-online-coach",
        destination: "/blog/technik-setup-online-coach",
        permanent: true,
      },
      {
        // /referenzen wurde in /case-studies konsolidiert (Search-Equity erhalten)
        source: "/referenzen",
        destination: "/case-studies",
        permanent: true,
      },
      {
        // Open-Source-Hub abgeschafft, Mooni Voice liegt jetzt direkt unter /mooni-voice
        source: "/open-source-projekte/mooni-voice",
        destination: "/mooni-voice",
        permanent: true,
      },
      {
        source: "/open-source-projekte",
        destination: "/shop",
        permanent: true,
      },
      // Die zwei alten Kaufprodukte sind seit 11.11.2026 eingestellt: Im Shop stehen nur noch
      // Open-Source-Werkzeuge. Seit 12.11.2026 sind auch die Käuferseite und die Bilder entfernt.
      // Alles unter den alten Adressen führt in den Shop.
      {
        source: "/webdesign-os/:path*",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/gpt-team",
        destination: "/shop",
        permanent: true,
      },
    ];
  },

  // Static Asset Caching — Browser cached 1 Jahr (immutable per Next.js Hash)
  async headers() {
    return [
      // ponytail: kein CSP, der braucht einen eigenen Testlauf mit Filmen und Inline-Skripten.
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/:all*(woff2|woff|ttf|otf)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico|mp4|webm)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
