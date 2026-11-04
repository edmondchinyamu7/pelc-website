'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ContactDrawer({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`home-contact-overlay${isOpen ? ' is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`home-contact-sidebar${isOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-drawer-title"
        aria-hidden={!isOpen}
      >
        <div className="home-contact-header">
          <div>
            <p>LET’S TALK</p>
            <h2 id="contact-drawer-title">Contact PELC</h2>
          </div>
          <button
            className="home-contact-close"
            type="button"
            onClick={onClose}
            aria-label="Close contact sidebar"
          >
            ×
          </button>
        </div>
        <div className="home-contact-content">
          <p>Have an idea or a question? Reach out through whichever channel works best for you.</p>

          <a className="home-contact-item" href="mailto:popeeadlegacycompany@gmail.com">
            <span className="home-contact-icon" aria-hidden="true">✉</span>
            <span>
              <strong>Email us</strong>
              <small>popeeadlegacycompany@gmail.com</small>
            </span>
            <span className="home-contact-arrow" aria-hidden="true">↗</span>
          </a>

          <a className="home-contact-item" href="tel:0892236030">
            <span className="home-contact-icon" aria-hidden="true">☎</span>
            <span>
              <strong>Call us</strong>
              <small>0892236030</small>
            </span>
            <span className="home-contact-arrow" aria-hidden="true">↗</span>
          </a>

          <a
            className="home-contact-item"
            href="https://wa.me/265892236030"
            target="_blank"
            rel="noreferrer"
          >
            <span className="home-contact-icon" aria-hidden="true">◉</span>
            <span>
              <strong>WhatsApp</strong>
              <small>Chat with our team</small>
            </span>
            <span className="home-contact-arrow" aria-hidden="true">↗</span>
          </a>

          <Link
            className="home-contact-more"
            href="/consultation"
            onClick={onClose}
          >
            Book a free consultation <span aria-hidden="true">↗</span>
          </Link>

          <Link
            className="home-contact-more"
            style={{ background: '#dedfd5', color: '#17241e', marginTop: '6px' }}
            href="/contact"
            onClick={onClose}
          >
            Visit interactive contact page <span aria-hidden="true">→</span>
          </Link>

          <div className="sidebar-socials">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="/contact" aria-label="Facebook">f</a>
              <a href="/contact" aria-label="Instagram">◎</a>
              <a href="/contact" aria-label="X">𝕏</a>
              <a href="/contact" aria-label="YouTube">▶</a>
            </div>
          </div>

          <p className="home-contact-note">
            We’re based in Malawi and partner with clients globally.
          </p>
        </div>
      </aside>
    </>
  );
}
