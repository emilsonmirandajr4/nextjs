"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getFeaturedVideos, type VideoData } from "@/data/videos";

type EnrichedVideo = VideoData & {
  views: number;
  duration: string;
  channelTitle: string;
  thumbnail: string;
};

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    const vParam = u.searchParams.get("v");
    if (vParam) return vParam;
    if (u.hostname.includes("youtube.com") && u.pathname.startsWith("/embed/")) {
      const parts = u.pathname.split("/");
      return parts[2] || null;
    }
    return null;
  } catch {
    return null;
  }
}

export default function VideosPage() {
  const [videos, setVideos] = useState<EnrichedVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      try {
        // Busca vídeos do arquivo local
        const localVideos = getFeaturedVideos();
        
        if (localVideos.length === 0) {
          setVideos([]);
          setLoading(false);
          return;
        }

        // Busca metadados do YouTube
        const res = await fetch("/api/youtube/metadata", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls: localVideos.map((v) => v.videoUrl) }),
        });

        if (!res.ok) throw new Error("Falha ao carregar metadados");

        const data = await res.json();
        const items: Record<string, {
          thumbnail: string;
          duration: string;
          views: number;
          title?: string;
          channelTitle?: string;
        }> = data.items || {};

        // Enriquece os vídeos com metadados do YouTube
        const enriched: EnrichedVideo[] = localVideos.map((video) => {
          const id = extractYouTubeId(video.videoUrl);
          const meta = id ? items[id] : undefined;

          return {
            ...video,
            title: meta?.title || video.title || "Vídeo sem título",
            thumbnail: meta?.thumbnail || "https://primeiranews.com/thumbvideo.webp",
            views: meta?.views ?? 0,
            duration: meta?.duration || "0:00",
            channelTitle: meta?.channelTitle || "",
          };
        });

        setVideos(enriched);
      } catch (error) {
        console.error("Erro ao carregar vídeos:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <Navigation />
        <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
          <div className="flex items-center justify-between mb-8 border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-red-600 text-4xl">▶</span> 
              <span>Vídeos</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Navigation />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-red-600 text-4xl">▶</span> 
            <span>Vídeos</span>
          </h1>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📺</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum vídeo encontrado</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Adicione vídeos editando o arquivo src/data/videos.ts
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <a 
                key={video.id} 
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.5)] h-full flex flex-col"
              >
                {/* Thumbnail Wrapper */}
                <div className="relative pb-[56.25%]">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Duração */}
                  {video.duration && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  )}
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  {/* Nome do Canal */}
                  {video.channelTitle && (
                    <p className="text-xs text-gray-500 font-medium mb-2 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                      {video.channelTitle}
                    </p>
                  )}
                  
                  {/* Título do vídeo - SEM line-clamp para mostrar título completo */}
                  <h3 className="font-semibold text-gray-800 text-sm mb-3 min-h-[4.5rem] leading-relaxed">
                    {video.title}
                  </h3>
                  
                  {/* Views */}
                  <div className="flex items-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    {video.views.toLocaleString()} visualizações
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
        
        {/* Rodapé da listagem */}
        {videos.length > 0 && (
          <div className="mt-12 flex justify-center items-center gap-2 text-gray-400 text-sm">
            <span>●</span>
            <span>Fim da lista</span>
            <span>●</span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
