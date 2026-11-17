export default function manifest() {
  return {
    id: '/',
    name: 'NOVEX DIGITAL',
    short_name: 'NOVEX',
    description:
      'NOVEX DIGITAL — New Ideas. New Possibilities. New Legacy. Websites, software, AI solutions, digital marketing, and branding.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#11100d',
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
