import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AuthShell from '@/components/AuthShell';
import UpdatePasswordForm from '@/components/UpdatePasswordForm';

export const metadata = {
  title: 'Set new password | NEOPAD STUDIO',
  description: 'Set a new password for your NEOPAD STUDIO account.',
};

export default async function UpdatePasswordPage() {
  const supabase = await createClient();
  if (!supabase) redirect('/auth/login');

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/forgot-password');
  }

  return (
    <AuthShell
      eyebrow="Account security"
      title="Set a new password"
      description={`Choose a new password for ${user.email}.`}
      footer={
        <>
          Back to <Link href="/account">your account</Link>
        </>
      }
    >
      <UpdatePasswordForm />
    </AuthShell>
  );
}
