'use client';

import { createContext, ReactNode, useState } from 'react';

type ActiveDeckContextType = {
  activeDeckIds: string[];
  setActiveDeckIds: (ids: string[]) => void;
};

export const ActiveDeckContext = createContext<ActiveDeckContextType | null>(null);

export const ActiveDeckProvider = ({ children }: { children: ReactNode }) => {
  const [activeDeckIds, setActiveDeckIds] = useState<string[]>([]);

  return (
    <ActiveDeckContext.Provider value={{ activeDeckIds, setActiveDeckIds }}>
      {children}
    </ActiveDeckContext.Provider>
  );
};
