'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ContactDrawer from '@/components/ContactDrawer';
import Footer from '@/components/Footer';

const events = [
  {
    number: '01',
    icon: '✦',
    title: 'Digital Innovation Showcase',
    type: 'Hybrid Workshop',
    date: 'Upcoming · Quarter 1',
    description: 'Explore emerging web architecture, AI-augmented development, and practical digital products designed for Malawi and African markets.',
    location: 'Lilongwe & Live Stream',
  },
  {
    number: '02',
    icon: '◈',
    title: 'Creative Design & Typography Session',
    type: 'Creative Masterclass',
    date: 'Upcoming · Quarter 2',
    description: 'A hands-on visual journey through brand identity, user experience heuristics, editorial layout, and typographic discipline.',
    location: 'Blantyre Creative Hub & Online',
  },
  {
    number: '03',
    icon: '⌁',
    title: 'Business Growth & Tech Meetup',
    type: 'Founder Roundtable',
    date: 'Quarterly Gathering',
    description: 'Connect with local startup founders, SME operators, and tech leaders to explore how software and targeted advertising unlock revenue.',
    location: 'NEOPAD STUDIO / Partner Space',
  },
  {
    number: '04',
    icon: '★',
    title: 'NEOPAD STUDIO Community & Developer Day',
    type: 'Community Celebration',
    date: 'Annual Milestone',
    description: 'Celebrate collaborative creation, student mentorship, and the creators building dependable digital infrastructure.',
    location: 'Open to All Registrants',
  },
];

