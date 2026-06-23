"use client";

import React from 'react';
import AdminSidebarV2 from './AdminSidebarV2';
import AdminTopbarV2 from './AdminTopbarV2';
import { useAdminSession } from './AdminSessionProvider';
import { adminColors } from './adminDesignTokens';

interface AdminLayoutV2Props {
  activePath: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function AdminLayoutV2({
  activePath,
  title,
  subtitle,
  children,
}: AdminLayoutV2Props) {
  const { role, email } = useAdminSession();

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: adminColors.adminBg }}
    >
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
        <AdminSidebarV2 activePath={activePath} />
        <div className="flex flex-col">
          <AdminTopbarV2 title={title} subtitle={subtitle} role={role} email={email} />
          <main
            className="flex-1 overflow-auto px-6 py-10 md:px-8 lg:px-12"
            style={{ backgroundColor: adminColors.adminBg }}
          >
            <div className="mx-auto max-w-7xl space-y-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
