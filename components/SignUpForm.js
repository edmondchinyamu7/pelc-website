'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function signUpErrorMessage(error) {
  const { code, status } = error ?? {};
  if (code === 'weak_password') return 'Please choose a stronger password.';
  if (code === 'email_address_invalid') {
    return 'Please use a real email address. Example and test domains are not supported.';
  }
  if (code === 'email_address_not_authorized') {
    return 'We cannot send a confirmation email to that address. Please use a different one.';
  }
  if (code === 'validation_failed') return 'Please check the details you entered.';
  if (code === 'over_email_send_rate_limit' || status === 429) {
    return 'Too many attempts. Please wait a moment and try again.';
  }
  return 'Unable to complete sign-up. Please try again.';
}

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== repeatPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
          `${window.location.origin}/auth/callback`,
      },
    });

    if (signUpError) {
      console.error('Sign-up error:', signUpError);
      setError(signUpErrorMessage(signUpError));
      setIsLoading(false);
      return;
    }

    router.push('/auth/sign-up-success');
  };

  return (
    <form className="pelc-auth__form" onSubmit={handleSubmit}>
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
          autoComplete="new-password"
          minLength={6}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="pelc-auth__field">
        <label className="pelc-auth__label" htmlFor="repeat-password">Confirm password</label>
        <input
          id="repeat-password"
          className="pelc-auth__input"
          type="password"
          autoComplete="new-password"
          minLength={6}
          required
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </div>
      {error && <p className="pelc-auth__error" role="alert">{error}</p>}
      <button type="submit" className="pelc-auth__button" disabled={isLoading}>
        {isLoading ? 'Creating account…' : 'Create account'}
      </button>
    </form>
  );
}
