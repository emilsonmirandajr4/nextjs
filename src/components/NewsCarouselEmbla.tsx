"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { WordPressPost } from "../types/wordpress";
import { getPostImage, getPostTitle, extractImagePath } from "@/lib/wordpress-utils";
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Main carousel com autoplay
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      duration: 35, // Transição mais suave (padrão é 25)
    },
    [
      Fade(),
      Autoplay({
        delay: 5000,
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

  const onThumbClick = (index: number) => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    emblaMainApi.scrollTo(index);
  };

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);

    return () => {
      emblaMainApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaMainApi, onSelect]);

  const getImagePath = (post: any) => {

    const fullUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
      || post.featured_media_src_url;

    if (!fullUrl) return "";

    try {

      const url = new URL(fullUrl);
      return url.pathname;
    } catch (e) {

      return fullUrl
        .replace("https://primeiranews.com.br", "")
        .replace("https://primeiranews.twic.pics", "");
    }
  };

  if (!posts || posts.length === 0) {
    return <div className="w-full h-[370px] bg-gray-900 animate-pulse rounded-xl" />;
  }

  return (
    <div className="relative w-full space-y-4">

      <div
        className="overflow-hidden rounded-2xl h-[370px]"
        style={{
          boxShadow: `
            rgba(6, 95, 212, 0.6) 2px 2px,
            rgba(6, 95, 212, 0.4) 5px 5px,
            rgba(6, 95, 212, 0.2) 8px 8px
          `
        }}
        ref={emblaMainRef}
      >
        <div className="flex touch-pan-y">
          {posts.slice(0, 8).map((post, index) => {
            const isFirstSlide = index === 0;

            const categoryName =
              post.categories_names?.find(
                (name) =>
                  name.toLowerCase() !== "noticias",
              ) || post.categories_names?.[0];

            return (
              <div key={post.id} className="flex-[0_0_100%] min-w-0">
                <Link
                  href={getPostUrl(post)}
                  prefetch={false}
                  className="relative h-[370px] w-full group cursor-pointer overflow-hidden block"
                >
                  <OptimizedImage
                    src={getImagePath(post)}
                    alt={getPostTitle(post)}
                    twicClass="twic-news-carousel"
                    eager={isFirstSlide}
                    isLCP={isFirstSlide}
                    fetchpriority={isFirstSlide ? "high" : "auto"}
                    sizes="(min-width: 1024px) 640px, 100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {categoryName && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-shadow-lg px-2.5 py-1 text-xs font-semibold uppercase z-20">
                      {categoryName}
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3 z-10">
                    <h2 className="text-2xl text-shadow-lg md:text-3xl font-bold text-white line-clamp-2 text-center">
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
      <div className="flex justify-between items-center mt-4">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>

      {/* Container dos Thumbnails */}
      <div
        className="overflow-hidden h-[120px] rounded-lg mt-4"
        ref={emblaThumbsRef}
      >
        <div className="flex gap-2">
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