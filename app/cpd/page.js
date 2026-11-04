'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ContactDrawer from '@/components/ContactDrawer';
import Footer from '@/components/Footer';

const capabilities = [
  {
    icon: '🖌️',
    title: 'Brand Identity & Logo Systems',
    desc: 'Timeless logo marks, typography pairings, color palettes, and comprehensive brand guidelines that make your company instantly recognizable.',
  },
  {
    icon: '📖',
    title: 'Editorial Layout & Book Publishing',
    desc: 'Professional typesetting, grid systems, and layout design for magazines, annual reports, corporate catalogues, and brochures.',
  },
  {
    icon: '⛪',
    title: 'Church Bulletins & Community Publications',
    desc: 'Organized, beautiful weekly bulletins, ministry booklets, event programs, and commemorative anniversary publications.',
  },
  {
    icon: '🎪',
    title: 'Large-Format Event Collateral',
    desc: 'Eye-catching pull-up banners, conference backdrops, stage designs, flyers, and street posters with high-resolution pre-press precision.',
  },
  {
    icon: '📦',
    title: 'Packaging & Merchandise Design',
    desc: 'Custom product packaging labels, corporate swag, branded merchandise, and apparel graphics that reflect premium quality.',
  },
  {
    icon: '📐',
    title: 'Vector Illustration & Infographics',
    desc: 'Custom vector artwork, explanatory charts, and diagrammatic infographics that simplify complex concepts into visual clarity.',
  },
];

const designDisciplines = [
  'Logo Systems', 'Editorial Layout', 'Typography', 'Pre-Press Production',
  'Packaging Design', 'Vector Illustration', 'Infographics', 'Brand Identity'
];

