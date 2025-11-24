export const WORDPRESS_CONFIG = {
  API_BASE: 'https://primeiranews.com.br/wp-json/wp/v2',
  SITE_URL: 'https://primeiranews.com.br',

  // Cache TTL configuration (in milliseconds)
  // Com webhook ativo, podemos usar cache mais agressivo!
  // O webhook limpa o cache automaticamente quando você publica posts
  CACHE_TTL: {
    POSTS_LIST: 300000,   // Posts list: 5 minutos (webhook limpa quando publica)
    POSTS_CATEGORY: 300000, // Posts by category: 5 minutos
    POST_SINGLE: 600000,  // Single post: 10 minutos (raramente editado)
    CATEGORIES: 3600000,  // Categories: 1 hora (quase nunca muda)
    TAGS: 7 * 24 * 60 * 60 * 1000, // 7 dias
    MEDIA: 7 * 24 * 60 * 60 * 1000, // 7 dias
  },

  PAGINATION: {
    PER_PAGE: 10,
    MAX_PAGES: 100,
  },

  FIELDS: {
    POSTS: 'id,title,excerpt,content,date,link,categories,featured_media,author',
    CATEGORIES: 'id,name,slug,count,description',
    TAGS: 'id,name,slug,count',
    MEDIA: 'id,title,media_details,source_url',
  },
};

export default WORDPRESS_CONFIG;
