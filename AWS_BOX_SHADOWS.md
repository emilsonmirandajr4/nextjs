# Box Shadows da AWS (Amazon Web Services)

**Site analisado:** https://aws.amazon.com/pt/  
**Data:** 02/12/2025  
**Ferramenta:** Puppeteer

---

## 🎨 Shadows Encontrados

### 1. **Box Shadow - Modais/Cards**
```css
/* Usado em modais e cards grandes */
box-shadow: 
  rgba(0, 28, 36, 0.3) 0px 1px 1px 0px, 
  rgba(0, 28, 36, 0.15) 1px 1px 1px 0px, 
  rgba(0, 28, 36, 0.15) -1px 1px 1px 0px;
```

**Características:**
- 3 camadas de sombra
- Cor base: `rgba(0, 28, 36, ...)` (azul escuro da AWS)
- Sombra sutil e elegante
- Usado em elementos brancos sobre fundos coloridos

**Onde usar:**
- Cards de destaque
- Modais
- Elementos flutuantes

---

### 2. **Box Shadow - Headers/Topbar**
```css
/* Usado em cabeçalhos e barras superiores */
box-shadow: rgba(0, 0, 0, 0.5) 0px -2px 5px 0px;
```

**Características:**
- Sombra para cima (negativa no Y)
- Preto semi-transparente
- Blur de 5px
- Cria separação visual de baixo para cima

**Onde usar:**
- Barras fixas no topo
- Separadores de seções
- Headers flutuantes

---

### 3. **Drop Shadow (Filter) - Botões/Ícones**
```css
/* Usado em botões de chat e ícones flutuantes */
filter: drop-shadow(rgba(0, 0, 0, 0.25) 0px 1px 5px);
```

**Características:**
- Mais leve que box-shadow
- Segue o contorno do elemento (não a caixa)
- Preto com 25% de opacidade
- Blur de 5px

**Onde usar:**
- Botões circulares
- Ícones flutuantes
- SVGs
- Formas irregulares

---

## 🎯 Aplicação no Seu Projeto

### Para Imagens/Cards de Notícias

#### Opção 1: Sombra Sutil AWS (Recomendado)
```tsx
// Para cards de notícias
<div className="card-news">
  <OptimizedImage ... />
</div>

// CSS
.card-news {
  box-shadow: 
    rgba(0, 28, 36, 0.3) 0px 1px 1px 0px,
    rgba(0, 28, 36, 0.15) 1px 1px 1px 0px,
    rgba(0, 28, 36, 0.15) -1px 1px 1px 0px;
  border-radius: 8px;
  overflow: hidden;
}
```

#### Opção 2: Sombra Mais Pronunciada
```css
/* Baseada no estilo AWS mas mais visível */
.card-news-hover {
  box-shadow: 
    rgba(0, 28, 36, 0.4) 0px 2px 4px 0px,
    rgba(0, 28, 36, 0.2) 2px 2px 4px 0px,
    rgba(0, 28, 36, 0.2) -2px 2px 4px 0px;
  transition: box-shadow 0.3s ease;
}

.card-news-hover:hover {
  box-shadow: 
    rgba(0, 28, 36, 0.5) 0px 4px 8px 0px,
    rgba(0, 28, 36, 0.3) 4px 4px 8px 0px,
    rgba(0, 28, 36, 0.3) -4px 4px 8px 0px;
}
```

#### Opção 3: Drop Shadow para Imagens Irregulares
```css
/* Para imagens sem fundo ou SVGs */
.featured-image {
  filter: drop-shadow(rgba(0, 0, 0, 0.25) 0px 2px 8px);
}

.featured-image:hover {
  filter: drop-shadow(rgba(0, 0, 0, 0.35) 0px 4px 12px);
}
```

---

## 🎨 Exemplo Prático: NewsCard

### Implementação Completa

```tsx
// components/NewsCard.tsx
interface NewsCardProps {
  post: WordPressPost;
  priority?: boolean;
}

export default function NewsCard({ post, priority }: NewsCardProps) {
  return (
    <div className="news-card-aws">
      <Link href={getPostUrl(post)}>
        <OptimizedImage
          src={getPostImage(post)}
          alt={getPostTitle(post)}
          priority={priority ? "high" : "normal"}
          className="news-card-image"
        />
        <div className="news-card-content">
          <h3>{getPostTitle(post)}</h3>
          <p>{getExcerpt(post)}</p>
        </div>
      </Link>
    </div>
  );
}
```

