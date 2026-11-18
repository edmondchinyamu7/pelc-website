import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ShieldAlert, User } from 'lucide-react';
import { requireStudioAdmin } from '@/lib/supabase/admin';
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
              Administrator <em>Access Required</em>
            </h1>
            <p className="np-portal-sub">
              Your account ({auth.user?.email}) is signed in as a standard client profile and does
              not hold administrator permissions.
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
                    You do not have permission to view this page
                  </h2>
                  <p className="np-card-desc">
                    Only NEOPAD STUDIO accounts explicitly assigned the administrator role in the
                    database can access studio inquiries, consultations, and event RSVPs.
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
      initialStats={{
        totalInquiries: totalInquiriesRes.count ?? 0,
        newInquiries: newInquiriesRes.count ?? 0,
        totalConsultations: totalConsultationsRes.count ?? 0,
        pendingConsultations: pendingConsultationsRes.count ?? 0,
        totalRsvps: totalRsvpsRes.count ?? 0,
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
