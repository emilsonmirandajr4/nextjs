import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, ArrowRight } from "lucide-react";

import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getPostsByCategorySlug } from "@/server/wordpress";
import { getPostImage, getPostTitle } from "@/lib/wordpress-utils";
import { getPostUrl } from "@/utils/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

// Mapeamento de slugs para títulos (opcional, para ficar mais bonito)
const categoryTitles: Record<string, string> = {
  politica: "Política",
  judiciario: "Judiciário",
  economia: "Economia",
  brasil: "Brasil",
  mundo: "Mundo",
};

function getCategoryTitle(slug: string) {
  return categoryTitles[slug.toLowerCase()] || slug.charAt(0).toUpperCase() + slug.slice(1);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = getCategoryTitle(slug);
  return {
    title: `${title} | Primeira News`,
    description: `Últimas notícias sobre ${title} no Primeira News.`,
  };
}

// Gerar estaticamente as categorias principais
export function generateStaticParams() {
  return [
    { slug: "politica" },
    { slug: "judiciario" },
    { slug: "economia" },
  ];
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const title = getCategoryTitle(slug);
  const posts = await getPostsByCategorySlug(slug, 20, 1);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Cabeçalho da Categoria */}
        <div className="mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">
            {title}
          </h1>
          <p className="text-gray-600 mt-2">
            Acompanhe as principais notícias e atualizações sobre {title.toLowerCase()}.
          </p>
        </div>

        {/* Lista de Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const imageUrl = getPostImage(post);
            const postUrl = getPostUrl(post);
            const postTitle = getPostTitle(post);
            const postDate = new Date(post.date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });

            // Resumo limpo de HTML
            const excerpt = post.excerpt?.rendered
              ?.replace(/<[^>]*>/g, "")
              .substring(0, 120) + "...";

            return (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                {/* Thumbnail Média */}
                <Link href={postUrl} prefetch={false} className="block relative aspect-video overflow-hidden group">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={postTitle}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 font-medium">Sem imagem</span>
                    </div>
                  )}
                </Link>

                {/* Conteúdo */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Data */}
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <Calendar className="w-3 h-3 mr-1" />
                    <time dateTime={post.date}>{postDate}</time>
                  </div>

                  {/* Título */}
                  <Link href={postUrl} prefetch={false} className="block mb-3">
                    <h2 className="text-xl font-bold text-gray-900 leading-tight hover:text-blue-600 transition-colors line-clamp-3">
                      {postTitle}
                    </h2>
                  </Link>

                  {/* Resumo */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                    {excerpt}
                  </p>

                  {/* Botão Ler Mais */}
                  <Link
                    href={postUrl}
                    prefetch={false}
                    className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mt-auto group"
                  >
                    Ler matéria completa
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
