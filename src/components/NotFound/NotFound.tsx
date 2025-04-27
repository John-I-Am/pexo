import { Button, Container, Group, Text, Title } from '@mantine/core';
import { NotFoundBg } from './NotFoundBg';
import classes from './NotFound.module.css';
import Link from 'next/link';
import { decksPath } from '@/lib/paths';

export function NotFoundMessage() {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <NotFoundBg className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            Uh Oh! Resource cannot be found.
          </Text>
          <Group justify="center">
            <Button component={Link} href={decksPath()} size="md">
              Take me back
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
