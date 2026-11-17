'use client';

import { useContactDrawer } from './ContactDrawerProvider';

export default function OpenContactButton({ className = 'button button-outline', children }) {
  const { openContact } = useContactDrawer();

  return (
    <button type="button" className={className} onClick={openContact}>
      {children}
    </button>
  );
}
