import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { Logo } from '@/components/Logo/Logo';
import { loginPath } from '@/lib/paths';
import { Button, Group, Text } from '@mantine/core';
import Link from 'next/link';

import classes from './Header.module.css';

export function Header() {
  return (
    <Group p="md" wrap="nowrap" justify="space-between">
      <Group gap={'xl'}>
        <Logo />
        <Group ml="xl" gap={'md'} visibleFrom="sm">
          <Text className={classes.nav} size="sm" fw={900}>
            Demo
          </Text>
          <Text className={classes.nav} size="sm" fw={900}>
            How it works
          </Text>
          <Text className={classes.nav} size="sm" fw={900}>
            Pricing
          </Text>
        </Group>
      </Group>
      <Group>
        <ColorSchemeToggle />
        <Button component={Link} href={loginPath()}>
          Log In
        </Button>
      </Group>
    </Group>
  );
}
