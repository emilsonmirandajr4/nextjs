import { WordPressPost } from "@/types/wordpress";
import { Video } from "@/types/video";
import { getPostsByCategorySlug } from "@/server/wordpress";
import { extractVideoId, getYoutubeThumbnail } from "@/utils/youtube";
import { getPostUrl } from "@/utils/navigation";

function decodeHtmlEntity(str: string) {
  if (!str) return "";
  const entities: Record<string, string> = {
    '&#8220;': '"', '&#8221;': '"', '&#8216;': "'", '&#8217;': "'", 
    '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#038;': '&'
  };
  return str.replace(/&#?\w+;/g, match => entities[match] || match);
}

// Helper para converter Post WP em Video
function convertPostToVideo(post: WordPressPost): Video | null {
  // Tenta achar link do YouTube no Content ou no Excerpt
  const contentToCheck = (post.content?.rendered || "") + " " + (post.excerpt?.rendered || "");
  const videoId = extractVideoId(contentToCheck);

  if (!videoId) return null;

  // Data formatada
  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // Tenta usar a imagem destacada do WP se existir, senão usa a do YouTube
  const wpThumbnail = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const thumbnail = wpThumbnail || getYoutubeThumbnail(videoId, 'maxres');

  // Gera URL interna do post
  const internalUrl = getPostUrl(post);

  return {
    id: post.id,
    title: decodeHtmlEntity(post.title.rendered),
    description: post.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || "",
    videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
    videoId: videoId,
    thumbnail: thumbnail,
    publishedAt: post.date,
    formattedDate,
    internalUrl,
    slug: post.slug
  };
}

export async function fetchVideos(limit: number = 10): Promise<Video[]> {
  try {
    // Busca posts da categoria "videos" usando a função server-side
    const posts = await getPostsByCategorySlug("videos", limit, 1);
    
    const videos = posts
      .map(convertPostToVideo)
      .filter((v): v is Video => v !== null);

    return videos;
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
    return [];
  }
}

export async function fetchVideosPaginated(page: number = 1, perPage: number = 12): Promise<Video[]> {
  try {
    // Usar a função server-side para buscar posts paginados
    const posts = await getPostsByCategorySlug("videos", perPage, page);
    
    const videos = posts
      .map(convertPostToVideo)
      .filter((v): v is Video => v !== null);

    return videos;
  } catch (error) {
    console.error("Erro ao buscar vídeos paginados:", error);
    return [];
  }
}
