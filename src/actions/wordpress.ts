'use server';

import {
    getPosts,
    getPostBySlug,
    getPostsByCategorySlug,
    getPostsGroupedByCategories // If needed by client dynamics, typically server-only
} from '../server/wordpress';
import { WordPressPost } from '../types/wordpress';

// Re-export or Wrap functions for client usage via Server Actions

export async function fetchPostsAction(perPage: number = 10, page: number = 1): Promise<WordPressPost[]> {
    try {
        return await getPosts(perPage, page);
    } catch (error) {
        console.error('Action fetchPosts error:', error);
        return [];
    }
}

export async function fetchPostBySlugAction(slug: string): Promise<WordPressPost | null> {
    try {
        return await getPostBySlug(slug);
    } catch (error) {
        console.error('Action fetchPostBySlug error:', error);
        return null;
    }
}

export async function fetchPostsByCategorySlugAction(slug: string, perPage: number = 10, page: number = 1): Promise<WordPressPost[]> {
    try {
        return await getPostsByCategorySlug(slug, perPage, page);
    } catch (error) {
        console.error('Action fetchPostsByCategorySlug error:', error);
        return [];
    }
}
