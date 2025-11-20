import { TwicImg, TwicPicture } from "@twicpics/components/react";
import React from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  ratio?: string | "none";
  mode?: "contain" | "cover";
  placeholder?: "preview" | "maincolor" | "meancolor" | "none";
  className?: string;
  style?: React.CSSProperties;
  focus?: "auto" | string;
  // Prioridade: high = eager + fetchpriority high, normal = lazy loading
  priority?: "high" | "normal";
  // Se true, usa TwicPicture para melhor LCP (gera <picture> responsivo)
  usePicture?: boolean;
  // Props extras
  anchor?: string;
  transition?: "fade" | "zoom" | "none";
  transitionDuration?: string;
}

/**
 * Componente otimizado para imagens com TwicPics
 * 
 * - **Lazy loading automático** para imagens não críticas
 * - **fetchpriority="high"** para imagens críticas (LCP)
 * - **TwicPicture** para hero images (gera <picture> responsivo)
 * - **Smart crop com IA** usando focus="auto"
 * - **LQIP automático** (placeholder baixa qualidade)
 * 
 * @example
 * // Imagem hero/LCP (primeira visível)
 * <OptimizedImage
 *   src="/path/image.jpg"
 *   alt="Hero"
 *   priority="high"
 *   usePicture={true}
 * />
 * 
 * @example
 * // Imagem normal (lazy loading automático)
 * <OptimizedImage
 *   src="/path/image.jpg"
 *   alt="Thumbnail"
 * />
 */
export default function OptimizedImage({
  src,
  alt,
  ratio = "3/4",
  mode = "cover",
  placeholder = "preview",
  className = "",
  style,
  focus,
  priority = "high",
  usePicture = true,
  anchor,
  transition = "fade",
  transitionDuration = "300ms",
}: OptimizedImageProps) {
  
  // Remove domínio apenas para imagens do mesmo domínio (ex: WordPress),
  // mantendo URLs absolutas externas (ex: thumbs do YouTube)
  let imagePath = src || '/placeholder.jpg';
  let useTwic = true;

  if (/^https?:\/\//.test(src)) {
    try {
      const url = new URL(src);
      const host = url.hostname;

      if (host === 'primeiranews.com.br' || host.endsWith('.primeiranews.com.br')) {
        imagePath = src.replace(/^https?:\/\/[^\/]+/, '') || '/placeholder.jpg';
      } else {
        imagePath = src;
        useTwic = false;
      }
    } catch {
      imagePath = src.replace(/^https?:\/\/[^\/]+/, '') || '/placeholder.jpg';
      useTwic = false;
    }
  }
  
  // Props comuns para ambos os componentes
  const commonProps = {
    src: imagePath,
    alt,
    ratio,
    mode,
    placeholder,
    ...(focus && { focus }), // Só adiciona focus se for definido
    style,
    className,
  };

  // Se prioridade alta, usa eager (desabilita lazy loading)
  const isEager = priority === "high";

  // Para URLs externas (como thumbs do YouTube), renderiza <img> normal
  // em vez de passar pelo TwicPics, garantindo que a imagem apareça.
  if (!useTwic) {
    return (
      <img
        src={imagePath}
        alt={alt}
        style={style}
        className={className}
      />
    );
  }

  // TwicPicture para hero images (melhor LCP)
  if (usePicture) {
    return (
      <TwicPicture
        {...commonProps}
        eager={isEager || undefined}
        anchor={anchor}
      />
    );
  }

  // TwicImg para imagens normais
  return (
    <TwicImg
      {...commonProps}
      eager={isEager}
      transition={transition}
      transitionDuration={transitionDuration}
      anchor={anchor}
      className={className}
    />
  );
}
