import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({ ok: true, checkoutSessionId: 'placeholder_checkout_session', payload: body });
}
