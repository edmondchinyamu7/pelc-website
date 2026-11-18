import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      {
        configured: false,
        connected: false,
        message: 'NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are not set yet.',
      },
      { status: 200 },
    );
  }

  try {
    const supabase = await createClient();
    const { error: sessionError } = await supabase.auth.getSession();

    const healthRes = await fetch(`${supabaseUrl.replace(/\/$/, '')}/auth/v1/health`, {
      headers: { apikey: supabaseAnonKey },
      cache: 'no-store',
    });

    const connected = !sessionError && healthRes.ok;
    const projectRef = new URL(supabaseUrl).hostname.split('.')[0];

    return NextResponse.json(
      {
        configured: true,
        connected,
        projectRef,
        authStatus: healthRes.status,
      },
      { status: connected ? 200 : 502 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        configured: true,
        connected: false,
        message: err instanceof Error ? err.message : 'Unable to reach Supabase.',
      },
      { status: 502 },
    );
  }
}
