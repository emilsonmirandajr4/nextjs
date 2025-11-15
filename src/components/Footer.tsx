import { Newspaper, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Newspaper className="w-8 h-8 text-sky-600" />
              <h2 className="text-2xl font-bold">
                Primeira<span className="text-sky-600">News</span>
              </h2>
            </div>
            <p className="text-gray-400 mb-6">
              Seu portal de notícias confiável. Informação de qualidade,
              atualizada em tempo real para você estar sempre bem informado.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="hover:text-sky-600 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-sky-600 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-sky-600 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-sky-600 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contato@primeiranews.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Seções</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-sky-600 transition-colors">Política</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Economia</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Esportes</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Entretenimento</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Institucional</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-sky-600 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Anuncie</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Informações</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-sky-600 transition-colors">Redação 24h</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Certificação Digital</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Trabalhe Conosco</a></li>
              <li><a href="#" className="hover:text-sky-600 transition-colors">Seja um Colunista</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 PrimeiraNews. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
