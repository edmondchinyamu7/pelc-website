import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AlertTriangle, ShieldAlert, User } from 'lucide-react';
import { requireStudioAdmin } from '@/lib/supabase/admin';
import { logSafeAuthDiagnostic } from '@/lib/supabase/diagnostics';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminDashboard from '@/components/AdminDashboard';
import '@/components/portal.css';

export const metadata = { title: 'Admin Dashboard | NEOPAD STUDIO' };
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const auth = await requireStudioAdmin();

  if (auth.status === 'unconfigured' || auth.status === 'unauthenticated') {
    redirect('/auth/login?next=/admin');
  }

  if (auth.status === 'error') {
    return (
      <div className="pelc-page">
        <Navbar />
        <header className="np-portal-hero">
          <div className="container">
            <span className="pill">
              <span className="dot" />
              Verification Error
            </span>
            <h1 style={{ marginTop: '14px' }}>
              Administrator <em>Verification Unavailable</em>
            </h1>
            <p className="np-portal-sub">
              We signed in your session ({auth.user?.email}), but could not verify administrator
              permissions with the Supabase database.
            </p>
          </div>
        </header>

        <main className="np-portal-section">
          <div className="container">
            <div className="np-card" style={{ maxWidth: '640px' }}>
              <div className="np-card-head">
                <div>
                  <p className="np-card-kicker">503 · Verification Failed Closed</p>
                  <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AlertTriangle size={22} color="#9c7921" />
                    Administrator permissions could not be verified
                  </h2>
                  <p className="np-card-desc">
                    {auth.reason ||
                      'Check that the connected Supabase database has the NEOPAD STUDIO schema and is_studio_admin() function deployed.'}
                  </p>
                </div>
              </div>

              <div className="np-action-links">
                <Link href="/admin" className="np-action-link">
                  Try Again
                </Link>
                <Link href="/account" className="np-action-link">
                  <User size={15} />
                  Return to Your Account
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (auth.status === 'forbidden') {
    return (
      <div className="pelc-page">
        <Navbar />
        <header className="np-portal-hero">
          <div className="container">
            <span className="pill">
              <span className="dot" />
              Restricted Area
            </span>
            <h1 style={{ marginTop: '14px' }}>
              Administrator <em>Permissions Missing</em>
            </h1>
            <p className="np-portal-sub">
              Your account ({auth.user?.email}) is signed in, but does not hold studio
              administrator privileges.
            </p>
          </div>
        </header>

        <main className="np-portal-section">
          <div className="container">
            <div className="np-card" style={{ maxWidth: '640px' }}>
              <div className="np-card-head">
                <div>
                  <p className="np-card-kicker">403 · Access Denied</p>
                  <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldAlert size={22} color="#9e2222" />
                    Administrator permissions are missing
                  </h2>
                  <p className="np-card-desc">
                    {auth.reason ||
                      'Only NEOPAD STUDIO accounts explicitly assigned the administrator role in the database can access studio inquiries, consultations, and event RSVPs.'}
                  </p>
                </div>
              </div>

              <div className="np-action-links">
                <Link href="/account" className="np-action-link">
                  <User size={15} />
                  Return to Your Account
                </Link>
                <Link href="/" className="np-action-link">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const supabase = auth.supabase;

  const [
    totalInquiriesRes,
    newInquiriesRes,
    totalConsultationsRes,
    pendingConsultationsRes,
    totalRsvpsRes,
    totalAccountsRes,
    totalProjectsRes,
    completedProjectsRes,
    inProgressProjectsRes,
    inquiriesPageRes,
    consultationsPageRes,
    rsvpsPageRes,
  ] = await Promise.all([
    supabase.from('inquiries').select('id', { count: 'exact', head: true }),
    supabase.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('consultations').select('id', { count: 'exact', head: true }),
    supabase
      .from('consultations')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'pending'),
    supabase.from('event_rsvps').select('id', { count: 'exact', head: true }),
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('studio_projects').select('id', { count: 'exact', head: true }),
    supabase.from('studio_projects').select('id', { count: 'exact', head: true }).eq('status', 'completed'),
    supabase.from('studio_projects').select('id', { count: 'exact', head: true }).eq('status', 'in_progress'),
    supabase
      .from('inquiries')
      .select(
        'id, user_id, department, project_type, name, email, phone, subject, message, status, created_at, updated_at',
        { count: 'exact' },
      )
      .order('created_at', { ascending: false })
      .range(0, 14),
    supabase
      .from('consultations')
      .select(
        'id, user_id, service, project_description, audience, timeline, budget, additional_notes, name, email, phone, status, created_at, updated_at',
        { count: 'exact' },
      )
      .order('created_at', { ascending: false })
      .range(0, 14),
    supabase
      .from('event_rsvps')
      .select('id, user_id, event_number, event_title, attendee_name, attendee_email, status, created_at', {
        count: 'exact',
      })
      .order('created_at', { ascending: false })
      .range(0, 14),
  ]);

  const queryErrors = [
    totalInquiriesRes.error,
    newInquiriesRes.error,
    totalConsultationsRes.error,
    pendingConsultationsRes.error,
    totalRsvpsRes.error,
    inquiriesPageRes.error,
    consultationsPageRes.error,
    rsvpsPageRes.error,
  ].filter(Boolean);

  if (queryErrors.length > 0) {
    logSafeAuthDiagnostic({
      location: 'app/admin/page.js',
      operation: 'loadDashboardData',
      error: queryErrors[0],
      extra: { failedQueriesCount: queryErrors.length },
    });
  }

  const inquiriesItems = inquiriesPageRes.data || [];
  const consultationsItems = consultationsPageRes.data || [];
  const rsvpsItems = rsvpsPageRes.data || [];

  const recentSubmissions = [
    ...inquiriesItems.slice(0, 5).map((item) => ({
      type: 'inquiry',
      typeLabel: `Inquiry (${item.department.toUpperCase()})`,
      id: item.id,
      name: item.name,
      email: item.email,
      summary: item.subject,
      status: item.status,
      createdAt: item.created_at,
    })),
    ...consultationsItems.slice(0, 5).map((item) => ({
      type: 'consultation',
      typeLabel: `Consultation (${item.service})`,
      id: item.id,
      name: item.name,
      email: item.email,
      summary:
        item.project_description?.length > 72
          ? `${item.project_description.slice(0, 72)}…`
          : item.project_description || item.service,
      status: item.status,
      createdAt: item.created_at,
    })),
    ...rsvpsItems.slice(0, 5).map((item) => ({
      type: 'rsvp',
      typeLabel: `Event RSVP #${item.event_number}`,
      id: item.id,
      name: item.attendee_name,
      email: item.attendee_email,
      summary: item.event_title,
      status: item.status,
      createdAt: item.created_at,
    })),
  ]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  return (
    <AdminDashboard
      adminEmail={auth.user.email}
      adminName={auth.profile?.full_name || ''}
      initialLoadError={
        queryErrors.length > 0
          ? 'Dashboard data could not be completely loaded from the database. Please refresh or check database logs.'
          : null
      }
      initialStats={{
        totalInquiries: totalInquiriesRes.count ?? 0,
        newInquiries: newInquiriesRes.count ?? 0,
        totalConsultations: totalConsultationsRes.count ?? 0,
        pendingConsultations: pendingConsultationsRes.count ?? 0,
        totalRsvps: totalRsvpsRes.count ?? 0,
        totalAccounts: totalAccountsRes.count ?? 0,
        totalProjects: totalProjectsRes.count ?? 0,
        completedProjects: completedProjectsRes.count ?? 0,
        inProgressProjects: inProgressProjectsRes.count ?? 0,
      }}
      initialRecent={recentSubmissions}
      initialInquiries={{
        items: inquiriesItems,
        total: inquiriesPageRes.count ?? 0,
      }}
      initialConsultations={{
        items: consultationsItems,
        total: consultationsPageRes.count ?? 0,
      }}
      initialRsvps={{
        items: rsvpsItems,
        total: rsvpsPageRes.count ?? 0,
      }}
    />
  );
}
