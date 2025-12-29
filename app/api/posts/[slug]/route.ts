import { WORDPRESS_CONFIG } from '../../../../src/config/wordpress';
import {
  getPostBySlug,
  getPostSingleCacheControl,
} from '../../../../src/server/wordpress';

export async function GET(
  _request: any,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug é obrigatório' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=120',
      },
    });
  }

  try {
    const post = await getPostBySlug(slug);

    if (!post) {
      return new Response(
        JSON.stringify({ error: 'Notícia não encontrada' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=120',
          },
        },
      );
    }

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('Error in /api/posts/[slug]', error);
    return new Response(
      JSON.stringify({ error: 'Falha ao carregar notícia.' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=120',
        },
      },
    );
  }
}
