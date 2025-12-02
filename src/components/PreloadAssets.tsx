// React 19: Novas APIs de preload de assets
"use client";

import { useEffect } from "react";

/**
 * Componente que demonstra o uso das novas APIs de preload do React 19:
 * - preload(): Precarrega scripts, estilos e fontes
 * - preinit(): Pré-inicializa recursos críticos
 * - preconnect(): Estabelece conexão antecipada com domínios
 * - prefetchDNS(): Resolve DNS antecipadamente
 */
export default function PreloadAssets() {
  useEffect(() => {
    // React 19: Preload de fontes críticas
    if (typeof window !== "undefined" && "ReactDOM" in window && (window as any).ReactDOM?.preload) {
      // Exemplo: Preload de fonte (já estamos usando localFont, mas isso é para demonstração)
      // (window as any).ReactDOM.preload('/fonts/roboto-condensed/RobotoCondensed-Regular.woff2', {
      //   as: 'font',
      //   type: 'font/woff2',
      //   crossOrigin: 'anonymous'
      // });
    }

    // React 19: Preconnect para domínios externos (alternativa às tags <link>)
    if (typeof window !== "undefined" && "ReactDOM" in window && (window as any).ReactDOM?.preconnect) {
      // Já temos no layout.tsx, mas esta é a forma programática
      // (window as any).ReactDOM.preconnect('https://primeiranews.twic.pics', { crossOrigin: 'anonymous' });
      // (window as any).ReactDOM.preconnect('https://primeiranews.com.br');
    }

    // React 19: Prefetch DNS
    if (typeof window !== "undefined" && "ReactDOM" in window && (window as any).ReactDOM?.prefetchDNS) {
      // (window as any).ReactDOM.prefetchDNS('https://www.google-analytics.com');
    }
  }, []);

  return null; // Este componente não renderiza nada
}
