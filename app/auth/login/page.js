import Link from 'next/link';
import AuthShell from '@/components/AuthShell';
import LoginForm from '@/components/LoginForm';

export const metadata = {
  title: 'Log in | PELC',
  description: 'Log in to your PELC account.',
};

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Log in to PELC"
      description="Enter your email and password to access your account."
      footer={
        <>
          Don&apos;t have an account? <Link href="/auth/sign-up">Create one</Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
