import Link from 'next/link';
import Image from 'next/image';
import SocialLinks from './SocialLinks';

function FooterArrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '9px', height: '9px', flex: '0 0 auto', fill: 'var(--lime)' }}>
      <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="building-image" aria-hidden="true" />
        <div className="logo-area">
          <div className="logo-icon">
            <Image
              src="/logo.jpg"
              alt="PELC Company Logo"
              width={90}
              height={90}
              referrerPolicy="no-referrer"
              style={{ borderRadius: '50%', objectFit: 'contain' }}
            />
          </div>
          <div className="logo-text">
            <p>POPE EAD LEGACY COMPANY</p>
            <div className="tagline">
              <span>Innovate</span>
              <span>Create</span>
              <span>Generate</span>
            </div>
          </div>
        </div>
        <svg
          className="curve-svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0,100 L1440,100 L1440,40 C1200,40 900,0 500,0 C250,0 100,40 0,100 Z"
            fill="#0c211b"
          />
        </svg>
      </div>

      <div className="footer-middle">
        <div className="footer-col">
          <h3>PELC Company</h3>
          <p>
            We are a digital solutions company focused on building a better tomorrow
            through technology, creativity and innovation.
          </p>
          <p className="quote">“Innovate. Create. Generate.”</p>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/"><FooterArrow />Home</Link></li>
            <li><Link href="/about"><FooterArrow />About</Link></li>
            <li><Link href="/services"><FooterArrow />Services</Link></li>
            <li><Link href="/event"><FooterArrow />Event</Link></li>
            <li><Link href="/consultation"><FooterArrow />Consultation</Link></li>
            <li><Link href="/contact"><FooterArrow />Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Our Services</h3>
          <ul>
            <li><Link href="/wdd"><FooterArrow />Website Development (WDD)</Link></li>
            <li><Link href="/sdd"><FooterArrow />Software Development (SDD)</Link></li>
            <li><Link href="/ud"><FooterArrow />UX/UI Design (UD)</Link></li>
            <li><Link href="/ad"><FooterArrow />Advertisement (AD)</Link></li>
            <li><Link href="/md"><FooterArrow />Marketing (MD)</Link></li>
            <li><Link href="/cpd"><FooterArrow />Creative &amp; Publication (CPD)</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact Us</h3>
          <div className="contact-item">
            <div className="contact-icon">✉</div>
            <div className="contact-info">
              <h4>Email</h4>
              <a href="mailto:popeeadlegacycompany@gmail.com">popeeadlegacycompany@gmail.com</a>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">☎</div>
            <div className="contact-info">
              <h4>Phone</h4>
              <a href="tel:0892236030">0892236030</a>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">↗</div>
            <div className="contact-info">
              <h4>WhatsApp</h4>
              <a href="https://wa.me/265892236030" target="_blank" rel="noreferrer">
                Chat with our team
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <SocialLinks theme="dark" size="default" />
        <div className="divider" />
        <div className="copyright">
          <p>© {new Date().getFullYear()} POPE EAD LEGACY COMPANY (PELC). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
