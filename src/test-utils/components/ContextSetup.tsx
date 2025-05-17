import { useContext, useEffect } from 'react';
import { ActiveDeckContext } from '@/app/contexts/ActiveDeckProvider';

type ContextSetupProps = {
  children: React.ReactNode;
  activeIds?: string[];
};

export const ContextSetup = ({ children, activeIds = ['deck-1', 'deck-2'] }: ContextSetupProps) => {
  const { setActiveDeckIds }: any = useContext(ActiveDeckContext);

  useEffect(() => {
    setActiveDeckIds(activeIds);
  }, []);

  return <>{children}</>;
};
