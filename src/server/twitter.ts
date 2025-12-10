// Server-side function to fetch Twitter trends
// This runs on the server and can be called from Server Components
//
// IMPORTANT: All fetch operations have a 1.5-second timeout to prevent
// the server from hanging if external APIs are slow or unresponsive.
// This ensures the home page always loads quickly, falling back to
// static trends if APIs fail or timeout.

type TrendingTopic = {
  tag: string;
  tweets: string;
  category?: string;
  url?: string;
};

const BRAZIL_WOEID = 23424768;

function formatTweetCount(count: number | null): string {
  if (!count || count <= 0) return "N/A";
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}

async function fetchFromTwitterApi(): Promise<TrendingTopic[] | null> {
  const bearer = process.env.TWITTER_BEARER_TOKEN;

  if (!bearer) {
    return null;
  }

  try {
    // Timeout protection: abort fetch after 1.3 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1300);

    const response = await fetch(
      `https://api.twitter.com/1.1/trends/place.json?id=${BRAZIL_WOEID}`,
      {
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
        signal: controller.signal,
        next: { revalidate: 300 }, // Cache for 5 minutes
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!Array.isArray(data) || !data[0] || !Array.isArray(data[0].trends)) {
      return null;
    }

    const trends = data[0].trends
      .slice(0, 7)
      .map((trend: { name: string; tweet_volume?: number | null }) => ({
        tag: trend.name as string,
        tweets: formatTweetCount(trend.tweet_volume ?? null),
        url: `https://twitter.com/search?q=${encodeURIComponent(
          trend.name as string,
        )}`,
      }));

    return trends;
  } catch {
    return null;
  }
}

async function fetchFromGetDayTrends(): Promise<TrendingTopic[] | null> {
  try {
    // Timeout protection: abort fetch after 1.3 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1300);

    const response = await fetch("https://getdaytrends.com/brazil/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      },
      signal: controller.signal,
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    clearTimeout(timeoutId);

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

    const trends: TrendingTopic[] = names.slice(0, 7).map((name) => ({
      tag: name,
      tweets: "N/A",
      url: `https://twitter.com/search?q=${encodeURIComponent(name)}`,
    }));

    return trends;
  } catch {
    return null;
  }
}

function getFallbackTrends(): TrendingTopic[] {
  return [
    {
      tag: "#Brasil",
      tweets: "127K",
      category: "Política",
      url: "https://twitter.com/search?q=%23Brasil",
    },
    {
      tag: "#Economia",
      tweets: "89K",
      category: "Negócios",
      url: "https://twitter.com/search?q=%23Economia",
    },
    {
      tag: "#Tecnologia",
      tweets: "56K",
      category: "Tech",
      url: "https://twitter.com/search?q=%23Tecnologia",
    },
    {
      tag: "#Esportes",
      tweets: "142K",
      category: "Esportes",
      url: "https://twitter.com/search?q=%23Esportes",
    },
    {
      tag: "#Cultura",
      tweets: "34K",
      category: "Entretenimento",
      url: "https://twitter.com/search?q=%23Cultura",
    },
    {
      tag: "#Saúde",
      tweets: "67K",
      category: "Saúde",
      url: "https://twitter.com/search?q=%23Sa%C3%BAde",
    },
    {
      tag: "#Educação",
      tweets: "45K",
      category: "Educação",
      url: "https://twitter.com/search?q=%23Educa%C3%A7%C3%A3o",
    },
  ];
}

export async function fetchBrazilTrendsServer(): Promise<TrendingTopic[]> {
  try {
    // Try Twitter API first
    let trends = await fetchFromTwitterApi();

    // Fallback to GetDayTrends
    if (!trends) {
      trends = await fetchFromGetDayTrends();
    }

    // Fallback to static trends
    if (!trends) {
      trends = getFallbackTrends();
    }

    return trends;
  } catch {
    // Return fallback on any error
    return getFallbackTrends();
  }
}
