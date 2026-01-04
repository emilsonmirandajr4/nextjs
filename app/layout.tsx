import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from 'react';
import { Providers } from '../src/providers';
import { TwicInstall } from '@twicpics/components/react';
import '../src/index.css';
import "@twicpics/components/style.css";



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
    title: 'Primeira News - Notícias e informação',
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
        anticipation={0.5}
        maxDPR={2}
        step={100}
        env="production"
        breakpoints={{ xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 }}
      />

      <body className="font-roboto bg-white text-gray-900 antialiased" suppressHydrationWarning>
        <Providers>
          <Suspense fallback={
            <div className="min-h-screen bg-gray-50 animate-pulse">
              <div className="h-20 bg-white border-b border-gray-200" />
              <div className="h-12 bg-black" />
              <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-3 h-96 bg-white rounded-xl" />
                  <div className="lg:col-span-6 h-96 bg-gray-300 rounded-xl" />
                  <div className="lg:col-span-3 h-96 bg-white rounded-xl" />
                </div>
              </div>
            </div>
          }>
            {children}
            <SpeedInsights />
            <Analytics mode="production" />;
            <GoogleAnalytics gaId="G-6L64WDYYKH" />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
