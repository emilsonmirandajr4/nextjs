import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function Header() {
  return (
    <header className="header-pn relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-50/50 via-transparent to-sky-50/50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo & Branding */}
          <div className="flex flex-col gap-1">
            <a href="https://primeiranews.com" className="group flex items-center gap-4 hover:opacity-90 transition-all duration-300">
              <div className="logo-icon-pn relative">
                <span className="relative z-10">PN</span>
                <div className="absolute inset-0 bg-sky-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight font-sans" style={{ fontWeight: 700 }}>
                <span className="text-gray-900">Primeira</span>
                <span className="text-sky-600 relative">
                  News
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-sky-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </span>
              </h1>
            </a>
            <p className="text-base md:text-lg text-gray-500 ml-[72px] tracking-wide font-sans">
              Noticias imparciais de politica, economia e mundo
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-1">
            {[
              { icon: Instagram, href: '#', label: 'Instagram' },
              { icon: Facebook, href: '#', label: 'Facebook' },
              { icon: Youtube, href: '#', label: 'Youtube' },
            ].map(({ icon: Icon, href, label }) => (
              <a 
                key={label}
                href={href} 
                aria-label={label}
                className="group relative p-3 rounded-full text-gray-500 hover:text-sky-600 transition-all duration-300"
              >
                <span className="absolute inset-0 rounded-full bg-sky-100 scale-0 group-hover:scale-100 transition-transform duration-300" />
                <Icon className="w-5 h-5 relative z-10" />
              </a>
            ))}
            <a 
              href="#" 
              aria-label="X (Twitter)"
              className="group relative p-3 rounded-full text-gray-500 hover:text-sky-600 transition-all duration-300"
            >
              <span className="absolute inset-0 rounded-full bg-sky-100 scale-0 group-hover:scale-100 transition-transform duration-300" />
              <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
    </header>
  );
}
