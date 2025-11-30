import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SidebarServer from "@/components/server/SidebarServer";
import NewsSection from "@/components/server/NewsSection";
import OpinionSection from "@/components/server/OpinionSection";
import MainNewsHeader from "@/components/server/MainNewsHeader";
import EnganadoresHeader from "@/components/server/EnganadoresHeader";
import NewsCarouselEmbla from "@/components/NewsCarouselEmbla";
import { getPostUrl } from "@/utils/navigation";
import dynamic from "next/dynamic";
import { getPosts, getPostsByCategorySlug } from "@/server/wordpress";
import { fetchBrazilTrendsServer } from "@/server/twitter";
import { fetchVideos } from "@/services/videos";
import { getPostImage, getPostTitle } from "@/services/wordpress";
import type { WordPressPost } from "@/types/wordpress";
import { ScrollReveal } from "@/components/animations";

// NOTA: Cache ZERO configurado em src/config/wordpress.ts
// cacheComponents no next.config.mjs cuida do cache automaticamente

// Dynamic imports para componentes abaixo da dobra ou pesados
const CarouselWithPanelWrapper = dynamic(
  () => import("@/components/client/CarouselWithPanelWrapper"),
  {
    loading: () => (
      <div className="w-full h-[440px] bg-gray-900/50 rounded-xl animate-pulse border border-gray-800" />
    ),
  },
);

const TrendingTopics = dynamic(() => import("@/components/TrendingTopics"), {
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 rounded-xl animate-pulse" />
  ),
});

