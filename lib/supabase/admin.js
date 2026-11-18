import { createClient } from '@/lib/supabase/server';

export async function requireStudioAdmin() {
  const supabase = await createClient();
  if (!supabase) {
    return {
      status: 'unconfigured',
      user: null,
      profile: null,
      supabase: null,
    };
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      status: 'unauthenticated',
      user: null,
      profile: null,
      supabase,
    };
  }

  const [{ data: isAdminRpc, error: rpcError }, { data: profile, error: profileError }] =
    await Promise.all([
      supabase.rpc('is_studio_admin'),
      supabase
        .from('profiles')
        .select('id, email, full_name, role')
        .eq('id', user.id)
        .maybeSingle(),
    ]);

  if (rpcError || profileError || isAdminRpc !== true || profile?.role !== 'admin') {
    return {
      status: 'forbidden',
      user,
      profile: profile ?? null,
      supabase,
    };
  }

  return {
    status: 'authorized',
    user,
    profile,
    supabase,
  };
}
