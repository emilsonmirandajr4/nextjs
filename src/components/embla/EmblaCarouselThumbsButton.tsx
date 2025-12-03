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
      className={`relative flex-[0_0_16.666%] min-w-0 h-20 mx-1 overflow-hidden rounded-lg transition-opacity duration-300 ${
        selected 
          ? 'opacity-100' 
          : 'opacity-50 hover:opacity-90'
      }`}
    >
      <OptimizedImage
        src={imageSrc}
        alt={alt}
        ratio="16/9"
        priority="normal"
        usePicture={true}
        maxWidth={200}
        style={{ width: '100%', height: '100%' }}
        className="w-full h-full object-cover"
      />
    </button>
  )
}
