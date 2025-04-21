import { Group } from '@mantine/core';

import { headers } from 'next/headers';
import { auth } from '@/src/lib/betterAuth/auth';

import classes from './layout.module.css';
import { Navbar } from './_components/Navbar/Navbar';
import { NavbarDrawer } from './_components/NavbarDrawer/NavbarDrawer';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  console.log(`this is my seesion id: ${session?.user.email}`);
  return (
    <Group wrap="nowrap" className={classes.layout} gap={0}>
      <Navbar user={session?.user?.email || ' '} isDrawer={false} />
      <NavbarDrawer user={session?.user?.email || ' '} />
      {children}
    </Group>
  );
}
