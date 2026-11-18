import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const VALID_DEPARTMENTS = new Set(['general', 'wdd', 'sdd', 'ud', 'ad', 'md', 'cpd']);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const projectType = typeof body.projectType === 'string' ? body.projectType.trim() : '';
  const department =
    typeof body.department === 'string' && VALID_DEPARTMENTS.has(body.department.toLowerCase())
      ? body.department.toLowerCase()
      : 'general';

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Please fill in your name, email, and message.' },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Inquiry service is temporarily unavailable.' },
      { status: 503 },
    );
  }

  let userId = null;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();
      if (profile?.id) {
        userId = profile.id;
      }
    }
  } catch {
    userId = null;
  }

  const { error: insertError } = await supabase.from('inquiries').insert({
    user_id: userId,
    department,
    project_type: projectType || null,
    name,
    email,
    phone: phone || null,
    subject: subject || null,
    message,
    status: 'new',
  });

  if (insertError) {
    console.error('Supabase inquiry insert failed:', insertError.code, insertError.message);
    return NextResponse.json(
      { error: 'Unable to save your inquiry right now. Please try WhatsApp or email directly.' },
      { status: 502 },
    );
  }

  // Best-effort notification forwarding to Formspree so email alerts remain intact
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (phone) formData.append('phone', phone);
    if (projectType) formData.append('projectType', projectType);
    if (subject) formData.append('subject', subject);
    formData.append('message', message);
    formData.append('department', department.toUpperCase());
    await fetch('https://formspree.io/f/xyezboed', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });
  } catch {
    // Do not fail the submission if third-party email relay is unreachable
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
