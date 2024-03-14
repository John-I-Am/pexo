'use client';

import Link from 'next/link';

import { Text, Progress, Badge, Group, ActionIcon, ThemeIcon, rem, Paper } from '@mantine/core';
import { IconTrash, IconEdit, IconBook } from '@tabler/icons-react';
import { deleteDeck } from '@/app/api/actions/decks';
import classes from './Deck.module.css';

export function Deck({ id, title }: any) {
  return (
    <Paper radius="md" withBorder className={classes.card} mt={20}>
      <ThemeIcon className={classes.icon} size={60} radius={60}>
        <IconBook style={{ width: rem(32), height: rem(32) }} stroke={1.5} />
      </ThemeIcon>

      <Group wrap="nowrap" className={classes.tags} gap="sm">
        <Badge className={classes.tag}>Tag</Badge>
        <Badge className={classes.tag}>Tag</Badge>
        <Badge className={classes.tag}>Tag</Badge>
        <Badge className={classes.tag}>Tag</Badge>
      </Group>

      <Text ta="center" fw={700} className={classes.title}>
        {title}
      </Text>
      <Text c="dimmed" ta="center" fz="sm">
        Deck description goes here
      </Text>

      <Group justify="space-between" mt="xs">
        <Text fz="sm" c="dimmed">
          Progress
        </Text>
        <Text fz="sm" c="dimmed">
          62%
        </Text>
      </Group>

      <Progress value={(23 / 36) * 100} mt={5} />

      <Group justify="space-between" mt="md">
        <ActionIcon
          component={Link}
          href={`/dashboard/decks/${id}`}
          variant="light"
          size="lg"
          radius="md"
        >
          <IconEdit size="1.1rem" />
        </ActionIcon>

        <ActionIcon
          variant="filled"
          size="lg"
          radius="md"
          color="red"
          aria-label="Delete"
          onClick={() => deleteDeck(id)}
        >
          <IconTrash size="1.1rem" />
        </ActionIcon>
      </Group>
    </Paper>
  );
}
