import React from 'react';

export default function CheckoutAccountSection({ email }: { email: string }) {
  return (
    <section className="rounded-sm border border-[#DCE3E0] bg-white p-5">
      <h2 className="text-lg font-semibold text-[#1F3529]">Account</h2>
      <p className="mt-2 text-sm text-[#37474F]/74">The signed-in account becomes the purchaser and subscription administrator.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="grid gap-1 text-sm text-[#37474F]">
          <span>Signed-in user email</span>
          <input className="rounded-sm border border-[#DCE3E0] px-3 py-2" defaultValue={email} readOnly />
        </label>
        <label className="grid gap-1 text-sm text-[#37474F]">
          <span>Company name</span>
          <input className="rounded-sm border border-[#DCE3E0] px-3 py-2" placeholder="LBYA Client Organization" />
        </label>
        <label className="grid gap-1 text-sm text-[#37474F]">
          <span>Organization number / VAT number</span>
          <input className="rounded-sm border border-[#DCE3E0] px-3 py-2" placeholder="VAT/Org number" />
        </label>
        <label className="grid gap-1 text-sm text-[#37474F]">
          <span>Country</span>
          <input className="rounded-sm border border-[#DCE3E0] px-3 py-2" placeholder="Country" />
        </label>
        <label className="grid gap-1 text-sm text-[#37474F] md:col-span-2">
          <span>Billing address</span>
          <input className="rounded-sm border border-[#DCE3E0] px-3 py-2" placeholder="Billing address" />
        </label>
      </div>
    </section>
  );
}
