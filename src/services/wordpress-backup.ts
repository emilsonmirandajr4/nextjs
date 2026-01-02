'use client';

import { WordPressPost } from '../types/wordpress';
import { WORDPRESS_CONFIG } from '../config/wordpress';

const WP_API_URL = WORDPRESS_CONFIG.API_BASE;

export async function fetchPosts(perPage: number = 10): Promise<WordPressPost[]> {
  try {
    const url = `/api/posts?perPage=${perPage}&page=1`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Erro ao carregar notícias:', response.status, response.statusText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();
    if (!text) {
      return [];
    }

    const data = JSON.parse(text) as WordPressPost[];

    return data.map((post: WordPressPost) => {
      const categories_names = post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) || [];
      return {
        ...post,
        categories_names,
      };
    });
  } catch (error) {
    console.error('Error fetching posts from API:', error);
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      console.error('Sem conexão com a internet.');
    } else {
      console.error('Falha ao conectar com o servidor.');
    }
    return [];
  }
}

export function getPostImage(post: WordPressPost): string {
  // Placeholder relativo - TwicPics não funciona com URLs externas
  const fallback = '/placeholder.png';

  if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }

  return fallback;
}

/**
 * Extracts the relative path from a WordPress image URL for TwicPics.
 * TwicPics domain will be prepended automatically by the component.
 * Rejects external URLs (non-WordPress domains) to prevent TwicPics errors.
 */
export function extractImagePath(imageUrl: string): string {
  if (!imageUrl) return '/placeholder.png';

  try {
    // Se já é um path relativo, retorna direto
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }

    // Remove o domínio mantendo apenas o path
    if (imageUrl.startsWith('http')) {
      const url = new URL(imageUrl);

      const isWordPressDomain = url.hostname.includes('primeiranews.com.br') ||
        url.hostname.includes('primeiranews.twic.pics');

      if (!isWordPressDomain) {
        console.warn('[TwicPics] External URL rejected:', url.hostname);
        return '/placeholder.png';
      }

      return url.pathname;
    }

    return imageUrl;
  } catch (e) {
    console.warn('Failed to extract image path:', imageUrl, e);
    return '/placeholder.png';
  }
}

