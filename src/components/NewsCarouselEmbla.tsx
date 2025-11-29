"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { WordPressPost } from "../types/wordpress";
import { getPostImage, getPostTitle } from "../services/wordpress";
import { getPostUrl } from "../utils/navigation";
import OptimizedImage from "./OptimizedImage";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./embla/EmblaCarouselArrowButtons";
import { Thumb } from "./embla/EmblaCarouselThumbsButton";

interface NewsCarouselEmblaProps {
  posts: WordPressPost[];
}

export default function NewsCarouselEmbla({ posts }: NewsCarouselEmblaProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Main carousel com autoplay
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      duration: 40, // Transição mais suave (padrão é 25)
    },
    [
      Fade(),
      Autoplay({
        delay: 8000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  // Thumbs carousel
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: "x",
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaMainApi);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  // Extrai path da imagem para TwicPics
  const getImagePath = (post: WordPressPost): string => {
    const imageUrl = getPostImage(post);
    return imageUrl.replace(/^https?:\/\/[^/]+/, "") || "/placeholder.jpg";
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !posts || posts.length === 0) {
    return <div className="w-full h-[600px] bg-gray-900 animate-pulse" />;
  }

  return (
    <div className="relative w-full space-y-2">
      {/* Main Carousel */}
      <div
        className="overflow-hidden rounded-xl shadow-2xl shadow-blue-900/30 h-[380px]"
        ref={emblaMainRef}
      >
        <div className="flex touch-pan-y">
          {posts.slice(0, 8).map((post) => {
            const categoryName =
              post.categories_names?.find(
                (name) =>
                  name.toLowerCase() !== "notícias" &&
                  name.toLowerCase() !== "noticias",
              ) || post.categories_names?.[0];

            return (
              <div key={post.id} className="flex-[0_0_100%] min-w-0">
                <Link
                  href={getPostUrl(post)}
                  className="relative h-[380px] w-full group cursor-pointer overflow-hidden block"
                >
                  {/* Image */}
                  <OptimizedImage
                    src={getImagePath(post)}
                    alt={getPostTitle(post)}
                    ratio="none"
                    priority="high"
                    usePicture={true}
                    maxWidth={1200}
                    fetchpriority="high"
                    style={{
                      filter: "brightness(120%)",
                      width: "100%",
                      height: "100%",
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Category Badge */}
                  {categoryName && (
                    <div className="absolute top-4 left-4 bg-blue-700 text-white px-2.5 py-1 text-xs font-semibold uppercase z-20">
                      {categoryName}
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white line-clamp-2 group-hover:text-sky-400 transition-colors">
                      {getPostTitle(post)}
                    </h2>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />

      {/* Thumbnails */}
      <div className="overflow-hidden h-[120px]" ref={emblaThumbsRef}>
        <div className="flex gap-0">
          {posts.slice(0, 8).map((post, index) => (
            <Thumb
              key={post.id}
              selected={index === selectedIndex}
              imageSrc={getImagePath(post)}
              alt={getPostTitle(post)}
              onClick={() => onThumbClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
