'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, LoaderCircle } from 'lucide-react';
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
      className="np-client-signout-btn"
      onClick={handleSignOut}
      disabled={isLoading}
    >
      {isLoading ? <LoaderCircle size={16} className="np-profile-spinner" /> : <LogOut size={16} />}
      {isLoading ? 'Signing out…' : 'Sign Out'}
    </button>
  );
}
