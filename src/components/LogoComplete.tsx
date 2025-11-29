interface LogoCompleteProps {
  width?: number;
  className?: string;
}

export default function LogoComplete({ width = 400, className = "" }: LogoCompleteProps) {
  // Calcula altura proporcional (mantém aspect ratio)
  const height = width * 0.35; // Proporção ajustada para o novo design

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 600 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradiente suave para o círculo do logo */}
        <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>

        {/* Gradiente para o texto principal */}
        <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#111827" />
          <stop offset="100%" stopColor="#1f2937" />
        </linearGradient>

        {/* Sombra suave */}
        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.15"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Círculo do Logo P|N */}
      <g filter="url(#softShadow)">
        {/* Círculo de fundo */}
        <circle
          cx="80"
          cy="90"
          r="65"
          fill="url(#circleGradient)"
          stroke="#ffffff"
          strokeWidth="3"
        />

        {/* Círculo interno (borda decorativa) */}
        <circle
          cx="80"
          cy="90"
          r="62"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
        />

        {/* Letra P */}
        <path
          d="M 52 70 L 52 110 M 52 70 L 66 70 Q 73 70 73 79 Q 73 90 66 90 L 52 90"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Barra vertical separadora com gradiente */}
        <line
          x1="80"
          y1="74"
          x2="80"
          y2="106"
          stroke="#ffffff"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Letra N */}
        <path
          d="M 90 110 L 90 70 L 108 110 L 108 70"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Título "Primeira News" */}
      <text
        x="170"
        y="95"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif"
        fontSize="52"
        fontWeight="900"
        fill="url(#titleGradient)"
        letterSpacing="-1"
      >
        Primeira
        <tspan fill="#0ea5e9" dx="8">News</tspan>
      </text>

      {/* Linha decorativa sutil abaixo do título */}
      <line
        x1="170"
        y1="105"
        x2="480"
        y2="105"
        stroke="#0ea5e9"
        strokeWidth="2"
        opacity="0.3"
        strokeLinecap="round"
      />

      {/* Subtítulo */}
      <text
        x="170"
        y="130"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif"
        fontSize="18"
        fontWeight="400"
        fill="#6b7280"
        letterSpacing="0.5"
      >
        Notícias imparciais de política, economia e mundo
      </text>

      {/* Animação sutil opcional (pode ser removida se não quiser) */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }

          /* Animação suave no círculo ao passar o mouse */
          svg:hover circle[stroke="#ffffff"] {
            animation: pulse 2s ease-in-out infinite;
          }
        `}
      </style>
    </svg>
  );
}
