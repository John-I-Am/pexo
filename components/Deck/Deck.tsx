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
  Modal,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash, IconEdit, IconBook } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { deleteDeck } from '@/app/api/actions/decks';
import classes from './Deck.module.css';

export function Deck({ id, title }: { id: string; title: string }) {
  const [opened, { open, close }] = useDisclosure(false);
  const handleDelete = () => {
    deleteDeck(id);
    close();
    notifications.show({
      title: 'Deck Deleted',
      message: `Deck ${title} has been deleted`,
    });
  };

  return (
    <Paper radius="md" withBorder className={classes.card} mt={20}>
      <Modal
        classNames={{
          title: classes.modal,
        }}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        title={`Delete ${title}`}
      >
        <Text ta="center" fz="sm" c="red">
          Are you sure you want to delete this deck? This action is irreversible
        </Text>
        <Group justify="space-between" mt="lg" wrap="nowrap">
          <Button onClick={() => close()}>Cancel</Button>
          <Button variant="outline" color="red" onClick={handleDelete}>
            Delete
          </Button>
        </Group>
      </Modal>
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
          onClick={open}
        >
          <IconTrash size="1.1rem" />
        </ActionIcon>
      </Group>
    </Paper>
  );
}
