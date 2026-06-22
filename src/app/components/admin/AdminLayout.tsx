"use client";

import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import { useAdminSession } from './AdminSessionProvider';

export default function AdminLayout({
  activePath,
  title,
  subtitle,
  children,
}: {
  activePath: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const { role, email } = useAdminSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-white to-[#F5F5DC] text-[#37474F]">
      <div className="absolute inset-0 -z-50 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[#2E7D32]/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-[#81D4FA]/3 blur-3xl" />
      </div>
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[320px_1fr]">
        <AdminSidebar activePath={activePath} />
        <div className="flex flex-col">
          <AdminTopbar title={title} subtitle={subtitle} role={role} email={email} />
          <main className="flex-1 overflow-auto bg-gradient-to-b from-transparent via-[#FAFAF8]/40 to-transparent px-8 py-12 md:px-12 lg:px-16">
            <div className="mx-auto max-w-7xl space-y-12">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
