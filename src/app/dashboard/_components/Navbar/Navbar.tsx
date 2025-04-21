'use client';

import {
  IconCards,
  IconPin,
  IconPig,
  IconPinnedFilled,
  IconHome,
  IconDoorExit,
  IconUser,
} from '@tabler/icons-react';
import { useHover } from '@mantine/hooks';
import {
  Group,
  ScrollArea,
  Text,
  ActionIcon,
  Tooltip,
  Stack,
  NavLink,
  ThemeIcon,
  Box,
  Title,
} from '@mantine/core';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '@/src/lib/betterAuth/authClient';

import cx from 'clsx';
import classes from './Navbar.module.css';
import { ColorSchemeToggle } from '@/src/components/ColorSchemeToggle/ColorSchemeToggle';
import { loginPath } from '@/src/lib/paths';

interface NavItem {
  label: string;
  icon?: React.ComponentType;
  link: string;
  links?: NavItem[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: IconHome, link: '/dashboard' },
  {
    label: 'Decks',
    icon: IconCards,
    link: '/dashboard/decks',
    links: [
      { label: 'My Decks', link: '/dashboard/decks' },
      { label: 'Explore', link: '/dashboard/decks/explore' },
    ],
  },
  { label: 'Account', icon: IconUser, link: '/dashboard/account' },
];

export function Navbar({ user, isDrawer }: { user: string; isDrawer: boolean }) {
  const router = useRouter();
  const pathname: string = usePathname();
  const { hovered, ref } = useHover();
  const [compact, setCompact] = useState<boolean>(true);

  const links = navItems.map((item: any) => (
    <NavLink
      classNames={{
        root: classes.link,
        body: hovered === false && compact === false ? classes['link-compact'] : undefined,
      }}
      component={Link}
      key={item.label}
      href={item.link}
      active={
        item.link === '/dashboard/decks' ? pathname.includes(item.link) : pathname === item.link
      }
      label={item.label}
      leftSection={<item.icon />}
      variant="filled"
    >
      {item.links &&
        (compact || (hovered && !compact)) &&
        item.links.map((nav: NavItem) => (
          <NavLink
            className={classes.sublink}
            component={Link}
            key={nav.label}
            href={nav.link}
            active={pathname === nav.link}
            label={nav.label}
          />
        ))}
    </NavLink>
  ));

  return (
    <nav
      ref={ref}
      className={cx(classes.navbar, {
        [classes['navbar-compact']]: hovered === false && compact === false,
      })}
    >
      <div className={classes.header}>
        <Group wrap="nowrap" justify="space-between">
          <ThemeIcon variant="white" size="xl">
            <IconPig size="32px" />
          </ThemeIcon>
          <Title order={1} fz="xl" c="orange">
            Pexo
          </Title>

          <Group wrap="nowrap">
            <Tooltip label="Toggle View">
              <ActionIcon
                size="sm"
                display={isDrawer ? 'none' : ''}
                variant={compact ? 'filled' : 'outline'}
                aria-label={compact ? 'pin-nav' : 'unpin-nav'}
                onClick={() => setCompact(!compact)}
              >
                {compact ? <IconPinnedFilled /> : <IconPin />}
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Toggle Theme">
              <Box>
                <ColorSchemeToggle />
              </Box>
            </Tooltip>
          </Group>
        </Group>
      </div>

      <ScrollArea scrollbars="y" className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <Stack className={classes.footer}>
        <Tooltip label={user}>
          <Text truncate fw={500} c="dimmed">
            {user}
          </Text>
        </Tooltip>
        <NavLink
          classNames={{
            root: classes.link,
            body: hovered === false && compact === false ? classes['link-compact'] : undefined,
          }}
          component="button"
          label="Logout"
          leftSection={<IconDoorExit />}
          variant="filled"
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push(loginPath());
                },
              },
            });
          }}
        />
      </Stack>
    </nav>
  );
}
