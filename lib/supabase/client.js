import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  const isHttps =
    typeof window !== 'undefined'
      ? window.location.protocol === 'https:'
      : process.env.NODE_ENV === 'production';

  return createBrowserClient(supabaseUrl, supabaseKey, {
    cookieOptions: { secure: isHttps },
  });
}
