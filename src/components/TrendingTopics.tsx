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
    <div className="relative rounded-2xl overflow-hidden group/trending">
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
      
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 opacity-75 blur-sm animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 via-blue-500 to-purple-500 animate-spin-slow"></div>
      
      {/* Content container */}
      <div className="relative m-[2px] bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 rounded-2xl backdrop-blur-xl border border-white/10">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
        
        {/* Header com gradiente */}
        <div className="relative px-4 py-3 border-b border-blue-500/20 bg-gradient-to-r from-blue-950/50 to-indigo-950/30">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 blur-md opacity-60 animate-pulse"></div>
              <div className="relative w-9 h-9 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover/trending:scale-110 transition-transform duration-300">
                <TrendingUp className="w-5 h-5 text-white animate-pulse" strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-lg font-black text-white tracking-tight bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">Trending no X Brasil</h3>
            <div className="ml-auto flex items-center gap-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-2 py-1 rounded-full border border-green-400/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
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
        {displayTopics.slice(0, 7).map((topic, index) => (
          <div
            key={index}
            className="group/trend relative flex items-center gap-2.5 p-2 rounded-xl cursor-pointer bg-gradient-to-br from-slate-800/40 to-gray-900/40 hover:from-blue-900/30 hover:to-indigo-900/30 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 ease-out shadow-md shadow-indigo-900/30 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Gradient glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-indigo-500/10 to-purple-500/0 opacity-0 group-hover/trend:opacity-100 rounded-xl transition-opacity duration-300"></div>
            
            {/* Badge com número */}
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-slate-800/60 border border-slate-600/50 rounded flex items-center justify-center text-slate-300 text-xs font-semibold group-hover/trend:border-blue-500/70 group-hover/trend:text-blue-400 transition-colors">
                {index + 1}
              </div>
            </div>
            
            {/* Conteúdo */}
            <div className="relative flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span className="text-sm font-bold text-slate-100 group-hover/trend:text-white transition-colors truncate">
                  {topic.tag}
                </span>
              </div>
            </div>
            
            {/* Ícone de seta */}
            <div className="flex-shrink-0 opacity-0 group-hover/trend:opacity-100 transition-opacity duration-300">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      )}
      
        {/* Footer */}
        <div className="relative px-4 py-2.5 border-t border-blue-500/20 bg-gradient-to-r from-indigo-950/50 to-blue-950/30">
          <a
            href="https://twitter.com/explore/tabs/trending"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white hover:text-blue-300 flex items-center gap-1.5 justify-center font-bold transition-colors group"
          >
            <span>Ver mais no X</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
