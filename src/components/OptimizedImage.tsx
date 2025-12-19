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
  eager?: boolean;
  usePicture?: boolean;
  anchor?: string;
  refit?: boolean | string;
  transition?: "fade" | "zoom" | "none";
  transitionDuration?: string;
  maxWidth?: number;
  fetchpriority?: "high" | "low" | "auto";
  sizes?: string;
}
export default function OptimizedImage({
  src,
  alt,
  ratio = "16/9",
  mode = "cover",
  placeholder = "preview",
  eager = false,
  usePicture = false,
  focus,
  style,
  className,
  anchor,
  transition,
  transitionDuration,
  fetchpriority, // Mantido como variável para o componente
  sizes = "auto, (max-width: 30em) 100vw, (max-width: 50em) 50vw, calc(33vw - 100px)",
}: OptimizedImageProps) {
  // Fallback para evitar src vazio
  const imagePath = src || "/placeholder.png";

  // Props comuns organizadas
  const commonProps = {
    src: imagePath,
    alt,
    ratio,
    mode,
    placeholder,
    focus,
    style,
    className,
    anchor,
    // Em 2025, TwicPics aceita fetchpriority diretamente em certos componentes
    fetchpriority: fetchpriority as any,
  };

  // 3. Renderização Condicional
  if (usePicture) {
    return (
      <TwicPicture
        {...commonProps}
        sizes={sizes}
        eager={eager} // Importante para LCP
      />
    );
  }

  return (
    <TwicImg
      {...commonProps}
      eager={eager}
      transition={transition}
      transitionDuration={transitionDuration}
    />
  );
}