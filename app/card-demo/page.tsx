"use client";

import { useState, useEffect } from 'react';
import { getPostImage, getPostTitle } from '@/services/wordpress';
import { getPostUrl } from '@/utils/navigation';
import type { WordPressPost } from '@/types/wordpress';

import GlassCardSection from '@/components/demo/GlassCardSection';

// Adapter para converter WordPressPost
function adaptPosts(posts: WordPressPost[]) {
  return posts.map(post => ({
    id: post.id,
    title: getPostTitle(post),
    image: getPostImage(post),
    url: getPostUrl(post),
  }));
}

export default function CardDemoPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar posts reais
    fetch('/api/posts?per_page=9&page=1')
      .then(res => res.json())
      .then(data => {
        const wordpressPosts = data.posts || [];
        setPosts(adaptPosts(wordpressPosts));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Configurações dos filtros
  const b = 6; // border width
  const r = Math.round(0.25 * b);
  const m = 2; // margin multiplier

  return (
    <div className="min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center p-8">
      
      {/* SVG Filters Definition (Hidden) */}
      <svg width="0" height="0" aria-hidden="true" className="fixed">
        {/* Glow Filter 0: Smooth Glow */}
        <filter id="glow-0" x="-.25" y="-.25" width="1.5" height="1.5">
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 2 0"/>
          </feComponentTransfer>
          <feGaussianBlur stdDeviation={r}/>
          <feComponentTransfer result="rond">
            <feFuncA type="table" tableValues={`${-r} ${r + 1}`}/>
          </feComponentTransfer>
          <feMorphology operator="dilate" radius={0.5 * b}/>
          <feGaussianBlur stdDeviation={b}/>
          <feBlend in="rond" result="glow"/>
          <feComponentTransfer in="SourceGraphic">
            <feFuncA type="table" tableValues="0 0 1"/>
          </feComponentTransfer>
          <feBlend in2="glow"/>
        </filter>
        
        {/* Glow Filter 1: Turbulent/Noise Glow */}
        <filter id="glow-1" x="-.25" y="-.25" width="1.5" height="1.5">
          <feComponentTransfer in="SourceGraphic" result="grad">
            <feFuncA type="table" tableValues="0 2 0"/>
          </feComponentTransfer>
          <feMorphology operator="dilate" radius={0.5 * b}/>
          <feGaussianBlur stdDeviation={b} result="glow"/>
          <feTurbulence type="fractalNoise" baseFrequency="7.13"/>
          <feDisplacementMap in="glow" scale={m * b} yChannelSelector="R"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope=".8"/>
          </feComponentTransfer>
          <feBlend in="grad" result="out"/>
          <feComponentTransfer in="SourceGraphic">
            <feFuncA type="table" tableValues="0 0 1"/>
          </feComponentTransfer>
          <feBlend in2="out"/>
        </filter>
      </svg>

      <style jsx global>{`
        @property --a {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes spin-gradient {
          to { --a: 1turn }
        }

        .glow-card {
          box-sizing: border-box;
          border: solid ${b}px #0000;
          border-radius: ${2 * b}px;
          background: repeating-conic-gradient(from var(--a, 0deg), var(--l)) border-box;
          filter: var(--f, url(#glow-0));
          animation: spin-gradient 2s linear infinite;
          /* Performance optimization */
          will-change: --a; 
          transform: translateZ(0);
        }
      `}</style>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#dedede] mb-4 font-serif">
          SVG Filter + CSS Property Glow
        </h1>
        <p className="text-gray-400">
          Técnica ultra-leve usando filtros SVG e @property para animação de borda
        </p>
      </div>

      {loading ? (
        <div className="text-white">Carregando exemplos...</div>
      ) : (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-7xl">
          
          {/* Card 1: Blue/Purple Smooth */}
          <div className="relative aspect-square">
            <img 
              src={posts[0]?.image || "https://images.unsplash.com/photo-1512206533059-361c5b6c40a4?w=400"}
              className="glow-card w-full h-full object-cover"
              style={{
                '--l': '#0000 0% 70%, #0000ff7f',
                '--f': 'url(#glow-0)'
              } as React.CSSProperties}
              alt="Demo 1"
            />
            <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-shadow-sm pointer-events-none">
              Smooth Blue
            </div>
          </div>

          {/* Card 2: Colorful Turbulent */}
          <div className="relative aspect-square">
            <img 
              src={posts[1]?.image || "https://images.unsplash.com/photo-1587586062323-836089e60d52?w=400"}
              className="glow-card w-full h-full object-cover"
              style={{
                '--f': 'url(#glow-1)',
                '--l': '#ff45457f, #00ff997f, #006aff7f, #ff00957f, #ff45457f'
              } as React.CSSProperties}
              alt="Demo 2"
            />
             <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-shadow-sm pointer-events-none">
              Turbulent RGB
            </div>
          </div>

          {/* Card 3: Purple/Gold Radar */}
          <div className="relative aspect-square">
            <img 
              src={posts[2]?.image || "https://images.unsplash.com/photo-1495287924875-c158d2e8aafc?w=400"}
              className="glow-card w-full h-full object-cover"
              style={{
                '--l': '#0000 0% 35%, #24004619, #3c096c32, #5a189a4b, #7b2cbf64, #9d4edd7f',
                '--f': 'url(#glow-0)'
              } as React.CSSProperties}
              alt="Demo 3"
            />
            <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-shadow-sm pointer-events-none">
              Radar Sweep
            </div>
          </div>

          {/* Card 4: Earth Tones Turbulent */}
          <div className="relative aspect-square">
            <img 
              src={posts[3]?.image || "https://images.unsplash.com/photo-1515056140641-c645caffe247?w=400"}
              className="glow-card w-full h-full object-cover"
              style={{
                '--f': 'url(#glow-1)',
                '--l': '#cb997e7f, #ffe8d67f, #a5a58d7f, #6b705c7f, #cb997e7f'
              } as React.CSSProperties}
              alt="Demo 4"
            />
            <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-shadow-sm pointer-events-none">
              Turbulent Earth
            </div>
          </div>

          {/* Card 5: Neon Purple Pulse */}
          <div className="relative aspect-square">
            <img 
              src={posts[4]?.image || "https://images.unsplash.com/photo-1509857820193-a5c67e4c20ab?w=400"}
              className="glow-card w-full h-full object-cover"
              style={{
                '--l': '#0000 0%, #f7258520, #7209b740, #3a0ca360, #4361ee7f',
                '--f': 'url(#glow-0)'
              } as React.CSSProperties}
              alt="Demo 5"
            />
            <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-shadow-sm pointer-events-none">
              Neon Pulse
            </div>
          </div>

          {/* Card 6: Pastel Turbulent */}
          <div className="relative aspect-square">
            <img 
              src={posts[5]?.image || "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=400"}
              className="glow-card w-full h-full object-cover"
              style={{
                '--f': 'url(#glow-1)',
                '--l': '#7bdff27f, #b2f7ef7f, #eff7f67f, #f7d6e07f, #f2b5d47f, #7bdff27f'
              } as React.CSSProperties}
              alt="Demo 6"
            />
            <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-shadow-sm pointer-events-none">
              Pastel Noise
            </div>
          </div>

          {/* Card 7: Pink/Blue Split */}
          <div className="relative aspect-square">
            <img 
              src={posts[6]?.image || "https://images.unsplash.com/photo-1618741292719-31020a29952c?w=400"}
              className="glow-card w-full h-full object-cover"
              style={{
                '--l': '#0000 0% 85%, #936bff7f 0%, #b892ff7f, #ffc2e27f, #ff90b37f',
                '--f': 'url(#glow-0)'
              } as React.CSSProperties}
              alt="Demo 7"
            />
             <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-shadow-sm pointer-events-none">
              Split Gradient
            </div>
          </div>

          {/* Card 8: Fire Turbulent */}
          <div className="relative aspect-square">
            <img 
              src={posts[7]?.image || "https://images.unsplash.com/photo-1618681317438-a8dd7da06cd4?w=400"}
              className="glow-card w-full h-full object-cover"
              style={{
                '--f': 'url(#glow-1)',
                '--l': '#7801167f, #f7b5387f, #db7c267f, #d8572a7f, #c32f277f, #7801167f'
              } as React.CSSProperties}
              alt="Demo 8"
            />
            <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-shadow-sm pointer-events-none">
              Fire Storm
            </div>
          </div>

           {/* Card 9: Fire Radar */}
           <div className="relative aspect-square">
            <img 
              src={posts[8]?.image || "https://images.unsplash.com/photo-1549888834-3ec93abae044?w=400"}
              className="glow-card w-full h-full object-cover"
              style={{
                '--l': '#0000 0% 25%, #f3b70019 0%, #faa30032, #e57c044b, #ff620164, #f63e027f 50%',
                '--f': 'url(#glow-0)'
              } as React.CSSProperties}
              alt="Demo 9"
            />
            <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-shadow-sm pointer-events-none">
              Fire Radar
            </div>
          </div>

        </main>
      )}

      {/* Divider */}
      <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-16" />

      {/* Fancy Layered Shadows Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[#dedede] mb-4 font-serif">
          Fancy Layered Shadows
        </h2>
        <p className="text-gray-400">
          Sombras em camadas para profundidade 3D e estilo pop
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full max-w-7xl px-4 pb-20">
        
        {/* 1. Original Pink (Bottom-Left) */}
        <div className="fancy-card bg-white text-gray-900" style={{
          '--shadow-color': '240, 46, 170',
          '--dx': '-5px',
          '--dy': '5px'
        } as React.CSSProperties}>
          <div className="text-xl font-extrabold mb-2 text-pink-600">Retro Pink</div>
          <p className="font-medium text-gray-600">
            Estilo original com sombra em camadas caindo para a esquerda.
          </p>
        </div>

        {/* 2. Cyan Future (Bottom-Right) */}
        <div className="fancy-card bg-zinc-900 text-white" style={{
          '--shadow-color': '6, 182, 212',
          '--dx': '5px',
          '--dy': '5px'
        } as React.CSSProperties}>
          <div className="text-xl font-extrabold mb-2 text-cyan-400">Cyan Future</div>
          <p className="font-medium text-gray-400">
            Tema escuro com sombra caindo para a direita inferior.
          </p>
        </div>

        {/* 3. Toxic Green (Top-Right) */}
        <div className="fancy-card bg-[#1a1a1a] text-white" style={{
          '--shadow-color': '132, 204, 22',
          '--dx': '5px',
          '--dy': '-5px'
        } as React.CSSProperties}>
          <div className="text-xl font-extrabold mb-2 text-lime-400">Toxic Green</div>
          <p className="font-medium text-gray-400">
            Sombra projetada para cima e direita. Visual tóxico.
          </p>
        </div>

        {/* 4. Royal Purple (Top-Left) */}
        <div className="fancy-card bg-white text-gray-900" style={{
          '--shadow-color': '124, 58, 237',
          '--dx': '-5px',
          '--dy': '-5px'
        } as React.CSSProperties}>
          <div className="text-xl font-extrabold mb-2 text-violet-600">Royal Purple</div>
          <p className="font-medium text-gray-600">
            Elegância com sombra violeta projetada para o topo esquerdo.
          </p>
        </div>

        {/* 5. Sunset Multi-Layer (Custom) */}
        <div className="relative bg-zinc-900 p-6 rounded-[20px] flex flex-col transition-transform hover:-translate-y-2 duration-300"
             style={{
               boxShadow: `
                 rgba(249, 115, 22, 0.4) 5px 5px,
                 rgba(234, 88, 12, 0.3) 10px 10px,
                 rgba(220, 38, 38, 0.2) 15px 15px,
                 rgba(185, 28, 28, 0.1) 20px 20px,
                 rgba(153, 27, 27, 0.05) 25px 25px
               `
             }}>
          <div className="text-xl font-extrabold mb-2 text-orange-500">Sunset Gradient</div>
          <p className="font-medium text-gray-400">
            Cada camada da sombra tem uma cor diferente do pôr do sol.
          </p>
        </div>

        {/* 6. Matrix Glitch */}
        <div className="relative bg-black border border-green-900 p-6 rounded-[20px] flex flex-col transition-transform hover:-translate-y-2 duration-300"
             style={{
               boxShadow: `
                 rgba(0, 255, 65, 0.4) -5px 5px,
                 rgba(0, 255, 65, 0.3) -10px 10px,
                 rgba(0, 255, 65, 0.2) -15px 15px,
                 rgba(0, 20, 0, 0.8) -5px 5px 20px inset
               `
             }}>
          <div className="text-xl font-extrabold mb-2 text-green-500 font-mono">MATRIX_GLITCH</div>
          <p className="font-medium text-green-900 font-mono">
            System.out.println("Follow the white rabbit");
          </p>
        </div>

      </div>

      {/* Divider */}
      <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-16" />

      <GlassCardSection />

      <style jsx>{`
        .fancy-card {
          border-radius: 20px;
          padding: 25px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
          box-shadow: 
            rgba(var(--shadow-color), 0.4) calc(1 * var(--dx)) calc(1 * var(--dy)),
            rgba(var(--shadow-color), 0.3) calc(2 * var(--dx)) calc(2 * var(--dy)),
            rgba(var(--shadow-color), 0.2) calc(3 * var(--dx)) calc(3 * var(--dy)),
            rgba(var(--shadow-color), 0.1) calc(4 * var(--dx)) calc(4 * var(--dy)),
            rgba(var(--shadow-color), 0.05) calc(5 * var(--dx)) calc(5 * var(--dy));
        }
        
        .fancy-card:hover {
          transform: translate(calc(-1 * var(--dx)), calc(-1 * var(--dy)));
        }
      `}</style>
    </div>
  );
}

