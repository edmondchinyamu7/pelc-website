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
        <Link href="/contact" className={activePage === 'contact' ? 'nav-active' : ''}>Contact</Link>
        {onOpenContact && (
          <button
            type="button"
            onClick={onOpenContact}
            className="nav-drawer-btn"
            aria-label="Open quick contact menu"
          >
            <span>Let’s Talk</span>
            <span className="btn-arrow" aria-hidden="true">↗</span>
          </button>
        )}
      </div>

      <style jsx>{`
        .nav-active {
          color: var(--lime) !important;
        }
        .nav-drawer-btn {
          padding: 6px 14px;
          border: 1px solid var(--lime);
          border-radius: 3px;
          color: var(--forest-deep);
          background: var(--lime);
          font: inherit;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-left: 6px;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .nav-drawer-btn:hover,
        .nav-drawer-btn:focus-visible {
          background: white;
          border-color: white;
          color: var(--forest-deep);
          transform: translateY(-1px);
        }
        .btn-arrow {
          font-size: 14px;
          line-height: 1;
        }
        @media (max-width: 640px) {
          .nav-drawer-btn {
            padding: 5px 10px;
            font-size: 11px;
            margin-left: 0;
          }
        }
      `}</style>
    </nav>
  );
}
