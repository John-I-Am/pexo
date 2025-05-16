'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@prisma/client';
import {
  IconEye,
  IconPhoto,
  IconPin,
  IconPinnedFilled,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { deleteDeck } from '@/app/api/database/decks/mutations';
import { ActiveDeckContext } from '@/app/contexts/ActiveDeckProvider';
import { CardTable } from '@/components/CardTable/CardTable';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { deckPath } from '@/lib/paths';
import { cloneDeck } from '@/utils/decks';
import classes from './Deck.module.css';

type DeckProps = {
  id: string;
  title: string;
  description: string;
  cards: Card[];
  tags: string[];
  isPrebuilt?: true;
};

export const Deck = ({ id, title, description, cards, tags, isPrebuilt }: DeckProps) => {
  const theme = useMantineTheme();
  const router = useRouter();

  const { activeDeckIds, setActiveDeckIds }: any = useContext(ActiveDeckContext);

  const [handleAddPending, setHandleAddPending] = useState(false);
  const [deletePending, setDeletingPending] = useState(false);

  const handleAdd = async () => {
    setHandleAddPending(true);
    notifications.show({
      title: 'In Progress',
      message: 'Be patient! Data to process...',
      autoClose: false,
    });
    const deckId = await cloneDeck(title, description, tags, cards);
    router.push(deckPath(deckId));
    setHandleAddPending(false);
  };

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

  return (
    <Paper>
      <Stack gap="lg">
        <Group justify="space-between">
          <IconPhoto size="32" />
          <Group className={classes.tags}>
            {tags.map((tag: string) => (
              <Badge key={tag} color={theme.other.accentColorLightest} className={classes.tag}>
                {tag}
              </Badge>
            ))}
          </Group>
          {!isPrebuilt && (
            <ActionIcon
              size="sm"
              radius="sm"
              variant={activeDeckIds.includes(id) ? 'filled' : 'outline'}
              aria-label={activeDeckIds.includes(id) ? 'pin-deck' : 'unpin-deck'}
              onClick={() =>
                activeDeckIds.includes(id)
                  ? setActiveDeckIds(activeDeckIds.filter((deckId: string) => deckId !== id))
                  : setActiveDeckIds([...activeDeckIds, id])
              }
            >
              {activeDeckIds.includes(id) ? (
                <IconPinnedFilled />
              ) : (
                <IconPin className={classes.pin} />
              )}
            </ActionIcon>
          )}
        </Group>
        <div>
          <Text size="lg" fw={500}>
            {title}
          </Text>
          <Text size="sm">{description}</Text>
        </div>
        <Group justify="space-between">
          <Group>
            <Button
              {...(!isPrebuilt
                ? {
                    component: Link as any,
                    href: `/dashboard/decks/${id}` as const,
                  }
                : {})}
              onClick={
                isPrebuilt
                  ? () => {
                      modals.open({
                        children: <CardTable cards={cards} />,
                      });
                    }
                  : undefined
              }
              size="xs"
              leftSection={<IconEye size="1.1rem" />}
            >
              View
            </Button>

            {!isPrebuilt && (
              <ActionIcon
                onClick={() =>
                  modals.openConfirmModal({
                    title: 'Delete Deck?',
                    centered: true,
                    children: (
                      <Text fw={500} size="sm">
                        Are you sure you want to delete deck{' '}
                        <span className={classes.text}>{title}</span>? All{' '}
                        <span className={classes.text}>{cards.length}</span> of its cards will be
                        deleted. This action can not be done.
                      </Text>
                    ),
                    labels: { confirm: 'Delete deck', cancel: "No don't delete it!" },
                    confirmProps: { color: 'red' },
                    onConfirm: () => handleDelete(),
                  })
                }
                color="red"
                aria-label="Delete"
                loading={deletePending}
              >
                <IconTrash size="1.1rem" />
              </ActionIcon>
            )}
          </Group>

          {isPrebuilt && (
            <Button
              onClick={handleAdd}
              loading={handleAddPending}
              size="xs"
              leftSection={<IconPlus size="1.1rem" />}
            >
              Add
            </Button>
          )}

          {!isPrebuilt && (
            <Box w="30%" data-testid="progress-bar">
              <ProgressBar cards={cards} />
            </Box>
          )}
        </Group>
      </Stack>
    </Paper>
  );
};
