import React from 'react';
import OptimizedImage from '../OptimizedImage';

type PropType = {
  selected: boolean
  imageSrc: string
  alt: string
  onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, imageSrc, alt, onClick } = props

  return (
    <button
      onClick={onClick}
      type="button"
      className={`relative flex-[0_0_16.666%] min-w-0 h-20 mx-1 overflow-hidden rounded-lg transition-all duration-300 ${
        selected 
          ? 'ring-2 ring-blue-800 scale-105 shadow-lg shadow-blue-900/40' 
          : ''
      }`}
    >
      <OptimizedImage
        src={imageSrc}
        alt={alt}
        ratio="none"
        priority="normal"
        usePicture={false}
        maxWidth={200}
        style={{ width: '100%', height: '100%' }}
        className="w-full h-full object-cover"
      />
    </button>
  )
}
