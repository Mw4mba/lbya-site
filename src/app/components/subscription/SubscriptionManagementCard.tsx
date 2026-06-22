import React from 'react';

type Props = {
  planName: string;
  renewalDate: string;
  paymentStatus: string;
  users: number;
};

export default function SubscriptionManagementCard({ planName, renewalDate, paymentStatus, users }: Props) {
  const actions = [
    'Manage users',
    'Manage billing',
    'Download invoice',
    'Change plan',
    'Add seats',
    'Cancel renewal placeholder',
    'Request support',
  ];

  return (
    <article className="rounded-sm border border-[#DCE3E0] bg-white p-5 shadow-[0_18px_50px_rgba(31,53,41,0.08)]">
      <h2 className="text-lg font-semibold text-[#1F3529]">{planName}</h2>
      <dl className="mt-4 grid gap-1 text-sm text-[#37474F]">
        <div className="flex justify-between"><dt>Renewal date</dt><dd>{renewalDate}</dd></div>
        <div className="flex justify-between"><dt>Payment status</dt><dd>{paymentStatus}</dd></div>
        <div className="flex justify-between"><dt>Number of users</dt><dd>{users}</dd></div>
      </dl>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {actions.map((action) => (
          <button key={action} className="rounded-sm border border-[#DCE3E0] px-3 py-2 text-sm font-semibold text-[#1F3529] hover:bg-[#F4F7F6]">
            {action}
          </button>
        ))}
      </div>
    </article>
  );
}
