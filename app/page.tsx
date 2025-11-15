'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import OptimizedImage from '../src/components/OptimizedImage';
import { WordPressPost } from '../src/types/wordpress';
import { getPostImage, getPostTitle } from '../src/services/wordpress';
import { usePosts, usePostsByCategory } from '../src/hooks/usePosts';
import { getPostUrl } from '../src/utils/navigation';
import Header from '../src/components/Header';
import Navigation from '../src/components/Navigation';
import NewsCarousel from '../src/components/NewsCarousel';
import NewsCard from '../src/components/NewsCard';
import Sidebar from '../src/components/Sidebar';
import Footer from '../src/components/Footer';
import Carousel3DWithPanel from '../src/components/Carousel3DWithPanel';
import TrendingTopics from '../src/components/TrendingTopics';

const VideoCarousel = dynamic(() => import('../src/components/VideoCarousel'), {
  ssr: false,
});

type HomeVideo = {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
  views: number;
  duration: string;
};

function LazyVideoCarousel({ videos }: { videos: HomeVideo[] }) {
  const [shouldShow, setShouldShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === 'undefined' || !(window as any).IntersectionObserver) {
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
      { rootMargin: '200px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="mt-12" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">
          {shouldShow ? (
            <VideoCarousel videos={videos} />
          ) : (
            <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
          )}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const router = useRouter();
  
  // React Query - busca dados com cache automático
  const { data: posts = [], isLoading: loadingPosts, isSuccess: successPosts } = usePosts(50);
  const { data: newsPosts = [], isLoading: loadingNews, isSuccess: successNews } = usePostsByCategory('noticias', 50);
  const { data: enganadoresPosts = [], isLoading: loadingEnganadores } = usePostsByCategory('enganadores', 3);
  
  const loading = loadingPosts || loadingNews || loadingEnganadores;
  
  // Feedback de sucesso (só na primeira vez)
  useEffect(() => {
    if (successPosts && successNews && !loading) {
      const totalPosts = newsPosts.length + posts.length;
      if (totalPosts > 0) {
        toast.success(`${totalPosts} notícias carregadas!`, { duration: 2000 });
      }
    }
  }, [successPosts, successNews, loading, newsPosts.length, posts.length]);

  const handlePostClick = (postId: number) => {
    // Busca o post pelo ID para pegar o slug
    const post = posts.find(p => p.id === postId) || newsPosts.find(p => p.id === postId);
    if (post) {
      router.push(getPostUrl(post));
    } else {
      // Fallback para ID se post não existir no estado
      router.push(`/post/${postId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
          <p className="mt-4 text-gray-900">Carregando notícias...</p>
        </div>
      </div>
    );
  }

  const sidebarPosts = posts.slice(0, 5);
  const carouselPosts = posts.slice(0, 5);
  const leftSidebarPosts = sidebarPosts;
  const rightSidebarPosts = sidebarPosts;
  const personagensPosts = posts.slice(5, 15);
  const centerPosts = posts.slice(15, 21);
  const highlightPosts = posts.slice(21, 26);
  const bottomPosts = posts.slice(26, 30);

  // Preparar dados para o Carousel3DWithPanel
  const carouselItems = enganadoresPosts.map((post, index) => {
    const tags = post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [];
    return {
      id: post.id,
      image: getPostImage(post),
      title: getPostTitle(post),
      description: post.excerpt?.rendered?.replace(/<[^>]+>/g, '').substring(0, 100) + '...' || '',
      category: post.categories_names?.[0] || 'Enganadores',
      tags: tags
    };
  });

  const carouselSummaries = enganadoresPosts.map(post => 
    post.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || getPostTitle(post)
  );

  const featuredVideos = [
    {
      id: 1,
      title: "Últimas notícias sobre política nacional",
      thumbnail: "/assets/videos/video-1.png",
      videoUrl: "#video1",
      views: 12500,
      duration: "5:23"
    },
    {
      id: 2,
      title: "Entrevista exclusiva com especialista em economia",
      thumbnail: "/assets/videos/video-2.png",
      videoUrl: "#video2",
      views: 8900,
      duration: "7:45"
    },
    {
      id: 3,
      title: "Cobertura completa do evento esportivo",
      thumbnail: "/assets/videos/video-3.png",
      videoUrl: "#video3",
      views: 15600,
      duration: "4:12"
    },
    {
      id: 4,
      title: "Análise do mercado internacional",
      thumbnail: "/assets/videos/video-4.png",
      videoUrl: "#video4",
      views: 7200,
      duration: "6:30"
    },
    {
      id: 5,
      title: "Reportagem especial sobre meio ambiente",
      thumbnail: "/assets/videos/video-5.png",
      videoUrl: "#video5",
      views: 9800,
      duration: "8:15"
    },
    {
      id: 6,
      title: "Novidades tecnológicas da semana",
      thumbnail: "/assets/videos/video-6.png",
      videoUrl: "#video6",
      views: 11200,
      duration: "3:47"
    },
    {
      id: 7,
      title: "Cultura e entretenimento em destaque",
      thumbnail: "/assets/videos/video-7.png",
      videoUrl: "#video7",
      views: 8300,
      duration: "5:55"
    },
    {
      id: 8,
      title: "Saúde e bem-estar: dicas importantes",
      thumbnail: "/assets/videos/video-8.png",
      videoUrl: "#video8",
      views: 14500,
      duration: "4:40"
    },
    {
      id: 9,
      title: "Educação: tendências e inovações",
      thumbnail: "/assets/videos/video-9.png",
      videoUrl: "#video9",
      views: 6700,
      duration: "7:20"
    },
    {
      id: 10,
      title: "Turismo: destinos imperdíveis",
      thumbnail: "/assets/videos/video-10.png",
      videoUrl: "#video10",
      views: 12300,
      duration: "6:05"
    }
  ];

  const getImagePath = (post: WordPressPost): string => {
    const imageUrl = getPostImage(post);
    return imageUrl.replace(/^https?:\/\/[^\/]+/, '') || '/placeholder.jpg';
  };

  const getExcerptWords = (post: WordPressPost, wordCount: number = 30) => {
    if (!post.excerpt?.rendered) return '';
    let text = post.excerpt.rendered
      .replace(/<[^>]+>/g, '')
      .replace(/\n+/g, ' ')
      .replace(/^-\s+/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    const parts = text.split(' - ');
    if (parts.length >= 2 && parts[0] === parts[1]) {
      text = parts.slice(1).join(' - ');
    }
    const words = text.split(' ');
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(' ') + '...';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="animated-bg absolute inset-0 -z-10"></div>
      <Header />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-3">
            <Sidebar posts={leftSidebarPosts} title="Mais Lidas" onPostClick={handlePostClick} />
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
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
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
            <NewsCarousel posts={(newsPosts.length > 0 ? newsPosts : posts).slice(0, 8)} onPostClick={handlePostClick} />
          </div>

          <div className="lg:col-span-3">
            <Sidebar posts={rightSidebarPosts} title="Assuntos em Alta" onPostClick={handlePostClick} />
          </div>
        </div>

        {/* Carousel 3D + Sidebar */}
        <section className="mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9">
              <div className="relative mb-2">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 opacity-10 blur-xl"></div>
                <div className="relative p-[2px] rounded-xl animated-border shadow-2xl">
                  <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-sky-500 blur-sm opacity-50"></div>
                        <div className="relative w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3l14 9-14 9V3z" />
                          </svg>
                        </div>
                      </div>
                      <h2 className="text-xl font-black text-white tracking-tight">
                        Notícias em Destaque
                      </h2>
                    </div>
                    <div className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>
                  </div>
                </div>
              </div>
              <Carousel3DWithPanel items={carouselItems} summaries={carouselSummaries} onItemClick={handlePostClick} />
            </div>
            <div className="lg:col-span-3">
              <TrendingTopics />
            </div>
          </div>
        </section>

        <section className="mt-16 relative bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6">
            {/* Coluna 1 - Últimas Notícias */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl overflow-hidden h-full border border-slate-200 shadow-sm">
                <div className="bg-blue-600 px-4 py-3 border-b border-blue-700">
                <h2 className="text-xs font-semibold tracking-wide text-white flex items-center gap-2 uppercase">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Últimas Notícias
                </h2>
                </div>
                <div>
                  {posts.slice(0, 5).map((post, index) => (
                    <div
                      key={post.id}
                      onClick={() => handlePostClick(post.id)}
                      className="flex items-center gap-4 p-3 hover:bg-slate-50 transition-colors duration-200 cursor-pointer group border-b border-slate-200 last:border-b-0"
                    >
                      <div className="flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden">
                        <OptimizedImage
                          src={getImagePath(post)}
                          alt={getPostTitle(post)}
                          ratio="4/3"
                          className="group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex items-center">
                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                          {getPostTitle(post)}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Coluna 2 - Judiciário */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-xl overflow-hidden h-full border border-slate-200 shadow-sm">
                <div className="bg-slate-900 px-4 py-3 border-b border-slate-700">
                <h2 className="text-xs font-semibold tracking-wide text-white flex items-center gap-2 uppercase">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  Judiciário
                </h2>
                </div>
                <div>
                  {posts.slice(10, 15).map((post, index) => (
                    <div
                      key={post.id}
                      onClick={() => handlePostClick(post.id)}
                      className="flex items-center gap-4 p-3 hover:bg-slate-50 transition-colors duration-200 cursor-pointer group border-b border-slate-200 last:border-b-0"
                    >
                      <div className="flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden">
                        <OptimizedImage
                          src={getImagePath(post)}
                          alt={getPostTitle(post)}
                          ratio="4/3"
                          className="group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex items-center">
                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 leading-snug">
                          {getPostTitle(post)}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Coluna 3 - Nossa Opinião */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl overflow-hidden h-full border border-slate-200 shadow-sm">
                <div className="bg-red-600 px-4 py-3 border-b border-red-800">
                <h2 className="text-xs font-semibold tracking-wide text-white flex items-center gap-2 uppercase">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Nossa Opinião
                </h2>
                </div>
                <div className="p-4">
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-700 mb-3">
                    Opinião da Redação
                  </span>
                  {highlightPosts.map((post, index) => (
                    <div
                      key={post.id}
                      onClick={() => handlePostClick(post.id)}
                      className="flex items-start gap-3 py-3 px-2 hover:bg-slate-50 transition-colors duration-200 cursor-pointer group border-b border-slate-200 last:border-b-0 rounded-lg"
                    >
                      <span className="flex items-center justify-center text-lg font-bold text-red-600 border-2 border-red-400 rounded-full w-8 h-8 flex-shrink-0">
                        {index + 1}
                      </span>
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-3">
                        {post.title.rendered.replace(/<[^>]*>/g, '')}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Vídeos em Destaque */}
        <LazyVideoCarousel videos={featuredVideos} />

      </main>

      <Footer />
    </div>
  );
}
