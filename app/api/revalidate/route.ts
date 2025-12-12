import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const REVALIDATE_SECRET = process.env.WEBHOOK_SECRET;
const MAX_TAGS_PER_REQUEST = 10; // Evita spam

// Simples rate limiting em memória (funciona em serverless)
const requestLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000; // 1 minuto
const MAX_REQUESTS_PER_MINUTE = 100; // 100 requisições por minuto

/**
 * Verifica rate limiting por IP
 */
function checkRateLimit(ip: string | null): boolean {
  if (!ip) return true; // Se não conseguir IP, deixa passar

  const now = Date.now();
  const requests = requestLog.get(ip) || [];
  
  // Remove requisições fora da janela
  const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS_PER_MINUTE) {
    return false; // Rate limit atingido
  }
  
  recentRequests.push(now);
  requestLog.set(ip, recentRequests);
  
  return true;
}

/**
 * Extrai IP do cliente
 */
function getClientIP(request: NextRequest): string | null {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    null
  );
}

/**
 * Log estruturado com timestamp
 */
function logEvent(level: 'info' | 'warn' | 'error', message: string, data?: any) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] [Next.js Webhook] ${message}`;
  
  if (data) {
    console.log(logMessage, data);
  } else {
    console.log(logMessage);
  }
}

if (!REVALIDATE_SECRET) {
  console.warn(
    '⚠️  [Next.js Webhook] WEBHOOK_SECRET não definida no .env. ' +
    'Revalidação sob demanda desativada.'
  );
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const clientIP = getClientIP(request);

  try {
    // ============================================
    // 1. VALIDAR RATE LIMITING
    // ============================================
    if (!checkRateLimit(clientIP)) {
      logEvent('warn', 'Rate limit atingido', { ip: clientIP });
      return NextResponse.json(
        { 
          error: 'Too many requests. Try again later.',
          retryAfter: 60
        },
        { 
          status: 429,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
            'Retry-After': '60'
          }
        }
      );
    }

    // ============================================
    // 2. VALIDAR AUTENTICAÇÃO
    // ============================================
    if (!REVALIDATE_SECRET) {
      logEvent('error', 'WEBHOOK_SECRET não configurada');
      return NextResponse.json(
        { error: 'Webhook não configurado no servidor' },
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
        }
      );
    }

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '').trim();

    if (!token || token !== REVALIDATE_SECRET) {
      logEvent('warn', 'Tentativa de acesso não autorizado', { 
        ip: clientIP,
        hasToken: !!token 
      });
      
      return NextResponse.json(
        { 
          error: 'Unauthorized - Invalid or missing authorization token' 
        },
        { 
          status: 401,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

    // ============================================
    // 3. VALIDAR BODY
    // ============================================
    const body = await request.json();
    let { tag, tags } = body;

    // Aceita tanto "tag" (singular) quanto "tags" (array)
    const tagsToRevalidate: string[] = [];

    if (tag && typeof tag === 'string') {
      tagsToRevalidate.push(tag);
    } else if (tags && Array.isArray(tags)) {
      tagsToRevalidate.push(...tags.filter(t => typeof t === 'string'));
    }

    // Validações
    if (tagsToRevalidate.length === 0) {
      logEvent('warn', 'Nenhuma tag válida fornecida', { body });
      return NextResponse.json(
        { 
          error: 'Missing or invalid "tag" or "tags" parameter',
          example: { 
            tag: 'posts-list',
            // ou
            tags: ['posts-list', 'categories']
          }
        },
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

    if (tagsToRevalidate.length > MAX_TAGS_PER_REQUEST) {
      logEvent('warn', `Muitas tags solicitadas (${tagsToRevalidate.length})`, { ip: clientIP });
      return NextResponse.json(
        { 
          error: `Máximo de ${MAX_TAGS_PER_REQUEST} tags por requisição`
        },
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        }
      );
    }
// ============================================
// 4. REVALIDAR TAGS
// ============================================
const revalidationResults = {
  success: [] as string[],
  failed: [] as string[]
};

for (const t of tagsToRevalidate) {
  try {
    // ✅ CORRETO - com await e o segundo argumento (profile)
    await revalidateTag(t, 'max');
    
    revalidationResults.success.push(t);
    logEvent('info', `Cache revalidado com sucesso`, { tag: t });
  } catch (error) {
    console.error(`Erro ao revalidar tag ${t}:`, error);
    revalidationResults.failed.push(t);
    logEvent('error', `Erro ao revalidar cache`, { tag: t, error });
  }
}

// ============================================
// 5. RESPOSTA FINAL
// ============================================
const processingTime = Date.now() - startTime;
const allSuccess = revalidationResults.failed.length === 0;

logEvent('info', `Revalidação concluída`, {
  tags: tagsToRevalidate.length,
  success: revalidationResults.success.length,
  failed: revalidationResults.failed.length,
  processingTimeMs: processingTime
});

return NextResponse.json(
  {
    success: allSuccess,
    message: allSuccess 
      ? `${revalidationResults.success.length} tag(s) revalidada(s) com sucesso`
      : `${revalidationResults.success.length} sucesso, ${revalidationResults.failed.length} erro`,
    data: {
      revalidated: revalidationResults.success,
      failed: revalidationResults.failed,
      processingTimeMs: processingTime
    },
    timestamp: new Date().toISOString()
  },
  { 
    status: allSuccess ? 200 : 207, // 207 = Multi-Status
    headers: { 
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  }
);

} catch (error) {
  const processingTime = Date.now() - startTime;
  
  logEvent('error', 'Erro geral na revalidação', {
    ip: clientIP,
    error: error instanceof Error ? error.message : String(error),
    processingTimeMs: processingTime
  });

  return NextResponse.json(
    { 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    },
    { 
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    }
  );
}
}

/**
 * Health check endpoint
 */
export async function GET(request: NextRequest) {
  const isConfigured = !!REVALIDATE_SECRET;

  return NextResponse.json(
    {
      status: isConfigured ? 'operational' : 'misconfigured',
      message: isConfigured 
        ? 'Revalidation API is running'
        : 'WEBHOOK_SECRET not configured',
      endpoints: {
        POST: {
          description: 'Revalidate cache for specific tag(s)',
          authentication: 'Authorization: Bearer YOUR_WEBHOOK_SECRET',
          examples: {
            singleTag: {
              body: { tag: 'posts-list' }
            },
            multipleTags: {
              body: { tags: ['posts-list', 'post-seu-slug', 'category-noticias'] }
            }
          }
        }
      },
      timestamp: new Date().toISOString()
    },
    { 
      status: isConfigured ? 200 : 500,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    }
  );
}