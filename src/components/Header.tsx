"use client";

import LogoComplete from "@/components/LogoComplete";
import { Search, Youtube, Facebook, Instagram } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implementar busca aqui
      console.log("Buscando:", searchQuery);
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
                <Youtube className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
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
                <Facebook className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-pink-50 transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-600 group-hover:text-pink-600 transition-colors" />
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
                    <Search className="w-4 h-4 text-gray-600" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
                  aria-label="Abrir busca"
                >
                  <Search className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
