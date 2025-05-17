import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ActiveDeckProvider } from '@/app/contexts/ActiveDeckProvider';
import { theme } from '../theme';

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <ActiveDeckProvider>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </ActiveDeckProvider>
    ),
  });
}
