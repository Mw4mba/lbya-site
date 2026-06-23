"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminColors } from './adminDesignTokens';
import Wordmark from '@/app/components/Wordmark';

interface AdminTopbarProps {
  title: string;
  subtitle?: string;
  role?: string;
  email?: string;
}

export default function AdminTopbarV2({
  title: _title,
  subtitle: _subtitle,
  email,
  role,
}: AdminTopbarProps) {
  const router = useRouter();
  const [elapsed, setElapsed] = useState('00:00:00');
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Initialize login time on first load
    const loginTimeKey = 'admin_login_time';
    if (!sessionStorage.getItem(loginTimeKey)) {
      sessionStorage.setItem(loginTimeKey, Date.now().toString());
    }

    // Update elapsed time every second
    const interval = setInterval(() => {
      const loginTime = parseInt(sessionStorage.getItem(loginTimeKey) || '0');
      if (loginTime) {
        const secondsElapsed = Math.floor((Date.now() - loginTime) / 1000);
        const hours = Math.floor(secondsElapsed / 3600);
        const minutes = Math.floor((secondsElapsed % 3600) / 60);
        const seconds = secondsElapsed % 60;
        setElapsed(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    sessionStorage.removeItem('admin_login_time');
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin-auth/login');
    router.refresh();
  };

  return (
    <header
      className="border-b"
      style={{
        backgroundColor: adminColors.adminSurface,
        borderColor: adminColors.adminBorder,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Background gradient accent */}
      <div
        className="absolute top-0 right-0 w-96 h-20 opacity-5 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${adminColors.lbyaGreen}, transparent)`,
          borderRadius: '0 0 100% 0',
        }}
      />

      <div className="relative px-6 py-6 md:px-8 lg:px-12 mx-auto max-w-full">
        <div className="flex items-center justify-between gap-6">
          
          {/* Left Section: Logo */}
          <div className="shrink-0 flex items-center">
            <div className="p-2.5 rounded-xl" style={{ 
              backgroundColor: `${adminColors.lbyaGreen}10`,
              border: `1px solid ${adminColors.lbyaGreen}20`
            }}>
              <Wordmark
                src="/logoC.svg"
                className="h-20 w-80 md:h-24 md:w-96"
                sizes="640px"
              />
            </div>
          </div>

          {/* Center Section: Session Info */}
          <div className="flex-1 flex flex-col gap-3 px-8 py-4 rounded-xl" style={{ 
            backgroundColor: `linear-gradient(135deg, ${adminColors.lbyaGreen}08, ${adminColors.lbyaGreen}04)`,
            border: `1px solid ${adminColors.lbyaGreen}15`,
            backdropFilter: 'blur(4px)',
          }}>
            {/* User greeting */}
            <div className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: adminColors.lbyaGreen }}
              />
              <div>
                <p
                  className="text-sm font-bold tracking-tight"
                  style={{ color: adminColors.adminText }}
                >
                  {email || 'Administrator'}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: adminColors.adminMuted }}
                >
                  {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Admin Role'}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px"
              style={{ backgroundColor: `${adminColors.lbyaGreen}20` }}
            />

            {/* Session Timer */}
            <div className="flex items-center justify-between">
              <p
                className="text-xs font-semibold"
                style={{ color: adminColors.adminMuted }}
              >
                Active Session
              </p>
              <div className="flex items-center gap-2 px-3 py-1 rounded-md" style={{ backgroundColor: `${adminColors.lbyaGreen}15` }}>
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: adminColors.lbyaGreen }}
                >
                  {elapsed}
                </span>
              </div>
            </div>
          </div>

          {/* Right Section: Logout Button */}
          <div className="shrink-0">
            <button
              onClick={handleLogout}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="group relative px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 overflow-hidden"
              style={{
                backgroundColor: isHovering ? adminColors.lbyaGreen : 'transparent',
                color: isHovering ? '#ffffff' : adminColors.lbyaGreen,
                border: `1.5px solid ${adminColors.lbyaGreen}`,
                boxShadow: isHovering ? `0 8px 20px ${adminColors.lbyaGreen}25` : '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-4 h-4 transition-transform duration-200"
                  style={{ transform: isHovering ? 'translateX(-2px)' : 'translateX(0)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log out
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  background: `linear-gradient(90deg, transparent, ${adminColors.lbyaGreen}20, transparent)`,
                  pointerEvents: 'none',
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
