import { WORDPRESS_CONFIG } from '../../../../src/config/wordpress';
import {
  getPostBySlug,
  getPostSingleCacheControl,
} from '../../../../src/server/wordpress';

// Nota: Edge Runtime removido devido a conflito com cacheComponents
// O cache já está otimizado via cacheComponents no next.config.mjs

export async function GET(
  _request: any,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  console.log('[API] Received request for slug:', slug);

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug é obrigatório' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, no-store',
      },
    });
  }

  try {
    console.log('[API] Fetching post from WordPress...');
    const post = await getPostBySlug(slug);
    console.log('[API] Post result:', post ? 'Found' : 'Not found');

    if (!post) {
      return new Response(
        JSON.stringify({ error: 'Notícia não encontrada' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=60',
          },
        },
      );
    }

    return new Response(JSON.stringify(post), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': getPostSingleCacheControl(),
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
          'Cache-Control': 'private, no-store',
        },
      },
    );
  }
}
