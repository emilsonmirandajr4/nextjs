export const WORDPRESS_CONFIG = {
  API_BASE: 'https://primeiranews.com.br/wp-json/wp/v2',
  SITE_URL: 'https://primeiranews.com.br',

  // Cache TTL configuration (in seconds)
  // Valores otimizados para balancear atualização com performance
  CACHE_TTL: {
    POSTS_LIST: 60,      // 1 minuto - atualização rápida sem sobrecarregar servidor
    POSTS_CATEGORY: 60,  // 1 minuto - atualização rápida sem sobrecarregar servidor
    POST_SINGLE: 120,    // 2 minutos - posts individuais mudam menos
    CATEGORIES: 3600,    // 1 hora - categorias raramente mudam
    TAGS: 3600,          // 1 hora - tags raramente mudam
    MEDIA: 31536000,     // 1 year (imagens não mudam)
  },

  PAGINATION: {
    PER_PAGE: 10,
    MAX_PAGES: 50,
  },

  FIELDS: {
    POSTS: 'id,title,excerpt,content,date,link,categories,featured_media,author',
    CATEGORIES: 'id,name,slug,count,description',
    TAGS: 'id,name,slug,count',
    MEDIA: 'id,title,media_details,source_url',
  },
};

export default WORDPRESS_CONFIG;
