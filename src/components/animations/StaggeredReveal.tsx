'use client';

import { Children, ReactNode, cloneElement, isValidElement } from 'react';
import ScrollReveal from './ScrollReveal';

type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'fade-scale';

interface StaggeredRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  staggerDelay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
  childClassName?: string;
}

export default function StaggeredReveal({
  children,
  animation = 'slide-up',
  staggerDelay = 100,
  duration = 600,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  className = '',
  childClassName = '',
}: StaggeredRevealProps) {
  const childArray = Children.toArray(children);

  return (
    <div className={className}>
      {childArray.map((child, index) => (
        <ScrollReveal
          key={index}
          animation={animation}
          delay={index * staggerDelay}
          duration={duration}
          threshold={threshold}
          rootMargin={rootMargin}
          triggerOnce={triggerOnce}
          className={childClassName}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}
