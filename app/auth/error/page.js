import Link from 'next/link';
import AuthShell from '@/components/AuthShell';

export const metadata = { title: 'Authentication error | PELC' };

export default function AuthErrorPage() {
  return (
    <AuthShell
      eyebrow="Something went wrong"
      title="We couldn&apos;t sign you in"
      description="The link may have expired or already been used. Please try logging in again."
    >
      <Link href="/auth/login" className="pelc-auth__button pelc-auth__button--ghost">
        Back to log in
      </Link>
    </AuthShell>
  );
}
