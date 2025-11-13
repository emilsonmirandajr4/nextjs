export const WORDPRESS_CONFIG = {
  API_BASE: 'https://primeiranews.com/wp-json/wp/v2',
  SITE_URL: 'https://primeiranews.com',

  CACHE_TTL: {
    POSTS_LIST: 60 * 60 * 1000, // 1 hora
    POST_SINGLE: 24 * 60 * 60 * 1000, // 24 horas
    CATEGORIES: 7 * 24 * 60 * 60 * 1000, // 7 dias
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
