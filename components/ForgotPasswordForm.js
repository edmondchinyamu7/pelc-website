'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getAuthRedirectUrl } from '@/lib/supabase/redirect';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setError(null);
    setIsLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setError('Authentication is not configured yet. Please try again later.');
      setIsLoading(false);
      return;
    }

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: getAuthRedirectUrl('/auth/update-password'),
    });

    if (resetError) {
      if (resetError.status === 429) {
        setError('Too many requests. Please wait a moment before trying again.');
      } else {
        setError('Unable to send password recovery email. Please verify your email address.');
      }
      setIsLoading(false);
      return;
    }

    setSent(true);
    setIsLoading(false);
  };

  if (sent) {
    return (
      <div className="pelc-auth__form">
        <p className="pelc-auth__success" role="status">
          If an account exists for <strong>{email}</strong>, a password reset link has been sent. Open the link in your email to choose a new password.
        </p>
      </div>
    );
  }

  return (
    <form className="pelc-auth__form" onSubmit={handleSubmit}>
      <div className="pelc-auth__field">
        <label className="pelc-auth__label" htmlFor="reset-email">Email</label>
        <input
          id="reset-email"
          className="pelc-auth__input"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {error && <p className="pelc-auth__error" role="alert">{error}</p>}
      <button type="submit" className="pelc-auth__button" disabled={isLoading}>
        {isLoading ? 'Sending reset link…' : 'Send reset link'}
      </button>
    </form>
  );
}
