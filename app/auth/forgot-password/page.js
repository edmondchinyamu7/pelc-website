import Link from 'next/link';
import AuthShell from '@/components/AuthShell';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';

export const metadata = {
  title: 'Reset password | NEOPAD STUDIO',
  description: 'Reset your NEOPAD STUDIO account password.',
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Password recovery"
      title="Reset your password"
      description="Enter your account email and we will send you a secure recovery link."
      footer={
        <>
          Remembered your password? <Link href="/auth/login">Back to log in</Link>
        </>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
