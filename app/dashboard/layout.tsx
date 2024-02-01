import { Group } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { auth } from '@/auth';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <Group wrap="nowrap">
      <Navbar user={session?.user?.email || ' '} />
      <div>{children}</div>
    </Group>
  );
}
