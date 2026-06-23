"use client";

import React from 'react';
import { adminColors } from './adminDesignTokens';

interface AdminMetricCardProps {
  label: string;
  value: string;
  trend?: number;
  description?: string;
}

export default function AdminMetricCard({
  label,
  value,
  trend,
  description,
}: AdminMetricCardProps) {
  const trendColor = trend === undefined ? 'transparent' : trend > 0 ? adminColors.success : trend < 0 ? adminColors.warning : '#666666';

  return (
    <div
      className="rounded-lg border p-6 transition-all duration-200 hover:shadow-md"
      style={{
        backgroundColor: adminColors.adminSurface,
        borderColor: adminColors.adminBorder,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p
            className="text-sm font-medium"
            style={{ color: adminColors.adminMuted }}
          >
            {label}
          </p>
          <p
            className="mt-2 text-3xl font-bold"
            style={{ color: adminColors.adminText }}
          >
            {value}
          </p>
          {description && (
            <p
              className="mt-2 text-xs"
              style={{ color: adminColors.adminSubtle }}
            >
              {description}
            </p>
          )}
        </div>
        {trend !== undefined && (
          <div
            className="rounded-lg px-2.5 py-1.5 text-xs font-medium flex items-center gap-1"
            style={{
              backgroundColor:
                trend > 0
                  ? adminColors.lbyaGreenSoft
                  : trend < 0
                    ? '#FEF3C7'
                    : '#F3F4F6',
              color: trendColor,
            }}
          >
            <span>{trend > 0 ? '↑' : trend < 0 ? '↓' : '→'}</span>
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
