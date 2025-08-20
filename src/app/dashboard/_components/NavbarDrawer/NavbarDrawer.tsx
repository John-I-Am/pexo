'use client';

import { IconMenu2 } from '@tabler/icons-react';
import cx from 'clsx';
import { ActionIcon, Drawer, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from '../Navbar/Navbar';
import classes from './NavbarDrawer.module.css';

export function NavbarDrawer({ user }: any) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size={rem(300)}
        classNames={{ body: classes.drawer }}
      >
        <Navbar user={user} isDrawer />
      </Drawer>

      <ActionIcon
        className={cx(classes.burger, {
          [classes.small]: opened === false,
          [classes.big]: opened,
        })}
        variant="transparent"
        aria-label="Navigation-burger"
        onClick={open}
      >
        <IconMenu2 />
      </ActionIcon>
    </>
  );
}
