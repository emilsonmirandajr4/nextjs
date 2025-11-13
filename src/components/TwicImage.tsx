import { TwicImg } from "@twicpics/components/react";

interface TwicImageProps {
  src: string;
  alt?: string;
  ratio?: string;
}

export default function TwicImage({ src, alt = "", ratio = "16/9" }: TwicImageProps) {
  return <TwicImg src={src} alt={alt} ratio={ratio} />;
}
