'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Activity, CalendarDays, ChartNoAxesCombined, Download, Plus, RefreshCw, Star, Trash2, Wallet } from 'lucide-react';

const today = () => new Date().toISOString().slice(0, 10);
const empty = {
  finance: { entry_type: 'income', description: '', category: 'Website development', amount: '', currency: 'MWK', recorded_on: today(), project_id: '', reference: '' },
  meetings: { title: '', meeting_type: 'client', attendee_name: '', attendee_email: '', starts_at: '', ends_at: '', location: '', meeting_url: '', notes: '' },
  feedback: { client_name: '', client_email: '', rating: '5', feedback: '', project_id: '', received_on: today() },
};
const money = (amount, currency = 'MWK') => new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 0 }).format(Number(amount || 0));
const monthKey = (date) => String(date || '').slice(0, 7);

export default function AdminOperations() {
  const [data, setData] = useState({ finance: [], meetings: [], feedback: [], activity: [], projects: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [kind, setKind] = useState('finance');
  const [form, setForm] = useState(empty.finance);
  const [showForm, setShowForm] = useState(false);
  const [period, setPeriod] = useState('month');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/admin/operations', { cache: 'no-store' });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Unable to load operational records.');
      setData({ finance: json.finance || [], meetings: json.meetings || [], feedback: json.feedback || [], activity: json.activity || [], projects: json.projects || [] });
    } catch (e) { setError(e.message || 'Network error.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const month = today().slice(0, 7);
  const currency = data.finance[0]?.currency || 'MWK';
  const financeThisMonth = data.finance.filter((r) => monthKey(r.recorded_on) === month && r.currency === currency);
  const monthlyRevenue = financeThisMonth.filter((r) => r.entry_type === 'income').reduce((s, r) => s + Number(r.amount), 0);
  const monthlyExpenses = financeThisMonth.filter((r) => r.entry_type === 'expense').reduce((s, r) => s + Number(r.amount), 0);
  const averageRating = data.feedback.length ? data.feedback.reduce((s, r) => s + Number(r.rating), 0) / data.feedback.length : null;
  const newProjects = data.projects.filter((p) => monthKey(p.created_at) === month).length;

  const chart = useMemo(() => {
    const count = period === 'year' ? 12 : 6;
    const keys = Array.from({ length: count }, (_, i) => {
      const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - (count - 1 - i));
      return d.toISOString().slice(0, 7);
    });
    return keys.map((key) => {
      const rows = data.finance.filter((r) => monthKey(r.recorded_on) === key && r.currency === currency);
      return { key, label: new Date(key + '-01T12:00:00').toLocaleDateString('en', { month: 'short' }), income: rows.filter((r) => r.entry_type === 'income').reduce((s, r) => s + Number(r.amount), 0), expense: rows.filter((r) => r.entry_type === 'expense').reduce((s, r) => s + Number(r.amount), 0) };
    });
  }, [data.finance, period, currency]);
  const maxChart = Math.max(1, ...chart.flatMap((r) => [r.income, r.expense]));
  const services = ['Website Design & Development', 'Software Development', 'Branding', 'Automation', 'Consulting'];
  const serviceCounts = services.map((label) => ({ label, count: data.projects.filter((p) => {
    const c = (p.category || '').toLowerCase();
    return label.startsWith('Website') ? c.includes('web') : label.startsWith('Software') ? c.includes('software') : label === 'Branding' ? c.includes('brand') || c.includes('design') : label === 'Automation' ? c.includes('automation') : c.includes('consult');
  }).length }));
  const exportCsv = () => {
    const rows = [['Date', 'Type', 'Description', 'Category', 'Amount', 'Currency'], ...data.finance.map((r) => [r.recorded_on, r.entry_type, r.description, r.category, r.amount, r.currency])];
    const csv = rows.map((row) => row.map((v) => '"' + String(v ?? '').replaceAll('"', '""') + '"').join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'neopad-financial-records.csv'; a.click(); URL.revokeObjectURL(url);
  };
  const selectKind = (next) => { setKind(next); setForm(empty[next]); setShowForm(true); setNotice(''); };
  const save = async (event) => {
    event.preventDefault(); setError(''); setNotice('');
    const payload = { ...form };
    if (kind === 'meetings') {
      if (!payload.starts_at) { setError('Select a meeting date and time.'); return; }
      payload.starts_at = new Date(payload.starts_at).toISOString();
      payload.ends_at = payload.ends_at ? new Date(payload.ends_at).toISOString() : null;
    }
    try {
      const res = await fetch('/api/admin/operations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, ...payload }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Could not save record.');
      setNotice('Record saved successfully.'); setShowForm(false); setForm(empty[kind]); await load();
    } catch (e) { setError(e.message || 'Network error saving record.'); }
  };
  const remove = async (type, id) => {
    if (!window.confirm('Delete this record? This action cannot be undone.')) return;
    const res = await fetch('/api/admin/operations?kind=' + type + '&id=' + encodeURIComponent(id), { method: 'DELETE' });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) { setError(json.error || 'Could not delete record.'); return; }
    setNotice('Record deleted.'); await load();
  };
  const updateMeeting = async (item, status) => {
    const res = await fetch('/api/admin/operations', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind: 'meetings', id: item.id, status }) });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) { setError(json.error || 'Could not update meeting.'); return; }
    await load();
  };
  const input = (key, label, type = 'text', required = false) => <label className="np-ops-field" key={key}>{label}<input className="np-input" type={type} required={required} value={form[key] ?? ''} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} /></label>;

  return <section className="np-ops">
    <div className="np-ops-head"><div><p className="np-card-kicker">Management intelligence</p><h2>Business Operations</h2><p className="np-card-desc">Finance, delivery, meetings, client feedback and administrative activity from recorded database entries.</p></div><button className="np-btn np-btn--outline" onClick={load} disabled={loading}><RefreshCw size={14}/> Refresh</button></div>
    {error && <div className="np-banner np-banner--error" role="alert">{error}</div>}
    {notice && <div className="np-banner np-banner--success" role="status">{notice}</div>}
    <div className="np-ops-kpis">
      <article><span><Wallet size={15}/> Revenue this month</span><strong>{money(monthlyRevenue, currency)}</strong><small>From recorded income entries</small></article>
      <article><span><ChartNoAxesCombined size={15}/> Profit this month</span><strong>{money(monthlyRevenue - monthlyExpenses, currency)}</strong><small>Income minus recorded expenses</small></article>
      <article><span><CalendarDays size={15}/> New projects</span><strong>{newProjects}</strong><small>Projects with deadlines this month</small></article>
      <article><span><Star size={15}/> Client satisfaction</span><strong>{averageRating === null ? '—' : averageRating.toFixed(1) + ' / 5'}</strong><small>{data.feedback.length} recorded ratings</small></article>
    </div>
    <div className="np-ops-grid">
      <article className="np-card"><div className="np-ops-card-head"><div><p className="np-card-kicker">Financial performance</p><h3>Income & expenses</h3></div><select className="np-select" value={period} onChange={(e) => setPeriod(e.target.value)}><option value="month">Last 6 months</option><option value="year">Last 12 months</option></select></div>
        {data.finance.length === 0 ? <div className="np-empty-state">No financial entries recorded. Add verified income and expense records to activate this chart.</div> : <div className="np-ops-chart">{chart.map((r) => <div className="np-ops-chart-col" key={r.key}><div className="np-ops-bars"><span title={'Income ' + money(r.income, currency)} style={{ height: (r.income / maxChart * 100) + '%' }}/><span title={'Expenses ' + money(r.expense, currency)} style={{ height: (r.expense / maxChart * 100) + '%' }}/></div><small>{r.label}</small></div>)}</div>}
        <div className="np-ops-legend"><span><i/> Income</span><span><i/> Expenses</span><button className="np-btn np-btn--outline" onClick={exportCsv}><Download size={13}/> Export CSV</button></div>
      </article>
      <article className="np-card"><p className="np-card-kicker">Service portfolio</p><h3>Services breakdown</h3><p className="np-card-desc">Counts are derived from project category records; uncategorised projects are not guessed.</p>
        <div className="np-ops-service-list">{serviceCounts.map((s) => <div key={s.label}><span>{s.label}</span><strong>{s.count}</strong></div>)}</div>
      </article>
    </div>
    <article className="np-card"><div className="np-ops-card-head"><div><p className="np-card-kicker">Delivery tracking</p><h3>Project timeline</h3></div><span className="np-ops-count">{data.projects.length} tracked projects</span></div>
      {data.projects.length === 0 ? <div className="np-empty-state">No projects have been added yet.</div> : <div className="np-table-wrap"><table className="np-table"><thead><tr><th>Project</th><th>Client</th><th>Progress</th><th>Deadline</th><th>Status</th></tr></thead><tbody>{data.projects.map((p) => <tr key={p.id}><td>{p.name}</td><td>{p.client_name}</td><td><div className="np-ops-progress"><span style={{ width: (p.progress_percent || 0) + '%' }}/></div><small>{p.progress_percent || 0}%</small></td><td>{p.deadline || 'Not set'}</td><td><span className={'np-pill np-pill--' + p.status}>{p.status?.replace('_', ' ')}</span></td></tr>)}</tbody></table></div>}
    </article>
    <div className="np-ops-actions"><button className="np-btn np-btn--gold" onClick={() => selectKind('finance')}><Plus size={14}/> Add financial entry</button><button className="np-btn np-btn--gold" onClick={() => selectKind('meetings')}><Plus size={14}/> Schedule meeting</button><button className="np-btn np-btn--gold" onClick={() => selectKind('feedback')}><Plus size={14}/> Record client feedback</button></div>
    {showForm && <form className="np-card np-ops-form" onSubmit={save}><div className="np-ops-card-head"><h3>{kind === 'finance' ? 'New financial entry' : kind === 'meetings' ? 'Schedule a meeting' : 'Record client feedback'}</h3><button type="button" className="np-btn np-btn--outline" onClick={() => setShowForm(false)}>Close</button></div><div className="np-ops-form-grid">
      {kind === 'finance' && <><label className="np-ops-field">Entry type<select className="np-select" value={form.entry_type} onChange={(e) => setForm((p) => ({ ...p, entry_type: e.target.value }))}><option value="income">Income</option><option value="expense">Expense</option></select></label>{input('description','Description','text',true)}{input('category','Category','text',true)}{input('amount','Amount','number',true)}{input('currency','Currency (ISO code)','text',true)}{input('recorded_on','Date','date',true)}<label className="np-ops-field">Related project<select className="np-select" value={form.project_id} onChange={(e) => setForm((p) => ({ ...p, project_id: e.target.value }))}><option value="">No project linked</option>{data.projects.map((p) => <option value={p.id} key={p.id}>{p.name}</option>)}</select></label>{input('reference','Reference (optional')}</>}
      {kind === 'meetings' && <><label className="np-ops-field">Meeting title<input className="np-input" required value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}/></label><label className="np-ops-field">Meeting type<select className="np-select" value={form.meeting_type} onChange={(e) => setForm((p) => ({ ...p, meeting_type: e.target.value }))}><option value="client">Client</option><option value="internal">Internal</option></select></label>{input('attendee_name','Attendee name')}{input('attendee_email','Attendee email','email')}{input('starts_at','Starts at','datetime-local',true)}{input('ends_at','Ends at','datetime-local')}{input('location','Location')}{input('meeting_url','Meeting URL','url')}</>}
      {kind === 'feedback' && <>{input('client_name','Client name','text',true)}{input('client_email','Client email','email')}<label className="np-ops-field">Rating<select className="np-select" value={form.rating} onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))}>{[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} / 5</option>)}</select></label>{input('received_on','Date received','date',true)}<label className="np-ops-field np-ops-wide">Feedback<textarea className="np-input" rows={3} value={form.feedback} onChange={(e) => setForm((p) => ({ ...p, feedback: e.target.value }))}/></label></>}
    </div><button className="np-btn np-btn--gold" type="submit">Save record</button></form>}
    <div className="np-ops-grid">
      <article className="np-card"><div className="np-ops-card-head"><div><p className="np-card-kicker">Calendar</p><h3>Upcoming meetings</h3></div><span className="np-ops-count">{data.meetings.filter((m) => m.status === 'scheduled' && new Date(m.starts_at) >= new Date()).length}</span></div>
        {data.meetings.filter((m) => m.status === 'scheduled' && new Date(m.starts_at) >= new Date()).length === 0 ? <div className="np-empty-state">No upcoming meetings scheduled.</div> : data.meetings.filter((m) => m.status === 'scheduled' && new Date(m.starts_at) >= new Date()).slice(0, 8).map((m) => <div className="np-ops-list-row" key={m.id}><div><strong>{m.title}</strong><small>{m.meeting_type} · {m.attendee_name || 'No attendee specified'} · {new Date(m.starts_at).toLocaleString()}</small></div><button className="np-btn np-btn--outline" onClick={() => updateMeeting(m, 'completed')}>Complete</button><button className="np-btn np-btn--danger" onClick={() => remove('meetings', m.id)} aria-label="Delete meeting"><Trash2 size={13}/></button></div>)}
      </article>
      <article className="np-card"><div className="np-ops-card-head"><div><p className="np-card-kicker">Voice of the client</p><h3>Client feedback</h3></div><span className="np-ops-count">{data.feedback.length} records</span></div>
        {data.feedback.length === 0 ? <div className="np-empty-state">No client ratings have been recorded.</div> : data.feedback.slice(0, 8).map((f) => <div className="np-ops-list-row" key={f.id}><div><strong>{f.client_name} · {'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</strong><small>{f.feedback || 'No written comment'} · {f.received_on}</small></div><button className="np-btn np-btn--danger" onClick={() => remove('feedback', f.id)} aria-label="Delete feedback"><Trash2 size={13}/></button></div>)}
      </article>
    </div>
    <article className="np-card"><div className="np-ops-card-head"><div><p className="np-card-kicker">Audit trail</p><h3>Team & admin activity</h3></div><span className="np-ops-count"><Activity size={13}/> {data.activity.length} events</span></div>
      {data.activity.length === 0 ? <div className="np-empty-state">No recorded activity yet. New operations created through this workspace will appear here.</div> : data.activity.slice(0, 15).map((a) => <div className="np-ops-list-row" key={a.id}><div><strong>{a.action}</strong><small>{a.actor_name || 'Administrator'} · {a.entity_type} · {a.details || ''} · {new Date(a.created_at).toLocaleString()}</small></div></div>)}
    </article>
  </section>;
}
