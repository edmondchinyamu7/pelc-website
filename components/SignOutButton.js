'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    await createClient().auth.signOut();
    router.push('/auth/login');
    router.refresh();
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
