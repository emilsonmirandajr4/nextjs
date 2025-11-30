import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { fetchVideosPaginated } from "@/services/videos";
import Image from "next/image";
import Link from "next/link";

// NOTA: Cache ZERO configurado em src/config/wordpress.ts
// cacheComponents no next.config.mjs cuida do cache automaticamente

export const metadata = {
  title: 'Vídeos | Primeira News',
  description: 'Confira os últimos vídeos e reportagens do Primeira News.',
};

export default async function VideosPage() {
  // Busca os vídeos da primeira página (24 itens)
  const videos = await fetchVideosPaginated(1, 24);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Navigation />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-red-600 text-4xl">▶</span> 
            <span>Vídeos</span>
          </h1>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📺</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum vídeo encontrado</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Para que os vídeos apareçam aqui, crie uma categoria chamada "Vídeos" no seu WordPress e adicione posts com links do YouTube.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <Link 
                key={video.id} 
                href={video.internalUrl || video.videoUrl}
                target={video.internalUrl ? undefined : "_blank"}
                rel={video.internalUrl ? undefined : "noopener noreferrer"}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
              >
                {/* Thumbnail Wrapper */}
                <div className="relative aspect-video bg-gray-900 overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                    <div className="w-12 h-12 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                      <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Duração (Mockado por enquanto, ou vindo do meta se implementarmos) */}
                  {/* <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                    Video
                  </div> */}
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                    <time>{video.formattedDate}</time>
                  </div>
                  
                  <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {video.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 mt-auto">
                    {video.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {/* Rodapé da listagem */}
        {videos.length > 0 && (
          <div className="mt-12 flex justify-center items-center gap-2 text-gray-400 text-sm">
            <span>●</span>
            <span>Fim da lista</span>
            <span>●</span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
