import type { Metadata } from 'next';
import { Providers } from '../src/providers';
import '../src/index.css';
import "@twicpics/components/style.css";

export const metadata: Metadata = {
  title: 'Primeira News - Notícias e Informação',
  description: 'Portal de notícias com as últimas informações sobre política, economia, esportes e muito mais.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
