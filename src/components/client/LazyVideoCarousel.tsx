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
  const [loadingMeta, setLoadingMeta] = useState(false);
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
          { thumbnail: string; duration: string; views: number; title?: string }
        > = data.items || {};

        const nextVideos: EnrichedVideo[] = videos.map((video) => {
          const id = extractYouTubeId(video.videoUrl);
          const meta = id ? items[id] : undefined;

          const resolvedTitle = meta?.title || video.title || "";

          return {
            ...video,
            title: resolvedTitle,
            thumbnail:
              meta?.thumbnail ||
              "https://img.youtube.com/vi/4VkrctbXrJg/hqdefault.jpg",
            duration: meta?.duration || "0:00",
            views: meta?.views ?? 0,
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
            thumbnail: "https://img.youtube.com/vi/4VkrctbXrJg/hqdefault.jpg",
            duration: "0:00",
            views: 0,
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

  return (
    <section className="mt-8" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          {shouldShow ? (
            loadingMeta ? (
              <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
            ) : (
              <VideoCarousel videos={enrichedVideos} />
            )
          ) : (
            <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
          )}
        </div>
      </div>
    </section>
  );
}
