'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { installTwicpics } from '@twicpics/components/react';

// Inicializar TwicPics no top-level (antes do componente)
// Otimizado para reduzir payload de rede drasticamente
installTwicpics({
  domain: "https://primeiranews.twic.pics",
  anticipation: 0.5, // Aumentado para melhor preload
  breakpoints: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 },
  env: "production",
  maxDPR: 2, // Reduzido de 3 para 2 (economiza ~33% em telas retina)
  step: 10, // Aumentado de 5 para 10 (menos variações de tamanho)
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0, // Sempre buscar dados atualizados (posts em tempo real)
        gcTime: 1000 * 60 * 5, // Cache mantido por 5 minutos
        retry: 2, // Tentar 2 vezes em caso de erro
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
        refetchOnWindowFocus: true, // Revalidar ao focar na janela
        refetchOnReconnect: true, // Revalidar ao reconectar
        refetchOnMount: true, // Revalidar ao montar componente
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-right"
        toastOptions={{
          // Estilo padrão
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            padding: '12px 16px',
          },
          // Success
          success: {
            style: {
              background: '#10b981',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10b981',
            },
            duration: 3000,
          },
          // Error
          error: {
            style: {
              background: '#ef4444',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#ef4444',
            },
            duration: 4000,
          },
          // Loading
          loading: {
            style: {
              background: '#0ea5e9',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#0ea5e9',
            },
          },
        }}
      />
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
