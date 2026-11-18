'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useContactDrawer } from './ContactDrawerProvider';

export default function Navbar({ onOpenContact, activePage = '', showContactButton = true }) {
  const { openContact } = useContactDrawer();
  const handleOpenContact = onOpenContact || openContact;
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar" aria-label="Main navigation">
      <Link className="logo" href="/" aria-label="NEOPAD STUDIO home" onClick={closeMenu}>
        <Image src="/neopad-mark.svg" alt="" width={34} height={34} referrerPolicy="no-referrer" className="logo-mark" />
        <span>NEOPAD <span className="logo-accent">STUDIO</span></span>
      </Link>
      <button type="button" className={'nav-menu-toggle' + (menuOpen ? ' is-open' : '')}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen} aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}>
        <span /><span /><span />
      </button>
      {menuOpen && <button type="button" className="nav-menu-backdrop" aria-label="Close navigation menu" onClick={closeMenu} />}\n      <div id="primary-navigation" className={'nav-links' + (menuOpen ? ' is-open' : '')}>
        <Link href="/" className={activePage === 'home' ? 'nav-active' : ''} onClick={closeMenu}>Home</Link>
        <Link href="/about" className={activePage === 'about' ? 'nav-active' : ''} onClick={closeMenu}>About</Link>
        <Link href="/services" className={activePage === 'services' ? 'nav-active' : ''} onClick={closeMenu}>Services</Link>
        <Link href="/event" className={activePage === 'event' ? 'nav-active' : ''} onClick={closeMenu}>Event</Link>
        <Link href="/contact" className={activePage === 'contact' ? 'nav-active' : ''} onClick={closeMenu}>Contact</Link>
        <Link href="/auth/login" onClick={closeMenu}>Log in</Link>
        {showContactButton && <button type="button" onClick={() => { closeMenu(); handleOpenContact(); }} className="nav-drawer-btn" aria-label="Open quick contact menu"><span>Let’s Talk</span><span className="btn-arrow" aria-hidden="true">↗</span></button>}
      </div>
    </nav>
  );
}
