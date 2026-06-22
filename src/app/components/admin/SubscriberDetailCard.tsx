import React from 'react';
import type { Subscriber } from './types';

export default function SubscriberDetailCard({ subscriber }: { subscriber: Subscriber }) {
  return (
    <section className="rounded-sm border border-[#E3E7E8] bg-white p-5">
      <h3 className="text-lg font-semibold text-[#1F3529]">Company profile</h3>
      <div className="mt-4 grid gap-3 text-sm text-[#37474F]/82 md:grid-cols-2">
        <p><span className="font-semibold text-[#1F3529]">Company name:</span> {subscriber.companyName}</p>
        <p><span className="font-semibold text-[#1F3529]">Organization number:</span> Placeholder</p>
        <p><span className="font-semibold text-[#1F3529]">VAT number:</span> {subscriber.vatNumber}</p>
        <p><span className="font-semibold text-[#1F3529]">Country:</span> {subscriber.country}</p>
        <p><span className="font-semibold text-[#1F3529]">Billing address:</span> Placeholder billing address</p>
        <p><span className="font-semibold text-[#1F3529]">Website:</span> https://example.org</p>
        <p><span className="font-semibold text-[#1F3529]">Industry:</span> Logistics infrastructure</p>
        <p><span className="font-semibold text-[#1F3529]">Company size:</span> 200-500</p>
        <p><span className="font-semibold text-[#1F3529]">Customer type:</span> Enterprise client</p>
      </div>
    </section>
  );
}
