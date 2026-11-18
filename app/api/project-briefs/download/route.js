import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PROJECT_BRIEFS_BUCKET, isValidSingleSegmentFileName } from '@/lib/storage/briefs';

export async function POST(request) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Storage service unavailable.' }, { status: 503 });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }

  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  if (!isValidSingleSegmentFileName(name)) {
    return NextResponse.json({ error: 'Invalid file name.' }, { status: 400 });
  }

  const objectPath = `${user.id}/${name}`;
  const { data, error } = await supabase.storage
    .from(PROJECT_BRIEFS_BUCKET)
    .createSignedUrl(objectPath, 60, { download: name });

  if (error || !data?.signedUrl) {
    return NextResponse.json(
      { error: 'Unable to generate download link for this file.' },
      { status: 404 },
    );
  }

  return NextResponse.json({ url: data.signedUrl });
}
