import Link from 'next/link';
import { Badge, Button, Container, Stack, Text, Title } from '@mantine/core';
import { loginPath } from '@/lib/paths';
import classes from './HeroHeader.module.css';

export const HeroHeader = () => {
  return (
    <Stack p="sm">
      <Title order={1} className={classes.title}>
        <Badge variant="light">under active development</Badge>
        <Badge variant="transparent">
          <span className={classes.stat}>27</span> users
        </Badge>
        <Badge variant="transparent">
          <span className={classes.stat}>146</span> decks
        </Badge>
        <Badge variant="transparent">
          <span className={classes.stat}>319</span> cards
        </Badge>

        <Text inherit variant="gradient" gradient={{ from: 'blue.4', to: 'blue.9' }}>
          Review. Repeat. <br /> Retain.
        </Text>
      </Title>
      <Title order={2} className={classes.subtitle}>
        Learn smarter with your own personalized
        <Text
          inherit
          component="span"
          variant="gradient"
          gradient={{ from: 'orange.2', to: 'orange.9' }}
        >
          {' Flashcard '}
        </Text>
        system
      </Title>
      <Container p={0} size={600}>
        <Button
          size="xl"
          mt="xl"
          variant="gradient"
          gradient={{ from: 'blue.9', to: 'blue.4' }}
          component={Link}
          href={loginPath()}
        >
          Start Now
        </Button>
      </Container>
    </Stack>
  );
};
