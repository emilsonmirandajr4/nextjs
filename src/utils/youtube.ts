export function extractVideoId(url: string): string | null {
  if (!url) return null;
  
  try {
    
    const regex = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{10,12})\b/;
    const match = url.match(regex);
    if (match) return match[1];

    // Fallback para parser de URL limpo se o regex falhar ou se for uma URL muito limpa
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    
    return null;
  } catch {
    return null;
  }
}

export function getYoutubeThumbnail(videoId: string, quality: 'maxres' | 'hq' | 'mq' = 'maxres'): string {
  // Nota: maxresdefault nem sempre existe para todos os vídeos. hqdefault é mais garantido.
  // Mas vamos tentar maxres primeiro, e o componente de imagem pode ter fallback
  return `https://i.ytimg.com/vi/${videoId}/${quality}default.jpg`;
}

export function formatVideoDuration(isoDuration?: string): string {
  if (!isoDuration) return "0:00";

  const match = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(isoDuration);
  if (!match) return "0:00";

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatViewCount(views?: number): string {
  if (!views) return "0 visualizações";
  
  return new Intl.NumberFormat('pt-BR', {
    notation: "compact",
    compactDisplay: "short"
  }).format(views) + " visualizações";
}
