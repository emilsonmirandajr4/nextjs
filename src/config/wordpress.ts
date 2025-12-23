export const WORDPRESS_CONFIG = {
  API_BASE: 'https://primeiranews.com.br/wp-json/wp/v2',
  SITE_URL: 'https://primeiranews.com.br',

  // Cache TTL configuration (in seconds)
  // Valores reduzidos para 0s - atualização rápida
  CACHE_TTL: {
    POSTS_LIST: 0,      // 0 segundos - atualização rápida
    POSTS_CATEGORY: 0,  // 0 segundos - atualização rápida
    POST_SINGLE: 0,     // 0 segundos - atualização rápida
    CATEGORIES: 0,      // 0 segundos - atualização rápida
    TAGS: 0,            // 0 segundos - atualização rápida
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
