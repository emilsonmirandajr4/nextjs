"use client";

import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import OptimizedImage from "./OptimizedImage";

interface CarouselItem {
  id: number;
  image: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
}

interface CarouselWithPanelProps {
  items?: CarouselItem[];
  onImageChange?: (index: number) => void;
  summaries?: string[];
  onItemClick?: (id: number) => void;
}

const CarouselWithPanel: React.FC<CarouselWithPanelProps> = ({
  items: initialItems,
  onImageChange,
  summaries: initialSummaries,
  onItemClick,
}) => {
  const items = initialItems || [];
  // summaries is passed as prop but not used in this component
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const summaries = initialSummaries || [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      if (onImageChange) {
        onImageChange(index);
      }
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onImageChange]);

  // Border width para CSS puro
  const b = 3.5;

  return (
    <div
      className="w-full"
      style={{
        background: "#000000",
        borderRadius: "16px",
        padding: "16px",
        minHeight: "340px",
        maxHeight: "340px",
        overflow: "hidden",
      }}
    >
      <style>{`
        @property --carousel-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes fire-spin {
          to { --carousel-angle: 1turn }
        }

        .carousel-image-wrapper {
          position: relative;
          box-sizing: border-box;
          border: solid ${b}px transparent;
          border-radius: 16px;
          overflow: visible;
          background: 
            repeating-conic-gradient(
              from var(--carousel-angle, 0deg), 
              #7801167f, #f7b5387f, #db7c267f, #d8572a7f, #c32f277f, #7801167f
            ) border-box;
          animation: fire-spin 4s linear infinite;
          will-change: --carousel-angle;
          transform: translateZ(0);
          transition: opacity 0.3s ease;
        }

        /* Slides não-ativos com opacity reduzida */
        .embla__slide:not(.is-selected) .carousel-image-wrapper {
          opacity: 0.3;
        }

        .embla__slide.is-selected .carousel-image-wrapper {
          opacity: 1;
        }

        .category-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #dc2626;
          color: white;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          border-radius: 8px;
          z-index: 10;
        }

        .carousel-wrapper {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 16px;
          margin-top: 16px;
          height: 100%;
          max-height: 400px;
        }

        .summary-panel {
          background: #04061aa6;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .summary-panel h2 {
          font-size: 22px;
          line-height: 1.3;
          color: white;
          margin: 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
        }

        .embla {
          max-width: 100%;
          margin: 0;
          --slide-height: 14rem;
          --slide-spacing: 0.8rem;
          --slide-size: 60%;
        }

        .embla__viewport {
          overflow: hidden;
        }

        .embla__container {
          display: flex;
          touch-action: pan-y pinch-zoom;
          margin-left: calc(var(--slide-spacing) * -1);
        }

        .embla__slide {
          flex: 0 0 var(--slide-size);
          min-width: 0;
          padding-left: var(--slide-spacing);
        }

        .embla__slide__img {
          border-radius: 14px;
          display: block;
          height: var(--slide-height);
          width: 100%;
          object-fit: contain;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.05);
        }

        .embla__controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-top: 12px;
        }

        .embla__buttons {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .embla__button {
          -webkit-appearance: none;
          appearance: none;
          background: rgba(220, 38, 38, 0.15);
          touch-action: manipulation;
          cursor: pointer;
          padding: 0;
          margin: 0;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          color: rgba(239, 68, 68, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
        }

        .embla__button:hover:not(:disabled) {
          background: rgba(220, 38, 38, 0.25);
          border-color: rgba(239, 68, 68, 0.7);
          box-shadow: 0 2px 8px rgba(220, 38, 38, 0.2);
        }

        .embla__button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .embla__button__svg {
          width: 45%;
          height: 45%;
        }

        .embla__dots {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          align-items: center;
          gap: 6px;
        }

        .embla__dot {
          -webkit-appearance: none;
          appearance: none;
          background-color: transparent;
          touch-action: manipulation;
          cursor: pointer;
          border: 0;
          padding: 0;
          margin: 0;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .embla__dot:after {
          background: rgba(255, 255, 255, 0.25);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: block;
          content: '';
          transition: background 0.2s, transform 0.2s, width 0.2s, height 0.2s, border-radius 0.2s;
        }

        .embla__dot:hover:after {
          background: rgba(255, 255, 255, 0.5);
          transform: scale(1.2);
        }

        .embla__dot--selected:after {
          background: #dc2626;
          width: 24px;
          height: 8px;
          border-radius: 4px;
          box-shadow: 0 0 8px rgba(220, 38, 38, 0.3);
        }

        @media (max-width: 1024px) {
          .carousel-wrapper {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .summary-panel {
            order: 2;
            max-height: 100px;
          }

          .embla {
            order: 1;
          }
        }

        @media (max-width: 768px) {
          .embla {
            --slide-size: 85%;
          }

          .embla__button {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>

      <div className="carousel-wrapper">
        {/* Title Panel - Left Side */}
        <div className="summary-panel">
          <h2>{items[selectedIndex]?.title}</h2>
        </div>

        {/* Embla Carousel - Right Side */}
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {items.map((item, index) => (
                <div
                  className={`embla__slide ${index === selectedIndex ? 'is-selected' : ''}`}
                  key={item.id}
                >
                  <div
                    onClick={() => onItemClick?.(item.id)}
                    className="carousel-image-wrapper"
                  >
                    <div className="category-badge">ENGANADORES</div>
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 350px, 280px"
                      className="embla__slide__img"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="embla__controls">
            <div className="embla__buttons">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>

            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={"embla__dot".concat(
                    index === selectedIndex ? " embla__dot--selected" : "",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselWithPanel;
