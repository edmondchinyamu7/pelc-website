'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ContactDrawer from '@/components/ContactDrawer';
import Footer from '@/components/Footer';

const departments = [
  {
    number: '01',
    code: 'WDD',
    title: 'Website Development',
    icon: '💻',
    tagline: 'Building the foundation of your digital presence.',
    description: 'Fast, secure, responsive websites crafted to turn casual visitors into loyal customers.',
    features: [
      'Custom Full-Stack Web Development',
      'E-Commerce & High-Converting Stores',
      'Modern CMS & Headless Architecture',
      'Speed, SEO & Security Optimization',
    ],
    tags: ['Next.js', 'E-Commerce', 'Full-Stack', 'SEO-Ready'],
    stats: 'Fast 2-4 Week Sprints',
    href: '/wdd',
  },
  {
    number: '02',
    code: 'SDD',
    title: 'Software Development',
    icon: '⚙️',
    tagline: 'Custom logic for complex, real-world problems.',
    description: 'Bespoke tools, mobile applications, and internal platforms shaped to streamline your operations.',
    features: [
      'Custom Web & Desktop Applications',
      'iOS & Android Mobile Apps',
      'API Design & Cloud Integrations',
      'Scalable Database & Architecture',
    ],
    tags: ['Mobile Apps', 'Custom SaaS', 'Cloud APIs', 'Databases'],
    stats: 'Scalable Architecture',
    href: '/sdd',
  },
  {
    number: '03',
    code: 'UD',
    title: 'UX/UI Design',
    icon: '🎨',
    tagline: 'Intuitive, memorable, and user-centered design.',
    description: 'Interfaces and brand touchpoints that make every interaction natural, delightful, and clear.',
    features: [
      'User Research & Information Architecture',
      'Wireframing & Interactive Prototypes',
      'Design Systems & UI Kits',
      'Usability Audits & Redesigns',
    ],
    tags: ['Figma Prototypes', 'Design Systems', 'User Research', 'Mobile UI'],
    stats: 'Clickable Prototypes',
    href: '/ud',
  },
  {
    number: '04',
    code: 'AD',
    title: 'Advertisement',
    icon: '📣',
    tagline: 'High-impact campaigns that command attention.',
    description: 'Strategic pay-per-click and targeted digital ads designed to maximize return on ad spend.',
    features: [
      'Search & Display Ads (Google Ads)',
      'Meta, LinkedIn & Social Media Ads',
      'Creative Copywriting & Ad Design',
      'A/B Testing & Conversion Tracking',
    ],
    tags: ['Google Ads', 'Meta Ads', 'LinkedIn B2B', 'Conversion Tracking'],
    stats: 'Measurable ROAS',
    href: '/ad',
  },
  {
    number: '05',
    code: 'MD',
    title: 'Marketing',
    icon: '📈',
    tagline: 'Sustainable, organic growth through proven strategy.',
    description: 'Content, search visibility, and community engagement that builds long-term brand authority.',
    features: [
      'Search Engine Optimization (SEO)',
      'Content Strategy & Publishing',
      'Social Media Management & Growth',
      'Brand Positioning & Analytics',
    ],
    tags: ['Organic SEO', 'Content Strategy', 'Social Growth', 'Brand Authority'],
    stats: 'Organic Equity',
    href: '/md',
  },
  {
    number: '06',
    code: 'CPD',
    title: 'Creative & Publication',
    icon: '🖌️',
    tagline: 'Striking visuals for both print and digital.',
    description: 'Logos, publications, bulletins, and corporate collateral that establish unmistakable presence.',
    features: [
      'Logo & Visual Identity Systems',
      'Print & Editorial Layout Design',
      'Corporate Reports & Church Bulletins',
      'Event Banners, Posters & Flyers',
    ],
    tags: ['Brand Identity', 'Editorial Print', 'Church Bulletins', 'Event Banners'],
    stats: 'Print & Digital Output',
    href: '/cpd',
  },
];