export default function CPD() {
  const [contactOpen, setContactOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', publicationType: 'branding', timeline: 'flexible', message: '' });
  const [status, setStatus] = useState('idle');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage('Please fill in your name, email, and creative requirements.');
      return;
    }
    setErrorMessage('');
    setStatus('sending');

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      formData.append('department', 'Creative & Publication (CPD)');

      const res = await fetch('https://formspree.io/f/xyezboed', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        setSubmitted(true);
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Could not send message automatically. Please reach out via WhatsApp or email directly below.');
    }
  };

  const sendViaWhatsApp = () => {
    if (!form.name.trim() || !form.message.trim()) {
      setErrorMessage('Please enter your name and creative project details before launching WhatsApp.');
      return;
    }
    const text = `*New Creative & Publication Inquiry (CPD)*%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Email:* ${encodeURIComponent(form.email)}%0A${form.phone ? `*Phone:* ${encodeURIComponent(form.phone)}%0A` : ''}*Project Type:* ${encodeURIComponent(form.publicationType)}%0A*Timeline:* ${encodeURIComponent(form.timeline)}%0A%0A*Creative Details:*%0A${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/265892236030?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <main>
      <Navbar onOpenContact={() => setContactOpen(true)} activePage="services" />
      <ContactDrawer isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Hero */}
      <section className="dept-hero">
        <div className="hero-grain" aria-hidden="true" />
        <div className="page-width dept-hero-inner">
          <div className="dept-badge-row">
            <span className="dept-code">CPD · Department 06</span>
            <span className="dept-status-pill">Active &amp; Accepting Creative Commissions</span>
          </div>
          <h1>
            Crafted for <em>lasting presence.</em>
          </h1>
          <p className="dept-hero-desc">
            Visual identities, publications, bulletins, and print collateral that honor your story with typographic discipline and thoughtful craft.
          </p>
          <div className="dept-hero-actions">
            <a className="button button-lime" href="#inquiry">
              Commission creative work <span aria-hidden="true">↓</span>
            </a>
            <Link className="button button-outline" href="/services">
              All departments <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="intro-strip">
        <div className="page-width intro-inner">
          <p>
            Whether on screen or in print, design should feel <span>intentional</span>, <span>durable</span>, and <span>crafted with pride</span>.
          </p>
          <div className="intro-stamp" aria-hidden="true">
            PELC<br />CPD<br />PRESS<span>✳</span>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-pad">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-mark">01</span> What CPD Produces</p>
              <h2>From branding systems to <em>impeccable print.</em></h2>
            </div>
            <div className="section-aside">
              <p>We handle every stage from conceptualization and typographic pacing to print pre-flight checks and digital export.</p>
            </div>
          </div>

          <div className="capabilities-grid">
            {capabilities.map((cap, i) => (
              <div className="capability-card" key={i}>
                <span className="cap-icon">{cap.icon}</span>
                <h3>{cap.title}</h3>
                <p>{cap.desc}</p>
              </div>
            ))}
          </div>

          <div className="tech-stack-box">
            <h4>Creative Disciplines &amp; Print Standards</h4>
            <div className="tech-chips">
              {designDisciplines.map((item) => (
                <span className="tech-chip" key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="inquiry-section section-pad" id="inquiry">
        <div className="page-width inquiry-layout">
          <div>
            <p className="eyebrow"><span className="eyebrow-mark">02</span> Start Your Project</p>
            <h2>Describe your <em>creative vision.</em></h2>
            <p className="inquiry-intro">
              Tell us what you are publishing, designing, or branding. We will advise on formats, typography, paper stocks, and digital outputs.
            </p>

            <div className="direct-channels">
              <div className="channel-box">
                <span className="channel-icon">✉</span>
                <div>
                  <strong>Email CPD Team</strong>
                  <a href="mailto:popeeadlegacycompany@gmail.com">popeeadlegacycompany@gmail.com</a>
                </div>
              </div>
              <div className="channel-box">
                <span className="channel-icon">☎</span>
                <div>
                  <strong>Direct Call</strong>
                  <a href="tel:0892236030">0892236030</a>
                </div>
              </div>
              <div className="channel-box">
                <span className="channel-icon">◉</span>
                <div>
                  <strong>WhatsApp</strong>
                  <a href="https://wa.me/265892236030" target="_blank" rel="noreferrer">+265 892 236 030</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="inquiry-card">
            {submitted ? (
              <div className="success-state">
                <span className="success-icon">✓</span>
                <h3>Creative brief received!</h3>
                <p>We received your inquiry for the Creative &amp; Publication Department. Our lead graphic designer will review your specifications and reach out with concepts.</p>
                <button
                  type="button"
                  className="button button-dark"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', phone: '', publicationType: 'branding', timeline: 'flexible', message: '' });
                  }}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="inquiry-header">
                  <h3>Creative &amp; Publication Inquiry</h3>
                  <p>Department: Creative &amp; Publication (CPD)</p>
                </div>

                {errorMessage && (
                  <div className="error-banner" role="alert">
                    {errorMessage}
                  </div>
                )}

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Tamanda Gondwe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. name@organization.org"
                      required
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="phone">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      id="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="e.g. 0892236030"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="publicationType">Project Category</label>
                    <select id="publicationType" value={form.publicationType} onChange={handleChange}>
                      <option value="branding">Brand Identity &amp; Logo System</option>
                      <option value="magazine">Magazine / Annual Report / Brochure</option>
                      <option value="church-bulletin">Church Bulletin / Ministry Publication</option>
                      <option value="event-collateral">Event Posters, Flyers &amp; Banners</option>
                      <option value="packaging">Packaging &amp; Merchandise Design</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="timeline">Desired Timeline</label>
                  <select id="timeline" value={form.timeline} onChange={handleChange}>
                    <option value="urgent">Urgent (Within 48-72 hours)</option>
                    <option value="one-week">1 - 2 weeks</option>
                    <option value="flexible">Flexible / Standard production</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Description &amp; Scope *</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about the project, required deliverables, existing branding assets, page count or dimensions..."
                    required
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="button button-dark"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending...' : 'Submit Inquiry →'}
                  </button>
                  <button
                    type="button"
                    className="button button-lime"
                    onClick={sendViaWhatsApp}
                  >
                    Send via WhatsApp ↗
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .dept-hero {
          min-height: 480px;
          position: relative;
          overflow: hidden;
          background: var(--forest-deep);
          color: white;
          padding: 85px 0 95px;
        }
        .dept-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 820px;
        }
        .dept-badge-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }
        .dept-code {
          padding: 4px 10px;
          background: var(--lime);
          color: var(--forest-deep);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          border-radius: 2px;
        }
        .dept-status-pill {
          color: #c0ccc3;
          font-size: 11px;
          letter-spacing: 0.5px;
        }
        .dept-hero h1 {
          margin: 0;
          font-size: clamp(44px, 6.2vw, 72px);
          line-height: 1.05;
          letter-spacing: -3.8px;
          font-weight: 620;
        }
        .dept-hero h1 em {
          color: var(--lime);
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 400;
        }
        .dept-hero-desc {
          max-width: 580px;
          margin: 22px 0 0;
          color: #c0ccc3;
          font-size: 15px;
          line-height: 1.85;
        }
        .dept-hero-actions {
          margin-top: 32px;
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }
        .capabilities-grid {
          margin-top: 50px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .capability-card {
          background: white;
          border: 1px solid var(--line);
          padding: 30px 26px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .capability-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(16, 43, 36, 0.06);
          border-color: #829b42;
        }
        .cap-icon {
          font-size: 28px;
          line-height: 1;
        }
        .capability-card h3 {
          margin: 0;
          font-size: 18px;
          letter-spacing: -0.4px;
          color: var(--ink);
          font-weight: 650;
        }
        .capability-card p {
          margin: 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.75;
        }
        .tech-stack-box {
          margin-top: 50px;
          padding: 35px 36px;
          background: #edefe5;
          border: 1px solid #dfe1d7;
        }
        .tech-stack-box h4 {
          margin: 0 0 16px;
          color: var(--forest);
          font-size: 13px;
          font-weight: 750;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tech-chip {
          padding: 6px 14px;
          background: white;
          border: 1px solid #dedfd5;
          border-radius: 20px;
          color: #3b463f;
          font-size: 11px;
          font-weight: 650;
        }
        .inquiry-section {
          background: #edefe5;
        }
        .inquiry-layout {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 8%;
          align-items: start;
        }
        .inquiry-intro {
          margin: 18px 0 28px;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.85;
          max-width: 440px;
        }
        .direct-channels {
          display: grid;
          gap: 12px;
          margin-top: 20px;
        }
        .channel-box {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: white;
          border: 1px solid var(--line);
        }
        .channel-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: var(--lime-soft);
          color: var(--forest-deep);
          font-weight: 800;
          font-size: 16px;
          flex-shrink: 0;
        }
        .channel-box strong {
          display: block;
          font-size: 12px;
          color: var(--ink);
        }
        .channel-box a {
          color: var(--muted);
          font-size: 11px;
          word-break: break-all;
        }
        .channel-box a:hover {
          color: var(--forest);
        }
        .inquiry-card {
          background: var(--paper);
          border: 1px solid #dfe1d7;
          padding: 36px 34px;
          box-shadow: 0 15px 40px rgba(36, 52, 40, 0.05);
        }
        .inquiry-header h3 {
          margin: 0;
          font-size: 22px;
          letter-spacing: -0.6px;
          color: var(--ink);
        }
        .inquiry-header p {
          margin: 4px 0 22px;
          color: #71836b;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-size: 11px;
          font-weight: 700;
          color: var(--ink);
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 11px 13px;
          border: 1px solid #dedfd5;
          background: white;
          border-radius: 3px;
          font-family: inherit;
          font-size: 12px;
          color: var(--ink);
          transition: border-color 0.2s ease;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #718e2b;
        }
        .form-actions {
          margin-top: 22px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .error-banner {
          padding: 10px 14px;
          background: #fee2e2;
          color: #991b1b;
          border-radius: 3px;
          font-size: 11px;
          margin-bottom: 16px;
        }
        .success-state {
          text-align: center;
          padding: 30px 10px;
        }
        .success-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--lime);
          color: var(--forest-deep);
          display: inline-grid;
          place-items: center;
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 16px;
        }
        .success-state h3 {
          margin: 0 0 8px;
          font-size: 22px;
          color: var(--ink);
        }
        .success-state p {
          max-width: 440px;
          margin: 0 auto 24px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.8;
        }
        @media (max-width: 1024px) {
          .capabilities-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .inquiry-layout {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }
        @media (max-width: 640px) {
          .capabilities-grid {
            grid-template-columns: 1fr;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
          .dept-hero h1 {
            font-size: clamp(38px, 10vw, 54px);
            letter-spacing: -2.5px;
          }
          .inquiry-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </main>
  );
}