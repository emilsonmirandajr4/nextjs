// @ts-check

import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Enable Cache Components (v16 feature - PPR alternative)
  cacheComponents: true,

  // React Compiler (auto-memoization)
  reactCompiler: true,

  experimental: {
    inlineCss: true,
    viewTransition: true,
    turbopackFileSystemCacheForDev: true,
    turbopackFileSystemCacheForBuild: true,

    // Client-side router cache - otimizado para portal de notícias
    staleTimes: {
      dynamic: 30,    // 30s para rotas dinâmicas (posts)
      static: 300,   // 5min para rotas estáticas
    },

    // Otimiza renderização de Server Components
    optimizeServerReact: true,

    optimizePackageImports: [
      "@radix-ui/react-navigation-menu",
      "lucide-react",
      "embla-carousel",
      "@twicpics/components",
      "motion",
      "react-hot-toast",
      "@tanstack/react-query",
      "embla-carousel-react",
      "embla-carousel-autoplay",
      "embla-carousel-fade",
      "clsx",
      "tailwind-merge",
    ],
  },

  // Define explicit root directory to avoid lockfile conflicts
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
    formats: ["image/avif"],
    deviceSizes: [256, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512, 640, 768, 1024, 1280, 1920],
    qualities: [75],
  },

  // Remove console.log em produção
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  async headers() {
    return [
      {
        source: "/api/posts/:path*",
        headers: [
          { key: "Cache-Control", value: "max-age=300" },
          { key: "Vercel-CDN-Cache-Control", value: "max-age=300" },
        ],
      },

      {
        source: "/api/revalidate",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "Vercel-CDN-Cache-Control", value: "no-store" },
        ],
      },

      {
        source: "/api/twitter/trends",
        headers: [
          { key: "Cache-Control", value: "public, max-age=300" },
          { key: "Vercel-CDN-Cache-Control", value: "max-age=300" },
        ],
      },

      {
        source: "/api/youtube/metadata",
        headers: [
          { key: "Cache-Control", value: "public, max-age=300" },
          { key: "Vercel-CDN-Cache-Control", value: "max-age=300" },
        ],
      },
      // Assets estáticos Next.js - Cache imutável 1 ano
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Vercel-CDN-Cache-Control", value: "max-age=31536000, immutable" },
        ],
      },

      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Vercel-CDN-Cache-Control", value: "max-age=31536000, immutable" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },

      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },


  async redirects() {
    return [
      {
        source: "/wp-admin/:path*",
        destination: "https://primeiranews.com.br/wp-admin/:path*",
        permanent: false,
      },

      {
        source: "/wp-json/:path*",
        destination: "https://primeiranews.com.br/wp-json/:path*",
        permanent: false,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);