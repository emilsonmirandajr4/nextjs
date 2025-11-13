import React from 'react';
import { TwicImg } from '@twicpics/components/react';

interface TwicImageExampleProps {
  src: string;
  alt?: string;
  className?: string;
  ratio?: string;
  mode?: 'contain' | 'cover';
  focus?: string;
}

const TwicImageExample: React.FC<TwicImageExampleProps> = ({
  src,
  alt = 'Image',
  className = '',
  ratio = '16/9',
  mode = 'cover',
  focus = 'auto'
}) => {
  return (
    <div className={`twic-image-container ${className}`}>
      <TwicImg
        src={src}
        alt={alt}
        ratio={ratio}
        mode={mode}
        focus={focus}
        className="w-full h-full"
        transition="fade"
      />
    </div>
  );
};

export default TwicImageExample;