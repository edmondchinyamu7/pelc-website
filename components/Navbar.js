'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContactDrawer } from './ContactDrawerProvider';

export default function Navbar({ onOpenContact, activePage = '', showContactButton = true }) {
  const { openContact } = useContactDrawer();
  const handleOpenContact = onOpenContact || openContact;

  return (
    <nav className="navbar" aria-label="Main navigation">
      <Link className="logo" href="/" aria-label="NEOPAD STUDIO home">
        <Image
          src="/logo.jpg"
          alt="NEOPAD STUDIO logo"
          width={34}
          height={34}
          referrerPolicy="no-referrer"
          className="logo-mark"
        />
        <span>NEOPAD <span className="logo-accent">DIGITAL</span></span>
      </Link>
      <div className="nav-links">
        <Link href="/" className={activePage === 'home' ? 'nav-active' : ''}>Home</Link>
        <Link href="/about" className={activePage === 'about' ? 'nav-active' : ''}>About</Link>
        <Link href="/services" className={activePage === 'services' ? 'nav-active' : ''}>Services</Link>
        <Link href="/event" className={activePage === 'event' ? 'nav-active' : ''}>Event</Link>
        <Link href="/contact" className={activePage === 'contact' ? 'nav-active' : ''}>Contact</Link>
        <Link href="/auth/login">Log in</Link>
        {showContactButton && (
          <button
            type="button"
            onClick={handleOpenContact}
            className="nav-drawer-btn"
            aria-label="Open quick contact menu"
          >
            <span>Let’s Talk</span>
            <span className="btn-arrow" aria-hidden="true">↗</span>
          </button>
        )}
      </div>
    </nav>
  );
}
