import { useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { WordPressPost } from '../types/wordpress';
import { WORDPRESS_CONFIG } from '../config/wordpress';

const WP_API_URL = WORDPRESS_CONFIG.API_BASE;

import {
  fetchPostsAction,
  fetchPostBySlugAction,
  fetchPostsByCategorySlugAction
} from '../actions/wordpress';

export async function fetchPosts(perPage: number = 10): Promise<WordPressPost[]> {
  // Use Server Action directly
  return await fetchPostsAction(perPage, 1);
}

export async function fetchPostBySlug(slug: string): Promise<WordPressPost | null> {
  return await fetchPostBySlugAction(slug);
}

async function fetchPostsByCategorySlug(slug: string, perPage: number = 50): Promise<WordPressPost[]> {
  return await fetchPostsByCategorySlugAction(slug, perPage, 1);
}

// Helper para normalizar texto (mantido pois é usado localmente)
function normalizeText(s: string): string {
  return s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

// Client-side helper that still needs API or logic to find ID?
// Actually, we can move this logic to the server too, but let's keep it simple for now.
// However, since we are removing API dependence, we should probably check if categories 
// can be fetched via action too. For now let's simplify paginated fetchers 
// by using the underlying server actions if capable, or keep them if they rely on specific logic not yet ported.

// NOTE: The paginated fetchers below (fetchPostsPaginated, etc) were constructing URLs manually.
// To fully remove API dependency, we should expose paginated actions.
// For now, let's update them to use the action with page param.

async function fetchPostsPaginated(perPage: number = 10, page: number = 1): Promise<WordPressPost[]> {
  // Use Server Action
  return await fetchPostsAction(perPage, page);
}

async function fetchPostsByCategorySlugPaginated(
  slug: string,
  perPage: number = 10,
  page: number = 1
): Promise<WordPressPost[]> {
  // Use Server Action
  return await fetchPostsByCategorySlugAction(slug, perPage, page);
}

export const postsKeys = {
  all: ['posts'] as const,
  lists: () => [...postsKeys.all, 'list'] as const,
  list: (perPage: number) => [...postsKeys.lists(), perPage] as const,
  categories: () => [...postsKeys.all, 'category'] as const,
  category: (slug: string, perPage: number) => [...postsKeys.categories(), slug, perPage] as const,
  infinite: (slug: string, perPage: number) => [...postsKeys.all, 'infinite', slug, perPage] as const,
};

export function usePosts(perPage: number = 30) {
  return useQuery({
    queryKey: postsKeys.list(perPage),
    queryFn: () => fetchPosts(perPage),
    staleTime: 1000 * 60 * 5,
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

export function useInfinitePosts(perPage: number = 10) {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite', perPage],
    queryFn: ({ pageParam = 1 }) => fetchPostsPaginated(perPage, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < perPage) return undefined;
      return allPages.length + 1;
    },
  });
}

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
  });
}

export function useInvalidatePosts() {
  const queryClient = useQueryClient();

  const invalidateAllPosts = () => {
    queryClient.invalidateQueries({ queryKey: postsKeys.all });
  };

  const invalidateCategory = (slug: string) => {
    queryClient.invalidateQueries({ queryKey: postsKeys.categories() });
    queryClient.invalidateQueries({ queryKey: ['posts', 'infinite', slug] });
  };

  return { invalidateAllPosts, invalidateCategory };
}