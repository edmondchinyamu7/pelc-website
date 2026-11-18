import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AuthShell from '@/components/AuthShell';
import AccountProfileForm from '@/components/AccountProfileForm';
import SignOutButton from '@/components/SignOutButton';

export const metadata = { title: 'Your account | NEOPAD STUDIO' };

export default async function AccountPage() {
  const supabase = await createClient();
  if (!supabase) redirect('/auth/login');

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, full_name, company_name, phone, role')
    .eq('id', user.id)
    .maybeSingle();

  return (
    <AuthShell
      eyebrow={profile?.role ? `Signed in · ${profile.role}` : 'Signed in'}
      title="Your account"
      description={`You're logged in as ${user.email}.`}
    >
      <AccountProfileForm
        userId={user.id}
        userEmail={user.email}
        initialProfile={profile}
      />
      <SignOutButton />
    </AuthShell>
  );
}
