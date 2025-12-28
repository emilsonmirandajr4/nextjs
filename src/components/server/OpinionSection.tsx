import Link from "next/link";
import { WordPressPost } from "@/types/wordpress";
import { getPostImage, extractImagePath } from "@/lib/wordpress-utils";
import { getPostUrl } from "@/utils/navigation";
import OptimizedImage from "@/components/OptimizedImage";

interface OpinionSectionProps {
  posts: WordPressPost[];
}

function getImagePath(post: WordPressPost): string {
  return extractImagePath(getPostImage(post));
}

export default function OpinionSection({ posts }: OpinionSectionProps) {
  if (!posts || posts.length === 0) return null;

  const featuredPost = posts[0];

  return (
    <div className="bg-white rounded-[20px] overflow-hidden h-full border border-slate-200 shadow-lg shadow-sky-500/40">
      {/* Modern Header - Sem ícones */}
      <div className="relative border-b border-slate-200">
        <div className="px-5 py-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight uppercase">
            Nossa Opinião
          </h2>
        </div>
        {/* Barra colorida inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-700"></div>
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
              ratio="4/3"
              sizes="(min-width: 1024px) 350px, (min-width: 768px) 300px, 100vw"
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
