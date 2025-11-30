/**
 * Lista de vídeos para o carousel da home
 * 
 * Para adicionar um novo vídeo:
 * 1. Copie o objeto abaixo
 * 2. Incremente o id
 * 3. Cole o link do YouTube
 * 4. (Opcional) Adicione um título personalizado
 * 
 * O título, thumbnail, views, duração e canal serão buscados automaticamente da API do YouTube
 */

export interface VideoData {
  id: number;
  videoUrl: string;
  title?: string; // Opcional - se não informado, usa o título do YouTube
}

export const FEATURED_VIDEOS: VideoData[] = [
  {
    id: 1,
    videoUrl: "https://www.youtube.com/watch?v=9kHixLHBoZI",
  },
  {
    id: 2,
    videoUrl: "https://www.youtube.com/watch?v=jBGTNMUQ2IM",
  },
  {
    id: 3,
    videoUrl: "https://www.youtube.com/watch?v=4zckzA6hI_M",
  },
  {
    id: 4,
    videoUrl: "https://www.youtube.com/watch?v=zBCIWWZdFYQ",
  },
  {
    id: 5,
    videoUrl: "https://www.youtube.com/watch?v=dPhKBdH0JCA",
  },
  {
    id: 6,
    videoUrl: "https://www.youtube.com/watch?v=9m6RzkrAkI4",
  },
  {
    id: 7,
    videoUrl: "https://www.youtube.com/watch?v=gsDUOXR02E8",
  },
  {
    id: 8,
    videoUrl: "https://www.youtube.com/watch?v=-7VB_Fe5uqQ",
  },
  {
    id: 9,
    videoUrl: "https://www.youtube.com/watch?v=_gfjjlehLqU&t=3189s",
  },
  {
    id: 10,
    videoUrl: "https://www.youtube.com/watch?v=jn5-iZtB-6o",
  },
  // Adicione mais vídeos aqui...
];

/**
 * Retorna a lista de vídeos em destaque
 */
export function getFeaturedVideos(): VideoData[] {
  return FEATURED_VIDEOS;
}
