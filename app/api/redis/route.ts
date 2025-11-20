import { createClient } from 'redis';
import { NextResponse } from 'next/server';

const redisUrl = 'redis://default:8mNuoYyBMpiBM88zizr2Tz2PRcOjGvW7@redis-14686.crce207.sa-east-1-2.ec2.cloud.redislabs.com:14686';


// Exemplo: GET grava e lê um valor de teste
export const GET = async () => {
  const client = createClient({ url: redisUrl });
  await client.connect();
  let result: string | null = null;
  try {
    // Grava um valor de exemplo
    await client.set('item', 'valor de exemplo');
    // Lê o valor gravado
    result = await client.get('item');
  } catch (error) {
    await client.disconnect();
    return new NextResponse(JSON.stringify({ error: String(error) }), { status: 500 });
  }
  await client.disconnect();
  return new NextResponse(JSON.stringify({ result }), { status: 200 });
};

// POST apenas lê o valor da chave "item"
export const POST = async () => {
  const client = createClient({ url: redisUrl });
  await client.connect();
  let result: string | null = null;
  try {
    result = await client.get('item');
  } catch (error) {
    await client.disconnect();
    return new NextResponse(JSON.stringify({ error: String(error) }), { status: 500 });
  }
  await client.disconnect();
  return new NextResponse(JSON.stringify({ result }), { status: 200 });
};