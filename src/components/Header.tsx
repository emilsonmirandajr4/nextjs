"use client";

import { useRouter } from "next/navigation";
import LogoComplete from "@/components/LogoComplete";
// SVG icons inline para reduzir bundle (evita carregar lucide-react)
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-0.5">
        <div className="flex items-center justify-between gap-8">
          {/* Logo Completo em SVG - Lado Esquerdo */}
          <div className="flex items-center">
            <LogoComplete width={450} className="w-full max-w-md" />
          </div>

          {/* Ícones Sociais e Busca - Lado Direito */}
          <div className="flex items-center gap-4">
            {/* Redes Sociais */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-red-50 transition-colors group"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
                aria-label="X (Twitter)"
              >
                <svg
                  className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-blue-50 transition-colors group"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-pink-50 transition-colors group"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5 text-gray-600 group-hover:text-pink-600 transition-colors" />
              </a>
            </div>

            {/* Divisor */}
            <div className="hidden md:block w-px h-8 bg-gray-300"></div>

            {/* Busca */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar..."
                    className="w-48 md:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    autoFocus
                    onBlur={() => {
                      if (!searchQuery) {
                        setTimeout(() => setSearchOpen(false), 200);
                      }
                    }}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Buscar"
                  >
                    <SearchIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
                  aria-label="Abrir busca"
                >
                  <SearchIcon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
