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
    location: 'PELC Studio / Partner Space',
  },
  {
    number: '04',
    icon: '★',
    title: 'PELC Community & Developer Day',
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
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpEmail.trim()) return;
    const text = `*Event RSVP – ${selectedEvent.title}*%0A%0A*Name:* ${encodeURIComponent(rsvpName)}%0A*Email:* ${encodeURIComponent(rsvpEmail)}%0A*Event:* ${encodeURIComponent(selectedEvent.title)}`;
    window.open(`https://wa.me/265892236030?text=${text}`, '_blank');
    setRsvpSuccess(true);
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
            Explore our upcoming workshops, creative sessions, digital showcases, and opportunities to connect with the PELC community.
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
            PELC<br />LIVE<br />EVENTS<span>✳</span>
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
                  <p>Thank you for registering. We’ve sent your details to the PELC event coordination team.</p>
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

                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '6px' }}>Your Name *</label>
                    <input
                      type="text"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="e.g. Peter Banda"
                      required
                      style={{ width: '100%', padding: '11px 12px', border: '1px solid #dedfd5', borderRadius: '3px' }}
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
                      style={{ width: '100%', padding: '11px 12px', border: '1px solid #dedfd5', borderRadius: '3px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button type="submit" className="button button-lime">
                      Confirm via WhatsApp ↗
                    </button>
                    <button
                      type="button"
                      className="button button-outline"
                      style={{ color: 'var(--ink)', borderColor: '#dedfd5' }}
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
          <p className="eyebrow eyebrow-light"><span className="status-dot" /> HOST WITH PELC</p>
          <h2>Be part of the next <em>experience.</em></h2>
          <p>Have an event or workshop idea, or want to sponsor or collaborate with PELC? Let’s make it memorable together.</p>
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

      <style jsx>{`
        .event-hero {
          min-height: 480px;
          position: relative;
          overflow: hidden;
          background: var(--forest-deep);
          color: white;
          padding: 85px 0 95px;
        }
        .event-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 820px;
        }
        .event-hero h1 {
          margin: 0;
          font-size: clamp(44px, 6.2vw, 72px);
          line-height: 1.05;
          letter-spacing: -3.8px;
          font-weight: 620;
        }
        .event-hero h1 em {
          color: var(--lime);
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 400;
        }
        .event-hero-desc {
          max-width: 580px;
          margin: 22px 0 0;
          color: #c0ccc3;
          font-size: 15px;
          line-height: 1.85;
        }
        .event-hero-actions {
          margin-top: 32px;
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }
        .events-grid {
          margin-top: 50px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }
        .event-card-new {
          background: white;
          border: 1px solid var(--line);
          padding: 34px 34px 28px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .event-card-new:hover {
          transform: translateY(-4px);
          border-color: #829b42;
          box-shadow: 0 16px 36px rgba(16, 43, 36, 0.08);
        }
        .event-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .event-number {
          color: #758078;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .event-type-badge {
          display: inline-block;
          padding: 3px 10px;
          background: var(--lime-soft);
          color: var(--forest-deep);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          border-radius: 2px;
        }
        .event-title-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 16px;
        }
        .event-symbol {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #f4f6eb;
          display: grid;
          place-items: center;
          font-size: 20px;
          color: var(--forest);
          flex-shrink: 0;
        }
        .event-title-row h3 {
          margin: 0 0 4px;
          font-size: 21px;
          font-weight: 650;
          letter-spacing: -0.5px;
          color: var(--ink);
        }
        .event-date-pill {
          display: inline-block;
          color: #718e2b;
          font-size: 11px;
          font-weight: 750;
          letter-spacing: 0.5px;
        }
        .event-card-desc {
          margin: 0 0 24px;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.8;
          flex-grow: 1;
        }
        .event-card-foot {
          padding-top: 18px;
          border-top: 1px solid #eef0e6;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .event-location-text {
          font-size: 11px;
          color: #556257;
          font-weight: 600;
        }
        .event-rsvp-btn {
          border: 0;
          background: transparent;
          color: var(--forest);
          font-size: 12px;
          font-weight: 750;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: gap 0.2s, color 0.2s;
        }
        .event-rsvp-btn:hover {
          color: #718e2b;
          gap: 10px;
        }
        .rsvp-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 27, 22, 0.7);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: grid;
          place-items: center;
          padding: 20px;
        }
        .rsvp-modal-card {
          width: min(520px, 100%);
          background: var(--paper);
          border: 1px solid var(--line);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
        }
        .rsvp-modal-head {
          padding: 24px 28px;
          background: #102b24;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .step-tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--lime);
          margin-bottom: 4px;
        }
        .rsvp-modal-head h3 {
          margin: 0;
          font-size: 20px;
        }
        .rsvp-modal-body {
          padding: 28px;
        }
        .rsvp-success-view {
          text-align: center;
          padding: 20px 0;
        }
        .success-badge {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--lime);
          color: var(--forest-deep);
          display: inline-grid;
          place-items: center;
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 12px;
        }
        .rsvp-success-view h4 {
          margin: 0 0 6px;
          font-size: 18px;
        }
        .rsvp-success-view p {
          color: var(--muted);
          font-size: 12px;
          margin: 0 0 20px;
        }
        @media (max-width: 900px) {
          .events-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .event-hero h1 {
            font-size: clamp(38px, 10vw, 54px);
            letter-spacing: -2.5px;
          }
          .event-card-new {
            padding: 24px 20px;
          }
        }
      `}</style>
    </main>
  );
}