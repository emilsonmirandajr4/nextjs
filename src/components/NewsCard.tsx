import OptimizedImage from './OptimizedImage';
import { WordPressPost } from '../types/wordpress';
import { getPostTitle } from '../services/wordpress';

interface NewsCardProps {
  post: WordPressPost;
  variant?: 'large' | 'small';
}

export default function NewsCard({ post, variant = 'large' }: NewsCardProps) {
  const isLarge = variant === 'large';
  const categoria = post.categories?.[0] || 'default';

  // Mapeia as categorias do WordPress para nossas cores
  const getCategoriaClass = (catId: number | 'default') => {
    const categoriaMap = {
      1: 'bg-categoria-politica',
      2: 'bg-categoria-economia',
      3: 'bg-categoria-esporte',
      4: 'bg-categoria-cultura',
      5: 'bg-categoria-tecnologia',
      default: 'bg-categoria-default'
    } as const;
    return categoriaMap[catId as keyof typeof categoriaMap] || categoriaMap.default;
  };

  // Extrai URL da imagem (remover domínio se necessário para TwicPics)
  const getImagePath = (post: WordPressPost): string => {
    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
    // Remove o domínio base se existir, TwicPics precisa do path
    return imageUrl.replace(/^https?:\/\/[^\/]+/, '') || '/placeholder.jpg';
  };

  return (
    <div className="block">
      <article className="bg-fundo-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all transform hover:-translate-y-1 duration-300 cursor-pointer group border-[1px] border-gray-100">
        <div className={`relative ${isLarge ? 'h-48' : 'h-32'} overflow-hidden`}>
          <OptimizedImage
            src={getImagePath(post)}
            alt={getPostTitle(post)}
            ratio="16/9"
            transitionDuration="600ms"
            className="group-hover:scale-105 transition-transform duration-300"
          />
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-medium ${getCategoriaClass(categoria)}`}>
            {post.categories_names?.[0] || 'Notícia'}
          </div>
        </div>
        <div className={`p-${isLarge ? '4' : '3'}`}>
          <h3 className={`font-semibold text-texto-principal group-hover:text-categoria-default transition-colors line-clamp-${isLarge ? '3' : '2'} ${isLarge ? 'text-lg' : 'text-sm'}`}>
            {getPostTitle(post)}
          </h3>
        </div>
      </article>
    </div>
  );
}
