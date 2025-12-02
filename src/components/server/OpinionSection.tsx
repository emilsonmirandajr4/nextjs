import Link from "next/link";
import { WordPressPost } from "@/types/wordpress";
import { getPostImage } from "@/services/wordpress";
import { getPostUrl } from "@/utils/navigation";
import OptimizedImage from "@/components/OptimizedImage";

interface OpinionSectionProps {
  posts: WordPressPost[];
}

function getImagePath(post: WordPressPost): string {
  const imageUrl = getPostImage(post);
  return imageUrl.replace(/^https?:\/\/[^/]+/, "") || "/placeholder.jpg";
}

export default function OpinionSection({ posts }: OpinionSectionProps) {
  if (!posts || posts.length === 0) return null;

  const featuredPost = posts[0];

  return (
    <div className="bg-white rounded-[24px] overflow-hidden h-full border border-slate-200 shadow-lg shadow-sky-500/40 relative pt-14">
      {/* Inverted Border Header Tab */}
      <div className="absolute top-0 left-0 z-10">
        <div className="relative px-6 py-3 bg-gradient-to-r from-red-600 via-rose-600 to-red-800 rounded-br-[24px]">
          {/* Inverted Corner Pseudo-element */}
          <div className="absolute bottom-0 -right-[24px] w-[24px] h-[24px] bg-transparent shadow-[-12px_12px_0_0_#fff] rounded-bl-[24px] pointer-events-none"></div>
          
          <div className="relative flex items-center gap-3">
            <div className="relative w-8 h-8 bg-gradient-to-br from-red-300 via-red-500 to-rose-500 rounded-lg flex items-center justify-center text-red-900 shadow-lg shadow-red-500/60">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3 .922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h2 className="text-sm font-black text-white tracking-tight flex items-center gap-2 uppercase pr-2">
              Nossa Opinião
            </h2>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2">
        <Link
          href={getPostUrl(featuredPost)}
          className="group cursor-pointer rounded-xl overflow-hidden border border-slate-200 bg-slate-50/60 hover:bg-slate-100 transition-colors duration-200 shadow-sm block"
        >
          <div className="relative">
            <OptimizedImage
              src={getImagePath(featuredPost)}
              alt={featuredPost.title.rendered.replace(/<[^>]*>/g, "")}
              ratio="none"
              usePicture={false}
              className="w-full h-52 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="px-3 pb-4 pt-3">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-3">
              {featuredPost.title.rendered.replace(/<[^>]*>/g, "")}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
