import Link from 'next/link';
import { WordPressPost } from '@/types/wordpress';
import { getPostTitle, getPostImage, extractImagePath } from '@/lib/wordpress-utils';
import { getPostUrl } from '@/utils/navigation';
import OptimizedImage from '@/components/OptimizedImage';

interface NewsSectionProps {
  posts: WordPressPost[];
  title: string;
  iconColor?: 'sky' | 'red';
}

function getExcerptWords(post: WordPressPost, wordCount: number = 24): string {
  if (!post.excerpt?.rendered) return '';
  let text = post.excerpt.rendered
    .replace(/<[^>]+>/g, '')
    .replace(/\n+/g, ' ')
    .replace(/^-\s+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const parts = text.split(' - ');
  if (parts.length >= 2 && parts[0] === parts[1]) {
    text = parts.slice(1).join(' - ');
  }
  const words = text.split(' ');
  if (words.length <= wordCount) return text;
  return words.slice(0, wordCount).join(' ') + '...';
}

function getImagePath(post: WordPressPost): string {
  return extractImagePath(getPostImage(post));
}

export default function NewsSection({ posts, title, iconColor = 'sky' }: NewsSectionProps) {
  const colors = iconColor === 'red'
    ? {
      hoverText: 'group-hover:text-red-700',
      shadow: 'shadow-red-500/20'
    }
    : {
      hoverText: 'group-hover:text-sky-700',
      shadow: 'shadow-sky-500/20'
    };

  return (
    <div className={`bg-white rounded-[20px] overflow-hidden h-full border border-slate-200 shadow-lg ${colors.shadow}`}>
      {/* Modern Header - Sem ícones */}
      <div className="relative border-b border-slate-200">
        <div className="px-5 py-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight uppercase">
            {title}
          </h2>
        </div>
        {/* Barra colorida inferior */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${iconColor === 'red' ? 'from-red-600 via-rose-500 to-red-700' : 'from-sky-500 via-blue-600 to-sky-700'}`}></div>
      </div>

      <div className="px-4 pb-4 pt-2 space-y-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={getPostUrl(post)}
            prefetch={false}
            className="group cursor-pointer rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-100 transition-colors duration-200 shadow-sm block"
          >
            <div className="flex gap-3 p-3">
              <div className="flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden">
                <OptimizedImage
                  src={getImagePath(post)}
                  alt={getPostTitle(post)}
                  ratio="1/1"
                  sizes="112px"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-base font-semibold text-gray-900 ${colors.hoverText} transition-colors line-clamp-2`}>
                  {getPostTitle(post)}
                </h3>
                <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                  {getExcerptWords(post, 24)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
