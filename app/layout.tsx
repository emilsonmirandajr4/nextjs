import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import localFont from 'next/font/local';
import { Suspense } from 'react';
import { Providers } from '../src/providers';
import { TwicInstall } from '@twicpics/components/react';
import '../src/index.css';
import "@twicpics/components/style.css";

const robotoCondensed = localFont({
  src: [
    {
      path: '../public/fonts/roboto-condensed/RobotoCondensed-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/roboto-condensed/RobotoCondensed-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-roboto-condensed',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: 'Primeira News - Notícias imparciais sobre política, economia e mundo.',
    template: '%s | Primeira News',
  },
  description: 'Portal de notícias com as últimas informações sobre política, economia e mundo.',
  keywords: ['notícias', 'brasil', 'política', 'economia', 'esportes', 'primeira news'],
  authors: [{ name: 'Primeira News' }],
  creator: 'Primeira News',
  publisher: 'Primeira News',
  metadataBase: new URL('https://primeiranews.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Primeira News - Notícias e Informação',
    description: 'Portal de notícias com as últimas informações sobre política, economia e mundo.',
    url: 'https://primeiranews.com',
    siteName: 'Primeira News',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Primeira News - Notícias e Informação',
    description: 'Portal de notícias com as últimas informações sobre política, economia e mundo.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    shortcut: ['/icon.png'],
    apple: ['/icon.png'],
    other: [{ rel: 'mask-icon', url: '/icon.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      {/* TwicPics Components configuration */}
      <TwicInstall
        domain="https://primeiranews.twic.pics"
        anticipation={0.2}
        maxDPR={2}
        step={10}
        env="production"
        breakpoints={{ xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 }}
      />
      {/* Preconnects movidos para Early Hints (next.config.mjs) - carregam ANTES do HTML */}
      <body className={`${robotoCondensed.variable} font-sans bg-white text-gray-900 antialiased`} suppressHydrationWarning>
        <Providers>
          <Suspense fallback={null}>
            {children}
            <SpeedInsights />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
