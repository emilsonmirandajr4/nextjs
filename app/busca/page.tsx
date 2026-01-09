import { Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { searchPosts } from "@/server/wordpress";
import { getPostTitle, getPostImage, extractImagePath } from "@/lib/wordpress-utils";
import { getPostUrl } from "@/utils/navigation";
import { formatDate } from "@/utils/date";
import OptimizedImage from "@/components/OptimizedImage";
import { Search, FileX } from "lucide-react";

export const metadata = {
  title: "Busca | Primeira News",
  description: "Busque notícias no Primeira News",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

async function SearchResults({ query, page }: { query: string; page: number }) {
  const { posts, total, totalPages } = await searchPosts(query, 10, page);

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
          <FileX className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Nenhum resultado encontrado
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Não encontramos nenhuma notícia para "{query}". Tente buscar por outros termos.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-600 mb-6">
        {total} {total === 1 ? "resultado" : "resultados"} para "{query}"
      </p>

      <div className="space-y-6">
        {posts.map((post) => {
          const imagePath = extractImagePath(getPostImage(post));
          const categoryName = post.categories_names?.[0] || "Notícias";

          return (
            <Link
              key={post.id}
              href={getPostUrl(post)}
              prefetch={false}
              className="group flex flex-col md:flex-row gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="relative w-full md:w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                <OptimizedImage
                  src={imagePath}
                  alt={getPostTitle(post)}
                  ratio="4/3"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {categoryName}
                </span>
              </div>

              <div className="flex flex-col justify-center flex-1 min-w-0">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                  {getPostTitle(post)}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                  {post.excerpt?.rendered?.replace(/<[^>]+>/g, "").substring(0, 150)}...
                </p>
                <span className="text-xs text-gray-400">
                  {formatDate(post.date)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {page > 1 && (
            <Link
              href={`/busca?q=${encodeURIComponent(query)}&page=${page - 1}`}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              Anterior
            </Link>
          )}

          <span className="px-4 py-2 text-sm text-gray-600">
            Página {page} de {totalPages}
          </span>

          {page < totalPages && (
            <Link
              href={`/busca?q=${encodeURIComponent(query)}&page=${page + 1}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Próxima
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default async function BuscaPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const page = parseInt(params.page || "1", 10);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      <Header />
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Search className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Busca</h1>
            {query && (
              <p className="text-gray-600 text-sm">Resultados para: {query}</p>
            )}
          </div>
        </div>

        {!query ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Digite algo para buscar
            </h2>
            <p className="text-gray-600">
              Use o campo de busca no topo da página para encontrar notícias.
            </p>
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200 animate-pulse"
                  >
                    <div className="w-48 h-32 bg-gray-200 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            <SearchResults query={query} page={page} />
          </Suspense>
        )}
      </main>

      <Footer />
    </div>
  );
}
