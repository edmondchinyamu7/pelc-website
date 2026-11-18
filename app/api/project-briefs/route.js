import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  ALLOWED_BRIEF_EXTENSIONS,
  ALLOWED_BRIEF_MIME_TYPES,
  MAX_BRIEF_FILE_SIZE,
  PROJECT_BRIEFS_BUCKET,
  getExtension,
  isValidSingleSegmentFileName,
  sanitizeBriefFilename,
  verifyMagicBytes,
} from '@/lib/storage/briefs';

export async function GET() {
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

  const { data, error } = await supabase.storage.from(PROJECT_BRIEFS_BUCKET).list(user.id, {
    limit: 100,
    sortBy: { column: 'created_at', order: 'desc' },
  });

  if (error) {
    return NextResponse.json(
      { error: 'Unable to load your project briefs right now.' },
      { status: 502 },
    );
  }

  const files = (data || [])
    .filter((item) => item && item.name && item.name !== '.emptyFolderPlaceholder')
    .map((item) => ({
      name: item.name,
      size: item.metadata?.size ?? null,
      mimeType: item.metadata?.mimetype ?? null,
      createdAt: item.created_at ?? null,
      updatedAt: item.updated_at ?? null,
    }));

  return NextResponse.json({ files });
}

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

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid upload payload.' }, { status: 400 });
  }

  const file = formData.get('file');
  if (!file || typeof file === 'string' || typeof file.arrayBuffer !== 'function') {
    return NextResponse.json({ error: 'Please select a file to upload.' }, { status: 400 });
  }

  if (file.size <= 0) {
    return NextResponse.json({ error: 'Uploaded file cannot be empty.' }, { status: 400 });
  }

  if (file.size > MAX_BRIEF_FILE_SIZE) {
    return NextResponse.json(
      { error: 'File exceeds the 10 MB maximum size limit.' },
      { status: 400 },
    );
  }

  const ext = getExtension(file.name);
  const mimeType = typeof file.type === 'string' ? file.type.toLowerCase() : '';

  if (!ALLOWED_BRIEF_EXTENSIONS.has(ext) || !ALLOWED_BRIEF_MIME_TYPES.has(mimeType)) {
    return NextResponse.json(
      { error: 'Unsupported file type. Allowed formats: PDF, PNG, JPEG, WebP.' },
      { status: 400 },
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  if (!verifyMagicBytes(bytes, mimeType)) {
    return NextResponse.json(
      { error: 'File contents do not match a valid PDF, PNG, JPEG, or WebP document.' },
      { status: 400 },
    );
  }

  const safeFilename = sanitizeBriefFilename(file.name);
  const objectName = `${Date.now()}-${safeFilename}`;
  const objectPath = `${user.id}/${objectName}`;

  const { error: uploadError } = await supabase.storage
    .from(PROJECT_BRIEFS_BUCKET)
    .upload(objectPath, bytes, {
      contentType: mimeType,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: uploadError.message || 'Unable to upload file.' },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      file: {
        name: objectName,
        size: file.size,
        mimeType,
        createdAt: new Date().toISOString(),
      },
    },
    { status: 201 },
  );
}

export async function DELETE(request) {
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
  const { data, error: deleteError } = await supabase.storage
    .from(PROJECT_BRIEFS_BUCKET)
    .remove([objectPath]);

  if (deleteError) {
    return NextResponse.json(
      { error: 'Unable to delete file. Please try again.' },
      { status: 403 },
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return NextResponse.json({ error: 'File not found.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
