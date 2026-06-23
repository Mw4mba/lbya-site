"use client";

import React from 'react';
import { adminColors } from './adminDesignTokens';

type StatusType =
  | 'Active'
  | 'Trial'
  | 'Past Due'
  | 'Suspended'
  | 'Cancelled'
  | 'Enterprise Review'
  | 'Paid'
  | 'Succeeded'
  | 'Enabled'
  | 'Healthy'
  | 'Pending'
  | 'Draft'
  | 'Manual Review'
  | 'Failed'
  | 'Overdue'
  | 'Void'
  | 'Refunded';

interface AdminStatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<StatusType, { bg: string; text: string; label: string }> = {
  // Green (success/positive)
  Active: { bg: adminColors.lbyaGreenSoft, text: adminColors.lbyaGreen, label: 'Active' },
  Paid: { bg: adminColors.lbyaGreenSoft, text: adminColors.lbyaGreen, label: 'Paid' },
  Succeeded: { bg: adminColors.lbyaGreenSoft, text: adminColors.lbyaGreen, label: 'Succeeded' },
  Enabled: { bg: adminColors.lbyaGreenSoft, text: adminColors.lbyaGreen, label: 'Enabled' },
  Healthy: { bg: adminColors.lbyaGreenSoft, text: adminColors.lbyaGreen, label: 'Healthy' },

  // Blue (info/neutral)
  Trial: { bg: '#DBEAFE', text: adminColors.info, label: 'Trial' },
  Pending: { bg: '#DBEAFE', text: adminColors.info, label: 'Pending' },
  Draft: { bg: '#DBEAFE', text: adminColors.info, label: 'Draft' },
  'Manual Review': { bg: '#E9D5FF', text: adminColors.purple, label: 'Manual Review' },
  'Enterprise Review': { bg: '#E9D5FF', text: adminColors.purple, label: 'Enterprise Review' },

  // Orange (warning)
  'Past Due': { bg: '#FED7AA', text: adminColors.warning, label: 'Past Due' },
  Overdue: { bg: '#FED7AA', text: adminColors.warning, label: 'Overdue' },

  // Red (danger/critical)
  Failed: { bg: '#FECACA', text: adminColors.danger, label: 'Failed' },
  Suspended: { bg: '#FECACA', text: adminColors.danger, label: 'Suspended' },
  Cancelled: { bg: '#FECACA', text: adminColors.danger, label: 'Cancelled' },
  Refunded: { bg: '#FECACA', text: adminColors.danger, label: 'Refunded' },
  Void: { bg: '#F3F4F6', text: adminColors.adminMuted, label: 'Void' },
};

export default function AdminStatusBadge({
  status,
  size = 'md',
}: AdminStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.Pending;
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-base',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md font-medium whitespace-nowrap ${sizeClasses[size]}`}
      style={{
        backgroundColor: config.bg,
        color: config.text,
      }}
    >
      {config.label}
    </span>
  );
}
