import { Card, Group, Switch, Text } from '@mantine/core';
import classes from './Setting.module.css';

const data = [
  {
    title: 'Reset on fail',
    description: 'Reset card level back to one on every incorrect guess',
    status: false,
  },
  {
    title: 'Setting 1',
    description: 'TBD',
    status: false,
  },
  { title: 'Setting 2', description: 'TBD', status: false },
  {
    title: 'Setting 3',
    description: 'TBD',
    status: false,
  },
];

export const Setting = () => {
  const items = data.map((item) => (
    <Group justify="space-between" className={classes.item} gap="xl" key={item.title}>
      <div>
        <Text>{item.title}</Text>
        <Text size="xs" c="dimmed">
          {item.description}
        </Text>
      </div>
      <Switch onLabel="ON" offLabel="OFF" className={classes.switch} size="lg" />
    </Group>
  ));

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Text fz="lg" className={classes.title} fw={500}>
        Configure settings
      </Text>
      <Text fz="xs" c="dimmed" mt={3} mb="xl">
        Choose default behaviour of your decks
      </Text>
      {items}
    </Card>
  );
};
