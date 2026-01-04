export const WORDPRESS_CONFIG = {
  API_BASE: 'https://primeiranews.com.br/wp-json/wp/v2',
  SITE_URL: 'https://primeiranews.com.br',

  // Estrutura de URL do WordPress: /%year%/%monthnum%/%category%/%postname%/
  URL_STRUCTURE: {
    PATTERN: '/:year/:month/:category/:slug',
    PARTS: ['year', 'month', 'category', 'slug'],
  },

  CACHE_TTL: {
    POSTS_LIST: 1,      // 10 minutos
    POSTS_CATEGORY: 1,  // 10 minutos
    POST_SINGLE: 30,     // 10 minutos
    CATEGORIES: 1,      // 10 minutos
    TAGS: 1,           // 1 hora
    MEDIA: 31536000,      // 1 ano (imutável)
  },

  PAGINATION: {
    PER_PAGE: 10,
    MAX_PAGES: 50,
  },

  FIELDS: {
    POSTS: 'title,excerpt,content,date,link,categories,featured_media,author',
    CATEGORIES: 'name,slug,count,description',
    TAGS: 'name,slug,count',
    MEDIA: 'title,media_details,source_url',
  },
};

export default WORDPRESS_CONFIG;
