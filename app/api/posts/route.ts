import {
  getPosts,
  getPostsByCategorySlug,
  getPostsListCacheControl,
} from '../../../src/server/wordpress';

// Nota: Edge Runtime removido devido a conflito com cacheComponents
// O cache já está otimizado via cacheComponents no next.config.mjs

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const perPageParam = searchParams.get('perPage') ?? '20';
  const pageParam = searchParams.get('page') ?? '1';
  const categorySlug = searchParams.get('categorySlug') ?? undefined;

  const perPage = Number(perPageParam);
  const page = Number(pageParam);

  const safePerPage = Number.isFinite(perPage) && perPage > 0 ? perPage : 20;
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;

  try {
    const posts = categorySlug
      ? await getPostsByCategorySlug(categorySlug, safePerPage, safePage)
      : await getPosts(safePerPage, safePage);

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, no-store',
      },
    });
  } catch (error) {
    console.error('Error in /api/posts', error);
    return new Response(
      JSON.stringify({ error: 'Falha ao carregar notícias.' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'private, no-store',
        },
      },
    );
  }
}
