export function optimizeTwicPicsUrl(imagePath: string, maxWidth?: number): string {
  // Se já tem parâmetros TwicPics, não adiciona novamente
  if (imagePath.includes('?v1')) {
    return imagePath;
  }

  // Remove query strings existentes
  const cleanPath = imagePath.split('?')[0];
  
  // Define largura máxima baseada no contexto
  // const width = maxWidth || 3840;
  
  const params = `output=avif/quality-min=80/quality-max=80`;
  
  return `${cleanPath}?${params}`;
}
