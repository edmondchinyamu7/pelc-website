'use client';

import { useEffect, useMemo, useState } from 'react';
import { RefreshCw, Search, Users } from 'lucide-react';

export default function AdminClients() {
  const [clients, setClients] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    fetch('/api/admin/operations', { cache: 'no-store' }).then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Unable to load client accounts.');
      if (active) setClients(data.clients || []);
    }).catch((e) => { if (active) setError(e.message || 'Unable to load clients.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const filtered = useMemo(() => clients.filter((client) => [client.full_name, client.email, client.company_name].some((v) => (v || '').toLowerCase().includes(query.trim().toLowerCase()))), [clients, query]);
  return <section className="np-ops">
    <div className="np-ops-head"><div><p className="np-card-kicker">Client relationships</p><h2>Clients</h2><p className="np-card-desc">Registered client accounts from the existing NEOPAD profiles table.</p></div><button className="np-btn np-btn--outline" onClick={() => window.location.reload()}><RefreshCw size={14}/> Refresh</button></div>
    <div className="np-project-summary"><div><span>Registered clients</span><strong>{clients.length}</strong></div><div><span>Filtered results</span><strong>{filtered.length}</strong></div><div><span>Source</span><strong>Live records</strong></div></div>
    <div className="np-card"><div className="np-project-toolbar"><label className="np-project-search"><Search size={15}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search client name, email or company"/></label></div>
      {error && <div className="np-banner np-banner--error">{error}</div>}
      {loading ? <div className="np-empty-state">Loading registered clients…</div> : filtered.length === 0 ? <div className="np-empty-state"><Users size={24}/><p>No client accounts match this search.</p></div> : <div className="np-table-wrap"><table className="np-table"><thead><tr><th>Client</th><th>Company</th><th>Email</th><th>Registered</th></tr></thead><tbody>{filtered.map((client) => <tr key={client.id}><td><strong>{client.full_name || 'Name not provided'}</strong></td><td>{client.company_name || '—'}</td><td>{client.email || '—'}</td><td>{client.created_at ? new Date(client.created_at).toLocaleDateString() : '—'}</td></tr>)}</tbody></table></div>}
    </div>
  </section>;
}
