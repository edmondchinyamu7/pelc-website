'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ContactDrawer from '@/components/ContactDrawer';
import Footer from '@/components/Footer';

const servicesList = [
  { id: 'website', icon: '🌐', label: 'Website Development', dept: 'WDD', desc: 'Custom website, redesign, or high-converting e-commerce store.' },
  { id: 'software', icon: '⚙️', label: 'Custom Software & Mobile App', dept: 'SDD', desc: 'Bespoke web platform, iOS/Android app, or internal tooling.' },
  { id: 'design', icon: '🎨', label: 'UX/UI & Brand Design', dept: 'UD', desc: 'Interface design, design systems, or brand visual identity.' },
  { id: 'advertising', icon: '📣', label: 'Paid Advertising', dept: 'AD', desc: 'Google, Meta, and LinkedIn targeted PPC ad campaigns.' },
  { id: 'marketing', icon: '📈', label: 'Organic Marketing & SEO', dept: 'MD', desc: 'SEO, content strategy, and long-term brand authority.' },
  { id: 'creative', icon: '🖌️', label: 'Graphic Design & Publications', dept: 'CPD', desc: 'Logos, brand guidelines, publications, and corporate collateral.' },
  { id: 'ai', icon: '🧠', label: 'AI Solutions & Tech Consultancy', dept: 'AI / DT', desc: 'AI automation, smart workflows, and technology advisory.' },
  { id: 'comprehensive', icon: '✨', label: 'Full Digital Transformation', dept: 'NEOPAD', desc: 'Comprehensive package combining multiple disciplines.' },
];

