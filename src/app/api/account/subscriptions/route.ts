import { NextResponse } from 'next/server';
import { getAccountSubscriptionsWithPricing } from '@/lib/billingStore';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get('email')?.trim();

  if (!email) {
    return NextResponse.json({ error: 'Missing email query parameter' }, { status: 400 });
  }

  const items = await getAccountSubscriptionsWithPricing(email);
  return NextResponse.json({ items, total: items.length });
}
