'use client';

import React from 'react';
import ArticleCard, { ArticlePost } from './ArticleCard';
import { WordPressPost } from '@/types/wordpress';
import { getPostImage, getPostTitle } from '@/services/wordpress';
import { formatDate } from '@/utils/date';
import { getPostUrl } from '@/utils/navigation';
import { Newspaper } from 'lucide-react';

interface ArticlesThreeProps {
  /** Lista de posts do WordPress */
  posts?: WordPressPost[];
  /** Título da seção */
  title?: string;
  /** Quantidade exata de cards a exibir */
  count?: number;
}

export default function ArticlesThree({
  posts = [],
  title = 'Artigos em Destaques',
  count = 3,
}: ArticlesThreeProps) {
  const stripHtml = (html: string | undefined | null): string => {
    if (!html) return '';
    return html
      .replace(/<[^>]+>/g, '')
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const getExcerptSmart = (post: WordPressPost, wordCount: number = 42): string => {
    const excerptText = stripHtml(post.excerpt?.rendered);
    const contentText = stripHtml(post.content?.rendered);

    // Se o excerpt vier muito curto, faz fallback pro início do conteúdo
    const base = excerptText.split(' ').filter(Boolean).length >= 12 ? excerptText : contentText;
    const words = base.split(' ').filter(Boolean);
    if (words.length === 0) return '';

    if (words.length <= wordCount) return base;
    return words.slice(0, wordCount).join(' ') + '...';
  };

  // Transform WordPress posts to ArticlePost format
  const items: ArticlePost[] = React.useMemo(() => {
    const take = posts.slice(0, count);
    const placeholdersNeeded = Math.max(0, count - take.length);

    const transformedPosts: ArticlePost[] = take.map(post => ({
      id: post.id,
      title: getPostTitle(post),
      excerpt: getExcerptSmart(post, 42),
      category: post.categories_names?.[0] || 'Geral',
      date: formatDate(post.date),
      imageUrl: getPostImage(post).replace(/^https?:\/\/[^/]+/, "") || "/placeholder.jpg",
      author: post._embedded?.author?.[0]?.name || 'Equipe',
      readTime: 5, // Estimativa fixa ou calcular baseado no content
      featured: true,
      slug: post.slug,
      url: getPostUrl(post),
    }));

    const placeholders: ArticlePost[] = Array.from({ length: placeholdersNeeded }).map((_, idx) => ({
      id: 1000 + idx,
      title: 'Em breve novos conteúdos',
      excerpt: 'Estamos preparando artigos exclusivos com análises aprofundadas sobre os principais temas do momento.',
      category: 'Novidade',
      date: '—',
      imageUrl: '/placeholder.jpg',
      author: 'Primeira News',
      readTime: 3,
      featured: true,
    }));

    return [...transformedPosts, ...placeholders].slice(0, count);
  }, [posts, count]);

  const lgColsClass = count >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

  return (
    <section className="py-4 w-full">
      {/* Header */}
      <div 
        className="relative bg-black rounded-xl px-4 py-3 border border-white/10 mb-4"
        style={{
          boxShadow: `
            rgba(255, 255, 255, 0.15) 2px 2px,
            rgba(255, 255, 255, 0.1) 4px 4px,
            rgba(255, 255, 255, 0.05) 6px 6px
          `
        }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Newspaper className="w-4 h-4 text-white/80 border border-white/30 rounded p-0.5" strokeWidth={2} />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            {title}
          </h2>
        </div>
        <div className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 ${lgColsClass} gap-6`}>
        {items.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
