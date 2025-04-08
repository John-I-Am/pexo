import { Group } from '@mantine/core';

import { auth } from '@/src/auth';

import classes from './layout.module.css';
import { Navbar } from './_components/Navbar/Navbar';
import { NavbarDrawer } from './_components/NavbarDrawer/NavbarDrawer';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <Group wrap="nowrap" className={classes.layout} gap={0}>
      <Navbar user={session?.user?.email || ' '} isDrawer={false} />
      <NavbarDrawer user={session?.user?.email || ' '} />
      {children}
    </Group>
  );
}
