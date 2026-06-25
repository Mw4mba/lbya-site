import { NextRequest, NextResponse } from 'next/server';
import { getCheckoutStatusBySessionId } from '@/lib/billing/store';

type Params = { params: Promise<{ sessionId: string }> };

export async function GET(_: NextRequest, { params }: Params) {
  const { sessionId } = await params;

  const status = await getCheckoutStatusBySessionId(sessionId);

  if (!status) {
    return NextResponse.json(
      {
        status: 'not_found',
        paymentStatus: 'unknown',
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    status: status.status,
    paymentStatus: status.paymentStatus ?? 'unknown',
    customerEmail: status.customerEmail ?? undefined,
    subscriptionStatus: status.subscriptionStatus ?? undefined,
    productAccessStatus: status.productAccessStatus ?? 'pending_webhook_or_enabled',
  });
}
