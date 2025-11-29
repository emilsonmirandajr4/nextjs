interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 48, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Círculo de fundo preto */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="#000000"
        stroke="#ffffff"
        strokeWidth="2"
      />

      {/* Letra P */}
      <path
        d="M 28 35 L 28 65 M 28 35 L 38 35 Q 43 35 43 42 Q 43 50 38 50 L 28 50"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Barra vertical separadora */}
      <line
        x1="50"
        y1="38"
        x2="50"
        y2="62"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Letra N */}
      <path
        d="M 58 65 L 58 35 L 72 65 L 72 35"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
