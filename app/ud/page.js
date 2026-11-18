'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ContactDrawer from '@/components/ContactDrawer';
import Footer from '@/components/Footer';

const capabilities = [
  {
    icon: '🎨',
    title: 'User Experience (UX) Research',
    desc: 'Deep user interviews, competitor benchmarking, journey mapping, and persona synthesis to ground every design decision in real user needs.',
  },
  {
    icon: '✨',
    title: 'User Interface (UI) Design',
    desc: 'Polished, modern visual design for web and mobile apps that creates intuitive navigation, clean visual hierarchy, and brand distinction.',
  },
  {
    icon: '🔄',
    title: 'Interactive Prototyping & Flow Testing',
    desc: 'High-fidelity clickable prototypes in Figma that allow stakeholders and testers to experience the product before writing a single line of code.',
  },
  {
    icon: '📚',
    title: 'Design Systems & Component Libraries',
    desc: 'Reusable tokens, buttons, typography standards, and atomic components that guarantee consistency across all your digital products.',
  },
  {
    icon: '🔍',
    title: 'UX Audits & Usability Optimization',
    desc: 'Comprehensive review of your existing product to pinpoint friction, reduce drop-offs, and elevate your user retention rates.',
  },
  {
    icon: '📱',
    title: 'Cross-Device Responsive Design',
    desc: 'Thoughtfully responsive interfaces crafted for smartphones, tablets, laptops, and ultra-wide displays.',
  },
];

const designTools = [
  'Figma', 'FigJam', 'Design Systems', 'Interactive Prototyping', 'Design Tokens',
  'Accessibility (WCAG)', 'Micro-Animations', 'User Journey Mapping'
];

export default function UD() {
  const [contactOpen, setContactOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: 'ui-ux-design', subject: '', message: '' });
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
          department: 'ud',
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
    const text = `*New Design Inquiry (UD)*%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Email:* ${encodeURIComponent(form.email)}%0A${form.phone ? `*Phone:* ${encodeURIComponent(form.phone)}%0A` : ''}*Project Type:* ${encodeURIComponent(form.projectType)}%0A*Subject:* ${encodeURIComponent(form.subject || 'UX/UI Design Project')}%0A%0A*Message:*%0A${encodeURIComponent(form.message)}`;
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
            <span className="dept-code">UD · Department 03</span>
            <span className="dept-status-pill">Active &amp; Accepting Projects</span>
          </div>
          <h1>
            Design with a <em>point of view.</em>
          </h1>
          <p className="dept-hero-desc">
            Clear, consistent visual identities and intuitive interfaces that help your brand feel unmistakably yours and effortlessly simple to use.
          </p>
          <div className="dept-hero-actions">
            <a className="button button-lime" href="#inquiry">
              Request design brief <span aria-hidden="true">↓</span>
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
            Good design is not decorative—it is how things work. We prioritize <span>clarity</span>, <span>accessibility</span>, and <span>subtle craft</span>.
          </p>
          <div className="intro-stamp" aria-hidden="true">
            NEOPAD<br />UD<br />STUDIO<span>✳</span>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-pad">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-mark">01</span> What UD Creates</p>
              <h2>Interfaces that captivate, <em>flows that convert.</em></h2>
            </div>
            <div className="section-aside">
              <p>We blend empirical user psychology with crisp aesthetic refinement to eliminate guesswork in your product roadmap.</p>
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
            <h4>Design Tooling &amp; UX Methodologies</h4>
            <div className="tech-chips">
              {designTools.map((tool) => (
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
            <p className="eyebrow"><span className="eyebrow-mark">02</span> Start Your Project</p>
            <h2>Bring your <em>design challenge.</em></h2>
            <p className="inquiry-intro">
              Whether you are redesigning an existing mobile app or designing a completely new SaaS dashboard, our design team is ready.
            </p>

            <div className="direct-channels">
              <div className="channel-box">
                <span className="channel-icon">✉</span>
                <div>
                  <strong>Email UD Team</strong>
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
                <h3>Design brief received!</h3>
                <p>We received your inquiry for the UX/UI Design Department. Our creative director will review your goals and get in touch with design timeline estimates.</p>
                <button
                  type="button"
                  className="button button-dark"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', phone: '', projectType: 'ui-ux-design', subject: '', message: '' });
                  }}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="inquiry-header">
                  <h3>UX/UI Design Inquiry</h3>
                  <p>Department: UX/UI Design (UD)</p>
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
                      placeholder="e.g. Maya Moyo"
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
                    <label htmlFor="projectType">Design Scope</label>
                    <select id="projectType" value={form.projectType} onChange={handleChange}>
                      <option value="ui-ux-design">Complete App / Web UI/UX Design</option>
                      <option value="redesign">Product Redesign &amp; Usability Revamp</option>
                      <option value="prototype">Interactive Prototype (Figma)</option>
                      <option value="design-system">Design System &amp; Component Library</option>
                      <option value="wireframes">Wireframes &amp; Information Architecture</option>
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
                    placeholder="Brief description of your product or idea"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Design Needs &amp; Target Audience *</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe who will use this product, your aesthetic vision, timeline, and reference inspirations..."
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