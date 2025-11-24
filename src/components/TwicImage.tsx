import { TwicImg } from "@twicpics/components/react";
import type { StateEvent } from "@twicpics/components/react";

interface TwicImageProps {
  src: string;
  alt?: string;
  ratio?: string | number;
  mode?: "cover" | "contain";
  placeholder?: "preview" | "meancolor" | "maincolor" | "none";
  anchor?: "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  focus?: string; // "auto" ou coordenadas "50px50p"
  eager?: boolean; // true para imagens above-the-fold (hero images)
  transition?: "fade" | "zoom" | "none";
  transitionDuration?: string;
  step?: number; // Qualidade (10 = default)
  preTransform?: string; // Transformações antes do resize
  intrinsic?: string; // Dimensões originais "1920x1080"
  refit?: boolean | string; // Smart crop para objetos principais
  onStateChange?: (stateEvent: StateEvent) => void;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  draggable?: boolean;
}

export default function TwicImage({ 
  src, 
  alt = "", 
  ratio = "16/9",
  mode = "cover",
  placeholder = "preview",
  anchor,
  focus = "auto",
  eager = false,
  transition = "fade",
  transitionDuration = "400ms",
  step = 10,
  preTransform = "output=avif/quality-min=78/quality-max=78",
  intrinsic,
  refit,
  onStateChange,
  className,
  style,
  title,
  draggable = false,
}: TwicImageProps) {
  return (
    <TwicImg 
      src={src} 
      alt={alt} 
      ratio={ratio}
      mode={mode}
      placeholder={placeholder}
      anchor={anchor}
      focus={focus}
      eager={eager}
      transition={transition}
      transitionDuration={transitionDuration}
      step={step}
      preTransform={preTransform}
      intrinsic={intrinsic}
      refit={refit}
      onStateChange={onStateChange}
      className={className}
      style={style}
      title={title}
      draggable={draggable}
    />
  );
}
