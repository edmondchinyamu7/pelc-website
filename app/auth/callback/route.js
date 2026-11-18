import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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
  if (supabase) {
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${safeNext}`);
      }
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
    }
  }

  return NextResponse.redirect(`${origin}/auth/error`);
}
