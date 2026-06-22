import React from 'react';
import { localizePath } from '@/app/content/paths';
import type { Locale } from '@/app/content/locale';

function UserIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 19.5a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

export default function HeaderAccountActions({ locale }: { locale: Locale }) {
  return (
    <div className="hidden items-center gap-2 md:flex">
      <a
        href={localizePath(locale, '/signin')}
        className="inline-flex items-center gap-2 rounded-sm border border-white/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/90 transition-colors hover:bg-white/10"
      >
        <UserIcon />
        <span>Sign in</span>
      </a>
      <a
        href={localizePath(locale, '/cart?product=mct')}
        className="inline-flex items-center gap-2 rounded-sm bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#1F3529] transition-colors hover:bg-[#A5D6A7]"
      >
        <span>Buy MCT</span>
      </a>
    </div>
  );
}
