interface TrendingTopic {
  tag: string;
  tweets: string;
  category?: string;
  url?: string;
}

export async function fetchBrazilTrends(): Promise<TrendingTopic[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);

    const response = await fetch('/api/twitter/trends', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return getFallbackTrends();
    }

    const contentType = response.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      return getFallbackTrends();
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      return data.slice(0, 7).map((item: any) => ({
        tag: typeof item.tag === 'string' ? item.tag : String(item.tag ?? ''),
        tweets: typeof item.tweets === 'string' ? item.tweets : 'N/A',
        url:
          typeof item.url === 'string'
            ? item.url
            : `https://twitter.com/search?q=${encodeURIComponent(
                String(item.tag ?? ''),
              )}`,
      }));
    }

    return getFallbackTrends();
  } catch (error) {
    // Usa fallback silenciosamente (sem poluir console)
    // O erro é esperado quando PHP não está rodando
    return getFallbackTrends();
  }
}

function formatTweetCount(count: number | null): string {
  if (!count) return 'N/A';
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

function getFallbackTrends(): TrendingTopic[] {
  return [
    { tag: '#Brasil', tweets: '127K', category: 'Política' },
    { tag: '#Economia', tweets: '89K', category: 'Negócios' },
    { tag: '#Tecnologia', tweets: '56K', category: 'Tech' },
    { tag: '#Esportes', tweets: '142K', category: 'Esportes' },
    { tag: '#Cultura', tweets: '34K', category: 'Entretenimento' },
    { tag: '#Saúde', tweets: '67K', category: 'Saúde' },
    { tag: '#Educação', tweets: '45K', category: 'Educação' },
  ];
}
