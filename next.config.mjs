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
    optimizePackageImports: [
      "lucide-react",
      "date-fns",
      "lodash",
      "lodash-es",
      "ramda",
      "@radix-ui/react-icons",
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
    deviceSizes: [256, 640, 750, 828, 1080, 1200, 1920, 2048, 3000],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    qualities: [80],
    minimumCacheTTL: 2678400, // 31 days
   },

  // Remove console.log em produção
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default withBundleAnalyzer(nextConfig);