import Link from 'next/link';
import './auth.css';

export default function AuthShell({ eyebrow, title, description, children, footer }) {
  return (
    <main className="pelc-auth">
      <aside className="pelc-auth__brand" aria-hidden="true">
        <Link href="/" className="pelc-auth__logo">PELC</Link>
        <div>
          <p className="pelc-auth__tagline">Digital studio for what&apos;s next.</p>
          <p className="pelc-auth__sub">
            Websites, software, brands and campaigns built in Malawi for businesses moving forward.
          </p>
        </div>
        <p className="pelc-auth__meta">Pope Ead Legacy Company</p>
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
