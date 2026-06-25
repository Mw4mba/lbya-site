"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminColors } from './adminDesignTokens';
import Wordmark from '@/app/components/Wordmark';

interface AdminTopbarProps {
  title: string;
  subtitle?: string;
  role?: string;
  email?: string;
  name?: string;
}

type ReminderState =
  | 'idle'
  | 'focus_running'
  | 'break_due'
  | 'break_running'
  | 'break_complete'
  | 'snoozed'
  | 'skipped';

type PowerBreakReminder = {
  mode: 'deep_engineering_work';
  focusDurationMinutes: 90;
  breakDurationMinutes: 10;
  snoozeDurationMinutes: 10;
  maxSnoozes: 2;
  currentState: ReminderState;
  snoozeCount: number;
  focusStartedAt: number | null;
  breakStartedAt: number | null;
  breakCompletedAt: number | null;
  snoozeStartedAt: number | null;
  skippedAt: number | null;
  skippedCountToday: number;
  skippedDayStamp: string;
};

const REMINDER_STORAGE_KEY = 'admin_power_break_reminder_v1';
const FOCUS_DURATION_MS = 90 * 60 * 1000;
const BREAK_DURATION_MS = 10 * 60 * 1000;
const SNOOZE_DURATION_MS = 10 * 60 * 1000;
const BREAK_COMPLETE_VISIBLE_MS = 30 * 1000;
const SKIPPED_VISIBLE_MS = 8 * 1000;

