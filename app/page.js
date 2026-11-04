'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ContactDrawer from '@/components/ContactDrawer';
import Footer from '@/components/Footer';

const services = [
  {
    number: '01',
    code: 'WDD',
    title: 'Website Development',
    tagline: 'Websites that work harder',
    description: 'Fast, thoughtful websites that make it easy for the right people to understand what you do—and take the next step.',
    tags: ['Web development', 'E-commerce', 'SEO-ready'],
    href: '/wdd',
    icon: '💻',
  },
  {
    number: '02',
    code: 'SDD',
    title: 'Software Development',
    tagline: 'Software built around you',
    description: 'Useful digital tools, platforms, and mobile apps shaped around your team, your customers, and the way your business runs.',
    tags: ['Custom software', 'Mobile apps', 'Integrations'],
    href: '/sdd',
    icon: '⚙️',
  },
  {
    number: '03',
    code: 'UD',
    title: 'UX/UI Design',
    tagline: 'Design with a point of view',
    description: 'Clear, consistent visual identities and intuitive interfaces that help your brand feel unmistakably yours.',
    tags: ['UI/UX design', 'Brand identity', 'Figma'],
    href: '/ud',
    icon: '🎨',
  },
  {
    number: '04',
    code: 'AD',
    title: 'Advertisement',
    tagline: 'Campaigns that command attention',
    description: 'Targeted pay-per-click and multi-channel digital ad campaigns engineered to turn marketing budget into revenue.',
    tags: ['Google Ads', 'Meta Ads', 'LinkedIn B2B'],
    href: '/ad',
    icon: '📣',
  },
  {
    number: '05',
    code: 'MD',
    title: 'Marketing',
    tagline: 'Get the word out',
    description: 'Bring the right people to your business with considered organic search visibility, content strategy, and ongoing growth.',
    tags: ['SEO', 'Content Strategy', 'Social Growth'],
    href: '/md',
    icon: '📈',
  },
  {
    number: '06',
    code: 'CPD',
    title: 'Creative & Publication',
    tagline: 'Crafted for lasting presence',
    description: 'Logos, publications, bulletins, and corporate collateral that establish an unmistakable presence in print and digital.',
    tags: ['Brand Identity', 'Publications', 'Bulletins'],
    href: '/cpd',
    icon: '🖌️',
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
  const [project, setProject] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main>
      <Navbar onOpenContact={() => setContactOpen(true)} activePage="home" />
      <ContactDrawer isOpen={contactOpen} onClose={() => setContactOpen(false)} />

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
              <div className="art-card-top">
                <span className="art-window-dots"><i /><i /><i /></span>
                <span className="art-menu">•••</span>
              </div>
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
            <div className="art-star star-one">✳</div>
            <div className="art-star star-two">✳</div>
          </div>
        </div>
        <div className="hero-bottom page-width">
          <span>Independent thinking, collaborative making.</span>
          <a href="#services">Scroll to explore <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="intro-strip" aria-label="Our approach">
        <div className="page-width intro-inner">
          <p>We turn <span>big ideas</span> into useful digital experiences—with strategy, creativity, and care at every step.</p>
          <div className="intro-stamp" aria-hidden="true">INNOVATE<br />CREATE<br />GENERATE<span>✳</span></div>
        </div>
      </section>

      {/* Services Hover Cards Grid */}
      <section className="services-section section-pad" id="services">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-mark">01</span> What we do</p>
              <h2>One good partner.<br /><em>Hover cards to explore.</em></h2>
            </div>
            <div className="section-aside">
              <p>From the first sketch to the next big milestone, we bring the right specialists around your challenge.</p>
              <Link className="text-link" href="/services">Discover all our services <Arrow /></Link>
            </div>
          </div>

          <div className="home-hover-grid">
            {services.map((service) => (
              <Link className="home-hover-card" href={service.href} key={service.code}>
                <div className="home-card-top-bar" />

                <div className="home-card-head">
                  <span className="home-badge">{service.code}</span>
                  <span className="home-number">{service.number} / 06</span>
                </div>

                <div className="home-card-title-row">
                  <span className="home-card-icon">{service.icon}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p className="home-tagline">{service.tagline}</p>
                  </div>
                </div>

                <p className="home-card-desc">{service.description}</p>

                <div className="home-card-tags">
                  {service.tags.map((tag) => (
                    <span key={tag} className="home-tag">{tag}</span>
                  ))}
                </div>

                <div className="home-card-foot">
                  <span className="home-explore-action">
                    Explore {service.code} <span className="home-explore-arrow">↗</span>
                  </span>
                  <span className="home-view-hint">View department</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="approach-section section-pad" id="approach">
        <div className="page-width approach-layout">
          <div className="approach-intro">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-mark">02</span> A better way to build</p>
            <h2>Good work starts with <em>good questions.</em></h2>
            <p>No mystery process. No disappearing act. Just a close-knit team, thoughtful work, and a clear path from idea to launch.</p>
            <Link className="button button-outline" href="/about">Get to know us <Arrow diagonal /></Link>
            <div className="approach-asterisk" aria-hidden="true">✳</div>
          </div>
          <div className="steps-list">
            {steps.map((step) => (
              <article className="step-row" key={step.number}>
                <span className="step-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <span className="step-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="planner-section section-pad" id="project-planner">
        <div className="page-width planner-layout">
          <div className="planner-copy">
            <p className="eyebrow"><span className="eyebrow-mark">03</span> Start with an idea</p>
            <h2>Not sure where to start? <em>Start here.</em></h2>
            <p>Tell us what’s on your mind. We’ll point you toward a useful next step—no pressure, just a good place to begin.</p>
            <div className="planner-footnote"><span>✳</span> A little clarity can go a long way.</div>
          </div>
          <div className="planner-card" aria-live="polite">
            {!project ? (
              <>
                <div className="planner-card-head">
                  <span className="planner-kicker">YOUR PROJECT, IN A NUTSHELL</span>
                  <span className="planner-count">PICK ONE</span>
                </div>
                <h3>What would you like to make happen?</h3>
                <div className="project-options">
                  {projectOptions.map((option) => (
                    <button className="project-option" key={option.id} type="button" onClick={() => setProject(option.id)}>
                      <span className="option-symbol">↗</span>
                      <span><strong>{option.label}</strong><small>{option.detail}</small></span>
                      <span className="option-arrow">→</span>
                    </button>
                  ))}
                </div>
                <p className="planner-disclaimer">Not a quote or assessment—just a helpful first step.</p>
              </>
            ) : (
              <div className="planner-result">
                <span className="result-icon">✳</span>
                <p className="planner-kicker">A GOOD PLACE TO BEGIN</p>
                <h3>{projectOptions.find((option) => option.id === project)?.label}</h3>
                <p>{projectAdvice[project]}</p>
                <div className="result-actions">
                  <Link className="button button-dark" href={`/consultation?project=${project}`}>
                    Let’s talk about it <Arrow diagonal />
                  </Link>
                  <button className="reset-button" type="button" onClick={() => setProject(null)}>
                    Choose something else
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="values-band">
        <div className="page-width values-inner">
          <p>Made with intention</p>
          <span>Clear communication</span>
          <i>✳</i>
          <span>Practical creativity</span>
          <i>✳</i>
          <span>Built to keep growing</span>
        </div>
      </section>

      <section className="faq-section section-pad">
        <div className="page-width faq-layout">
          <div>
            <p className="eyebrow"><span className="eyebrow-mark">04</span> A few good questions</p>
            <h2>Before we <em>get started.</em></h2>
            <p className="faq-intro">Every project is different. Here are a few things people often ask us.</p>
            <Link className="text-link" href="/contact">Have another question? Get in touch <Arrow /></Link>
          </div>
          <div className="faq-list">
            <details>
              <summary>What kind of projects do you take on?<span>+</span></summary>
              <p>We work across web development, software and mobile apps, UI/UX and creative design, advertising, and marketing. If you have an idea but aren’t sure what it needs, we’re happy to help you figure out a starting point.</p>
            </details>
            <details>
              <summary>How does a project usually begin?<span>+</span></summary>
              <p>It starts with a conversation. We’ll learn about your goals and audience, talk through what’s possible, and agree on a clear scope and next steps before the work begins.</p>
            </details>
            <details>
              <summary>Can you help after launch?<span>+</span></summary>
              <p>Yes. We can support ongoing updates, maintenance, and improvements after launch, so your digital presence can keep up as your business changes.</p>
            </details>
            <details>
              <summary>Where are you based?<span>+</span></summary>
              <p>We’re based in Malawi and work with businesses and teams wherever they are.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-orb" aria-hidden="true" />
        <div className="page-width final-cta-inner">
          <p className="eyebrow eyebrow-light"><span className="status-dot" /> YOUR NEXT CHAPTER STARTS HERE</p>
          <h2>Let’s make something <em>matter.</em></h2>
          <p>Have an idea, a challenge, or just a feeling it could be better? We’d love to hear about it.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link className="button button-lime" href="/consultation">Start a conversation <Arrow diagonal /></Link>
            <button
              type="button"
              className="button button-outline"
              onClick={() => setContactOpen(true)}
            >
              Get in touch <Arrow />
            </button>
          </div>
        </div>
        <span className="cta-decoration" aria-hidden="true">✳</span>
      </section>

      <Footer />

      <style jsx>{`
        .home-hover-grid {
          margin-top: 50px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 26px;
        }
        .home-hover-card {
          position: relative;
          background: white;
          border: 1px solid var(--line);
          padding: 30px 32px 26px;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s ease,
                      background 0.35s ease;
        }
        .home-hover-card:hover {
          transform: translateY(-8px);
          border-color: #9db84d;
          box-shadow: 0 22px 48px -12px rgba(16, 43, 36, 0.15),
                      0 0 0 1px rgba(215, 243, 106, 0.6);
          background: linear-gradient(180deg, #ffffff 0%, #fbfcf8 100%);
        }
        .home-card-top-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 3px;
          width: 44px;
          background: #dedfd5;
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.35s ease;
        }
        .home-hover-card:hover .home-card-top-bar {
          width: 100%;
          background: linear-gradient(90deg, #d7f36a, #829b42, #15382e);
        }
        .home-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }
        .home-badge {
          display: inline-block;
          padding: 3px 9px;
          background: var(--lime-soft);
          color: var(--forest-deep);
          font-size: 10px;
          font-weight: 850;
          letter-spacing: 1px;
          border-radius: 2px;
          transition: background 0.3s, color 0.3s;
        }
        .home-hover-card:hover .home-badge {
          background: var(--forest-deep);
          color: var(--lime);
        }
        .home-number {
          color: #8c978f;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .home-card-title-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 12px;
        }
        .home-card-icon {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #f4f6eb;
          display: grid;
          place-items: center;
          font-size: 22px;
          flex-shrink: 0;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.35s ease,
                      box-shadow 0.35s ease;
        }
        .home-hover-card:hover .home-card-icon {
          transform: scale(1.1) rotate(-4deg);
          background: var(--lime);
          box-shadow: 0 0 0 5px rgba(215, 243, 106, 0.25);
        }
        .home-card-title-row h3 {
          margin: 0;
          font-size: 21px;
          font-weight: 650;
          letter-spacing: -0.6px;
          color: var(--ink);
        }
        .home-tagline {
          margin: 3px 0 0;
          color: #71836b;
          font-size: 11px;
          font-style: italic;
          font-family: Georgia, 'Times New Roman', serif;
        }
        .home-card-desc {
          margin: 0 0 16px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.75;
          flex-grow: 1;
        }
        .home-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 18px;
        }
        .home-tag {
          padding: 3px 9px;
          background: #f0f2e8;
          border-radius: 12px;
          font-size: 10px;
          color: #4b574f;
          font-weight: 600;
          transition: background 0.2s, color 0.2s;
        }
        .home-hover-card:hover .home-tag {
          background: #e8ecd8;
          color: var(--forest-deep);
        }
        .home-card-foot {
          padding-top: 16px;
          border-top: 1px solid #edf0e6;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .home-explore-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: #f0f2e8;
          border-radius: 3px;
          color: var(--forest);
          font-size: 11px;
          font-weight: 750;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .home-explore-arrow {
          font-size: 13px;
          transition: transform 0.25s ease;
        }
        .home-hover-card:hover .home-explore-action {
          background: var(--forest-deep);
          color: var(--lime);
          transform: translateX(4px);
        }
        .home-hover-card:hover .home-explore-arrow {
          transform: translate(2px, -2px);
        }
        .home-view-hint {
          font-size: 10px;
          color: #8c978f;
          letter-spacing: 0.3px;
        }
        .home-hover-card:hover .home-view-hint {
          color: var(--forest);
        }
        @media (max-width: 900px) {
          .home-hover-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .home-hover-card {
            padding: 22px 18px;
          }
        }
      `}</style>
    </main>
  );
}
