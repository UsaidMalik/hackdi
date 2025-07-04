import { getSession } from '@/app/_lib/session';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getSession();
  return NextResponse.json(session);
}
