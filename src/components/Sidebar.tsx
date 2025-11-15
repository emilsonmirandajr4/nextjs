import { WordPressPost } from '../types/wordpress';
import { getPostTitle } from '../services/wordpress';
import { TrendingUp } from 'lucide-react';

interface SidebarProps {
  posts: WordPressPost[];
  title: string;
  onPostClick?: (postId: number) => void;
}

export default function Sidebar({ posts, title, onPostClick }: SidebarProps) {
  return (
    <aside className="h-full">
      <div className="bg-texto-principal rounded-lg shadow-card p-4 h-full border-2 border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-categoria-default" />
          <h2 className="text-xl font-bold text-fundo-card">{title}</h2>
        </div>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <div
              key={post.id}
              onClick={() => onPostClick?.(post.id)}
              className="flex items-start space-x-3 pb-4 mb-4 border-b-2 border-gray-700 last:border-b-0 group cursor-pointer"
            >
              <span className="flex items-center justify-center text-sm font-bold text-white border border-sky-600 rounded-full w-7 h-7 flex-shrink-0">{index + 1}</span>
              <h3 className="text-sm font-semibold text-fundo-card group-hover:text-categoria-default transition-colors line-clamp-3">
                {getPostTitle(post)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
