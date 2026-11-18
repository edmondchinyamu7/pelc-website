import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const VALID_SERVICES = new Set([
  'website',
  'software',
  'design',
  'advertising',
  'marketing',
  'creative',
  'ai',
  'comprehensive',
]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }

  const service = typeof body.service === 'string' ? body.service.trim() : '';
  const project = typeof body.project === 'string' ? body.project.trim() : '';
  const audience = typeof body.audience === 'string' ? body.audience.trim() : 'businesses';
  const timeline = typeof body.timeline === 'string' ? body.timeline.trim() : '1-3-months';
  const budget = typeof body.budget === 'string' ? body.budget.trim() : '500-1500';
  const additionalNotes =
    typeof body.additionalNotes === 'string' ? body.additionalNotes.trim() : '';
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';

  if (!VALID_SERVICES.has(service)) {
    return NextResponse.json({ error: 'Please select a valid service category.' }, { status: 400 });
  }
  if (!project) {
    return NextResponse.json({ error: 'Please describe your project goals.' }, { status: 400 });
  }
  if (!name || !email) {
    return NextResponse.json(
      { error: 'Please provide your name and email address.' },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Consultation booking service is temporarily unavailable.' },
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

  const { error: insertError } = await supabase.from('consultations').insert({
    user_id: userId,
    service,
    project_description: project,
    audience: audience || 'businesses',
    timeline: timeline || '1-3-months',
    budget: budget || '500-1500',
    additional_notes: additionalNotes || null,
    name,
    email,
    phone: phone || null,
    status: 'pending',
  });

  if (insertError) {
    console.error('Supabase consultation insert failed:', insertError.code, insertError.message);
    return NextResponse.json(
      { error: 'Could not save your consultation booking right now. Please try WhatsApp or email directly.' },
      { status: 502 },
    );
  }

  try {
    const formData = new FormData();
    formData.append('service', service);
    formData.append('project', project);
    formData.append('audience', audience);
    formData.append('timeline', timeline);
    formData.append('budget', budget);
    if (additionalNotes) formData.append('additionalNotes', additionalNotes);
    formData.append('name', name);
    formData.append('email', email);
    if (phone) formData.append('phone', phone);
    formData.append('type', 'Consultation Booking');
    await fetch('https://formspree.io/f/xyezboed', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });
  } catch {
    // Non-blocking fallback
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
