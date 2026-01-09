import Link from 'next/link';
import { WordPressPost } from '@/types/wordpress';
import { getPostTitle, getPostImage, extractImagePath } from '@/lib/wordpress-utils';
import { getPostUrl } from '@/utils/navigation';
import { Clock } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

interface NewsSectionProps {
  posts: WordPressPost[];
  title: string;
  iconColor?: 'sky' | 'red';
}

function calculateReadingTime(post: WordPressPost): string {
  const content = post.content?.rendered || post.excerpt?.rendered || '';
  const text = content.replace(/<[^>]+>/g, '');
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min`;
}

function getImagePath(post: WordPressPost): string {
  return extractImagePath(getPostImage(post));
}

export default function NewsSection({ posts, title, iconColor = 'sky' }: NewsSectionProps) {
  const colors = iconColor === 'red'
    ? {
      gradient: 'from-red-700 via-rose-800 to-red-600',
      hoverBg: 'hover:bg-red-50',
      hoverText: 'group-hover:text-red-700',
      hoverBorder: 'hover:border-red-300',
      iconColor: 'text-red-600',
      shadow: 'shadow-red-700/40'
    }
    : {
      gradient: 'from-sky-600 via-blue-700 to-sky-800',
      hoverBg: 'hover:bg-sky-50',
      hoverText: 'group-hover:text-sky-700',
      hoverBorder: 'hover:border-sky-400',
      iconColor: 'text-sky-600',
      shadow: 'shadow-sky-600/40'
    };

  return (
    <div className={`bg-white rounded-2xl overflow-hidden h-full border border-slate-200 shadow-[0_8px_px_rgb(0,0,0,0.12)] ${colors.shadow}`}>
      {/* Enhanced Header */}
      <div className="relative border-b-2 border-slate-200 bg-gradient-to-r from-slate-50 to-white">
        <div className="px-5 py-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase text-center bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text">
            {title}
          </h2>
        </div>
        {/* Barra colorida inferior com gradiente */}
        <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${colors.gradient} shadow-lg`}></div>
      </div>

      <div className="px-5 pb-5 pt-4 space-y-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={getPostUrl(post)}
            prefetch={false}
            className={`group cursor-pointer rounded-xl border-2 border-slate-200 bg-white ${colors.hoverBg} ${colors.hoverBorder} transition-all duration-300 shadow-md hover:shadow-xl block`}
          >
            <div className="flex gap-4 p-4 items-center">
              {/* Thumbnail à esquerda */}
              <div className="flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden">
                <OptimizedImage
                  src={getImagePath(post)}
                  alt={getPostTitle(post)}
                  ratio="4/3"
                  sizes="128px"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Conteúdo à direita */}
              <div className="flex-1 flex flex-col justify-center gap-2">
                <h3 className={`text-[17px] font-bold text-gray-900 ${colors.hoverText} transition-colors leading-snug line-clamp-3`}>
                  {getPostTitle(post)}
                </h3>
                
                {/* Tempo de leitura */}
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className={`w-4 h-4 ${colors.iconColor}`} />
                  <span className="text-sm font-medium">{calculateReadingTime(post)} de leitura</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
