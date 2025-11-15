import toast from 'react-hot-toast';
import { WordPressPost } from '../types/wordpress';
import { WORDPRESS_CONFIG } from '../config/wordpress';

const WP_API_URL = WORDPRESS_CONFIG.API_BASE;

export async function fetchPosts(perPage: number = 10): Promise<WordPressPost[]> {
  try {
    // Adiciona _embed para trazer imagens e categorias em uma única requisição
    const url = `${WP_API_URL}/posts?_embed&per_page=${perPage}&orderby=date&order=desc`;
    console.log('Fetching posts from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      toast.error('Erro ao carregar notícias. Tente novamente.');
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();
    if (!text) {
      console.warn('Empty response from API');
      toast('Nenhuma notícia encontrada.', { icon: '⚠️' });
      return [];
    }

    const data = JSON.parse(text);
    console.log('Successfully fetched posts:', data.length);

    // Extrai nomes de categorias do _embedded
    return data.map((post: WordPressPost) => {
      const categories_names = post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) || [];
      return {
        ...post,
        categories_names,
      };
    });
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    if (!navigator.onLine) {
      toast.error('Sem conexão com a internet.');
    } else {
      toast.error('Falha ao conectar com o servidor.');
    }
    return [];
  }
}

export function getPostImage(post: WordPressPost): string {
  const fallback = 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=800';

  if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }

  return fallback;
}

export function getPostTitle(post: WordPressPost): string {
  return post.title.rendered.replace(/<[^>]*>/g, '');
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
    });

    if (!response.ok) {
      toast.error('Erro ao carregar categoria.');
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();
    if (!text) {
      toast('Nenhuma notícia encontrada nesta categoria.', { icon: '⚠️' });
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
    toast.error('Erro ao buscar notícias da categoria.');
    return [];
  }
}

// Utility: normalize strings (remove diacritics) for comparisons
function normalizeText(s: string): string {
  return s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

export async function fetchCategoryIdBySlug(slug: string): Promise<number | null> {
  try {
    // Try exact slug first
    const exact = await fetch(`${WP_API_URL}/categories?slug=${encodeURIComponent(slug)}`);
    if (exact.ok) {
      const arr = await exact.json();
      if (Array.isArray(arr) && arr.length > 0) return arr[0].id;
    }
    // Fallback: search and pick best match by name/slug
    const res = await fetch(`${WP_API_URL}/categories?search=${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const cats = await res.json();
    if (!Array.isArray(cats) || cats.length === 0) {
      toast(`Categoria "${slug}" não encontrada.`, { icon: '⚠️' });
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
  const catId = await fetchCategoryIdBySlug(slug);
  if (!catId) return [];
  
  // fetchPostsByCategory já retorna com categories_names graças ao _embed
  return await fetchPostsByCategory(catId, perPage);
}

// Função para buscar posts com paginação (para infinite scroll)
export async function fetchPostsPaginated(perPage: number = 10, page: number = 1): Promise<WordPressPost[]> {
  try {
    const url = `${WP_API_URL}/posts?_embed&per_page=${perPage}&page=${page}&orderby=date&order=desc`;
    console.log('Fetching paginated posts from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 400) {
        // Página além do limite - retorna array vazio
        return [];
      }
      toast.error('Erro ao carregar notícias.');
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
    console.log('Fetching paginated category posts from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 400) {
        // Página além do limite - retorna array vazio
        return [];
      }
      toast.error('Erro ao carregar categoria.');
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
    const url = `${WP_API_URL}/posts?_embed&slug=${encodeURIComponent(slug)}`;
    console.log('Fetching post by slug:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      toast.error('Erro ao carregar notícia.');
      return null;
    }

    const text = await response.text();
    if (!text) return null;

    const data = JSON.parse(text);
    
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    const post = data[0];
    const categories_names = post._embedded?.['wp:term']?.[0]?.map((cat: any) => cat.name) || [];
    
    return {
      ...post,
      categories_names,
    };
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    toast.error('Erro ao buscar notícia.');
    return null;
  }
}

const fetchWithTimeout = (url: string, timeout = 10000) => {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
};
