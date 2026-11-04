'use client';

import Link from 'next/link';

export default function Navbar({ onOpenContact, activePage = '' }) {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <Link className="logo" href="/" aria-label="PELC home">PELC</Link>
      <div className="nav-links">
        <Link href="/" className={activePage === 'home' ? 'nav-active' : ''}>Home</Link>
        <Link href="/about" className={activePage === 'about' ? 'nav-active' : ''}>About</Link>
        <Link href="/services" className={activePage === 'services' ? 'nav-active' : ''}>Services</Link>
        <Link href="/event" className={activePage === 'event' ? 'nav-active' : ''}>Event</Link>
        <button
          type="button"
          onClick={onOpenContact}
          className="nav-contact-btn"
          aria-label="Open contact options"
        >
          Contact
        </button>
      </div>

      <style jsx>{`
        .nav-contact-btn {
          padding: 0;
          border: 0;
          color: white;
          background: transparent;
          font: inherit;
          font-size: 15px;
          font-weight: 550;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .nav-contact-btn:hover,
        .nav-contact-btn:focus-visible {
          color: var(--lime);
        }
        .nav-active {
          color: var(--lime) !important;
        }
      `}</style>
    </nav>
  );
}
