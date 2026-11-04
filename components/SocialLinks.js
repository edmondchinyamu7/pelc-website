import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
} from 'react-icons/fa6';
import './social-links.css';

const styles = {
  group: 'pelc-social-group',
  item: 'pelc-social-item',
  btn: 'pelc-social-btn',
  sm: 'pelc-social-sm',
  lg: 'pelc-social-lg',
  icon: 'pelc-social-icon',
  svg: 'pelc-social-svg',
  dark: 'pelc-social-dark',
  light: 'pelc-social-light',
  tooltip: 'pelc-social-tooltip',
  withLabels: 'pelc-social-withLabels',
  labelText: 'pelc-social-labelText',
};

export const SOCIAL_PROFILES = [
  {
    name: 'Facebook',
    label: 'Facebook',
    handle: '@pelccompany',
    url: 'https://facebook.com',
    icon: FaFacebookF,
    brandColor: '#1877F2',
    onBrandColor: '#FFFFFF',
  },
  {
    name: 'Instagram',
    label: 'Instagram',
    handle: '@pelc_official',
    url: 'https://instagram.com',
    icon: FaInstagram,
    brandColor: '#E1306C',
    onBrandColor: '#FFFFFF',
  },
  {
    name: 'X',
    label: 'X (formerly Twitter)',
    handle: '@PELC_tech',
    url: 'https://x.com',
    icon: FaXTwitter,
    brandColor: '#1D1D1F',
    onBrandColor: '#FFFFFF',
  },
  {
    name: 'LinkedIn',
    label: 'LinkedIn',
    handle: 'PELC Company',
    url: 'https://linkedin.com',
    icon: FaLinkedinIn,
    brandColor: '#0A66C2',
    onBrandColor: '#FFFFFF',
  },
  {
    name: 'YouTube',
    label: 'YouTube',
    handle: 'PELC Tech & Design',
    url: 'https://youtube.com',
    icon: FaYoutube,
    brandColor: '#FF0000',
    onBrandColor: '#FFFFFF',
  },
  {
    name: 'WhatsApp',
    label: 'WhatsApp Community',
    handle: '+265 892 236 030',
    url: 'https://wa.me/265892236030',
    icon: FaWhatsapp,
    brandColor: '#25D366',
    onBrandColor: '#0A231B',
  },
];

export default function SocialLinks({ theme = 'dark', size = 'default', showLabels = false }) {
  const groupClass = [
    styles.group,
    theme === 'light' ? styles.light : styles.dark,
    size === 'sm' ? styles.sm : size === 'lg' ? styles.lg : '',
    showLabels ? styles.withLabels : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ul className={groupClass} aria-label="PELC on social media">
      {SOCIAL_PROFILES.map((item) => {
        const IconComponent = item.icon;
        return (
          <li key={item.name} className={styles.item}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btn}
              aria-label={`Visit PELC on ${item.label}`}
              style={{ '--brand-color': item.brandColor, '--brand-on-color': item.onBrandColor }}
            >
              <span className={styles.icon}>
                <IconComponent className={styles.svg} aria-hidden="true" />
              </span>
              {showLabels && (
                <span className={styles.labelText}>
                  <strong>{item.name}</strong>
                  <small>{item.handle}</small>
                </span>
              )}
              <span className={styles.tooltip} aria-hidden="true">
                {item.name}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
