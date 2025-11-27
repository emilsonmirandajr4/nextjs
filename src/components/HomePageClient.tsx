"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import OptimizedImage from "@/components/OptimizedImage";
import { WordPressPost } from "@/types/wordpress";
import { getPostImage, getPostTitle } from "@/services/wordpress";
import { getPostUrl } from "@/utils/navigation";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import NewsCarouselEmbla from "@/components/NewsCarouselEmbla";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import CarouselWithPanel from "@/components/CarouselWithPanel";
import TrendingTopics from "@/components/TrendingTopics";
import {
  SidebarSkeleton,
  CarouselSkeleton,
  PostsListSkeleton,
  NewsSectionSkeleton,
  VideoCarouselSkeleton,
} from "@/components/Skeletons";

const VideoCarousel = dynamic(() => import("@/components/VideoCarousel"), {
  loading: () => <VideoCarouselSkeleton />,
});

type HomeVideo = {
  id: number;
  // Título opcional definido manualmente. Se não for informado,
  // o título do próprio vídeo do YouTube será usado.
  title?: string;
  videoUrl: string;
};

type EnrichedVideo = HomeVideo & {
  title: string;
  thumbnail: string;
  views: number;
  duration: string;
};

export type HomePageClientProps = {
  posts: WordPressPost[];
  newsPosts: WordPressPost[];
  enganadoresPosts: WordPressPost[];
  opinionPosts: WordPressPost[];
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

function HomeSkeleton() {
  const sidebarCard = (
    <div className="bg-white rounded-xl overflow-hidden h-full border border-slate-200 shadow-lg">
      <div className="h-12 bg-slate-200" />
      <div className="p-4">
        <SidebarSkeleton />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="animated-bg absolute inset-0 -z-10"></div>
      <Header />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-4 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-3">{sidebarCard}</div>
          <div className="lg:col-span-6">
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-lg p-4">
              <CarouselSkeleton />
            </div>
          </div>
          <div className="lg:col-span-3">{sidebarCard}</div>
        </div>

        <section className="mt-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-4">
            <div className="h-8 w-1/3 bg-slate-200 rounded animate-pulse" />
            <div className="mt-6">
              <NewsSectionSkeleton />
            </div>
          </div>
        </section>

        <section className="mt-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-4">
            <div className="h-8 w-1/4 bg-slate-200 rounded animate-pulse mb-4" />
            <PostsListSkeleton />
          </div>
        </section>

        <section className="mt-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-4">
            <VideoCarouselSkeleton />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function LazyVideoCarousel({ videos }: { videos: HomeVideo[] }) {
  const [shouldShow, setShouldShow] = useState(false);
  const [enrichedVideos, setEnrichedVideos] = useState<EnrichedVideo[]>([]);
  const [loadingMeta, setLoadingMeta] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window === "undefined" ||
      !(window as any).IntersectionObserver
    ) {
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
      } catch (error) {
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

export default function HomePageClient({
  posts,
  newsPosts,
  enganadoresPosts,
  opinionPosts,
}: HomePageClientProps) {
  const router = useRouter();

  // React Query - busca dados com cache automático
  const loading =
    !posts.length &&
    !newsPosts.length &&
    !enganadoresPosts.length &&
    !opinionPosts.length;

  // Memoiza callback de clique para evitar re-renders desnecessários
  const handlePostClick = useCallback(
    (postId: number) => {
      // Busca o post pelo ID para pegar o slug
      const post =
        posts.find((p) => p.id === postId) ||
        newsPosts.find((p) => p.id === postId);
      if (post) {
        router.push(getPostUrl(post));
      } else {
        // Fallback para ID se post não existir no estado
        router.push(`/post/${postId}`);
      }
    },
    [posts, newsPosts, router],
  );

  // Memoiza todas as computações de posts para evitar recálculos
  const postsData = useMemo(() => {
    const sidebarLeftPosts = posts.slice(0, 6);
    const sidebarRightPosts = posts.slice(6, 12);
    const personagensPosts = posts.slice(12, 22);
    const centerPosts = posts.slice(22, 28);
    const highlightPosts =
      opinionPosts.length > 0 ? opinionPosts : posts.slice(28, 33);
    const bottomPosts = posts.slice(33, 37);

    const judiciaryPosts = posts
      .filter((post) =>
        post.categories_names?.some((name) => {
          const normalized = name.toLowerCase();
          return (
            normalized.includes("judiciário") ||
            normalized.includes("judiciario")
          );
        }),
      )
      .slice(0, 5);

    return {
      sidebarLeftPosts,
      sidebarRightPosts,
      personagensPosts,
      centerPosts,
      highlightPosts,
      bottomPosts,
      judiciaryPosts,
    };
  }, [posts, opinionPosts]);

  // Memoiza preparação de dados do Carousel3D
  const carouselData = useMemo(() => {
    const items = enganadoresPosts.map((post) => {
      const tags =
        post._embedded?.["wp:term"]?.[1]?.map((tag) => tag.name) || [];
      return {
        id: post.id,
        image: getPostImage(post),
        title: getPostTitle(post),
        description:
          (post.excerpt?.rendered?.replace(/<[^>]+>/g, "").substring(0, 100) ||
            "") + "...",
        category: post.categories_names?.[0] || "Enganadores",
        tags: tags,
      };
    });

    const summaries = enganadoresPosts.map(
      (post) =>
        post.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() ||
        getPostTitle(post),
    );

    return { items, summaries };
  }, [enganadoresPosts]);

  if (loading) {
    return <HomeSkeleton />;
  }

  const featuredVideos: HomeVideo[] = [
    {
      id: 1,
      title: "Vídeo 1",
      videoUrl: "https://www.youtube.com/watch?v=8_GdJxWDFfg",
    },
    {
      id: 2,
      title: "Vídeo 2",
      videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    },
    {
      id: 3,
      title: "Vídeo 3",
      videoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    },
    {
      id: 4,
      title: "Vídeo 4",
      videoUrl: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
    },
    {
      id: 5,
      title: "Vídeo 5",
      videoUrl: "https://www.youtube.com/watch?v=L_jWHffIx5E",
    },
    {
      id: 6,
      title: "Vídeo 6",
      videoUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
    },
    {
      id: 7,
      title: "Vídeo 7",
      videoUrl: "https://www.youtube.com/watch?v=y6120QOlsfU",
    },
    {
      id: 8,
      title: "Vídeo 8",
      videoUrl: "https://www.youtube.com/watch?v=RgKAFK5djSk",
    },
    {
      id: 9,
      title: "Vídeo 9",
      videoUrl: "https://www.youtube.com/watch?v=YQHsXMglC9A",
    },
    {
      id: 10,
      title: "Vídeo 10",
      videoUrl: "https://www.youtube.com/watch?v=60ItHLz5WEA",
    },
  ];

  const getImagePath = (post: WordPressPost): string => {
    const imageUrl = getPostImage(post);
    return imageUrl.replace(/^https?:\/\/[^/]+/, "") || "/placeholder.jpg";
  };

  const getExcerptWords = (post: WordPressPost, wordCount: number = 30) => {
    if (!post.excerpt?.rendered) return "";
    let text = post.excerpt.rendered
      .replace(/<[^>]+>/g, "")
      .replace(/\n+/g, " ")
      .replace(/^-\s+/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const parts = text.split(" - ");
    if (parts.length >= 2 && parts[0] === parts[1]) {
      text = parts.slice(1).join(" - ");
    }
    const words = text.split(" ");
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(" ") + "...";
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="animated-bg absolute inset-0 -z-10"></div>
      <Header />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <Sidebar
              posts={postsData.sidebarLeftPosts}
              title="Mais Lidas"
              onPostClick={handlePostClick}
            />
          </div>

          <div className="lg:col-span-6">
            <div className="relative mb-3">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 opacity-10 blur-xl"></div>
              <div className="relative p-[2px] rounded-xl animated-border shadow-2xl">
                <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-sky-500 blur-sm opacity-50"></div>
                      <div className="relative w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-xl font-black text-white tracking-tight">
                      Principais Notícias
                    </h2>
                  </div>
                  <div className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>
                </div>
              </div>
            </div>
            <NewsCarouselEmbla
              posts={(newsPosts.length > 0 ? newsPosts : posts).slice(0, 8)}
              onPostClick={handlePostClick}
            />
          </div>

          <div className="lg:col-span-3">
            <Sidebar
              posts={postsData.sidebarRightPosts}
              title="Assuntos em Alta"
              onPostClick={handlePostClick}
            />
          </div>
        </div>

        {/* Carousel 3D com Painel e Trending Topics */}
        <section className="mt-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9">
              <CarouselWithPanel
                items={carouselData.items}
                summaries={carouselData.summaries}
                onItemClick={handlePostClick}
              />
            </div>
            <div className="lg:col-span-3">
              <TrendingTopics />
            </div>
          </div>
        </section>

        {/* Seções de Notícias */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Container para Últimas Notícias e Judiciário */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coluna 1 - Últimas Notícias */}
            <div>
              <div className="bg-white rounded-xl overflow-hidden h-full border border-slate-200 shadow-lg shadow-sky-500/40">
                <div className="relative px-4 py-3 border-b border-slate-900 bg-gradient-to-r from-slate-900 via-slate-950 to-black overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-900 to-black opacity-80 blur-sm"></div>
                  <div className="relative flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-sky-500 blur-sm opacity-60"></div>
                      <div className="relative w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-sky-500/60">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-sm font-black text-white tracking-tight flex items-center gap-2 uppercase">
                      Últimas Notícias
                    </h2>
                  </div>
                </div>
                <div className="p-3 space-y-3">
                  {posts.slice(0, 5).map((post) => (
                    <div
                      key={post.id}
                      onClick={() => handlePostClick(post.id)}
                      className="group cursor-pointer rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-100 transition-colors duration-200 shadow-sm"
                    >
                      <div className="flex gap-3 p-3">
                        <div className="flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden">
                          <OptimizedImage
                            src={getImagePath(post)}
                            alt={getPostTitle(post)}
                            ratio="none"
                            usePicture={false}
                            priority="normal"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-gray-900 group-hover:text-sky-700 transition-colors line-clamp-2">
                            {getPostTitle(post)}
                          </h3>
                          <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                            {getExcerptWords(post, 24)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Coluna 2 - Judiciário */}
            <div>
              <div className="bg-white rounded-xl overflow-hidden h-full border border-slate-200 shadow-lg shadow-sky-500/40">
                <div className="relative px-4 py-3 border-b border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-zinc-900 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-800 to-black opacity-70 blur-sm"></div>
                  <div className="relative flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500 blur-sm opacity-70"></div>
                      <div className="relative w-8 h-8 bg-gradient-to-br from-red-500 via-red-600 to-rose-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-red-500/60">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                          />
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-sm font-black text-white tracking-tight flex items-center gap-2 uppercase">
                      Judiciário
                    </h2>
                  </div>
                </div>
                <div className="p-3 space-y-3">
                  {postsData.judiciaryPosts.map((post: WordPressPost) => (
                    <div
                      key={post.id}
                      onClick={() => handlePostClick(post.id)}
                      className="group cursor-pointer rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-100 transition-colors duration-200 shadow-sm"
                    >
                      <div className="flex gap-3 p-3">
                        <div className="flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden">
                          <OptimizedImage
                            src={getImagePath(post)}
                            alt={getPostTitle(post)}
                            ratio="none"
                            usePicture={false}
                            priority="normal"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2">
                            {getPostTitle(post)}
                          </h3>
                          <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                            {getExcerptWords(post, 24)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 3 - Nossa Opinião */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl overflow-hidden h-full border border-slate-200 shadow-lg shadow-sky-500/40">
              <div className="relative px-4 py-3 border-b border-red-800 bg-gradient-to-r from-red-600 via-rose-600 to-red-800 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-rose-500 to-red-700 opacity-70 blur-sm"></div>
                <div className="relative flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-300 blur-sm opacity-80"></div>
                    <div className="relative w-8 h-8 bg-gradient-to-br from-red-300 via-red-500 to-rose-500 rounded-lg flex items-center justify-center text-red-900 shadow-lg shadow-red-500/60">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3 .922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-sm font-black text-white tracking-tight flex items-center gap-2 uppercase">
                    Nossa Opinião
                  </h2>
                </div>
              </div>
              <div className="p-4">
                {postsData.highlightPosts[0] && (
                  <div
                    onClick={() =>
                      handlePostClick(postsData.highlightPosts[0].id)
                    }
                    className="group cursor-pointer rounded-xl overflow-hidden border border-slate-200 bg-slate-50/60 hover:bg-slate-100 transition-colors duration-200 shadow-sm"
                  >
                    <div className="relative">
                      <OptimizedImage
                        src={getImagePath(postsData.highlightPosts[0])}
                        alt={postsData.highlightPosts[0].title.rendered.replace(
                          /<[^>]*>/g,
                          "",
                        )}
                        ratio="none"
                        usePicture={false}
                        className="w-full h-52 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="px-3 pb-4 pt-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-3">
                        {postsData.highlightPosts[0].title.rendered.replace(
                          /<[^>]*>/g,
                          "",
                        )}
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Vídeos em Destaque */}
        <LazyVideoCarousel videos={featuredVideos} />
      </main>

      <Footer />
    </div>
  );
}
