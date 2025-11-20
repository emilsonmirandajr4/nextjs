// @ts-check
 
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
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
  async rewrites() {
    return [
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:category/:post',
        destination: '/:post',
      },
    ];
  },
};

 
export default nextConfig

