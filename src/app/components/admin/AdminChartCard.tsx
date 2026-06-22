import React from 'react';

export default function AdminChartCard({ title }: { title: string }) {
  return (
    <article className="rounded-sm border border-[#E3E7E8] bg-white p-4">
      <h3 className="text-sm font-semibold text-[#1F3529]">{title}</h3>
      <div className="mt-4 h-44 rounded-sm border border-dashed border-[#CBD4D6] bg-[linear-gradient(180deg,#F8FBFB,#F1F6F6)] p-4 text-xs text-[#607074]">
        Chart placeholder
      </div>
    </article>
  );
}
