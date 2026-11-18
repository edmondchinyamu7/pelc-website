'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function UpdatePasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    const supabase = createClient();
    if (!supabase) {
      setError('Authentication is not configured yet.');
      setIsLoading(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message || 'Unable to update password. Please request a new recovery link.');
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setIsLoading(false);
    router.push('/account');
    router.refresh();
  };

  return (
    <form className="pelc-auth__form" onSubmit={handleSubmit}>
      <div className="pelc-auth__field">
        <label className="pelc-auth__label" htmlFor="new-password">New password</label>
        <input
          id="new-password"
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
        <label className="pelc-auth__label" htmlFor="confirm-new-password">Confirm new password</label>
        <input
          id="confirm-new-password"
          className="pelc-auth__input"
          type="password"
          autoComplete="new-password"
          minLength={6}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <p className="pelc-auth__error" role="alert">{error}</p>}
      {success && <p className="pelc-auth__success" role="status">Password updated. Redirecting…</p>}
      <button type="submit" className="pelc-auth__button" disabled={isLoading}>
        {isLoading ? 'Updating password…' : 'Update password'}
      </button>
    </form>
  );
}
