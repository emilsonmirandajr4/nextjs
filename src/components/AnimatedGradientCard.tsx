import React from 'react';

interface AnimatedGradientCardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

const AnimatedGradientCard: React.FC<AnimatedGradientCardProps> = ({
  children,
  className = '',
  title,
  description,
}) => {
  return (
    <div className="relative group">
      {/* Animated gradient border */}
      <div 
        className="absolute -inset-0.5 rounded-2xl opacity-75 group-hover:opacity-100 blur-sm transition duration-1000 group-hover:duration-200 animate-gradient-xy"
        style={{
          background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
          backgroundSize: '400% 400%',
        }}
      />
      
      {/* Card content */}
      <div className={`relative bg-gray-900/90 backdrop-blur-xl border-0 rounded-2xl p-8 ${className}`}>
        <div className="relative z-10">
          {title && (
            <h3 
              className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              {title}
            </h3>
          )}
          {description && (
            <p className="text-gray-400 mb-6">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AnimatedGradientCard;
