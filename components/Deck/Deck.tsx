'use client';

import Link from 'next/link';

import {
  Text,
  Progress,
  Badge,
  Group,
  ActionIcon,
  ThemeIcon,
  rem,
  Paper,
  Button,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconTrash, IconEdit, IconBook } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { deleteDeck } from '@/app/api/actions/decks';
import classes from './Deck.module.css';

export function Deck({ id, title }: { id: string; title: string }) {
  const handleDelete = () => {
    deleteDeck(id);
    notifications.show({
      title: 'Deck Deleted',
      message: `Deck ${title} has been deleted`,
    });
  };

  const openModal = () =>
    modals.openConfirmModal({
      title: `Delete ${title}`,
      children: (
        <Text ta="center" size="sm">
          This action is irreversible! Please confirm.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: handleDelete,
    });

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
        <Button
          component={Link}
          href={`/dashboard/decks/${id}`}
          variant="light"
          radius="md"
          leftSection={<IconEdit size="1.1rem" />}
        >
          Edit
        </Button>

        <ActionIcon
          variant="filled"
          size="lg"
          radius="md"
          color="red"
          aria-label="Delete"
          onClick={openModal}
        >
          <IconTrash size="1.1rem" />
        </ActionIcon>
      </Group>
    </Paper>
  );
}
