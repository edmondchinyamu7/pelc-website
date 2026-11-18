'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  CalendarClock,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Inbox,
  LayoutDashboard,
  Menu,
  RefreshCw,
  Search,
  Ticket,
  User,
  X,
} from 'lucide-react';
import SignOutButton from '@/components/SignOutButton';

const INQUIRY_DEPARTMENTS = ['general', 'wdd', 'sdd', 'ud', 'ad', 'md', 'cpd'];
const INQUIRY_STATUSES = ['new', 'in_review', 'replied', 'archived'];

const CONSULTATION_SERVICES = [
  'website',
  'software',
  'design',
  'advertising',
  'marketing',
  'creative',
  'ai',
  'comprehensive',
];
const CONSULTATION_STATUSES = ['pending', 'scheduled', 'completed', 'cancelled'];

const RSVP_EVENTS = ['01', '02', '03', '04'];
const RSVP_STATUSES = ['registered', 'attended', 'cancelled'];

const PAGE_LIMIT = 15;

function formatDateTime(iso) {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function StatusPill({ status }) {
  const safe = typeof status === 'string' ? status : 'unknown';
  return <span className={`np-pill np-pill--${safe}`}>{safe.replace('_', ' ')}</span>;
}

export default function AdminDashboard({
  adminEmail,
  adminName,
  initialStats,
  initialRecent,
  initialInquiries,
  initialConsultations,
  initialRsvps,
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [stats, setStats] = useState(initialStats);
  const [recentSubmissions] = useState(initialRecent || []);
  const [feedbackBanner, setFeedbackBanner] = useState(null);

  // Inquiries state
  const [inquiries, setInquiries] = useState(initialInquiries.items || []);
  const [inquiriesTotal, setInquiriesTotal] = useState(initialInquiries.total || 0);
  const [inquiriesPage, setInquiriesPage] = useState(1);
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryDept, setInquiryDept] = useState('');
  const [inquiryStatus, setInquiryStatus] = useState('');
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [inquiriesError, setInquiriesError] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inquiryDraftStatus, setInquiryDraftStatus] = useState({});
  const [savingInquiryId, setSavingInquiryId] = useState(null);

  // Consultations state
  const [consultations, setConsultations] = useState(initialConsultations.items || []);
  const [consultationsTotal, setConsultationsTotal] = useState(initialConsultations.total || 0);
  const [consultationsPage, setConsultationsPage] = useState(1);
  const [consultSearch, setConsultSearch] = useState('');
  const [consultService, setConsultService] = useState('');
  const [consultStatus, setConsultStatus] = useState('');
  const [consultationsLoading, setConsultationsLoading] = useState(false);
  const [consultationsError, setConsultationsError] = useState(null);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [consultDraftStatus, setConsultDraftStatus] = useState({});
  const [savingConsultId, setSavingConsultId] = useState(null);

  // Event RSVPs state
  const [rsvps, setRsvps] = useState(initialRsvps.items || []);
  const [rsvpsTotal, setRsvpsTotal] = useState(initialRsvps.total || 0);
  const [rsvpsPage, setRsvpsPage] = useState(1);
  const [rsvpSearch, setRsvpSearch] = useState('');
  const [rsvpEvent, setRsvpEvent] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState('');
  const [rsvpsLoading, setRsvpsLoading] = useState(false);
  const [rsvpsError, setRsvpsError] = useState(null);
  const [rsvpDraftStatus, setRsvpDraftStatus] = useState({});
  const [savingRsvpId, setSavingRsvpId] = useState(null);

  const fetchInquiries = useCallback(
    async ({ page = inquiriesPage, search = inquirySearch, dept = inquiryDept, status = inquiryStatus } = {}) => {
      setInquiriesLoading(true);
      setInquiriesError(null);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_LIMIT),
        });
        if (search.trim()) params.set('search', search.trim());
        if (dept) params.set('department', dept);
        if (status) params.set('status', status);

        const res = await fetch(`/api/admin/inquiries?${params.toString()}`, {
          cache: 'no-store',
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setInquiriesError(data.error || 'Failed to load inquiries.');
          setInquiriesLoading(false);
          return;
        }
        setInquiries(Array.isArray(data.items) ? data.items : []);
        setInquiriesTotal(data.total ?? 0);
        setInquiriesPage(data.page ?? page);
      } catch {
        setInquiriesError('Network error while loading inquiries.');
      } finally {
        setInquiriesLoading(false);
      }
    },
    [inquiriesPage, inquirySearch, inquiryDept, inquiryStatus],
  );

  const fetchConsultations = useCallback(
    async ({
      page = consultationsPage,
      search = consultSearch,
      service = consultService,
      status = consultStatus,
    } = {}) => {
      setConsultationsLoading(true);
      setConsultationsError(null);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_LIMIT),
        });
        if (search.trim()) params.set('search', search.trim());
        if (service) params.set('service', service);
        if (status) params.set('status', status);

        const res = await fetch(`/api/admin/consultations?${params.toString()}`, {
          cache: 'no-store',
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setConsultationsError(data.error || 'Failed to load consultations.');
          setConsultationsLoading(false);
          return;
        }
        setConsultations(Array.isArray(data.items) ? data.items : []);
        setConsultationsTotal(data.total ?? 0);
        setConsultationsPage(data.page ?? page);
      } catch {
        setConsultationsError('Network error while loading consultations.');
      } finally {
        setConsultationsLoading(false);
      }
    },
    [consultationsPage, consultSearch, consultService, consultStatus],
  );

  const fetchRsvps = useCallback(
    async ({ page = rsvpsPage, search = rsvpSearch, eventNumber = rsvpEvent, status = rsvpStatus } = {}) => {
      setRsvpsLoading(true);
      setRsvpsError(null);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_LIMIT),
        });
        if (search.trim()) params.set('search', search.trim());
        if (eventNumber) params.set('eventNumber', eventNumber);
        if (status) params.set('status', status);

        const res = await fetch(`/api/admin/event-rsvps?${params.toString()}`, {
          cache: 'no-store',
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setRsvpsError(data.error || 'Failed to load event RSVPs.');
          setRsvpsLoading(false);
          return;
        }
        setRsvps(Array.isArray(data.items) ? data.items : []);
        setRsvpsTotal(data.total ?? 0);
        setRsvpsPage(data.page ?? page);
      } catch {
        setRsvpsError('Network error while loading event RSVPs.');
      } finally {
        setRsvpsLoading(false);
      }
    },
    [rsvpsPage, rsvpSearch, rsvpEvent, rsvpStatus],
  );

  const handleInquiryStatusSave = async (item) => {
    const nextStatus = inquiryDraftStatus[item.id] ?? item.status;
    if (nextStatus === item.status || savingInquiryId) return;

    setSavingInquiryId(item.id);
    setInquiriesError(null);
    setFeedbackBanner(null);

    try {
      const res = await fetch(`/api/admin/inquiries/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setInquiriesError(data.error || 'Could not update inquiry status.');
        setSavingInquiryId(null);
        return;
      }

      const previousStatus = item.status;
      setInquiries((prev) =>
        prev.map((row) => (row.id === item.id ? { ...row, status: nextStatus } : row)),
      );
      if (selectedInquiry?.id === item.id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: nextStatus } : prev));
      }
      if (previousStatus === 'new' && nextStatus !== 'new') {
        setStats((s) => ({ ...s, newInquiries: Math.max(0, s.newInquiries - 1) }));
      } else if (previousStatus !== 'new' && nextStatus === 'new') {
        setStats((s) => ({ ...s, newInquiries: s.newInquiries + 1 }));
      }
      setFeedbackBanner(`Inquiry from ${item.name} updated to "${nextStatus.replace('_', ' ')}".`);
    } catch {
      setInquiriesError('Network error while updating inquiry.');
    } finally {
      setSavingInquiryId(null);
    }
  };

  const handleConsultStatusSave = async (item) => {
    const nextStatus = consultDraftStatus[item.id] ?? item.status;
    if (nextStatus === item.status || savingConsultId) return;

    setSavingConsultId(item.id);
    setConsultationsError(null);
    setFeedbackBanner(null);

    try {
      const res = await fetch(`/api/admin/consultations/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setConsultationsError(data.error || 'Could not update consultation status.');
        setSavingConsultId(null);
        return;
      }

      const previousStatus = item.status;
      setConsultations((prev) =>
        prev.map((row) => (row.id === item.id ? { ...row, status: nextStatus } : row)),
      );
      if (selectedConsultation?.id === item.id) {
        setSelectedConsultation((prev) => (prev ? { ...prev, status: nextStatus } : prev));
      }
      if (previousStatus === 'pending' && nextStatus !== 'pending') {
        setStats((s) => ({ ...s, pendingConsultations: Math.max(0, s.pendingConsultations - 1) }));
      } else if (previousStatus !== 'pending' && nextStatus === 'pending') {
        setStats((s) => ({ ...s, pendingConsultations: s.pendingConsultations + 1 }));
      }
      setFeedbackBanner(`Consultation for ${item.name} updated to "${nextStatus}".`);
    } catch {
      setConsultationsError('Network error while updating consultation.');
    } finally {
      setSavingConsultId(null);
    }
  };

  const handleRsvpStatusSave = async (item) => {
    const nextStatus = rsvpDraftStatus[item.id] ?? item.status;
    if (nextStatus === item.status || savingRsvpId) return;

    setSavingRsvpId(item.id);
    setRsvpsError(null);
    setFeedbackBanner(null);

    try {
      const res = await fetch(`/api/admin/event-rsvps/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setRsvpsError(data.error || 'Could not update RSVP status.');
        setSavingRsvpId(null);
        return;
      }

      setRsvps((prev) =>
        prev.map((row) => (row.id === item.id ? { ...row, status: nextStatus } : row)),
      );
      setFeedbackBanner(`RSVP for ${item.attendee_name} updated to "${nextStatus}".`);
    } catch {
      setRsvpsError('Network error while updating event RSVP.');
    } finally {
      setSavingRsvpId(null);
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setMobileNavOpen(false);
    setFeedbackBanner(null);
  };

  const inquiriesTotalPages = Math.max(1, Math.ceil(inquiriesTotal / PAGE_LIMIT));
  const consultationsTotalPages = Math.max(1, Math.ceil(consultationsTotal / PAGE_LIMIT));
  const rsvpsTotalPages = Math.max(1, Math.ceil(rsvpsTotal / PAGE_LIMIT));

  return (
    <div className="np-admin-layout">
      <aside className="np-admin-sidebar" aria-label="Admin navigation">
        <div>
          <div className="np-admin-brand">
            <div className="np-admin-brand-title">
              <strong>NEOPAD STUDIO</strong>
              <span>Admin Operations</span>
            </div>
            <button
              type="button"
              className="np-mobile-menu-btn"
              onClick={() => setMobileNavOpen((open) => !open)}
              aria-expanded={mobileNavOpen}
              aria-label="Toggle admin menu"
            >
              {mobileNavOpen ? <X size={15} /> : <Menu size={15} />}
              Menu
            </button>
          </div>

          <div className={`np-admin-nav-wrap${mobileNavOpen ? ' is-open' : ''}`}>
            <nav className="np-admin-nav">
              <button
                type="button"
                className={`np-admin-nav-btn${activeTab === 'overview' ? ' is-active' : ''}`}
                onClick={() => switchTab('overview')}
              >
                <span className="np-admin-nav-left">
                  <LayoutDashboard size={16} />
                  Dashboard
                </span>
              </button>

              <button
                type="button"
                className={`np-admin-nav-btn${activeTab === 'inquiries' ? ' is-active' : ''}`}
                onClick={() => switchTab('inquiries')}
              >
                <span className="np-admin-nav-left">
                  <Inbox size={16} />
                  Inquiries
                </span>
                <span className="np-admin-nav-badge">{stats.totalInquiries}</span>
              </button>

              <button
                type="button"
                className={`np-admin-nav-btn${activeTab === 'consultations' ? ' is-active' : ''}`}
                onClick={() => switchTab('consultations')}
              >
                <span className="np-admin-nav-left">
                  <CalendarClock size={16} />
                  Consultations
                </span>
                <span className="np-admin-nav-badge">{stats.totalConsultations}</span>
              </button>

              <button
                type="button"
                className={`np-admin-nav-btn${activeTab === 'rsvps' ? ' is-active' : ''}`}
                onClick={() => switchTab('rsvps')}
              >
                <span className="np-admin-nav-left">
                  <Ticket size={16} />
                  Event RSVPs
                </span>
                <span className="np-admin-nav-badge">{stats.totalRsvps}</span>
              </button>
            </nav>
          </div>
        </div>

        <div className={`np-admin-nav-wrap${mobileNavOpen ? ' is-open' : ''}`}>
          <div className="np-admin-sidebar-foot">
            <div className="np-admin-user">
              <strong>{adminName || 'Studio Administrator'}</strong>
              <span>{adminEmail}</span>
            </div>

            <Link
              href="/account"
              className="np-admin-nav-btn"
              style={{ border: '1px solid rgba(255,255,255,0.14)' }}
            >
              <span className="np-admin-nav-left">
                <User size={15} />
                Client Account
              </span>
              <ArrowUpRight size={14} />
            </Link>

            <SignOutButton />
          </div>
        </div>
      </aside>

      <main className="np-admin-main">
        <div className="np-admin-topbar">
          <div>
            <h1>
              {activeTab === 'overview' && 'Studio Overview'}
              {activeTab === 'inquiries' && 'Inquiries Management'}
              {activeTab === 'consultations' && 'Consultations Pipeline'}
              {activeTab === 'rsvps' && 'Event RSVPs'}
            </h1>
            <p>
              Server-verified NEOPAD STUDIO administrative workspace · Live Supabase records
            </p>
          </div>

          <Link href="/" className="np-btn np-btn--outline">
            View public site
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {feedbackBanner && (
          <div
            className="np-banner np-banner--success"
            role="status"
            style={{ marginBottom: '20px', marginTop: 0 }}
          >
            {feedbackBanner}
          </div>
        )}

        {activeTab === 'overview' && (
          <>
            <div className="np-stats-grid">
              <div className="np-stat-card">
                <div className="np-stat-label">Total Inquiries</div>
                <div className="np-stat-value">{stats.totalInquiries}</div>
              </div>
              <div className="np-stat-card np-stat-card--accent">
                <div className="np-stat-label">New Inquiries</div>
                <div className="np-stat-value">{stats.newInquiries}</div>
              </div>
              <div className="np-stat-card">
                <div className="np-stat-label">Total Consultations</div>
                <div className="np-stat-value">{stats.totalConsultations}</div>
              </div>
              <div className="np-stat-card np-stat-card--accent">
                <div className="np-stat-label">Pending Consultations</div>
                <div className="np-stat-value">{stats.pendingConsultations}</div>
              </div>
              <div className="np-stat-card">
                <div className="np-stat-label">Total Event RSVPs</div>
                <div className="np-stat-value">{stats.totalRsvps}</div>
              </div>
            </div>

            <div className="np-card">
              <div className="np-card-head">
                <div>
                  <p className="np-card-kicker">Activity Stream</p>
                  <h2>Recent Submissions</h2>
                  <p className="np-card-desc">
                    Latest inquiries, consultation requests, and event registrations across the
                    studio.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="np-btn np-btn--outline"
                    onClick={() => switchTab('inquiries')}
                  >
                    Manage Inquiries
                  </button>
                  <button
                    type="button"
                    className="np-btn np-btn--outline"
                    onClick={() => switchTab('consultations')}
                  >
                    Manage Consultations
                  </button>
                </div>
              </div>

              {recentSubmissions.length === 0 ? (
                <div className="np-empty-state">No submissions recorded yet.</div>
              ) : (
                <div className="np-table-wrap">
                  <table className="np-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Contact</th>
                        <th>Summary</th>
                        <th>Status</th>
                        <th>Submitted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentSubmissions.map((entry) => (
                        <tr key={`${entry.type}-${entry.id}`}>
                          <td style={{ fontWeight: 700 }}>{entry.typeLabel}</td>
                          <td>
                            <div style={{ fontWeight: 650 }}>{entry.name}</div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                              {entry.email}
                            </div>
                          </td>
                          <td>{entry.summary}</td>
                          <td>
                            <StatusPill status={entry.status} />
                          </td>
                          <td style={{ whiteSpace: 'nowrap', fontSize: '12px', color: 'var(--muted)' }}>
                            {formatDateTime(entry.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'inquiries' && (
          <div className="np-card">
            <form
              className="np-toolbar"
              onSubmit={(e) => {
                e.preventDefault();
                fetchInquiries({ page: 1 });
              }}
            >
              <input
                type="search"
                className="np-input"
                placeholder="Search by name, email, subject, or message…"
                value={inquirySearch}
                onChange={(e) => setInquirySearch(e.target.value)}
                aria-label="Search inquiries"
              />
              <select
                className="np-select"
                value={inquiryDept}
                onChange={(e) => {
                  const next = e.target.value;
                  setInquiryDept(next);
                  fetchInquiries({ page: 1, dept: next });
                }}
                aria-label="Filter by department"
              >
                <option value="">All departments</option>
                {INQUIRY_DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept.toUpperCase()}
                  </option>
                ))}
              </select>
              <select
                className="np-select"
                value={inquiryStatus}
                onChange={(e) => {
                  const next = e.target.value;
                  setInquiryStatus(next);
                  fetchInquiries({ page: 1, status: next });
                }}
                aria-label="Filter by inquiry status"
              >
                <option value="">All statuses</option>
                {INQUIRY_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st.replace('_', ' ')}
                  </option>
                ))}
              </select>
              <button type="submit" className="np-btn np-btn--dark" disabled={inquiriesLoading}>
                <Search size={14} />
                Filter
              </button>
              <button
                type="button"
                className="np-btn np-btn--outline"
                onClick={() => fetchInquiries({ page: inquiriesPage })}
                disabled={inquiriesLoading}
              >
                <RefreshCw size={14} />
                Refresh
              </button>
            </form>

            {inquiriesError && (
              <div className="np-banner np-banner--error" role="alert" style={{ marginBottom: '16px' }}>
                {inquiriesError}
              </div>
            )}

            {inquiriesLoading ? (
              <div className="np-empty-state">Loading inquiries…</div>
            ) : inquiries.length === 0 ? (
              <div className="np-empty-state">No inquiries match the current filters.</div>
            ) : (
              <div className="np-table-wrap">
                <table className="np-table">
                  <thead>
                    <tr>
                      <th>Sender</th>
                      <th>Department</th>
                      <th>Subject</th>
                      <th>Status</th>
                      <th>Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((item) => {
                      const draft = inquiryDraftStatus[item.id] ?? item.status;
                      const isSaving = savingInquiryId === item.id;
                      return (
                        <tr key={item.id}>
                          <td>
                            <div style={{ fontWeight: 650 }}>{item.name}</div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                              {item.email}
                            </div>
                          </td>
                          <td style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '12px' }}>
                            {item.department}
                          </td>
                          <td>
                            <div style={{ fontWeight: 600 }}>{item.subject}</div>
                            {item.project_type && (
                              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                                {item.project_type}
                              </div>
                            )}
                          </td>
                          <td>
                            <StatusPill status={item.status} />
                          </td>
                          <td style={{ whiteSpace: 'nowrap', fontSize: '12px', color: 'var(--muted)' }}>
                            {formatDateTime(item.created_at)}
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                              <button
                                type="button"
                                className="np-btn np-btn--outline"
                                onClick={() => setSelectedInquiry(item)}
                              >
                                <Eye size={13} />
                                Details
                              </button>
                              <select
                                className="np-select"
                                style={{ height: '36px', fontSize: '12px' }}
                                value={draft}
                                onChange={(e) =>
                                  setInquiryDraftStatus((prev) => ({
                                    ...prev,
                                    [item.id]: e.target.value,
                                  }))
                                }
                                aria-label={`Status for ${item.name}`}
                              >
                                {INQUIRY_STATUSES.map((st) => (
                                  <option key={st} value={st}>
                                    {st.replace('_', ' ')}
                                  </option>
                                ))}
                              </select>
                              <button
                                type="button"
                                className="np-btn np-btn--gold"
                                disabled={draft === item.status || isSaving}
                                onClick={() => handleInquiryStatusSave(item)}
                              >
                                <Check size={13} />
                                {isSaving ? 'Saving…' : 'Save'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {selectedInquiry && (
              <div className="np-detail-drawer" role="region" aria-label="Inquiry details">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <div>
                    <p className="np-card-kicker" style={{ marginBottom: '2px' }}>
                      Inquiry Details
                    </p>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>{selectedInquiry.subject}</h3>
                  </div>
                  <button
                    type="button"
                    className="np-btn np-btn--outline"
                    onClick={() => setSelectedInquiry(null)}
                  >
                    <X size={14} />
                    Close
                  </button>
                </div>

                <div className="np-detail-grid">
                  <div>
                    <strong>Sender</strong>
                    <span>{selectedInquiry.name}</span>
                  </div>
                  <div>
                    <strong>Email</strong>
                    <span>{selectedInquiry.email}</span>
                  </div>
                  <div>
                    <strong>Phone</strong>
                    <span>{selectedInquiry.phone || 'Not provided'}</span>
                  </div>
                  <div>
                    <strong>Department / Project Type</strong>
                    <span>
                      {selectedInquiry.department.toUpperCase()}
                      {selectedInquiry.project_type ? ` · ${selectedInquiry.project_type}` : ''}
                    </span>
                  </div>
                  <div>
                    <strong>Status</strong>
                    <StatusPill status={selectedInquiry.status} />
                  </div>
                  <div>
                    <strong>Submitted</strong>
                    <span>{formatDateTime(selectedInquiry.created_at)}</span>
                  </div>
                </div>

                <div style={{ marginTop: '14px' }}>
                  <strong
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.6px',
                      color: 'var(--muted)',
                      marginBottom: '6px',
                    }}
                  >
                    Message
                  </strong>
                  <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                    {selectedInquiry.message}
                  </p>
                </div>
              </div>
            )}

            <div className="np-pagination">
              <span>
                Showing page {inquiriesPage} of {inquiriesTotalPages} ({inquiriesTotal} total
                inquiries)
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="np-btn np-btn--outline"
                  disabled={inquiriesPage <= 1 || inquiriesLoading}
                  onClick={() => fetchInquiries({ page: inquiriesPage - 1 })}
                >
                  <ChevronLeft size={14} />
                  Prev
                </button>
                <button
                  type="button"
                  className="np-btn np-btn--outline"
                  disabled={inquiriesPage >= inquiriesTotalPages || inquiriesLoading}
                  onClick={() => fetchInquiries({ page: inquiriesPage + 1 })}
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'consultations' && (
          <div className="np-card">
            <form
              className="np-toolbar"
              onSubmit={(e) => {
                e.preventDefault();
                fetchConsultations({ page: 1 });
              }}
            >
              <input
                type="search"
                className="np-input"
                placeholder="Search by client name, email, or project brief…"
                value={consultSearch}
                onChange={(e) => setConsultSearch(e.target.value)}
                aria-label="Search consultations"
              />
              <select
                className="np-select"
                value={consultService}
                onChange={(e) => {
                  const next = e.target.value;
                  setConsultService(next);
                  fetchConsultations({ page: 1, service: next });
                }}
                aria-label="Filter by consultation service"
              >
                <option value="">All services</option>
                {CONSULTATION_SERVICES.map((svc) => (
                  <option key={svc} value={svc}>
                    {svc}
                  </option>
                ))}
              </select>
              <select
                className="np-select"
                value={consultStatus}
                onChange={(e) => {
                  const next = e.target.value;
                  setConsultStatus(next);
                  fetchConsultations({ page: 1, status: next });
                }}
                aria-label="Filter by consultation status"
              >
                <option value="">All statuses</option>
                {CONSULTATION_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              <button type="submit" className="np-btn np-btn--dark" disabled={consultationsLoading}>
                <Search size={14} />
                Filter
              </button>
              <button
                type="button"
                className="np-btn np-btn--outline"
                onClick={() => fetchConsultations({ page: consultationsPage })}
                disabled={consultationsLoading}
              >
                <RefreshCw size={14} />
                Refresh
              </button>
            </form>

            {consultationsError && (
              <div className="np-banner np-banner--error" role="alert" style={{ marginBottom: '16px' }}>
                {consultationsError}
              </div>
            )}

            {consultationsLoading ? (
              <div className="np-empty-state">Loading consultations…</div>
            ) : consultations.length === 0 ? (
              <div className="np-empty-state">No consultation requests match the current filters.</div>
            ) : (
              <div className="np-table-wrap">
                <table className="np-table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Service</th>
                      <th>Timeline / Budget</th>
                      <th>Status</th>
                      <th>Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consultations.map((item) => {
                      const draft = consultDraftStatus[item.id] ?? item.status;
                      const isSaving = savingConsultId === item.id;
                      return (
                        <tr key={item.id}>
                          <td>
                            <div style={{ fontWeight: 650 }}>{item.name}</div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                              {item.email}
                            </div>
                          </td>
                          <td style={{ textTransform: 'capitalize', fontWeight: 650 }}>
                            {item.service}
                          </td>
                          <td>
                            <div>{item.timeline || 'Flexible timeline'}</div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                              {item.budget || 'Budget unspecified'}
                            </div>
                          </td>
                          <td>
                            <StatusPill status={item.status} />
                          </td>
                          <td style={{ whiteSpace: 'nowrap', fontSize: '12px', color: 'var(--muted)' }}>
                            {formatDateTime(item.created_at)}
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                              <button
                                type="button"
                                className="np-btn np-btn--outline"
                                onClick={() => setSelectedConsultation(item)}
                              >
                                <Eye size={13} />
                                Details
                              </button>
                              <select
                                className="np-select"
                                style={{ height: '36px', fontSize: '12px' }}
                                value={draft}
                                onChange={(e) =>
                                  setConsultDraftStatus((prev) => ({
                                    ...prev,
                                    [item.id]: e.target.value,
                                  }))
                                }
                                aria-label={`Status for ${item.name}`}
                              >
                                {CONSULTATION_STATUSES.map((st) => (
                                  <option key={st} value={st}>
                                    {st}
                                  </option>
                                ))}
                              </select>
                              <button
                                type="button"
                                className="np-btn np-btn--gold"
                                disabled={draft === item.status || isSaving}
                                onClick={() => handleConsultStatusSave(item)}
                              >
                                <Check size={13} />
                                {isSaving ? 'Saving…' : 'Save'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {selectedConsultation && (
              <div className="np-detail-drawer" role="region" aria-label="Consultation details">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <div>
                    <p className="np-card-kicker" style={{ marginBottom: '2px' }}>
                      Consultation Request
                    </p>
                    <h3 style={{ margin: 0, fontSize: '18px', textTransform: 'capitalize' }}>
                      {selectedConsultation.service} · {selectedConsultation.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="np-btn np-btn--outline"
                    onClick={() => setSelectedConsultation(null)}
                  >
                    <X size={14} />
                    Close
                  </button>
                </div>

                <div className="np-detail-grid">
                  <div>
                    <strong>Client Name</strong>
                    <span>{selectedConsultation.name}</span>
                  </div>
                  <div>
                    <strong>Email</strong>
                    <span>{selectedConsultation.email}</span>
                  </div>
                  <div>
                    <strong>Phone</strong>
                    <span>{selectedConsultation.phone || 'Not provided'}</span>
                  </div>
                  <div>
                    <strong>Target Audience</strong>
                    <span>{selectedConsultation.audience || 'Not specified'}</span>
                  </div>
                  <div>
                    <strong>Timeline</strong>
                    <span>{selectedConsultation.timeline || 'Not specified'}</span>
                  </div>
                  <div>
                    <strong>Budget</strong>
                    <span>{selectedConsultation.budget || 'Not specified'}</span>
                  </div>
                </div>

                <div style={{ marginTop: '14px' }}>
                  <strong
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.6px',
                      color: 'var(--muted)',
                      marginBottom: '6px',
                    }}
                  >
                    Project Description
                  </strong>
                  <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                    {selectedConsultation.project_description}
                  </p>
                </div>

                {selectedConsultation.additional_notes && (
                  <div style={{ marginTop: '12px' }}>
                    <strong
                      style={{
                        display: 'block',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                        color: 'var(--muted)',
                        marginBottom: '6px',
                      }}
                    >
                      Additional Notes
                    </strong>
                    <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>
                      {selectedConsultation.additional_notes}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="np-pagination">
              <span>
                Showing page {consultationsPage} of {consultationsTotalPages} ({consultationsTotal}{' '}
                total consultations)
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="np-btn np-btn--outline"
                  disabled={consultationsPage <= 1 || consultationsLoading}
                  onClick={() => fetchConsultations({ page: consultationsPage - 1 })}
                >
                  <ChevronLeft size={14} />
                  Prev
                </button>
                <button
                  type="button"
                  className="np-btn np-btn--outline"
                  disabled={consultationsPage >= consultationsTotalPages || consultationsLoading}
                  onClick={() => fetchConsultations({ page: consultationsPage + 1 })}
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rsvps' && (
          <div className="np-card">
            <form
              className="np-toolbar"
              onSubmit={(e) => {
                e.preventDefault();
                fetchRsvps({ page: 1 });
              }}
            >
              <input
                type="search"
                className="np-input"
                placeholder="Search attendee name, email, or event title…"
                value={rsvpSearch}
                onChange={(e) => setRsvpSearch(e.target.value)}
                aria-label="Search event RSVPs"
              />
              <select
                className="np-select"
                value={rsvpEvent}
                onChange={(e) => {
                  const next = e.target.value;
                  setRsvpEvent(next);
                  fetchRsvps({ page: 1, eventNumber: next });
                }}
                aria-label="Filter by event number"
              >
                <option value="">All events</option>
                {RSVP_EVENTS.map((num) => (
                  <option key={num} value={num}>
                    Event #{num}
                  </option>
                ))}
              </select>
              <select
                className="np-select"
                value={rsvpStatus}
                onChange={(e) => {
                  const next = e.target.value;
                  setRsvpStatus(next);
                  fetchRsvps({ page: 1, status: next });
                }}
                aria-label="Filter by RSVP status"
              >
                <option value="">All statuses</option>
                {RSVP_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              <button type="submit" className="np-btn np-btn--dark" disabled={rsvpsLoading}>
                <Search size={14} />
                Filter
              </button>
              <button
                type="button"
                className="np-btn np-btn--outline"
                onClick={() => fetchRsvps({ page: rsvpsPage })}
                disabled={rsvpsLoading}
              >
                <RefreshCw size={14} />
                Refresh
              </button>
            </form>

            {rsvpsError && (
              <div className="np-banner np-banner--error" role="alert" style={{ marginBottom: '16px' }}>
                {rsvpsError}
              </div>
            )}

            {rsvpsLoading ? (
              <div className="np-empty-state">Loading event RSVPs…</div>
            ) : rsvps.length === 0 ? (
              <div className="np-empty-state">No event RSVPs match the current filters.</div>
            ) : (
              <div className="np-table-wrap">
                <table className="np-table">
                  <thead>
                    <tr>
                      <th>Attendee</th>
                      <th>Event</th>
                      <th>Status</th>
                      <th>Registered</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvps.map((item) => {
                      const draft = rsvpDraftStatus[item.id] ?? item.status;
                      const isSaving = savingRsvpId === item.id;
                      return (
                        <tr key={item.id}>
                          <td>
                            <div style={{ fontWeight: 650 }}>{item.attendee_name}</div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                              {item.attendee_email}
                            </div>
                          </td>
                          <td>
                            <div style={{ fontWeight: 650 }}>#{item.event_number}</div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                              {item.event_title}
                            </div>
                          </td>
                          <td>
                            <StatusPill status={item.status} />
                          </td>
                          <td style={{ whiteSpace: 'nowrap', fontSize: '12px', color: 'var(--muted)' }}>
                            {formatDateTime(item.created_at)}
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                              <select
                                className="np-select"
                                style={{ height: '36px', fontSize: '12px' }}
                                value={draft}
                                onChange={(e) =>
                                  setRsvpDraftStatus((prev) => ({
                                    ...prev,
                                    [item.id]: e.target.value,
                                  }))
                                }
                                aria-label={`Status for ${item.attendee_name}`}
                              >
                                {RSVP_STATUSES.map((st) => (
                                  <option key={st} value={st}>
                                    {st}
                                  </option>
                                ))}
                              </select>
                              <button
                                type="button"
                                className="np-btn np-btn--gold"
                                disabled={draft === item.status || isSaving}
                                onClick={() => handleRsvpStatusSave(item)}
                              >
                                <Check size={13} />
                                {isSaving ? 'Saving…' : 'Save'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="np-pagination">
              <span>
                Showing page {rsvpsPage} of {rsvpsTotalPages} ({rsvpsTotal} total RSVPs)
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="np-btn np-btn--outline"
                  disabled={rsvpsPage <= 1 || rsvpsLoading}
                  onClick={() => fetchRsvps({ page: rsvpsPage - 1 })}
                >
                  <ChevronLeft size={14} />
                  Prev
                </button>
                <button
                  type="button"
                  className="np-btn np-btn--outline"
                  disabled={rsvpsPage >= rsvpsTotalPages || rsvpsLoading}
                  onClick={() => fetchRsvps({ page: rsvpsPage + 1 })}
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
