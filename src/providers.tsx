'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { installTwicpics } from '@twicpics/components/react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // Dados considerados frescos por 5 minutos
        gcTime: 1000 * 60 * 10, // Cache mantido por 10 minutos
        retry: 3, // Tentar 3 vezes em caso de erro
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false, // Não revalidar ao focar na janela
        refetchOnReconnect: true, // Revalidar ao reconectar
      },
    },
  }));

  // Inicializar TwicPics no client-side
  useEffect(() => {
    installTwicpics({
      domain: "https://primeiranews.twic.pics",
      anticipation: 0.2,
      step: 5,
    });
  }, []);

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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
