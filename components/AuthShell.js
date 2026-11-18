import Link from 'next/link';
import './auth.css';

export default function AuthShell({ eyebrow, title, description, children, footer }) {
  return (
    <main className="pelc-auth">
      <aside className="pelc-auth__brand" aria-hidden="true">
        <Link href="/" className="pelc-auth__logo">NEOPAD STUDIO</Link>
        <div>
          <p className="pelc-auth__tagline">New Ideas. New Possibilities. New legacy</p>
          <p className="pelc-auth__sub">
            Creative digital and technology solutions, from websites and applications to branding, marketing, AI, and digital consultancy.
          </p>
        </div>
        <p className="pelc-auth__meta">NEOPAD STUDIO · Creative Digital &amp; Technology Studio</p>
      </aside>

      <section className="pelc-auth__panel">
        <Link href="/" className="pelc-auth__back">
          <span aria-hidden="true">←</span> Back to site
        </Link>
        <div className="pelc-auth__card">
          {eyebrow && <p className="pelc-auth__eyebrow">{eyebrow}</p>}
          <h1 className="pelc-auth__title">{title}</h1>
          {description && <p className="pelc-auth__desc">{description}</p>}
          {children}
          {footer && <div className="pelc-auth__footer">{footer}</div>}
        </div>
      </section>
    </main>
  );
}
