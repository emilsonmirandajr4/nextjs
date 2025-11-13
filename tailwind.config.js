/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto Condensed', 'sans-serif'],
      },
      colors: {
        categoria: {
          politica: '#C41E3A',    // Vermelho mais profundo
          economia: '#1B4D3E',    // Verde escuro
          esporte: '#1E5BC4',     // Azul vibrante
          cultura: '#8B4513',     // Marrom quente
          tecnologia: '#4B0082',  // Índigo
          default: '#0284c7',     // Sky-600
        },
        texto: {
          principal: '#111827',   // Quase preto
          secundario: '#374151',  // Cinza escuro
          terciario: '#6B7280',   // Cinza médio
        },
        fundo: {
          card: '#FFFFFF',
          destaque: '#F8FAFC',
          hover: '#F1F5F9',
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'destaque': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
