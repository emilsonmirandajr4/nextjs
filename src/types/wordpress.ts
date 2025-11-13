export interface WordPressPost {
  id: number;
  slug: string;
  date: string; // ISO 8601 format
  title: {
    rendered: string;
  };
  link: string;
  featured_media: number;
  excerpt: {
    rendered: string;
  };
  // Corpo completo do post
  content: {
    rendered: string;
  };
  // Campos padrão do WP
  categories?: number[];
  categories_names?: string[];
  tags?: number[];
  // Campos customizados (ACF ou similares)
  acf?: {
    video_duration?: string;
    [key: string]: any;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
    author?: Array<{
      id: number;
      name: string;
      slug?: string;
    }>;
  };
}
