import React from 'react';
import Link from 'next/link';
import OptimizedImage from './OptimizedImage';
import { cn } from '@/lib/utils';
import { decodeHtmlEntities } from '@/services/wordpress';

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

  const decodedExcerpt = decodeHtmlEntities(post.excerpt);

  const CardContent = (
    <div
      className={cn(
        "group relative flex flex-col h-full overflow-hidden rounded-xl bg-zinc-900 transition-all duration-300",
        className,
      )}
      style={{
        boxShadow: `
          rgba(59, 130, 246, 0.65) 0px 7px 13px,
          rgba(59, 130, 246, 0.65) 0px 9px 13px
        `,
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] contrast-120 overflow-hidden w-full">
        <OptimizedImage
          src={post.imageUrl}
          alt={post.title}
          ratio="16/9"
          refit={true}
          usePicture={false}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 space-y-4">
        {/* Title */}
        <h3
          className="font-bold leading-tight text-white group-hover:text-red-500 transition-colors line-clamp-3"
          style={{
            fontSize: '24px',
            marginBottom: '10px',
            marginTop: '20px'
          }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <h3
          className="text-zinc-400 line-clamp-5 flex-grow mb-1"
          style={{
            fontSize: '17px',
            marginBottom: '20px'
          }}
        >
          {decodedExcerpt}
        </h3>
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
