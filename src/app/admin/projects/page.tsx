"use client";

import React, { useEffect, useMemo, useState } from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import AdminMetricCard from '@/app/components/admin/AdminMetricCard';
import AdminDataTable from '@/app/components/admin/AdminDataTableV2';
import AdminStatusBadge from '@/app/components/admin/AdminStatusBadgeV2';
import { adminColors } from '@/app/components/admin/adminDesignTokens';
import { canManageProjects, type DashboardPermission } from '@/lib/adminPermissions';

type GoalStatus = 'Planned' | 'In progress' | 'At risk' | 'Completed';
type WorkStatus = 'Backlog' | 'Planned' | 'In progress' | 'Review' | 'Done';

type TeamGoal = {
  id: string;
  title: string;
  owner: string;
  targetDate: string;
  progress: number;
  status: GoalStatus;
};

type PlannedWorkItem = {
  id: string;
  project: string;
  title: string;
  owner: string;
  dueDate: string;
  effort: number;
  priority: 'Low' | 'Medium' | 'High';
  status: WorkStatus;
  rank?: number;
};

type CalendarChecklistItem = {
  id: string;
  text: string;
  done: boolean;
};

const initialGoals: TeamGoal[] = [
  {
    id: 'goal_001',
    title: 'Launch NBC project template workspace',
    owner: 'Product Team',
    targetDate: '2026-07-25',
    progress: 72,
    status: 'In progress',
  },
  {
    id: 'goal_002',
    title: 'Reduce project setup time by 30%',
    owner: 'Engineering Ops',
    targetDate: '2026-08-15',
    progress: 46,
    status: 'In progress',
  },
  {
    id: 'goal_003',
    title: 'Deploy cross-team planning workflow',
    owner: 'PMO',
    targetDate: '2026-08-31',
    progress: 24,
    status: 'Planned',
  },
];

const initialPlannedWork: PlannedWorkItem[] = [
  {
    id: 'work_001',
    project: 'NBC Rollout',
    title: 'Define Q3 milestones and dependencies',
    owner: 'Nora',
    dueDate: '2026-06-29',
    effort: 5,
    priority: 'High',
    status: 'Planned',
    rank: 1,
  },
  {
    id: 'work_002',
    project: 'MCT Delivery',
    title: 'Finalize team capacity allocation',
    owner: 'Mikael',
    dueDate: '2026-06-30',
    effort: 3,
    priority: 'Medium',
    status: 'In progress',
    rank: 2,
  },
  {
    id: 'work_003',
    project: 'Platform Reliability',
    title: 'Collect blockers from all squads',
    owner: 'Sarah',
    dueDate: '2026-07-01',
    effort: 2,
    priority: 'High',
    status: 'Review',
    rank: 3,
  },
  {
    id: 'work_004',
    project: 'Admin Experience',
    title: 'Draft onboarding and SOP checklist',
    owner: 'Lina',
    dueDate: '2026-07-02',
    effort: 3,
    priority: 'Low',
    status: 'Backlog',
    rank: 4,
  },
  {
    id: 'work_005',
    project: 'Billing Automation',
    title: 'Approve recurring invoice flow',
    owner: 'James',
    dueDate: '2026-06-27',
    effort: 8,
    priority: 'High',
    status: 'Done',
    rank: 5,
  },
];

const workflowColumns: WorkStatus[] = ['Backlog', 'Planned', 'In progress', 'Review', 'Done'];

