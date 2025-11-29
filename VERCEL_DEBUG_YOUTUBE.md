# 🔍 Guia de Debug: YouTube API na Vercel

## 🚨 Problema

Os vídeos aparecem **localmente** mas não aparecem na **Vercel (produção)**.

---

## ✅ Passo 1: Verificar Variável de Ambiente na Vercel

### 1.1 Acessar o Painel da Vercel

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto: **primeiranews** (ou o nome do seu projeto)
3. Clique em **Settings** (Configurações)
4. No menu lateral, clique em **Environment Variables**

### 1.2 Verificar se `YOUTUBE_API_KEY` existe

Procure por uma variável chamada `YOUTUBE_API_KEY`.

**Se NÃO EXISTIR:**

1. Clique em **Add New**
2. Preencha:
   - **Key**: `YOUTUBE_API_KEY`
   - **Value**: `sua-chave-da-api-do-youtube`
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development (marque todos!)
3. Clique em **Save**

**Se JÁ EXISTIR:**

1. Verifique se está marcado para **Production** (✅)
2. Clique para editar e confirme se a chave está correta
3. Salve novamente

### 1.3 Forçar Novo Deploy

**IMPORTANTE:** Após adicionar/editar variáveis, você DEVE fazer redeploy!

**Opção A - Pelo painel:**
1. Vá em **Deployments**
2. Clique nos `...` do último deploy
3. Clique em **Redeploy**

**Opção B - Pelo Git:**
```bash
git commit --allow-empty -m "Trigger Vercel redeploy"
git push
```

---

## 🔍 Passo 2: Verificar Logs da Vercel

### 2.1 Acessar Logs em Tempo Real

1. No painel da Vercel, vá em **Deployments**
2. Clique no último deployment
3. Vá na aba **Functions**
4. Clique em `/api/youtube/metadata`
5. Role até **Logs** ou **Real-time Logs**

### 2.2 Abrir seu site e testar

1. Abra seu site na Vercel: `https://seu-site.vercel.app`
2. Role até a seção de vídeos
3. Abra o **Console do navegador** (F12)
4. Veja os logs do navegador

### 2.3 O que procurar nos logs:

**✅ SE FUNCIONAR, você verá:**
```
[YouTube API] Chamada recebida
[YouTube API] Total de URLs recebidas: 10
[YouTube API] API Key presente: true
[YouTube API] API Key primeiros 10 chars: AIzaSyBxxx...
[YouTube API] IDs extraídos: ['60ItHLz5WEA', 'X3ZbvHr3r1E', ...]
[YouTube API] Fazendo requisição para YouTube API...
[YouTube API] Status da resposta: 200
[YouTube API] Dados recebidos com sucesso
[YouTube API] Total de vídeos retornados: 10
[YouTube API] Retornando 10 vídeos processados
```

**❌ SE NÃO FUNCIONAR, você verá:**

**Problema 1: API Key não configurada**
```
[YouTube API] API Key presente: false
[YouTube API] ERRO CRÍTICO: YOUTUBE_API_KEY não está configurada!
```
**Solução:** Adicione a variável de ambiente (Passo 1)

**Problema 2: API Key inválida**
```
[YouTube API] Status da resposta: 400
[YouTube API] ERRO na API do YouTube
[YouTube API] Detalhes: API key not valid
```
**Solução:** Gere uma nova API Key no Google Cloud Console

**Problema 3: Quota excedida**
```
[YouTube API] Status da resposta: 403
[YouTube API] Detalhes: quotaExceeded
```
**Solução:** Aguarde reset diário ou aumente quota no Google Cloud

---

## 🔧 Passo 3: Verificar API Key do YouTube

### 3.1 Acessar Google Cloud Console

1. Acesse: https://console.cloud.google.com
2. Selecione seu projeto ou crie um novo
3. Vá em **APIs & Services** → **Credentials**

### 3.2 Verificar/Criar API Key

**Se você JÁ TEM uma API Key:**
1. Clique na API Key para editar
2. Verifique se **YouTube Data API v3** está habilitada
3. Verifique restrições de domínio (remova para testar)

