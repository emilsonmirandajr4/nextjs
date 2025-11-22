import { useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { WordPressPost } from '../types/wordpress';
import { 
  fetchPosts, 
  fetchPostsByCategorySlug,
  fetchPostsPaginated,
  fetchPostsByCategorySlugPaginated 
} from '../services/wordpress';

// Keys para cache
export const postsKeys = {
  all: ['posts'] as const,
  lists: () => [...postsKeys.all, 'list'] as const,
  list: (perPage: number) => [...postsKeys.lists(), perPage] as const,
  category: (slug: string, perPage: number) => [...postsKeys.all, 'category', slug, perPage] as const,
};

/**
 * Hook para buscar posts gerais
 * @param perPage Número de posts por página (padrão: 30)
 */
export function usePosts(perPage: number = 30) {
  return useQuery({
    queryKey: postsKeys.list(perPage),
    queryFn: () => fetchPosts(perPage),
    // Usa config global (staleTime: 0) para atualização em tempo real
  });
}

/**
 * Hook para buscar posts por categoria (slug)
 * @param slug Slug da categoria (ex: 'noticias', 'enganadores')
 * @param perPage Número de posts (padrão: 100)
 * @param enabled Se a query deve rodar (padrão: true)
 */
export function usePostsByCategory(slug: string, perPage: number = 100, enabled: boolean = true) {
  return useQuery({
    queryKey: postsKeys.category(slug, perPage),
    queryFn: () => fetchPostsByCategorySlug(slug, perPage),
    enabled: enabled && !!slug, // Só busca se slug existe e enabled=true
    // Usa config global (staleTime: 0) para atualização em tempo real
  });
}

/**
 * Hook para prefetch (pré-carregar) posts
 * Útil para carregar dados antes do usuário navegar
 */
export function usePrefetchPosts() {
  const queryClient = useQueryClient();

  const prefetchPosts = (perPage: number = 30) => {
    queryClient.prefetchQuery({
      queryKey: postsKeys.list(perPage),
      queryFn: () => fetchPosts(perPage),
    });
  };

  const prefetchCategory = (slug: string, perPage: number = 100) => {
    queryClient.prefetchQuery({
      queryKey: postsKeys.category(slug, perPage),
      queryFn: () => fetchPostsByCategorySlug(slug, perPage),
    });
  };

  return { prefetchPosts, prefetchCategory };
}

/**
 * Hook para buscar posts com infinite scroll
 * Carrega posts progressivamente conforme usuário rola a página
 * @param perPage Número de posts por página (padrão: 10)
 */
export function useInfinitePosts(perPage: number = 10) {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite', perPage],
    queryFn: ({ pageParam = 1 }) => fetchPostsPaginated(perPage, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Se a última página tem menos posts que o esperado, não há próxima página
      if (lastPage.length < perPage) return undefined;
      return allPages.length + 1;
    },
    // Usa config global (staleTime: 0) para atualização em tempo real
  });
}

/**
 * Hook para buscar posts por categoria com infinite scroll
 * @param slug Slug da categoria (ex: 'noticias', 'enganadores')
 * @param perPage Número de posts por página (padrão: 10)
 * @param enabled Se a query deve rodar (padrão: true)
 */
export function useInfinitePostsByCategory(
  slug: string, 
  perPage: number = 10, 
  enabled: boolean = true
) {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite', 'category', slug, perPage],
    queryFn: ({ pageParam = 1 }) => fetchPostsByCategorySlugPaginated(slug, perPage, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < perPage) return undefined;
      return allPages.length + 1;
    },
    enabled: enabled && !!slug,
    // Usa config global (staleTime: 0) para atualização em tempo real
  });
}

/**
 * Hook para invalidar (limpar) cache de posts
 * Força uma nova busca na próxima renderização
 */
export function useInvalidatePosts() {
  const queryClient = useQueryClient();

  const invalidateAllPosts = () => {
    queryClient.invalidateQueries({ queryKey: postsKeys.all });
  };

  const invalidateCategory = (slug: string) => {
    queryClient.invalidateQueries({ queryKey: postsKeys.category(slug, 100) });
  };

  return { invalidateAllPosts, invalidateCategory };
}
