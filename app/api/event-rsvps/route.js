import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }

  const eventNumber = typeof body.eventNumber === 'string' ? body.eventNumber.trim() : '';
  const eventTitle = typeof body.eventTitle === 'string' ? body.eventTitle.trim() : '';
  const attendeeName = typeof body.name === 'string' ? body.name.trim() : '';
  const attendeeEmail = typeof body.email === 'string' ? body.email.trim() : '';

  if (!eventNumber || !eventTitle || !attendeeName || !attendeeEmail) {
    return NextResponse.json(
      { error: 'Please provide your name and email address to register.' },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(attendeeEmail)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Event registration service is temporarily unavailable.' },
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

  const { error: insertError } = await supabase.from('event_rsvps').insert({
    user_id: userId,
    event_number: eventNumber,
    event_title: eventTitle,
    attendee_name: attendeeName,
    attendee_email: attendeeEmail,
    status: 'registered',
  });

  if (insertError) {
    console.error('Supabase event RSVP insert failed:', insertError.code, insertError.message);
    return NextResponse.json(
      { error: 'Unable to save your RSVP right now. Please try again or confirm via WhatsApp.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
