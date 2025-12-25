'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutos - dados considerados frescos

        gcTime: 1000 * 60 * 30, // 30 minutos - mantém em cache por mais tempo

        retry: 1,

        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),

        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: false,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-right"
        toastOptions={{

          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '0.8rem',
            fontSize: '14px'
          },
          success: {
            duration: 3000,
            style: { background: '#10b981' },
          },
          error: {
            duration: 5000,
            style: { background: '#ef4444' },
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