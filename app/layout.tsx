import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Providers } from '../src/providers';
import '../src/index.css';
import "@twicpics/components/style.css";

// Fonte Roboto Condensed Local
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
});

export const metadata: Metadata = {
  title: 'Primeira News - Notícias e Informação',
  description:
    'Portal de notícias com as últimas informações sobre política, economia, esportes e muito mais.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={robotoCondensed.variable}>
      <body>
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
