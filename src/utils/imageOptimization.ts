/**
 * Utilitários para otimização agressiva de imagens
 * Reduz payload de rede drasticamente
 */

/**
 * Adiciona parâmetros de otimização ao path da imagem TwicPics
 * Força qualidade e tamanho menores para reduzir payload
 * Dimensiona automaticamente para o viewport
 */
export function optimizeTwicPicsUrl(imagePath: string, maxWidth?: number): string {
  // Se já tem parâmetros TwicPics, não adiciona novamente
  if (imagePath.includes('?twic=')) {
    return imagePath;
  }

  // Remove query strings existentes
  const cleanPath = imagePath.split('?')[0];
  
  // Define largura máxima baseada no contexto
  const width = maxWidth || 3000;
  
  // Adiciona parâmetros de otimização agressiva + resize
  // output=webp: força formato WebP (30-50% menor que JPEG)
  // quality=70: reduz qualidade para 70 (ótimo para web)
  // cover={width}x-: resize mantendo aspect ratio
  // max={width}: garante que não ultrapassa largura
  const params = `twic=v1/output=webp/quality=70/cover=${width}x-/max=${width}`;
  
  return `${cleanPath}?${params}`;
}

/**
 * Calcula o tamanho ideal baseado no contexto de uso
 */
export function getOptimalImageSize(context: 'hero' | 'thumbnail' | 'card' | 'carousel'): number {
  const sizes = {
    hero: 1920,      // Imagens principais
    carousel: 1536,  // Carousels
    card: 800,       // Cards de notícias
    thumbnail: 400,  // Thumbnails pequenas
  };
  
  return sizes[context];
}

/**
 * Configuração de qualidade baseada no tipo de imagem
 */
export function getOptimalQuality(context: 'hero' | 'thumbnail' | 'card' | 'carousel'): number {
  const quality = {
    hero: 85,        // Imagens principais - qualidade boa
    carousel: 85,    // Carousels - qualidade média-boa
    card: 85,        // Cards - qualidade média-boa
    thumbnail: 85,   // Thumbnails - qualidade média
  };
  
  return quality[context];
}
