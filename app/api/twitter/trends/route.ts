type ApiTrendingTopic = {
  tag: string;
  tweets: string;
  url: string;
};

const BRAZIL_WOEID = 23424768;

function formatTweetCount(count: number | null): string {
  if (!count || count <= 0) return 'N/A';
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}

async function fetchFromTwitterApi(): Promise<ApiTrendingTopic[] | null> {
  const bearer = process.env.TWITTER_BEARER_TOKEN;

  if (!bearer) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.twitter.com/1.1/trends/place.json?id=${BRAZIL_WOEID}`,
      {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!Array.isArray(data) || !data[0] || !Array.isArray(data[0].trends)) {
      return null;
    }

    const trends = data[0].trends.slice(0, 7).map((trend: any) => ({
      tag: trend.name as string,
      tweets: formatTweetCount(trend.tweet_volume ?? null),
      url: `https://twitter.com/search?q=${encodeURIComponent(trend.name as string)}`,
    }));

    return trends;
  } catch {
    return null;
  }
}

async function fetchFromGetDayTrends(): Promise<ApiTrendingTopic[] | null> {
  try {
    const response = await fetch('https://getdaytrends.com/brazil/', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();

    const regex = /<td class="main"><a[^>]*>([^<]+)<\/a>/g;
    const names: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(html)) !== null) {
      names.push(match[1].trim());
      if (names.length >= 10) break;
    }

    if (names.length === 0) {
      return null;
    }

    const trends: ApiTrendingTopic[] = names.map((name) => ({
      tag: name,
      tweets: 'N/A',
      url: `https://twitter.com/search?q=${encodeURIComponent(name)}`,
    }));

    return trends;
  } catch {
    return null;
  }
}

function getFallbackTrends(): ApiTrendingTopic[] {
  return [
    { tag: '#Brasil', tweets: '127K', url: 'https://twitter.com/search?q=%23Brasil' },
    { tag: '#Política', tweets: '89K', url: 'https://twitter.com/search?q=%23Pol%C3%ADtica' },
    { tag: '#Economia', tweets: '56K', url: 'https://twitter.com/search?q=%23Economia' },
    { tag: '#Esportes', tweets: '142K', url: 'https://twitter.com/search?q=%23Esportes' },
    { tag: '#Tecnologia', tweets: '34K', url: 'https://twitter.com/search?q=%23Tecnologia' },
  ];
}

export async function GET(): Promise<Response> {
  try {
    let trends = await fetchFromTwitterApi();

    if (!trends) {
      trends = await fetchFromGetDayTrends();
    }

    if (!trends) {
      trends = getFallbackTrends();
    }

    return new Response(JSON.stringify(trends), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch {
    const trends = getFallbackTrends();
    return new Response(JSON.stringify(trends), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  }
}
