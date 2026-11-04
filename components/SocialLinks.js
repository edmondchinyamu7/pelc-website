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
    color: '#1877F2',
    hoverBg: 'rgba(24, 119, 242, 0.15)',
    hoverBorder: '#1877F2',
  },
  {
    name: 'Instagram',
    label: 'Instagram',
    handle: '@pelc_official',
    url: 'https://instagram.com',
    icon: FaInstagram,
    color: '#E4405F',
    hoverBg: 'rgba(228, 64, 95, 0.15)',
    hoverBorder: '#E4405F',
  },
  {
    name: 'X',
    label: 'X (formerly Twitter)',
    handle: '@PELC_tech',
    url: 'https://x.com',
    icon: FaXTwitter,
    color: '#FFFFFF',
    hoverBg: 'rgba(255, 255, 255, 0.15)',
    hoverBorder: '#d7f36a',
  },
  {
    name: 'LinkedIn',
    label: 'LinkedIn',
    handle: 'PELC Company',
    url: 'https://linkedin.com',
    icon: FaLinkedinIn,
    color: '#0A66C2',
    hoverBg: 'rgba(10, 102, 194, 0.15)',
    hoverBorder: '#0A66C2',
  },
  {
    name: 'YouTube',
    label: 'YouTube',
    handle: 'PELC Tech & Design',
    url: 'https://youtube.com',
    icon: FaYoutube,
    color: '#FF0000',
    hoverBg: 'rgba(255, 0, 0, 0.15)',
    hoverBorder: '#FF0000',
  },
  {
    name: 'WhatsApp',
    label: 'WhatsApp Community',
    handle: '+265 892 236 030',
    url: 'https://wa.me/265892236030',
    icon: FaWhatsapp,
    color: '#25D366',
    hoverBg: 'rgba(37, 211, 102, 0.15)',
    hoverBorder: '#25D366',
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
          >
            <span className="icon-wrapper">
              <IconComponent className="social-svg" aria-hidden="true" />
            </span>
            {showLabels && (
              <span className="social-label-text">
                <strong>{item.name}</strong>
                <small>{item.handle}</small>
              </span>
            )}
            <span className="social-tooltip" aria-hidden="true">
              {item.name}
            </span>
          </a>
        );
      })}

      <style jsx>{`
        .pelc-socials-group {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .social-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          text-decoration: none;
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.22s ease,
                      border-color 0.22s ease,
                      box-shadow 0.22s ease,
                      color 0.22s ease;
          outline: none;
        }

        .size-sm .social-btn {
          width: 34px;
          height: 34px;
        }

        .size-lg .social-btn {
          width: 44px;
          height: 44px;
        }

        /* Dark theme (for Footer and dark backgrounds) */
        .theme-dark .social-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(215, 243, 106, 0.28);
          color: #d7f36a;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        }

        .theme-dark .social-btn:hover,
        .theme-dark .social-btn:focus-visible {
          transform: translateY(-4px) scale(1.06);
          background: var(--lime, #d7f36a);
          border-color: var(--lime, #d7f36a);
          color: #102b24;
          box-shadow: 0 8px 20px rgba(215, 243, 106, 0.35);
        }

        /* Light theme (for sidebars and white surfaces) */
        .theme-light .social-btn {
          background: #ffffff;
          border: 1px solid #dfe1d7;
          color: #15382e;
          box-shadow: 0 2px 5px rgba(16, 43, 36, 0.05);
        }

        .theme-light .social-btn:hover,
        .theme-light .social-btn:focus-visible {
          transform: translateY(-3px) scale(1.06);
          background: #102b24;
          border-color: #102b24;
          color: #d7f36a;
          box-shadow: 0 6px 16px rgba(16, 43, 36, 0.18);
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        :global(.social-svg) {
          width: 15px;
          height: 15px;
          transition: transform 0.2s ease;
        }

        .size-sm :global(.social-svg) {
          width: 13px;
          height: 13px;
        }

        .size-lg :global(.social-svg) {
          width: 18px;
          height: 18px;
        }

        .social-btn:hover :global(.social-svg) {
          transform: scale(1.12);
        }

        /* Hover Tooltip */
        .social-tooltip {
          position: absolute;
          bottom: calc(100% + 7px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          background: #0c211b;
          color: #d7f36a;
          border: 1px solid rgba(215, 243, 106, 0.3);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.3px;
          padding: 3px 8px;
          border-radius: 4px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 50;
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

        /* Extended layout with cards and handles */
        .with-labels {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
          width: 100%;
        }

        .with-labels .social-btn {
          width: 100%;
          height: auto;
          padding: 12px 16px;
          border-radius: 6px;
          justify-content: flex-start;
          gap: 14px;
        }

        .with-labels .social-tooltip {
          display: none;
        }

        .social-label-text {
          display: flex;
          flex-direction: column;
          text-align: left;
          line-height: 1.3;
        }

        .social-label-text strong {
          font-size: 12px;
          font-weight: 700;
        }

        .social-label-text small {
          font-size: 10px;
          opacity: 0.75;
          letter-spacing: 0.2px;
        }
      `}</style>
    </div>
  );
}
