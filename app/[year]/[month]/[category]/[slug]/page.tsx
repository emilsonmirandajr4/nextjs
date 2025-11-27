'use client';

import { Suspense, use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OptimizedImage from '../../../../../src/components/OptimizedImage';
import { WordPressPost } from '../../../../../src/types/wordpress';
import { fetchPosts, fetchPostBySlug, decodeHtmlEntities } from '../../../../../src/services/wordpress';
import { usePostsByCategory } from '../../../../../src/hooks/usePosts';
import TrendingTopics from '../../../../../src/components/TrendingTopics';
import Sidebar from '../../../../../src/components/Sidebar';
import { Facebook, Twitter, Share2, Clock, ChevronRight, User, Tag, ChevronLeft } from 'lucide-react';
import { getPostUrl } from '../../../../../src/utils/navigation';
import Header from '../../../../../src/components/Header';
import Footer from '../../../../../src/components/Footer';
import Navigation from '../../../../../src/components/Navigation';

export default function PostPage({ params }: { params: Promise<{ year: string; month: string; category: string; slug: string }> }) {
  return (
    <Suspense fallback={<PostLoadingSkeleton />}>
      <PostContent params={params} />
    </Suspense>
  );
}

function PostLoadingSkeleton() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
          <p className="mt-4 text-gray-900">Carregando notícia...</p>
        </div>
      </div>
    </section>
  );
}

