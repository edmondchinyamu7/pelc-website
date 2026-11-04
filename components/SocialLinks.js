'use client';

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
} from 'react-icons/fa6';

export const SOCIAL_PROFILES = [
  {
    name: 'Facebook',
    label: 'Facebook',
    handle: '@pelccompany',
    url: 'https://facebook.com',
    icon: FaFacebookF,
    brandColor: '#1877F2',
    bgDark: 'rgba(24, 119, 242, 0.12)',
    borderDark: 'rgba(24, 119, 242, 0.38)',
    hoverBg: '#1877F2',
    hoverColor: '#FFFFFF',
    glow: 'rgba(24, 119, 242, 0.45)',
    bgLight: '#f0f5ff',
    borderLight: '#c2dbff',
    gradient: null,
  },
  {
    name: 'Instagram',
    label: 'Instagram',
    handle: '@pelc_official',
    url: 'https://instagram.com',
    icon: FaInstagram,
    brandColor: '#E1306C',
    bgDark: 'rgba(225, 48, 108, 0.14)',
    borderDark: 'rgba(225, 48, 108, 0.42)',
    hoverBg: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    hoverColor: '#FFFFFF',
    glow: 'rgba(225, 48, 108, 0.5)',
    bgLight: '#fff0f5',
    borderLight: '#fbcfe8',
    gradient: 'linear-gradient(45deg, #f09433 0%, #dc2743 50%, #bc1888 100%)',
  },
  {
    name: 'X',
    label: 'X (formerly Twitter)',
    handle: '@PELC_tech',
    url: 'https://x.com',
    icon: FaXTwitter,
    brandColor: '#F3F4F6',
    bgDark: 'rgba(255, 255, 255, 0.10)',
    borderDark: 'rgba(255, 255, 255, 0.35)',
    hoverBg: '#FFFFFF',
    hoverColor: '#0c211b',
    glow: 'rgba(255, 255, 255, 0.35)',
    bgLight: '#f3f4f6',
    borderLight: '#d1d5db',
    gradient: null,
  },
  {
    name: 'LinkedIn',
    label: 'LinkedIn',
    handle: 'PELC Company',
    url: 'https://linkedin.com',
    icon: FaLinkedinIn,
    brandColor: '#0A66C2',
    bgDark: 'rgba(10, 102, 194, 0.14)',
    borderDark: 'rgba(10, 102, 194, 0.42)',
    hoverBg: '#0A66C2',
    hoverColor: '#FFFFFF',
    glow: 'rgba(10, 102, 194, 0.45)',
    bgLight: '#eff6ff',
    borderLight: '#bfdbfe',
    gradient: null,
  },
  {
    name: 'YouTube',
    label: 'YouTube',
    handle: 'PELC Tech & Design',
    url: 'https://youtube.com',
    icon: FaYoutube,
    brandColor: '#FF0000',
    bgDark: 'rgba(255, 0, 0, 0.14)',
    borderDark: 'rgba(255, 0, 0, 0.42)',
    hoverBg: '#FF0000',
    hoverColor: '#FFFFFF',
    glow: 'rgba(255, 0, 0, 0.45)',
    bgLight: '#fef2f2',
    borderLight: '#fecaca',
    gradient: null,
  },
  {
    name: 'WhatsApp',
    label: 'WhatsApp Community',
    handle: '+265 892 236 030',
    url: 'https://wa.me/265892236030',
    icon: FaWhatsapp,
    brandColor: '#25D366',
    bgDark: 'rgba(37, 211, 102, 0.14)',
    borderDark: 'rgba(37, 211, 102, 0.42)',
    hoverBg: '#25D366',
    hoverColor: '#0a231b',
    glow: 'rgba(37, 211, 102, 0.45)',
    bgLight: '#f0fdf4',
    borderLight: '#bbf7d0',
    gradient: null,
  },
];

