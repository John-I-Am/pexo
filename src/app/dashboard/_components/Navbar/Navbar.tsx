'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  IconCards,
  IconChalkboard,
  IconDoorExit,
  IconHome,
  IconPig,
  IconPin,
  IconPinnedFilled,
  IconUser,
} from '@tabler/icons-react';
import cx from 'clsx';
import {
  ActionIcon,
  Box,
  Group,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { ActiveDeckContext } from '@/app/contexts/ActiveDeckProvider';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { authClient } from '@/lib/betterAuth/authClient';
import { accountPath, collectionsPath, dashboardPath, loginPath, studyPath } from '@/lib/paths';
import classes from './Navbar.module.css';

interface NavItem {
  label: string;
  icon?: React.ComponentType;
  link: string;
  links?: NavItem[];
}

const navItems: NavItem[] = [
  { label: 'Study', icon: IconChalkboard, link: studyPath() },
  { label: 'Dashboard', icon: IconHome, link: dashboardPath() },
  {
    label: 'Collections',
    icon: IconCards,
    link: collectionsPath(),
  },
  { label: 'Account', icon: IconUser, link: accountPath() },
];

export function Navbar({ user, isDrawer }: { user: string; isDrawer: boolean }) {
  const theme = useMantineTheme();
  const router = useRouter();
  const pathname: string = usePathname();
  const { hovered, ref } = useHover();
  const [compact, setCompact] = useState<boolean>(true);

  const { setActiveDeckIds }: any = useContext(ActiveDeckContext);

  const links = navItems.map((item: any) => (
    <NavLink
      classNames={{
        root: classes.link,
        label: classes['link-label'],
        body: hovered === false && compact === false ? classes['link-compact'] : undefined,
      }}
      color={theme.other.accentColor}
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
                radius="sm"
                display={isDrawer ? 'none' : ''}
                variant={compact ? 'filled' : 'outline'}
                aria-label={compact ? 'pin-nav' : 'unpin-nav'}
                onClick={() => setCompact(!compact)}
              >
                {compact ? <IconPinnedFilled /> : <IconPin className={classes.pin} />}
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

      <ScrollArea type="never" className={classes.links}>
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
                  setActiveDeckIds([]);
                },
              },
            });
          }}
        />
      </Stack>
    </nav>
  );
}
