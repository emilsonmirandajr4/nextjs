const https = require('https');
const fs = require('fs');
const path = require('path');

// Carregar .env.local manualmente
try {
  const envPath = path.resolve(process.cwd(), '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  });
} catch (e) {
  console.error("Erro ao ler .env.local:", e.message);
}

const apiKey = process.env.YOUTUBE_API_KEY;
console.log("API Key encontrada:", apiKey ? "SIM (" + apiKey.substring(0, 5) + "...)" : "NÃO");

if (!apiKey) {
  process.exit(1);
}

const videoId = "dQw4w9WgXcQ";
const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

console.log("Testando requisição para:", `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=HIDDEN`);

https.get(url, (res) => {
  console.log("Status Code:", res.statusCode);
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log("Response Body (primeiros 200 chars):", data.substring(0, 200));
    try {
      const json = JSON.parse(data);
      if (json.error) {
        console.error("Erro na API:", json.error);
      } else if (json.items && json.items.length > 0) {
        console.log("Sucesso! Título do vídeo:", json.items[0].snippet.title);
      } else {
        console.log("Sucesso, mas nenhum item retornado (estranho para um ID válido).");
      }
    } catch (e) {
      console.error("Erro ao fazer parse do JSON:", e);
    }
  });
}).on('error', (e) => {
  console.error("Erro na requisição:", e);
});
