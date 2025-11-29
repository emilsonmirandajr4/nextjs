# Scroll Reveal Animations - Guia de Uso

Este guia mostra como usar os componentes de animação de scroll reveal na PrimeiraNews.

## 📦 Componentes Disponíveis

1. **ScrollReveal** - Anima um único elemento quando ele entra no viewport
2. **StaggeredReveal** - Anima múltiplos elementos em sequência

## 🎨 Tipos de Animação

- `fade` - Fade simples (opacidade)
- `slide-up` - Desliza de baixo para cima
- `slide-down` - Desliza de cima para baixo
- `slide-left` - Desliza da direita para esquerda
- `slide-right` - Desliza da esquerda para direita
- `scale` - Escala de pequeno para normal
- `fade-scale` - Fade + escala + movimento vertical

## 🚀 Exemplos de Uso

### 1. Animação Simples (ScrollReveal)

```tsx
import { ScrollReveal } from '@/components/animations';

export default function MyComponent() {
  return (
    <ScrollReveal animation="fade">
      <h2>Este título aparece suavemente</h2>
    </ScrollReveal>
  );
}
```

### 2. Slide Up com Delay

```tsx
import { ScrollReveal } from '@/components/animations';

export default function MyComponent() {
  return (
    <ScrollReveal 
      animation="slide-up" 
      delay={200}
      duration={800}
    >
      <div className="card">
        Conteúdo que desliza para cima
      </div>
    </ScrollReveal>
  );
}
```

### 3. Animação em Múltiplos Cards (StaggeredReveal)

```tsx
import { StaggeredReveal } from '@/components/animations';

export default function NewsGrid({ posts }) {
  return (
    <StaggeredReveal 
      animation="slide-up"
      staggerDelay={100}
      className="grid grid-cols-3 gap-4"
    >
      {posts.map(post => (
        <div key={post.id} className="card">
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </StaggeredReveal>
  );
}
```

### 4. Seções da Home Page

```tsx
import { ScrollReveal } from '@/components/animations';

export default function HomePage() {
  return (
    <div>
      {/* Hero - sem animação */}
      <section className="hero">
        <h1>PrimeiraNews</h1>
      </section>

      {/* Carousel principal - slide up */}
      <ScrollReveal animation="slide-up" duration={700}>
        <section className="py-8">
          <NewsCarousel posts={posts} />
        </section>
      </ScrollReveal>

      {/* Trending topics - fade in */}
      <ScrollReveal animation="fade" delay={100}>
        <section className="py-8">
          <TrendingTopics />
        </section>
      </ScrollReveal>

      {/* Grid de notícias - fade scale */}
      <ScrollReveal animation="fade-scale" duration={800}>
        <section className="py-8">
          <NewsGrid posts={gridPosts} />
        </section>
      </ScrollReveal>
    </div>
  );
}
```

### 5. Cards com Efeito Stagger

```tsx
import { StaggeredReveal } from '@/components/animations';

export default function FeaturedPosts({ posts }) {
  return (
    <section className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8">Destaques</h2>
      
      <StaggeredReveal
        animation="slide-up"
        staggerDelay={150}
        duration={600}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {posts.map(post => (
          <article key={post.id} className="bg-white rounded-lg shadow-lg p-6">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-4">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.excerpt}</p>
          </article>
        ))}
      </StaggeredReveal>
    </section>
  );
}
```

### 6. Animação que Repete (triggerOnce=false)

```tsx
import { ScrollReveal } from '@/components/animations';

export default function RepeatingAnimation() {
  return (
    <ScrollReveal 
      animation="scale"
      triggerOnce={false}  // Anima toda vez que entra/sai do viewport
      threshold={0.5}       // 50% do elemento precisa estar visível
    >
      <div className="cta-banner">
        Esta animação acontece toda vez que você rola!
      </div>
    </ScrollReveal>
  );
}
```

## ⚙️ Parâmetros Avançados

### ScrollReveal Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `animation` | string | `'fade'` | Tipo de animação |
| `delay` | number | `0` | Delay em ms antes da animação começar |
| `duration` | number | `600` | Duração da animação em ms |
| `threshold` | number | `0.1` | Quanto do elemento deve estar visível (0-1) |
| `rootMargin` | string | `'0px 0px -50px 0px'` | Margem do viewport para trigger |
| `triggerOnce` | boolean | `true` | Se true, anima apenas uma vez |
| `className` | string | `''` | Classes CSS adicionais |

### StaggeredReveal Props

Mesmos props do ScrollReveal, mais:

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `staggerDelay` | number | `100` | Delay entre cada filho em ms |
| `childClassName` | string | `''` | Classes CSS para cada filho |

