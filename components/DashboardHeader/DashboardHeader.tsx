import { Group } from '@mantine/core';

export function DashboardHeader({ children }: { children: React.ReactNode }) {
  return (
    <Group wrap="nowrap" h="80px" w="100%">
      {children}
    </Group>
  );
}
