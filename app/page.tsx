import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SidebarServer from "@/components/server/SidebarServer";
import NewsSection from "@/components/server/NewsSection";
import OpinionSection from "@/components/server/OpinionSection";
import MainNewsHeader from "@/components/server/MainNewsHeader";
import NewsCarouselEmbla from "@/components/NewsCarouselEmbla";
import { getPostUrl } from "@/utils/navigation";
import dynamic from "next/dynamic";
import { getPosts, getPostsByCategorySlug } from "@/server/wordpress";
import { fetchBrazilTrendsServer } from "@/server/twitter";
import { getPostImage, getPostTitle } from "@/services/wordpress";
import type { WordPressPost } from "@/types/wordpress";
import { ScrollReveal } from "@/components/animations";

// Tipos locais
type HomeVideo = {
  id: number;
  title?: string;
  videoUrl: string;
};

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
  const [posts, newsPosts, enganadoresPosts, opinionPosts, trends] =
    await Promise.all([
      getPosts(20, 1),
      getPostsByCategorySlug("noticias", 20, 1),
      getPostsByCategorySlug("enganadores", 5, 1),
      getPostsByCategorySlug("opiniao", 5, 1),
      fetchBrazilTrendsServer(), // Fetch trends on server
    ]);

  return { posts, newsPosts, enganadoresPosts, opinionPosts, trends };
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
  opinionPosts: WordPressPost[],
) {
  const sidebarLeftPosts = posts.slice(0, 6);
  const sidebarRightPosts = posts.slice(6, 12);
  const latestNewsPosts = posts.slice(0, 5);
  const highlightPosts =
    opinionPosts.length > 0 ? opinionPosts : posts.slice(28, 33);

  const judiciaryPosts = posts
    .filter((post) =>
      post.categories_names?.some((name) => {
        const normalized = name.toLowerCase();
        return (
          normalized.includes("judiciário") || normalized.includes("judiciario")
        );
      }),
    )
    .slice(0, 5);

  return {
    sidebarLeftPosts,
    sidebarRightPosts,
    latestNewsPosts,
    judiciaryPosts,
    highlightPosts,
  };
}

// Vídeos em destaque (hardcoded como estava antes)
const featuredVideos: HomeVideo[] = [
  {
    id: 1,
    title: "Vídeo em Destaque 1",
    videoUrl: "https://www.youtube.com/watch?v=X3ZbvHr3r1E",
  },
  {
    id: 2,
    title: "Vídeo em Destaque 2",
    videoUrl: "https://www.youtube.com/watch?v=jdKY0X7iv_k",
  },
  {
    id: 3,
    title: "Vídeo em Destaque 3",
    videoUrl: "https://www.youtube.com/watch?v=BbXScYwqQo8",
  },
  {
    id: 4,
    title: "Vídeo em Destaque 4",
    videoUrl: "https://www.youtube.com/watch?v=OmMUuFAJqQs",
  },
  {
    id: 5,
    title: "Vídeo em Destaque 5",
    videoUrl: "https://www.youtube.com/watch?v=UPc8VLRBDbs",
  },
  {
    id: 6,
    title: "Vídeo em Destaque 6",
    videoUrl: "https://www.youtube.com/watch?v=FA1b592TS3c",
  },
  {
    id: 7,
    title: "Vídeo em Destaque 7",
    videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
  },
  {
    id: 8,
    title: "Vídeo em Destaque 8",
    videoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
  },
  {
    id: 9,
    title: "Vídeo em Destaque 9",
    videoUrl: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
  },
  {
    id: 10,
    title: "Vídeo em Destaque 10",
    videoUrl: "https://www.youtube.com/watch?v=60ItHLz5WEA",
  },
];

export default async function HomePage() {
  // Buscar dados no servidor
  const { posts, newsPosts, enganadoresPosts, opinionPosts, trends } =
    await fetchHomeData();

  // Preparar dados no servidor (evitar useMemo no cliente)
  const postsData = preparePostsData(posts, opinionPosts);
  const carouselData = prepareCarouselData(enganadoresPosts);

  // Selecionar posts para o carousel de notícias
  const newsCarouselPosts = (newsPosts.length > 0 ? newsPosts : posts).slice(
    0,
    8,
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="animated-bg absolute inset-0 -z-10"></div>
      <Header />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-4">
        {/* Grid Principal: Sidebars + Carousel de Notícias */}
        <ScrollReveal animation="fade" duration={600}>
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
        <ScrollReveal animation="slide-up" duration={700} delay={100}>
          <section className="mt-16 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Carousel 3D - Client Component */}
              <div className="lg:col-span-9">
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
        <ScrollReveal animation="fade-scale" duration={700} delay={150}>
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
        <ScrollReveal animation="slide-up" duration={700} delay={200}>
          <LazyVideoCarousel videos={featuredVideos} />
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
