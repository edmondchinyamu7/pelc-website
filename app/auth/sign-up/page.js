import Link from 'next/link';
import AuthShell from '@/components/AuthShell';
import SignUpForm from '@/components/SignUpForm';

export const metadata = {
  title: 'Create account | NOVEX DIGITAL',
  description: 'Create your NOVEX DIGITAL account.',
};

export default function SignUpPage() {
  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      description="Sign up with your email to collaborate with the NOVEX DIGITAL team."
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
