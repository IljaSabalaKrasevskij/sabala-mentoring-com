import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: '/tmp/sabala-mentoring-next',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
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
};

export default nextConfig;
