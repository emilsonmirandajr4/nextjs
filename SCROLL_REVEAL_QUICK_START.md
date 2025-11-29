# 🚀 Scroll Reveal - Quick Start

Guia rápido para adicionar animações suaves de scroll reveal no seu projeto Next.js.

## O Que É?

Animações que aparecem quando o usuário rola a página - igual aos sites modernos como Apple, Stripe, etc.

**Benefícios:**
- ✨ Experiência visual moderna e profissional
- 🚀 Melhor performance (carrega apenas o que está visível)
- 📱 Funciona perfeitamente em mobile
- ♿ Acessível e sem JavaScript bloqueante

## Instalação

Os componentes já estão prontos em `src/components/animations/`:
- `ScrollReveal.tsx` - Anima um elemento
- `StaggeredReveal.tsx` - Anima múltiplos elementos em sequência

## Uso Básico

### 1. Importar o Componente

```tsx
import { ScrollReveal } from '@/components/animations';
```

### 2. Envolver Seu Conteúdo

```tsx
<ScrollReveal animation="slide-up">
  <div className="my-section">
    Este conteúdo vai aparecer suavemente quando você rolar até ele!
  </div>
</ScrollReveal>
```

**Pronto!** É só isso. 🎉

## Exemplos Práticos

### Exemplo 1: Seção Simples

```tsx
export default function Page() {
  return (
    <main>
      {/* Sem animação - hero sempre visível */}
      <section className="hero">
        <h1>Bem-vindo ao PrimeiraNews</h1>
      </section>

      {/* Com animação - aparece ao rolar */}
      <ScrollReveal animation="slide-up">
        <section className="py-12">
          <h2>Últimas Notícias</h2>
          <NewsGrid />
        </section>
      </ScrollReveal>
    </main>
  );
}
```

### Exemplo 2: Múltiplas Seções

```tsx
export default function Page() {
  return (
    <main>
      <ScrollReveal animation="fade">
        <section className="section-1">Primeira Seção</section>
      </ScrollReveal>

      <ScrollReveal animation="slide-up" delay={100}>
        <section className="section-2">Segunda Seção</section>
      </ScrollReveal>

      <ScrollReveal animation="fade-scale" delay={200}>
        <section className="section-3">Terceira Seção</section>
      </ScrollReveal>
    </main>
  );
}
```

### Exemplo 3: Cards em Sequência (Stagger)

```tsx
import { StaggeredReveal } from '@/components/animations';

export default function NewsGrid({ posts }) {
  return (
    <StaggeredReveal
      animation="slide-up"
      staggerDelay={100}
      className="grid grid-cols-3 gap-6"
    >
      {posts.map(post => (
        <div key={post.id} className="card">
          <h3>{post.title}</h3>
        </div>
      ))}
    </StaggeredReveal>
  );
}
```

## Tipos de Animação

| Animação | Quando Usar | Exemplo |
|----------|-------------|---------|
| `fade` | Textos, títulos | Headers, parágrafos |
| `slide-up` | **Mais comum** - Seções, cards | Posts, produtos, features |
| `slide-down` | Dropdowns, alertas | Notificações |
| `slide-left` | Painéis laterais | Sidebars |
| `slide-right` | Painéis laterais | Sidebars |
| `scale` | Elementos destacados | CTAs, botões |
| `fade-scale` | Hero sections | Banners, destaques |

## Parâmetros Mais Usados

```tsx
<ScrollReveal
  animation="slide-up"    // Tipo de animação
  duration={600}          // Duração em ms (400-800 é ideal)
  delay={0}              // Delay antes de começar em ms
  threshold={0.1}        // Quanto precisa estar visível (0-1)
  triggerOnce={true}     // Anima apenas uma vez (recomendado)
>
  <Content />
</ScrollReveal>
```

## ⚡ Dicas de Performance

### ✅ FAZER

