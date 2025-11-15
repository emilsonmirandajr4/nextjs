import { useEffect, useState } from 'react';
import { TrendingUp, Hash } from 'lucide-react';
import { fetchBrazilTrends } from '../services/twitter';

interface TrendingTopic {
  tag: string;
  tweets: string;
  category?: string;
}

interface TrendingTopicsProps {
  topics?: TrendingTopic[];
}

export default function TrendingTopics({ topics }: TrendingTopicsProps) {
  const [trends, setTrends] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrends() {
      setLoading(true);
      const data = await fetchBrazilTrends();
      setTrends(data);
      setLoading(false);
    }
    loadTrends();
    // Atualiza a cada 5 minutos
    const interval = setInterval(loadTrends, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const displayTopics = topics || trends;

  return (
    <div className="relative rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(30,58,138,0.3)] backdrop-blur-sm">
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); }
        }
        .trending-gradient {
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%);
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }
        .trending-badge {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
        }
        .trending-item:hover .trending-badge {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .trending-item:hover {
          background: rgba(30, 58, 138, 0.08) !important;
        }
      `}</style>
      
      {/* Header com gradiente */}
      <div className="trending-gradient px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <TrendingUp className="w-5 h-5 text-white animate-pulse" />
            <div className="absolute inset-0 bg-white/30 blur-md rounded-full"></div>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Trending no X Brasil</h3>
          <div className="ml-auto flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-white font-medium">Ao vivo</span>
          </div>
        </div>
      </div>
      
      {loading && trends.length === 0 ? (
        <div className="glass-effect text-center py-8 px-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 text-sm mt-2">Carregando trends...</p>
        </div>
      ) : (
      <div className="glass-effect p-3 space-y-1">
        {displayTopics.slice(0, 7).map((topic, index) => (
          <div
            key={index}
            className="trending-item group cursor-pointer hover:bg-blue-50/50 p-2.5 rounded-lg transition-all duration-300 border-b-2 border-gray-300 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              {/* Badge com número */}
              <div className="trending-badge flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">{index + 1}</span>
              </div>
              
              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Hash className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                    {topic.tag}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {topic.category && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                      {topic.category}
                    </span>
                  )}
                  <span className="text-gray-500 font-medium">
                    {topic.tweets} posts
                  </span>
                </div>
              </div>
              
              {/* Ícone de seta */}
              <svg className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      )}
      
      {/* Footer */}
      <div className="trending-gradient px-4 py-2.5">
        <a
          href="https://twitter.com/explore/tabs/trending"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white hover:text-blue-200 flex items-center gap-1.5 justify-center font-medium transition-colors group"
        >
          <span>Ver mais no X</span>
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
