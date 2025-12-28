import { WordPressPost } from '@/types/wordpress';

/**
 * Extrai URL da imagem destacada do post
 */
export function getPostImage(post: WordPressPost): string {
    const fallback = '/placeholder.png';

    if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
        return post._embedded['wp:featuredmedia'][0].source_url;
    }

    return fallback;
}

/**
 * Extrai o path relativo de uma URL WordPress para TwicPics
 * Rejeita URLs externas para evitar erros do TwicPics
 */
export function extractImagePath(imageUrl: string): string {
    if (!imageUrl) return '/placeholder.png';

    try {
        if (imageUrl.startsWith('/')) {
            return imageUrl;
        }

        if (imageUrl.startsWith('http')) {
            const url = new URL(imageUrl);

            const isWordPressDomain = url.hostname.includes('primeiranews.com.br') ||
                url.hostname.includes('primeiranews.twic.pics');

            if (!isWordPressDomain) {
                console.warn('[TwicPics] External URL rejected:', url.hostname);
                return '/placeholder.png';
            }

            return url.pathname;
        }

        return imageUrl;
    } catch (e) {
        console.warn('Failed to extract image path:', imageUrl, e);
        return '/placeholder.png';
    }
}

/**
 * Decodifica entidades HTML (ex: &#8220; -> ", &amp; -> &)
 */
export function decodeHtmlEntities(text: string): string {
    const entities: Record<string, string> = {
        '&#8220;': '"', '&#8221;': '"',
        '&#8216;': "'", '&#8217;': "'",
        '&#8211;': '–', '&#8212;': '—',
        '&amp;': '&', '&lt;': '<', '&gt;': '>',
        '&quot;': '"', '&apos;': "'", '&nbsp;': ' ',
    };

    return text
        .replace(/&#?\w+;/g, match => entities[match] || match)
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

/**
 * Retorna o título limpo do post (sem HTML e entidades decodificadas)
 */
export function getPostTitle(post: WordPressPost): string {
    const title = post.title.rendered.replace(/<[^>]*>/g, '');
    return decodeHtmlEntities(title);
}
