'use client';

import { useState } from 'react';
import Link from 'next/link';

const services = [
  {
    number: '01',
    title: 'Websites that work harder',
    description: 'Fast, thoughtful websites that make it easy for the right people to understand what you do—and take the next step.',
    tags: ['Web development', 'E-commerce', 'SEO-ready'],
    href: '/wdd',
    icon: '↗',
  },
  {
    number: '02',
    title: 'Software built around you',
    description: 'Useful digital tools, platforms, and mobile apps shaped around your team, your customers, and the way your business runs.',
    tags: ['Custom software', 'Mobile apps', 'Integrations'],
    href: '/sdd',
    icon: '⌘',
  },
  {
    number: '03',
    title: 'Design with a point of view',
    description: 'Clear, consistent visual identities and intuitive interfaces that help your brand feel unmistakably yours.',
    tags: ['UI/UX design', 'Brand identity', 'Creative'],
    href: '/ud',
    icon: '✳',
  },
  {
    number: '04',
    title: 'Get the word out',
    description: 'Bring the right people to your business with considered marketing, advertising, and ongoing creative support.',
    tags: ['Marketing', 'Advertising', 'Content'],
    href: '/md',
    icon: '◎',
  },
];

const steps = [
  { number: '01', title: 'Let’s get clear', text: 'We start with a real conversation about your goals, audience, and what success looks like.' },
  { number: '02', title: 'Make a smart plan', text: 'You get a clear scope, a practical timeline, and a direction we can both get excited about.' },
  { number: '03', title: 'Build it together', text: 'We share progress as we go, get your feedback early, and make the important details count.' },
  { number: '04', title: 'Launch and keep growing', text: 'We help you get live, then stay available for the next improvement, update, or big idea.' },
];

const projectOptions = [
  { id: 'website', label: 'A new or better website', detail: 'A clear home for your business online.' },
  { id: 'app', label: 'An app or digital product', detail: 'A useful product for your team or customers.' },
  { id: 'brand', label: 'Design or brand support', detail: 'A more distinct and consistent identity.' },
  { id: 'growth', label: 'Marketing and growth', detail: 'A plan to reach and engage more people.' },
];

