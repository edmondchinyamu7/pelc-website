import { NextResponse } from 'next/server';
import { requireStudioAdmin } from '@/lib/supabase/admin';

const TABLES = new Set(['finance', 'meetings', 'feedback']);
const UUID = /^[0-9a-f-]{36}$/i;
const clean = (v, max = 240) => typeof v === 'string' ? v.trim().slice(0, max) : '';

async function access() {
  const auth = await requireStudioAdmin();
  if (auth.status !== 'authorized') {
    const status = auth.status === 'unauthenticated' ? 401 : auth.status === 'forbidden' ? 403 : 503;
    return { response: NextResponse.json({ error: auth.reason || 'Administrator access required.' }, { status }) };
  }
  return { supabase: auth.supabase, user: auth.user, profile: auth.profile };
}

function error(message, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

async function logActivity(supabase, user, profile, action, entityType, entityId, details) {
  const { error: logError } = await supabase.from('studio_activity_log').insert({
    actor_id: user.id,
    actor_name: profile?.full_name || user.email || 'Administrator',
    action, entity_type: entityType, entity_id: entityId || null, details: details || null,
  });
  if (logError) console.error('[admin-activity-log] Unable to record activity:', logError.message);
}

export async function GET() {
  const auth = await access();
  if (auth.response) return auth.response;
  const { supabase } = auth;
  const [finance, meetings, feedback, activity, projects] = await Promise.all([
    supabase.from('studio_financial_entries').select('id, entry_type, description, category, amount, currency, recorded_on, project_id, reference, created_at').order('recorded_on', { ascending: false }).limit(500),
    supabase.from('studio_meetings').select('id, title, meeting_type, attendee_name, attendee_email, starts_at, ends_at, location, meeting_url, notes, status, created_at').order('starts_at', { ascending: true }).limit(200),
    supabase.from('studio_client_feedback').select('id, client_name, client_email, rating, feedback, project_id, received_on, created_at').order('received_on', { ascending: false }).limit(200),
    supabase.from('studio_activity_log').select('id, actor_name, action, entity_type, entity_id, details, created_at').order('created_at', { ascending: false }).limit(100),
    supabase.from('studio_projects').select('id, name, client_name, category, status, progress_percent, deadline, created_at').order('deadline', { ascending: true }).limit(200),
  ]);
  const failed = [finance, meetings, feedback, activity, projects].find((r) => r.error);
  if (failed) {
    console.error('[admin-operations] Query failed:', failed.error.message);
    return error('Unable to load operational records. Apply the admin operations migration and try again.', 502);
  }
  return NextResponse.json({
    finance: finance.data || [], meetings: meetings.data || [], feedback: feedback.data || [],
    activity: activity.data || [], projects: projects.data || [],
  }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request) {
  const auth = await access();
  if (auth.response) return auth.response;
  const body = await request.json().catch(() => null);
  const kind = body?.kind;
  if (!TABLES.has(kind)) return error('Choose a supported record type.');
  const { supabase, user, profile } = auth;
  let table;
  let fields;

  if (kind === 'finance') {
    table = 'studio_financial_entries';
    const amount = Number(body.amount);
    const date = clean(body.recorded_on, 10);
    if (!['income', 'expense'].includes(body.entry_type)) return error('Choose income or expense.');
    if (!Number.isFinite(amount) || amount <= 0 || amount > 999999999999) return error('Enter a valid positive amount.');
    if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(date)) return error('Enter a valid transaction date.');
    if (clean(body.description, 240).length < 2 || clean(body.category, 80).length < 2) return error('Description and category are required.');
    const currency = clean(body.currency || 'MWK', 3).toUpperCase();
    if (!/^[A-Z]{3}$/.test(currency)) return error('Currency must be a three-letter code.');
    fields = { entry_type: body.entry_type, description: clean(body.description), category: clean(body.category, 80), amount, currency, recorded_on: date, project_id: UUID.test(body.project_id || '') ? body.project_id : null, reference: clean(body.reference, 120) || null, created_by: user.id };
  } else if (kind === 'meetings') {
    table = 'studio_meetings';
    const starts = new Date(body.starts_at);
    const ends = body.ends_at ? new Date(body.ends_at) : null;
    if (clean(body.title, 180).length < 2 || Number.isNaN(starts.getTime())) return error('Meeting title and a valid start date/time are required.');
    if (ends && (Number.isNaN(ends.getTime()) || ends <= starts)) return error('Meeting end must be after its start.');
    if (!['client', 'internal'].includes(body.meeting_type || 'client')) return error('Choose a valid meeting type.');
    const url = clean(body.meeting_url, 500);
    if (url && !/^https?:\\/\\//i.test(url)) return error('Meeting link must start with http:// or https://.');
    fields = { title: clean(body.title, 180), meeting_type: body.meeting_type || 'client', attendee_name: clean(body.attendee_name, 160) || null, attendee_email: clean(body.attendee_email, 254) || null, starts_at: starts.toISOString(), ends_at: ends ? ends.toISOString() : null, location: clean(body.location, 240) || null, meeting_url: url || null, notes: clean(body.notes, 3000) || null, status: 'scheduled', created_by: user.id };
  } else {
    table = 'studio_client_feedback';
    const rating = Number(body.rating);
    const received = clean(body.received_on, 10);
    if (clean(body.client_name, 160).length < 2 || !Number.isInteger(rating) || rating < 1 || rating > 5) return error('Client name and a rating from 1 to 5 are required.');
    if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(received)) return error('Enter a valid feedback date.');
    fields = { client_name: clean(body.client_name, 160), client_email: clean(body.client_email, 254) || null, rating, feedback: clean(body.feedback, 3000) || null, project_id: UUID.test(body.project_id || '') ? body.project_id : null, received_on: received, created_by: user.id };
  }

  const { data, error: insertError } = await supabase.from(table).insert(fields).select('*').single();
  if (insertError) {
    console.error('[admin-operations] Insert failed:', insertError.message);
    return error('Could not save this record. Check the database migration and supplied values.', 502);
  }
  const entityType = kind === 'finance' ? 'financial entry' : kind === 'meetings' ? 'meeting' : 'client feedback';
  await logActivity(supabase, user, profile, `Added ${entityType}`, entityType, data.id, data.description || data.title || data.client_name);
  return NextResponse.json({ item: data }, { status: 201 });
}

export async function PATCH(request) {
  const auth = await access();
  if (auth.response) return auth.response;
  const body = await request.json().catch(() => null);
  const { kind, id } = body || {};
  if (!TABLES.has(kind) || !UUID.test(id || '')) return error('A valid record type and ID are required.');
  const { supabase, user, profile } = auth;
  let table = kind === 'finance' ? 'studio_financial_entries' : kind === 'meetings' ? 'studio_meetings' : 'studio_client_feedback';
  const allowed = kind === 'finance' ? ['entry_type','description','category','amount','currency','recorded_on','project_id','reference'] : kind === 'meetings' ? ['title','meeting_type','attendee_name','attendee_email','starts_at','ends_at','location','meeting_url','notes','status'] : ['client_name','client_email','rating','feedback','project_id','received_on'];
  const fields = {};
  for (const key of allowed) if (key in body) fields[key] = body[key];
  if (!Object.keys(fields).length) return error('No changes were supplied.');
  if ('amount' in fields && (!Number.isFinite(Number(fields.amount)) || Number(fields.amount) <= 0)) return error('Amount must be positive.');
  if ('rating' in fields && (!Number.isInteger(Number(fields.rating)) || Number(fields.rating) < 1 || Number(fields.rating) > 5)) return error('Rating must be between 1 and 5.');
  const { data, error: updateError } = await supabase.from(table).update(fields).eq('id', id).select('*').maybeSingle();
  if (updateError) return error('Unable to update this record.', 502);
  if (!data) return error('Record not found.', 404);
  await logActivity(supabase, user, profile, 'Updated record', kind, id, null);
  return NextResponse.json({ item: data });
}

export async function DELETE(request) {
  const auth = await access();
  if (auth.response) return auth.response;
  const params = new URL(request.url).searchParams;
  const kind = params.get('kind');
  const id = params.get('id') || '';
  if (!TABLES.has(kind) || !UUID.test(id)) return error('A valid record type and ID are required.');
  const table = kind === 'finance' ? 'studio_financial_entries' : kind === 'meetings' ? 'studio_meetings' : 'studio_client_feedback';
  const { data, error: deleteError } = await auth.supabase.from(table).delete().eq('id', id).select('id').maybeSingle();
  if (deleteError) return error('Unable to delete this record.', 502);
  if (!data) return error('Record not found.', 404);
  await logActivity(auth.supabase, auth.user, auth.profile, 'Deleted record', kind, id, null);
  return NextResponse.json({ success: true });
}
