import { useEffect, useRef } from 'react';
import { WordPressPost } from '../types/wordpress';
import { getPostImage, getPostTitle } from '../services/wordpress';
// @ts-ignore
import Swiper from 'swiper';
import 'swiper/css/bundle';

interface PersonagensCarouselProps {
  posts: WordPressPost[];
  onPostClick?: (postId: number) => void;
}

export default function PersonagensCarousel({ posts, onPostClick }: PersonagensCarouselProps) {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (posts.length === 0) return;

    const shouldLoop = posts.length > 2; // Evita warning do Swiper quando há poucos slides

    // Inicializa o Swiper com as mesmas configurações do carousel original
    swiperRef.current = new Swiper('.personagens-slider', {
      effect: 'coverflow',
      grabCursor: true,
      loop: shouldLoop,
      watchOverflow: true,
      centeredSlides: true,
      keyboard: true,
      spaceBetween: 0,
      slidesPerView: 'auto',
      speed: 3000,
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 3,
        slideShadows: false
      },
      breakpoints: {
        480: {
          spaceBetween: 0,
          centeredSlides: true
        }
      },
      simulateTouch: true,
      navigation: {
        nextEl: '.personagens-slider-next',
        prevEl: '.personagens-slider-prev'
      },
      pagination: {
        el: '.personagens-slider__pagination',
        clickable: true
      }
    });

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, [posts]);

  if (posts.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg h-[400px] animate-pulse flex items-center justify-center">
        <p className="text-gray-500">Carregando personagens...</p>
      </div>
    );
  }

  return (
    <div className="wrapper-personagens relative">
      <style>{`
        .personagens-slider {
          z-index: 2;
          max-width: 1300px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 20px;
        }
        @media screen and (max-width: 1300px) {
          .personagens-slider {
            max-width: 1000px;
          }
        }
        .personagens-slider__wrp {
          display: flex;
          align-items: flex-start;
          position: relative;
          z-index: 2;
        }
        .personagens-slider__item {
          width: 320px;
          flex-shrink: 0;
        }
        @media screen and (max-width: 992px) {
          .personagens-slider__item {
            width: 280px;
          }
        }
        .personagens-slider__item.swiper-slide {
          opacity: 0.5;
          pointer-events: none;
          transition: all 0.3s;
        }
        .personagens-slider__item.swiper-slide-active,
        .personagens-slider__item.swiper-slide-prev,
        .personagens-slider__item.swiper-slide-next {
          opacity: 1;
          pointer-events: auto;
        }
        .personagens-slider__ctr {
          position: relative;
          z-index: 12;
        }
        .personagens-slider__arrow {
          background: #fff;
          border: none;
          display: inline-flex;
          width: 50px;
          height: 50px;
          justify-content: center;
          align-items: center;
          box-shadow: 0 6px 26px 6px rgba(0, 0, 0, 0.25);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          z-index: 12;
          cursor: pointer;
          outline: none !important;
          color: #0284c7;
        }
        .personagens-slider__arrow:focus {
          outline: none !important;
        }
        .personagens-slider__arrow.personagens-slider-prev {
          left: 15px;
          transform: translateY(-50%);
        }
        .personagens-slider__arrow.personagens-slider-next {
          right: 15px;
          transform: translateY(-50%);
        }
        .personagens-slider__pagination {
          text-align: center;
          margin-top: 50px;
        }
        .personagens-slider__pagination .swiper-pagination-bullet {
          width: 13px;
          height: 10px;
          display: inline-block;
          background: #0284c7;
          opacity: 0.3;
          margin: 0 5px;
          border-radius: 20px;
          transition: opacity 0.5s, background-color 0.5s, width 0.5s;
          transition-delay: 0.5s, 0.5s, 0s;
        }
        .personagens-slider__pagination .swiper-pagination-bullet-active {
          opacity: 1;
          background: #0284c7;
          width: 100px;
          transition-delay: 0s;
        }
        @media screen and (max-width: 576px) {
          .personagens-slider__pagination .swiper-pagination-bullet-active {
            width: 70px;
          }
        }
        .personagem__item {
          display: block;
          transition: all 0.3s;
          cursor: pointer;
        }
        .personagem__img {
          border-radius: 10px;
          box-shadow: 0 6px 26px 6px rgba(0, 0, 0, 0.25);
          width: 100%;
          aspect-ratio: 3/4;
          transition: all 0.3s;
          overflow: hidden;
          margin-bottom: 20px;
        }
        .personagem__img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
          transition: transform 0.3s;
        }
        .personagem__item:hover .personagem__img img {
          transform: scale(1.05);
        }
        .personagem__title {
          font-size: 18px;
          font-weight: 600;
          text-align: center;
          color: #111827;
          transition: color 0.3s;
        }
        .personagem__item:hover .personagem__title {
          color: #0284c7;
        }
      `}</style>

      <div className="personagens-slider">
        <div className="personagens-slider__wrp swiper-wrapper">
          {posts.map((post) => (
            <div key={post.id} className="personagens-slider__item swiper-slide">
              <div 
                className="personagem__item"
                onClick={() => onPostClick?.(post.id)}
              >
                <div className="personagem__img">
                  <img src={getPostImage(post)} alt={getPostTitle(post)} />
                </div>
                <h3 className="personagem__title">
                  {getPostTitle(post)}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="personagens-slider__ctr">
          <div className="personagens-slider__arrows">
            <button className="personagens-slider__arrow personagens-slider-prev">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor">
                <path d="M0.704 17.696l9.856 9.856c0.896 0.896 2.432 0.896 3.328 0s0.896-2.432 0-3.328l-5.792-5.856h21.568c1.312 0 2.368-1.056 2.368-2.368s-1.056-2.368-2.368-2.368h-21.568l5.824-5.824c0.896-0.896 0.896-2.432 0-3.328-0.48-0.48-1.088-0.704-1.696-0.704s-1.216 0.224-1.696 0.704l-9.824 9.824c-0.448 0.448-0.704 1.056-0.704 1.696s0.224 1.248 0.704 1.696z"></path>
              </svg>
            </button>
            <button className="personagens-slider__arrow personagens-slider-next">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor">
                <path d="M31.296 14.336l-9.888-9.888c-0.896-0.896-2.432-0.896-3.328 0s-0.896 2.432 0 3.328l5.824 5.856h-21.536c-1.312 0-2.368 1.056-2.368 2.368s1.056 2.368 2.368 2.368h21.568l-5.856 5.824c-0.896 0.896-0.896 2.432 0 3.328 0.48 0.48 1.088 0.704 1.696 0.704s1.216-0.224 1.696-0.704l9.824-9.824c0.448-0.448 0.704-1.056 0.704-1.696s-0.224-1.248-0.704-1.664z"></path>
              </svg>
            </button>
          </div>

          <div className="personagens-slider__pagination"></div>
        </div>
      </div>
    </div>
  );
}
