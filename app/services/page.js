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
  {
    number: '07',
    code: 'AI',
    title: 'Artificial Intelligence Solutions',
    icon: '🧠',
    tagline: 'Smart automation tailored to real workflows.',
    description: 'Practical AI assistants, workflow automation, and intelligent business tools that save time and elevate service.',
    features: [
      'Custom AI Assistants & Knowledge Chat',
      'Workflow & Document Automation',
      'Data Synthesis & Smart Reporting',
      'Responsible AI Integration into Apps',
    ],
    tags: ['AI Workflows', 'Smart Assistants', 'Automation', 'LLM Integration'],
    stats: 'Practical Automation',
    href: '/consultation?project=ai',
  },
  {
    number: '08',
    code: 'DT',
    title: 'Tech Consultancy & Digital Transformation',
    icon: '🧭',
    tagline: 'Clear technology roadmaps for lasting growth.',
    description: 'Strategic digital transformation guidance and systems advisory helping organizations modernize with confidence.',
    features: [
      'Digital Transformation Roadmaps',
      'Systems Architecture & Tool Selection',
      'Process Digitization & Cloud Migration',
      'Ongoing Technical Advisory & Audits',
    ],
    tags: ['Tech Consultancy', 'Digital Transformation', 'Advisory', 'Strategy'],
    stats: 'Executive Clarity',
    href: '/consultation?project=ai',
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
            <span className="status-dot" /> Our Capabilities · 08 Specialized Disciplines
          </p>
          <h1>
            Expert solutions, delivered by <em>specialized teams.</em>
          </h1>
          <p className="services-hero-copy">
            At NOVEX DIGITAL, we do not believe in one-size-fits-all digital work.
            Our disciplines span websites, software, AI, marketing, graphic branding, and technology consultancy—ensuring specialists lead your project.
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
            From the initial blueprint to post-launch scaling, NOVEX DIGITAL combines <span>engineering rigour</span> with <span>practical creativity</span>.
          </p>
          <div className="intro-stamp" aria-hidden="true">
            NEW IDEAS<br />NEW POSSIBILITIES<br />NEW LEGACY<span>✳</span>
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
              All Disciplines (08)
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
                  <span className="dept-number">{dept.number} / 08</span>
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
    </main>
  );
}