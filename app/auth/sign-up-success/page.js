import Link from 'next/link';
import AuthShell from '@/components/AuthShell';

export const metadata = { title: 'Check your email | PELC' };

export default function SignUpSuccessPage() {
  return (
    <AuthShell
      eyebrow="Almost there"
      title="Check your email"
      description="We sent you a confirmation link. Open it to activate your account, then log in."
    >
      <Link href="/auth/login" className="pelc-auth__button pelc-auth__button--ghost">
        Back to log in
      </Link>
    </AuthShell>
  );
}
