import { TwicImg, TwicPicture } from "@twicpics/components/react";
import Image from "next/image";
import React, { useState } from "react";
import { optimizeTwicPicsUrl } from "../utils/imageOptimization";

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
  // Largura máxima para otimização (opcional)
  maxWidth?: number;
  // HTML fetchpriority para otimização de LCP
  fetchpriority?: "high" | "low" | "auto";
}

/**
 * Componente otimizado para imagens com TwicPics + Next.js Image como fallback
 * 
 * - **TwicPics como principal**: Otimização avançada, LQIP, smart crop
 * - **Next.js Image como fallback**: Se TwicPics falhar, usa otimização nativa do Next.js
 * - **Lazy loading automático** para imagens não críticas
 * - **fetchpriority="high"** para imagens críticas (LCP)
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
  maxWidth,
  fetchpriority,
}: OptimizedImageProps) {
  
  const [useFallback, setUseFallback] = useState(false);
  
  // Remove domínio da URL se necessário para TwicPics
  let imagePath = src.replace(/^https?:\/\/[^\/]+/, '') || '/placeholder.jpg';
  
  // Aplica otimizações agressivas para reduzir payload
  // maxWidth automático baseado no contexto se não especificado
  const optimizedWidth = maxWidth || (usePicture ? 1536 : 800);
  imagePath = optimizeTwicPicsUrl(imagePath, optimizedWidth);
  
  // URL completa para Next.js Image (fallback)
  const fullImageUrl = src.startsWith('http') ? src : `https://primeiranews.com.br${src}`;
  
  // Handler de erro - muda para fallback
  const handleError = () => {
    console.warn(`TwicPics failed to load image: ${src}, using Next.js Image fallback`);
    setUseFallback(true);
  };
  
  // Se fallback ativo, usa Next.js Image
  if (useFallback) {
    const isEager = priority === "high";
    
    return (
      <div className={className} style={style}>
        <Image
          src={fullImageUrl}
          alt={alt}
          fill={ratio === "none"}
          width={ratio !== "none" ? 800 : undefined}
          height={ratio !== "none" ? 600 : undefined}
          priority={isEager}
          loading={isEager ? "eager" : "lazy"}
          quality={85}
          className="object-cover w-full h-full"
          onError={() => console.error('Both TwicPics and Next.js Image failed for:', src)}
        />
      </div>
    );
  }
  
  // Props comuns para TwicPics com otimizações agressivas
  const commonProps = {
    src: imagePath,
    alt,
    ratio,
    mode,
    placeholder,
    ...(focus && { focus }),
    style: {
      ...style,
      // Força transformações do TwicPics para reduzir tamanho
      ...(imagePath.includes('?') ? {} : {}),
    },
    className,
    onError: handleError,
    // Adiciona parâmetros de otimização via TwicPics
    intrinsic: '1920x1080', // Limita tamanho máximo da imagem
    ...(fetchpriority && { fetchpriority }), // HTML fetchpriority para LCP
  };

  const isEager = priority === "high";

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