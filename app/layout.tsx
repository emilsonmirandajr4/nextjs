import type { Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import { Providers } from '../src/providers';
import '../src/index.css';
import "@twicpics/components/style.css";

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-roboto-condensed',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Primeira News - Notícias e Informação',
    template: '%s | Primeira News',
  },
  description: 'Portal de notícias com as últimas informações sobre política, economia, esportes e muito mais.',
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
    description: 'Portal de notícias com as últimas informações sobre política, economia, esportes e muito mais.',
    url: 'https://primeiranews.com',
    siteName: 'Primeira News',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Primeira News - Notícias e Informação',
    description: 'Portal de notícias com as últimas informações sobre política, economia, esportes e muito mais.',
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
        <link rel="preconnect" href="https://primeiranews.twic.pics" crossOrigin="" />
        <link rel="preconnect" href="https://primeiranews.com.br" />
        <link rel="dns-prefetch" href="https://primeiranews.com.br" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
      </head>
      <body className={`${robotoCondensed.variable} font-sans bg-white text-gray-900 antialiased`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
