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
      className={`relative flex-[0_0_90px] w-[90px] h-[90px] mx-1 overflow-hidden rounded-lg transition-opacity duration-200 ${
        selected 
          ? 'opacity-100' 
          : 'opacity-40 hover:opacity-100'
      }`}
    >
      <OptimizedImage
        src={imageSrc}
        alt={alt}
        ratio="1/1"
        mode="cover"
        className="w-full h-full object-cover"
        usePicture={false}
      />
    </button>
  )
}
