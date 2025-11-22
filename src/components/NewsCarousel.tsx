'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade, Thumbs, FreeMode } from 'swiper/modules';
import OptimizedImage from './OptimizedImage';
import { WordPressPost } from '../types/wordpress';
import { getPostImage, getPostTitle } from '../services/wordpress';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

interface NewsCarouselProps {
  posts: WordPressPost[];
  onPostClick?: (postId: number) => void;
}

export default function NewsCarousel({ posts, onPostClick }: NewsCarouselProps) {
  const [mounted, setMounted] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Extrai path da imagem para TwicPics
  const getImagePath = (post: WordPressPost): string => {
    const imageUrl = getPostImage(post);
    // Remove o domínio base se existir, TwicPics precisa do path
    return imageUrl.replace(/^https?:\/\/[^\/]+/, '') || '/placeholder.jpg';
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [posts]);

  // Scroll automático das thumbnails para acompanhar o slide ativo
  useEffect(() => {
    if (thumbsSwiper && !thumbsSwiper.destroyed && activeIndex !== undefined) {
      // Calcula o índice para centralizar a thumbnail ativa
      const slidesPerView = 6;
      const offset = Math.floor(slidesPerView / 2);
      
      // Se o activeIndex estiver além da primeira "página" de thumbnails, faz scroll
      if (activeIndex >= offset) {
        thumbsSwiper.slideTo(activeIndex - offset, 300);
      } else {
        // Se estiver no início, volta para o começo
        thumbsSwiper.slideTo(0, 300);
      }
    }
  }, [activeIndex, thumbsSwiper]);

  // Mapeia as categorias do WordPress para nossas cores
  const getCategoriaClass = (catId: number | 'default') => {
    const categoriaMap = {
      1: 'bg-categoria-politica',
      2: 'bg-categoria-economia',
      3: 'bg-categoria-esporte',
      4: 'bg-categoria-cultura',
      5: 'bg-categoria-tecnologia',
      default: 'bg-categoria-default'
    } as const;
    return categoriaMap[catId as keyof typeof categoriaMap] || categoriaMap.default;
  };

  useEffect(() => {
    // Delay mounting to ensure DOM is ready
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Only render once DOM is ready - mantém altura exata para evitar CLS
  if (!mounted) {
    return (
      <div className="relative">
        {/* Skeleton do carousel principal - altura exata */}
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg h-[420px] animate-pulse shadow-md overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="h-8 bg-white/20 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-white/15 rounded w-1/2"></div>
          </div>
        </div>
        {/* Skeleton das thumbnails - altura exata */}
        <div className="mt-3 flex gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 flex-1 bg-slate-200 rounded-md animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="relative">
        {/* Mantém altura exata mesmo quando vazio para evitar CLS */}
        <div className="bg-slate-100 rounded-lg h-[420px] flex items-center justify-center shadow-md">
          <p className="text-slate-500 text-lg">Nenhuma notícia disponível</p>
        </div>
        <div className="mt-3 h-16"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[500px]">
      <style>{`
        @keyframes carousel-border-glow {
          0%, 100% {
            border-color: rgba(30, 58, 138, 0.6);
            box-shadow: 0 0 12px rgba(30, 58, 138, 0.4);
          }
          50% {
            border-color: rgba(30, 58, 138, 1);
            box-shadow: 0 0 20px rgba(30, 58, 138, 0.8);
          }
        }
        .carousel-animated-border {
          border: 2px solid rgba(30, 58, 138, 0.6) !important;
          animation: carousel-border-glow 3s ease-in-out infinite;
        }
        .carousel-slide-hover:hover picture,
        .carousel-slide-hover:hover img {
          transform: scale(1.05);
          transition: transform 0.6s ease-out;
        }
      `}</style>
      <div className="rounded-lg overflow-hidden transition-all duration-300 carousel-animated-border" style={{ minHeight: '420px' }}>
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade, Thumbs]}
          onSwiper={setMainSwiper}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 8000, disableOnInteraction: false }}
          // Usamos a paginação interna do Swiper para evitar acessar um elemento ainda não montado
          pagination={{ clickable: true }}
          navigation
          loop={false}
          watchOverflow={true}
          // Protege contra instância destruída de thumbsSwiper (evita erros internos do Swiper)
          thumbs={thumbsSwiper && !thumbsSwiper.destroyed ? { swiper: thumbsSwiper } : undefined}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="h-[420px]"
          style={{ height: '420px' }}
        >
        {posts.map(post => (
          <SwiperSlide key={post.id}>
            <div 
              onClick={() => onPostClick?.(post.id)}
              className="block h-full cursor-pointer carousel-slide-hover"
            >
              <div className="relative h-full w-full group cursor-pointer overflow-hidden">
                <OptimizedImage
                  src={getImagePath(post)}
                  alt={getPostTitle(post)}
                  ratio="none"
                  priority="high"
                  usePicture={true}
                  maxWidth={1200}
                  style={{ filter: 'brightness(120%)', width: '100%', height: '100%' }}
                  className="h-full w-full object-cover"
                  fetchpriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                {/* Category Badge */}
                {((post.categories_names && post.categories_names.length > 0) || (post.categories && post.categories.length > 0)) && (
                  <div className="absolute top-4 left-4 bg-sky-700 text-white px-2.5 py-1 text-xs font-semibold uppercase z-20">
                    {post.categories_names 
                      ? (post.categories_names.find(name => name.toLowerCase() !== 'notícias' && name.toLowerCase() !== 'noticias') || post.categories_names[0])
                      : `Cat ${post.categories?.filter(id => id !== 1)[0] || post.categories?.[0] || ''}`
                    }
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {/* Faixa sombreada que vai de ponta a ponta do carousel */}
                  <div className="absolute inset-x-0 inset-y-4 bg-black/40 backdrop-blur-sm"></div>
                  {/* Título sobre a faixa */}
                  <h2 className="relative z-10 text-white text-2xl font-bold leading-tight line-clamp-2 group-hover:text-fundo-card transition-colors duration-300" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}>
                    {getPostTitle(post)}
                  </h2>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
      </div>
      
      {/* Thumbnails */}
      <div className="mt-3" style={{ minHeight: '64px' }}>
        <Swiper
          modules={[FreeMode, Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={Math.min(6, Math.max(1, posts.length))}
          freeMode={{
            enabled: true,
            sticky: false,
          }}
          watchSlidesProgress
          watchOverflow={true}
          slideToClickedSlide={true}
          centeredSlides={false}
          className="thumbs-swiper"
        >
          {posts.map((post, index) => (
            <SwiperSlide key={`thumb-${post.id}`}>
              <div 
                className="h-16 w-full overflow-hidden rounded-md transition-all duration-300 group hover:scale-105 hover:z-10 cursor-pointer"
                onClick={() => {
                  if (mainSwiper) {
                    // Como loop está desativado, usamos slideTo em vez de slideToLoop para evitar erros
                    mainSwiper.slideTo(index, 300);
                  }
                }}
              >
                <div 
                  className={`h-full w-full overflow-hidden rounded-md border-[3px] transition-all duration-300 ${activeIndex === index ? 'border-blue-300 shadow-lg' : 'border-white/20'} group-hover:border-blue-200 group-hover:shadow-xl`}
                  style={{
                    backgroundImage: `url(${getPostImage(post)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: activeIndex === index ? 1 : 0.6,
                    transition: 'all 300ms'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = activeIndex === index ? '1' : '0.6'}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Paginação */}
      <div className="news-carousel-pagination flex justify-center mt-4 gap-2"></div>
    </div>
  );
}
