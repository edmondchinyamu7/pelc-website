import Link from 'next/link';
import AuthShell from '@/components/AuthShell';
import SignUpForm from '@/components/SignUpForm';

export const metadata = {
  title: 'Create account | NEOPAD STUDIO',
  description: 'Create your NEOPAD STUDIO account.',
};

export default function SignUpPage() {
  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      description="Sign up with your email to collaborate with the NEOPAD STUDIO team."
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
