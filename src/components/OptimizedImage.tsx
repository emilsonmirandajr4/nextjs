"use client";

import { TwicImg, TwicPicture } from "@twicpics/components/react";
import React from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  ratio?: string | "none";
  mode?: "contain" | "cover";
  className?: string;
  style?: React.CSSProperties;
  eager?: boolean;
  focus?: "auto" | string;
  usePicture?: boolean;
  refit?: boolean | string;
  fetchpriority?: "high" | "low" | "auto";
  sizes?: string;
  isLCP?: boolean; // Para imagem LCP, usa img nativo com fetchpriority
  twicClass?: string; // Classe CSS style-driven (ex: "twic-news-carousel")
}
export default function OptimizedImage({
  src,
  alt,
  ratio = "4/3",
  mode = "cover",
  eager = false,
  usePicture = false,
  focus = "auto",
  style,
  className,
  fetchpriority = "auto",
  sizes,
  isLCP = false,
  twicClass,
}: OptimizedImageProps) {

  const imagePath = src?.trim() ? src : "placeholder.png";
  const twicDomain = "https://primeiranews.twic.pics";

  // Combina className com twicClass se fornecido
  const combinedClassName = twicClass ? `${className || ''} ${twicClass}`.trim() : className;

  // Para imagem LCP, renderiza img nativo com fetchpriority para garantir prioridade máxima
  if (isLCP) {
    // Constrói URL otimizada do TwicPics para LCP
    const lcpSrc = `${twicDomain}${imagePath}?twic=v1/cover=4:3/resize=640x480`;

    return (
      <img
        src={lcpSrc}
        alt={alt}
        style={style}
        className={combinedClassName}
        fetchPriority="high"
        loading="eager"
        decoding="sync"
      />
    );
  }

  const commonProps = {
    src: imagePath,
    alt,
    ratio,
    mode,
    focus,
    style,
    className: combinedClassName,
  };

  if (usePicture) {
    return (
      <TwicPicture
        {...commonProps}
        sizes={sizes}
        eager={eager}
        {...({ fetchpriority } as any)}
      />
    );
  }

  return (
    <TwicImg
      src={imagePath}
      alt={alt}
      ratio={ratio}
      mode={mode}
      focus={focus}
      style={style}
      className={combinedClassName}
      eager={eager}
      {...({ fetchpriority } as any)}
    />
  );
}