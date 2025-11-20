'use client';

import { WordPressPost } from '../types/wordpress';
import NewsCarousel from './NewsCarousel';
import NewsCard from './NewsCard';
import { useRouter } from 'next/navigation';
import { getPostUrl } from '../utils/navigation';

interface DynamicPostsListProps {
  posts: WordPressPost[];
  title: string;
  perPage?: number;
}

export default function DynamicPostsList({ posts, title, perPage = 50 }: DynamicPostsListProps) {
  const router = useRouter();

  const handlePostClick = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      const url = getPostUrl(post);
      router.push(url);
    }
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhuma notícia encontrada.</p>
      </div>
    );
  }

  return (
    <section className="mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
          <NewsCarousel 
            posts={posts.slice(0, 5)} 
            onPostClick={handlePostClick}
          />
        </div>
        
        <div className="lg:col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(5, perPage).map((post) => (
              <div key={post.id} onClick={() => handlePostClick(post.id)} className="cursor-pointer">
                <NewsCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
