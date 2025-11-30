# ScrollReveal Melhorado 🎬

ScrollReveal com animações mais suaves, modernas e suporte a skeleton loading.

## Melhorias

### 1. Animações mais suaves
- **Cubic bezier melhorado**: `cubic-bezier(0.34, 1.56, 0.64, 1)` - bounce suave
- **Duração padrão aumentada**: 600ms → 700ms
- **Root margin otimizado**: -50px → -100px (revela mais cedo)
- **Distância de movimento aumentada**: 40px → 50px (mais impacto)
- **Will-change optimization**: Melhor performance

### 2. Novas animações
- `zoom-in` - Zoom dramático (scale 0.8 → 1)
- `blur` - Efeito de desfoque + movimento

### 3. Skeleton Loading
Agora você pode mostrar skeleton enquanto carrega e depois revelar o conteúdo com animação!

## Como Usar

### Uso Básico (sem mudanças)
```tsx
import { ScrollReveal } from '@/components/animations';

<ScrollReveal animation="slide-up">
  <YourComponent />
</ScrollReveal>
```

### Com Skeleton Loading
```tsx
import { ScrollReveal } from '@/components/animations';
import { VideoCarouselSkeleton } from '@/components/skeletons/HomeSkeletons';

function MyComponent() {
  const [loading, setLoading] = useState(true);
  
  return (
    <ScrollReveal 
      animation="slide-up" 
      showSkeleton={true}
      isLoading={loading}
      skeleton={<VideoCarouselSkeleton />}
    >
      <ActualComponent />
    </ScrollReveal>
  );
}
```

### Props do ScrollReveal

```typescript
interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 
              'slide-right' | 'scale' | 'fade-scale' | 'zoom-in' | 'blur';
  delay?: number;              // Padrão: 0ms
  duration?: number;           // Padrão: 700ms
  threshold?: number;          // Padrão: 0.1
  rootMargin?: string;         // Padrão: '0px 0px -100px 0px'
  triggerOnce?: boolean;       // Padrão: true
  className?: string;
  
  // Skeleton Loading
  showSkeleton?: boolean;      // Habilita skeleton
  isLoading?: boolean;         // Estado de loading
  skeleton?: ReactNode;        // Skeleton customizado
}
```

## Skeletons Disponíveis

Em `@/components/skeletons/HomeSkeletons`:

- `NewsCarouselSkeleton` - Para carousels de notícias
- `SidebarSkeleton` - Para sidebars
- `Carousel3DSkeleton` - Para carousel 3D
- `TrendingTopicsSkeleton` - Para trending topics
- `NewsSectionSkeleton` - Para seções de notícias
- `VideoCarouselSkeleton` - Para carousel de vídeos

## Exemplos

### Exemplo 1: Carousel de Vídeos com Skeleton
```tsx
'use client';

import { useState, useEffect } from 'react';
import { ScrollReveal } from '@/components/animations';
import { VideoCarouselSkeleton } from '@/components/skeletons/HomeSkeletons';
import VideoCarousel from '@/components/VideoCarousel';

export default function VideoSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      const data = await fetchVideos();
      setVideos(data);
      setLoading(false);
    }
    loadVideos();
  }, []);

  return (
    <ScrollReveal 
      animation="slide-up" 
      duration={700}
      delay={200}
      showSkeleton={true}
      isLoading={loading}
      skeleton={<VideoCarouselSkeleton />}
    >
      <VideoCarousel videos={videos} />
    </ScrollReveal>
  );
}
```

### Exemplo 2: Nova animação "blur"
```tsx
<ScrollReveal animation="blur" duration={800}>
  <HeroSection />
</ScrollReveal>
```

### Exemplo 3: Zoom dramático
```tsx
<ScrollReveal animation="zoom-in" duration={900}>
  <FeatureCard />
</ScrollReveal>
```

### Exemplo 4: Skeleton customizado
```tsx
const MyCustomSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl" />
  </div>
);

<ScrollReveal 
  animation="fade-scale"
  showSkeleton={true}
  isLoading={loading}
  skeleton={<MyCustomSkeleton />}
>
  <MyComponent />
</ScrollReveal>
```

## Diferenças vs Antes

### Antes
- Animações eram mais rápidas e menos suaves
- Não tinha suporte a skeleton
- Sem novas animações (blur, zoom-in)

### Agora
- ✅ Animações mais suaves e modernas (bounce effect)
- ✅ Skeleton loading integrado
- ✅ Novas opções de animação
- ✅ Performance otimizada (will-change)
- ✅ Root margin otimizado (revela mais cedo)

## Performance

O `will-change` é usado apenas durante a animação e depois removido, garantindo boa performance sem overhead desnecessário.

## Compatibilidade

Funciona com:
- ✅ Server Components (sem skeleton)
- ✅ Client Components (com ou sem skeleton)
- ✅ Dynamic imports
- ✅ Suspense boundaries