function PostContent({ params }: { params: Promise<{ year: string; month: string; category: string; slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<WordPressPost[]>([]);
  const [allPosts, setAllPosts] = useState<WordPressPost[]>([]);
  const [category, setCategory] = useState<string>('Notícias');
  const [author, setAuthor] = useState<string>('Redação');
  const [loading, setLoading] = useState(true);
  
  const { data: opinionPosts = [] } = usePostsByCategory('opiniao', 5);

  useEffect(() => {
    async function loadPost() {
      try {
        console.log('Buscando post com slug:', slug);
        const data = await fetchPostBySlug(slug);
        console.log('Post encontrado:', data ? 'Sim' : 'Não');
        
        if (!data) {
          setLoading(false);
          return;
        }
        
        setPost(data);
        
        const posts = await fetchPosts(20);
        setAllPosts(posts);
        const currentId = data.id;
        setRelatedPosts(posts.filter(p => p.id !== currentId).slice(0, 6));
        
        if (data._embedded?.['wp:term']?.[0]?.[0]) {
          setCategory(data._embedded['wp:term'][0][0].name);
        }
        
        if (data._embedded?.author?.[0]) {
          setAuthor(data._embedded.author[0].name);
        }
      } catch (error) {
        console.error('Erro ao carregar post:', error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      loadPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
            <p className="mt-4 text-gray-900">Carregando notícia...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-gray-900">Notícia não encontrada</h1>
      </section>
    );
  }

  const getPostImage = () => {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
           'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop';
  };

  const getImagePath = (imageUrl: string): string => {
    return imageUrl.replace(/^https?:\/\/[^\/]+/, '') || '/placeholder.jpg';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="animated-bg absolute inset-0 -z-10"></div>
      <Header />
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-4">
        <section className="py-4">
        <nav className="flex items-center gap-2 text-base text-gray-700 mb-8 bg-gray-100 px-5 py-4 rounded-lg border-2 border-black shadow-sm">
          <button onClick={() => router.push('/')} className="hover:text-sky-700 transition-colors font-semibold">
            Início
          </button>
          <ChevronRight className="w-5 h-5 text-gray-600" />
          <span className="hover:text-sky-700 transition-colors cursor-pointer font-semibold">{category}</span>
          <ChevronRight className="w-5 h-5 text-gray-600" />
          <span className="text-gray-900 font-medium line-clamp-1">{decodeHtmlEntities(post.title.rendered.replace(/<[^>]*>/g, '')).substring(0, 100)}...</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <article className="lg:col-span-9">
            <h1 
              className="text-4xl font-bold text-gray-900 mb-3"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {post.excerpt?.rendered && (
              <div 
                className="text-lg text-gray-600 mb-6 leading-relaxed font-normal"
                style={{ fontFamily: 'Roboto Condensed', fontWeight: 400 }}
                dangerouslySetInnerHTML={{ 
                  __html: post.excerpt.rendered
                    .replace(/<[^>]+>/g, '')
                    .replace(/\[&hellip;\]/g, '...')
                }}
              />
            )}

            <div className="flex flex-col gap-4 text-gray-600 mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Por {author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span>{category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString('pt-BR', { 
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm">Compartilhar:</span>
                <button className="text-gray-600 hover:text-sky-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="text-gray-600 hover:text-sky-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="text-gray-600 hover:text-sky-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mb-6 rounded-lg overflow-hidden shadow-[0_4px_12px_rgba(14,165,233,0.3)]">
              <OptimizedImage
                src={getImagePath(getPostImage())}
                alt={post.title.rendered}
                ratio="16/9"
                priority="high"
                usePicture={true}
              />
            </div>

            <div 
              className="prose prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-sky-600 prose-a:hover:text-sky-700 prose-img:rounded-lg prose-img:shadow-md mb-8 text-justify tracking-wide leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
              {(() => {
                const currentIndex = allPosts.findIndex(p => p.id === post.id);
                const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
                const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
                
                return (
                  <>
                    {prevPost ? (
                      <button
                        onClick={() => router.push(getPostUrl(prevPost))}
                        className="flex items-center gap-2 text-gray-700 hover:text-sky-600 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="text-sm">Post Anterior</span>
                      </button>
                    ) : <div />}
                    
                    {nextPost ? (
                      <button
                        onClick={() => router.push(getPostUrl(nextPost))}
                        className="flex items-center gap-2 text-gray-700 hover:text-sky-600 transition-colors"
                      >
                        <span className="text-sm">Próximo Post</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    ) : <div />}
                  </>
                );
              })()}
            </div>

            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="border-l-4 border-sky-600 h-8"></span>
                Você também pode gostar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.slice(0, 4).map((relatedPost) => (
                  <div
                    key={relatedPost.id}
                    onClick={() => router.push(getPostUrl(relatedPost))}
                    className="flex gap-4 bg-white rounded-lg shadow-[0_2px_8px_rgba(14,165,233,0.3)] hover:shadow-[0_4px_16px_rgba(14,165,233,0.5)] transition-all p-4 border border-gray-200 cursor-pointer items-center"
                  >
                    <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden">
                      <OptimizedImage
                        src={getImagePath(relatedPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200&h=150&fit=crop')}
                        alt={relatedPost.title.rendered}
                        ratio="1"
                        placeholder="maincolor"
                        transitionDuration="300ms"
                        priority="normal"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 
                        className="font-bold text-gray-900 hover:text-sky-700 transition-colors line-clamp-2 text-sm"
                        dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <aside className="lg:col-span-3 space-y-6">
            <Sidebar
              posts={relatedPosts}
              title="Mais Lidas"
              onPostClick={(postId) => {
                const post = relatedPosts.find(p => p.id === postId);
                if (post) router.push(getPostUrl(post));
              }}
            />
            
            <TrendingTopics />
            
            {opinionPosts.length > 0 && (
              <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-lg shadow-sky-500/40">
                <div className="relative px-4 py-3 border-b border-red-800 bg-gradient-to-r from-red-600 via-rose-600 to-red-800 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-rose-500 to-red-700 opacity-70 blur-sm"></div>
                  <div className="relative flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-300 blur-sm opacity-80"></div>
                      <div className="relative w-8 h-8 bg-gradient-to-br from-red-300 via-red-500 to-rose-500 rounded-lg flex items-center justify-center text-red-900 shadow-lg shadow-red-500/60">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-sm font-black text-white tracking-tight flex items-center gap-2 uppercase">
                      Nossa Opinião
                    </h2>
                  </div>
                </div>
                <div className="p-4">
                  <div
                    onClick={() => router.push(getPostUrl(opinionPosts[0]))}
                    className="group cursor-pointer rounded-xl overflow-hidden border border-slate-200 bg-slate-50/60 hover:bg-slate-100 transition-colors duration-200 shadow-sm"
                  >
                    <div className="relative">
                      <OptimizedImage
                        src={getImagePath(opinionPosts[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url || '')}
                        alt={opinionPosts[0].title.rendered.replace(/<[^>]*>/g, '')}
                        ratio="none"
                        usePicture={false}
                        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="px-3 pb-4 pt-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-3">
                        {decodeHtmlEntities(opinionPosts[0].title.rendered.replace(/<[^>]*>/g, ''))}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
