/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'primeiranews.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.twic.pics',
      },
    ],
  },
  // Permitir styled-components e outras libs de CSS-in-JS
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
