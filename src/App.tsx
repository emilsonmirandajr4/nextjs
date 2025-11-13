import { useEffect, useState } from 'react';
import OptimizedImage from './components/OptimizedImage';
import { WordPressPost } from './types/wordpress';
import { fetchPosts, getPostImage, getPostTitle } from './services/wordpress';
import Header from './components/Header';
import Navigation from './components/Navigation';
import NewsCarousel from './components/NewsCarousel';
import NewsCard from './components/NewsCard';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import VideoCarousel from './components/VideoCarousel';

function App() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      const data = await fetchPosts(30);
      setPosts(data);
      setLoading(false);
    }
    loadPosts();
  }, []);

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
  const centerPosts = posts.slice(15, 21);
  const highlightPosts = posts.slice(21, 26);
  const bottomPosts = posts.slice(26, 30);

  // Extrai path da imagem para TwicPics
  const getImagePath = (post: WordPressPost): string => {
    const imageUrl = getPostImage(post);
    // Remove o domínio base se existir, TwicPics precisa do path
    return imageUrl.replace(/^https?:\/\/[^\/]+/, '') || '/placeholder.jpg';
  };

  // Helper to get first N words from excerpt
  const getExcerptWords = (post: WordPressPost, wordCount: number = 30) => {
    if (!post.excerpt?.rendered) return '';
    let text = post.excerpt.rendered
      .replace(/<[^>]+>/g, '')
      .replace(/\n+/g, ' ')
      .replace(/^-\s+/g, '') // remove leading dashes
      .replace(/\s+/g, ' ') // collapse spaces
      .trim();
    // Remove duplicated segments separated by ' - ' if they repeat
    const parts = text.split(' - ');
    if (parts.length >= 2 && parts[0] === parts[1]) {
      text = parts.slice(1).join(' - ');
    }
    const words = text.split(' ');
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(' ') + '...';
  };

  // Dados de exemplo para os vídeos em destaque
  const featuredVideos = [
    {
      id: 1,
      title: "Últimas notícias sobre política nacional",
      thumbnail: "https://images.unsplash.com/photo-1572947650440-e8a97ef053b0?w=300&h=200&fit=crop",
      videoUrl: "#video1",
      views: 12500,
      duration: "5:23"
    },
    {
      id: 2,
      title: "Entrevista exclusiva com especialista em economia",
      thumbnail: "https://images.unsplash.com/photo-1552581234-26160f608093?w=300&h=200&fit=crop",
      videoUrl: "#video2",
      views: 8900,
      duration: "7:45"
    },
    {
      id: 3,
      title: "Cobertura completa do evento esportivo",
      thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=200&fit=crop",
      videoUrl: "#video3",
      views: 15600,
      duration: "4:12"
    },
    {
      id: 4,
      title: "Análise do mercado internacional",
      thumbnail: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=300&h=200&fit=crop",
      videoUrl: "#video4",
      views: 7200,
      duration: "6:30"
    },
    {
      id: 5,
      title: "Reportagem especial sobre meio ambiente",
      thumbnail: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=300&h=200&fit=crop",
      videoUrl: "#video5",
      views: 9800,
      duration: "8:15"
    },
    {
      id: 6,
      title: "Novidades tecnológicas da semana",
      thumbnail: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=300&h=200&fit=crop",
      videoUrl: "#video6",
      views: 11200,
      duration: "3:47"
    },
    {
      id: 7,
      title: "Cultura e entretenimento em destaque",
      thumbnail: "https://images.unsplash.com/photo-1478720568477-b9b34dbbf2e9?w=300&h=200&fit=crop",
      videoUrl: "#video7",
      views: 8300,
      duration: "5:55"
    },
    {
      id: 8,
      title: "Saúde e bem-estar: dicas importantes",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      videoUrl: "#video8",
      views: 14500,
      duration: "4:40"
    },
    {
      id: 9,
      title: "Educação: tendências e inovações",
      thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop",
      videoUrl: "#video9",
      views: 6700,
      duration: "7:20"
    },
    {
      id: 10,
      title: "Turismo: destinos imperdíveis",
      thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop",
      videoUrl: "#video10",
      views: 12300,
      duration: "6:05"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-3">
            <Sidebar posts={leftSidebarPosts} title="Mais Lidas" />
          </div>

          <div className="lg:col-span-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-black flex items-center gap-3">
              <span className="border-l-4 border-sky-600 h-8"></span>
              Principais Notícias
            </h2>
            <NewsCarousel posts={carouselPosts} />
          </div>

          <div className="lg:col-span-3">
            <Sidebar posts={rightSidebarPosts} title="Em Alta" />
          </div>
        </div>

        <section className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-black flex items-center gap-3">
                <span className="border-l-4 border-sky-600 h-8"></span>
                Últimas Notícias
              </h2>
              <div className="space-y-6">
                {carouselPosts.slice(0, 5).map((post) => (
                  <div
                    key={post.id}
                    className="flex flex-col md:flex-row gap-4 bg-white rounded-lg shadow-[0_2px_8px_rgba(14,165,233,0.3)] hover:shadow-[0_4px_16px_rgba(14,165,233,0.5)] transition-all p-4 border border-gray-200"
                  >
                    <a
                      href={post.link}
                      className="flex-shrink-0 w-full md:w-40 h-32 rounded-lg overflow-hidden block group"
                    >
                      <OptimizedImage
                        src={getImagePath(post)}
                        alt={getPostTitle(post)}
                        ratio="16/9"
                        transitionDuration="300ms"
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                    </a>
                    <div className="flex-1">
                      <a
                        href={post.link}
                        className="block"
                      >
                        <h3 className="text-lg font-bold text-gray-900 hover:text-sky-700 transition-colors mb-2">
                          {getPostTitle(post)}
                        </h3>
                      </a>
                      <p className="text-sm text-gray-600">
                        {getExcerptWords(post, 30)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(14,165,233,0.3)] p-4 sticky top-20 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-sky-400 pb-2">
                  Destaques
                </h3>
                <div className="space-y-4">
                  {highlightPosts.map((post, index) => (
                    <a 
                      key={post.id} 
                      href={post.link}
                      className="flex items-start space-x-3 pb-3 border-b border-gray-200 last:border-b-0"
                    >
                      <span className="text-2xl font-bold text-sky-500 flex-shrink-0">{index + 1}</span>
                      <h4 className="text-sm font-semibold text-gray-900 hover:text-sky-700 cursor-pointer line-clamp-3">
                        {post.title.rendered.replace(/<[^>]*>/g, '')}
                      </h4>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="border-l-4 border-sky-600 h-8"></span>
            Mais Notícias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bottomPosts.map((post) => (
              <NewsCard key={post.id} post={post} variant="small" />
            ))}
          </div>
        </section>

        {/* Seção de Vídeos em Destaque */}
        <section className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-12">
              <VideoCarousel videos={featuredVideos} />
            </div>
          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
}

export default App;