### CSS/Tailwind

```css
/* styles/news-card.css */

.news-card-aws {
  border-radius: 12px;
  overflow: hidden;
  background: white;
  transition: all 0.3s ease;
  
  /* Box shadow estilo AWS */
  box-shadow: 
    rgba(0, 28, 36, 0.3) 0px 1px 1px 0px,
    rgba(0, 28, 36, 0.15) 1px 1px 1px 0px,
    rgba(0, 28, 36, 0.15) -1px 1px 1px 0px;
}

.news-card-aws:hover {
  transform: translateY(-4px);
  box-shadow: 
    rgba(0, 28, 36, 0.4) 0px 4px 8px 0px,
    rgba(0, 28, 36, 0.25) 4px 4px 8px 0px,
    rgba(0, 28, 36, 0.25) -4px 4px 8px 0px;
}

.news-card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.news-card-content {
  padding: 1rem;
}
```

### Tailwind CSS

```tsx
<div className="
  rounded-xl 
  overflow-hidden 
  bg-white 
  transition-all 
  duration-300 
  hover:-translate-y-1
  [box-shadow:rgba(0,28,36,0.3)_0px_1px_1px_0px,rgba(0,28,36,0.15)_1px_1px_1px_0px,rgba(0,28,36,0.15)_-1px_1px_1px_0px]
  hover:[box-shadow:rgba(0,28,36,0.4)_0px_4px_8px_0px,rgba(0,28,36,0.25)_4px_4px_8px_0px,rgba(0,28,36,0.25)_-4px_4px_8px_0px]
">
  {/* Conteúdo */}
</div>
```

---

## 📊 Comparação de Shadows

| Shadow | Uso | Intensidade | Performance |
|--------|-----|-------------|-------------|
| **AWS Modal** | Cards, modais | Sutil ⭐ | Alta ✅ |
| **AWS Header** | Topbars | Média ⭐⭐ | Alta ✅ |
| **AWS Drop** | Botões, ícones | Leve ⭐ | Média ⚠️ |

**Notas:**
- `box-shadow` com múltiplas camadas pode afetar performance se usado em muitos elementos
- `filter: drop-shadow()` afeta mais a performance que `box-shadow`
- Para listas longas, considere aplicar shadow apenas em hover

---

## 🎯 Recomendação Final

Para o seu projeto de notícias, recomendo:

### 1. **Cards de Notícias Normais**
```css
box-shadow: 
  rgba(0, 28, 36, 0.3) 0px 1px 1px 0px,
  rgba(0, 28, 36, 0.15) 1px 1px 1px 0px,
  rgba(0, 28, 36, 0.15) -1px 1px 1px 0px;
```

### 2. **Cards em Hover/Destaque**
```css
box-shadow: 
  rgba(0, 28, 36, 0.4) 0px 4px 8px 0px,
  rgba(0, 28, 36, 0.25) 4px 4px 8px 0px,
  rgba(0, 28, 36, 0.25) -4px 4px 8px 0px;
```

### 3. **Header/Navigation**
```css
box-shadow: rgba(0, 0, 0, 0.5) 0px -2px 5px 0px;
```

---

## 💡 Dicas de Implementação

1. **Ajuste as cores:**
   - AWS usa `rgba(0, 28, 36, ...)` (azul escuro)
   - Você pode usar `rgba(0, 0, 0, ...)` (preto) para mais versatilidade
   - Ou adaptar para a cor do seu brand

2. **Performance:**
   - Limite shadows complexos a elementos importantes
   - Use `will-change: transform, box-shadow` em elementos animados
   - Considere `transform: translateZ(0)` para aceleração de hardware

3. **Acessibilidade:**
   - Shadows ajudam na hierarquia visual
   - Não confie apenas em shadows para informação importante
   - Mantenha contraste adequado

---

**Conclusão:** A AWS usa shadows muito sutis e elegantes. O segredo está nas múltiplas camadas com opacidades baixas, criando profundidade sem ser agressivo visualmente.
