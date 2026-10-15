'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '600', '700', '800'] });

export default function AD() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (sidebarOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [sidebarOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setSidebarOpen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const validateField = (field) => {
    const value = form[field];
    let valid = true;
    if (field === 'name') valid = value.trim().length >= 2;
    else if (field === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    else if (field === 'phone') valid = value.trim() === '' || /^[\d\s()+\-]{7,}$/.test(value.trim());
    else if (field === 'projectType') valid = value !== '';
    else if (field === 'subject') valid = value.trim().length >= 3;
    else if (field === 'message') valid = value.trim().length >= 10;
    setErrors(prev => ({ ...prev, [field]: !valid }));
    return valid;
  };

  const validateAll = () => {
    let allValid = true;
    ['name', 'email', 'phone', 'projectType', 'subject', 'message'].forEach(f => {
      if (!validateField(f)) allValid = false;
    });
    return allValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
    if (errors[id]) validateField(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setStatus('sending');
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append('department', 'ad');
    try {
      const res = await fetch('https://formspree.io/f/xyezboed', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        setStatus('success');
        setShowSuccess(true);
      } else throw new Error('Failed');
    } catch (err) {
      setStatus('error');
      alert('Could not send. Try WhatsApp or email us at popeeadlegacycompany@gmail.com');
      setStatus('idle');
    }
  };

  const sendViaWhatsApp = () => {
    if (!validateAll()) return;
    const { name, email, phone, projectType, subject, message } = form;
    const text = `*New Inquiry – Advertisement (AD)*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A${phone ? `*Phone:* ${encodeURIComponent(phone)}%0A` : ''}*Ad Service:* ${encodeURIComponent(projectType)}%0A*Subject:* ${encodeURIComponent(subject)}%0A%0A*Message:*%0A${encodeURIComponent(message)}`;
    window.open(`https://wa.me/265892236030?text=${text}`, '_blank');
    setTimeout(() => setShowSuccess(true), 500);
  };

  const resetForm = () => {
    setForm({ name: '', email: '', phone: '', projectType: '', subject: '', message: '' });
    setErrors({});
    setStatus('idle');
    setShowSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={montserrat.className}>
      <style jsx global>{`
        :root { --bg-dark: #070d1f; --bg-dark-blue: #0b152c; --gold-primary: #e5b740; --text-white: #ffffff; --text-gray: #b3b9c9; --font-main: 'Montserrat', sans-serif; --page-navy: #0f172a; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f6fb; color: #1e293b; line-height: 1.7; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        a { text-decoration: none; }
        ul { list-style: none; padding: 0; margin: 0; }
        .navbar { width: 100%; height: 70px; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; background: #111; position: relative; z-index: 100; }
        .navbar .logo { color: #d4af37; font-size: 24px; font-weight: bold; }
        .nav-links { display: flex; gap: 30px; align-items: center; }
        .nav-links a { color: white; font-size: 17px; transition: color 0.3s ease; }
        .nav-links a:hover { color: #d4af37; }
        .sidebar-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 998; opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease; }
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
        .hero { background: linear-gradient(135deg, #ea580c, #c2410c); color: #fff; padding: 70px 20px; text-align: center; }
        .hero h1 { font-size: 2.6rem; margin-bottom: 15px; font-weight: 700; }
        .hero p { font-size: 1.15rem; max-width: 700px; margin: 0 auto; opacity: 0.95; }
        .content { max-width: 900px; margin: 0 auto; padding: 60px 20px; }
        .content h2 { font-size: 1.7rem; margin-bottom: 15px; margin-top: 40px; color: var(--page-navy); }
        .content h2:first-child { margin-top: 0; }
        .content p { color: #334155; margin-bottom: 15px; }
        .service-block { background: #fff; border-radius: 14px; padding: 25px 28px; margin-bottom: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border-left: 5px solid #ea580c; }
        .service-block h3 { font-size: 1.15rem; margin-bottom: 8px; color: var(--page-navy); }
        .service-block p { font-size: 0.95rem; color: #475569; margin-bottom: 0; }
        .tech-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
        .tech-tags span { background: #ffedd5; color: #c2410c; font-size: 0.8rem; padding: 6px 14px; border-radius: 20px; font-weight: 600; }
        .back-cta { text-align: center; margin: 50px 0; }
        .btn { display: inline-block; padding: 13px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 0.95rem; transition: transform 0.2s ease, background 0.2s ease; }
        .btn-back { background: #ea580c; color: #fff; }
        .btn-back:hover { background: #c2410c; transform: translateY(-2px); }
        .contact-section { max-width: 900px; margin: 5px auto 40px; padding: 0 20px; }
        .contact-form-wrap { background: #fff; border-radius: 16px; padding: 40px 35px; box-shadow: 0 8px 30px rgba(0,0,0,0.08); border-top: 5px solid #ea580c; }
        .contact-form-wrap h2 { font-size: 1.6rem; color: var(--page-navy); margin-bottom: 8px; }
        .contact-form-wrap .subtitle { color: #64748b; font-size: 0.95rem; margin-bottom: 25px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .form-group { margin-bottom: 18px; }
        .form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 6px; }
        .form-group label .required { color: #dc2626; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 12px 14px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 0.95rem; font-family: inherit; color: #1e293b; background: #f8fafc; transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: #ea580c; background: #fff; box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.12); }
        .form-group textarea { resize: vertical; min-height: 120px; }
        .form-group .error-msg { display: none; font-size: 0.78rem; color: #dc2626; margin-top: 5px; }
        .form-group.invalid input, .form-group.invalid select, .form-group.invalid textarea { border-color: #dc2626; background: #fef2f2; }
        .form-group.invalid .error-msg { display: block; }
        .button-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 5px; }
        .submit-btn, .whatsapp-btn { padding: 14px; border: none; border-radius: 8px; font-size: 0.95rem; font-weight: 600; font-family: inherit; cursor: pointer; transition: background 0.2s ease, transform 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .submit-btn { background: #ea580c; color: #fff; }
        .submit-btn:hover { background: #c2410c; transform: translateY(-2px); }
        .submit-btn:disabled { background: #94a3b8; cursor: not-allowed; transform: none; }
        .whatsapp-btn { background: #25d366; color: #fff; }
        .whatsapp-btn:hover { background: #1ebe57; transform: translateY(-2px); }
        .form-note { font-size: 0.78rem; color: #94a3b8; text-align: center; margin-top: 12px; }
        .success-message { display: none; text-align: center; padding: 40px 20px; }
        .success-message.show { display: block; }
        .success-message .check { width: 70px; height: 70px; background: #dcfce7; color: #16a34a; font-size: 2rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; animation: pop 0.4s ease; }
        @keyframes pop { 0% { transform: scale(0); } 70% { transform: scale(1.15); } 100% { transform: scale(1); } }
        .success-message h3 { font-size: 1.5rem; color: var(--page-navy); margin-bottom: 10px; }
        .success-message p { color: #64748b; margin-bottom: 25px; }
        .success-message button { background: none; border: 1.5px solid #ea580c; color: #ea580c; padding: 10px 24px; border-radius: 8px; font-size: 0.9rem; font-weight: 600; font-family: inherit; cursor: pointer; transition: all 0.2s ease; }
        .success-message button:hover { background: #ea580c; color: #fff; }
        .footer-container { width: 100%; background-color: var(--bg-dark); color: var(--text-white); position: relative; overflow: hidden; line-height: 1.7; }
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
        .contact-item { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; cursor: pointer; }
        .contact-icon { width: 36px; height: 36px; background-color: var(--gold-primary); border-radius: 50%; display: flex; justify-content: center; align-items: center; flex-shrink: 0; overflow: hidden; transition: transform 0.3s; }
        .contact-item:hover .contact-icon { transform: translateY(-4px) scale(1.05); box-shadow: 0 4px 12px rgba(229, 183, 64, 0.4); }
        .contact-icon svg.email-icon { fill: var(--bg-dark); } .contact-icon svg.phone-icon { fill: var(--bg-dark); } .contact-icon svg.whatsapp-icon { width: 100%; height: 100%; }
        .contact-info h4 { color: var(--text-white); font-size: 0.85rem; font-weight: 600; margin-bottom: 2px; }
        .contact-info a { color: var(--text-gray); font-size: 0.75rem; word-break: break-all; } .contact-info a:hover { color: var(--gold-primary); }
        .footer-bottom { border-top: 1px solid rgba(229, 183, 64, 0.3); padding: 15px 5%; display: flex; justify-content: center; align-items: center; gap: 20px; background-color: var(--bg-dark); }
        .social-icons { display: flex; gap: 10px; }
        .social-icons a { display: flex; justify-content: center; align-items: center; width: 32px; height: 32px; border-radius: 50%; overflow: hidden; transition: transform 0.4s; }
        .social-icons a svg { width: 100%; height: 100%; display: block; }
        .social-icons a:hover { transform: translateY(-5px) scale(1.1); box-shadow: 0 5px 15px rgba(229, 183, 64, 0.5); }
        .divider { width: 1px; height: 20px; background-color: rgba(229, 183, 64, 0.5); }
        .copyright p { color: var(--text-gray); font-size: 0.75rem; }
        @media (max-width: 1024px) { .footer-middle { grid-template-columns: 1fr 1fr; } .building-image { opacity: 0.3; } }
        @media (max-width: 768px) {
          .hero h1 { font-size: 1.9rem; } .hero p { font-size: 1rem; }
          .contact-form-wrap { padding: 30px 22px; } .button-row { grid-template-columns: 1fr; }
          .navbar { flex-direction: column; height: auto; padding: 20px; gap: 15px; } .nav-links { gap: 15px; flex-wrap: wrap; justify-content: center; }
          .footer-top { flex-direction: column; height: auto; padding: 30px 5% 60px; text-align: center; } .logo-area { flex-direction: column; gap: 10px; } .tagline { justify-content: center; }
          .building-image { width: 100%; opacity: 0.15; } .footer-middle { grid-template-columns: 1fr; padding: 30px 5%; } .footer-bottom { flex-direction: column; gap: 15px; text-align: center; } .divider { display: none; }
          .curve-svg { height: 30px; } .contact-sidebar { width: 300px; } .form-row { grid-template-columns: 1fr; }
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
              <a href="#" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><radialGradient id="instaGradSidebarAd" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="5%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs><path fill="url(#instaGradSidebarAd)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.189.63c-.737.288-1.362.673-1.984 1.296C1.583 2.548 1.198 3.173.91 3.91.613 4.626.412 5.496.352 6.774.015 8.054 0 8.461 0 12s.015 3.946.072 5.226c.06 1.278.261 2.148.558 2.864.288.737.673 1.362 1.296 1.984.622.622 1.247 1.008 1.984 1.296.716.297 1.586.498 2.864.558C8.054 23.985 8.461 24 12 24s3.946-.015 5.226-.072c1.278-.06 2.148-.261 2.864-.558.737-.288 1.362-.673 1.984-1.296.622-.622 1.008-1.247 1.296-1.984.297-.716.498-1.586.558-2.864.057-1.28.072-1.687.072-5.226s-.015-3.946-.072-5.226c-.06-1.278-.261-2.148-.558-2.864-.288-.737-.673-1.362-1.296-1.984-.622-.622-1.247-1.008-1.984-1.296-.716-.297-1.586-.498-2.864-.558C15.946.015 15.539 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><circle cx="18.406" cy="5.594" r="1.44" fill="#fff"/></svg></a>
              <a href="#" aria-label="X"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a href="#" aria-label="YouTube"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/><path fill="#fff" d="M9.545 15.568L15.818 12 9.545 8.432z"/></svg></a>
            </div>
          </div>
        </div>
      </div>

      <header className="hero">
        <h1>Advertisement Department</h1>
        <p>Amplifying your voice in a noisy world — paid ads that deliver measurable ROI.</p>
      </header>

      <main className="content">
        <h2>What We Do</h2>
        <p>The Advertisement Department (AD) specializes in paid acquisition. We help you reach the right audience at the right time through carefully targeted advertising campaigns across multiple platforms.</p>

        <h2>Our Core Services</h2>

        <div className="service-block">
          <h3>🎯 PPC Campaigns</h3>
          <p>Pay-Per-Click campaigns on Google, Bing, and social platforms that drive qualified traffic to your site.</p>
        </div>

        <div className="service-block">
          <h3>📱 Social Media Ads</h3>
          <p>Facebook, Instagram, TikTok, LinkedIn, and X ad campaigns designed to maximize reach and engagement.</p>
        </div>

        <div className="service-block">
          <h3>🎨 Ad Creative</h3>
          <p>Eye-catching visuals, copywriting, and video ads that stop the scroll and drive action.</p>
        </div>

        <div className="service-block">
          <h3>🧪 A/B Testing</h3>
          <p>Continuous testing of ads to find what works best and optimize your spend for maximum ROI.</p>
        </div>

        <h2>Platforms We Work With</h2>
        <div className="tech-tags">
          <span>Google Ads</span><span>Facebook Ads</span><span>Instagram</span>
          <span>TikTok</span><span>LinkedIn</span><span>YouTube</span>
          <span>Bing Ads</span><span>X (Twitter)</span>
        </div>

        <div className="back-cta">
          <p className="btn btn-back">BOOK AD CAMPAIGN</p>
        </div>
      </main>

      <section className="contact-section">
        <div className="contact-form-wrap">
          {!showSuccess ? (
            <form onSubmit={handleSubmit} noValidate>
              <h2>Request Advertisement Services</h2>
              <p className="subtitle">Fill out the form and our AD team will reach out within 24 hours.</p>

              <div className="form-row">
                <div className={`form-group ${errors.name ? 'invalid' : ''}`}>
                  <label htmlFor="name">Full Name <span className="required">*</span></label>
                  <input type="text" id="name" value={form.name} onChange={handleChange} onBlur={() => validateField('name')} placeholder="John Doe" />
                  <span className="error-msg">Please enter your full name.</span>
                </div>
                <div className={`form-group ${errors.email ? 'invalid' : ''}`}>
                  <label htmlFor="email">Email Address <span className="required">*</span></label>
                  <input type="email" id="email" value={form.email} onChange={handleChange} onBlur={() => validateField('email')} placeholder="john@example.com" />
                  <span className="error-msg">Please enter a valid email.</span>
                </div>
              </div>

              <div className="form-row">
                <div className={`form-group ${errors.phone ? 'invalid' : ''}`}>
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" value={form.phone} onChange={handleChange} onBlur={() => validateField('phone')} placeholder="+265 89 000 0000" />
                  <span className="error-msg">Please enter a valid phone number.</span>
                </div>
                <div className={`form-group ${errors.projectType ? 'invalid' : ''}`}>
                  <label htmlFor="projectType">Ad Service <span className="required">*</span></label>
                  <select id="projectType" value={form.projectType} onChange={handleChange} onBlur={() => validateField('projectType')}>
                    <option value="">-- Select Ad Service --</option>
                    <option value="ppc">PPC Campaign</option>
                    <option value="social">Social Media Ads</option>
                    <option value="creative">Ad Creative Design</option>
                    <option value="ab-testing">A/B Testing</option>
                    <option value="video">Video Ads</option>
                    <option value="full">Full Ad Campaign</option>
                  </select>
                  <span className="error-msg">Please select an ad service.</span>
                </div>
              </div>

              <div className={`form-group ${errors.subject ? 'invalid' : ''}`}>
                <label htmlFor="subject">Subject <span className="required">*</span></label>
                <input type="text" id="subject" value={form.subject} onChange={handleChange} onBlur={() => validateField('subject')} placeholder="Briefly describe your advertising goals" />
                <span className="error-msg">Please enter a subject.</span>
              </div>

              <div className={`form-group ${errors.message ? 'invalid' : ''}`}>
                <label htmlFor="message">Message <span className="required">*</span></label>
                <textarea id="message" value={form.message} onChange={handleChange} onBlur={() => validateField('message')} placeholder="Tell us about your product, target audience, budget, and goals..."></textarea>
                <span className="error-msg">Please enter a message (at least 10 characters).</span>
              </div>

              <div className="button-row">
                <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : '✉️ Send via Email'}
                </button>
                <button type="button" className="whatsapp-btn" onClick={sendViaWhatsApp}>💬 Send via WhatsApp</button>
              </div>
              <p className="form-note">All messages are delivered to <strong>popeeadlegacycompany@gmail.com</strong></p>
            </form>
          ) : (
            <div className="success-message show">
              <div className="check">✓</div>
              <h3>Message Sent!</h3>
              <p>Thank you for contacting AD. We'll reply within 24 hours.</p>
              <button type="button" onClick={resetForm}>Send Another Message</button>
            </div>
          )}
        </div>
      </section>

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
            <a href="#" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><radialGradient id="instaGradFooterAd" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="5%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs><path fill="url(#instaGradFooterAd)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.189.63c-.737.288-1.362.673-1.984 1.296C1.583 2.548 1.198 3.173.91 3.91.613 4.626.412 5.496.352 6.774.015 8.054 0 8.461 0 12s.015 3.946.072 5.226c.06 1.278.261 2.148.558 2.864.288.737.673 1.362 1.296 1.984.622.622 1.247 1.008 1.984 1.296.716.297 1.586.498 2.864.558C8.054 23.985 8.461 24 12 24s3.946-.015 5.226-.072c1.278-.06 2.148-.261 2.864-.558.737-.288 1.362-.673 1.984-1.296.622-.622 1.008-1.247 1.296-1.984.297-.716.498-1.586.558-2.864.057-1.28.072-1.687.072-5.226s-.015-3.946-.072-5.226c-.06-1.278-.261-2.148-.558-2.864-.288-.737-.673-1.362-1.296-1.984-.622-.622-1.247-1.008-1.984-1.296-.716-.297-1.586-.498-2.864-.558C15.946.015 15.539 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><circle cx="18.406" cy="5.594" r="1.44" fill="#fff"/></svg></a>
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