import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectPlanner from '@/components/ProjectPlanner';
import OpenContactButton from '@/components/OpenContactButton';

const services = [
  {
    number: '01',
    code: 'WDD',
    title: 'Website Development',
    tagline: 'Websites that work harder',
    description: 'Fast, thoughtful websites and web platforms that make it easy for people to understand what you do—and take the next step.',
    tags: ['Web development', 'E-commerce', 'SEO-ready'],
    href: '/wdd',
    icon: '💻',
  },
  {
    number: '02',
    code: 'SDD',
    title: 'Software & Application Development',
    tagline: 'Software built around you',
    description: 'Custom digital tools, enterprise platforms, and mobile apps shaped around your team, your customers, and your operations.',
    tags: ['Custom software', 'Mobile apps', 'Integrations'],
    href: '/sdd',
    icon: '⚙️',
  },
  {
    number: '03',
    code: 'MD',
    title: 'Digital Marketing',
    tagline: 'Get the word out',
    description: 'Bring the right audience to your brand with organic search visibility, content strategy, and sustainable digital growth.',
    tags: ['SEO', 'Content Strategy', 'Social Growth'],
    href: '/md',
    icon: '📈',
  },
  {
    number: '04',
    code: 'AD',
    title: 'Digital Advertising',
    tagline: 'Campaigns that command attention',
    description: 'Targeted pay-per-click and multi-channel advertising engineered to turn marketing investment into measurable growth.',
    tags: ['Google Ads', 'Meta Ads', 'LinkedIn B2B'],
    href: '/ad',
    icon: '📣',
  },
  {
    number: '05',
    code: 'CPD',
    title: 'Graphic Design & Branding',
    tagline: 'Minimalist, lasting brand identity',
    description: 'Clean brand identities, logos, publications, and visual systems built to establish an unmistakable presence.',
    tags: ['Brand Identity', 'Logo Systems', 'Publications'],
    href: '/cpd',
    icon: '🖌️',
  },
  {
    number: '06',
    code: 'UD',
    title: 'UX/UI Product Design',
    tagline: 'Design with a point of view',
    description: 'Intuitive user experiences, interactive prototypes, and clean interfaces crafted for clarity across every screen.',
    tags: ['UI/UX design', 'Design Systems', 'Figma'],
    href: '/ud',
    icon: '🎨',
  },
  {
    number: '07',
    code: 'AI',
    title: 'Artificial Intelligence Solutions',
    tagline: 'Intelligent automation & workflows',
    description: 'Practical AI assistants, workflow automation, and smart data tools tailored to boost operational speed and decision-making.',
    tags: ['AI Automation', 'Smart Assistants', 'Data Insights'],
    href: '/consultation?project=ai',
    icon: '🧠',
  },
  {
    number: '08',
    code: 'DT',
    title: 'Technology Consultancy & Digital Transformation',
    tagline: 'Modernizing how you operate',
    description: 'Strategic technology guidance, systems modernization, and end-to-end digital transformation roadmaps for ambitious organizations.',
    tags: ['Tech Strategy', 'Digital Transformation', 'Advisory'],
    href: '/consultation?project=ai',
    icon: '🧭',
  },
];

const steps = [
  { number: '01', title: 'Let’s get clear', text: 'We start with a real conversation about your goals, audience, and what success looks like.' },
  { number: '02', title: 'Make a smart plan', text: 'You get a clear scope, a practical timeline, and a direction we can both get excited about.' },
  { number: '03', title: 'Build it together', text: 'We share progress as we go, get your feedback early, and make the important details count.' },
  { number: '04', title: 'Launch and keep growing', text: 'We help you get live, then stay available for the next improvement, update, or big idea.' },
];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

export default function Home() {
  return (
    <main>
      <Navbar activePage="home" />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-inner page-width">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-light"><span className="status-dot" /> NOVEX DIGITAL · Malawi and beyond</p>
            <h1 id="hero-title">Good ideas deserve <em>great digital.</em></h1>
            <p className="hero-intro">We combine technology, AI, software, and creative branding to help individuals, businesses, and institutions operate smarter and grow.</p>
            <div className="hero-actions">
              <Link className="button button-lime" href="/consultation">Tell us what you’re building <Arrow diagonal /></Link>
              <a className="text-link text-link-light" href="#services">Explore what we do <Arrow /></a>
            </div>
            <div className="hero-note"><span className="note-line" /> New Ideas. New Possibilities. New Legacy.</div>
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
                <div className="art-label">NOVEX DIGITAL</div>
                <div className="art-headline">Make your<br /><span>next move</span><br />matter.</div>
                <div className="art-lines"><i /><i /><i /></div>
                <div className="art-button">Let’s begin <Arrow diagonal /></div>
              </div>
              <div className="art-card-foot"><span>NEW IDEAS · NEW LEGACY</span><span>✳</span></div>
            </div>
            <div className="art-chip chip-top"><span className="chip-icon">✳</span><span>Ideas into impact</span></div>
            <div className="art-chip chip-bottom"><span className="chip-icon chip-dark">↗</span><span>Built for what’s next</span></div>
            <div className="art-star star-one">✳</div>
            <div className="art-star star-two">✳</div>
          </div>
        </div>
        <div className="hero-bottom page-width">
          <span>Independent thinking, practical technology, lasting legacy.</span>
          <a href="#services">Scroll to explore <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="intro-strip" aria-label="Our approach">
        <div className="page-width intro-inner">
          <p>We turn <span>new ideas</span> into useful digital solutions—with strategy, technology, and creativity at every step.</p>
          <div className="intro-stamp" aria-hidden="true">NEW IDEAS<br />NEW POSSIBILITIES<br />NEW LEGACY<span>✳</span></div>
        </div>
      </section>

      {/* Services Hover Cards Grid */}
      <section className="services-section section-pad" id="services">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-mark">01</span> What we do</p>
              <h2>One trusted partner.<br /><em>Explore our solutions.</em></h2>
            </div>
            <div className="section-aside">
              <p>From websites and custom software to AI solutions, branding, and digital transformation, we build what moves your organization forward.</p>
              <Link className="text-link" href="/services">Discover all our services <Arrow /></Link>
            </div>
          </div>

          <div className="home-hover-grid">
            {services.map((service) => (
              <Link className="home-hover-card" href={service.href} key={service.code}>
                <div className="home-card-top-bar" />

                <div className="home-card-head">
                  <span className="home-badge">{service.code}</span>
                  <span className="home-number">{service.number} / 08</span>
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
                  <span className="home-view-hint">Learn more</span>
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
          <ProjectPlanner />
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
              <p>We work across website development, software and mobile applications, digital marketing and advertising, graphic design and branding, UX/UI design, artificial intelligence solutions, technology consultancy, and digital transformation. If you have an idea and need a clear starting point, we’re ready to help.</p>
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
            <OpenContactButton className="button button-outline">
              Get in touch <Arrow />
            </OpenContactButton>
          </div>
        </div>
        <span className="cta-decoration" aria-hidden="true">✳</span>
      </section>

      <Footer />
    </main>
  );
}
