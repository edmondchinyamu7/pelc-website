'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ContactDrawer from '@/components/ContactDrawer';
import Footer from '@/components/Footer';

const capabilities = [
  {
    icon: '🎯',
    title: 'Targeted Google Search & Display Ads',
    desc: 'Capture high-intent prospects precisely when they are searching for your solutions with keyword optimization and smart bidding.',
  },
  {
    icon: '📱',
    title: 'Meta (Facebook & Instagram) Advertising',
    desc: 'Visually compelling ad formats, lookalike audiences, and granular demographic targeting that bring your brand to relevant feeds.',
  },
  {
    icon: '💼',
    title: 'LinkedIn B2B Lead Generation',
    desc: 'Target key decision-makers by job title, company size, and industry to generate high-value commercial pipelines.',
  },
  {
    icon: '✍️',
    title: 'Creative Ad Copywriting & Concepting',
    desc: 'High-converting hooks, persuasive headlines, and benefit-driven copy that cut through the noise and drive clicks.',
  },
  {
    icon: '📊',
    title: 'Conversion Rate Optimization (CRO)',
    desc: 'Landing page audits and post-click journey refinement so that ad traffic converts into registered leads and paying clients.',
  },
  {
    icon: '📈',
    title: 'A/B Testing & Transparent Analytics',
    desc: 'Continuous split-testing of creative angles, audiences, and calls-to-action with clear reporting on cost per lead and ROAS.',
  },
];

const platforms = [
  'Google Ads', 'Meta Ads Manager', 'LinkedIn Campaign Manager', 'TikTok Ads',
  'YouTube Ads', 'Google Tag Manager', 'GA4 Analytics', 'Remarketing Pixels'
];

export default function AD() {
  const [contactOpen, setContactOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', campaignType: 'google-ads', budget: 'under-500', message: '' });
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
      setErrorMessage('Please fill in your name, email, and advertising goals.');
      return;
    }
    setErrorMessage('');
    setStatus('sending');

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      formData.append('department', 'Advertisement (AD)');

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
      setErrorMessage('Please enter your name and campaign goals before launching WhatsApp.');
      return;
    }
    const text = `*New Ad Campaign Inquiry (AD)*%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Email:* ${encodeURIComponent(form.email)}%0A${form.phone ? `*Phone:* ${encodeURIComponent(form.phone)}%0A` : ''}*Campaign Focus:* ${encodeURIComponent(form.campaignType)}%0A*Estimated Monthly Budget:* ${encodeURIComponent(form.budget)}%0A%0A*Goals:*%0A${encodeURIComponent(form.message)}`;
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
            <span className="dept-code">AD · Department 04</span>
            <span className="dept-status-pill">Active &amp; Accepting Campaigns</span>
          </div>
          <h1>
            Campaigns that <em>command attention.</em>
          </h1>
          <p className="dept-hero-desc">
            Bring the right people to your business with considered, data-driven advertising that turns ad spend into measurable revenue.
          </p>
          <div className="dept-hero-actions">
            <a className="button button-lime" href="#inquiry">
              Plan an ad campaign <span aria-hidden="true">↓</span>
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
            We eliminate wasted ad spend through <span>rigorous targeting</span>, <span>persuasive copy</span>, and <span>daily optimization</span>.
          </p>
          <div className="intro-stamp" aria-hidden="true">
            NEOPAD<br />AD<br />SCALE<span>✳</span>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-pad">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-mark">01</span> What AD Manages</p>
              <h2>High-ROI advertising <em>across all channels.</em></h2>
            </div>
            <div className="section-aside">
              <p>We treat every marketing dollar as an investment, optimizing for conversions and cost per customer acquisition.</p>
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
            <h4>Ad Networks &amp; Attribution Platforms</h4>
            <div className="tech-chips">
              {platforms.map((plat) => (
                <span className="tech-chip" key={plat}>{plat}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="inquiry-section section-pad" id="inquiry">
        <div className="page-width inquiry-layout">
          <div>
            <p className="eyebrow"><span className="eyebrow-mark">02</span> Start Your Campaign</p>
            <h2>Discuss your <em>growth objectives.</em></h2>
            <p className="inquiry-intro">
              Share your business goals and current advertising challenges. We’ll design a strategy that reaches your ideal customers.
            </p>

            <div className="direct-channels">
              <div className="channel-box">
                <span className="channel-icon">✉</span>
                <div>
                  <strong>Email AD Team</strong>
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
                <h3>Ad brief received!</h3>
                <p>We received your campaign inquiry for the Advertisement Department. A paid media strategist will review your goals and prepare a budget and audience breakdown.</p>
                <button
                  type="button"
                  className="button button-dark"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', phone: '', campaignType: 'google-ads', budget: 'under-500', message: '' });
                  }}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="inquiry-header">
                  <h3>Advertising Campaign Inquiry</h3>
                  <p>Department: Advertisement (AD)</p>
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
                      placeholder="e.g. Grace Chirwa"
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
                    <label htmlFor="campaignType">Primary Platform</label>
                    <select id="campaignType" value={form.campaignType} onChange={handleChange}>
                      <option value="google-ads">Google Search &amp; Display Ads</option>
                      <option value="meta-ads">Meta (Facebook &amp; Instagram) Ads</option>
                      <option value="linkedin-ads">LinkedIn B2B Campaigns</option>
                      <option value="multi-channel">Multi-Channel Omnipresence</option>
                      <option value="retargeting">Retargeting &amp; Funnel Optimization</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Monthly Advertising Budget</label>
                  <select id="budget" value={form.budget} onChange={handleChange}>
                    <option value="under-500">Under $500 / ~MK 800,000</option>
                    <option value="500-1500">$500 - $1,500 / ~MK 800,000 - MK 2.5M</option>
                    <option value="1500-5000">$1,500 - $5,000 / ~MK 2.5M - MK 8M</option>
                    <option value="above-5000">$5,000+ / Custom Enterprise</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Campaign Goals &amp; Offering *</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what product or service you are advertising, your target geography, and your primary KPI..."
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