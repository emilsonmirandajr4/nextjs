// @ts-check

import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  reactStrictMode: true,

  experimental: {
    inlineCss: true,
    viewTransition: true,
    turbopackFileSystemCacheForDev: true,
    turbopackFileSystemCacheForBuild: true,
    webpackBuildWorker: true,

    optimizeServerReact: true,

    optimizePackageImports: [
      "@radix-ui/react-navigation-menu",
      "embla-carousel",
      "@twicpics/components",
      "motion",
      "embla-carousel-react",
      "embla-carousel-autoplay",
      "embla-carousel-fade",
      "clsx",
      "tailwindcss",
      "@vercel/speed-insights",
      "@qwik.dev/partytown",
      "postcss",
      "@vercel/analytics",
      "vercel",
    ],
  },

  turbopack: {
    root: process.cwd(),
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "primeiranews.com.br",
      },
      {
        protocol: "https",
        hostname: "primeiranews.twic.pics",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [256, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [384, 512, 768, 1024, 1280, 1920, 2540],
    qualities: [80],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  async headers() {
    return [
      {
        source: "/api/posts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=10" },
          { key: "Vercel-CDN-Cache-Control", value: "public, s-maxage=300" },
        ],
      },

      {
        source: "/api/twitter/trends",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=300" },
          { key: "Vercel-CDN-Cache-Control", value: "public, s-maxage=360" },
        ],
      },

      {
        source: "/api/youtube/metadata",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=300" },
          { key: "Vercel-CDN-Cache-Control", value: "public, s-maxage=600" },
        ],
      },

      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Vercel-CDN-Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },

      {
        source: "/~partytown/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Service-Worker-Allowed", value: "/" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },

      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Vercel-CDN-Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },

      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Vercel-CDN-Cache-Control", value: "public, s-maxage=300" },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig, { devBundleServerPackages: false });