## 💡 Dicas de Performance

### 1. Use `triggerOnce={true}` (padrão)
```tsx
// ✅ BOM - anima apenas uma vez
<ScrollReveal triggerOnce={true}>
  <Content />
</ScrollReveal>

// ⚠️ Use com cuidado - re-anima toda vez
<ScrollReveal triggerOnce={false}>
  <Content />
</ScrollReveal>
```

### 2. Ajuste o `threshold` baseado no tamanho do elemento
```tsx
// Para elementos pequenos (badges, botões)
<ScrollReveal threshold={0.8}>
  <SmallElement />
</ScrollReveal>

// Para elementos grandes (hero sections)
<ScrollReveal threshold={0.2}>
  <LargeSection />
</ScrollReveal>
```

### 3. Use `rootMargin` para antecipar animações
```tsx
// Começa a animar antes do elemento entrar no viewport
<ScrollReveal rootMargin="0px 0px -100px 0px">
  <Content />
</ScrollReveal>
```

### 4. Evite Stagger em muitos elementos
```tsx
// ✅ BOM - poucos elementos
<StaggeredReveal staggerDelay={100}>
  {posts.slice(0, 6).map(post => <Card key={post.id} />)}
</StaggeredReveal>

// ⚠️ Pode ser lento - muitos elementos
<StaggeredReveal staggerDelay={100}>
  {posts.map(post => <Card key={post.id} />)} {/* 100+ items */}
</StaggeredReveal>
```

## 🎯 Exemplo Completo: Home Page Otimizada

```tsx
import { ScrollReveal, StaggeredReveal } from '@/components/animations';

export default function HomePage({ 
  featuredPosts, 
  recentPosts, 
  trendingTopics,
  categoryPosts 
}) {
  return (
    <main>
      {/* Hero - sempre visível, sem animação */}
      <section className="hero-section">
        <HeroCarousel posts={featuredPosts} />
      </section>

      {/* Trending - fade simples */}
      <ScrollReveal animation="fade" duration={500}>
        <section className="py-8 bg-gray-50">
          <TrendingTopics topics={trendingTopics} />
        </section>
      </ScrollReveal>

      {/* Notícias Recentes - slide up */}
      <ScrollReveal animation="slide-up" duration={700}>
        <section className="container mx-auto py-12">
          <h2 className="text-3xl font-bold mb-6">Últimas Notícias</h2>
          <NewsCarousel posts={recentPosts} />
        </section>
      </ScrollReveal>

      {/* Grid de Categorias - stagger */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-6">Por Categoria</h2>
        <StaggeredReveal
          animation="fade-scale"
          staggerDelay={120}
          duration={600}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categoryPosts.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </StaggeredReveal>
      </section>

      {/* Newsletter - slide right */}
      <ScrollReveal animation="slide-right" duration={800}>
        <section className="bg-blue-600 text-white py-16">
          <NewsletterSignup />
        </section>
      </ScrollReveal>
    </main>
  );
}
```

## 🔧 Customização com CSS

Você também pode adicionar estilos CSS customizados:

```tsx
<ScrollReveal 
  animation="fade"
  className="my-custom-animation"
>
  <Content />
</ScrollReveal>
```

```css
/* styles/animations.css */
.my-custom-animation {
  /* Adiciona blur no estado inicial */
  filter: blur(4px);
  transition: all 0.6s ease;
}

.my-custom-animation[style*="opacity: 1"] {
  /* Remove blur quando visível */
  filter: blur(0);
}
```

## 📱 Considerações Mobile

Os componentes já são otimizados para mobile, mas você pode ajustar:

```tsx
<ScrollReveal
  animation="slide-up"
  threshold={0.15}  // Threshold menor para mobile
  rootMargin="0px 0px -30px 0px"  // Menos margem
  duration={500}  // Animação mais rápida
>
  <MobileOptimizedContent />
</ScrollReveal>
```

## 🎬 Quando Usar Cada Animação

- **fade**: Headers, textos, elementos sutis
- **slide-up**: Cards, posts, conteúdo principal (mais comum)
- **slide-down**: Dropdowns, notificações
- **slide-left/right**: Sidebars, painéis laterais
- **scale**: Botões, CTAs, elementos de destaque
- **fade-scale**: Hero sections, featured content

## ⚡ Performance Tips

1. **Não anime tudo** - Use em elementos-chave apenas
2. **Above the fold** - Não anime conteúdo inicial da página
3. **Limite stagger** - Máximo 8-10 itens com stagger
4. **Duração apropriada** - 400-800ms é o ideal
5. **Teste em mobile** - Animações muito complexas podem causar jank