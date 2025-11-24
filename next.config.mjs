// @ts-check
 
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Enable Cache Components (v16 feature - PPR alternative)
  // Note: In dev mode, server caches are disabled for easier debugging
  // This is normal and expected. Caches work perfectly in production (npm run build)
  cacheComponents: true,
  experimental: {
    // Enable filesystem caching for `next dev`
    turbopackFileSystemCacheForDev: true,
    // Enable filesystem caching for `next build`
    turbopackFileSystemCacheForBuild: true,
  },
  // Define explicit root directory to avoid lockfile conflicts
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'primeiranews.com.br',
      },
      {
        protocol: 'https',
        hostname: 'primeiranews.twic.pics',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
    formats: ['image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Otimizações de compilação
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
};
 
export default nextConfig

