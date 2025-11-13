import { Home, Users, Shield, FolderOpen, FileText, Search } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'INÍCIO' },
  { icon: Users, label: 'QUEM SOMOS' },
  { icon: Shield, label: 'POLÍTICA DE PRIVACIDADE' },
  { icon: FolderOpen, label: 'CATEGORIAS' },
  { icon: FileText, label: 'ARTIGOS' },
];

export default function Navigation() {
  return (
    <nav className="bg-black text-white sticky top-0 z-40 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 overflow-x-auto py-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isHome = item.label === 'INÍCIO';
            const Element = isHome ? 'a' : 'button';
            const extraProps = isHome ? { href: 'https://primeiranews.com' } : {};
            return (
              <Element
                key={item.label}
                {...extraProps}
                className="flex items-center space-x-2 whitespace-nowrap px-4 py-3 text-sm font-medium hover:bg-gray-900 hover:text-sky-400 transition-all duration-300 relative group"
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-sky-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Element>
            );
          })}
          </div>
          <button className="p-2 hover:bg-gray-900 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
}
