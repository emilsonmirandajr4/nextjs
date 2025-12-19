export const WORDPRESS_CONFIG = {
  API_BASE: 'https://primeiranews.com.br/wp-json/wp/v2',
  SITE_URL: 'https://primeiranews.com.br',

  // Cache TTL configuration (in seconds)
  // Valores baixos para permitir revalidação rápida via webhook
  CACHE_TTL: {
    POSTS_LIST: 30,      // 1 minuto - revalidado via webhook ao publicar
    POSTS_CATEGORY: 60, // 5 minutos - revalidado via webhook ao publicar
    POST_SINGLE: 60,    // 5 minutos - revalidado via webhook ao editar
    CATEGORIES: 3600,    // 1 hora (categorias mudam raramente)
    TAGS: 3600,          // 1 hora
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
