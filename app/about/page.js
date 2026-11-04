import Link from 'next/link';

const values = [
  { number: '01', title: 'Thoughtful craft', text: 'We care about the details—from the first conversation to the final pixel—because good work should feel considered at every step.' },
  { number: '02', title: 'Clear partnership', text: 'You stay in the loop. We communicate plainly, share progress, and make decisions together without the unnecessary jargon.' },
  { number: '03', title: 'Practical creativity', text: 'We bring fresh thinking to real business challenges, making digital tools and experiences useful as well as beautiful.' },
  { number: '04', title: 'Built for growth', text: 'We create with your next chapter in mind, so the things we make can grow alongside your goals.' },
];

const process = [
  { number: '01', title: 'Listen', text: 'We learn about your business, your people, and what you want to make possible.' },
  { number: '02', title: 'Shape', text: 'Together, we turn the idea into a clear direction, scope, and plan.' },
  { number: '03', title: 'Make', text: 'Our team designs and builds with your feedback part of the process.' },
  { number: '04', title: 'Grow', text: 'We launch, learn, and stay ready to help with what comes next.' },
];

function FooterArrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" /></svg>;
}

export default function About() {
  return (
    <main className="about-page">
      <style jsx global>{`
        .about-page { --about-ink: #17241e; --about-forest: #15382e; --about-deep: #102b24; --about-lime: #d7f36a; --about-paper: #f7f7f1; --about-muted: #6f7972; --about-line: #dedfd5; color: var(--about-ink); background: var(--about-paper); font-family: var(--font-geist-sans), Arial, sans-serif; line-height: 1.7; }
        .about-page *, .about-page *::before, .about-page *::after { box-sizing: border-box; }
        .about-page a { color: inherit; text-decoration: none; }
        .about-width { width: min(1200px, calc(100% - 96px)); margin-inline: auto; }
        .about-nav { min-height: 70px; padding: 0 40px; display: flex; align-items: center; justify-content: space-between; gap: 24px; background: var(--about-deep); }
        .about-nav-logo { color: var(--about-lime) !important; font-size: 24px; font-weight: 800; }
        .about-nav-links { display: flex; gap: 30px; align-items: center; }
        .about-nav-links a { color: white; font-size: 15px; font-weight: 550; transition: color .2s; }
        .about-nav-links a:hover, .about-nav-links a:focus-visible { color: var(--about-lime); }
        .about-hero { position: relative; overflow: hidden; padding: 95px 0 103px; color: white; background: radial-gradient(ellipse at 82% 18%, rgba(215,243,106,.13), transparent 30%), var(--about-deep); }
        .about-hero::after { position: absolute; right: 7%; bottom: -180px; width: 440px; height: 440px; content: '✳'; color: rgba(215,243,106,.07); font-size: 420px; line-height: 1; pointer-events: none; }
        .about-eyebrow { margin: 0 0 20px; display: flex; align-items: center; gap: 10px; color: #c1d0c3; font-size: 10px; font-weight: 750; letter-spacing: 1.65px; text-transform: uppercase; }
        .about-eyebrow::before { width: 8px; height: 8px; content: ''; border-radius: 50%; background: var(--about-lime); box-shadow: 0 0 0 5px rgba(215,243,106,.12); }
        .about-hero h1 { max-width: 850px; margin: 0; font-size: clamp(48px, 7vw, 82px); line-height: 1.03; letter-spacing: -5px; font-weight: 620; }
        .about-hero h1 em, .about-heading em { color: var(--about-lime); font-family: Georgia, 'Times New Roman', serif; font-weight: 400; }
        .about-hero-copy { max-width: 600px; margin: 24px 0 0; color: #c0ccc3; font-size: 15px; line-height: 1.9; }
        .about-hero-meta { margin-top: 37px; display: flex; gap: 30px; color: #c1d0c3; font-size: 10px; }
        .about-hero-meta span + span::before { margin-right: 12px; color: var(--about-lime); content: '✳'; }
        .about-intro { padding: 100px 0; }
        .about-intro-grid { display: grid; grid-template-columns: .85fr 1.15fr; align-items: center; gap: 9%; }
        .about-founder-frame { min-height: 420px; position: relative; display: grid; place-items: center; overflow: hidden; background: #e8eadf; }
        .about-founder-frame::before { position: absolute; inset: 18px; border: 1px solid rgba(21,56,46,.18); content: ''; }
        .about-founder-frame img { width: 100%; height: 420px; object-fit: cover; object-position: center 18%; }
        .about-photo-caption { position: absolute; right: 0; bottom: 0; left: 0; padding: 16px 21px; color: white; background: linear-gradient(transparent, rgba(16,43,36,.88)); font-size: 10px; letter-spacing: .5px; }
        .about-section-label { margin: 0 0 17px; color: #718e2b; font-size: 10px; font-weight: 750; letter-spacing: 1.5px; text-transform: uppercase; }
        .about-heading { margin: 0; font-size: clamp(37px, 4.5vw, 56px); line-height: 1.08; letter-spacing: -3px; font-weight: 620; }
        .about-heading em { color: #829b42; }
        .about-copy p { margin: 19px 0 0; color: var(--about-muted); font-size: 13px; line-height: 1.9; }
        .about-signoff { margin-top: 26px; display: flex; align-items: center; gap: 12px; color: var(--about-forest); font-size: 11px; font-weight: 700; }
        .about-signoff span { width: 28px; height: 1px; background: #829b42; }
        .about-purpose { padding: 84px 0; background: #edefe5; }
        .about-purpose-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .about-purpose-card { min-height: 250px; padding: 33px; border: 1px solid #dfe1d7; background: var(--about-paper); }
        .about-purpose-card > span { color: #829b42; font-size: 10px; font-weight: 750; letter-spacing: 1.3px; }
        .about-purpose-card h2 { margin: 25px 0 12px; font-size: 26px; letter-spacing: -.8px; }
        .about-purpose-card p { max-width: 470px; margin: 0; color: var(--about-muted); font-size: 12px; line-height: 1.9; }
        .about-values { padding: 108px 0; }
        .about-values-heading { max-width: 620px; }
        .about-values-heading .about-heading em { color: #829b42; }
        .about-values-heading > p:last-child { max-width: 490px; margin: 18px 0 0; color: var(--about-muted); font-size: 12px; line-height: 1.9; }
        .about-values-grid { margin-top: 43px; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--about-line); border-left: 1px solid var(--about-line); }
        .about-value-card { min-height: 216px; padding: 23px 20px; border-right: 1px solid var(--about-line); border-bottom: 1px solid var(--about-line); }
        .about-value-card span { color: #829b42; font-size: 9px; font-weight: 750; letter-spacing: 1px; }
        .about-value-card h3 { margin: 26px 0 9px; font-size: 17px; letter-spacing: -.3px; }
        .about-value-card p { margin: 0; color: var(--about-muted); font-size: 10px; line-height: 1.8; }
        .about-process { padding: 95px 0; color: white; background: var(--about-forest); }
        .about-process-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 10%; }
        .about-process .about-section-label { color: var(--about-lime); }
        .about-process .about-heading { max-width: 420px; color: white; }
        .about-process .about-heading em { color: var(--about-lime); }
        .about-process-intro { max-width: 390px; margin: 18px 0 0; color: #bfcdc2; font-size: 12px; line-height: 1.9; }
        .about-process-list { border-top: 1px solid rgba(255,255,255,.2); }
        .about-process-step { min-height: 84px; padding: 16px 0; display: grid; grid-template-columns: 42px 1fr; gap: 12px; border-bottom: 1px solid rgba(255,255,255,.2); }
        .about-process-step > span { padding-top: 3px; color: var(--about-lime); font-size: 10px; font-weight: 700; }
        .about-process-step h3 { margin: 0 0 4px; font-size: 14px; }
        .about-process-step p { max-width: 460px; margin: 0; color: #bfcdc2; font-size: 10px; line-height: 1.8; }
        .about-cta { padding: 83px 20px; color: white; background: var(--about-deep); text-align: center; }
        .about-cta .about-section-label { color: var(--about-lime); }
        .about-cta h2 { margin: 0; font-size: clamp(38px, 5vw, 58px); line-height: 1.1; letter-spacing: -3px; font-weight: 620; }
        .about-cta h2 em { color: var(--about-lime); font-family: Georgia, 'Times New Roman', serif; font-weight: 400; }
        .about-cta p:not(.about-section-label) { max-width: 570px; margin: 16px auto 23px; color: #c0ccc3; font-size: 12px; }
        .about-cta-link { min-height: 48px; padding: 0 20px; display: inline-flex; align-items: center; gap: 16px; border-radius: 3px; color: var(--about-deep) !important; background: var(--about-lime); font-size: 11px; font-weight: 700; transition: background .2s, transform .2s; }
        .about-cta-link:hover { transform: translateY(-2px); background: white; }
        /* Keep the established four-column PELC footer layout; use the refreshed forest palette. */
        .about-footer { width: 100%; position: relative; overflow: hidden; color: white; background: #0c211b; line-height: 1.7; }
        .about-footer-top { height: 220px; padding: 0 5%; position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: center; background: linear-gradient(135deg, #15382e, #102b24); }
        .about-building-image { position: absolute; inset: 0 0 0 auto; width: 55%; opacity: .5; background: radial-gradient(ellipse at 75% 38%, rgba(215,243,106,.22), transparent 30%), linear-gradient(135deg, #15382e, #102b24); }
        .about-logo-area { position: relative; z-index: 12; display: flex; align-items: center; gap: 20px; }
        .about-logo-icon { width: 90px; height: 90px; display: flex; align-items: center; justify-content: center; }
        .about-logo-icon img { width: 100%; height: 100%; border-radius: 50%; object-fit: contain; filter: drop-shadow(0 4px 6px rgba(0,0,0,.35)); }
        .about-logo-text p { margin: 5px 0 0; color: #d8e2d8; font-size: .75rem; letter-spacing: 1px; text-transform: uppercase; }
        .about-tagline { margin-top: 10px; display: flex; gap: 15px; color: #bdcabe; font-size: .85rem; font-style: italic; }.about-tagline span::after { margin-left: 10px; color: var(--about-lime); content: '•'; }.about-tagline span:last-child::after { content: ''; }
        .about-curve { width: 100%; height: 60px; position: absolute; z-index: 10; bottom: -1px; left: 0; pointer-events: none; }
        .about-footer-middle { padding: 20px 5% 30px; position: relative; z-index: 2; display: grid; grid-template-columns: 1.2fr .8fr 1fr 1.2fr; gap: 25px; background: #0c211b; }
        .about-footer-col h3 { margin: 0 0 15px; padding-bottom: 8px; position: relative; color: var(--about-lime); font-size: 1.1rem; font-weight: 700; }.about-footer-col h3::after { width: 35px; height: 2px; position: absolute; left: 0; bottom: 0; content: ''; background: var(--about-lime); }
        .about-footer-col p { margin: 0 0 15px; color: #b3c1b6; font-size: .85rem; line-height: 1.5; }.about-footer-col .about-quote { margin-top: 15px; color: white; font-style: italic; font-weight: 500; }
        .about-footer-col ul { margin: 0; padding: 0; list-style: none; }.about-footer-col ul li { margin-bottom: 8px; }.about-footer-col ul li a { display: flex; align-items: center; gap: 8px; color: #b3c1b6; font-size: .85rem; transition: color .2s; }.about-footer-col ul li a:hover { color: var(--about-lime); }.about-footer-col ul li a svg { width: 9px; height: 9px; flex: 0 0 auto; fill: var(--about-lime); transition: transform .2s; }.about-footer-col ul li a:hover svg { transform: translateX(5px); }
        .about-footer-contact { margin-bottom: 12px; display: flex; align-items: center; gap: 12px; }.about-contact-icon { width: 36px; height: 36px; flex-shrink: 0; display: grid; place-items: center; border-radius: 50%; color: var(--about-deep); background: var(--about-lime); font-size: 16px; }.about-contact-info h4 { margin: 0 0 2px; color: white; font-size: .85rem; font-weight: 600; }.about-contact-info a { color: #b3c1b6; font-size: .75rem; overflow-wrap: anywhere; }.about-contact-info a:hover { color: var(--about-lime); }
        .about-footer-bottom { min-height: 60px; padding: 12px 5%; display: flex; justify-content: center; align-items: center; gap: 20px; border-top: 1px solid rgba(215,243,106,.25); background: #0c211b; }.about-socials { display: flex; gap: 10px; }.about-socials a { width: 32px; height: 32px; display: grid; place-items: center; border: 1px solid rgba(215,243,106,.36); border-radius: 50%; color: var(--about-lime); font-size: 13px; font-weight: 700; transition: transform .2s, background .2s; }.about-socials a:hover { transform: translateY(-4px); background: rgba(215,243,106,.14); }.about-divider { width: 1px; height: 20px; background: rgba(215,243,106,.45); }.about-copyright { margin: 0; color: #b3c1b6; font-size: .75rem; }
        @media (max-width: 1024px) { .about-footer-middle { grid-template-columns: 1fr 1fr; }.about-values-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .about-width { width: min(100% - 56px, 720px); }.about-nav { padding-inline: 28px; }.about-nav-links { gap: 18px; }.about-intro-grid, .about-process-grid { gap: 7%; }.about-founder-frame, .about-founder-frame img { min-height: 360px; height: 360px; }.about-purpose-card { padding: 25px; }.about-footer-top { height: auto; min-height: 190px; padding: 30px 5% 60px; }.about-footer-middle { grid-template-columns: 1fr 1fr; padding: 25px 5%; }.about-footer-bottom { flex-wrap: wrap; } }
        @media (max-width: 560px) { .about-width { width: calc(100% - 40px); }.about-nav { min-height: 70px; padding: 12px 20px; gap: 10px; }.about-nav-logo { font-size: 21px; }.about-nav-links { justify-content: flex-end; flex-wrap: wrap; gap: 6px 12px; }.about-nav-links a { font-size: 11px; }.about-hero { padding: 72px 0 65px; }.about-hero h1 { font-size: clamp(46px, 12vw, 62px); letter-spacing: -3.4px; }.about-hero-copy { font-size: 13px; }.about-hero-meta { gap: 14px; flex-wrap: wrap; font-size: 9px; }.about-intro { padding: 66px 0; }.about-intro-grid, .about-purpose-grid, .about-process-grid { grid-template-columns: 1fr; gap: 30px; }.about-founder-frame, .about-founder-frame img { min-height: 330px; height: 330px; }.about-heading { font-size: 42px; letter-spacing: -2.5px; }.about-purpose { padding: 62px 0; }.about-purpose-card { min-height: 0; padding: 25px; }.about-purpose-card h2 { margin-top: 17px; }.about-values { padding: 70px 0; }.about-values-grid { margin-top: 30px; grid-template-columns: 1fr; }.about-value-card { min-height: 0; padding: 21px; }.about-value-card h3 { margin-top: 17px; }.about-process { padding: 68px 0; }.about-cta { padding: 68px 20px; }.about-cta h2 { font-size: 42px; letter-spacing: -2.4px; }.about-footer-top { min-height: 170px; padding: 25px 20px 45px; justify-content: center; text-align: center; }.about-logo-area { flex-direction: column; gap: 8px; }.about-logo-icon { width: 64px; height: 64px; }.about-tagline { justify-content: center; font-size: .72rem; }.about-footer-middle { grid-template-columns: 1fr; padding: 25px 24px; }.about-footer-col h3 { font-size: 1rem; }.about-footer-col p, .about-footer-col ul li a { font-size: .8rem; }.about-footer-bottom { flex-direction: column; gap: 10px; text-align: center; }.about-divider { width: 40px; height: 1px; } }
        @media (prefers-reduced-motion: reduce) { .about-page *, .about-page *::before, .about-page *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; } }
      `}</style>

      <nav className="about-nav" aria-label="Main navigation">
        <Link className="about-nav-logo" href="/" aria-label="PELC home">PELC</Link>
        <div className="about-nav-links">
          <Link href="/">Home</Link>
          <Link href="/about" aria-current="page">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>

      <section className="about-hero">
        <div className="about-width">
          <p className="about-eyebrow">A little about us</p>
          <h1>We make digital work feel <em>more human.</em></h1>
          <p className="about-hero-copy">POPE EAD LEGACY COMPANY is an independent digital studio in Malawi. We bring strategy, design, and technology together to help people turn good ideas into meaningful progress.</p>
          <div className="about-hero-meta"><span>Based in Malawi</span><span>Working with people everywhere</span></div>
        </div>
      </section>

      <section className="about-intro">
        <div className="about-width about-intro-grid">
          <div className="about-founder-frame"><img src="/founder.png" alt="Edmond Chinyamu, founder of POPE EAD LEGACY COMPANY" /><div className="about-photo-caption">EDMOND CHINYAMU · FOUNDER</div></div>
          <div className="about-copy">
            <p className="about-section-label">Who we are</p>
            <h2 className="about-heading">A small team for <em>big possibilities.</em></h2>
            <p>We started PELC with a simple belief: every business deserves thoughtful digital work, not a one-size-fits-all solution. We partner with startups, organizations, and growing businesses to make the internet work better for them.</p>
            <p>From websites and software to design and marketing, we bring the right mix of skills to each challenge. We listen first, make a clear plan, and stay close from the first idea through launch and beyond.</p>
            <div className="about-signoff"><span /> Innovate · Create · Generate</div>
          </div>
        </div>
      </section>

      <section className="about-purpose"><div className="about-width about-purpose-grid">
        <article className="about-purpose-card"><span>OUR MISSION</span><h2>Make useful things that move people forward.</h2><p>We create digital products and experiences that solve real problems, make businesses stronger, and help good ideas reach the people who need them.</p></article>
        <article className="about-purpose-card"><span>OUR VISION</span><h2>A more creative, connected future.</h2><p>We want businesses everywhere to have access to clear thinking, good design, and dependable technology that helps them grow on their own terms.</p></article>
      </div></section>

      <section className="about-values"><div className="about-width"><div className="about-values-heading"><p className="about-section-label">What guides us</p><h2 className="about-heading">Good work is built on <em>good values.</em></h2><p>They shape how we work with each other, our clients, and every challenge we take on.</p></div><div className="about-values-grid">{values.map((value) => <article className="about-value-card" key={value.number}><span>{value.number} / 04</span><h3>{value.title}</h3><p>{value.text}</p></article>)}</div></div></section>

      <section className="about-process"><div className="about-width about-process-grid"><div><p className="about-section-label">How we work</p><h2 className="about-heading">A good process makes <em>room for good work.</em></h2><p className="about-process-intro">We keep the journey collaborative and easy to follow, so you always know what’s happening and why.</p></div><div className="about-process-list">{process.map((step) => <article className="about-process-step" key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div></div></section>

      <section className="about-cta"><div className="about-width"><p className="about-section-label">Have something in mind?</p><h2>Let’s make your next idea <em>real.</em></h2><p>Tell us what you’re working on. We’ll bring curiosity, a thoughtful plan, and the right people to help move it forward.</p><Link className="about-cta-link" href="/consultation">Start a conversation <span aria-hidden="true">↗</span></Link></div></section>

      <footer className="about-footer">
        <div className="about-footer-top"><div className="about-building-image" aria-hidden="true" /><div className="about-logo-area"><div className="about-logo-icon"><img src="/logo.jpg" alt="PELC Company Logo" /></div><div className="about-logo-text"><p>POPE EAD LEGACY COMPANY</p><div className="about-tagline"><span>Innovate</span><span>Create</span><span>Generate</span></div></div></div><svg className="about-curve" viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M0,100 L1440,100 L1440,40 C1200,40 900,0 500,0 C250,0 100,40 0,100 Z" fill="#0c211b" /></svg></div>
        <div className="about-footer-middle">
          <div className="about-footer-col"><h3>PELC Company</h3><p>We are a digital solutions company focused on building a better tomorrow through technology, creativity and innovation.</p><p className="about-quote">“Innovate. Create. Generate.”</p></div>
          <div className="about-footer-col"><h3>Quick Links</h3><ul><li><Link href="/"><FooterArrow />Home</Link></li><li><Link href="/about"><FooterArrow />About</Link></li><li><Link href="/services"><FooterArrow />Services</Link></li><li><Link href="/event"><FooterArrow />Event</Link></li><li><Link href="/contact"><FooterArrow />Contact</Link></li></ul></div>
          <div className="about-footer-col"><h3>Our Services</h3><ul><li><Link href="/wdd"><FooterArrow />Website Development</Link></li><li><Link href="/sdd"><FooterArrow />Software Development</Link></li><li><Link href="/cpd"><FooterArrow />Creative and Publication</Link></li><li><Link href="/ud"><FooterArrow />UX/UI Design</Link></li><li><Link href="/ad"><FooterArrow />Advertisement</Link></li><li><Link href="/md"><FooterArrow />Marketing</Link></li></ul></div>
          <div className="about-footer-col"><h3>Contact Us</h3><div className="about-footer-contact"><span className="about-contact-icon">✉</span><div className="about-contact-info"><h4>Email</h4><a href="mailto:popeeadlegacycompany@gmail.com">popeeadlegacycompany@gmail.com</a></div></div><div className="about-footer-contact"><span className="about-contact-icon">☎</span><div className="about-contact-info"><h4>Phone</h4><a href="tel:0892236030">0892236030</a></div></div><div className="about-footer-contact"><span className="about-contact-icon">↗</span><div className="about-contact-info"><h4>WhatsApp</h4><a href="https://wa.me/265892236030">Chat with our team</a></div></div></div>
        </div>
        <div className="about-footer-bottom"><div className="about-socials"><a href="/contact" aria-label="Facebook">f</a><a href="/contact" aria-label="Instagram">◎</a><a href="/contact" aria-label="X">𝕏</a><a href="/contact" aria-label="YouTube">▶</a></div><div className="about-divider" /><p className="about-copyright">© {new Date().getFullYear()} PELC Company. All rights reserved.</p></div>
      </footer>
    </main>
  );
}
