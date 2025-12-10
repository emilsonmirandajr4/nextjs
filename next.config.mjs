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
    turbopackFileSystemCacheForDev: true,
    turbopackFileSystemCacheForBuild: true,
    
    // Client-side router cache - otimizado para portal de notícias
    staleTimes: {
      dynamic: 30,    // 30s para rotas dinâmicas (posts)
      static: 1800,   // 30min para rotas estáticas
    },
    
    // Otimiza renderização de Server Components
    optimizeServerReact: true,
    
    optimizePackageImports: [
      "@radix-ui/react-navigation-menu",
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
        hostname: "primeiranewsimg.twic.pics",
      },
      {
        protocol: "https",
        hostname: "primeiranews.twic.pics",
      },
    ],
    formats: ["image/avif"],
    deviceSizes: [256, 640, 750, 828, 1080, 1200, 1920, 2048, 3000],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    qualities: [75],
    minimumCacheTTL: 2678400, // 31 days
   },

  // Remove console.log em produção
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Headers HTTP - Cache, Segurança e Early Hints
  async headers() {
    return [
      // API Routes - Cache desabilitado (webhook revalida quando necessário)
      {
        source: "/api/posts/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "Vercel-CDN-Cache-Control", value: "no-store" },
        ],
      },
      {
        source: "/api/revalidate",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "Vercel-CDN-Cache-Control", value: "no-store" },
        ],
      },
      // Twitter API - Cache 5 minutos
      {
        source: "/api/twitter/trends",
        headers: [
          { key: "Cache-Control", value: "public, max-age=300" },
          { key: "Vercel-CDN-Cache-Control", value: "max-age=300" },
        ],
      },
      // YouTube Metadata - Cache 1 hora (CDN 24h)
      {
        source: "/api/youtube/metadata",
        headers: [
          { key: "Cache-Control", value: "public, max-age=300" },
          { key: "Vercel-CDN-Cache-Control", value: "max-age=3600" },
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
      // Headers de segurança globais e Early Hints para todas as rotas
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Link",
            value: [
              "<https://primeiranews.twic.pics>; rel=preconnect; crossorigin",
              "<https://primeiranews.com.br>; rel=preconnect"
            ].join(", "),
          },
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