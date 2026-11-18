import { NextResponse } from 'next/server';
import { requireStudioAdmin } from '@/lib/supabase/admin';

const VALID_STATUSES = new Set(['registered', 'attended', 'cancelled']);

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
  const eventNumber = (searchParams.get('eventNumber') || '').trim();
  const status = (searchParams.get('status') || '').trim().toLowerCase();
  const page = Math.max(1, Number.parseInt(searchParams.get('page') || '1', 10) || 1);
  const limit = Math.min(50, Math.max(1, Number.parseInt(searchParams.get('limit') || '15', 10) || 15));
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = auth.supabase
    .from('event_rsvps')
    .select(
      'id, user_id, event_number, event_title, attendee_name, attendee_email, status, created_at',
      { count: 'exact' },
    )
    .order('created_at', { ascending: false })
    .range(from, to);

  if (eventNumber) {
    query = query.eq('event_number', eventNumber);
  }
  if (VALID_STATUSES.has(status)) {
    query = query.eq('status', status);
  }
  if (search) {
    query = query.or(
      `attendee_name.ilike.%${search}%,attendee_email.ilike.%${search}%,event_title.ilike.%${search}%`,
    );
  }

  const { data, error, count } = await query;
  if (error) {
    return NextResponse.json({ error: 'Failed to load event RSVPs.' }, { status: 502 });
  }

  return NextResponse.json({
    items: data || [],
    total: count ?? 0,
    page,
    limit,
  });
}
