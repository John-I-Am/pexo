import { headers } from 'next/headers';
import { Group } from '@mantine/core';
import { auth } from '@/lib/betterAuth/auth';
import { Navbar } from './_components/Navbar/Navbar';
import { NavbarDrawer } from './_components/NavbarDrawer/NavbarDrawer';
import classes from './layout.module.css';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <Group wrap="nowrap" className={classes.layout} gap={0}>
      <Navbar user={session?.user?.email || ' '} isDrawer={false} />
      <NavbarDrawer user={session?.user?.email || ' '} />
      {children}
    </Group>
  );
}
