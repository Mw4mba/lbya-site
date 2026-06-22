import React from 'react';

export default function AdminKPICard({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: string;
}) {
  const isPositive = delta?.startsWith('+');
  const iconMap: { [key: string]: string } = {
    'Total subscribers': '👥',
    'Active subscriptions': '✓',
    'Trial users': '🎯',
    'MRR': '💵',
    'ARR': '📈',
    'Pending invoices': '📄',
    'Failed payments': '⚠️',
    'Cancelled subscriptions': '❌',
    'New customers': '🆕',
    'Quote requests': '💬',
    'Total revenue': '💰',
    'VAT/tax': '📊',
  };
  const icon = Object.entries(iconMap).find(([key]) => label.toLowerCase().includes(key.toLowerCase()))?.[1] || '📌';
  
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#2E7D32]/15 bg-gradient-to-br from-white via-white to-[#F5F5DC]/40 p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-[#2E7D32]/40 hover:-translate-y-1">
      <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-[#2E7D32]/10 to-[#81D4FA]/5 blur-3xl" />
        <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-gradient-to-tr from-[#A5D6A7]/10 to-transparent blur-3xl" />
      </div>
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#37474F]/55">{label}</p>
          <p className="mt-6 text-5xl font-black bg-gradient-to-r from-[#2E7D32] to-[#1b5e20] bg-clip-text text-transparent">{value}</p>
          {delta && (
            <div className={`mt-4 inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold backdrop-blur-sm transition-all duration-300 ${
              isPositive
                ? 'bg-[#2E7D32]/15 text-[#1b5e20] border border-[#2E7D32]/30 hover:bg-[#2E7D32]/25'
                : 'bg-[#DC2626]/15 text-[#7F1D1D] border border-[#DC2626]/30 hover:bg-[#DC2626]/25'
            }`}>
              {isPositive ? (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414-1.414L13.586 7H12z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 13a1 1 0 110 2H3a1 1 0 01-1-1V9a1 1 0 112 0v3.586l4.293-4.293a1 1 0 011.414 1.414L6.414 13H8z" clipRule="evenodd" />
                </svg>
              )}
              {delta}
            </div>
          )}
        </div>
        <div className="text-4xl opacity-30 group-hover:opacity-60 transition-opacity duration-300">{icon}</div>
      </div>
    </article>
  );
}
