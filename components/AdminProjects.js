'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { BriefcaseBusiness, CalendarDays, ExternalLink, Pencil, Plus, RefreshCw, Search, Trash2, X } from 'lucide-react';

const EMPTY = { name: '', client_name: '', category: '', description: '', status: 'planning', start_date: '', completion_date: '', deadline: '', progress_percent: 0, project_url: '' };
const STATUS_LABELS = { planning: 'Planning', in_progress: 'In Progress', completed: 'Completed', on_hold: 'On Hold' };

export default function AdminProjects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/admin/projects', { cache: 'no-store' });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Could not load projects.');
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch (err) { setError(err.message || 'Network error loading projects.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => items.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const term = search.trim().toLowerCase();
    const matchesSearch = !term || [item.name, item.client_name, item.category].some((v) => (v || '').toLowerCase().includes(term));
    return matchesStatus && matchesSearch;
  }), [items, search, statusFilter]);

  const openNew = () => { setEditingId(null); setForm(EMPTY); setFormOpen(true); setNotice(''); };
  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({ name: item.name || '', client_name: item.client_name || '', category: item.category || '', description: item.description || '', status: item.status || 'planning', start_date: item.start_date || '', completion_date: item.completion_date || '', deadline: item.deadline || '', progress_percent: item.progress_percent ?? 0, project_url: item.project_url || '' });
    setFormOpen(true); setNotice('');
  };

  const save = async (event) => {
    event.preventDefault(); setSaving(true); setError(''); setNotice('');
    try {
      const response = await fetch('/api/admin/projects', {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingId ? { ...form, id: editingId } : form),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Could not save project.');
      if (editingId) setItems((prev) => prev.map((item) => item.id === editingId ? data.item : item));
      else setItems((prev) => [data.item, ...prev]);
      setFormOpen(false); setForm(EMPTY); setEditingId(null);
      setNotice(editingId ? 'Project updated.' : 'Project added to the portfolio.');
    } catch (err) { setError(err.message || 'Network error saving project.'); }
    finally { setSaving(false); }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete “${item.name}” from the project portfolio? This cannot be undone.`)) return;
    setError(''); setNotice('');
    try {
      const response = await fetch(`/api/admin/projects?id=${encodeURIComponent(item.id)}`, { method: 'DELETE' });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Could not delete project.');
      setItems((prev) => prev.filter((row) => row.id !== item.id));
      setNotice('Project deleted.');
    } catch (err) { setError(err.message || 'Network error deleting project.'); }
  };

  return (
    <section className="np-projects-section">
      <div className="np-projects-heading">
        <div>
          <p className="np-card-kicker">Studio portfolio</p>
          <h2>Projects Management</h2>
          <p className="np-card-desc">Maintain a reliable record of client projects and delivery progress. Only completed projects count as developed.</p>
        </div>
        <button type="button" className="np-btn np-btn--gold" onClick={openNew}><Plus size={15} /> Add project</button>
      </div>

      <div className="np-project-summary">
        <div><span>Total tracked</span><strong>{items.length}</strong></div>
        <div><span>In progress</span><strong>{items.filter((p) => p.status === 'in_progress').length}</strong></div>
        <div><span>Completed / developed</span><strong>{items.filter((p) => p.status === 'completed').length}</strong></div>
      </div>

      {notice && <div className="np-banner np-banner--success" role="status">{notice}</div>}
      {error && <div className="np-banner np-banner--error" role="alert">{error}</div>}

      {formOpen && (
        <form className="np-project-form np-card" onSubmit={save}>
          <div className="np-project-form-head"><h3>{editingId ? 'Edit project' : 'Add a project'}</h3><button type="button" className="np-btn np-btn--outline" onClick={() => setFormOpen(false)} aria-label="Close form"><X size={15} /></button></div>
          <div className="np-project-form-grid">
            <label>Project name<input className="np-input" required minLength={2} maxLength={160} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
            <label>Client name<input className="np-input" required minLength={2} maxLength={160} value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} /></label>
            <label>Category / service<input className="np-input" required minLength={2} maxLength={80} placeholder="Website development, branding…" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
            <label>Status<select className="np-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>{Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <label>Start date<input className="np-input" type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} /></label>
            <label>Completion date<input className="np-input" type="date" value={form.completion_date} onChange={(e) => setForm({ ...form, completion_date: e.target.value })} /></label>\n            <label>Deadline<input className="np-input" type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} /></label>\n            <label>Completion percentage<input className="np-input" type="number" min="0" max="100" value={form.progress_percent} onChange={(e) => setForm({ ...form, progress_percent: Number(e.target.value) })} /></label>
            <label className="np-project-form-wide">Project link (optional)<input className="np-input" type="url" placeholder="https://" value={form.project_url} onChange={(e) => setForm({ ...form, project_url: e.target.value })} /></label>
            <label className="np-project-form-wide">Description<textarea className="np-input" rows={3} maxLength={3000} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          </div>
          <div className="np-project-form-actions"><button className="np-btn np-btn--gold" type="submit" disabled={saving}>{saving ? 'Saving…' : editingId ? 'Save changes' : 'Save project'}</button><button className="np-btn np-btn--outline" type="button" onClick={() => setFormOpen(false)}>Cancel</button></div>
        </form>
      )}

      <div className="np-project-toolbar">
        <label className="np-project-search"><Search size={15} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search project, client or category" /></label>
        <select className="np-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter projects by status"><option value="all">All statuses</option>{Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
        <button className="np-btn np-btn--outline" type="button" onClick={load} disabled={loading}><RefreshCw size={14} /> Refresh</button>
      </div>

      {loading ? <div className="np-empty-state">Loading project portfolio…</div> : filtered.length === 0 ? <div className="np-empty-state"><BriefcaseBusiness size={24} /><p>{items.length ? 'No projects match these filters.' : 'No projects have been added yet. Add your first completed or active project.'}</p></div> : (
        <div className="np-table-wrap"><table className="np-table"><thead><tr><th>Project</th><th>Client</th><th>Category</th><th>Status</th><th>Dates</th><th>Actions</th></tr></thead><tbody>
          {filtered.map((item) => <tr key={item.id}>
            <td><strong>{item.name}</strong>{item.project_url && <div><a href={item.project_url} target="_blank" rel="noreferrer" className="np-project-link">View project <ExternalLink size={12} /></a></div>}{item.description && <div className="np-project-description">{item.description}</div>}</td>
            <td>{item.client_name}</td><td>{item.category}</td>
            <td><span className={`np-pill np-pill--${item.status}`}>{STATUS_LABELS[item.status] || item.status}</span></td>
            <td><span className="np-project-date"><CalendarDays size={12} /> {item.start_date || '—'}</span><span className="np-project-date"><CalendarDays size={12} /> {item.completion_date || 'Not completed'}</span></td>
            <td><div className="np-project-actions"><button className="np-btn np-btn--outline" type="button" onClick={() => openEdit(item)} aria-label={`Edit ${item.name}`}><Pencil size={13} /></button><button className="np-btn np-btn--danger" type="button" onClick={() => remove(item)} aria-label={`Delete ${item.name}`}><Trash2 size={13} /></button></div></td>
          </tr>)}
        </tbody></table></div>
      )}
    </section>
  );
}
