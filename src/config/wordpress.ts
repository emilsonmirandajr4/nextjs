export const WORDPRESS_CONFIG = {
  API_BASE: 'https://primeiranews.com.br/wp-json/wp/v2',
  SITE_URL: 'https://primeiranews.com.br',

  // Cache TTL configuration (in milliseconds)
  // Ajustado para 1 hora. Revalidação sob demanda via webhook garante atualizações instantâneas.
  CACHE_TTL: {
    POSTS_LIST: 3600000,   // 1 hora
    POSTS_CATEGORY: 3600000, // 1 hora
    POST_SINGLE: 3600000,  // 1 hora
    CATEGORIES: 60000,    // 1 minuto (categorias não mudam muito)
    TAGS: 300000,         // 5 minutos
    MEDIA: 31536000,       // 1 hora (imagens não mudam)
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
