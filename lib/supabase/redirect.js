export function getAuthRedirectUrl(nextPath = '/account') {
  const safeNext =
    typeof nextPath === 'string' && nextPath.startsWith('/') && !nextPath.startsWith('//')
      ? nextPath
      : '/account';

  let baseOrigin = typeof window !== 'undefined' ? window.location.origin : '';

  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL) {
    try {
      const parsed = new URL(process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL);
      baseOrigin = parsed.origin;
    } catch {
      // Fall back to window.location.origin if env value is invalid
    }
  }

  const callbackUrl = new URL('/auth/callback', baseOrigin);
  if (safeNext !== '/account') {
    callbackUrl.searchParams.set('next', safeNext);
  }
  return callbackUrl.toString();
}
