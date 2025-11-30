export const WORDPRESS_CONFIG = {
  API_BASE: 'https://primeiranews.com.br/wp-json/wp/v2',
  SITE_URL: 'https://primeiranews.com.br',

  // Cache TTL configuration (in milliseconds)
  // ZERO CACHE para posts aparecerem instantaneamente!
  // LiteSpeed Cache no WordPress cuida do cache da API REST
  CACHE_TTL: {
    POSTS_LIST: 0,        // Zero cache - posts aparecem instantaneamente
    POSTS_CATEGORY: 0,    // Zero cache - categorias atualizadas em tempo real
    POST_SINGLE: 0,       // Zero cache - edições aparecem imediatamente
    CATEGORIES: 60000,    // 1 minuto (categorias não mudam muito)
    TAGS: 300000,         // 5 minutos
    MEDIA: 3600000,       // 1 hora (imagens não mudam)
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
