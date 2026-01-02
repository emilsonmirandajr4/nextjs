import { WordPressPost } from '../types/wordpress';

/**
 * Extrai ano, mês, categoria e slug do link do WordPress
 * Formato: /%year%/%monthnum%/%category%/%postname%/
 */
function parseWordPressUrl(link: string): { year: string; month: string; category: string; postname: string } | null {

  const match = link.match(/\/(\d{4})\/(\d{2})\/([^/]+)\/([^/]+)\/?$/);
  if (match) {
    return {
      year: match[1],
      month: match[2],
      category: match[3],
      postname: match[4]
    };
  }

  // Fallback: tenta extrair apenas o último segmento como slug
  const simpleMatch = link.match(/\/([^/]+)\/?$/);
  if (simpleMatch && simpleMatch[1]) {
    return {
      year: '',
      month: '',
      category: '',
      postname: simpleMatch[1]
    };
  }

  return null;
}

export function getPostUrl(post: WordPressPost | { id: number; slug?: string; link?: string; date?: string }): string {
  // Tenta extrair dados do link do WordPress
  if ('link' in post && post.link) {
    const parsed = parseWordPressUrl(post.link);
    if (parsed && parsed.year && parsed.month && parsed.category && parsed.postname) {
      // Formato completo: /ano/mes/categoria/slug
      return `/${parsed.year}/${parsed.month}/${parsed.category}/${parsed.postname}`;
    }

    // Se não conseguiu parsear tudo mas tem pelo menos o slug
    if (parsed && parsed.postname) {
      // Tenta extrair ano/mes da data se disponível
      if ('date' in post && post.date) {
        try {
          const date = new Date(post.date);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          // Usar categoria padrão se não tiver
          const category = parsed.category || 'noticias';
          return `/${year}/${month}/${category}/${parsed.postname}`;
        } catch {
          console.error('Failed to parse date:', post.date);
        }
      }
    }

    // Fallback: extrai última parte da URL
    try {
      const url = new URL(post.link);
      const parts = url.pathname.split('/').filter(p => p);
      if (parts.length >= 4) {
        // Assume formato: ano/mes/categoria/slug
        return `/${parts[parts.length - 4]}/${parts[parts.length - 3]}/${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
      } else if (parts.length > 0) {
        // Se tiver apenas o slug, usa caminho genérico (sem data atual para evitar erro de static generation)
        return `/post/${parts[parts.length - 1]}`;
      }
    } catch {
      console.error('Failed to parse post link:', post.link);
    }
  }

  // Verifica se o slug é válido (não é um placeholder como %%drp:slug:...%%)
  const hasValidSlug = post.slug && !post.slug.startsWith('%%') && !post.slug.includes('%%');

  if (hasValidSlug && 'date' in post && post.date) {
    try {
      const date = new Date(post.date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `/${year}/${month}/noticias/${post.slug}`;
    } catch {
      console.error('Failed to parse date for slug:', post.slug);
    }
  }

  // Último recurso: ID
  return `/post/${post.id}`;
}
