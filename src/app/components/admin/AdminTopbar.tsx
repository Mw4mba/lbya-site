import React from 'react';
import type { AdminRole } from './types';

export default function AdminTopbar({
  title,
  subtitle,
  role,
  email,
}: {
  title: string;
  subtitle?: string;
  role: AdminRole;
  email: string;
}) {
  return (
    <header className="relative border-b border-[#81D4FA]/20 bg-gradient-to-r from-white/90 via-[#F5F5DC]/30 to-white/90 backdrop-blur-xl px-8 py-8 shadow-lg">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-[#2E7D32]/5 blur-3xl" />
        <div className="absolute -right-32 -bottom-32 h-64 w-64 rounded-full bg-[#81D4FA]/5 blur-3xl" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-8">
        <div className="flex-1">
          <h1 className="text-5xl font-black bg-gradient-to-r from-[#2E7D32] to-[#1b5e20] bg-clip-text text-transparent">{title}</h1>
          {subtitle && <p className="mt-3 text-sm font-medium text-[#37474F]/70">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2E7D32]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              placeholder="Search..."
              className="w-72 rounded-xl border border-[#2E7D32]/15 bg-white/40 backdrop-blur-sm py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all duration-300 placeholder:text-[#37474F]/50 focus:border-[#2E7D32]/40 focus:bg-white/60 focus:ring-2 focus:ring-[#2E7D32]/20"
            />
          </div>
          <button className="group relative flex items-center gap-2 rounded-xl border border-[#2E7D32]/20 bg-white/40 backdrop-blur-sm px-4 py-3 text-sm font-medium text-[#2E7D32] transition-all duration-300 hover:border-[#2E7D32]/40 hover:bg-white/60 hover:shadow-lg">
            <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -right-2 -top-2 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#E74C3C] to-[#C0392B] shadow-lg" />
          </button>
          <div className="flex items-center gap-3 rounded-xl border border-[#2E7D32]/15 bg-white/40 backdrop-blur-sm px-4 py-3 transition-all duration-300 hover:border-[#2E7D32]/30 hover:bg-white/60">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#2E7D32] via-[#1b5e20] to-[#0d3a1a] flex items-center justify-center text-white font-bold text-sm shadow-md">
              {email?.charAt(0).toUpperCase()}
            </div>
            <div className="text-left">
              <p className="font-bold text-[#2E7D32] text-xs">{email?.split('@')[0]?.toUpperCase()}</p>
              <p className="text-xs font-medium text-[#37474F]/60">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
