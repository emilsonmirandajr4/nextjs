'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function TestImageClient() {
  const [imageStatus, setImageStatus] = useState<{
    [key: string]: 'loading' | 'success' | 'error';
  }>({});

  const handleImageLoad = (key: string) => {
    setImageStatus((prev) => ({ ...prev, [key]: 'success' }));
    console.log(`✅ Imagem ${key} carregada com sucesso`);
  };

  const handleImageError = (key: string, error: any) => {
    setImageStatus((prev) => ({ ...prev, [key]: 'error' }));
    console.error(`❌ Erro ao carregar imagem ${key}:`, error);
  };

  const testImages = [
    {
      key: 'logo',
      src: 'https://primeiranews.com.br/wp-content/uploads/2024/01/logo-primeira-news.png',
      alt: 'Logo Primeira News',
    },
    {
      key: 'youtube',
      src: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      alt: 'YouTube thumbnail',
    },
  ];

  return (
    <div className="space-y-8">
      {testImages.map((img) => (
        <div key={img.key} className="border p-4 rounded">
          <h3 className="font-semibold mb-2">
            {img.key} - Status: 
            <span className={`ml-2 ${
              imageStatus[img.key] === 'success' ? 'text-green-600' :
              imageStatus[img.key] === 'error' ? 'text-red-600' :
              'text-yellow-600'
            }`}>
              {imageStatus[img.key] || 'loading'}
            </span>
          </h3>
          <div className="relative w-full h-48 bg-gray-100">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-contain"
              onLoad={() => handleImageLoad(img.key)}
              onError={(e) => handleImageError(img.key, e)}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{img.src}</p>
        </div>
      ))}
    </div>
  );
}
