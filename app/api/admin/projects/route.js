import { NextResponse } from 'next/server';
import { requireStudioAdmin } from '@/lib/supabase/admin';

const STATUSES = new Set(['planning', 'in_progress', 'completed', 'on_hold']);

function cleanText(value, max = 160) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function validateProject(body, partial = false) {
  const value = body && typeof body === 'object' ? body : {};
  const fields = {};
  for (const key of ['name', 'client_name', 'category']) {
    if (partial && !(key in value)) continue;
    fields[key] = cleanText(value[key]);
    if (fields[key].length < 2) return { error: `${key.replace('_', ' ')} must contain at least 2 characters.` };
  }
  for (const key of ['description', 'project_url', 'start_date', 'completion_date', 'status']) {
    if (partial && !(key in value)) continue;
    fields[key] = value[key] === null || value[key] === '' ? null : value[key];
  }
  if ('description' in fields && fields.description !== null) {
    if (typeof fields.description !== 'string' || fields.description.length > 3000) return { error: 'Description must be 3,000 characters or fewer.' };
    fields.description = fields.description.trim();
  }
  if ('status' in fields) {
    fields.status = fields.status || 'planning';
    if (!STATUSES.has(fields.status)) return { error: 'Choose a valid project status.' };
  }
  if ('project_url' in fields && fields.project_url !== null) {
    if (typeof fields.project_url !== 'string' || !/^https?:\/\//i.test(fields.project_url)) return { error: 'Project link must start with http:// or https://.' };
  }
  for (const key of ['start_date', 'completion_date']) {
    if (key in fields && fields[key] !== null && (typeof fields[key] !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(fields[key]))) {
      return { error: 'Dates must use YYYY-MM-DD format.' };
    }
  }
  const start = fields.start_date;
  const end = fields.completion_date;
  if (start && end && end < start) return { error: 'Completion date cannot be earlier than the start date.' };
  return { fields };
}

async function authorize() {
  const auth = await requireStudioAdmin();
  if (auth.status !== 'authorized') {
    const status = auth.status === 'unauthenticated' ? 401 : auth.status === 'forbidden' ? 403 : 503;
    return { response: NextResponse.json({ error: auth.reason || 'Administrator access required.' }, { status }) };
  }
  return { supabase: auth.supabase, user: auth.user };
}

export async function GET() {
  const access = await authorize();
  if (access.response) return access.response;
  const { data, error } = await access.supabase
    .from('studio_projects')
    .select('id, name, client_name, category, description, status, start_date, completion_date, project_url, created_at, updated_at')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: 'Unable to load projects. Apply the project-management migration and try again.' }, { status: 502 });
  return NextResponse.json({ items: data || [] }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request) {
  const access = await authorize();
  if (access.response) return access.response;
  const body = await request.json().catch(() => null);
  const parsed = validateProject(body);
  if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const { data, error } = await access.supabase
    .from('studio_projects')
    .insert({ ...parsed.fields, created_by: access.user.id })
    .select('id, name, client_name, category, description, status, start_date, completion_date, project_url, created_at, updated_at')
    .single();
  if (error) return NextResponse.json({ error: 'Unable to save this project. Check that the project-management migration has been applied.' }, { status: 502 });
  return NextResponse.json({ item: data }, { status: 201 });
}

export async function PATCH(request) {
  const access = await authorize();
  if (access.response) return access.response;
  const body = await request.json().catch(() => null);
  const id = typeof body?.id === 'string' ? body.id : '';
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: 'A valid project ID is required.' }, { status: 400 });
  const parsed = validateProject(body, true);
  if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 });
  if (!Object.keys(parsed.fields).length) return NextResponse.json({ error: 'No project changes were supplied.' }, { status: 400 });
  const { data, error } = await access.supabase
    .from('studio_projects')
    .update(parsed.fields)
    .eq('id', id)
    .select('id, name, client_name, category, description, status, start_date, completion_date, project_url, created_at, updated_at')
    .maybeSingle();
  if (error) return NextResponse.json({ error: 'Unable to update this project.' }, { status: 502 });
  if (!data) return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  return NextResponse.json({ item: data });
}

export async function DELETE(request) {
  const access = await authorize();
  if (access.response) return access.response;
  const id = request.nextUrl.searchParams.get('id') || '';
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: 'A valid project ID is required.' }, { status: 400 });
  const { error, count } = await access.supabase.from('studio_projects').delete({ count: 'exact' }).eq('id', id);
  if (error) return NextResponse.json({ error: 'Unable to delete this project.' }, { status: 502 });
  if (count === 0) return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  return NextResponse.json({ success: true });
}
