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
      text: "Hello! 👋 I'm <strong>NEOPAD STUDIO Assistant</strong>. How can I help you today? You can ask about our <strong>services</strong>, <strong>pricing</strong>, <strong>consultations</strong>, or how to reach Edmond and the team.",
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
      return "Hello! 👋 Welcome to <strong>NEOPAD STUDIO</strong>, a creative digital and technology studio. How can I assist you today?<br><br>Feel free to ask about our <strong>web development</strong>, <strong>software</strong>, <strong>AI solutions</strong>, <strong>branding</strong>, or booking a <strong>consultation</strong>.";
    }

    if (/service|offer|what do you do/i.test(t)) {
      return "We deliver end-to-end digital solutions across specialized disciplines:<br><br>💻 <strong>Website Development (WDD)</strong><br>⚙️ <strong>Software &amp; App Development (SDD)</strong><br>🎨 <strong>UX/UI Design (UD)</strong><br>📣 <strong>Digital Advertising (AD)</strong><br>📈 <strong>Digital Marketing (MD)</strong><br>🖌️ <strong>Graphic Design &amp; Branding (CPD)</strong><br>🧠 <strong>AI Solutions &amp; Tech Consultancy</strong><br><br>Which area would you like to explore?";
    }

    if (t.includes('website') || t.includes('web dev')) {
      return "Our <strong>Website Development Department (WDD)</strong> builds fast, high-converting websites and e-commerce stores.<br><br>👉 <a href='/wdd' style='color:#9c7921;font-weight:700;'>Learn more about WDD</a>";
    }

    if (t.includes('software') || t.includes('app') || t.includes('mobile')) {
      return "Our <strong>Software Development Department (SDD)</strong> builds custom business software, mobile apps, and cloud APIs.<br><br>👉 <a href='/sdd' style='color:#9c7921;font-weight:700;'>Learn more about SDD</a>";
    }

    if (t.includes('design') || t.includes('ux') || t.includes('ui')) {
      return "Our <strong>UX/UI Design Department (UD)</strong> designs intuitive interfaces, prototypes in Figma, and design systems.<br><br>👉 <a href='/ud' style='color:#9c7921;font-weight:700;'>Learn more about UD</a>";
    }

    if (t.includes('ai') || t.includes('consult') || t.includes('transform')) {
      return "We deliver practical <strong>AI Solutions</strong>, <strong>Technology Consultancy</strong>, and <strong>Digital Transformation</strong> roadmaps.<br><br>👉 <a href='/consultation?project=ai' style='color:#9c7921;font-weight:700;'>Book a Consultation</a>";
    }

    if (t.includes('price') || t.includes('cost') || t.includes('quote') || t.includes('how much') || t.includes('fee')) {
      return "Every project is scoped to your specific requirements and phased for budget predictability. You can book a free 15-minute consultation to get an exact scope and proposal.<br><br>👉 <a href='/consultation' style='color:#9c7921;font-weight:700;'>Book a Free Consultation</a>";
    }

    if (t.includes('location') || t.includes('where') || t.includes('based') || t.includes('malawi')) {
      return "📍 We are based in <strong>Malawi</strong> and collaborate with ambitious startups, businesses, and institutions worldwide.";
    }

    if (t.includes('contact') || t.includes('phone') || t.includes('email') || t.includes('whatsapp')) {
      return "You can reach us directly via:<br><br>📧 <strong>Email:</strong> <a href='mailto:popeeadlegacycompany@gmail.com' style='color:#9c7921;font-weight:700;'>popeeadlegacycompany@gmail.com</a><br>📞 <strong>Phone:</strong> <a href='tel:0892236030' style='color:#9c7921;font-weight:700;'>0892236030</a><br>💬 <strong>WhatsApp:</strong> <a href='https://wa.me/265892236030' target='_blank' style='color:#9c7921;font-weight:700;'>+265 892 236 030</a>";
    }

    if (t.includes('founder') || t.includes('owner') || t.includes('edmond') || t.includes('novex') || t.includes('pope ead')) {
      return "NEOPAD STUDIO was founded by <strong>Edmond Chinyamu</strong>, an engineer and creative director passionate about helping businesses and institutions grow through technology and creativity.";
    }

    return "Thank you for asking! For detailed questions or to review your specific project brief, you can message our team on WhatsApp or send an email to <a href='mailto:popeeadlegacycompany@gmail.com' style='color:#9c7921;font-weight:700;'>popeeadlegacycompany@gmail.com</a>.";
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
    const text = `*New Contact Message – NEOPAD STUDIO*%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Email:* ${encodeURIComponent(form.email)}%0A${form.phone ? `*Phone:* ${encodeURIComponent(form.phone)}%0A` : ''}*Subject:* ${encodeURIComponent(form.subject || 'General Inquiry')}%0A%0A*Message:*%0A${encodeURIComponent(form.message)}`;
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
            NEOPAD<br />DIRECT<br />DESK<span>✳</span>
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
                  <h4>NEOPAD STUDIO Assistant</h4>
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
              <h2>Connect &amp; Follow NEOPAD STUDIO</h2>
              <p>Stay informed with our newest software projects, open source tools, design insights, and masterclasses across all major platforms.</p>
            </div>
            <div className="social-presence-grid">
              <SocialLinks theme="light" size="lg" showLabels={true} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}