export default function Consultation() {
  const [contactOpen, setContactOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [form, setForm] = useState({
    project: '',
    audience: 'businesses',
    timeline: '1-3-months',
    budget: '500-1500',
    name: '',
    email: '',
    phone: '',
    additionalNotes: ''
  });
  const [status, setStatus] = useState('idle');
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const totalSteps = 4;
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  const handleNext = () => {
    setValidationError('');
    if (currentStep === 0) {
      if (!selectedService) {
        setValidationError('Please select a service category to continue.');
        return;
      }
    } else if (currentStep === 1) {
      if (!form.project.trim()) {
        setValidationError('Please describe your project or what you want to achieve.');
        return;
      }
    } else if (currentStep === 2) {
      if (!form.timeline || !form.budget) {
        setValidationError('Please select your preferred timeline and budget expectation.');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handlePrev = () => {
    setValidationError('');
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setValidationError('Please provide your name and email address.');
      return;
    }
    setValidationError('');
    setStatus('sending');

    try {
      const formData = new FormData();
      formData.append('service', selectedService);
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      formData.append('type', 'Consultation Booking');

      const res = await fetch('https://formspree.io/f/xyezboed', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        setSubmitted(true);
      } else {
        throw new Error('Failed');
      }
    } catch {
      setStatus('error');
      setValidationError('Could not send automatically. Please use the WhatsApp button below or email us directly.');
    }
  };

  const sendViaWhatsApp = () => {
    if (!form.name.trim()) {
      setValidationError('Please enter your name before connecting via WhatsApp.');
      return;
    }
    const serviceObj = servicesList.find((s) => s.id === selectedService);
    const serviceName = serviceObj ? serviceObj.label : 'General Digital Project';
    const text = `*New Consultation Request – NEOPAD STUDIO*%0A%0A*Service:* ${encodeURIComponent(serviceName)}%0A*Name:* ${encodeURIComponent(form.name)}%0A*Email:* ${encodeURIComponent(form.email)}%0A${form.phone ? `*Phone:* ${encodeURIComponent(form.phone)}%0A` : ''}*Timeline:* ${encodeURIComponent(form.timeline)}%0A*Budget Range:* ${encodeURIComponent(form.budget)}%0A%0A*Project Details:*%0A${encodeURIComponent(form.project)}`;
    window.open(`https://wa.me/265892236030?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <main>
      <Navbar onOpenContact={() => setContactOpen(true)} activePage="services" />
      <ContactDrawer isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Hero */}
      <section className="consult-hero">
        <div className="hero-grain" aria-hidden="true" />
        <div className="page-width consult-hero-inner">
          <p className="eyebrow eyebrow-light">
            <span className="status-dot" /> Project Discovery · No Pressure, Just Clarity
          </p>
          <h1>
            Start with a <em>consultation.</em>
          </h1>
          <p className="consult-hero-desc">
            Tell us about your project, your timeline, and where you want to go. We’ll review your goals and provide practical, direct advice with an actionable plan.
          </p>
        </div>
      </section>

      {/* Interactive Planner Wizard */}
      <section className="section-pad wizard-section">
        <div className="page-width wizard-container">
          {/* Progress Tracker */}
          <div className="wizard-progress-card">
            <div className="progress-info">
              <span>Step {currentStep + 1} of {totalSteps}</span>
              <strong>{progressPercent}% Complete</strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="step-labels">
              <span className={currentStep >= 0 ? 'step-active' : ''}>1. Service</span>
              <span className={currentStep >= 1 ? 'step-active' : ''}>2. Scope</span>
              <span className={currentStep >= 2 ? 'step-active' : ''}>3. Timeline &amp; Budget</span>
              <span className={currentStep >= 3 ? 'step-active' : ''}>4. Review &amp; Contact</span>
            </div>
          </div>

          {/* Form Wizard Card */}
          <div className="wizard-main-card">
            {submitted ? (
              <div className="success-consult">
                <span className="success-badge">✓</span>
                <h2>Consultation Booked!</h2>
                <p>
                  Thank you, <strong>{form.name || 'there'}</strong>. We have received your project details. Edmond Chinyamu and the NEOPAD STUDIO team will review your brief and follow up with available consultation slots.
                </p>
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link className="button button-dark" href="/">
                    Return Home <span aria-hidden="true">→</span>
                  </Link>
                  <a
                    className="button button-lime"
                    href="https://wa.me/265892236030"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Quick WhatsApp Follow-up ↗
                  </a>
                </div>
              </div>
            ) : (
              <div>
                {validationError && (
                  <div className="wizard-error-banner" role="alert">
                    <span>⚠</span> {validationError}
                  </div>
                )}

                {/* Step 1: Service Picker */}
                {currentStep === 0 && (
                  <div className="step-content">
                    <div className="step-header">
                      <span className="step-tag">STEP 01</span>
                      <h3>What kind of project are you planning?</h3>
                      <p>Select the department or discipline that best matches your primary goal.</p>
                    </div>

                    <div className="services-selector-grid">
                      {servicesList.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={`service-select-btn${selectedService === item.id ? ' is-selected' : ''}`}
                          onClick={() => {
                            setSelectedService(item.id);
                            setValidationError('');
                          }}
                        >
                          <span className="service-sel-icon">{item.icon}</span>
                          <div className="service-sel-text">
                            <span className="service-sel-dept">{item.dept}</span>
                            <strong>{item.label}</strong>
                            <small>{item.desc}</small>
                          </div>
                          <span className="service-sel-check">
                            {selectedService === item.id ? '✓' : '→'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Project Details */}
                {currentStep === 1 && (
                  <div className="step-content">
                    <div className="step-header">
                      <span className="step-tag">STEP 02</span>
                      <h3>Describe what you want to build or achieve</h3>
                      <p>Tell us the core problem you want to solve, or what success looks like.</p>
                    </div>

                    <div className="wizard-form-group">
                      <label htmlFor="project">Project Description &amp; Core Objective *</label>
                      <textarea
                        id="project"
                        rows={4}
                        value={form.project}
                        onChange={handleChange}
                        placeholder="e.g. We are a medical clinic in Lilongwe looking to launch an online booking and patient records portal..."
                        required
                      />
                    </div>

                    <div className="wizard-form-group">
                      <label htmlFor="audience">Who is your primary audience?</label>
                      <select id="audience" value={form.audience} onChange={handleChange}>
                        <option value="businesses">Businesses &amp; Corporate Clients (B2B)</option>
                        <option value="consumers">General Public / Individual Consumers (B2C)</option>
                        <option value="internal-team">Internal Staff &amp; Team Members</option>
                        <option value="nonprofit">Community, Church &amp; Non-Profit Members</option>
                        <option value="mixed">Mixed / Multiple Stakeholder Groups</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3: Timeline & Budget */}
                {currentStep === 2 && (
                  <div className="step-content">
                    <div className="step-header">
                      <span className="step-tag">STEP 03</span>
                      <h3>Timeline and resource planning</h3>
                      <p>Having a ballpark helps us recommend the most practical scope and phasing.</p>
                    </div>

                    <div className="wizard-grid-two">
                      <div className="wizard-form-group">
                        <label htmlFor="timeline">Desired Launch Timeline</label>
                        <select id="timeline" value={form.timeline} onChange={handleChange}>
                          <option value="urgent">Urgent (Within 2-4 weeks)</option>
                          <option value="1-3-months">1 to 3 months (Standard)</option>
                          <option value="3-6-months">3 to 6 months</option>
                          <option value="flexible">Flexible / Planning stage</option>
                        </select>
                      </div>

                      <div className="wizard-form-group">
                        <label htmlFor="budget">Estimated Investment Range</label>
                        <select id="budget" value={form.budget} onChange={handleChange}>
                          <option value="under-500">Starter (Under $500 / ~MK 800,000)</option>
                          <option value="500-1500">Growth ($500 - $1,500 / ~MK 800k - MK 2.5M)</option>
                          <option value="1500-5000">Expansion ($1,500 - $5,000 / ~MK 2.5M - MK 8M)</option>
                          <option value="above-5000">Enterprise ($5,000+ / Custom)</option>
                        </select>
                      </div>
                    </div>

                    <div className="wizard-form-group">
                      <label htmlFor="additionalNotes">Any specific features or technical requirements?</label>
                      <input
                        type="text"
                        id="additionalNotes"
                        value={form.additionalNotes}
                        onChange={handleChange}
                        placeholder="e.g. Needs Airtel Money / Mpamba integration, multi-language support..."
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Contact & Review */}
                {currentStep === 3 && (
                  <form onSubmit={handleSubmit} className="step-content">
                    <div className="step-header">
                      <span className="step-tag">STEP 04</span>
                      <h3>Your contact details</h3>
                      <p>Where should we send your consultation roadmap and meeting link?</p>
                    </div>

                    {/* Summary badge */}
                    <div className="consult-summary-box">
                      <div className="summary-row">
                        <span>Selected Service:</span>
                        <strong>{servicesList.find((s) => s.id === selectedService)?.label || selectedService}</strong>
                      </div>
                      <div className="summary-row">
                        <span>Timeline:</span>
                        <strong>{form.timeline}</strong>
                      </div>
                      <div className="summary-row">
                        <span>Budget Tier:</span>
                        <strong>{form.budget}</strong>
                      </div>
                    </div>

                    <div className="wizard-grid-two">
                      <div className="wizard-form-group">
                        <label htmlFor="name">Your Name *</label>
                        <input
                          type="text"
                          id="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Edmond Chinyamu"
                          required
                        />
                      </div>
                      <div className="wizard-form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="e.g. you@company.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="wizard-form-group">
                      <label htmlFor="phone">Phone / WhatsApp Number</label>
                      <input
                        type="tel"
                        id="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="e.g. 0892236030"
                      />
                    </div>

                    <div className="wizard-footer-buttons">
                      <button
                        type="button"
                        className="button button-outline"
                        style={{ color: 'var(--ink)', borderColor: '#e5dec9' }}
                        onClick={handlePrev}
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        className="button button-dark"
                        disabled={status === 'sending'}
                      >
                        {status === 'sending' ? 'Booking...' : 'Confirm Consultation Booking →'}
                      </button>
                      <button
                        type="button"
                        className="button button-lime"
                        onClick={sendViaWhatsApp}
                      >
                        Book via WhatsApp ↗
                      </button>
                    </div>
                  </form>
                )}

                {/* Navigation Buttons for Steps 0-2 */}
                {currentStep < 3 && (
                  <div className="wizard-nav-actions">
                    {currentStep > 0 && (
                      <button
                        type="button"
                        className="button button-outline"
                        style={{ color: 'var(--ink)', borderColor: '#e5dec9' }}
                        onClick={handlePrev}
                      >
                        ← Previous
                      </button>
                    )}
                    <button
                      type="button"
                      className="button button-dark"
                      onClick={handleNext}
                      style={{ marginLeft: currentStep === 0 ? 'auto' : '0' }}
                    >
                      Next Step →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}