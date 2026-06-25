"use client";

import React, { useEffect, useMemo, useState } from 'react';
import AdminLayoutV2 from '@/app/components/admin/AdminLayoutV2';
import AdminDataTable from '@/app/components/admin/AdminDataTableV2';
import { adminColors } from '@/app/components/admin/adminDesignTokens';
import { APPLICATION_TYPE_LABELS, type ApplicationRequest, type ApplicationStatus } from '@/lib/applications/types';

type ApplicationListResponse = {
  items: ApplicationRequest[];
  total: number;
  summary: {
    total: number;
    newApplications: number;
    inReview: number;
    qualifiedLeads: number;
    pilotDiscussions: number;
    enterpriseRequests: number;
    academicPilotRequests: number;
    careerApplications: number;
    convertedToCustomers: number;
  };
};

type ApplicationDetailResponse = {
  request: ApplicationRequest;
  notes: Array<{ id: string; note: string; createdBy: string; createdAt: string }>;
  auditLogs: Array<{ id: string; action: string; source: string; actorUserId: string | null; createdAt: string; metadataJson: unknown }>;
};

const statusStyles: Record<ApplicationStatus, string> = {
  new: 'bg-blue-100 text-blue-700',
  in_review: 'bg-orange-100 text-orange-700',
  qualified: 'bg-emerald-100 text-emerald-700',
  not_qualified: 'bg-slate-200 text-slate-700',
  contacted: 'bg-blue-100 text-blue-700',
  meeting_scheduled: 'bg-violet-100 text-violet-700',
  pilot_discussion: 'bg-violet-100 text-violet-700',
  proposal_sent: 'bg-orange-100 text-orange-700',
  approved: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
  converted_to_customer: 'bg-emerald-100 text-emerald-700',
  archived: 'bg-slate-200 text-slate-700',
};

function formatDate(value?: string | Date) {
  if (!value) return '-';
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleString();
}

function labelStatus(status: ApplicationStatus) {
  return status
    .split('_')
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(' ');
}

