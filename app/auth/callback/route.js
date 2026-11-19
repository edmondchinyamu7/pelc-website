import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logSafeAuthDiagnostic } from '@/lib/supabase/diagnostics';

function getRequestOrigin(request) {
  const forwardedHost = request.headers.get('x-forwarded-host');
  if (forwardedHost) {
    const forwardedProto = request.headers.get('x-forwarded-proto') || 'https';
    return `${forwardedProto}://${forwardedHost}`;
  }
  return request.nextUrl.origin;
}

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const origin = getRequestOrigin(request);
  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next');
  const safeNext = next && next.startsWith('/') && !next.startsWith('//') ? next : '/account';

  const supabase = await createClient();
  if (!supabase) {
    logSafeAuthDiagnostic({
      location: 'app/auth/callback/route.js',
      operation: 'createClient',
      reason: 'missing_supabase_public_env',
    });
    return NextResponse.redirect(`${origin}/auth/error`);
  }

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
    logSafeAuthDiagnostic({
      location: 'app/auth/callback/route.js',
      operation: 'auth.exchangeCodeForSession',
      error,
    });
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });
    if (!error) {
      const redirectTarget =
        type === 'recovery' && safeNext === '/account' ? '/auth/update-password' : safeNext;
      return NextResponse.redirect(`${origin}${redirectTarget}`);
    }
    logSafeAuthDiagnostic({
      location: 'app/auth/callback/route.js',
      operation: 'auth.verifyOtp',
      error,
      extra: { type },
    });
  } else {
    logSafeAuthDiagnostic({
      location: 'app/auth/callback/route.js',
      operation: 'GET',
      reason: 'missing_code_or_token_hash',
    });
  }

  return NextResponse.redirect(`${origin}/auth/error`);
}
