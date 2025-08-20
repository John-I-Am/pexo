import Link from 'next/link';
import { Anchor, Button, Group } from '@mantine/core';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { Logo } from '@/components/Logo/Logo';
import { loginPath } from '@/lib/paths';
import classes from './Header.module.css';

export const Header = () => {
  return (
    <Group p="md" justify="space-between">
      <Group gap="xl">
        <Logo />
        <Group ml="xl" gap="md" visibleFrom="sm">
          <Anchor href="#demo" underline="never" className={classes.nav}>
            Demo
          </Anchor>
          <Anchor href="#pricing" underline="never" className={classes.nav}>
            Pricing
          </Anchor>
          <Anchor href="#faq" underline="never" className={classes.nav}>
            FAQ
          </Anchor>
        </Group>
      </Group>
      <Group>
        <ColorSchemeToggle />
        <Button className={classes.login} component={Link} href={loginPath()}>
          Log In
        </Button>
      </Group>
    </Group>
  );
};
