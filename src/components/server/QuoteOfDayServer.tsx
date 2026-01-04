import { connection } from 'next/server';
import { getQuoteOfDay } from '@/data/quotes';
import QuoteOfDay from '@/components/QuoteOfDay';

/**
 * Server Component que busca a frase do dia
 * A frase muda automaticamente a cada 6 horas através do revalidate
 */
export default async function QuoteOfDayServer() {
  // Força dynamic rendering para poder usar Date
  await connection();
  
  const quote = getQuoteOfDay(Date.now());

  return (
    <QuoteOfDay
      quote={quote.text}
      author={quote.author}
      authorInfo={quote.authorInfo}
    />
  );
}
