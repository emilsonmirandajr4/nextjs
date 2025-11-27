import Link from 'next/link';
import { WordPressPost } from '@/types/wordpress';
import { getPostTitle, getPostImage } from '@/services/wordpress';
import { getPostUrl } from '@/utils/navigation';
import OptimizedImage from '@/components/OptimizedImage';

interface NewsSectionProps {
  posts: WordPressPost[];
  title: string;
  icon: 'clock' | 'scale';
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
  const imageUrl = getPostImage(post);
  return imageUrl.replace(/^https?:\/\/[^/]+/, '') || '/placeholder.jpg';
}

export default function NewsSection({ posts, title, icon, iconColor = 'sky' }: NewsSectionProps) {
  const colors = iconColor === 'red'
    ? {
        gradient: 'from-slate-900 via-slate-800 to-zinc-900',
        gradientBlur: 'from-slate-700 via-slate-800 to-black',
        iconBg: 'from-red-500 via-red-600 to-rose-500',
        iconGlow: 'bg-red-500',
        iconShadow: 'shadow-red-500/60',
        hoverText: 'group-hover:text-red-700',
        shadow: 'shadow-sky-500/40'
      }
    : {
        gradient: 'from-slate-900 via-slate-950 to-black',
        gradientBlur: 'from-slate-800 via-slate-900 to-black',
        iconBg: 'from-sky-400 to-blue-600',
        iconGlow: 'bg-sky-500',
        iconShadow: 'shadow-sky-500/60',
        hoverText: 'group-hover:text-sky-700',
        shadow: 'shadow-sky-500/40'
      };

  return (
    <div className={`bg-white rounded-xl overflow-hidden h-full border border-slate-200 shadow-lg ${colors.shadow}`}>
      <div className={`relative px-4 py-3 border-b border-slate-900 bg-gradient-to-r ${colors.gradient} overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradientBlur} opacity-80 blur-sm`}></div>
        <div className="relative flex items-center gap-3">
          <div className="relative">
            <div className={`absolute inset-0 ${colors.iconGlow} blur-sm opacity-60`}></div>
            <div className={`relative w-8 h-8 bg-gradient-to-br ${colors.iconBg} rounded-lg flex items-center justify-center text-white shadow-lg ${colors.iconShadow}`}>
              {icon === 'clock' ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              )}
            </div>
          </div>
          <h2 className="text-sm font-black text-white tracking-tight flex items-center gap-2 uppercase">
            {title}
          </h2>
        </div>
      </div>
      <div className="p-3 space-y-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={getPostUrl(post)}
            className="group cursor-pointer rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-100 transition-colors duration-200 shadow-sm block"
          >
            <div className="flex gap-3 p-3">
              <div className="flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden">
                <OptimizedImage
                  src={getImagePath(post)}
                  alt={getPostTitle(post)}
                  ratio="none"
                  usePicture={false}
                  priority="normal"
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
