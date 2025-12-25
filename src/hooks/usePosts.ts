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
  categories: () => [...postsKeys.all, 'category'] as const,
  category: (slug: string, perPage: number) => [...postsKeys.categories(), slug, perPage] as const,
  infinite: (slug: string, perPage: number) => [...postsKeys.all, 'infinite', slug, perPage] as const,
};
/**
 * Hook para buscar posts gerais
 * @param perPage Número de posts por página (padrão: 30)
 */
export function usePosts(perPage: number = 30) {
  return useQuery({
    queryKey: postsKeys.list(perPage),
    queryFn: () => fetchPosts(perPage),
    staleTime: 1000 * 60 * 5, // 5 minutos: evita refetch desnecessário ao navegar
  });
}

export function usePostsByCategory(slug: string, perPage: number = 20, enabled: boolean = true) {
  return useQuery({
    queryKey: postsKeys.category(slug, perPage),
    queryFn: () => fetchPostsByCategorySlug(slug, perPage),
    enabled: enabled && !!slug,
  });
}

export function usePrefetchPosts() {
  const queryClient = useQueryClient();

  const prefetchPosts = (perPage: number = 30) => {
    queryClient.prefetchQuery({
      queryKey: postsKeys.list(perPage),
      queryFn: () => fetchPosts(perPage),
    });
  };

  const prefetchCategory = (slug: string, perPage: number = 30) => {
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

export function useInvalidatePosts() {
  const queryClient = useQueryClient();

  const invalidateAllPosts = () => {
    queryClient.invalidateQueries({ queryKey: postsKeys.all });
  };

  const invalidateCategory = (slug: string) => {
    // Invalida tanto a lista simples quanto a infinita daquela categoria
    queryClient.invalidateQueries({ queryKey: postsKeys.categories() });
    queryClient.invalidateQueries({ queryKey: ['posts', 'infinite', slug] });
  };

  return { invalidateAllPosts, invalidateCategory };
}