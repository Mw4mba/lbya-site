import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen bg-[#F7FAF7] px-6 py-24">
      <div className="mx-auto max-w-3xl rounded-sm border border-[#DCE3E0] bg-white p-10">
        <h1 className="text-3xl font-light text-[#1F3529]">Checkout was cancelled.</h1>
        <p className="mt-4 text-sm leading-7 text-[#37474F]/80">
          You can return to your cart or contact LBYA AB for help.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/products" className="rounded-sm bg-[#2E7D32] px-5 py-3 text-sm font-semibold text-white">
            Return to cart
          </Link>
          <Link href="/contact" className="rounded-sm border border-[#1F3529]/20 px-5 py-3 text-sm font-semibold text-[#1F3529]">
            Contact LBYA AB
          </Link>
        </div>
      </div>
    </main>
  );
}