// Decodifica entidades HTML (ex: &#8220; -> ", &amp; -> &)
export function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&#8220;': '"', '&#8221;': '"', // Smart quotes
    '&#8216;': "'", '&#8217;': "'", // Smart apostrophes
    '&#8211;': '–', '&#8212;': '—', // Dashes
    '&amp;': '&', '&lt;': '<', '&gt;': '>',
    '&quot;': '"', '&apos;': "'", '&nbsp;': ' ',
  };

  return text
    .replace(/&#?\w+;/g, match => entities[match] || match)
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

export function getPostTitle(post: WordPressPost): string {
  const title = post.title.rendered.replace(/<[^>]*>/g, '');
  return decodeHtmlEntities(title);
}

export async function fetchPostsByCategory(categoryId: number, perPage: number = 20): Promise<WordPressPost[]> {
  try {
    // Adiciona _embed para trazer imagens e categorias
    const url = `${WP_API_URL}/posts?_embed&categories=${categoryId}&per_page=${perPage}&orderby=date&order=desc`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Erro ao carregar categoria:', response.status, response.statusText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();
    if (!text) {
      console.warn('Nenhuma notícia encontrada nesta categoria.');
      return [];
    }

    const data = JSON.parse(text);

    // Extrai nomes de categorias do _embedded
    return data.map((post: WordPressPost) => {
      const categories_names = post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) || [];
      return {
        ...post,
        categories_names,
      };
    });
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

// Utility: normalize strings (remove diacritics) for comparisons
function normalizeText(s: string): string {
  return s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

export async function fetchCategoryIdBySlug(slug: string): Promise<number | null> {
  try {
    // Try exact slug first - cache for 1 hour
    const exact = await fetch(`${WP_API_URL}/categories?slug=${encodeURIComponent(slug)}`, { next: { revalidate: 3600 } });
    if (exact.ok) {
      const arr = await exact.json();
      if (Array.isArray(arr) && arr.length > 0) return arr[0].id;
    }
    // Fallback: search and pick best match by name/slug - cache for 1 hour
    const res = await fetch(`${WP_API_URL}/categories?search=${encodeURIComponent(slug)}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const cats = await res.json();
    if (!Array.isArray(cats) || cats.length === 0) {
      return null;
    }
    const norm = normalizeText(slug);
    const best = cats.find((c: any) => normalizeText(c.slug) === norm) || cats.find((c: any) => normalizeText(c.name).includes(norm));
    return best ? best.id : cats[0].id;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }
}

export async function fetchPostsByCategorySlug(slug: string, perPage: number = 50): Promise<WordPressPost[]> {
  try {
    const params = new URLSearchParams({
      perPage: String(perPage),
      page: '1',
      categorySlug: slug,
    });
    const url = `/api/posts?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Erro ao carregar categoria:', response.status, response.statusText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();
    if (!text) {
      console.warn('Nenhuma notícia encontrada nesta categoria.');
      return [];
    }

    const data = JSON.parse(text) as WordPressPost[];

    return data.map((post: WordPressPost) => {
      const categories_names = post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) || [];
      return {
        ...post,
        categories_names,
      };
    });
  } catch (error) {
    console.error('Error fetching posts by category from API:', error);
    return [];
  }
}

// Função para buscar posts com paginação (para infinite scroll)
export async function fetchPostsPaginated(perPage: number = 10, page: number = 1): Promise<WordPressPost[]> {
  try {
    const url = `${WP_API_URL}/posts?_embed&per_page=${perPage}&page=${page}&orderby=date&order=desc`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 400) {
        // Página além do limite - retorna array vazio
        return [];
      }
      console.error('Erro ao carregar notícias:', response.status, response.statusText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();
    if (!text) return [];

    const data = JSON.parse(text);

    return data.map((post: WordPressPost) => {
      const categories_names = post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) || [];
      return {
        ...post,
        categories_names,
      };
    });
  } catch (error) {
    console.error('Error fetching paginated posts:', error);
    return [];
  }
}

// Função para buscar posts de categoria com paginação (para infinite scroll)
export async function fetchPostsByCategoryPaginated(
  categoryId: number,
  perPage: number = 10,
  page: number = 1
): Promise<WordPressPost[]> {
  try {
    const url = `${WP_API_URL}/posts?_embed&categories=${categoryId}&per_page=${perPage}&page=${page}&orderby=date&order=desc`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 400) {
        // Página além do limite - retorna array vazio
        return [];
      }
      console.error('Erro ao carregar categoria:', response.status, response.statusText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();
    if (!text) return [];

    const data = JSON.parse(text);

    return data.map((post: WordPressPost) => {
      const categories_names = post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) || [];
      return {
        ...post,
        categories_names,
      };
    });
  } catch (error) {
    console.error('Error fetching paginated category posts:', error);
    return [];
  }
}

// Função para buscar posts de categoria por slug com paginação
export async function fetchPostsByCategorySlugPaginated(
  slug: string,
  perPage: number = 10,
  page: number = 1
): Promise<WordPressPost[]> {
  const catId = await fetchCategoryIdBySlug(slug);
  if (!catId) return [];

  return await fetchPostsByCategoryPaginated(catId, perPage, page);
}

// Função para buscar um post pelo slug
export async function fetchPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const url = `/api/posts/${encodeURIComponent(slug)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      console.error('Erro ao carregar notícia:', response.status, response.statusText);
      return null;
    }

    const text = await response.text();
    if (!text) return null;

    const post = JSON.parse(text) as WordPressPost;
    const categories_names = post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) || [];

    return {
      ...post,
      categories_names,
    };
  } catch (error) {
    console.error('Error fetching post by slug from API:', error);
    return null;
  }
}

