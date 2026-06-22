'use client';

import React from 'react';

export default function ConfirmationModal({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-sm border border-[#1F3529]/12 bg-white p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-[#1F3529]">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-[#37474F]/78">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-sm border border-[#1F3529]/16 px-4 py-2 text-sm font-semibold text-[#37474F]">
            {cancelLabel}
          </button>
          <button onClick={onConfirm} className="rounded-sm bg-[#2E7D32] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1F5B25]">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
