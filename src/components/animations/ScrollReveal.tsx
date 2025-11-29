'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'fade-scale';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
}

export default function ScrollReveal({
  children,
  animation = 'fade',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  className = '',
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

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

  // Estilos base para cada tipo de animação (estado inicial - antes de aparecer)
  const getInitialStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      opacity: 0,
      transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
    };

    switch (animation) {
      case 'fade':
        return baseStyle;

      case 'slide-up':
        return {
          ...baseStyle,
          transform: 'translateY(40px)',
        };

      case 'slide-down':
        return {
          ...baseStyle,
          transform: 'translateY(-40px)',
        };

      case 'slide-left':
        return {
          ...baseStyle,
          transform: 'translateX(40px)',
        };

      case 'slide-right':
        return {
          ...baseStyle,
          transform: 'translateX(-40px)',
        };

      case 'scale':
        return {
          ...baseStyle,
          transform: 'scale(0.9)',
        };

      case 'fade-scale':
        return {
          ...baseStyle,
          transform: 'scale(0.95) translateY(20px)',
        };

      default:
        return baseStyle;
    }
  };

  // Estilos quando visível (estado final - depois de aparecer)
  const getVisibleStyle = (): React.CSSProperties => {
    return {
      opacity: 1,
      transform: 'translateY(0) translateX(0) scale(1)',
      transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
    };
  };

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
