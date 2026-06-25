import Link from 'next/link';

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

async function getStatus(sessionId: string) {
  const appUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  try {
    const response = await fetch(`${appUrl}/api/billing/checkout-session/${sessionId}`, {
      cache: 'no-store',
    });
    if (!response.ok) return null;
    return (await response.json()) as {
      status: string;
      paymentStatus: string;
      subscriptionStatus?: string;
      productAccessStatus?: string;
    };
  } catch {
    return null;
  }
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;
  const status = session_id ? await getStatus(session_id) : null;

  return (
    <main className="min-h-screen bg-[#F7FAF7] px-6 py-24">
      <div className="mx-auto max-w-3xl rounded-sm border border-[#DCE3E0] bg-white p-10">
        <h1 className="text-3xl font-light text-[#1F3529]">Payment received. Your account is being activated.</h1>
        <p className="mt-4 text-sm leading-7 text-[#37474F]/80">
          LBYA AB activates product access only after verified Stripe webhook events. This page shows status only.
        </p>

        {status && (
          <div className="mt-8 grid gap-3 rounded-sm border border-[#DCE3E0] bg-[#F7FAF7] p-5 text-sm text-[#37474F]">
            <p><strong>Checkout status:</strong> {status.status}</p>
            <p><strong>Payment status:</strong> {status.paymentStatus}</p>
            <p><strong>Subscription status:</strong> {status.subscriptionStatus ?? 'pending'}</p>
            <p><strong>Product access status:</strong> {status.productAccessStatus ?? 'pending_webhook_or_enabled'}</p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-sm bg-[#2E7D32] px-5 py-3 text-sm font-semibold text-white">
            Back to website
          </Link>
          <Link href="/contact" className="rounded-sm border border-[#1F3529]/20 px-5 py-3 text-sm font-semibold text-[#1F3529]">
            Contact LBYA AB
          </Link>
        </div>
      </div>
    </main>
  );
}