export default function AdminApplicationsPage() {
  const [items, setItems] = useState<ApplicationRequest[]>([]);
  const [summary, setSummary] = useState<ApplicationListResponse['summary'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<ApplicationDetailResponse | null>(null);
  const [noteText, setNoteText] = useState('');
  const [assignee, setAssignee] = useState('');
  const [tagText, setTagText] = useState('');
  const [subscriptionIdInput, setSubscriptionIdInput] = useState('');
  const [refreshToken, setRefreshToken] = useState(0);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (statusFilter) params.set('status', statusFilter);
    if (search.trim()) params.set('search', search.trim());
    return params.toString() ? `?${params.toString()}` : '';
  }, [statusFilter, search]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/admin/applications${query}`, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Failed to load (${response.status})`);
        }

        const payload = (await response.json()) as ApplicationListResponse;
        if (!cancelled) {
          setItems(payload.items || []);
          setSummary(payload.summary);
          setError(null);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load applications');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [query, refreshToken]);

  const openDetail = async (item: ApplicationRequest) => {
    const response = await fetch(`/api/admin/applications/${item.id}`, { cache: 'no-store' });
    if (!response.ok) {
      window.alert('Unable to load application details.');
      return;
    }

    const payload = (await response.json()) as ApplicationDetailResponse;
    setSelected(payload);
    setNoteText('');
    setAssignee(payload.request.assignedToUserId || '');
    setTagText('');
    setSubscriptionIdInput(payload.request.relatedSubscriptionId || '');
  };

  const patchApplication = async (applicationId: string, patch: Record<string, unknown>) => {
    const response = await fetch(`/api/admin/applications/${applicationId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      throw new Error(payload.error || 'Unable to update application');
    }

    return response.json();
  };

  const changeStatus = async (status: ApplicationStatus) => {
    if (!selected) return;
    try {
      await patchApplication(selected.request.id, { status });
      const refreshed = await fetch(`/api/admin/applications/${selected.request.id}`, { cache: 'no-store' });
      if (refreshed.ok) {
        setSelected((await refreshed.json()) as ApplicationDetailResponse);
      }
      setRefreshToken((prev) => prev + 1);
    } catch (changeError) {
      window.alert(changeError instanceof Error ? changeError.message : 'Unable to change status');
    }
  };

  const addNote = async () => {
    if (!selected || !noteText.trim()) return;
    const response = await fetch(`/api/admin/applications/${selected.request.id}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: noteText.trim() }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      window.alert(payload.error || 'Unable to add note');
      return;
    }

    const detail = (await response.json()) as { detail: ApplicationDetailResponse };
    setSelected(detail.detail);
    setNoteText('');
    setRefreshToken((prev) => prev + 1);
  };

  const assignToAdmin = async () => {
    if (!selected || !assignee.trim()) return;

    const response = await fetch(`/api/admin/applications/${selected.request.id}/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assignedToUserId: assignee.trim() }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      window.alert(payload.error || 'Unable to assign application');
      return;
    }

    const refreshed = await fetch(`/api/admin/applications/${selected.request.id}`, { cache: 'no-store' });
    if (refreshed.ok) {
      setSelected((await refreshed.json()) as ApplicationDetailResponse);
    }
    setRefreshToken((prev) => prev + 1);
  };

  const convertToCustomer = async () => {
    if (!selected) return;
    const confirmed = window.confirm('Convert this application into a customer record?');
    if (!confirmed) return;

    const response = await fetch(`/api/admin/applications/${selected.request.id}/convert-to-customer`, {
      method: 'POST',
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      window.alert(payload.error || 'Unable to convert application');
      return;
    }

    const refreshed = await fetch(`/api/admin/applications/${selected.request.id}`, { cache: 'no-store' });
    if (refreshed.ok) {
      setSelected((await refreshed.json()) as ApplicationDetailResponse);
    }
    setRefreshToken((prev) => prev + 1);
  };

  const createProductAccess = async () => {
    if (!selected) return;
    const confirmed = window.confirm('Create product access from this application as pending?');
    if (!confirmed) return;

    const response = await fetch(`/api/admin/applications/${selected.request.id}/create-product-access`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'pending' }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      window.alert(payload.error || 'Unable to create product access');
      return;
    }

    const refreshed = await fetch(`/api/admin/applications/${selected.request.id}`, { cache: 'no-store' });
    if (refreshed.ok) {
      setSelected((await refreshed.json()) as ApplicationDetailResponse);
    }
    setRefreshToken((prev) => prev + 1);
  };

  const archive = async () => {
    if (!selected) return;
    const response = await fetch(`/api/admin/applications/${selected.request.id}/archive`, { method: 'POST' });
    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      window.alert(payload.error || 'Unable to archive application');
      return;
    }
    setSelected(null);
    setRefreshToken((prev) => prev + 1);
  };

  const addTag = async () => {
    if (!selected || !tagText.trim()) return;

    const currentTags = Array.isArray(selected.request.tagsJson) ? selected.request.tagsJson : [];
    const nextTags = [...currentTags, tagText.trim()];

    try {
      await patchApplication(selected.request.id, { tagsJson: nextTags });
      const refreshed = await fetch(`/api/admin/applications/${selected.request.id}`, { cache: 'no-store' });
      if (refreshed.ok) {
        setSelected((await refreshed.json()) as ApplicationDetailResponse);
      }
      setTagText('');
      setRefreshToken((prev) => prev + 1);
    } catch (tagError) {
      window.alert(tagError instanceof Error ? tagError.message : 'Unable to add tag');
    }
  };

  const linkSubscription = async () => {
    if (!selected || !subscriptionIdInput.trim()) return;

    try {
      await patchApplication(selected.request.id, { relatedSubscriptionId: subscriptionIdInput.trim() });
      const refreshed = await fetch(`/api/admin/applications/${selected.request.id}`, { cache: 'no-store' });
      if (refreshed.ok) {
        setSelected((await refreshed.json()) as ApplicationDetailResponse);
      }
      setRefreshToken((prev) => prev + 1);
    } catch (linkError) {
      window.alert(linkError instanceof Error ? linkError.message : 'Unable to link subscription');
    }
  };

  return (
    <AdminLayoutV2
      activePath="/admin/applications"
      title="Applications & Requests"
      subtitle="Review product requests, pilot applications, enterprise introductions, academic pilots, partnerships, and career applications submitted through the LBYA AB website."
    >
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
        {[
          { label: 'New Applications', value: summary?.newApplications ?? 0 },
          { label: 'In Review', value: summary?.inReview ?? 0 },
          { label: 'Qualified Leads', value: summary?.qualifiedLeads ?? 0 },
          { label: 'Pilot Discussions', value: summary?.pilotDiscussions ?? 0 },
          { label: 'Enterprise Requests', value: summary?.enterpriseRequests ?? 0 },
          { label: 'Academic Pilot Requests', value: summary?.academicPilotRequests ?? 0 },
          { label: 'Career Applications', value: summary?.careerApplications ?? 0 },
          { label: 'Converted to Customers', value: summary?.convertedToCustomers ?? 0 },
        ].map((kpi) => (
          <article
            key={kpi.label}
            className="rounded-lg border bg-white p-4"
            style={{ borderColor: adminColors.adminBorder }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: adminColors.adminMuted }}>
              {kpi.label}
            </p>
            <p className="mt-2 text-2xl font-semibold" style={{ color: adminColors.adminText }}>
              {kpi.value}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-sm border px-3 py-2 text-sm"
          style={{ borderColor: adminColors.adminBorder, backgroundColor: 'white' }}
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="in_review">In Review</option>
          <option value="qualified">Qualified</option>
          <option value="not_qualified">Not Qualified</option>
          <option value="contacted">Contacted</option>
          <option value="meeting_scheduled">Meeting Scheduled</option>
          <option value="pilot_discussion">Pilot Discussion</option>
          <option value="proposal_sent">Proposal Sent</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="converted_to_customer">Converted to Customer</option>
          <option value="archived">Archived</option>
        </select>

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, company, or email"
          className="rounded-sm border px-3 py-2 text-sm"
          style={{ borderColor: adminColors.adminBorder, backgroundColor: 'white' }}
        />
      </section>

      {error && (
        <section className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </section>
      )}

      <section>
        {isLoading ? (
          <div className="rounded-lg border p-5 text-sm" style={{ borderColor: adminColors.adminBorder, backgroundColor: 'white' }}>
            Loading applications...
          </div>
        ) : (
          <AdminDataTable
            columns={[
              {
                key: 'firstName',
                label: 'Applicant',
                width: '180px',
                render: (_value, row) => {
                  const item = row as ApplicationRequest;
                  return (
                    <div>
                      <p className="font-semibold">{item.firstName} {item.lastName}</p>
                      <p className="text-xs text-slate-500">{item.email}</p>
                    </div>
                  );
                },
              },
              {
                key: 'companyName',
                label: 'Company / Organization',
                width: '180px',
                render: (_value, row) => {
                  const item = row as ApplicationRequest;
                  return item.companyName || item.organizationName || '-';
                },
              },
              {
                key: 'applicationType',
                label: 'Application Type',
                width: '180px',
                render: (value) => APPLICATION_TYPE_LABELS[value as keyof typeof APPLICATION_TYPE_LABELS] ?? String(value),
              },
              { key: 'productCode', label: 'Product', width: '90px', render: (value) => String(value || '-') },
              { key: 'projectSector', label: 'Sector', width: '120px', render: (value) => String(value || '-') },
              { key: 'country', label: 'Country', width: '100px', render: (value) => String(value || '-') },
              {
                key: 'status',
                label: 'Status',
                width: '140px',
                render: (value) => {
                  const status = value as ApplicationStatus;
                  return (
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusStyles[status] || 'bg-slate-100 text-slate-700'}`}>
                      {labelStatus(status)}
                    </span>
                  );
                },
              },
              { key: 'priority', label: 'Priority', width: '90px', render: (value) => String(value || '-') },
              { key: 'assignedToUserId', label: 'Assigned To', width: '160px', render: (value) => String(value || '-') },
              { key: 'createdAt', label: 'Submitted', width: '170px', render: (value) => formatDate(value as string) },
              {
                key: 'id',
                label: 'Action',
                width: '90px',
                render: (_value, row) => (
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      void openDetail(row as ApplicationRequest);
                    }}
                    className="rounded-sm border border-[#1F3529]/20 px-2 py-1 text-xs font-semibold text-[#1F3529]"
                  >
                    Review
                  </button>
                ),
              },
            ]}
            data={items}
            keyExtractor={(item) => item.id}
            onRowClick={(item) => {
              void openDetail(item as ApplicationRequest);
            }}
            striped
          />
        )}
      </section>

      {selected && (
        <section className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl overflow-y-auto border-l bg-white p-6 shadow-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#1F3529]">Application Detail</h2>
              <p className="mt-1 text-sm text-slate-600">{selected.request.firstName} {selected.request.lastName} · {selected.request.email}</p>
            </div>
            <button onClick={() => setSelected(null)} className="text-sm font-semibold text-slate-500">Close</button>
          </div>

          <div className="mt-5 grid gap-4 rounded-lg border p-4">
            <p><span className="font-semibold">Applicant information:</span> {selected.request.firstName} {selected.request.lastName}, {selected.request.email}, {selected.request.phone || '-'}</p>
            <p><span className="font-semibold">Company information:</span> {selected.request.companyName || selected.request.organizationName || '-'} · {selected.request.jobTitle || '-'} · {selected.request.country || '-'}</p>
            <p><span className="font-semibold">Product interest:</span> {selected.request.productCode || '-'} · {APPLICATION_TYPE_LABELS[selected.request.applicationType]}</p>
            <p><span className="font-semibold">Project sector:</span> {selected.request.projectSector || '-'}</p>
            <p><span className="font-semibold">Asset type:</span> {selected.request.assetType || '-'}</p>
            <p><span className="font-semibold">Current tools:</span> {JSON.stringify(selected.request.currentToolsJson || {})}</p>
            <p><span className="font-semibold">Main challenge:</span> {selected.request.mainChallenge || '-'}</p>
            <p><span className="font-semibold">Message:</span> {selected.request.message || selected.request.coverMessage || '-'}</p>
            <p><span className="font-semibold">Timeline:</span> {selected.request.expectedTimeline || '-'}</p>
            <p><span className="font-semibold">Preferred package:</span> {selected.request.preferredPackage || '-'}</p>
            <p><span className="font-semibold">Related customer:</span> {selected.request.relatedCustomerId || '-'}</p>
            <p><span className="font-semibold">Related subscription:</span> {selected.request.relatedSubscriptionId || '-'}</p>
            <p><span className="font-semibold">Related product access:</span> {selected.request.relatedProductAccessId || '-'}</p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button onClick={() => void changeStatus('contacted')} className="rounded-sm border border-blue-300 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
              Send follow-up email later
            </button>
            <button onClick={() => void changeStatus('meeting_scheduled')} className="rounded-sm border border-violet-300 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700">
              Schedule meeting later
            </button>
            <select
              defaultValue={selected.request.status}
              onChange={(event) => {
                void changeStatus(event.target.value as ApplicationStatus);
              }}
              className="rounded-sm border px-3 py-2 text-sm"
            >
              {Object.keys(statusStyles).map((status) => (
                <option key={status} value={status}>
                  {labelStatus(status as ApplicationStatus)}
                </option>
              ))}
            </select>
            <button onClick={convertToCustomer} className="rounded-sm border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
              Convert to customer
            </button>
            <button onClick={createProductAccess} className="rounded-sm border border-blue-300 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
              Create product access
            </button>
            <button onClick={archive} className="rounded-sm border border-slate-300 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
              Archive application
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              value={tagText}
              onChange={(event) => setTagText(event.target.value)}
              placeholder="Add tag"
              className="rounded-sm border px-3 py-2 text-sm"
            />
            <button onClick={addTag} className="rounded-sm bg-[#37474F] px-3 py-2 text-sm font-semibold text-white">
              Add tag
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              value={subscriptionIdInput}
              onChange={(event) => setSubscriptionIdInput(event.target.value)}
              placeholder="Link subscription id"
              className="rounded-sm border px-3 py-2 text-sm"
            />
            <button onClick={linkSubscription} className="rounded-sm bg-[#1F3529] px-3 py-2 text-sm font-semibold text-white">
              Link subscription
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              value={assignee}
              onChange={(event) => setAssignee(event.target.value)}
              placeholder="Assign to admin user id/email"
              className="rounded-sm border px-3 py-2 text-sm"
            />
            <button onClick={assignToAdmin} className="rounded-sm bg-[#1F3529] px-3 py-2 text-sm font-semibold text-white">
              Assign
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              value={noteText}
              onChange={(event) => setNoteText(event.target.value)}
              placeholder="Add internal note"
              className="rounded-sm border px-3 py-2 text-sm"
            />
            <button onClick={addNote} className="rounded-sm bg-[#2E7D32] px-3 py-2 text-sm font-semibold text-white">
              Add note
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-500">Status history</h3>
            <pre className="mt-2 overflow-auto rounded border bg-slate-50 p-3 text-xs text-slate-700">
              {JSON.stringify(selected.request.statusHistoryJson || [], null, 2)}
            </pre>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-500">Internal notes</h3>
            <ul className="mt-3 space-y-2">
              {selected.notes.map((note) => (
                <li key={note.id} className="rounded border bg-white p-3 text-sm">
                  <p>{note.note}</p>
                  <p className="mt-1 text-xs text-slate-500">{note.createdBy} · {formatDate(note.createdAt)}</p>
                </li>
              ))}
              {selected.notes.length === 0 && <li className="text-sm text-slate-500">No notes yet.</li>}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-500">Audit log</h3>
            <ul className="mt-3 space-y-2">
              {selected.auditLogs.map((log) => (
                <li key={log.id} className="rounded border bg-white p-3 text-sm">
                  <p className="font-semibold">{log.action}</p>
                  <p className="mt-1 text-xs text-slate-500">{log.source} · {log.actorUserId || 'system'} · {formatDate(log.createdAt)}</p>
                </li>
              ))}
              {selected.auditLogs.length === 0 && <li className="text-sm text-slate-500">No audit entries yet.</li>}
            </ul>
          </div>
        </section>
      )}
    </AdminLayoutV2>
  );
}
