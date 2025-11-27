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
  if (imagePath.includes('?v1')) {
    return imagePath;
  }

  // Remove query strings existentes
  const cleanPath = imagePath.split('?')[0];
  
  // Define largura máxima baseada no contexto
  const width = maxWidth || 3000;
  
    const params = `output=avif/quality-min=75/quality-max=80/cover=16/9`;
  
  return `${cleanPath}?${params}`;
}
