import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({ ok: true, quoteRequestId: 'quote_placeholder_001', payload: body }, { status: 201 });
}