export default function Event() {
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState('idle');
  const [rsvpError, setRsvpError] = useState('');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (rsvpStatus === 'sending') return;
    if (!selectedEvent || !rsvpName.trim() || !rsvpEmail.trim()) {
      setRsvpError('Please enter your name and email address.');
      return;
    }
    setRsvpError('');
    setRsvpStatus('sending');

    try {
      const res = await fetch('/api/event-rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          eventNumber: selectedEvent.number,
          eventTitle: selectedEvent.title,
          name: rsvpName,
          email: rsvpEmail,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload.error || 'Unable to save registration.');
      }
      setRsvpStatus('success');
      setRsvpSuccess(true);
    } catch (err) {
      setRsvpStatus('error');
      setRsvpError(
        err instanceof Error && err.message
          ? err.message
          : 'Unable to save your RSVP right now. Please try again or confirm via WhatsApp.',
      );
    }
  };

  const confirmViaWhatsApp = () => {
    if (!selectedEvent || !rsvpName.trim() || !rsvpEmail.trim()) {
      setRsvpError('Please enter your name and email address before launching WhatsApp.');
      return;
    }
    const text = `*Event RSVP – ${selectedEvent.title}*%0A%0A*Name:* ${encodeURIComponent(rsvpName)}%0A*Email:* ${encodeURIComponent(rsvpEmail)}%0A*Event:* ${encodeURIComponent(selectedEvent.title)}`;
    window.open(`https://wa.me/265892236030?text=${text}`, '_blank');
  };

  return (
    <main>
      <Navbar onOpenContact={() => setContactOpen(true)} activePage="event" />
      <ContactDrawer isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Hero */}
      <section className="event-hero">
        <div className="hero-grain" aria-hidden="true" />
        <div className="page-width event-hero-inner">
          <p className="eyebrow eyebrow-light">
            <span className="status-dot" /> Community &amp; Knowledge · Malawi &amp; Beyond
          </p>
          <h1>
            Ideas that become <em>experiences.</em>
          </h1>
          <p className="event-hero-desc">
            Explore our upcoming workshops, creative sessions, digital showcases, and opportunities to connect with the NEOPAD STUDIO community.
          </p>
          <div className="event-hero-actions">
            <a className="button button-lime" href="#events">
              Explore upcoming events <span aria-hidden="true">↓</span>
            </a>
            <button
              type="button"
              className="button button-outline"
              onClick={() => setContactOpen(true)}
            >
              Propose a speaking topic <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="intro-strip">
        <div className="page-width intro-inner">
          <p>
            Where technology, design, and <span>practical entrepreneurship</span> meet to share knowledge that matters.
          </p>
          <div className="intro-stamp" aria-hidden="true">
            NEOPAD<br />LIVE<br />EVENTS<span>✳</span>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="section-pad" id="events">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-mark">01</span> Curated Sessions</p>
              <h2>Moments designed to <em>inspire progress.</em></h2>
            </div>
            <div className="section-aside">
              <p>Each gathering is crafted to provide actionable takeaways, candid discussions, and high-value networking.</p>
            </div>
          </div>

          <div className="events-grid">
            {events.map((evt) => (
              <article className="event-card-new" key={evt.number}>
                <div className="event-card-head">
                  <span className="event-number">{evt.number} / 04</span>
                  <span className="event-type-badge">{evt.type}</span>
                </div>

                <div className="event-title-row">
                  <span className="event-symbol">{evt.icon}</span>
                  <div>
                    <h3>{evt.title}</h3>
                    <span className="event-date-pill">{evt.date}</span>
                  </div>
                </div>

                <p className="event-card-desc">{evt.description}</p>

                <div className="event-card-foot">
                  <span className="event-location-text">📍 {evt.location}</span>
                  <button
                    type="button"
                    className="event-rsvp-btn"
                    onClick={() => {
                      setSelectedEvent(evt);
                      setRsvpSuccess(false);
                      setRsvpStatus('idle');
                      setRsvpError('');
                    }}
                  >
                    Register / RSVP <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      {selectedEvent && (
        <div className="rsvp-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="rsvp-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="rsvp-modal-head">
              <div>
                <span className="step-tag">EVENT REGISTRATION</span>
                <h3>{selectedEvent.title}</h3>
              </div>
              <button
                type="button"
                className="home-contact-close"
                onClick={() => setSelectedEvent(null)}
              >
                ×
              </button>
            </div>

            <div className="rsvp-modal-body">
              {rsvpSuccess ? (
                <div className="rsvp-success-view">
                  <span className="success-badge">✓</span>
                  <h4>RSVP Confirmed!</h4>
                  <p>Thank you for registering. We’ve sent your details to the NEOPAD STUDIO event coordination team.</p>
                  <button
                    type="button"
                    className="button button-dark"
                    onClick={() => setSelectedEvent(null)}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit}>
                  <p style={{ margin: '0 0 16px', color: 'var(--muted)', fontSize: '13px' }}>
                    Join us for <strong>{selectedEvent.title}</strong> ({selectedEvent.date}). Enter your details below to reserve your slot:
                  </p>

                  {rsvpError && (
                    <div className="error-banner" role="alert" style={{ marginBottom: '14px' }}>
                      {rsvpError}
                    </div>
                  )}

                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>Your Name *</label>
                    <input
                      type="text"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="e.g. Peter Banda"
                      required
                      style={{ width: '100%', padding: '11px 12px', border: '1px solid #e5dec9', borderRadius: '3px' }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>Email Address *</label>
                    <input
                      type="email"
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      placeholder="e.g. peter@example.com"
                      required
                      style={{ width: '100%', padding: '11px 12px', border: '1px solid #e5dec9', borderRadius: '3px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      type="submit"
                      className="button button-dark"
                      disabled={rsvpStatus === 'sending'}
                    >
                      {rsvpStatus === 'sending' ? 'Registering…' : 'Register / Reserve Slot →'}
                    </button>
                    <button
                      type="button"
                      className="button button-lime"
                      onClick={confirmViaWhatsApp}
                    >
                      Confirm via WhatsApp ↗
                    </button>
                    <button
                      type="button"
                      className="button button-outline"
                      style={{ color: 'var(--ink)', borderColor: '#e5dec9' }}
                      onClick={() => setSelectedEvent(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Collaboration CTA */}
      <section className="final-cta">
        <div className="cta-orb" aria-hidden="true" />
        <div className="page-width final-cta-inner">
          <p className="eyebrow eyebrow-light"><span className="status-dot" /> HOST WITH NEOPAD STUDIO</p>
          <h2>Be part of the next <em>experience.</em></h2>
          <p>Have an event or workshop idea, or want to sponsor or collaborate with NEOPAD STUDIO? Let’s make it memorable together.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link className="button button-lime" href="/contact">
              Propose an Event Collaboration <span aria-hidden="true">↗</span>
            </Link>
            <button
              type="button"
              className="button button-outline"
              onClick={() => setContactOpen(true)}
            >
              Direct Inquiry <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <span className="cta-decoration" aria-hidden="true">✳</span>
      </section>

      <Footer />
    </main>
  );
}