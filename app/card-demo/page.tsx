import { NeonGradientCard } from '@/components/ui/neon-gradient-card';
import { RotatingBorderCard } from '@/components/ui/rotating-border-card';

export default function CardDemoPage() {
  return (
    <div className="min-h-screen bg-[#1c1c1c] flex flex-col items-center justify-center p-8 gap-16">
      
      {/* Rotating Border Cards */}
      <h2 className="text-3xl font-bold text-white">Rotating Border Cards</h2>
      <div className="flex flex-wrap gap-8 justify-center">
        <RotatingBorderCard
          title="01"
          subtitle="Card Title"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, quidem veniam! Esse quibusdam blanditiis!"
          buttonText="Read More"
        />
        
        <RotatingBorderCard
          title="02"
          subtitle="Blue Cyan"
          description="Uma variacao com cores azul e ciano para um visual mais tech e moderno."
          buttonText="Explorar"
          gradientColors={{ from: '#3b82f6', to: '#06b6d4' }}
        />

        <RotatingBorderCard
          title="03"
          subtitle="Green Emerald"
          description="Verde vibrante para projetos relacionados a natureza ou sustentabilidade."
          buttonText="Ver Mais"
          gradientColors={{ from: '#10b981', to: '#22c55e' }}
        />
      </div>

      {/* Divider */}
      <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

      {/* Neon Gradient Cards */}
      <h2 className="text-3xl font-bold text-white">Neon Gradient Cards</h2>
      
      {/* Hero Demo */}
      <NeonGradientCard className="max-w-sm items-center justify-center text-center">
        <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          Neon Gradient Card
        </span>
      </NeonGradientCard>

      {/* Variations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl w-full">
        
        {/* Blue/Purple */}
        <NeonGradientCard 
          className="items-center justify-center text-center"
          neonColors={{ firstColor: '#3b82f6', secondColor: '#8b5cf6' }}
        >
          <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-br from-[#3b82f6] from-35% to-[#8b5cf6] bg-clip-text text-4xl font-bold leading-none tracking-tighter text-transparent">
            Blue Purple
          </span>
        </NeonGradientCard>

        {/* Green/Cyan */}
        <NeonGradientCard 
          className="items-center justify-center text-center"
          neonColors={{ firstColor: '#10b981', secondColor: '#06b6d4' }}
        >
          <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-br from-[#10b981] from-35% to-[#06b6d4] bg-clip-text text-4xl font-bold leading-none tracking-tighter text-transparent">
            Green Cyan
          </span>
        </NeonGradientCard>

        {/* Orange/Red */}
        <NeonGradientCard 
          className="items-center justify-center text-center"
          neonColors={{ firstColor: '#f97316', secondColor: '#ef4444' }}
        >
          <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-br from-[#f97316] from-35% to-[#ef4444] bg-clip-text text-4xl font-bold leading-none tracking-tighter text-transparent">
            Orange Red
          </span>
        </NeonGradientCard>

        {/* Yellow/Pink */}
        <NeonGradientCard 
          className="items-center justify-center text-center"
          neonColors={{ firstColor: '#facc15', secondColor: '#ec4899' }}
        >
          <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-br from-[#facc15] from-35% to-[#ec4899] bg-clip-text text-4xl font-bold leading-none tracking-tighter text-transparent">
            Yellow Pink
          </span>
        </NeonGradientCard>

        {/* Sky Blue - PrimeiraNews */}
        <NeonGradientCard 
          className="items-center justify-center text-center"
          neonColors={{ firstColor: '#0284c7', secondColor: '#0ea5e9' }}
          borderSize={3}
        >
          <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-br from-[#0284c7] from-35% to-[#0ea5e9] bg-clip-text text-4xl font-bold leading-none tracking-tighter text-transparent">
            Sky Blue
          </span>
        </NeonGradientCard>

        {/* Indigo/Violet */}
        <NeonGradientCard 
          className="items-center justify-center text-center"
          neonColors={{ firstColor: '#6366f1', secondColor: '#a855f7' }}
        >
          <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-br from-[#6366f1] from-35% to-[#a855f7] bg-clip-text text-4xl font-bold leading-none tracking-tighter text-transparent">
            Indigo Violet
          </span>
        </NeonGradientCard>

      </div>
    </div>
  );
}
