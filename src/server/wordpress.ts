import 'server-only';

import { WORDPRESS_CONFIG } from '../config/wordpress';
import { WordPressPost } from '../types/wordpress';

const WP_API_URL = WORDPRESS_CONFIG.API_BASE;

const msToSeconds = (ms: number): number => {
  if (ms <= 0) return 0;
  return Math.max(1, Math.floor(ms / 1000));
};

const createCacheControlHeader = (ttlMs: number): string => {
  if (ttlMs <= 0) {
    return 'public, s-maxage=30, stale-while-revalidate=30';
  }
  const seconds = msToSeconds(ttlMs);
  return `public, s-maxage=${seconds}, stale-while-revalidate=${seconds}`;
};

async function wpFetchJson<T>(url: string, ttlMs: number, tag?: string): Promise<T> {
  const seconds = msToSeconds(ttlMs);

  const init: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {
    headers: {
      Accept: 'application/json',
    },
    signal: AbortSignal.timeout(5000),
  };

  if (ttlMs <= 0) {
    init.next = {
      revalidate: 30,
    };
  } else {
    init.next = {
      revalidate: seconds,
    };
    if (tag) {
      init.next.tags = [tag];
    }
  }

  const response = await fetch(url, init);

  if (!response.ok) {
    console.error('[wpFetchJson] Error response:', response.status, response.statusText);
    throw new Error(`WordPress HTTP ${response.status}: ${response.statusText}`);
  }

  const text = await response.text();
  if (!text) {
    throw new Error('Empty response from WordPress');
  }

  return JSON.parse(text) as T;
}

function withCategoryNames(posts: WordPressPost[]): WordPressPost[] {
  return posts.map((post) => {
    const categories_names =
      post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) || [];
    const categories_slugs =
      post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.slug) || [];
    return {
      ...post,
      categories_names,
      categories_slugs,
    };
  });
}

export async function getPosts(
  perPage: number,
  page: number,
): Promise<WordPressPost[]> {
  const url = `${WP_API_URL}/posts?_embed&per_page=${perPage}&page=${page}&orderby=date&order=desc`;
  const data = await wpFetchJson<WordPressPost[]>(
    url,
    WORDPRESS_CONFIG.CACHE_TTL.POSTS_LIST,
    'posts-list', // Cache tag for on-demand revalidation
  );
  return withCategoryNames(data);
}

const normalizeText = (value: string): string => {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
};

export async function getCategoryIdBySlug(
  slug: string,
): Promise<number | null> {
  const exactUrl = `${WP_API_URL}/categories?slug=${encodeURIComponent(slug)}`;
  const exact = await wpFetchJson<any[]>(
    exactUrl,
    WORDPRESS_CONFIG.CACHE_TTL.CATEGORIES,
    'categories', // Cache tag
  );
  if (Array.isArray(exact) && exact.length > 0) {
    return exact[0].id ?? null;
  }

  const searchUrl = `${WP_API_URL}/categories?search=${encodeURIComponent(
    slug,
  )}`;
  const cats = await wpFetchJson<any[]>(
    searchUrl,
    WORDPRESS_CONFIG.CACHE_TTL.CATEGORIES,
    'categories', // Cache tag
  );

  if (!Array.isArray(cats) || cats.length === 0) {
    return null;
  }

  const norm = normalizeText(slug);
  const best =
    cats.find((c: any) => normalizeText(c.slug) === norm) ??
    cats.find((c: any) => normalizeText(c.name).includes(norm));

  return best ? best.id : cats[0].id ?? null;
}

export async function getPostsByCategoryId(
  categoryId: number,
  perPage: number,
  page: number,
): Promise<WordPressPost[]> {
  const url = `${WP_API_URL}/posts?_embed&categories=${categoryId}&per_page=${perPage}&page=${page}&orderby=date&order=desc`;

  const data = await wpFetchJson<WordPressPost[]>(
    url,
    WORDPRESS_CONFIG.CACHE_TTL.POSTS_LIST,
    'posts-list', // Cache tag
  );

  return withCategoryNames(data);
}

export async function getPostsByCategorySlug(
  slug: string,
  perPage: number,
  page: number,
): Promise<WordPressPost[]> {
  const categoryId = await getCategoryIdBySlug(slug);
  if (!categoryId) {
    return [];
  }
  return getPostsByCategoryId(categoryId, perPage, page);
}

export async function getPostBySlug(
  slug: string,
): Promise<WordPressPost | null> {
  const url = `${WP_API_URL}/posts?_embed&slug=${encodeURIComponent(slug)}`;

  const data = await wpFetchJson<WordPressPost[]>(
    url,
    WORDPRESS_CONFIG.CACHE_TTL.POST_SINGLE,
    `post-${slug}`, // Cache tag with slug
  );

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  const [post] = data;
  const [postWithCategories] = withCategoryNames([post]);

  return postWithCategories;
}

export const getPostsListCacheControl = (): string =>
  createCacheControlHeader(WORDPRESS_CONFIG.CACHE_TTL.POSTS_LIST);

export const getPostSingleCacheControl = (): string =>
  createCacheControlHeader(WORDPRESS_CONFIG.CACHE_TTL.POST_SINGLE);

export const getCategoryPostsCacheControl = (): string =>
  createCacheControlHeader(WORDPRESS_CONFIG.CACHE_TTL.POSTS_LIST);

/**
 * Normaliza nome de categoria para matching consistente
 * Remove acentos, converte para lowercase, remove espaços extras
 */
function normalizeCategoryName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/\s+/g, '-') // Espaços → hífens
    .replace(/[^a-z0-9-]/g, ''); // Remove caracteres especiais
}

/**
 * Otimização: Busca posts uma vez e filtra por múltiplas categorias localmente
 * Evita requisições duplicadas quando posts estão em múltiplas categorias
 * 
 * @example
 * const grouped = await getPostsGroupedByCategories(50);
 * const noticias = grouped['noticias'] || [];
 * const politica = grouped['politica'] || [];
 */
export async function getPostsGroupedByCategories(
  perPage: number = 50,
  page: number = 1
): Promise<Record<string, WordPressPost[]>> {
  // Busca todos os posts de uma vez (1 requisição!)
  const allPosts = await getPosts(perPage, page);

  // Agrupa por categoria usando slugs (já normalizados pelo WordPress)
  const grouped: Record<string, WordPressPost[]> = {};

  for (const post of allPosts) {
    // Use slugs instead of names for consistent grouping
    if (post.categories_slugs && Array.isArray(post.categories_slugs)) {
      for (const categorySlug of post.categories_slugs) {
        const key = categorySlug; // Already normalized by WordPress

        if (!grouped[key]) {
          grouped[key] = [];
        }

        // Evita duplicatas no mesmo array
        if (!grouped[key].some(p => p.id === post.id)) {
          grouped[key].push(post);
        }
      }
    }
  }

  return grouped;
}