function toDateLabel(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function getWeekStart(date: Date): Date {
  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const result = new Date(date);
  result.setDate(date.getDate() + diffToMonday);
  result.setHours(0, 0, 0, 0);
  return result;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function renderPriorityColor(priority: PlannedWorkItem['priority']) {
  if (priority === 'High') {
    return { bg: '#FEE2E2', text: '#991B1B', border: '#FCA5A5' };
  }
  if (priority === 'Medium') {
    return { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' };
  }
  return { bg: '#DBEAFE', text: '#1D4ED8', border: '#93C5FD' };
}

function toRankedOrder(items: PlannedWorkItem[]) {
  return items.map((item, index) => ({
    id: item.id,
    rank: index + 1,
    status: item.status,
  }));
}

// Monday.com-inspired design tokens
const kanbanColumnMeta: Record<WorkStatus, { color: string; bg: string }> = {
  Backlog:      { color: '#8DA0AD', bg: '#F4F5F7' },
  Planned:      { color: '#579BFC', bg: '#EBF4FF' },
  'In progress':{ color: '#FDAB3D', bg: '#FFF5E6' },
  Review:       { color: '#A25DDC', bg: '#F5EEFF' },
  Done:         { color: '#00C875', bg: '#E6FAF2' },
};

const priorityMeta: Record<PlannedWorkItem['priority'], { color: string; bg: string }> = {
  High:   { color: '#E2445C', bg: '#FFEAEE' },
  Medium: { color: '#FDAB3D', bg: '#FFF5E6' },
  Low:    { color: '#579BFC', bg: '#EBF4FF' },
};

export default function AdminProjectsPage() {
  const [goals, setGoals] = useState<TeamGoal[]>(initialGoals);
  const [plannedWork, setPlannedWork] = useState<PlannedWorkItem[]>(initialPlannedWork);

  const [goalTitle, setGoalTitle] = useState('');
  const [goalOwner, setGoalOwner] = useState('');
  const [goalTargetDate, setGoalTargetDate] = useState('');
  const [goalFormError, setGoalFormError] = useState('');

  const [workProject, setWorkProject] = useState('');
  const [workTitle, setWorkTitle] = useState('');
  const [workOwner, setWorkOwner] = useState('');
  const [workDueDate, setWorkDueDate] = useState('');
  const [workStatus, setWorkStatus] = useState<WorkStatus>('Planned');
  const [workPriority, setWorkPriority] = useState<PlannedWorkItem['priority']>('Medium');
  const [workEffort, setWorkEffort] = useState('3');
  const [workFormError, setWorkFormError] = useState('');

  const [permissionLevel, setPermissionLevel] = useState<DashboardPermission>('Read Only');
  const [isPermissionLoaded, setIsPermissionLoaded] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editingGoalProgress, setEditingGoalProgress] = useState('0');
  const [editingGoalStatus, setEditingGoalStatus] = useState<GoalStatus>('Planned');

  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);
  const [editingWorkProject, setEditingWorkProject] = useState('');
  const [editingWorkTitle, setEditingWorkTitle] = useState('');
  const [editingWorkOwner, setEditingWorkOwner] = useState('');
  const [editingWorkDueDate, setEditingWorkDueDate] = useState('');
  const [editingWorkEffort, setEditingWorkEffort] = useState('1');
  const [editingWorkPriority, setEditingWorkPriority] = useState<PlannedWorkItem['priority']>('Medium');
  const [weekStart, setWeekStart] = useState<Date>(() => getWeekStart(new Date()));
  const [dailyChecklistItems, setDailyChecklistItems] = useState<Record<string, CalendarChecklistItem[]>>({});
  const [dailyChecklistInput, setDailyChecklistInput] = useState<Record<string, string>>({});

  const canEditProjects = canManageProjects(permissionLevel);

  useEffect(() => {
    let isMounted = true;

    const loadPermission = async () => {
      try {
        const response = await fetch('/api/admin/permissions/me', { method: 'GET' });
        if (!response.ok) {
          throw new Error('Permission fetch failed');
        }

        const payload = (await response.json()) as {
          item?: { permissionLevel?: DashboardPermission; status?: string };
        };

        if (isMounted && payload.item?.permissionLevel && payload.item.status !== 'Suspended') {
          setPermissionLevel(payload.item.permissionLevel);
        }
      } catch {
        // Keep read-only fallback.
      } finally {
        if (isMounted) {
          setIsPermissionLoaded(true);
        }
      }
    };

    const loadProjectData = async () => {
      try {
        const [goalsResponse, workResponse] = await Promise.all([
          fetch('/api/admin/projects/goals'),
          fetch('/api/admin/projects/work-items'),
        ]);

        if (goalsResponse.ok) {
          const goalsPayload = (await goalsResponse.json()) as { items: TeamGoal[] };
          if (isMounted && goalsPayload.items.length > 0) {
            setGoals(goalsPayload.items);
          }
        }

        if (workResponse.ok) {
          const workPayload = (await workResponse.json()) as { items: PlannedWorkItem[] };
          if (isMounted && workPayload.items.length > 0) {
            setPlannedWork(workPayload.items);
          }
        }
      } catch {
        // Keep fallback in-memory data.
      }
    };

    loadPermission();
    loadProjectData();

    return () => {
      isMounted = false;
    };
  }, []);

  const metrics = useMemo(() => {
    const completedGoals = goals.filter((goal) => goal.status === 'Completed').length;
    const avgProgress = goals.length
      ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)
      : 0;
    const activeWork = plannedWork.filter(
      (work) => work.status === 'Planned' || work.status === 'In progress' || work.status === 'Review'
    ).length;
    const highPriorityOpen = plannedWork.filter(
      (work) => work.priority === 'High' && work.status !== 'Done'
    ).length;

    return {
      completedGoals,
      avgProgress,
      activeWork,
      highPriorityOpen,
    };
  }, [goals, plannedWork]);

  const groupedWork = useMemo(() => {
    return workflowColumns.reduce<Record<WorkStatus, PlannedWorkItem[]>>(
      (acc, status) => {
        acc[status] = plannedWork
          .filter((item) => item.status === status)
          .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));
        return acc;
      },
      {
        Backlog: [],
        Planned: [],
        'In progress': [],
        Review: [],
        Done: [],
      }
    );
  }, [plannedWork]);

  const weeklyColumns = useMemo(() => {
    return Array.from({ length: 5 }).map((_, index) => {
      const date = addDays(weekStart, index);
      const key = toDateLabel(date);
      const tasks = plannedWork
        .filter((item) => item.dueDate === key)
        .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));

      return {
        date,
        key,
        dayLabel: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dateLabel: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        tasks,
      };
    });
  }, [plannedWork, weekStart]);

  const weeklyHeaderRange = useMemo(() => {
    const end = addDays(weekStart, 4);
    return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  }, [weekStart]);

  const addGoal = async () => {
    if (!canEditProjects) {
      setGoalFormError('You do not have permission to manage project goals.');
      return;
    }

    const title = goalTitle.trim();
    const owner = goalOwner.trim();

    if (!title || !owner || !goalTargetDate) {
      setGoalFormError('Goal title, owner, and target date are required.');
      return;
    }

    try {
      const response = await fetch('/api/admin/projects/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, owner, targetDate: goalTargetDate }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        setGoalFormError(payload.error || 'Unable to create goal.');
        return;
      }

      const payload = (await response.json()) as { item: TeamGoal };
      setGoals((prev) => [payload.item, ...prev]);
      setGoalTitle('');
      setGoalOwner('');
      setGoalTargetDate('');
      setGoalFormError('');
    } catch {
      setGoalFormError('Unable to connect to server.');
    }
  };

  const addPlannedWork = async () => {
    if (!canEditProjects) {
      setWorkFormError('You do not have permission to manage project work items.');
      return;
    }

    const project = workProject.trim();
    const title = workTitle.trim();
    const owner = workOwner.trim();
    const effort = Number(workEffort);

    if (!project || !title || !owner || !workDueDate) {
      setWorkFormError('Project, task title, owner, and due date are required.');
      return;
    }

    if (!Number.isFinite(effort) || effort <= 0) {
      setWorkFormError('Effort must be a valid positive number.');
      return;
    }

    try {
      const response = await fetch('/api/admin/projects/work-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project,
          title,
          owner,
          dueDate: workDueDate,
          effort,
          priority: workPriority,
          status: workStatus,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        setWorkFormError(payload.error || 'Unable to create work item.');
        return;
      }

      const payload = (await response.json()) as { item: PlannedWorkItem };
      setPlannedWork((prev) => [payload.item, ...prev]);
      setWorkProject('');
      setWorkTitle('');
      setWorkOwner('');
      setWorkDueDate('');
      setWorkStatus('Planned');
      setWorkPriority('Medium');
      setWorkEffort('3');
      setWorkFormError('');
    } catch {
      setWorkFormError('Unable to connect to server.');
    }
  };

  const moveWork = async (id: string, status: WorkStatus) => {
    const previous = plannedWork;
    const next = plannedWork.map((work) => (work.id === id ? { ...work, status } : work));
    setPlannedWork(next);

    try {
      const response = await fetch(`/api/admin/projects/work-items/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        setPlannedWork(previous);
      }
    } catch {
      setPlannedWork(previous);
    }
  };

  const beginGoalEdit = (goal: TeamGoal) => {
    setEditingGoalId(goal.id);
    setEditingGoalProgress(String(goal.progress));
    setEditingGoalStatus(goal.status);
  };

  const saveGoalEdit = async () => {
    if (!editingGoalId || !canEditProjects) {
      return;
    }

    const progress = Number(editingGoalProgress);
    if (!Number.isFinite(progress)) {
      return;
    }

    const previous = goals;
    const next = goals.map((goal) =>
      goal.id === editingGoalId
        ? {
            ...goal,
            progress: Math.max(0, Math.min(100, progress)),
            status: editingGoalStatus,
          }
        : goal
    );
    setGoals(next);

    try {
      const response = await fetch(`/api/admin/projects/goals/${editingGoalId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress, status: editingGoalStatus }),
      });

      if (!response.ok) {
        setGoals(previous);
        return;
      }

      setEditingGoalId(null);
    } catch {
      setGoals(previous);
    }
  };

  const beginWorkEdit = (item: PlannedWorkItem) => {
    setEditingWorkId(item.id);
    setEditingWorkProject(item.project);
    setEditingWorkTitle(item.title);
    setEditingWorkOwner(item.owner);
    setEditingWorkDueDate(item.dueDate);
    setEditingWorkEffort(String(item.effort));
    setEditingWorkPriority(item.priority);
  };

  const saveWorkEdit = async () => {
    if (!editingWorkId || !canEditProjects) {
      return;
    }

    const effort = Number(editingWorkEffort);
    if (!Number.isFinite(effort) || effort <= 0) {
      return;
    }

    const previous = plannedWork;
    const next = plannedWork.map((work) =>
      work.id === editingWorkId
        ? {
            ...work,
            project: editingWorkProject.trim(),
            title: editingWorkTitle.trim(),
            owner: editingWorkOwner.trim(),
            dueDate: editingWorkDueDate,
            effort,
            priority: editingWorkPriority,
          }
        : work
    );
    setPlannedWork(next);

    try {
      const response = await fetch(`/api/admin/projects/work-items/${editingWorkId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: editingWorkProject,
          title: editingWorkTitle,
          owner: editingWorkOwner,
          dueDate: editingWorkDueDate,
          effort,
          priority: editingWorkPriority,
        }),
      });

      if (!response.ok) {
        setPlannedWork(previous);
        return;
      }

      setEditingWorkId(null);
    } catch {
      setPlannedWork(previous);
    }
  };

  const removeWorkItem = async (id: string) => {
    if (!canEditProjects) {
      return;
    }

    const previous = plannedWork;
    setPlannedWork((prev) => prev.filter((item) => item.id !== id));

    try {
      const response = await fetch(`/api/admin/projects/work-items/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        setPlannedWork(previous);
      }
    } catch {
      setPlannedWork(previous);
    }
  };

  const onDragStart = (id: string) => {
    if (!canEditProjects) return;
    setDraggingId(id);
  };

  const onDropColumn = async (targetStatus: WorkStatus) => {
    if (!canEditProjects || !draggingId) return;

    const dragged = plannedWork.find((item) => item.id === draggingId);
    if (!dragged) {
      setDraggingId(null);
      return;
    }

    const rest = plannedWork.filter((item) => item.id !== draggingId);
    const moved: PlannedWorkItem = { ...dragged, status: targetStatus };
    const next = [moved, ...rest];

    const ranked = next.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    const previous = plannedWork;
    setPlannedWork(ranked);
    setDraggingId(null);

    try {
      const response = await fetch('/api/admin/projects/work-items/reorder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: toRankedOrder(ranked) }),
      });

      if (!response.ok) {
        setPlannedWork(previous);
      }
    } catch {
      setPlannedWork(previous);
    }
  };

  const moveWeek = (offsetDays: number) => {
    setWeekStart((prev) => addDays(prev, offsetDays));
  };

  const addChecklistItem = (dateKey: string) => {
    if (!canEditProjects) {
      return;
    }

    const text = (dailyChecklistInput[dateKey] || '').trim();
    if (!text) {
      return;
    }

    const nextItem: CalendarChecklistItem = {
      id: `list_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      text,
      done: false,
    };

    setDailyChecklistItems((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), nextItem],
    }));
    setDailyChecklistInput((prev) => ({
      ...prev,
      [dateKey]: '',
    }));
  };

  const toggleChecklistItem = (dateKey: string, itemId: string) => {
    setDailyChecklistItems((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item
      ),
    }));
  };

  return (
    <AdminLayoutV2
      activePath="/admin/projects"
      title="Project Management"
      subtitle="Set team goals, plan project work, and coordinate delivery with a workflow board inspired by Monday-style planning."
    >
      <section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AdminMetricCard
            label="Completed Goals"
            value={String(metrics.completedGoals)}
            description="Goals completed this cycle"
          />
          <AdminMetricCard
            label="Average Goal Progress"
            value={`${metrics.avgProgress}%`}
            description="Across all active goals"
          />
          <AdminMetricCard
            label="Active Planned Work"
            value={String(metrics.activeWork)}
            description="Planned, in progress, and under review"
          />
          <AdminMetricCard
            label="High Priority Open"
            value={String(metrics.highPriorityOpen)}
            description="Items requiring immediate focus"
          />
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold" style={{ color: adminColors.adminText }}>
            Team Goals
          </h2>
          <p className="mt-1 text-sm" style={{ color: adminColors.adminMuted }}>
            Define measurable goals and track progress by owner and due date.
          </p>
          <p className="mt-2 text-xs" style={{ color: canEditProjects ? adminColors.success : adminColors.warning }}>
            {isPermissionLoaded
              ? canEditProjects
                ? `Permission: ${permissionLevel} (edit enabled)`
                : `Permission: ${permissionLevel} (read-only)`
              : 'Loading permission...'}
          </p>
        </div>

        <div
          className="rounded-lg border p-4"
          style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface }}
        >
          <div className="grid gap-3 md:grid-cols-4">
            <input
              value={goalTitle}
              onChange={(event) => setGoalTitle(event.target.value)}
              className="rounded-lg border px-4 py-2 text-sm outline-none"
              style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
              placeholder="Goal title"
              disabled={!canEditProjects}
            />
            <input
              value={goalOwner}
              onChange={(event) => setGoalOwner(event.target.value)}
              className="rounded-lg border px-4 py-2 text-sm outline-none"
              style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
              placeholder="Goal owner"
              disabled={!canEditProjects}
            />
            <input
              type="date"
              value={goalTargetDate}
              onChange={(event) => setGoalTargetDate(event.target.value)}
              className="rounded-lg border px-4 py-2 text-sm outline-none"
              style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
              disabled={!canEditProjects}
            />
            <button
              onClick={addGoal}
              disabled={!canEditProjects}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              style={{ backgroundColor: adminColors.lbyaGreen }}
            >
              Add Goal
            </button>
          </div>

          {goalFormError ? (
            <p className="mt-3 text-sm" style={{ color: '#B91C1C' }}>
              {goalFormError}
            </p>
          ) : null}
        </div>

        <div className="mt-5">
          <AdminDataTable
            columns={[
              { key: 'title' as const, label: 'Goal', width: '320px' },
              { key: 'owner' as const, label: 'Owner', width: '170px' },
              { key: 'targetDate' as const, label: 'Target Date', width: '130px' },
              {
                key: 'progress' as const,
                label: 'Progress',
                width: '180px',
                render: (value: number) => (
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 rounded-full" style={{ backgroundColor: adminColors.adminSurfaceMuted }}>
                      <div
                        className="h-2 rounded-full"
                        style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: adminColors.lbyaGreen }}
                      />
                    </div>
                    <span className="text-xs" style={{ color: adminColors.adminMuted }}>
                      {value}%
                    </span>
                  </div>
                ),
              },
              {
                key: 'status' as const,
                label: 'Status',
                width: '120px',
                render: (value: GoalStatus) => <AdminStatusBadge status={value as any} size="sm" />,
              },
              {
                key: 'id' as const,
                label: 'Actions',
                width: '240px',
                render: (_value: string, row: TeamGoal) =>
                  editingGoalId === row.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={editingGoalProgress}
                        onChange={(event) => setEditingGoalProgress(event.target.value)}
                        className="w-16 rounded border px-2 py-1 text-xs"
                        style={{ borderColor: adminColors.adminBorder }}
                      />
                      <select
                        value={editingGoalStatus}
                        onChange={(event) => setEditingGoalStatus(event.target.value as GoalStatus)}
                        className="rounded border px-2 py-1 text-xs"
                        style={{ borderColor: adminColors.adminBorder }}
                      >
                        <option value="Planned">Planned</option>
                        <option value="In progress">In progress</option>
                        <option value="At risk">At risk</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button
                        className="rounded border px-2 py-1 text-xs"
                        style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
                        onClick={saveGoalEdit}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled={!canEditProjects}
                      className="rounded border px-2 py-1 text-xs disabled:opacity-50"
                      style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
                      onClick={() => beginGoalEdit(row)}
                    >
                      Edit
                    </button>
                  ),
              },
            ]}
            data={goals}
            keyExtractor={(item) => item.id}
            striped
          />
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold" style={{ color: adminColors.adminText }}>
            Planned Project Work
          </h2>
          <p className="mt-1 text-sm" style={{ color: adminColors.adminMuted }}>
            Capture and schedule project work with owners, due dates, and effort.
          </p>
        </div>

        <div
          className="rounded-lg border p-4"
          style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface }}
        >
          <div className="grid gap-3 md:grid-cols-4">
            <input
              value={workProject}
              onChange={(event) => setWorkProject(event.target.value)}
              className="rounded-lg border px-4 py-2 text-sm outline-none"
              style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
              placeholder="Project"
              disabled={!canEditProjects}
            />
            <input
              value={workTitle}
              onChange={(event) => setWorkTitle(event.target.value)}
              className="rounded-lg border px-4 py-2 text-sm outline-none"
              style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
              placeholder="Task title"
              disabled={!canEditProjects}
            />
            <input
              value={workOwner}
              onChange={(event) => setWorkOwner(event.target.value)}
              className="rounded-lg border px-4 py-2 text-sm outline-none"
              style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
              placeholder="Owner"
              disabled={!canEditProjects}
            />
            <input
              type="date"
              value={workDueDate}
              onChange={(event) => setWorkDueDate(event.target.value)}
              className="rounded-lg border px-4 py-2 text-sm outline-none"
              style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
              disabled={!canEditProjects}
            />
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-4">
            <select
              value={workStatus}
              onChange={(event) => setWorkStatus(event.target.value as WorkStatus)}
              className="rounded-lg border px-4 py-2 text-sm outline-none"
              style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
              disabled={!canEditProjects}
            >
              {workflowColumns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
            <select
              value={workPriority}
              onChange={(event) => setWorkPriority(event.target.value as PlannedWorkItem['priority'])}
              className="rounded-lg border px-4 py-2 text-sm outline-none"
              style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
              disabled={!canEditProjects}
            >
              <option value="Low">Low priority</option>
              <option value="Medium">Medium priority</option>
              <option value="High">High priority</option>
            </select>
            <input
              type="number"
              min="1"
              value={workEffort}
              onChange={(event) => setWorkEffort(event.target.value)}
              className="rounded-lg border px-4 py-2 text-sm outline-none"
              style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
              placeholder="Effort points"
              disabled={!canEditProjects}
            />
            <button
              onClick={addPlannedWork}
              disabled={!canEditProjects}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              style={{ backgroundColor: adminColors.lbyaGreen }}
            >
              Add Work Item
            </button>
          </div>

          {workFormError ? (
            <p className="mt-3 text-sm" style={{ color: '#B91C1C' }}>
              {workFormError}
            </p>
          ) : null}
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold" style={{ color: adminColors.adminText }}>
              Weekly Plan
            </h2>
            <p className="mt-1 text-sm" style={{ color: adminColors.adminMuted }}>
              Tasks scheduled by due date across the working week
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-md border text-lg font-light transition-colors hover:bg-gray-50"
              style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
              onClick={() => moveWeek(-7)}
              aria-label="Previous week"
            >
              &#8249;
            </button>
            <span
              className="flex h-8 items-center gap-1.5 rounded-md border px-3 text-sm font-medium"
              style={{ borderColor: adminColors.adminBorder, backgroundColor: adminColors.adminSurface, color: adminColors.adminText }}
            >
              <span style={{ color: adminColors.lbyaGreen, fontSize: '8px' }}>&#9679;</span>
              {weeklyHeaderRange}
            </span>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-md border text-lg font-light transition-colors hover:bg-gray-50"
              style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText }}
              onClick={() => moveWeek(7)}
              aria-label="Next week"
            >
              &#8250;
            </button>
          </div>
        </div>

        <div className="space-y-4 md:hidden">
          {weeklyColumns.map((column) => {
            const isToday = column.key === toDateLabel(new Date());
            return (
              <div
                key={column.key + '-mobile'}
                className="overflow-hidden rounded-xl border"
                style={{ borderColor: adminColors.adminBorder, backgroundColor: '#FAFAFA' }}
              >
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{
                    backgroundColor: isToday ? '#EBF4FF' : adminColors.adminSurface,
                    borderBottom: `1px solid ${adminColors.adminBorder}`,
                  }}
                >
                  <div>
                    <p
                      className="text-[11px] font-bold uppercase tracking-widest"
                      style={{ color: isToday ? '#579BFC' : adminColors.adminSubtle }}
                    >
                      {column.dayLabel}
                    </p>
                    <p className="mt-1 text-sm font-semibold" style={{ color: adminColors.adminText }}>
                      {column.dateLabel}
                    </p>
                  </div>
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: isToday ? '#579BFC' : adminColors.adminSurfaceMuted,
                      color: isToday ? '#fff' : adminColors.adminText,
                    }}
                  >
                    {column.date.getDate()}
                  </span>
                </div>

                <div className="space-y-3 p-3">
                  <div className="space-y-2">
                    {column.tasks.map((task) => {
                      const pMeta = priorityMeta[task.priority];
                      const colMeta = kanbanColumnMeta[task.status];
                      return (
                        <div
                          key={task.id}
                          className="overflow-hidden rounded-lg bg-white"
                          style={{
                            borderLeft: `3px solid ${pMeta.color}`,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
                          }}
                        >
                          <div className="px-3 pt-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span
                                className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                                style={{ backgroundColor: adminColors.adminSurfaceMuted, color: adminColors.adminSubtle }}
                              >
                                {task.project}
                              </span>
                              <span
                                className="rounded px-1.5 py-0.5 text-[9px] font-semibold"
                                style={{ backgroundColor: colMeta.bg, color: colMeta.color }}
                              >
                                {task.status}
                              </span>
                            </div>
                            <p className="mt-2 text-sm font-semibold leading-snug" style={{ color: adminColors.adminText }}>
                              {task.title}
                            </p>
                          </div>
                          <div className="flex items-center justify-between px-3 pb-3 pt-2">
                            <div className="flex min-w-0 items-center gap-2">
                              <span
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                                style={{ backgroundColor: colMeta.color }}
                              >
                                {task.owner.charAt(0).toUpperCase()}
                              </span>
                              <span className="truncate text-[11px]" style={{ color: adminColors.adminMuted }}>
                                {task.owner}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-semibold" style={{ color: pMeta.color }}>
                                {task.priority}
                              </span>
                              <span className="text-[10px]" style={{ color: adminColors.adminMuted }}>
                                {task.effort} pts
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {column.tasks.length === 0 ? (
                      <div
                        className="flex items-center justify-center rounded-lg border-2 border-dashed py-5"
                        style={{ borderColor: adminColors.adminBorder }}
                      >
                        <p className="text-[10px]" style={{ color: adminColors.adminMuted }}>No tasks</p>
                      </div>
                    ) : null}
                  </div>

                  <div className="border-t pt-3" style={{ borderColor: adminColors.adminBorder }}>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: adminColors.adminSubtle }}>
                      Checklist
                    </p>
                    <div className="mb-2 flex gap-1.5">
                      <input
                        value={dailyChecklistInput[column.key] || ''}
                        onChange={(event) =>
                          setDailyChecklistInput((prev) => ({ ...prev, [column.key]: event.target.value }))
                        }
                        placeholder="Add item..."
                        className="min-w-0 flex-1 rounded border px-3 py-2 text-xs outline-none"
                        style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText, backgroundColor: '#fff' }}
                        disabled={!canEditProjects}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            addChecklistItem(column.key);
                          }
                        }}
                      />
                      <button
                        onClick={() => addChecklistItem(column.key)}
                        className="shrink-0 rounded border px-3 py-2 text-xs font-semibold"
                        style={{
                          borderColor: adminColors.lbyaGreen,
                          color: adminColors.lbyaGreen,
                          backgroundColor: adminColors.lbyaGreenSoft,
                        }}
                        disabled={!canEditProjects}
                      >
                        Add
                      </button>
                    </div>
                    <div className="space-y-1">
                      {(dailyChecklistItems[column.key] || []).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => toggleChecklistItem(column.key, item.id)}
                          className="flex w-full items-start gap-2 rounded-md px-1 py-1 text-left transition-colors hover:bg-white"
                          disabled={!canEditProjects}
                        >
                          <span
                            className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border text-[9px] transition-all"
                            style={{
                              borderColor: item.done ? adminColors.lbyaGreen : adminColors.adminBorder,
                              backgroundColor: item.done ? adminColors.lbyaGreen : 'transparent',
                              color: '#fff',
                            }}
                          >
                            {item.done ? '\u2713' : ''}
                          </span>
                          <span
                            className="text-xs leading-tight"
                            style={{
                              color: item.done ? adminColors.adminSubtle : adminColors.adminText,
                              textDecoration: item.done ? 'line-through' : 'none',
                            }}
                          >
                            {item.text}
                          </span>
                        </button>
                      ))}
                      {(dailyChecklistItems[column.key] || []).length === 0 ? (
                        <p className="px-1 text-[10px]" style={{ color: adminColors.adminMuted }}>No items yet</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hidden overflow-hidden rounded-xl border md:block" style={{ borderColor: adminColors.adminBorder }}>
          {/* Day header row */}
          <div className="grid grid-cols-5" style={{ borderBottom: `1px solid ${adminColors.adminBorder}` }}>
            {weeklyColumns.map((column) => {
              const isToday = column.key === toDateLabel(new Date());
              return (
                <div
                  key={column.key + '-h'}
                  className="flex flex-col items-center px-3 py-3"
                  style={{
                    borderRight: `1px solid ${adminColors.adminBorder}`,
                    backgroundColor: isToday ? '#EBF4FF' : adminColors.adminSurface,
                  }}
                >
                  <p
                    className="text-[11px] font-bold uppercase tracking-widest"
                    style={{ color: isToday ? '#579BFC' : adminColors.adminSubtle }}
                  >
                    {column.dayLabel}
                  </p>
                  <span
                    className="mt-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: isToday ? '#579BFC' : 'transparent',
                      color: isToday ? '#fff' : adminColors.adminText,
                    }}
                  >
                    {column.date.getDate()}
                  </span>
                  <p className="mt-0.5 text-[10px]" style={{ color: adminColors.adminMuted }}>
                    {column.date.toLocaleDateString('en-US', { month: 'short' })}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Day body columns */}
          <div className="grid grid-cols-5" style={{ borderTop: 'none' }}>
            {weeklyColumns.map((column, colIdx) => {
              const isToday = column.key === toDateLabel(new Date());
              return (
                <div
                  key={column.key + '-b'}
                  className="p-2"
                  style={{
                    minHeight: '280px',
                    backgroundColor: isToday ? '#F5F9FF' : '#FAFAFA',
                    borderRight: colIdx < 4 ? `1px solid ${adminColors.adminBorder}` : 'none',
                  }}
                >
                  {/* Task cards */}
                  <div className="space-y-1.5">
                    {column.tasks.map((task) => {
                      const pMeta = priorityMeta[task.priority];
                      const colMeta = kanbanColumnMeta[task.status];
                      return (
                        <div
                          key={task.id}
                          className="overflow-hidden rounded-lg bg-white"
                          style={{
                            borderLeft: `3px solid ${pMeta.color}`,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
                          }}
                        >
                          <div className="px-2.5 pt-2">
                            <div className="flex flex-wrap items-center gap-1">
                              <span
                                className="text-[9px] font-bold uppercase tracking-wide rounded px-1 py-0.5"
                                style={{ backgroundColor: adminColors.adminSurfaceMuted, color: adminColors.adminSubtle }}
                              >
                                {task.project}
                              </span>
                              <span
                                className="text-[9px] rounded px-1 py-0.5 font-semibold"
                                style={{ backgroundColor: colMeta.bg, color: colMeta.color }}
                              >
                                {task.status}
                              </span>
                            </div>
                            <p className="mt-1 text-xs font-semibold leading-tight" style={{ color: adminColors.adminText }}>
                              {task.title}
                            </p>
                          </div>
                          <div className="flex items-center justify-between px-2.5 pb-2 pt-1.5">
                            <div className="flex items-center gap-1">
                              <span
                                className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white"
                                style={{ backgroundColor: colMeta.color }}
                              >
                                {task.owner.charAt(0).toUpperCase()}
                              </span>
                              <span className="text-[10px]" style={{ color: adminColors.adminMuted }}>{task.owner}</span>
                            </div>
                            <span className="text-[9px] font-semibold" style={{ color: pMeta.color }}>{task.priority}</span>
                          </div>
                          {/* Effort bar */}
                          <div className="h-0.5" style={{ backgroundColor: '#F1F3F5' }}>
                            <div
                              className="h-0.5 transition-all"
                              style={{ width: `${Math.min(100, task.effort * 10)}%`, backgroundColor: pMeta.color }}
                            />
                          </div>
                        </div>
                      );
                    })}

                    {column.tasks.length === 0 ? (
                      <div
                        className="flex items-center justify-center rounded-lg border-2 border-dashed py-5"
                        style={{ borderColor: adminColors.adminBorder }}
                      >
                        <p className="text-[10px]" style={{ color: adminColors.adminMuted }}>No tasks</p>
                      </div>
                    ) : null}
                  </div>

                  <div className="my-2.5 border-t" style={{ borderColor: adminColors.adminBorder }} />

                  {/* Daily checklist */}
                  <div>
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: adminColors.adminSubtle }}>
                      Checklist
                    </p>
                    <div className="mb-1.5 flex gap-1">
                      <input
                        value={dailyChecklistInput[column.key] || ''}
                        onChange={(event) =>
                          setDailyChecklistInput((prev) => ({ ...prev, [column.key]: event.target.value }))
                        }
                        placeholder="Add item..."
                        className="min-w-0 flex-1 rounded border px-2 py-1 text-[11px] outline-none"
                        style={{ borderColor: adminColors.adminBorder, color: adminColors.adminText, backgroundColor: '#fff' }}
                        disabled={!canEditProjects}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            addChecklistItem(column.key);
                          }
                        }}
                      />
                      <button
                        onClick={() => addChecklistItem(column.key)}
                        className="shrink-0 rounded border px-2 py-1 text-[11px] font-semibold"
                        style={{
                          borderColor: adminColors.lbyaGreen,
                          color: adminColors.lbyaGreen,
                          backgroundColor: adminColors.lbyaGreenSoft,
                        }}
                        disabled={!canEditProjects}
                      >
                        +
                      </button>
                    </div>
                    <div className="space-y-0.5">
                      {(dailyChecklistItems[column.key] || []).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => toggleChecklistItem(column.key, item.id)}
                          className="flex w-full items-start gap-2 rounded-md px-1 py-1 text-left transition-colors hover:bg-white"
                          disabled={!canEditProjects}
                        >
                          <span
                            className="mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border text-[9px] transition-all"
                            style={{
                              borderColor: item.done ? adminColors.lbyaGreen : adminColors.adminBorder,
                              backgroundColor: item.done ? adminColors.lbyaGreen : 'transparent',
                              color: '#fff',
                            }}
                          >
                            {item.done ? '\u2713' : ''}
                          </span>
                          <span
                            className="text-[11px] leading-tight"
                            style={{
                              color: item.done ? adminColors.adminSubtle : adminColors.adminText,
                              textDecoration: item.done ? 'line-through' : 'none',
                            }}
                          >
                            {item.text}
                          </span>
                        </button>
                      ))}
                      {(dailyChecklistItems[column.key] || []).length === 0 ? (
                        <p className="px-1 text-[10px]" style={{ color: adminColors.adminMuted }}>No items yet</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold" style={{ color: adminColors.adminText }}>
              Workflow Board
            </h2>
            <p className="mt-1 text-sm" style={{ color: adminColors.adminMuted }}>
              Drag cards between stages or use the status picker to move items across the pipeline.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs" style={{ color: adminColors.adminMuted }}>
            {(['High', 'Medium', 'Low'] as const).map((p) => (
              <span key={p} className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: priorityMeta[p].color }} />
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory xl:grid xl:grid-cols-3 xl:overflow-visible 2xl:grid-cols-5">
          {workflowColumns.map((column) => {
            const meta = kanbanColumnMeta[column];
            return (
              <div
                key={column}
                className="flex w-[85vw] max-w-[340px] shrink-0 snap-start flex-col overflow-hidden rounded-xl sm:w-[320px] xl:w-auto xl:max-w-none"
                style={{ border: `1px solid ${adminColors.adminBorder}`, backgroundColor: '#F8F9FB' }}
                onDragOver={(event) => { if (canEditProjects) event.preventDefault(); }}
                onDrop={() => onDropColumn(column)}
              >
                {/* Colored top accent bar */}
                <div className="h-[3px]" style={{ backgroundColor: meta.color }} />

                {/* Column header */}
                <div
                  className="flex items-center justify-between px-3 py-2.5"
                  style={{ backgroundColor: meta.bg }}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: meta.color }} />
                    <span className="text-xs font-bold tracking-wide" style={{ color: meta.color }}>
                      {column.toUpperCase()}
                    </span>
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-bold"
                    style={{ backgroundColor: meta.color + '22', color: meta.color }}
                  >
                    {groupedWork[column].length}
                  </span>
                </div>

                {/* Card list */}
                <div className="flex-1 space-y-2 p-2">
                  {groupedWork[column].map((item) => {
                    const pMeta = priorityMeta[item.priority];
                    const today = new Date();
                    const due = new Date(item.dueDate);
                    const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    const isOverdue = diffDays < 0 && item.status !== 'Done';
                    const isDueSoon = diffDays >= 0 && diffDays <= 2 && item.status !== 'Done';
                    return (
                      <div
                        key={item.id}
                        className="overflow-hidden rounded-lg bg-white"
                        style={{
                          borderLeft: `3px solid ${pMeta.color}`,
                          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                          cursor: canEditProjects ? 'grab' : 'default',
                        }}
                        draggable={canEditProjects}
                        onDragStart={() => onDragStart(item.id)}
                      >
                        {/* Card body */}
                        <div className="p-3 sm:p-3.5">
                          <span
                            className="inline-block text-[9px] font-bold uppercase tracking-wide rounded px-1.5 py-0.5 mb-2"
                            style={{ backgroundColor: adminColors.adminSurfaceMuted, color: adminColors.adminSubtle }}
                          >
                            {item.project}
                          </span>
                          <p className="text-sm font-semibold leading-snug" style={{ color: adminColors.adminText }}>
                            {item.title}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                              style={{ backgroundColor: meta.color }}
                            >
                              {item.owner.charAt(0).toUpperCase()}
                            </span>
                            <span className="text-xs" style={{ color: adminColors.adminMuted }}>{item.owner}</span>
                          </div>
                          <div
                            className="mt-3 flex flex-wrap items-center gap-2 border-t pt-2"
                            style={{ borderColor: '#F1F3F5' }}
                          >
                            <span
                              className="rounded px-1.5 py-0.5 text-[10px] font-semibold"
                              style={{ backgroundColor: pMeta.bg, color: pMeta.color }}
                            >
                              {item.priority}
                            </span>
                            <span
                              className="text-[10px] font-medium"
                              style={{ color: isOverdue ? '#E2445C' : isDueSoon ? '#FDAB3D' : adminColors.adminMuted }}
                            >
                              {isOverdue ? '⚠ ' : ''}{item.dueDate}
                            </span>
                            <span className="text-[10px]" style={{ color: adminColors.adminMuted }}>{item.effort}p</span>
                          </div>
                        </div>

                        {/* Inline edit form */}
                        {editingWorkId === item.id ? (
                          <div
                            className="space-y-2 border-t px-3 pb-3 pt-2"
                            style={{ borderColor: '#F1F3F5' }}
                          >
                            <input
                              value={editingWorkProject}
                              onChange={(e) => setEditingWorkProject(e.target.value)}
                              className="w-full rounded border px-2 py-1 text-xs outline-none"
                              style={{ borderColor: adminColors.adminBorder }}
                              placeholder="Project"
                            />
                            <input
                              value={editingWorkTitle}
                              onChange={(e) => setEditingWorkTitle(e.target.value)}
                              className="w-full rounded border px-2 py-1 text-xs outline-none"
                              style={{ borderColor: adminColors.adminBorder }}
                              placeholder="Task title"
                            />
                            <div className="grid grid-cols-2 gap-1.5">
                              <input
                                value={editingWorkOwner}
                                onChange={(e) => setEditingWorkOwner(e.target.value)}
                                className="rounded border px-2 py-1 text-xs outline-none"
                                style={{ borderColor: adminColors.adminBorder }}
                                placeholder="Owner"
                              />
                              <input
                                type="date"
                                value={editingWorkDueDate}
                                onChange={(e) => setEditingWorkDueDate(e.target.value)}
                                className="rounded border px-2 py-1 text-xs outline-none"
                                style={{ borderColor: adminColors.adminBorder }}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                              <input
                                type="number"
                                min="1"
                                value={editingWorkEffort}
                                onChange={(e) => setEditingWorkEffort(e.target.value)}
                                className="rounded border px-2 py-1 text-xs outline-none"
                                style={{ borderColor: adminColors.adminBorder }}
                                placeholder="Effort"
                              />
                              <select
                                value={editingWorkPriority}
                                onChange={(e) => setEditingWorkPriority(e.target.value as PlannedWorkItem['priority'])}
                                className="rounded border px-2 py-1 text-xs outline-none"
                                style={{ borderColor: adminColors.adminBorder }}
                              >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                              </select>
                            </div>
                            <button
                              className="w-full rounded-md px-2 py-1.5 text-xs font-semibold text-white"
                              style={{ backgroundColor: adminColors.lbyaGreen }}
                              onClick={saveWorkEdit}
                            >
                              Save changes
                            </button>
                          </div>
                        ) : null}

                        {/* Action bar */}
                        <div
                          className="flex flex-wrap items-center gap-1.5 border-t px-3 py-2"
                          style={{ borderColor: '#F1F3F5' }}
                        >
                          <button
                            disabled={!canEditProjects}
                            className="rounded px-2 py-0.5 text-[10px] font-medium transition-colors hover:bg-gray-100 disabled:opacity-40"
                            style={{ color: adminColors.adminMuted }}
                            onClick={() => beginWorkEdit(item)}
                          >
                            Edit
                          </button>
                          <button
                            disabled={!canEditProjects}
                            className="rounded px-2 py-0.5 text-[10px] font-medium transition-colors hover:bg-red-50 disabled:opacity-40"
                            style={{ color: '#E2445C' }}
                            onClick={() => removeWorkItem(item.id)}
                          >
                            Delete
                          </button>
                          <div className="w-full sm:ml-auto sm:w-auto">
                            <select
                              value={item.status}
                              onChange={(event) => moveWork(item.id, event.target.value as WorkStatus)}
                              className="w-full rounded border px-2 py-1 text-[10px] outline-none sm:w-auto"
                              style={{ borderColor: adminColors.adminBorder, color: adminColors.adminMuted, maxWidth: '100%' }}
                              disabled={!canEditProjects}
                            >
                              {workflowColumns.map((nextStatus) => (
                                <option key={nextStatus} value={nextStatus}>
                                  → {nextStatus}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {groupedWork[column].length === 0 ? (
                    <div
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-8"
                      style={{ borderColor: meta.color + '55' }}
                    >
                      <span className="text-2xl font-light" style={{ color: meta.color + '77' }}>+</span>
                      <p className="mt-1 text-[10px]" style={{ color: adminColors.adminMuted }}>Drop here</p>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </AdminLayoutV2>
  );
}
