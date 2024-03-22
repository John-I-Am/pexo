'use client';

import {
  IconGauge,
  IconCalendarStats,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLogout,
  IconChevronLeft,
  IconChevronRight,
  IconCactus,
  IconCards,
  IconSettings,
} from '@tabler/icons-react';
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
} from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useState } from 'react';
import cx from 'clsx';

import { signOut } from 'next-auth/react';
import classes from './Navbar.module.css';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

const navItems = [
  // { label: 'Dashboard', icon: IconGauge, link: '/dashboard' },
  {
    label: 'Decks',
    icon: IconCards,
    initiallyOpened: true,
    link: '/dashboard/decks',
    links: [
      { label: 'Your Decks', link: '/dashboard/decks' },
      { label: 'Discover', link: '/dashboard/decks' },
    ],
  },
  // {
  //   label: 'Releases',
  //   icon: IconCalendarStats,
  //   link: '/',
  //   links: [
  //     { label: 'Upcoming releases', link: '/' },
  //     { label: 'Previous releases', link: '/' },
  //     { label: 'Releases schedule', link: '/' },
  //   ],
  // },
  // { label: 'Analytics', icon: IconPresentationAnalytics, link: '/' },
  // { label: 'Learn', icon: IconFileAnalytics, link: '/' },
  // {
  //   label: 'Settings',
  //   icon: IconAdjustments,
  //   link: '/',
  //   links: [
  //     { label: 'Enable 2FA', link: '/' },
  //     { label: 'Change password', link: '/' },
  //     { label: 'Recovery codes', link: '/' },
  //   ],
  // },
];

export function Navbar({ user }: { user: string }) {
  const pathname = usePathname();
  const [compact, setCompact] = useState<boolean>(false);
  const links = navItems.map((item: any) => (
    <Tooltip key={item.label} disabled={!compact} label={item.label}>
      <NavLink
        component={Link}
        key={item.label}
        href={item.link}
        active={pathname === item.link}
        label={item.label}
        leftSection={
          <ThemeIcon variant="light" size={30}>
            <item.icon stroke={1.5} />
          </ThemeIcon>
        }
        childrenOffset={60}
        variant="light"
      >
        {item.links &&
          !compact &&
          item.links.map((nav: any) => (
            <NavLink
              className={classes.sublink}
              component={Link}
              key={nav.label}
              href={nav.link}
              label={nav.label}
            />
          ))}
      </NavLink>
    </Tooltip>
  ));

  return (
    <nav
      className={cx(classes.navbar, {
        [classes['navbar-compact']]: compact === true,
      })}
    >
      <div className={classes.header}>
        <Group wrap="nowrap" justify="space-evenly">
          <ThemeIcon variant="filled" size={50}>
            <IconCactus stroke={1.5} />
          </ThemeIcon>
          {compact === false && (
            <Text c="dimmed" size="xs">
              In Development
            </Text>
          )}
        </Group>
      </div>

      <ScrollArea scrollbars="y" className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <Stack>
          <Tooltip label={user}>
            <Text truncate fw={500}>
              {user}
            </Text>
          </Tooltip>

          <Group justify="space-between">
            <Tooltip label="Logout">
              <ActionIcon
                onClick={() => {
                  signOut();
                }}
                variant="light"
                aria-label="logout"
              >
                <IconLogout stroke={1.5} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Toggle Theme">
              <Box>
                <ColorSchemeToggle />
              </Box>
            </Tooltip>

            <Tooltip label={compact ? 'Expand' : 'Collapse'}>
              <ActionIcon
                onClick={() => {
                  setCompact(!compact);
                }}
                component="button"
                variant="light"
                aria-label={compact ? 'expand' : 'collapse'}
              >
                {compact ? <IconChevronRight stroke={1.5} /> : <IconChevronLeft stroke={1.5} />}
              </ActionIcon>
            </Tooltip>
          </Group>
        </Stack>
      </div>
    </nav>
  );
}
