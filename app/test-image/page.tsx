import Image from 'next/image';
import OptimizedImage from '@/components/OptimizedImage';
import TestImageClient from './TestImageClient';

export default function TestImagePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Teste Next.js Image</h1>
      
      {/* Teste com monitoramento de status */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">0. Teste com Status Monitor</h2>
        <TestImageClient />
      </section>
      
      {/* Teste 1: Next.js Image direto */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Next.js Image direto</h2>
        <div className="relative w-full h-64">
          <Image
            src="https://primeiranews.com.br/wp-content/uploads/2024/01/logo-primeira-news.png"
            alt="Logo Primeira News"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* Teste 2: Next.js Image com width/height */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Next.js Image com width/height</h2>
        <Image
          src="https://primeiranews.com.br/wp-content/uploads/2024/01/logo-primeira-news.png"
          alt="Logo Primeira News"
          width={400}
          height={200}
          className="object-contain"
        />
      </section>

      {/* Teste 3: OptimizedImage (componente customizado) */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">3. OptimizedImage (TwicPics + Next.js fallback)</h2>
        <div className="w-full h-64">
          <OptimizedImage
            src="https://primeiranews.com.br/wp-content/uploads/2024/01/logo-primeira-news.png"
            alt="Logo Primeira News"
            ratio="16/9"
            priority="high"
          />
        </div>
      </section>

      {/* Teste 4: Imagem externa (YouTube) */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">4. Imagem externa (YouTube)</h2>
        <Image
          src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
          alt="YouTube thumbnail"
          width={480}
          height={360}
          className="object-cover"
        />
      </section>

      {/* Teste 5: Verificação de configuração */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">5. Status da Configuração</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p className="mb-2"><strong>Domínios permitidos:</strong></p>
          <ul className="list-disc list-inside">
            <li>primeiranews.com.br</li>
            <li>primeiranews.twic.pics</li>
            <li>img.youtube.com</li>
          </ul>
          <p className="mt-4"><strong>Formatos:</strong> AVIF</p>
          <p className="mt-2"><strong>Device Sizes:</strong> 640, 750, 828, 1080, 1200, 1920, 2048, 3840</p>
        </div>
      </section>
    </div>
  );
}
