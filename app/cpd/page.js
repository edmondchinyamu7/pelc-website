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
    </main>
  );
}