import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OpenContactButton from '@/components/OpenContactButton';

export const metadata = {
  title: 'About | NOVEX DIGITAL',
  description:
    'NOVEX DIGITAL is a digital solutions provider based in Malawi helping individuals, businesses, and organizations grow through technology and creativity.',
};

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
  return (
    <main className="about-page">
      <Navbar activePage="about" />

      {/* Hero */}
      <section className="about-hero">
        <div className="hero-grain" aria-hidden="true" />
        <div className="page-width">
          <p className="eyebrow eyebrow-light">
            <span className="status-dot" /> A little about us
          </p>
          <h1>We make digital work feel <em>more human.</em></h1>
          <p className="about-hero-copy">
            NOVEX DIGITAL is a digital solutions provider based in Malawi. We help individuals, businesses, and institutions use technology and creativity to solve problems, improve operations, and grow.
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
              alt="Edmond Chinyamu, founder of NOVEX DIGITAL"
              width={500}
              height={420}
              sizes="(max-width: 768px) 100vw, 45vw"
              priority
              referrerPolicy="no-referrer"
              style={{ width: '100%', height: '420px', objectFit: 'cover', objectPosition: 'center 18%' }}
            />
            <div className="about-photo-caption">EDMOND CHINYAMU · FOUNDER</div>
          </div>
          <div className="about-copy">
            <p className="about-section-label">Who we are</p>
            <h2 className="about-heading">A dedicated team for <em>big possibilities.</em></h2>
            <p>
              We built NOVEX DIGITAL with a simple belief: every organization deserves thoughtful, dependable digital work—not an impersonal, one-size-fits-all template. We partner with startups, institutions, and growing businesses across Malawi and beyond.
            </p>
            <p>
              From websites, software, and AI solutions to branding, marketing, and technology consultancy, we listen first, craft a practical plan, and stay close from concept through growth.
            </p>
            <div className="about-signoff"><span /> New Ideas · New Possibilities · New Legacy</div>
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
            <OpenContactButton className="button button-outline">
              Get in touch <span aria-hidden="true">→</span>
            </OpenContactButton>
          </div>
        </div>
        <span className="cta-decoration" aria-hidden="true">✳</span>
      </section>

      <Footer />
    </main>
  );
}
