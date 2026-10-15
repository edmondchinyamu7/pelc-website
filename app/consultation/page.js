'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '600', '700', '800'] });

export default function Consultation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [service, setService] = useState('');
  const [form, setForm] = useState({
    project: '',
    audience: '',
    timeline: '',
    budget: '',
    name: '',
    email: '',
    phone: ''
  });
  const [status, setStatus] = useState('idle');
  const [consultationMessage, setConsultationMessage] = useState('');

  useEffect(() => {
    if (sidebarOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [sidebarOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setSidebarOpen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const totalSteps = 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const services = [
    { icon: '🌐', label: 'Website Development', value: 'Website Development', desc: 'Build a modern website for your project.' },
    { icon: '📱', label: 'App Development', value: 'App Development', desc: 'Create mobile or web applications.' },
    { icon: '📢', label: 'Advertising', value: 'Advertising', desc: 'Promote your business or organization.' },
    { icon: '📈', label: 'Marketing', value: 'Marketing', desc: 'Grow your audience and reach customers.' },
    { icon: '🎨', label: 'Graphic Design', value: 'Graphic Design', desc: 'Create professional visual designs.' },
    { icon: '🤖', label: 'AI Solutions', value: 'AI Solutions', desc: 'Explore AI-powered digital solutions.' },
    { icon: '💎', label: 'Branding', value: 'Branding', desc: 'Build a strong identity for your brand.' },
    { icon: '✨', label: 'Something Else', value: 'Other', desc: 'Tell PELC what you need.' }
  ];

  const nextStep = () => {
    if (currentStep === 0 && !service) return alert('Please select a service first.');
    if (currentStep === 1) {
      if (!form.project.trim()) return alert('Please describe your project.');
      if (!form.audience) return alert('Please select who the project is for.');
    }
    if (currentStep === 2) {
      if (!form.timeline || !form.budget) return alert('Please complete the project preferences.');
    }
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const buildMessage = () => {
    const msg = `PELC FREE CONSULTATION
==============================
SERVICE:
${service}

PROJECT:
${form.project}

WHO IS IT FOR?
${form.audience}

TIMELINE:
${form.timeline}

BUDGET:
${form.budget}

CLIENT INFORMATION

NAME:
${form.name}

EMAIL:
${form.email}

PHONE / WHATSAPP:
${form.phone}

==============================
Submitted through the PELC website.`;
    return msg;
  };

  const showSummary = () => {
    if (!form.name.trim()) return alert('Please enter your name.');
    if (!form.email.trim()) return alert('Please enter your email.');
    if (!form.phone.trim()) return alert('Please enter your phone or WhatsApp number.');
    setCurrentStep(4);
  };

  const submitConsultation = async () => {
    setStatus('loading');
    try {
      const formData = new FormData();
      formData.append('service', service);
      formData.append('project', form.project);
      formData.append('audience', form.audience);
      formData.append('timeline', form.timeline);
      formData.append('budget', form.budget);
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('_subject', 'New PELC Free Consultation');
      formData.append('message', buildMessage());
      formData.append('_replyto', form.email);

      const res = await fetch('https://formspree.io/f/xyezboed', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (!res.ok) throw new Error('Failed');
      setConsultationMessage(buildMessage());
      setStatus('success');
      setTimeout(() => setCurrentStep(5), 700);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const openWhatsApp = () => {
    const msg = consultationMessage || buildMessage();
    window.open(`https://wa.me/265892236030?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className={montserrat.className}>
      <style jsx global>{`
        :root {
          --bg-dark: #070d1f;
          --bg-dark-blue: #0b152c;
          --gold-primary: #e5b740;
          --text-white: #ffffff;
          --text-gray: #b3b9c9;
          --font-main: 'Montserrat', sans-serif;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: var(--font-main); background: #070707; color: #fff; min-height: 100vh; display: flex; flex-direction: column; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        a { text-decoration: none; }
        ul { list-style: none; padding: 0; margin: 0; }

        /* NAVBAR */
        .navbar { width: 100%; height: 70px; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; background: #111; position: relative; z-index: 100; }
        .navbar .logo { color: #d4af37; font-size: 24px; font-weight: bold; }
        .nav-links { display: flex; gap: 30px; align-items: center; }
        .nav-links a { color: white; font-size: 17px; transition: color 0.3s ease; }
        .nav-links a:hover { color: #d4af37; }

        /* SIDEBAR */
        .sidebar-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); z-index: 998; opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease; }
        .sidebar-overlay.active { opacity: 1; visibility: visible; }
        .contact-sidebar { position: fixed; top: 0; right: -400px; width: 350px; height: 100vh; background-color: var(--bg-dark); color: var(--text-white); z-index: 999; box-shadow: -5px 0 15px rgba(0,0,0,0.5); display: flex; flex-direction: column; transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); overflow-y: auto; }
        .contact-sidebar.active { right: 0; }
        .sidebar-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid rgba(229, 183, 64, 0.3); background: linear-gradient(135deg, var(--bg-dark-blue) 0%, var(--bg-dark) 100%); }
        .sidebar-header h2 { color: var(--gold-primary); font-size: 1.2rem; font-weight: 700; }
        .close-btn { background: none; border: none; color: var(--text-white); font-size: 2rem; cursor: pointer; line-height: 1; transition: color 0.3s ease, transform 0.3s ease; }
        .close-btn:hover { color: var(--gold-primary); transform: rotate(90deg); }
        .sidebar-content { padding: 30px 20px; display: flex; flex-direction: column; gap: 25px; }
        .sidebar-content p { color: var(--text-gray); font-size: 0.9rem; margin-bottom: 10px; }
        .sidebar-content .contact-item { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; cursor: pointer; padding: 10px; border-radius: 8px; transition: background-color 0.3s ease; }
        .sidebar-content .contact-item:hover { background-color: rgba(229, 183, 64, 0.1); }
        .sidebar-content .contact-icon { width: 45px; height: 45px; background-color: var(--gold-primary); border-radius: 50%; display: flex; justify-content: center; align-items: center; flex-shrink: 0; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s; }
        .sidebar-content .contact-item:hover .contact-icon { transform: translateY(-3px) scale(1.05); box-shadow: 0 4px 12px rgba(229, 183, 64, 0.4); }
        .sidebar-content .contact-icon svg.email-icon { fill: var(--bg-dark); width: 22px; height: 22px; }
        .sidebar-content .contact-icon svg.phone-icon { fill: var(--bg-dark); width: 22px; height: 22px; }
        .sidebar-content .contact-icon svg.whatsapp-icon { width: 100%; height: 100%; }
        .sidebar-content .contact-info h4 { color: var(--text-white); font-size: 0.9rem; font-weight: 600; margin-bottom: 2px; }
        .sidebar-content .contact-info a { color: var(--text-gray); font-size: 0.8rem; word-break: break-all; }
        .sidebar-content .contact-info a:hover { color: var(--gold-primary); }
        .sidebar-see-more { margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(229, 183, 64, 0.3); list-style: none; }
        .see-more-btn { display: inline-flex; align-items: center; gap: 8px; color: var(--gold-primary); font-size: 14px; font-weight: 600; padding: 10px 15px; border: 1px solid var(--gold-primary); border-radius: 6px; transition: all 0.3s ease; }
        .see-more-btn:hover { background-color: var(--gold-primary); color: var(--bg-dark); transform: translateX(5px); }
        .sidebar-socials { margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(229, 183, 64, 0.3); }
        .sidebar-socials h4 { color: var(--gold-primary); font-size: 0.9rem; margin-bottom: 15px; }
        .sidebar-socials .social-icons { display: flex; gap: 15px; }
        .sidebar-socials .social-icons a { display: flex; justify-content: center; align-items: center; width: 40px; height: 40px; border-radius: 50%; overflow: hidden; transition: transform 0.4s; }
        .sidebar-socials .social-icons a svg { width: 100%; height: 100%; display: block; }
        .sidebar-socials .social-icons a:hover { transform: translateY(-5px) scale(1.1); box-shadow: 0 5px 15px rgba(229, 183, 64, 0.5); }

        /* MAIN */
        .container { width: 92%; max-width: 850px; margin: 55px auto; flex: 1; }
        .header { text-align: center; margin-bottom: 40px; }
        .header h1 { font-size: clamp(32px, 6vw, 55px); margin-bottom: 15px; }
        .header h1 span { color: #d4af37; }
        .header p { color: #999; line-height: 1.7; }

        .progress-area { margin-bottom: 30px; }
        .progress-bar { height: 5px; background: #242424; border-radius: 20px; overflow: hidden; }
        .progress { height: 100%; background: #d4af37; transition: .5s ease; }
        .step-text { text-align: right; color: #888; font-size: 13px; margin-top: 8px; }

        .card { background: #111; border: 1px solid rgba(212, 175, 55, .2); border-radius: 22px; padding: 35px; box-shadow: 0 20px 70px rgba(0, 0, 0, .5); }
        .step { display: none; animation: slide .45s ease; }
        .step.active { display: block; }
        @keyframes slide { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        .step h2 { margin-bottom: 10px; }
        .step-description { color: #999; margin-bottom: 25px; }

        .options { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
        .option { background: #171717; border: 1px solid #333; border-radius: 15px; padding: 20px; cursor: pointer; transition: .3s; }
        .option:hover { transform: translateY(-4px); border-color: #d4af37; }
        .option.selected { background: rgba(212, 175, 55, .12); border-color: #d4af37; box-shadow: 0 0 20px rgba(212, 175, 55, .08); }
        .icon { font-size: 28px; margin-bottom: 10px; }
        .option h3 { margin-bottom: 6px; font-size: 1.1rem; }
        .option p { color: #888; font-size: 13px; line-height: 1.5; }

        label { display: block; color: #bbb; font-size: 14px; margin-bottom: 6px; }
        input, textarea, select { width: 100%; padding: 15px; margin-bottom: 20px; border: 1px solid #333; background: #191919; color: #fff; border-radius: 10px; outline: none; font-size: 15px; font-family: inherit; }
        input:focus, textarea:focus, select:focus { border-color: #d4af37; }
        textarea { min-height: 140px; resize: vertical; }

        .buttons { display: flex; justify-content: space-between; gap: 12px; margin-top: 25px; }
        button { border: 0; padding: 14px 25px; border-radius: 10px; cursor: pointer; font-weight: bold; transition: .3s; font-family: inherit; font-size: 15px; }
        .next { background: #d4af37; color: #000; }
        .next:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(212, 175, 55, .25); }
        .back { background: #252525; color: #fff; }
        .back:hover { background: #333; }
        button:disabled { opacity: .6; cursor: not-allowed; }

        .summary { background: #171717; border-radius: 15px; padding: 20px; }
        .summary-row { display: flex; justify-content: space-between; gap: 20px; padding: 13px 0; border-bottom: 1px solid #292929; }
        .summary-row:last-child { border-bottom: none; }
        .summary-row span:first-child { color: #888; }
        .summary-row span:last-child { text-align: right; max-width: 60%; overflow-wrap: anywhere; }

        .status { display: none; padding: 13px; border-radius: 8px; margin-top: 15px; text-align: center; }
        .status.loading { display: block; background: #29230d; color: #d4af37; }
        .status.error { display: block; background: #351515; color: #ff9b9b; }
        .status.success { display: block; background: #102a17; color: #7cff9b; }

        .success-block { text-align: center; padding: 30px 10px; }
        .success-icon { font-size: 65px; margin-bottom: 20px; }
        .success-block h2 { color: #d4af37; margin-bottom: 15px; }
        .success-block p { color: #aaa; line-height: 1.7; }
        .whatsapp-button { background: #25D366; color: #fff; padding: 14px 30px; border-radius: 10px; border: none; cursor: pointer; font-weight: bold; font-size: 15px; margin-top: 20px; font-family: inherit; }
        .whatsapp-button:hover { background: #1ebe57; }

        /* FOOTER */
        .footer-container { width: 100%; background-color: var(--bg-dark); color: var(--text-white); position: relative; overflow: hidden; line-height: 1.7; margin-top: 60px; }
        .footer-top { display: flex; justify-content: space-between; align-items: center; padding: 0 5%; position: relative; z-index: 2; height: 220px; background: linear-gradient(135deg, var(--bg-dark-blue) 0%, var(--bg-dark) 100%); }
        .curve-svg { position: absolute; bottom: -1px; left: 0; width: 100%; height: 60px; z-index: 10; pointer-events: none; }
        .logo-area { display: flex; align-items: center; gap: 20px; position: relative; z-index: 12; }
        .logo-icon { position: relative; display: flex; align-items: center; justify-content: center; width: 90px; height: 90px; }
        .logo-icon img { width: 100%; height: 100%; border-radius: 50%; object-fit: contain; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5)); }
        .logo-text p { font-size: 0.75rem; color: var(--text-gray); letter-spacing: 1px; margin-top: 5px; text-transform: uppercase; }
        .tagline { display: flex; gap: 15px; font-size: 0.85rem; color: var(--text-gray); font-style: italic; margin-top: 10px; }
        .tagline span { display: flex; align-items: center; gap: 10px; }
        .tagline span::after { content: '•'; color: var(--text-gray); }
        .tagline span:last-child::after { content: ''; }
        .building-image { position: absolute; right: 0; top: 0; width: 55%; height: 100%; background: linear-gradient(to right, rgba(7, 13, 31, 0.95) 0%, rgba(7, 13, 31, 0.2) 100%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80') center/cover no-repeat; z-index: 1; }
        .footer-middle { display: grid; grid-template-columns: 1.2fr 0.8fr 1fr 1.2fr; gap: 25px; padding: 20px 5% 30px; background-color: var(--bg-dark); position: relative; z-index: 2; }
        .footer-col h3 { color: var(--gold-primary); font-size: 1.1rem; font-weight: 700; margin-bottom: 15px; position: relative; padding-bottom: 8px; }
        .footer-col h3::after { content: ''; position: absolute; left: 0; bottom: 0; width: 35px; height: 2px; background-color: var(--gold-primary); }
        .footer-col p { color: var(--text-gray); font-size: 0.85rem; line-height: 1.5; margin-bottom: 15px; }
        .footer-col .quote { color: var(--text-white); font-style: italic; font-weight: 500; margin-top: 15px; }
        .footer-col ul li { margin-bottom: 8px; }
        .footer-col ul li a { color: var(--text-gray); font-size: 0.85rem; display: flex; align-items: center; gap: 8px; transition: color 0.3s ease; }
        .footer-col ul li a svg { width: 9px; height: 9px; fill: var(--gold-primary); transition: transform 0.3s; }
        .footer-col ul li a:hover { color: var(--gold-primary); } .footer-col ul li a:hover svg { transform: translateX(5px); }
        .footer-col .contact-item { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; cursor: pointer; }
        .footer-col .contact-icon { width: 36px; height: 36px; background-color: var(--gold-primary); border-radius: 50%; display: flex; justify-content: center; align-items: center; flex-shrink: 0; overflow: hidden; transition: transform 0.3s; }
        .footer-col .contact-item:hover .contact-icon { transform: translateY(-4px) scale(1.05); box-shadow: 0 4px 12px rgba(229, 183, 64, 0.4); }
        .footer-col .contact-icon svg.email-icon { fill: var(--bg-dark); } .footer-col .contact-icon svg.phone-icon { fill: var(--bg-dark); } .footer-col .contact-icon svg.whatsapp-icon { width: 100%; height: 100%; }
        .footer-col .contact-info h4 { color: var(--text-white); font-size: 0.85rem; font-weight: 600; margin-bottom: 2px; }
        .footer-col .contact-info a { color: var(--text-gray); font-size: 0.75rem; word-break: break-all; } .footer-col .contact-info a:hover { color: var(--gold-primary); }
        .footer-bottom { border-top: 1px solid rgba(229, 183, 64, 0.3); padding: 15px 5%; display: flex; justify-content: center; align-items: center; gap: 20px; background-color: var(--bg-dark); }
        .social-icons { display: flex; gap: 10px; }
        .social-icons a { display: flex; justify-content: center; align-items: center; width: 32px; height: 32px; border-radius: 50%; overflow: hidden; transition: transform 0.4s; }
        .social-icons a svg { width: 100%; height: 100%; display: block; }
        .social-icons a:hover { transform: translateY(-5px) scale(1.1); box-shadow: 0 5px 15px rgba(229, 183, 64, 0.5); }
        .divider { width: 1px; height: 20px; background-color: rgba(229, 183, 64, 0.5); }
        .copyright p { color: var(--text-gray); font-size: 0.75rem; }

        @media (max-width: 1024px) { .footer-middle { grid-template-columns: 1fr 1fr; } .building-image { opacity: 0.3; } }
        @media (max-width: 768px) {
          .navbar { flex-direction: column; height: auto; padding: 20px; gap: 15px; } .nav-links { gap: 15px; flex-wrap: wrap; justify-content: center; }
          .footer-top { flex-direction: column; height: auto; padding: 30px 5% 60px; text-align: center; } .logo-area { flex-direction: column; gap: 10px; } .tagline { justify-content: center; }
          .building-image { width: 100%; opacity: 0.15; } .footer-middle { grid-template-columns: 1fr; padding: 30px 5%; } .footer-bottom { flex-direction: column; gap: 15px; text-align: center; } .divider { display: none; }
          .curve-svg { height: 30px; } .contact-sidebar { width: 300px; }
          .container { margin: 35px auto; } .card { padding: 22px; } .options { grid-template-columns: 1fr; }
          .buttons { flex-direction: column; } button { width: 100%; }
          .summary-row { flex-direction: column; gap: 6px; } .summary-row span:last-child { text-align: left; max-width: 100%; }
        }
      `}</style>

      <nav className="navbar">
        <div className="logo">PELC</div>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/event">Event</Link>
          <a href="#" onClick={(e) => { e.preventDefault(); setSidebarOpen(true); }}>Contact</a>
        </div>
      </nav>

      <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}></div>
      <div className={`contact-sidebar ${sidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h2>Contact Us</h2>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>&times;</button>
        </div>
        <div className="sidebar-content">
          <p>We are here to help! Reach out to us through any of these channels.</p>
          <div className="contact-item"><div className="contact-icon"><svg className="email-icon" viewBox="0 0 24 24"><path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"/></svg></div><div className="contact-info"><h4>Email</h4><a href="mailto:popeeadlegacycompany@gmail.com">popeeadlegacycompany@gmail.com</a></div></div>
          <div className="contact-item"><div className="contact-icon"><svg className="phone-icon" viewBox="0 0 24 24"><path d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.83 16.42 14.95C17.55 15.32 18.76 15.52 20 15.52C20.55 15.52 21 15.97 21 16.52V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.58C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"/></svg></div><div className="contact-info"><h4>Phone</h4><a href="tel:0892236030">0892236030</a></div></div>
          <div className="contact-item"><div className="contact-icon"><svg className="whatsapp-icon" viewBox="0 0 24 24"><path fill="#25D366" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2Z"/><path fill="#FFF" d="M17.47 14.38C17.17 14.23 15.7 13.5 15.42 13.4C15.14 13.3 14.94 13.25 14.74 13.55C14.54 13.85 13.97 14.53 13.79 14.73C13.61 14.93 13.44 14.95 13.14 14.8C12.84 14.65 11.88 14.34 10.75 13.33C9.87 12.55 9.28 11.58 9.1 11.28C8.92 10.98 9.07 10.81 9.22 10.66C9.36 10.52 9.53 10.29 9.68 10.11C9.83 9.93 9.88 9.8 9.98 9.6C10.08 9.4 10.03 9.23 9.95 9.08C9.88 8.93 9.28 7.45 9.03 6.85C8.78 6.27 8.53 6.35 8.34 6.34C8.17 6.33 7.97 6.33 7.77 6.33C7.57 6.33 7.25 6.4 6.98 6.69C6.71 6.98 5.91 7.73 5.91 9.2C5.91 10.67 7.01 12.09 7.15 12.28C7.29 12.47 9.12 15.29 11.95 16.51C12.63 16.8 13.16 16.98 13.57 17.11C14.26 17.33 14.89 17.3 15.38 17.21C15.93 17.11 17.12 16.47 17.37 15.78C17.62 15.09 17.62 14.5 17.55 14.38C17.48 14.25 17.28 14.2 16.98 14.05L17.47 14.38Z"/></svg></div><div className="contact-info"><h4>WhatsApp</h4><a href="https://wa.me/0892236030">0892236030</a></div></div>
          <li className="sidebar-see-more"><Link href="/contact" className="see-more-btn">see more</Link></li>
          <div className="sidebar-socials">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/><path fill="#fff" d="M16.671 15.543L17.203 12.073h-3.328V9.823c0-.949.465-1.874 1.956-1.874h1.513V4.996s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.643H7.078v3.47h3.047v8.385a12.09 12.09 0 003.75 0v-8.385h2.796z"/></svg></a>
              <a href="#" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><radialGradient id="instaGradSidebarConsult" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="5%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs><path fill="url(#instaGradSidebarConsult)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.189.63c-.737.288-1.362.673-1.984 1.296C1.583 2.548 1.198 3.173.91 3.91.613 4.626.412 5.496.352 6.774.015 8.054 0 8.461 0 12s.015 3.946.072 5.226c.06 1.278.261 2.148.558 2.864.288.737.673 1.362 1.296 1.984.622.622 1.247 1.008 1.984 1.296.716.297 1.586.498 2.864.558C8.054 23.985 8.461 24 12 24s3.946-.015 5.226-.072c1.278-.06 2.148-.261 2.864-.558.737-.288 1.362-.673 1.984-1.296.622-.622 1.008-1.247 1.296-1.984.297-.716.498-1.586.558-2.864.057-1.28.072-1.687.072-5.226s-.015-3.946-.072-5.226c-.06-1.278-.261-2.148-.558-2.864-.288-.737-.673-1.362-1.296-1.984-.622-.622-1.247-1.008-1.984-1.296-.716-.297-1.586-.498-2.864-.558C15.946.015 15.539 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><circle cx="18.406" cy="5.594" r="1.44" fill="#fff"/></svg></a>
              <a href="#" aria-label="X"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a href="#" aria-label="YouTube"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/><path fill="#fff" d="M9.545 15.568L15.818 12 9.545 8.432z"/></svg></a>
            </div>
          </div>
        </div>
      </div>

      <main className="container">
        <div className="header">
          <h1>Free <span>Consultation</span></h1>
          <p>Tell PELC about your idea, business or project. Answer a few questions and we'll help you identify the right digital solution.</p>
        </div>

        <div className="progress-area">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${Math.min(progress, 100)}%` }}></div>
          </div>
          <div className="step-text">Step <span>{Math.min(currentStep + 1, 5)}</span> of 5</div>
        </div>

        <div className="card">
          {/* STEP 1: SERVICE */}
          <section className={`step ${currentStep === 0 ? 'active' : ''}`}>
            <h2>What can PELC do for you?</h2>
            <p className="step-description">Choose the service you're interested in.</p>
            <div className="options">
              {services.map((s) => (
                <div
                  key={s.value}
                  className={`option ${service === s.value ? 'selected' : ''}`}
                  onClick={() => setService(s.value)}
                >
                  <div className="icon">{s.icon}</div>
                  <h3>{s.label}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="buttons">
              <span></span>
              <button className="next" onClick={nextStep}>Continue →</button>
            </div>
          </section>

          {/* STEP 2: PROJECT */}
          <section className={`step ${currentStep === 1 ? 'active' : ''}`}>
            <h2>Tell us about your project</h2>
            <p className="step-description">Describe what you want PELC to help you achieve.</p>
            <label>Project Description</label>
            <textarea id="project" value={form.project} onChange={handleChange} placeholder="Example: I want PELC to build a website for my business where customers can view my services..."></textarea>
            <label>Who is this project for?</label>
            <select id="audience" value={form.audience} onChange={handleChange}>
              <option value="">Select one</option>
              <option>Personal Project</option>
              <option>Small Business</option>
              <option>Company</option>
              <option>Church / Ministry</option>
              <option>School</option>
              <option>Organization</option>
              <option>Other</option>
            </select>
            <div className="buttons">
              <button className="back" onClick={prevStep}>← Back</button>
              <button className="next" onClick={nextStep}>Continue →</button>
            </div>
          </section>

          {/* STEP 3: PREFERENCES */}
          <section className={`step ${currentStep === 2 ? 'active' : ''}`}>
            <h2>Project Preferences</h2>
            <p className="step-description">Help PELC understand your expectations.</p>
            <label>When do you need the project?</label>
            <select id="timeline" value={form.timeline} onChange={handleChange}>
              <option value="">Select timeline</option>
              <option>As soon as possible</option>
              <option>Within 1 month</option>
              <option>1–3 months</option>
              <option>3–6 months</option>
              <option>I'm just planning</option>
            </select>
            <label>What's your budget?</label>
            <select id="budget" value={form.budget} onChange={handleChange}>
              <option value="">Select budget</option>
              <option>I'm not sure yet</option>
              <option>Small budget</option>
              <option>Medium budget</option>
              <option>Large project</option>
            </select>
            <div className="buttons">
              <button className="back" onClick={prevStep}>← Back</button>
              <button className="next" onClick={nextStep}>Continue →</button>
            </div>
          </section>

          {/* STEP 4: CONTACT */}
          <section className={`step ${currentStep === 3 ? 'active' : ''}`}>
            <h2>Your Contact Information</h2>
            <p className="step-description">Give PELC a way to respond to your consultation.</p>
            <label>Full Name</label>
            <input id="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" />
            <label>Email Address</label>
            <input id="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            <label>Phone / WhatsApp</label>
            <input id="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Your phone number" />
            <div className="buttons">
              <button className="back" onClick={prevStep}>← Back</button>
              <button className="next" onClick={showSummary}>Review →</button>
            </div>
          </section>

          {/* STEP 5: REVIEW */}
          <section className={`step ${currentStep === 4 ? 'active' : ''}`}>
            <h2>Review Your Consultation</h2>
            <p className="step-description">Check your answers before sending them to PELC.</p>
            <div className="summary">
              <div className="summary-row"><span>Service</span><span>{service || '—'}</span></div>
              <div className="summary-row"><span>Project</span><span>{form.project || '—'}</span></div>
              <div className="summary-row"><span>Audience</span><span>{form.audience || '—'}</span></div>
              <div className="summary-row"><span>Timeline</span><span>{form.timeline || '—'}</span></div>
              <div className="summary-row"><span>Budget</span><span>{form.budget || '—'}</span></div>
              <div className="summary-row"><span>Name</span><span>{form.name || '—'}</span></div>
              <div className="summary-row"><span>Email</span><span>{form.email || '—'}</span></div>
              <div className="summary-row"><span>Phone</span><span>{form.phone || '—'}</span></div>
            </div>
            <div className={`status ${status}`}>
              {status === 'loading' && 'Sending your consultation to PELC...'}
              {status === 'error' && 'We could not send your consultation. Please try again.'}
              {status === 'success' && 'Consultation sent successfully!'}
            </div>
            <div className="buttons">
              <button className="back" onClick={prevStep}>← Edit</button>
              <button className="next" onClick={submitConsultation} disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Send Consultation 🚀'}
              </button>
            </div>
          </section>

          {/* STEP 6: SUCCESS */}
          <section className={`step ${currentStep === 5 ? 'active' : ''}`}>
            <div className="success-block">
              <div className="success-icon">🎉</div>
              <h2>Consultation Submitted!</h2>
              <p>Thank you for choosing PELC. Your consultation has been sent successfully. Our team can now review your requirements.</p>
              <br />
              <button className="whatsapp-button" onClick={openWhatsApp}>Continue to WhatsApp 💬</button>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer-container">
        <div className="footer-top">
          <div className="building-image"></div>
          <div className="logo-area">
            <div className="logo-icon"><img src="logo.jpg" alt="PELC Company Logo" /></div>
            <div className="logo-text">
              <p>POPE EAD LEGACY COMPANY</p>
              <div className="tagline"><span>Innovate</span><span>Create</span><span>Generate</span></div>
            </div>
          </div>
          <svg className="curve-svg" viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0,100 L1440,100 L1440,40 C1200,40 900,0 500,0 C250,0 100,40 0,100 Z" fill="#e5b740"></path></svg>
        </div>
        <div className="footer-middle">
          <div className="footer-col"><h3>PELC Company</h3><p>We are a digital solutions company focused on building a better tomorrow through technology, creativity and innovation.</p><p className="quote">"Your Vision, Our Digital Mission"</p></div>
          <div className="footer-col"><h3>Quick Links</h3><ul>
            <li><Link href="/"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg> Home</Link></li>
            <li><Link href="/about"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg> About</Link></li>
            <li><Link href="/services"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg> Services</Link></li>
            <li><Link href="/event"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg> Event</Link></li>
            <li><Link href="/contact"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg> Contact</Link></li>
          </ul></div>
          <div className="footer-col"><h3>Our Services</h3><ul>
            <li><Link href="/wdd"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg> Website Development</Link></li>
            <li><Link href="/sdd"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg> Software Development</Link></li>
            <li><Link href="/cpd"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg> Creative &amp; Publication</Link></li>
            <li><Link href="/ud"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg> UX/UI Design</Link></li>
            <li><Link href="/ad"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg> Advertisement</Link></li>
            <li><Link href="/md"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg> Marketing</Link></li>
          </ul></div>
          <div className="footer-col"><h3>Contact Us</h3>
            <div className="contact-item"><div className="contact-icon"><svg className="email-icon" viewBox="0 0 24 24"><path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"/></svg></div><div className="contact-info"><h4>Email</h4><a href="mailto:popeeadlegacycompany@gmail.com">popeeadlegacycompany@gmail.com</a></div></div>
            <div className="contact-item"><div className="contact-icon"><svg className="phone-icon" viewBox="0 0 24 24"><path d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.83 16.42 14.95C17.55 15.32 18.76 15.52 20 15.52C20.55 15.52 21 15.97 21 16.52V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.58C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"/></svg></div><div className="contact-info"><h4>Phone</h4><a href="tel:0892236030">0892236030</a></div></div>
            <div className="contact-item"><div className="contact-icon"><svg className="whatsapp-icon" viewBox="0 0 24 24"><path fill="#25D366" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2Z"/><path fill="#FFF" d="M17.47 14.38C17.17 14.23 15.7 13.5 15.42 13.4C15.14 13.3 14.94 13.25 14.74 13.55C14.54 13.85 13.97 14.53 13.79 14.73C13.61 14.93 13.44 14.95 13.14 14.8C12.84 14.65 11.88 14.34 10.75 13.33C9.87 12.55 9.28 11.58 9.1 11.28C8.92 10.98 9.07 10.81 9.22 10.66C9.36 10.52 9.53 10.29 9.68 10.11C9.83 9.93 9.88 9.8 9.98 9.6C10.08 9.4 10.03 9.23 9.95 9.08C9.88 8.93 9.28 7.45 9.03 6.85C8.78 6.27 8.53 6.35 8.34 6.34C8.17 6.33 7.97 6.33 7.77 6.33C7.57 6.33 7.25 6.4 6.98 6.69C6.71 6.98 5.91 7.73 5.91 9.2C5.91 10.67 7.01 12.09 7.15 12.28C7.29 12.47 9.12 15.29 11.95 16.51C12.63 16.8 13.16 16.98 13.57 17.11C14.26 17.33 14.89 17.3 15.38 17.21C15.93 17.11 17.12 16.47 17.37 15.78C17.62 15.09 17.62 14.5 17.55 14.38C17.48 14.25 17.28 14.2 16.98 14.05L17.47 14.38Z"/></svg></div><div className="contact-info"><h4>WhatsApp</h4><a href="https://wa.me/0892236030">0892236030</a></div></div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/><path fill="#fff" d="M16.671 15.543L17.203 12.073h-3.328V9.823c0-.949.465-1.874 1.956-1.874h1.513V4.996s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.643H7.078v3.47h3.047v8.385a12.09 12.09 0 003.75 0v-8.385h2.796z"/></svg></a>
            <a href="#" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><radialGradient id="instaGradFooterConsult" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="5%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs><path fill="url(#instaGradFooterConsult)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.189.63c-.737.288-1.362.673-1.984 1.296C1.583 2.548 1.198 3.173.91 3.91.613 4.626.412 5.496.352 6.774.015 8.054 0 8.461 0 12s.015 3.946.072 5.226c.06 1.278.261 2.148.558 2.864.288.737.673 1.362 1.296 1.984.622.622 1.247 1.008 1.984 1.296.716.297 1.586.498 2.864.558C8.054 23.985 8.461 24 12 24s3.946-.015 5.226-.072c1.278-.06 2.148-.261 2.864-.558.737-.288 1.362-.673 1.984-1.296.622-.622 1.008-1.247 1.296-1.984.297-.716.498-1.586.558-2.864.057-1.28.072-1.687.072-5.226s-.015-3.946-.072-5.226c-.06-1.278-.261-2.148-.558-2.864-.288-.737-.673-1.362-1.296-1.984-.622-.622-1.247-1.008-1.984-1.296-.716-.297-1.586-.498-2.864-.558C15.946.015 15.539 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><circle cx="18.406" cy="5.594" r="1.44" fill="#fff"/></svg></a>
            <a href="#" aria-label="X"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="#" aria-label="YouTube"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/><path fill="#fff" d="M9.545 15.568L15.818 12 9.545 8.432z"/></svg></a>
          </div>
          <div className="divider"></div>
          <div className="copyright"><p>&copy; 2025 PELC Company. All rights reserved.</p></div>
        </div>
      </footer>
    </div>
  );
}