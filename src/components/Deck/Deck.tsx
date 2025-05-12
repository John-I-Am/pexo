'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@prisma/client';
import {
  IconEdit,
  IconEye,
  IconHourglassEmpty,
  IconPlaceholder,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import { ActionIcon, Badge, Button, Group, Modal, Paper, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { upsertCard } from '@/app/api/database/cards/mutations';
import { createDeck, deleteDeck } from '@/app/api/database/decks/mutations';
import { CardTable } from '../CardTable/CardTable';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import classes from './Deck.module.css';

export function Deck({
  id,
  title,
  cards,
  tags,
  editable,
}: {
  id: string;
  title: string;
  cards: Card[];
  tags: string[];
  editable: boolean;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [deletePending, setDeletingPending] = useState(false);
  const [addPending, setAddPending] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    setDeletingPending(true);
    const result = await deleteDeck(id);
    if (result) {
      setDeletingPending(false);
      notifications.show({
        title: 'Deck Deleted',
        message: `Deck ${title} has been deleted`,
      });
    }
  };

  const handleAdd = async () => {
    setAddPending(true);
    notifications.show({
      title: 'In Progress',
      message: 'Be patient! Data to process...',
    });
    try {
      const newDeck: any = await createDeck();

      const cardCreationPromises = cards.map((newCard) => {
        const card = { ...newCard, id: newDeck.id };
        return upsertCard(newDeck.id, card.front, card.back, card.audioUrl);
      });

      // Resolving all promises in parallel
      await Promise.all(cardCreationPromises);
      router.push(`/dashboard/decks/${newDeck.id}`);
    } catch (error) {
      notifications.show({
        title: 'ERROR',
        message: 'Something went wrong! Deck was not able to be created',
      });
    }
    setAddPending(false);
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
    <Paper radius="md" p="md" className={classes.card}>
      <Group wrap="nowrap" pb="sm">
        <ActionIcon radius="md" variant="subtle">
          <IconPlaceholder stroke={2} />
        </ActionIcon>
        <Group wrap="nowrap" className={classes.tags}>
          {tags.map((tag: string) => (
            <Badge key={tag} variant="light" className={classes.tag}>
              {tag}
            </Badge>
          ))}
        </Group>
      </Group>
      <Text ta="center" fw={700} className={classes.title}>
        {title}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        A deck for learning!
      </Text>
      <ProgressBar cards={[]} />
      {/**  // cards=cards broken  tempoerary disable */}
      {editable ? (
        <Group justify="space-between" mt="lg">
          <Group>
            <Button
              component={Link}
              href={`/dashboard/decks/${id}/learn`}
              radius="md"
              leftSection={<IconHourglassEmpty size="1.1rem" />}
            >
              Learn
            </Button>
            <Button
              component={Link}
              href={`/dashboard/decks/${id}`}
              variant="light"
              radius="md"
              leftSection={<IconEdit size="1.1rem" />}
            >
              Edit
            </Button>
          </Group>

          <ActionIcon
            variant="filled"
            size="lg"
            radius="md"
            color="red"
            aria-label="Delete"
            onClick={openModal}
            loading={deletePending}
          >
            <IconTrash size="1.1rem" />
          </ActionIcon>
        </Group>
      ) : (
        <Group mt="lg">
          <Button
            loading={addPending}
            onClick={handleAdd}
            radius="md"
            leftSection={<IconPlus size="1.1rem" />}
          >
            Add
          </Button>
          <Button
            onClick={open}
            radius="md"
            leftSection={<IconEye size="1.1rem" />}
            variant="light"
          >
            View
          </Button>
        </Group>
      )}
      <Modal opened={opened} onClose={close} withCloseButton={false} size="auto">
        <CardTable cards={cards} />
      </Modal>
    </Paper>
  );
}
