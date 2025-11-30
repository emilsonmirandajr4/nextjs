export interface Video {
  id: number | string;
  title: string;
  description: string;
  videoUrl: string;
  videoId: string;
  thumbnail: string;
  publishedAt: string; // ISO date string or formatted date
  views?: number;
  duration?: string;
  channelTitle?: string;
  formattedDate?: string;
  internalUrl?: string; // URL interna do post
  slug?: string; // Slug do post
}
