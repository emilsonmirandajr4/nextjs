# 🚀 Instalação do Webhook - Passo a Passo

## 📋 Checklist Rápido

- [ ] **Passo 1**: Gerar token secreto (2 min)
- [ ] **Passo 2**: Configurar .env.local (1 min)
- [ ] **Passo 3**: Deploy na Vercel (1 min)
- [ ] **Passo 4**: Instalar código no WordPress (2 min)
- [ ] **Passo 5**: Testar (1 min)

**Total: ~7 minutos** ⏱️

---

## 🔑 Passo 1: Gerar Token Secreto

### **Opção A: Online (Recomendado)**
1. Acesse: https://generate-secret.vercel.app/32
2. Copie o token gerado
3. Exemplo: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

### **Opção B: No Terminal**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**⚠️ IMPORTANTE:** Guarde esse token em lugar seguro!

---

## ⚙️ Passo 2: Configurar .env.local

1. Abra o arquivo `.env.local` no seu projeto
2. Adicione esta linha (substituindo pelo seu token):

```bash
NEXT_PUBLIC_REVALIDATE_SECRET=seu-token-gerado-aqui
```

**Exemplo real:**
```bash
NEXT_PUBLIC_REVALIDATE_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

3. Salve o arquivo

---

## 🌐 Passo 3: Deploy na Vercel

### **3.1 - Adicionar Variável de Ambiente**

1. Acesse: https://vercel.com/dashboard
2. Clique no seu projeto
3. Vá em: **Settings → Environment Variables**
4. Adicione:
   - **Key**: `NEXT_PUBLIC_REVALIDATE_SECRET`
   - **Value**: (cole o mesmo token do .env.local)
   - **Environments**: Marque **Production**, **Preview** e **Development**
5. Clique em **Save**

### **3.2 - Fazer Deploy**

```bash
# Opção 1: Via Git (recomendado)
git add .
git commit -m "Add webhook revalidation"
git push

# Opção 2: Via CLI do Vercel
vercel --prod
```

**⏳ Aguarde 1-2 minutos para o deploy terminar**

---

## 📝 Passo 4: Instalar no WordPress

### **4.1 - Copiar Código**
1. Abra o arquivo: `wordpress-webhook.php`
2. Copie TODO o conteúdo (Ctrl+A, Ctrl+C)

### **4.2 - Editar Configuração**

Encontre estas linhas no código copiado:

```php
// URL do seu site Next.js na Vercel
define('NEXTJS_SITE_URL', 'https://SEU-SITE-AQUI.vercel.app');

// Token secreto (mesmo valor de WEBHOOK_SECRET do .env.local e Vercel)
define('WEBHOOK_SECRET', 'SEU-TOKEN-SECRETO');
```

**Substitua:**
- `SEU-SITE-AQUI` → URL do seu site Vercel
- `SEU-TOKEN-SECRETO` → Token gerado no Passo 1

**Exemplo:**
```php
define('NEXTJS_SITE_URL', 'https://primeiranews.vercel.app');
define('WEBHOOK_SECRET', 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6');
```

### **4.3 - Adicionar no WordPress**

1. Acesse WordPress Admin
2. Vá em: **Aparência → Editor de Temas**
3. No menu direito, clique em: **functions.php**
4. **Role até o FINAL do arquivo**
5. Cole o código editado
6. Clique em **Atualizar Arquivo**

**✅ Você verá um aviso verde: "Arquivo atualizado com sucesso"**

---

## 🧪 Passo 5: Testar

### **5.1 - Teste Manual (curl)**

```bash
# Substitua SEU-SITE e SEU-TOKEN pelos valores reais
curl -X POST https://SEU-SITE.vercel.app/api/revalidate \
  -H "Authorization: Bearer SEU-TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tag":"posts-list"}'
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Cache updated for tag: posts-list",
  "timestamp": "2024-..."
}
```

### **5.2 - Teste Real (WordPress)**

1. No WordPress, crie um **post de teste**
2. Preencha título e conteúdo
3. Clique em **Publicar**
4. **Aguarde 2-3 segundos**
5. Acesse seu site Next.js
6. **✅ O post deve aparecer imediatamente!**

---

## 🔍 Verificar Se Está Funcionando

### **Logs do WordPress**

1. Vá em: **Ferramentas → Saúde do Site → Informações**
2. Role até **WordPress**
3. Procure por logs recentes

**Você deve ver:**
```
✅ [Next.js Webhook] Cache revalidado para post: Nome do Post
```

### **Logs da Vercel**

1. Dashboard Vercel → Seu Projeto
2. Clique em **Deployments**
3. Clique no último deploy
4. Vá na aba **Functions**
5. Clique em `/api/revalidate`

**Você deve ver requisições POST com status 200**

---

## ⚠️ Troubleshooting

### **"401 Unauthorized"**
- ✅ Verifique se o token no WordPress é EXATAMENTE igual ao do .env.local
- ✅ Confirme que adicionou a variável na Vercel
- ✅ Faça um novo deploy após adicionar variável

### **"404 Not Found"**
- ✅ Verifique se a URL está correta (sem `/` no final)
- ✅ Confirme que o deploy terminou
- ✅ Teste diretamente: `https://seu-site.vercel.app/api/revalidate`

### **Webhook não dispara**
- ✅ Verifique se colou o código no `functions.php`
- ✅ Confirme que não há erros de sintaxe PHP
- ✅ Teste publicar um post novo (não rascunho)

### **Token não funciona**
- ✅ Gere um novo token
- ✅ Atualize em TODOS os lugares:
  - `.env.local`
  - Vercel Environment Variables
  - `wordpress-webhook.php`
- ✅ Faça novo deploy

---

## 📊 Antes vs Depois

### **ANTES (Sem Webhook)**
```
Você publica post
    ↓
... 0-60 segundos de espera ...
    ↓
Cache expira naturalmente
    ↓
Post aparece no site
```

### **DEPOIS (Com Webhook)**
```
Você publica post
    ↓
WordPress → Webhook → Next.js (2-3s)
    ↓
Post aparece no site! ✅
```

---

## ✅ Checklist Final

Marque cada item quando concluir:

- [ ] Token gerado
- [ ] Token adicionado no `.env.local`
- [ ] Token adicionado na Vercel
- [ ] Deploy feito na Vercel
- [ ] Código instalado no WordPress
- [ ] URL e token configurados no código
- [ ] Teste manual funcionou (curl)
- [ ] Teste real funcionou (publicar post)
- [ ] Aviso verde aparece no WordPress admin
- [ ] Posts aparecem em 2-3s após publicar

---

## 🎉 Sucesso!

**Se todos os itens estão marcados, parabéns!** 🚀

Seu WordPress agora notifica automaticamente o Next.js quando você publica posts!

**Performance:**
- ⚡ Atualização em 2-3s (antes: 0-60s)
- 💰 Economia de recursos
- ✅ Sempre atualizado

---

## 📞 Precisa de Ajuda?

Se algo não funcionar:

1. Revise cada passo do checklist
2. Verifique os logs (WordPress e Vercel)
3. Teste o webhook manualmente com curl
4. Confirme que o token está correto em todos os lugares

**Dica:** O erro mais comum é token diferente entre .env.local e WordPress!
