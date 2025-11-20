import type { Metadata } from 'next';
import { Providers } from '../src/providers';
import '../src/index.css';
import "@twicpics/components/style.css";

export const metadata: Metadata = {
  title: 'Primeira News - Notícias e Informação',
  description: 'Portal de notícias com as últimas informações sobre política, economia, esportes e muito mais.',
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
    <html lang="pt-BR">
      <head>
        <link
          rel="preload"
          href="/fonts/roboto-condensed/RobotoCondensed-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/roboto-condensed/RobotoCondensed-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://primeiranews.twic.pics"
          crossOrigin=""
        />
      </head>
      <body className="font-sans bg-white text-gray-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
