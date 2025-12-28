'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'fade-scale' | 'zoom-in' | 'blur';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
  // Skeleton loading props
  showSkeleton?: boolean;
  isLoading?: boolean;
  skeleton?: ReactNode;
}

export default function ScrollReveal({
  children,
  animation = 'slide-up',
  delay = 0,
  duration = 800,
  threshold = 0.2,
  rootMargin = '0px 0px 100px 0px',
  triggerOnce = true,
  className = '',
  showSkeleton = false,
  isLoading = false,
  skeleton,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(!showSkeleton);
  const elementRef = useRef<HTMLDivElement>(null);

  // Atualiza hasLoaded quando isLoading muda
  useEffect(() => {
    if (showSkeleton && !isLoading) {
      // Pequeno delay para transição suave do skeleton para conteúdo
      const timer = setTimeout(() => {
        setHasLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, showSkeleton]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            // Se triggerOnce for true, para de observar após aparecer
            if (triggerOnce && observer) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            // Se triggerOnce for false, permite re-animação
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (observer && element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  // Remove willChange após a animação completar para liberar memória
  useEffect(() => {
    if (isVisible && !animationComplete) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, duration + delay + 50);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, delay, animationComplete]);

  // Estilos base para cada tipo de animação (estado inicial - antes de aparecer)
  const getInitialStyle = (): React.CSSProperties => {
    // Transição rápida e suave
    const baseStyle: React.CSSProperties = {
      opacity: 0,
      transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
      // willChange só enquanto animação não completou (libera memória GPU depois)
      ...(animationComplete ? {} : { willChange: 'transform, opacity' }),
    };

    switch (animation) {
      case 'fade':
        return baseStyle;

      case 'slide-up':
        return {
          ...baseStyle,
          transform: 'translateY(30px)',
        };

      case 'slide-down':
        return {
          ...baseStyle,
          transform: 'translateY(-30px)',
        };

      case 'slide-left':
        return {
          ...baseStyle,
          transform: 'translateX(30px)',
        };

      case 'slide-right':
        return {
          ...baseStyle,
          transform: 'translateX(-30px)',
        };

      case 'scale':
        return {
          ...baseStyle,
          transform: 'scale(0.92)',
        };

      case 'fade-scale':
        return {
          ...baseStyle,
          transform: 'scale(0.95) translateY(20px)',
        };

      case 'zoom-in':
        return {
          ...baseStyle,
          transform: 'scale(0.9)',
        };

      case 'blur':
        return {
          ...baseStyle,
          filter: 'blur(8px)',
          transform: 'translateY(15px)',
        };

      default:
        return baseStyle;
    }
  };

  // Estilos quando visível (estado final - depois de aparecer)
  const getVisibleStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {
      opacity: 1,
      transform: 'translateY(0) translateX(0) scale(1)',
      filter: 'blur(0px)',
      transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
    };
    // Só adiciona willChange: auto se animação não completou (depois remove propriedade)
    if (!animationComplete) {
      style.willChange = 'auto';
    }
    return style;
  };

  // Se skeleton está habilitado e ainda está carregando
  if (showSkeleton && !hasLoaded) {
    return (
      <div
        ref={elementRef}
        className={className}
        style={isVisible ? getVisibleStyle() : getInitialStyle()}
      >
        {skeleton || (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={elementRef}
      className={className}
      style={isVisible ? getVisibleStyle() : getInitialStyle()}
    >
      {children}
    </div>
  );
}
