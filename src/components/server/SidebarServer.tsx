import Link from "next/link";
import { WordPressPost } from "@/types/wordpress";
import { getPostTitle } from "@/services/wordpress";
import { getPostUrl } from "@/utils/navigation";
import { TrendingUp, Flame } from "lucide-react";

interface SidebarServerProps {
  posts: WordPressPost[];
  title: string;
}

export default function SidebarServer({ posts, title }: SidebarServerProps) {
  return (
    <aside>
      <div className="relative rounded-2xl overflow-hidden">
        {/* Content card with backdrop */}
        <div className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 border border-white/10">
          {/* Header */}
          <div className="relative px-5 py-4 border-b border-sky-500/20 bg-gradient-to-r from-sky-950/50 to-blue-950/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="relative w-9 h-9 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-xl flex items-center justify-center">
                  <TrendingUp
                    className="w-5 h-5 text-white"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-black text-white tracking-tight bg-gradient-to-r from-white via-sky-100 to-blue-100 bg-clip-text text-transparent">
                  {title}
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Flame className="w-3 h-3 text-orange-500" />
                  <span className="text-xs text-sky-300 font-medium">
                    Atualizando ao vivo
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Posts list */}
          <div className="relative p-3 space-y-1.5">
            {posts.map((post, index) => (
              <Link
                key={`${post.id}-${index}`}
                href={getPostUrl(post)}
                className="group/item relative flex items-start gap-2.5 p-2.5 rounded-xl bg-gradient-to-br from-slate-800/40 to-gray-900/40 hover:from-sky-900/30 hover:to-blue-900/30 border border-slate-700/50 hover:border-sky-500/50"
              >
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-sky-500/10 to-blue-500/0 opacity-0 group-hover/item:opacity-100 rounded-xl transition-opacity duration-300"></div>

                {/* Number badge */}
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-slate-800/60 border border-slate-600/50 rounded flex items-center justify-center text-slate-300 text-xs font-semibold group-hover/item:border-sky-500/70 group-hover/item:text-sky-400 transition-colors">
                    {index + 1}
                  </div>
                </div>

                {/* Post title */}
                <div className="relative flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-100 group-hover/item:text-white leading-tight line-clamp-2 transition-colors duration-300">
                    {getPostTitle(post)}
                  </h3>
                </div>

                {/* Arrow icon */}
                <div className="flex-shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-4 h-4 text-sky-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
