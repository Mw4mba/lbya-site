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
    <div className="min-h-screen bg-[#F5F8F9] text-[#1F3529]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
        <AdminSidebar activePath={activePath} />
        <div>
          <AdminTopbar title={title} subtitle={subtitle} role={role} email={email} />
          <main className="space-y-6 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
