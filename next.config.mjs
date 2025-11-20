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
    ],
  },
  // Permitir styled-components e outras libs de CSS-in-JS
  compiler: {
    styledComponents: true,
  },
};

 
export default nextConfig

