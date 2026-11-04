'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function loginErrorMessage(error) {
  const { code, status } = error ?? {};
  if (code === 'email_not_confirmed') {
    return 'Please confirm your email address. Check your inbox for the link.';
  }
  if (code === 'over_request_rate_limit' || status === 429) {
    return 'Too many attempts. Please wait a moment and try again.';
  }
  if (code === 'invalid_credentials') {
    return 'Invalid email or password.';
  }
  return 'Something went wrong. Please try again.';
}

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      console.error('Login error:', signInError);
      setError(loginErrorMessage(signInError));
      setIsLoading(false);
      return;
    }

    router.push('/account');
    router.refresh();
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
        <label className="pelc-auth__label" htmlFor="password">Password</label>
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
