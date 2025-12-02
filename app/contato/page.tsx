import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export const metadata = {
  title: "Fale Conosco | Primeira News",
  description: "Entre em contato com a equipe do Primeira News",
};

export default function ContatoPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      <Header />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Fale Conosco
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tem alguma dúvida, sugestão ou quer reportar alguma notícia? Entre em contato conosco através do formulário abaixo ou pelos nossos canais de atendimento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações de contato */}
          <div className="lg:col-span-1 space-y-6">
            {/* Card de Email */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">E-mail</h3>
                  <p className="text-sm text-gray-600">Resposta em até 24h</p>
                </div>
              </div>
              <a 
                href="mailto:contato@primeiranews.com" 
                className="text-blue-600 hover:text-blue-700 hover:underline break-all"
              >
                contato@primeiranews.com
              </a>
            </div>

            {/* Card de Horário */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Horário de Atendimento</h3>
                  <p className="text-sm text-gray-600">Segunda a Sexta</p>
                </div>
              </div>
              <p className="text-gray-700">
                9h às 18h<br />
                (Horário de Brasília)
              </p>
            </div>

            {/* Card de Localização */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Localização</h3>
                  <p className="text-sm text-gray-600">Nossa sede</p>
                </div>
              </div>
              <p className="text-gray-700">
                Brasil<br />
                Redação 100% digital
              </p>
            </div>

            {/* Informações adicionais */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-2">💡 Dica</h3>
              <p className="text-sm text-blue-800">
                Para uma resposta mais rápida, seja específico no assunto da sua mensagem e forneça o máximo de detalhes possível.
              </p>
            </div>
          </div>

          {/* Formulário de contato */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envie sua mensagem
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* FAQ rápido */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Perguntas Frequentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Como posso sugerir uma pauta?</h3>
              <p className="text-gray-600 text-sm">
                Utilize o formulário acima selecionando "Sugestão de Pauta" no campo assunto e descreva detalhadamente sua sugestão.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Quanto tempo demora para receber resposta?</h3>
              <p className="text-gray-600 text-sm">
                Nosso time responde todas as mensagens em até 24 horas úteis.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Posso reportar informações incorretas?</h3>
              <p className="text-gray-600 text-sm">
                Sim! Valorizamos a precisão das informações. Use o assunto "Correção" e indique qual notícia precisa ser revista.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Como faço para anunciar no site?</h3>
              <p className="text-gray-600 text-sm">
                Entre em contato pelo formulário com o assunto "Publicidade" que nossa equipe comercial retornará.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
