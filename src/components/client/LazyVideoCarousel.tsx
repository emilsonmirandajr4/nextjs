"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const VideoCarousel = dynamic(() => import("@/components/VideoCarousel"), {
  loading: () => <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />,
});

export type HomeVideo = {
  id: number;
  title?: string;
  videoUrl: string;
};

type EnrichedVideo = HomeVideo & {
  title: string;
  thumbnail: string;
  views: number;
  duration: string;
  channelTitle: string;
};

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);

    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1);
    }

    const vParam = u.searchParams.get("v");
    if (vParam) return vParam;

    if (
      u.hostname.includes("youtube.com") &&
      u.pathname.startsWith("/embed/")
    ) {
      const parts = u.pathname.split("/");
      return parts[2] || null;
    }

    return null;
  } catch {
    return null;
  }
}

interface LazyVideoCarouselProps {
  videos: HomeVideo[];
}

export default function LazyVideoCarousel({ videos }: LazyVideoCarouselProps) {
  const [shouldShow, setShouldShow] = useState(false);
  const [enrichedVideos, setEnrichedVideos] = useState<EnrichedVideo[]>([]);
  const [loadingMeta, setLoadingMeta] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setShouldShow(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldShow || !videos.length) return;

    let cancelled = false;

    async function loadMetadata() {
      try {
        setLoadingMeta(true);

        const res = await fetch("/api/youtube/metadata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ urls: videos.map((v) => v.videoUrl) }),
        });

        if (!res.ok) {
          throw new Error("Falha ao carregar metadados do YouTube");
        }

        const data = await res.json();
        const items: Record<
          string,
          {
            thumbnail: string;
            duration: string;
            views: number;
            title?: string;
            channelTitle?: string;
          }
        > = data.items || {};

        const nextVideos: EnrichedVideo[] = videos.map((video) => {
          const id = extractYouTubeId(video.videoUrl);
          const meta = id ? items[id] : undefined;

          // Usar título do YouTube (original)
          const resolvedTitle = meta?.title || video.title || "";

          return {
            ...video,
            title: resolvedTitle,
            thumbnail:
              meta?.thumbnail ||
              "https://primeiranews.com/thumbvideo.webp",
            duration: meta?.duration || "0:00",
            views: meta?.views ?? 0,
            channelTitle: meta?.channelTitle || "",
          };
        });

        if (!cancelled) {
          setEnrichedVideos(nextVideos);
        }
      } catch {
        if (!cancelled) {
          const fallback: EnrichedVideo[] = videos.map((video) => ({
            ...video,
            title: video.title ?? "",
            thumbnail: "https://primeiranews.com/thumbvideo.webp",
            duration: "0:00",
            views: 0,
            channelTitle: "",
          }));
          setEnrichedVideos(fallback);
        }
      } finally {
        if (!cancelled) {
          setLoadingMeta(false);
        }
      }
    }

    loadMetadata();

    return () => {
      cancelled = true;
    };
  }, [shouldShow, videos]);

  // Skeleton do carousel de vídeos
  const VideoSkeleton = () => (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="relative mb-6">
        <div className="h-24 bg-gray-200 rounded-2xl" />
      </div>
      
      {/* Video cards grid skeleton */}
      <div className="px-2 sm:px-4 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="bg-gray-200 rounded-lg aspect-video" />
              <div className="space-y-2 px-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="mt-8" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          {shouldShow ? (
            loadingMeta ? (
              <VideoSkeleton />
            ) : (
              <VideoCarousel videos={enrichedVideos} />
            )
          ) : (
            <VideoSkeleton />
          )}
        </div>
      </div>
      
      {/* Botão Ver Todos */}
      {!loadingMeta && enrichedVideos.length > 0 && (
        <div className="flex justify-center mt-6">
          <a
            href="/videos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <span>VER TODOS</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      )}
    </section>
  );
}