const projectAdvice = {
  website: 'A great place to start is with your audience, your key message, and the one action you want visitors to take.',
  app: 'We can help shape the idea, define a useful first version, and map out how it could work in the real world.',
  brand: 'Let’s find the story and visual direction that make your business easier to recognize and remember.',
  growth: 'We can start with your audience and goals, then choose the channels and creative that make sense for you.',
};

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [project, setProject] = useState(null);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="PELC home" onClick={closeMenu}>
            <span className="brand-mark">P<span>.</span></span>
            <span className="brand-name">PELC <small>POPE EAD LEGACY COMPANY</small></span>
          </Link>
          <button
            className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span />
          </button>
          <nav id="primary-navigation" className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            <Link href="/services" onClick={closeMenu}>What we do</Link>
            <a href="#approach" onClick={closeMenu}>How we work</a>
            <Link href="/about" onClick={closeMenu}>About us</Link>
            <Link className="nav-cta" href="/consultation" onClick={closeMenu}>Let’s talk <Arrow diagonal /></Link>
          </nav>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-inner page-width">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-light"><span className="status-dot" /> Digital studio · Malawi and beyond</p>
            <h1 id="hero-title">Good ideas deserve <em>great digital.</em></h1>
            <p className="hero-intro">We design and build websites, apps, and brands that help ambitious businesses move forward.</p>
            <div className="hero-actions">
              <Link className="button button-lime" href="/consultation">Tell us what you’re building <Arrow diagonal /></Link>
              <a className="text-link text-link-light" href="#services">Explore what we do <Arrow /></a>
            </div>
            <div className="hero-note"><span className="note-line" /> Thoughtful by design. Built to make a difference.</div>
          </div>
          <div className="hero-art" aria-label="Illustration of a digital product taking shape" role="img">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-sun" />
            <div className="art-card art-card-main">
              <div className="art-card-top"><span className="art-window-dots"><i /><i /><i /></span><span className="art-menu">•••</span></div>
              <div className="art-card-body">
                <div className="art-label">A clearer way forward</div>
                <div className="art-headline">Make your<br /><span>next move</span><br />matter.</div>
                <div className="art-lines"><i /><i /><i /></div>
                <div className="art-button">Let’s begin <Arrow diagonal /></div>
              </div>
              <div className="art-card-foot"><span>DESIGNED WITH PURPOSE</span><span>✳</span></div>
            </div>
            <div className="art-chip chip-top"><span className="chip-icon">✳</span><span>Ideas into impact</span></div>
            <div className="art-chip chip-bottom"><span className="chip-icon chip-dark">↗</span><span>Built for what’s next</span></div>
            <div className="art-star star-one">✳</div><div className="art-star star-two">✳</div>
          </div>
        </div>
        <div className="hero-bottom page-width"><span>Independent thinking, collaborative making.</span><a href="#services">Scroll to explore <span aria-hidden="true">↓</span></a></div>
      </section>

      <section className="intro-strip" aria-label="Our approach">
        <div className="page-width intro-inner"><p>We turn <span>big ideas</span> into useful digital experiences—with strategy, creativity, and care at every step.</p><div className="intro-stamp" aria-hidden="true">INNOVATE<br />CREATE<br />GENERATE<span>✳</span></div></div>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="page-width">
          <div className="section-heading">
            <div><p className="eyebrow"><span className="eyebrow-mark">01</span> What we do</p><h2>One good partner.<br /><em>Many ways to grow.</em></h2></div>
            <div className="section-aside"><p>From the first sketch to the next big milestone, we bring the right people and skills around your challenge.</p><Link className="text-link" href="/services">Discover all our services <Arrow /></Link></div>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <Link className="service-card" href={service.href} key={service.number}>
                <div className="service-card-head"><span className="service-number">{service.number} / 04</span><span className="service-icon">{service.icon}</span></div>
                <h3>{service.title}</h3><p>{service.description}</p>
                <div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <span className="service-arrow" aria-label={`Learn about ${service.title}`}><Arrow diagonal /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="approach-section section-pad" id="approach">
        <div className="page-width approach-layout">
          <div className="approach-intro"><p className="eyebrow eyebrow-light"><span className="eyebrow-mark">02</span> A better way to build</p><h2>Good work starts with <em>good questions.</em></h2><p>No mystery process. No disappearing act. Just a close-knit team, thoughtful work, and a clear path from idea to launch.</p><Link className="button button-outline" href="/about">Get to know us <Arrow diagonal /></Link><div className="approach-asterisk" aria-hidden="true">✳</div></div>
          <div className="steps-list">
            {steps.map((step) => <article className="step-row" key={step.number}><span className="step-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><span className="step-arrow" aria-hidden="true">↗</span></article>)}
          </div>
        </div>
      </section>

      <section className="planner-section section-pad" id="project-planner">
        <div className="page-width planner-layout">
          <div className="planner-copy"><p className="eyebrow"><span className="eyebrow-mark">03</span> Start with an idea</p><h2>Not sure where to start? <em>Start here.</em></h2><p>Tell us what’s on your mind. We’ll point you toward a useful next step—no pressure, just a good place to begin.</p><div className="planner-footnote"><span>✳</span> A little clarity can go a long way.</div></div>
          <div className="planner-card" aria-live="polite">
            {!project ? <>
              <div className="planner-card-head"><span className="planner-kicker">YOUR PROJECT, IN A NUTSHELL</span><span className="planner-count">PICK ONE</span></div>
              <h3>What would you like to make happen?</h3>
              <div className="project-options">{projectOptions.map((option) => <button className="project-option" key={option.id} type="button" onClick={() => setProject(option.id)}><span className="option-symbol">↗</span><span><strong>{option.label}</strong><small>{option.detail}</small></span><span className="option-arrow">→</span></button>)}</div>
              <p className="planner-disclaimer">Not a quote or assessment—just a helpful first step.</p>
            </> : <div className="planner-result"><span className="result-icon">✳</span><p className="planner-kicker">A GOOD PLACE TO BEGIN</p><h3>{projectOptions.find((option) => option.id === project)?.label}</h3><p>{projectAdvice[project]}</p><div className="result-actions"><Link className="button button-dark" href={`/consultation?project=${project}`}>Let’s talk about it <Arrow diagonal /></Link><button className="reset-button" type="button" onClick={() => setProject(null)}>Choose something else</button></div></div>}
          </div>
        </div>
      </section>

      <section className="values-band"><div className="page-width values-inner"><p>Made with intention</p><span>Clear communication</span><i>✳</i><span>Practical creativity</span><i>✳</i><span>Built to keep growing</span></div></section>

      <section className="faq-section section-pad">
        <div className="page-width faq-layout"><div><p className="eyebrow"><span className="eyebrow-mark">04</span> A few good questions</p><h2>Before we <em>get started.</em></h2><p className="faq-intro">Every project is different. Here are a few things people often ask us.</p><Link className="text-link" href="/contact">Have another question? Get in touch <Arrow /></Link></div>
          <div className="faq-list">
            <details><summary>What kind of projects do you take on?<span>+</span></summary><p>We work across web development, software and mobile apps, UI/UX and creative design, advertising, and marketing. If you have an idea but aren’t sure what it needs, we’re happy to help you figure out a starting point.</p></details>
            <details><summary>How does a project usually begin?<span>+</span></summary><p>It starts with a conversation. We’ll learn about your goals and audience, talk through what’s possible, and agree on a clear scope and next steps before the work begins.</p></details>
            <details><summary>Can you help after launch?<span>+</span></summary><p>Yes. We can support ongoing updates, maintenance, and improvements after launch, so your digital presence can keep up as your business changes.</p></details>
            <details><summary>Where are you based?<span>+</span></summary><p>We’re based in Malawi and work with businesses and teams wherever they are.</p></details>
          </div>
        </div>
      </section>

      <section className="final-cta"><div className="cta-orb" aria-hidden="true" /><div className="page-width final-cta-inner"><p className="eyebrow eyebrow-light"><span className="status-dot" /> YOUR NEXT CHAPTER STARTS HERE</p><h2>Let’s make something <em>matter.</em></h2><p>Have an idea, a challenge, or just a feeling it could be better? We’d love to hear about it.</p><Link className="button button-lime" href="/consultation">Start a conversation <Arrow diagonal /></Link></div><span className="cta-decoration" aria-hidden="true">✳</span></section>

      <footer className="site-footer">
        <div className="page-width footer-main"><div className="footer-brand"><Link className="brand brand-footer" href="/"><span className="brand-mark">P<span>.</span></span><span className="brand-name">PELC <small>POPE EAD LEGACY COMPANY</small></span></Link><p>Good ideas deserve great digital.<br />Thoughtful work for a changing world.</p></div><div className="footer-links"><div><h2>Explore</h2><Link href="/about">About us</Link><Link href="/services">Our services</Link><Link href="/event">Events</Link></div><div><h2>What we do</h2><Link href="/wdd">Web development</Link><Link href="/sdd">Software development</Link><Link href="/ud">UI/UX design</Link><Link href="/md">Marketing</Link></div><div><h2>Get in touch</h2><Link href="/contact">Contact us</Link><Link href="/consultation">Book a consultation</Link></div></div></div>
        <div className="page-width footer-bottom"><span>© {new Date().getFullYear()} PELC · Pope Ead Legacy Company</span><span>Thoughtful by design. Built with purpose. <i>✳</i></span></div>
      </footer>
    </main>
  );
}
