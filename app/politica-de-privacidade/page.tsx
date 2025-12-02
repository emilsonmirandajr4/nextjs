import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Eye, Lock, FileText, Mail, Calendar } from "lucide-react";

export const metadata = {
  title: "Política de Privacidade | Primeira News",
  description: "Política de privacidade e proteção de dados do Primeira News",
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      <Header />
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Política de Privacidade
          </h1>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            Última atualização: Dezembro de 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8">
          {/* Seção 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">1. Informações que Coletamos</h2>
            </div>
            <div className="text-gray-700 space-y-3 pl-13">
              <p>
                No Primeira News, coletamos informações para fornecer a melhor experiência de leitura. As informações coletadas incluem:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Informações de navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas e tempo de permanência</li>
                <li><strong>Cookies:</strong> Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site</li>
                <li><strong>Dados de contato:</strong> Nome e e-mail quando você entra em contato conosco</li>
              </ul>
            </div>
          </section>

          {/* Seção 2 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">2. Como Usamos suas Informações</h2>
            </div>
            <div className="text-gray-700 space-y-3 pl-13">
              <p>Utilizamos as informações coletadas para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Melhorar a experiência de navegação no site</li>
                <li>Analisar tendências e comportamento dos leitores</li>
                <li>Responder a seus contatos e solicitações</li>
                <li>Enviar comunicações relevantes (se autorizado)</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </div>
          </section>

          {/* Seção 3 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">3. Proteção de Dados</h2>
            </div>
            <div className="text-gray-700 space-y-3 pl-13">
              <p>
                A segurança dos seus dados é nossa prioridade. Implementamos medidas técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
              <p>
                Nossos servidores utilizam criptografia SSL/TLS e seguimos as melhores práticas de segurança da informação.
              </p>
            </div>
          </section>

          {/* Seção 4 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">4. Seus Direitos</h2>
            </div>
            <div className="text-gray-700 space-y-3 pl-13">
              <p>De acordo com a LGPD (Lei Geral de Proteção de Dados), você tem direito a:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
                <li>Revogar o consentimento</li>
                <li>Obter informações sobre o compartilhamento de dados</li>
              </ul>
            </div>
          </section>

          {/* Seção 5 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">5. Cookies</h2>
            </div>
            <div className="text-gray-700 space-y-3 pl-13">
              <p>
                Utilizamos cookies para melhorar sua experiência de navegação. Os cookies são pequenos arquivos de texto armazenados no seu dispositivo que nos ajudam a entender como você usa o site.
              </p>
              <p>
                Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do site.
              </p>
            </div>
          </section>

          {/* Seção 6 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">6. Contato</h2>
            </div>
            <div className="text-gray-700 space-y-3 pl-13">
              <p>
                Para exercer seus direitos ou esclarecer dúvidas sobre nossa política de privacidade, entre em contato:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mt-3">
                <p className="font-semibold text-gray-900">E-mail:</p>
                <a href="mailto:contato@primeiranews.com" className="text-blue-600 hover:text-blue-700 hover:underline">
                  contato@primeiranews.com
                </a>
              </div>
            </div>
          </section>

          {/* Rodapé */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Esta política pode ser atualizada periodicamente. Recomendamos que você revise regularmente esta página para se manter informado sobre como protegemos suas informações.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
