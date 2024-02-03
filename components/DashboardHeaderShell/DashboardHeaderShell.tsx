import { Group } from '@mantine/core';

export function DashboardHeaderShell({ children }: { children: React.ReactNode }) {
  return (
    <Group wrap="nowrap" h="80px" w="100%" pt="sm">
      {children}
    </Group>
  );
}
