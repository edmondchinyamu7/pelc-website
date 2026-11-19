import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowUpRight, CalendarCheck, KeyRound, ShieldCheck } from 'lucide-react';
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

  const [{ data: profile }, { data: adminCheck }] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, email, full_name, company_name, phone, role')
      .eq('id', user.id)
      .maybeSingle(),
    supabase.rpc('is_studio_admin'),
  ]);

  // Admin navigation is rendered only after both the database role and
  // the server-side authorization RPC confirm administrator access.
  const isStudioAdmin = profile?.role === 'admin' && adminCheck === true;
  const greetingName = profile?.full_name?.trim() || user.email;

  return (
    <div className="pelc-page np-client-account-page">
      <Navbar />

      <header className="np-portal-hero np-client-hero">
        <div className="container">
          <div className="np-portal-hero-inner">
            <div>
              <span className="pill">
                <span className="dot" />
                Client Account Portal
              </span>
              <h1>
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

      <main className="np-portal-section np-client-account">
        <div className="container">
          <div className="np-account-grid np-client-account-grid">
            <section className="np-card np-client-card" aria-labelledby="client-profile-title">
              <div className="np-card-head np-client-card-head">
                <div>
                  <p className="np-card-kicker">Client Profile</p>
                  <h2 id="client-profile-title">Profile Information</h2>
                  <p className="np-card-desc">
                    Update your contact and organization details used across project inquiries and
                    consultations.
                  </p>
                </div>
                <span className="np-pill np-client-role">
                  {isStudioAdmin ? <ShieldCheck size={13} /> : null}
                  {isStudioAdmin ? 'Administrator' : 'Client'}
                </span>
              </div>

              <AccountProfileForm
                userId={user.id}
                userEmail={user.email}
                initialProfile={profile}
              />

              <div className="np-account-actions np-client-actions">
                <div>
                  <p className="np-card-kicker">Account Actions</p>
                  <h3>Manage your account</h3>
                </div>
                <div className="np-action-links np-client-action-links">
                  <Link href="/auth/update-password" className="np-action-link np-client-action">
                    <KeyRound size={17} />
                    <span>Update password</span>
                    <ArrowUpRight size={14} />
                  </Link>
                  <Link href="/consultation" className="np-action-link np-client-action">
                    <CalendarCheck size={17} />
                    <span>Book consultation</span>
                    <ArrowUpRight size={14} />
                  </Link>
                  {isStudioAdmin ? (
                    <Link href="/admin" className="np-action-link np-client-action np-client-admin-action">
                      <ShieldCheck size={17} />
                      <span>Admin Dashboard</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  ) : null}
                </div>
                <div className="np-client-signout">
                  <SignOutButton />
                </div>
              </div>
            </section>

            <section className="np-card np-client-card np-client-vault" aria-labelledby="client-vault-title">
              <div className="np-card-head np-client-card-head">
                <div>
                  <p className="np-card-kicker">Private Vault</p>
                  <h2 id="client-vault-title">Project Briefs</h2>
                  <p className="np-card-desc">
                    Upload specifications, scope documents, or visual assets. Only your account and
                    authorized NEOPAD STUDIO administrators can access these files.
                  </p>
                </div>
              </div>
              <ProjectBriefsManager />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