export default function Services() {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredDepts = activeFilter === 'all'
    ? departments
    : departments.filter((d) => d.code === activeFilter);

  return (
    <main>
      <Navbar onOpenContact={() => setContactOpen(true)} activePage="services" />
      <ContactDrawer isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Hero */}
      <section className="services-hero">
        <div className="hero-grain" aria-hidden="true" />
        <div className="page-width services-hero-inner">
          <p className="eyebrow eyebrow-light">
            <span className="status-dot" /> Our Capabilities · 06 Dedicated Departments
          </p>
          <h1>
            Expert solutions, delivered by <em>specialized teams.</em>
          </h1>
          <p className="services-hero-copy">
            At POPE EAD LEGACY COMPANY, we do not believe in one-size-fits-all digital work.
            Our team is organized into distinct departments, ensuring every aspect of your project is led by specialists.
          </p>
          <div className="services-hero-actions">
            <Link className="button button-lime" href="/consultation">
              Book a consultation <span aria-hidden="true">↗</span>
            </Link>
            <button
              type="button"
              className="button button-outline"
              onClick={() => setContactOpen(true)}
            >
              Talk to our team <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Intro Quote Strip */}
      <section className="intro-strip" aria-label="Our department philosophy">
        <div className="page-width intro-inner">
          <p>
            From the initial blueprint to post-launch scaling, our six departments combine <span>engineering rigour</span> with <span>practical creativity</span>.
          </p>
          <div className="intro-stamp" aria-hidden="true">
            INNOVATE<br />CREATE<br />GENERATE<span>✳</span>
          </div>
        </div>
      </section>

      {/* Department Hover Cards Grid */}
      <section className="section-pad" id="departments">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-mark">01</span> All Departments
              </p>
              <h2>
                Choose your focus.<br />
                <em>Hover cards to explore.</em>
              </h2>
            </div>
            <div className="section-aside">
              <p>
                Hover over any department card to explore key deliverables, capabilities, and launch your project directly.
              </p>
              <Link className="text-link" href="/consultation">
                Not sure which service you need? Ask us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Quick Department Filter Bar */}
          <div className="dept-filter-bar">
            <span className="filter-label">Quick Jump:</span>
            <button
              type="button"
              className={`filter-chip${activeFilter === 'all' ? ' is-active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Departments (06)
            </button>
            {departments.map((d) => (
              <button
                key={d.code}
                type="button"
                className={`filter-chip${activeFilter === d.code ? ' is-active' : ''}`}
                onClick={() => setActiveFilter(d.code)}
              >
                {d.code} · {d.title}
              </button>
            ))}
          </div>

          {/* Hover Cards Grid */}
          <div className="dept-hover-grid">
            {filteredDepts.map((dept) => (
              <Link
                href={dept.href}
                className="hover-card"
                key={dept.code}
                aria-label={`Explore ${dept.title} (${dept.code})`}
              >
                {/* Glowing Top Indicator Bar */}
                <div className="card-top-bar" />

                {/* Card Header */}
                <div className="card-head">
                  <div className="badge-group">
                    <span className="dept-badge">{dept.code}</span>
                    <span className="dept-stats-pill">{dept.stats}</span>
                  </div>
                  <span className="dept-number">{dept.number} / 06</span>
                </div>

                {/* Icon & Title */}
                <div className="card-identity">
                  <div className="icon-wrapper">
                    <span className="icon-main">{dept.icon}</span>
                  </div>
                  <div className="identity-text">
                    <h3 className="card-title">{dept.title}</h3>
                    <p className="card-tagline">{dept.tagline}</p>
                  </div>
                </div>

                <p className="card-desc">{dept.description}</p>

                {/* Tags Pill Bar */}
                <div className="card-tags-row">
                  {dept.tags.map((tag, idx) => (
                    <span className="tag-pill" key={idx}>{tag}</span>
                  ))}
                </div>

                {/* Features List */}
                <ul className="card-features">
                  {dept.features.map((feature, fIdx) => (
                    <li key={fIdx}>
                      <span className="feature-icon">✳</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Card Action Foot */}
                <div className="card-foot">
                  <div className="cta-action">
                    <span className="cta-label">Explore {dept.code} Department</span>
                    <span className="cta-arrow">↗</span>
                  </div>
                  <span className="card-hint">Click to view services</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values / Distinction Strip */}
      <section className="values-band">
        <div className="page-width values-inner">
          <p>Dedicated to excellence</p>
          <span>Transparent Pricing</span>
          <i>✳</i>
          <span>Direct Team Access</span>
          <i>✳</i>
          <span>Long-Term Maintenance</span>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <div className="cta-orb" aria-hidden="true" />
        <div className="page-width final-cta-inner">
          <p className="eyebrow eyebrow-light">
            <span className="status-dot" /> START YOUR NEXT PROJECT
          </p>
          <h2>
            Let’s build something <em>extraordinary.</em>
          </h2>
          <p>
            Whether you need a new website, tailored software, brand elevation, or high-ROI advertising, our team is ready to get to work.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link className="button button-lime" href="/consultation">
              Start with a Consultation <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button button-outline" href="/contact">
              Contact Direct <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <span className="cta-decoration" aria-hidden="true">✳</span>
      </section>

      <Footer />

      <style jsx>{`
        .services-hero {
          min-height: 480px;
          position: relative;
          overflow: hidden;
          background: var(--forest-deep);
          color: white;
          padding: 85px 0 95px;
        }
        .services-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 75% 30%, rgba(215, 243, 106, 0.12), transparent 45%);
          pointer-events: none;
        }
        .services-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 860px;
        }
        .services-hero-inner h1 {
          margin: 0;
          font-size: clamp(44px, 6vw, 72px);
          line-height: 1.05;
          letter-spacing: -3.8px;
          font-weight: 620;
        }
        .services-hero-inner h1 em {
          color: var(--lime);
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 400;
        }
        .services-hero-copy {
          max-width: 620px;
          margin: 22px 0 0;
          color: #c0ccc3;
          font-size: 15px;
          line-height: 1.85;
        }
        .services-hero-actions {
          margin-top: 32px;
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }
        .dept-filter-bar {
          margin-top: 36px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .filter-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: var(--muted);
          text-transform: uppercase;
          margin-right: 4px;
        }
        .filter-chip {
          padding: 6px 14px;
          background: white;
          border: 1px solid var(--line);
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          color: var(--ink);
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
        }
        .filter-chip:hover {
          border-color: #829b42;
          background: #f4f6eb;
          transform: translateY(-1px);
        }
        .filter-chip.is-active {
          background: var(--forest-deep);
          color: var(--lime);
          border-color: var(--forest-deep);
        }
        /* Hover Cards Grid */
        .dept-hover-grid {
          margin-top: 40px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }
        /* The Hover Card Container */
        .hover-card {
          display: flex;
          flex-direction: column;
          position: relative;
          background: white;
          border: 1px solid var(--line);
          padding: 34px 34px 28px;
          border-radius: 4px;
          text-decoration: none;
          color: inherit;
          overflow: hidden;
          isolation: isolate;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s ease,
                      background 0.35s ease;
        }
        /* Hover Effect: elevation, lime border accent, ambient green glow */
        .hover-card:hover,
        .hover-card:focus-visible {
          transform: translateY(-9px);
          border-color: #9db84d;
          box-shadow: 0 24px 50px -12px rgba(16, 43, 36, 0.16),
                      0 0 0 1px rgba(215, 243, 106, 0.6);
          background: linear-gradient(180deg, #ffffff 0%, #fbfcf8 100%);
        }
        /* Animated Top Indicator Accent */
        .card-top-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 3px;
          width: 48px;
          background: #dedfd5;
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.35s ease;
        }
        .hover-card:hover .card-top-bar {
          width: 100%;
          background: linear-gradient(90deg, #d7f36a, #829b42, #15382e);
        }
        .card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
        }
        .badge-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dept-badge {
          display: inline-block;
          padding: 4px 10px;
          background: var(--lime-soft);
          color: var(--forest-deep);
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 1.2px;
          border-radius: 2px;
          transition: background 0.3s, color 0.3s;
        }
        .hover-card:hover .dept-badge {
          background: var(--forest-deep);
          color: var(--lime);
        }
        .dept-stats-pill {
          font-size: 10px;
          color: #71836b;
          font-weight: 600;
          letter-spacing: 0.3px;
        }
        .dept-number {
          color: #8a968d;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .card-identity {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 14px;
        }
        .icon-wrapper {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          background: #f4f6eb;
          border-radius: 50%;
          font-size: 24px;
          flex-shrink: 0;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.35s ease,
                      box-shadow 0.35s ease;
        }
        .hover-card:hover .icon-wrapper {
          transform: scale(1.1) rotate(-4deg);
          background: var(--lime);
          box-shadow: 0 0 0 6px rgba(215, 243, 106, 0.25);
        }
        .card-title {
          margin: 0;
          font-size: 23px;
          font-weight: 650;
          letter-spacing: -0.6px;
          color: var(--ink);
          transition: color 0.2s;
        }
        .hover-card:hover .card-title {
          color: var(--forest-deep);
        }
        .card-tagline {
          margin: 4px 0 0;
          color: #71836b;
          font-size: 12px;
          font-style: italic;
          font-family: Georgia, 'Times New Roman', serif;
        }
        .card-desc {
          margin: 0 0 16px;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.75;
        }
        .card-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }
        .tag-pill {
          padding: 4px 10px;
          background: #f0f2e8;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          color: #445148;
          transition: background 0.2s, color 0.2s;
        }
        .hover-card:hover .tag-pill {
          background: #e8ecd8;
          color: var(--forest-deep);
        }
        .card-features {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
          display: grid;
          gap: 9px;
          border-top: 1px solid #edf0e6;
          padding-top: 18px;
          flex-grow: 1;
        }
        .card-features li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 12px;
          color: #3b463f;
          line-height: 1.5;
        }
        .feature-icon {
          color: #829b42;
          font-size: 11px;
          line-height: 1.5;
          transition: transform 0.25s ease, color 0.25s ease;
        }
        .hover-card:hover .feature-icon {
          color: #718e2b;
          transform: scale(1.2);
        }
        .card-foot {
          margin-top: auto;
          padding-top: 18px;
          border-top: 1px solid #edf0e6;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .cta-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: #f0f2e8;
          border-radius: 3px;
          color: var(--forest);
          font-size: 12px;
          font-weight: 750;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .cta-arrow {
          font-size: 14px;
          transition: transform 0.25s ease;
        }
        .hover-card:hover .cta-action {
          background: var(--forest-deep);
          color: var(--lime);
          transform: translateX(4px);
        }
        .hover-card:hover .cta-arrow {
          transform: translate(2px, -2px);
        }
        .card-hint {
          font-size: 10px;
          color: #8c978f;
          letter-spacing: 0.3px;
          transition: color 0.2s;
        }
        .hover-card:hover .card-hint {
          color: var(--forest);
        }
        @media (max-width: 900px) {
          .dept-hover-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .services-hero {
            padding: 60px 0 65px;
          }
          .services-hero-inner h1 {
            font-size: clamp(38px, 10vw, 52px);
            letter-spacing: -2.4px;
          }
          .hover-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </main>
  );
}