export default function SocialLinks({ theme = 'dark', size = 'default', showLabels = false }) {
  const isLight = theme === 'light';

  return (
    <div className={`pelc-socials-group theme-${theme} size-${size} ${showLabels ? 'with-labels' : ''}`}>
      {SOCIAL_PROFILES.map((item) => {
        const IconComponent = item.icon;
        return (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            aria-label={`Visit PELC on ${item.label}`}
            title={`${item.label} · ${item.handle}`}
            style={{
              '--brand-color': item.brandColor,
              '--brand-bg-dark': item.bgDark,
              '--brand-border-dark': item.borderDark,
              '--brand-hover-bg': item.hoverBg,
              '--brand-hover-color': item.hoverColor,
              '--brand-glow': item.glow,
              '--brand-bg-light': item.bgLight,
              '--brand-border-light': item.borderLight,
            }}
          >
            <span className="icon-wrapper">
              <IconComponent className="social-svg" aria-hidden="true" />
            </span>
            {showLabels && (
              <span className="social-label-text">
                <span className="platform-name">
                  <strong>{item.name}</strong>
                  <span className="live-dot" />
                </span>
                <small>{item.handle}</small>
              </span>
            )}
            <span className="social-tooltip" aria-hidden="true">
              <span className="tooltip-color-pip" />
              <span>{item.name}</span>
            </span>
          </a>
        );
      })}

      <style jsx>{`
        .pelc-socials-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .social-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          text-decoration: none;
          transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.24s ease,
                      border-color 0.24s ease,
                      box-shadow 0.24s ease,
                      color 0.24s ease;
          outline: none;
        }

        .size-sm .social-btn {
          width: 36px;
          height: 36px;
        }

        .size-lg .social-btn {
          width: 46px;
          height: 46px;
        }

        /* ---------------- DARK THEME (Footer & Dark Sections) ---------------- */
        .theme-dark .social-btn {
          background: var(--brand-bg-dark);
          border: 1px solid var(--brand-border-dark);
          color: var(--brand-color);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
        }

        .theme-dark .social-btn:hover,
        .theme-dark .social-btn:focus-visible {
          transform: translateY(-4px) scale(1.08);
          background: var(--brand-hover-bg);
          border-color: var(--brand-color);
          color: var(--brand-hover-color);
          box-shadow: 0 10px 25px var(--brand-glow), 0 0 0 1px var(--brand-color);
        }

        /* ---------------- LIGHT THEME (Sidebar & Contact Page) ---------------- */
        .theme-light .social-btn {
          background: var(--brand-bg-light);
          border: 1px solid var(--brand-border-light);
          color: var(--brand-color);
          box-shadow: 0 2px 6px rgba(16, 43, 36, 0.05);
        }

        .theme-light .social-btn:hover,
        .theme-light .social-btn:focus-visible {
          transform: translateY(-3px) scale(1.08);
          background: var(--brand-hover-bg);
          border-color: var(--brand-color);
          color: var(--brand-hover-color);
          box-shadow: 0 8px 22px var(--brand-glow), 0 0 0 1px var(--brand-color);
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        :global(.social-svg) {
          width: 17px;
          height: 17px;
          transition: transform 0.2s ease;
        }

        .size-sm :global(.social-svg) {
          width: 15px;
          height: 15px;
        }

        .size-lg :global(.social-svg) {
          width: 20px;
          height: 20px;
        }

        .social-btn:hover :global(.social-svg) {
          transform: scale(1.14);
        }

        /* ---------------- TOOLTIP ---------------- */
        .social-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          background: #0c211b;
          color: #ffffff;
          border: 1px solid var(--brand-border-dark);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.3px;
          padding: 4px 9px;
          border-radius: 4px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
          z-index: 50;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tooltip-color-pip {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--brand-color);
          flex-shrink: 0;
        }

        .social-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 4px;
          border-style: solid;
          border-color: #0c211b transparent transparent transparent;
        }

        .social-btn:hover .social-tooltip,
        .social-btn:focus-visible .social-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        /* ---------------- EXTENDED CARD LAYOUT (with-labels) ---------------- */
        .with-labels {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px;
          width: 100%;
        }

        .with-labels .social-btn {
          width: 100%;
          height: auto;
          min-height: 62px;
          padding: 12px 18px;
          border-radius: 8px;
          justify-content: flex-start;
          gap: 14px;
        }

        .with-labels .social-btn .icon-wrapper {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--brand-color);
          color: #ffffff;
          flex-shrink: 0;
          box-shadow: 0 4px 10px var(--brand-glow);
          transition: transform 0.22s ease;
        }

        .with-labels.theme-dark .social-btn .icon-wrapper {
          color: var(--brand-hover-color);
        }

        .with-labels .social-btn:hover .icon-wrapper {
          transform: scale(1.12) rotate(4deg);
        }

        .with-labels .social-tooltip {
          display: none;
        }

        .social-label-text {
          display: flex;
          flex-direction: column;
          text-align: left;
          line-height: 1.35;
          flex: 1;
        }

        .platform-name {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .platform-name strong {
          font-size: 13px;
          font-weight: 750;
          color: var(--ink);
          letter-spacing: -0.2px;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--brand-color);
        }

        .social-label-text small {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.2px;
          font-weight: 500;
        }

        .with-labels .social-btn:hover .platform-name strong,
        .with-labels .social-btn:hover .social-label-text small {
          color: var(--brand-hover-color);
        }
      `}</style>
    </div>
  );
}
