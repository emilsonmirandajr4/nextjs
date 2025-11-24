import React, { useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import OptimizedImage from './OptimizedImage'

interface CarouselItem {
  id: number
  image: string
  title: string
  description: string
  category?: string
  tags?: string[]
}

interface CarouselEmblaWithPanelProps {
  items?: CarouselItem[]
  onImageChange?: (index: number) => void
  summaries?: string[]
  onItemClick?: (id: number) => void
}

const CarouselEmblaWithPanel: React.FC<CarouselEmblaWithPanelProps> = ({ 
  items: initialItems, 
  onImageChange,
  summaries: initialSummaries,
  onItemClick
}) => {
  const items = initialItems || []
  const summaries = initialSummaries || []

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      duration: 20,
      watchDrag: false
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const index = emblaApi.selectedScrollSnap()
    setSelectedIndex(index)
    if (onImageChange) {
      onImageChange(index)
    }
  }, [emblaApi, onImageChange])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="w-full" style={{ background: 'linear-gradient(135deg, #111827 0%, #000000 50%, #111827 100%)', borderRadius: '16px', minHeight: '440px' }}>
      <style>{`
        /* TwicPics responsive optimization */
        .twic-carousel-img {
          --twic-ratio: calc(4/3);
          --twic-mode: cover;
        }
        
        @keyframes border-glow {
          0%, 100% {
            box-shadow: 0 0 4px rgba(220, 38, 38, 0.4);
            opacity: 0.7;
          }
          50% {
            box-shadow: 0 0 24px 6px rgba(220, 38, 38, 0.8);
            opacity: 1;
          }
        }
        
        .animate-border-glow {
          position: relative;
        }
        
        .animate-border-glow::before {
          content: '';
          position: absolute;
          inset: -2.5px;
          border-radius: 16px;
          background: linear-gradient(45deg, #7f1d1d, #ef4444);
          pointer-events: none;
          z-index: -1;
          animation: border-glow 3s ease-in-out infinite;
        }
        
        .main-content {
          max-width: 1400px;
          padding: 20px;
          height: 440px;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 8px;
          align-items: stretch;
          height: 100%;
        }
        
        .summary-panel {
          position: relative;
          background: rgba(17, 24, 39, 0.5);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .embla {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .embla__viewport {
          overflow: hidden;
          height: 280px;
          border-radius: 16px;
          width: 66.67%;
          max-width: 500px;
        }
        
        .embla__container {
          display: flex;
          height: 100%;
          position: relative;
        }
        
        .embla__slide {
          flex: 0 0 100%;
          min-width: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
          pointer-events: none;
        }
        
        .embla__slide.is-selected {
          opacity: 1;
          position: relative;
          pointer-events: auto;
        }
        
        .carousel-image {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(37, 99, 235, 0.4);
        }
        
        .carousel-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
        }
        
        .embla__nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }
        
        .embla__nav--prev {
          left: calc(50% - 33.33% - 25px);
        }
        
        .embla__nav--next {
          right: calc(50% - 33.33% - 25px);
        }
        
        .embla__button {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border: 2px solid rgba(59, 130, 246, 0.3);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
          backdrop-filter: blur(10px);
        }
        
        .embla__button:hover {
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.6);
          border-color: rgba(96, 165, 250, 0.5);
        }
        
        .embla__button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        .embla__dots {
          display: flex;
          gap: 10px;
          justify-content: center;
          align-items: center;
          padding: 16px 0 0;
        }
        
        .embla__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .embla__dot:hover {
          background: rgba(255, 255, 255, 0.6);
          transform: scale(1.2);
        }
        
        .embla__dot--selected {
          width: 32px;
          border-radius: 16px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          box-shadow: 0 0 16px rgba(59, 130, 246, 0.6);
        }
        
        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          
          .summary-panel {
            order: 2;
          }
          
          .embla {
            order: 1;
          }
          
          .embla__viewport {
            width: 80%;
            max-width: 400px;
          }
          
          .embla__nav--prev {
            left: calc(50% - 40% - 20px);
          }
          
          .embla__nav--next {
            right: calc(50% - 40% - 20px);
          }
        }
        
        @media (max-width: 768px) {
          .embla__viewport {
            height: 320px;
          }
          
          .embla__nav {
            display: none;
          }
        }
      `}</style>

      <div className="main-content">
        <div className="content-grid">
          {/* Title Panel - Left Side */}
          <div className="summary-panel">
            <h2 style={{ fontSize: '26px', lineHeight: '1.3', color: 'white' }}>
              {items[selectedIndex]?.title}
            </h2>
          </div>

          {/* Embla Carousel - Right Side */}
          <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`embla__slide ${index === selectedIndex ? 'is-selected' : ''}`}
                    onClick={() => onItemClick?.(item.id)}
                  >
                    <div className="carousel-image animate-border-glow">
                      <OptimizedImage
                        src={item.image}
                        alt={item.title}
                        ratio="16/9"
                        mode="cover"
                        priority="high"
                        className="twic-carousel-img"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              className="embla__nav embla__nav--prev"
              onClick={scrollPrev}
              aria-label="Previous slide"
            >
              <div className="embla__button">
                <ChevronLeft size={24} strokeWidth={2.5} />
              </div>
            </button>

            <button 
              className="embla__nav embla__nav--next"
              onClick={scrollNext}
              aria-label="Next slide"
            >
              <div className="embla__button">
                <ChevronRight size={24} strokeWidth={2.5} />
              </div>
            </button>

            {/* Dots */}
            <div className="embla__dots">
              {items.map((_, index) => (
                <button
                  key={index}
                  className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarouselEmblaWithPanel
