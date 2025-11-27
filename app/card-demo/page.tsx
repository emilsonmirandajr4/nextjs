import { RotatingBorderCard } from '@/components/ui/rotating-border-card';

export default function CardDemoPage() {
  return (
    <div className="min-h-screen bg-[#1c1c1c] flex flex-col items-center justify-center p-8 gap-16">
      <style>{`
        .glow-svg-card {
          position: relative;
          width: 360px;
          height: 220px;
          border-radius: 16px;
          overflow: hidden;
        }

        .glow-svg-card__glow {
          position: absolute;
          inset: -14px;
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
            radial-gradient(circle at top left, rgba(56,189,248,0.16), transparent 55%),
            #020617;
          border: 1px solid rgba(148,163,184,0.65);
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow:
            0 20px 40px rgba(0,0,0,0.85);
        }

        @keyframes glow-svg-pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
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
        <div className="flex flex-wrap gap-8 justify-center">
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
        
        {/* Large border version */}
        <div className="glow-svg-card" style={{ position: 'relative' }}>
          <div className="glow-svg-card__glow" style={{ background: 'url(\'/glow-red-large.svg\') center/cover no-repeat' }} />
          <div className="glow-svg-card__inner">
            <div className="space-y-1">
              <p className="text-sm uppercase tracking-[0.2em] text-red-400">
                Destaque Large
              </p>
              <h3 className="text-2xl font-bold text-white leading-tight">
                Borda MAIOR em SVG
              </h3>
              <p className="text-sm text-slate-300">
                Mesma técnica, mas com borda mais grossa e glow mais intenso para comparação.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-slate-400">
                Compare com o card ao lado para ver a diferença.
              </span>
              <span className="inline-flex items-center rounded-full border border-red-500/50 px-3 py-1 text-xs font-semibold text-red-300 bg-red-950/40">
                Large Border
              </span>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
