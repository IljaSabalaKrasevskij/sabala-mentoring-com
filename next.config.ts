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
    ];
  },

  // Static Asset Caching — Browser cached 1 Jahr (immutable per Next.js Hash)
  async headers() {
    return [
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
