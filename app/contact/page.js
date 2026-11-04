'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa6';
import Navbar from '@/components/Navbar';
import ContactDrawer from '@/components/ContactDrawer';
import Footer from '@/components/Footer';
import SocialLinks from '@/components/SocialLinks';

export default function Contact() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hello! 👋 I'm <strong>PELC Assistant</strong>. How can I help you today? You can ask about our <strong>services</strong>, <strong>pricing</strong>, <strong>consultations</strong>, or how to reach Edmond and the team.",
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  // Inquiry Form state
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getAiResponse = (text) => {
    const t = text.toLowerCase().trim();

    if (/^(hi|hey|hello|good (morning|afternoon|evening)|howdy|yo|hola|sup)\b/i.test(t)) {
      return "Hello! 👋 Welcome to <strong>POPE EAD LEGACY COMPANY</strong>. How can I assist you today?<br><br>Feel free to ask about our <strong>web development</strong>, <strong>software</strong>, <strong>branding</strong>, or booking a <strong>consultation</strong>.";
    }

    if (/service|offer|what do you do/i.test(t)) {
      return "We deliver complete digital solutions across 6 specialized departments:<br><br>💻 <strong>Website Development (WDD)</strong><br>⚙️ <strong>Software Development (SDD)</strong><br>🎨 <strong>UX/UI Design (UD)</strong><br>📣 <strong>Advertisement (AD)</strong><br>📈 <strong>Marketing (MD)</strong><br>🖌️ <strong>Creative & Publications (CPD)</strong><br><br>Which department would you like to explore?";
    }

    if (t.includes('website') || t.includes('web dev')) {
      return "Our <strong>Website Development Department (WDD)</strong> builds fast, high-converting websites and e-commerce stores.<br><br>👉 <a href='/wdd' style='color:#718e2b;font-weight:700;'>Learn more about WDD</a>";
    }

    if (t.includes('software') || t.includes('app') || t.includes('mobile')) {
      return "Our <strong>Software Development Department (SDD)</strong> builds custom business software, mobile apps, and cloud APIs.<br><br>👉 <a href='/sdd' style='color:#718e2b;font-weight:700;'>Learn more about SDD</a>";
    }

    if (t.includes('design') || t.includes('ux') || t.includes('ui')) {
      return "Our <strong>UX/UI Design Department (UD)</strong> designs intuitive interfaces, prototypes in Figma, and design systems.<br><br>👉 <a href='/ud' style='color:#718e2b;font-weight:700;'>Learn more about UD</a>";
    }

    if (t.includes('price') || t.includes('cost') || t.includes('quote') || t.includes('how much') || t.includes('fee')) {
      return "Every project is scoped to your specific requirements and phased for budget predictability. You can book a free 15-minute consultation to get an exact scope and proposal.<br><br>👉 <a href='/consultation' style='color:#718e2b;font-weight:700;'>Book a Free Consultation</a>";
    }

    if (t.includes('location') || t.includes('where') || t.includes('based') || t.includes('malawi')) {
      return "📍 We are based in <strong>Malawi</strong> and collaborate with ambitious startups, businesses, and organizations worldwide.";
    }

    if (t.includes('contact') || t.includes('phone') || t.includes('email') || t.includes('whatsapp')) {
      return "You can reach us directly via:<br><br>📧 <strong>Email:</strong> <a href='mailto:popeeadlegacycompany@gmail.com' style='color:#718e2b;font-weight:700;'>popeeadlegacycompany@gmail.com</a><br>📞 <strong>Phone:</strong> <a href='tel:0892236030' style='color:#718e2b;font-weight:700;'>0892236030</a><br>💬 <strong>WhatsApp:</strong> <a href='https://wa.me/265892236030' target='_blank' style='color:#718e2b;font-weight:700;'>+265 892 236 030</a>";
    }

    if (t.includes('founder') || t.includes('owner') || t.includes('edmond') || t.includes('pope ead')) {
      return "PELC was founded by <strong>Edmond Chinyamu</strong> (Pope Ead), an engineer and creative director passionate about elevating African digital capability.";
    }

    return "Thank you for asking! For detailed questions or to review your specific project brief, you can message our team on WhatsApp or send an email to <a href='mailto:popeeadlegacycompany@gmail.com' style='color:#718e2b;font-weight:700;'>popeeadlegacycompany@gmail.com</a>.";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userText = input;
    setMessages((prev) => [...prev, { type: 'user', text: userText }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const reply = getAiResponse(userText);
      setMessages((prev) => [...prev, { type: 'bot', text: reply }]);
    }, 600);
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }
    setErrorMessage('');
    setStatus('sending');

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      formData.append('type', 'General Contact Form');

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
      setErrorMessage('Could not send automatically. Please reach us via WhatsApp or email directly below.');
    }
  };

  const sendViaWhatsApp = () => {
    if (!form.name.trim() || !form.message.trim()) {
      setErrorMessage('Please enter your name and message before launching WhatsApp.');
      return;
    }
    const text = `*New Contact Message – PELC*%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Email:* ${encodeURIComponent(form.email)}%0A${form.phone ? `*Phone:* ${encodeURIComponent(form.phone)}%0A` : ''}*Subject:* ${encodeURIComponent(form.subject || 'General Inquiry')}%0A%0A*Message:*%0A${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/265892236030?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <main>
      <Navbar onOpenContact={() => setSidebarOpen(true)} activePage="contact" />
      <ContactDrawer isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Hero */}
      <section className="contact-hero">
        <div className="hero-grain" aria-hidden="true" />
        <div className="page-width contact-hero-inner">
          <p className="eyebrow eyebrow-light">
            <span className="status-dot" /> Get in Touch · Direct Communication
          </p>
          <h1>
            Let’s start a <em>conversation.</em>
          </h1>
          <p className="contact-hero-desc">
            Have an idea, need technical direction, or want to explore working together? We’re always glad to connect and listen.
          </p>
          <div className="contact-hero-actions">
            <a className="button button-lime" href="#contact-channels">
              Direct Contact Options <span aria-hidden="true">↓</span>
            </a>
            <Link className="button button-outline" href="/consultation">
              Book a Consultation <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Channels Strip */}
      <section className="intro-strip" id="contact-channels">
        <div className="page-width intro-inner">
          <p>
            Fast replies on <span>WhatsApp</span>, detailed scopes by <span>email</span>, or in-person meetings in <span>Malawi</span>.
          </p>
          <div className="intro-stamp" aria-hidden="true">
            PELC<br />DIRECT<br />DESK<span>✳</span>
          </div>
        </div>
      </section>

      {/* Main Grid: Contact Channels + Form + AI Assistant */}
      <section className="section-pad">
        <div className="page-width">
          {/* 3 Channels Cards */}
          <div className="contact-channels-grid">
            <div className="channel-card">
              <span className="card-symbol"><FaEnvelope style={{ width: 18, height: 18 }} /></span>
              <h3>Email Us</h3>
              <p>For project proposals, formal scopes, and general inquiries.</p>
              <a className="card-link" href="mailto:popeeadlegacycompany@gmail.com">
                popeeadlegacycompany@gmail.com ↗
              </a>
            </div>

            <div className="channel-card">
              <span className="card-symbol"><FaPhone style={{ width: 18, height: 18 }} /></span>
              <h3>Call Direct</h3>
              <p>Monday to Friday, 8:00 AM – 6:00 PM CAT for voice discussions.</p>
              <a className="card-link" href="tel:0892236030">
                0892236030 ↗
              </a>
            </div>

            <div className="channel-card">
              <span className="card-symbol"><FaWhatsapp style={{ width: 20, height: 20 }} /></span>
              <h3>WhatsApp</h3>
              <p>Quick questions, instant voice notes, and fast consultations.</p>
              <a
                className="card-link"
                href="https://wa.me/265892236030"
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp (+265 892 236 030) ↗
              </a>
            </div>
          </div>

          {/* Form & Assistant Section */}
          <div className="contact-interaction-grid">
            {/* Contact Form */}
            <div className="contact-form-box">
              <div className="section-heading-sm">
                <p className="eyebrow"><span className="eyebrow-mark">01</span> Send a Message</p>
                <h2>Drop us a line</h2>
                <p>We read every message and reply within 24 hours.</p>
              </div>

              {submitted ? (
                <div className="success-state">
                  <span className="success-icon">✓</span>
                  <h3>Message sent!</h3>
                  <p>Thank you for reaching out. A member of our team will get back to you shortly.</p>
                  <button
                    type="button"
                    className="button button-dark"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  {errorMessage && (
                    <div className="error-banner" role="alert">
                      {errorMessage}
                    </div>
                  )}

                  <div className="form-grid-two">
                    <div className="form-group">
                      <label htmlFor="name">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={handleFormChange}
                        placeholder="e.g. Edmond Chinyamu"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={handleFormChange}
                        placeholder="e.g. name@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-grid-two">
                    <div className="form-group">
                      <label htmlFor="phone">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        id="phone"
                        value={form.phone}
                        onChange={handleFormChange}
                        placeholder="e.g. 0892236030"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        value={form.subject}
                        onChange={handleFormChange}
                        placeholder="What is this about?"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message *</label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={handleFormChange}
                      placeholder="How can we help your business?"
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="button button-dark"
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? 'Sending...' : 'Send Message →'}
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

            {/* Virtual Assistant Widget */}
            <div className="assistant-box">
              <div className="assistant-header">
                <div className="assistant-avatar">🤖</div>
                <div>
                  <h4>PELC Assistant</h4>
                  <span className="assistant-status">Online · Instant Answers</span>
                </div>
              </div>

              <div className="assistant-messages">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`chat-bubble ${msg.type === 'user' ? 'user-bubble' : 'bot-bubble'}`}
                  >
                    <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                  </div>
                ))}
                {typing && (
                  <div className="chat-bubble bot-bubble typing-indicator">
                    <span>•</span><span>•</span><span>•</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendMessage} className="assistant-input-bar">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about services, pricing, Malawi base..."
                />
                <button type="submit" aria-label="Send query">
                  →
                </button>
              </form>

              <div className="quick-questions">
                <small>Try asking:</small>
                <div className="chips-row">
                  <button type="button" onClick={() => setInput('What services do you offer?')}>
                    Services?
                  </button>
                  <button type="button" onClick={() => setInput('How much do you charge?')}>
                    Pricing?
                  </button>
                  <button type="button" onClick={() => setInput('Where are you based?')}>
                    Location?
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Community Presence Section */}
          <div className="social-presence-card">
            <div className="social-presence-header">
              <p className="eyebrow"><span className="eyebrow-mark">02</span> Official Social Channels</p>
              <h2>Connect &amp; Follow PELC</h2>
              <p>Stay informed with our newest software projects, open source tools, design insights, and masterclasses across all major platforms.</p>
            </div>
            <div className="social-presence-grid">
              <SocialLinks theme="light" size="lg" showLabels={true} />
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .contact-hero {
          min-height: 480px;
          position: relative;
          overflow: hidden;
          background: var(--forest-deep);
          color: white;
          padding: 85px 0 95px;
        }
        .contact-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 820px;
        }
        .contact-hero h1 {
          margin: 0;
          font-size: clamp(44px, 6.2vw, 72px);
          line-height: 1.05;
          letter-spacing: -3.8px;
          font-weight: 620;
        }
        .contact-hero h1 em {
          color: var(--lime);
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 400;
        }
        .contact-hero-desc {
          max-width: 580px;
          margin: 22px 0 0;
          color: #c0ccc3;
          font-size: 15px;
          line-height: 1.85;
        }
        .contact-hero-actions {
          margin-top: 32px;
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }
        .contact-channels-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 50px;
        }
        .channel-card {
          background: white;
          border: 1px solid var(--line);
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .channel-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(16, 43, 36, 0.06);
          border-color: #829b42;
        }
        .card-symbol {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--lime-soft);
          color: var(--forest-deep);
          display: grid;
          place-items: center;
          font-size: 18px;
          font-weight: 800;
        }
        .channel-card h3 {
          margin: 4px 0 0;
          font-size: 18px;
          color: var(--ink);
          font-weight: 650;
        }
        .channel-card p {
          margin: 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.7;
          flex-grow: 1;
        }
        .card-link {
          margin-top: 8px;
          color: var(--forest);
          font-size: 12px;
          font-weight: 750;
          word-break: break-all;
          transition: color 0.2s;
        }
        .card-link:hover {
          color: #718e2b;
        }
        .contact-interaction-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 36px;
          align-items: start;
        }
        .contact-form-box {
          background: var(--paper);
          border: 1px solid #dfe1d7;
          padding: 38px 36px;
          box-shadow: 0 15px 40px rgba(36, 52, 40, 0.04);
        }
        .section-heading-sm {
          margin-bottom: 24px;
        }
        .section-heading-sm h2 {
          margin: 0 0 6px;
          font-size: 28px;
          letter-spacing: -0.8px;
          color: var(--ink);
        }
        .section-heading-sm p:last-child {
          margin: 0;
          color: var(--muted);
          font-size: 12px;
        }
        .form-grid-two {
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
        .form-group textarea {
          width: 100%;
          padding: 11px 13px;
          border: 1px solid #dedfd5;
          background: white;
          border-radius: 3px;
          font-family: inherit;
          font-size: 12px;
          color: var(--ink);
        }
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #718e2b;
        }
        .form-actions {
          margin-top: 20px;
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
        /* Assistant Box */
        .assistant-box {
          background: white;
          border: 1px solid var(--line);
          display: flex;
          flex-direction: column;
          height: 560px;
          box-shadow: 0 15px 40px rgba(36, 52, 40, 0.04);
        }
        .assistant-header {
          padding: 18px 22px;
          background: #102b24;
          color: white;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .assistant-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--lime);
          color: var(--forest-deep);
          display: grid;
          place-items: center;
          font-size: 18px;
        }
        .assistant-header h4 {
          margin: 0;
          font-size: 14px;
        }
        .assistant-status {
          font-size: 10px;
          color: var(--lime);
          letter-spacing: 0.3px;
        }
        .assistant-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #f7f7f1;
        }
        .chat-bubble {
          max-width: 85%;
          padding: 12px 14px;
          font-size: 12px;
          line-height: 1.6;
          border-radius: 6px;
        }
        .bot-bubble {
          align-self: flex-start;
          background: white;
          color: var(--ink);
          border: 1px solid #dedfd5;
        }
        .user-bubble {
          align-self: flex-end;
          background: #102b24;
          color: white;
        }
        .typing-indicator span {
          display: inline-block;
          font-size: 16px;
          margin: 0 2px;
          animation: pulse 1s infinite alternate;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pulse {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        .assistant-input-bar {
          display: flex;
          border-top: 1px solid var(--line);
          background: white;
        }
        .assistant-input-bar input {
          flex: 1;
          padding: 13px 16px;
          border: 0;
          font-family: inherit;
          font-size: 12px;
          outline: none;
        }
        .assistant-input-bar button {
          width: 46px;
          border: 0;
          background: #102b24;
          color: var(--lime);
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }
        .quick-questions {
          padding: 10px 16px 14px;
          background: white;
          border-top: 1px solid #f0f1eb;
        }
        .quick-questions small {
          display: block;
          color: var(--muted);
          font-size: 10px;
          margin-bottom: 6px;
        }
        .chips-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .chips-row button {
          padding: 4px 10px;
          background: #f0f2ea;
          border: 1px solid #dfe1d7;
          border-radius: 12px;
          font-size: 10px;
          color: var(--forest);
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .chips-row button:hover {
          background: var(--lime-soft);
        }
        .social-presence-card {
          margin-top: 50px;
          background: white;
          border: 1px solid var(--line);
          padding: 38px 36px;
          box-shadow: 0 15px 40px rgba(36, 52, 40, 0.04);
        }
        .social-presence-header {
          margin-bottom: 24px;
        }
        .social-presence-header h2 {
          margin: 0 0 8px;
          font-size: 26px;
          letter-spacing: -0.7px;
          color: var(--ink);
        }
        .social-presence-header p:last-child {
          margin: 0;
          color: var(--muted);
          font-size: 13px;
          max-width: 680px;
          line-height: 1.6;
        }
        .social-presence-grid {
          margin-top: 20px;
        }
        @media (max-width: 1024px) {
          .contact-channels-grid {
            grid-template-columns: 1fr;
          }
          .contact-interaction-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .contact-hero h1 {
            font-size: clamp(38px, 10vw, 54px);
            letter-spacing: -2.5px;
          }
          .contact-form-box {
            padding: 24px 20px;
          }
          .form-grid-two {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}