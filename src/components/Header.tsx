import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function Header() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');
        
        .header-pn {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(14,165,233,0.3);
        }
        
        .logo-icon-pn {
          position: relative;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          font-weight: bold;
          color: white;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
          animation: shine 3s infinite;
          flex-shrink: 0;
          font-family: 'Roboto Condensed', sans-serif;
          overflow: hidden;
        }
        
        .logo-icon-pn::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: rotate(45deg);
          pointer-events: none;
        }
        
        @keyframes shine {
          0%, 100% { box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 15px 4px rgba(59, 130, 246, 0.6); }
        }
      `}</style>
      <header className="header-pn">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <a href="https://primeiranews.com" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="logo-icon-pn">PN</div>
                <h1 className="text-6xl font-bold" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 700 }}>
                  <span className="text-gray-900">Primeira</span><span className="text-sky-600">News</span>
                </h1>
              </a>
              <p className="text-xl text-gray-600 ml-20" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                Notícias imparciais de política, economia e mundo
              </p>
            </div>
            <div className="flex items-center gap-4">
            <a href="#" className="text-gray-700 hover:text-sky-600 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-700 hover:text-sky-600 transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-700 hover:text-sky-600 transition-colors">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-700 hover:text-sky-600 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
