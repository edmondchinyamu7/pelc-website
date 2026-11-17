'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import ContactDrawer from './ContactDrawer';

const ContactDrawerContext = createContext({
  openContact: () => {},
  closeContact: () => {},
});

export function useContactDrawer() {
  return useContext(ContactDrawerContext);
}

export default function ContactDrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openContact = useCallback(() => setIsOpen(true), []);
  const closeContact = useCallback(() => setIsOpen(false), []);

  return (
    <ContactDrawerContext.Provider value={{ openContact, closeContact }}>
      {children}
      <ContactDrawer isOpen={isOpen} onClose={closeContact} />
    </ContactDrawerContext.Provider>
  );
}
