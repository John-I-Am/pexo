'use client';

import Link from 'next/link';

import { Card, Text, Progress, Badge, Group, ActionIcon } from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { deleteDeck } from '@/app/api/actions/decks';
import classes from './Deck.module.css';

export function Deck({ id, title }: any) {
  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Group wrap="nowrap" className={classes.tags} gap="sm">
        <Badge className={classes.tag}>Tag</Badge>
        <Badge className={classes.tag}>Tag</Badge>
      </Group>

      <Text fz="lg" fw={500} mt="md">
        {title}
      </Text>
      <Text fz="sm" c="dimmed" mt={5}>
        This is my deck description
      </Text>

      <Text c="dimmed" fz="sm" mt="md">
        Cards Mastered:{' '}
        <Text span fw={500} c="bright">
          23/36
        </Text>
      </Text>

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
    </Card>
  );
}