const LazyVideoCarousel = dynamic(
  () => import("@/components/client/LazyVideoCarousel"),
  {
    loading: () => (
      <div className="mt-8">
        <div className="w-full h-64 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    ),
  },
);

async function fetchHomeData() {
  const [
    posts, 
    newsPosts, 
    enganadoresPosts, 
    opinionPosts, 
    judiciaryPosts,
    politicsPosts,
    economyPosts,
    trends, 
    videosData
  ] = await Promise.all([
      getPosts(20, 1),
      getPostsByCategorySlug("noticias", 20, 1), // Mais posts para sidebars
      getPostsByCategorySlug("enganadores", 5, 1),
      getPostsByCategorySlug("opiniao", 10, 1),
      getPostsByCategorySlug("judiciario", 20, 1), // Mais posts para sidebars
      getPostsByCategorySlug("politica", 15, 1), // Mais posts para sidebars
      getPostsByCategorySlug("economia", 15, 1), // Mais posts para sidebars
      fetchBrazilTrendsServer(),
      fetchVideos(10).catch(() => []),
    ]);

  return { 
    posts, 
    newsPosts, 
    enganadoresPosts, 
    opinionPosts, 
    judiciaryPosts,
    politicsPosts,
    economyPosts,
    trends, 
    videosData 
  };
}

// Preparar dados do Carousel 3D no servidor
function prepareCarouselData(enganadoresPosts: WordPressPost[]) {
  const items = enganadoresPosts.map((post) => {
    const tags = post._embedded?.["wp:term"]?.[1]?.map((tag) => tag.name) || [];
    return {
      id: post.id,
      image:
        getPostImage(post).replace(/^https?:\/\/[^/]+/, "") ||
        "/placeholder.jpg",
      title: getPostTitle(post),
      description:
        (post.excerpt?.rendered?.replace(/<[^>]+>/g, "").substring(0, 100) ||
          "") + "...",
      category: post.categories_names?.[0] || "Enganadores",
      tags: tags,
      url: getPostUrl(post),
    };
  });

  const summaries = enganadoresPosts.map(
    (post) =>
      post.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() ||
      getPostTitle(post),
  );

  return { items, summaries };
}

// Preparar dados dos posts no servidor
function preparePostsData(
  posts: WordPressPost[],
  newsPosts: WordPressPost[],
  opinionPosts: WordPressPost[],
  judiciaryPosts: WordPressPost[],
  politicsPosts: WordPressPost[],
  economyPosts: WordPressPost[],
) {
  // Helper: Remove posts de categorias indesejadas (videos e enganadores)
  const filterUnwantedCategories = (postList: WordPressPost[]) => 
    postList.filter(post => {
      // Filtro 1: Verifica categorias
      const hasUnwantedCategory = post.categories_names?.some(cat => {
        const lowerCat = cat.toLowerCase().trim();
        return lowerCat === 'videos' || lowerCat === 'vídeos' || lowerCat === 'enganadores';
      });
      
      if (hasUnwantedCategory) return false;
      
      // Filtro 2: Verifica se o título começa com "video" (fallback)
      const title = post.title.rendered.toLowerCase().trim();
      if (title.startsWith('video ') || title.startsWith('vídeo ')) {
        return false;
      }
      
      return true;
    });

  // Helper: Remove posts duplicados baseado no ID
  const removeDuplicates = (postList: WordPressPost[]) => {
    const seen = new Set<number>();
    return postList.filter(post => {
      if (seen.has(post.id)) return false;
      seen.add(post.id);
      return true;
    });
  };

  // Filtrar posts limpos APENAS para sidebars (posts gerais podem ter vídeos/enganadores)
  const cleanNewsPosts = filterUnwantedCategories(newsPosts);
  const cleanPoliticsPosts = filterUnwantedCategories(politicsPosts);
  const cleanEconomyPosts = filterUnwantedCategories(economyPosts);

  // SIDEBAR ESQUERDA: Pega mais posts para compensar duplicatas
  let sidebarLeftPosts = removeDuplicates([
    ...cleanNewsPosts.slice(0, 3),
    ...judiciaryPosts.slice(0, 3), // SEM filtro - já vem da categoria específica
    ...cleanPoliticsPosts.slice(0, 2),
    ...cleanEconomyPosts.slice(0, 2),
  ]);
  
  // Se não tiver 6, completa com posts gerais
  if (sidebarLeftPosts.length < 6) {
    const cleanGeneralPosts = filterUnwantedCategories(posts);
    const usedIds = new Set(sidebarLeftPosts.map(p => p.id));
    const extraPosts = cleanGeneralPosts.filter(p => !usedIds.has(p.id)).slice(0, 6 - sidebarLeftPosts.length);
    sidebarLeftPosts = [...sidebarLeftPosts, ...extraPosts];
  }
  sidebarLeftPosts = sidebarLeftPosts.slice(0, 6);

  // SIDEBAR DIREITA: Pega posts diferentes da esquerda
  let sidebarRightPosts = removeDuplicates([
    ...cleanNewsPosts.slice(3, 6),
    ...judiciaryPosts.slice(3, 6), // SEM filtro - já vem da categoria específica
    ...cleanPoliticsPosts.slice(2, 4),
    ...cleanEconomyPosts.slice(2, 4),
  ]);
  
  // Se não tiver 6, completa com posts gerais (diferentes da esquerda)
  if (sidebarRightPosts.length < 6) {
    const cleanGeneralPosts = filterUnwantedCategories(posts);
    const usedIds = new Set([...sidebarLeftPosts, ...sidebarRightPosts].map(p => p.id));
    const extraPosts = cleanGeneralPosts.filter(p => !usedIds.has(p.id)).slice(0, 6 - sidebarRightPosts.length);
    sidebarRightPosts = [...sidebarRightPosts, ...extraPosts];
  }
  sidebarRightPosts = sidebarRightPosts.slice(0, 6);
  
  // Últimas Notícias: usa posts da categoria "noticias"
  const latestNewsPosts = cleanNewsPosts.slice(0, 5);
  
  // Judiciário: usa posts direto da categoria "judiciario" (SEM filtro adicional)
  const filteredJudiciaryPosts = judiciaryPosts.slice(0, 5);
  
  // Nossa Opinião: usa posts direto da categoria "opiniao" (SEM filtro adicional)
  const highlightPosts = opinionPosts.slice(0, 5);

  return {
    sidebarLeftPosts,
    sidebarRightPosts,
    latestNewsPosts,
    judiciaryPosts: filteredJudiciaryPosts,
    highlightPosts,
  };
}

export default async function HomePage() {
  // Buscar dados no servidor
  const { 
    posts, 
    newsPosts, 
    enganadoresPosts, 
    opinionPosts, 
    judiciaryPosts,
    politicsPosts,
    economyPosts,
    trends, 
    videosData 
  } = await fetchHomeData();

  // Preparar dados no servidor (evitar useMemo no cliente)
  const postsData = preparePostsData(
    posts, 
    newsPosts, 
    opinionPosts, 
    judiciaryPosts,
    politicsPosts,
    economyPosts
  );
  const carouselData = prepareCarouselData(enganadoresPosts);

  // Selecionar posts para o carousel de notícias (SEM videos e enganadores)
  const filterCarouselPosts = (postList: WordPressPost[]) => 
    postList.filter(post => {
      // Filtro 1: Verifica categorias
      const hasUnwantedCategory = post.categories_names?.some(cat => {
        const lowerCat = cat.toLowerCase().trim();
        return lowerCat === 'videos' || lowerCat === 'vídeos' || lowerCat === 'enganadores';
      });
      
      if (hasUnwantedCategory) return false;
      
      // Filtro 2: Verifica se o título começa com "video" (fallback)
      const title = post.title.rendered.toLowerCase().trim();
      if (title.startsWith('video ') || title.startsWith('vídeo ')) {
        return false;
      }
      
      return true;
    });
  
  const cleanCarouselPosts = filterCarouselPosts(newsPosts.length > 0 ? newsPosts : posts);
  const newsCarouselPosts = cleanCarouselPosts.slice(0, 8);

  // Converter videos para o formato esperado pelo LazyVideoCarousel
  const featuredVideos = videosData.map((video) => ({
    id: typeof video.id === 'number' ? video.id : parseInt(String(video.id)),
    title: video.title,
    videoUrl: video.videoUrl,
  }));

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="animated-bg absolute inset-0 -z-10"></div>
      <Header />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-4">
        {/* Grid Principal: Sidebars + Carousel de Notícias */}
        <ScrollReveal animation="fade" duration={400}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sidebar Esquerda - Server Component */}
            <div className="lg:col-span-3">
              <SidebarServer
                posts={postsData.sidebarLeftPosts}
                title="Mais Lidas"
              />
            </div>

            {/* Centro: Carousel de Notícias - Client Component */}
            <div className="lg:col-span-6">
              <MainNewsHeader />
              <NewsCarouselEmbla posts={newsCarouselPosts} />
            </div>

            {/* Sidebar Direita - Server Component */}
            <div className="lg:col-span-3">
              <SidebarServer
                posts={postsData.sidebarRightPosts}
                title="Assuntos em Alta"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Carousel 3D com Painel e Trending Topics */}
        <ScrollReveal animation="slide-up" duration={500} delay={100}>
          <section className="mt-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Carousel 3D - Client Component */}
              <div className="lg:col-span-9">
                <EnganadoresHeader />
                <CarouselWithPanelWrapper
                  items={carouselData.items}
                  summaries={carouselData.summaries}
                />
              </div>
              {/* Trending Topics - Client Component */}
              <div className="lg:col-span-3">
                <TrendingTopics initialTrends={trends} />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Seções de Notícias - Server Components */}
        <ScrollReveal animation="fade-scale" duration={500} delay={150}>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Container para Últimas Notícias e Judiciário */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Últimas Notícias - Server Component */}
              <NewsSection
                posts={postsData.latestNewsPosts}
                title="Últimas Notícias"
                icon="clock"
                iconColor="sky"
              />

              {/* Judiciário - Server Component */}
              <NewsSection
                posts={postsData.judiciaryPosts}
                title="Judiciário"
                icon="scale"
                iconColor="red"
              />
            </div>

            {/* Nossa Opinião - Server Component */}
            <div className="lg:col-span-3">
              <OpinionSection posts={postsData.highlightPosts} />
            </div>
          </div>
        </ScrollReveal>

        {/* Seção de Vídeos em Destaque - Client Component (lazy loaded) */}
        {featuredVideos.length > 0 && (
          <ScrollReveal animation="slide-up" duration={500} delay={200}>
            <LazyVideoCarousel videos={featuredVideos} />
          </ScrollReveal>
        )}
      </main>

      <Footer />
    </div>
  );
}