**Se você NÃO TEM uma API Key:**
1. Clique em **+ Create Credentials** → **API Key**
2. Copie a key gerada
3. Clique em **Restrict Key**
4. Em **API restrictions**, selecione **Restrict key**
5. Marque apenas **YouTube Data API v3**
6. Salve

### 3.3 Habilitar YouTube Data API v3

1. No Google Cloud Console, vá em **APIs & Services** → **Library**
2. Procure por "YouTube Data API v3"
3. Clique e depois em **Enable**

---

## 🧪 Passo 4: Testar API Key Diretamente

### 4.1 Testar no Navegador

Cole esta URL no navegador (substitua `SUA_API_KEY`):

```
https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=60ItHLz5WEA&key=SUA_API_KEY
```

**✅ Se funcionar:** Você verá um JSON com dados do vídeo
**❌ Se não funcionar:** Você verá erro (key inválida, API não habilitada, etc.)

### 4.2 Testar via cURL

```bash
curl "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=60ItHLz5WEA&key=SUA_API_KEY"
```

---

## 📝 Passo 5: Checklist Completo

Marque conforme for resolvendo:

- [ ] API Key do YouTube criada no Google Cloud Console
- [ ] YouTube Data API v3 habilitada no projeto
- [ ] API Key testada diretamente (funciona no navegador)
- [ ] Variável `YOUTUBE_API_KEY` adicionada na Vercel
- [ ] Variável aplicada para **Production** (✅)
- [ ] Novo deploy feito após adicionar variável
- [ ] Logs da Vercel verificados (sem erros)
- [ ] Site testado após deploy (vídeos aparecem)

---

## 🆘 Problemas Comuns e Soluções

### Problema: "API key not valid"

**Causa:** API Key incorreta ou não habilitada

**Solução:**
1. Gere uma nova API Key no Google Cloud
2. Habilite YouTube Data API v3
3. Atualize na Vercel
4. Redeploy

---

### Problema: "quotaExceeded"

**Causa:** Limite diário de 10.000 unidades excedido

**Solução:**
- Aguarde até meia-noite (Pacific Time) para reset
- Ou aumente quota no Google Cloud (pago)
- Ou implemente cache mais agressivo

---

### Problema: "The request cannot be completed"

**Causa:** Restrições de domínio na API Key

**Solução:**
1. Vá no Google Cloud Console → Credentials
2. Edite sua API Key
3. Em **Application restrictions**, escolha **None**
4. Salve e teste novamente

---

### Problema: Vídeos aparecem localmente mas não na Vercel

**Causa:** Variável de ambiente não configurada ou não aplicada

**Solução:**
1. Verifique se `YOUTUBE_API_KEY` está na Vercel
2. Confirme que está marcada para **Production**
3. Faça redeploy (importante!)
4. Aguarde 1-2 minutos para propagar

---

## 🎯 Teste Rápido na Vercel

### Criar rota de teste temporária

Crie o arquivo: `app/api/test-youtube/route.ts`

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  
  return NextResponse.json({
    hasKey: !!apiKey,
    keyPreview: apiKey ? apiKey.substring(0, 10) + '...' : 'NENHUMA',
    allEnvVars: Object.keys(process.env).filter(k => k.includes('YOUTUBE'))
  });
}
```

Depois acesse: `https://seu-site.vercel.app/api/test-youtube`

**Resposta esperada:**
```json
{
  "hasKey": true,
  "keyPreview": "AIzaSyBxxx...",
  "allEnvVars": ["YOUTUBE_API_KEY"]
}
```

---

## 📞 Ainda não Funcionou?

Se após seguir TODOS os passos ainda não funcionar:

1. **Copie os logs da Vercel** (aba Functions)
2. **Copie a resposta** de `https://seu-site.vercel.app/api/test-youtube`
3. **Tire screenshot** da página de vídeos (F12 console aberto)
4. **Compartilhe** essas informações

---

## ✅ Sucesso!

Quando funcionar, você verá:

- ✅ Thumbnails dos vídeos carregando
- ✅ Títulos reais dos vídeos (não placeholders)
- ✅ Duração dos vídeos (ex: "3:45")
- ✅ Número de visualizações
- ✅ Sem erros no console

---

**Data:** 27 de Novembro de 2024  
**Última atualização:** Após adicionar logs detalhados na API