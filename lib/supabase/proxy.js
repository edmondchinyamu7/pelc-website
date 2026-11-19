import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { logSafeAuthDiagnostic } from '@/lib/supabase/diagnostics';

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    if (
      request.nextUrl.pathname.startsWith('/account') ||
      request.nextUrl.pathname.startsWith('/admin')
    ) {
      const url = request.nextUrl.clone();
      const intended = request.nextUrl.pathname + request.nextUrl.search;
      url.pathname = '/auth/login';
      url.search = '';
      if (intended.startsWith('/admin')) {
        url.searchParams.set('next', intended);
      }
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  const forwardedProto = request.headers
    .get('x-forwarded-proto')
    ?.split(',')[0]
    ?.trim()
    .toLowerCase();
  const isSecureCookie =
    forwardedProto === 'https' ||
    request.nextUrl.protocol === 'https:' ||
    (forwardedProto !== 'http' &&
      request.nextUrl.hostname !== 'localhost' &&
      request.nextUrl.hostname !== '127.0.0.1' &&
      process.env.NODE_ENV === 'production');

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookieOptions: { secure: isSecureCookie },
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // Must run immediately after creating the client so the session is refreshed.
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError && authError.name !== 'AuthSessionMissingError') {
    logSafeAuthDiagnostic({
      location: 'lib/supabase/proxy.js',
      operation: 'auth.getUser',
      error: authError,
      extra: { path: request.nextUrl.pathname },
    });
  }

  if (
    (request.nextUrl.pathname.startsWith('/account') ||
      request.nextUrl.pathname.startsWith('/admin')) &&
    !user
  ) {
    const url = request.nextUrl.clone();
    const intended = request.nextUrl.pathname + request.nextUrl.search;
    url.pathname = '/auth/login';
    url.search = '';
    if (intended.startsWith('/admin')) {
      url.searchParams.set('next', intended);
    }
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
