import React, { useState, useEffect, useRef } from 'react'
import OptimizedImage from './OptimizedImage'

interface CarouselItem {
  id: number
  image: string
  title: string
  description: string
  category?: string
  tags?: string[]
}

interface Carousel3DWithPanelProps {
  items?: CarouselItem[]
  onImageChange?: (index: number) => void
  summaries?: string[]
  onItemClick?: (id: number) => void
}

const Carousel3DWithPanel: React.FC<Carousel3DWithPanelProps> = ({ 
  items: initialItems, 
  onImageChange,
  summaries: initialSummaries,
  onItemClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragEnd, setDragEnd] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)

  const items: CarouselItem[] = initialItems || [
    {
      id: 1,
      image: 'https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/666dde4d-00d0-43ff-95c5-c31c56bbbbb5.jpg',
      title: 'Ouro no Oceano',
      description: 'Ondas dançando sob o pôr do sol dourado'
    },
    {
      id: 2,
      image: 'https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/1381b203-7845-467c-b145-44bbe0836b1f.jpg',
      title: 'Majestade da Montanha',
      description: 'Tocando as nuvens no topo do mundo'
    },
    {
      id: 3,
      image: 'https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/6b2e770e-b625-4027-9096-7d27a626fd76.jpg',
      title: 'Floresta Mística',
      description: 'Onde a mágica respira entre as árvores'
    },
    {
      id: 4,
      image: 'https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/2fe7ede0-8520-43b7-8d5b-5b058b3a624b.jpg',
      title: 'Sonhos Aurora',
      description: 'O espetáculo de luzes da natureza'
    },
    {
      id: 5,
      image: 'https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/e559c9df-c9a3-44f6-92cf-6999d928ef0b.jpg',
      title: 'Sinfonia do Deserto',
      description: 'Areias douradas que se estendem para sempre'
    },
    {
      id: 6,
      image: 'https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/a22da878-d4a4-41d8-ab24-6af771fd0612.jpg',
      title: 'Paraíso Encontrado',
      description: 'Onde os sonhos encontram a realidade'
    },
    {
      id: 7,
      image: 'https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/643006b8-6bbd-4599-9b81-32698fe9fdab.jpg',
      title: 'Maravilha da Primavera',
      description: 'Pétalas dançando ao vento'
    },
    {
      id: 8,
      image: 'https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/d8d088b4-5e28-4d75-b8fa-afebead9a04e.jpg',
      title: 'Poder da Natureza',
      description: 'Onde a água esculpe a pedra'
    }
  ]

  const summaries: string[] = initialSummaries || [
    "Os mestres da corrupção que operam nos bastidores do poder, controlando políticas e recursos para benefício próprio.",
    "Os articuladores políticos que vendem o país por pequenos favores pessoais, traindo a confiança do povo brasileiro.",
    "Os empresários que lucram com a miséria alheia, explorando trabalhadores e sonegando impostos sem escrúpulos.",
    "Os juízes e promotores que manipulam a justiça conforme seus interesses, protegendo aliados e perseguindo inimigos.",
    "Os lobistas internacionais que ditam as regras da economia nacional, colocando o Brasil em posição de subserviência.",
    "Os líderes partidários que priorizam seus cargos e salários em detrimento do bem-estar da população que deveriam servir.",
    "Os banqueiros que controlam o fluxo de dinheiro no país, decidindo quem prospera e quem sofre com seus juros abusivos.",
    "Os comunicadores que distorcem a verdade para manter a população alienada, servindo aos interesses dos poderosos."
  ]

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext()
      }
    }, 3000)
    
    return () => clearInterval(interval)
  }, [currentIndex, isAnimating])

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowLeft':
          handlePrevious()
          break
        case 'ArrowRight':
          handleNext()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Trigger image change
  useEffect(() => {
    if (onImageChange) {
      onImageChange(currentIndex)
    }
  }, [currentIndex, onImageChange])

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    
    if (isLeftSwipe) {
      handleNext()
    }
    if (isRightSwipe) {
      handlePrevious()
    }
    
    setTouchStart(0)
    setTouchEnd(0)
  }

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setDragEnd(e.clientX)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    
    const distance = dragStart - dragEnd
    const isLeftDrag = distance > 50
    const isRightDrag = distance < -50
    
    if (isLeftDrag) {
      handleNext()
    }
    if (isRightDrag) {
      handlePrevious()
    }
    
    setIsDragging(false)
    setDragStart(0)
    setDragEnd(0)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setDragStart(0)
    setDragEnd(0)
  }

  const handleNext = () => {
    if (isAnimating) return
    const newIndex = (currentIndex + 1) % items.length
    setCurrentIndex(newIndex)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 1200)
  }

  const handlePrevious = () => {
    if (isAnimating) return
    const newIndex = (currentIndex - 1 + items.length) % items.length
    setCurrentIndex(newIndex)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 1200)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setCurrentIndex(index)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 1200)
  }

  // Calculate position and style for each item
  const getItemStyle = (index: number) => {
    const diff = index - currentIndex
    const normalizedDiff = ((diff + items.length) % items.length)
    
    const stackSpacing = isMobile ? 40 : 60
    const maxStack = 3
    
    if (normalizedDiff === 0) {
      return {
        transform: 'translateZ(200px) scale(1)',
        filter: 'none' as const,
        opacity: 1,
        zIndex: items.length,
        transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    } else if (normalizedDiff <= maxStack) {
      const stackDepth = normalizedDiff
      const zIndex = items.length - stackDepth
      const scale = 1 - (stackDepth * 0.08)
      const translateX = stackDepth * stackSpacing
      const translateY = stackDepth * 30
      const opacity = 0.8
      
      return {
        transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
        filter: 'grayscale(100%)' as const,
        opacity,
        zIndex,
        transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer' as const
      }
    } else {
      return {
        transform: 'translateX(-500px) scale(0.8)',
        filter: 'grayscale(100%)' as const,
        opacity: 0,
        zIndex: 0,
        transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  }

  return (
    <div className="w-full" style={{ background: 'linear-gradient(135deg, #111827 0%, #000000 50%, #111827 100%)', borderRadius: '16px', minHeight: '440px' }}>
      <style>{`
        /* TwicPics responsive optimization - reduz forced reflows */
        .twic-carousel-img {
          --twic-ratio: calc(4/3);
          --twic-mode: cover;
        }
        
        @media (max-width: 768px) {
          .twic-carousel-img {
            --twic-ratio: 1;
          }
        }
        
        @media (min-width: 1024px) {
          .twic-carousel-img {
            --twic-ratio: calc(4/3);
          }
        }
        
        @media (min-width: 1280px) {
          .twic-carousel-img {
            --twic-ratio: calc(16/9);
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
        }
        .summary-panel h2 {
          font-size: 20px;
          font-weight: bold;
          color: white;
          margin-bottom: 16px;
        }
        .summary-content {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }
        .summary-content p {
          margin-bottom: 12px;
        }
        .summary-content .small-text {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }
        .carousel-container {
          position: relative;
          width: 100%;
          height: 380px;
          perspective: 1200px;
          padding: 0 0 30px 0;
        }
        .carousel-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .carousel-item {
          position: absolute;
          width: 380px;
          cursor: grab;
        }
        .carousel-card {
          position: relative;
          width: 100%;
          border-radius: 16px;
          overflow: visible;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(37, 99, 235, 0.4);
          background: white;
          isolation: isolate;
        }
        .carousel-image {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
          border-radius: 16px;
          z-index: 2;
        }
        .carousel-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
          transition: transform 0.3s ease;
        }
        .carousel-card:hover .carousel-image img {
          transform: scale(1.05);
        }
        .badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 6px 12px;
          color: white;
          font-size: 14px;
          font-weight: 500;
          z-index: 3;
        }
        .text-container {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          z-index: 3;
        }
        .text-background {
          position: absolute;
          inset-x: 0;
          bottom: 0;
          height: 120px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 50%, transparent 100%);
        }
        .text-content {
          position: relative;
        }
        .text-title {
          font-size: 24px;
          font-weight: bold;
          color: white;
          margin-bottom: 8px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        .text-description {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }
        .nav-btn {
          color: white;
          background: transparent;
          border: none;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-btn:hover {
          transform: scale(1.2);
        }
        .nav-btn svg {
          width: 28px;
          height: 28px;
        }
        .fixed-dots {
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 20;
        }
        .dots-wrapper {
          display: flex;
          gap: 10px;
        }
        .fixed-dot {
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          padding: 0;
          width: 12px;
          height: 12px;
        }
        .fixed-dot.active {
          width: 36px;
          border-radius: 18px;
          background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
          box-shadow: 0 0 12px rgba(220, 38, 38, 0.6);
        }
        .fixed-dot:hover:not(.active) {
          background: rgba(255, 255, 255, 0.6);
          transform: scale(1.3);
        }
        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .summary-panel {
            position: static;
            order: 2;
          }
          .carousel-container {
            order: 1;
          }
        }
        @media (max-width: 768px) {
          .carousel-container {
            height: 500px;
          }
          .carousel-item {
            width: 320px;
          }
          .carousel-image {
            height: 320px;
          }
        }
      `}</style>

      <div className="main-content">
        <div className="content-grid">
          {/* Title Panel - Left Side */}
          <div className="summary-panel">
            <div className="summary-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
              <h2 style={{ fontSize: '26px', lineHeight: '1.3' }}>
                {items[currentIndex]?.title}
              </h2>
            </div>
          </div>

          {/* Carousel - Right Side */}
          <div 
            ref={containerRef}
            className="carousel-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {/* Carousel Wrapper */}
            <div className="carousel-wrapper" style={{ perspective: '1200px' }}>
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="carousel-item"
                  style={getItemStyle(index) as React.CSSProperties}
                  onClick={() => {
                    if (index === currentIndex && onItemClick) {
                      onItemClick(item.id);
                      return;
                    }
                    if (index !== currentIndex) {
                      goToSlide(index)
                    }
                  }}
                >
                  <div className="carousel-card animate-border-glow">
                    <div className="carousel-image">
                      <OptimizedImage
                        src={item.image}
                        alt={item.title}
                        ratio="4/3"
                        priority={index === currentIndex ? "high" : "normal"}
                        transitionDuration="400ms"
                        className="twic-carousel-img"
                      />
                      {item.category && (
                        <div className="absolute top-4 left-4 bg-red-700 text-white px-3 py-1 text-xs font-bold uppercase z-20 rounded-full shadow-lg">
                          {item.category}
                        </div>
                      )}
                      <div className="badge">{index + 1} / {items.length}</div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Fixed Dots Navigation */}
            <div className="fixed-dots">
              <button 
                className="nav-btn"
                onClick={handlePrevious}
                title="Previous"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              
              <div className="dots-wrapper">
                {items.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    className={`fixed-dot ${dotIndex === currentIndex ? 'active' : ''}`}
                    onClick={() => goToSlide(dotIndex)}
                    title={`Go to slide ${dotIndex + 1}`}
                  />
                ))}
              </div>

              <button 
                className="nav-btn"
                onClick={handleNext}
                title="Next"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel3DWithPanel