```tsx
// 1. Use triggerOnce={true} (padrão)
<ScrollReveal triggerOnce={true}>
  <Section />
</ScrollReveal>

// 2. Não anime o conteúdo inicial (above the fold)
<main>
  {/* Sem animação */}
  <Hero />
  
  {/* Com animação */}
  <ScrollReveal animation="slide-up">
    <Features />
  </ScrollReveal>
</main>

// 3. Limite stagger a 6-10 itens
<StaggeredReveal>
  {posts.slice(0, 8).map(...)}
</StaggeredReveal>
```

### ❌ EVITAR

```tsx
// ❌ Não anime tudo
<ScrollReveal>
  <ScrollReveal>
    <ScrollReveal>
      ...
    </ScrollReveal>
  </ScrollReveal>
</ScrollReveal>

// ❌ Não use stagger em muitos elementos
<StaggeredReveal>
  {posts.map(...)} {/* 100+ items */}
</StaggeredReveal>

// ❌ Não anime hero/conteúdo inicial
<ScrollReveal animation="fade">
  <h1>Título Principal</h1> {/* Já está visível */}
</ScrollReveal>
```

## Aplicando na Home Page

Aqui está um exemplo real de como aplicar na sua home:

```tsx
export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main>
      {/* Hero - SEM animação (já visível) */}
      <section className="hero">
        <HeroCarousel />
      </section>

      {/* Primeira seção - fade simples */}
      <ScrollReveal animation="fade">
        <section className="py-12">
          <NewsCarousel posts={posts} />
        </section>
      </ScrollReveal>

      {/* Segunda seção - slide up */}
      <ScrollReveal animation="slide-up" delay={100}>
        <section className="py-12">
          <TrendingTopics />
        </section>
      </ScrollReveal>

      {/* Grid de cards - stagger */}
      <section className="py-12">
        <h2>Últimas Notícias</h2>
        <StaggeredReveal
          animation="slide-up"
          staggerDelay={100}
          className="grid grid-cols-3 gap-6"
        >
          {posts.map(post => (
            <NewsCard key={post.id} post={post} />
          ))}
        </StaggeredReveal>
      </section>

      {/* Newsletter - fade scale */}
      <ScrollReveal animation="fade-scale">
        <section className="py-16 bg-blue-600">
          <NewsletterSignup />
        </section>
      </ScrollReveal>
    </main>
  );
}
```

## Troubleshooting

### Animação não funciona?

1. **Certifique-se de que é Client Component**
   ```tsx
   'use client'; // Adicione no topo do arquivo
   ```

2. **Verifique se o elemento tem altura**
   - O Intersection Observer precisa detectar o elemento
   - Elementos com `height: 0` não funcionam

3. **Ajuste o threshold**
   ```tsx
   <ScrollReveal threshold={0.1}> {/* Menor = mais fácil de ativar */}
   ```

### Animação muito rápida/lenta?

```tsx
<ScrollReveal
  duration={800}  // Aumente para mais devagar
  delay={0}       // Remova delay se estiver muito lento
>
```

### Funciona em Server Component?

Não diretamente - o componente usa hooks (`useState`, `useEffect`).

**Solução:** Envolva apenas o necessário:

```tsx
// ✅ Server Component (page.tsx)
export default async function Page() {
  const data = await fetchData(); // Server-side

  return (
    <main>
      {/* Client Component wrapper */}
      <ScrollRevealWrapper>
        <Content data={data} />
      </ScrollRevealWrapper>
    </main>
  );
}
```

## Próximos Passos

1. ✅ Teste os exemplos acima
2. 📖 Leia `SCROLL_REVEAL_EXAMPLES.md` para exemplos avançados
3. 🎨 Customize as animações para seu design
4. 📱 Teste em dispositivos móveis
5. 🚀 Deploy e impressione seus usuários!

---

**Dúvidas?** Veja os exemplos completos em `SCROLL_REVEAL_EXAMPLES.md` e `SCROLL_REVEAL_CARD_EXAMPLE.tsx`
