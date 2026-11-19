'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { logSafeAuthDiagnostic } from '@/lib/supabase/diagnostics';

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const supabase = createClient();
      if (supabase) {
        const { error } = await supabase.auth.signOut();
        if (error) {
          logSafeAuthDiagnostic({
            location: 'components/SignOutButton.js',
            operation: 'auth.signOut',
            error,
          });
        }
      }
    } catch (err) {
      logSafeAuthDiagnostic({
        location: 'components/SignOutButton.js',
        operation: 'handleSignOut',
        error: err,
      });
    } finally {
      router.replace('/auth/login');
      router.refresh();
    }
  };

  return (
    <button
      type="button"
      className="pelc-auth__button pelc-auth__button--ghost"
      onClick={handleSignOut}
      disabled={isLoading}
    >
      {isLoading ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
