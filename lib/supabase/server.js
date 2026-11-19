import { createServerClient } from '@supabase/ssr';
import { cookies, headers } from 'next/headers';

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const forwardedProto = headerStore.get('x-forwarded-proto')?.split(',')[0]?.trim().toLowerCase();
  const host = (headerStore.get('host') || '').toLowerCase();
  const isLocalHttp =
    forwardedProto === 'http' ||
    (!forwardedProto && (host.startsWith('localhost') || host.startsWith('127.0.0.1')));
  const isSecureCookie = forwardedProto === 'https' || (!isLocalHttp && process.env.NODE_ENV === 'production');

  return createServerClient(supabaseUrl, supabaseKey, {
    cookieOptions: { secure: isSecureCookie },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component; the proxy refreshes sessions instead.
        }
      },
    },
  });
}
