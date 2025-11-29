import { NextRequest, NextResponse } from "next/server";

interface YoutubeMetaItem {
  videoId: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  channelTitle: string;
}

function extractVideoId(url: string): string | null {
  try {
    const u = new URL(url);

    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1);
    }

    if (u.searchParams.get("v")) {
      return u.searchParams.get("v");
    }

    if (
      u.hostname.includes("youtube.com") &&
      u.pathname.startsWith("/embed/")
    ) {
      const parts = u.pathname.split("/");
      return parts[2] || null;
    }

    return null;
  } catch {
    return null;
  }
}

function formatYouTubeDuration(isoDuration?: string): string {
  if (!isoDuration) return "0:00";

  const match = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(isoDuration);
  if (!match) return "0:00";

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  return `${m}:${s.toString().padStart(2, "0")}`;
}

const YOUTUBE_METADATA_CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const urls: string[] = Array.isArray(body?.urls) ? body.urls : [];

    console.log("[YouTube API] Chamada recebida");
    console.log("[YouTube API] Total de URLs recebidas:", urls.length);
    console.log("[YouTube API] URLs:", urls);

    if (!urls.length) {
      console.log("[YouTube API] Nenhuma URL fornecida, retornando vazio");
      return NextResponse.json(
        { items: {} },
        { status: 200, headers: YOUTUBE_METADATA_CACHE_HEADERS },
      );
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    console.log("[YouTube API] API Key presente:", !!apiKey);
    console.log(
      "[YouTube API] API Key primeiros 10 chars:",
      apiKey ? apiKey.substring(0, 10) + "..." : "NENHUMA",
    );

    if (!apiKey) {
      console.error(
        "[YouTube API] ERRO CRÍTICO: YOUTUBE_API_KEY não está configurada!",
      );
      console.error(
        "[YouTube API] Environment variables disponíveis:",
        Object.keys(process.env).filter((k) => k.includes("YOUTUBE")),
      );
      return NextResponse.json(
        { error: "YOUTUBE_API_KEY não configurada no ambiente" },
        { status: 500, headers: { "Cache-Control": "private, no-store" } },
      );
    }

    const ids = Array.from(
      new Set(
        urls
          .map((u) => extractVideoId(u))
          .filter((id): id is string => Boolean(id)),
      ),
    );

    console.log("[YouTube API] IDs extraídos:", ids);
    console.log("[YouTube API] Total de IDs únicos:", ids.length);

    if (!ids.length) {
      console.log("[YouTube API] Nenhum ID válido extraído das URLs");
      return NextResponse.json(
        { items: {} },
        { status: 200, headers: YOUTUBE_METADATA_CACHE_HEADERS },
      );
    }

    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${ids.join(
      ",",
    )}&key=${apiKey}`;

    console.log("[YouTube API] Fazendo requisição para YouTube API...");
    console.log(
      "[YouTube API] URL (sem key):",
      apiUrl.replace(/&key=.*$/, "&key=HIDDEN"),
    );

    const ytRes = await fetch(apiUrl, { cache: "no-store" });
    console.log("[YouTube API] Status da resposta:", ytRes.status);

    if (!ytRes.ok) {
      const errorText = await ytRes.text();
      console.error("[YouTube API] ERRO na API do YouTube");
      console.error("[YouTube API] Status:", ytRes.status);
      console.error("[YouTube API] Detalhes:", errorText);
      return NextResponse.json(
        { error: "Falha ao buscar dados no YouTube", details: errorText },
        { status: 502, headers: { "Cache-Control": "private, no-store" } },
      );
    }

    const data = await ytRes.json();
    console.log("[YouTube API] Dados recebidos com sucesso");
    console.log(
      "[YouTube API] Total de vídeos retornados:",
      data.items?.length || 0,
    );
    const items: Record<string, YoutubeMetaItem> = {};

    for (const item of data.items || []) {
      const id: string | undefined = item.id;
      if (!id) continue;

      const snippet = item.snippet || {};
      const statistics = item.statistics || {};
      const contentDetails = item.contentDetails || {};
      const thumbnails = snippet.thumbnails || {};

      const thumbUrl =
        thumbnails.maxres?.url ||
        thumbnails.standard?.url ||
        thumbnails.high?.url ||
        thumbnails.medium?.url ||
        thumbnails.default?.url ||
        "";

      items[id] = {
        videoId: id,
        title: snippet.title || "",
        thumbnail: thumbUrl,
        duration: formatYouTubeDuration(contentDetails.duration),
        views: statistics.viewCount ? Number(statistics.viewCount) : 0,
        channelTitle: snippet.channelTitle || "",
      };
    }

    console.log(
      "[YouTube API] Retornando",
      Object.keys(items).length,
      "vídeos processados",
    );
    return NextResponse.json(
      { items },
      { status: 200, headers: YOUTUBE_METADATA_CACHE_HEADERS },
    );
  } catch (error) {
    console.error("[YouTube API] ERRO CRÍTICO:");
    console.error(
      "[YouTube API] Tipo:",
      error instanceof Error ? error.name : typeof error,
    );
    console.error(
      "[YouTube API] Mensagem:",
      error instanceof Error ? error.message : String(error),
    );
    console.error(
      "[YouTube API] Stack:",
      error instanceof Error ? error.stack : "N/A",
    );
    return NextResponse.json(
      {
        error: "Erro interno ao processar metadados do YouTube",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500, headers: { "Cache-Control": "private, no-store" } },
    );
  }
}
