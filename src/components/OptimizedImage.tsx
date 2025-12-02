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
  // Largura máxima para otimização (opcional)
  maxWidth?: number;
  // HTML fetchpriority para otimização de LCP
  fetchpriority?: "high" | "low" | "auto";
}

export default function OptimizedImage({
  src,
  alt,
  ratio = "16/9",
  mode = "cover",
  placeholder = "none",
  className = "",
  style,
  focus = "auto",
  priority = "normal",
  usePicture = true,
  anchor,
  transition = "fade",
  transitionDuration = "300ms",
  maxWidth,
  fetchpriority,
}: OptimizedImageProps) {
  
  // Remove domínio da URL se necessário para TwicPics
  const imagePath = src.replace(/^https?:\/\/[^\/]+/, '') || '/placeholder.jpg';
  
  // Props comuns para TwicPics
  const commonProps = {
    src: imagePath,
    alt,
    ratio,
    mode,
    placeholder,
    ...(focus && { focus }),
    style,
    className,
    intrinsic: '1920x1080', 
    ...(fetchpriority && { fetchpriority }), 
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