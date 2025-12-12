import React from 'react';
import Link from 'next/link';
import OptimizedImage from './OptimizedImage';
import { cn } from '@/lib/utils';

export interface ArticlePost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  author?: string;
  readTime?: number;
  featured?: boolean;
  slug?: string;
  /** URL já montada no formato /ano/mes/categoria/slug */
  url?: string;
}

interface ArticleCardProps {
  post: ArticlePost;
  className?: string;
}

export default function ArticleCard({ post, className }: ArticleCardProps) {
  const isPlaceholder = post.id >= 1000; // Convention from ArticlesThree
  
  // Decodificar HTML entities no excerpt
  const decodeHtmlEntities = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };
  
  const decodedExcerpt = typeof window !== 'undefined' ? decodeHtmlEntities(post.excerpt) : post.excerpt;
  
  const CardContent = (
    <div
      className={cn(
        "group relative flex flex-col h-full overflow-hidden rounded-xl bg-zinc-900 transition-all duration-300",
        className,
      )}
      style={{
        boxShadow: `
          rgba(59, 130, 246, 0.65) 0px 6px 14px,
          rgba(59, 130, 246, 0.55) 0px 12px 14px
        `,
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden w-full">
        <OptimizedImage
          src={post.imageUrl}
          alt={post.title}
          ratio="16/9"
          className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 space-y-4">
        {/* Title */}
        <h3
          className="font-bold leading-tight text-white group-hover:text-red-500 transition-colors line-clamp-3"
          style={{ fontSize: '24px' }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[1.05rem] text-zinc-400 line-clamp-5 flex-grow mb-1">
          {decodedExcerpt}
        </p>
      </div>
    </div>
  );

  if (isPlaceholder || !post.slug) {
    return CardContent;
  }

  return (
    <Link href={post.url || `/post/${post.slug}`} className="block h-full">
      {CardContent}
    </Link>
  );
}
