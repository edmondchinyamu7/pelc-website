import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AuthShell from '@/components/AuthShell';
import SignOutButton from '@/components/SignOutButton';

export const metadata = { title: 'Your account | PELC' };

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  return (
    <AuthShell
      eyebrow="Signed in"
      title="Your account"
      description={`You're logged in as ${user.email}.`}
    >
      <SignOutButton />
    </AuthShell>
  );
}
