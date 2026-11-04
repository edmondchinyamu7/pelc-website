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
    href: '/cpd',
  },
];

export default function Services() {
  const [contactOpen, setContactOpen] = useState(false);

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

      {/* Department Cards Grid */}
      <section className="section-pad" id="departments">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-mark">01</span> All Departments
              </p>
              <h2>
                Choose your focus.<br />
                <em>Or let us combine them.</em>
              </h2>
            </div>
            <div className="section-aside">
              <p>
                Every department operates independently or in seamless synergy, giving you a full digital partner under one roof.
              </p>
              <Link className="text-link" href="/consultation">
                Not sure which service you need? Ask us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="dept-grid">
            {departments.map((dept) => (
              <article className="dept-card-new" key={dept.code}>
                <div className="dept-card-top">
                  <span className="dept-badge">{dept.code}</span>
                  <span className="dept-number">{dept.number} / 06</span>
                </div>

                <div className="dept-card-header">
                  <span className="dept-icon-circle">{dept.icon}</span>
                  <div>
                    <h3>{dept.title}</h3>
                    <p className="dept-tagline-text">{dept.tagline}</p>
                  </div>
                </div>

                <p className="dept-desc">{dept.description}</p>

                <ul className="dept-features-list">
                  {dept.features.map((item, idx) => (
                    <li key={idx}>
                      <span className="bullet-point">✳</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="dept-card-foot">
                  <Link className="dept-link" href={dept.href}>
                    Explore {dept.title} <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
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
        .dept-grid {
          margin-top: 55px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }
        .dept-card-new {
          background: white;
          border: 1px solid var(--line);
          padding: 34px 36px 30px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .dept-card-new:hover {
          transform: translateY(-4px);
          border-color: #9cb84d;
          box-shadow: 0 16px 36px rgba(16, 43, 36, 0.08);
        }
        .dept-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .dept-badge {
          display: inline-block;
          padding: 3px 10px;
          background: var(--lime-soft);
          color: var(--forest-deep);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          border-radius: 2px;
        }
        .dept-number {
          color: #758078;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .dept-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 14px;
        }
        .dept-icon-circle {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          background: #f4f6eb;
          border-radius: 50%;
          font-size: 22px;
          flex-shrink: 0;
        }
        .dept-card-header h3 {
          margin: 0;
          font-size: 22px;
          font-weight: 650;
          letter-spacing: -0.6px;
          color: var(--ink);
        }
        .dept-tagline-text {
          margin: 3px 0 0;
          color: #71836b;
          font-size: 11px;
          font-style: italic;
          font-family: Georgia, 'Times New Roman', serif;
        }
        .dept-desc {
          margin: 0 0 20px;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.75;
        }
        .dept-features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
          display: grid;
          gap: 9px;
          border-top: 1px solid #eef0e6;
          padding-top: 18px;
          flex-grow: 1;
        }
        .dept-features-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 12px;
          color: #3b463f;
          line-height: 1.5;
        }
        .bullet-point {
          color: #758e2d;
          font-size: 11px;
          line-height: 1.5;
        }
        .dept-card-foot {
          margin-top: auto;
          padding-top: 18px;
          border-top: 1px solid #eef0e6;
        }
        .dept-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--forest);
          font-size: 12px;
          font-weight: 750;
          transition: gap 0.2s, color 0.2s;
        }
        .dept-link:hover {
          color: #758e2d;
          gap: 12px;
        }
        @media (max-width: 900px) {
          .dept-grid {
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
          .dept-card-new {
            padding: 24px 20px;
          }
        }
      `}</style>
    </main>
  );
}