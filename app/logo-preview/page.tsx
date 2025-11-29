import Logo from "@/components/Logo";
import LogoGradient from "@/components/LogoGradient";
import Link from "next/link";

export default function LogoPreviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Voltar para Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Prévia do Logo P|N
        </h1>
        <p className="text-gray-600 mb-12">
          Escolha o estilo que mais combina com o seu site
        </p>

        {/* Logo Simples (Preto e Branco) */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            1. Logo Simples (Preto e Branco)
          </h2>

          {/* Fundo Branco */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
            <p className="text-sm text-gray-500 mb-4">Fundo Branco</p>
            <div className="flex items-center gap-8 flex-wrap">
              <div>
                <Logo size={32} />
                <p className="text-xs text-gray-400 mt-2">32px</p>
              </div>
              <div>
                <Logo size={48} />
                <p className="text-xs text-gray-400 mt-2">48px (padrão)</p>
              </div>
              <div>
                <Logo size={64} />
                <p className="text-xs text-gray-400 mt-2">64px</p>
              </div>
              <div>
                <Logo size={80} />
                <p className="text-xs text-gray-400 mt-2">80px</p>
              </div>
              <div>
                <Logo size={120} />
                <p className="text-xs text-gray-400 mt-2">120px</p>
              </div>
            </div>
          </div>

          {/* Fundo Cinza */}
          <div className="bg-gray-100 rounded-xl p-8 shadow-lg mb-6">
            <p className="text-sm text-gray-500 mb-4">Fundo Cinza</p>
            <div className="flex items-center gap-8 flex-wrap">
              <Logo size={32} />
              <Logo size={48} />
              <Logo size={64} />
              <Logo size={80} />
              <Logo size={120} />
            </div>
          </div>

          {/* Fundo Escuro */}
          <div className="bg-gray-900 rounded-xl p-8 shadow-lg">
            <p className="text-sm text-gray-400 mb-4">Fundo Escuro</p>
            <div className="flex items-center gap-8 flex-wrap">
              <Logo size={32} />
              <Logo size={48} />
              <Logo size={64} />
              <Logo size={80} />
              <Logo size={120} />
            </div>
          </div>
        </div>

        {/* Logo com Gradiente */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            2. Logo Moderno (Com Gradiente)
          </h2>

          {/* Fundo Branco */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
            <p className="text-sm text-gray-500 mb-4">Fundo Branco</p>
            <div className="flex items-center gap-8 flex-wrap">
              <div>
                <LogoGradient size={32} />
                <p className="text-xs text-gray-400 mt-2">32px</p>
              </div>
              <div>
                <LogoGradient size={48} />
                <p className="text-xs text-gray-400 mt-2">48px (padrão)</p>
              </div>
              <div>
                <LogoGradient size={64} />
                <p className="text-xs text-gray-400 mt-2">64px</p>
              </div>
              <div>
                <LogoGradient size={80} />
                <p className="text-xs text-gray-400 mt-2">80px</p>
              </div>
              <div>
                <LogoGradient size={120} />
                <p className="text-xs text-gray-400 mt-2">120px</p>
              </div>
            </div>
          </div>

          {/* Fundo Cinza */}
          <div className="bg-gray-100 rounded-xl p-8 shadow-lg mb-6">
            <p className="text-sm text-gray-500 mb-4">Fundo Cinza</p>
            <div className="flex items-center gap-8 flex-wrap">
              <LogoGradient size={32} />
              <LogoGradient size={48} />
              <LogoGradient size={64} />
              <LogoGradient size={80} />
              <LogoGradient size={120} />
            </div>
          </div>

          {/* Fundo Escuro */}
          <div className="bg-gray-900 rounded-xl p-8 shadow-lg">
            <p className="text-sm text-gray-400 mb-4">Fundo Escuro</p>
            <div className="flex items-center gap-8 flex-wrap">
              <LogoGradient size={32} />
              <LogoGradient size={48} />
              <LogoGradient size={64} />
              <LogoGradient size={80} />
              <LogoGradient size={120} />
            </div>
          </div>
        </div>

        {/* Exemplos de Uso */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            3. Exemplos de Uso no Header
          </h2>

          {/* Header exemplo 1 */}
          <div className="bg-white border-b shadow-sm rounded-xl overflow-hidden mb-4">
            <div className="flex items-center gap-4 p-4">
              <Logo size={40} />
              <div>
                <h3 className="font-bold text-gray-900">Primeira News</h3>
                <p className="text-xs text-gray-500">Notícias em primeira mão</p>
              </div>
            </div>
          </div>

          {/* Header exemplo 2 */}
          <div className="bg-gray-900 rounded-xl overflow-hidden mb-4">
            <div className="flex items-center gap-4 p-4">
              <LogoGradient size={40} />
              <div>
                <h3 className="font-bold text-white">Primeira News</h3>
                <p className="text-xs text-gray-400">Notícias em primeira mão</p>
              </div>
            </div>
          </div>

          {/* Header exemplo 3 - Compacto */}
          <div className="bg-blue-600 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <LogoGradient size={36} />
                <span className="font-bold text-white text-lg">P|N</span>
              </div>
              <div className="flex gap-4 text-white text-sm">
                <a href="#" className="hover:underline">Home</a>
                <a href="#" className="hover:underline">Notícias</a>
                <a href="#" className="hover:underline">Vídeos</a>
              </div>
            </div>
          </div>
        </div>

        {/* Como usar */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-3">💡 Como usar no código</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-blue-800 mb-2 font-medium">Logo Simples:</p>
              <code className="block bg-white px-4 py-2 rounded text-sm text-gray-800">
                {`import Logo from "@/components/Logo";`}<br/>
                {`<Logo size={48} />`}
              </code>
            </div>
            <div>
              <p className="text-sm text-blue-800 mb-2 font-medium">Logo com Gradiente:</p>
              <code className="block bg-white px-4 py-2 rounded text-sm text-gray-800">
                {`import LogoGradient from "@/components/LogoGradient";`}<br/>
                {`<LogoGradient size={48} />`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
