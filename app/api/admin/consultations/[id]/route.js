import { NextResponse } from 'next/server';
import { requireStudioAdmin } from '@/lib/supabase/admin';

const VALID_STATUSES = new Set(['pending', 'scheduled', 'completed', 'cancelled']);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function PATCH(request, context) {
  const auth = await requireStudioAdmin();
  if (auth.status === 'unauthenticated') {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }
  if (auth.status !== 'authorized') {
    return NextResponse.json({ error: 'Administrator access required.' }, { status: 403 });
  }

  const { id } = await context.params;
  if (!id || !UUID_RE.test(id)) {
    return NextResponse.json({ error: 'Invalid consultation ID.' }, { status: 400 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }

  const nextStatus = typeof body?.status === 'string' ? body.status.trim().toLowerCase() : '';
  if (!VALID_STATUSES.has(nextStatus)) {
    return NextResponse.json({ error: 'Invalid consultation status.' }, { status: 400 });
  }

  const { data, error } = await auth.supabase
    .from('consultations')
    .update({ status: nextStatus })
    .eq('id', id)
    .select('id, status, updated_at')
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: 'Failed to update consultation status.' }, { status: 502 });
  }
  if (!data) {
    return NextResponse.json({ error: 'Consultation not found.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, item: data });
}
