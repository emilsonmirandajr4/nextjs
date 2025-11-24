'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { WordPressPost } from '../types/wordpress';
import { getPostImage, getPostTitle } from '../services/wordpress';
import OptimizedImage from './OptimizedImage';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './embla/EmblaCarouselArrowButtons';
import { DotButton, useDotButton } from './embla/EmblaCarouselDotButton';
import { Thumb } from './embla/EmblaCarouselThumbsButton';

interface NewsCarouselEmblaProps {
  posts: WordPressPost[];
  onPostClick?: (postId: number) => void;
}

// Mapa de cores por categoria
const categoryColors: Record<string, string> = {
  política: 'bg-blue-700',
  politica: 'bg-blue-700',
  economia: 'bg-green-700',
  esportes: 'bg-orange-700',
  cultura: 'bg-purple-700',
  tecnologia: 'bg-cyan-700',
  saúde: 'bg-red-700',
  saude: 'bg-red-700',
  educação: 'bg-yellow-700',
  educacao: 'bg-yellow-700',
  entretenimento: 'bg-pink-700',
  opinião: 'bg-indigo-700',
  opiniao: 'bg-indigo-700',
};

const getCategoryColor = (categoryName?: string): string => {
  if (!categoryName) return 'bg-sky-700';
  const normalized = categoryName.toLowerCase();
  return categoryColors[normalized] || 'bg-sky-700';
};

export default function NewsCarouselEmbla({ posts, onPostClick }: NewsCarouselEmblaProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Main carousel com autoplay
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
    },
    [Autoplay({ delay: 8000, stopOnInteraction: false, stopOnMouseEnter: false })]
  );

  // Thumbs carousel
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    axis: 'x'
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaMainApi);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  // Extrai path da imagem para TwicPics
  const getImagePath = (post: WordPressPost): string => {
    const imageUrl = getPostImage(post);
    return imageUrl.replace(/^https?:\/\/[^\/]+/, '') || '/placeholder.jpg';
  };

  const handleSlideClick = useCallback((postId: number) => {
    if (onPostClick) {
      onPostClick(postId);
    }
  }, [onPostClick]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !posts || posts.length === 0) {
    return (
      <div className="w-full h-[600px] bg-gray-900 animate-pulse" />
    );
  }

  return (
    <div className="relative w-full space-y-2">
      {/* Main Carousel */}
      <div className="overflow-hidden rounded-xl shadow-2xl shadow-blue-900/30" ref={emblaMainRef}>
        <div className="flex touch-pan-y">
          {posts.slice(0, 8).map((post, index) => {
            const categoryName = post.categories_names?.find(
              name => name.toLowerCase() !== 'notícias' && name.toLowerCase() !== 'noticias'
            ) || post.categories_names?.[0];

            return (
              <div 
                key={post.id} 
                className="flex-[0_0_100%] min-w-0"
              >
                <div 
                  className="relative h-[380px] w-full group cursor-pointer overflow-hidden"
                  onClick={() => handleSlideClick(post.id)}
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
                      filter: 'brightness(120%)', 
                      width: '100%', 
                      height: '100%' 
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
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />

      {/* Thumbnails */}
      <div className="overflow-hidden" ref={emblaThumbsRef}>
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

      {/* Dot Pagination */}
      <div className="flex justify-center gap-2 mt-6 py-2">
        {posts.slice(0, 8).map((_, index) => (
          <button
            key={index}
            onClick={() => onThumbClick(index)}
            className={`rounded-full transition-all duration-300 ${
              index === selectedIndex 
                ? 'w-12 h-2.5 border-2 border-[#3332b7] shadow-lg shadow-blue-900/50' 
                : 'bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5'
            }`}
            style={index === selectedIndex ? {
              background: 'linear-gradient(to right, #3332b7, #3332b7)'
            } : undefined}
          />
        ))}
      </div>
    </div>
  );
}