function getDayStamp(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function createDefaultReminderState(now = Date.now()): PowerBreakReminder {
  return {
    mode: 'deep_engineering_work',
    focusDurationMinutes: 90,
    breakDurationMinutes: 10,
    snoozeDurationMinutes: 10,
    maxSnoozes: 2,
    currentState: 'focus_running',
    snoozeCount: 0,
    focusStartedAt: now,
    breakStartedAt: null,
    breakCompletedAt: null,
    snoozeStartedAt: null,
    skippedAt: null,
    skippedCountToday: 0,
    skippedDayStamp: getDayStamp(new Date(now)),
  };
}

function startFocusTimer(reminder: PowerBreakReminder, now = Date.now()): PowerBreakReminder {
  return {
    ...reminder,
    currentState: 'focus_running',
    focusStartedAt: now,
    breakStartedAt: null,
    breakCompletedAt: null,
    snoozeStartedAt: null,
    skippedAt: null,
    snoozeCount: 0,
  };
}

function advanceReminderState(reminder: PowerBreakReminder, now = Date.now()): PowerBreakReminder {
  let next = reminder;
  const today = getDayStamp(new Date(now));
  if (next.skippedDayStamp !== today) {
    next = {
      ...next,
      skippedDayStamp: today,
      skippedCountToday: 0,
    };
  }

  if (next.currentState === 'focus_running' && next.focusStartedAt) {
    const elapsed = now - next.focusStartedAt;
    if (elapsed >= FOCUS_DURATION_MS) {
      return {
        ...next,
        currentState: 'break_due',
        breakStartedAt: null,
        breakCompletedAt: null,
        snoozeStartedAt: null,
      };
    }
  }

  if (next.currentState === 'snoozed' && next.snoozeStartedAt) {
    const elapsed = now - next.snoozeStartedAt;
    if (elapsed >= SNOOZE_DURATION_MS) {
      return {
        ...next,
        currentState: 'break_due',
        snoozeStartedAt: null,
      };
    }
  }

  if (next.currentState === 'break_running' && next.breakStartedAt) {
    const elapsed = now - next.breakStartedAt;
    if (elapsed >= BREAK_DURATION_MS) {
      return {
        ...next,
        currentState: 'break_complete',
        breakCompletedAt: now,
        breakStartedAt: null,
      };
    }
  }

  if (next.currentState === 'break_complete' && next.breakCompletedAt) {
    const elapsed = now - next.breakCompletedAt;
    if (elapsed >= BREAK_COMPLETE_VISIBLE_MS) {
      return startFocusTimer(next, now);
    }
  }

  if (next.currentState === 'skipped' && next.skippedAt) {
    const elapsed = now - next.skippedAt;
    if (elapsed >= SKIPPED_VISIBLE_MS) {
      return {
        ...next,
        currentState: 'focus_running',
        skippedAt: null,
      };
    }
  }

  return next;
}

function formatClock(ms: number): string {
  const safeSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatMinutes(ms: number): number {
  return Math.max(0, Math.ceil(ms / 60000));
}

export default function AdminTopbarV2({
  title: _title,
  subtitle: _subtitle,
  email,
  name,
  role,
}: AdminTopbarProps) {
  const displayName = (name || email?.split('@')[0] || 'Administrator').toUpperCase();
  const router = useRouter();
  const [elapsed, setElapsed] = useState('00:00:00');
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [isHovering, setIsHovering] = useState(false);
  const [isNotificationHovering, setIsNotificationHovering] = useState(false);
  const [isReminderHovering, setIsReminderHovering] = useState(false);
  const [isBreakPanelOpen, setIsBreakPanelOpen] = useState(false);
  const breakPanelRef = useRef<HTMLDivElement | null>(null);
  const [powerBreakReminder, setPowerBreakReminder] = useState<PowerBreakReminder>(() => {
    if (typeof window === 'undefined') {
      return createDefaultReminderState();
    }
    try {
      const raw = localStorage.getItem(REMINDER_STORAGE_KEY);
      if (!raw) {
        return createDefaultReminderState();
      }
      const parsed = JSON.parse(raw) as Partial<PowerBreakReminder>;
      return {
        ...createDefaultReminderState(),
        ...parsed,
      } as PowerBreakReminder;
    } catch {
      return createDefaultReminderState();
    }
  });

  useEffect(() => {
    // Initialize login time on first load
    const loginTimeKey = 'admin_login_time';
    if (!sessionStorage.getItem(loginTimeKey)) {
      sessionStorage.setItem(loginTimeKey, Date.now().toString());
    }

    // Update elapsed time every second
    const interval = setInterval(() => {
      setNowMs(Date.now());
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

  useEffect(() => {
    const interval = setInterval(() => {
      setPowerBreakReminder((prev) => advanceReminderState(prev));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(powerBreakReminder));
  }, [powerBreakReminder]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!breakPanelRef.current) return;
      if (!breakPanelRef.current.contains(event.target as Node)) {
        setIsBreakPanelOpen(false);
      }
    };

    if (isBreakPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBreakPanelOpen]);

  const reminderChip = useMemo(() => {
    const now = nowMs;

    if (powerBreakReminder.currentState === 'focus_running' && powerBreakReminder.focusStartedAt) {
      const remaining = FOCUS_DURATION_MS - (now - powerBreakReminder.focusStartedAt);
      return {
        label: `🧠 Deep Focus · ${formatMinutes(remaining)} min left`,
        background: `${adminColors.lbyaGreen}14`,
        color: adminColors.lbyaGreen,
        border: `${adminColors.lbyaGreen}35`,
      };
    }

    if (powerBreakReminder.currentState === 'break_due') {
      return {
        label: '⚡ Power Break Due · 10 min',
        background: '#FEF3C7',
        color: '#92400E',
        border: '#FCD34D',
      };
    }

    if (powerBreakReminder.currentState === 'break_running' && powerBreakReminder.breakStartedAt) {
      const remaining = BREAK_DURATION_MS - (now - powerBreakReminder.breakStartedAt);
      return {
        label: `🌿 Break Time · ${formatClock(remaining)} left`,
        background: '#E8F8EF',
        color: '#166534',
        border: '#86EFAC',
      };
    }

    if (powerBreakReminder.currentState === 'break_complete') {
      return {
        label: '✅ Break Complete · Ready to refocus',
        background: '#DCFCE7',
        color: '#166534',
        border: '#86EFAC',
      };
    }

    if (powerBreakReminder.currentState === 'snoozed' && powerBreakReminder.snoozeStartedAt) {
      const remaining = SNOOZE_DURATION_MS - (now - powerBreakReminder.snoozeStartedAt);
      return {
        label: `⏰ Snoozed · ${formatMinutes(remaining)} min left`,
        background: '#E0F2FE',
        color: '#075985',
        border: '#7DD3FC',
      };
    }

    if (powerBreakReminder.currentState === 'skipped') {
      return {
        label: '➡️ Break skipped · Focus timer restarted',
        background: '#F3F4F6',
        color: '#374151',
        border: '#D1D5DB',
      };
    }

    return {
      label: 'Deep Focus · 90 min left',
      background: `${adminColors.lbyaGreen}14`,
      color: adminColors.lbyaGreen,
      border: `${adminColors.lbyaGreen}35`,
    };
  }, [powerBreakReminder, nowMs]);

  const canOpenBreakPanel =
    powerBreakReminder.currentState === 'break_due' ||
    powerBreakReminder.currentState === 'break_running' ||
    powerBreakReminder.currentState === 'break_complete' ||
    powerBreakReminder.currentState === 'snoozed';

  const handleStartBreak = () => {
    setPowerBreakReminder((prev) => ({
      ...prev,
      currentState: 'break_running',
      breakStartedAt: Date.now(),
      breakCompletedAt: null,
      snoozeStartedAt: null,
      skippedAt: null,
    }));
  };

  const handleSnooze = () => {
    setPowerBreakReminder((prev) => {
      if (prev.snoozeCount >= prev.maxSnoozes) {
        return prev;
      }
      return {
        ...prev,
        currentState: 'snoozed',
        snoozeCount: prev.snoozeCount + 1,
        snoozeStartedAt: Date.now(),
        breakStartedAt: null,
        breakCompletedAt: null,
      };
    });
    setIsBreakPanelOpen(false);
  };

  const handleSkipOnce = () => {
    setPowerBreakReminder((prev) => ({
      ...prev,
      currentState: 'skipped',
      focusStartedAt: Date.now(),
      breakStartedAt: null,
      breakCompletedAt: null,
      snoozeStartedAt: null,
      skippedAt: Date.now(),
      snoozeCount: 0,
      skippedCountToday: prev.skippedCountToday + 1,
      skippedDayStamp: getDayStamp(new Date()),
    }));
    setIsBreakPanelOpen(false);
  };

  const handleStartFocusNow = () => {
    setPowerBreakReminder((prev) => startFocusTimer(prev, Date.now()));
    setIsBreakPanelOpen(false);
  };

  const breakProgress = (() => {
    if (powerBreakReminder.currentState !== 'break_running' || !powerBreakReminder.breakStartedAt) {
      return 0;
    }
    const elapsedMs = Math.max(0, nowMs - powerBreakReminder.breakStartedAt);
    return Math.min(100, Math.round((elapsedMs / BREAK_DURATION_MS) * 100));
  })();

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
                src="/logoA.svg"
                className="h-20 w-80 md:h-24 md:w-96"
                priority
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
            <div className="flex items-start gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: adminColors.lbyaGreen }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className="text-sm font-bold tracking-tight leading-5 truncate"
                      style={{ color: adminColors.adminText }}
                    >
                      {displayName}
                    </p>
                    <p
                      className="text-xs mt-1.5"
                      style={{ color: adminColors.adminMuted }}
                    >
                      {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Admin Role'}
                    </p>
                  </div>
                  <div className="relative ml-auto shrink-0" ref={breakPanelRef}>
                    <button
                      onClick={() => {
                        if (canOpenBreakPanel) {
                          setIsBreakPanelOpen((prev) => !prev);
                        }
                      }}
                      onMouseEnter={() => setIsReminderHovering(true)}
                      onMouseLeave={() => setIsReminderHovering(false)}
                      className="rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide leading-none whitespace-nowrap transition-all"
                      style={{
                        color: reminderChip.color,
                        backgroundColor: reminderChip.background,
                        border: `1px solid ${reminderChip.border}`,
                        boxShadow: isReminderHovering && canOpenBreakPanel ? `0 6px 16px ${adminColors.lbyaGreen}22` : 'none',
                        cursor: canOpenBreakPanel ? 'pointer' : 'default',
                      }}
                      title="Dashboard Header Power Break Reminder - Deep Engineering Work Mode"
                      aria-label="Power break reminder"
                    >
                      {reminderChip.label}
                    </button>

                    {isBreakPanelOpen ? (
                      <div
                        className="absolute right-0 z-50 mt-2 w-[340px] rounded-xl border p-4"
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderColor: adminColors.adminBorder,
                          boxShadow: '0 16px 40px rgba(15, 23, 42, 0.18)',
                        }}
                      >
                        <h3 className="text-sm font-bold" style={{ color: adminColors.adminText }}>
                          Power Break
                        </h3>
                        <p className="mt-2 text-xs leading-5" style={{ color: adminColors.adminMuted }}>
                          You have been in deep focus for 90 minutes. Take a 10-minute power break to reset your mind, eyes, and posture.
                        </p>

                        {powerBreakReminder.currentState === 'break_running' ? (
                          <div className="mt-3">
                            <div className="h-2 rounded-full" style={{ backgroundColor: '#E5E7EB' }}>
                              <div
                                className="h-2 rounded-full transition-all"
                                style={{ width: `${breakProgress}%`, backgroundColor: adminColors.lbyaGreen }}
                              />
                            </div>
                            <p className="mt-2 text-xs" style={{ color: adminColors.adminMuted }}>
                              Break progress: {breakProgress}%
                            </p>
                          </div>
                        ) : null}

                        <ul className="mt-3 space-y-1 text-xs" style={{ color: adminColors.adminMuted }}>
                          <li>- Stand up and walk for 2 minutes</li>
                          <li>- Drink water</li>
                          <li>- Stretch neck, shoulders, and back</li>
                          <li>- Look away from the screen</li>
                          <li>- Take 5 slow breaths</li>
                        </ul>

                        <div className="mt-4 grid gap-2">
                          {(powerBreakReminder.currentState === 'break_due' || powerBreakReminder.currentState === 'snoozed') ? (
                            <>
                              <button
                                onClick={handleStartBreak}
                                className="rounded-md px-3 py-2 text-xs font-semibold text-white"
                                style={{ backgroundColor: adminColors.lbyaGreen }}
                              >
                                Start 10-min break
                              </button>

                              {powerBreakReminder.snoozeCount < powerBreakReminder.maxSnoozes ? (
                                <button
                                  onClick={handleSnooze}
                                  className="rounded-md border px-3 py-2 text-xs font-semibold"
                                  style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
                                >
                                  Snooze 10 min
                                </button>
                              ) : null}

                              <button
                                onClick={handleSkipOnce}
                                className="rounded-md border px-3 py-2 text-xs font-semibold"
                                style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
                              >
                                Skip once
                              </button>
                            </>
                          ) : null}

                          {powerBreakReminder.currentState === 'break_complete' ? (
                            <button
                              onClick={handleStartFocusNow}
                              className="rounded-md px-3 py-2 text-xs font-semibold text-white"
                              style={{ backgroundColor: adminColors.lbyaGreen }}
                            >
                              Start Focus Now
                            </button>
                          ) : null}

                          {(powerBreakReminder.currentState === 'focus_running' || powerBreakReminder.currentState === 'skipped') ? (
                            <p className="text-xs" style={{ color: adminColors.adminMuted }}>
                              Deep focus is active. You will be reminded when the next 90-minute focus cycle completes.
                            </p>
                          ) : null}
                        </div>

                        <p className="mt-3 text-[10px]" style={{ color: adminColors.adminSubtle }}>
                          Snoozes used: {powerBreakReminder.snoozeCount}/{powerBreakReminder.maxSnoozes} · Mode: Deep Engineering Work
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
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
          <div className="shrink-0 flex flex-col items-end gap-2">
            <button
              onClick={() => router.push('/admin/notifications')}
              onMouseEnter={() => setIsNotificationHovering(true)}
              onMouseLeave={() => setIsNotificationHovering(false)}
              className="group relative flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200"
              style={{
                backgroundColor: isNotificationHovering ? `${adminColors.lbyaGreen}15` : 'transparent',
                color: adminColors.lbyaGreen,
                border: `1.5px solid ${adminColors.lbyaGreen}`,
                boxShadow: isNotificationHovering ? `0 8px 20px ${adminColors.lbyaGreen}25` : '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
              title="Notifications"
              aria-label="Notifications"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

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
