/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Roboto Condensed',
  				'sans-serif'
  			]
  		},
  		colors: {
  			categoria: {
  				politica: '#C41E3A',
  				economia: '#1B4D3E',
  				esporte: '#1E5BC4',
  				cultura: '#8B4513',
  				tecnologia: '#4B0082',
  				default: '#0284c7'
  			},
  			texto: {
  				principal: '#111827',
  				secundario: '#374151',
  				terciario: '#6B7280'
  			},
  			fundo: {
  				card: '#FFFFFF',
  				destaque: '#F8FAFC',
  				hover: '#F1F5F9'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  			'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  			destaque: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'background-position-spin': 'background-position-spin 3s linear infinite',
  			'gradient-xy': 'gradient-xy 3s ease infinite',
  			'spin-slow': 'spin 4s linear infinite',
  		},
  		keyframes: {
  			'background-position-spin': {
  				'0%': { backgroundPosition: 'top center' },
  				'100%': { backgroundPosition: 'bottom center' },
  			},
  			'gradient-xy': {
  				'0%, 100%': { backgroundPosition: '0% 50%' },
  				'25%': { backgroundPosition: '100% 50%' },
  				'50%': { backgroundPosition: '100% 100%' },
  				'75%': { backgroundPosition: '50% 100%' },
  			},
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
