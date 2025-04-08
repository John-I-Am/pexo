import { Group, Stack, Text } from '@mantine/core';
import classes from './Statsbanner.module.css';

type StatsType = {
  title: string;
  stats: string;
  description: string;
};

const data: StatsType[] = [
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

export function StatsBanner() {
  const stats = data.map((stat: StatsType) => (
    <Stack justify="flex-start" key={stat.title}>
      <Group wrap="nowrap">
        <Text c="white" fw="700" size="xl">
          {stat.stats}
        </Text>
        <Text tt="uppercase" fw="700" c="orange.7" size="sm">
          {stat.title}
        </Text>
      </Group>
      <Text c="white" size="xs">
        {stat.description}
      </Text>
    </Stack>
  ));
  return (
    <Group visibleFrom="sm" wrap="nowrap" justify="space-evenly" className={classes.container}>
      {stats}
    </Group>
  );
}
