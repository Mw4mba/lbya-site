import React from 'react';

type Variant = 'unified' | 'mct' | 'nbc';

const DATA: Record<
  Variant,
  {
    label: string;
    title: string;
    subtitle: string;
    metrics: { label: string; value: string; tone: string }[];
    rows: { name: string; detail: string; status: string }[];
  }
> = {
  unified: {
    label: 'Control workspace',
    title: 'Connected operations view',
    subtitle: 'Product workflows, evidence, risks, and decisions in one structured record.',
    metrics: [
      { label: 'Traceability', value: '92%', tone: 'bg-[#2E7D32]' },
      { label: 'Open risks', value: '8', tone: 'bg-[#D97706]' },
      { label: 'Ready items', value: '24', tone: 'bg-[#1D4ED8]' },
    ],
    rows: [
      { name: 'MCT shipment request', detail: 'Truck pack review', status: 'Verify' },
      { name: 'NBC model upload', detail: 'Health indicators', status: 'Review' },
      { name: 'Product roadmap', detail: 'Next product steps', status: 'Plan' },
    ],
  },
  mct: {
    label: 'MCT operations',
    title: 'Shipment control dashboard',
    subtitle: 'Requests, transporters, truck packs, verification, quotes, and status.',
    metrics: [
      { label: 'Requests', value: '18', tone: 'bg-[#2E7D32]' },
      { label: 'Truck packs', value: '11', tone: 'bg-[#1D4ED8]' },
      { label: 'Need evidence', value: '5', tone: 'bg-[#D97706]' },
    ],
    rows: [
      { name: 'Route request', detail: 'Kinshasa to Lubumbashi', status: 'Assigned' },
      { name: 'C-BRTA permit', detail: 'QR and portal check', status: 'Verify' },
      { name: 'Quote comparison', detail: 'Price, risk, readiness', status: 'Compare' },
    ],
  },
  nbc: {
    label: 'NBC BIM control',
    title: 'Model health and readiness',
    subtitle: 'Requirements, uploads, issues, responsibilities, evidence, and client view.',
    metrics: [
      { label: 'Model health', value: '78%', tone: 'bg-[#2E7D32]' },
      { label: 'Open issues', value: '32', tone: 'bg-[#D97706]' },
      { label: 'Ready gates', value: '6/8', tone: 'bg-[#1D4ED8]' },
    ],
    rows: [
      { name: 'IFC upload', detail: 'Architecture model v18', status: 'Checked' },
      { name: 'Coordination risk', detail: 'Level 03 MEP clearance', status: 'Owner set' },
      { name: 'Client milestone', detail: 'Decision package', status: 'Prepare' },
    ],
  },
};

export default function ControlDashboardMockup({
  variant = 'unified',
  compact = false,
}: {
  variant?: Variant;
  compact?: boolean;
}) {
  const data = DATA[variant];
  const rows = compact ? data.rows.slice(0, 2) : data.rows;

  return (
    <div
      className={`w-full overflow-hidden rounded-sm border border-white/20 bg-white text-[#37474F] shadow-2xl ${
        compact ? 'max-w-lg' : ''
      }`}
      aria-label={`${data.title} concept mockup`}
    >
      <div className={`flex items-center justify-between border-b border-[#2E7D32]/10 bg-[#F7FAF7] ${compact ? 'px-4 py-3' : 'px-5 py-4'}`}>
        <div>
          <p className="text-xs font-semibold uppercase text-[#2E7D32]">{data.label}</p>
          <h3 className={`${compact ? 'text-base' : 'text-lg'} font-semibold`}>{data.title}</h3>
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#2E7D32]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#A5D6A7]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#37474F]" />
        </div>
      </div>

      <div className={`grid ${compact ? 'gap-3 p-4' : 'gap-5 p-5'}`}>
        <p className={`${compact ? 'text-xs' : 'text-sm'} leading-relaxed text-[#37474F]/70`}>{data.subtitle}</p>

        <div className="grid grid-cols-3 gap-3">
          {data.metrics.map((metric) => (
            <div key={metric.label} className={`rounded-sm border border-[#2E7D32]/10 bg-white ${compact ? 'p-2' : 'p-3'}`}>
              <span className={`${compact ? 'mb-2' : 'mb-3'} block h-1.5 w-10 rounded-full ${metric.tone}`} />
              <p className={`${compact ? 'text-xl' : 'text-2xl'} font-semibold text-[#2E7D32]`}>{metric.value}</p>
              <p className="text-xs text-[#37474F]/60">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {rows.map((row) => (
            <div
              key={row.name}
              className={`grid grid-cols-[1fr_auto] items-center gap-4 rounded-sm border border-[#2E7D32]/10 bg-[#F7FAF7] px-4 ${compact ? 'py-2.5' : 'py-3'}`}
            >
              <div>
                <p className="text-sm font-medium text-[#37474F]">{row.name}</p>
                <p className="text-xs text-[#37474F]/60">{row.detail}</p>
              </div>
              <span className="rounded-sm bg-white px-3 py-1 text-xs font-semibold text-[#2E7D32] shadow-sm">
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
