import { Title, Text, Button, Container, Stack, Group } from '@mantine/core';
import Link from 'next/link';
import classes from './HeroSection.module.css';

const data = [
  {
    title: 'Cards Created',
    stats: '7,496',
    description: '24% growth from last month',
  },
  {
    title: 'Decks Built',
    stats: '497',
    description: '16% growth from last month',
  },
  {
    title: 'Students',
    stats: '275',
    description: '9% growth from last month',
  },
];

export function HeroSection() {
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));
  return (
    <Stack justify="flex-start" className={classes.container}>
      <Group className={classes.root}>{stats}</Group>

      <Title variant="gradient" className={classes.titleee} ta="center">
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Pexo
        </Text>
      </Title>

      <Title className={classes.titlee}>
        A Data-driven{' '}
        <Text component="span" className={classes.highlight} inherit>
          Flashcard
        </Text>{' '}
        Builder
      </Title>
      <Container p={0} size={600}>
        <Text size="lg" c="dimmed" className={classes.description}>
          Embrace a tailored learning journey that adapts to your pace, ensuring mastery at every
          step. Say hello to smarter studying.
        </Text>
        <Button
          mt="lg"
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          component={Link}
          href="/login"
        >
          Start Now
        </Button>
      </Container>
    </Stack>
  );
}
