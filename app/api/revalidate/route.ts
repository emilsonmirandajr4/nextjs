import { updateTag } from 'next/cache';

/**
 * Webhook endpoint to revalidate cached content on-demand
 * 
 * Usage from WordPress:
 * - Configure a WordPress webhook to POST to this endpoint
 * - Send request with header: Authorization: Bearer YOUR_REVALIDATE_SECRET
 * - Body: { "tag": "posts-list" } or { "tag": "categories" }
 * 
 * Example curl:
 * curl -X POST https://seusite.com/api/revalidate \
 *   -H "Authorization: Bearer your-secret-here" \
 *   -H "Content-Type: application/json" \
 *   -d '{"tag":"posts-list"}'
 */

const REVALIDATE_SECRET = process.env.NEXT_PUBLIC_REVALIDATE_SECRET;

if (!REVALIDATE_SECRET) {
  console.warn('⚠️ NEXT_PUBLIC_REVALIDATE_SECRET not set. On-demand revalidation disabled.');
}

export async function POST(request: Request) {
  try {
    // Verify authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!REVALIDATE_SECRET || token !== REVALIDATE_SECRET) {
      return new Response(
        JSON.stringify({ 
          error: 'Unauthorized - Invalid or missing authorization token' 
        }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse request body
    const body = await request.json();
    const { tag } = body;

    if (!tag || typeof tag !== 'string') {
      return new Response(
        JSON.stringify({ 
          error: 'Missing or invalid "tag" parameter. Expected: { "tag": "posts-list" }' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Update the cache tag (Next.js v16 way)
    updateTag(tag);

    console.log(`✅ Cache updated for tag: ${tag}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Cache updated for tag: ${tag}`,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('❌ Revalidation error:', error);

    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Optional: GET endpoint for health check
export async function GET(request: Request) {
  return new Response(
    JSON.stringify({ 
      message: 'Revalidation API is running',
      endpoints: {
        POST: {
          description: 'Revalidate cache for a specific tag',
          required_header: 'Authorization: Bearer YOUR_SECRET',
          body: { tag: 'posts-list | categories | post-{slug}' }
        }
      }
    }),
    { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

