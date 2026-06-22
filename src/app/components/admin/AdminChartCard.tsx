import React from 'react';

export default function AdminChartCard({ title }: { title: string }) {
  const chartData = [65, 45, 55, 75, 40, 60, 80, 50, 70, 45, 55, 65];
  const max = Math.max(...chartData);
  
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#2E7D32]/15 bg-linear-to-br from-white via-white to-[#F5F5DC]/40 p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-[#2E7D32]/40">
      <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-linear-to-br from-[#2E7D32]/10 to-[#81D4FA]/5 blur-3xl" />
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="relative z-10 text-lg font-bold bg-linear-to-r from-[#2E7D32] to-[#1b5e20] bg-clip-text text-transparent">{title}</h3>
          <p className="mt-2 text-xs font-medium text-[#37474F]/50">Interactive data visualization</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-[#2E7D32]/10 px-3 py-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-linear-to-br from-[#2E7D32] to-[#A5D6A7]" />
          <span className="text-xs font-bold text-[#2E7D32]">Live</span>
        </div>
      </div>
      <div className="relative mt-10 h-64 overflow-hidden rounded-xl border border-[#2E7D32]/10 bg-linear-to-b from-[#F5F5DC]/60 to-white p-6">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="absolute w-full border-b border-[#37474F]/5" style={{ top: `${(i + 1) * 25}%` }} />
          ))}
        </div>
        <div className="relative h-full flex items-end justify-around gap-2">
          {chartData.map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group/bar">
              <div className="relative h-full w-full flex items-end justify-center pb-2">
                <div
                  className="w-full max-w-3 rounded-t-lg bg-linear-to-t from-[#2E7D32] via-[#A5D6A7] to-[#81D4FA] transition-all duration-300 group-hover/bar:shadow-lg group-hover/bar:from-[#1b5e20] group-hover/bar:via-[#81B777] group-hover/bar:to-[#81D4FA] relative after:absolute after:inset-0 after:rounded-t-lg after:bg-white/10 after:opacity-0 after:transition-opacity after:duration-300 group-hover/bar:after:opacity-100"
                  style={{ height: `${(value / max) * 100}%`, minHeight: '4px' }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-2 left-0 right-0 flex justify-between px-6 text-xs font-medium text-[#37474F]/40">
          <span>Jan</span>
          <span>Dec</span>
        </div>
      </div>
    </article>
  );
}
