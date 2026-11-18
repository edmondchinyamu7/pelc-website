'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ContactDrawer from '@/components/ContactDrawer';
import Footer from '@/components/Footer';

const capabilities = [
  {
    icon: '🌐',
    title: 'Custom Website Design & Development',
    desc: 'Bespoke websites tailored from the ground up to reflect your brand identity, communicate your message, and drive clear actions.',
  },
  {
    icon: '🛍️',
    title: 'High-Converting E-Commerce Stores',
    desc: 'Seamless shopping experiences with secure payment gateway integrations, inventory management, and fast mobile checkouts.',
  },
  {
    icon: '⚡',
    title: 'Web Applications & Portals',
    desc: 'Dynamic, feature-rich web applications built with modern frameworks that scale smoothly as your user base grows.',
  },
  {
    icon: '🧩',
    title: 'Content Management (CMS)',
    desc: 'User-friendly headless and traditional CMS setups (WordPress, Strapi, Sanity) that give your team total control over your content.',
  },
  {
    icon: '🚀',
    title: 'Performance & SEO Optimization',
    desc: 'Lightweight code, Core Web Vitals compliance, fast load times, and structured metadata for search visibility.',
  },
  {
    icon: '🛡️',
    title: 'Maintenance, Security & Support',
    desc: 'Ongoing security patches, uptime monitoring, backups, and feature improvements so your site is always performing.',
  },
];

const technologies = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js',
  'PostgreSQL', 'Shopify', 'WordPress', 'REST & GraphQL APIs', 'Vercel / Cloud Run'
];

export default function WDD() {
  const [contactOpen, setContactOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: 'business-site', subject: '', message: '' });
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
      setErrorMessage('Please fill in your name, email, and project details.');
      return;
    }
    setErrorMessage('');
    setStatus('sending');

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      formData.append('department', 'Website Development (WDD)');

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
      setErrorMessage('Please enter your name and project message before launching WhatsApp.');
      return;
    }
    const text = `*New Website Inquiry (WDD)*%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Email:* ${encodeURIComponent(form.email)}%0A${form.phone ? `*Phone:* ${encodeURIComponent(form.phone)}%0A` : ''}*Project Type:* ${encodeURIComponent(form.projectType)}%0A*Subject:* ${encodeURIComponent(form.subject || 'Website Project')}%0A%0A*Message:*%0A${encodeURIComponent(form.message)}`;
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
            <span className="dept-code">WDD · Department 01</span>
            <span className="dept-status-pill">Active &amp; Accepting Projects</span>
          </div>
          <h1>
            Websites that <em>work harder.</em>
          </h1>
          <p className="dept-hero-desc">
            We build fast, thoughtful websites that make it easy for the right people to understand what you do—and take the next step.
          </p>
          <div className="dept-hero-actions">
            <a className="button button-lime" href="#inquiry">
              Request a website quote <span aria-hidden="true">↓</span>
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
            Every line of code is written with purpose: <span>lightning speed</span>, <span>bulletproof stability</span>, and <span>compelling UX</span>.
          </p>
          <div className="intro-stamp" aria-hidden="true">
            NEOPAD<br />WDD<br />STUDIO<span>✳</span>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-pad">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-mark">01</span> What WDD Delivers</p>
              <h2>Tailored web solutions for <em>every stage.</em></h2>
            </div>
            <div className="section-aside">
              <p>From one-page launchpads to complex multi-currency e-commerce systems, we match the technology to your business goals.</p>
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

          {/* Tech Stack Banner */}
          <div className="tech-stack-box">
            <h4>Technology Stack &amp; Tools We Master</h4>
            <div className="tech-chips">
              {technologies.map((tech) => (
                <span className="tech-chip" key={tech}>{tech}</span>
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
            <h2>Tell us about your <em>website idea.</em></h2>
            <p className="inquiry-intro">
              Fill out the form below or start a direct chat on WhatsApp. We typically respond within 24 hours with an actionable roadmap.
            </p>

            <div className="direct-channels">
              <div className="channel-box">
                <span className="channel-icon">✉</span>
                <div>
                  <strong>Email WDD Team</strong>
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
                <h3>Thank you for reaching out!</h3>
                <p>We received your inquiry for the Website Development Department. A senior engineer will review your brief and get back to you shortly.</p>
                <button
                  type="button"
                  className="button button-dark"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', phone: '', projectType: 'business-site', subject: '', message: '' });
                  }}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="inquiry-header">
                  <h3>Website Project Inquiry</h3>
                  <p>Department: Website Development (WDD)</p>
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
                      placeholder="e.g. Kondwani Phiri"
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
                    <label htmlFor="projectType">Project Type</label>
                    <select id="projectType" value={form.projectType} onChange={handleChange}>
                      <option value="business-site">Business / Corporate Website</option>
                      <option value="e-commerce">E-Commerce Online Store</option>
                      <option value="web-app">Custom Web Application</option>
                      <option value="redesign">Website Redesign &amp; Speed Upgrade</option>
                      <option value="maintenance">Maintenance &amp; Support</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Brief summary of your project"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Description &amp; Requirements *</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your goals, target audience, timeline, or reference websites..."
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