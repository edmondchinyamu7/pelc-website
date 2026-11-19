import { createClient } from '@/lib/supabase/server';
import { logSafeAuthDiagnostic } from '@/lib/supabase/diagnostics';

export async function requireStudioAdmin() {
  const supabase = await createClient();
  if (!supabase) {
    logSafeAuthDiagnostic({
      location: 'lib/supabase/admin.js',
      operation: 'createClient',
      reason: 'missing_supabase_public_env',
    });
    return {
      status: 'unconfigured',
      reason: 'Supabase environment variables are not configured.',
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
    if (authError && authError.name !== 'AuthSessionMissingError') {
      logSafeAuthDiagnostic({
        location: 'lib/supabase/admin.js',
        operation: 'auth.getUser',
        error: authError,
      });
    }
    return {
      status: 'unauthenticated',
      reason: authError?.message || 'No authenticated user session.',
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

  if (rpcError || profileError) {
    logSafeAuthDiagnostic({
      location: 'lib/supabase/admin.js',
      operation: rpcError ? 'rpc.is_studio_admin' : 'profiles.select',
      error: rpcError || profileError,
      extra: {
        rpcFailed: Boolean(rpcError),
        profileQueryFailed: Boolean(profileError),
      },
    });
    return {
      status: 'error',
      reason: 'Unable to verify administrator permissions against the database.',
      user,
      profile: profile ?? null,
      supabase,
    };
  }

  if (!profile) {
    logSafeAuthDiagnostic({
      location: 'lib/supabase/admin.js',
      operation: 'profiles.select',
      reason: 'missing_profile_row',
    });
    return {
      status: 'forbidden',
      reason: 'Your user account does not have a profile record yet.',
      user,
      profile: null,
      supabase,
    };
  }

  if (isAdminRpc !== true || profile.role !== 'admin') {
    logSafeAuthDiagnostic({
      location: 'lib/supabase/admin.js',
      operation: 'requireStudioAdmin',
      reason: 'not_studio_admin',
      extra: {
        profileRole: profile.role,
        rpcResult: isAdminRpc === true,
      },
    });
    return {
      status: 'forbidden',
      reason: 'Administrator permissions are missing for this account.',
      user,
      profile,
      supabase,
    };
  }

  return {
    status: 'authorized',
    reason: null,
    user,
    profile,
    supabase,
  };
}
