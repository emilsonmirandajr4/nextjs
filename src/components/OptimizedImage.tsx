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
}: OptimizedImageProps) {

  const imagePath = src?.trim() ? src : "placeholder.png";

  const commonProps = {
    src: imagePath,
    alt,
    ratio,
    mode,
    focus,
    style,
    className,
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
      {...commonProps}
      eager={eager}
      {...({ fetchpriority } as any)}
    />
  );
}