import Link from "next/link";
import { WordPressPost } from "@/types/wordpress";
import { getPostTitle } from "@/lib/wordpress-utils";
import { getPostUrl } from "@/utils/navigation";
import { BarChart3 } from "lucide-react";

interface SidebarServerProps {
  posts: WordPressPost[];
  title: string;
}

export default function SidebarServer({ posts, title }: SidebarServerProps) {
  return (
    <aside>
      <div
        className="relative bg-black border border-white/10 rounded-2xl overflow-hidden"
        style={{
          boxShadow: `
            rgba(0, 0, 0, 1) 3px 3px,
            rgba(0, 0, 0, 1) 6px 6px,
            rgba(0, 0, 0, 1) 9px 9px
          `
        }}
      >
        {/* Header */}
        <div className="relative px-5 py-4 border-b bg-black rounded-t-2xl" style={{ borderColor: '#2f5ac5' }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <BarChart3 className="w-4 h-4 text-white/80 border border-white/30 rounded p-0.5" strokeWidth={2} />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">
              {title}
            </h2>
          </div>
        </div>

        {/* Posts list */}
        <div className="relative p-3 space-y-1.5">
          {posts.map((post, index) => (
            <Link
              key={`${post.id}-${index}`}
              href={getPostUrl(post)}
              prefetch={false}
              className="group/item relative flex items-start gap-2.5 p-2.5 rounded-xl bg-black hover:from-sky-900/30 hover:to-blue-900/30 border border-slate-700/50 hover:border-sky-500/50"
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
    </aside>
  );
}
