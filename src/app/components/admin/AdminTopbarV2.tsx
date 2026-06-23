"use client";

import React from 'react';
import { adminColors } from './adminDesignTokens';

interface AdminTopbarProps {
  title: string;
  subtitle?: string;
  role?: string;
  email?: string;
}

export default function AdminTopbarV2({
  title,
  subtitle,
  role,
  email,
}: AdminTopbarProps) {
  return (
    <header
      className="border-b px-6 py-4 md:px-8 lg:px-12"
      style={{
        backgroundColor: adminColors.adminSurface,
        borderColor: adminColors.adminBorder,
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Top section with title and badges */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ color: adminColors.adminText }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className="mt-1 text-sm"
                style={{ color: adminColors.adminMuted }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Status badges */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium"
              style={{
                backgroundColor: adminColors.lbyaGreenSoft,
                color: adminColors.lbyaGreen,
              }}
            >
              <span className="inline-block h-2 w-2 rounded-full bg-current" />
              Production
            </div>
            {role && (
              <div
                className="flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium"
                style={{
                  backgroundColor: adminColors.adminSurfaceMuted,
                  color: adminColors.adminMuted,
                }}
              >
                <span>{role}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom section with search and controls (optional) */}
        {email && (
          <div className="mt-4 flex items-center justify-between">
            <p
              className="text-xs"
              style={{ color: adminColors.adminSubtle }}
            >
              Logged in as {email}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
