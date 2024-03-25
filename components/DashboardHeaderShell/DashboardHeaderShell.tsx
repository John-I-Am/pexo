import { Stack } from '@mantine/core';

export function DashboardHeaderShell({ children }: { children: React.ReactNode }) {
  return (
    <Stack justify="space-around" h="100px">
      {children}
    </Stack>
  );
}
