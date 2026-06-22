'use client';

import { useState } from 'react';

export default function ThesisDownloadButton() {
  const [message, setMessage] = useState('');

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setMessage('Thesis topic download will be available soon.')}
        className="inline-flex items-center justify-center gap-3 rounded-sm bg-[#2E7D32] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1b5e20]"
      >
        Download thesis topic proposal
      </button>
      {message ? <p className="text-sm text-[#2E7D32]">{message}</p> : null}
    </div>
  );
}
