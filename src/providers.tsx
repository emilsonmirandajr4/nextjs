'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 30,    // 30 segundos - atualização rápida
        gcTime: 1000 * 60,       // 1 minuto - garbage collection
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
