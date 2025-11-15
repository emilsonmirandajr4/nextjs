import { useEffect, useState, useRef } from 'react';
import { WordPressPost } from '../types/wordpress';
import { getPostImage, getPostTitle } from '../services/wordpress';

interface Carousel3DProps {
  posts: WordPressPost[];
  onPostClick?: (postId: number) => void;
}

export default function Carousel3D({ posts, onPostClick }: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const autoplayDelay = 3500;

  const next = () => {
    if (isAnimating || posts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prev = () => {
    if (isAnimating || posts.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setCurrentIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - startX;
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        prev();
      } else {
        next();
      }
    }
    setDragOffset(0);
  };

  // Autoplay
  useEffect(() => {
    if (posts.length === 0) return;

    autoplayRef.current = setInterval(() => {
      if (!isAnimating && !isDragging) {
        next();
      }
    }, autoplayDelay);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isAnimating, currentIndex, posts.length, isDragging]);

  // Handle animation state
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1200);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  if (posts.length === 0) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl">
        <p className="text-white">Carregando posts...</p>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-[600px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing" 
      style={{ perspective: '1200px' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900" />

      {/* Carousel Items */}
      <div className="absolute inset-0 flex items-center justify-center">
        {posts.map((post, index) => {
          const diff = (index - currentIndex + posts.length) % posts.length;
          let className = 'absolute w-[400px] h-[500px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-[1200ms] ease-out';
          
          if (diff === 0) {
            className += ' z-[8] opacity-100 scale-100';
          } else if (diff === 1) {
            className += ' translate-x-[60px] translate-y-[30px] scale-[0.92] opacity-75 z-[7] grayscale';
          } else if (diff === 2) {
            className += ' translate-x-[120px] translate-y-[60px] scale-[0.84] opacity-50 z-[6] grayscale';
          } else if (diff === 3) {
            className += ' translate-x-[180px] translate-y-[90px] scale-[0.76] opacity-25 z-[5] grayscale';
          } else {
            className += ' -translate-x-[500px] scale-[0.8] opacity-0 z-0 grayscale';
          }

          return (
            <div
              key={post.id}
              className={className}
              onClick={() => {
                if (diff !== 0) {
                  goToSlide(index);
                } else {
                  onPostClick?.(post.id);
                }
              }}
            >
              <img
                src={getPostImage(post)}
                alt={getPostTitle(post)}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white text-xl font-bold mb-2">{getPostTitle(post)}</h3>
                {post.categories_names && post.categories_names.length > 0 && (
                  <p className="text-white/80 text-sm">
                    {post.categories_names.find(name => name.toLowerCase() !== 'notícias') || post.categories_names[0]}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <button
          onClick={prev}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl hover:bg-white/30 flex items-center justify-center text-white transition-all hover:scale-110"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        {/* Dots Navigation */}
        <div className="flex gap-2.5">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentIndex
                ? 'w-8 h-2.5 bg-white rounded-full'
                : 'w-2.5 h-2.5 bg-white/30 rounded-full hover:bg-white/70'
            }`}
          />
        ))}
        </div>
        
        <button
          onClick={next}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl hover:bg-white/30 flex items-center justify-center text-white transition-all hover:scale-110"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Pagination */}
      <div className="absolute top-5 right-5 bg-black/50 backdrop-blur-xl text-white px-4 py-2 rounded-full text-sm font-bold z-20">
        {currentIndex + 1} / {posts.length}
      </div>
    </div>
  );
}
