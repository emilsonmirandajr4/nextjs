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

  experimental: {
    inlineCss: true,
    viewTransition: true,
    turbopackFileSystemCacheForDev: true,
    turbopackFileSystemCacheForBuild: true,

    staleTimes: {
      dynamic: 180,   // 3 minutos para rotas dinâmicas
      static: 3600,   // 1 hora para rotas estáticas
    },

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
    qualities: [75],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  async headers() {
    return [
      {
        source: "/api/posts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=120, must-revalidate" },
          { key: "Vercel-CDN-Cache-Control", value: "public, max-age=120, must-revalidate" },
        ],
      },

      {
        source: "/api/revalidate",
        headers: [
          { key: "Cache-Control", value: "public, max-age=120, must-revalidate" },
          { key: "Vercel-CDN-Cache-Control", value: "public, max-age=120, must-revalidate" },
        ],
      },

      {
        source: "/api/twitter/trends",
        headers: [
          { key: "Cache-Control", value: "public, max-age=120, must-revalidate" },
          { key: "Vercel-CDN-Cache-Control", value: "public, max-age=120, must-revalidate" },
        ],
      },

      {
        source: "/api/youtube/metadata",
        headers: [
          { key: "Cache-Control", value: "public, max-age=180, must-revalidate" },
          { key: "Vercel-CDN-Cache-Control", value: "public, max-age=180" },
        ],
      },
      // Assets estáticos Next.js - Cache imutável 1 ano
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Vercel-CDN-Cache-Control", value: "public, max-age=31536000, immutable" },
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
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);