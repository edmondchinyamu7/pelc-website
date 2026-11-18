'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ContactDrawer from '@/components/ContactDrawer';
import Footer from '@/components/Footer';

const capabilities = [
  {
    icon: '🔍',
    title: 'Search Engine Optimization (SEO)',
    desc: 'Technical site audits, keyword gap analysis, on-page optimization, and authoritative backlink strategies to rank high on search engines.',
  },
  {
    icon: '📝',
    title: 'Content Strategy & Editorial Publishing',
    desc: 'Thoughtful articles, case studies, guides, and thought leadership pieces that establish trust and educate your audience.',
  },
  {
    icon: '📱',
    title: 'Social Media Management & Growth',
    desc: 'Consistent editorial calendars, community engagement, and brand storytelling across LinkedIn, Facebook, Instagram, and X.',
  },
  {
    icon: '✉️',
    title: 'Email Marketing & Customer Lifecycle',
    desc: 'Automated welcome flows, client newsletters, and lead-nurturing campaigns that turn subscribers into repeat customers.',
  },
  {
    icon: '🧭',
    title: 'Brand Positioning & Core Messaging',
    desc: 'Clarifying what you stand for, who you serve best, and how to communicate your distinct value so customers choose you over alternatives.',
  },
  {
    icon: '📊',
    title: 'Performance Analytics & Market Insights',
    desc: 'In-depth reporting that tracks customer acquisition costs, lifetime value, and organic traffic trajectory over time.',
  },
];

const marketingTools = [
  'Technical SEO', 'Keyword Research', 'Content Strategy', 'Social Media Management',
  'Email Marketing', 'Brand Messaging', 'Google Analytics 4', 'Audience Research'
];

export default function MD() {
  const [contactOpen, setContactOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', serviceInterest: 'seo', currentStage: 'growing', message: '' });
  const [status, setStatus] = useState('idle');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage('Please fill in your name, email, and marketing goals.');
      return;
    }
    setErrorMessage('');
    setStatus('sending');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          department: 'md',
          projectType: `${form.serviceInterest} (${form.currentStage})`,
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: `Marketing Inquiry: ${form.serviceInterest}`,
          message: form.message,
        }),
      });

      const payload = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('success');
        setSubmitted(true);
      } else {
        throw new Error(payload.error || 'Failed to send');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error && err.message && err.message !== 'Failed to send'
          ? err.message
          : 'Could not send message automatically. Please reach out via WhatsApp or email directly below.',
      );
    }
  };

  const sendViaWhatsApp = () => {
    if (!form.name.trim() || !form.message.trim()) {
      setErrorMessage('Please enter your name and marketing goals before launching WhatsApp.');
      return;
    }
    const text = `*New Marketing Inquiry (MD)*%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Email:* ${encodeURIComponent(form.email)}%0A${form.phone ? `*Phone:* ${encodeURIComponent(form.phone)}%0A` : ''}*Service Focus:* ${encodeURIComponent(form.serviceInterest)}%0A*Business Stage:* ${encodeURIComponent(form.currentStage)}%0A%0A*Goals:*%0A${encodeURIComponent(form.message)}`;
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
            <span className="dept-code">MD · Department 05</span>
            <span className="dept-status-pill">Active &amp; Accepting Strategy Retainers</span>
          </div>
          <h1>
            Get the word <em>out.</em>
          </h1>
          <p className="dept-hero-desc">
            Bring the right people to your business with considered marketing, organic search visibility, and ongoing creative storytelling.
          </p>
          <div className="dept-hero-actions">
            <a className="button button-lime" href="#inquiry">
              Request marketing plan <span aria-hidden="true">↓</span>
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
            Real marketing is about <span>trust</span>, <span>resonance</span>, and <span>consistent presence</span> that creates durable organic equity.
          </p>
          <div className="intro-stamp" aria-hidden="true">
            NEOPAD<br />MD<br />GROWTH<span>✳</span>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-pad">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-mark">01</span> What MD Delivers</p>
              <h2>Sustainable growth through <em>clear narrative.</em></h2>
            </div>
            <div className="section-aside">
              <p>We help businesses communicate clearly, establish topical authority, and nurture audiences that stay loyal over years.</p>
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
            <h4>Strategic Frameworks &amp; Core Disciplines</h4>
            <div className="tech-chips">
              {marketingTools.map((tool) => (
                <span className="tech-chip" key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="inquiry-section section-pad" id="inquiry">
        <div className="page-width inquiry-layout">
          <div>
            <p className="eyebrow"><span className="eyebrow-mark">02</span> Start Your Growth Plan</p>
            <h2>Tell us about your <em>market &amp; vision.</em></h2>
            <p className="inquiry-intro">
              Whether you are preparing a major product launch or seeking steady month-over-month inbound customer acquisition, we are here to help.
            </p>

            <div className="direct-channels">
              <div className="channel-box">
                <span className="channel-icon">✉</span>
                <div>
                  <strong>Email MD Team</strong>
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
                <h3>Marketing brief received!</h3>
                <p>We received your inquiry for the Marketing Department. Our brand and growth strategist will analyze your current presence and propose a tailored direction.</p>
                <button
                  type="button"
                  className="button button-dark"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', phone: '', serviceInterest: 'seo', currentStage: 'growing', message: '' });
                  }}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="inquiry-header">
                  <h3>Marketing &amp; Growth Inquiry</h3>
                  <p>Department: Marketing (MD)</p>
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
                      placeholder="e.g. Alinane Mwale"
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
                      placeholder="e.g. name@company.com"
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
                    <label htmlFor="serviceInterest">Primary Focus</label>
                    <select id="serviceInterest" value={form.serviceInterest} onChange={handleChange}>
                      <option value="seo">Search Engine Optimization (SEO)</option>
                      <option value="content-strategy">Content &amp; Article Publishing</option>
                      <option value="social-media">Social Media Strategy &amp; Growth</option>
                      <option value="email-marketing">Email Marketing &amp; Retention</option>
                      <option value="full-marketing">Full Omnichannel Marketing Retainer</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="currentStage">Current Business Stage</label>
                  <select id="currentStage" value={form.currentStage} onChange={handleChange}>
                    <option value="startup">Early-stage Startup / New Launch</option>
                    <option value="growing">Established &amp; Scaling</option>
                    <option value="rebranding">Rebranding or Market Repositioning</option>
                    <option value="enterprise">Established Enterprise / Corporate</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Goals &amp; Current Audience *</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your target demographic, current marketing challenges, and what success looks like in 6 months..."
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