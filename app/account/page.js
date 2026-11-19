import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CalendarCheck, KeyRound } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccountProfileForm from '@/components/AccountProfileForm';
import SignOutButton from '@/components/SignOutButton';
import ProjectBriefsManager from '@/components/ProjectBriefsManager';
import '@/components/portal.css';

export const metadata = { title: 'Your account | NEOPAD STUDIO' };
export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const supabase = await createClient();
  if (!supabase) redirect('/auth/login');

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, full_name, company_name, phone')
    .eq('id', user.id)
    .maybeSingle();

  const greetingName = profile?.full_name?.trim() || user.email;

  return (
    <div className="pelc-page">
      <Navbar />

      <header className="np-portal-hero">
        <div className="container">
          <div className="np-portal-hero-inner">
            <div>
              <span className="pill">
                <span className="dot" />
                Client Account Portal
              </span>
              <h1 style={{ marginTop: '14px' }}>
                Welcome back, <em>{greetingName}</em>
              </h1>
              <p className="np-portal-sub">
                Signed in as {user.email}. Manage your profile details, security settings, and
                private project briefs for your NEOPAD STUDIO engagements.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="np-portal-section">
        <div className="container">
          <div className="np-account-grid">
            <div className="np-card">
              <div className="np-card-head">
                <div>
                  <p className="np-card-kicker">Client Profile</p>
                  <h2>Profile Information</h2>
                  <p className="np-card-desc">
                    Update your contact and organization details used across project inquiries and
                    consultations.
                  </p>
                </div>
                <span className="np-pill">Client</span>
              </div>

              <AccountProfileForm
                userId={user.id}
                userEmail={user.email}
                initialProfile={profile}
              />

              <div className="np-account-actions">
                <p className="np-card-kicker" style={{ marginBottom: '2px' }}>
                  Account Actions
                </p>
                <div className="np-action-links">
                  <Link href="/auth/update-password" className="np-action-link">
                    <KeyRound size={15} />
                    Update password
                  </Link>
                  <Link href="/consultation" className="np-action-link">
                    <CalendarCheck size={15} />
                    Book consultation
                  </Link>
                </div>
                <div style={{ marginTop: '6px' }}>
                  <SignOutButton />
                </div>
              </div>
            </div>

            <div className="np-card">
              <div className="np-card-head">
                <div>
                  <p className="np-card-kicker">Private Vault</p>
                  <h2>Project Briefs</h2>
                  <p className="np-card-desc">
                    Upload specifications, scope documents, or visual assets. Only your account and
                    authorized NEOPAD STUDIO administrators can access these files.
                  </p>
                </div>
              </div>

              <ProjectBriefsManager />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
