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
} from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useState } from 'react';
import cx from 'clsx';

import classes from './Navbar.module.css';
import { unauthenticate } from '@/app/api/actions';

const navItems = [
  { label: 'Dashboard', icon: IconGauge, link: '/dashboard' },
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
  {
    label: 'Releases',
    icon: IconCalendarStats,
    link: '/',
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' },
    ],
  },
  { label: 'Analytics', icon: IconPresentationAnalytics, link: '/' },
  { label: 'Learn', icon: IconFileAnalytics, link: '/' },
  {
    label: 'Settings',
    icon: IconAdjustments,
    link: '/',
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
];

export function Navbar({ user }: { user: string }) {
  const pathname = usePathname();
  const [compact, setCompact] = useState<boolean>(false);
  const links = navItems.map((item: any) => (
    <Tooltip disabled={!compact} label={item.label}>
      <NavLink
        component={Link}
        key={item.label}
        href={item.link}
        active={pathname === item.link}
        label={compact ? '' : item.label}
        leftSection={
          <ThemeIcon variant="light" size={30}>
            <item.icon stroke={1.5} />
          </ThemeIcon>
        }
        childrenOffset={30}
        variant="light"
      >
        {item.links &&
          compact === false &&
          item.links.map((item2: any) => (
            <NavLink
              className={classes.sublink}
              component={Link}
              key={item2.label}
              href={item2.link}
              label={item2.label}
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

      <ScrollArea className={classes.links}>
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
                  unauthenticate();
                }}
                href="/" // Next-auth auth.signOut() function buggy and doesn't redirect properly. This is a hack.
                component="a"
                variant="light"
                aria-label="Logout"
              >
                <IconLogout stroke={1.5} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label={compact ? 'expand' : 'collapse'}>
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
