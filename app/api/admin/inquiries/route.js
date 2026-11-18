import { NextResponse } from 'next/server';
import { requireStudioAdmin } from '@/lib/supabase/admin';

const VALID_DEPARTMENTS = new Set(['general', 'wdd', 'sdd', 'ud', 'ad', 'md', 'cpd']);
const VALID_STATUSES = new Set(['new', 'in_review', 'replied', 'archived']);

export async function GET(request) {
  const auth = await requireStudioAdmin();
  if (auth.status === 'unauthenticated') {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }
  if (auth.status !== 'authorized') {
    return NextResponse.json({ error: 'Administrator access required.' }, { status: 403 });
  }

  const { searchParams } = request.nextUrl;
  const search = (searchParams.get('search') || '').trim().replace(/[,%()]/g, '');
  const department = (searchParams.get('department') || '').trim().toLowerCase();
  const status = (searchParams.get('status') || '').trim().toLowerCase();
  const page = Math.max(1, Number.parseInt(searchParams.get('page') || '1', 10) || 1);
  const limit = Math.min(50, Math.max(1, Number.parseInt(searchParams.get('limit') || '15', 10) || 15));
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = auth.supabase
    .from('inquiries')
    .select(
      'id, user_id, department, project_type, name, email, phone, subject, message, status, created_at, updated_at',
      { count: 'exact' },
    )
    .order('created_at', { ascending: false })
    .range(from, to);

  if (VALID_DEPARTMENTS.has(department)) {
    query = query.eq('department', department);
  }
  if (VALID_STATUSES.has(status)) {
    query = query.eq('status', status);
  }
  if (search) {
    query = query.or(
      `name.ilike.%${search}%,email.ilike.%${search}%,subject.ilike.%${search}%,message.ilike.%${search}%`,
    );
  }

  const { data, error, count } = await query;
  if (error) {
    return NextResponse.json({ error: 'Failed to load inquiries.' }, { status: 502 });
  }

  return NextResponse.json({
    items: data || [],
    total: count ?? 0,
    page,
    limit,
  });
}
