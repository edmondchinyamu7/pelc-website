import Link from 'next/link';
import AuthShell from '@/components/AuthShell';
import SignUpForm from '@/components/SignUpForm';

export const metadata = {
  title: 'Create account | PELC',
  description: 'Create your PELC account.',
};

export default function SignUpPage() {
  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      description="Sign up with your email to work with the PELC team."
      footer={
        <>
          Already have an account? <Link href="/auth/login">Log in</Link>
        </>
      }
    >
      <SignUpForm />
    </AuthShell>
  );
}
