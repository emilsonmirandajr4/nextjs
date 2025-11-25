'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface RotatingBorderCardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  gradientColors?: {
    from: string;
    to: string;
  };
}

const RotatingBorderCard: React.FC<RotatingBorderCardProps> = ({
  children,
  className,
  title,
  subtitle,
  description,
  buttonText,
  buttonHref = '#',
  gradientColors = {
    from: '#ff3c7b',
    to: '#40c9ff',
  },
}) => {
  return (
    <>
      <div
        className={cn(
          'group relative w-[350px] h-[400px] bg-white/5 backdrop-blur-[10px] rounded-[15px] flex justify-center items-center transition-all duration-500 overflow-hidden',
          className
        )}
      >
        {/* Rotating gradient border */}
        <div
          className="absolute w-[150%] h-[150%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"
          style={{
            background: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.to})`,
          }}
        />

        {/* Content */}
        <div className="relative w-[96%] h-[96%] bg-[#1c1c1c] rounded-[10px] p-[30px] flex flex-col justify-between z-10">
          {title && (
            <h2
              className="text-5xl font-medium mb-1"
              style={{ color: gradientColors.from }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <h3 className="text-white text-3xl font-normal mb-2">{subtitle}</h3>
          )}
          {description && (
            <p className="text-gray-400 leading-relaxed mb-5">{description}</p>
          )}
          
          {children}

          {buttonText && (
            <a
              href={buttonHref}
              className="inline-block self-start px-6 py-2.5 text-white rounded-full transition-all duration-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,60,123,0.4)]"
              style={{
                background: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.to})`,
              }}
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export { RotatingBorderCard };
