'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { isNetworkAuthError, logSafeAuthDiagnostic } from '@/lib/supabase/diagnostics';

function loginErrorMessage(error) {
  if (!error) {
    return 'Unable to sign in. Please try again.';
  }

  if (isNetworkAuthError(error)) {
    return 'Unable to reach the authentication server. Please verify your network connection and Supabase configuration.';
  }

  const code = typeof error.code === 'string' ? error.code : '';
  const status = typeof error.status === 'number' ? error.status : 0;
  const message = typeof error.message === 'string' ? error.message.toLowerCase() : '';

  if (code === 'email_not_confirmed' || message.includes('email not confirmed')) {
    return 'Email confirmation required. Please check your inbox for the verification link.';
  }
  if (
    code === 'invalid_credentials' ||
    message.includes('invalid login credentials') ||
    (status === 400 && !code)
  ) {
    return 'Incorrect email or password.';
  }
  if (code === 'user_banned') {
    return 'This account has been suspended. Please contact NEOPAD STUDIO support.';
  }
  if (code === 'over_request_rate_limit' || status === 429) {
    return 'Too many login attempts. Please wait a moment and try again.';
  }
  if (code === 'email_provider_disabled' || code === 'provider_disabled') {
    return 'Email and password sign-in is currently disabled in authentication settings.';
  }
  if (status >= 500 || code === 'unexpected_failure') {
    return 'The authentication service returned a server error. Please try again shortly.';
  }

  return error.message
    ? `Sign-in failed: ${error.message}`
    : 'Unable to complete sign-in. Please try again.';
}

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      if (!supabase) {
        logSafeAuthDiagnostic({
          location: 'components/LoginForm.js',
          operation: 'createClient',
          reason: 'missing_supabase_public_env',
        });
        setError('Authentication is not configured yet. Please check Supabase environment variables.');
        setIsLoading(false);
        return;
      }

      const trimmedEmail = email.trim();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (signInError) {
        logSafeAuthDiagnostic({
          location: 'components/LoginForm.js',
          operation: 'auth.signInWithPassword',
          error: signInError,
        });
        setError(loginErrorMessage(signInError));
        setIsLoading(false);
        return;
      }

      if (!data?.session || !data?.user) {
        logSafeAuthDiagnostic({
          location: 'components/LoginForm.js',
          operation: 'auth.signInWithPassword',
          reason: 'missing_session_or_user',
        });
        setError('Session could not be established. Please try logging in again.');
        setIsLoading(false);
        return;
      }

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData?.session) {
        logSafeAuthDiagnostic({
          location: 'components/LoginForm.js',
          operation: 'auth.getSession',
          error: sessionError,
          reason: 'session_not_persisted_in_cookies',
        });
        setError('Session could not be persisted in browser cookies. Please enable cookies and try again.');
        setIsLoading(false);
        return;
      }

      // Resolve the destination from the database-backed role, never from
      // user-editable metadata or a client-controlled redirect parameter.
      const [{ data: isAdmin, error: adminCheckError }, { data: profile, error: profileError }] =
        await Promise.all([
          supabase.rpc('is_studio_admin'),
          supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .maybeSingle(),
        ]);

      if (adminCheckError || profileError || !profile) {
        logSafeAuthDiagnostic({
          location: 'components/LoginForm.js',
          operation: adminCheckError ? 'rpc.is_studio_admin' : 'profiles.select',
          error: adminCheckError || profileError,
          reason: 'role_verification_failed_after_login',
        });
        setError('You are signed in, but we could not verify your account permissions. Please try again or contact NEOPAD support.');
        setIsLoading(false);
        return;
      }

      const isVerifiedAdmin = isAdmin === true && profile.role === 'admin';
      window.location.assign(isVerifiedAdmin ? '/admin' : '/account');
    } catch (unexpectedError) {
      logSafeAuthDiagnostic({
        location: 'components/LoginForm.js',
        operation: 'handleSubmit',
        error: unexpectedError,
        reason: 'unexpected_exception',
      });
      setError(
        isNetworkAuthError(unexpectedError)
          ? 'Unable to reach the authentication server. Please verify your network connection and Supabase configuration.'
          : 'An unexpected error occurred while signing in. Please try again.',
      );
      setIsLoading(false);
    }
  };

  return (
    <form className="pelc-auth__form" onSubmit={handleSubmit} noValidate={false}>
      <div className="pelc-auth__field">
        <label className="pelc-auth__label" htmlFor="email">Email</label>
        <input
          id="email"
          className="pelc-auth__input"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="pelc-auth__field">
        <div className="pelc-auth__label-row">
          <label className="pelc-auth__label" htmlFor="password">Password</label>
          <Link href="/auth/forgot-password" className="pelc-auth__inline-link">
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          className="pelc-auth__input"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="pelc-auth__error" role="alert">{error}</p>}
      <button type="submit" className="pelc-auth__button" disabled={isLoading}>
        {isLoading ? 'Logging in…' : 'Log in'}
      </button>
    </form>
  );
}
