'use client';

import { useEffect, useState } from 'react';
import { CalendarDays, Star, Wallet } from 'lucide-react';

export default function AdminBusinessSummary() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    fetch('/api/admin/operations', { cache: 'no-store' }).then(async (res) => {
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Unavailable');
      if (active) setData(json);
    }).catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, []);
  const month = new Date().toISOString().slice(0, 7);
  const currency = data?.finance?.[0]?.currency || 'MWK';
  const finance = (data?.finance || []).filter((r) => String(r.recorded_on || '').slice(0, 7) === month && r.currency === currency);
  const revenue = finance.filter((r) => r.entry_type === 'income').reduce((s, r) => s + Number(r.amount), 0);
  const expenses = finance.filter((r) => r.entry_type === 'expense').reduce((s, r) => s + Number(r.amount), 0);
  const feedback = data?.feedback || [];
  const satisfaction = feedback.length ? (feedback.reduce((s, r) => s + Number(r.rating), 0) / feedback.length).toFixed(1) + ' / 5' : '—';
  const newProjects = (data?.projects || []).filter((p) => String(p.created_at || '').slice(0, 7) === month).length;
  const fmt = (value) => new Intl.NumberFormat('en', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
  return <div className="np-ops-kpis np-business-summary">
    <article><span><Wallet size={15}/> Monthly revenue</span><strong>{error ? 'Unavailable' : data ? fmt(revenue) : 'Loading…'}</strong><small>{data ? 'Recorded income · profit ' + fmt(revenue - expenses) : 'Awaiting operational records'}</small></article>
    <article><span><CalendarDays size={15}/> New projects</span><strong>{error ? '—' : data ? newProjects : '…'}</strong><small>Projects created this month</small></article>
    <article><span><Star size={15}/> Client satisfaction</span><strong>{error ? '—' : data ? satisfaction : '…'}</strong><small>{feedback.length} recorded client ratings</small></article>
  </div>;
}
