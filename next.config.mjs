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
  // Note: In dev mode, server caches are disabled for easier debugging
  // This is normal and expected. Caches work perfectly in production (npm run build)
  cacheComponents: true,
  experimental: {
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
    sizes: [240, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3000],
  },
  // Otimizações de compilação
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  reactCompiler: true,
};

export default withBundleAnalyzer(nextConfig);
