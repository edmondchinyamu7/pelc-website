'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ContactDrawer from '@/components/ContactDrawer';
import Footer from '@/components/Footer';

const values = [
  { number: '01', title: 'Thoughtful craft', text: 'We care about the details—from the first conversation to the final pixel—because good work should feel considered at every step.' },
  { number: '02', title: 'Clear partnership', text: 'You stay in the loop. We communicate plainly, share progress, and make decisions together without unnecessary jargon.' },
  { number: '03', title: 'Practical creativity', text: 'We bring fresh thinking to real business challenges, making digital tools and experiences useful as well as beautiful.' },
  { number: '04', title: 'Built for growth', text: 'We create with your next chapter in mind, so the things we make can grow alongside your goals.' },
];

const process = [
  { number: '01', title: 'Listen', text: 'We learn about your business, your people, and what you want to make possible.' },
  { number: '02', title: 'Shape', text: 'Together, we turn the idea into a clear direction, scope, and plan.' },
  { number: '03', title: 'Make', text: 'Our team designs and builds with your feedback part of the process.' },
  { number: '04', title: 'Grow', text: 'We launch, learn, and stay ready to help with what comes next.' },
];

export default function About() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="about-page">
      <Navbar onOpenContact={() => setContactOpen(true)} activePage="about" />
      <ContactDrawer isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Hero */}
      <section className="about-hero">
        <div className="hero-grain" aria-hidden="true" />
        <div className="page-width">
          <p className="eyebrow eyebrow-light">
            <span className="status-dot" /> A little about us
          </p>
          <h1>We make digital work feel <em>more human.</em></h1>
          <p className="about-hero-copy">
            POPE EAD LEGACY COMPANY is an independent digital studio based in Malawi. We bring strategy, design, and technology together to help people turn good ideas into meaningful progress.
          </p>
          <div className="about-hero-meta">
            <span>Based in Malawi</span>
            <span>Working with people everywhere</span>
          </div>
        </div>
      </section>

      {/* Intro & Founder Section */}
      <section className="about-intro">
        <div className="page-width about-intro-grid">
          <div className="about-founder-frame">
            <Image
              src="/founder.png"
              alt="Edmond Chinyamu, founder of POPE EAD LEGACY COMPANY"
              width={500}
              height={420}
              referrerPolicy="no-referrer"
              style={{ width: '100%', height: '420px', objectFit: 'cover', objectPosition: 'center 18%' }}
            />
            <div className="about-photo-caption">EDMOND CHINYAMU · FOUNDER</div>
          </div>
          <div className="about-copy">
            <p className="about-section-label">Who we are</p>
            <h2 className="about-heading">A dedicated team for <em>big possibilities.</em></h2>
            <p>
              We started PELC with a simple belief: every business deserves thoughtful digital work, not an impersonal, one-size-fits-all template. We partner with startups, organizations, and growing businesses to make the internet work better for them.
            </p>
            <p>
              From websites and software to design and marketing, we bring the right mix of skills to each challenge. We listen first, make a clear plan, and stay close from the first idea through launch and beyond.
            </p>
            <div className="about-signoff"><span /> Innovate · Create · Generate</div>
          </div>
        </div>
      </section>

      {/* Purpose: Mission & Vision */}
      <section className="about-purpose">
        <div className="page-width about-purpose-grid">
          <article className="about-purpose-card">
            <span className="about-section-label">OUR MISSION</span>
            <h2>Make useful things that move people forward.</h2>
            <p>
              We create digital products and experiences that solve real problems, make businesses stronger, and help good ideas reach the people who need them.
            </p>
          </article>
          <article className="about-purpose-card">
            <span className="about-section-label">OUR VISION</span>
            <h2>A more creative, connected future.</h2>
            <p>
              We want businesses everywhere to have access to clear thinking, good design, and dependable technology that helps them grow on their own terms.
            </p>
          </article>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="page-width">
          <div className="about-values-heading">
            <p className="about-section-label">What guides us</p>
            <h2 className="about-heading">Good work is built on <em>good values.</em></h2>
            <p>They shape how we work with each other, our clients, and every challenge we take on.</p>
          </div>
          <div className="about-values-grid">
            {values.map((value) => (
              <article className="about-value-card" key={value.number}>
                <span>{value.number} / 04</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="about-process">
        <div className="page-width about-process-grid">
          <div>
            <p className="eyebrow eyebrow-light"><span className="eyebrow-mark">02</span> How we work</p>
            <h2 className="about-heading" style={{ color: 'white' }}>
              A good process makes <em>room for good work.</em>
            </h2>
            <p className="about-process-intro">
              We keep the journey collaborative and easy to follow, so you always know what’s happening and why.
            </p>
          </div>
          <div className="about-process-list">
            {process.map((step) => (
              <article className="about-process-step" key={step.number}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="cta-orb" aria-hidden="true" />
        <div className="page-width final-cta-inner">
          <p className="eyebrow eyebrow-light"><span className="status-dot" /> HAVE SOMETHING IN MIND?</p>
          <h2>Let’s make your next idea <em>real.</em></h2>
          <p>Tell us what you’re working on. We’ll bring curiosity, a thoughtful plan, and the right people to help move it forward.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link className="button button-lime" href="/consultation">
              Start a conversation <span aria-hidden="true">↗</span>
            </Link>
            <button
              type="button"
              className="button button-outline"
              onClick={() => setContactOpen(true)}
            >
              Get in touch <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <span className="cta-decoration" aria-hidden="true">✳</span>
      </section>

      <Footer />

      <style jsx>{`
        .about-page {
          color: var(--ink);
          background: var(--paper);
          line-height: 1.7;
        }
        .about-hero {
          position: relative;
          overflow: hidden;
          padding: 95px 0 105px;
          color: white;
          background: radial-gradient(ellipse at 82% 18%, rgba(215,243,106,.13), transparent 30%), var(--forest-deep);
        }
        .about-hero h1 {
          max-width: 850px;
          margin: 0;
          font-size: clamp(48px, 7vw, 82px);
          line-height: 1.03;
          letter-spacing: -4.5px;
          font-weight: 620;
        }
        .about-hero h1 em, .about-heading em {
          color: var(--lime);
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 400;
        }
        .about-hero-copy {
          max-width: 600px;
          margin: 24px 0 0;
          color: #c0ccc3;
          font-size: 15px;
          line-height: 1.9;
        }
        .about-hero-meta {
          margin-top: 36px;
          display: flex;
          gap: 30px;
          color: #c1d0c3;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .about-hero-meta span + span::before {
          margin-right: 12px;
          color: var(--lime);
          content: '✳';
        }
        .about-intro {
          padding: 100px 0;
        }
        .about-intro-grid {
          display: grid;
          grid-template-columns: .85fr 1.15fr;
          align-items: center;
          gap: 9%;
        }
        .about-founder-frame {
          min-height: 420px;
          position: relative;
          display: grid;
          place-items: center;
          overflow: hidden;
          background: #e8eadf;
          border-radius: 2px;
        }
        .about-founder-frame::before {
          position: absolute;
          z-index: 1;
          inset: 18px;
          border: 1px solid rgba(21,56,46,.18);
          content: '';
          pointer-events: none;
        }
        .about-founder-frame img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          object-position: center 18%;
        }
        .about-photo-caption {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          padding: 16px 21px;
          color: white;
          background: linear-gradient(transparent, rgba(16,43,36,.88));
          font-size: 10px;
          letter-spacing: .5px;
          font-weight: 700;
        }
        .about-section-label {
          margin: 0 0 17px;
          color: #718e2b;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .about-heading {
          margin: 0;
          font-size: clamp(37px, 4.5vw, 56px);
          line-height: 1.08;
          letter-spacing: -3px;
          font-weight: 620;
        }
        .about-copy p {
          margin: 19px 0 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.9;
        }
        .about-signoff {
          margin-top: 26px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--forest);
          font-size: 11px;
          font-weight: 700;
        }
        .about-signoff span {
          width: 28px;
          height: 1px;
          background: #829b42;
        }
        .about-purpose {
          padding: 84px 0;
          background: #edefe5;
        }
        .about-purpose-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .about-purpose-card {
          min-height: 250px;
          padding: 33px;
          border: 1px solid #dfe1d7;
          background: var(--paper);
        }
        .about-purpose-card h2 {
          margin: 18px 0 12px;
          font-size: 26px;
          letter-spacing: -.8px;
          line-height: 1.2;
          font-weight: 650;
        }
        .about-purpose-card p {
          max-width: 470px;
          margin: 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.85;
        }
        .about-values {
          padding: 108px 0;
        }
        .about-values-heading {
          max-width: 620px;
        }
        .about-values-heading > p:last-child {
          max-width: 490px;
          margin: 18px 0 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.9;
        }
        .about-values-grid {
          margin-top: 43px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid var(--line);
          border-left: 1px solid var(--line);
        }
        .about-value-card {
          min-height: 216px;
          padding: 26px 22px;
          border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: white;
          transition: background 0.2s ease;
        }
        .about-value-card:hover {
          background: #f4f6eb;
        }
        .about-value-card span {
          color: #829b42;
          font-size: 9px;
          font-weight: 750;
          letter-spacing: 1px;
        }
        .about-value-card h3 {
          margin: 22px 0 9px;
          font-size: 18px;
          letter-spacing: -.4px;
          font-weight: 650;
        }
        .about-value-card p {
          margin: 0;
          color: var(--muted);
          font-size: 11px;
          line-height: 1.8;
        }
        .about-process {
          padding: 95px 0;
          color: white;
          background: var(--forest);
        }
        .about-process-grid {
          display: grid;
          grid-template-columns: .8fr 1.2fr;
          gap: 10%;
        }
        .about-process-intro {
          max-width: 390px;
          margin: 18px 0 0;
          color: #bfcdc2;
          font-size: 13px;
          line-height: 1.9;
        }
        .about-process-list {
          border-top: 1px solid rgba(255,255,255,.2);
        }
        .about-process-step {
          min-height: 84px;
          padding: 18px 0;
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 12px;
          border-bottom: 1px solid rgba(255,255,255,.2);
        }
        .about-process-step > span {
          padding-top: 3px;
          color: var(--lime);
          font-size: 11px;
          font-weight: 700;
        }
        .about-process-step h3 {
          margin: 0 0 6px;
          font-size: 16px;
          font-weight: 650;
        }
        .about-process-step p {
          max-width: 460px;
          margin: 0;
          color: #bfcdc2;
          font-size: 12px;
          line-height: 1.8;
        }
        @media (max-width: 1024px) {
          .about-values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .about-intro-grid, .about-process-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .about-founder-frame, .about-founder-frame img {
            min-height: 360px;
            height: 360px;
          }
          .about-purpose-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .about-hero {
            padding: 70px 0 65px;
          }
          .about-hero h1 {
            font-size: clamp(42px, 11vw, 58px);
            letter-spacing: -3px;
          }
          .about-values-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
