import { NeonGradientCard } from '@/components/ui/neon-gradient-card';
import { RotatingBorderCard } from '@/components/ui/rotating-border-card';

export default function CardDemoPage() {
  return (
    <div className="min-h-screen bg-[#1c1c1c] flex flex-col items-center justify-center p-8 gap-16">
      <style>{`
        .glow-svg-card {
          position: relative;
          width: 360px;
          height: 220px;
        }

        .glow-svg-card__glow {
          position: absolute;
          inset: 0;
          background: url('/glow-red.svg') center/cover no-repeat;
          pointer-events: none;
          animation: glow-svg-pulse 3s ease-in-out infinite;
        }

        .glow-svg-card__inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background:
            radial-gradient(circle at top left, rgba(248,113,113,0.18), transparent 55%),
            #020617;
          border: 1px solid rgba(248,113,113,0.5);
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow:
            0 20px 40px rgba(0,0,0,0.7),
            0 0 25px rgba(248,113,113,0.35);
        }

        @keyframes glow-svg-pulse {
          0%, 100% {
            opacity: 0.75;
            transform: scale(0.98);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
        }
      `}</style>
      
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

      {/* SVG Glow Red Card Demo */}
      <section className="flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-white">SVG Glow Red Card (demo)</h2>
        <div className="glow-svg-card">
          <div className="glow-svg-card__glow" />
          <div className="glow-svg-card__inner">
            <div className="space-y-1">
              <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                Destaque
              </p>
              <h3 className="text-2xl font-bold text-white leading-tight">
                Borda em SVG com glow vermelho leve
              </h3>
              <p className="text-sm text-slate-300">
                Efeito de brilho usando um SVG otimizado como fundo, animando apenas
                escala e opacidade para aliviar o custo visual.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-slate-400">
                Pensado para ser reaproveitado em carrosséis e cards de destaque.
              </span>
              <span className="inline-flex items-center rounded-full border border-red-500/50 px-3 py-1 text-xs font-semibold text-red-300 bg-red-950/40">
                Glow SVG
              </span>
            </div>
          </div>
        </div>
      </section>

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
