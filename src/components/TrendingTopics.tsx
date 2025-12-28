"use client";

import { useEffect, useState } from "react";
import { BarChart3, Hash } from "lucide-react";
import { fetchBrazilTrends } from "../services/twitter";

export interface TrendingTopic {
  tag: string;
  tweets: string;
  category?: string;
  url?: string;
}

interface TrendingTopicsProps {
  initialTrends?: TrendingTopic[];
}

export default function TrendingTopics({
  initialTrends = [],
}: TrendingTopicsProps) {
  const [trends, setTrends] = useState<TrendingTopic[]>(initialTrends);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    // Se não temos dados iniciais, carregar imediatamente
    if (initialTrends.length === 0) {
      setLoading(true);
      fetchBrazilTrends().then((data) => {
        if (isMounted) {
          setTrends(data);
          setLoading(false);
        }
      });
    }

    // Atualizar a cada 5 minutos
    const interval = setInterval(
      async () => {
        const data = await fetchBrazilTrends();
        if (isMounted) {
          setTrends(data);
        }
      },
      5 * 60 * 1000,
    );

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [initialTrends.length]);

  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Content container */}
      <div className="relative bg-black border border-white/10">
        {/* Header com gradiente */}
        <div className="relative px-4 py-3 border-b border-blue-500/20 bg-black">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-white/80" strokeWidth={2} />
            <h3 className="text-lg font-black text-white tracking-tight bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Trending no X Brasil
            </h3>
            <div className="ml-auto flex items-center gap-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-2 py-1 rounded-full border border-green-400/30">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-green-300 font-bold">Ao vivo</span>
            </div>
          </div>
        </div>

        {loading && trends.length === 0 ? (
          <div className="relative text-center py-8 px-4 bg-slate-900/40">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-400 border-t-transparent"></div>
            <p className="text-slate-400 text-sm mt-2">Carregando trends...</p>
          </div>
        ) : (
          <div className="relative p-3 space-y-1.5">
            {trends.slice(0, 7).map((topic, index) => (
              <div
                key={index}
                className="group/trend relative flex items-center gap-2.5 p-2 rounded-xl cursor-pointer bg-black hover:from-blue-900/30 hover:to-indigo-900/30 border border-slate-700/50 hover:border-blue-500/50"
              >

                {/* Badge com número */}
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-slate-800/60 border border-slate-600/50 rounded flex items-center justify-center text-slate-300 text-xs font-semibold group-hover/trend:border-blue-500/70 group-hover/trend:text-blue-400">
                    {index + 1}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="relative flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    <span className="text-sm font-bold text-slate-100 group-hover/trend:text-white truncate">
                      {topic.tag}
                    </span>
                  </div>
                </div>

                {/* Ícone de seta */}
                <div className="flex-shrink-0 opacity-0 group-hover/trend:opacity-100">
                  <svg
                    className="w-4 h-4 text-blue-400"
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
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="relative px-4 py-2.5 border-t border-blue-500/20 bg-black">
          <a
            href="https://twitter.com/explore/tabs/trending"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white hover:text-blue-300 flex items-center gap-1.5 justify-center font-bold group"
          >
            <span>Ver mais no X</span>
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
