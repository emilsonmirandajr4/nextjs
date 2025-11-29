interface LogoGradientProps {
  size?: number;
  className?: string;
}

export default function LogoGradient({ size = 48, className = "" }: LogoGradientProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradiente do fundo */}
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>

        {/* Gradiente das letras */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0e7ff" />
        </linearGradient>

        {/* Sombra */}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Círculo de fundo com gradiente */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="url(#bgGradient)"
        filter="url(#shadow)"
      />

      {/* Círculo interno (borda) */}
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1"
      />

      {/* Letra P */}
      <path
        d="M 28 35 L 28 65 M 28 35 L 38 35 Q 43 35 43 42 Q 43 50 38 50 L 28 50"
        stroke="url(#textGradient)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Barra vertical separadora com brilho */}
      <line
        x1="50"
        y1="38"
        x2="50"
        y2="62"
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Letra N */}
      <path
        d="M 58 65 L 58 35 L 72 65 L 72 35"
        stroke="url(#textGradient)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
