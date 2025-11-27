'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { installTwicpics } from '@twicpics/components/react';
import '@twicpics/components/style.css';

// Inicializar TwicPics
installTwicpics({
  domain: "https://primeiranews.twic.pics",
  anticipation: 0.2,
  env: "production",
  maxDPR: 2,
  handleShadowDom: false,
  breakpoints: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 },
  step: 10,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 2, // 2 minutos (reduzido - webhook limpa no servidor)
        gcTime: 1000 * 60 * 5, // 5 minutos (reduzido)
        retry: 1,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
        refetchOnWindowFocus: true, // Atualiza quando usuário volta para aba
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
