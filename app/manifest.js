export default function manifest() {
  return {
    id: '/',
    name: 'NEOPAD STUDIO',
    short_name: 'NEOPAD',
    description:
      'NEOPAD STUDIO is a creative digital and technology studio offering websites, software and applications, digital marketing and advertising, graphic design and branding, AI, and digital consultancy.',
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
