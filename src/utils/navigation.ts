import { WordPressPost } from '../types/wordpress';

/**
 * Extrai ano, mês, categoria e slug do link do WordPress
 * Formato: /%year%/%monthnum%/%category%/%postname%/
 */
function parseWordPressUrl(link: string): { year: string; month: string; category: string; postname: string } | null {
  // Exemplo: https://primeiranews.com/2024/11/politica/bolsonaro-sofre-derrota/
  const match = link.match(/\/(\d{4})\/(\d{2})\/([^\/]+)\/([^\/]+)\/?$/);
  if (match) {
    return {
      year: match[1],
      month: match[2],
      category: match[3],
      postname: match[4]
    };
  }
  return null;
}

/**
 * Retorna a URL amigável para um post
 * Usa o link do WordPress que já tem a estrutura correta
 * Se o slug não existir, usa o ID como fallback
 */
export function getPostUrl(post: WordPressPost | { id: number; slug?: string; link?: string; date?: string }): string {
  // Preferimos sempre o slug simples, pois nossa rota dinâmica é /[slug]
  if (post.slug) {
    return `/${post.slug}`;
  }

  if ('link' in post && post.link) {
    const parsed = parseWordPressUrl(post.link);
    if (parsed) {
      return `/${parsed.postname}`;
    }
  }
  
  // Último recurso: ID
  return `/post/${post.id}`;
}
