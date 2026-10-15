'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '600', '700', '800'] });

export default function Contact() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [greeted, setGreeted] = useState(false);

  useEffect(() => {
    if (sidebarOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [sidebarOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') { setSidebarOpen(false); setChatOpen(false); } };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (chatOpen && !greeted) {
      setTimeout(() => {
        setMessages([{ type: 'bot', text: "Hello! 👋 I'm <strong>PELC AI</strong>, your virtual assistant for <strong>POPE EAD LEGACY COMPANY</strong>. How can I help you today?<br><br>Try asking about our <strong>services</strong>, <strong>pricing</strong>, or how to <strong>contact</strong> us!" }]);
        setGreeted(true);
      }, 400);
    }
  }, [chatOpen, greeted]);

  const getAiResponse = (text) => {
    const t = text.toLowerCase().trim();

    if (/^(hi|hey|hello|good (morning|afternoon|evening)|howdy|yo|hola|sup)\b/i.test(t)) {
      return "Hello! 👋 Welcome to <strong>POPE EAD LEGACY COMPANY</strong>. I'm PELC AI. How can I help you today?<br><br>You can ask me about our <strong>services</strong>, <strong>pricing</strong>, <strong>contact info</strong>, or booking a <strong>consultation</strong>.";
    }

    if (/how are you|how('s| is) it going|how do you do|whats up|what's up/i.test(t)) {
      return "I'm doing great, thank you for asking! 😊 I'm always ready to help you with anything about <strong>POPE EAD LEGACY COMPANY</strong>. What would you like to know?";
    }

    if (/who are you|what are you|your name|introduce yourself/i.test(t)) {
      return "I'm <strong>PELC AI</strong> 🤖 — the virtual assistant for POPE EAD LEGACY COMPANY. I can answer questions about our services, pricing, team, and how to get in touch. What can I help you with?";
    }

    if (/help|what can you do|how can you help/i.test(t)) {
      return "I can help you with anything related to <strong>POPE EAD LEGACY COMPANY</strong>! Try asking me:<br><br>💼 <em>What services do you offer?</em><br>💰 <em>How much do you charge?</em><br>📞 <em>How can I contact you?</em><br>📅 <em>I want to book a consultation</em><br>🌍 <em>Where are you based?</em>";
    }

    if (/thank|thanks|appreciate|thx/i.test(t)) {
      return "You're very welcome! 😊 Is there anything else I can help you with?";
    }

    if (/bye|goodbye|see you|farewell|good night/i.test(t)) {
      return "Goodbye! 👋 Thanks for chatting with PELC AI. Feel free to come back anytime — we're always happy to help!";
    }

    if (/please|sorry|excuse/i.test(t)) {
      return "No problem at all! 😊 How can I help you with PELC today?";
    }

    if (t.includes("about") || t.includes("who is pelc") || t.includes("what is pelc") || t.includes("company")) {
      return "<strong>POPE EAD LEGACY COMPANY (PELC)</strong> is a digital solutions company based in Malawi, serving clients globally. Our tagline: <em>Innovate • Create • Generate</em>.<br><br>We help businesses build their digital future through web development, software, design, marketing, and creative services.";
    }

    if (t.includes("service") || t.includes("offer") || t.includes("what do you do")) {
      return "We offer a full range of digital services through six specialized departments:<br><br>💻 <strong>Website Development (WDD)</strong><br>⚙️ <strong>Software Development (SDD)</strong><br>🎨 <strong>UX/UI Design (UD)</strong><br>📣 <strong>Advertisement (AD)</strong><br>📈 <strong>Marketing (MD)</strong><br>🖌️ <strong>Creative & Publications (CPD)</strong><br><br>Which one would you like to know more about?";
    }

    if (t.includes("website") || t.includes("web dev")) {
      return "Our <strong>Website Development Department (WDD)</strong> builds fast, secure, and scalable websites — landing pages, business sites, e-commerce, and web apps.<br><br>👉 <a href='/wdd' style='color:#e5b740;font-weight:600;'>View WDD Services</a>";
    }

    if (t.includes("software") || t.includes("app") || t.includes("saas")) {
      return "Our <strong>Software Development Department (SDD)</strong> builds custom software, SaaS platforms, mobile apps, and APIs tailored to your business.<br><br>👉 <a href='/sdd' style='color:#e5b740;font-weight:600;'>View SDD Services</a>";
    }

    if (t.includes("design") || t.includes("ux") || t.includes("ui")) {
      return "Our <strong>UX/UI Design Department (UD)</strong> creates user-centered designs, prototypes, and brand identities that convert visitors into customers.<br><br>👉 <a href='/ud' style='color:#e5b740;font-weight:600;'>View UD Services</a>";
    }

    if (t.includes("advert") || t.includes("ads") || t.includes("ppc")) {
      return "Our <strong>Advertisement Department (AD)</strong> runs PPC campaigns, social media ads, and A/B testing to maximize your ROI.<br><br>👉 <a href='/ad' style='color:#e5b740;font-weight:600;'>View AD Services</a>";
    }

    if (t.includes("marketing") || t.includes("seo") || t.includes("content")) {
      return "Our <strong>Marketing Department (MD)</strong> handles SEO, content strategy, social media management, and brand strategy to grow your business organically.<br><br>👉 <a href='/md' style='color:#e5b740;font-weight:600;'>View MD Services</a>";
    }

    if (t.includes("creative") || t.includes("logo") || t.includes("flyer") || t.includes("poster") || t.includes("publication")) {
      return "Our <strong>Creative & Publications Department (CPD)</strong> designs logos, flyers, posters, banners, church bulletins, magazines, and more.<br><br>👉 <a href='/cpd' style='color:#e5b740;font-weight:600;'>View CPD Services</a>";
    }

    if (t.includes("price") || t.includes("cost") || t.includes("charge") || t.includes("how much") || t.includes("fee") || t.includes("budget") || t.includes("quote")) {
      return "Pricing depends on the scope of your project. We offer custom quotes tailored to your needs.<br><br>💬 For an accurate quote, please:<br>📧 Email us at <a href='mailto:popeeadlegacycompany@gmail.com' style='color:#e5b740;font-weight:600;'>popeeadlegacycompany@gmail.com</a><br>📱 Or WhatsApp: <a href='https://wa.me/0892236030' style='color:#e5b740;font-weight:600;'>0892236030</a>";
    }

    if (t.includes("contact") || t.includes("reach") || t.includes("talk") || t.includes("speak") || t.includes("call")) {
      return "You can reach us through any of these channels:<br><br>📧 <strong>Email:</strong> <a href='mailto:popeeadlegacycompany@gmail.com' style='color:#e5b740;font-weight:600;'>popeeadlegacycompany@gmail.com</a><br>📞 <strong>Phone:</strong> <a href='tel:0892236030' style='color:#e5b740;font-weight:600;'>0892236030</a><br>💬 <strong>WhatsApp:</strong> <a href='https://wa.me/0892236030' style='color:#e5b740;font-weight:600;'>0892236030</a>";
    }

    if (t.includes("whatsapp") || t === "wa") {
      return "📱 WhatsApp us directly at <a href='https://wa.me/0892236030' target='_blank' style='color:#e5b740;font-weight:600;'>0892236030</a>. We typically reply within a few minutes during business hours!";
    }

    if (t.includes("email") || t.includes("mail")) {
      return "📧 Email us at <a href='mailto:popeeadlegacycompany@gmail.com' style='color:#e5b740;font-weight:600;'>popeeadlegacycompany@gmail.com</a>. We reply within 24 hours on business days!";
    }

    if (t.includes("consult") || t.includes("book") || t.includes("meeting") || t.includes("appointment")) {
      return "Great! We offer a <strong>FREE 15-minute consultation</strong> to discuss your project. 🎉<br><br>To book, simply:<br>1️⃣ Email us: <a href='mailto:popeeadlegacycompany@gmail.com' style='color:#e5b740;font-weight:600;'>popeeadlegacycompany@gmail.com</a><br>2️⃣ Or WhatsApp: <a href='https://wa.me/0892236030' style='color:#e5b740;font-weight:600;'>0892236030</a>";
    }

    if (t.includes("location") || t.includes("where") || t.includes("based") || t.includes("address") || t.includes("country")) {
      return "📍 We are based in <strong>Malawi</strong>, and we proudly serve clients across Africa and globally — remotely and in-person where possible.";
    }

    if (t.includes("hour") || t.includes("open") || t.includes("time") || t.includes("when") || t.includes("working")) {
      return "🕐 Our working hours are <strong>Monday to Friday, 8:00 AM – 6:00 PM (CAT)</strong>. We also respond to urgent WhatsApp messages on weekends.";
    }

    if (t.includes("founder") || t.includes("owner") || t.includes("ceo") || t.includes("edmond") || t.includes("pope ead")) {
      return "PELC was founded by <strong>Edmond Chinyamu</strong> (also known as Pope Ead) — a Malawian creative and developer passionate about helping African businesses build a digital legacy that lasts.";
    }

    const offTopicKeywords = [
      "weather", "sports", "football", "soccer", "basketball", "politics", "president", "election",
      "crypto", "bitcoin", "stock", "stocks", "news", "movie", "movies", "music", "song", "songs",
      "joke", "jokes", "love", "marry", "date", "relationship", "food", "recipe",
      "translate", "homework", "essay", "math", "science", "history", "google", "youtube", "facebook",
      "chatgpt", "openai", "gemini", "claude", "who won", "tell me a story", "play a game"
    ];
    if (offTopicKeywords.some(keyword => t.includes(keyword))) {
      return "I'm here to help specifically with questions about <strong>POPE EAD LEGACY COMPANY</strong>. 🤝<br><br>Try asking me about our <strong>services</strong>, <strong>pricing</strong>, or how to <strong>contact</strong> us!<br><br>For anything else, you can reach our human team at <a href='mailto:popeeadlegacycompany@gmail.com' style='color:#e5b740;font-weight:600;'>popeeadlegacycompany@gmail.com</a>.";
    }

    return "I'm not quite sure how to answer that. 🤔 But I'd love to help with anything about <strong>POPE EAD LEGACY COMPANY</strong>!<br><br>Try asking me about:<br>💼 Our <strong>services</strong><br>💰 <strong>Pricing</strong><br>📞 How to <strong>contact</strong> us<br>📅 Booking a <strong>consultation</strong><br>🌍 Where we're <strong>based</strong>";
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages(prev => [...prev, { type: 'user', text: userText }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = getAiResponse(userText);
      setMessages(prev => [...prev, { type: 'bot', text: reply }]);
    }, 900 + Math.random() * 500);
  };

  return (
    <div className={montserrat.className}>
      <style jsx global>{`
        :root { --bg-dark: #070d1f; --bg-dark-blue: #0b152c; --gold-primary: #e5b740; --text-white: #ffffff; --text-gray: #b3b9c9; --font-main: 'Montserrat', sans-serif; --page-navy: #0a2540; --page-orange: #ff6b35; --page-gray: #f8f9fa; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: var(--font-main); background-color: #f4f4f4; color: #333; line-height: 1.7; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        a { text-decoration: none; }
        ul { list-style: none; padding: 0; margin: 0; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
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
        .page-hero { background: linear-gradient(135deg, var(--page-navy) 0%, #1e4a7a 100%); color: white; text-align: center; padding: 90px 20px; }
        .page-hero h1 { font-size: 2.8rem; margin-bottom: 15px; }
        .page-hero p { font-size: 1.2rem; opacity: 0.9; max-width: 700px; margin: 0 auto; }
        .section-padding { padding: 80px 0; }
        .section-padding h2 { font-size: 2rem; color: var(--page-navy); margin-bottom: 20px; text-align: center; }
        .section-padding p { font-size: 1.1rem; color: #444; margin-bottom: 18px; max-width: 800px; margin-left: auto; margin-right: auto; text-align: center; }
        .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-top: 40px; }
        .info-card { background: white; padding: 35px 25px; border-radius: 12px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border-top: 5px solid var(--page-orange); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .info-card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.1); }
        .info-card .icon { font-size: 2.5rem; margin-bottom: 15px; display: block; }
        .info-card h3 { color: var(--page-navy); margin-bottom: 10px; font-size: 1.2rem; font-weight: 700; }
        .info-card a { color: #666; font-size: 0.95rem; word-break: break-all; display: block; }
        .info-card a:hover { color: var(--page-orange); }
        .info-section { background: var(--page-gray); }
        .info-list { max-width: 700px; margin: 30px auto 0; text-align: left; }
        .info-list li { background: white; padding: 18px 22px; margin-bottom: 12px; border-radius: 8px; display: flex; align-items: center; gap: 15px; border-left: 4px solid var(--page-orange); font-size: 1rem; color: #444; }
        .info-list li strong { color: var(--page-navy); min-width: 120px; display: inline-block; }
        .cta-section { background: var(--page-navy); color: white; text-align: center; padding: 80px 20px; }
        .cta-section h2 { color: white; font-size: 2.2rem; margin-bottom: 15px; }
        .cta-section p { color: #cbd5e1; margin-bottom: 20px; max-width: 700px; margin-left: auto; margin-right: auto; }
        .btn-group { margin-top: 30px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; }
        .btn { padding: 15px 30px; border-radius: 8px; font-weight: 600; transition: all 0.3s; display: inline-block; cursor: pointer; }
        .btn-primary { background: var(--page-orange); color: white; }
        .btn-primary:hover { background: #e55a2b; transform: translateY(-3px); }
        .btn-secondary { background: transparent; border: 2px solid white; color: white; }
        .btn-secondary:hover { background: white; color: var(--page-navy); }
        .pelc-ai-button { position: fixed; bottom: 25px; right: 25px; width: 65px; height: 65px; border-radius: 50%; background: linear-gradient(135deg, var(--gold-primary) 0%, #c99f2b 100%); color: var(--bg-dark); border: none; cursor: pointer; display: flex; justify-content: center; align-items: center; font-size: 28px; box-shadow: 0 6px 20px rgba(229, 183, 64, 0.5); z-index: 997; transition: transform 0.3s, box-shadow 0.3s; animation: pelcPulse 2.5s infinite; }
        .pelc-ai-button:hover { transform: scale(1.1) rotate(5deg); box-shadow: 0 10px 30px rgba(229, 183, 64, 0.7); animation: none; }
        .pelc-ai-button svg { width: 32px; height: 32px; fill: var(--bg-dark); }
        @keyframes pelcPulse { 0% { box-shadow: 0 0 0 0 rgba(229, 183, 64, 0.6); } 70% { box-shadow: 0 0 0 18px rgba(229, 183, 64, 0); } 100% { box-shadow: 0 0 0 0 rgba(229, 183, 64, 0); } }
        .pelc-ai-chat { position: fixed; bottom: 100px; right: 25px; width: 360px; height: 520px; max-height: calc(100vh - 130px); background: white; border-radius: 18px; box-shadow: 0 15px 50px rgba(0,0,0,0.25); display: flex; flex-direction: column; z-index: 997; overflow: hidden; opacity: 0; visibility: hidden; transform: translateY(20px) scale(0.95); transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .pelc-ai-chat.active { opacity: 1; visibility: visible; transform: translateY(0) scale(1); }
        .pelc-ai-header { background: linear-gradient(135deg, var(--bg-dark-blue) 0%, var(--bg-dark) 100%); color: white; padding: 16px 20px; display: flex; align-items: center; gap: 12px; border-bottom: 2px solid var(--gold-primary); }
        .pelc-ai-header .ai-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--gold-primary); display: flex; justify-content: center; align-items: center; color: var(--bg-dark); font-weight: 800; font-size: 1.1rem; flex-shrink: 0; }
        .pelc-ai-header .ai-title { flex: 1; }
        .pelc-ai-header .ai-title h4 { font-size: 1rem; font-weight: 700; color: var(--gold-primary); margin-bottom: 2px; }
        .pelc-ai-header .ai-title p { font-size: 0.72rem; color: var(--text-gray); display: flex; align-items: center; gap: 5px; }
        .pelc-ai-header .ai-title .online-dot { width: 7px; height: 7px; background: #25d366; border-radius: 50%; display: inline-block; animation: blink 1.5s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .pelc-ai-close { background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; line-height: 1; transition: transform 0.3s ease, color 0.3s ease; }
        .pelc-ai-close:hover { color: var(--gold-primary); transform: rotate(90deg); }
        .pelc-ai-messages { flex: 1; padding: 20px 18px; overflow-y: auto; background: #f9fafb; display: flex; flex-direction: column; gap: 12px; }
        .ai-msg { max-width: 82%; padding: 11px 15px; border-radius: 16px; font-size: 0.88rem; line-height: 1.5; word-wrap: break-word; animation: msgFade 0.3s ease; }
        @keyframes msgFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .ai-msg.bot { background: white; color: #333; align-self: flex-start; border-bottom-left-radius: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.06); border-left: 3px solid var(--gold-primary); }
        .ai-msg.user { background: linear-gradient(135deg, var(--gold-primary) 0%, #c99f2b 100%); color: var(--bg-dark); align-self: flex-end; border-bottom-right-radius: 4px; font-weight: 500; }
        .ai-typing { display: flex; gap: 4px; padding: 12px 16px; background: white; border-radius: 16px; border-bottom-left-radius: 4px; align-self: flex-start; box-shadow: 0 2px 6px rgba(0,0,0,0.06); border-left: 3px solid var(--gold-primary); }
        .ai-typing span { width: 7px; height: 7px; background: #bbb; border-radius: 50%; animation: typingDot 1.4s infinite; }
        .ai-typing span:nth-child(2) { animation-delay: 0.2s; }
        .ai-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingDot { 0%, 60%, 100% { transform: translateY(0); opacity: 0.5; } 30% { transform: translateY(-5px); opacity: 1; } }
        .pelc-ai-input-area { display: flex; align-items: center; gap: 8px; padding: 12px 14px; background: white; border-top: 1px solid #eee; }
        .pelc-ai-input-area input { flex: 1; padding: 11px 16px; border: 1.5px solid #e2e8f0; border-radius: 25px; font-size: 0.88rem; font-family: inherit; outline: none; transition: border-color 0.2s ease; }
        .pelc-ai-input-area input:focus { border-color: var(--gold-primary); }
        .pelc-ai-input-area button { width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, var(--gold-primary) 0%, #c99f2b 100%); border: none; color: var(--bg-dark); cursor: pointer; display: flex; justify-content: center; align-items: center; transition: transform 0.2s, box-shadow 0.2s; flex-shrink: 0; }
        .pelc-ai-input-area button:hover { transform: scale(1.08); box-shadow: 0 4px 12px rgba(229, 183, 64, 0.4); }
        .pelc-ai-input-area button svg { width: 18px; height: 18px; fill: var(--bg-dark); }
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
          .page-hero h1 { font-size: 2rem; } .page-hero p { font-size: 1rem; } .section-padding { padding: 60px 0; }
          .navbar { flex-direction: column; height: auto; padding: 20px; gap: 15px; } .nav-links { gap: 15px; flex-wrap: wrap; justify-content: center; }
          .footer-top { flex-direction: column; height: auto; padding: 30px 5% 60px; text-align: center; } .logo-area { flex-direction: column; gap: 10px; } .tagline { justify-content: center; }
          .building-image { width: 100%; opacity: 0.15; } .footer-middle { grid-template-columns: 1fr; padding: 30px 5%; } .footer-bottom { flex-direction: column; gap: 15px; text-align: center; } .divider { display: none; }
          .curve-svg { height: 30px; } .contact-sidebar { width: 300px; } .info-list li { flex-direction: column; align-items: flex-start; gap: 4px; }
          .pelc-ai-chat { width: calc(100vw - 30px); right: 15px; bottom: 95px; height: 480px; }
          .pelc-ai-button { width: 58px; height: 58px; bottom: 20px; right: 20px; }
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
              <a href="#" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><radialGradient id="instaGradSidebarContact" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="5%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs><path fill="url(#instaGradSidebarContact)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.189.63c-.737.288-1.362.673-1.984 1.296C1.583 2.548 1.198 3.173.91 3.91.613 4.626.412 5.496.352 6.774.015 8.054 0 8.461 0 12s.015 3.946.072 5.226c.06 1.278.261 2.148.558 2.864.288.737.673 1.362 1.296 1.984.622.622 1.247 1.008 1.984 1.296.716.297 1.586.498 2.864.558C8.054 23.985 8.461 24 12 24s3.946-.015 5.226-.072c1.278-.06 2.148-.261 2.864-.558.737-.288 1.362-.673 1.984-1.296.622-.622 1.008-1.247 1.296-1.984.297-.716.498-1.586.558-2.864.057-1.28.072-1.687.072-5.226s-.015-3.946-.072-5.226c-.06-1.278-.261-2.148-.558-2.864-.288-.737-.673-1.362-1.296-1.984-.622-.622-1.247-1.008-1.984-1.296-.716-.297-1.586-.498-2.864-.558C15.946.015 15.539 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><circle cx="18.406" cy="5.594" r="1.44" fill="#fff"/></svg></a>
              <a href="#" aria-label="X"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a href="#" aria-label="YouTube"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/><path fill="#fff" d="M9.545 15.568L15.818 12 9.545 8.432z"/></svg></a>
            </div>
          </div>
        </div>
      </div>

      <section className="page-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Chat with PELC AI or reach out through any of the channels below.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <h2>Contact Information</h2>
          <p>Choose the method that works best for you.</p>
          <div className="contact-grid">
            <div className="info-card">
              <span className="icon">✉️</span>
              <h3>Email Us</h3>
              <a href="mailto:popeeadlegacycompany@gmail.com">popeeadlegacycompany@gmail.com</a>
            </div>
            <div className="info-card">
              <span className="icon">📞</span>
              <h3>Call Us</h3>
              <a href="tel:0892236030">0892236030</a>
            </div>
            <div className="info-card">
              <span className="icon">💬</span>
              <h3>WhatsApp</h3>
              <a href="https://wa.me/0892236030">0892236030</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding info-section">
        <div className="container">
          <h2>Company Information</h2>
          <p>Here's a quick overview of who we are and where we operate.</p>
          <ul className="info-list">
            <li><strong>Company:</strong> POPE EAD LEGACY COMPANY (PELC)</li>
            <li><strong>Tagline:</strong> Innovate • Create • Generate</li>
            <li><strong>Location:</strong> Malawi | Serving clients globally</li>
            <li><strong>Response Time:</strong> Within 24 hours on business days</li>
            <li><strong>Working Hours:</strong> Mon – Fri, 8:00 AM – 6:00 PM (CAT)</li>
            <li><strong>Services:</strong> Web Development, Software, UX/UI Design, Advertisement, Marketing & Creative Publications</li>
          </ul>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Project?</h2>
          <p>Let's build something great together. Book a free consultation today and let our team bring your vision to life.</p>
          <div className="btn-group">
            <a href="mailto:popeeadlegacycompany@gmail.com" className="btn btn-primary">Email Us Now</a>
            <a href="https://wa.me/0892236030" className="btn btn-secondary">Chat on WhatsApp</a>
          </div>
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
            <a href="#" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><radialGradient id="instaGradFooterContact" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="5%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs><path fill="url(#instaGradFooterContact)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.189.63c-.737.288-1.362.673-1.984 1.296C1.583 2.548 1.198 3.173.91 3.91.613 4.626.412 5.496.352 6.774.015 8.054 0 8.461 0 12s.015 3.946.072 5.226c.06 1.278.261 2.148.558 2.864.288.737.673 1.362 1.296 1.984.622.622 1.247 1.008 1.984 1.296.716.297 1.586.498 2.864.558C8.054 23.985 8.461 24 12 24s3.946-.015 5.226-.072c1.278-.06 2.148-.261 2.864-.558.737-.288 1.362-.673 1.984-1.296.622-.622 1.008-1.247 1.296-1.984.297-.716.498-1.586.558-2.864.057-1.28.072-1.687.072-5.226s-.015-3.946-.072-5.226c-.06-1.278-.261-2.148-.558-2.864-.288-.737-.673-1.362-1.296-1.984-.622-.622-1.247-1.008-1.984-1.296-.716-.297-1.586-.498-2.864-.558C15.946.015 15.539 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/><circle cx="18.406" cy="5.594" r="1.44" fill="#fff"/></svg></a>
            <a href="#" aria-label="X"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#000000" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="#" aria-label="YouTube"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/><path fill="#fff" d="M9.545 15.568L15.818 12 9.545 8.432z"/></svg></a>
          </div>
          <div className="divider"></div>
          <div className="copyright"><p>&copy; 2025 PELC Company. All rights reserved.</p></div>
        </div>
      </footer>

      <button className="pelc-ai-button" onClick={() => setChatOpen(!chatOpen)} aria-label="Open PELC AI Chat">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 13.85 2.5 15.58 3.38 17.06L2.05 22L7.18 20.69C8.62 21.53 10.26 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"/>
          <circle cx="8" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="16" cy="12" r="1.5"/>
        </svg>
      </button>

      <div className={`pelc-ai-chat ${chatOpen ? 'active' : ''}`}>
        <div className="pelc-ai-header">
          <div className="ai-avatar">AI</div>
          <div className="ai-title">
            <h4>PELC AI</h4>
            <p><span className="online-dot"></span> Online — Ask me anything</p>
          </div>
          <button className="pelc-ai-close" onClick={() => setChatOpen(false)}>&times;</button>
        </div>
        <div className="pelc-ai-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`ai-msg ${msg.type}`} dangerouslySetInnerHTML={{ __html: msg.text }} />
          ))}
          {typing && (
            <div className="ai-typing"><span></span><span></span><span></span></div>
          )}
        </div>
        <div className="pelc-ai-input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
          />
          <button onClick={sendMessage} aria-label="Send Message">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}