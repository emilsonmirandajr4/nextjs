'use client';

import { StaggeredReveal, ScrollReveal } from '@/components/animations';
import Link from 'next/link';
import Image from 'next/image';

// Exemplo de tipos (adapte aos seus tipos reais)
type NewsPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  url: string;
};

// ==========================================
// EXEMPLO 1: Grid de Cards com Stagger
// ==========================================
export function StaggeredNewsGrid({ posts }: { posts: NewsPost[] }) {
  return (
    <section className="py-12">
      <ScrollReveal animation="fade" duration={500}>
        <h2 className="text-3xl font-bold mb-8">Últimas Notícias</h2>
      </ScrollReveal>

      <StaggeredReveal
        animation="slide-up"
        staggerDelay={120}
        duration={600}
        threshold={0.15}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {posts.map((post) => (
          <Link
            key={post.id}
            href={post.url}
            className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {post.excerpt}
              </p>
              <time className="text-xs text-gray-400">{post.date}</time>
            </div>
          </Link>
        ))}
      </StaggeredReveal>
    </section>
  );
}

// ==========================================
// EXEMPLO 2: Lista Vertical com Stagger
// ==========================================
export function StaggeredNewsList({ posts }: { posts: NewsPost[] }) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6">Destaques</h2>

      <StaggeredReveal
        animation="slide-right"
        staggerDelay={80}
        duration={500}
        className="space-y-4"
      >
        {posts.map((post) => (
          <Link
            key={post.id}
            href={post.url}
            className="flex gap-4 bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="relative w-32 h-24 flex-shrink-0 rounded overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <span className="text-xs text-blue-600 font-semibold">
                {post.category}
              </span>
              <h3 className="font-bold text-lg mb-1 line-clamp-2">
                {post.title}
              </h3>
              <time className="text-xs text-gray-400">{post.date}</time>
            </div>
          </Link>
        ))}
      </StaggeredReveal>
    </section>
  );
}

// ==========================================
// EXEMPLO 3: Featured Cards (2 colunas) com Stagger
// ==========================================
export function StaggeredFeaturedPosts({ posts }: { posts: NewsPost[] }) {
  return (
    <section className="py-16 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal animation="fade" duration={500}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">Em Destaque</h2>
            <p className="text-gray-600">As notícias mais importantes de hoje</p>
          </div>
        </ScrollReveal>

        <StaggeredReveal
          animation="fade-scale"
          staggerDelay={150}
          duration={700}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <time className="text-sm text-gray-400">{post.date}</time>
                  <Link
                    href={post.url}
                    className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                  >
                    Ler mais →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </StaggeredReveal>
      </div>
    </section>
  );
}

// ==========================================
// EXEMPLO 4: Cards Compactos (4 colunas)
// ==========================================
export function StaggeredCompactCards({ posts }: { posts: NewsPost[] }) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6">Mais Notícias</h2>

      <StaggeredReveal
        animation="scale"
        staggerDelay={100}
        duration={500}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {posts.map((post) => (
          <Link
            key={post.id}
            href={post.url}
            className="group block bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all"
          >
            <div className="relative h-32 w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <time className="text-xs text-gray-400 mt-2 block">
                {post.date}
              </time>
            </div>
          </Link>
        ))}
      </StaggeredReveal>
    </section>
  );
}

// ==========================================
// EXEMPLO 5: Seção Completa com Múltiplas Animações
// ==========================================
export function CompleteAnimatedSection({
  featuredPosts,
  recentPosts,
  popularPosts,
}: {
  featuredPosts: NewsPost[];
  recentPosts: NewsPost[];
  popularPosts: NewsPost[];
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Seção Featured - Fade in */}
      <ScrollReveal animation="fade" duration={600}>
        <section>
          <h2 className="text-3xl font-bold mb-8">Principais Destaques</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredPosts.slice(0, 2).map((post) => (
              <article
                key={post.id}
                className="relative h-96 rounded-2xl overflow-hidden group"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <span className="bg-red-600 px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">
                    {post.category}
                  </span>
                  <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-200 text-sm">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Seção Recent - Slide up com stagger */}
      <section>
        <ScrollReveal animation="slide-up" duration={600}>
          <h2 className="text-3xl font-bold mb-8">Últimas Publicações</h2>
        </ScrollReveal>

        <StaggeredReveal
          animation="slide-up"
          staggerDelay={100}
          duration={600}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {recentPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <span className="text-xs text-blue-600 font-semibold">{post.category}</span>
                <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </StaggeredReveal>
      </section>

      {/* Seção Popular - Fade scale */}
      <ScrollReveal animation="fade-scale" duration={700}>
        <section className="bg-gray-50 rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-8">Mais Populares</h2>
          <div className="space-y-4">
            {popularPosts.map((post, index) => (
              <Link
                key={post.id}
                href={post.url}
                className="flex items-center gap-4 p-4 bg-white rounded-lg hover:shadow-lg transition-shadow"
              >
                <span className="text-3xl font-bold text-gray-300 w-12 text-center">
                  {index + 1}
                </span>
                <div className="relative w-24 h-16 rounded overflow-hidden flex-shrink-0">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold line-clamp-2">{post.title}</h3>
                  <time className="text-xs text-gray-400">{post.date}</time>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}

// ==========================================
// COMO USAR NO SEU PAGE.TSX
// ==========================================

// import { StaggeredNewsGrid } from '@/components/examples/SCROLL_REVEAL_CARD_EXAMPLE';
//
// export default async function Page() {
//   const posts = await getPosts();
//
//   return (
//     <main>
//       <StaggeredNewsGrid posts={posts} />
//     </main>
//   );
// }
