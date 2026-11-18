'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ContactDrawer from '@/components/ContactDrawer';
import Footer from '@/components/Footer';

const capabilities = [
  {
    icon: '⚙️',
    title: 'Custom Business Software & Portals',
    desc: 'Bespoke operational tools, ERP modules, CRM systems, and management platforms engineered to match your workflow.',
  },
  {
    icon: '📱',
    title: 'iOS & Android Mobile Applications',
    desc: 'High-performance native and cross-platform apps designed for fluid mobile usability, offline support, and app store approval.',
  },
  {
    icon: '☁️',
    title: 'SaaS Platforms & Cloud Architecture',
    desc: 'Multi-tenant cloud applications built with secure user roles, subscription billing, and elastic horizontal scaling.',
  },
  {
    icon: '🔌',
    title: 'API Engineering & Systems Integration',
    desc: 'Secure REST and GraphQL APIs that connect your software to payment gateways, third-party services, and legacy databases.',
  },
  {
    icon: '🗄️',
    title: 'Database Architecture & Data Pipelines',
    desc: 'Relational and document database design with strict data integrity, automated backups, and low-latency queries.',
  },
  {
    icon: '🔄',
    title: 'Automated Testing & Maintenance',
    desc: 'CI/CD deployment pipelines, unit testing, performance benchmarking, and continuous uptime monitoring.',
  },
];

const technologies = [
  'React Native', 'Flutter', 'Node.js', 'TypeScript', 'Python',
  'PostgreSQL', 'Redis', 'Docker', 'REST & GraphQL', 'Google Cloud / AWS'
];

export default function SDD() {
  const [contactOpen, setContactOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: 'custom-software', subject: '', message: '' });
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
      setErrorMessage('Please fill in your name, email, and project details.');
      return;
    }
    setErrorMessage('');
    setStatus('sending');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          department: 'sdd',
          projectType: form.projectType,
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
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
      setErrorMessage('Please enter your name and project message before launching WhatsApp.');
      return;
    }
    const text = `*New Software Inquiry (SDD)*%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Email:* ${encodeURIComponent(form.email)}%0A${form.phone ? `*Phone:* ${encodeURIComponent(form.phone)}%0A` : ''}*Project Type:* ${encodeURIComponent(form.projectType)}%0A*Subject:* ${encodeURIComponent(form.subject || 'Software Project')}%0A%0A*Message:*%0A${encodeURIComponent(form.message)}`;
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
            <span className="dept-code">SDD · Department 02</span>
            <span className="dept-status-pill">Active &amp; Accepting Projects</span>
          </div>
          <h1>
            Software built <em>around you.</em>
          </h1>
          <p className="dept-hero-desc">
            Useful digital tools, internal platforms, and mobile apps shaped around your team, your customers, and the way your business runs.
          </p>
          <div className="dept-hero-actions">
            <a className="button button-lime" href="#inquiry">
              Request software proposal <span aria-hidden="true">↓</span>
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
            From workflow bottlenecks to scalable customer apps, we engineer <span>robust software</span> that pays for itself.
          </p>
          <div className="intro-stamp" aria-hidden="true">
            NEOPAD<br />SDD<br />ENGINE<span>✳</span>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-pad">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-mark">01</span> What SDD Builds</p>
              <h2>Engineered for reliability, <em>designed for scale.</em></h2>
            </div>
            <div className="section-aside">
              <p>We write clean, documented code and build architectures that allow your business to grow without friction.</p>
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
            <h4>Software Stack &amp; Frameworks We Rely On</h4>
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
            <h2>Describe your <em>software challenge.</em></h2>
            <p className="inquiry-intro">
              Whether you are automating manual work, designing a mobile app, or modernizing older systems, our engineering team is ready to assist.
            </p>

            <div className="direct-channels">
              <div className="channel-box">
                <span className="channel-icon">✉</span>
                <div>
                  <strong>Email SDD Team</strong>
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
                <h3>Proposal request received!</h3>
                <p>We received your inquiry for the Software Development Department. Our tech lead will review your specifications and schedule a preliminary briefing.</p>
                <button
                  type="button"
                  className="button button-dark"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', phone: '', projectType: 'custom-software', subject: '', message: '' });
                  }}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="inquiry-header">
                  <h3>Software Project Inquiry</h3>
                  <p>Department: Software Development (SDD)</p>
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
                      placeholder="e.g. Chisomo Banda"
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
                    <label htmlFor="projectType">Application Type</label>
                    <select id="projectType" value={form.projectType} onChange={handleChange}>
                      <option value="custom-software">Custom Business Software</option>
                      <option value="mobile-app">iOS / Android Mobile App</option>
                      <option value="saas-platform">SaaS Web Application</option>
                      <option value="api-integration">API &amp; Systems Integration</option>
                      <option value="automation">Internal Workflow Automation</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject / Project Title</label>
                  <input
                    type="text"
                    id="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Brief description of the app or tool"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Functional Requirements &amp; Goals *</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what users will do in the software, current pain points, timeline, or preferred platforms..."
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