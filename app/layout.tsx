import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Suspense } from 'react';
import { Providers } from '../src/providers';
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
      <head>
        <link rel="preconnect" href="https://primeiranews.twic.pics" crossOrigin="anonymous"/>
        <link rel="preconnect" href="https://primeiranews.com.br" crossOrigin="anonymous"/>
      </head>
      <body className={`${robotoCondensed.variable} font-sans bg-white text-gray-900 antialiased`} suppressHydrationWarning>
        <Providers>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
