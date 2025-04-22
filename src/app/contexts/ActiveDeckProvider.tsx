'use client';

import { createContext, useState, ReactNode } from 'react';

type ActiveDeckContextType = {
  activeDeckId: string | null;
  setActiveDeckId: (id: string | null) => void;
};

export const ActiveDeckContext = createContext<ActiveDeckContextType | null>(null);

export const ActiveDeckProvider = ({ children }: { children: ReactNode }) => {
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);

  return (
    <ActiveDeckContext.Provider value={{ activeDeckId, setActiveDeckId }}>
      {children}
    </ActiveDeckContext.Provider>
  );
};
