import React from 'react';

export default function ReportExportButton({
  label,
  format,
}: {
  label: string;
  format: 'CSV' | 'Excel placeholder' | 'PDF placeholder';
}) {
  return (
    <button className="rounded-sm border border-[#2E7D32]/28 bg-white px-3 py-2 text-sm font-semibold text-[#2E7D32] hover:bg-[#E8F5E9]">
      Export {label} ({format})
    </button>
  );
}
