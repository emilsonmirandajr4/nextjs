import HomePageClient from '@/components/HomePageClient';
import { getPosts, getPostsByCategorySlug } from '@/server/wordpress';
import type { WordPressPost } from '@/types/wordpress';

async function fetchHomeData(): Promise<{
  posts: WordPressPost[];
  newsPosts: WordPressPost[];
  enganadoresPosts: WordPressPost[];
  opinionPosts: WordPressPost[];
}> {
  const [posts, newsPosts, enganadoresPosts, opinionPosts] = await Promise.all([
    getPosts(50, 1),
    getPostsByCategorySlug('noticias', 20, 1),
    getPostsByCategorySlug('enganadores', 5, 1),
    getPostsByCategorySlug('opiniao', 5, 1),
  ]);

  return { posts, newsPosts, enganadoresPosts, opinionPosts };
}

export default async function HomePage() {
  const { posts, newsPosts, enganadoresPosts, opinionPosts } = await fetchHomeData();

  return (
    <HomePageClient
      posts={posts}
      newsPosts={newsPosts}
      enganadoresPosts={enganadoresPosts}
      opinionPosts={opinionPosts}
    />
  );
}

