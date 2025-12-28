'use client'; // Essencial: diz ao Next.js para rodar isso no navegador

import { useState, useEffect } from 'react';

export default function ClientTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // Só roda após o componente "montar" no navegador
    setTime(new Date().toLocaleTimeString());
  }, []);

  // Se o tempo ainda não foi definido, não renderiza nada para evitar erro de hidratação
  if (!time) return null;

  return <span>{time}</span>;
}