"use client";

import React from 'react';
import { adminColors } from './adminDesignTokens';

interface Column<T> {
  key: keyof T;
  label: string;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface AdminDataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  onRowClick?: (item: T) => void;
  striped?: boolean;
}

export default function AdminDataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  striped = false,
}: AdminDataTableProps<T>) {
  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{ borderColor: adminColors.adminBorder }}
    >
      <table className="w-full text-sm">
        <thead>
          <tr
            style={{
              backgroundColor: adminColors.adminSurfaceMuted,
              borderBottom: `1px solid ${adminColors.adminBorder}`,
            }}
          >
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-6 py-3 text-left font-semibold"
                style={{
                  color: adminColors.adminMuted,
                  width: col.width,
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={keyExtractor(row, idx)}
              onClick={() => onRowClick?.(row)}
              className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-opacity-50' : ''}`}
              style={{
                backgroundColor: striped && idx % 2 === 1 ? adminColors.adminSurfaceMuted : adminColors.adminSurface,
                borderBottom: `1px solid ${adminColors.adminBorder}`,
              }}
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="px-6 py-4"
                  style={{ color: adminColors.adminText }}
                >
                  {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div
          className="px-6 py-12 text-center"
          style={{ backgroundColor: adminColors.adminSurface }}
        >
          <p
            className="text-sm"
            style={{ color: adminColors.adminMuted }}
          >
            No data available
          </p>
        </div>
      )}
    </div>
  );
}
